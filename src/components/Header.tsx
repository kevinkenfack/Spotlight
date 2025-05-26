import Image from 'next/image'
import Link, { LinkProps } from 'next/link'
import { useRouter } from 'next/router'
import { Popover, Transition } from '@headlessui/react'
import clsx from 'clsx'
import React, { Fragment, useEffect, useRef } from 'react' // Import React

import { Container } from '@/components/Container'
import avatarImage from '@/images/avatar.jpg'
// Note: Fragment, useEffect, useRef are already imported from 'react'

// --- Type Definitions for CSS Custom Properties ---
interface CSSPropertiesWithVars extends React.CSSProperties {
  '--header-height'?: string;
  '--header-mb'?: string;
  '--header-position'?: string; // Loosen type for CSS variables
  '--content-offset'?: string;
  '--header-inner-position'?: string; // Loosen type for CSS variables
  '--header-top'?: string;
  '--avatar-top'?: string;
  '--avatar-image-transform'?: string;
  '--avatar-border-transform'?: string;
  '--avatar-border-opacity'?: number | string;
}


// --- Icon Components ---
const CloseIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="m17.25 6.75-10.5 10.5M6.75 6.75l10.5 10.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

const ChevronDownIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg viewBox="0 0 8 6" aria-hidden="true" {...props}>
      <path
        d="M1.75 1.75 4 4.25l2.25-2.5"
        fill="none"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

const SunIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M8 12.25A4.25 4.25 0 0 1 12.25 8v0a4.25 4.25 0 0 1 4.25 4.25v0a4.25 4.25 0 0 1-4.25 4.25v0A4.25 4.25 0 0 1 8 12.25v0Z" />
      <path
        d="M12.25 3v1.5M21.5 12.25H20M18.791 18.791l-1.06-1.06M18.791 5.709l-1.06 1.06M12.25 20v1.5M4.5 12.25H3M6.77 6.77 5.709 5.709M6.77 17.73l-1.061 1.061"
        fill="none"
      />
    </svg>
  )
}

const MoonIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="M17.25 16.22a6.937 6.937 0 0 1-9.47-9.47 7.451 7.451 0 1 0 9.47 9.47ZM12.75 7C17 7 17 2.75 17 2.75S17 7 21.25 7C17 7 17 11.25 17 11.25S17 7 12.75 7Z"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

// --- Navigation Components ---
interface MobileNavItemProps {
  href: LinkProps['href'];
  children: React.ReactNode;
}

const MobileNavItem: React.FC<MobileNavItemProps> = ({ href, children }) => {
  return (
    <li>
      <Popover.Button as={Link} href={href} className="block py-2">
        {children}
      </Popover.Button>
    </li>
  )
}

// Props for Popover are complex, type 'any' for now or import from @headlessui/react if possible
// For this example, let's assume 'props' can be any valid Popover props.
// A more specific type would be 'Omit<React.ComponentProps<typeof Popover>, "className">' if we want to control className
interface MobileNavigationProps {
  className?: string;
  // other props for Popover can be implicitly handled by '...props'
  // or explicitly defined if needed, e.g. `popoverSpecificProp?: PopoverSpecificPropType`
}

