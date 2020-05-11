drop table if exists `locations`;
drop table if exists `location_pics`;
drop table if exists `tours`;
drop table if exists `tours_locations`;
drop table if exists `types`;
drop table if exists `tours_types`;
drop table if exists `users`;
drop table if exists `tokens`;

create table locations
(
    id                  varchar(30) not null
        primary key,
    created_at          datetime     null,
    created_by          varchar(255) null,
    description         varchar(255) not null,
    last_updated        datetime     null,
    last_updated_by     varchar(255) null,
    min_time_in_seconds int          not null,
    name                varchar(255) not null,
    x                   double       not null,
    y                   double       not null
);

create table location_pics
(
    location_id varchar(30) not null,
    pics        varchar(255) null,
    constraint FK2ek2w77w2j9fqwp6gqne3gsav
        foreign key (location_id) references locations (id)
);

create table tours
(
    id              varchar(30) not null
        primary key,
    created_at      datetime     null,
    created_by      varchar(255) null,
    description     varchar(255) null,
    last_updated    datetime     null,
    last_updated_by varchar(255) null,
    min_time_in_sec int          null,
    name            varchar(255) not null,
    thumbnail       varchar(255) null
);

create table tours_locations
(
    tour_id      varchar(30) not null,
    locations_id varchar(30) not null,
    constraint FKhls9xhfj7jg7r7c1ei954cn9u
        foreign key (locations_id) references locations (id),
    constraint FKljrcpb9rrvl1bp8oepq3m8bte
        foreign key (tour_id) references tours (id)
);

create table types
(
    id              varchar(30) not null
        primary key,
    created_at      datetime     null,
    created_by      varchar(255) null,
    last_updated    datetime     null,
    last_updated_by varchar(255) null,
    name            varchar(255) not null
);

create table tours_types
(
    tour_id  varchar(30) not null,
    types_id varchar(30) not null,
    primary key (tour_id, types_id),
    constraint FK30rcwnk093svqrlt60eiaehis
        foreign key (tour_id) references tours (id),
    constraint FKf997d0lw7gyp5tys6hl7q7ksh
        foreign key (types_id) references types (id)
);

create table users
(
    id              varchar(30) not null
        primary key,
    created_at      datetime     null,
    created_by      varchar(255) null,
    email           varchar(255) not null,
    email_verified  bit          not null,
    image_url       varchar(255) null,
    is_active       bit          not null,
    last_updated    datetime     null,
    last_updated_by varchar(255) null,
    name            varchar(255) not null,
    password        varchar(255) null,
    provider        varchar(255) not null,
    provider_id     varchar(255) null,
    role            varchar(255) not null,
    username        varchar(255) not null,
    constraint UK6dotkott2kjsp8vw4d0m25fb7
        unique (email),
    constraint UKr43af9ap4edm43mmtq01oddj6
        unique (username)
);

create table tokens
(
    id             varchar(30) not null
        primary key,
    confirmed_date datetime     null,
    expired_date   datetime     null,
    issued_date    datetime     null,
    token          varchar(255) null,
    type           varchar(255) not null,
    user_id        varchar(255) not null,
    constraint FK2dylsfo39lgjyqml2tbe0b0ss
        foreign key (user_id) references users (id)
);


