import React from 'react';
import './OfficeCard.css'; // New CSS for OfficeCard

const OfficeCard = ({ offices }) => {
  return (
    <div className="office-card-container">
      {offices.map((office) => (
        <div key={office.id} className="office-card">
          <div className="office-card-image">
            <img src={office.image} alt={office.city} />
          </div>
          <div className="office-card-info">
            <h2>{office.city}</h2>
            <p>{office.addressOne}</p>
            <p>{office.addressTwo}</p>
            <p>{office.phone}</p>
            <p>{office.hours}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OfficeCard;
