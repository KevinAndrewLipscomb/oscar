# phpMyAdmin MySQL-Dump
# version 2.2.0rc1
# http://phpwizard.net/phpMyAdmin/
# http://phpmyadmin.sourceforge.net/ (download page)
#
# Host: localhost
# Generation Time: November 4, 2001, 4:23 pm
# Server version: 3.23.32
# PHP Version: 4.0.6
# Database : oscar
# --------------------------------------------------------

#
# Table structure for tables 'avail_sheet' and 'x_avail_sheet'
#

CREATE TABLE `avail_sheet` (
  `month` enum('JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC') NOT NULL default 'JAN',
  `last_name` varchar(32) NOT NULL default '',
  `first_name` varchar(32) NOT NULL default '',
  `email_addr` varchar(64) NOT NULL default '',
  `squad` enum('ERS','1','2','4','5','6','9','13','14','15','16','17') NOT NULL default 'ERS',
  `be_on_team_5` enum('FALSE','TRUE') NOT NULL default 'FALSE',
  `be_on_team_30` enum('FALSE','TRUE') NOT NULL default 'FALSE',
  `be_tda` enum('FALSE','TRUE') NOT NULL default 'FALSE',
  `be_als` enum('FALSE','TRUE') NOT NULL default 'FALSE',
  `num_extras` tinyint(4) default NULL,
  `note` text,
  `d1` enum('','AVAILABLE') default NULL,
  `d2` enum('','AVAILABLE') default NULL,
  `d3` enum('','AVAILABLE') default NULL,
  `d4` enum('','AVAILABLE') default NULL,
  `d5` enum('','AVAILABLE') default NULL,
  `d6` enum('','AVAILABLE') default NULL,
  `d7` enum('','AVAILABLE') default NULL,
  `d8` enum('','AVAILABLE') default NULL,
  `d9` enum('','AVAILABLE') default NULL,
  `d10` enum('','AVAILABLE') default NULL,
  `d11` enum('','AVAILABLE') default NULL,
  `d12` enum('','AVAILABLE') default NULL,
  `d13` enum('','AVAILABLE') default NULL,
  `d14` enum('','AVAILABLE') default NULL,
  `d15` enum('','AVAILABLE') default NULL,
  `d16` enum('','AVAILABLE') default NULL,
  `d17` enum('','AVAILABLE') default NULL,
  `d18` enum('','AVAILABLE') default NULL,
  `d19` enum('','AVAILABLE') default NULL,
  `d20` enum('','AVAILABLE') default NULL,
  `d21` enum('','AVAILABLE') default NULL,
  `d22` enum('','AVAILABLE') default NULL,
  `d23` enum('','AVAILABLE') default NULL,
  `d24` enum('','AVAILABLE') default NULL,
  `d25` enum('','AVAILABLE') default NULL,
  `d26` enum('','AVAILABLE') default NULL,
  `d27` enum('','AVAILABLE') default NULL,
  `d28` enum('','AVAILABLE') default NULL,
  `d29` enum('','AVAILABLE') default NULL,
  `d30` enum('','AVAILABLE') default NULL,
  `d31` enum('','AVAILABLE') default NULL,
  `n1` enum('','AVAILABLE') default NULL,
  `n2` enum('','AVAILABLE') default NULL,
  `n3` enum('','AVAILABLE') default NULL,
  `n4` enum('','AVAILABLE') default NULL,
  `n5` enum('','AVAILABLE') default NULL,
  `n6` enum('','AVAILABLE') default NULL,
  `n7` enum('','AVAILABLE') default NULL,
  `n8` enum('','AVAILABLE') default NULL,
  `n9` enum('','AVAILABLE') default NULL,
  `n10` enum('','AVAILABLE') default NULL,
  `n11` enum('','AVAILABLE') default NULL,
  `n12` enum('','AVAILABLE') default NULL,
  `n13` enum('','AVAILABLE') default NULL,
  `n14` enum('','AVAILABLE') default NULL,
  `n15` enum('','AVAILABLE') default NULL,
  `n16` enum('','AVAILABLE') default NULL,
  `n17` enum('','AVAILABLE') default NULL,
  `n18` enum('','AVAILABLE') default NULL,
  `n19` enum('','AVAILABLE') default NULL,
  `n20` enum('','AVAILABLE') default NULL,
  `n21` enum('','AVAILABLE') default NULL,
  `n22` enum('','AVAILABLE') default NULL,
  `n23` enum('','AVAILABLE') default NULL,
  `n24` enum('','AVAILABLE') default NULL,
  `n25` enum('','AVAILABLE') default NULL,
  `n26` enum('','AVAILABLE') default NULL,
  `n27` enum('','AVAILABLE') default NULL,
  `n28` enum('','AVAILABLE') default NULL,
  `n29` enum('','AVAILABLE') default NULL,
  `n30` enum('','AVAILABLE') default NULL,
  `n31` enum('','AVAILABLE') default NULL,
  `timestamp` timestamp(14) NOT NULL,
  `submitting_node` varchar(15) NOT NULL default '',
  `expiration` date NOT NULL default '0000-00-00',
  PRIMARY KEY (`month`,`last_name`,`first_name`,`timestamp`)
) TYPE=MyISAM;

