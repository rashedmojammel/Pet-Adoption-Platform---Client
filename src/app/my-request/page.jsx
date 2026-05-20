import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import React from 'react';
import { CancelRequest } from '@/components/CancelRequest';
import Link from 'next/link';

const page = async () => {

    const session = await auth.api.getSession({
        headers: await headers()
    });

    const user = session?.user || null;

    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/adoption-requests/user/${user?.id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    });
    const request = await res.json();

    return (
        <div className="max-w-7xl mx-auto px-4 py-10">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-800">
              My Adoption Requests
            </h1>
            <p className="text-gray-500 mt-2">
              Track all your pet adoption requests
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {request.map((req) => (
              <div
                key={req._id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden border hover:shadow-xl transition duration-300"
              >
                <div className="p-5">
                  <div className="flex justify-between items-start">
                    <h2 className="text-2xl font-bold text-gray-800">
                      {req.petName}
                    </h2>

                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        req.status === "pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : req.status === "approved"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {req.status}
                    </span>
                  </div>

                  <div className="mt-5 space-y-2 text-sm text-gray-600">
                    <p>
                      <span className="font-semibold text-gray-800">Request Date:</span>{" "}
                      {req.requestDate ? new Date(req.requestDate).toLocaleDateString() : "—"}
                    </p>
                    <p>
                      <span className="font-semibold text-gray-800">Pickup Date:</span>{" "}
                      {req.pickupDate ? new Date(req.pickupDate).toLocaleDateString() : "—"}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mt-6">
                    <button className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-xl transition">
                      <Link href={`/all-pets/${req.petId}`}>
                        View
                      </Link>
                    </button>

                    {/* only show cancel if still pending */}
                    {req.status === "pending" && (
                      <CancelRequest requestId={req._id.toString()} />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {request.length === 0 && (
            <div className="text-center py-20 text-gray-500">
              You haven't made any adoption requests yet.
            </div>
          )}
        </div>
    );
};

export default page;