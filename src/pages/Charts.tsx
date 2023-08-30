import React from 'react';
import CovidStats from '../components/CovidStats';

const Charts = () => {
    return (
        <div className='custom-margin flex flex-col items-center min-h-screen justify-center'>
            <CovidStats></CovidStats>
        </div>
    );
};

export default Charts;