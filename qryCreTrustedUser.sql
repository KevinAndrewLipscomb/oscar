#
# $Id#
#

# phpMyAdmin MySQL-Dump
# version 2.2.4
# http://phpwizard.net/phpMyAdmin/
# http://phpmyadmin.sourceforge.net/ (download page)
#
# Host: localhost
# Generation Time: Dec 13, 2002 at 03:50 PM
# Server version: 3.23.46
# PHP Version: 4.2.3
# Database : `oscar`
# --------------------------------------------------------

#
# Table structure for tables `trusted_user` and `x_trusted_user`
#

CREATE TABLE trusted_user (
  email_address varchar(64) NOT NULL default '',
  coord_agency enum('EMS','R01','R02','R04','R05','R06','R09','R13','R14','R15','R16','R17') NOT NULL default 'EMS',
  PRIMARY KEY  (email_address,coord_agency)
) TYPE=MyISAM;

CREATE TABLE x_trusted_user (
  email_address varchar(64) NOT NULL default '',
  coord_agency enum('EMS','R01','R02','R04','R05','R06','R09','R13','R14','R15','R16','R17') NOT NULL default 'EMS',
  PRIMARY KEY  (email_address,coord_agency)
) TYPE=MyISAM;
