import {classNames} from "../../helper/className";
import {Disclosure, Menu, Transition} from "@headlessui/react";
import {BellIcon, MenuIcon, XIcon} from "@heroicons/react/outline";
import React, {Fragment} from "react";
import {data} from "./navbar.data";
import Link from "next/link";
import {useRouter} from "next/router";
import {useCookies} from "react-cookie";
import {USER_COOKIES} from "../../../auth/constant/cookie";
import {LOGIN_ROUTE} from "../../constant/route";
import {useUser} from "../../../auth/hook/useUser";


function Navbar() {
    const router = useRouter()

    const {user, fetching} = useUser()

    const [, , removeCookie] = useCookies([USER_COOKIES])

    const handleLogout = async () => {
        removeCookie(USER_COOKIES)
        await router.push(LOGIN_ROUTE)
    }

    return <Disclosure as="nav" className="bg-indigo-600 border-b border-indigo-300 border-opacity-25 lg:border-none">
        {({open}) => (
            <>
                <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
                    <div
                        className="relative h-16 flex items-center justify-between lg:border-b lg:border-indigo-400 lg:border-opacity-25">
                        <div className="px-2 flex items-center lg:px-0">
                            <div className="flex-shrink-0">
                                <img
                                    className="block h-8 w-8"
                                    src="https://tailwindui.com/img/logos/workflow-mark-indigo-300.svg"
                                    alt="Workflow"
                                />
                            </div>
                            <div className="hidden lg:block lg:ml-10">
                                <div className="flex space-x-4">
                                    {data.navigation.map((item, key) => (
                                        <Link key={key} href={item.href}>
                                            <a
                                                key={item.label}
                                                className={classNames(
                                                    router.pathname === item.href
                                                        ? 'bg-indigo-700 text-white'
                                                        : 'text-white hover:bg-indigo-500 hover:bg-opacity-75',
                                                    'rounded-md py-2 px-3 text-sm font-medium'
                                                )}
                                                aria-current={router.pathname === item.href ? 'page' : undefined}
                                            >
                                                {item.label}
                                            </a>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="flex lg:hidden">
                            {/* Mobile menu button */}
                            <Disclosure.Button
                                className="bg-indigo-600 p-2 rounded-md inline-flex items-center justify-center text-indigo-200 hover:text-white hover:bg-indigo-500 hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-600 focus:ring-white">
                                <span className="sr-only">Open main menu</span>
                                {open ? (
                                    <XIcon className="block h-6 w-6" aria-hidden="true"/>
                                ) : (
                                    <MenuIcon className="block h-6 w-6" aria-hidden="true"/>
                                )}
                            </Disclosure.Button>
                        </div>
                        <div className="hidden lg:block lg:ml-4">
                            <div className="flex items-center">
                                <button
                                    type="button"
                                    className="bg-indigo-600 flex-shrink-0 rounded-full p-1 text-indigo-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-600 focus:ring-white"
                                >
                                    <span className="sr-only">View notifications</span>
                                    <BellIcon className="h-6 w-6" aria-hidden="true"/>
                                </button>

                                {/* Profile dropdown */}
                                <Menu as="div" className="ml-3 relative flex-shrink-0">
                                    <div>
                                        <Menu.Button
                                            className="bg-indigo-600 rounded-full flex text-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-600 focus:ring-white">
                                            <span className="sr-only">Open user menu</span>
                                            <img className="rounded-full h-8 w-8"
                                                 src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                                 alt=""/>
                                        </Menu.Button>
                                    </div>
                                    <Transition
                                        as={Fragment}
                                        enter="transition ease-out duration-100"
                                        enterFrom="transform opacity-0 scale-95"
                                        enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-75"
                                        leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95"
                                    >
                                        <Menu.Items
                                            className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                            {/**data.userNavigation.map((item,key) => (
                                                <Menu.Item key={key}>
                                                    {({active}) => (
                                                        <a
                                                            href={item.href}
                                                            className={classNames(
                                                                active ? 'bg-gray-100' : '',
                                                                'block py-2 px-4 text-sm text-gray-700'
                                                            )}
                                                        >
                                                            {item.label}
                                                        </a>
                                                    )}
                                                </Menu.Item>
                                            ))*/}
                                            <button
                                                onClick={handleLogout}
                                                className="block py-2 px-4 text-sm text-gray-700"
                                            >
                                                Sign out
                                            </button>
                                        </Menu.Items>
                                    </Transition>
                                </Menu>
                            </div>
                        </div>
                    </div>
                </div>

                <Disclosure.Panel className="lg:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1">

                        {data.navigation.map((item,key) => (
                            <Link key={key} href={item.href}>
                                <Disclosure.Button
                                    key={item.label}
                                    as="a"
                                    href={item.href}
                                    className={classNames(
                                        router.pathname === item.href
                                            ? 'bg-indigo-700 text-white'
                                            : 'text-white hover:bg-indigo-500 hover:bg-opacity-75',
                                        'block rounded-md py-2 px-3 text-base font-medium'
                                    )}
                                    aria-current={router.pathname === item.href ? 'page' : undefined}
                                >
                                    {item.label}
                                </Disclosure.Button>
                            </Link>
                        ))}
                    </div>
                    {user && <div className="pt-4 pb-3 border-t border-indigo-700">
                        <div className="px-5 flex items-center">
                            <div className="flex-shrink-0">
                                <img className="rounded-full h-10 w-10"
                                     src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                     alt=""/>
                            </div>
                            <div className="ml-3">
                                <div className="text-base font-medium text-white">{user.username}</div>
                                <div className="text-sm font-medium text-indigo-300">{user.email}</div>
                            </div>
                        </div>
                        <div className="mt-3 px-2 space-y-1">
                            {/*data.userNavigation.map((item,key) => (
                                <Disclosure.Button
                                    key={key}
                                    as="a"
                                    href={item.href}
                                    className="block rounded-md py-2 px-3 text-base font-medium text-white hover:bg-indigo-500 hover:bg-opacity-75"
                                >
                                    {item.label}
                                </Disclosure.Button>
                            ))*/}
                            <button
                                onClick={handleLogout}
                                className="block rounded-md py-2 px-3 text-base font-medium text-white hover:bg-indigo-500 hover:bg-opacity-75"
                            >
                                Sign out
                            </button>
                        </div>
                    </div>}
                    {fetching && "loading..."}
                </Disclosure.Panel>
            </>
        )}
    </Disclosure>
}

export default Navbar