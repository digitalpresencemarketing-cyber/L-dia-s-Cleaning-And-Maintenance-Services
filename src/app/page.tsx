import { fetchSiteConfig } from "@/lib/get-site-config";
import { SiteConfigProvider } from "@/contexts/SiteConfigContext";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustStrip from "@/components/TrustStrip";
import Services from "@/components/Services";
import RecurringPlans from "@/components/RecurringPlans";
import WhyChooseUs from "@/components/WhyChooseUs";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";
import Gallery from "@/components/Gallery";
import ServiceAreas from "@/components/ServiceAreas";
import Owners from "@/components/Owners";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

export default async function Home() {
  const config = await fetchSiteConfig();

  return (
    <SiteConfigProvider config={config}>
      <Navbar />
      <main>
        <Hero />
        <TrustStrip />
        <Services />
        <RecurringPlans />
        <WhyChooseUs />
        <HowItWorks />
        <Testimonials />
        <Gallery />
        <ServiceAreas />
        <Owners />
        <ContactForm />
      </main>
      <Footer />
    </SiteConfigProvider>
  );
}
