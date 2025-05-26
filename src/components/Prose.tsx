import clsx from 'clsx'
import React from 'react' // Import React

// Define props for the Prose component
interface ProseProps {
  children: React.ReactNode;
  className?: string; // className is optional
}

export const Prose: React.FC<ProseProps> = ({ children, className }) => {
  return (
    <div className={clsx(className, 'prose dark:prose-invert')}>{children}</div>
  )
}
