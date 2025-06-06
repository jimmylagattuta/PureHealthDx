import React, { useEffect, useRef } from "react";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import SignatureCanvas from "react-signature-canvas";
import { useNavigate } from "react-router-dom";
import "./BookAppointmentPage.css";

const BookAppointmentStep3 = () => {
  const navigate = useNavigate();

  // Mobile-first defaults for demonstration
  const demoMode = false;

  // Refs for signature canvas
  const sigPad = useRef(null);

  // Default data based on your screenshot
  // Name: "fdfd" (4 of 50 chars)
  // DOB: 9/15/2015
  // Date: "2025-04-11"
  const defaultName = demoMode ? "fdfd" : "";
  const defaultDOB = {
    month: demoMode ? "9" : "",
    day: demoMode ? "15" : "",
    year: demoMode ? "2015" : "",
  };
  const defaultDate = demoMode ? "2025-04-11" : "";

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
      patientName: defaultName,
      dobMonth: defaultDOB.month,
      dobDay: defaultDOB.day,
      dobYear: defaultDOB.year,
      date: defaultDate,
      signature: "",
    },
  });

  const values = watch();

  // Auto-scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Trigger initial validation
  useEffect(() => {
    console.log("Step 3: Triggering initial validation");
    trigger();
  }, [trigger]);

  // If demo mode is true, auto-fill the fields
  useEffect(() => {
    if (demoMode) {
      setValue("patientName", "fdfd"); // The name from screenshot
      setValue("dobMonth", "9");
      setValue("dobDay", "15");
      setValue("dobYear", "2015");
      setValue("date", "2025-04-11");
      console.log("Demo mode: fields auto-filled");
    }
  }, [demoMode, setValue]);

  const clearSignature = () => {
    if (sigPad.current) {
      sigPad.current.clear();
      setValue("signature", "");
      trigger("signature");
    }
  };

