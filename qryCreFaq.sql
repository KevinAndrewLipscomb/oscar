# phpMyAdmin MySQL-Dump
# version 2.2.0rc1
# http://phpwizard.net/phpMyAdmin/
# http://phpmyadmin.sourceforge.net/ (download page)
#
# Host: localhost
# Generation Time: October 18, 2001, 1:55 pm
# Server version: 3.23.32
# PHP Version: 4.0.6
# Database : oscar
# --------------------------------------------------------

#
# Table structure for tables 'trusted_user' and 'x_trusted_user'
#

CREATE TABLE `trusted_user` (
  `email_address` varchar(64) NOT NULL default '',
  PRIMARY KEY (`email_address`)
) TYPE=MyISAM;

CREATE TABLE `x_trusted_user` (
  `email_address` varchar(64) NOT NULL default '',
  PRIMARY KEY (`email_address`)
) TYPE=MyISAM;
# phpMyAdmin MySQL-Dump
# version 2.2.2
# http://phpwizard.net/phpMyAdmin/
# http://phpmyadmin.sourceforge.net/ (download page)
#
# Host: localhost
# Generation Time: Feb 07, 2002 at 07:46 AM
# Server version: 3.23.46
# PHP Version: 4.0.6
# Database : `oscar`
# --------------------------------------------------------

#
# Table structure for tables `faq` and `x_faq`
#

CREATE TABLE faq (
  position tinyint(3) unsigned NOT NULL default '0',
  question tinytext NOT NULL,
  answer text NOT NULL,
  PRIMARY KEY  (position)
) TYPE=MyISAM;

    
CREATE TABLE x_faq (
  position tinyint(3) unsigned NOT NULL default '0',
  question tinytext NOT NULL,
  answer text NOT NULL,
  PRIMARY KEY  (position)
) TYPE=MyISAM;
