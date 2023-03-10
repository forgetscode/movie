import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession } from '@supabase/auth-helpers-react';
import { NextPage } from 'next';
import { Loading } from '../components/Loader';
import getUserInfobyAuthId from '../utils/queries/getUserInfoByAuthId';
import getGroupByUserId from '../utils/queries/getGroupByUserId';
import Head from 'next/head';

type User = {
  id: string;
  name: string;
  auth_id: string;
};

type Group = {
  group_id: string;
  group_name: string;
  group_description: string;
};

const Group: NextPage = () => {
  const session = useSession();
  const router = useRouter();
  const [user, setUser] = useState<User | undefined | null>();
  const [groups, setGroups] = useState<Group[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (session && session.user?.id) {
      const fetchData = async () => {
        const userData = await getUserInfobyAuthId(session.user.id);
        setUser(userData);
        const userGroups = await getGroupByUserId(userData?.id!);
        setGroups(userGroups);
        setLoading(false);
      };
      fetchData();
    }
    if (!session){
        setLoading(false);
    }
  }, [session]);

  useEffect(() => {
    if (!loading && !session) {
      router.push('/');
    }
  }, [loading, session, router]);

  if (loading || !groups || !user) {
    return (
      <div className="relative h-screen flex-col items-center justify-center py-2">
        <Head>
          <title>Movie Night</title>
          <link rel="icon" href="https://www.svgrepo.com/show/468899/film-roll.svg" />
        </Head>
        <main className="flex h-full w-full flex-1 flex-col items-center justify-center px-20 text-center">
          <Loading />
        </main>
      </div>
    );
  }

  return (
    <div className="relative h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Movie Night</title>
        <link rel="icon" href="https://www.svgrepo.com/show/468899/film-roll.svg" />
      </Head>
      <main className="flex h-full w-full flex-1 flex-col px-20 text-center pt-20 space-y-6">
        <h2 className="text-6xl text-white">Header</h2>
        {
            groups 
            ? 
            groups && groups.map((group, index) => (
                <div className="space-y-2" key={index}>
                    <h1 className='text-2xl text-white'>{group.group_name}</h1>
                    <p className='text-2xl text-white'>{group.group_description}</p>
                </div>
            ))
            :<p> {`No groups friend .. :(`}</p>
        }
      </main>
    </div>
  );
};

export default Group;
