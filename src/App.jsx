import { useState } from "react";
import Countdown from "./components/Countdown";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Gallery from "./components/Gallery";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { GopuramTopPattern } from "./components/Decorations";

export default function App() {
  const [siteVisible, setSiteVisible] = useState(false);

  return (
    <>
      {/* Countdown overlay — disappears after launch */}
      {!siteVisible && <Countdown onLaunch={() => setSiteVisible(true)} />}

      {/* Main site — rendered beneath (visible after launch animation) */}
      <div
        className={
          "transition-opacity duration-1000 " +
          (siteVisible ? "opacity-100" : "opacity-0 pointer-events-none")
        }
      >
        <Navbar />

        <main>
          <Hero />
          <Services />
          <Gallery />
          <About />
          <Contact />
        </main>

        {/* Gopuram banner before footer */}
        <GopuramTopPattern className="w-full block" style={{ height: "80px" }} />
        <Footer />
      </div>
    </>
  );
}
