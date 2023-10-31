const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

let users = []; // Dummy database

app.post('/register', (req, res) => {
    const { username, email, password, role } = req.body;
    if (users.find(user => user.username === username)) {
        return res.status(400).json({ message: 'Username already exists' });
    }
    users.push({ username, email, password, role });
    res.status(200).json({ message: 'User registered successfully' });
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(user => user.username === username && user.password === password);
    if (!user) {
        return res.status(400).json({ message: 'Invalid username or password' });
    }
    res.status(200).json({ message: 'Logged in successfully' });
});

app.get('/:email', (req, res) => {
    const email = req.params.email;
    const user = users.find(user => user.email === email);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});