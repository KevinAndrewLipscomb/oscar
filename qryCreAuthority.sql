# phpMyAdmin MySQL-Dump
# version 2.2.0rc1
# http://phpwizard.net/phpMyAdmin/
# http://phpmyadmin.sourceforge.net/ (download page)
#
# Host: localhost
# Generation Time: November 21, 2001, 2:04 pm
# Server version: 3.23.32
# PHP Version: 4.0.6
# Database : oscar
# --------------------------------------------------------

#
# Table structure for tables 'authority' and 'x_authority'
#

CREATE TABLE `authority` (
  `email_addr` varchar(64) NOT NULL default '',
  `role` varchar(32) default NULL,
  `coord_agency` enum('EMS','Rescue1','Rescue2','Rescue4','Rescue5','Rescue6','Rescue9','Rescue13','Rescue14','Rescue15','Rescue16','Rescue17','DiveTeam') NOT NULL default 'EMS',
  `has_clearance` enum('FALSE','TRUE') NOT NULL default 'FALSE',
  UNIQUE KEY `email_addr`(`email_addr`,`role`,`coord_agency`)
) TYPE=MyISAM;

CREATE TABLE `x_authority` (
  `email_addr` varchar(64) NOT NULL default '',
  `role` varchar(32) default NULL,
  `coord_agency` enum('EMS','Rescue1','Rescue2','Rescue4','Rescue5','Rescue6','Rescue9','Rescue13','Rescue14','Rescue15','Rescue16','Rescue17','DiveTeam') NOT NULL default 'EMS',
  `has_clearance` enum('FALSE','TRUE') NOT NULL default 'FALSE',
  UNIQUE KEY `email_addr`(`email_addr`,`role`,`coord_agency`)
) TYPE=MyISAM;

