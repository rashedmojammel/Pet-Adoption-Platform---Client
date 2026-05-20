'use client';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

export function CancelRequest({ requestId }) {
  const router = useRouter();

  const handleCancel = async () => {
    const { data: tokenData } = await authClient.Token();

    await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/adoption-requests/${requestId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${tokenData?.token}` },
    });

    toast.success('Request cancelled');
    router.refresh();
  };

  return (
    <button
      onClick={handleCancel}
      className="bg-red-600 hover:bg-red-700 text-white py-2 rounded-xl transition w-full"
    >
      Cancel
    </button>
  );
}