const MobileNavigation: React.FC<MobileNavigationProps> = (props) => {
  return (
    // Pass all props, including className, to Popover
    <Popover {...props}>
      <Popover.Button className={clsx(
        props.className, // Apply className from props here
        "group flex items-center rounded-full bg-white/90 px-4 py-2 text-sm font-medium text-zinc-800 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur",
        "dark:bg-zinc-800/90 dark:text-zinc-200 dark:ring-white/10 dark:hover:ring-white/20"
      )}>
        Menu
        <ChevronDownIcon className="ml-3 h-auto w-2 stroke-zinc-500 group-hover:stroke-zinc-700 dark:group-hover:stroke-zinc-400" />
      </Popover.Button>
      <Transition.Root>
        <Transition.Child
          as={Fragment}
          enter="duration-150 ease-out"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="duration-150 ease-in"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Popover.Overlay className="fixed inset-0 z-50 bg-zinc-800/40 backdrop-blur-sm dark:bg-black/80" />
        </Transition.Child>
        <Transition.Child
          as={Fragment}
          enter="duration-150 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="duration-150 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Popover.Panel
            focus // The 'focus' prop on Popover.Panel is a boolean flag
            className="fixed inset-x-4 top-8 z-50 origin-top rounded-3xl bg-white p-8 ring-1 ring-zinc-900/5 dark:bg-zinc-900 dark:ring-zinc-800"
          >
            <div className="flex flex-row-reverse items-center justify-between">
              <Popover.Button aria-label="Close menu" className="-m-1 p-1">
                <CloseIcon className="h-6 w-6 text-zinc-500 dark:text-zinc-400" />
              </Popover.Button>
              <h2 className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                Navigation
              </h2>
            </div>
            <nav className="mt-6">
              <ul className="-my-2 divide-y divide-zinc-100 text-base text-zinc-800 dark:divide-zinc-100/5 dark:text-zinc-300">
                <MobileNavItem href="/about">About</MobileNavItem>
                <MobileNavItem href="/articles">Articles</MobileNavItem>
                <MobileNavItem href="/projects">Projects</MobileNavItem>
                <MobileNavItem href="/speaking">Speaking</MobileNavItem>
                <MobileNavItem href="/uses">Uses</MobileNavItem>
              </ul>
            </nav>
          </Popover.Panel>
        </Transition.Child>
      </Transition.Root>
    </Popover>
  )
}

interface NavItemProps {
  href: LinkProps['href'];
  children: React.ReactNode;
}

const NavItem: React.FC<NavItemProps> = ({ href, children }) => {
  const router = useRouter()
  const isActive = router.pathname === href

  return (
    <li>
      <Link
        href={href}
        className={clsx(
          'relative block px-3 py-2 transition',
          isActive
            ? 'text-teal-500 dark:text-teal-400'
            : 'hover:text-teal-500 dark:hover:text-teal-400'
        )}
      >
        {children}
        {isActive && (
          <span className="absolute inset-x-1 -bottom-px h-px bg-gradient-to-r from-teal-500/0 via-teal-500/40 to-teal-500/0 dark:from-teal-400/0 dark:via-teal-400/40 dark:to-teal-400/0" />
        )}
      </Link>
    </li>
  )
}

interface DesktopNavigationProps extends React.HTMLAttributes<HTMLElement> {}

const DesktopNavigation: React.FC<DesktopNavigationProps> = (props) => {
  return (
    <nav {...props}>
      <ul className="flex rounded-full bg-white/90 px-3 text-sm font-medium text-zinc-800 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:text-zinc-200 dark:ring-white/10">
        <NavItem href="/about">About</NavItem>
        <NavItem href="/articles">Articles</NavItem>
        <NavItem href="/projects">Projects</NavItem>
        <NavItem href="/speaking">Speaking</NavItem>
        <NavItem href="/uses">Uses</NavItem>
      </ul>
    </nav>
  )
}

// --- ModeToggle Component ---
const ModeToggle: React.FC = () => {
  function disableTransitionsTemporarily(): void {
    document.documentElement.classList.add('[&_*]:!transition-none')
    window.setTimeout(() => {
      document.documentElement.classList.remove('[&_*]:!transition-none')
    }, 0)
  }

  function toggleMode(): void {
    disableTransitionsTemporarily()

    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const isSystemDarkMode = darkModeMediaQuery.matches
    const isDarkMode = document.documentElement.classList.toggle('dark')

    if (isDarkMode === isSystemDarkMode) {
      delete window.localStorage.isDarkMode
    } else {
      window.localStorage.isDarkMode = String(isDarkMode) // localStorage stores strings
    }
  }

  return (
    <button
      type="button"
      aria-label="Toggle dark mode"
      className="group rounded-full bg-white/90 px-3 py-2 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur transition dark:bg-zinc-800/90 dark:ring-white/10 dark:hover:ring-white/20"
      onClick={toggleMode}
    >
      <SunIcon className="h-6 w-6 fill-zinc-100 stroke-zinc-500 transition group-hover:fill-zinc-200 group-hover:stroke-zinc-700 dark:hidden [@media(prefers-color-scheme:dark)]:fill-teal-50 [@media(prefers-color-scheme:dark)]:stroke-teal-500 [@media(prefers-color-scheme:dark)]:group-hover:fill-teal-50 [@media(prefers-color-scheme:dark)]:group-hover:stroke-teal-600" />
      <MoonIcon className="hidden h-6 w-6 fill-zinc-700 stroke-zinc-500 transition dark:block [@media(prefers-color-scheme:dark)]:group-hover:stroke-zinc-400 [@media_not_(prefers-color-scheme:dark)]:fill-teal-400/10 [@media_not_(prefers-color-scheme:dark)]:stroke-teal-500" />
    </button>
  )
}

