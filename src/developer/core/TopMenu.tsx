import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { BellIcon, CloudUploadIcon, LightningBoltIcon, MenuAlt2Icon } from '@heroicons/react/outline';
import { Link } from 'react-router-dom';

import { ROUTES } from '../utils/routing';
import { publishRelease } from '../releases/api';
import ReleaseOverview from '../releases/ReleaseOverview';

export default function TopMenu() {

    const handlePublishRelease = () => {
        publishRelease();
    }

    return (
        <div className='top-0 z-10 flex-shrink-0 flex h-16 bg-white border-200 border-b'>
            <button
                type='button'
                className='px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary md:hidden'
                onClick={() => { }}
            >
                <span className='sr-only'>Open sidebar</span>
                <MenuAlt2Icon className='h-6 w-6' aria-hidden='true' />
            </button>
            <div className='flex-1 px-4 flex justify-between'>
                <div className='flex-1 flex'></div>
                <div className='mr-4 ml-4 flex items-center md:ml-6'>
                    <button
                        type='button'
                        onClick={handlePublishRelease}
                        className='bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary'
                    >
                        <LightningBoltIcon className='h-6 w-6' aria-hidden='true' />
                    </button>
                    <ReleaseOverview />
                    <Link
                        to={ROUTES.release.tree}
                        className='bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary'
                    >
                        <CloudUploadIcon className='h-6 w-6' aria-hidden='true' />
                    </Link>
                    <button
                        type='button'
                        className='bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary'
                    >
                        <BellIcon className='h-6 w-6' aria-hidden='true' />
                    </button>

                    {/* Profile dropdown */}
                    <Menu as='div' className='ml-3 relative'>
                        <div>
                            <Menu.Button className='max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary'>
                                <span className='sr-only'>Open user menu</span>
                                <img
                                    className='h-8 w-8 rounded-full'
                                    src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
                                    alt=''
                                />
                                {/* <div class='ml-2 text-left'>
                                    <div class='text-sm font-semibold text-gray-900'>Max Wilkinson</div>
                                    <div class='text-xs font-semibold text-gray-500'>max.wilkinson@email.com</div>
                                </div> */}
                            </Menu.Button>
                        </div>
                        <Transition
                            as={Fragment}
                            enter='transition ease-out duration-100'
                            enterFrom='transform opacity-0 scale-95'
                            enterTo='transform opacity-100 scale-100'
                            leave='transition ease-in duration-75'
                            leaveFrom='transform opacity-100 scale-100'
                            leaveTo='transform opacity-0 scale-95'
                        >
                            <Menu.Items className='origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none'>
                                <button
                                    key='logout'
                                    // onClick={logoutHandler}
                                    className='block px-4 py-2 text-sm text-gray-700'
                                >
                                    Logout
                                </button>
                            </Menu.Items>
                        </Transition>
                    </Menu>
                </div>
            </div>
        </div >
    );
}
