# phpMyAdmin MySQL-Dump
# version 2.2.0rc1
# http://phpwizard.net/phpMyAdmin/
# http://phpmyadmin.sourceforge.net/ (download page)
#
# Host: localhost
# Generation Time: November 16, 2001, 12:12 pm
# Server version: 3.23.32
# PHP Version: 4.0.6
# Database : oscar
# --------------------------------------------------------

#
# Table structure for table 'agency'
#

CREATE TABLE `agency` (
  `enumeral` varchar(12) NOT NULL default '',
  `description` varchar(64) NOT NULL default '',
  `be_active` enum('FALSE','TRUE') NOT NULL default 'FALSE',
  PRIMARY KEY (`enumeral`,`description`)
) TYPE=MyISAM;

#
# Dumping data for table 'agency'
#

INSERT INTO agency VALUES ('EMS','EMS Admin (zone/squad/EMS5 duties only)','TRUE');
INSERT INTO agency VALUES ('Rescue1','Rescue 1 - Ocean Park (ambulance duties only)','FALSE');
INSERT INTO agency VALUES ('Rescue2','Rescue 2 - Davis Corner (ambulance duties only)','FALSE');
INSERT INTO agency VALUES ('Rescue4','Rescue 4 - Chesapeake Beach (ambulance duties only)','FALSE');
INSERT INTO agency VALUES ('Rescue5','Rescue 5 - Courthouse (ambulance duties only)','FALSE');
INSERT INTO agency VALUES ('Rescue6','Rescue 6 - Creeds (ambulance duties only)','FALSE');
INSERT INTO agency VALUES ('Rescue9','Rescue 9 - Kempsville (ambulance duties only)','FALSE');
INSERT INTO agency VALUES ('Rescue13','Rescue 13 - Blackwater (ambulance duties only)','FALSE');
INSERT INTO agency VALUES ('Rescue14','Rescue 14 - Virginia Beach (ambulance duties only)','FALSE');
INSERT INTO agency VALUES ('Rescue15','Rescue 15 - Knotts Island (ambulance duties only)','FALSE');
INSERT INTO agency VALUES ('Rescue16','Rescue 16 - Plaza (ambulance duties only)','FALSE');
INSERT INTO agency VALUES ('Rescue17','Rescue 17 - Sandbridge (ambulance duties only)','FALSE');
INSERT INTO agency VALUES ('DiveTeam','Dive Team (dive duties only)','FALSE');


#
# Table structure for table 'x_agency'
#

CREATE TABLE `x_agency` (
  `enumeral` varchar(12) NOT NULL default '',
  `description` varchar(64) NOT NULL default '',
  `be_active` enum('FALSE','TRUE') NOT NULL default 'FALSE',
  PRIMARY KEY (`enumeral`,`description`)
) TYPE=MyISAM;

#
# Dumping data for table 'x_agency'
#

INSERT INTO x_agency VALUES ('EMS','EMS Admin (zone/squad/EMS5 duties only)','TRUE');
INSERT INTO x_agency VALUES ('Rescue1','Rescue 1 - Ocean Park (ambulance duties only)','FALSE');
INSERT INTO x_agency VALUES ('Rescue2','Rescue 2 - Davis Corner (ambulance duties only)','FALSE');
INSERT INTO x_agency VALUES ('Rescue4','Rescue 4 - Chesapeake Beach (ambulance duties only)','FALSE');
INSERT INTO x_agency VALUES ('Rescue5','Rescue 5 - Courthouse (ambulance duties only)','FALSE');
INSERT INTO x_agency VALUES ('Rescue6','Rescue 6 - Creeds (ambulance duties only)','FALSE');
INSERT INTO x_agency VALUES ('Rescue9','Rescue 9 - Kempsville (ambulance duties only)','FALSE');
INSERT INTO x_agency VALUES ('Rescue13','Rescue 13 - Blackwater (ambulance duties only)','FALSE');
INSERT INTO x_agency VALUES ('Rescue14','Rescue 14 - Virginia Beach (ambulance duties only)','FALSE');
INSERT INTO x_agency VALUES ('Rescue15','Rescue 15 - Knotts Island (ambulance duties only)','FALSE');
INSERT INTO x_agency VALUES ('Rescue16','Rescue 16 - Plaza (ambulance duties only)','FALSE');
INSERT INTO x_agency VALUES ('Rescue17','Rescue 17 - Sandbridge (ambulance duties only)','FALSE');
INSERT INTO x_agency VALUES ('DiveTeam','Dive Team (dive duties only)','FALSE');


