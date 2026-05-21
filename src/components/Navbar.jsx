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
    { href: "/my-request", label: "My Request" },
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
    <nav className="sticky top-0 z-50 border-b border-white/20 bg-white/70 backdrop-blur-xl shadow-sm">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <Link href="/" className="group">
            <div className="flex items-center gap-3">

              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-400 via-emerald-400 to-teal-500 flex items-center justify-center shadow-lg shadow-cyan-200 group-hover:scale-105 transition-transform duration-300">
                <span className="text-2xl">🐾</span>
              </div>

              <div>
                <h1 className="text-3xl font-black tracking-tight bg-gradient-to-r from-cyan-500 via-emerald-500 to-teal-500 bg-clip-text text-transparent">
                  PetNest
                </h1>

                <p className="text-[10px] uppercase tracking-[0.35em] text-gray-400">
                  Care • Love • Adoption
                </p>
              </div>
            </div>
          </Link>

          {/* Nav Links */}
          <ul className="hidden md:flex items-center gap-2 bg-gray-50/80 border border-gray-100 rounded-full px-3 py-2 shadow-inner">

            {navLinks.map(({ href, label }) => {
              const active = pathname === href;

              return (
                <li key={href}>
                  <Link
                    href={href}
                    className={`relative px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                      active
                        ? "bg-gradient-to-r from-cyan-500 to-emerald-500 text-white shadow-md"
                        : "text-gray-600 hover:text-gray-900 hover:bg-white"
                    }`}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Auth Area */}
          <div className="flex items-center gap-3">

            {isPending ? (
              <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse" />
            ) : user ? (
              /* Logged In */
              <div className="relative" ref={dropdownRef}>

                <button
                  onClick={() => setDropdownOpen((prev) => !prev)}
                  className="flex items-center gap-3 bg-white border border-gray-200 hover:border-cyan-300 px-2 py-1.5 rounded-full shadow-sm hover:shadow-md transition-all duration-300"
                >

                  <Avatar className="w-10 h-10 ring-2 ring-cyan-100">
                    <Avatar.Image
                      alt={user.name}
                      src={
                        user?.image ||
                        "https://img.heroui.chat/image/avatar?w=400&h=400&u=3"
                      }
                    />

                    <Avatar.Fallback className="bg-cyan-100 text-cyan-700 font-bold">
                      {user.name?.charAt(0).toUpperCase()}
                    </Avatar.Fallback>
                  </Avatar>

                  <div className="hidden sm:block text-left">
                    <p className="text-sm font-semibold text-gray-800 leading-none">
                      {user.name?.split(" ")[0]}
                    </p>

                    <p className="text-xs text-gray-400 mt-1">
                      Pet Lover
                    </p>
                  </div>

                  <svg
                    className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${
                      dropdownOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {/* Dropdown */}
                {dropdownOpen && (
                  <div className="absolute right-0 mt-4 w-72 bg-white/95 backdrop-blur-xl border border-gray-100 rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">

                    {/* Top */}
                    <div className="bg-gradient-to-r from-cyan-500 via-emerald-500 to-teal-500 px-5 py-5 text-white">

                      <div className="flex items-center gap-3">
                        <Avatar className="w-14 h-14 border-2 border-white">
                          <Avatar.Image
                            src={
                              user?.image ||
                              "https://img.heroui.chat/image/avatar?w=400&h=400&u=3"
                            }
                          />
                        </Avatar>

                        <div>
                          <h3 className="font-bold text-base">
                            {user.name}
                          </h3>

                          <p className="text-xs text-white/80">
                            {user.email}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Menu */}
                    <div className="p-3">

                      <Link
                        href="/all-pets"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-gray-50 transition-all duration-200 group"
                      >
                        <div className="w-10 h-10 rounded-xl bg-cyan-100 flex items-center justify-center group-hover:scale-105 transition-transform">
                          📋
                        </div>

                        <div>
                          <p className="text-sm font-semibold text-gray-700">
                            Dashboard
                          </p>

                          <p className="text-xs text-gray-400">
                            Manage your activity
                          </p>
                        </div>
                      </Link>

                      <Link
                        href="/my-listings"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-gray-50 transition-all duration-200 group"
                      >
                        <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center group-hover:scale-105 transition-transform">
                          🐶
                        </div>

                        <div>
                          <p className="text-sm font-semibold text-gray-700">
                            My Listings
                          </p>

                          <p className="text-xs text-gray-400">
                            View your pets
                          </p>
                        </div>
                      </Link>

                      {/* Logout */}
                      <div className="mt-2 pt-2 border-t border-gray-100">

                        <button
                          onClick={handleSignOut}
                          className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-red-50 transition-all duration-200 group"
                        >
                          <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center group-hover:scale-105 transition-transform">
                            🚪
                          </div>

                          <div className="text-left">
                            <p className="text-sm font-semibold text-red-500">
                              Logout
                            </p>

                            <p className="text-xs text-red-300">
                              Sign out from account
                            </p>
                          </div>
                        </button>

                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* Not Logged In */
              <div className="flex items-center gap-3">

                <Link
                  href="/login"
                  className="px-5 py-2.5 rounded-full border border-gray-200 bg-white text-gray-700 text-sm font-semibold hover:border-cyan-300 hover:text-cyan-600 hover:shadow-md transition-all duration-300"
                >
                  Login
                </Link>

                <Link
                  href="/signup"
                  className="px-6 py-2.5 rounded-full bg-gradient-to-r from-cyan-500 via-emerald-500 to-teal-500 text-white text-sm font-semibold shadow-lg shadow-cyan-200 hover:scale-105 transition-all duration-300"
                >
                  Get Started
                </Link>

              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;