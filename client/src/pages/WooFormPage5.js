import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import SignatureCanvas from "react-signature-canvas";
import "./WooFormPage.css";

export default function WooFormPage5() {
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
  const witnessSig = useRef(null);

  useEffect(() => {
    trigger();
    register("patientSignature5", { required: true });
    register("witnessSignature5", { required: true });
  }, [trigger, register]);

  const reqClass = (err) => (err ? "wc-required error" : "wc-required valid");

  const handleEnd = (ref, name) => {
    const dataURL = ref.current.getTrimmedCanvas().toDataURL();
    setValue(name, dataURL, { shouldValidate: true });
  };

  const clearSig = (ref, name) => {
    ref.current.clear();
    setValue(name, "");
  };

  const onSubmit = (data) => {
    localStorage.setItem(
      "wooFormData",
      JSON.stringify({ ...stored, ...data })
    );
    navigate("/woo-form-page-6");
  };

  const today = new Date().toLocaleDateString("en-US");

  return (
    <div className="wc-container">
      <div className="wc-content">
        <h1 className="wc-title">Telemedicine Consultation Forms (Woocommerce)</h1>
        <div className="wc-paper">
          <div className="wc-progress">
            <div className="wc-progress-info">
              <p>Step 5 of 6</p>
            </div>
            <div className="wc-progress-bg">
              <div className="wc-progress-fill" style={{ width: '83%' }} />
            </div>
          </div>

          <form className="wc-form" onSubmit={handleSubmit(onSubmit)}>
            <p className="wc-section-title">Informed Consent for Testosterone Replacement Therapy</p>
            <div className="wc-consent-text">
              <p>
                I, the undersigned, authorize and give my Informed Consent for the
                administration of testosterone replacement therapy offered by
                (“PRACTICE”): Pure Health & Wellness 6065 N First St, Fresno, CA
                93710 (Patient & Practice are referred to individually as “Party” or
                collectively as “Parties”)
              </p>
              <p><strong>EXPECTED BENEFITS of TESTOSTERONE REPLACEMENT THERAPY</strong></p>
              <ul>
                <li>Expected benefits include control of symptoms associated with declining testosterone levels.</li>
                <li>Possible benefits of this therapy may help prevent, reduce or control physical diseases and dysfunction associated with declining testosterone levels, through hormonal replacement.</li>
                <li>I have been fully informed, and I am satisfied with my understanding, that this treatment may be viewed by the medical community as new, controversial, and unnecessary by the FDA.</li>
                <li>I understand that my healthcare provider cannot guarantee any health benefits or that there will be no harm from the use of testosterone replacement therapy.</li>
              </ul>
              <p><strong>RISKS and SIDE EFFECTS of TESTOSTERONE REPLACEMENT THERAPY</strong></p>
              <p>
                Some of the following risks/adverse reactions are derived from the official FDA labeling requirements for testosterone... (continue full text here)
              </p>
              <p><strong>ALTERNATIVES to TESTOSTERONE REPLACEMENT THERAPY</strong></p>
              <ul>
                <li>Leaving the testosterone levels as they are and doing nothing...</li>
                <li>Treating the symptoms of declining testosterone levels as they develop...</li>
              </ul>
              <p><strong>MY COMPLIANCE OBLIGATION WHILE RECEIVING TESTOSTERONE REPLACEMENT THERAPY</strong></p>
              <p>...</p>
              <p><strong>RESEARCH and ECONOMIC INTERESTS</strong></p>
              <p>...</p>
              <p><strong>ATTESTATION & CONSENT</strong></p>
              <p>...</p>
            </div>

            {/* Patient Name & Signature */}
            <div className="wc-group wc-group--two">
              <div>
                <label>Patient Name</label>
                <p>{stored.firstName || ''} {stored.lastName || ''}</p>
              </div>
              <div>
                <label>
                  Patient Signature <span className={reqClass(errors.patientSignature5)}>(Required)</span>
                </label>
                <SignatureCanvas
                  ref={patientSig}
                  canvasProps={{ className: 'wc-signature-canvas' }}
                  onEnd={() => handleEnd(patientSig, 'patientSignature5')}
                />
                <button type="button" className="wc-clear-signature" onClick={() => clearSig(patientSig, 'patientSignature5')}>Clear Signature</button>
                {errors.patientSignature5 && <p className="wc-error-message">Required.</p>}
              </div>
            </div>

            {/* Date */}
            <div className="wc-group">
              <label>Date: {today}</label>
            </div>

            {/* Witness Name & Signature */}
            <div className="wc-group wc-group--two">
              <div>
                <label>
                  Witness Name <span className={reqClass(errors.witnessFirst || errors.witnessLast)}>(Required)</span>
                </label>
                <input className="wc-input" placeholder="First" {...register('witnessFirst', { required: true })} />
                <input className="wc-input" placeholder="Last" {...register('witnessLast', { required: true })} />
                {(errors.witnessFirst || errors.witnessLast) && <p className="wc-error-message">Required.</p>}
              </div>
              <div>
                <label>
                  Witness Signature <span className={reqClass(errors.witnessSignature5)}>(Required)</span>
                </label>
                <SignatureCanvas
                  ref={witnessSig}
                  canvasProps={{ className: 'wc-signature-canvas' }}
                  onEnd={() => handleEnd(witnessSig, 'witnessSignature5')}
                />
                <button type="button" className="wc-clear-signature" onClick={() => clearSig(witnessSig, 'witnessSignature5')}>Clear Signature</button>
                {errors.witnessSignature5 && <p className="wc-error-message">Required.</p>}
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="wc-group wc-group--two" style={{ justifyContent: 'space-between' }}>
              <button type="button" className="wc-button wc-button--outline" onClick={() => navigate(-1)}>Previous</button>
              <button type="submit" className="wc-button">Next</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
