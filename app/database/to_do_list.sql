-- phpMyAdmin SQL Dump
-- version 5.0.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 10, 2021 at 12:35 PM
-- Server version: 10.4.14-MariaDB
-- PHP Version: 7.2.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `to_do_list`
--

-- --------------------------------------------------------

--
-- Table structure for table `to_do_list_table`
--

CREATE TABLE `to_do_list_table` (
  `id` int(11) NOT NULL,
  `work_name` varchar(500) COLLATE utf8_unicode_ci DEFAULT NULL,
  `starting_date` datetime NOT NULL,
  `ending_date` datetime NOT NULL,
  `status` smallint(6) NOT NULL,
  `delete_flg` tinyint(4) NOT NULL DEFAULT 0,
  `insert_datetime` datetime NOT NULL,
  `update_datetime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `to_do_list_table`
--

INSERT INTO `to_do_list_table` (`id`, `work_name`, `starting_date`, `ending_date`, `status`, `delete_flg`, `insert_datetime`, `update_datetime`) VALUES
(1, 'work 1', '2021-12-09 14:11:37', '2021-12-09 14:11:37', 1, 0, '2021-12-09 14:11:37', '2021-12-09 14:11:37'),
(2, 'work 2', '2021-12-08 14:11:37', '2021-12-08 14:11:37', 1, 0, '2021-12-09 14:11:37', '2021-12-09 14:11:37'),
(3, 'work 3', '2021-12-10 14:11:37', '2021-12-10 14:11:37', 1, 0, '2021-12-09 14:11:37', '2021-12-09 14:11:37'),
(4, 'work 4', '2021-12-10 14:00:41', '2021-12-10 14:00:41', 2, 0, '2021-12-10 14:00:41', '2021-12-10 14:00:41'),
(10, '1223', '2021-12-10 14:36:49', '2021-12-10 14:36:49', 1, 0, '2021-12-10 14:36:49', '2021-12-10 14:36:49'),
(11, 'qqq', '2021-12-10 14:37:19', '2021-12-10 14:37:19', 1, 0, '2021-12-10 14:37:19', '2021-12-10 14:37:19'),
(12, 's', '2021-12-10 14:40:01', '2021-12-10 14:40:01', 1, 0, '2021-12-10 14:40:01', '2021-12-10 14:40:01'),
(13, 'work 5s', '2021-12-10 14:47:04', '2021-12-10 14:47:04', 1, 0, '2021-12-10 14:47:04', '2021-12-10 14:47:04'),
(14, '1112', '2021-12-10 14:47:44', '2021-12-10 14:47:44', 1, 0, '2021-12-10 14:47:44', '2021-12-10 14:47:44'),
(15, '123124', '2021-12-11 14:50:40', '2021-12-11 14:50:40', 1, 0, '2021-12-10 14:50:49', '2021-12-10 14:50:49'),
(16, '1223', '2021-12-08 14:52:21', '2021-12-08 14:52:21', 1, 0, '2021-12-10 14:52:53', '2021-12-10 14:52:53'),
(17, 'work 9ss', '0000-00-00 00:00:00', '2021-11-29 00:00:00', 3, 0, '2021-12-10 15:30:22', '2021-12-10 15:30:22'),
(18, 'safasfaad', '0000-00-00 00:00:00', '2021-12-07 00:00:00', 1, 0, '2021-12-10 15:33:14', '2021-12-10 17:11:21'),
(19, 'work 1045', '2021-12-12 13:00:00', '2021-12-13 13:00:00', 3, 0, '2021-12-10 15:34:16', '2021-12-10 18:32:44'),
(21, 'sdsfdsgdsgd', '0000-00-00 00:00:00', '2021-12-06 00:00:00', 2, 0, '2021-12-10 15:37:25', '2021-12-10 15:37:25'),
(22, 'minh2', '2021-12-11 00:00:00', '2021-12-11 00:00:00', 1, 0, '2021-12-10 17:59:02', '2021-12-10 17:59:02'),
(23, 'minh3', '2021-12-17 00:00:00', '2021-12-18 00:00:00', 1, 0, '2021-12-10 17:59:36', '2021-12-10 17:59:36'),
(26, 'minhnn22', '2021-12-14 00:00:00', '2021-12-15 00:00:00', 1, 0, '2021-12-10 18:32:57', '2021-12-10 18:32:57');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `to_do_list_table`
--
ALTER TABLE `to_do_list_table`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `to_do_list_table`
--
ALTER TABLE `to_do_list_table`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
