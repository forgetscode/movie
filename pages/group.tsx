import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSession } from '@supabase/auth-helpers-react';
import { NextPage } from 'next';
import { Loading } from '../components/Loader';
import Head from 'next/head';
import JoinGroupButton from '../components/Buttons/JoinGroupButtonForm';
import LeaveGroupButton from '../components/Buttons/LeaveGroupButton';
import CreateGroupButton from '../components/Buttons/CreateGroupButton';
import { CogIcon, UsersIcon, ClipboardCopyIcon } from '@heroicons/react/solid';
import { Disclosure, Transition } from '@headlessui/react';
import { useUser } from '../context/useUser';
import { useGroups } from '../context/useGroups';
import { notifyFailure, notifySuccess } from '../components/Toast';
import { Group, Movie } from '../typings';
import { getMoviesByGroupMovieListId } from '../utils/queries/getMoviesByGroupListId';
import GroupListCard from '../components/GroupListCard';

type GroupMoviesData = {
  
  group_id: number;
  movies: Movie[];
};

interface GroupMovieList {
  id: number;
  group_id: string;
}


function findGroupNameById(id: number, groupMovieLists: GroupMovieList[], groups: Group[]): string | null {
  const groupMovieList = groupMovieLists.find((groupMovieList) => groupMovieList.id === id);

  if (!groupMovieList) {
    return null;
  }

  const matchingGroup = groups.find((group) => group.group_id === groupMovieList.group_id);

  if (matchingGroup) {
    return matchingGroup.group_name;
  } else {
    return null;
  }
}

const Group: NextPage = () => {
  const session = useSession();
  const router = useRouter();
  const { groups, loadingGroups, updateGroups, groupMovieLists } = useGroups();
  const { user, loading, setUser } = useUser();
  const [groupMoviesData, setGroupMoviesData] = useState<GroupMoviesData[]>([]);
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    const fetchGroupMovies = async () => {
      if(groupMovieLists){
        const newGroupMoviesData: GroupMoviesData[] = [];
        for (const list of groupMovieLists) {
          const movies = await getMoviesByGroupMovieListId(list.id);
          if (movies) {
            newGroupMoviesData.push({ group_id: list.id, movies });
          }
        }
        setGroupMoviesData(newGroupMoviesData);
      }
    };
    fetchGroupMovies();
  }, [groupMovieLists, update]);

  useEffect(() => {
    if (!session && !loading) {
      router.push('/').then(() => {
      });
    }
  }, [session, router]);

  function handleClick(group:Group) {
    navigator.clipboard.writeText(group.group_id);
    notifySuccess('Group ID copied.');
  }

  if (loadingGroups || !groups || !user) {

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
      <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex items-center justify-between border-2 w-full sm:w-4/6 sm:min-w-[400px] mx-auto p-4 text-white font-black text-3xl rounded-2xl focus:outline-none group">
                <div className="flex items-center">
                  <UsersIcon className="w-10 h-10 mr-4" />
                  <p className='hidden sm:block'>Group Controls</p>
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
                <Disclosure.Panel className="w-full sm:w-4/6 mt-2 sm:min-w-[400px] mx-auto border-2 rounded-lg p-6">
                  <div className="space-y-6">
                    <CreateGroupButton userId={user.id} groups={groups} setUpdate={updateGroups}/>
                    <JoinGroupButton userId={user.id} setUpdate={updateGroups}/>
                    {
                      groups && groups.length > 0
                        ? groups.map((group, index) => (
                            <div
                            key={group.group_id}
                              className={` flex flex-col justify-between space-y-4 ${
                                index === groups.length - 1 ? 'pb-2' : 'border-b border-gray-300 pb-6'
                              }`}
                            >
                              <div className="flex flex-row">
                                <h1 className="text-2xl font-black text-white mx-auto">{group.group_name}</h1>
                              </div>
                              <div className="flex space-x-2 ml-auto">
                                  <span className="text-lg text-white font-bold">Group ID:</span>
                                  <button
                                    onClick={() => handleClick(group)}
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                  >
                                    <ClipboardCopyIcon className="w-4 h-4" />
                                  </button>
                                </div>
                              <p className="text-lg text-gray-400 pb-2">{group.group_description}</p>
                              <div>
                                <LeaveGroupButton userId={user.id} groupId={group.group_id} setUpdate={updateGroups}/>
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
      <div className='mx-auto w-full'>
        {groupMoviesData.map(({ group_id, movies }) => (
          <div key={group_id} className="pb-16">
            <p className="text-3xl font-black text-center pb-16">{groupMovieLists ? findGroupNameById(group_id, groupMovieLists!, groups):<></>}</p>
            <div
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 w-full px-4"
              style={{
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 500px))',
                justifyContent: 'center',
              }}
            >
            {movies.length === 0 ? (
              <p className='text-2xl font-black text-center'>No movies here.</p>
            ) : (
              movies.map((movie, index) => (
                <div className="pb-8" key={index}>
                  <GroupListCard movie={movie} groupMovieListId={group_id} setUpdate={setUpdate}/>
                </div>
              ))
            )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Group;
