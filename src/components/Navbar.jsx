"use client";

import { authClient } from "@/lib/auth-client";
import { Avatar } from "@heroui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState, useRef, useEffect } from "react";

const Navbar = () => {
  const pathname = usePathname();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const { data: session, isPending } = authClient.useSession();
  const user = session?.user || null;

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/all-pets", label: "All Pets" },
    { href: "/my-request", label: "My Request"},
    { href: "/add-pet", label: "Add Pet" },
  ];

  const handleSignOut = async () => {
    await authClient.signOut();
    window.location.href = "/";
  };

  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/90 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Brand */}
        <div className="flex-shrink-0">
          <h1
            className="text-3xl md:text-4xl font-extrabold tracking-tight flex items-center gap-2"
            style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
          >
            <span className="text-green-400 text-4xl">🐾</span>
            <span className="bg-gradient-to-r from-green-400 via-emerald-300 to-cyan-300 bg-clip-text text-transparent">
              PetNest
            </span>
          </h1>
          <p className="text-[11px] tracking-[0.25em] uppercase text-gray-400 mt-1 ml-1">
            Care • Love • Adoption
          </p>
        </div>

        {/* Nav Links */}
        <ul className="hidden md:flex items-center gap-8 list-none">
          {navLinks
            .map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={`text-sm tracking-wide font-medium transition-colors duration-200 pb-0.5 border-b-2 ${
                    pathname === href
                      ? "text-cyan-600 border-cyan-500"
                      : "text-gray-500 border-transparent hover:text-gray-900 hover:border-gray-300"
                  }`}
                >
                  {label.toUpperCase()}
                </Link>
              </li>
            ))}
        </ul>

        {/* Auth */}
        <div className="flex items-center gap-3">
          {isPending ? (
            <div className="w-8 h-8 rounded-full bg-gray-100 animate-pulse" />
          ) : user ? (
            /* ── Logged in: Profile Dropdown ── */
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen((prev) => !prev)}
                className="flex items-center gap-2 pl-1 pr-3 py-1 rounded-full border border-gray-200 hover:border-cyan-300 hover:bg-cyan-50 transition-all duration-150"
              >
                <Avatar className="w-8 h-8">
                  <Avatar.Image
                    alt={user.name}
                    src={user?.image || "https://img.heroui.chat/image/avatar?w=400&h=400&u=3"}
                  />
                  <Avatar.Fallback className="text-xs font-bold bg-cyan-100 text-cyan-700">
                    {user.name?.charAt(0).toUpperCase()}
                  </Avatar.Fallback>
                </Avatar>
                <span className="text-sm font-medium text-gray-700 max-w-[80px] truncate">
                  {user.name?.split(" ")[0]}
                </span>
                <svg
                  className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Dropdown Menu */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-lg shadow-black/10 border border-gray-100 py-1.5 overflow-hidden">
                  {/* User info */}
                  <div className="px-4 py-2.5 border-b border-gray-50">
                    <p className="text-xs font-semibold text-gray-800 truncate">{user.name}</p>
                    <p className="text-[11px] text-gray-400 truncate">{user.email}</p>
                  </div>

                  {/* Dashboard */}
                  <Link
                    href="/add-pet"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors duration-150"
                  >
                    <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h10M4 18h6" />
                    </svg>
                    Dashboard
                  </Link>

                  {/* Logout */}
                  <div className="border-t border-gray-50 mt-1 pt-1">
                    <button
                      onClick={handleSignOut}
                      className="flex items-center gap-2.5 w-full px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors duration-150"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1" />
                      </svg>
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
            <Link
              href="/login"
              className="text-sm font-medium bg-cyan-500 hover:bg-cyan-600 text-white px-5 py-2.5 rounded-2xl transition-colors duration-200"
            >
              Login
            </Link>

            <Link
              href="/signup"
              className="text-sm font-medium bg-cyan-500 hover:bg-cyan-600 text-white px-5 py-2.5 rounded-2xl transition-colors duration-200"
            >
              Signup
            </Link>
            

            
            </>
            /* ── Not logged in: Login button ── */
            
          )}
        </div>

      </div>
    </nav>
  );
};

export default Navbar;