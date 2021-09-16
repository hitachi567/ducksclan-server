create table if not exists "user" (
    id             uuid         not null  primary key,
    username       varchar(30)  not null  unique,
    email          text         not null  unique,
    password       text         not null,
    created_at     timestamp    not null  default current_timestamp,
    activate_date  timestamp,
    avatar         smallint,
    isDisabled     boolean
);