import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { locationsData } from "../data";
import LocationsSection from "../sections/LocationsSection"; // Your office list component
import SingleLocation from "../sections/SingleLocation";
import FooterComponent from "../sections/FooterComponent";
import "./LocationsPage.css";

function LocationsPage() {
  const { locationId } = useParams();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
    agreement: false,
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  // Auto-scroll to the contact form if URL has a hash (#contactForm)
  useEffect(() => {
    if (window.location.hash === "#contactForm") {
      const element = document.getElementById("contactForm");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, []);

  // Form handling
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = "First Name is required.";
    if (!formData.lastName) newErrors.lastName = "Last Name is required.";
    if (!formData.email) {
      newErrors.email = "Email address is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format.";
    }
    if (!formData.phone) {
      newErrors.phone = "Phone number is required.";
    } else if (!/^\+?[1-9]\d{1,14}$/.test(formData.phone)) {
      newErrors.phone = "Invalid phone number. Include country code.";
    }
    if (!formData.message) newErrors.message = "Message is required.";
    if (!formData.agreement) newErrors.agreement = "You must agree to the terms.";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    setErrors({});
    // Submit the form to the /contact endpoint
    try {
      const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute("content");
      const response = await fetch("/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": csrfToken,
        },
        body: JSON.stringify({ contact: formData }),
      });

      if (response.ok) {
        setSubmitted(true);
        console.log("✅ Message sent successfully!");
      } else {
        console.error("❌ Error response from backend:", await response.json());
        setErrors({
          form: "There was an error sending your message. Try again later.",
        });
      }
    } catch (error) {
      console.error("❌ Error during form submission:", error);
      setErrors({
        form: "There was an error sending your message. Try again later.",
      });
    }
  };

  // Determine whether we are showing a single location or the list.
  const isSingleLocation = Boolean(locationId);

  // Build the rich snippet for all locations if we're on the list page.
  let locationsRichSnippet = null;
  if (!isSingleLocation) {
    const locationsArray = Object.entries(locationsData).map(([key, loc]) => {
      const addressParts = loc.address ? loc.address.split(",").map(s => s.trim()) : [];
      let streetAddress = loc.address;
      let addressLocality = "";
      let addressRegion = "";
      let postalCode = "";
      if (addressParts.length >= 3) {
        streetAddress = addressParts[0];
        addressLocality = addressParts[1];
        const regionPostal = addressParts[2].split(" ");
        addressRegion = regionPostal[0];
        postalCode = regionPostal.slice(1).join(" ");
      }
      return {
        "@type": "MedicalClinic",
        "name": loc.name,
        "address": {
          "@type": "PostalAddress",
          "streetAddress": streetAddress,
          "addressLocality": addressLocality,
          "addressRegion": addressRegion,
          "postalCode": postalCode,
          "addressCountry": "US"
        },
        "telephone": loc.phone,
        "url": `https://californiapremierpainclinics.com/locations/${key}`,
        "image": loc.desktopImage || loc.heroImage,
        "description": loc.description
      };
    });
    locationsRichSnippet = {
      "@context": "https://schema.org",
      "@graph": locationsArray
    };
  }

  // Determine content: single location detail or list.
  let officeContent = null;
  if (locationId) {
    const office = locationsData[locationId];
    if (office) {
      officeContent = <SingleLocation office={office} />;
    } else {
      officeContent = (
        <div className="office-detail not-found">
          <h2>Office Not Found</h2>
          <p>Please select a valid location.</p>
        </div>
      );
    }
  } else {
    officeContent = <LocationsSection showButton={false} />;
  }

  return (
    <div>
      {/* Inject rich snippet if on the list page */}
      {!isSingleLocation && locationsRichSnippet && (
        <Helmet>
          <script type="application/ld+json">
            {JSON.stringify(locationsRichSnippet)}
          </script>
        </Helmet>
      )}
      <div className="locations-page-container">
        <div className="contact-header">
          <p className="small-heading">CALIFORNIA PREMIER PAIN CLINICS</p>
          <h2 className="main-heading">Finding Paths to Relief</h2>
          <p className="sub-text">
            Our mission is to reduce your pain and suffering, restore your independence, and improve your quality of life.
          </p>
          <p className="sub-text">
            If your lawyer recommends CPPC for an assessment or continuous care, know that we offer personalized treatments tailored to your needs.
          </p>
        </div>

        {/* Contact Form with auto-scroll anchor */}
        <div id="contactForm">
          {!submitted ? (
            <form className="contact-container" onSubmit={handleSubmit}>
              <div className="contact-left">
                <div className="form-group">
                  <label htmlFor="firstName">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                  />
                  {errors.firstName && <span className="error-message">{errors.firstName}</span>}
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                  />
                  {errors.lastName && <span className="error-message">{errors.lastName}</span>}
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                  {errors.email && <span className="error-message">{errors.email}</span>}
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                  {errors.phone && <span className="error-message">{errors.phone}</span>}
                </div>
                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                  />
                  {errors.message && <span className="error-message">{errors.message}</span>}
                </div>
                <div className="form-group">
                  <input
                    id="checkbox-agree"
                    type="checkbox"
                    name="agreement"
                    checked={formData.agreement}
                    onChange={handleInputChange}
                    required
                  />
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                    <label htmlFor="agreement">
                      By checking this box, I acknowledge that any information submitted will be forwarded to the CPPC office via email and is not a secure messaging system.
                    </label>
                  </div>
                  {errors.agreement && <span className="error-message">{errors.agreement}</span>}
                </div>
              </div>
              <button type="submit" className="submit-button">SEND</button>
            </form>
          ) : (
            <div className="contact-submitted-message">
              <h3>Thank You!</h3>
              <p>Your message has been sent successfully. We will get back to you shortly.</p>
            </div>
          )}
        </div>

        {/* Render office details or full locations list */}
        {officeContent}
      </div>

      <FooterComponent />
    </div>
  );
}

export default LocationsPage;