CREATE TABLE `x_avail_sheet` (
  `month` enum('JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC') NOT NULL default 'JAN',
  `last_name` varchar(32) NOT NULL default '',
  `first_name` varchar(32) NOT NULL default '',
  `email_addr` varchar(64) NOT NULL default '',
  `squad` enum('ERS','1','2','4','5','6','9','13','14','15','16','17') NOT NULL default 'ERS',
  `be_on_team_5` enum('FALSE','TRUE') NOT NULL default 'FALSE',
  `be_on_team_30` enum('FALSE','TRUE') NOT NULL default 'FALSE',
  `be_tda` enum('FALSE','TRUE') NOT NULL default 'FALSE',
  `be_als` enum('FALSE','TRUE') NOT NULL default 'FALSE',
  `num_extras` tinyint(4) default NULL,
  `note` text,
  `d1` enum('','AVAILABLE') default NULL,
  `d2` enum('','AVAILABLE') default NULL,
  `d3` enum('','AVAILABLE') default NULL,
  `d4` enum('','AVAILABLE') default NULL,
  `d5` enum('','AVAILABLE') default NULL,
  `d6` enum('','AVAILABLE') default NULL,
  `d7` enum('','AVAILABLE') default NULL,
  `d8` enum('','AVAILABLE') default NULL,
  `d9` enum('','AVAILABLE') default NULL,
  `d10` enum('','AVAILABLE') default NULL,
  `d11` enum('','AVAILABLE') default NULL,
  `d12` enum('','AVAILABLE') default NULL,
  `d13` enum('','AVAILABLE') default NULL,
  `d14` enum('','AVAILABLE') default NULL,
  `d15` enum('','AVAILABLE') default NULL,
  `d16` enum('','AVAILABLE') default NULL,
  `d17` enum('','AVAILABLE') default NULL,
  `d18` enum('','AVAILABLE') default NULL,
  `d19` enum('','AVAILABLE') default NULL,
  `d20` enum('','AVAILABLE') default NULL,
  `d21` enum('','AVAILABLE') default NULL,
  `d22` enum('','AVAILABLE') default NULL,
  `d23` enum('','AVAILABLE') default NULL,
  `d24` enum('','AVAILABLE') default NULL,
  `d25` enum('','AVAILABLE') default NULL,
  `d26` enum('','AVAILABLE') default NULL,
  `d27` enum('','AVAILABLE') default NULL,
  `d28` enum('','AVAILABLE') default NULL,
  `d29` enum('','AVAILABLE') default NULL,
  `d30` enum('','AVAILABLE') default NULL,
  `d31` enum('','AVAILABLE') default NULL,
  `n1` enum('','AVAILABLE') default NULL,
  `n2` enum('','AVAILABLE') default NULL,
  `n3` enum('','AVAILABLE') default NULL,
  `n4` enum('','AVAILABLE') default NULL,
  `n5` enum('','AVAILABLE') default NULL,
  `n6` enum('','AVAILABLE') default NULL,
  `n7` enum('','AVAILABLE') default NULL,
  `n8` enum('','AVAILABLE') default NULL,
  `n9` enum('','AVAILABLE') default NULL,
  `n10` enum('','AVAILABLE') default NULL,
  `n11` enum('','AVAILABLE') default NULL,
  `n12` enum('','AVAILABLE') default NULL,
  `n13` enum('','AVAILABLE') default NULL,
  `n14` enum('','AVAILABLE') default NULL,
  `n15` enum('','AVAILABLE') default NULL,
  `n16` enum('','AVAILABLE') default NULL,
  `n17` enum('','AVAILABLE') default NULL,
  `n18` enum('','AVAILABLE') default NULL,
  `n19` enum('','AVAILABLE') default NULL,
  `n20` enum('','AVAILABLE') default NULL,
  `n21` enum('','AVAILABLE') default NULL,
  `n22` enum('','AVAILABLE') default NULL,
  `n23` enum('','AVAILABLE') default NULL,
  `n24` enum('','AVAILABLE') default NULL,
  `n25` enum('','AVAILABLE') default NULL,
  `n26` enum('','AVAILABLE') default NULL,
  `n27` enum('','AVAILABLE') default NULL,
  `n28` enum('','AVAILABLE') default NULL,
  `n29` enum('','AVAILABLE') default NULL,
  `n30` enum('','AVAILABLE') default NULL,
  `n31` enum('','AVAILABLE') default NULL,
  `timestamp` timestamp(14) NOT NULL,
  `submitting_node` varchar(15) NOT NULL default '',
  `expiration` date NOT NULL default '0000-00-00',
  PRIMARY KEY (`month`,`last_name`,`first_name`,`timestamp`)
) TYPE=MyISAM;

