# phpMyAdmin MySQL-Dump
# version 2.2.0rc1
# http://phpwizard.net/phpMyAdmin/
# http://phpmyadmin.sourceforge.net/ (download page)
#
# Host: localhost
# Generation Time: November 20, 2001, 4:51 pm
# Server version: 3.23.32
# PHP Version: 4.0.6
# Database : oscar
# --------------------------------------------------------

#
# Table structure for table 'squad_of_coord_agency'
#

CREATE TABLE `squad_of_coord_agency` (
  `coord_agency` enum('Rescue1','Rescue2','Rescue4','Rescue5','Rescue6','Rescue9','Rescue13','Rescue14','Rescue15','Rescue16','Rescue17','DiveTeam') NOT NULL default 'Rescue1',
  `squad` enum('R01','R02','R04','R05','R06','R09','R13','R14','R15','R16','R17','DIV') NOT NULL default 'R01',
  PRIMARY KEY (`coord_agency`,`squad`)
) TYPE=MyISAM;

#
# Dumping data for table 'squad_of_coord_agency'
#

INSERT INTO squad_of_coord_agency VALUES ('Rescue1','R01');
INSERT INTO squad_of_coord_agency VALUES ('Rescue2','R02');
INSERT INTO squad_of_coord_agency VALUES ('Rescue4','R04');
INSERT INTO squad_of_coord_agency VALUES ('Rescue5','R05');
INSERT INTO squad_of_coord_agency VALUES ('Rescue6','R06');
INSERT INTO squad_of_coord_agency VALUES ('Rescue9','R09');
INSERT INTO squad_of_coord_agency VALUES ('Rescue13','R13');
INSERT INTO squad_of_coord_agency VALUES ('Rescue14','R14');
INSERT INTO squad_of_coord_agency VALUES ('Rescue15','R15');
INSERT INTO squad_of_coord_agency VALUES ('Rescue16','R16');
INSERT INTO squad_of_coord_agency VALUES ('Rescue17','R17');
INSERT INTO squad_of_coord_agency VALUES ('DiveTeam','DIV');


#
# Table structure for table 'x_squad_of_coord_agency'
#

CREATE TABLE `x_squad_of_coord_agency` (
  `coord_agency` enum('Rescue1','Rescue2','Rescue4','Rescue5','Rescue6','Rescue9','Rescue13','Rescue14','Rescue15','Rescue16','Rescue17','DiveTeam') NOT NULL default 'Rescue1',
  `squad` enum('R01','R02','R04','R05','R06','R09','R13','R14','R15','R16','R17','DIV') NOT NULL default 'R01',
  PRIMARY KEY (`coord_agency`,`squad`)
) TYPE=MyISAM;

#
# Dumping data for table 'squad_of_coord_agency'
#

INSERT INTO x_squad_of_coord_agency VALUES ('Rescue1','R01');
INSERT INTO x_squad_of_coord_agency VALUES ('Rescue2','R02');
INSERT INTO x_squad_of_coord_agency VALUES ('Rescue4','R04');
INSERT INTO x_squad_of_coord_agency VALUES ('Rescue5','R05');
INSERT INTO x_squad_of_coord_agency VALUES ('Rescue6','R06');
INSERT INTO x_squad_of_coord_agency VALUES ('Rescue9','R09');
INSERT INTO x_squad_of_coord_agency VALUES ('Rescue13','R13');
INSERT INTO x_squad_of_coord_agency VALUES ('Rescue14','R14');
INSERT INTO x_squad_of_coord_agency VALUES ('Rescue15','R15');
INSERT INTO x_squad_of_coord_agency VALUES ('Rescue16','R16');
INSERT INTO x_squad_of_coord_agency VALUES ('Rescue17','R17');
INSERT INTO x_squad_of_coord_agency VALUES ('DiveTeam','DIV');


