import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { useUser } from './useUser';
import getGroupByUserId from '../utils/queries/getGroupByUserId';
import { Group, GroupsContextType } from '../typings';

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
  const [loadingGroups, setLoadingGroups] = useState<boolean>(true);
  const { user } = useUser();
  const [groups, setGroups] = useState<Group[] | null>(null);

  const fetchGroups = useCallback(async () => {
    if (user) {
      try {
        const userGroups = await getGroupByUserId(user.id);
        setGroups(userGroups);
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
    <GroupsContext.Provider value={{ groups, loadingGroups, updateGroups }}>
      {children}
    </GroupsContext.Provider>
  );
}
