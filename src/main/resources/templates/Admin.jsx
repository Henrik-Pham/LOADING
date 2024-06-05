import React from 'react';
import { useNavigate } from "react-router-dom";

function Admin() {
    const navigate = useNavigate();
    const host = window.location.hostname;
    console.log(host);

    const handleStart = () => {
       /* fetch('http://localhost:8080/api/admin/start', {
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

        */
        fetch(`http://${host}:8080/start`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ action: 'start' }),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Start action successful:', data);
                //navigate('/'); // Redirect to the main page
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    const handleNext = () => {
        fetch('http://localhost:8080/api/admin/next', {
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
        fetch('http://localhost:8080/api/admin/stop', {
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

    return (
        <div className="admin-container">
            <button onClick={handleStart}>Start</button>
            <button onClick={handleNext}>Next</button>
            <button onClick={handleStop}>Stop</button>
        </div>
    );
}

export default Admin;
