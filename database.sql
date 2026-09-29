-- Baza yaratish
CREATE DATABASE technical_repair_db;

-- Sequelize o'zi jadvallarni yaratadi, ammo qo'lda yaratish uchun SQL skripti:

CREATE TABLE spare_parts (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    part_number VARCHAR(100) UNIQUE,
    category VARCHAR(100),
    quantity INTEGER NOT NULL DEFAULT 0,
    price DECIMAL(10, 2) NOT NULL DEFAULT 0.0,
    minimum_stock INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL,
    "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL
);

CREATE TABLE repairs (
    id SERIAL PRIMARY KEY,
    customer_name VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    device_type VARCHAR(100) NOT NULL,
    device_model VARCHAR(100) NOT NULL,
    problem_description TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'PENDING',
    total_parts_cost DECIMAL(10, 2) DEFAULT 0.0,
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL,
    "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL
);

CREATE TABLE repair_parts (
    id SERIAL PRIMARY KEY,
    repair_id INTEGER REFERENCES repairs(id) ON DELETE CASCADE,
    spare_part_id INTEGER REFERENCES spare_parts(id) ON DELETE SET NULL,
    quantity INTEGER NOT NULL DEFAULT 1,
    unit_price DECIMAL(10, 2) NOT NULL,
    total_price DECIMAL(10, 2) NOT NULL,
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL,
    "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL
);

CREATE TABLE failure_analyses (
    id SERIAL PRIMARY KEY,
    repair_id INTEGER REFERENCES repairs(id) ON DELETE CASCADE,
    problem_category VARCHAR(100),
    possible_cause TEXT,
    recommendation TEXT,
    risk_level VARCHAR(50),
    required_parts JSONB,
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL,
    "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL
);
