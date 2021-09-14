create table if not exists "activate_code" (
    user_id     uuid       not null  primary key,
    code        smallint   not null,
    created_at  timestamp  not null  default current_timestamp,
    foreign key (user_id)
        references "user"(id)
        on delete cascade
        on update cascade
)