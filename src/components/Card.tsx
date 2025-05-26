import Link, { LinkProps } from 'next/link'
import clsx from 'clsx'
import React from 'react' // Import React

// --- Type Definitions ---

interface ChevronRightIconProps extends React.SVGProps<SVGSVGElement> {}

// --- Polymorphic Component Helper Types ---
// P = OwnProps, C = React.ElementType
type PolymorphicProps<P = {}, C extends React.ElementType = 'div'> = P & {
  as?: C;
} & Omit<React.ComponentPropsWithRef<C>, keyof P | 'as'>;


// --- Card Base Own Props ---
interface CardOwnProps {
  className?: string;
  children: React.ReactNode;
}
type CardProps<C extends React.ElementType = 'div'> = PolymorphicProps<CardOwnProps, C>;

// --- Card.Link ---
interface CardLinkProps extends Omit<LinkProps, 'children' | 'href'> {
  children: React.ReactNode;
  href: string;
}

// --- Card.Title ---
interface CardTitleOwnProps {
  href?: string;
  children: React.ReactNode;
  className?: string; // Allow className to be passed to CardTitle
}
type CardTitleProps<C extends React.ElementType = 'h2'> = PolymorphicProps<CardTitleOwnProps, C>;

// --- Card.Description ---
interface CardDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

// --- Card.Cta ---
interface CardCtaProps {
  children: React.ReactNode;
}

// --- Card.Eyebrow ---
interface CardEyebrowOwnProps {
  decorate?: boolean;
  className?: string;
  children: React.ReactNode;
}
type CardEyebrowProps<C extends React.ElementType = 'p'> = PolymorphicProps<CardEyebrowOwnProps, C>;


// --- Component Definitions ---

const ChevronRightIcon: React.FC<ChevronRightIconProps> = (props) => {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
      <path
        d="M6.75 5.75 9.25 8l-2.5 2.25"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

// --- Main Card Component (ForwardRef) ---
const CardRenderFunction = <C extends React.ElementType = 'div'>(
  { as: Component = 'div', className, children, ...restProps }: CardProps<C>,
  ref: React.ForwardedRef<React.ElementRef<C>>
) => {
  return (
    <Component
      ref={ref}
      className={clsx(className, 'group relative flex flex-col items-start')}
      {...restProps}
    >
      {children}
    </Component>
  );
};

// Explicitly type CardMain using React.ForwardRefExoticComponent for its default state,
// but the final exported 'Card' will have the richer polymorphic type.
const CardMain: React.ForwardRefExoticComponent<
  CardOwnProps & Omit<React.ComponentPropsWithRef<'div'>, keyof CardOwnProps | 'as'> & {as?: 'div'} &
  React.RefAttributes<HTMLDivElement>
> = React.forwardRef(CardRenderFunction as React.ForwardRefRenderFunction<HTMLDivElement, CardProps<'div'>>);


// --- Sub-components ---
const CardLink: React.FC<CardLinkProps> = ({ children, ...restProps }) => { // Changed props to restProps for clarity
  return (
    <>
      <div className="absolute -inset-y-6 -inset-x-4 z-0 scale-95 bg-zinc-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 dark:bg-zinc-800/50 sm:-inset-x-6 sm:rounded-2xl" />
      <Link {...props}>
        <span className="absolute -inset-y-6 -inset-x-4 z-20 sm:-inset-x-6 sm:rounded-2xl" />
        <span className="relative z-10">{children}</span>
      </Link>
    </>
  );
};

// CardTitle - Polymorphic sub-component
const CardTitle = <C extends React.ElementType = 'h2'>(
  props: CardTitleProps<C>
) => {
  const { as: Component = 'h2', href, children, className, ...restProps } = props_CardTitle;
  return (
    <Component
      className={clsx(className, "text-base font-semibold tracking-tight text-zinc-800 dark:text-zinc-100")}
      {...restProps as Omit<React.ComponentPropsWithRef<C>, keyof CardTitleOwnProps | 'as'>}
    >
      {href ? <CardLink href={href}>{children}</CardLink> : children}
    </Component>
  );
};

const CardDescription: React.FC<CardDescriptionProps> = ({ children, className }) => {
  return (
    <p className={clsx(className, "relative z-10 mt-2 text-sm text-zinc-600 dark:text-zinc-400")}>
      {children}
    </p>
  );
};

const CardCta: React.FC<CardCtaProps> = ({ children }) => {
  return (
    <div
      aria-hidden="true"
      className="relative z-10 mt-4 flex items-center text-sm font-medium text-teal-500"
    >
      {children}
      <ChevronRightIcon className="ml-1 h-4 w-4 stroke-current" />
    </div>
  );
};

// CardEyebrow - Polymorphic sub-component
const CardEyebrow = <C extends React.ElementType = 'p'>(
  props_CardEyebrow: CardEyebrowProps<C>
) => {
  const { as: Component = 'p', decorate = false, className, children, ...restProps } = props_CardEyebrow;
  return (
    <Component
      className={clsx(
        className, 
        'relative z-10 order-first mb-3 flex items-center text-sm text-zinc-400 dark:text-zinc-500',
        decorate && 'pl-3.5'
      )}
      {...restProps as Omit<React.ComponentPropsWithRef<C>, keyof CardEyebrowOwnProps | 'as'>}
    >
      {decorate && (
        <span
          className="absolute inset-y-0 left-0 flex items-center"
          aria-hidden="true"
        >
          <span className="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500" />
        </span>
      )}
      {children}
    </Component>
  );
};

// Define CardComponent for the final Card object with static members
interface CardStaticMembers {
  Link: typeof CardLink;
  Title: typeof CardTitle;
  Description: typeof CardDescription;
  Cta: typeof CardCta;
  Eyebrow: typeof CardEyebrow;
}

// This is the type for the Card component itself, making it callable/renderable
// and also holding the static members.
type CardComponent = React.ForwardRefExoticComponent<
  CardOwnProps & Omit<React.ComponentPropsWithRef<'div'>, keyof CardOwnProps | 'as'> & {as?: 'div'} 
  & React.RefAttributes<HTMLDivElement>
> & CardStaticMembers & (<C extends React.ElementType = 'div'>(
  // This generic signature allows it to be polymorphic when used with 'as'
  props: CardProps<C> & { ref?: React.ForwardedRef<React.ElementRef<C>> }
) => React.ReactElement | null);


// Assign sub-components to CardMain BEFORE the final cast
const TempCard = CardMain as any; // Use 'as any' for intermediate assignment
TempCard.Link = CardLink;
TempCard.Title = CardTitle;
TempCard.Description = CardDescription;
TempCard.Cta = CardCta;
TempCard.Eyebrow = CardEyebrow;

// Final cast to the desired CardComponent interface
const Card = TempCard as CardComponent;

export { Card };
