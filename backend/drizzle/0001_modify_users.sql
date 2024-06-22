ALTER TABLE `users` ADD `login_trial` int DEFAULT 0;--> statement-breakpoint
ALTER TABLE `users` ADD `blocked_at` timestamp;