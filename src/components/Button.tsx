import Link, { LinkProps } from 'next/link'
import clsx from 'clsx'
import React from 'react'

const variantStyles = {
  primary:
    'bg-zinc-800 font-semibold text-zinc-100 hover:bg-zinc-700 active:bg-zinc-800 active:text-zinc-100/70 dark:bg-zinc-700 dark:hover:bg-zinc-600 dark:active:bg-zinc-700 dark:active:text-zinc-100/70',
  secondary:
    'bg-zinc-50 font-medium text-zinc-900 hover:bg-zinc-100 active:bg-zinc-100 active:text-zinc-900/60 dark:bg-zinc-800/50 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-zinc-50 dark:active:bg-zinc-800/50 dark:active:text-zinc-50/70',
} as const; // Use "as const" for stricter type checking on keys

type ButtonVariant = keyof typeof variantStyles;

// Base props common to both button and link variants
interface BaseButtonProps {
  variant?: ButtonVariant;
  className?: string;
  children?: React.ReactNode;
}

// Props for when the component is a standard HTML button
interface HtmlButtonProps
  extends BaseButtonProps,
    React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: undefined;
}

// Props for when the component is a Next.js Link
// Omit 'className' from LinkProps as we handle it separately with clsx
interface NextLinkProps extends BaseButtonProps, Omit<LinkProps, 'className' | 'href'> {
  href: string; // Ensure href is always a string for the Link variant
}

type ButtonProps = HtmlButtonProps | NextLinkProps;

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  className,
  href,
  ...props // props will be typed based on the discriminated union
}) => {
  const combinedClassName = clsx(
    'inline-flex items-center gap-2 justify-center rounded-md py-2 px-3 text-sm outline-offset-2 transition active:transition-none',
    variantStyles[variant],
    className
  )

  if (href) {
    // props here are LinkProps (excluding className and href)
    // We need to cast props to avoid TypeScript confusion with the union type.
    // However, NextLinkProps already excludes 'className' and 'href' from LinkProps,
    // and 'href' is passed directly.
    // The remaining props should align with what Next/Link expects.
    return (
      <Link href={href} className={combinedClassName} {...(props as Omit<NextLinkProps, 'children' | 'variant' | 'className' | 'href'>)} />
    )
  }

  // props here are ButtonHTMLAttributes
  return (
    <button
      className={combinedClassName}
      {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    />
  )
}
