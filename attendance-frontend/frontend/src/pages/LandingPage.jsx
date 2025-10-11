// src/pages/LandingPage.jsx
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden section-container">
        <div className="max-w-full mx-auto">
          <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:pb-28 xl:pb-32">
            <main className="mt-16 mx-auto max-w-full px-4 sm:mt-20 sm:px-6 md:mt-24 lg:mt-28 lg:px-8 xl:mt-32">
              <div className="text-center">
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
                  <span className="block xl:inline">Welcome to</span>{' '}
                  <span className="block text-primary-600 dark:text-primary-400 xl:inline">EduTrack</span>
                </h1>
                <p className="mt-6 text-lg text-gray-500 dark:text-gray-300 sm:text-xl max-w-3xl mx-auto">
                  Professional attendance management system for educational institutions. 
                  Streamline your academic tracking with our modern, intuitive platform.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    to="/student"
                    className="w-full sm:w-auto flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 md:py-4 md:text-lg md:px-10 transition-all duration-200"
                  >
                    Student Portal
                  </Link>
                  <Link
                    to="/faculty"
                    className="w-full sm:w-auto flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-primary-700 dark:text-primary-300 bg-primary-100 dark:bg-primary-900 hover:bg-primary-200 dark:hover:bg-primary-800 md:py-4 md:text-lg md:px-10 transition-all duration-200"
                  >
                    Faculty Portal
                  </Link>
                </div>
              </div>
            </main>
          </div>
        </div>
        
        {/* Background Pattern */}
        <div className="absolute inset-0 -z-10">
          <div className="h-full w-full bg-gradient-to-br from-primary-50 to-accent-50 dark:from-primary-900/10 dark:to-accent-900/10"></div>
          <div className="absolute inset-0 opacity-20">
            <div className="h-full w-full" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}></div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-gray-50 dark:bg-gray-900 section-container">
        <div className="max-w-full mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
          <div className="lg:text-center">
            <h2 className="text-base text-primary-600 dark:text-primary-400 font-semibold tracking-wide uppercase">Features</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Everything you need for attendance management
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-300 lg:mx-auto">
              Our platform provides comprehensive tools for managing student attendance efficiently.
            </p>
          </div>

          <div className="mt-10">
            <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
              <div className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white">
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900 dark:text-white">Real-time Tracking</p>
                <p className="mt-2 ml-16 text-base text-gray-500 dark:text-gray-300">
                  Monitor attendance in real-time with instant updates and notifications.
                </p>
              </div>

              <div className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white">
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900 dark:text-white">Analytics & Reports</p>
                <p className="mt-2 ml-16 text-base text-gray-500 dark:text-gray-300">
                  Generate detailed reports and analytics to track student performance.
                </p>
              </div>

              <div className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white">
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                  </svg>
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900 dark:text-white">Multi-User Support</p>
                <p className="mt-2 ml-16 text-base text-gray-500 dark:text-gray-300">
                  Separate portals for students and faculty with role-based access control.
                </p>
              </div>

              <div className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white">
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900 dark:text-white">User-Friendly Interface</p>
                <p className="mt-2 ml-16 text-base text-gray-500 dark:text-gray-300">
                  Intuitive design with modern UI/UX for seamless user experience.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary-50 dark:bg-gray-800 section-container">
        <div className="max-w-4xl mx-auto text-center py-20 px-6 sm:py-24 sm:px-8 lg:px-12 xl:px-16">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            <span className="block">Ready to get started?</span>
            <span className="block text-primary-600 dark:text-primary-400">Choose your portal below.</span>
          </h2>
          <p className="mt-4 text-lg leading-6 text-gray-500 dark:text-gray-300">
            Access your attendance records and manage your academic journey with ease.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/student"
              className="btn-primary"
            >
              Student Portal
            </Link>
            <Link
              to="/faculty"
              className="btn-secondary"
            >
              Faculty Portal
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
