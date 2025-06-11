// App.js
import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

const Home = lazy(() => import("./utilities/Home"));
const Services = lazy(() => import("./pages/Services"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Reviews = lazy(() => import("./pages/Reviews"));
const Contact = lazy(() => import("./pages/main/Contact"));
const FAQ = lazy(() => import("./pages/main/FAQ"));
const AboutUs = lazy(() => import("./pages/AboutUs"));
const PrivacyPolicy = lazy(() => import("./sections/PrivacyPolicy"));

const LocationsPage = lazy(() => import("./pages/LocationsPage"));
const BecomeAPatientPage = lazy(() => import("./pages/BecomeAPatientPage"));
const BookAppointmentPage = lazy(() => import("./pages/BookAppointmentPage"));
const BookAppointmentStep2 = lazy(() => import("./pages/BookAppointmentStep2"));
const BookAppointmentStep3 = lazy(() => import("./pages/BookAppointmentStep3"));
const BookAppointmentStep4 = lazy(() => import("./pages/BookAppointmentStep4"));
const BookAppointmentStep5 = lazy(() => import("./pages/BookAppointmentStep5"));
const BookAppointmentStep6 = lazy(() => import("./pages/BookAppointmentStep6"));

const AminoAsylumLandingPage = lazy(() => import("./pages/AminoAsylumLandingPage"));
const AminoAsylumPage2 = lazy(() => import("./pages/AminoAsylumPage2"));
const AminoAsylumPage3 = lazy(() => import("./pages/AminoAsylumPage3"));
const AminoAsylumPage4 = lazy(() => import("./pages/AminoAsylumPage4"));
const AminoAsylumPage5 = lazy(() => import("./pages/AminoAsylumPage5"));
const AminoAsylumPage6 = lazy(() => import("./pages/AminoAsylumPage6"));

const WooFormPage1 = lazy(() => import("./pages/WooFormPage1"));
const WooFormPage2 = lazy(() => import("./pages/WooFormPage2"));
const WooFormPage3 = lazy(() => import("./pages/WooFormPage3"));
const WooFormPage4 = lazy(() => import("./pages/WooFormPage4"));
const WooFormPage5 = lazy(() => import("./pages/WooFormPage5"));
const WooFormPage6 = lazy(() => import("./pages/WooFormPage6"));

function App() {
  return (
    <div className="container">
      <Navbar />
      <main className="content">
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services/" element={<Services />} />
            <Route path="/services/:serviceId/" element={<Services />} />
            <Route path="/pricing/" element={<Pricing />} />
            <Route path="/reviews/" element={<Reviews />} />
            <Route path="/contact/" element={<Contact />} />
            <Route path="/faq/" element={<FAQ />} />
            <Route path="/about-us/" element={<AboutUs />} />
            <Route path="/privacy-policy/" element={<PrivacyPolicy />} />
            <Route path="/terms-and-conditions/" element={<PrivacyPolicy />} />
            <Route path="/locations/" element={<LocationsPage />} />
            <Route path="/locations/:locationId/" element={<LocationsPage />} />
            <Route path="/become-a-patient/" element={<BecomeAPatientPage />} />
            <Route path="/book-appointment/" element={<BookAppointmentPage />} />
            <Route path="/book-appointment-step2/" element={<BookAppointmentStep2 />} />
            <Route path="/book-appointment-step3/" element={<BookAppointmentStep3 />} />
            <Route path="/book-appointment-step4/" element={<BookAppointmentStep4 />} />
            <Route path="/book-appointment-step5/" element={<BookAppointmentStep5 />} />
            <Route path="/book-appointment-step6/" element={<BookAppointmentStep6 />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  );
}

export default App;
