import Banner from "@/components/Banner";
import Link from "next/link";
import { FaDog, FaMapMarkerAlt, FaArrowRight } from "react-icons/fa";

export default async function FeaturedPets() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/pets`, {
    cache: "no-store",
  });
  const allPets = await res.json();
  const featuredPets = allPets.slice(0, 6);

  return (
    <main>
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <p className="text-cyan-500 text-xs tracking-[0.3em] font-semibold uppercase mb-3">
            Available Now
          </p>
          <h2
            className="text-4xl font-bold text-gray-800"
            style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
          >
            Featured Pets
          </h2>
          <p className="text-gray-500 mt-3 max-w-xl mx-auto">
            Meet some of our adorable pets looking for a forever home.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredPets.map((pet) => (
            <div
              key={pet._id}
              className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <div className="overflow-hidden h-56">
                <img
                  src={pet.imageUrl}
                  alt={pet.petName}
                  className="w-full h-full object-cover hover:scale-105 transition duration-500"
                />
              </div>

              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">{pet.petName}</h3>
                    <p className="text-sm text-gray-500">{pet.breed} · {pet.age} yrs</p>
                  </div>
                  <span className="text-xs font-semibold px-2 py-1 rounded-full bg-cyan-50 text-cyan-600 border border-cyan-100">
                    {pet.species}
                  </span>
                </div>

                <p className="flex items-center gap-1.5 text-sm text-gray-400 mb-4">
                  <FaMapMarkerAlt className="text-red-400 text-xs" />
                  {pet.location}
                </p>

                <div className="flex items-center justify-between">
                  <p className="text-cyan-600 font-bold">৳{pet.adoptionFee}</p>
                  <Link href={`/all-pets/${pet._id}`}>
                    <button className="flex items-center gap-1.5 bg-cyan-500 hover:bg-cyan-600 text-white text-sm px-4 py-2 rounded-xl transition">
                      View Details <FaArrowRight className="text-xs" />
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link href="/all-pets">
            <button className="border border-cyan-400 text-cyan-600 hover:bg-cyan-50 font-semibold px-8 py-3 rounded-2xl transition">
              View All Pets →
            </button>
          </Link>
        </div>
      </section>
    </main>
  );
}