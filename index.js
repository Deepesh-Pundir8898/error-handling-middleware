import express from 'express';
import bodyParser from 'body-parser';
import "dotenv/config";

const app = express();
app.use(bodyParser.json());

const errorHandler = (err, req, res, next) => {
    console.error(err.message);
    res.status(400).json({ error: err.message });
};

const validateUser = (req, res, next) => {
    const { firstName, lastName, password, email, phone } = req.body;

    // Validate First Name and Last Name
    if (!/^[A-Z][a-z]*$/.test(firstName)) {
        throw new Error('First name must start with a capital letter and contain only alphabets.');
    }
    if (!/^[A-Z][a-z]*$/.test(lastName)) {
        throw new Error('Last name must start with a capital letter and contain only alphabets.');
    }

    // Validate Password
    if (!/(?=.*[!@#$%^&*])(?=.*[A-Z])(?=.*\d).{8,}/.test(password)) {
        throw new Error('Password must be at least 8 characters long and include one special character, one uppercase letter, and one number.');
    }

    // Validate Email Address
    if (!/^[\w-\.]+@[\w-\.]+\.[a-z]{2,}$/.test(email)) {
        throw new Error('Invalid email address format. It must contain "@".');
    }

    // Validate Phone Number
    if (!/^\d{10,}$/.test(phone)) {
        throw new Error('Phone number must be at least 10 digits long.');
    }

    next();
};

app.post('/register', validateUser, (req, res) => {
    res.status(201).json({ message: 'User registered successfully!' });
});

app.use(errorHandler);

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
