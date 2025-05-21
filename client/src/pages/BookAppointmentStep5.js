import React, { useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import SignatureCanvas from "react-signature-canvas";
import { useNavigate } from "react-router-dom";
import "./BookAppointmentPage.css";

const BookAppointmentStep5 = () => {
  const navigate = useNavigate();

  // Enable demo mode – in demo mode, non‑signature fields will be auto‑filled
  // and signature validation will be bypassed.
  const demoMode = false;

  // Refs for the two signature pads (they remain for display but are not validated in demo mode)
  const patientSigPad = useRef(null);
  const witnessSigPad = useRef(null);

  // Dummy defaults for dates
const today = new Date().toISOString().split("T")[0];


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
  patientName: demoMode ? "John Doe" : "",
  patientSignature: "",
  patientDate: today,
  witnessFirstName: demoMode ? "Jane" : "",
  witnessLastName: demoMode ? "Smith" : "",
  witnessSignature: "",
  witnessDate: today,
},


  });

  const values = watch();

  // Auto scroll to top on mount.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

useEffect(() => {
  if (demoMode) {
    setValue("patientName", "John Doe");
    setValue("patientDate", today);
    setValue("witnessFirstName", "Jane");
    setValue("witnessLastName", "Smith");
    setValue("witnessDate", today);
    console.log("Demo mode enabled: default text data auto-filled");
  }
}, [demoMode, setValue, today]);


  // Trigger initial validation
  useEffect(() => {
    console.log("Step 5: Triggering initial validation");
    trigger();
  }, [trigger]);

  // Clear functions for signature pads remain unchanged.
  const clearPatientSignature = () => {
    console.log("Step 5: Clearing patient signature");
    if (patientSigPad.current) {
      patientSigPad.current.clear();
      setValue("patientSignature", "");
      trigger("patientSignature");
    }
  };

  const clearWitnessSignature = () => {
    console.log("Step 5: Clearing witness signature");
    if (witnessSigPad.current) {
      witnessSigPad.current.clear();
      setValue("witnessSignature", "");
      trigger("witnessSignature");
    }
  };

