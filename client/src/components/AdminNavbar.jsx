import React from 'react';
import { Menu, User } from 'lucide-react';

const AdminNavbar = () => {
  return (
    <header className="w-full bg-white shadow-md px-4 py-3 flex justify-between items-center  z-10">
      <div className="flex items-center gap-2">
        <Menu className="lg:hidden cursor-pointer" />
        <h1 className="font-semibold text-xl sm:text-2xl">Admin Panel</h1>
      </div>

      <div className="flex items-center gap-3">
        <User />
        <div className="text-xs sm:text-sm text-right">
          <p className="font-semibold">Admin Name</p>
          <p className="text-gray-500">admin@gmail.com</p>
        </div>
      </div>
    </header>
  );
};

export default AdminNavbar;
