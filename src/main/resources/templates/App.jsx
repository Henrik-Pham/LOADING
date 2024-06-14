import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./styles.css";
import MainPage from "./MainPage";
import Admin from "./Admin";
import InstructionsPage from './InstructionsPage';
import BigScreen from "./BigScreen.jsx";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/instruction" element={<InstructionsPage />} />
                <Route path="/bigscreen" element={<BigScreen />} />
            </Routes>
        </Router>
    );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

export default App;
