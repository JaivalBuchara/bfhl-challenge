const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON requests
app.use(express.json());

// GET endpoint
app.get('/', (req, res) => {
    res.json({ operation_code: '12345' });
});

// POST endpoint
app.post('/', (req, res) => {
    const { data, user_id, email, roll_number } = req.body;

    if (!data || !Array.isArray(data)) {
        return res.status(400).json({ is_success: false, message: 'Data array is missing or not an array' });
    }
    if (!user_id) {
        return res.status(400).json({ is_success: false, message: 'User ID is missing' });
    }
    if (!email) {
        return res.status(400).json({ is_success: false, message: 'Email is missing' });
    }
    if (!roll_number) {
        return res.status(400).json({ is_success: false, message: 'Roll Number is missing' });
    }

    const numbers = data.filter(item => !isNaN(item));
    const alphabets = data.filter(item => isNaN(item));

    const highestLowercaseAlphabet = alphabets
        .filter(item => item === item.toLowerCase())
        .sort()
        .pop() || '';

    res.json({
        is_success: true,
        user_id,
        email,
        roll_number,
        numbers,
        alphabets,
        highest_lowercase_alphabet: highestLowercaseAlphabet ? [highestLowercaseAlphabet] : []
    });
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
