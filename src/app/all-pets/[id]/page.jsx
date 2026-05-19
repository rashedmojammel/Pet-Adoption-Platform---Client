import React from 'react';
import Link from 'next/link';
import {
  FaDog, FaBirthdayCake, FaDna, FaMapMarkerAlt, FaHome,
  FaSyringe, FaPhoneAlt, FaArrowLeft, FaShieldAlt,
  FaCheckCircle, FaVenusMars,
} from 'react-icons/fa';
import { AdoptForm } from '@/components/AdoptForm';
import { Button } from '@heroui/react';
import { Editpet } from '@/components/EditModal';
import { DeletePet } from '@/components/Delete';
import { authClient } from '@/lib/auth-client';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

const PetDetailsPage = async ({ params }) => {
  const { id } = await params;
  const {token} = await auth.api.getToken({
    headers: await headers()
  });
  console.log("Token in PetDetailsPage:", token);

  const res = await fetch(`http://localhost:5000/pets/${id}`,{
    headers : {
      Authorization: `Bearer ${token}`
    }
  });
  const pet = await res.json();

  const {
    petName, species, age, breed, gender, location,
    description, imageUrl, healthStatus, vaccinationStatus,
    adoptionFee, ownerEmail,
  } = pet;

  const badges = [
    { icon: FaCheckCircle, label: healthStatus || 'Healthy',         color: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
    { icon: FaSyringe,     label: vaccinationStatus || 'Vaccinated', color: 'bg-cyan-100 text-cyan-700 border-cyan-200' },
    { icon: FaVenusMars,   label: gender || 'Unknown',               color: 'bg-violet-100 text-violet-700 border-violet-200' },
  ];

  const stats = [
    { icon: FaDog,          label: 'Species',  value: species,                                   color: 'text-orange-400' },
    { icon: FaBirthdayCake, label: 'Age',      value: `${age} ${age === 1 ? 'year' : 'years'}`, color: 'text-pink-400' },
    { icon: FaDna,          label: 'Breed',    value: breed,                                     color: 'text-violet-400' },
    { icon: FaMapMarkerAlt, label: 'Location', value: location,                                  color: 'text-red-400' },
  ];

  return (
    <main className="min-h-screen bg-gray-50">

      <section className="max-w-6xl mx-auto px-6 py-8">

        <div className='flex justify-between space-x-3 mb-4'>
          <div>
            <Button variant='secondary'>
              <Link href="/all-pets" className='flex gap-3'>
                <FaArrowLeft className="text-xs" /> Back to All Pets
              </Link>
            </Button>
          </div>
          <div className='flex gap-3'>
            <Editpet pet={pet} />
            <DeletePet pet={pet} />
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">

            {/* ── Left: Image ── */}
            <div className="relative">
              <div className="sticky top-24">
                <div className="aspect-[4/3] lg:aspect-auto lg:h-[560px] overflow-hidden">
                  <img
                    src={imageUrl}
                    alt={petName}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

                {adoptionFee && (
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-2xl px-4 py-2 shadow-lg">
                    <p className="text-xs text-gray-400 uppercase tracking-widest">Adoption Fee</p>
                    <p className="text-xl font-bold text-cyan-600">${adoptionFee}</p>
                  </div>
                )}

                <div className="absolute bottom-6 left-6 text-white">
                  <p className="text-xs tracking-[0.25em] uppercase text-green-300 mb-1">{species}</p>
                  <h1 className="text-4xl font-bold drop-shadow-lg" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>
                    {petName}
                  </h1>
                </div>
              </div>
            </div>

            {/* ── Right: Info ── */}
            <div className="p-8 lg:p-10 flex flex-col gap-7">

              <div className="flex flex-wrap gap-2">
                {badges.map(({ icon: Icon, label, color }) => (
                  <span key={label} className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border ${color}`}>
                    <Icon className="text-xs" />
                    {label}
                  </span>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-4">
                {stats.map(({ icon: Icon, label, value, color }) => (
                  <div key={label} className="bg-gray-50 rounded-2xl p-4 border border-gray-100 hover:border-cyan-200 transition-colors">
                    <Icon className={`text-xl mb-1 ${color}`} />
                    <p className="text-xs text-gray-400 uppercase tracking-widest">{label}</p>
                    <p className="text-sm font-semibold text-gray-800 mt-0.5">{value || '—'}</p>
                  </div>
                ))}
              </div>

              <hr className="border-gray-100" />

              <div>
                <h2 className="text-xs uppercase tracking-[0.2em] text-gray-400 font-semibold mb-3">
                  About {petName}
                </h2>
                <p className="text-gray-600 leading-relaxed text-sm">
                  {description || 'No description provided yet. Contact us for more details about this adorable pet.'}
                </p>
              </div>

              <hr className="border-gray-100" />

              {ownerEmail && (
                <div className="flex items-center gap-3 bg-gray-50 rounded-2xl px-4 py-3 border border-gray-100">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-cyan-400 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    {ownerEmail[0].toUpperCase()}
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-widest">Listed by</p>
                    <p className="text-sm font-semibold text-gray-700">{ownerEmail}</p>
                  </div>
                </div>
              )}

              {/* AdoptForm handles session internally via authClient.useSession() */}
              <div className="flex flex-col sm:flex-row gap-3 mt-auto">
                <AdoptForm petName={petName} />
              </div>

            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            { icon: FaHome,      iconColor: 'text-cyan-500',    iconBg: 'bg-cyan-50',    title: 'Home Visit',            text: 'We may arrange a home visit to ensure a perfect match for both you and the pet.' },
            { icon: FaShieldAlt, iconColor: 'text-emerald-500', iconBg: 'bg-emerald-50', title: 'Health Guarantee',      text: 'All pets are vet-checked before adoption. Records are provided on pickup.' },
            { icon: FaPhoneAlt,  iconColor: 'text-violet-500',  iconBg: 'bg-violet-50',  title: 'Post-Adoption Support', text: 'Our team is available for guidance and support after you bring your pet home.' },
          ].map(({ icon: Icon, iconColor, iconBg, title, text }) => (
            <div key={title} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md hover:border-cyan-100 transition-all duration-200">
              <div className={`w-11 h-11 rounded-xl ${iconBg} flex items-center justify-center mb-4`}>
                <Icon className={`text-lg ${iconColor}`} />
              </div>
              <h3 className="font-bold text-gray-800 mb-2">{title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
      </section>

    </main>
  );
};

export default PetDetailsPage;