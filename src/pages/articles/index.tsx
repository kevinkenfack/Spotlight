import Head from 'next/head'
import React from 'react' // Import React
import type { GetStaticProps, NextPage } from 'next' // Import NextPage and GetStaticProps

import { Card } from '@/components/Card'
import { SimpleLayout } from '@/components/SimpleLayout'
import { getAllArticles, Article as FullArticle } from '@/lib/getAllArticles' // Import Article type
import { formatDate } from '@/lib/formatDate'

// Define the shape of the article data passed to the page and Article component
// This excludes the 'component' property from the FullArticle type.
type ArticleForPage = Omit<FullArticle, 'component'>;

// Props for the internal Article component
interface ArticleProps {
  article: ArticleForPage;
}

const ArticleComponent: React.FC<ArticleProps> = ({ article }) => {
  return (
    <article className="md:grid md:grid-cols-4 md:items-baseline">
      <Card className="md:col-span-3">
        <Card.Title href={`/articles/${article.slug}`}>
          {article.title}
        </Card.Title>
        <Card.Eyebrow
          as="time"
          dateTime={article.date}
          className="md:hidden"
          decorate
        >
          {formatDate(article.date)}
        </Card.Eyebrow>
        <Card.Description>{article.description}</Card.Description>
        <Card.Cta>Read article</Card.Cta>
      </Card>
      <Card.Eyebrow
        as="time"
        dateTime={article.date}
        className="mt-1 hidden md:block"
      >
        {formatDate(article.date)}
      </Card.Eyebrow>
    </article>
  )
}

// Props for the ArticlesIndex page component
interface ArticlesIndexProps {
  articles: ArticleForPage[];
}

const ArticlesIndex: NextPage<ArticlesIndexProps> = ({ articles }) => {
  return (
    <>
      <Head>
        <title>Articles - Spencer Sharp</title>
        <meta
          name="description"
          content="All of my long-form thoughts on programming, leadership, product design, and more, collected in chronological order."
        />
      </Head>
      <SimpleLayout
        title="Writing on software design, company building, and the aerospace industry."
        intro="All of my long-form thoughts on programming, leadership, product design, and more, collected in chronological order."
      >
        <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
          <div className="flex max-w-3xl flex-col space-y-16">
            {articles.map((article) => (
              <ArticleComponent key={article.slug} article={article} />
            ))}
          </div>
        </div>
      </SimpleLayout>
    </>
  )
}

export default ArticlesIndex;

export const getStaticProps: GetStaticProps<ArticlesIndexProps> = async () => {
  const articles = (await getAllArticles()).map(
    ({ component, ...meta }): ArticleForPage => meta
  );
  return {
    props: {
      articles,
    },
  }
}
