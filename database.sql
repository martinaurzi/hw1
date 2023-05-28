Create DATABASE hw1_1;
USE hw1_1;

CREATE TABLE users (
    id integer primary key auto_increment,
    username varchar(16) not null unique,
    password varchar(255) not null,
    pianeta varchar(10) not null
) Engine = InnoDB;

CREATE TABLE likedpictures (
    picture_id varchar(255),
    user_id integer,
    picture json,
    index indx_user (user_id),
    foreign key (user_id) references users(id),
    primary key(picture_id, user_id)
) Engine = InnoDB;