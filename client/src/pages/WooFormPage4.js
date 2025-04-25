// src/components/WooFormPage4.jsx
import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import SignatureCanvas from "react-signature-canvas";
import "./WooFormPage.css";

export default function WooFormPage4() {
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

  // refs for two signatures
  const patientSig = useRef();
  const witnessSig = useRef();

  // register hidden fields
  useEffect(() => {
    register("patientSignature", { required: true });
    register("witnessSignature", { required: true });
  }, [register]);

  // helper to set signature data
  const handleEnd = (ref, name) => {
    const dataURL = ref.current.getTrimmedCanvas().toDataURL();
    setValue(name, dataURL, { shouldValidate: true });
  };

  const clearSig = (ref, name) => {
    ref.current.clear();
    setValue(name, "", { shouldValidate: true });
  };

  const reqClass = (err) => (err ? "wc-required error" : "wc-required valid");

  const onSubmit = (data) => {
    const full = { ...stored, ...data };
    localStorage.setItem("wooFormData", JSON.stringify(full));
    navigate("/woo-form-page-5");
  };

  // today's date
  const today = new Date().toLocaleDateString("en-US");

  return (
    <div className="wc-container">
      <div className="wc-content">
        <h1 className="wc-title">
          Telemedicine Consultation Forms (Woocommerce)
        </h1>

        <div className="wc-paper">
          {/* Progress */}
          <div className="wc-progress">
            <div className="wc-progress-info">
              <p>Step 4 of 6</p>
            </div>
            <div className="wc-progress-bg">
              <div className="wc-progress-fill" style={{ width: "66%" }} />
            </div>
          </div>

          {/* Consent Text */}
          <form className="wc-form" onSubmit={handleSubmit(onSubmit)}>
            <p className="wc-section-title">
              Informed Consent for Human Growth Hormone Replacement
            </p>
            <div className="wc-consent-text">
              <p>
                I, the undersigned, authorize and give my Informed Consent for
                the administration of human growth hormone replacement therapy
                offered by (“PRACTICE”): (Patient & Practice are referred to
                individually as “Party” or collectively as “Parties”)
              </p>
              <p>
                <strong>
                  INDICATION AND EXPECTED BENEFITS OF HUMAN GROWTH HORMONE
                  REPLACEMENT
                </strong>
              </p>
              <p>
                I understand that prescription Human Growth Hormone (HGH) has
                been approved by the Food and Drug Administration (FDA) for the
                treatment of Adult Growth Hormone Deficiency (AGHD). This
                condition is determined from medical history, physical findings
                and laboratory tests.
              </p>
              <p>
                I understand that the laboratory tests to measure IGF-1 or
                Somatomedin-C might not meet the criteria to establish adult
                growth hormone deficiency.
              </p>
              <p>
                I understand that Human Growth Hormone replacement therapy may
                result in improvements in my health associated with declining
                growth hormone levels, which may include one or more of the
                following: improved muscle mass, strength, exercise capacity,
                bone density, immune function, skin thickness, wound healing,
                memory, lung function, and heart function.
              </p>
              <p>
                I understand that my healthcare provider cannot guarantee any
                health benefits or that there will be no harm from the use of
                Human Growth Hormone.
              </p>
              <p>
                <strong>RISKS OF HUMAN GROWTH HORMONE REPLACEMENT</strong>
              </p>
              <p>
                I have been fully informed, and I am satisfied with my
                understanding, that this treatment may be viewed by the medical
                community as new, controversial, and unnecessary by the Food
                and Drug Administration.
              </p>
              <p>
                I understand that while the application of Human Growth Hormone
                has been utilized in adults for more than twelve years its
                long-term effects are undetermined.
              </p>
              <p>
                I understand that HGH is contraindicated when there is any
                evidence of neoplastic (cancer) activity, proliferative diabetic
                retinopathy, pulmonary fibrosis, or recent coronary angioplasty.
                Intracranial lesions must be inactive and anti-tumor therapy
                complete prior to institution of therapy. HGH should be
                discontinued if there is evidence of tumor growth. It should not
                be initiated to treat patients with acute critical illness due
                to complications following open heart or abdominal surgery,
                multiple accidental traumas, or to patients having acute
                respiratory failure. Caution is required when HGH is
                administered to patients with diabetes mellitus, as insulin
                dosage may need to be adjusted.
              </p>
              <p>
                While the New England Journal of Medicine, October 1999,
                concluded, “There is no evidence that HGH replacement therapy
                affects the risk of cancer or cardiovascular disease,” I
                understand that questions have been raised about HGH as a cause
                of cancer, since it is an anabolic hormone and makes things
                grow.
              </p>
              <p>
                <strong>SIDE EFFECTS OF HUMAN GROWTH HORMONE REPLACEMENT</strong>
              </p>
              <p>
                I understand that side effects may occur with the use of HGH.
                Possible side effects include but are not limited to: edema
                (swelling) of the hands and ankles, paresthesias (numbness and
                tingling in the hands), arthralgias (joint aching), slight
                bruising at the injection site, and glucose intolerance, at
                least initially, where blood sugar is higher for a given amount
                of sugar or equivalent consumed. Excess doses may result in
                fluid retention in the hands and feet. Continued fluid
                retention could lead to headaches and/or joint pain, and
                possibly carpal tunnel syndrome, increased blood pressure or
                insulin resistance.
              </p>
              <p>
                <strong>
                  ALTERNATIVES TO HUMAN GROWTH HORMONE REPLACEMENT
                </strong>
              </p>
              <p>
                I am totally and completely satisfied with my understanding of
                the reasonable alternatives to human growth hormone
                replacement, which include:
              </p>
              <ul>
                <li>
                  Leaving the hormone levels as they are and doing nothing.
                  Risks may include but are not limited to: experiencing
                  symptoms of growth hormone deficiency and an increased risk
                  for aging-related diseases or dysfunction resulting from
                  declining growth hormone levels.
                </li>
                <li>
                  Treating the symptoms of declining growth hormone levels as
                  they develop with non-hormonal therapies. Risks may include,
                  but are not limited to: increased risk for aging-related
                  diseases resulting from declining hormone levels.
                </li>
              </ul>
              <p>
                <strong>
                  MY COMPLIANCE OBLIGATIONS WHILE RECEIVING HUMAN GROWTH HORMONE
                  REPLACEMENT
                </strong>
              </p>
              <p>
                I agree to comply with the proposed treatment and therapy as
                prescribed, including the fact that I may be responsible for
                injecting the human growth hormone prescribed to me, and consent
                to periodic monitoring...
              </p>
              <p>
                (the rest of your full paragraph text continues here, exactly
                as in your screenshot)
              </p>
              <p>
                <strong>RESEARCH AND ECONOMIC INTERESTS</strong>
              </p>
              <p>
                I understand that the prescribing physician is not engaged in
                any personal research and has no economic interests unrelated
                to my immediate care or treatment that may affect the
                physician’s choice of treatment or medical judgment.
              </p>
              <p>
                I certify that I have been given the opportunity to ask any and
                all questions I have concerning the proposed treatment, and I
                received all requested information and all questions were
                answered. I fully understand that I have the right to not
                consent to human growth hormone replacement therapy. I believe
                I have adequate knowledge upon which to base an informed
                consent.
              </p>
              <p>
                I do now attest to reading and fully understanding this form and
                the contents and clinical meanings of such and discussing these
                procedures with my healthcare provider and consent to this
                treatment, and hereby affix my signature to this authorization
                for this proposed long-term treatment. I have been given a copy
                of this consent form, and I understand fully any and all of the
                possibly represented implications and meanings of its writing
                and expectations.
              </p>
            </div>

            {/* Patient Name */}
            <div className="wc-group wc-group--two">
              <div>
                <label>Patient Name</label>
                <p>
                  {stored.firstName || ""} {stored.lastName || ""}
                </p>
              </div>
              {/* Signature */}
              <div>
                <label>
                  Patient Signature{" "}
                  <span className={reqClass(errors.patientSignature)}>
                    (Required)
                  </span>
                </label>
                <SignatureCanvas
                  ref={patientSig}
                  canvasProps={{ className: "wc-signature-canvas" }}
                  onEnd={() => handleEnd(patientSig, "patientSignature")}
                />
                <button
                  type="button"
                  className="wc-clear-signature"
                  onClick={() => clearSig(patientSig, "patientSignature")}
                >
                  Clear Signature
                </button>
                {errors.patientSignature && (
                  <p className="wc-error-message">Required.</p>
                )}
              </div>
            </div>

            {/* Date */}
            <div className="wc-group">
              <label>Date: {today}</label>
            </div>

            {/* Witness */}
            <div className="wc-group">
              <label>
                Witness Name{" "}
                <span className={reqClass(errors.witnessFirst)}>
                  (Required)
                </span>
              </label>
              <div className="wc-group wc-group--two">
                <input
                  className="wc-input"
                  placeholder="First"
                  {...register("witnessFirst", { required: true })}
                />
                <input
                  className="wc-input"
                  placeholder="Last"
                  {...register("witnessLast", { required: true })}
                />
              </div>
              {(errors.witnessFirst || errors.witnessLast) && (
                <p className="wc-error-message">Required.</p>
              )}
            </div>

            {/* Witness Signature */}
            <div className="wc-group">
              <label>
                Witness Signature{" "}
                <span className={reqClass(errors.witnessSignature)}>
                  (Required)
                </span>
              </label>
              <SignatureCanvas
                ref={witnessSig}
                canvasProps={{ className: "wc-signature-canvas" }}
                onEnd={() => handleEnd(witnessSig, "witnessSignature")}
              />
              <button
                type="button"
                className="wc-clear-signature"
                onClick={() => clearSig(witnessSig, "witnessSignature")}
              >
                Clear Signature
              </button>
              {errors.witnessSignature && (
                <p className="wc-error-message">Required.</p>
              )}
            </div>

            {/* Navigation */}
            <div
              className="wc-group wc-group--two"
              style={{ justifyContent: "space-between" }}
            >
              <button
                type="button"
                className="wc-button"
                style={{
                  background: "transparent",
                  color: "#111827",
                  border: "1px solid #111827",
                }}
                onClick={() => navigate(-1)}
              >
                Previous
              </button>
              <button type="submit" className="wc-button">
                Next
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
