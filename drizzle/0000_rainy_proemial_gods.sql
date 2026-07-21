CREATE TABLE `gallery_items` (
	`id` text PRIMARY KEY NOT NULL,
	`owner_id` text NOT NULL,
	`created_at` integer NOT NULL,
	`source_type` text NOT NULL,
	`title` text NOT NULL,
	`asset_key` text NOT NULL,
	`preview_key` text NOT NULL,
	`preview_width` integer NOT NULL,
	`preview_height` integer NOT NULL,
	`base_tilt` real DEFAULT 0 NOT NULL,
	`layout_x` real NOT NULL,
	`layout_y` real NOT NULL,
	`layout_width` real NOT NULL,
	`layout_height` real NOT NULL,
	`layout_rotation` real DEFAULT 0 NOT NULL,
	`layout_z_index` integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE INDEX `gallery_items_owner_created_idx` ON `gallery_items` (`owner_id`,`created_at`);