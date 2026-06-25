import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Projects from "./components/Projects";
import Gallery from "./components/Gallery";
import Testimonials from "./components/Testimonials";
import SocialFeed from "./components/SocialFeed";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import FeedbackPage from "./components/FeedbackPage";

// If the URL contains ?feedback=TC_x, show the standalone feedback page.
const feedbackProject = new URLSearchParams(window.location.search).get("feedback");

export default function App() {
  if (feedbackProject) {
    return <FeedbackPage projectId={feedbackProject.toUpperCase()} />;
  }

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Projects />
        <Gallery />
        <Testimonials />
        <SocialFeed />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