// --- Utility Function ---
function clamp(number: number, a: number, b: number): number {
  const min = Math.min(a, b)
  const max = Math.max(a, b)
  return Math.min(Math.max(number, min), max)
}

// --- Avatar Components ---
interface AvatarContainerProps extends React.HTMLAttributes<HTMLDivElement> {}

const AvatarContainer: React.FC<AvatarContainerProps> = ({ className, ...props }) => {
  return (
    <div
      className={clsx(
        className,
        'h-10 w-10 rounded-full bg-white/90 p-0.5 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:ring-white/10'
      )}
      {...props}
    />
  )
}

interface AvatarProps extends Omit<LinkProps, 'href' | 'children'> { // href is fixed, children is Image
  large?: boolean;
  className?: string; // className for the Link
  style?: React.CSSProperties; // Add style prop
}

const Avatar: React.FC<AvatarProps> = ({ large = false, className, style, ...props }) => {
  return (
    <Link
      href="/"
      aria-label="Home"
      className={clsx(className, 'pointer-events-auto')}
      {...props} // Spread remaining LinkProps
    >
      <Image
        src={avatarImage}
        alt=""
        sizes={large ? '4rem' : '2.25rem'}
        className={clsx(
          'rounded-full bg-zinc-100 object-cover dark:bg-zinc-800',
          large ? 'h-16 w-16' : 'h-9 w-9'
        )}
        priority
      />
    </Link>
  )
}

