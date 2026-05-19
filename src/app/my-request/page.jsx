import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import Image from 'next/image';
import React from 'react';

const page = async () => {

    const session = await auth.api.getSession({
        headers : await headers()
    });

    const user = session?.user || null;
    console.log(session);

    const res = await fetch(`http://localhost:5000/adoption-requests/${user?.id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    });
    const request = await res.json();
    console.log(request);
    return (
        <div className="max-w-7xl mx-auto px-4 py-10">
  {/* Title */}
  <div className="mb-8">
    <h1 className="text-4xl font-bold text-gray-800">
      My Adoption Requests
    </h1>
    <p className="text-gray-500 mt-2">
      Track all your pet adoption requests
    </p>
  </div>

  {/* Requests Grid */}
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {request.map((req) => (
      <div
        key={req._id}
        className="bg-white rounded-2xl shadow-lg overflow-hidden border hover:shadow-xl transition duration-300"
      >
        {/* Pet Image */}
        <div className="relative h-60 w-full">
          <Image
            src={req.imageUrl}
            alt={req.petName}
            fill
            className="object-cover"
          />
        </div>

        {/* Content */}
        <div className="p-5">
          {/* Pet Name */}
          <div className="flex justify-between items-start">
            <h2 className="text-2xl font-bold text-gray-800">
              {req.petName}
            </h2>

            {/* Status */}
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                req.status === "Pending"
                  ? "bg-yellow-100 text-yellow-700"
                  : req.status === "Approved"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {req.status}
            </span>
          </div>

          {/* Dates */}
          <div className="mt-5 space-y-2 text-sm text-gray-600">
            <p>
              <span className="font-semibold text-gray-800">
                Request Date:
              </span>{" "}
              {req.requestDate}
            </p>

            <p>
              <span className="font-semibold text-gray-800">
                Pickup Date:
              </span>{" "}
              {req.pickupDate}
            </p>
          </div>

          {/* Buttons */}
          <div className="grid grid-cols-2 gap-3 mt-6">
            {/* View Button */}
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-xl transition">
              View
            </button>

            {/* Cancel Button */}
            <button className="bg-red-600 hover:bg-red-700 text-white py-2 rounded-xl transition">
              Cancel
            </button>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>
    );
};

export default page;