const onSubmit = () => {
  console.log("Step 5: onSubmit triggered");

  let patientSigData = "";
  let witnessSigData = "";

  // Always attempt to capture signature from canvas
  if (!patientSigPad.current || patientSigPad.current.isEmpty()) {
    console.warn("Step 5: Patient signature is missing");
    setValue("patientSignature", "", { shouldValidate: true });
    trigger("patientSignature");
    return;
  }

  if (!witnessSigPad.current || witnessSigPad.current.isEmpty()) {
    console.warn("Step 5: Witness signature is missing");
    setValue("witnessSignature", "", { shouldValidate: true });
    trigger("witnessSignature");
    return;
  }

  // Capture actual signature data regardless of demo mode
  patientSigData = patientSigPad.current.getTrimmedCanvas().toDataURL();
  witnessSigData = witnessSigPad.current.getTrimmedCanvas().toDataURL();

  setValue("patientSignature", patientSigData);
  setValue("witnessSignature", witnessSigData);

  const labeledStep5Data = {
    informedConsentForTestosteroneReplacementTherapyPatientName: values.patientName,
    informedConsentForTestosteroneReplacementTherapyPatientSignature: patientSigData,
    informedConsentForTestosteroneReplacementTherapyPatientDate: values.patientDate,
    informedConsentForTestosteroneReplacementTherapyWitnessFirstName: values.witnessFirstName,
    informedConsentForTestosteroneReplacementTherapyWitnessLastName: values.witnessLastName,
    informedConsentForTestosteroneReplacementTherapyWitnessSignature: witnessSigData,
    informedConsentForTestosteroneReplacementTherapyWitnessDate: values.witnessDate,
  };

  const previousSteps = JSON.parse(localStorage.getItem("appointmentFormData")) || {};
  const fullData = { ...previousSteps, ...labeledStep5Data };

  console.log("📋 Combined Step 1–5 data:", fullData);
  localStorage.setItem("appointmentFormData", JSON.stringify(fullData));

  // Navigate to Step 6
  navigate("/book-appointment-step6");
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
                <p>Step 5 of 6</p>
              </div>
              <div className="progress-bar-background">
                <div className="progress-bar-fill" style={{ width: "83%" }} />
              </div>
            </div>

            {/* Consent Text */}
            <div className="consent-text">
              <p>
                I, the undersigned, authorize and give my Informed Consent for
                the administration of testosterone replacement therapy offered by (“PRACTICE”): Pure Health &amp; Wellness 1130 Coffee Rd, Modesto, CA 95355 (Patient &amp; Practice are referred to individually as “Party” or collectively as “Parties”)
              </p>
              <p>
                <strong>EXPECTED BENEFITS of TESTOSTERONE REPLACEMENT THERAPY</strong>
              </p>
              <p>
                Expected benefits include control of symptoms associated with declining testosterone levels.
                Possible benefits of this therapy may help prevent, reduce or control physical diseases and dysfunction associated with declining testosterone levels, through hormonal replacement.
              </p>
              <p>
                I have been fully informed, and I am satisfied with my understanding, that this treatment may be viewed by the medical community as new, controversial, and unnecessary by the Food and Drug Administration.
                I understand that my healthcare provider cannot guarantee any health benefits or that there will be no harm from the use of testosterone replacement therapy.
              </p>
              <p>
                <strong>RISKS and SIDE EFFECTS of TESTOSTERONE REPLACEMENT THERAPY</strong>
              </p>
              <p>
                Some of the following risks/adverse reactions are derived from the official Food and Drug Administration “FDA” labeling requirements for testosterone, for therapeutic drug levels in the blood stream. My healthcare provider may prescribe testosterone at dosages designed to achieve physiologic levels of testosterone in my blood or urine generally associated with those of a 20-35-year-old person and would be within the “normal” or “average” blood concentrations of that age group. Risks and Adverse Effects: I understand that the general risks of this proposed therapy may include, but are not limited to, bruising, soreness or pain, and possible infection for testosterone administered by injection or pellet implants.
              </p>
              <p>
                Currently there are no testosterone supplement products approved by the FDA for usage by women.
              </p>
              <p>
                I understand that there are risks (both known and unknown) to any medical procedure, treatment and therapy, and that it is not possible to guarantee or give assurance of a successful result. I acknowledge and accept these known and unknown general risks.
              </p>
              <p>
                A prescription testosterone, administered by injection, pellet implants, transdermal cream or patch.
              </p>
              <p>
                Risks of testosterone replacement include but are not limited to: stimulation of benign and malignant prostate tumor. Testosterone replacement is contraindicated in patients with known prostate cancer.
              </p>
              <p>
                The FDA requires manufacturers to add a caution to the warning label that testosterone could increase the risk of heart attack and blood clots in veins and could increase the risk of deep vein thrombosis and pulmonary embolism; and that the drugs are only approved to treat low testosterone levels caused by injury or disease.
              </p>
              <p>
                Side effects of testosterone replacement may include but are not limited to: an abnormal increase in the number of red blood cells, determined by periodic measuring of your blood. While not a common occurrence and generally posing no health risk, it can be corrected by donating blood or with a therapeutic phlebotomy. Male pattern baldness, gynecomastia (breast enlargement), diminished sperm production (infertility) and a reduction in the size of the testicles (testicular atrophy) may develop in men. Testosterone replacement may reduce insulin requirements in insulin-dependent diabetics. Older male patients may be at a slightly increased risk for the development of prostate enlargement when replacing testosterone. The concurrent use of testosterone with corticosteroids may enhance edema (fluid retention) formation. Edema may be a complication with testosterone replacement in patients with pre-existing cardiac, renal, or hepatic disease. Sleep apnea may be worsened by testosterone replacement. It has not been established whether testosterone replacement therapy will increase the risk for prostate cancer.
              </p>
              <p>
                The most common immediate side effects (occurring in approximately no more than 6% of users) include, but are not limited to: acne, application site reaction (rash, itching, or irritation), headache, hypertension (high blood pressure), abnormal liver function tests, and non-cancerous prostate disorder. Other side effects may include greasy hair and skin, a strong body odor, and aggressiveness.
              </p>
              <p>
                Testosterone replacement therapy in females is considered an off-label application by the FDA.
              </p>
              <p>
                Relative contraindications of testosterone replacement in pre- and postmenopausal women include androgenic alopecia, acne, hirsutism, hyperlipidemia and liver dysfunction. Absolute contraindications are the presence or increased risk of breast cancer, endometrial cancer, veno-thrombotic episodes and manifest cardiovascular disease.
              </p>
              <p>
                Discontinuation of testosterone replacement therapy may be recommended for a period of 1-2 weeks postoperatively.
              </p>
              <p>
                Transdermal testosterone cream can be transmitted by direct contact. We have advised you of the potential harm of transference to others and how to avoid transference to others.
              </p>
              <p>
                <strong>ALTERNATIVES to TESTOSTERONE REPLACEMENT THERAPY</strong>
              </p>
              <p>
                I understand the reasonable alternatives to testosterone replacement therapy, which include: Leaving the testosterone levels as they are and doing nothing. Risks may include but are not limited to: experiencing symptoms of testosterone deficiency, and increased risk for aging-related diseases or dysfunction resulting from declining testosterone levels. This alternative may result in the need to treat diseases or dysfunction associated with declining testosterone levels as they appear clinically; treating the symptoms of declining testosterone levels as they develop with non-hormonal therapies. Risks may include, but are not limited to: increased risk for aging-related diseases resulting from declining testosterone levels.
              </p>
              <p>
                <strong>MY COMPLIANCE OBLIGATION WHILE RECEIVING TESTOSTERONE REPLACEMENT THERAPY</strong>
              </p>
              <p>
                I agree to comply with the proposed treatment and therapy as prescribed, including the fact that I may be responsible for injecting, taking by mouth, applying to my skin, or administrating the testosterone(s) that may be prescribed to me, and consent to periodic monitoring, when requested, which may include Laboratory monitoring of blood, saliva or urine chemistries and testosterone levels, Physical examinations, and Regular screening evaluations.
              </p>
              <p>
                I agree to notify you regarding all signs or symptoms of possible reactions to my therapy.
              </p>
              <p>
                I agree to comply with all other healthy lifestyle activities that have been individually recommended for me. I have completely disclosed my medical history, including prescription and non-prescription medications that I am currently taking or plan to take during my treatment, as well as any other over-the-counter medications, recreational drugs or social substances, herbs, extracts, and other dietary supplements to you. I agree to comply with the recommendations regarding the continuation or discontinuation of these preparations.
              </p>
              <p>
                In the future, I will receive recommendations in advance from you before stopping any prescribed therapeutic regimens or taking additional preparations that are not recommended by you.
              </p>
              <p>
                I certify that I am under the care of a physician(s) for any and all other medical conditions.
              </p>
              <p>
                <strong>RESEARCH and ECONOMIC INTERESTS</strong>
              </p>
              <p>
                I understand that the prescribing practitioner is not engaged in any personal research and has no economic interests unrelated to my immediate care or treatment that may affect the physician’s choice of treatment or medical judgment.
              </p>
              <p>
                <strong>ATTESTATION &amp; CONSENT</strong> I certify that I have been given the opportunity to ask any and all questions I have concerning the proposed treatment, and I received all requested information, and all questions were answered. I fully understand that I have the right to not consent to testosterone replacement therapy. I believe I have adequate knowledge upon which to base an informed consent. I do now attest to reading and fully understanding this form and the contents and clinical meanings of such and discussing these procedures with my healthcare provider and consent to this treatment, and hereby affix my signature to this authorization for this proposed long-term treatment. I have been given a copy of this consent form, and I understand fully any and all the possibly represented implications and meanings of its writing and expectations.
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
                      const dataUrl = patientSigPad.current.getTrimmedCanvas().toDataURL();
                      setValue("patientSignature", dataUrl);
                      trigger("patientSignature");
                      console.log("Step 5: Patient signature updated on end");
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
              <label>Date:</label>
              <input
                type="date"
                {...register("patientDate", { required: "Date is required" })}
              />
              {errors.patientDate && (
                <p className="error-message">{errors.patientDate.message}</p>
              )}
            </div>

            {/* Witness Information */}
            <div className="form-group">
              <label>Witness Name (Required)</label>
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <input
                  type="text"
                  placeholder="First"
                  {...register("witnessFirstName", {
                    required: "Witness first name is required",
                  })}
                />
                <input
                  type="text"
                  placeholder="Last"
                  {...register("witnessLastName", {
                    required: "Witness last name is required",
                  })}
                />
              </div>
              {(errors.witnessFirstName || errors.witnessLastName) && (
                <p className="error-message">
                  {errors.witnessFirstName?.message ||
                    errors.witnessLastName?.message}
                </p>
              )}
            </div>

            <div className="form-group">
              <label>Witness Signature (Required)</label>
              <div className="signature-pad-wrapper">
                <SignatureCanvas
                  ref={witnessSigPad}
                  penColor="black"
                  canvasProps={{
                    width: 400,
                    height: 150,
                    className: "signature-canvas-fixed",
                  }}
                  onEnd={() => {
                    if (!witnessSigPad.current.isEmpty()) {
                      const dataUrl = witnessSigPad.current.getTrimmedCanvas().toDataURL();
                      setValue("witnessSignature", dataUrl);
                      trigger("witnessSignature");
                      console.log("Step 5: Witness signature updated on end");
                    }
                  }}
                />
              </div>
              <button
                type="button"
                onClick={clearWitnessSignature}
                className="clear-signature"
              >
                Clear Signature
              </button>
              {errors.witnessSignature && (
                <p className="error-message">
                  {errors.witnessSignature.message}
                </p>
              )}
            </div>

            <div className="form-group">
              <label>Date:</label>
              <input
                type="date"
                {...register("witnessDate", { required: "Date is required" })}
              />
              {errors.witnessDate && (
                <p className="error-message">{errors.witnessDate.message}</p>
              )}
            </div>

            {/* Navigation Buttons */}
            <div className="form-navigation button-row">
              <button
                type="button"
                className="btn-outline"
                onClick={() => {
                  console.log("Step 5: Navigating back to step4");
                  navigate("/book-appointment-step4");
                }}
              >
                Previous
              </button>
              <button type="submit" className="submit-btn">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default BookAppointmentStep5;
