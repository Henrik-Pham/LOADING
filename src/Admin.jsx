// Admin.jsx
import React from 'react';
import { useNavigate } from "react-router-dom";

function Admin() {
    const navigate = useNavigate();

    const handleStart = () => {
        fetch('http://localhost:3001/start', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ action: 'start' }),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Start action successful:', data);
                navigate('/'); // Redirect to the main page
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    const handleNext = () => {
        fetch('http://localhost:3001/next', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ action: 'next' }),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Next action successful:', data);
                navigate('/'); // Redirect to the main page and reload it
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    const handleStop = () => {
        fetch('http://localhost:3001/stop', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ action: 'stop' }),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Stop action successful:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    const handleInstructions = () => {
        navigate('/instructions'); // Redirect to the instructions page
    };

    return (
        <div className="admin-container">
            <button onClick={handleStart}>Start</button>
            <button onClick={handleNext}>Next</button>
            <button onClick={handleStop}>Stop</button>
            <button onClick={handleInstructions}>Instructions</button>
        </div>
    );
}

export default Admin;
