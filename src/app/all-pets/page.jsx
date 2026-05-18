import AllpetsCard from "@/components/AllpetsCard";
import React from "react";
import { FaSadCry } from "react-icons/fa";

const AllPetPage = async () => {
  const res = await fetch("http://localhost:5000/pets", {
    cache: "no-store",
  });

  const data = await res.json();

  return (
    <section className="min-h-screen bg-gradient-to-b from-orange-50 to-white py-12 px-4 md:px-10">
      <div className="max-w-7xl mx-auto mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
          Find Your Perfect Pet 🐾
        </h1>

        <p className="mt-4 text-gray-600 max-w-2xl mx-auto text-lg">
          Browse adorable pets waiting for a loving home. Adopt, rescue,
          and make a lifelong friend today.
        </p>
      </div>

      {/* Stats */}
      <div className="max-w-7xl mx-auto mb-10">
        <div className="bg-white rounded-3xl shadow-md border border-orange-100 p-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-orange-500">
              {data.length} Pets Available
            </h2>

            <p className="text-gray-500 mt-1">
              Ready to be adopted into caring families
            </p>
          </div>

          <button className="bg-orange-500 hover:bg-orange-600 transition text-white px-6 py-3 rounded-xl font-semibold shadow">
            Adopt Today
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {data.map((pet) => (
          <div
            key={pet._id}
            className="transform hover:-translate-y-2 transition duration-300"
          >
            <AllpetsCard pet={pet} />
          </div>
        ))}
      </div>

      {/* Empty State */}
      {data.length === 0 && (
        <div className="text-center py-20">
          <h2 className="text-3xl font-bold text-gray-700">
            No Pets Found <FaSadCry></FaSadCry>
          </h2>

          <p className="text-gray-500 mt-3">
            Please check again later.
          </p>
        </div>
      )}
    </section>
  );
};

export default AllPetPage;