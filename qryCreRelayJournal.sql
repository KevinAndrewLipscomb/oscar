# phpMyAdmin MySQL-Dump
# version 2.2.4
# http://phpwizard.net/phpMyAdmin/
# http://phpmyadmin.sourceforge.net/ (download page)
#
# Host: localhost
# Generation Time: Mar 31, 2002 at 03:49 PM
# Server version: 3.23.46
# PHP Version: 4.1.2
# Database : `oscar`
# --------------------------------------------------------

#
# Table structure for tables `relay_journal` and `x_relay_journal`
#

CREATE TABLE relay_journal (
  month enum('JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC') NOT NULL default 'JAN',
  coord_agency enum('Rescue1','Rescue2','Rescue4','Rescue5','Rescue6','Rescue9','Rescue13','Rescue14','Rescue15','Rescue16','Rescue17','DiveTeam') NOT NULL default 'Rescue1',
  timestamp timestamp(14) NOT NULL,
  PRIMARY KEY  (month,coord_agency,timestamp)
) TYPE=MyISAM;

CREATE TABLE x_relay_journal (
  month enum('JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC') NOT NULL default 'JAN',
  coord_agency enum('Rescue1','Rescue2','Rescue4','Rescue5','Rescue6','Rescue9','Rescue13','Rescue14','Rescue15','Rescue16','Rescue17','DiveTeam') NOT NULL default 'Rescue1',
  timestamp timestamp(14) NOT NULL,
  PRIMARY KEY  (month,coord_agency,timestamp)
) TYPE=MyISAM;
