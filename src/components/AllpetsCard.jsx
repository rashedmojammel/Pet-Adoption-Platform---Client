'use client';
import React from "react";
import { AdoptForm } from "./AdoptForm";
import Link from "next/link";

const SPECIES_ICONS = { Dog: '🐕', Cat: '🐈', Bird: '🦜', Rabbit: '🐇', Fish: '🐠', Other: '🐾' };

const AllpetsCard = ({ pet }) => {
  const { petName, species, age, breed, location, description, imageUrl, ownerEmail } = pet;

  return (
    <div className="bg-white border border-gray-100 rounded-[18px] overflow-hidden hover:border-gray-200 hover:-translate-y-1 transition-all duration-200 group">

      {/* Image */}
      <div className="relative h-52 bg-gray-50 overflow-hidden">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={petName}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-400"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-5xl opacity-20">🐾</div>
        )}
        <span className="absolute top-2.5 left-2.5 text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-orange-50 text-orange-800 border border-orange-200 tracking-wide">
          {species}
        </span>
        <span className="absolute top-2.5 right-2.5 text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-black/40 text-white tracking-wide">
          {age} yrs
        </span>
      </div>

      {/* Body */}
      <div className="p-4">

        {/* Name row */}
        <div className="flex items-start justify-between mb-2.5">
          <div>
            <h2 className="font-serif text-[22px] font-normal text-gray-900 leading-tight">{petName}</h2>
            <p className="text-xs text-gray-400 font-light mt-0.5">{breed}</p>
          </div>
          <button className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-red-50 hover:border-red-200 transition group/heart shrink-0 mt-0.5" aria-label={`Save ${petName}`}>
            <span className="text-sm text-gray-400 group-hover/heart:text-red-500 transition">♡</span>
          </button>
        </div>

        {/* Pills */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          <span className="flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-full border border-gray-100 bg-gray-50 text-gray-500">
            📍 {location}
          </span>
          {/* add gender / vaccinated pills here if available in your data */}
        </div>

        <div className="h-px bg-gray-100 mb-3" />

        {/* Description */}
        <p className="text-xs text-gray-400 font-light leading-relaxed line-clamp-2 mb-3">
          {description}
        </p>

        {/* Actions */}
        <div className="grid grid-cols-2 gap-2">
          <Link href={`/all-pets/${pet._id}`}
            className="text-center text-xs font-medium py-2 rounded-xl border border-gray-200 text-gray-500 hover:bg-gray-50 transition">
            View details
          </Link>
          <AdoptForm
            petName={petName}
            petId={pet._id.toString()}
            ownerEmail={ownerEmail}
            trigger={
              <button className="w-full text-xs font-medium py-2 rounded-xl bg-indigo-950 text-indigo-100 hover:bg-indigo-900 transition">
                Adopt {petName}
              </button>
            }
          />
        </div>

      </div>
    </div>
  );
};

export default AllpetsCard;