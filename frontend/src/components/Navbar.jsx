// import React from "react";
// import { User, Code, LogOut, Settings } from "lucide-react";
// import { userAuthStore } from "../store/useAuthStore";
// import { Link } from "react-router-dom";
// import LogoutButton from "./LogoutButton";

// const Navbar = () => {
//   const { authUser } = userAuthStore();
//   console.log("authUser", authUser);

//   return (
//     <div className="navbar w-full bg-base-100/95 shadow-lg border-b border-base-300/50 top-0 ">
//       <div className="navbar-start">
//         <Link to="/" className="btn btn-ghost text-xl hover:bg-primary/10 transition-all duration-300">
//           <div className="avatar">
//             <div className="w-8 rounded-lg">
//               <img
//                 src="/leetlab.svg"
//                 alt="Leetlab Logo"
//                 className="object-contain"
//               />
//             </div>
//           </div>
//           <span className="font-bold text-primary hidden sm:inline-block ml-2">
//             Leetlab
//           </span>
//         </Link>
//       </div>

//       <div className="navbar-center hidden lg:flex">
//         <ul className="menu menu-horizontal px-1 gap-2">
//           <li>
//             <Link to="/problems" className="btn btn-ghost btn-sm hover:btn-primary transition-all">
//               Problems
//             </Link>
//           </li>
//           <li>
//             <Link to="/leaderboard" className="btn btn-ghost btn-sm hover:btn-primary transition-all">
//               Leaderboard
//             </Link>
//           </li>
//           <li>
//             <Link to="/contests" className="btn btn-ghost btn-sm hover:btn-primary transition-all">
//               Contests
//             </Link>
//           </li>
//         </ul>
//       </div>

//       <div className="navbar-end gap-2">
//         {/* Mobile menu */}
//         <div className="dropdown dropdown-end lg:hidden">
//           <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
//             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//             </svg>
//           </div>
//           <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-lg bg-base-100 rounded-box w-52 border border-base-300">
//             <li><Link to="/problems" className="text-base">Problems</Link></li>
//             <li><Link to="/leaderboard" className="text-base">Leaderboard</Link></li>
//             <li><Link to="/contests" className="text-base">Contests</Link></li>
//           </ul>
//         </div>

//         {/* User Profile Dropdown */}
//         <div className="dropdown dropdown-end">
//           <div
//             tabIndex={0}
//             role="button"
//             className="btn btn-ghost btn-circle avatar hover:ring-2 hover:ring-primary hover:ring-offset-2 hover:ring-offset-base-100 transition-all duration-300"
//           >
//             <div className="w-10 rounded-full ring-2 ring-base-300">
//               <img
//                 src={
//                   authUser?.image ||
//                   "https://avatar.iran.liara.run/public/boy"
//                 }
//                 alt={`${authUser?.name || 'User'}'s Avatar`}
//                 className="object-cover"
//               />
//             </div>
//           </div>

//           <ul
//             tabIndex={0}
//             className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-2xl bg-base-100 rounded-box w-64 border border-base-300"
//           >
//             {/* User Info Header */}
//             <li className="menu-title">
//               <div className="flex items-center gap-3 p-2">
//                 <div className="avatar">
//                   <div className="w-12 rounded-full ring-2 ring-primary/20">
//                     <img
//                       src={
//                         authUser?.image ||
//                         "https://avatar.iran.liara.run/public/boy"
//                       }
//                       alt="User Avatar"
//                       className="object-cover"
//                     />
//                   </div>
//                 </div>
//                 <div className="flex flex-col">
//                   <span className="font-semibold text-base-content">
//                     {authUser?.name || 'Guest User'}
//                   </span>
//                   <span className="text-xs text-base-content/60 capitalize">
//                     {authUser?.role?.toLowerCase() || 'user'}
//                   </span>
//                 </div>
//               </div>
//             </li>

//             <div className="divider my-1"></div>

//             {/* Menu Items */}
//             <li>
//               <Link
//                 to="/profile"
//                 className="flex items-center gap-3 p-3 hover:bg-primary/10 hover:text-primary transition-all rounded-lg"
//               >
//                 <User className="w-4 h-4" />
//                 <span className="font-medium">My Profile</span>
//               </Link>
//             </li>

//             <li>
//               <Link
//                 to="/settings"
//                 className="flex items-center gap-3 p-3 hover:bg-primary/10 hover:text-primary transition-all rounded-lg"
//               >
//                 <Settings className="w-4 h-4" />
//                 <span className="font-medium">Settings</span>
//               </Link>
//             </li>

//             {authUser?.role === "ADMIN" && (
//               <>
//                 <div className="divider my-1"></div>
//                 <li className="menu-title">
//                   <span className="text-xs font-semibold text-warning">Admin Panel</span>
//                 </li>
//                 <li>
//                   <Link
//                     to="/add-problem"
//                     className="flex items-center gap-3 p-3 hover:bg-warning/10 hover:text-warning transition-all rounded-lg"
//                   >
//                     <Code className="w-4 h-4" />
//                     <span className="font-medium">Add Problem</span>
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     to="/admin/dashboard"
//                     className="flex items-center gap-3 p-3 hover:bg-warning/10 hover:text-warning transition-all rounded-lg"
//                   >
//                     {/* <Shield className="w-4 h-4" /> */}
//                     <span className="font-medium">Admin Dashboard</span>
//                   </Link>
//                 </li>
//               </>
//             )}

