import React from "react"

interface InlineCodeProps {
  children: React.ReactNode
}

const InlineCode: React.FC<InlineCodeProps> = ({ children }) => {
  return (
    <code className="px-1.5 py-0.5 text-sm font-mono bg-gray-100 dark:bg-gray-800 text-pink-600 dark:text-pink-400 rounded">
      {children}
    </code>
  )
}

export default InlineCode
