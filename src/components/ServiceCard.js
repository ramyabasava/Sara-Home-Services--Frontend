import React from 'react';
import { Link } from 'react-router-dom'; // Import Link
import * as BsIcons from 'react-icons/bs';

const iconMap = {
  BsSun: BsIcons.BsSun,
  BsWrench: BsIcons.BsWrench,
  BsLightningFill: BsIcons.BsLightningFill,
  BsBrush: BsIcons.BsBrush,
  BsDisplay: BsIcons.BsDisplay,
  BsCameraVideo: BsIcons.BsCameraVideo,
  BsBoxSeam: BsIcons.BsBoxSeam,
};

// Add serviceId as a prop
const ServiceCard = ({ serviceId, iconName, name, description }) => {
  const IconComponent = iconMap[iconName] || BsIcons.BsQuestionCircle;

  return (
    <div className="service-card">
      <div className="service-icon-wrapper">
        <IconComponent className="service-icon" />
      </div>
      <h3>{name}</h3>
      <p>{description}</p>
      {/* Change the button to a Link */}
      <Link to={`/book/${serviceId}`} className="book-now-btn">
        Book Now
      </Link>
    </div>
  );
};

export default ServiceCard;