#
# $Id#
#

# phpMyAdmin MySQL-Dump
# version 2.2.4
# http://phpwizard.net/phpMyAdmin/
# http://phpmyadmin.sourceforge.net/ (download page)
#
# Host: localhost
# Generation Time: Dec 13, 2002 at 04:04 PM
# Server version: 3.23.46
# PHP Version: 4.2.3
# Database : `oscar`
# --------------------------------------------------------

#
# Table structure for table `trusted_user`
#

CREATE TABLE trusted_user (
  email_address varchar(64) NOT NULL default '',
  coord_agency enum('EMS','Rescue1','Rescue2','Rescue4','Rescue5','Rescue6','Rescue9','Rescue13','Rescue14','Rescue15','Rescue16','Rescue17','DiveTeam') NOT NULL default 'EMS',
  PRIMARY KEY  (email_address,coord_agency)
) TYPE=MyISAM;
# --------------------------------------------------------

#
# Table structure for table `x_trusted_user`
#

CREATE TABLE x_trusted_user (
  email_address varchar(64) NOT NULL default '',
  coord_agency enum('EMS','Rescue1','Rescue2','Rescue4','Rescue5','Rescue6','Rescue9','Rescue13','Rescue14','Rescue15','Rescue16','Rescue17','DiveTeam') NOT NULL default 'EMS',
  PRIMARY KEY  (email_address,coord_agency)
) TYPE=MyISAM;
