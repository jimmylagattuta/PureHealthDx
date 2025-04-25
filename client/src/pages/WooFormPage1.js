import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "./WooFormPage.css";

export default function WooFormPage1() {
  const navigate = useNavigate();
  const stored = localStorage.getItem("wooFormData");
  const defaultValues = stored ? JSON.parse(stored) : {};

  const {
    register,
    handleSubmit,
    trigger,
    watch,
    formState: { errors },
  } = useForm({ mode: "onChange", defaultValues });

  useEffect(() => {
    trigger();
  }, [trigger]);

  const values = watch();
  const reqClass = (value, error) => (!value || error ? "wc-required error" : "wc-required valid");

  const onSubmit = (data) => {
    localStorage.setItem("wooFormData", JSON.stringify(data));
    navigate("/woo-form-page-2");
  };

  return (
    <div className="wc-container">
      <div className="wc-content">
        <h1 className="wc-title">Telemedicine Consultation Forms (Woocommerce)</h1>
        <div className="wc-paper">
          <div className="wc-progress">
            <div className="wc-progress-info">
              <p>Step 1 of 6</p>
            </div>
            <div className="wc-progress-bg">
              <div className="wc-progress-fill" />
            </div>
          </div>

          <form className="wc-form" onSubmit={handleSubmit(onSubmit)}>
            {/* Name */}
            <div className="wc-group wc-group--two">
              <label>
                Name <span className={reqClass(values.firstName, errors.firstName)}> (Required)</span>
              </label>
              <input
                className="wc-input"
                placeholder="First"
                {...register("firstName", { required: true })}
              />
              <input
                className="wc-input"
                placeholder="Last"
                {...register("lastName", { required: true })}
              />
              {(errors.firstName || errors.lastName) && (
                <p className="wc-error-message">First and Last are required.</p>
              )}
            </div>

            {/* Email & Phone */}
            <div className="wc-group wc-group--two">
              <label>
                Email <span className={reqClass(values.email, errors.email)}> (Required)</span>
              </label>
              <input
                className="wc-input"
                type="email"
                placeholder="email@example.com"
                {...register("email", { required: true, pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: true } })}
              />

              <label>
                Phone <span className={reqClass(values.phone, errors.phone)}> (Required)</span>
              </label>
              <input
                className="wc-input"
                type="tel"
                placeholder="(123) 456-7890 or 1234567890"
                {...register("phone", {
                  required: true,
                  pattern: {
                    value: /^(?:\(\d{3}\)\s?\d{3}-?\d{4}|\d{10})$/,
                    message: true,
                  },
                })}
              />
              {errors.email && <p className="wc-error-message">Valid Email required.</p>}
              {errors.phone && <p className="wc-error-message">Valid Phone required.</p>}
            </div>

            {/* Gender & DOB */}
            <div className="wc-group wc-group--two">
              <label>
                Gender <span className={reqClass(values.gender, errors.gender)}> (Required)</span>
              </label>
              <select
                className="wc-select"
                {...register("gender", { required: true })}
              >
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>

              <label>
                Date of Birth <span className={reqClass(
                  values.dobMonth && values.dobDay && values.dobYear,
                  errors.dobMonth || errors.dobDay || errors.dobYear
                )}> (Required)</span>
              </label>
              <div className="wc-dob">
                <select
                  className="wc-select"
                  {...register("dobMonth", { required: true })}
                >
                  <option value="">MM</option>
                  {[...Array(12)].map((_, i) => (
                    <option key={i} value={i + 1}>{String(i + 1).padStart(2, '0')}</option>
                  ))}
                </select>
                <select
                  className="wc-select"
                  {...register("dobDay", { required: true })}
                >
                  <option value="">DD</option>
                  {[...Array(31)].map((_, i) => (
                    <option key={i} value={i + 1}>{String(i + 1).padStart(2, '0')}</option>
                  ))}
                </select>
                <select
                  className="wc-select"
                  {...register("dobYear", { required: true })}
                >
                  <option value="">YYYY</option>
                  {Array.from({ length: 100 }, (_, k) => new Date().getFullYear() - k).map((yr) => (
                    <option key={yr} value={yr}>{yr}</option>
                  ))}
                </select>
              </div>
              {(errors.dobMonth || errors.dobDay || errors.dobYear) && (
                <p className="wc-error-message">Month, Day, and Year required.</p>
              )}
            </div>

            {/* License */}
            <div className="wc-group">
              <label>
                Drivers License # <span className={reqClass(values.driversLicense, errors.driversLicense)}> (Required)</span>
              </label>
              <input
                className="wc-input"
                placeholder="E.g. D1234567"
                {...register("driversLicense", { required: true })}
              />
              {errors.driversLicense && <p className="wc-error-message">Required.</p>}
            </div>

            {/* Address */}
            <div className="wc-group wc-group--two">
              <div>
                <label>
                  Street Address <span className={reqClass(values.streetAddress, errors.streetAddress)}> (Required)</span>
                </label>
                <input
                  className="wc-input"
                  placeholder="1234 Elm St"
                  {...register("streetAddress", { required: true })}
                />
                {errors.streetAddress && <p className="wc-error-message">Required.</p>}
              </div>
              <div>
                <label>
                  City <span className={reqClass(values.city, errors.city)}> (Required)</span>
                </label>
                <input
                  className="wc-input"
                  placeholder="City"
                  {...register("city", { required: true })}
                />
                {errors.city && <p className="wc-error-message">Required.</p>}
              </div>
            </div>

            {/* Zip & State */}
            <div className="wc-group wc-group--two">
              <div>
                <label>
                  Zip Code <span className={reqClass(values.zipCode, errors.zipCode)}> (Required)</span>
                </label>
                <input
                  className="wc-input"
                  placeholder="12345"
                  {...register("zipCode", { required: true })}
                />
                {errors.zipCode && <p className="wc-error-message">Required.</p>}
              </div>
              <div>
                <label>
                  State <span className={reqClass(values.state, errors.state)}> (Required)</span>
                </label>
                <select
                  className="wc-select"
                  {...register("state", { required: true })}
                >
                  <option value="">Select a state</option>
                  <option value="CA">California</option>
                  <option value="NY">New York</option>
                  {/* add others */}
                </select>
                {errors.state && <p className="wc-error-message">Required.</p>}
              </div>
            </div>

            <button type="submit" className="wc-button">Next</button>
          </form>
        </div>
      </div>
    </div>
  );
}

