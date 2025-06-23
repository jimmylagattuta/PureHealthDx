import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "./AminoAsylumLandingPage.css";

export default function AminoAsylumLandingPage() {
  const demoMode = false;
  const navigate = useNavigate();

  const stored = localStorage.getItem("appointmentFormData");
  const defaults = stored
    ? JSON.parse(stored)
    : demoMode
    ? {
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        phone: "(555) 555-5555",
        gender: "male",
        dobMonth: "01",
        dobDay: "01",
        dobYear: "1980",
        driversLicense: "D1234567",
        streetAddress: "1234 Elm Street",
        city: "Springfield",
        zipCode: "12345",
        state: "California",
      }
    : {};

  const {
    register,
    handleSubmit,
    trigger,
    watch,
    formState: { errors },
  } = useForm({ mode: "onChange", defaultValues: defaults });

  useEffect(() => {
    trigger();
  }, [trigger]);

  const vals = watch();
  const reqClass = (v, e) => (!v || e ? "aa-required error" : "aa-required valid");

  const onSubmit = (data) => {
    localStorage.setItem("appointmentFormData", JSON.stringify(data));
    navigate("/amino-asylum-page-2");
  };

  return (
    <div className="aa-container">
      <div className="aa-content">
        {/* Error banner example, if you need it */}
        {/* <div className="aa-error-alert">Please review the fields below.</div> */}

        <h1 className="aa-page-title">
          Book TeleMedicine Consultation – AminoAsylum
        </h1>

        <div className="aa-paper">
          <div className="aa-progress">
            <div className="aa-progress-info">
              <p>Step 1 of 6</p>
            </div>
            <div className="aa-progress-bg">
              <div className="aa-progress-fill"></div>
            </div>
          </div>

          <form className="aa-form" onSubmit={handleSubmit(onSubmit)}>
            {/* Name */}
            <div className="aa-form-group aa-form-group--two">
              <div>
                <label>
                  First Name
                  <span className={reqClass(vals.firstName, errors.firstName)}>
                    (Required)
                  </span>
                </label>
                <input
                  className="aa-input"
                  type="text"
                  {...register("firstName", { required: true })}
                />
                {errors.firstName && (
                  <p className="aa-error-message">First name is required.</p>
                )}
              </div>
              <div>
                <label>
                  Last Name
                  <span className={reqClass(vals.lastName, errors.lastName)}>
                    (Required)
                  </span>
                </label>
                <input
                  className="aa-input"
                  type="text"
                  {...register("lastName", { required: true })}
                />
                {errors.lastName && (
                  <p className="aa-error-message">Last name is required.</p>
                )}
              </div>
            </div>

            {/* Email & Phone */}
            <div className="aa-form-group aa-form-group--two">
              <div>
                <label>
                  Email
                  <span className={reqClass(vals.email, errors.email)}>
                    (Required)
                  </span>
                </label>
                <input
                  className="aa-input"
                  type="email"
                  {...register("email", { required: true })}
                />
                {errors.email && (
                  <p className="aa-error-message">Email is required.</p>
                )}
              </div>
              <div>
                <label>
                  Phone
                  <span className={reqClass(vals.phone, errors.phone)}>
                    (Required)
                  </span>
                </label>
                <input
                  className="aa-input"
                  type="tel"
                  {...register("phone", {
                    required: true,
                    pattern: /^\(\d{3}\) \d{3}-\d{4}$/,
                  })}
                />
                {errors.phone && (
                  <p className="aa-error-message">Valid phone is required.</p>
                )}
              </div>
            </div>

            {/* Gender & DOB */}
            <div className="aa-form-group aa-form-group--two">
              <div>
                <label>
                  Gender
                  <span className={reqClass(vals.gender, errors.gender)}>
                    (Required)
                  </span>
                </label>
                <select
                  className="aa-select"
                  {...register("gender", { required: true })}
                >
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                  <option value="prefer-not-to-say">Prefer not to say</option>
                </select>
                {errors.gender && (
                  <p className="aa-error-message">Gender is required.</p>
                )}
              </div>
              <div>
                <label>
                  Date of Birth
                  <span
                    className={
                      reqClass(
                        vals.dobMonth && vals.dobDay && vals.dobYear,
                        errors.dobMonth || errors.dobDay || errors.dobYear
                      )
                    }
                  >
                    (Required)
                  </span>
                </label>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <select
                    className="aa-select"
                    {...register("dobMonth", { required: true })}
                  >
                    <option value="">MM</option>
                    {[...Array(12)].map((_, i) => (
                      <option key={i} value={String(i + 1).padStart(2, "0")}>{
                        String(i + 1).padStart(2, "0")
                      }</option>
                    ))}
                  </select>
                  <select
                    className="aa-select"
                    {...register("dobDay", { required: true })}
                  >
                    <option value="">DD</option>
                    {[...Array(31)].map((_, i) => (
                      <option key={i} value={String(i + 1).padStart(2, "0")}>{
                        String(i + 1).padStart(2, "0")
                      }</option>
                    ))}
                  </select>
                  <select
                    className="aa-select"
                    {...register("dobYear", { required: true })}
                  >
                    <option value="">YYYY</option>
                    {Array.from({ length: 100 }, (_, k) => 2025 - k).map((yr) => (
                      <option key={yr} value={yr}>{yr}</option>
                    ))}
                  </select>
                </div>
                {(errors.dobMonth || errors.dobDay || errors.dobYear) && (
                  <p className="aa-error-message">
                    Month, Day, and Year are required.
                  </p>
                )}
              </div>
            </div>

            {/* Driver's License */}
            <div className="aa-form-group">
              <label>
                Driver’s License #
                <span
                  className={reqClass(vals.driversLicense, errors.driversLicense)}
                >
                  (Required)
                </span>
              </label>
              <input
                className="aa-input"
                type="text"
                {...register("driversLicense", { required: true })}
              />
              {errors.driversLicense && (
                <p className="aa-error-message">License number is required.</p>
              )}
            </div>

            {/* Address */}
            <div className="aa-form-group aa-form-group--two">
              <div>
                <label>
                  Street Address
                  <span
                    className={reqClass(vals.streetAddress, errors.streetAddress)}
                  >
                    (Required)
                  </span>
                </label>
                <input
                  className="aa-input"
                  type="text"
                  {...register("streetAddress", { required: true })}
                />
                {errors.streetAddress && (
                  <p className="aa-error-message">Street address is required.</p>
                )}
              </div>
              <div>
                <label>
                  City
                  <span className={reqClass(vals.city, errors.city)}>
                    (Required)
                  </span>
                </label>
                <input
                  className="aa-input"
                  type="text"
                  {...register("city", { required: true })}
                />
                {errors.city && (
                  <p className="aa-error-message">City is required.</p>
                )}
              </div>
            </div>

            {/* Zip & State */}
            <div className="aa-form-group aa-form-group--two">
              <div>
                <label>
                  Zip Code
                  <span className={reqClass(vals.zipCode, errors.zipCode)}>
                    (Required)
                  </span>
                </label>
                <input
                  className="aa-input"
                  type="text"
                  {...register("zipCode", { required: true })}
                />
                {errors.zipCode && (
                  <p className="aa-error-message">Zip code is required.</p>
                )}
              </div>
              <div>
                <label>
                  State
                  <span className={reqClass(vals.state, errors.state)}>
                    (Required)
                  </span>
                </label>
                <select
                  className="aa-select"
                  {...register("state", { required: true })}
                >
                  <option value="">Select a state</option>
                  <option value="California">California</option>
                  <option value="New York">New York</option>
                </select>
                {errors.state && (
                  <p className="aa-error-message">State is required.</p>
                )}
              </div>
            </div>

            <button type="submit" className="aa-submit-btn">
              Next
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}