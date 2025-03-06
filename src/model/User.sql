CREATE TABLE
    IF NOT EXISTS user_admin (
        id SERIAL PRIMARY KEY,
        email VARCHAR UNIQUE NOT NULL,
        password VARCHAR NOT NULL,
        name VARCHAR NOT NULL,
        super BOOLEAN DEFAULT false
    )