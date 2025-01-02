import { Outlet, Link } from "react-router-dom";
import { UserProvider } from "@/contexts/user-context";
// import MainSidebar from "@/components/sidebar";
import { Toaster } from "@/components/ui/sonner";

const AppLayout = () => {
  return (
    <UserProvider>
      <div className="w-full">
        {/* Sidebar */}
        {/* <MainSidebar /> */}
        <div className="flex">
          <aside className="min-w-[256px] p-6">
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

          {/* Main Content */}
          <main className="w-screen min-h-screen overflow-auto bg-gray-100">
            <Outlet />
          </main>
        </div>

        {/* Toaster */}

        {/* Footer */}
        <footer className="bottom-0 w-full py-2 text-center text-gray-500 bg-gray-50">
          Designed by Heera Singh
        </footer>
      </div>
      <Toaster />
    </UserProvider>
  );
};

export default AppLayout;
