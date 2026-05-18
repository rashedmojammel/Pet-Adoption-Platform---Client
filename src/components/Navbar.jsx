'use client'
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Navbar = () => {
  const pathname = usePathname();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/all-pets", label: "All Pets" },
    { href: "/my-request", label: "My Request" },
    { href: "/add-pet", label: "Add Pet" },
  ];

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/90 border-b border-gray-100">

        
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
       <div className="flex-shrink-0">
  <h1
    className="text-3xl md:text-4xl font-extrabold tracking-tight text-white flex items-center gap-2"
    style={{
      fontFamily: "Georgia, 'Times New Roman', serif",
    }}
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

        {/* Left nav links */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map(({ href, label }) => (
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

        {/* Logo */}
        
        {/* Right auth links */}
        <ul className="flex items-center gap-4">

          <li>
            <Link
              href="/signup"
              className="text-sm font-medium bg-cyan-500 hover:bg-cyan-600 text-white px-5 py-2.5 transition-colors duration-200 rounded-2xl"
            >
                Login
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;