import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "./WooFormPage.css";

export default function WooFormPage2() {
  const navigate = useNavigate();
  const stored = localStorage.getItem("wooFormData");
  const parsed = stored ? JSON.parse(stored) : {};

  const {
    register,
    handleSubmit,
    trigger,
    watch,
    formState: { errors },
  } = useForm({ mode: "onChange", defaultValues: parsed });

  useEffect(() => {
    trigger();
  }, [trigger]);

  const values = watch();
  const reqClass = (fieldError) => (fieldError ? "wc-required error" : "wc-required valid");

  const onSubmit = (data) => {
    localStorage.setItem("wooFormData", JSON.stringify({ ...parsed, ...data }));
    navigate("/woo-form-page-3");
  };

  return (
    <div className="wc-container">
      <div className="wc-content">
        <h1 className="wc-title">Telemedicine Consultation Forms (Woocommerce)</h1>
        <div className="wc-paper">
          <div className="wc-progress">
            <div className="wc-progress-info"><p>Step 2 of 6</p></div>
            <div className="wc-progress-bg"><div className="wc-progress-fill" style={{ width: '33.33%' }} /></div>
          </div>

          <form className="wc-form" onSubmit={handleSubmit(onSubmit)}>
            <p className="wc-section-title">Share some Information about you:</p>

            {/* Weight */}
            <div className="wc-group">
              <label>
                Your Weight <span className={reqClass(errors.weight)}>(Required)</span>
              </label>
              <input
                className="wc-input"
                type="number"
                placeholder="In Pounds"
                {...register("weight", { required: true })}
              />
              {errors.weight && <p className="wc-error-message">Required.</p>}
            </div>

            {/* Last Well */}
            <div className="wc-group">
              <label>
                When was the last time you felt well? <span className={reqClass(errors.lastWell)}>(Required)</span>
              </label>
              <input
                className="wc-input"
                type="text"
                placeholder=""
                {...register("lastWell", { required: true })}
              />
              {errors.lastWell && <p className="wc-error-message">Required.</p>}
            </div>

            {/* Hormone Therapy */}
            <div className="wc-group">
              <label>
                Have you tried hormone therapy before? <span className={reqClass(errors.triedHormone)}>(Required)</span>
              </label>
              <select
                className="wc-select"
                {...register("triedHormone", { required: true })}
              >
                <option value="">Select</option>
                <option value="No">No</option>
                <option value="Yes">Yes</option>
              </select>
              {errors.triedHormone && <p className="wc-error-message">Required.</p>}
            </div>

            {/* Exercise */}
            <div className="wc-group">
              <label>
                How many days a week do you exercise? <span className={reqClass(errors.exerciseDays)}>(Required)</span>
              </label>
              <div>
                {['None','1 day','2 days','3 days','4 days or more'].map((opt) => (
                  <label key={opt} style={{ display:'block', margin:'0.25rem 0' }}>
                    <input
                      type="radio"
                      value={opt}
                      {...register("exerciseDays", { required: true })}
                    /> {opt}
                  </label>
                ))}
              </div>
              {errors.exerciseDays && <p className="wc-error-message">Required.</p>}
            </div>

            {/* Conditions */}
            <div className="wc-group">
              <label>
                Select any conditions that you currently have or have ever been diagnosed with <span className={reqClass(errors.conditions)}>(Required)</span>
              </label>
              <div>
                {[
                  'Hypertension','Diabetes','Blood Clots','Congenital Thrombophilia','Thyroid Disease',
                  'Active Prostate Cancer','Infertility','Pregnant','Women Who Might Become Pregnant',
                  'Heart Attack','Heart Disease','Stroke','High Cholesterol','Kidney Disease','Liver Disease',
                  'Anxiety','Depression','ADHD','Cancer','None'
                ].map((opt) => (
                  <label key={opt} style={{ display:'block', margin:'0.25rem 0' }}>
                    <input
                      type="checkbox"
                      value={opt}
                      {...register("conditions", { required: true })}
                    /> {opt}
                  </label>
                ))}
              </div>
              {errors.conditions && <p className="wc-error-message">Required.</p>}
            </div>

            {/* Family History */}
            <div className="wc-group">
              <label>
                Family History <span className={reqClass(errors.familyHistory)}>(Required)</span>
              </label>
              <div>
                {[
                  'Hypertension','Diabetes','Blood Clots','Congenital Thrombophilia','Thyroid Disease',
                  'Prostate Cancer','Infertility','Heart Attack','Heart Disease','Stroke','High Cholesterol',
                  'Kidney Disease','Liver Disease','Anxiety','Depression','Cancer','None'
                ].map((opt) => (
                  <label key={opt} style={{ display:'block', margin:'0.25rem 0' }}>
                    <input
                      type="checkbox"
                      value={opt}
                      {...register("familyHistory", { required: true })}
                    /> {opt}
                  </label>
                ))}
              </div>
              {errors.familyHistory && <p className="wc-error-message">Required.</p>}
            </div>

            {/* Social History */}
            <div className="wc-group">
              <label>
                Social History <span className={reqClass(errors.socialHistory)}>(Required)</span>
              </label>
              <div>
                {['Alcohol','Tobacco','Drugs','None'].map((opt) => (
                  <label key={opt} style={{ display:'block', margin:'0.25rem 0' }}>
                    <input
                      type="checkbox"
                      value={opt}
                      {...register("socialHistory", { required: true })}
                    /> {opt}
                  </label>
                ))}
              </div>
              {errors.socialHistory && <p className="wc-error-message">Required.</p>}
            </div>

            {/* Allergies */}
            <div className="wc-group">
              <label>
                Please list any allergies <span className={reqClass(errors.allergies)}>(Required)</span>
              </label>
              <input
                className="wc-input"
                type="text"
                placeholder=""
                {...register("allergies", { required: true })}
              />
              {errors.allergies && <p className="wc-error-message">Required.</p>}
            </div>

            {/* Motivation */}
            <div className="wc-group">
              <label>
                How motivated are you to make changes to your health? <span className={reqClass(errors.motivation)}>(Required)</span>
              </label>
              <div>
                {['Not Motivated','Kinda Motivated','Motivated','Very Motivated'].map((opt) => (
                  <label key={opt} style={{ display:'block', margin:'0.25rem 0' }}>
                    <input
                      type="radio"
                      value={opt}
                      {...register("motivation", { required: true })}
                    /> {opt}
                  </label>
                ))}
              </div>
              {errors.motivation && <p className="wc-error-message">Required.</p>}
            </div>

            {/* Symptoms */}
            <div className="wc-group">
              <label>
                Please check all the symptoms you are currently experiencing. <span className={reqClass(errors.symptoms)}>(Required)</span>
              </label>
              <div>
                {[
                  'Poor Sleep','Low Sex Drive','Anxiety','Depression','Low Energy','Constant Fatigue',
                  'Muscle Loss','Brain Fog','Weight Gain','Hot Flashes','Irritable','None'
                ].map((opt) => (
                  <label key={opt} style={{ display:'block', margin:'0.25rem 0' }}>
                    <input
                      type="checkbox"
                      value={opt}
                      {...register("symptoms", { required: true })}
                    /> {opt}
                  </label>
                ))}
              </div>
              {errors.symptoms && <p className="wc-error-message">Required.</p>}
            </div>

            {/* Services */}
            <div className="wc-group">
              <label>
                What service(s) are you interested in? <span className={reqClass(errors.services)}>(Required)</span>
              </label>
              <div>
                {[
                  "Men's - Hormone Replacement Therapy",
                  "Women's - Hormone Replacement Therapy"
                ].map((opt) => (
                  <label key={opt} style={{ display:'block', margin:'0.25rem 0' }}>
                    <input
                      type="checkbox"
                      value={opt}
                      {...register("services", { required: true })}
                    /> {opt}
                  </label>
                ))}
              </div>
              {errors.services && <p className="wc-error-message">Required.</p>}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button
                type="button"
                className="wc-button"
                style={{ background: 'transparent', color: '#111827', border: '1px solid #111827' }}
                onClick={() => navigate(-1)}
              >
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
