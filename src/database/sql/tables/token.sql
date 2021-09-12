create table if not exists token(
    fingerprint  text     not null  unique,
    token        text     not null  unique,
    user_id      text     not null,
    start_date   integer  not null  default (strftime('%s','now')),
    ip           text,
    foreign key (user_id)
        references user(id)
        on delete cascade
        on update cascade
);

create table if not exists activate_code(
    user_id   text     not null  primary key,
    code      integer  not null,
    end_date  integer  not null  default (strftime('%s', 'now', '+1 day')),
    foreign key (user_id)
        references user(id)
        on delete cascade
        on update cascade
)