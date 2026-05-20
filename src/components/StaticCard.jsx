// import Banner from "@/components/Banner";
import Link from "next/link";
import { FaDog, FaMapMarkerAlt, FaArrowRight, FaHeart, FaShieldAlt, FaSyringe, FaHome, FaStar, FaLeaf, FaPhoneAlt, FaEnvelope, FaMapMarker } from "react-icons/fa";

export default async function StaticCard() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/pets`, {
    cache: "no-store",
  });
  const allPets = await res.json();
  const featuredPets = allPets.slice(0, 6);

  return (
    <main className="bg-gray-50">
      <section className=" py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-orange-400 text-xs tracking-[0.3em] font-semibold uppercase mb-3">
              Make a Difference
            </p>
            <h2
              className="text-4xl font-bold text-gray-800"
              style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
            >
              Why Adopt a Pet?
            </h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto">
              Adopting a pet changes two lives — yours and theirs.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: FaHeart,
                color: "bg-red-50 text-red-500",
                title: "Save a Life",
                text: "Every adoption gives a pet a second chance at a happy, loving life.",
              },
              {
                icon: FaHome,
                color: "bg-cyan-50 text-cyan-500",
                title: "Gain a Companion",
                text: "Pets reduce stress, loneliness, and bring joy to every single day.",
              },
              {
                icon: FaShieldAlt,
                color: "bg-green-50 text-green-500",
                title: "Health Checked",
                text: "All our pets are vet-checked, vaccinated, and ready for their new home.",
              },
              {
                icon: FaLeaf,
                color: "bg-amber-50 text-amber-500",
                title: "Ethical Choice",
                text: "Adoption supports responsible pet ownership and reduces overpopulation.",
              },
            ].map(({ icon: Icon, color, title, text }) => (
              <div key={title} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm text-center hover:shadow-md transition">
                <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center mx-auto mb-4`}>
                  <Icon className="text-xl" />
                </div>
                <h3 className="font-bold text-gray-800 mb-2">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <p className="text-green-500 text-xs tracking-[0.3em] font-semibold uppercase mb-3">
            Happy Endings
          </p>
          <h2
            className="text-4xl font-bold text-gray-800"
            style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
          >
            Success Stories
          </h2>
          <p className="text-gray-500 mt-3 max-w-xl mx-auto">
            Real families, real love. Here's what our adopters say.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              name: "Rahim & Bella",
              location: "Dhaka",
              image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=300&fit=crop",
              story: "Bella came into our lives shy and scared. Now she greets us at the door every single day. Best decision we ever made.",
              pet: "Golden Retriever",
              rating: 5,
            },
            {
              name: "Nusrat & Mochi",
              location: "Chittagong",
              image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=300&fit=crop",
              story: "Mochi is the most affectionate cat I've ever met. The adoption process was smooth and the team was incredibly supportive.",
              pet: "Persian Cat",
              rating: 5,
            },
            {
              name: "Karim & Max",
              location: "Sylhet",
              image: "https://images.unsplash.com/photo-1561037404-61cd46aa615b?w=400&h=300&fit=crop",
              story: "Max was my kids' best friend from day one. He's endlessly patient and full of energy. Our home feels complete now.",
              pet: "Labrador",
              rating: 5,
            },
          ].map(({ name, location, image, story, pet, rating }) => (
            <div key={name} className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition">
              <div className="h-48 overflow-hidden">
                <img src={image} alt={pet} className="w-full h-full object-cover hover:scale-105 transition duration-500" />
              </div>
              <div className="p-6">
                <div className="flex gap-0.5 mb-3">
                  {Array(rating).fill(0).map((_, i) => (
                    <FaStar key={i} className="text-amber-400 text-sm" />
                  ))}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">"{story}"</p>
                <div className="border-t border-gray-100 pt-4">
                  <p className="font-bold text-gray-800">{name}</p>
                  <p className="text-xs text-gray-400">{pet} · {location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pet Care Tips */}
      <section className="bg-gradient-to-b from-cyan-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-cyan-500 text-xs tracking-[0.3em] font-semibold uppercase mb-3">
              Expert Advice
            </p>
            <h2
              className="text-4xl font-bold text-gray-800"
              style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
            >
              Pet Care Tips
            </h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto">
              Keep your furry friend healthy, happy, and loved.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                emoji: "🥗",
                title: "Balanced Nutrition",
                tips: ["Feed age-appropriate food", "Fresh water always available", "Avoid toxic human foods", "Stick to a feeding schedule"],
              },
              {
                emoji: "🏃",
                title: "Exercise & Play",
                tips: ["Daily walks for dogs", "Interactive toys for cats", "Mental stimulation games", "Socialise with other pets"],
              },
              {
                emoji: "🏥",
                title: "Regular Vet Visits",
                tips: ["Annual health checkups", "Keep vaccinations updated", "Monthly flea & tick prevention", "Dental hygiene check"],
              },
            ].map(({ emoji, title, tips }) => (
              <div key={title} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition">
                <div className="text-4xl mb-4">{emoji}</div>
                <h3 className="font-bold text-gray-800 text-lg mb-4">{title}</h3>
                <ul className="space-y-2">
                  {tips.map((tip) => (
                    <li key={tip} className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 flex-shrink-0" />
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Counter */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="bg-gradient-to-r from-cyan-500 to-teal-500 rounded-3xl p-12">
          <div className="text-center mb-10">
            <h2
              className="text-4xl font-bold text-white"
              style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
            >
              Our Impact So Far
            </h2>
            <p className="text-cyan-100 mt-2">Together we're making a difference</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "1,200+", label: "Pets Adopted" },
              { value: "850+",   label: "Happy Families" },
              { value: "200+",   label: "Rescue Partners" },
              { value: "50+",    label: "Cities Covered" },
            ].map(({ value, label }) => (
              <div key={label}>
                <p className="text-4xl font-bold text-white mb-1">{value}</p>
                <p className="text-cyan-100 text-sm">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact / CTA */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-violet-500 text-xs tracking-[0.3em] font-semibold uppercase mb-3">
              Get In Touch
            </p>
            <h2
              className="text-4xl font-bold text-gray-800"
              style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
            >
              Have Questions?
            </h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto">
              We're here to help you find the perfect pet and guide you through the adoption process.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              { icon: FaPhoneAlt,  color: "bg-cyan-50 text-cyan-500",    title: "Call Us",       info: "+880 1234 567 890"   },
              { icon: FaEnvelope,  color: "bg-green-50 text-green-500",  title: "Email Us",      info: "support@petnest.com" },
              { icon: FaMapMarker, color: "bg-violet-50 text-violet-500",title: "Visit Us",      info: "Dhaka, Bangladesh"   },
            ].map(({ icon: Icon, color, title, info }) => (
              <div key={title} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm text-center hover:shadow-md transition">
                <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center mx-auto mb-4`}>
                  <Icon className="text-xl" />
                </div>
                <h3 className="font-bold text-gray-800 mb-1">{title}</h3>
                <p className="text-sm text-gray-500">{info}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link href="/all-pets">
              <button className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold px-10 py-4 rounded-2xl transition shadow-sm hover:shadow-md hover:-translate-y-0.5">
                Start Adopting Today 🐾
              </button>
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}