drop database if exists `fee`;
create database `fee` CHARACTER SET utf8 COLLATE utf8_general_ci;

use `fee`;

drop table if exists `admin`;
create table `admin` (
	`id` bigint(20) NOT NULL AUTO_INCREMENT,
	`username` varchar(30) default null,
	`password` varchar(30) default null,
	`createtime` date default null,
	 primary key(id)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

drop table if exists `feeInfo`;
create table `feeInfo` (
	`id` bigint(20) NOT NULL AUTO_INCREMENT,
	`feeName` varchar(50) default null,
	`theme` tinyint(1) default null,
	`num` int(20) default null,
	`direction` tinyint(1) default null,
	`fromName` varchar(50) default null,
	`notice` varchar(100) default null,
	`createtime` date default null,
	primary key(id)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;