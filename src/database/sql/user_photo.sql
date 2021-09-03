CREATE TABLE IF NOT EXISTS user_photo(
    id      TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    number  INTEGER NOT NULL,
    url     TEXT NOT NULL UNIQUE,
    date    DATE NOT NULL
);