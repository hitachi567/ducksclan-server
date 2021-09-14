create table if not exists "user_online" (
    user_id  uuid       not null  primary key,
    status   boolean    not null,
    date     timestamp  not null  default current_timestamp,
    foreign key (user_id)
        references "user"(id)
        on delete cascade
        on update cascade
);