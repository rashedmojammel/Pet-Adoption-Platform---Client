"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const Banner = () => {
  const images = [
    "/Banner.jpeg",
    "/Banner2.jpg",
    "/Banner3.webp",
    "/Banner4.jpg",
  ];

  const [currentImage, setCurrentImage] = useState(0);

  // Auto change image every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden">
      {/* Hero */}
      <div
        className="relative bg-cover bg-center text-white transition-all duration-1000"
        style={{
          backgroundImage: `url(${images[currentImage]})`,
          minHeight: "85vh",
        }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70" />

        {/* Glow effect */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 55% 45% at 50% 40%, rgba(34,197,94,0.18) 0%, transparent 70%)",
          }}
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center items-center text-center h-full min-h-[75vh] px-6 pt-20 pb-32">
          <p className="text-green-300 text-xs tracking-[0.3em] font-semibold uppercase mb-6">
            Trusted care for your furry friends
          </p>

          <h1
            className="font-bold leading-[1.05] mb-6"
            style={{
              fontSize: "clamp(2.8rem, 8vw, 6rem)",
              fontFamily: "Georgia, 'Times New Roman', serif",
              letterSpacing: "-0.02em",
            }}
          >
            Find Love,
            <br />
            <span className="text-green-300">Care & Companionship</span>
          </h1>

          <p className="text-white/80 text-lg max-w-xl mb-10 leading-relaxed">
            Discover adorable pets, trusted adoption services, grooming, and
            everything your companions need for a happy life.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/pets"
              className="bg-green-500 hover:bg-green-400 text-white font-semibold text-sm tracking-widest uppercase px-8 py-4 transition-all duration-200 hover:-translate-y-0.5"
            >
              Explore Pets
            </Link>

            <Link
              href="/adoption"
              className="border border-white/60 hover:bg-white/10 text-white font-semibold text-sm tracking-widest uppercase px-8 py-4 transition-all duration-200"
            >
              Adopt Now
            </Link>
          </div>

          {/* Dots Indicator */}
          <div className="flex gap-3 mt-10">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImage(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentImage === index
                    ? "bg-green-400 scale-125"
                    : "bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Search bar */}
      {/* <div className="relative z-20 -mt-10 mx-4 md:mx-auto max-w-5xl">
        <div className="bg-white shadow-2xl shadow-black/15 flex flex-wrap md:flex-nowrap divide-y md:divide-y-0 md:divide-x divide-gray-100">
          {[
            { label: "Pet Type", sub: "Dog, Cat, Bird..." },
            { label: "Location", sub: "City or Shelter" },
            { label: "Age", sub: "Puppy · Adult · Senior" },
            { label: "Breed", sub: "Golden Retriever..." },
          ].map(({ label, sub }) => (
            <div
              key={label}
              className="flex-1 min-w-[140px] px-6 py-5 hover:bg-gray-50 cursor-pointer transition-colors group"
            >
              <p className="text-[10px] text-gray-400 tracking-widest uppercase font-semibold mb-1">
                {label}
              </p>

              <p className="text-sm text-gray-700 font-medium group-hover:text-green-600 transition-colors">
                {sub}
              </p>
            </div>
          ))}

          <button className="bg-green-500 hover:bg-green-600 text-white font-bold text-sm tracking-[0.15em] uppercase px-8 py-5 transition-colors duration-200 flex items-center gap-2 whitespace-nowrap">
            Search
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>
      </div> */}
    </section>
  );
};

export default Banner;