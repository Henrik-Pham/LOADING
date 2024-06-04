// App.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './styles.css';
import MainPage from './MainPage';
import Admin from './Admin';
import InstructionsPage from './InstructionsPage';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/instructions" element={<InstructionsPage />} />
            </Routes>
        </Router>
    );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

export default App;
