# phpMyAdmin MySQL-Dump
# version 2.2.0rc1
# http://phpwizard.net/phpMyAdmin/
# http://phpmyadmin.sourceforge.net/ (download page)
#
# Host: localhost
# Generation Time: November 4, 2001, 10:46 am
# Server version: 3.23.32
# PHP Version: 4.0.6
# Database : oscar
# --------------------------------------------------------

#
# Table structure for tables 'db_status' and 'x_db_status'
#

CREATE TABLE `db_status` (
  `value` char(4) NOT NULL default 'A-OK'
) TYPE=MyISAM;

#
# Dumping data for table 'db_status'
#

INSERT INTO db_status VALUES ('A-OK');


CREATE TABLE `x_db_status` (
  `value` char(4) NOT NULL default 'A-OK'
) TYPE=MyISAM;

#
# Dumping data for table 'x_db_status'
#

INSERT INTO x_db_status VALUES ('A-OK');


