import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import SignatureCanvas from "react-signature-canvas";
import "./AminoAsylumLandingPage.css";

export default function AminoAsylumPage3() {
  const navigate = useNavigate();
  const stored = localStorage.getItem("appointmentFormData");
  const saved = stored ? JSON.parse(stored) : {};

  const sigPad = useRef(null);
  const {
    register,
    handleSubmit,
    trigger,
    setValue,
    watch,
    formState: { errors },
  } = useForm({ mode: "onChange", defaultValues: saved });

  useEffect(() => {
    trigger();
  }, [trigger]);

  const vals = watch();
  const reqClass = (v, e) => (e ? "aa-required error" : "aa-required valid");

  const clearSignature = () => {
    sigPad.current.clear();
    setValue("patientSignature", "");
  };

  const onEndSignature = () => {
    const dataUrl = sigPad.current.getTrimmedCanvas().toDataURL("image/png");
    setValue("patientSignature", dataUrl, { shouldValidate: true });
  };

  const onSubmit = (data) => {
    localStorage.setItem(
      "appointmentFormData",
      JSON.stringify({ ...saved, ...data })
    );
    navigate("/amino-asylum-page-4");
  };

  // Today's date
  const today = new Date().toLocaleDateString();

  return (
    <div className="aa-container">
      <div className="aa-content">
        <h1 className="aa-page-title">
          Book TeleMedicine Consultation – AminoAsylum
        </h1>
        <div className="aa-paper">
          <div className="aa-progress">
            <div className="aa-progress-info">
              <p>Step 3 of 6</p>
            </div>
            <div className="aa-progress-bg">
              <div className="aa-progress-fill" style={{ width: "50%" }} />
            </div>
          </div>

          <h2>Patient Consent for Medical Services</h2>
          <p>
            This Consent for Medical Services (“CONSENT”) specifies the terms and
            conditions under which you, the undersigned patient
            (“PATIENT”) may secure the availability of medical services offered by
            (“PRACTICE”): Pure Health & Wellness 6065 N First St, Fresno, CA
            93710
          </p>
          <p>
            This consent applies to the PRACTICE, its agents, employees and
            physician(s). PATIENT and the PRACTICE hereby enter into this
            agreement for provision of medical services specified herein
            (SERVICES). Wherefore, in exchange for consideration, the receipt and
            sufficiency of which the parties hereby acknowledge the PATIENT and
            PRACTICE agree as follows:
          </p>
          <ol>
            <li>The PATIENT acknowledges and agrees that this agreement has been
              entered into before the PRACTICE has provided the SERVICES
              specified herein to the PATIENT.
            </li>
            <li>The PATIENT acknowledges and agrees that this agreement has not been
              entered into at a time when the PATIENT is facing an emergency or
              an urgent health care situation.
            </li>
            <li>The PATIENT acknowledges reading and receiving a copy of the Notice
              of Privacy Practices, and by signing this agreement, the PATIENT
              authorizes the PRACTICE and its representatives to use and share
              PATIENT health information as described in the Notices of Privacy
              Practices.
            </li>
            <li>The PATIENT agrees to let PRACTICE, its agents, employees, and
              physician(s) provide medical care services. The SERVICES provided
              to the PATIENT may include:
              <ol type="a">
                <li>Evaluation of patient medical history and lifestyle behaviors</li>
                <li>Physical examination</li>
                <li>Blood, urine, fecal, and/or saliva tests</li>
                <li>Diagnostic testing, bioelectrical and/or imaging tests</li>
                <li>Medical recommendations and management regarding my health issues and
                  disease prevention including nutrition, supplementation, exercise,
                  lifestyle, stress management, hormone therapy, etc.
                </li>
                <li>Medication prescription management for those medications prescribed
                  by the PRACTICE</li>
                <li>Procedures may include but are not limited to injections,
                  infusion therapy, aesthetic procedures, etc.
                </li>
              </ol>
            </li>
          </ol>
          <p>
            Duration of Consent: PATIENT acknowledges the right to revoke this
            consent at any time except to the extent PRACTICE has already taken
            action in reliance on it. If PATIENT does not revoke it, this Consent
            will continue indefinitely. By signing this agreement, the PATIENT
            acknowledges that PATIENT has read and fully understands the
            information contained in this agreement. PATIENT agrees that
            everything in this Consent applies to current and future health care
            services provided by PRACTICE.
          </p>

          <form className="aa-form" onSubmit={handleSubmit(onSubmit)}>
            {/* Patient Name Display */}
            <div className="aa-form-group aa-form-group--two">
              <div>
                <label>Patient Name</label>
                <p>{`${saved.firstName || ""} ${saved.lastName || ""}`}</p>
              </div>
              {/* Consent DOB */}
              <div>
                <label>
                  Date of Birth
                  <span className={reqClass(
                    vals.patientDobMonth && vals.patientDobDay && vals.patientDobYear,
                    errors.patientDobMonth || errors.patientDobDay || errors.patientDobYear
                  )}>
                    (Required)
                  </span>
                </label>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <select className="aa-select" {...register("patientDobMonth", { required: true })}>
                    <option value="">Month</option>
                    {[...Array(12)].map((_, i) => (
                      <option key={i} value={String(i + 1).padStart(2, "0")}>{
                        String(i + 1).padStart(2, "0")
                      }</option>
                    ))}
                  </select>
                  <select className="aa-select" {...register("patientDobDay", { required: true })}>
                    <option value="">Day</option>
                    {[...Array(31)].map((_, i) => (
                      <option key={i} value={String(i + 1).padStart(2, "0")}>{
                        String(i + 1).padStart(2, "0")
                      }</option>
                    ))}
                  </select>
                  <select className="aa-select" {...register("patientDobYear", { required: true })}>
                    <option value="">Year</option>
                    {Array.from({ length: 100 }, (_, k) => new Date().getFullYear() - k).map((yr) => (
                      <option key={yr} value={yr}>{yr}</option>
                    ))}
                  </select>
                </div>
                {(errors.patientDobMonth || errors.patientDobDay || errors.patientDobYear) && (
                  <p className="aa-error-message">All fields are required.</p>
                )}
              </div>
            </div>

            {/* Date Signature */}
            <div className="aa-form-group">
              <label>Date: {today}</label>
            </div>

            {/* Signature */}
            <div className="aa-form-group">
              <label>
                Patient Signature
                <span className={reqClass(vals.patientSignature, errors.patientSignature)}>
                  (Required)
                </span>
              </label>
              <SignatureCanvas
                penColor="black"
                canvasProps={{ className: "aa-signature-canvas" }}
                ref={sigPad}
                onEnd={onEndSignature}
              />
              <button type="button" className="aa-clear-btn" onClick={clearSignature}>
                Clear
              </button>
              {errors.patientSignature && (
                <p className="aa-error-message">Signature is required.</p>
              )}
            </div>

            {/* Navigation Buttons */}
            <div className="aa-form-group aa-form-group--two" style={{ justifyContent: 'space-between' }}>
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="aa-submit-btn"
                style={{ background: 'transparent', border: '1px solid #111827', color: '#111827' }}
              >
                Previous
              </button>
              <button type="submit" className="aa-submit-btn">Next</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
