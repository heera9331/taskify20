import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";

import SignInForm from "@/components/SignInForm";
import SignUpForm from "@/components/SignUpForm";

function AuthPage() {
  return (
    <>
      <main className="flex flex-col items-center row-start-2 gap-8 sm:items-start">
        <Tabs
          defaultValue="signin"
          className="w-[400px] bg-gray-50 rounded-xl min-h-fit-content p-8 shadow-lg transition-all delay-200"
        >
          <TabsList className="flex gap-2 mb-4 rounded-lg">
            <TabsTrigger
              value="signin"
              className="p-2 rounded-lg data-[state=active]:bg-gray-100 "
            >
              Sign In
            </TabsTrigger>
            <TabsTrigger
              value="signup"
              className="p-2 rounded-lg data-[state=active]:bg-gray-100 "
            >
              Sign Up
            </TabsTrigger>
          </TabsList>

          {/* Sign In Form */}
          <TabsContent value="signin" className="space-y-4">
            <SignInForm />
          </TabsContent>

          {/* Sign Up Form */}
          <TabsContent value="signup" className="space-y-4">
            <SignUpForm />
          </TabsContent>
        </Tabs>
      </main>
      <footer className="flex flex-wrap items-center justify-center row-start-3 gap-6"></footer>
    </>
  );
}

export default AuthPage;
