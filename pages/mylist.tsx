import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession } from '@supabase/auth-helpers-react';
import { NextPage } from 'next';
import { Loading } from '../components/Loader';
import getUserInfobyAuthId from '../utils/queries/getUserInfoByAuthId';
import Head from 'next/head';
import JoinGroupButton from '../components/Buttons/JoinGroupButtonForm';
import LeaveGroupButton from '../components/Buttons/LeaveGroupButton';
import { Toaster } from 'react-hot-toast';
import CreateGroupButton from '../components/Buttons/CreateGroupButton';
import { CogIcon, UsersIcon, ClipboardCopyIcon } from '@heroicons/react/solid';
import { Disclosure, Transition } from '@headlessui/react';

type User = {
    id: string;
    name: string;
    auth_id: string;
  };

const MyList: NextPage = () => {
  const session = useSession();
  const router = useRouter();
  const [user, setUser] = useState<User | undefined | null>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (session && session.user?.id) {
      const fetchData = async () => {
        const userData = await getUserInfobyAuthId(session.user.id);
        setUser(userData);
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

  if (loading || !user) {
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
    </div>
  );
};

export default MyList;
