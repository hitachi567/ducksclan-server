create table if not exists user(
    id             text     not null  primary key,
    username       text     not null  unique,
    email          text     not null  unique,
    password       text     not null,
    create_date    integer  not null  default (strftime('%s','now')),
    activate_date  integer,
    avatar         integer,
    isDisabled     integer,
    foreign key (avatar)
        references user_photo(rowid)
        on delete cascade
        on update cascade
);

create table if not exists user_photo(
    url      text     not null unique,
    number   integer  not null,
    user_id  text     not null,
    date     integer  not null default (strftime('%s','now')),
    foreign key (user_id)
        references user(id)
        on delete cascade
        on update cascade
);

create table if not exists user_online(
    user_id  text    not null  primary key,
    status   integer not null,
    date     integer not null  default (strftime('%s', 'now')),
    foreign key (user_id)
        references user(id)
        on delete cascade
        on update cascade
);

create table if not exists disabled_user(
    user_id     text     not null  primary key,
    by          text     not null,
    start_date  integer  not null  default (strftime('%s', 'now')),
    end_date    integer,
    reason      integer  default 0,
    foreign key (user_id)
        references user(id)
        on delete cascade
        on update cascade,
    foreign key (by)
        references user(id)
        on delete cascade
        on update cascade
)