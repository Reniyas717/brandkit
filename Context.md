Schema 
Core Design Principles

Normalize shared data and isolate subscription-specific state.

Use foreign keys to enforce brand–product–kit relationships.

Model subscription kits as mutable until confirmation.

Brand Domain Tables
brands

Stores partner brand identity and storytelling data.

Fields include name, slug, logo_url, banner_url, and description.

brand_sustainability_tags

Stores sustainability attributes linked to brands.

Fields include brand_id and tag_type.

Product Domain Tables
products

Stores sellable items belonging to a brand.

Fields include brand_id, name, description, price, and image_url.

product_metadata

Stores optional product attributes like size or material.

Fields include product_id, key, and value.

User Domain Tables
users

Stores platform user accounts.

Fields include name, email, and authentication identifiers.

Subscription Kit Tables
subscription_kits

Represents a user-created kit configuration.

Fields include user_id, status, delivery_frequency, and created_at.

subscription_kit_items

Stores products added to a kit with quantities.

Fields include kit_id, product_id, and quantity.

Delivery and Lifecycle Tables
delivery_frequencies

Stores allowed delivery intervals.

Fields include label and interval_in_days.

kit_activity_log

Tracks lifecycle events like creation and confirmation.

Fields include kit_id, action_type, and timestamp.

Relationship Summary

One brand owns many products.

One user owns many subscription kits.

One subscription kit contains many products via kit items.

Sustainability tags and metadata extend brands and products without duplication.

Persistence Outcome

Branding pages are fully data-driven from brand and product tables.

Subscription kits are editable drafts until confirmed.

Schema supports future expansion like orders, payments, and analytics.