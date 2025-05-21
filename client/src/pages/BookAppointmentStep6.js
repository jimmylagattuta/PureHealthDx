import React, { useRef, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import SignatureCanvas from "react-signature-canvas";
import { useNavigate } from "react-router-dom";
import "./BookAppointmentPage.css";

const BookAppointmentStep6 = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [flashMessage, setFlashMessage] = useState("");

  const demoMode = true;
  const patientSigPad = useRef(null);
  const defaultDOB = "";

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
      dob: defaultDOB,
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
        setTimeout(() => {
          navigate("/");
        }, 2000);
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
      {flashMessage && (
        <div className="flash-message">
          {flashMessage}
        </div>
      )}

      {isLoading && (
        <div className="loading-spinner">
          Submitting<span className="dots"></span>
        </div>
      )}

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
                <div className="progress-info">
                  <p>Step 6 of 6</p>
                </div>
                <div className="progress-bar-background">
                  <div className="progress-bar-fill" style={{ width: "100%" }} />
                </div>
              </div>

              <div className="consent-text">
                <p>
                  I understand that Pure Health &amp; Wellness has enrolled my controlled
                  substance medication in Tailor Made Compounding’s auto-refill program.
                </p>
                <p><strong>Liability and Responsibility:</strong></p>
                <p>I understand that TMC will not notify me or the clinic of refills...</p>
                {/* Truncated for brevity */}
              </div>

              <div className="form-group">
                <label>Patient's Name (Required)</label>
                <input
                  type="text"
                  maxLength="50"
                  {...register("patientName", { required: "Patient's Name is required" })}
                />
                <span className="character-counter">
                  {values.patientName?.length || 0} of 50 max characters
                </span>
                {errors.patientName && <p className="error-message">{errors.patientName.message}</p>}
              </div>

              <div className="form-group">
                <label>Patient Signature (Required)</label>
                <div className="signature-pad-wrapper">
                  <SignatureCanvas
                    ref={patientSigPad}
                    penColor="black"
                    canvasProps={{
                      width: 400,
                      height: 150,
                      className: "signature-canvas-fixed",
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
                <button
                  type="button"
                  className="btn-outline"
                  onClick={() => navigate("/book-appointment-step5")}
                >
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
