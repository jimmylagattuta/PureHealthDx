import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import SignatureCanvas from "react-signature-canvas";
import "./AminoAsylumLandingPage.css";

export default function AminoAsylumPage6() {
  const navigate = useNavigate();
  const stored = localStorage.getItem("appointmentFormData");
  const saved = stored ? JSON.parse(stored) : {};

  const sigPadPatient = useRef(null);

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
  const reqClass = (e) => (e ? "aa-required error" : "aa-required valid");

  const clearSignature = () => {
    sigPadPatient.current.clear();
    setValue("patientSignature6", "");
  };

  const saveSignature = () => {
    const dataUrl = sigPadPatient.current.getTrimmedCanvas().toDataURL("image/png");
    setValue("patientSignature6", dataUrl, { shouldValidate: true });
  };

  const onSubmit = (data) => {
    localStorage.setItem(
      "appointmentFormData",
      JSON.stringify({ ...saved, ...data })
    );
    // final submit action, e.g. API call
    console.log("Final data:", { ...saved, ...data });
    navigate("/confirmation");
  };

  return (
    <div className="aa-container">
      <div className="aa-content">
        <h1 className="aa-page-title">
          Book TeleMedicine Consultation – AminoAsylum
        </h1>
        <div className="aa-paper">
          <div className="aa-progress">
            <div className="aa-progress-info">
              <p>Step 6 of 6</p>
            </div>
            <div className="aa-progress-bg">
              <div className="aa-progress-fill" style={{ width: "100%" }} />
            </div>
          </div>

          <h2>Control Substance Auto-refill Consent</h2>
          <p>
            I understand that Pure Health &amp; Wellness has enrolled my controlled substance medication in Tailor Made Compounding’s auto-refill program.
          </p>
          <p><strong>Liability and Responsibility:</strong></p>
          <ol>
            <li>I understand that TMC will not call and/or email to notify me or Pure Health &amp; Wellness that my medication is being refilled.</li>
            <li>I understand that this form is a legal replacement in regards to receiving a call to notify me that my prescription is due to be filled and will be shipped to me without confirmation.</li>
            <li>I understand that it is my responsibility to immediately report any change in regards to my shipping address.</li>
            <li>I understand that myself will be held responsible for notifying Tailor Made Compounding in the event my controlled substance package(s) are lost/stolen. I will inquire about the next steps for contacting UPS and filing a police report, and I fully understand if I do not take these next steps that I may not be eligible for any medication replacements.</li>
            <li>I understand that myself will be held responsible for any added expenses of lost or stolen packages.</li>
            <li>I understand that I will be responsible for notifying TMC if I have a pause and/or discontinuation of medication.</li>
            <li>I understand that it is myself or Pure Health &amp; Wellness responsibility for notifying TMC if my dosing or quantity prescribed has changed and any previous prescription’s refills will need to be canceled.</li>
            <li>I understand that if I do not notify TMC before a prescription has left their facility, I will still be held responsible for the payment of this prescription.</li>
          </ol>
          <p>
            In accordance with state law KRS 218A.180 a controlled substance included in Schedules III, IV, and V "shall not be filled or refilled more than six (6) months after the date issued or be refilled more than five (5) times, unless renewed by the practitioner and a new prescription, written, electronic, or oral shall be required". Therefore, any prescriptions exceeding 6 months from date written, will require a new order to be sent in or verbal renewal by prescriber regardless of refills remaining.
          </p>

          <form className="aa-form" onSubmit={handleSubmit(onSubmit)}>
            {/* Patient Name Display */}
            <div className="aa-form-group aa-form-group--two">
              <div>
                <label>Patient Name</label>
                <p>{saved.firstName} {saved.lastName}</p>
              </div>
              <div>
                <label>Date of Birth</label>
                <span className={reqClass(errors.dobMonth || errors.dobDay || errors.dobYear)}>
                  (Required)
                </span>
                <div style={{ display: "flex", gap: "0.5rem", marginTop: '0.25rem' }}>
                  <select
                    className="aa-select"
                    {...register("dobMonth", { required: true })}
                  >
                    <option value="">MM</option>
                    {[...Array(12)].map((_, i) => (
                      <option key={i} value={String(i+1).padStart(2,'0')}>
                        {String(i+1).padStart(2,'0')}
                      </option>
                    ))}
                  </select>
                  <select
                    className="aa-select"
                    {...register("dobDay", { required: true })}
                  >
                    <option value="">DD</option>
                    {[...Array(31)].map((_, i) => (
                      <option key={i} value={String(i+1).padStart(2,'0')}>
                        {String(i+1).padStart(2,'0')}
                      </option>
                    ))}
                  </select>
                  <select
                    className="aa-select"
                    {...register("dobYear", { required: true })}
                  >
                    <option value="">YYYY</option>
                    {Array.from({ length: 100 }, (_, k) => new Date().getFullYear() - k).map((yr) => (
                      <option key={yr} value={yr}>{yr}</option>
                    ))}
                  </select>
                </div>
                {(errors.dobMonth || errors.dobDay || errors.dobYear) && (
                  <p className="aa-error-message">Month, Day, and Year are required.</p>
                )}
              </div>
            </div>

            {/* Patient Signature */}
            <div className="aa-form-group">
              <label>
                Patient Signature
                <span className={reqClass(errors.patientSignature6)}>
                  (Required)
                </span>
              </label>
              <SignatureCanvas
                penColor="black"
                canvasProps={{ className: "aa-signature-canvas" }}
                ref={sigPadPatient}
                onEnd={saveSignature}
              />
              <button
                type="button"
                className="aa-clear-btn"
                onClick={clearSignature}
              >
                Clear
              </button>
              {errors.patientSignature6 && (
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
              <button type="submit" className="aa-submit-btn">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
