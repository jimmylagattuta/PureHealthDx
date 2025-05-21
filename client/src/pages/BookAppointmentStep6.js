import React, { useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import SignatureCanvas from "react-signature-canvas";
import { useNavigate } from "react-router-dom";
import "./BookAppointmentPage.css";

const BookAppointmentStep6 = () => {
  const navigate = useNavigate();

  // Demo mode flag – when true, default data will be auto-filled.
  const demoMode = true;

  // Ref for the patient signature pad
  const patientSigPad = useRef(null);

  // Preferred default value for DOB can be set here; otherwise, it remains empty.
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

  // Auto scroll to the top when this component mounts.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // In demo mode, auto-fill non-signature data.
  useEffect(() => {
    if (demoMode) {
      setValue("patientName", "John Doe");
      setValue("dob", "1980-01-01");
      console.log("Demo mode enabled: Default data auto-filled");
    }
  }, [demoMode, setValue]);

  // Trigger initial validation on mount.
  useEffect(() => {
    console.log("Step 6: Triggering initial validation");
    trigger();
  }, [trigger]);

  // Log the saved appointment data from previous steps and this step's form values when the component mounts.
  useEffect(() => {
    const storedData = localStorage.getItem("appointmentFormData");
    if (storedData) {
      console.log("Step 6: Stored appointment data from previous steps:", JSON.parse(storedData));
    } else {
      console.log("Step 6: No stored appointment data found.");
    }
    console.log("Step 6: Current form values on mount:", values);
  }, []); // once on mount

  // Optional: Log current Step 6 form values whenever they change.
  useEffect(() => {
    console.log("Step 6: Current form values updated:", values);
  }, [values]);

  // Function to clear the patient signature.
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

    const signatureData = patientSigPad.current.getTrimmedCanvas().toDataURL();
    step6Data.patientSignature = signatureData;

    const labeledStep6Data = {
      controlledSubstanceAutoRefillConsentPatientName: step6Data.patientName,
      controlledSubstanceAutoRefillConsentPatientSignature: step6Data.patientSignature,
      controlledSubstanceAutoRefillConsentDob: step6Data.dob,
    };

    const previousSteps = JSON.parse(localStorage.getItem("appointmentFormData")) || {};
    const fullData = { ...previousSteps, ...labeledStep6Data };

    console.log("📋 Final Combined Step 1–6 Submission:", fullData);

    try {
      const response = await fetch("/appointment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ appointment: fullData }),
      });

      const result = await response.json();
      if (response.ok) {
        console.log("✅ Appointment submitted successfully:", result);
        // optionally reset localStorage or show success UI here
      } else {
        console.error("❌ Server returned error:", result);
      }
    } catch (err) {
      console.error("❌ Failed to send appointment:", err);
    }
  };

  return (
    <form className="intake-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="book-appointment-container">
        {/* Banner */}
        <div className="banner">
          <div className="banner-overlay"></div>
          <div className="banner-text">
            <h1>Book Telemedicine Consultation</h1>
          </div>
        </div>

        {/* Main Content */}
        <div className="content-section">
          <h2>Start Your Wellness Journey Today</h2>
          <div className="paper-container">
            {/* Progress Bar */}
            <div className="progress">
              <div className="progress-info">
                <p>Step 6 of 6</p>
              </div>
              <div className="progress-bar-background">
                <div className="progress-bar-fill" style={{ width: "100%" }} />
              </div>
            </div>

            {/* Consent Text */}
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

            {/* Patient's Information */}
            <div className="form-group">
              <label>Patient's Name (Required)</label>
              <input
                type="text"
                maxLength="50"
                {...register("patientName", {
                  required: "Patient's Name is required",
                })}
              />
              <span className="character-counter">
                {values.patientName ? values.patientName.length : 0} of 50 max characters
              </span>
              {errors.patientName && (
                <p className="error-message">{errors.patientName.message}</p>
              )}
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
                      const dataUrl = patientSigPad.current
                        .getTrimmedCanvas()
                        .toDataURL();
                      setValue("patientSignature", dataUrl);
                      trigger("patientSignature");
                    }
                  }}
                />
              </div>
              <button
                type="button"
                onClick={clearPatientSignature}
                className="clear-signature"
              >
                Clear Signature
              </button>
              {errors.patientSignature && (
                <p className="error-message">
                  {errors.patientSignature.message}
                </p>
              )}
            </div>

            <div className="form-group">
              <label>Date of Birth (Required)</label>
              <input
                type="date"
                {...register("dob", { required: "Date of Birth is required" })}
              />
              {errors.dob && (
                <p className="error-message">{errors.dob.message}</p>
              )}
            </div>

            {/* Navigation Buttons */}
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
  );
};

export default BookAppointmentStep6;
