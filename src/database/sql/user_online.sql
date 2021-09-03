CREATE TABLE IF NOT EXISTS user_online(
    user_id TEXT PRIMARY KEY,
    status  INTEGER NOT NULL,
    date    DATE NOT NULL
);