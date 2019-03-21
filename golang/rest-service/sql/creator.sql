create table if not exists user (
  id int(10) unsigned not null auto_increment,
  name varchar(128) not null,
  primary key (id),
  unique index user_id_uindex (id)
)