// --- Header Component ---
export const Header: React.FC = () => {
  const router = useRouter()
  const isHomePage = router.pathname === '/'

  const headerRef = useRef<HTMLDivElement>(null)
  const avatarRef = useRef<HTMLDivElement>(null)
  const isInitial = useRef<boolean>(true)

  useEffect(() => {
    const downDelay = avatarRef.current?.offsetTop ?? 0
    const upDelay = 64

    function setProperty(property: keyof CSSPropertiesWithVars, value: string | number): void {
      document.documentElement.style.setProperty(property as string, String(value))
    }

    function removeProperty(property: keyof CSSPropertiesWithVars): void {
      document.documentElement.style.removeProperty(property as string)
    }

    function updateHeaderStyles(): void {
      if (!headerRef.current) return
      const { top, height } = headerRef.current.getBoundingClientRect()
      const scrollY = clamp(
        window.scrollY,
        0,
        document.body.scrollHeight - window.innerHeight
      )

      if (isInitial.current) {
        setProperty('--header-position', 'sticky')
      }

      setProperty('--content-offset', `${downDelay}px`)

      if (isInitial.current || scrollY < downDelay) {
        setProperty('--header-height', `${downDelay + height}px`)
        setProperty('--header-mb', `${-downDelay}px`)
      } else if (top + height < -upDelay) {
        const offset = Math.max(height, scrollY - upDelay)
        setProperty('--header-height', `${offset}px`)
        setProperty('--header-mb', `${height - offset}px`)
      } else if (top === 0) {
        setProperty('--header-height', `${scrollY + height}px`)
        setProperty('--header-mb', `${-scrollY}px`)
      }

      if (top === 0 && scrollY > 0 && scrollY >= downDelay) {
        setProperty('--header-inner-position', 'fixed')
        removeProperty('--header-top')
        removeProperty('--avatar-top')
      } else {
        removeProperty('--header-inner-position')
        setProperty('--header-top', '0px')
        setProperty('--avatar-top', '0px')
      }
    }

    function updateAvatarStyles(): void {
      if (!isHomePage) {
        return
      }

      const fromScale = 1
      const toScale = 36 / 64 // 0.5625
      const fromX = 0
      const toX = 2 / 16 // 0.125

      // Ensure downDelay is not zero to prevent division by zero
      const currentScrollY = downDelay !== 0 ? (downDelay - window.scrollY) / downDelay : 0;

      let scale = currentScrollY * (fromScale - toScale) + toScale
      scale = clamp(scale, toScale, fromScale) // Corrected clamp order for scale

      let x = currentScrollY * (fromX - toX) + toX
      x = clamp(x, Math.min(fromX,toX), Math.max(fromX,toX)) // Corrected clamp order for x


      setProperty(
        '--avatar-image-transform',
        `translate3d(${x}rem, 0, 0) scale(${scale})`
      )

      const borderScale = scale !== 0 ? 1 / (toScale / scale) : 1 // Avoid division by zero
      const borderX = (-toX + x) * borderScale
      const borderTransform = `translate3d(${borderX}rem, 0, 0) scale(${borderScale})`

      setProperty('--avatar-border-transform', borderTransform)
      setProperty('--avatar-border-opacity', scale === toScale ? 1 : 0)
    }

    function updateStyles(): void {
      updateHeaderStyles()
      updateAvatarStyles()
      isInitial.current = false
    }

    updateStyles()
    window.addEventListener('scroll', updateStyles, { passive: true })
    window.addEventListener('resize', updateStyles)

    return () => {
      window.removeEventListener('scroll', updateStyles) // Removed passive true for removeEventListener
      window.removeEventListener('resize', updateStyles)
    }
  }, [isHomePage])

  // Cast style objects to CSSPropertiesWithVars or any to bypass strict type checking for CSS custom props
  const headerStyle: any = {
    height: 'var(--header-height)',
    marginBottom: 'var(--header-mb)',
  };

  const homePageAvatarOuterContainerStyle: any = {
    position: 'var(--header-position)',
  };

  const homePageAvatarInnerDivStyle: any = {
    position: 'var(--header-inner-position)',
  };
  
  const avatarContainerStyle: any = {
    opacity: 'var(--avatar-border-opacity, 0)',
    transform: 'var(--avatar-border-transform)',
  };

  const avatarStyle: any = { // style prop for Avatar component
    transform: 'var(--avatar-image-transform)',
  };

  const headerDivStyle: any = {
    position: 'var(--header-position)',
  };

  const headerInnerContainerStyle: any = {
    position: 'var(--header-inner-position)',
  };

  const homePageBottomDivStyle: any = {
    height: 'var(--content-offset)',
  };


  return (
    <>
      <header
        className="pointer-events-none relative z-50 flex flex-col"
        style={headerStyle}
      >
        {isHomePage && (
          <>
            <div
              ref={avatarRef}
              className="order-last mt-[calc(theme(spacing.16)-theme(spacing.3))]"
            />
            <Container
              className="top-0 order-last -mb-3 pt-3"
              style={homePageAvatarOuterContainerStyle}
            >
              <div
                className="top-[var(--avatar-top,theme(spacing.3))] w-full"
                style={homePageAvatarInnerDivStyle}
              >
                <div className="relative">
                  <AvatarContainer
                    className="absolute left-0 top-3 origin-left transition-opacity"
                    style={avatarContainerStyle}
                  />
                  <Avatar
                    large
                    className="block h-16 w-16 origin-left"
                    style={avatarStyle} // Pass the style object here
                  />
                </div>
              </div>
            </Container>
          </>
        )}
        <div
          ref={headerRef}
          className="top-0 z-10 h-16 pt-6"
          style={headerDivStyle}
        >
          <Container
            className="top-[var(--header-top,theme(spacing.6))] w-full"
            style={headerInnerContainerStyle}
          >
            <div className="relative flex gap-4">
              <div className="flex flex-1">
                {!isHomePage && (
                  <AvatarContainer>
                    <Avatar />
                  </AvatarContainer>
                )}
              </div>
              <div className="flex flex-1 justify-end md:justify-center">
                <MobileNavigation className="pointer-events-auto md:hidden" />
                <DesktopNavigation className="pointer-events-auto hidden md:block" />
              </div>
              <div className="flex justify-end md:flex-1">
                <div className="pointer-events-auto">
                  <ModeToggle />
                </div>
              </div>
            </div>
          </Container>
        </div>
      </header>
      {isHomePage && <div style={homePageBottomDivStyle} />}
    </>
  )
}
