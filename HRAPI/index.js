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
app.get('/q50', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT j.*, e.first_name, jj.job_title, c.country_name
            FROM employees e
            INNER JOIN job_history j ON j.employee_id = e.employee_id
            JOIN jobs jj ON jj.job_id = j.job_id
            JOIN departments d ON e.department_id = d.department_id
            JOIN locations l ON l.location_id = d.location_id
            JOIN countries c ON c.country_id = l.country_id
            LIMIT 3;
        `);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/query51', async (req, res) => {
    try {
        const result = await pool.query(`select r.*,c.country_name,l.street_address from regions r join countries c on c.region_id=r.region_id join locations l on l.country_id=c.country_id limit 3;`);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ Error: err.message });
    }
});
app.get('/query52', async (req, res) => {
    try {
        const result = await pool.query(`select r.*,c.country_name,l.street_address from regions r left outer join countries c on c.region_id=r.region_id join locations l on l.country_id=c.country_id limit 3;`);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ Error: err.message });
    }
});

app.get('/query53', async (req, res) => {
    try {
        const result = await pool.query(`select r.*,c.country_name,l.street_address from locations l left outer join countries c on l.country_id=c.country_id join regions r on c.region_id=r.region_id limit 3;`);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ Error: err.message });
    }
});
app.get('/q54', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT d.*, e.first_name, l.street_address
            FROM departments d
            LEFT OUTER JOIN employees e ON d.department_id = e.department_id
            LEFT OUTER JOIN locations l ON d.location_id = l.location_id
            LIMIT 3;
        `);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
app.get('/q55', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT d.*, e.first_name, l.street_address, c.country_name
            FROM departments d
            LEFT OUTER JOIN employees e ON d.department_id = e.department_id
            LEFT OUTER JOIN locations l ON d.location_id = l.location_id
            JOIN countries c ON l.country_id = c.country_id
            LIMIT 3;
        `);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
app.get('/q56', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT e.employee_id, CONCAT(m.first_name, ' ', m.last_name) AS MANAGER_NAME, d.department_name
            FROM employees e
            LEFT OUTER JOIN employees m ON e.employee_id = m.employee_id
            JOIN departments d ON e.department_id = d.department_id
            JOIN locations l ON d.location_id = l.location_id
            LIMIT 3;
        `);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
app.get('/q57', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT e.*, j.job_title, d.department_name, l.city
            FROM employees e
            JOIN jobs j ON e.job_id = j.job_id
            JOIN departments d ON e.department_id = d.department_id
            JOIN locations l ON d.location_id = l.location_id
            LIMIT 3;
        `);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
app.get('/q58', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT e.employee_id, CONCAT(m.first_name, ' ', m.last_name) AS MANAGER_NAME, d.department_name, j.job_title
            FROM employees e
            LEFT OUTER JOIN employees m ON e.employee_id = m.employee_id
            JOIN departments d ON e.department_id = d.department_id
            JOIN jobs j ON j.job_id = e.job_id
            LIMIT 3;
        `);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
app.get('/q59', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT e.employee_id, CONCAT(m.first_name, ' ', m.last_name) AS MANAGER_NAME, d.department_name, l.street_address, j.job_title
            FROM employees e
            LEFT OUTER JOIN employees m ON e.employee_id = m.employee_id
            JOIN departments d ON e.department_id = d.department_id
            JOIN jobs j ON j.job_id = e.job_id
            JOIN locations l ON d.location_id = l.location_id
            LIMIT 3;
        `);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
app.get('/q60', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT country_name
            FROM countries
            WHERE region_id = 1;
        `);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
app.get('/q61', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT d.department_name
            FROM departments d
            JOIN locations l ON d.location_id = l.location_id
            WHERE l.city LIKE 'N%';
        `);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
app.get('/q62', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT e.*
            FROM employees e
            JOIN departments d ON e.department_id = d.department_id
            JOIN employees m ON d.manager_id = m.employee_id
            WHERE m.commission_pct > 0.15
            LIMIT 3;
        `);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
