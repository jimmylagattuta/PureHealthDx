import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "./BookAppointmentPage.css";

const BookAppointmentPage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  const demoMode = false;
  const navigate = useNavigate();

  // Retrieve any stored data from previous sessions
  const storedData = localStorage.getItem("appointmentFormData");

  // Set default values: either use stored data or demo defaults (if in demoMode)
  const defaultValues =
    storedData !== null
      ? JSON.parse(storedData)
      : demoMode
      ? {
          firstName: "John",
          lastName: "Doe",
          email: "john.doe@example.com",
          phone: "(555) 555-5555",
          gender: "male",
          dobMonth: "1",
          dobDay: "1",
          dobYear: "1980",
          driversLicense: "D1234567",
          streetAddress: "1234 Elm Street",
          city: "Springfield",
          zipCode: "12345",
          state: "CA",
          occupation: "Software Engineer",
          hoursOfSleep: "6-7",
          healthGoals: "Maintain healthy weight and improve energy",
          currentMedications: "None",
          maritalStatus: "single",       // NEW
          hasChildren: "no",             // NEW
          childrenCount: ""              // NEW
        }
      : {};

  const {
    register,
    handleSubmit,
    trigger,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues,
  });


  useEffect(() => {
    trigger(); // validate on mount to activate grey labels in demoMode
  }, [trigger]);

  const values = watch();

  function getRequiredClass(fieldValue, fieldError) {
    if (!fieldValue || fieldError) return "required error";
    return "required valid";
  }

  const onSubmit = (data) => {
    // Save the data to localStorage so it persists for later steps
    console.log("📋 Form submission (questions + answers):", data);
    localStorage.setItem("appointmentFormData", JSON.stringify(data));

    // Proceed to next step

    navigate("/book-appointment-step2");

  };

  const formatPhoneNumber = (value) => {
    if (!value) return value;
    const phone = value.replace(/[^\d]/g, "").slice(0, 10);
    const phoneLength = phone.length;

    if (phoneLength < 4) return phone;
    if (phoneLength < 7) return `(${phone.slice(0, 3)}) ${phone.slice(3)}`;
    return `(${phone.slice(0, 3)}) ${phone.slice(3, 6)}-${phone.slice(6, 10)}`;
  };


  return (
    <>
      <Helmet>
        <meta name="robots" content="noindex, nofollow" />
        <title>Step 1 of 6 | Become a Patient</title>
      </Helmet>
      <div className="book-appointment-container">
        {/* Banner */}
        <div className="banner">
          <div className="banner-overlay"></div>
          <div className="banner-text">
            <h1>Book Telemedicine Consultation</h1>
          </div>
        </div>

        {/* Content */}
        <div className="content-section">
          <h2>Start Your Wellness Journey Today</h2>
          <div className="paper-container">
            {/* Progress */}
            <div className="progress">
              <div className="progress-info">
                <p>Step 1 of 6</p>
              </div>
              <div className="progress-bar-background">
                <div className="progress-bar-fill"></div>
              </div>
            </div>

            {/* Form */}
            <form className="intake-form" onSubmit={handleSubmit(onSubmit)}>
              {/* Name */}
              <div className="form-group">
                <label>
                  Name{" "}
                  <span className={getRequiredClass(values.firstName, errors.firstName)}>
                    (Required)
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="First"
                  {...register("firstName", { required: "Please complete the following field: First." })}
                />
                {errors.firstName && <p className="error-message">{errors.firstName.message}</p>}
                <input
                  type="text"
                  placeholder="Last"
                  {...register("lastName", { required: "Please complete the following field: Last." })}
                />
                {errors.lastName && <p className="error-message">{errors.lastName.message}</p>}
              </div>

              {/* Email */}
              <div className="form-group">
                <label>
                  Email{" "}
                  <span className={getRequiredClass(values.email, errors.email)}>(Required)</span>
                </label>
                <input
                  type="email"
                  placeholder="email@example.com"
                  {...register("email", { required: "This field is required." })}
                />
                {errors.email && <p className="error-message">{errors.email.message}</p>}
              </div>

              {/* Phone */}
              <div className="form-group">
                <label>
                  Phone{" "}
                  <span className={getRequiredClass(values.phone, errors.phone)}>(Required)</span>
                </label>
              <input
                type="tel"
                placeholder="(555) 555-5555"
                {...register("phone", {
                  required: "This field is required.",
                  pattern: {
                    value: /^\(\d{3}\)\s\d{3}-\d{4}$/,
                    message: "Phone format: (###) ###-####",
                  },
                })}
                onChange={(e) => {
                  const formatted = formatPhoneNumber(e.target.value);
                  setValue("phone", formatted, { shouldValidate: true });
                }}
                value={values.phone}
              />


                {errors.phone && <p className="error-message">{errors.phone.message}</p>}
              </div>

              {/* Gender */}
              <div className="form-group">
                <label>
                  Gender{" "}
                  <span className={getRequiredClass(values.gender, errors.gender)}>(Required)</span>
                </label>
                <select {...register("gender", { required: "This field is required." })}>
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                  <option value="prefer-not-to-say">Prefer not to say</option>
                </select>
                {errors.gender && <p className="error-message">{errors.gender.message}</p>}
              </div>

              {/* DOB */}
              <div className="form-group">
                <label>
                  Date of Birth{" "}
                  <span
                    className={getRequiredClass(
                      values.dobMonth && values.dobDay && values.dobYear,
                      errors.dobMonth || errors.dobDay || errors.dobYear
                    )}
                  >
                    (Required)
                  </span>
                </label>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <select {...register("dobMonth", { required: "Month is required." })}>
                    <option value="">MM</option>
                    {[...Array(12)].map((_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {String(i + 1).padStart(2, "0")}
                      </option>
                    ))}
                  </select>
                  <select {...register("dobDay", { required: "Day is required." })}>
                    <option value="">DD</option>
                    {[...Array(31)].map((_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {String(i + 1).padStart(2, "0")}
                      </option>
                    ))}
                  </select>
  <select {...register("dobYear", { required: "Year is required." })}>
    <option value="">YYYY</option>
    {Array.from({ length: 100 }, (_, i) => {
      const currentYear = new Date().getFullYear();
      const year = currentYear - 18 - i;
      return (
        <option key={year} value={year}>
          {year}
        </option>
      );
    })}
  </select>

                </div>
              </div>

              {/* Driver’s License */}
              <div className="form-group">
                <label>
                  Driver’s License #{" "}
                  <span
                    className={getRequiredClass(values.driversLicense, errors.driversLicense)}
                  >
                    (Required)
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="E.g. A1234567"
                  {...register("driversLicense", { required: "This field is required." })}
                />
                {errors.driversLicense && (
                  <p className="error-message">{errors.driversLicense.message}</p>
                )}
              </div>

              {/* Address */}
              <div className="form-group">
                <label>
                  Street Address{" "}
                  <span
                    className={getRequiredClass(values.streetAddress, errors.streetAddress)}
                  >
                    (Required)
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="1234 Elm Street"
                  {...register("streetAddress", { required: "This field is required." })}
                />
                {errors.streetAddress && (
                  <p className="error-message">{errors.streetAddress.message}</p>
                )}
              </div>

              {/* City */}
              <div className="form-group">
                <label>
                  City{" "}
                  <span className={getRequiredClass(values.city, errors.city)}>(Required)</span>
                </label>
                <input
                  type="text"
                  placeholder="City"
                  {...register("city", { required: "This field is required." })}
                />
                {errors.city && <p className="error-message">{errors.city.message}</p>}
              </div>

              {/* Zip */}
              <div className="form-group">
                <label>
                  Zip Code{" "}
                  <span className={getRequiredClass(values.zipCode, errors.zipCode)}>(Required)</span>
                </label>
                <input
                  type="text"
                  placeholder="12345"
                  {...register("zipCode", { required: "This field is required." })}
                />
                {errors.zipCode && <p className="error-message">{errors.zipCode.message}</p>}
              </div>

              {/* State */}
              <div className="form-group">
                <label>
                  State{" "}
                  <span className={getRequiredClass(values.state, errors.state)}>(Required)</span>
                </label>
                <select {...register("state", { required: "This field is required." })}>
                  <option value="">Select a state</option>
                  <option value="CA">California</option>
                  <option value="NY">New York</option>
                </select>
                {errors.state && <p className="error-message">{errors.state.message}</p>}
              </div>

              {/* Occupation */}
              <div className="form-group">
                <label>
                  What is your occupation?{" "}
                  <span
                    className={getRequiredClass(values.occupation, errors.occupation)}
                  >
                    (Required)
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="Occupation"
                  {...register("occupation", { required: "This field is required." })}
                />
                {errors.occupation && (
                  <p className="error-message">{errors.occupation.message}</p>
                )}
              </div>

              {/* Hours of Sleep */}
              <div className="form-group">
                <label>
                  How many hours a night do you sleep?{" "}
                  <span
                    className={getRequiredClass(values.hoursOfSleep, errors.hoursOfSleep)}
                  >
                    (Required)
                  </span>
                </label>
                <select {...register("hoursOfSleep", { required: "This field is required." })}>
                  <option value="">Select</option>
                  <option value="1">1 or less</option>
                  <option value="2-3">2-3</option>
                  <option value="4-5">4-5</option>
                  <option value="6-7">6-7</option>
                  <option value="8+">8+</option>
                </select>
                {errors.hoursOfSleep && (
                  <p className="error-message">{errors.hoursOfSleep.message}</p>
                )}
              </div>

              {/* Health Goals */}
              <div className="form-group">
                <label>
                  Please write a quick summary of your overall health goals:{" "}
                  <span
                    className={getRequiredClass(values.healthGoals, errors.healthGoals)}
                  >
                    (Required)
                  </span>
                </label>
                <textarea
                  placeholder="0 of 500 max characters"
                  maxLength={500}
                  {...register("healthGoals", { required: "This field is required." })}
                />
                {errors.healthGoals && (
                  <p className="error-message">{errors.healthGoals.message}</p>
                )}
              </div>

              {/* Current Medications */}
              <div className="form-group">
                <label>
                  Please list any current medications you are taking:{" "}
                  <span
                    className={getRequiredClass(values.currentMedications, errors.currentMedications)}
                  >
                    (Required)
                  </span>
                </label>
                <textarea
                  placeholder="0 of 500 max characters"
                  maxLength={500}
                  {...register("currentMedications", {
                    required: "This field is required.",
                  })}
                />
                {errors.currentMedications && (
                  <p className="error-message">{errors.currentMedications.message}</p>
                )}
              </div>

              {/* Marital Status */}
              <div className="form-group">
                <label>
                  Marital Status{" "}
                  <span
                    className={getRequiredClass(values.maritalStatus, errors.maritalStatus)}
                  >
                    (Required)
                  </span>
                </label>
                <select {...register("maritalStatus", { required: "This field is required." })}>
                  <option value="">Select</option>
                  <option value="single">Single</option>
                  <option value="married">Married</option>
                  <option value="divorced">Divorced</option>
                  <option value="widowed">Widowed</option>
                </select>
                {errors.maritalStatus && (
                  <p className="error-message">{errors.maritalStatus.message}</p>
                )}
              </div>

              {/* Children Yes/No */}
              <div className="form-group">
                <label>
                  Do you have children?{" "}
                  <span
                    className={getRequiredClass(values.hasChildren, errors.hasChildren)}
                  >
                    (Required)
                  </span>
                </label>
                <div style={{ display: "flex", gap: "1rem", marginTop: "0.5rem" }}>
                  <label>
                    <input
                      type="radio"
                      value="yes"
                      {...register("hasChildren", { required: "This field is required." })}
                    />{" "}
                    Yes
                  </label>
                  <label>
                    <input
                      type="radio"
                      value="no"
                      {...register("hasChildren", { required: "This field is required." })}
                    />{" "}
                    No
                  </label>
                </div>
                {errors.hasChildren && (
                  <p className="error-message">{errors.hasChildren.message}</p>
                )}
              </div>

              {/* Number of Children - only if “Yes” */}
              {values.hasChildren === "yes" && (
                <div className="form-group">
                  <label>
                    Number of Children{" "}
                    <span
                      className={getRequiredClass(
                        values.childrenCount,
                        errors.childrenCount
                      )}
                    >
                      (Required)
                    </span>
                  </label>
                  <input
                    type="number"
                    min="1"
                    placeholder="e.g. 2"
                    {...register("childrenCount", {
                      required: "Please enter number of children.",
                      min: { value: 1, message: "Must be at least 1." },
                    })}
                  />
                  {errors.childrenCount && (
                    <p className="error-message">{errors.childrenCount.message}</p>
                  )}
                </div>
              )}
              <div className="form-navigation button-row">

                <button type="submit" className="submit-btn">
                  Next Step
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookAppointmentPage;
