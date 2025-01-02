import { Link } from "react-router-dom"; 
import { UsersRound, Hourglass, Pyramid } from "lucide-react";

export default function Landing() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="flex flex-col justify-center min-h-screen main-bg">
        <div className="container px-6 mx-auto lg:px-10">
          <h1 className="pb-6 text-5xl font-bold leading-snug text-white lg:text-7xl sp">
            Notify brings <br />
            all your managers, <br />
            notes, and tasks <br />
            together
          </h1>
          <p className="w-full mb-8 text-xl text-gray-100 lg:text-2xl lg:w-1/2">
            Keep everything in the same place—even if your team isn’t.
          </p>
          <button className="px-6 py-3 text-lg text-white transition bg-gray-900 rounded-md hover:bg-gray-700">
            <Link to={"/auth"}>Get Started for Free</Link>
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white" id="features">
        <div className="container px-6 mx-auto lg:px-10">
          <h2 className="mb-10 text-4xl font-semibold text-gray-800">
            Features
          </h2>
          <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
            <div className="p-6 transition rounded-lg shadow-sm bg-gray-50 hover:shadow-md">
              <h3 className="flex items-center gap-2 mb-3 text-2xl font-medium">
                <span>
                  <UsersRound />
                </span>
                Collaborate
              </h3>
              <p className="text-gray-600">
                Work seamlessly with team members to manage tasks and notes
                efficiently.
              </p>
            </div>
            <div className="p-6 transition rounded-lg shadow-sm bg-gray-50 hover:shadow-md">
              <h3 className="flex items-center gap-2 mb-3 text-2xl font-medium">
                <span>
                  <Pyramid />
                </span>
                Organize
              </h3>
              <p className="text-gray-600">
                Keep everything neatly organized in one place, accessible at any
                time.
              </p>
            </div>
            <div className="p-6 transition rounded-lg shadow-sm bg-gray-50 hover:shadow-md">
              <h3 className="flex items-center gap-2 mb-3 text-2xl font-medium">
                <span>
                  <Hourglass />
                </span>
                Track
              </h3>
              <p className="text-gray-600">
                Monitor your team’s progress and track deadlines with ease.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gray-50" id="how-it-works">
        <div className="container px-6 mx-auto lg:px-10">
          <h2 className="mb-10 text-4xl font-semibold text-center text-gray-800">
            How It Works
          </h2>
          <div className="grid grid-cols-1 gap-10 text-center md:grid-cols-3">
            <div>
              <div className="mb-4 text-5xl">1</div>
              <h3 className="mb-2 text-xl font-medium">Sign Up</h3>
              <p>Create an account and set up your workspace.</p>
            </div>
            <div>
              <div className="mb-4 text-5xl">2</div>
              <h3 className="mb-2 text-xl font-medium">Add Tasks</h3>
              <p>Organize tasks, notes, and teams in one place.</p>
            </div>
            <div>
              <div className="mb-4 text-5xl">3</div>
              <h3 className="mb-2 text-xl font-medium">Collaborate</h3>
              <p>Start collaborating with your team seamlessly.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-white" id="testimonials">
        <div className="container px-6 mx-auto text-center lg:px-10">
          <h2 className="mb-10 text-4xl font-semibold text-gray-800">
            Why Choose Us?
          </h2>
          <p className="w-full mx-auto mb-8 text-lg text-gray-600 lg:w-3/4">
            Our platform is designed to simplify your workflow and help you stay
            productive.
          </p>
          <div className="flex flex-wrap justify-center gap-8">
            <div className="w-64 p-6 rounded-lg shadow-md bg-gray-50">
              <h3 className="mb-3 text-xl font-medium">Fast</h3>
              <p>Lightning-fast performance.</p>
            </div>
            <div className="w-64 p-6 rounded-lg shadow-md bg-gray-50">
              <h3 className="mb-3 text-xl font-medium">Secure</h3>
              <p>Top-notch security for your data.</p>
            </div>
            <div className="w-64 p-6 rounded-lg shadow-md bg-gray-50">
              <h3 className="mb-3 text-xl font-medium">Reliable</h3>
              <p>Guaranteed uptime for your work.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50" id="contact">
        <div className="container px-6 mx-auto lg:px-10">
          <h2 className="mb-10 text-4xl font-semibold text-center text-gray-800">
            What Our Users Say
          </h2>
          <div className="flex flex-wrap justify-center gap-8">
            <div className="w-full p-6 bg-white rounded-lg shadow-md md:w-1/3">
              <p className="mb-4 italic">
                “This platform has completely revolutionized the way our team
                works. Highly recommended!”
              </p>
              <h4 className="font-medium text-gray-700">- Alex Johnson</h4>
            </div>
            <div className="w-full p-6 bg-white rounded-lg shadow-md md:w-1/3">
              <p className="mb-4 italic">
                “Incredible user experience and productivity tools. It’s a
                must-have for any team.”
              </p>
              <h4 className="font-medium text-gray-700">- Sarah Williams</h4>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 text-center text-white bg-gray-900">
        <h2 className="mb-6 text-4xl font-semibold">Ready to Get Started?</h2>
        <p className="mb-8 text-lg">
          Sign up today and transform how your team works.
        </p>
        <button className="px-6 py-3 text-lg text-gray-900 transition bg-white rounded-md hover:bg-gray-300">
          <Link to="/auto">Get Started Now</Link>
        </button>
      </section>

      {/* Footer */}
      <footer className="py-6 text-center text-white bg-gray-900">
        <p>&copy; {new Date().getFullYear()} Notify. All rights reserved.</p>
      </footer>
    </div>
  );
}
