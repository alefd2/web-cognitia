import { Client } from "@notionhq/client"
import { NotionToMarkdown } from "notion-to-md"

export const notion = new Client({
  auth: "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",
})

export const n2m = new NotionToMarkdown({ notionClient: notion })

export async function getAllPosts() {
  const posts = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID || "",
    sorts: [
      {
        property: "Published",
        direction: "descending",
      },
    ],
  })

  return posts.results
}

export type Post = {
  id: string
  cover?: {
    external?: {
      url: string
    }
    file?: {
      url: string
    }
  }
  properties: {
    Slug: {
      rich_text: Array<{
        plain_text: string
      }>
    }
    Title: {
      title: Array<{
        plain_text: string
      }>
    }
    Published: {
      date: {
        start: string
      }
    }
  }
}

export type PostWithMarkdown = {
  page: Post
  markdown: string
}

export async function getPostBySlug(slug: string): Promise<PostWithMarkdown> {
  const response = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID || "",
    filter: {
      property: "Slug",
      rich_text: {
        equals: slug,
      },
    },
  })

  const page = response.results[0] as unknown as Post
  const mdBlocks = await n2m.pageToMarkdown(page.id)
  const markdown = n2m.toMarkdownString(mdBlocks)

  return {
    page,
    markdown: markdown.parent,
  }
}
