import { index, integer, real, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const galleryItems = sqliteTable(
  "gallery_items",
  {
    id: text("id").primaryKey(),
    ownerId: text("owner_id").notNull(),
    createdAt: integer("created_at").notNull(),
    sourceType: text("source_type", {
      enum: ["text", "svg", "image"],
    }).notNull(),
    title: text("title").notNull(),
    assetKey: text("asset_key").notNull(),
    previewKey: text("preview_key").notNull(),
    previewWidth: integer("preview_width").notNull(),
    previewHeight: integer("preview_height").notNull(),
    baseTilt: real("base_tilt").notNull().default(0),
    layoutX: real("layout_x").notNull(),
    layoutY: real("layout_y").notNull(),
    layoutWidth: real("layout_width").notNull(),
    layoutHeight: real("layout_height").notNull(),
    layoutRotation: real("layout_rotation").notNull().default(0),
    layoutZIndex: integer("layout_z_index").notNull().default(0),
  },
  (table) => [
    index("gallery_items_owner_created_idx").on(
      table.ownerId,
      table.createdAt,
    ),
  ],
);
