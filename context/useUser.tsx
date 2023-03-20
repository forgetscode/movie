import { useSession } from "@supabase/auth-helpers-react";
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import getUserInfobyAuthId from "../utils/queries/getUserInfoByAuthId";
import createNewUser from "../utils/mutations/createUser";
import { User, UserContextType } from "../typings";

const UserContext = createContext<UserContextType | undefined>(undefined);

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}

type UserProviderProps = {
  children: React.ReactNode;
};

export function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const session = useSession();

  const memoizedSetUser = useCallback(async () => {
    if (session && session.user) {
      setLoading(true);
      try {
        const userData = await getUserInfobyAuthId(session.user.id);
        if (userData?.id === '-1') {
          await createNewUser(session.user.id);
          const userData = await getUserInfobyAuthId(session.user.id);
          setUser(userData);
        } else {
          setUser(userData);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
      setLoading(false);
    } else {
      setUser(null);
      setLoading(false);
    }
  }, [session]);

  useEffect(() => {
    memoizedSetUser();
  }, [memoizedSetUser]);

  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  );
}
