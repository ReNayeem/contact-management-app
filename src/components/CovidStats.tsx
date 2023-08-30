import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CartesianGrid, Tooltip, Legend, Line, LineChart, XAxis, YAxis, AreaChart, Area, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, BarChart, Bar } from 'recharts';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import L from 'leaflet';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;

interface CountryStats {
    country: string;
    cases: number;
    deaths: number;
    recovered: number;
    countryInfo: {
        lat: number;
        long: number;
    };
}

function CovidStats() {
    const [countryData, setCountryData] = useState<CountryStats[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://disease.sh/v3/covid-19/countries');
                setCountryData(response.data);
            } catch (error) {
                console.error('Error fetching COVID-19 data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h2>COVID-19 Statistics by Country</h2>

            <LineChart width={730} height={250} data={countryData.slice(0, 6)}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="country" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="cases" stroke="#8884d8" />
                <Line type="monotone" dataKey="deaths" stroke="red" />
                <Line type="monotone" dataKey="recovered" stroke="#82ca9d" />
            </LineChart>
            <MapContainer style={{ height: '500px', width: '100%' }} center={[20, 0]} zoom={5}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {countryData.map((country) => (
                    <Marker
                        key={country.country}
                        position={[country.countryInfo.lat, country.countryInfo.long]}
                    >
                        <Popup>
                            <div>
                                <h3>{country.country}</h3>
                                <p>Total Cases: {country.cases}</p>
                                <p>Total Deaths: {country.deaths}</p>
                                <p>Total Recovered: {country.recovered}</p>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
}

export default CovidStats;
