import Head from 'next/head'
import React from 'react' // Import React
import type { NextPage } from 'next'

import { SimpleLayout } from '@/components/SimpleLayout' // Already typed

const ThankYou: NextPage = () => { // This page doesn't have custom props
  return (
    <>
      <Head>
        <title>You’re subscribed - Spencer Sharp</title>
        <meta
          name="description"
          content="Thanks for subscribing to my newsletter."
        />
      </Head>
      <SimpleLayout
        title="Thanks for subscribing."
        intro="I’ll send you an email any time I publish a new blog post, release a new project, or have anything interesting to share that I think you’d want to hear about. You can unsubscribe at any time, no hard feelings."
      />
    </>
  )
}

export default ThankYou;