app.get('/q63', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT j.job_title
            FROM employees e
            JOIN jobs j ON e.job_id = j.job_id
            WHERE e.employee_id IN (
                SELECT manager_id FROM departments WHERE manager_id IS NOT NULL
            );
        `);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
app.get('/q64', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT l.postal_code
            FROM locations l
            JOIN countries c ON l.country_id = c.country_id
            JOIN regions r ON c.region_id = r.region_id
            WHERE r.region_name = 'Asia';
        `);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
app.get('/q65', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT DISTINCT d.department_name
            FROM employees e
            JOIN departments d ON e.department_id = d.department_id
            WHERE e.commission_pct < (
                SELECT AVG(commission_pct) FROM employees
            );
        `);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
app.get('/q66', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT e.*, j.job_title
            FROM employees e
            JOIN jobs j ON e.job_id = j.job_id
            WHERE e.salary > (
                SELECT AVG(salary) FROM employees WHERE department_id = e.department_id
            )
            LIMIT 3;
        `);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
app.get('/q67', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT employee_id FROM employees WHERE department_id IS NULL;
        `);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
app.get('/q68', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT e.*
            FROM employees e
            JOIN job_history j ON e.employee_id = j.employee_id
            GROUP BY e.employee_id, e.first_name, e.last_name
            HAVING COUNT(j.job_id) > 1;
        `);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
app.get('/q69', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT d.department_name, COUNT(e.employee_id) AS employee_count
            FROM employees e
            JOIN departments d ON e.department_id = d.department_id
            GROUP BY d.department_name;
        `);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
app.get('/q70', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT j.job_title, SUM(e.salary) AS total_salary
            FROM employees e
            JOIN jobs j ON e.job_id = j.job_id
            GROUP BY j.job_title
            LIMIT 3;
        `);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
app.get('/q71', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT d.department_name, AVG(e.commission_pct) AS avg_commission
            FROM employees e
            JOIN departments d ON e.department_id = d.department_id
            GROUP BY d.department_id
            LIMIT 3;
        `);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
app.get('/q72', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT l.country_id, c.country_name, MAX(e.salary) AS max_salary
            FROM employees e
            JOIN departments d ON e.department_id = d.department_id
            JOIN locations l ON d.location_id = l.location_id
            JOIN countries c ON l.country_id = c.country_id
            GROUP BY l.country_id, c.country_name;
        `);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
app.get('/q73', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT j.job_title, d.department_name, 
                   CONCAT(e.first_name, ' ', e.last_name) AS full_name,
                   e.hire_date AS start_date
            FROM employees e
            JOIN jobs j ON e.job_id = j.job_id
            JOIN departments d ON e.department_id = d.department_id
            WHERE e.hire_date BETWEEN '1993-01-01' AND '1997-08-31'
            LIMIT 3;
        `);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
app.get('/q74', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT c.country_name, l.city, COUNT(d.department_id) AS number_of_departments
            FROM employees e
            JOIN departments d ON e.department_id = d.department_id
            JOIN locations l ON d.location_id = l.location_id
            JOIN countries c ON l.country_id = c.country_id
            GROUP BY c.country_name, l.city
            HAVING COUNT(e.employee_id) >= 2;
        `);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
app.get('/q75', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT e.first_name || ' ' || e.last_name AS full_name,
                   j.job_title, jh.start_date, jh.end_date
            FROM job_history jh
            JOIN employees e ON jh.employee_id = e.employee_id
            JOIN jobs j ON jh.job_id = j.job_id
            WHERE e.commission_pct IS NULL OR e.commission_pct = 0
            LIMIT 3;
        `);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/q76', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT e.first_name || ' ' || e.last_name AS full_name,
                   c.country_name
            FROM employees e
            JOIN departments d ON e.department_id = d.department_id
            JOIN locations l ON d.location_id = l.location_id
            JOIN countries c ON l.country_id = c.country_id
            LIMIT 3;
        `);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
