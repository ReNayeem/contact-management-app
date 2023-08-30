import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CartesianGrid, Tooltip, Legend, Line, LineChart, XAxis, YAxis, AreaChart, Area, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, BarChart, Bar } from 'recharts';

interface CountryStats {
    country: string;
    cases: number;
    deaths: number;
    recovered: number;
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
        </div>
    );
}

export default CovidStats;
