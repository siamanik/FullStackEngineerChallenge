---- drop ----
DROP TABLE IF EXISTS `employees`;

---- create ----
CREATE TABLE `employees` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) UNIQUE COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `admin` tinyint(1) DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `hr`.`employees` (`email`, `password`, `name`, `admin`, `createdAt`, `updatedAt`) VALUES ('admin@test.com', '$2b$10$Lma6yrhRIfwT4e8ptcl8quIyxM2DgCq.ljfc4N6uS3ueu.ExN.mxq', 'Admin', '1', '2021-05-30 09:14:19', '2021-05-30 11:39:31');
