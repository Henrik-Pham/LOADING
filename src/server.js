const express = require('express');
const app = express();
const port = 3001;
const cors = require('cors');

app.use(cors());
app.use(express.json());

app.post('/start', (req, res) => {
    // Handle the start action
    console.log('Start action received:', req.body);
    res.json({ message: 'Start action received' });
});

app.post('/next', (req, res) => {
    // Handle the next action
    console.log('Next action received:', req.body);
    res.json({ message: 'Next action received' });
});

app.post('/stop', (req, res) => {
    // Handle the stop action
    console.log('Stop action received:', req.body);
    res.json({ message: 'Stop action received' });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
