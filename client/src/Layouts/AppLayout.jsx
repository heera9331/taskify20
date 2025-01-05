import { Outlet, Link } from "react-router-dom";
import { UserProvider } from "@/contexts/user-context";
import { Toaster } from "@/components/ui/sonner";
import { useState } from "react";

const AppLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <UserProvider>
      <div className="w-full">
        {/* Mobile Header */}
        <header className="flex items-center justify-between p-4 bg-gray-50 md:hidden">
          <h1 className="text-lg font-semibold">App</h1>
          <button
            className="p-2 bg-gray-100 rounded-md hover:bg-gray-200"
            onClick={toggleSidebar}
            aria-label="Toggle Sidebar"
          >
            {/* Hamburger Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 5.25h16.5M3.75 12h16.5M3.75 18.75h16.5"
              />
            </svg>
          </button>
        </header>

        <div className="flex">
          {/* Sidebar */}
          <aside
            className={`fixed inset-y-0 left-0 z-50 w-64 p-6 bg-white transform md:static md:translate-x-0 ${
              isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            } transition-transform duration-300 ease-in-out`}
          >
            <button
              className="block mb-4 text-gray-500 md:hidden hover:text-gray-700"
              onClick={toggleSidebar}
            >
              Close
            </button>
            <ul className="flex flex-col gap-2">
              <li className="w-full p-2 rounded-md bg-gray-50 hover:bg-gray-100">
                <Link className="block w-full" to={"/home"}>
                  Home
                </Link>
              </li>
              <li className="w-full p-2 rounded-md bg-gray-50 hover:bg-gray-100">
                <Link className="block w-full" to={"/all-categories"}>
                  Categories
                </Link>
              </li>
              <li className="w-full p-2 rounded-md bg-gray-50 hover:bg-gray-100">
                <Link className="block w-full" to={"/tasks"}>
                  Tasks
                </Link>
              </li>
              <li className="w-full p-2 rounded-md bg-gray-50 hover:bg-gray-100">
                <Link className="block w-full" to={"/notes"}>
                  Notes
                </Link>
              </li>
              <li className="w-full p-2 rounded-md bg-gray-50 hover:bg-gray-100">
                <Link className="block w-full" to={"/auth"}>
                  Logout
                </Link>
              </li>
            </ul>
          </aside>

          {/* Overlay for Sidebar */}
          {isSidebarOpen && (
            <div
              className="fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden"
              onClick={toggleSidebar}
            ></div>
          )}

          {/* Main Content */}
          <main className="w-full min-h-screen overflow-auto bg-gray-100">
            <Outlet />
          </main>
        </div>

        {/* Footer */}
        <footer className="bottom-0 w-full py-2 text-center text-gray-500 bg-gray-50">
          Designed by Heera Singh
        </footer>
        <Toaster />
      </div>
    </UserProvider>
  );
};

export default AppLayout;
