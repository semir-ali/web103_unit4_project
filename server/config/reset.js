import { pool } from './database.js'

const createTable = `
    DROP TABLE IF EXISTS cars;

    CREATE TABLE cars (
        id       SERIAL PRIMARY KEY,
        make     VARCHAR(50)    NOT NULL,
        model    VARCHAR(50)    NOT NULL,
        year     INTEGER        NOT NULL,
        color    VARCHAR(50)    NOT NULL,
        wheels   VARCHAR(50)    NOT NULL DEFAULT 'Standard',
        interior VARCHAR(50)    NOT NULL DEFAULT 'Cloth',
        price    NUMERIC(10, 2) NOT NULL
    );
`

const seedData = `
    INSERT INTO cars (make, model, year, color, wheels, interior, price) VALUES
        ('Ford',      'Mustang',  2023, 'Red',         'Sport',    'Leather',          39500),
        ('Toyota',    'Camry',    2022, 'Silver',       'Standard', 'Cloth',            32500),
        ('BMW',       'M3',       2024, 'Matte Black',  'Luxury',   'Carbon Fiber',     70500),
        ('Tesla',     'Model S',  2023, 'Pearl White',  'Sport',    'Premium Leather',  74000),
        ('Chevrolet', 'Camaro',   2021, 'Yellow',       'Sport',    'Leather',          38700),
        ('Honda',     'Civic',    2022, 'Blue',         'Standard', 'Cloth',            28000);
`

const reset = async () => {
    try {
        await pool.query(createTable)
        console.log('✅ Table created')

        await pool.query(seedData)
        console.log('✅ Seed data inserted')
    } catch (error) {
        console.error('❌ Reset failed:', error.message)
    } finally {
        await pool.end()
    }
}

reset()
