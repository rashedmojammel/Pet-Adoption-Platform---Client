'use client';
import React, { useState } from "react";
import {
  FaDog,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaUser,
  FaEnvelope,
  FaPaperPlane,
} from "react-icons/fa";
import { AdoptForm, WithForm } from "./AdoptForm";
import { Button } from "@heroui/react";
import Link from "next/link";

const AllpetsCard = ({ pet }) => {
  const {
    petName,
    species,
    age,
    breed,
    location,
    description,
    imageUrl,
  } = pet;

  // Example logged in user data
  const currentUser = {
    name: "Rashed Mojammel",
    email: "rashed@gmail.com",
  };

  const [pickupDate, setPickupDate] = useState("");
  const [message, setMessage] = useState("");

  const handleAdopt = (e) => {
    e.preventDefault();

    const adoptionRequest = {
      petName,
      userName: currentUser.name,
      userEmail: currentUser.email,
      pickupDate,
      message,
      status: "pending",
    };

    console.log(adoptionRequest);

    alert("Adoption Request Sent!");
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-2xl transition duration-300">
      
      {/* Pet Image */}
      <div className="overflow-hidden">
        <img
          src={imageUrl}
          alt={petName}
          className="w-full h-72 object-cover hover:scale-105 transition duration-300"
        />
      </div>

      {/* Pet Info */}
      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <FaDog className="text-orange-500 text-xl" />
          <h2 className="text-2xl font-bold text-gray-800">
            {petName}
          </h2>
        </div>

        <div className="space-y-2 text-gray-600">
          <p>
            <span className="font-semibold">Species:</span> {species}
          </p>

          <p>
            <span className="font-semibold">Age:</span> {age} years
          </p>

          <p>
            <span className="font-semibold">Breed:</span> {breed}
          </p>

          <p className="flex items-center gap-2">
            <FaMapMarkerAlt className="text-red-500" />
            {location}
          </p>

          <p className="text-sm text-gray-500 mt-2">
            {description}
          </p>
        </div>

        <div className="flex justify-between">
            <Link href={`/all-pets/${pet._id}`}>
                <Button variant="secondary">
                    View Details
                </Button>
            </Link>

            <AdoptForm /> 

        </div>

          
        
      </div>
    </div>
  );
};

export default AllpetsCard;