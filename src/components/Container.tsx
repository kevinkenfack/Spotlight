import React, { forwardRef } from 'react' // Import React
import clsx from 'clsx'

// --- Type Definitions ---

// Props for OuterContainer and InnerContainer.
// React.HTMLAttributes<HTMLDivElement> includes className, children, and other div attributes.
interface DivContainerProps extends React.HTMLAttributes<HTMLDivElement> {}

// Props for the main Container component.
// These props are mostly passed to OuterContainer.
// Children is explicitly defined as it's passed to InnerContainer.
interface MainContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

// --- Component Definitions ---

const OuterContainerInternal = forwardRef<HTMLDivElement, DivContainerProps>(
  function OuterContainer({ className, children, ...props }, ref) {
    return (
      <div ref={ref} className={clsx('sm:px-8', className)} {...props}>
        <div className="mx-auto max-w-7xl lg:px-8">{children}</div>
      </div>
    )
  }
)

const InnerContainerInternal = forwardRef<HTMLDivElement, DivContainerProps>(
  function InnerContainer({ className, children, ...props }, ref) {
    return (
      <div
        ref={ref}
        className={clsx('relative px-4 sm:px-8 lg:px-12', className)}
        {...props}
      >
        <div className="mx-auto max-w-2xl lg:max-w-5xl">{children}</div>
      </div>
    )
  }
)

// Main Container component that will be exported
// The ref is for the OuterContainer's div element
const ContainerRoot = forwardRef<HTMLDivElement, MainContainerProps>(
  function Container({ children, ...props }, ref) {
    return (
      <OuterContainerInternal ref={ref} {...props}>
        <InnerContainerInternal>{children}</InnerContainerInternal>
      </OuterContainerInternal>
    )
  }
)

// Interface for the exported Container, including its static sub-components
interface ContainerComponentType
  extends React.ForwardRefExoticComponent<
    MainContainerProps & React.RefAttributes<HTMLDivElement>
  > {
  Outer: typeof OuterContainerInternal;
  Inner: typeof InnerContainerInternal;
}

// Cast the ContainerRoot to the interface that includes the static properties
export const Container = ContainerRoot as ContainerComponentType

// Assign the sub-components as static properties
Container.Outer = OuterContainerInternal
Container.Inner = InnerContainerInternal
