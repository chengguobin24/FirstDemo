CREATE TABLE `videos` (
	`id` text PRIMARY KEY NOT NULL,
	`youtube_id` text NOT NULL,
	`title` text NOT NULL,
	`description` text DEFAULT '' NOT NULL,
	`category` text NOT NULL,
	`status` text DEFAULT 'hidden' NOT NULL,
	`published_at` integer,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	`updated_by` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `videos_youtube_id_unique` ON `videos` (`youtube_id`);--> statement-breakpoint
CREATE INDEX `videos_status_published_idx` ON `videos` (`status`,`published_at`);--> statement-breakpoint
CREATE INDEX `videos_category_published_idx` ON `videos` (`category`,`published_at`);