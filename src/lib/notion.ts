import { Client } from "@notionhq/client"
import { NotionToMarkdown } from "notion-to-md"

interface NotionBaseTypes {
  Text: {
    plain_text: string
    text: { content: string }
  }
  Date: {
    start: string
    end: string | null
  }
  Media: {
    type: "external" | "file"
    external?: { url: string }
    file?: { url: string }
  }
}

interface NotionPageProperties {
  slug: { type: string; rich_text: NotionBaseTypes["Text"][] }
  subtitle: { type: string; rich_text: NotionBaseTypes["Text"][] }
  ID: { type: string; number: number }
  files: { type: string; files: Array<{ name: string; url: string }> }
  tags: { type: string; multi_select: Array<{ name: string; color: string }> }
  author: { type: string; people: Array<{ id: string; name: string }> }
  createdAt: { type: string; date: NotionBaseTypes["Date"] }
  published: { type: string; checkbox: boolean }
  title: { type: string; title: NotionBaseTypes["Text"][] }
}

export interface NotionPage {
  object: "page"
  id: string
  created_time: string
  last_edited_time: string
  created_by: { object: "user"; id: string }
  last_edited_by: { object: "user"; id: string }
  cover: NotionBaseTypes["Media"] | null
  icon: (NotionBaseTypes["Media"] & { type: "emoji"; emoji?: string }) | null
  parent: { type: "database_id"; database_id: string }
  archived: boolean
  in_trash: boolean
  properties: NotionPageProperties
  url: string
  public_url: string | null
}

export interface Post {
  id: string
  slug: string
  title: string
  subtitle?: string
  published: boolean
  createdAt: string
  files: {
    name: string
    url: string
  }
  tags: [
    {
      name: string
      color: string
    }
  ]
}

export interface PostWithMarkdown {
  page: Post
  markdown: string
}

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
})

const n2m = new NotionToMarkdown({ notionClient: notion })

export async function getAllPublished(): Promise<Post[]> {
  const response = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID!,
    filter: {
      property: "published",
      checkbox: {
        equals: true,
      },
    },
    sorts: [
      {
        property: "createdAt",
        direction: "descending",
      },
    ],
  })

  // Mapeie os resultados para o tipo Post
  const posts: Post[] = response.results.map((page: any) => {
    const properties = page.properties

    const tags = properties.tags.multi_select.map((tag: any) => ({
      name: tag.name,
      color: tag.color,
    }))

    const data = {
      id: page.id,
      slug: properties.slug.rich_text[0]?.plain_text || "",
      title: properties.title.title[0]?.plain_text || "",
      subtitle: properties.subtitle.rich_text[0].text.content || "",
      published: properties.published.checkbox,
      createdAt: properties.createdAt.date.start,
      files: {
        name: properties.files.files[0]?.name || "",
        url: properties.files.files[0]?.file.url || "",
      },
      tags: tags,
    }

    return data
  })

  return posts
}

export async function getSinglePost(
  slug: string
): Promise<PostWithMarkdown | null> {
  const response = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID!,
    filter: {
      property: "slug",
      rich_text: {
        equals: slug,
      },
    },
  })

  if (response.results.length === 0) {
    return null
  }

  const page = response.results[0] as any
  const properties = page.properties

  const tags = properties.tags.multi_select.map((tag: any) => ({
    name: tag.name,
    color: tag.color,
  }))

  const post: Post = {
    id: page.id,
    slug: properties.slug.rich_text[0]?.plain_text || "",
    title: properties.title.title[0]?.plain_text || "",
    published: properties.published.checkbox,
    createdAt: properties.createdAt.date.start,
    files: {
      name: properties.files.files[0]?.name || "",
      url: properties.files.files[0]?.file.url || "",
    },
    tags: tags,
  }

  const mdBlocks = await n2m.pageToMarkdown(post.id)
  const markdown = n2m.toMarkdownString(mdBlocks)

  return {
    page: post,
    markdown: markdown.parent,
  }
}
