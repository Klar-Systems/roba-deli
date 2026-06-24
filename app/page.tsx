import TopBar from "@/components/TopBar";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Deals from "@/components/Deals";
import Menu from "@/components/Menu";
import Craft from "@/components/Craft";
import Smoothies from "@/components/Smoothies";
import Reviews from "@/components/Reviews";
import Visit from "@/components/Visit";
import Footer from "@/components/Footer";
import ScrollFX from "@/components/ScrollFX";

export default function Home() {
  return (
    <>
      <TopBar />
      <Nav />
      <main>
        <Hero />
        <About />
        <Deals />
        <Menu />
        <Craft />
        <Smoothies />
        <Reviews />
        <Visit />
      </main>
      <Footer />
      <ScrollFX />
    </>
  );
}
