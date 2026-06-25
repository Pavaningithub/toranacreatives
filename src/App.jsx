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
import AdminPage from "./components/AdminPage";

const params = new URLSearchParams(window.location.search);
const feedbackProject = params.get("feedback");
const isAdmin = params.has("admin");

export default function App() {
  if (isAdmin) return <AdminPage />;
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
