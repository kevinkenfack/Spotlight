import glob from 'fast-glob'
import * as path from 'path'
import React from 'react' // Needed for React.ComponentType

// The meta data from MDX frontmatter
interface ArticleMeta {
  title: string;
  description: string;
  date: string; // Dates in frontmatter are usually strings
  // Add any other expected meta properties
}

// Define the main Article type
export interface Article {
  slug: string;
  title: string;
  description: string;
  date: string;
  component: React.ComponentType<any>; // Using any for component props for now
  // Add other properties from meta if they exist
}

async function importArticle(articleFilename: string): Promise<Article> {
  // Dynamically import the MDX module
  // The imported module will have a 'meta' object and a 'default' React component
  const module = await import(`../pages/articles/${articleFilename}`)
  
  const meta = module.meta as ArticleMeta; // Type assertion for meta
  const component = module.default as React.ComponentType<any>; // Type assertion for component

  return {
    slug: articleFilename.replace(/(\/index)?\.mdx$/, ''),
    ...meta,
    component,
  }
}

export async function getAllArticles(): Promise<Article[]> {
  const articleFilenames: string[] = await glob(['*.mdx', '*/index.mdx'], {
    cwd: path.join(process.cwd(), 'src/pages/articles'),
  })

  const articles: Article[] = await Promise.all(
    articleFilenames.map(importArticle)
  )

  // Sort articles by date in descending order
  return articles.sort((a, z) => new Date(z.date).getTime() - new Date(a.date).getTime())
}
