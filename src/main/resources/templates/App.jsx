import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./styles.css"; // Adjust relative path
import MainPage from "./MainPage"; // Adjust relative path
import Admin from "./Admin"; // Adjust relative path

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/admin" element={<Admin />} />
            </Routes>
        </Router>
    );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

export default App;
