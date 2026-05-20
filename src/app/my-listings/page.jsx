import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import Link from 'next/link';
import { Editpet } from '@/components/EditModal';
import { DeletePet } from '@/components/Delete';
import { RequestsModal } from '@/components/RequestsModal';

export default async function MyListingsPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  const { token } = await auth.api.getToken({ headers: await headers() });
  const email = session?.user?.email;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/my-listings?email=${email}`,
    { cache: 'no-store', headers: { Authorization: `Bearer ${token}` } }
  );
  const pets = await res.json();

  const total = pets.length;
  const available = pets.filter((p) => p.status !== 'adopted').length;
  const adopted = pets.filter((p) => p.status === 'adopted').length;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold text-gray-800 mb-2">My Listings</h1>
      <p className="text-gray-500 mb-8">Manage your pets listed for adoption</p>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-10">
        {[
          { label: 'Total',     value: total,     color: 'text-cyan-600'   },
          { label: 'Available', value: available, color: 'text-green-600'  },
          { label: 'Adopted',   value: adopted,   color: 'text-purple-600' },
        ].map(({ label, value, color }) => (
          <div key={label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 text-center">
            <p className={`text-3xl font-bold ${color}`}>{value}</p>
            <p className="text-gray-500 text-sm mt-1">{label}</p>
          </div>
        ))}
      </div>

      {/* Listings */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {pets.map((pet) => (
          <div key={pet._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <img src={pet.imageUrl} alt={pet.petName} className="w-full h-48 object-cover" />
            <div className="p-5">
              <div className="flex justify-between items-center mb-1">
                <h2 className="text-xl font-bold text-gray-800">{pet.petName}</h2>
                <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                  pet.status === 'adopted'
                    ? 'bg-purple-100 text-purple-700'
                    : 'bg-green-100 text-green-700'
                }`}>
                  {pet.status === 'adopted' ? 'Adopted' : 'Available'}
                </span>
              </div>
              <p className="text-cyan-600 font-semibold mb-4">৳{pet.adoptionFee}</p>

              <div className="flex flex-wrap gap-2">
                <RequestsModal petId={pet._id.toString()} petName={pet.petName} />
                <Editpet pet={{ ...pet, _id: pet._id.toString() }} />
                <Link href={`/all-pets/${pet._id}`}>
                  <button className="px-3 py-1.5 text-sm rounded-xl border border-gray-200 hover:border-cyan-300 text-gray-600">
                    View
                  </button>
                </Link>
                <DeletePet pet={{ ...pet, _id: pet._id.toString() }} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {pets.length === 0 && (
        <div className="text-center py-20 text-gray-500">
          You haven't listed any pets yet.{' '}
          <Link href="/add-pet" className="text-cyan-500 underline">Add one now</Link>
        </div>
      )}
    </div>
  );
}