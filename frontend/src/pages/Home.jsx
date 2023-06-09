import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector} from 'react-redux'
import { useEffect } from "react";
import MainLogo from "../assets/main-logo.png"
import Monitoring from "../assets/monitoring.png"

export default function Home() {

  const navigate = useNavigate()
  const {user} = useSelector((state) => state.auth)

  useEffect(() => {
    if(user){
      navigate("student/dashboard")
    }
  },[user, navigate])

  return (
    <>
      <div className="relative overflow-hidden min-h-screen bg-white bg-fixed">
        <div className="mx-auto max-w-7xl">
          <div className="relative z-10 bg-white pb-8 sm:pb-16 md:pb-20 lg:w-full lg:h-screen lg:max-w-2xl lg:pb-28 xl:pb-32">
            <Popover>
              <div className="relative px-4 pt-6 sm:px-6 lg:px-8">
                <nav
                  className="relative flex items-center justify-between sm:h-10 lg:justify-start"
                  aria-label="Global"
                >
                  <div className="flex flex-shrink-0 flex-grow items-center lg:flex-grow-0">
                    <div className="flex w-full items-center justify-between md:w-auto">
                      <a href="/">
                        <span className="sr-only">Work Tracker</span>
                        <img className="assignment-pic" src={MainLogo} height={100} width={70} alt="" />
                      </a>
                      <div className="-mr-2 flex items-center md:hidden">
                        <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-teal-500">
                          <span className="sr-only">Open main menu</span>
                          <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                        </Popover.Button>
                      </div>
                    </div>
                  </div>
                  <div className="hidden md:ml-10 md:block md:space-x-8 md:pr-4">
                  <h1 className="text-3xl font-mono font-bold tracking-normal text-slate-900 sm:text-3xl md:text-4xl">
                  
                  FLIPR <span className="font-light"> EMPLOYEE MONITORING </span>
                      </h1>
                  </div>
                </nav>
              </div>

              <Transition
                as={Fragment}
                enter="duration-150 ease-out"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="duration-100 ease-in"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Popover.Panel
                  focus
                  className="absolute inset-x-0 top-0 z-10 origin-top-right transform p-2 transition md:hidden"
                >
                  <div className="overflow-hidden rounded-lg bg-white shadow-md ring-1 ring-black ring-opacity-5">
                    <div className="flex items-center justify-between px-5 pt-4">
                      <div>
                        <img
                          className="h-8 w-auto"
                          src={MainLogo}
                          alt=""
                        />
                      </div>
                      <div className="-mr-2">
                        <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-teal-500">
                          <span className="sr-only">Close main menu</span>
                          <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                        </Popover.Button>
                      </div>
                    </div>
                    <div className="space-y-1 flex justify-center px-2 pt-2 pb-3">
                      <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-3xl md:text-3xl">
                        {/* CHAITANYA BHARATHI INSTITUTE OF TECHNOLOGY (A) */}
                        Flipr Employee Monitoring
                      </h1>
                    </div>
                    <a
                      href="/login"
                      className="block w-full bg-gray-50 px-5 py-3 text-center font-medium text-teal-600 hover:bg-gray-100"
                    >
                      Log in
                    </a>
                  </div>
                </Popover.Panel>
              </Transition>
            </Popover>
            <main className="mx-auto mt-10 max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block xl:inline">Employee Work Monitoring</span>{" "}
                  <span className="block text-teal-600 xl:inline">
                    Made easy for you
                  </span>
                </h1>
                <p className="mt-3 text-base text-gray-500 sm:mx-auto sm:mt-5 sm:max-w-xl sm:text-lg md:mt-5 md:text-xl lg:mx-0">
                  Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure
                  qui lorem cupidatat commodo. Elit sunt amet fugiat veniam
                  occaecat fugiat aliqua.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <a
                      href="/login"
                      className="flex w-full items-center justify-center rounded-md border border-transparent bg-teal-600 px-8 py-3 text-base font-medium text-white hover:bg-teal-700 md:py-4 md:px-10 md:text-lg"
                    >
                      Login to Get Started
                    </a>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
        <div className="lg:absolute lg:top-0 lg:inset-y-0 lg:right-0 lg:w-1/2 ">
        <img
          className="absolute object-contain -mt-14 top-0 sm:h-72 md:h-96 lg:h-full lg:w-full"
          src={Monitoring}
          alt=""
        />
      </div>
      </div>
      <Outlet/>
    </>
  );
}
