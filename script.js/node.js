const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// To parse form data
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/submit-valuation', (req, res) => {
    const { name, email, phone, propertyType, location, details } = req.body;

    // Validate the data
    if (!name || !email || !phone || !propertyType || !location) {
        return res.json({ success: false, message: 'Please fill in all required fields.' });
    }

    // Here you'd usually save the data to a database or send an email
    console.log('Form data:', req.body);

    // Send success response
    res.json({ success: true, message: 'Valuation request submitted!' });
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});


