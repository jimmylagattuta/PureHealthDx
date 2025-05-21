import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "./BookAppointmentPage.css";

const BookAppointmentStep2 = () => {
  // Enable demo mode – auto-fill non–signature fields for demo purposes.
  const demoMode = false;
  const navigate = useNavigate();

  // Setup react-hook-form with demo defaults.
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    trigger,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: demoMode
      ? {
          height: "3'3\" (99 cm)",
          weight: "144",
          lastFeltWell: "y",
          hormoneTherapyBefore: "No",
          exerciseDays: "None",
          conditions: [],
          familyHistory: [],
          socialHistory: [],
          allergies: "none",
          motivation: "Not Motivated",
          symptoms: [],
          services: [],
        }
      : {},
  });

  const values = watch();

  // Auto scroll to the top on mount.
  useEffect(() => {
    window.scrollTo(0, 0);
    trigger();
  }, [trigger]);

  // In demo mode, auto-fill default values (if not already set via defaultValues)
  useEffect(() => {
    if (demoMode) {
      setValue("height", "3'3\" (99 cm)");
      setValue("weight", "144");
      setValue("lastFeltWell", "y");
      setValue("hormoneTherapyBefore", "No");
      setValue("exerciseDays", "None");
      setValue("allergies", "none");
      setValue("motivation", "Not Motivated");
      console.log("Demo mode enabled: default values auto-filled");
    }
  }, [demoMode, setValue]);

  const onSubmit = (step2Data) => {
    const step1Data = JSON.parse(localStorage.getItem("appointmentFormData")) || {};
    const fullData = { ...step1Data, ...step2Data };

    console.log("📋 Combined Step 1 + Step 2 form data:", fullData);

    // Save merged result back to localStorage for use in Step 3
    localStorage.setItem("appointmentFormData", JSON.stringify(fullData));

    // Navigate to Step 3
    navigate("/book-appointment-step3");
  };

  // Options for checkbox and radio groups.
  const conditionsOptions = [
    "Hypertension",
    "Diabetes",
    "Blood Clots",
    "Congenital Thrombophilia",
    "Thyroid Disease",
    "Active Prostate Cancer",
    "Infertility",
    "Pregnant",
    "Women Who Might Become Pregnant",
    "Heart Attack",
    "Heart Disease",
    "Stroke",
    "High Cholesterol",
    "Kidney Disease",
    "Liver Disease",
    "Anxiety",
    "Depression",
    "ADHD",
    "Cancer",
    "None",
  ];

  const familyHistoryOptions = [
    "Hypertension",
    "Diabetes",
    "Blood Clots",
    "Congenital Thrombophilia",
    "Thyroid Disease",
    "Prostate Cancer",
    "Infertility",
    "Heart Attack",
    "Heart Disease",
    "Stroke",
    "High Cholesterol",
    "Kidney Disease",
    "Liver Disease",
    "Anxiety",
    "Depression",
    "Cancer",
    "None",
  ];

  const socialHistoryOptions = ["Alcohol", "Tobacco", "Drugs", "None"];

  const motivationOptions = [
    "Not Motivated",
    "Kinda Motivated",
    "Motivated",
    "Very Motivated",
  ];

  const symptomsOptions = [
    "Poor Sleep",
    "Low Sex Drive",
    "Anxiety",
    "Depression",
    "Low Energy",
    "Constant Fatigue",
    "Muscle Loss",
    "Brain Fog",
    "Weight Gain",
    "Hot Flashes",
    "Irritable",
    "None",
  ];

  const servicesOptions = [
    "Men's - Hormone Replacement Therapy",
    "Women's - Hormone Replacement Therapy",
    "Pain Management",
    "Erectile Dysfunction Treatment",
    "Peptide Therapy",
    "Platelet Rich Plasma Treatment",
  ];

  // Helper to get CSS class for required fields.
  const getRequiredClass = (fieldName, fieldError) => {
    const value = watch(fieldName);
    if (!value || fieldError) return "required error";
    return "required valid";
  };

  return (
    <div className="book-appointment-container">
      {/* Banner – mobile-first design */}
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
              <p>Step 2 of 6</p>
            </div>
            <div className="progress-bar-background">
              <div className="progress-bar-fill" style={{ width: "33.33%" }}></div>
            </div>
          </div>

        <h2>Share some Information about you:</h2>
          <form className="intake-form" onSubmit={handleSubmit(onSubmit)}>
            {/* Height */}
            <div className="form-group">
  <label>What is your height? (Required)</label>
  <input
    type="text"
    placeholder={'e.g. 3\'3" (99 cm)'}
    {...register("height", { required: "Height is required." })}
  />
  {errors.height && <p className="error-message">{errors.height.message}</p>}
</div>


            {/* Weight */}
            <div className="form-group">
              <label>Your Weight (Required)</label>
              <input
                type="number"
                placeholder="144"
                {...register("weight", { required: "Weight is required." })}
              />
              {errors.weight && <p className="error-message">{errors.weight.message}</p>}
            </div>

            {/* Last felt well */}
            <div className="form-group">
              <label>When was the last time you felt well? (Required)</label>
              <input
                type="text"
                placeholder="Enter a value (e.g. y)"
                {...register("lastFeltWell", { required: "This field is required." })}
              />
              {errors.lastFeltWell && <p className="error-message">{errors.lastFeltWell.message}</p>}
            </div>

            {/* Hormone therapy before */}
            <div className="form-group">
              <label>Have you tried hormone therapy before? (Required)</label>
              <div>
                <label>
                  <input
                    type="radio"
                    value="Yes"
                    {...register("hormoneTherapyBefore", { required: "This field is required." })}
                  />
                  Yes
                </label>
                <label style={{ marginLeft: "1rem" }}>
                  <input
                    type="radio"
                    value="No"
                    {...register("hormoneTherapyBefore", { required: "This field is required." })}
                  />
                  No
                </label>
              </div>
              {errors.hormoneTherapyBefore && (
                <p className="error-message">{errors.hormoneTherapyBefore.message}</p>
              )}
            </div>

            {/* Exercise days */}
            <div className="form-group">
              <label>How many days a week do you exercise? (Required)</label>
              <div>
                <label>
                  <input
                    type="radio"
                    value="None"
                    {...register("exerciseDays", { required: "This field is required." })}
                  />
                  None
                </label>
                <label style={{ marginLeft: "1rem" }}>
                  <input
                    type="radio"
                    value="1 day"
                    {...register("exerciseDays", { required: "This field is required." })}
                  />
                  1 day
                </label>
                <label style={{ marginLeft: "1rem" }}>
                  <input
                    type="radio"
                    value="2 days"
                    {...register("exerciseDays", { required: "This field is required." })}
                  />
                  2 days
                </label>
                <label style={{ marginLeft: "1rem" }}>
                  <input
                    type="radio"
                    value="3 days"
                    {...register("exerciseDays", { required: "This field is required." })}
                  />
                  3 days
                </label>
                <label style={{ marginLeft: "1rem" }}>
                  <input
                    type="radio"
                    value="4 days or more"
                    {...register("exerciseDays", { required: "This field is required." })}
                  />
                  4 days or more
                </label>
              </div>
              {errors.exerciseDays && <p className="error-message">{errors.exerciseDays.message}</p>}
            </div>

            {/* Conditions */}
            <div className="form-group">
              <label>Select any conditions that you currently have or have ever been diagnosed with (Required)</label>
              <div>
                {conditionsOptions.map((condition) => (
                  <label key={condition} style={{ display: "block" }}>
                    <input
                      type="checkbox"
                      value={condition}
                      {...register("conditions", { required: "Select at least one condition." })}
                    />
                    {condition}
                  </label>
                ))}
              </div>
              {errors.conditions && <p className="error-message">{errors.conditions.message}</p>}
            </div>

            {/* Family History */}
            <div className="form-group">
              <label>Family History (Required)</label>
              <div>
                {familyHistoryOptions.map((item) => (
                  <label key={item} style={{ display: "block" }}>
                    <input
                      type="checkbox"
                      value={item}
                      {...register("familyHistory", { required: "Select at least one family history item." })}
                    />
                    {item}
                  </label>
                ))}
              </div>
              {errors.familyHistory && <p className="error-message">{errors.familyHistory.message}</p>}
            </div>

            {/* Social History */}
            <div className="form-group">
              <label>Social History (Required)</label>
              <div>
                {socialHistoryOptions.map((item) => (
                  <label key={item} style={{ display: "block" }}>
                    <input
                      type="checkbox"
                      value={item}
                      {...register("socialHistory", { required: "Select at least one social history item." })}
                    />
                    {item}
                  </label>
                ))}
              </div>
              {errors.socialHistory && <p className="error-message">{errors.socialHistory.message}</p>}
            </div>

            {/* Allergies */}
            <div className="form-group">
              <label>Please list any allergies (Required)</label>
              <input
                type="text"
                placeholder="List any allergies"
                {...register("allergies", { required: "Allergies are required." })}
              />
              {errors.allergies && <p className="error-message">{errors.allergies.message}</p>}
            </div>

            {/* Motivation */}
            <div className="form-group">
              <label>How motivated are you to make changes to your health? (Required)</label>
              <div>
                {motivationOptions.map((option) => (
                  <label key={option} style={{ marginRight: "1rem" }}>
                    <input
                      type="radio"
                      value={option}
                      {...register("motivation", { required: "Please select your motivation level." })}
                    />
                    {option}
                  </label>
                ))}
              </div>
              {errors.motivation && <p className="error-message">{errors.motivation.message}</p>}
            </div>

            {/* Symptoms */}
            <div className="form-group">
              <label>Please check all the symptoms you are currently experiencing. (Required)</label>
              <div>
                {symptomsOptions.map((symptom) => (
                  <label key={symptom} style={{ display: "block" }}>
                    <input
                      type="checkbox"
                      value={symptom}
                      {...register("symptoms", { required: "Select at least one symptom." })}
                    />
                    {symptom}
                  </label>
                ))}
              </div>
              {errors.symptoms && <p className="error-message">{errors.symptoms.message}</p>}
            </div>

            {/* Services */}
            <div className="form-group">
              <label>What service(s) are you interested in? (Required)</label>
              <div>
                {servicesOptions.map((service) => (
                  <label key={service} style={{ display: "block" }}>
                    <input
                      type="checkbox"
                      value={service}
                      {...register("services", { required: "Select at least one service." })}
                    />
                    {service}
                  </label>
                ))}
              </div>
              {errors.services && <p className="error-message">{errors.services.message}</p>}
            </div>

            {/* Navigation Buttons */}
            <div className="form-navigation button-row">
              <button
                type="button"
                className="btn-outline"
                onClick={() => {
                  console.log("Step 2: Navigating back to step1");
                  navigate("/book-appointment");
                }}
              >
                Previous
              </button>
              <button type="submit" className="submit-btn">
                Next Step
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookAppointmentStep2;
