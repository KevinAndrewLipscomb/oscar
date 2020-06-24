START TRANSACTION
;
delete from special_event_avail where shift_id in (select id from special_event_shift where special_event_id > 6)
;
delete from special_event_shift where special_event_id > 6
;
delete from special_event where id > 6
;
COMMIT