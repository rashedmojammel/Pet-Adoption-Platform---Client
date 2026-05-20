'use client';
import { useState } from 'react';
import { authClient } from '@/lib/auth-client';
import { toast } from 'react-toastify';
import { FaClipboardList } from 'react-icons/fa';

export function RequestsModal({ petId, petName }) {
  const [requests, setRequests] = useState([]);
  const [open, setOpen] = useState(false);

  const loadRequests = async () => {
    const { data: tokenData } = await authClient.Token();
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/adoption-requests/pet/${petId}`,
      { headers: { Authorization: `Bearer ${tokenData?.token}` } }
    );
    const data = await res.json();
    setRequests(data);
    setOpen(true);
  };

  const handleStatus = async (requestId, status) => {
    const { data: tokenData } = await authClient.Token();
    await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/adoption-requests/${requestId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${tokenData?.token}`,
      },
      body: JSON.stringify({ status, petId }),
    });

    toast.success(`Request ${status}`);

    // update UI instantly
    setRequests((prev) =>
      prev.map((r) => {
        if (r._id === requestId) return { ...r, status };
        // reject all others if approved
        if (status === 'approved' && r.status === 'pending') return { ...r, status: 'rejected' };
        return r;
      })
    );
  };

  return (
    <>
      <button
        onClick={loadRequests}
        className="px-3 py-1.5 text-sm rounded-xl bg-cyan-50 border border-cyan-200 text-cyan-700 hover:bg-cyan-100 flex items-center gap-1.5"
      >
        <FaClipboardList /> Requests
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg mx-4 max-h-[80vh] overflow-y-auto">

            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-800">
                Requests for {petName}
              </h2>
              <button onClick={() => setOpen(false)} className="text-gray-400 hover:text-gray-600 text-xl">
                ✕
              </button>
            </div>

            <div className="p-6 space-y-4">
              {requests.length === 0 && (
                <p className="text-center text-gray-500 py-8">No requests yet.</p>
              )}

              {requests.map((req) => (
                <div key={req._id} className="border border-gray-100 rounded-2xl p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-semibold text-gray-800">{req.userName}</p>
                      <p className="text-sm text-gray-500">{req.userEmail}</p>
                      <p className="text-xs text-gray-400 mt-1">
                        Pickup: {req.pickupDate ? new Date(req.pickupDate).toLocaleDateString() : '—'}
                      </p>
                    </div>
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                      req.status === 'approved' ? 'bg-green-100 text-green-700'
                      : req.status === 'rejected' ? 'bg-red-100 text-red-700'
                      : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {req.status}
                    </span>
                  </div>

                  {req.message && (
                    <p className="text-sm text-gray-600 mb-3">{req.message}</p>
                  )}

                  {/* Only show buttons if still pending */}
                  {req.status === 'pending' && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleStatus(req._id, 'approved')}
                        className="flex-1 bg-green-500 hover:bg-green-600 text-white text-sm py-1.5 rounded-xl transition"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleStatus(req._id, 'rejected')}
                        className="flex-1 bg-red-500 hover:bg-red-600 text-white text-sm py-1.5 rounded-xl transition"
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>

          </div>
        </div>
      )}
    </>
  );
}