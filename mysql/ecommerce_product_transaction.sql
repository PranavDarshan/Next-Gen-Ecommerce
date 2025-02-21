-- MySQL dump 10.13  Distrib 8.0.23, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: ecommerce
-- ------------------------------------------------------
-- Server version	8.0.23

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `product_transaction`
--

DROP TABLE IF EXISTS product_transaction;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE product_transaction (
  quantity int DEFAULT NULL,
  unit_price double DEFAULT NULL,
  transaction_id int DEFAULT NULL,
  product_id int DEFAULT NULL,
  KEY transaction_id (transaction_id),
  KEY product_id (product_id),
  CONSTRAINT product_transaction_ibfk_1 FOREIGN KEY (transaction_id) REFERENCES `transaction` (transaction_id),
  CONSTRAINT product_transaction_ibfk_2 FOREIGN KEY (product_id) REFERENCES product (product_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_transaction`
--

LOCK TABLES product_transaction WRITE;
/*!40000 ALTER TABLE product_transaction DISABLE KEYS */;
INSERT INTO product_transaction VALUES (1,235,12,11),(3,235,14,2),(2,235,15,11),(6,235,16,11),(8,235,17,11),(4,235,18,11),(4,235,19,11),(4,235,20,11),(4,235,21,11),(3,250,23,17),(1,249,22,16),(1,249,24,16),(3,249,26,16),(1,235,25,11),(3,250,27,17),(1,249,28,16),(1,250,29,17),(8,249,30,16),(1,85,31,19),(6,249,32,16),(1,250,33,17),(1,249,34,16),(2,235,35,11),(1,500,36,24),(1,150,37,25),(1,150,38,25),(1,249,39,16),(4,235,40,11);
/*!40000 ALTER TABLE product_transaction ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-02-19 20:24:37
