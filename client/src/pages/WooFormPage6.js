import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import SignatureCanvas from "react-signature-canvas";
import "./WooFormPage.css";

export default function WooFormPage6() {
  const navigate = useNavigate();
  const stored = JSON.parse(localStorage.getItem("wooFormData") || "{}");

  const {
    register,
    handleSubmit,
    trigger,
    setValue,
    watch,
    formState: { errors },
  } = useForm({ mode: "onChange", defaultValues: stored });

  const patientSig = useRef(null);

  useEffect(() => {
    trigger();
    register("patientSignature6", { required: true });
  }, [trigger, register]);

  const reqClass = (err) => (err ? "wc-required error" : "wc-required valid");

  const handleEnd = () => {
    if (patientSig.current) {
      const dataURL = patientSig.current.getTrimmedCanvas().toDataURL();
      setValue("patientSignature6", dataURL, { shouldValidate: true });
    }
  };

  const clearSig = () => {
    if (patientSig.current) patientSig.current.clear();
    setValue("patientSignature6", "");
  };

  const onSubmit = (data) => {
    const full = { ...stored, ...data };
    localStorage.setItem("wooFormData", JSON.stringify(full));
    navigate("/confirmation");
  };

  const today = new Date().toLocaleDateString("en-US");

  return (
    <div className="wc-container">
      <div className="wc-content">
        <h1 className="wc-title">Telemedicine Consultation Forms (Woocommerce)</h1>
        <div className="wc-paper">
          <div className="wc-progress">
            <div className="wc-progress-info">
              <p>Step 6 of 6</p>
            </div>
            <div className="wc-progress-bg">
              <div className="wc-progress-fill" style={{ width: '100%' }} />
            </div>
          </div>

          <form className="wc-form" onSubmit={handleSubmit(onSubmit)}>
            <p className="wc-section-title">Control Substance Auto-refill Consent</p>
            <div className="wc-consent-text">
              <p>
                I understand that Pure Health &amp; Wellness has enrolled my controlled
                substance medication in Tailor Made Compounding’s auto-refill program.
              </p>
              <p><strong>Liability and Responsibility:</strong></p>
              <ul>
                <li>
                  I understand that TMC will not call and/or email to notify me or Pure
                  Health & Wellness that my medication is being refilled.
                </li>
                <li>
                  I understand that this form is a legal replacement in regards to
                  receiving a call to notify me that my prescription is due to be
                  filled and will be shipped to me without confirmation.
                </li>
                <li>
                  I understand that it is my responsibility to immediately report any
                  change in regards to my shipping address.
                </li>
                <li>
                  I understand that I will be held responsible for notifying TMC in
                  the event my controlled substance package(s) are lost or stolen. I
                  will inquire about the next steps for contacting UPS and filing a
                  police report, and I fully understand if I do not take these next
                  steps that I may not be eligible for any medication replacements.
                </li>
                <li>
                  I understand that I will be held responsible for any added expenses
                  of lost or stolen packages.
                </li>
                <li>
                  I understand that I will be responsible for notifying TMC if I have
                  a pause and/or discontinuation of medication.
                </li>
                <li>
                  I understand that it is my responsibility to notify TMC if my dosing
                  or quantity prescribed has changed and any previous prescription’s
                  refills will need to be canceled.
                </li>
                <li>
                  I understand that if I do not notify TMC before a prescription has
                  left their facility, I will still be held responsible for the
                  payment of this prescription.
                </li>
              </ul>
              <p>
                In accordance with state law KRS 218A.180 a controlled substance
                included in Schedules III, IV, and V “shall not be filled or refilled
                more than six (6) months after the date issued or be refilled more
                than five (5) times, unless renewed by the practitioner and a new
                prescription, written, electronic, or oral shall be required”.
                Therefore, any prescriptions exceeding 6 months from date written,
                will require a new order to be sent in or verbal renewal by prescriber
                regardless of refills remaining.
              </p>
            </div>

            {/* Patient Name */}
            <div className="wc-group">
              <label>Patient Name</label>
              <p>
                {stored.firstName || ''} {stored.lastName || ''}
              </p>
            </div>

            {/* Patient Signature */}
            <div className="wc-group">
              <label>
                Patient Signature{' '}
                <span className={reqClass(errors.patientSignature6)}>(Required)</span>
              </label>
              <SignatureCanvas
                ref={patientSig}
                penColor="black"
                canvasProps={{ className: 'wc-signature-canvas' }}
                onEnd={handleEnd}
              />
              <button
                type="button"
                className="wc-clear-signature"
                onClick={clearSig}
              >
                Clear Signature
              </button>
              {errors.patientSignature6 && (
                <p className="wc-error-message">Signature is required.</p>
              )}
            </div>

            {/* Date of Birth */}
            <div className="wc-group wc-group--two">
              <label>
                Date of Birth{' '}
                <span className={reqClass(
                  errors.dob6Month || errors.dob6Day || errors.dob6Year
                )}>(Required)</span>
              </label>
              <div className="wc-dob">
                <select
                  className="wc-select"
                  {...register("dob6Month", { required: true })}
                >
                  <option value="">MM</option>
                  {[...Array(12)].map((_, i) => (
                    <option key={i} value={String(i + 1).padStart(2, '0')}>
                      {String(i + 1).padStart(2, '0')}
                    </option>
                  ))}
                </select>
                <select
                  className="wc-select"
                  {...register("dob6Day", { required: true })}
                >
                  <option value="">DD</option>
                  {[...Array(31)].map((_, i) => (
                    <option key={i} value={String(i + 1).padStart(2, '0')}>
                      {String(i + 1).padStart(2, '0')}
                    </option>
                  ))}
                </select>
                <select
                  className="wc-select"
                  {...register("dob6Year", { required: true })}
                >
                  <option value="">YYYY</option>
                  {Array.from({ length: 100 }, (_, k) =>
                    new Date().getFullYear() - k
                  ).map((yr) => (
                    <option key={yr} value={yr}>
                      {yr}
                    </option>
                  ))}
                </select>
              </div>
              {(errors.dob6Month || errors.dob6Day || errors.dob6Year) && (
                <p className="wc-error-message">Month, Day, and Year required.</p>
              )}
            </div>

            {/* Date */}
            <div className="wc-group">
              <label>Date: {today}</label>
            </div>

            {/* Navigation Buttons */}
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button
                type="button"
                className="wc-button wc-button--outline"
                onClick={() => navigate(-1)}
              >
                Previous
              </button>
              <button type="submit" className="wc-button">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}