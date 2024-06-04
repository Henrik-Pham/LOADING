// Choice.jsx
import React from 'react';
import './styles.css';

function Choice({ index, selectedChoice, children }) {
    return (
        <div className={`circle-choice choice${index + 1} ${selectedChoice === index ? 'selected' : ''}`}>
            {children}
        </div>
    );
}

export default Choice;
