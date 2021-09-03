CREATE TABLE IF NOT EXISTS disabled_user(
    user_id TEXT PRIMARY KEY,
    reason  INTEGER,
    date    DATE NOT NULL,
    by      TEXT NOT NULL
)