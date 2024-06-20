CREATE TABLE `users` (
	`pk` serial AUTO_INCREMENT NOT NULL,
	`id` varchar(191) NOT NULL DEFAULT (uuid()),
	`email` varchar(255) NOT NULL,
	`hashed_password` text NOT NULL,
	`fullname` varchar(255),
	`dob` date,
	`nric` varchar(20),
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`deleted_at` timestamp,
	CONSTRAINT `users_pk` PRIMARY KEY(`pk`),
	CONSTRAINT `users_id_unique` UNIQUE(`id`),
	CONSTRAINT `users_email_unique` UNIQUE(`email`)
);
