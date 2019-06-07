create table indicio (
    id serial,
    projeto varchar(30) not null,
    entidade varchar(100) not null,
    link varchar(200) not null,
    metrica integer,
    primary key(id)
);

create table resposta (
    id serial,
    id_indicio integer,
    resposta boolean,
    primary key(id),
    foreign key(id_indicio) references indicio(id) on delete cascade
);