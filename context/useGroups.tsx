import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { useUser } from './useUser';
import getGroupByUserId from '../utils/queries/getGroupByUserId';
import { Group, GroupsContextType, GroupMovieList } from '../typings';
import { supabase } from '../utils/supabase';

const GroupsContext = createContext<GroupsContextType | undefined>(undefined);

export function useGroups() {
  const context = useContext(GroupsContext);
  if (context === undefined) {
    throw new Error('useGroups must be used within a GroupsProvider');
  }
  return context;
}

type GroupsProviderProps = {
  children: React.ReactNode;
};

export function GroupsProvider({ children }: GroupsProviderProps) {
  const [update, setUpdate] = useState(false);
  const [groupMovieLists, setGroupMovieLists] = useState<GroupMovieList[] | null>(null);
  const [loadingGroups, setLoadingGroups] = useState<boolean>(true);
  const { user } = useUser();
  const [groups, setGroups] = useState<Group[] | null>(null);

  const fetchGroups = useCallback(async () => {
    if (user) {
      try {
        const userGroups = await getGroupByUserId(user.id);
        setGroups(userGroups);

        const fetchGroupMovieListIds = async (group_id: string) => {
            const { data, error } = await supabase
            .from('group_movie_lists')
            .select('id')
            .eq('group_id', group_id);
            
            if (error) {
                console.error('Error fetching group movie list ids:', error);
                return [];
            }
            
            return data.map((entry) => ({ id: entry.id, group_id }));
        };

        if (userGroups) {
            const groupMovieListIdsPromises = userGroups.map((group) =>
              fetchGroupMovieListIds(group.group_id),
            );
          
            const groupMovieListIdsArray = await Promise.all(groupMovieListIdsPromises);
            const groupMovieLists = groupMovieListIdsArray.flat();
            setGroupMovieLists(groupMovieLists);
          }

        setLoadingGroups(false);
      } catch (error) {
        console.error('Error fetching user data type group:', error);
      }
    } else {
      setLoadingGroups(false);
    }
  }, [user]);

  useEffect(() => {
    fetchGroups();
  }, [user, update, fetchGroups]);

  const updateGroups = () => {
    setUpdate(!update);
  };

  return (
    <GroupsContext.Provider value={{ groups, loadingGroups, updateGroups, groupMovieLists }}>
      {children}
    </GroupsContext.Provider>
  );
}
