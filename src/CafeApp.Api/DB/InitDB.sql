CREATE TABLE IF NOT EXISTS Cafe (
    id UUID PRIMARY KEY,
    description TEXT NOT NULL,
    logo BLOB,
    location TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS Employee (
    id TEXT PRIMARY KEY CHECK (id LIKE 'UI%'),
    name TEXT NOT NULL,
    email_address TEXT NOT NULL CHECK (email_address LIKE '%_@__%.__%'),
    phone_number TEXT NOT NULL CHECK (phone_number GLOB '[89][0-9]{7}'),
    gender TEXT NOT NULL CHECK (gender IN ('M', 'F')),
    cafe_id UUID,
    start_date DATETIME,
    FOREIGN KEY (cafe_id) REFERENCES Cafe(id)
);

-- Insert data into Cafe table
INSERT INTO
    Cafe (id, description, logo, location)
VALUES
    (
        '550e8400-e29b-41d4-a716-446655440000',
        'Central Cafe',
        NULL,
        '123 Main St'
    ),
    (
        '550e8400-e29b-41d4-a716-446655440001',
        'Downtown Cafe',
        NULL,
        '456 Elm St'
    );

-- Insert data into Employee table
INSERT INTO
    Employee (
        id,
        name,
        email_address,
        phone_number,
        gender,
        cafe_id,
        start_date
    )
VALUES
    (
        'UI0000001',
        'John Doe',
        'john.doe@example.com',
        '91234567',
        'M',
        '550e8400-e29b-41d4-a716-446655440000',
        '2023-01-01 09:00:00'
    ),
    (
        'UI0000002',
        'Jane Smith',
        'jane.smith@example.com',
        '81234567',
        'F',
        '550e8400-e29b-41d4-a716-446655440001',
        '2023-02-01 09:00:00'
    );