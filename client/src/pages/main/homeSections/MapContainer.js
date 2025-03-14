import React, { useState, useEffect, useRef } from 'react';
import GoogleMapReact from 'google-map-react';
import './MapContainer.css';

const offices = [
    {
        id: 1,
        city: 'Long Beach',
        state: 'CA',
        addressOne: '1334 Orange Ave',
        addressTwo: 'Long Beach, CA 90813',
        phone: '323-333-3471',
        image: 'https://i.imgur.com/mB6Lo8H.webp',
        coordinates: { lat: 33.7832383, lng: -118.1762315 },
        hours: '8 AM - 5 PM'
    },
    {
        id: 2,
        city: 'Griffin',
        state: 'GA',
        addressOne: '1640 Williamson Rd',
        addressTwo: 'Griffin, GA 30224',
        phone: '323-333-3471',
        image: 'https://i.imgur.com/WoTdzUQ.webp',
        coordinates: { lat: 33.22425842285156, lng: -84.3002700805664 },
        hours: '8 AM - 5 PM'
    }
];

const Marker = ({ office, onClick }) => (
    <div className="map-marker" onClick={() => onClick(office)}>
        <i className="fas fa-map-marker-alt fa-lg"></i>
    </div>
);

const MapContainer = () => {
    const mapRef = useRef();
    const originalCenter = { lat: 30.5, lng: -100 }; // Original center
    const [center, setCenter] = useState(originalCenter);
    const [zoomLevel, setZoomLevel] = useState(2);
    const [selectedOffice, setSelectedOffice] = useState(null);
    const [isZoomedIn, setIsZoomedIn] = useState(false);

    // const apiKey = process.env.REACT_APP_GOOGLE_MAPS_REACT_KEY;
    const apiKey = 'AIzaSyDhLa6C79MLDb-9auE-xsORAEf61lqemW0';

    const handleOfficeClick = (office) => {
        const screenWidth = window.innerWidth;
        
        if (selectedOffice && selectedOffice.id === office.id && isZoomedIn) {
            // Close the details box if the same office is clicked again
            handleCloseDetails();
        } else {
            // Adjust zoom level and center based on screen width
            if (screenWidth >= 1024) {
                setZoomLevel(18); // Example zoom level for 1024px and above
                setCenter({ lat: office.coordinates.lat, lng: office.coordinates.lng - 0.001 }); // Slight offset for large screens
            } else {
                setZoomLevel(15); // Zoom level for smaller screens
                setCenter({ lat: office.coordinates.lat, lng: office.coordinates.lng - 0.002 }); // Offset lng to shift the map left
            }
            
            setSelectedOffice(office);
            setIsZoomedIn(true);
        }
    };
    

    const handleCloseDetails = () => {
        const screenWidth = window.innerWidth;
    
        // Define screen-specific behaviors based on screen width
        if (screenWidth >= 1024) {
            setZoomLevel(5); // Zoom level for 1024px and above
            setCenter({ lat: 33.5, lng: -100 }); // Adjusted center for 1024px and above
        } else if (screenWidth >= 768) {
            setZoomLevel(3.5); // Zoom level for 768px and above
            setCenter({ lat: 30.5, lng: -100 }); // Adjusted center for 768px and above
        } else if (screenWidth >= 350) {
            setZoomLevel(3.5); // Zoom level for 400px and above
            setCenter({ lat: 30.5, lng: -100 }); // Adjusted center for 400px and above
        } else {
            setZoomLevel(1.5); // Smaller zoom level for screens below 400px
            setCenter(originalCenter); // Original center for smaller screens
        }
    
        setSelectedOffice(null);
        setIsZoomedIn(false);
    };
    
    useEffect(() => {
        const latitudes = offices.map(office => office.coordinates.lat);
        const longitudes = offices.map(office => office.coordinates.lng);
    
        const latMin = Math.min(...latitudes);
        const latMax = Math.max(...latitudes);
        const lngMin = Math.min(...longitudes);
        const lngMax = Math.max(...longitudes);
    
        const midLat = (latMin + latMax) / 2;
        const midLng = (lngMin + lngMax) / 2;
    
        // Check window width and set different zoom/center for larger screens
        if (window.innerWidth >= 1024) {
            setZoomLevel(5); // Zoom level for 1024px and larger screens
            setCenter({ lat: 33.5, lng: -100 }); // Slightly adjust center for larger screens
        } else if (window.innerWidth >= 768) {
            setZoomLevel(3.5);
            setCenter({ lat: midLat, lng: midLng });
        } else if (window.innerWidth >= 400) {
            setZoomLevel(3.5);
            setCenter({ lat: midLat, lng: midLng });
        } else {
            setZoomLevel(1.5);
            setCenter(originalCenter);
        }
    
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setZoomLevel(5); // Zoom level for 1024px and larger screens
                setCenter({ lat: 33.5, lng: -100 });
            } else if (window.innerWidth >= 768) {
                setZoomLevel(3.5);
                setCenter({ lat: midLat, lng: midLng });
            } else if (window.innerWidth >= 350) {
                setZoomLevel(3.5);
                setCenter({ lat: midLat, lng: midLng });
            } else {
                setZoomLevel(1.5);
                setCenter(originalCenter);
            }
        };
    
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    

    return (
        <div className="map-container">
            {selectedOffice && 
                <div className="office-details">
                    <h3>{selectedOffice.city}, {selectedOffice.state}</h3>
                    <div className="address-info">
                        <div>
                            <p>{selectedOffice.addressOne}</p>
                            <p>{selectedOffice.addressTwo}</p>
                        </div>
                        <a
                            href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(selectedOffice.addressOne + ', ' + selectedOffice.city + ', ' + selectedOffice.state)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <i className="fas fa-map-marked-alt"></i>
                        </a>
                    </div>
                    <p>Hours: {selectedOffice.hours || 'N/A'}</p>
                    <div className="phone-info">
                        <p>{selectedOffice.phone}</p>
                        <a href={`tel:${selectedOffice.phone}`}>
                            <i className="fas fa-phone-alt"></i>
                        </a>
                    </div>
                </div>
            }
            <GoogleMapReact
                bootstrapURLKeys={{ key: apiKey }}
                center={center}
                zoom={zoomLevel}
                yesIWantToUseGoogleMapApiInternals
                ref={mapRef}
            >
                {offices.map((office) => (
                    <Marker
                        key={office.id}
                        lat={office.coordinates.lat}
                        lng={office.coordinates.lng}
                        office={office}
                        onClick={handleOfficeClick}
                    />
                ))}
            </GoogleMapReact>

            <div className="office-list">
                {offices.map((office) => (
                    <div
                        className={`office-box ${office.city === 'Griffin' ? 'georgia' : office.city === 'Long Beach' ? 'long-beach' : ''}`}
                        key={office.id}
                        onClick={() => handleOfficeClick(office)}
                    >
                        <p>{office.city}, {office.state}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MapContainer;
