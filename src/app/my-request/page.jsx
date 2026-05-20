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
  <div className="mb-10 pl-5 border-l-2 border-gray-300">
    <h1 className="text-3xl font-serif font-semibold text-gray-900 tracking-tight">
      My Adoption Requests
    </h1>
    <p className="text-sm text-gray-400 mt-1.5 font-light tracking-wide">
      Track all your pet adoption requests
    </p>
  </div>

  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
    {request.map((req) => (
      <div key={req._id} className="bg-white rounded-xl border border-gray-100 p-5 hover:border-gray-200 transition-colors duration-200">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-lg font-serif font-semibold text-gray-900">{req.petName}</h2>
          <span className={`px-3 py-0.5 rounded-full text-[11px] font-medium uppercase tracking-wider ${
            req.status === "pending" ? "bg-amber-50 text-amber-700"
            : req.status === "approved" ? "bg-green-50 text-green-700"
            : "bg-red-50 text-red-700"
          }`}>{req.status}</span>
        </div>

        <div className="h-px bg-gray-100 my-4" />

        <div className="space-y-2.5 text-sm">
          <div className="flex items-center gap-2 text-gray-500">
            <span className="w-24 font-light text-xs">Request date</span>
            <span className="font-medium text-gray-800 text-xs">
              {req.requestDate ? new Date(req.requestDate).toLocaleDateString() : "—"}
            </span>
          </div>
          <div className="flex items-center gap-2 text-gray-500">
            <span className="w-24 font-light text-xs">Pickup date</span>
            <span className="font-medium text-gray-800 text-xs">
              {req.pickupDate ? new Date(req.pickupDate).toLocaleDateString() : "—"}
            </span>
          </div>
        </div>

        <div className={`grid gap-2 mt-5 ${req.status === "pending" ? "grid-cols-2" : "grid-cols-1"}`}>
          <Link href={`/all-pets/${req.petId}`}
            className="text-center text-sm py-2 rounded-lg bg-indigo-950 text-indigo-100 hover:bg-indigo-900 transition-colors font-medium">
            View pet
          </Link>
          {req.status === "pending" && (
            <CancelRequest requestId={req._id.toString()} />
          )}
        </div>
      </div>
    ))}
  </div>
</div>
    );
};

export default page;