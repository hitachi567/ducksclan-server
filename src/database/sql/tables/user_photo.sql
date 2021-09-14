create table if not exists "user_photo" (
    url      text       not null  unique,
    number   smallint   not null,
    user_id  uuid       not null,
    date     timestamp  not null  default current_timestamp,
    foreign key (user_id)
        references "user"(id)
        on delete cascade
        on update cascade
);