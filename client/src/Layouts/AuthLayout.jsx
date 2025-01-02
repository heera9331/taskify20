import { Outlet } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";

const AuthLayout = () => {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-center min-h-screen gap-16">
      <Outlet />
      <Toaster />
    </div>
  );
};

export default AuthLayout;
