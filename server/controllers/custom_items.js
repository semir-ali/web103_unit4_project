import { pool } from '../config/database.js'

const getCars = async (_req, res) => {
    try {
        const result = await pool.query('SELECT * FROM cars ORDER BY id ASC')
        res.status(200).json(result.rows)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const getCar = async (req, res) => {
    try {
        const { id } = req.params
        const result = await pool.query('SELECT * FROM cars WHERE id = $1', [id])
        if (result.rows.length === 0) return res.status(404).json({ error: 'Car not found' })
        res.status(200).json(result.rows[0])
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const createCar = async (req, res) => {
    try {
        const { make, model, year, color, wheels, interior, price } = req.body
        const result = await pool.query(
            `INSERT INTO cars (make, model, year, color, wheels, interior, price)
             VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
            [make, model, year, color, wheels, interior, price]
        )
        res.status(201).json(result.rows[0])
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const updateCar = async (req, res) => {
    try {
        const { id } = req.params
        const { make, model, year, color, wheels, interior, price } = req.body
        const result = await pool.query(
            `UPDATE cars
             SET make = $1, model = $2, year = $3, color = $4, wheels = $5, interior = $6, price = $7
             WHERE id = $8 RETURNING *`,
            [make, model, year, color, wheels, interior, price, id]
        )
        if (result.rows.length === 0) return res.status(404).json({ error: 'Car not found' })
        res.status(200).json(result.rows[0])
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const deleteCar = async (req, res) => {
    try {
        const { id } = req.params
        const result = await pool.query('DELETE FROM cars WHERE id = $1 RETURNING *', [id])
        if (result.rows.length === 0) return res.status(404).json({ error: 'Car not found' })
        res.status(200).json(result.rows[0])
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export { getCars, getCar, createCar, updateCar, deleteCar }
