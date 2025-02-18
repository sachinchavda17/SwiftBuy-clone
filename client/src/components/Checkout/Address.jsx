import React from "react";
import { useForm } from "react-hook-form";
import "./Address.scss";

const Address = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmitAddress = (data) => {
    console.log(data); // Handle address form submission logic here
    reset(); // Reset form after submission
  };

  return (
    <form
      className="address-form"
      noValidate
      onSubmit={handleSubmit(onSubmitAddress)}
    >
      <div className="address-content">
        <div className="address-handle">
          <h2 className="header-title">Personal Information</h2>
          <p className="header-subtitle">
            Use a permanent address where you can receive mail.
          </p>

          <div className="input-grid">
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <div className="input-container">
                <input
                  id="email"
                  {...register("email", { required: "email is required" })}
                  type="email"
                />
                {errors.email && (
                  <span className="error-message">{errors.email.message}</span>
                )}
              </div>
            </div>
            <div className="input-group">
              <label htmlFor="email">Phone</label>
              <div className="input-container">
                <input
                  id="phone"
                  {...register("phone", {
                    required: "Phone number is required",
                  })}
                  type="tel"
                />
                {errors.phone && (
                  <span className="error-message">{errors.phone.message}</span>
                )}
              </div>
            </div>
          </div>
          <div className="input-grid">
            <div className="input-group">
              <label htmlFor="street-address">Street address</label>
              <div className="input-container">
                <input
                  id="street"
                  {...register("street", { required: "street is required" })}
                  type="text"
                />
                {errors.street && (
                  <p className="error-message">{errors.street.message}</p>
                )}
              </div>
            </div>
            <div className="input-group">
              <label htmlFor="city">City</label>
              <div className="input-container">
                <input
                  {...register("city", { required: "city is required" })}
                  id="city"
                  autoComplete="address-level2"
                  type="text"
                />
                {errors.city && (
                  <p className="error-message">{errors.city.message}</p>
                )}
              </div>
            </div>
            <div className="input-group">
              <label htmlFor="state"> State / Province</label>
              <div className="input-container">
                <input
                  {...register("state", { required: "state is required" })}
                  id="state"
                  autoComplete="address-level1"
                  type="text"
                />
                {errors.state && (
                  <p className="error-message">{errors.state.message}</p>
                )}
              </div>
            </div>
            <div className="input-group">
              <label htmlFor="pincode"> ZIP / Postal code</label>
              <div className="input-container">
                <input
                  {...register("pincode", { required: "pincode is required" })}
                  id="pincode"
                  type="text"
                />
                {errors.pincode && (
                  <p className="error-message">{errors.pincode.message}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button
            onClick={() => reset()}
            type="button"
            className="reset-button"
          >
            Reset
          </button>
          <button type="submit" className="submit-button">
            Add Address
          </button>
        </div>
      </div>
    </form>
  );
};

export default Address;
