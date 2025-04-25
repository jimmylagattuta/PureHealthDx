import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import SignatureCanvas from "react-signature-canvas";
import "./AminoAsylumLandingPage.css";

export default function AminoAsylumPage5() {
  const navigate = useNavigate();
  const stored = localStorage.getItem("appointmentFormData");
  const saved = stored ? JSON.parse(stored) : {};

  const sigPadPatient = useRef(null);
  const sigPadWitness = useRef(null);

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
  const today = new Date().toLocaleDateString();

  const clearSig = (pad, field) => {
    pad.current.clear();
    setValue(field, "");
  };

  const saveSig = (pad, field) => {
    const dataUrl = pad.current.getTrimmedCanvas().toDataURL("image/png");
    setValue(field, dataUrl, { shouldValidate: true });
  };

  const onSubmit = (data) => {
    localStorage.setItem(
      "appointmentFormData",
      JSON.stringify({ ...saved, ...data })
    );
    navigate("/amino-asylum-page-6");
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
              <p>Step 5 of 6</p>
            </div>
            <div className="aa-progress-bg">
              <div className="aa-progress-fill" style={{ width: "83.33%" }} />
            </div>
          </div>

          <h2>Informed Consent for Testosterone Replacement Therapy</h2>
          <p>
            I, the undersigned, authorize and give my Informed Consent for the
            administration of testosterone replacement therapy offered by (“PRACTICE”): Pure Health & Wellness 6065 N First St, Fresno, CA 93710 (Patient & Practice are referred to individually as “Party” or collectively as “Parties”)
          </p>
          <p><strong>EXPECTED BENEFITS of TESTOSTERONE REPLACEMENT THERAPY</strong></p>
          <ul>
            <li>Expected benefits include control of symptoms associated with declining testosterone levels.</li>
            <li>Possible benefits of this therapy may help prevent, reduce or control physical diseases and dysfunction associated with declining testosterone levels, through hormonal replacement.</li>
            <li>I have been fully informed, and I am satisfied with my understanding, that this treatment may be viewed by the medical community as new, controversial, and unnecessary by the Food and Drug Administration.</li>
            <li>I understand that my healthcare provider cannot guarantee any health benefits or that there will be no harm from the use of testosterone replacement therapy.</li>
          </ul>
          <p><strong>RISKS and SIDE EFFECTS of TESTOSTERONE REPLACEMENT THERAPY</strong></p>
          <p>
            Risks/adverse reactions derived from FDA labeling for testosterone, with dosages aimed at physiologic levels for a 20‑35‑year‑old:
          </p>
          <ul>
            <li>Bruising, soreness, pain, or infection at injection or implant sites.</li>
            <li>No FDA‑approved testosterone supplements for women.</li>
            <li>General risks of medical procedures including unknown outcomes.</li>
            <li>Stimulation of benign/malignant prostate tumors; contraindicated in prostate cancer.</li>
            <li>FDA caution: increased risk of heart attack, blood clots, deep vein thrombosis, pulmonary embolism; approved only for injury/disease‑caused low testosterone.</li>
            <li>Possible abnormal increases in red blood cells; corrected by phlebotomy. Male pattern baldness, gynecomastia, reduced sperm production, testicular atrophy, altered insulin requirements, edema, sleep apnea worsened.</li>
            <li>Immediate side effects (~6% of users): acne, site reactions, headache, hypertension, liver test abnormalities, prostate disorders; others include greasy skin, body odor, aggressiveness.</li>
            <li>Off‑label female use; relative contraindications in women include alopecia, acne, hirsutism, hyperlipidemia, liver dysfunction; contraindications include hormone‑sensitive cancers and cardiovascular risks.</li>
            <li>Discontinuation may be recommended 1–2 weeks post‑operatively.</li>
            <li>Transdermal cream may transfer to others; advised on prevention.</li>
          </ul>
          <p><strong>ALTERNATIVES to TESTOSTERONE REPLACEMENT THERAPY</strong></p>
          <ul>
            <li>Leaving levels unchanged; risk of deficiency symptoms and age‑related conditions.</li>
            <li>Non‑hormonal therapies for symptom management; risk of age‑related conditions.</li>
          </ul>
          <p><strong>MY COMPLIANCE OBLIGATION WHILE RECEIVING TESTOSTERONE REPLACEMENT THERAPY</strong></p>
          <ul>
            <li>I agree to comply with prescribed therapy, which may include injections, oral, topical, with periodic monitoring:</li>
            <ul>
              <li>Laboratory monitoring of blood, saliva, or urine testosterone levels</li>
              <li>Physical examinations</li>
              <li>Regular screening evaluations</li>
            </ul>
            <li>I agree to notify you of any signs or symptoms of reactions.</li>
            <li>I agree to follow lifestyle recommendations and disclose all medications, supplements, and substances.</li>
            <li>I will receive advance notice before stopping or changing therapy.</li>
            <li>I certify under physician care for other conditions.</li>
          </ul>
          <p><strong>RESEARCH and ECONOMIC INTERESTS</strong></p>
          <ul>
            <li>Prescribing practitioner has no unrelated research or economic interests affecting care.</li>
            <li>I have had the opportunity to ask questions and understand my right to refuse therapy.</li>
            <li>I attest to reading, understanding, and consenting to this long‑term treatment authorization. I have received a copy of this form.</li>
          </ul>

          <form className="aa-form" onSubmit={handleSubmit(onSubmit)}>
            {/* Patient Name & Date */}
            <div className="aa-form-group aa-form-group--two">
              <div>
                <label>Patient Name</label>
                <p>{saved.firstName} {saved.lastName}</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <label>Date:</label>
                <p>{today}</p>
              </div>
            </div>

            {/* Patient Signature */}
            <div className="aa-form-group">
              <label>
                Patient Signature
                <span className={reqClass(errors.patientSignature5)}>
                  (Required)
                </span>
              </label>
              <SignatureCanvas
                penColor="black"
                canvasProps={{ className: "aa-signature-canvas" }}
                ref={sigPadPatient}
                onEnd={() => saveSig(sigPadPatient, "patientSignature5")}
              />
              <button
                type="button"
                className="aa-clear-btn"
                onClick={() => clearSig(sigPadPatient, "patientSignature5")}
              >
                Clear
              </button>
              {errors.patientSignature5 && (
                <p className="aa-error-message">Signature is required.</p>
              )}
            </div>

            {/* Witness Name & Date */}
            <div className="aa-form-group aa-form-group--two">
              <div>
                <label>
                  Witness Name
                  <span className={reqClass(errors.witnessFirst || errors.witnessLast)}>
                    (Required)
                  </span>
                </label>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <input
                    className="aa-input"
                    placeholder="First"
                    {...register("witnessFirst", { required: true })}
                  />
                  <input
                    className="aa-input"
                    placeholder="Last"
                    {...register("witnessLast", { required: true })}
                  />
                </div>
                {(errors.witnessFirst || errors.witnessLast) && (
                  <p className="aa-error-message">First and last name required.</p>
                )}
              </div>
              <div style={{ textAlign: 'right' }}>
                <label>Date:</label>
                <p>{today}</p>
              </div>
            </div>

            {/* Witness Signature */}
            <div className="aa-form-group">
              <label>
                Witness Signature
                <span className={reqClass(errors.witnessSignature5)}>
                  (Required)
                </span>
              </label>
              <SignatureCanvas
                penColor="black"
                canvasProps={{ className: "aa-signature-canvas" }}
                ref={sigPadWitness}
                onEnd={() => saveSig(sigPadWitness, "witnessSignature5")}
              />
              <button
                type="button"
                className="aa-clear-btn"
                onClick={() => clearSig(sigPadWitness, "witnessSignature5")}
              >
                Clear
              </button>
              {errors.witnessSignature5 && (
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
                Next
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}