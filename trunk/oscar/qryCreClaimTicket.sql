CREATE TABLE claim_ticket
   (
   digest CHAR (32) not null,
   requestor_name VARCHAR (64) not null,
   requestor_email_address VARCHAR (64) not null,
   status ENUM("AWAITING-APPROVAL","APPROVED") not null,
   expiration DATE not null,
   PRIMARY KEY (digest)
   )
