import ReactDOMServer from 'react-dom/server'
import { Feed, Item } from 'feed' // Import Item for clarity
import { mkdir, writeFile } from 'fs/promises'
import type { NextRouter } from 'next/router' // Only for type, not used at runtime

import { getAllArticles, Article } from './getAllArticles' // Assuming Article type is exported from here

interface Author {
  name: string;
  email: string;
}

export async function generateRssFeed(): Promise<void> {
  const articles = await getAllArticles()
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL

  if (!siteUrl) {
    console.warn(
      'NEXT_PUBLIC_SITE_URL is not defined. RSS feed generation might be incomplete.'
    )
    // Depending on strictness, you might want to throw an error or return
  }

  const author: Author = {
    name: 'Spencer Sharp',
    email: 'spencer@planetaria.tech',
  }

  const feed = new Feed({
    title: author.name,
    description: 'Your blog description', // Consider making this configurable
    author,
    id: siteUrl || '',
    link: siteUrl || '',
    image: `${siteUrl || ''}/favicon.ico`,
    favicon: `${siteUrl || ''}/favicon.ico`,
    copyright: `All rights reserved ${new Date().getFullYear()}`,
    feedLinks: {
      rss2: `${siteUrl || ''}/rss/feed.xml`,
      json: `${siteUrl || ''}/rss/feed.json`,
    },
  })

  for (const article of articles) {
    const url = `${siteUrl || ''}/articles/${article.slug}`
    // Assuming article.component is a React functional component
    // and it expects an isRssFeed prop.
    // The type for article.component should be React.ComponentType<{ isRssFeed: boolean; }>
    // This will be better defined when we type getAllArticles.ts
    const RssArticleComponent = article.component as React.ComponentType<{ isRssFeed: boolean }>;

    const html = ReactDOMServer.renderToStaticMarkup(
      <RssArticleComponent isRssFeed />
    )

    const item: Item = { // Using Item type from 'feed'
      title: article.title,
      id: url,
      link: url,
      description: article.description,
      content: html,
      author: [author],
      contributor: [author],
      date: new Date(article.date),
    }
    feed.addItem(item)
  }

  await mkdir('./public/rss', { recursive: true })
  await Promise.all([
    writeFile('./public/rss/feed.xml', feed.rss2(), 'utf8'),
    writeFile('./public/rss/feed.json', feed.json1(), 'utf8'),
  ])
}
