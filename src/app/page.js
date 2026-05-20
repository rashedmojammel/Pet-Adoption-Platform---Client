import Banner from "@/components/Banner";
import FeaturedPets from "@/components/FeaturedCard";
import Footer from "@/components/Footer";
import StaticCard from "@/components/StaticCard";
import Image from "next/image";

export default function Home() {
  return (
    <>
    <Banner />
    <FeaturedPets />
    <StaticCard />
    <Footer />
    </>
    
  );
}
