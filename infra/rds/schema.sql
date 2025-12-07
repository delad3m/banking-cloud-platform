-- Core banking schema for digital banking project

-- Customers: basic customer data and KYC status
CREATE TABLE customers (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  kyc_status TEXT NOT NULL DEFAULT 'PENDING'
);

-- Accounts: one customer can have multiple accounts
CREATE TABLE accounts (
  id SERIAL PRIMARY KEY,
  customer_id INT NOT NULL REFERENCES customers(id),
  iban TEXT UNIQUE NOT NULL,
  balance NUMERIC(18,2) NOT NULL DEFAULT 0,
  currency CHAR(3) NOT NULL
);

-- Transactions: movements of money on accounts
CREATE TABLE transactions (
  id SERIAL PRIMARY KEY,
  account_id INT NOT NULL REFERENCES accounts(id),
  amount NUMERIC(18,2) NOT NULL,
  currency CHAR(3) NOT NULL,
  type TEXT NOT NULL,        -- e.g. 'DEBIT' or 'CREDIT'
  status TEXT NOT NULL,      -- e.g. 'PENDING', 'POSTED'
  created_at TIMESTAMP NOT NULL DEFAULT now()
);