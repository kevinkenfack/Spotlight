import Head from 'next/head'
import React from 'react' // Import React
import type { NextPage } from 'next'

import { Card } from '@/components/Card' // Already typed
import { Section } from '@/components/Section' // Already typed
import { SimpleLayout } from '@/components/SimpleLayout' // Already typed

// --- Type Definitions ---

interface SpeakingSectionProps {
  title: string;
  children: React.ReactNode;
  // SectionProps are { title: string; children: React.ReactNode; }
  // Passing ...props to Section means we are passing title and children.
  // Since title is explicit, we can omit it from what ...props might contain for clarity,
  // but Section component itself only expects title and children.
  // Other HTML attributes would only apply if Section rendered a native HTML element directly.
  // For simplicity, we can assume ...props doesn't add anything beyond what Section expects.
}

const SpeakingSection: React.FC<SpeakingSectionProps> = ({
  children,
  title,
  ...props // props will be passed to Section, which expects 'title' and 'children'
}) => {
  // Pass the title explicitly to Section. Any other props in ...props would be passed too.
  return (
    <Section title={title} {...props}>
      <div className="space-y-16">{children}</div>
    </Section>
  )
}

interface AppearanceProps {
  title: string;
  description: string;
  event: string;
  cta: string;
  href: string; // Assuming href is always a string for Card.Title
}

const Appearance: React.FC<AppearanceProps> = ({
  title,
  description,
  event,
  cta,
  href,
}) => {
  return (
    <Card as="article">
      <Card.Title as="h3" href={href}>
        {title}
      </Card.Title>
      <Card.Eyebrow decorate>{event}</Card.Eyebrow>
      <Card.Description>{description}</Card.Description>
      <Card.Cta>{cta}</Card.Cta>
    </Card>
  )
}

const Speaking: NextPage = () => { // This page doesn't have custom props
  return (
    <>
      <Head>
        <title>Speaking - Spencer Sharp</title>
        <meta
          name="description"
          content="I’ve spoken at events all around the world and been interviewed for many podcasts."
        />
      </Head>
      <SimpleLayout
        title="I’ve spoken at events all around the world and been interviewed for many podcasts."
        intro="One of my favorite ways to share my ideas is live on stage, where there’s so much more communication bandwidth than there is in writing, and I love podcast interviews because they give me the opportunity to answer questions instead of just present my opinions."
      >
        <div className="space-y-20">
          <SpeakingSection title="Conferences">
            <Appearance
              href="#" // Placeholder link
              title="In space, no one can watch you stream — until now"
              description="A technical deep-dive into HelioStream, the real-time streaming library I wrote for transmitting live video back to Earth."
              event="SysConf 2021"
              cta="Watch video"
            />
            <Appearance
              href="#" // Placeholder link
              title="Lessons learned from our first product recall"
              description="They say that if you’re not embarassed by your first version, you’re doing it wrong. Well when you’re selling DIY space shuttle kits it turns out it’s a bit more complicated."
              event="Business of Startups 2020"
              cta="Watch video"
            />
          </SpeakingSection>
          <SpeakingSection title="Podcasts">
            <Appearance
              href="#" // Placeholder link
              title="Using design as a competitive advantage"
              description="How we used world-class visual design to attract a great team, win over customers, and get more press for Planetaria."
              event="Encoding Design, July 2022"
              cta="Listen to podcast"
            />
            <Appearance
              href="#" // Placeholder link
              title="Bootstrapping an aerospace company to $17M ARR"
              description="The story of how we built one of the most promising space startups in the world without taking any capital from investors."
              event="The Escape Velocity Show, March 2022"
              cta="Listen to podcast"
            />
            <Appearance
              href="#" // Placeholder link
              title="Programming your company operating system"
              description="On the importance of creating systems and processes for running your business so that everyone on the team knows how to make the right decision no matter the situation."
              event="How They Work Radio, September 2021"
              cta="Listen to podcast"
            />
          </SpeakingSection>
        </div>
      </SimpleLayout>
    </>
  )
}

export default Speaking;
