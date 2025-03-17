import React, { useState } from "react";
import "./FAQ.css";
import Contact from "./Contact"; // Adjust path as necessary
import FooterComponent from "../../sections/FooterComponent"; // Adjust path as necessary

const faqData = [
  {
    question: "What services do you offer?",
    answer:
      "Captain Alvarado's Handyman provides a wide range of services, including home repairs, plumbing, painting, moving assistance, and clean-out services. We take care of everything from minor fixes to major projects with professionalism and efficiency.",
  },
  {
    question: "Which areas do you serve?",
    answer:
      "We proudly serve San Luis Obispo County and surrounding areas, including Paso Robles, Atascadero, Grover Beach, Nacimiento Lake, Arroyo Grande, Morro Bay, Los Osos, Pismo Beach, and Cayucos.",
  },
  {
    question: "How can I schedule an appointment?",
    answer:
      "You can schedule an appointment by filling out our contact form or by calling us directly at +1-805-635-1774.",
  },
  {
    question: "What are your working hours?",
    answer:
      "We are available Monday through Saturday from 8:00 AM to 6:00 PM.",
  },
  {
    question: "Do you provide free estimates?",
    answer:
      "Yes! We offer free estimates for all our handyman services. Contact us today to discuss your project.",
  },
  {
    question: "Are you licensed and insured?",
    answer:
      "Yes, Captain Alvarado's Handyman is fully licensed and insured to provide safe, professional, and reliable handyman services.",
  }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <>
      <section className="faqs-section">
        <h1 className="faqs-title">Frequently Asked Questions</h1>
        <p className="faqs-subtitle">
          Please reach out at {" "}
          <a href="mailto:elgatofrmcuba81@gmail.com">elgatofrmcuba81@gmail.com</a> if you can’t find an answer.
        </p>
        <div className="faqs-list">
          {faqData.map((item, index) => (
            <div key={index} className="faq-item">
              <div className="faq-question" onClick={() => toggleFaq(index)}>
                {item.question}
                <span className="faq-toggle">{openIndex === index ? "–" : "+"}</span>
              </div>
              {openIndex === index && (
                <div className="faq-answer">{item.answer}</div>
              )}
            </div>
          ))}
        </div>
      </section>
      <Contact />
      <FooterComponent />
    </>
  );
};

export default FAQ;
