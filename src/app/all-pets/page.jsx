'use client';
import { useState, useEffect, useCallback } from 'react';
import AllpetsCard from "@/components/AllpetsCard";
import React from "react";
import { FaSadCry, FaSearch } from "react-icons/fa";

const SPECIES = ['Dog', 'Cat', 'Bird', 'Rabbit', 'Fish', 'Other'];

const AllPetPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedSpecies, setSelectedSpecies] = useState([]);

  const fetchPets = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (search) params.set('search', search);
    if (selectedSpecies.length) params.set('species', selectedSpecies.join(','));

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/pets?${params}`,
      { cache: 'no-store' }
    );
    const result = await res.json();
    setData(result);
    setLoading(false);
  }, [search, selectedSpecies]);

  useEffect(() => {
    const t = setTimeout(fetchPets, 300);
    return () => clearTimeout(t);
  }, [fetchPets]);

  const toggleSpecies = (s) =>
    setSelectedSpecies((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
    );

  return (
    <section className="min-h-screen  bg-gray-50py-12 px-4 md:px-10">
      <div className="max-w-7xl mx-auto mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
          Find Your Perfect Pet 🐾
        </h1>
        <p className="mt-4 text-gray-600 max-w-2xl mx-auto text-lg">
          Browse adorable pets waiting for a loving home. Adopt, rescue,
          and make a lifelong friend today.
        </p>
      </div>

      <div className="max-w-7xl mx-auto mb-8 flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:border-orange-400 bg-white shadow-sm"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {SPECIES.map((s) => (
            <button
              key={s}
              onClick={() => toggleSpecies(s)}
              className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all ${
                selectedSpecies.includes(s)
                  ? 'bg-orange-500 text-white border-orange-500'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-orange-300'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto mb-10">
        <div className="bg-white rounded-3xl shadow-md border border-orange-100 p-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-orange-500">
              {loading ? '...' : `${data.length} Pets Available`}
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

      {/* Loading spinner */}
      {loading ? (
        <div className="flex justify-center items-center py-24">
          <div className="w-12 h-12 border-4 border-orange-400 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <>
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

          {data.length === 0 && (
            <div className="text-center py-20">
              <h2 className="text-3xl font-bold text-gray-700">
                No Pets Found <FaSadCry />
              </h2>
              <p className="text-gray-500 mt-3">
                Try a different search or filter.
              </p>
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default AllPetPage;