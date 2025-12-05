// 1. Import express
const express = require('express');

// 2. Import CORS to handle cross-origin requests
const cors = require('cors');

// 3. Create an Express app
const app = express();

// 4. Middleware to handle CORS
app.use(cors()); // This automatically sets headers like Access-Control-Allow-Origin, etc.

// 5. Middleware to parse incoming JSON data
app.use(express.json()); // This replaces the manual StringDecoder logic

// 6. Define POST route for saving form data
app.post('/save-form', (req, res) => {
    try {
        const data = req.body; // JSON data from client is automatically parsed
        console.log(data);

        res.status(200).json({ success: true, data });
    } catch (err) {
        res.status(400).json({ success: false, message: "invalid:json" });
    }
});

// 7. Catch-all route for other endpoints
app.all('*', (req, res) => {
    res.status(404).json({ success: false, message: "invalid endpoint" });
});

// 8. Start the server
app.listen(4000, () => {
    console.log('Server is running on http://localhost:4000');
});
