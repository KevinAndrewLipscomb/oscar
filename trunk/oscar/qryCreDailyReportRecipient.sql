# phpMyAdmin MySQL-Dump
# version 2.2.4
# http://phpwizard.net/phpMyAdmin/
# http://phpmyadmin.sourceforge.net/ (download page)
#
# Host: localhost
# Generation Time: Oct 05, 2002 at 03:04 PM
# Server version: 3.23.46
# PHP Version: 4.2.3
# Database : `oscar`
# --------------------------------------------------------

# $Id$

#
# Table structure for tables `daily_report_recipient` and `x_daily_report_recipient`
#

CREATE TABLE daily_report_recipient (
  email_address varchar(64) NOT NULL default '',
  PRIMARY KEY  (email_address)
) TYPE=MyISAM;

CREATE TABLE x_daily_report_recipient (
  email_address varchar(64) NOT NULL default '',
  PRIMARY KEY  (email_address)
) TYPE=MyISAM;
