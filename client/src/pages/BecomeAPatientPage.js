import React, { useState, useRef } from "react";
import SignatureCanvas from "react-signature-canvas";

const BecomeAPatientPage = () => {
  const [textResponse, setTextResponse] = useState("");
  const [dateResponse, setDateResponse] = useState("");
  const sigCanvas = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const signature = sigCanvas.current
      ? sigCanvas.current.getTrimmedCanvas().toDataURL("image/png")
      : "";
    // Replace this with your submission logic (e.g., POST to your backend)
    console.log("Text Response:", textResponse);
    console.log("Date Response:", dateResponse);
    console.log("Signature Data:", signature);
    alert("Appointment request submitted!");
  };

  const clearSignature = () => {
    if (sigCanvas.current) sigCanvas.current.clear();
  };

  return (
    <div className="become-a-patient-page">
      <h1>Become a Patient</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="question1">
            Please describe your main concern:
          </label>
          <input
            type="text"
            id="question1"
            value={textResponse}
            onChange={(e) => setTextResponse(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="dateQuestion">
            Select your preferred appointment date:
          </label>
          <input
            type="date"
            id="dateQuestion"
            value={dateResponse}
            onChange={(e) => setDateResponse(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Signature:</label>
          <SignatureCanvas
            penColor="black"
            canvasProps={{ width: 500, height: 200, className: "sigCanvas" }}
            ref={sigCanvas}
          />
          <button type="button" onClick={clearSignature}>
            Clear Signature
          </button>
        </div>
        <button type="submit">Submit Appointment Request</button>
      </form>
    </div>
  );
};

export default BecomeAPatientPage;
