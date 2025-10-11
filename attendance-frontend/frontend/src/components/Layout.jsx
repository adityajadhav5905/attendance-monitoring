import React from "react";

const Layout = ({ children }) => (
  <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
    <div className="flex flex-col">
      <main className="flex-1">
        <div className="max-w-full mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 py-8">
          {children}
        </div>
      </main>
    </div>
  </div>
);

export default Layout;

