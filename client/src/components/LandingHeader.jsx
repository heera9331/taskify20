import { useState } from "react";
import { Link } from "react-router-dom";

export default function LandingNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-10 w-full bg-white shadow-md">
      <div className="container flex items-center justify-between px-6 py-1 mx-auto">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-gray-900">
          <img
            src={"/assets/images/notify-logo.jpg"}
            width={64}
            height={64}
            alt="notify-logo"
            className="object-cover rounded-full"
          />
        </Link>

        {/* Navigation Links */}
        <div className="hidden space-x-6 md:flex">
          <Link to="#features" className="text-gray-600 hover:text-gray-900">
            Features
          </Link>
          <Link
            to="#how-it-works"
            className="text-gray-600 hover:text-gray-900"
          >
            How It Works
          </Link>
          <Link
            to="#testimonials"
            className="text-gray-600 hover:text-gray-900"
          >
            Testimonials
          </Link>
          <Link to="#contact" className="text-gray-600 hover:text-gray-900">
            Contact
          </Link>
        </div>

        {/* CTA Button */}
        <div className="hidden md:block">
          <Link
            to="/auth"
            className="px-4 py-2 text-white transition bg-gray-900 rounded-md hover:bg-gray-700"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-900 focus:outline-none"
          >
            {/* Hamburger Icon */}
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="bg-white border-t border-gray-200 md:hidden">
          <Link
            to="#features"
            className="block px-6 py-2 text-gray-600 hover:bg-gray-50"
          >
            Features
          </Link>
          <Link
            to="#how-it-works"
            className="block px-6 py-2 text-gray-600 hover:bg-gray-50"
          >
            How It Works
          </Link>
          <Link
            to="#testimonials"
            className="block px-6 py-2 text-gray-600 hover:bg-gray-50"
          >
            Testimonials
          </Link>
          <Link
            to="#contact"
            className="block px-6 py-2 text-gray-600 hover:bg-gray-50"
          >
            Contact
          </Link>
          <Link
            to="/auth"
            className="block px-6 py-2 text-center text-white transition bg-gray-900 hover:bg-gray-700"
          >
            Get Started
          </Link>
        </div>
      )}
    </nav>
  );
}
