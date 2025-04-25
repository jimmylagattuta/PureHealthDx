import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import SignatureCanvas from "react-signature-canvas";
import "./AminoAsylumLandingPage.css";

export default function AminoAsylumPage4() {
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

  const clearSig = (ref, field) => {
    ref.current.clear();
    setValue(field, "");
  };

  const saveSig = (ref, field) => {
    const dataUrl = ref.current.getTrimmedCanvas().toDataURL("image/png");
    setValue(field, dataUrl, { shouldValidate: true });
  };

  const onSubmit = (data) => {
    localStorage.setItem(
      "appointmentFormData",
      JSON.stringify({ ...saved, ...data })
    );
    navigate("/amino-asylum-page-5");
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
              <p>Step 4 of 6</p>
            </div>
            <div className="aa-progress-bg">
              <div className="aa-progress-fill" style={{ width: "66.66%" }} />
            </div>
          </div>

          <h2>Informed Consent for Human Growth Hormone Replacement</h2>
          <p>
            I, the undersigned, authorize and give my Informed Consent for the
            administration of human growth hormone replacement therapy offered
            by (“PRACTICE”): (Patient & Practice are referred to individually
            as “Party” or collectively as “Parties”)
          </p>
          <p>
            <strong>INDICATION AND EXPECTED BENEFITS OF HUMAN GROWTH HORMONE REPLACEMENT</strong>
          </p>
          <ul>
            <li>I understand that prescription Human Growth Hormone (HGH) has been approved by the Food and Drug Administration (FDA) for the treatment of Adult Growth Hormone Deficiency (AGHD). This condition is determined from medical history, physical findings and laboratory tests.</li>
            <li>I understand that the laboratory tests to measure IGF-1 or Somatomedin-C might not meet the criteria to establish adult growth hormone deficiency.</li>
            <li>I understand that Human Growth Hormone replacement therapy may result in improvements in my health associated with declining growth hormone levels, which may include one or more of the following: improved muscle mass, strength, exercise capacity, bone density, immune function, skin thickness, wound healing, memory, lung function, and heart function.</li>
            <li>I understand that my healthcare provider cannot guarantee any health benefits or that there will be no harm from the use of Human Growth Hormone.</li>
          </ul>
          <p><strong>RISKS OF HUMAN GROWTH HORMONE REPLACEMENT</strong></p>
          <ul>
            <li>I have been fully informed, and I am satisfied with my understanding, that this treatment may be viewed by the medical community as new, controversial, and unnecessary by the Food and Drug Administration.</li>
            <li>I understand that while the application of Human Growth Hormone has been utilized in adults for more than twelve years its long-term effects are undetermined.</li>
            <li>I understand that HGH is contraindicated when there is any evidence of neoplastic (cancer) activity, proliferative diabetic retinopathy, pulmonary fibrosis, or recent coronary angioplasty. Intracranial lesions must be inactive and anti-tumor therapy complete prior to institution of therapy. HGH should be discontinued if there is evidence of tumor growth. It should not be initiated to treat patients with acute critical illness due to complications following open heart or abdominal surgery, multiple accidental traumas, or to patients having acute respiratory failure. Caution is required when HGH is administered to patients with diabetes mellitus, as insulin dosage may need to be adjusted.</li>
            <li>While the New England Journal of Medicine, October 1999, concluded, “There is no evidence that HGH replacement therapy affects the risk of cancer or cardiovascular disease,” I understand that questions have been raised about HGH as a cause of cancer, since it is an anabolic hormone and makes things grow.</li>
          </ul>
          <p><strong>SIDE EFFECTS OF HUMAN GROWTH HORMONE REPLACEMENT</strong></p>
          <ul>
            <li>I understand that side effects may occur with the use of HGH.</li>
            <li>Possible side effects include but are not limited to: edema (swelling) of the hands and ankles, paresthesias (numbness and tingling in the hands), arthralgias (joint aching), slight bruising at the injection site, and glucose intolerance, at least initially, where blood sugar is higher for a given amount of sugar or equivalent consumed. Excess doses may result in fluid retention in the hands and feet. Continued fluid retention could lead to headaches and/or joint pain, and possibly carpal tunnel syndrome, increased blood pressure or insulin resistance.</li>
          </ul>
          <p><strong>ALTERNATIVES TO HUMAN GROWTH HORMONE REPLACEMENT</strong></p>
          <ul>
            <li>I am totally and completely satisfied with my understanding of the reasonable alternatives to human growth hormone replacement, which include:</li>
            <li>Leaving the hormone levels as they are and doing nothing. Risks may include but are not limited to: experiencing symptoms of growth hormone deficiency and an increased risk for aging-related diseases or dysfunction resulting from declining growth hormone levels. This alternative may result in the need to treat diseases or dysfunction associated with declining growth hormone levels as they appear clinically.</li>
            <li>Treating the symptoms of declining growth hormone levels as they develop with non-hormonal therapies. Risks may include, but are not limited to: increased risk for aging-related diseases resulting from declining hormone levels.</li>
          </ul>
          <p><strong>MY COMPLIANCE OBLIGATIONS WHILE RECEIVING HUMAN GROWTH HORMONE REPLACEMENT</strong></p>
          <ul>
            <li>I agree to comply with the proposed treatment and therapy as prescribed, including the fact that I may be responsible for injecting the human growth hormone prescribed to me, and consent to periodic monitoring, when requested, which may include: Laboratory monitoring of blood or urine chemistries and hormone levels, Physical examinations, and/or Regular screening evaluations.</li>
            <li>I agree to notify you regarding all signs or symptoms of possible reactions to my therapy.</li>
            <li>I agree to comply with all other healthy lifestyle activities that have been individually recommended for me. I have completely disclosed my medical history, including prescription and non-prescription medications that I am currently taking or plan to take during my treatment, as well as any other over-the-counter medications, recreational drugs or social substances, herbs, extracts, and other dietary supplements to you. I agree to comply with the recommendations regarding the continuation or discontinuation of these preparations.</li>
            <li>In the future I will receive recommendations in advance from you before stopping any of the prescribed therapeutic regimens or taking any additional preparations that are not suggested or prescribed by you.</li>
            <li>I also understand that the use of “social substances” such as tobacco, “street drugs,” and alcohol and other types of otherwise non-described “social substances” may affect my therapy in a significantly adverse manner.</li>
            <li>I certify that I am under the care of a physician(s) for any and all other medical conditions.</li>
          </ul>
          <p><strong>RESEARCH AND ECONOMIC INTERESTS</strong></p>
          <ul>
            <li>I understand that the prescribing physician is not engaged in any personal research and has no economic interests unrelated to my immediate care or treatment that may affect the physician’s choice of treatment or medical judgment.</li>
            <li>I certify that I have been given the opportunity to ask any and all questions I have concerning the proposed treatment, and I received all requested information and all questions were answered. I fully understand that I have the right to not consent to human growth hormone replacement therapy. I believe I have adequate knowledge upon which to base an informed consent.</li>
            <li>I now attest to reading and fully understanding this form and the contents and clinical meanings of such and discussing these procedures with my healthcare provider and consent to this treatment, and hereby affix my signature to this authorization for this proposed long-term treatment. I have been given a copy of this consent form, and I understand fully any and all of the possibly represented implications and meanings of its writing and expectations.</li>
          </ul>

          <form className="aa-form" onSubmit={handleSubmit(onSubmit)}>
            {/* Patient Name Display */}
            <div className="aa-form-group aa-form-group--two">
              <div>
                <label>Patient Name</label>
                <p>{saved.firstName} {saved.lastName}</p>
              </div>
              {/* Date Display */}
              <div style={{ textAlign: 'right' }}>
                <label>Date:</label>
                <p>{today}</p>
              </div>
            </div>

            {/* Patient Signature */}
            <div className="aa-form-group">
              <label>
                Patient Signature
                <span className={reqClass(errors.patientSignature)}>
                  (Required)
                </span>
              </label>
              <SignatureCanvas
                penColor="black"
                canvasProps={{ className: "aa-signature-canvas" }}
                ref={sigPadPatient}
                onEnd={() => saveSig(sigPadPatient, "patientSignature")}
              />
              <button
                type="button"
                className="aa-clear-btn"
                onClick={() => clearSig(sigPadPatient, "patientSignature")}
              >
                Clear
              </button>
              {errors.patientSignature && (
                <p className="aa-error-message">Signature is required.</p>
              )}
            </div>

            {/* Witness Name */}
            <div className="aa-form-group aa-form-group--two">
              <div>
                <label>
                  Witness Name
                  <span className={reqClass(errors.witnessFirst)}>
                    (Required)
                  </span>
                </label>
                <input
                  className="aa-input"
                  placeholder="First"
                  {...register("witnessFirst", { required: true })}
                />
                {errors.witnessFirst && (
                  <p className="aa-error-message">First name required.</p>
                )}
              </div>
              <div>
                <label>&nbsp;</label>
                <input
                  className="aa-input"
                  placeholder="Last"
                  {...register("witnessLast", { required: true })}
                />
                {errors.witnessLast && (
                  <p className="aa-error-message">Last name required.</p>
                )}
              </div>
            </div>

            {/* Witness Signature & Date */}
            <div className="aa-form-group aa-form-group--two">
              <div>
                <label>
                  Witness Signature
                  <span className={reqClass(errors.witnessSignature)}>
                    (Required)
                  </span>
                </label>
                <SignatureCanvas
                  penColor="black"
                  canvasProps={{ className: "aa-signature-canvas" }}
                  ref={sigPadWitness}
                  onEnd={() => saveSig(sigPadWitness, "witnessSignature")}
                />
                <button
                  type="button"
                  className="aa-clear-btn"
                  onClick={() => clearSig(sigPadWitness, "witnessSignature")}
                >
                  Clear
                </button>
                {errors.witnessSignature && (
                  <p className="aa-error-message">Signature required.</p>
                )}
              </div>
              <div style={{ textAlign: 'right' }}>
                <label>Date:</label>
                <p>{today}</p>
              </div>
            </div>

            {/* Navigation */}
            <div
              className="aa-form-group aa-form-group--two"
              style={{ justifyContent: "space-between" }}
            >
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="aa-submit-btn"
                style={{ background: "transparent", border: "1px solid #111827", color: "#111827" }}
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