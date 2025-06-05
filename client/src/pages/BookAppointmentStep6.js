import React, { useRef, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import SignatureCanvas from "react-signature-canvas";
import { useNavigate } from "react-router-dom";
import "./BookAppointmentPage.css";

const BookAppointmentStep6 = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [flashMessage, setFlashMessage] = useState("");
  const demoMode = false;
  const patientSigPad = useRef(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    trigger,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      patientName: "",
      patientSignature: "",
      dob: "",
    },
  });

  const values = watch();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (demoMode) {
      setValue("patientName", "John Doe");
      setValue("dob", "1980-01-01");
    }
  }, [demoMode, setValue]);

  useEffect(() => {
    trigger();
  }, [trigger]);

  useEffect(() => {
    const storedData = localStorage.getItem("appointmentFormData");
    if (storedData) {
      console.log("Loaded stored form data:", JSON.parse(storedData));
    }
  }, []);

  const applySignatureCanvasStyles = (ref) => {
    if (ref && ref.getCanvas()) {
      const canvas = ref.getCanvas();
      Object.assign(canvas.style, {
        border: "none",
        borderRadius: "12px",
        backgroundColor: "#ffffff",
        backgroundImage:
          "repeating-linear-gradient(45deg, #f3f4f6, #f3f4f6 10px, #ffffff 10px, #ffffff 20px)",
        width: "min-content",
        maxWidth: "100%",
        height: "150px",
        display: "block",
        boxSizing: "border-box",
        transition: "box-shadow 0.3s ease, transform 0.2s ease",
      });

      const activateHover = () => {
        canvas.style.boxShadow = "0 8px 24px rgba(37, 99, 235, 0.35)";
        canvas.style.transform = "scale(1.01)";
      };

      const deactivateHover = () => {
        canvas.style.boxShadow = "0 6px 20px rgba(37, 99, 235, 0.2)";
        canvas.style.transform = "scale(1)";
      };

      canvas.addEventListener("mouseenter", activateHover);
      canvas.addEventListener("mouseleave", deactivateHover);
      canvas.addEventListener("touchstart", activateHover);
      canvas.addEventListener("touchend", deactivateHover);
    }
  };

  const clearPatientSignature = () => {
    if (patientSigPad.current) {
      patientSigPad.current.clear();
      setValue("patientSignature", "");
      trigger("patientSignature");
    }
  };

  const onSubmit = async (step6Data) => {
    if (!patientSigPad.current || patientSigPad.current.isEmpty()) {
      setValue("patientSignature", "", { shouldValidate: true });
      trigger("patientSignature");
      return;
    }

    setIsLoading(true);
    const signatureData = patientSigPad.current.getTrimmedCanvas().toDataURL();
    step6Data.patientSignature = signatureData;

    const labeledStep6Data = {
      controlledSubstanceAutoRefillConsentPatientName: step6Data.patientName,
      controlledSubstanceAutoRefillConsentPatientSignature: step6Data.patientSignature,
      controlledSubstanceAutoRefillConsentDob: step6Data.dob,
    };

    const previousSteps = JSON.parse(localStorage.getItem("appointmentFormData")) || {};
    const fullData = { ...previousSteps, ...labeledStep6Data };

    try {
      const response = await fetch("/appointment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ appointment: fullData }),
      });

      const result = await response.json();

      if (response.ok) {
        console.log("✅ Submitted:", result);
        localStorage.removeItem("appointmentFormData");
        setFlashMessage("✅ Appointment submitted successfully!");
        setTimeout(() => navigate("/"), 2000);
      } else {
        console.error("❌ Server error:", result);
        setFlashMessage("❌ Error submitting appointment. Please try again.");
      }
    } catch (err) {
      console.error("❌ Network error:", err);
      setFlashMessage("❌ Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <meta name="robots" content="noindex, nofollow" />
        <title>Step 6 of 6 | Become a Patient</title>
      </Helmet>
      {flashMessage && <div className="flash-message">{flashMessage}</div>}
      {isLoading && <div className="loading-spinner">Submitting<span className="dots"></span></div>}
      <form className="intake-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="book-appointment-container">
          <div className="banner">
            <div className="banner-overlay"></div>
            <div className="banner-text">
              <h1>Book Telemedicine Consultation</h1>
            </div>
          </div>
          <div className="content-section">
            <h2>Start Your Wellness Journey Today</h2>
            <div className="paper-container">
              <div className="progress">
                <div className="progress-info"><p>Step 6 of 6</p></div>
                <div className="progress-bar-background">
                  <div className="progress-bar-fill" style={{ width: "100%" }} />
                </div>
              </div>


            <div className="consent-text">
              <p>
                I understand that Pure Health &amp; Wellness has enrolled my controlled
                substance medication in Tailor Made Compounding’s auto-refill program.
              </p>
              <p>
                <strong>Liability and Responsibility:</strong>
              </p>
              <p>
                I understand that TMC will not call and/or email to notify me or Pure Health
                &amp; Wellness that my medication is being refilled.
              </p>
              <p>
                I understand that this form is a legal replacement in regards to receiving a
                call to notify me that my prescription is due to be filled and will be shipped
                to me without confirmation.
              </p>
              <p>
                I understand that it is my responsibility to immediately report any change in
                regards to my shipping address.
              </p>
              <p>
                I understand that I will be held responsible for notifying Tailor Made Compounding
                in the event my controlled substance package(s) are lost/stolen. I will inquire
                about the next steps for contacting UPS and filing a police report, and I fully
                understand if I do not take these next steps that I may not be eligible for any
                medication replacements.
              </p>
              <p>
                I understand that I will be held responsible for any added expenses of lost or
                stolen packages.
              </p>
              <p>
                I understand that I will be responsible for notifying TMC if I have a pause and/or
                discontinuation of medication.
              </p>
              <p>
                I understand that it is my responsibility, or that of Pure Health &amp; Wellness,
                to notify TMC if my dosing or quantity prescribed has changed and any previous
                prescription’s refills will need to be canceled.
              </p>
              <p>
                I understand that if I do not notify TMC before a prescription has left their
                facility, I will still be held responsible for the payment of this prescription.
              </p>
              <p>
                In accordance with state law KRS 218A.180 a controlled substance included in
                Schedules III, IV, and V "shall not be filled or refilled more than six (6) months
                after the date issued or be refilled more than five (5) times, unless renewed by the
                practitioner and a new prescription, written, electronic, or oral shall be
                required". Therefore, any prescriptions exceeding 6 months from date written, will
                require a new order to be sent in or verbal renewal by prescriber regardless of
                refills remaining.
              </p>
            </div>


              <div className="form-group">
                <label>Patient's Name (Required)</label>
                <input
                  type="text"
                  maxLength="50"
                  {...register("patientName", { required: "Patient's Name is required" })}
                />
                <span className="character-counter">{values.patientName?.length || 0} of 50 max characters</span>
                {errors.patientName && <p className="error-message">{errors.patientName.message}</p>}
              </div>

              <div className="form-group">
                <label>Patient Signature (Required)</label>
                <div className="signature-frame">
                  <SignatureCanvas
                    ref={(ref) => {
                      patientSigPad.current = ref;
                      applySignatureCanvasStyles(ref);
                    }}
                    penColor="black"
                    canvasProps={{
                      width: 400,
                      height: 150,
                    }}
                    onEnd={() => {
                      if (!patientSigPad.current.isEmpty()) {
                        const dataUrl = patientSigPad.current.getTrimmedCanvas().toDataURL();
                        setValue("patientSignature", dataUrl);
                        trigger("patientSignature");
                      }
                    }}
                  />
                </div>
                <button type="button" onClick={clearPatientSignature} className="clear-signature">
                  Clear Signature
                </button>
                {errors.patientSignature && (
                  <p className="error-message">{errors.patientSignature.message}</p>
                )}
              </div>

              <div className="form-group">
                <label>Date of Birth (Required)</label>
                <input
                  type="date"
                  {...register("dob", { required: "Date of Birth is required" })}
                />
                {errors.dob && <p className="error-message">{errors.dob.message}</p>}
              </div>

              <div className="form-navigation button-row">
                <button type="button" className="btn-outline" onClick={() => navigate("/book-appointment-step5")}>
                  Previous
                </button>
                <button type="submit" className="submit-btn">
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default BookAppointmentStep6;
