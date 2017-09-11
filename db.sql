-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Aug 16, 2017 at 01:35 PM
-- Server version: 10.1.19-MariaDB
-- PHP Version: 5.6.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `notesapp`
--

-- --------------------------------------------------------

--
-- Table structure for table `follow_system`
--

CREATE TABLE `follow_system` (
  `follow_id` int(11) NOT NULL,
  `follow_by` int(11) NOT NULL,
  `follow_by_username` varchar(32) NOT NULL,
  `follow_to` int(11) NOT NULL,
  `follow_to_username` varchar(32) NOT NULL,
  `follow_time` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `follow_system`
--

INSERT INTO `follow_system` (`follow_id`, `follow_by`, `follow_by_username`, `follow_to`, `follow_to_username`, `follow_time`) VALUES
(14, 8, 'coldplay', 6, 'faiyaz', '1501010150463'),
(16, 8, 'coldplay', 5, 'takkar', '1501011954639'),
(29, 7, 'ghalib', 5, 'takkar', '1501092849849'),
(39, 5, 'takkar', 6, 'faiyaz', '1502801315146'),
(43, 5, 'takkar', 7, 'ghalib', '1502801363666');

-- --------------------------------------------------------

--
-- Table structure for table `likes`
--

CREATE TABLE `likes` (
  `like_id` int(11) NOT NULL,
  `like_by` int(11) NOT NULL,
  `like_by_username` varchar(32) NOT NULL,
  `note_id` int(11) NOT NULL,
  `like_time` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `notes`
--

CREATE TABLE `notes` (
  `note_id` int(11) NOT NULL,
  `user` int(11) NOT NULL,
  `username` varchar(32) NOT NULL,
  `title` varchar(200) NOT NULL,
  `content` text NOT NULL,
  `note_time` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `notes`
--

INSERT INTO `notes` (`note_id`, `user`, `username`, `title`, `content`, `note_time`) VALUES
(61, 6, 'faiyaz', 'Untitled note', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry''s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', '1497022376821'),
(70, 6, 'faiyaz', 'Miracle', 'For you!! and me', '1497043496669'),
(73, 8, 'coldplay', 'coldplay', '.....', '1497279792645'),
(74, 8, 'coldplay', 'k', 'k', '1497279939388'),
(75, 7, 'ghalib', 'Note...', '???????', '1497357617034'),
(100, 5, 'takkar', 'one', 'j', '1502732101700'),
(101, 5, 'takkar', 'two', 'jj', '1502732106616'),
(102, 5, 'takkar', 'three', 'jjkmkm', '1502732115644'),
(103, 5, 'takkar', 'fourrrr', 'g', '1502732123371'),
(132, 5, 'takkar', 'five', 'hj', '1502879932911'),
(141, 5, 'takkar', 'six', 'h', '1502882974135');

-- --------------------------------------------------------

--
-- Table structure for table `profile_views`
--

CREATE TABLE `profile_views` (
  `view_id` int(11) NOT NULL,
  `view_by` int(11) NOT NULL,
  `view_by_username` varchar(32) NOT NULL,
  `view_to` int(11) NOT NULL,
  `view_time` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `profile_views`
--

INSERT INTO `profile_views` (`view_id`, `view_by`, `view_by_username`, `view_to`, `view_time`) VALUES
(32, 5, 'takkar', 6, '1500921835026'),
(33, 5, 'takkar', 6, '1500922249480'),
(34, 5, 'takkar', 7, '1500924838877'),
(35, 5, 'takkar', 8, '1500924855217'),
(36, 5, 'takkar', 6, '1500992772869'),
(37, 5, 'takkar', 6, '1500992897841'),
(38, 5, 'takkar', 6, '1500993317753'),
(39, 5, 'takkar', 6, '1500993507892'),
(40, 5, 'takkar', 6, '1500993649374'),
(41, 5, 'takkar', 6, '1500993826237'),
(42, 5, 'takkar', 6, '1500994322811'),
(43, 5, 'takkar', 6, '1500994543604'),
(44, 5, 'takkar', 6, '1500995117840'),
(45, 5, 'takkar', 6, '1500995653209'),
(46, 5, 'takkar', 6, '1500995874191'),
(47, 5, 'takkar', 6, '1500996103844'),
(48, 5, 'takkar', 6, '1500996236677'),
(49, 5, 'takkar', 6, '1500996654489'),
(50, 5, 'takkar', 6, '1500996960369'),
(51, 5, 'takkar', 6, '1500997489661'),
(52, 5, 'takkar', 6, '1500998036025'),
(53, 5, 'takkar', 6, '1500998158919'),
(54, 5, 'takkar', 6, '1500998352473'),
(55, 5, 'takkar', 6, '1500998472529'),
(56, 5, 'takkar', 6, '1500998757389'),
(57, 5, 'takkar', 6, '1500999316680'),
(58, 5, 'takkar', 6, '1500999632354'),
(59, 5, 'takkar', 6, '1501000899577'),
(60, 5, 'takkar', 6, '1501001027676'),
(61, 5, 'takkar', 6, '1501001186939'),
(62, 5, 'takkar', 6, '1501001347797'),
(63, 5, 'takkar', 6, '1501002114586'),
(64, 5, 'takkar', 6, '1501002397194'),
(65, 5, 'takkar', 6, '1501002586114'),
(66, 5, 'takkar', 6, '1501002963656'),
(67, 5, 'takkar', 6, '1501003095544'),
(68, 5, 'takkar', 6, '1501003321896'),
(69, 5, 'takkar', 6, '1501003622145'),
(70, 5, 'takkar', 6, '1501003988175'),
(71, 5, 'takkar', 6, '1501004137852'),
(72, 5, 'takkar', 6, '1501004427165'),
(73, 5, 'takkar', 6, '1501004628136'),
(74, 5, 'takkar', 6, '1501004997477'),
(75, 5, 'takkar', 6, '1501005242285'),
(76, 5, 'takkar', 6, '1501009977584'),
(77, 8, 'faiyaz', 6, '1501010011470'),
(78, 8, 'faiyaz', 6, '1501010143417'),
(79, 8, 'faiyaz', 6, '1501010373553'),
(80, 8, 'faiyaz', 6, '1501010572762'),
(81, 8, 'faiyaz', 6, '1501010818531'),
(82, 8, 'takkar', 5, '1501010836673'),
(83, 8, 'faiyaz', 6, '1501010987216'),
(84, 8, 'faiyaz', 6, '1501011297474'),
(85, 8, 'faiyaz', 6, '1501011632772'),
(86, 8, 'takkar', 5, '1501011651818'),
(87, 8, 'faiyaz', 6, '1501011948005'),
(88, 5, 'takkar', 6, '1501060667169'),
(89, 5, 'takkar', 8, '1501062832435'),
(90, 5, 'takkar', 7, '1501063708764'),
(91, 5, 'takkar', 6, '1501078211644'),
(92, 5, 'takkar', 7, '1501078221725'),
(93, 5, 'takkar', 8, '1501078229858'),
(94, 5, 'takkar', 8, '1501078712816'),
(95, 5, 'takkar', 6, '1501078887815'),
(96, 5, 'takkar', 7, '1501078891603'),
(97, 5, 'takkar', 8, '1501078894745'),
(98, 9, 'ghalib', 7, '1501230682653'),
(99, 5, 'takkar', 7, '1501230762107'),
(100, 5, 'takkar', 8, '1501253259906'),
(101, 5, 'takkar', 7, '1501254287942'),
(102, 5, 'takkar', 7, '1501254506340'),
(103, 5, 'faiyaz', 6, '1501268109623'),
(104, 5, 'faiyaz', 6, '1501268215897'),
(105, 7, 'takkar', 5, '1501513737354'),
(106, 5, 'ghalib', 7, '1501515252540'),
(107, 5, 'faiyaz', 6, '1502451381587'),
(108, 5, 'faiyaz', 6, '1502451550839'),
(109, 5, 'faiyaz', 6, '1502451732859'),
(110, 5, 'ghalib', 7, '1502800636947'),
(111, 5, 'faiyaz', 6, '1502819156273'),
(112, 5, 'faiyaz', 6, '1502880013682');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(32) NOT NULL,
  `email` varchar(500) NOT NULL,
  `password` varchar(500) NOT NULL,
  `bio` varchar(500) NOT NULL,
  `email_verified` enum('yes','no') NOT NULL DEFAULT 'no',
  `joined` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `bio`, `email_verified`, `joined`) VALUES
(5, 'takkar', 'www.shtakkar@gmail.com', '$2a$10$sdy1uFQqpBtk8QbAQ61YqehQ73gksod9G8XbA3fqv7lcPEkffgDla', 'Developer of Instagram.', 'yes', '1497128558168'),
(6, 'faiyaz', 'faiyaz@gmail.com', '$2a$10$HK.w9QLoBkkp2Tfx12FxKuaJWj2BkBPCR17xZKfk3sJFIVWfj7hma', 'Hello world!!', 'yes', '1497128554668'),
(7, 'ghalib', 'ghalib@gmail.com', '$2a$10$S22pBWFlb1t1ZZnNr1pAFOVYBmbo7t.dNdD9JfB0sPsec87sEVsi.', '', 'yes', '1497128558668'),
(8, 'coldplay', 'coldplay@gmail.com', '$2a$10$vSjEiBgSckcyBjZCV1AdV.x7e4n5jMte3wBlUWAH1GIEtVMfWlGdW', '', 'yes', '1497279682801');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `follow_system`
--
ALTER TABLE `follow_system`
  ADD PRIMARY KEY (`follow_id`);

--
-- Indexes for table `likes`
--
ALTER TABLE `likes`
  ADD PRIMARY KEY (`like_id`);

--
-- Indexes for table `notes`
--
ALTER TABLE `notes`
  ADD PRIMARY KEY (`note_id`);

--
-- Indexes for table `profile_views`
--
ALTER TABLE `profile_views`
  ADD PRIMARY KEY (`view_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `follow_system`
--
ALTER TABLE `follow_system`
  MODIFY `follow_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;
--
-- AUTO_INCREMENT for table `likes`
--
ALTER TABLE `likes`
  MODIFY `like_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=105;
--
-- AUTO_INCREMENT for table `notes`
--
ALTER TABLE `notes`
  MODIFY `note_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=147;
--
-- AUTO_INCREMENT for table `profile_views`
--
ALTER TABLE `profile_views`
  MODIFY `view_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=113;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
