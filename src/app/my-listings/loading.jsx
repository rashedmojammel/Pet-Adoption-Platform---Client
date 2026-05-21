import { Spinner } from "@heroui/react";
import React from "react";

const LoadingPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-50 via-white to-emerald-50 overflow-hidden">

      {/* Background Blur */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-cyan-200/30 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-20 w-72 h-72 bg-emerald-200/30 rounded-full blur-3xl" />

      {/* Loader Card */}
      <div className="relative z-10 bg-white/70 backdrop-blur-xl border border-white/40 shadow-2xl rounded-[32px] px-12 py-10 flex flex-col items-center">

        {/* Paw */}
        <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-cyan-400 via-emerald-400 to-teal-500 flex items-center justify-center shadow-lg shadow-cyan-200 mb-6 animate-bounce">
          <span className="text-4xl">🐾</span>
        </div>

        {/* Spinner */}
        <Spinner size="lg" color="primary" />

        {/* Text */}
        <h2 className="mt-6 text-2xl font-black bg-gradient-to-r from-cyan-500 via-emerald-500 to-teal-500 bg-clip-text text-transparent">
          PetNest
        </h2>

        <p className="text-sm text-gray-500 mt-2 tracking-wide">
          Loading your furry experience...
        </p>

        {/* Animated dots */}
        <div className="flex gap-2 mt-5">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-bounce" />
          <span
            className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-bounce"
            style={{ animationDelay: "0.2s" }}
          />
          <span
            className="w-2.5 h-2.5 rounded-full bg-teal-400 animate-bounce"
            style={{ animationDelay: "0.4s" }}
          />
        </div>

      </div>
    </div>
  );
};

export default LoadingPage;