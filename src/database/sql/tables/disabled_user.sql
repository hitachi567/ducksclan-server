create table if not exists "disabled_user" (
    user_id     uuid       not null  primary key,
    by          uuid       not null,
    start_date  timestamp  not null  default current_timestamp,
    end_date    timestamp,
    reason      smallint   default 0,
    foreign key (user_id)
        references "user"(id)
        on delete cascade
        on update cascade,
    foreign key (by)
        references "user"(id)
        on delete cascade
        on update cascade
);