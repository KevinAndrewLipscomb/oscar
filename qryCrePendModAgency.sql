# phpMyAdmin MySQL-Dump
# version 2.2.2
# http://phpwizard.net/phpMyAdmin/
# http://phpmyadmin.sourceforge.net/ (download page)
#
# Host: localhost
# Generation Time: Dec 27, 2001 at 03:02 PM
# Server version: 3.23.46
# PHP Version: 4.0.6
# Database : `oscar`
# --------------------------------------------------------

#
# Table structure for table `pend_mod_agency`
#

CREATE TABLE pend_mod_agency (
  token varchar(32) NOT NULL default '',
  enumeral enum('EMS','Rescue1','Rescue2','Rescue4','Rescue5','Rescue6','Rescue9','Rescue13','Rescue14','Rescue15','Rescue16','Rescue17','DiveTeam') NOT NULL default 'EMS',
  new_be_active enum('FALSE','TRUE') NOT NULL default 'FALSE',
  PRIMARY KEY  (token)
) TYPE=MyISAM;
# --------------------------------------------------------

#
# Table structure for table `x_pend_mod_agency`
#

CREATE TABLE x_pend_mod_agency (
  token varchar(32) NOT NULL default '',
  enumeral enum('EMS','Rescue1','Rescue2','Rescue4','Rescue5','Rescue6','Rescue9','Rescue13','Rescue14','Rescue15','Rescue16','Rescue17','DiveTeam') NOT NULL default 'EMS',
  new_be_active enum('FALSE','TRUE') NOT NULL default 'FALSE',
  PRIMARY KEY  (token)
) TYPE=MyISAM;
