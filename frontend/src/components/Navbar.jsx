import React from "react";
import { User, Code, LogOut, Settings } from "lucide-react";
import { userAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";
import LogoutButton from "./LogoutButton";

// const Navbar = () => {
//   const { authUser } = userAuthStore();
//   console.log("authUser", authUser);
  
//   return (
//     <>
//     <nav className="sticky top-0 z-50 w-full py-5">
//       <div className="flex w-full justify-between mx-auto max-w-4xl bg-black/15 shadow-lg shadow-neutral-600/5 backdrop-blur-lg border border-gray-200/10 p-4 rounded-2xl">
//         {/* Logo Section */}
//         <Link to="/" className="flex items-center gap-3 cursor-pointer">
//           <img
//             src="/leetlab.svg"
//             className="h-18 w-18 bg-primary/20 text-primary border-none px-2 py-2 rounded-full"
//           />
//           <span className="text-lg md:text-2xl font-bold tracking-tight text-white hidden md:block">
//             Leetlab
//           </span>
//         </Link>

//         {/* User Profile and Dropdown */}
//         <div className="flex items-center gap-8">
//           <div className="dropdown dropdown-end">
//             <label
//               tabIndex={0}
//               className="btn btn-ghost btn-circle avatar flex flex-row "
//             >
//               <div className="w-10 rounded-full ">
//                 <img
//                   src={
//                     authUser?.image ||
//                     "https://avatar.iran.liara.run/public/boy"
//                   }
//                   alt="User Avatar"
//                   className="object-cover"
//                 />
//               </div>
//             </label>
//             <ul
//               tabIndex={0}
//               className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 space-y-3"
//             >
//               {/* Admin Option */}

//               {/* Common Options */}
//               <li>
//                 <p className="text-base font-semibold">{authUser?.name}</p>
//                 <hr className="border-gray-200/10" />
//               </li>
//               <li>
//                 <Link
//                   to="/profile"
//                   className="hover:bg-primary hover:text-white text-base font-semibold"
//                 >
//                   <User className="w-4 h-4 mr-2" />
//                   My Profile
//                 </Link>
//               </li>
//               {authUser?.role === "ADMIN" && (
//                 <li>
//                   <Link
//                     to="/add-problem"
//                     className="hover:bg-primary hover:text-white text-base font-semibold"
//                   >
//                     <Code className="w-4 h-4 mr-1" />
//                     Add Problem
//                   </Link>
//                 </li>
//               )}
//               <li>
//                 <LogoutButton className="hover:bg-primary hover:text-white">
//                   <LogOut className="w-4 h-4 mr-2" />
//                   Logout
//                 </LogoutButton>
//               </li>
//             </ul>
//           </div>
//         </div>
//       </div>
//     </nav>
//     </>
//   );
// };
const Navbar = () => {
  const { authUser } = userAuthStore();
  console.log("authUser", authUser);
  
  return (
    <div className="navbar w-full bg-base-100/95 shadow-lg border-b border-base-300/50 top-0 ">
      <div className="navbar-start">
        <Link to="/" className="btn btn-ghost text-xl hover:bg-primary/10 transition-all duration-300">
          <div className="avatar">
            <div className="w-8 rounded-lg">
              <img
                src="/leetlab.svg"
                alt="Leetlab Logo"
                className="object-contain"
              />
            </div>
          </div>
          <span className="font-bold text-primary hidden sm:inline-block ml-2">
            Leetlab
          </span>
        </Link>
      </div>
      
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-2">
          <li>
            <Link to="/problems" className="btn btn-ghost btn-sm hover:btn-primary transition-all">
              Problems
            </Link>
          </li>
          <li>
            <Link to="/leaderboard" className="btn btn-ghost btn-sm hover:btn-primary transition-all">
              Leaderboard
            </Link>
          </li>
          <li>
            <Link to="/contests" className="btn btn-ghost btn-sm hover:btn-primary transition-all">
              Contests
            </Link>
          </li>
        </ul>
      </div>
      
      <div className="navbar-end gap-2">
        {/* Mobile menu */}
        <div className="dropdown dropdown-end lg:hidden">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-lg bg-base-100 rounded-box w-52 border border-base-300">
            <li><Link to="/problems" className="text-base">Problems</Link></li>
            <li><Link to="/leaderboard" className="text-base">Leaderboard</Link></li>
            <li><Link to="/contests" className="text-base">Contests</Link></li>
          </ul>
        </div>

        {/* User Profile Dropdown */}
        <div className="dropdown dropdown-end">
          <div 
            tabIndex={0} 
            role="button" 
            className="btn btn-ghost btn-circle avatar hover:ring-2 hover:ring-primary hover:ring-offset-2 hover:ring-offset-base-100 transition-all duration-300"
          >
            <div className="w-10 rounded-full ring-2 ring-base-300">
              <img
                src={
                  authUser?.image ||
                  "https://avatar.iran.liara.run/public/boy"
                }
                alt={`${authUser?.name || 'User'}'s Avatar`}
                className="object-cover"
              />
            </div>
          </div>
          
          <ul 
            tabIndex={0} 
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-2xl bg-base-100 rounded-box w-64 border border-base-300"
          >
            {/* User Info Header */}
            <li className="menu-title">
              <div className="flex items-center gap-3 p-2">
                <div className="avatar">
                  <div className="w-12 rounded-full ring-2 ring-primary/20">
                    <img
                      src={
                        authUser?.image ||
                        "https://avatar.iran.liara.run/public/boy"
                      }
                      alt="User Avatar"
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-base-content">
                    {authUser?.name || 'Guest User'}
                  </span>
                  <span className="text-xs text-base-content/60 capitalize">
                    {authUser?.role?.toLowerCase() || 'user'}
                  </span>
                </div>
              </div>
            </li>
            
            <div className="divider my-1"></div>
            
            {/* Menu Items */}
            <li>
              <Link
                to="/profile"
                className="flex items-center gap-3 p-3 hover:bg-primary/10 hover:text-primary transition-all rounded-lg"
              >
                <User className="w-4 h-4" />
                <span className="font-medium">My Profile</span>
              </Link>
            </li>
            
            <li>
              <Link
                to="/settings"
                className="flex items-center gap-3 p-3 hover:bg-primary/10 hover:text-primary transition-all rounded-lg"
              >
                <Settings className="w-4 h-4" />
                <span className="font-medium">Settings</span>
              </Link>
            </li>
            
            {authUser?.role === "ADMIN" && (
              <>
                <div className="divider my-1"></div>
                <li className="menu-title">
                  <span className="text-xs font-semibold text-warning">Admin Panel</span>
                </li>
                <li>
                  <Link
                    to="/add-problem"
                    className="flex items-center gap-3 p-3 hover:bg-warning/10 hover:text-warning transition-all rounded-lg"
                  >
                    <Code className="w-4 h-4" />
                    <span className="font-medium">Add Problem</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/dashboard"
                    className="flex items-center gap-3 p-3 hover:bg-warning/10 hover:text-warning transition-all rounded-lg"
                  >
                    {/* <Shield className="w-4 h-4" /> */}
                    <span className="font-medium">Admin Dashboard</span>
                  </Link>
                </li>
              </>
            )}
            
            <div className="divider my-1"></div>
            
            <li>
              <LogoutButton className="flex items-center gap-3 p-3 hover:bg-error/10 hover:text-error transition-all rounded-lg text-error">
                <LogOut className="w-4 h-4" />
                <span className="font-medium">Sign Out</span>
              </LogoutButton>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};





export default Navbar;