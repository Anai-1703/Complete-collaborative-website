import { useState, useEffect } from 'react';
import { CountryDropdown } from 'react-country-region-selector';

export function CountrySelector({ userData, onChange }) {
    const [selectedCountry, setSelectedCountry] = useState('');

        useEffect(() => {
            if (userData) {
            setSelectedCountry(userData.country || '');
            }
        }, [userData]);

        const handleCountryChange = (countryValue) => {
            setSelectedCountry(countryValue);
            onChange(countryValue);
        };
    
        return (
            <CountryDropdown
                value={selectedCountry}
                onChange={handleCountryChange}
            />
        );
    }