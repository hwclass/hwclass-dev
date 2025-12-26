// src/content/config.ts
import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.date(),
    category: z.string(),
    readTime: z.string().optional(),
    image: z.string().optional(),
    draft: z.boolean().default(false)
  })
});

export const collections = {
  blog: blogCollection,
};