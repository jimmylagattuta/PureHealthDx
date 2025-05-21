import React, { useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import SignatureCanvas from "react-signature-canvas";
import { useNavigate } from "react-router-dom";
import "./BookAppointmentPage.css";

const BookAppointmentStep4 = () => {
  const navigate = useNavigate();

  // Refs for the two signature pads
  const patientSigPad = useRef(null);
  const witnessSigPad = useRef(null);

  // Dummy autofill values for patient fields and witness fields
  // const dummyPatientName = "John Doe";
  // const dummyPatientDate = "2025-04-10"; // ISO format (YYYY-MM-DD)
  // const dummyWitnessFirstName = "Jane";
  // const dummyWitnessLastName = "Smith";
  // const dummyWitnessDate = "2025-04-10";

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
    patientDate: "",
    witnessFirstName: "",
    witnessLastName: "",
    witnessSignature: "",
    witnessDate: "",
  },
});


  const values = watch();

  // Validate on mount
  useEffect(() => {
    console.log("Step 4: Triggering initial validation");
    trigger();
  }, [trigger]);

  // Clear functions for signature pads
  const clearPatientSignature = () => {
    console.log("Step 4: Clearing patient signature");
    if (patientSigPad.current) {
      patientSigPad.current.clear();
      setValue("patientSignature", "");
      trigger("patientSignature");
    }
  };

  const clearWitnessSignature = () => {
    console.log("Step 4: Clearing witness signature");
    if (witnessSigPad.current) {
      witnessSigPad.current.clear();
      setValue("witnessSignature", "");
      trigger("witnessSignature");
    }
  };

