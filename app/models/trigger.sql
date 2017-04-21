CREATE DEFINER=`root`@`localhost` TRIGGER `event_count_change` 
AFTER DELETE ON `payment` FOR EACH ROW 
BEGIN 
    DECLARE temp INT;
    SET temp = (SELECT ticket.Cipher FROM ticket 
                JOIN paymentforticket ON ticket.Cipher = paymentforticket.Cipher 
                JOIN payment ON paymentforticket.PayID = payment.payID 
                WHERE payment.payID = old.payID); 
    UPDATE ticket SET counts = counts + 1 WHERE Cipher = temp; 
END