app.get('/q77', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT *
            FROM employees
            WHERE salary IN (
                SELECT MIN(salary)
                FROM employees
                GROUP BY department_id
            )
            LIMIT 3;
        `);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
app.get('/q78', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT *
            FROM employees
            WHERE salary = (
                SELECT DISTINCT salary
                FROM employees
                ORDER BY salary DESC
                LIMIT 1 OFFSET 2
            );
        `);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
app.get('/q79', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT first_name || ' ' || last_name AS full_name, salary
            FROM employees
            WHERE salary > (
                SELECT AVG(salary) FROM employees
            )
            AND department_id IN (
                SELECT department_id
                FROM employees
                WHERE first_name ILIKE '%J%' OR last_name ILIKE '%J%'
            )
            LIMIT 3;
        `);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
app.get('/q80', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT first_name || ' ' || last_name AS full_name,
                   e.employee_id, j.job_title
            FROM employees e
            JOIN departments d ON e.department_id = d.department_id
            JOIN locations l ON d.location_id = l.location_id
            JOIN jobs j ON e.job_id = j.job_id
            WHERE l.city = 'Toronto';
        `);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
app.get('/q81', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT department_id, SUM(salary) AS total_salary
            FROM employees
            GROUP BY department_id
            HAVING COUNT(*) > 0;
        `);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/q82', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT employee_id, first_name, last_name, salary,
            CASE WHEN salary > (SELECT AVG(salary) FROM employees) THEN 'HIGH'
            ELSE 'LOW' END AS Salary_Status
            FROM employees LIMIT 3;
        `);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/q83', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT e.*
            FROM employees e
            JOIN departments d ON e.department_id = d.department_id
            JOIN locations l ON d.location_id = l.location_id
            JOIN countries c ON l.country_id = c.country_id
            WHERE c.country_name = 'United Kingdom' LIMIT 3;
        `);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/q84', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT e.*
            FROM employees e
            JOIN (
                SELECT department_id, SUM(salary) AS dept_total_salary
                FROM employees
                GROUP BY department_id
            ) dept_salary ON e.department_id = dept_salary.department_id
            WHERE e.salary > 0.5 * dept_salary.dept_total_salary LIMIT 3;
        `);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/q85', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT DISTINCT e.*
            FROM employees e
            JOIN employees m ON e.employee_id = m.manager_id LIMIT 3;
        `);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/q86', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT e.employee_id, e.first_name, e.last_name, e.salary, d.department_name, l.city
            FROM employees e
            JOIN departments d ON e.department_id = d.department_id
            JOIN locations l ON d.location_id = l.location_id
            WHERE e.hire_date BETWEEN '2002-01-01' AND '2003-12-31'
            AND e.salary = (SELECT MAX(salary) FROM employees WHERE hire_date BETWEEN '2002-01-01' AND '2003-12-31');
        `);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/q87', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT e.first_name, e.last_name, e.salary, e.department_id
            FROM employees e
            WHERE e.salary < (SELECT AVG(salary) FROM employees)
            AND e.department_id = (SELECT department_id FROM employees WHERE first_name = 'Laura' LIMIT 1);
        `);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/q88', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT d.*
            FROM departments d
            WHERE d.department_id IN (
                SELECT e.department_id
                FROM employees e
                WHERE e.salary >= 7000
                AND e.employee_id IN (SELECT employee_id FROM job_history)
            );
        `);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/q89', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT r.region_name, MIN(LENGTH(l.postal_code)) AS min_postal_length
            FROM regions r
            JOIN countries c ON r.region_id = c.region_id
            JOIN locations l ON c.country_id = l.country_id
            GROUP BY r.region_name;
        `);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/q90', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT * FROM employees ORDER BY hire_date DESC LIMIT 3;
        `);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
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