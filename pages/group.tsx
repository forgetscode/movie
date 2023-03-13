import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession } from '@supabase/auth-helpers-react';
import { NextPage } from 'next';
import { Loading } from '../components/Loader';
import getUserInfobyAuthId from '../utils/queries/getUserInfoByAuthId';
import getGroupByUserId from '../utils/queries/getGroupByUserId';
import Head from 'next/head';
import JoinGroupButton from '../components/Buttons/JoinGroupButtonForm';
import LeaveGroupButton from '../components/Buttons/LeaveGroupButton';
import { Toaster } from 'react-hot-toast';

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
  const [isJoining, setIsJoining] = useState(false)

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
  }, [session, isJoining, groups]);

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
    <div className="relative h-full flex-col items-center justify-center py-2">
      <Head>
        <title>Movie Night</title>
        <link rel="icon" href="https://www.svgrepo.com/show/468899/film-roll.svg" />
      </Head>
      <main className="flex h-full w-full flex-1 flex-col px-20 text-center pt-20 space-y-6">
        <Toaster/>
        <h2 className="text-6xl font-black text-white pb-16">Groups</h2>
        {
            groups && groups.length > 0 
            ? 
            groups && groups.map((group, index) => (
              <div className="group-card bg-gray-800 rounded-lg shadow-lg p-6 flex flex-col justify-between">
                <div className='space-y-4'>
                  <h1 className="text-2xl font-bold text-white mb-2">{group.group_name}</h1>
                  <h1 className="text-2xl font-bold text-white mb-2">{group.group_id}</h1>
                  <p className="text-lg text-gray-400">{group.group_description}</p>
                  <LeaveGroupButton userId={user.id} groupId={group.group_id} />
                </div>
              </div>
            ))
            :
            <>
            <p className='text-white text-2xl font-black pb-16'> {`You aren't part of a group but you can join one below by entering the group ID.`}</p>
            </>
        }
        <JoinGroupButton userId={user.id} />
      </main>
    </div>
  );
};

export default Group;