//             <div className="divider my-1"></div>

//             <li>
//               <LogoutButton className="flex items-center gap-3 p-3 hover:bg-error/10 hover:text-error transition-all rounded-lg text-error">
//                 <LogOut className="w-4 h-4" />
//                 <span className="font-medium">Sign Out</span>
//               </LogoutButton>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Navbar;

import { useState, useEffect } from "react";
import {
  Menu,
  X,
  Code2,
  Trophy,
  MessageCircle,
  User,
  Settings,
  LogOut,
  Sun,
  Moon,
  Shield,
  Plus,
} from "lucide-react";
import { userAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";
import LogoutButton from "./LogoutButton";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const { authUser } = userAuthStore();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.setAttribute(
      "data-theme",
      isDarkMode ? "light" : "dark"
    );
  };

  const navLinks = [
    { name: "Problems", href: "/problems", icon: Code2 },
    { name: "Leaderboard", href: "/leaderboard", icon: Trophy },
    { name: "Contests", href: "/contests", icon: MessageCircle },
  ];

  return (
    <nav
      className={`absolute top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-lg border-b border-gray-200/20 dark:border-gray-700/20"
          : "bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-200/10 dark:border-gray-700/10"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              <Link to="/" className="flex items-center space-x-2 group">
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center transform group-hover:scale-105 transition-transform duration-200">
                    <Code2 className="w-6 h-6 text-white" />
                  </div>
                  <div className="absolute -inset-1 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg blur opacity-25 group-hover:opacity-40 transition-opacity duration-200"></div>
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hidden sm:block">
                  XCodeLab
                </span>
              </Link>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-1">
              {navLinks.map((link) => {
                const IconComponent = link.icon;
                return (
                  <Link
                    key={link.name}
                    to={link.href}
                    className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-200 group"
                  >
                    <IconComponent className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                    <span>{link.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Right side controls */}
          <div className="flex items-center space-x-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all duration-200 group"
              aria-label="Toggle theme"
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5 group-hover:rotate-12 transition-transform duration-200" />
              ) : (
                <Moon className="w-5 h-5 group-hover:-rotate-12 transition-transform duration-200" />
              )}
            </button>

            {/* User Profile Dropdown */}
            <div className="relative group">
              <button className="flex items-center space-x-2 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900">
                <img
                  src={authUser?.image}
                  alt={authUser?.name}
                  className="w-8 h-8 rounded-full ring-2 ring-gray-200 dark:ring-gray-700 group-hover:ring-blue-500 transition-all duration-200"
                />
                <span className="hidden sm:block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {authUser?.name}
                </span>
              </button>

              {/* Dropdown Menu */}
              <div className="absolute right-0 mt-2 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform group-hover:translate-y-0 translate-y-1">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 py-2 backdrop-blur-sm">
                  {/* User Info */}
                  <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center space-x-3">
                      <img
                        src={authUser?.image}
                        alt={authUser?.name}
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                          {authUser?.name}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                          {authUser?.role?.toLowerCase()}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="py-1">
                    <Link
                      to="/profile"
                      className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                    >
                      <User className="w-4 h-4" />
                      <span>My Profile</span>
                    </Link>

                    <Link
                      to="/settings"
                      className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                    >
                      <Settings className="w-4 h-4" />
                      <span>Settings</span>
                    </Link>

                    {authUser?.role === "ADMIN" && (
                      <>
                        <div className="border-t border-gray-200 dark:border-gray-700 my-1"></div>
                        <div className="px-4 py-2">
                          <span className="text-xs font-semibold text-orange-600 dark:text-orange-400 uppercase tracking-wide">
                            Admin Panel
                          </span>
                        </div>

                        <Link
                          to="/add-problem"
                          className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-orange-50 dark:hover:bg-orange-900/20 hover:text-orange-600 dark:hover:text-orange-400 transition-colors duration-200"
                        >
                          <Plus className="w-4 h-4" />
                          <span>Add Problem</span>
                        </Link>

                        <Link
                          to="/admin/dashboard"
                          className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-orange-50 dark:hover:bg-orange-900/20 hover:text-orange-600 dark:hover:text-orange-400 transition-colors duration-200"
                        >
                          <Shield className="w-4 h-4" />
                          <span>Admin Dashboard</span>
                        </Link>
                      </>
                    )}
                  </div>

                  <div className="border-t border-gray-200 dark:border-gray-700">
                    <LogoutButton>
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </LogoutButton>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all duration-200"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out ${
            isMenuOpen
              ? "max-h-96 opacity-100"
              : "max-h-0 opacity-0 overflow-hidden"
          }`}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-lg mt-2 border border-gray-200/20 dark:border-gray-700/20">
            {navLinks.map((link) => {
              const IconComponent = link.icon;
              return (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center space-x-3 px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-200"
                >
                  <IconComponent className="w-5 h-5" />
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
