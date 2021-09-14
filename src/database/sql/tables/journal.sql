create table if not exists "journal" (
    id           serial  primary key,
    fingerprint  text,
    ip           text,
    user_id      uuid,
    action       smallint,
    note         text,
    date         timestamp  not null  default current_timestamp,
    foreign key (user_id)
        references "user"(id)
        on delete cascade
        on update cascade
);