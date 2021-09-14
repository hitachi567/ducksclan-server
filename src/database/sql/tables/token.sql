create table if not exists "token" (
    fingerprint  text       not null  unique,
    token        text       not null  unique,
    user_id      uuid       not null,
    created_at   timestamp  not null  default current_timestamp,
    ip           text,
    foreign key (user_id)
        references "user"(id)
        on delete cascade
        on update cascade
);