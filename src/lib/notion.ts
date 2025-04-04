import { Client } from '@notionhq/client';
import { NotionToMarkdown } from 'notion-to-md';

export const notion = new Client({
  auth: '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',
});

export const n2m = new NotionToMarkdown({ notionClient: notion });

export async function getAllPosts() {
  const posts = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID || '',
    sorts: [
      {
        property: 'Published',
        direction: 'descending',
      },
    ],
  });

  return posts.results;
}

export async function getPostBySlug(slug: string) {
  const response = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID || '',
    filter: {
      property: 'Slug',
      rich_text: {
        equals: slug,
      },
    },
  });

  const page = response.results[0];
  const mdBlocks = await n2m.pageToMarkdown(page.id);
  const markdown = n2m.toMarkdownString(mdBlocks);

  return {
    page,
    markdown,
  };
}