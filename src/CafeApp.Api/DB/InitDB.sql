DELETE from
    Employee;

DELETE from
    Cafe;
DROP TABLE IF EXISTS Employee;
DROP TABLE IF EXISTS Cafe;

CREATE TABLE IF NOT EXISTS Cafe (
    pId INTEGER PRIMARY KEY,
    id UUID NOT NULL UNIQUE,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    logo BLOB,
    location TEXT NOT NULL,
    createdDate DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    createdBy TEXT NOT NULL DEFAULT 'system',
    modifiedDate DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    modifedBy TEXT NOT NULL DEFAULT 'system'
);

CREATE TABLE IF NOT EXISTS Employee (
    pId INTEGER PRIMARY KEY,
    id TEXT NOT NULL UNIQUE CHECK (
        id GLOB 'UI[A-Za-z0-9][A-Za-z0-9][A-Za-z0-9][A-Za-z0-9][A-Za-z0-9][A-Za-z0-9][A-Za-z0-9]'
    ),
    name TEXT NOT NULL,
    emailAddress TEXT NOT NULL CHECK (emailAddress LIKE '%_@__%.__%'),
    phoneNumber TEXT NOT NULL CHECK (
        phoneNumber GLOB '[89][0-9][0-9][0-9][0-9][0-9][0-9][0-9]'
    ),
    gender TEXT NOT NULL CHECK (gender IN ('M', 'F', 'O')),
    cafeId int NOT NULL,
    startDate DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    createdDate DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    createdBy TEXT NOT NULL DEFAULT 'system',
    modifiedDate DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    modifedBy TEXT NOT NULL DEFAULT 'system',
    FOREIGN KEY (cafeId) REFERENCES Cafe(pId) ON DELETE CASCADE
);


INSERT INTO
    Cafe (
        id,
        name,
        description,
        logo,
        location,
        createdBy,
        modifedBy
    )
VALUES
    (
        lower(
            hex(randomblob(4)) || '-' || hex(randomblob(2)) || '-' || '4' || substr(hex(randomblob(2)), 2) || '-' || substr('AB89', 1 + (abs(random()) % 4), 1) || substr(hex(randomblob(2)), 2) || '-' || hex(randomblob(6))
        ),
        'Cafe Mocha',
        'A cozy place for coffee lovers',
        NULL,
        '123 Coffee St',
        'system',
        'system'
    ),
    (
        lower(
            hex(randomblob(4)) || '-' || hex(randomblob(2)) || '-' || '4' || substr(hex(randomblob(2)), 2) || '-' || substr('AB89', 1 + (abs(random()) % 4), 1) || substr(hex(randomblob(2)), 2) || '-' || hex(randomblob(6))
        ),
        'Cafe Latte',
        'Best lattes in town',
        NULL,
        '456 Latte Ave',
        'system',
        'system'
    );


INSERT INTO
    Employee (
        id,
        name,
        emailAddress,
        phoneNumber,
        gender,
        cafeId,
        createdBy,
        modifedBy
    )
VALUES
    (
        'UI0000001',
        'John Doe',
        'john.doe@example.com',
        '81234567',
        'M',
        1,
        'system',
        'system'
    ),
    (
        'UI0000002',
        'Jane Smith',
        'jane.smith@example.com',
        '91234567',
        'F',
        1,
        'system',
        'system'
    ),
    (
        'UI0000003',
        'Alice Johnson',
        'alice.johnson@example.com',
        '81234568',
        'F',
        1,
        'system',
        'system'
    ),
    (
        'UI0000004',
        'Bob Brown',
        'bob.brown@example.com',
        '91234568',
        'M',
        1,
        'system',
        'system'
    );