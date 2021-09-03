CREATE TABLE IF NOT EXISTS activate_code(
    user_id TEXT PRIMARY KEY,
    code    INTEGER NOT NULL,
    date    DATE NOT NULL
);