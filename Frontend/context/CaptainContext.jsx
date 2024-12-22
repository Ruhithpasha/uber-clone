import { createContext, useContext, useState } from 'react';

export const CaptainDataContext = createContext();

export const CaptainContext = ({ children }) => {
    const [captain, setCaptain] = useState(null);
    const [isOnline, setIsOnline] = useState(false);
    const [currentLocation, setCurrentLocation] = useState(null);
    const [activeRide, setActiveRide] = useState(null);

    const updateCaptainStatus = (status) => {
        setIsOnline(status);
    };

    const updateLocation = (location) => {
        setCurrentLocation(location);
    };

    const updateActiveRide = (ride) => {
        setActiveRide(ride);
    };

    const value = {
        captain,
        setCaptain,
        isOnline,
        updateCaptainStatus,
        currentLocation,
        updateLocation,
        activeRide,
        updateActiveRide,
    };

    return (
        <CaptainDataContext.Provider value={value}>
            {children}
        </CaptainDataContext.Provider>
    );
};

export default CaptainContext;