import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import SignatureCanvas from "react-signature-canvas";
import "./WooFormPage.css";

export default function WooFormPage3() {
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

  const sigPad = useRef(null);

  useEffect(() => {
    trigger();
    register("patientSignature", { required: true });
  }, [trigger, register]);

  const vals = watch();
  const reqClass = (err) => (err ? "wc-required error" : "wc-required valid");

  const clearSignature = () => {
    if (sigPad.current) sigPad.current.clear();
    setValue("patientSignature", "");
  };

  const onEndSignature = () => {
    if (sigPad.current) {
      const dataUrl = sigPad.current.getTrimmedCanvas().toDataURL("image/png");
      setValue("patientSignature", dataUrl, { shouldValidate: true });
    }
  };

  const onSubmit = (data) => {
    localStorage.setItem(
      "wooFormData",
      JSON.stringify({ ...stored, ...data })
    );
    navigate("/woo-form-page-4");
  };

  const today = new Date().toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });

  return (
    <div className="wc-container">
      <div className="wc-content">
        <h1 className="wc-title">Telemedicine Consultation Forms (Woocommerce)</h1>
        <div className="wc-paper">
          <div className="wc-progress">
            <div className="wc-progress-info"><p>Step 3 of 6</p></div>
            <div className="wc-progress-bg"><div className="wc-progress-fill" style={{ width: '50%' }} /></div>
          </div>

          <form className="wc-form" onSubmit={handleSubmit(onSubmit)}>
            <p className="wc-section-title">Patient Consent for Medical Services</p>
            <div className="wc-consent-text">
              <p>This Consent for Medical Services (“CONSENT”) specifies the terms and conditions under which, you, the undersigned patient (“PATIENT”) may secure the availability of medical services offered by (“PRACTICE”):</p>
              <p><strong>Pure Health & Wellness 6065 N First St, Fresno, CA 93710</strong></p>
              <p>This consent applies to the PRACTICE, its agents, employees and physician(s). PATIENT and the PRACTICE hereby enter into this agreement for provision of medical services specified herein (SERVICES). Wherefore, in exchange for consideration, the receipt and sufficiency of which the parties hereby acknowledge the PATIENT and PRACTICE agree as follows:</p>
              <ol>
                <li>The PATIENT acknowledges and agrees that this agreement has been entered into before the PRACTICE has provided the SERVICES specified herein to the PATIENT.</li>
                <li>The PATIENT acknowledges and agrees that this agreement has not been entered into at a time when the PATIENT is facing an emergency or an urgent health care situation.</li>
                <li>The PATIENT acknowledges reading and receiving a copy of the Notice of Privacy Practices, and by signing this agreement, the PATIENT authorizes the PRACTICE and its representatives to use and share PATIENT health information as described in the Notices of Privacy Practices.</li>
                <li>The PATIENT agrees to let PRACTICE, its agents, employees, and physician(s) provide medical care services. The SERVICES provided to the PATIENT may include:
                  <ul>
                    <li>Evaluation of patient medical history and lifestyle behaviors</li>
                    <li>Physical examination</li>
                    <li>Blood, urine, fecal, and/or saliva tests</li>
                    <li>Diagnostic testing, bioelectrical and/or imaging tests</li>
                    <li>Medical recommendations and management regarding my health issues and disease prevention</li>
                    <li>Nutrition</li>
                    <li>Nutritional supplementation and/or replacement</li>
                    <li>Physical activity, functional performance, and exercise</li>
                    <li>Lifestyle, environment, and behavior</li>
                    <li>Stress response management</li>
                    <li>Hormone replacement therapy</li>
                    <li>Medication prescription management for those medications prescribed by the PRACTICE</li>
                    <li>Procedures may include but are not limited to:
                      <ul>
                        <li>Injections</li>
                        <li>Intravenous infusion therapy</li>
                        <li>Aesthetic procedures</li>
                      </ul>
                    </li>
                  </ul>
                </li>
                <li>PATIENT agrees that PRACTICE has not made any claims or statements about results or cures.</li>
              </ol>
              <p>Duration of Consent: PATIENT acknowledges the right to revoke this consent at any time except to the extent PRACTICE has already taken action in reliance on it. If PATIENT does not revoke it, this Consent will continue indefinitely. By signing this agreement, the PATIENT acknowledges that PATIENT has read and fully understands the information contained in this agreement. PATIENT agrees that everything in this Consent applies to current and future health care services provided by PRACTICE</p>
            </div>

            {/* Patient Name */}
            <div className="wc-group wc-group--two">
              <label>Patient Name</label>
              <div>{stored.firstName || ''} {stored.lastName || ''}</div>
            </div>

            {/* Date of Birth */}
            <div className="wc-group wc-group--two">
              <label>
                Date of Birth <span className={reqClass(errors.patientDobMonth || errors.patientDobDay || errors.patientDobYear)}>(Required)</span>
              </label>
              <div className="wc-dob">
                <select className="wc-select" {...register("patientDobMonth", { required: true })}>
                  <option value="">Month</option>
                  {[...Array(12)].map((_, i) => (
                    <option key={i} value={String(i+1).padStart(2,'0')}>
                      {String(i+1).padStart(2,'0')}
                    </option>
                  ))}
                </select>
                <select className="wc-select" {...register("patientDobDay", { required: true })}>
                  <option value="">Day</option>
                  {[...Array(31)].map((_, i) => (
                    <option key={i} value={String(i+1).padStart(2,'0')}>
                      {String(i+1).padStart(2,'0')}
                    </option>
                  ))}
                </select>
                <select className="wc-select" {...register("patientDobYear", { required: true })}>
                  <option value="">Year</option>
                  {Array.from({ length: 100 }, (_, k) => new Date().getFullYear() - k).map((yr) => (
                    <option key={yr} value={yr}>{yr}</option>
                  ))}
                </select>
              </div>
              {(errors.patientDobMonth || errors.patientDobDay || errors.patientDobYear) && <p className="wc-error-message">Month, Day, and Year required.</p>}
            </div>

            {/* Current Date */}
            <div className="wc-group">
              <label>Date: {today}</label>
            </div>

            {/* Signature */}
            <div className="wc-group">
              <label>
                Patient Signature <span className={reqClass(errors.patientSignature)}>(Required)</span>
              </label>
              <SignatureCanvas
                penColor="black"
                canvasProps={{ className: 'wc-signature-canvas' }}
                ref={sigPad}
                onEnd={onEndSignature}
              />
              <button type="button" className="wc-clear-signature" onClick={clearSignature}>
                Clear Signature
              </button>
              {errors.patientSignature && <p className="wc-error-message">Signature required.</p>}
            </div>

            {/* Navigation */}
            <div style={{ display: 'flex', justifyContent: 'space-between'}}>
              <button type="button" className="wc-button wc-button--outline" onClick={() => navigate(-1)}>
                Previous
              </button>
              <button type="submit" className="wc-button">Next</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