const onSubmit = (step3Data) => {
  if (!sigPad.current || sigPad.current.isEmpty()) {
    setValue("signature", "", { shouldValidate: true });
    trigger("signature");
    return;
  }

  const signatureImage = sigPad.current.getTrimmedCanvas().toDataURL();
  step3Data.signature = signatureImage;

  const labeledStep3Data = {
    patientConsentForMedicalServicesPatientName: step3Data.patientName,
    patientConsentForMedicalServicesDobMonth: step3Data.dobMonth,
    patientConsentForMedicalServicesDobDay: step3Data.dobDay,
    patientConsentForMedicalServicesDobYear: step3Data.dobYear,
    patientConsentForMedicalServicesDate: step3Data.date,
    patientConsentForMedicalServicesSignature: step3Data.signature
  };

  const step1And2Data = JSON.parse(localStorage.getItem("appointmentFormData")) || {};
  const fullData = { ...step1And2Data, ...labeledStep3Data };

  console.log("📋 Combined Step 1 + 2 + 3 data:", fullData);

  localStorage.setItem("appointmentFormData", JSON.stringify(fullData));

  navigate("/book-appointment-step4");
};


  // Helper function for required field styling
  const getRequiredClass = (fieldValue, fieldError) => {
    if (!fieldValue) return "required error";
    return fieldError ? "required error" : "required valid";
  };

  return (
    <>
      <Helmet>
        <meta name="robots" content="noindex, nofollow" />
        <title>Step 3 of 6 | Become a Patient</title>
      </Helmet>
        <div className="book-appointment-container">      <div className="banner">
        <div className="banner-overlay"></div>
        <div className="banner-text">
          <h1>Book Telemedicine Consultation</h1>
        </div>
      </div>
          <div className="content-section">
          <h2>Start Your Wellness Journey Today</h2>

            <div className="paper-container">
              {/* Progress Bar */}
              <div className="progress">
                <div className="progress-info">
                  <p>Step 3 of 6</p>
                </div>
                <div className="progress-bar-background">
                  <div className="progress-bar-fill" style={{ width: "50%" }} />
                </div>
              </div>

              {/* Page Title */}
              <h1 style={{ marginBottom: "1rem" }}>
                Patient Consent for Medical Services
              </h1>

              {/* Consent Text */}
              <div className="consent-text">
                <p>
                  This Consent for Medical Services (“CONSENT”) specifies the terms
                  and conditions under which, you, the undersigned patient
                  (“PATIENT”) may secure the availability of medical services offered
                  by (“PRACTICE”):
                </p>
                <p>
                  Pure Health &amp; Wellness 1130 Coffee Rd, Modesto, CA 95355
                </p>
                <p>
                  This consent applies to the PRACTICE, its agents, employees and
                  physician(s). PATIENT and the PRACTICE hereby enter into this
                  agreement for provision of medical services specified herein
                  (SERVICES). Wherefore, in exchange for consideration, the receipt
                  and sufficiency of which the parties hereby acknowledge the PATIENT
                  and PRACTICE agree as follows:
                </p>
                <p>
                  The PATIENT acknowledges and agrees that this agreement has been
                  entered into before the PRACTICE has provided the SERVICES
                  specified herein to the PATIENT.
                </p>
                <p>
                  The PATIENT acknowledges and agrees that this agreement has not
                  been entered into at a time when the PATIENT is facing an
                  emergency or an urgent health care situation.
                </p>
                <p>
                  The PATIENT acknowledges reading and receiving a copy of the Notice
                  of Privacy Practices, and by signing this agreement, the PATIENT
                  authorizes the PRACTICE and its representatives to use and share
                  PATIENT health information as described in the Notices of Privacy
                  Practices.
                </p>
                <p>
                  The PATIENT agrees to let PRACTICE, its agents, employees, and
                  physician(s) provide medical care services. The SERVICES provided
                  to the PATIENT may include:
                </p>
                <ul>
                  <li>Evaluation of patient medical history and lifestyle behaviors</li>
                  <li>Physical examination</li>
                  <li>Blood, urine, fecal, and/or saliva tests</li>
                  <li>Diagnostic testing, bioelectrical and/or imaging tests</li>
                  <li>
                    Medical recommendations and management regarding my health issues
                    and disease prevention
                  </li>
                  <li>Nutrition</li>
                  <li>Nutritional supplementation and/or replacement</li>
                  <li>
                    Physical activity, functional performance, and exercise
                  </li>
                  <li>Lifestyle, environment, and behavior</li>
                  <li>Stress response management</li>
                  <li>Hormone replacement therapy</li>
                  <li>
                    Medication prescription management for those medications
                    prescribed by the PRACTICE
                  </li>
                  <li>
                    Procedures may include but are not limited to Injections,
                    Intravenous infusion therapy, Aesthetic procedures
                  </li>
                </ul>
                <p>
                  PATIENT agrees that PRACTICE has not made any claims or statements
                  about results or cures.
                </p>
                <p>
                  Duration of Consent: PATIENT acknowledges the right to revoke this
                  consent at any time except to the extent PRACTICE has already taken
                  action in reliance on it. If PATIENT does not revoke it, this
                  Consent will continue indefinitely. By signing this agreement, the
                  PATIENT acknowledges that PATIENT has read and fully understands
                  the information contained in this agreement. PATIENT agrees that
                  everything in this Consent applies to current and future health
                  care services provided by PRACTICE
                </p>
              </div>

              {/* Intake Form */}
              <form className="intake-form" onSubmit={handleSubmit(onSubmit)}>
                {/* Patient Name */}
                <div className="form-group">
                  <label>
                    Patient's Name <span className={getRequiredClass(values.patientName, errors.patientName)}>
                      (Required)
                    </span>
                  </label>
                  <input
                    type="text"
                    maxLength={50}
                    {...register("patientName", {
                      required: "Patient's Name is required.",
                    })}
                  />
                  <span className="character-counter">
                    {values.patientName ? values.patientName.length : 0} of 50 max characters
                  </span>
                  {errors.patientName && (
                    <p className="error-message">{errors.patientName.message}</p>
                  )}
                </div>

                {/* Date of Birth */}
                <div className="form-group">
                  <label>
                    Date of Birth{" "}
                    <span
                      className={getRequiredClass(
                        values.dobMonth && values.dobDay && values.dobYear,
                        errors.dobMonth || errors.dobDay || errors.dobYear
                      )}
                    >
                      (Required)
                    </span>
                  </label>
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    <select {...register("dobMonth", { required: "Month is required." })}>
                      <option value="">Month</option>
                      {[...Array(12)].map((_, i) => {
                        const monthVal = i + 1;
                        return (
                          <option key={monthVal} value={String(monthVal)}>
                            {String(monthVal).padStart(2, "0")}
                          </option>
                        );
                      })}
                    </select>
                    <select {...register("dobDay", { required: "Day is required." })}>
                      <option value="">Day</option>
                      {[...Array(31)].map((_, i) => {
                        const dayVal = i + 1;
                        return (
                          <option key={dayVal} value={String(dayVal)}>
                            {String(dayVal).padStart(2, "0")}
                          </option>
                        );
                      })}
                    </select>
                    <select {...register("dobYear", { required: "Year is required." })}>
                      <option value="">Year</option>
                      {[...Array(100)].map((_, i) => {
                        const yearVal = new Date().getFullYear() - i;
                        return (
                          <option key={yearVal} value={String(yearVal)}>
                            {yearVal}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>

                {/* Date (auto-filled) */}
    {/* Signature */}
    <div className="form-group">
      <label>
        Patient Signature{" "}
        <span className={getRequiredClass(values.signature, errors.signature)}>
          (Required)
        </span>
      </label>

      {/* Signature Pad with hint label */}
      <div className="signature-pad-wrapper">
        <div
          className={`signature-hint ${values.signature ? "hidden" : ""}`}
        >
          ✍️ Sign Here
        </div>

    <div className="signature-frame">
    <SignatureCanvas
      ref={(ref) => {
        sigPad.current = ref;

        if (ref && ref.getCanvas()) {
          const canvas = ref.getCanvas();
          Object.assign(canvas.style, {
            border: "none", // border moved to wrapper
            borderRadius: "12px",
            backgroundColor: "#ffffff",
            backgroundImage:
              "repeating-linear-gradient(45deg, #f3f4f6, #f3f4f6 10px, #ffffff 10px, #ffffff 20px)",
            width: "min-content",
            maxWidth: "100%",
            height: "150px",
            display: "block",
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

          // Desktop hover
          canvas.addEventListener("mouseenter", activateHover);
          canvas.addEventListener("mouseleave", deactivateHover);

          // Mobile touch simulation
          canvas.addEventListener("touchstart", activateHover);
          canvas.addEventListener("touchend", deactivateHover);
        }
      }}
      penColor="black"
      canvasProps={{
        width: 400,
        height: 150,
      }}
      onEnd={() => {
        if (
          sigPad.current &&
          typeof sigPad.current.getTrimmedCanvas === "function" &&
          !sigPad.current.isEmpty()
        ) {
          const dataUrl = sigPad.current.getTrimmedCanvas().toDataURL();
          setValue("signature", dataUrl);
          trigger("signature");
        }
      }}

    />

    </div>




      </div>

      <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem" }}>
        <button
          type="button"
          onClick={clearSignature}
          className="clear-signature"
        >
          ↻ Clear Signature
        </button>
      </div>

      {errors.signature && (
        <p className="error-message">Signature is required.</p>
      )}
    </div>


                {/* Navigation Buttons */}
                <div className="form-navigation button-row">
                  <button
                    type="button"
                    className="btn-outline"
                    onClick={() => {
                      console.log("Step 3: Navigating back to step2");
                      navigate("/book-appointment-step2");
                    }}
                  >
                    Previous
                  </button>
                  <button type="submit" className="submit-btn">
                    Next
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
    </>
  );
};

export default BookAppointmentStep3;
