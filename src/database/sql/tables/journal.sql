create table if not exists journal(
    id           integer,
    fingerprint  text,
    ip           text,
    user_id      text,
    action       integer,
    date         integer  not null default (strftime('%s','now')),
    primary key(id autoincrement),
    foreign key (user_id)
        references user(id)
        on delete cascade
        on update cascade
)