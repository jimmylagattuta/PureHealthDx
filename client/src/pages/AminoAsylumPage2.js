import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "./AminoAsylumLandingPage.css";

export default function AminoAsylumPage2() {
  const navigate = useNavigate();
  const stored = localStorage.getItem("appointmentFormData");
  const saved = stored ? JSON.parse(stored) : {};

  const {
    register,
    handleSubmit,
    trigger,
    watch,
    formState: { errors },
  } = useForm({ mode: "onChange", defaultValues: saved });

  useEffect(() => {
    trigger();
  }, [trigger]);

  const vals = watch();
  const reqClass = (v, e) => (e ? "aa-required error" : "aa-required valid");

  const onSubmit = (data) => {
    localStorage.setItem(
      "appointmentFormData",
      JSON.stringify({ ...saved, ...data })
    );
    navigate("/amino-asylum-page-3");
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
              <p>Step 2 of 6</p>
            </div>
            <div className="aa-progress-bg">
              <div className="aa-progress-fill" style={{ width: '33.33%' }} />
            </div>
          </div>

          <h2>Share some information about you:</h2>

          <form className="aa-form" onSubmit={handleSubmit(onSubmit)}>
            {/* Weight */}
            <div className="aa-form-group">
              <label>
                Your Weight
                <span className={reqClass(vals.weight, errors.weight)}>
                  (Required)
                </span>
              </label>
              <input
                className="aa-input"
                {...register("weight", { required: true })}
                placeholder="In Pounds"
              />
              {errors.weight && (
                <p className="aa-error-message">Weight is required.</p>
              )}
            </div>

            {/* Last Well */}
            <div className="aa-form-group">
              <label>
                When was the last time you felt well?
                <span className={reqClass(vals.lastWell, errors.lastWell)}>
                  (Required)
                </span>
              </label>
              <input
                className="aa-input"
                {...register("lastWell", { required: true })}
                placeholder=""
              />
              {errors.lastWell && (
                <p className="aa-error-message">This field is required.</p>
              )}
            </div>

            {/* Tried Hormone */}
            <div className="aa-form-group">
              <label>
                Have you tried hormone therapy before?
                <span className={reqClass(vals.triedHormone, errors.triedHormone)}>
                  (Required)
                </span>
              </label>
              <select
                className="aa-select"
                {...register("triedHormone", { required: true })}
              >
                <option value="">Select</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
              {errors.triedHormone && (
                <p className="aa-error-message">Selection required.</p>
              )}
            </div>

            {/* Exercise Days */}
            <div className="aa-form-group">
              <label>
                How many days a week do you exercise?
                <span className={reqClass(vals.exerciseDays, errors.exerciseDays)}>
                  (Required)
                </span>
              </label>
              <div>
                {[
                  "None",
                  "1 day",
                  "2 days",
                  "3 days",
                  "4 days or more",
                ].map((opt) => (
                  <label key={opt} style={{ display: "block" }}>
                    <input
                      type="radio"
                      value={opt}
                      {...register("exerciseDays", { required: true })}
                    />
                    {opt}
                  </label>
                ))}
              </div>
              {errors.exerciseDays && (
                <p className="aa-error-message">This field is required.</p>
              )}
            </div>

            {/* Conditions */}
            <div className="aa-form-group">
              <label>
                Select any conditions that you currently have or have ever been
diagnosed with
                <span className={reqClass(vals.conditions, errors.conditions)}>
                  (Required)
                </span>
              </label>
              <div>
                {[
                  'Hypertension','Diabetes','Blood Clots','Congenital Thrombophilia',
                  'Thyroid Disease','Active Prostate Cancer','Infertility','Pregnant',
                  'Women Who Might Become Pregnant','Heart Attack','Heart Disease','Stroke',
                  'High Cholesterol','Kidney Disease','Liver Disease','Anxiety','Depression',
                  'ADHD','Cancer','None'
                ].map((cond) => (
                  <label key={cond} style={{ display: "block" }}>
                    <input
                      type="checkbox"
                      value={cond}
                      {...register("conditions", { required: true })}
                    />
                    {cond}
                  </label>
                ))}
              </div>
              {errors.conditions && (
                <p className="aa-error-message">
                  At least one selection is required.
                </p>
              )}
            </div>

            {/* Family History */}
            <div className="aa-form-group">
              <label>
                Family History
                <span
                  className={reqClass(vals.familyHistory, errors.familyHistory)}
                >
                  (Required)
                </span>
              </label>
              <div>
                {[
                  'Hypertension','Diabetes','Blood Clots','Congenital Thrombophilia',
                  'Thyroid Disease','Prostate Cancer','Infertility','Heart Attack',
                  'Heart Disease','Stroke','High Cholesterol','Kidney Disease',
                  'Liver Disease','Anxiety','Depression','Cancer','None'
                ].map((fh) => (
                  <label key={fh} style={{ display: "block" }}>
                    <input
                      type="checkbox"
                      value={fh}
                      {...register("familyHistory", { required: true })}
                    />
                    {fh}
                  </label>
                ))}
              </div>
              {errors.familyHistory && (
                <p className="aa-error-message">
                  At least one selection is required.
                </p>
              )}
            </div>

            {/* Social History */}
            <div className="aa-form-group">
              <label>
                Social History
                <span className={reqClass(vals.socialHistory, errors.socialHistory)}>
                  (Required)
                </span>
              </label>
              <div>
                {['Alcohol','Tobacco','Drugs','None'].map((sh) => (
                  <label key={sh} style={{ display: "block" }}>
                    <input
                      type="checkbox"
                      value={sh}
                      {...register("socialHistory", { required: true })}
                    />
                    {sh}
                  </label>
                ))}
              </div>
              {errors.socialHistory && (
                <p className="aa-error-message">
                  At least one selection is required.
                </p>
              )}
            </div>

            {/* Allergies */}
            <div className="aa-form-group">
              <label>
                Please list any allergies
                <span className={reqClass(vals.allergies, errors.allergies)}>
                  (Required)
                </span>
              </label>
              <input
                className="aa-input"
                {...register("allergies", { required: true })}
              />
              {errors.allergies && (
                <p className="aa-error-message">This field is required.</p>
              )}
            </div>

            {/* Motivation */}
            <div className="aa-form-group">
              <label>
                How motivated are you to make changes to your health?
                <span className={reqClass(vals.motivation, errors.motivation)}>
                  (Required)
                </span>
              </label>
              <div>
                {[
                  'Not Motivated','Kinda Motivated','Motivated','Very Motivated'
                ].map((m) => (
                  <label key={m} style={{ display: "block" }}>
                    <input
                      type="radio"
                      value={m}
                      {...register("motivation", { required: true })}
                    />
                    {m}
                  </label>
                ))}
              </div>
              {errors.motivation && (
                <p className="aa-error-message">This field is required.</p>
              )}
            </div>

            {/* Symptoms */}
            <div className="aa-form-group">
              <label>
                Please check all the symptoms you are currently experiencing.
                <span className={reqClass(vals.symptoms, errors.symptoms)}>
                  (Required)
                </span>
              </label>
              <div>
                {[
                  'Poor Sleep','Low Sex Drive','Anxiety','Depression','Low Energy',
                  'Constant Fatigue','Muscle Loss','Brain Fog','Weight Gain',
                  'Hot Flashes','Irritable','None'
                ].map((s) => (
                  <label key={s} style={{ display: "block" }}>
                    <input
                      type="checkbox"
                      value={s}
                      {...register("symptoms", { required: true })}
                    />
                    {s}
                  </label>
                ))}
              </div>
              {errors.symptoms && (
                <p className="aa-error-message">
                  At least one selection is required.
                </p>
              )}
            </div>

            {/* Services Interested */}
            <div className="aa-form-group">
              <label>
                What service(s) are you interested in?
                <span className={reqClass(vals.services, errors.services)}>
                  (Required)
                </span>
              </label>
              <div>
                {[
                  "Men's - Hormone Replacement Therapy",
                  "Women's - Hormone Replacement Therapy",
                  'Erectile Dysfunction Treatment',
                  'Peptide Therapy',
                  'Platelet Rich Plasma Treatment'
                ].map((svc) => (
                  <label key={svc} style={{ display: "block" }}>
                    <input
                      type="checkbox"
                      value={svc}
                      {...register("services", { required: true })}
                    />
                    {svc}
                  </label>
                ))}
              </div>
              {errors.services && (
                <p className="aa-error-message">
                  At least one selection is required.
                </p>
              )}
            </div>

            {/* Navigation Buttons */}
            <div className="aa-form-group aa-form-group--two" style={{
              justifyContent: 'space-between', marginTop: '1rem'
            }}>
              <button type="button" onClick={() => navigate(-1)} className="aa-submit-btn" style={{ background: 'transparent', color: '#111827', border: '1px solid #111827' }}>
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
