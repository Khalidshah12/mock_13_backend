const express = require('express');
const { connection } = require('./config/db');
const { usersRouter } = require('./routes/user.route');
const app = express();
const cors = require('cors');
const { authentication } = require('./middlewares/authentication');
const { jobsRouter } = require('./routes/jobs.route');

app.use(express.json());

app.use(cors({
    origin: "*"
}));

app.get('/', (req, res) => {
    res.send('Welcome to Home');
});

app.use('/users', usersRouter);
app.use('/jobs', jobsRouter);


app.listen(8080, async () => {
    try {
        await connection;
        console.log({ msg: 'Connected to DB Successfully' });
    }
    catch (e) {
        console.log({ Error: 'Error while connecting to DB' });
    }
    console.log(`Server running on http://localhost:8080`)
});