const onSubmit = () => {
  console.log("Step 4: onSubmit triggered");

  if (!patientSigPad.current || patientSigPad.current.isEmpty()) {
    console.warn("Step 4: Patient signature is missing");
    setValue("patientSignature", "", { shouldValidate: true });
    trigger("patientSignature");
    return;
  }

  if (!witnessSigPad.current || witnessSigPad.current.isEmpty()) {
    console.warn("Step 4: Witness signature is missing");
    setValue("witnessSignature", "", { shouldValidate: true });
    trigger("witnessSignature");
    return;
  }

  // Capture signatures
  const patientSigData = patientSigPad.current.getTrimmedCanvas().toDataURL();
  const witnessSigData = witnessSigPad.current.getTrimmedCanvas().toDataURL();

  // Watch values
  const values = watch();

  // Full labeling
  const labeledStep4Data = {
    informedConsentForHghReplacementTherapyPatientName: values.patientName,
    informedConsentForHghReplacementTherapyPatientDate: values.patientDate,
    informedConsentForHghReplacementTherapyPatientSignature: patientSigData,
    informedConsentForHghReplacementTherapyWitnessFirstName: values.witnessFirstName,
    informedConsentForHghReplacementTherapyWitnessLastName: values.witnessLastName,
    informedConsentForHghReplacementTherapyWitnessDate: values.witnessDate,
    informedConsentForHghReplacementTherapyWitnessSignature: witnessSigData
  };

  const previousSteps = JSON.parse(localStorage.getItem("appointmentFormData")) || {};
  const fullData = { ...previousSteps, ...labeledStep4Data };

  console.log("📋 Combined Step 1–4 data:", fullData);

  localStorage.setItem("appointmentFormData", JSON.stringify(fullData));

  // ❌ Temporarily block navigation to Step 5
  navigate("/book-appointment-step5");
};



  return (
    <form
      className="intake-form"
      onSubmit={handleSubmit(onSubmit, (errors) => console.log("Validation errors:", errors))}
    >
      <div className="book-appointment-container">
      <div className="banner">
        <div className="banner-overlay"></div>
        <div className="banner-text">
          <h1>Book Telemedicine Consultation</h1>
        </div>
      </div>

        <div className="content-section">
        <h2>Start Your Wellness Journey Today</h2>

          <div className="paper-container">
            {/* Progress Bar */}
            <div className="progress">
              <div className="progress-info">
                <p>Step 4 of 6</p>
              </div>
              <div className="progress-bar-background">
                <div className="progress-bar-fill" style={{ width: "66%" }} />
              </div>
            </div>

            {/* Consent Text */}
            <div className="consent-text">
              <p>
                <strong>
                  Informed Consent for Human Growth Hormone Replacement
                </strong>
              </p>
              <p>
                I, the undersigned, authorize and give my Informed Consent for
                the administration of human growth hormone replacement therapy
                offered by (“PRACTICE”): (Patient &amp; Practice are referred to
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
                condition is determined from medical history, physical findings,
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
                While the New England Journal of Medicine, October 1999,
                concluded, “There is no evidence that HGH replacement therapy
                affects the risk of cancer or cardiovascular disease,” I
                understand that questions have been raised about HGH as a cause
                of cancer, since it is an anabolic hormone and makes things
                grow.
              </p>
              <p>
                <strong>
                  SIDE EFFECTS OF HUMAN GROWTH HORMONE REPLACEMENT
                </strong>
              </p>
              <p>I understand that side effects may occur with the use of HGH.</p>
              <p>
                Possible side effects include but are not limited to: edema
                (swelling) of the hands and ankles, paresthesias (numbness and
                tingling in the hands), arthralgias (joint aching), slight
                bruising at the injection site, and glucose intolerance, at
                least initially, where blood sugar is higher for a given amount
                of sugar or equivalent consumed. Excess doses may result in
                fluid retention in the hands and feet. Continued fluid retention
                could lead to headaches and/or joint pain, and possibly carpal
                tunnel syndrome, increased blood pressure or insulin resistance.
              </p>
              <p>
                <strong>
                  ALTERNATIVES TO HUMAN GROWTH HORMONE REPLACEMENT
                </strong>
              </p>
              <p>
                I am totally and completely satisfied with my understanding of
                the reasonable alternatives to human growth hormone replacement,
                which include:
              </p>
              <p>
                Leaving the hormone levels as they are and doing nothing. Risks
                may include but are not limited to: experiencing symptoms of
                growth hormone deficiency and an increased risk for
                aging-related diseases or dysfunction resulting from declining
                growth hormone levels. This alternative may result in the need
                to treat diseases or dysfunction associated with declining
                growth hormone levels as they appear clinically.
              </p>
              <p>
                Treating the symptoms of declining growth hormone levels as they
                develop with non-hormonal therapies. Risks may include, but are
                not limited to: increased risk for aging-related diseases
                resulting from declining hormone levels.
              </p>
              <p>
                <strong>
                  Informed Consent for Human Growth Hormone Replacement – MY
                  COMPLIANCE OBLIGATIONS WHILE RECEIVING HUMAN GROWTH HORMONE
                  REPLACEMENT
                </strong>
              </p>
              <p>
                I agree to comply with the proposed treatment and therapy as
                prescribed, including the fact that I may be responsible for
                injecting the human growth hormone prescribed to me, and consent
                to periodic monitoring, when requested, which may include:
                Laboratory monitoring of blood or urine chemistries and hormone
                levels, physical examinations, and/or regular screening
                evaluations.
              </p>
              <p>
                I agree to notify you regarding all signs or symptoms of
                possible reactions to my therapy.
              </p>
              <p>
                I agree to comply with all other healthy lifestyle activities
                that have been individually recommended for me. I have
                completely disclosed my medical history, including prescription
                and non-prescription medications that I am currently taking or
                plan to take during my treatment, as well as any other
                over-the-counter medications, recreational drugs or social
                substances, herbs, extracts, and other dietary supplements to
                you. I agree to comply with the recommendations regarding the
                continuation or discontinuation of these preparations.
              </p>
              <p>
                In the future I will receive recommendations in advance from you
                before stopping any of the prescribed therapeutic regimens or
                taking any additional preparations that are not suggested or
                prescribed by you.
              </p>
              <p>
                I also understand that the use of “social substances” such as
                tobacco, “street drugs,” and alcohol and other types of
                otherwise non-described “social substances” may affect my
                therapy in a significantly adverse manner.
              </p>
              <p>
                I certify that I am under the care of a physician(s) for any and
                all other medical conditions.
              </p>
              <p>
                <strong>RESEARCH AND ECONOMIC INTERESTS</strong>
              </p>
              <p>
                I understand that the prescribing physician is not engaged in
                any personal research and has no economic interests unrelated to
                my immediate care or treatment that may affect the physician’s
                choice of treatment or medical judgment.
              </p>
              <p>
                I certify that I have been given the opportunity to ask any and
                all questions I have concerning the proposed treatment, and I
                received all requested information and all questions were
                answered. I fully understand that I have the right to not
                consent to human growth hormone replacement therapy. I believe I
                have adequate knowledge upon which to base an informed consent.
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
                      console.log("Step 4: Patient signature updated on end");
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
                <p className="error-message">{errors.patientSignature.message}</p>
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
                      console.log("Step 4: Witness signature updated on end");
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
                <p className="error-message">{errors.witnessSignature.message}</p>
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
                  console.log("Step 4: Navigating back to step3");
                  navigate("/book-appointment-step3");
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

export default BookAppointmentStep4;
