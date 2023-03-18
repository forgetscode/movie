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
import CreateGroupButton from '../components/Buttons/CreateGroupButton';
import { CogIcon, UsersIcon, PlusIcon, MinusIcon } from '@heroicons/react/solid';
import { Disclosure, Transition } from '@headlessui/react';

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
  const [isOpen, setIsOpen] = useState(false);
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
      <main className="flex h-full w-full flex-1 flex-col px-20 text-center space-y-6 pb-16">
        <Toaster/>
      <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex items-center justify-between border-2 w-4/6 min-w-[400px] mx-auto p-4 text-white font-black text-3xl rounded-2xl focus:outline-none group">
                <div className="flex items-center">
                  <UsersIcon className="w-10 h-10 mr-4" />
                  Group Settings
                </div>
                <CogIcon className="w-8 h-8 group-hover:animate-spin" />
              </Disclosure.Button>
              <Transition
                show={open}
                enter="transition ease-out duration-300"
                enterFrom="transform opacity-0 -translate-y-4"
                enterTo="transform opacity-100 translate-y-0"
                leave="transition ease-in duration-300"
                leaveFrom="transform opacity-100 translate-y-0"
                leaveTo="transform opacity-0 -translate-y-4"
              >
                <Disclosure.Panel className="w-4/6 mt-2 min-w-[400px] mx-auto border-2 rounded-lg p-4">
                  <div className="space-y-6">
                    {/* Create Group Section */}
                    <CreateGroupButton userId={user.id} groups={groups} />
                    {/* Join Group Section */}
                    <JoinGroupButton userId={user.id} />
                    {
                      groups && groups.length > 0
                        ? groups.map((group, index) => (
                            <div
                              className={` flex flex-col justify-between space-y-4 ${
                                index === groups.length - 1 ? '' : 'border-b border-gray-300 pb-6'
                              }`}
                            >
                              <div className="flex justify-between items-center">
                                <h1 className="text-2xl font-black text-white">{group.group_name}</h1>
                                <div className="flex items-center space-x-2">
                                  <span className="text-lg text-white font-bold">Group ID:</span>
                                  <button
                                    onClick={() => navigator.clipboard.writeText(group.group_id)}
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                  >
                                    <PlusIcon className="w-4 h-4" />
                                  </button>
                                </div>
                              </div>
                              <p className="text-lg text-gray-400 pb-2">{group.group_description}</p>
                              <div>
                                <LeaveGroupButton userId={user.id} groupId={group.group_id} />
                              </div>
                            </div>
                          ))
                        : null
                    }
                  </div>
                </Disclosure.Panel>
              </Transition>
            </>
          )}
        </Disclosure>


      </main>
    </div>
  );
};

export default Group;
