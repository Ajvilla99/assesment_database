-- Script to create tables and types for billing system
CREATE DATABASE abrahan_villa_manglar;

-- Drop tables and types in correct order
DROP TABLE IF EXISTS info_transactions CASCADE;
DROP TABLE IF EXISTS billings CASCADE;
DROP TABLE IF EXISTS users CASCADE;

DROP TYPE IF EXISTS enum_transaction_status CASCADE;
DROP TYPE IF EXISTS enum_platform_use CASCADE;

-- Users table
CREATE TABLE users (
    id_user SERIAL PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    identification VARCHAR(50) UNIQUE,
    address VARCHAR(255) NOT NULL,
    phone VARCHAR(30) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Enum type for platforms
CREATE TYPE enum_platform_use AS ENUM ('daviplata', 'nequi');

-- Billings table
CREATE TABLE billings (
    invoice_number TEXT PRIMARY KEY,
    id_user INTEGER NOT NULL,
    platform_use enum_platform_use NOT NULL,
    amount_invoice NUMERIC(10,2) NOT NULL CHECK (amount_invoice >= 0),
    amount_paid NUMERIC(10,2) DEFAULT 0 CHECK (amount_paid >= 0),
    billing_period TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_user) REFERENCES users(id_user) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Enum type for transaction status
CREATE TYPE enum_transaction_status AS ENUM ('fallida', 'completada', 'pendiente');

-- Info transactions table
CREATE TABLE info_transactions (
    id_transaction TEXT PRIMARY KEY,
    invoice_number TEXT NOT NULL,
    date_transaction DATE NOT NULL,
    transaction_amount NUMERIC(10,2) NOT NULL CHECK (transaction_amount >= 0),
    transaction_status enum_transaction_status NOT NULL,
    transaction_type TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (invoice_number) REFERENCES billings(invoice_number) ON DELETE CASCADE ON UPDATE