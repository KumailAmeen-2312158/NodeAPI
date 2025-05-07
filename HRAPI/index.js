const express = require('express');
const cors = require('cors');
const pool = require('./db');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', async (req, res) => {
    try {
        res.json('Welcom to HR API')
    }
    catch (err) {
        res.status(500).json({ Error: err.message })
    }
});
app.get('/employee', async(req, res) => {
    try {
        const result = await pool.query('select * from employees');
        res.json(result.rows);
    }
    catch (err) {
    
        res.status(500).json({ Error: err.message })
    }

});
app.get('/seeallemp', async(req, res) => {
    try {
        const result = await pool.query('select count(employee_id) from employees');
        res.json(result.rows);
    }
    catch (err) {
    
        res.status(500).json({ Error: err.message })
    }

});

app.get('/seeallcon', async(req, res) => {
    try {
        const result = await pool.query('select count(country_id) from countries');
        res.json(result.rows);
    }
    catch (err) {
    
        res.status(500).json({ Error: err.message })
    }

});
app.get('/seealldep', async(req, res) => {
    try {
        const result = await pool.query('select count(department_id) from departments');
        res.json(result.rows);
    }
    catch (err) {
    
        res.status(500).json({ Error: err.message })
    }

});
app.get('/seealljob', async(req, res) => {
    try {
        const result = await pool.query('select count(job_id) from jobs');
        res.json(result.rows);
    }
    catch (err) {
    
        res.status(500).json({ Error: err.message })
    }

});
app.get('/loc', async(req, res) => {
    try {
        const result = await pool.query('select count(location_id) from locations');
        res.json(result.rows);
    }
    catch (err) {
    
        res.status(500).json({ Error: err.message })
    }

});
app.get('/country', async(req, res) => {
    try {
        const result = await pool.query('select * from countries');
        res.json(result.rows);
    }
    catch (err) {
    
        res.status(500).json({ Error: err.message })
    }

});


const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Connected Succesfully on PORT ${PORT}`)
})