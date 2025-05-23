import React, { useState } from "react"
import { Highlight, themes, Language } from "prism-react-renderer"
import { motion } from "framer-motion"

interface CodeBlockProps {
  children: string
  className?: string
  title?: string
  showLineNumbers?: boolean
  highlightLines?: number[]
}

// Map of common language aliases
const languageMap: Record<string, Language> = {
  js: "javascript",
  ts: "typescript",
  jsx: "jsx",
  tsx: "tsx",
  bash: "bash",
  shell: "bash",
  json: "json",
  css: "css",
  scss: "scss",
  sass: "sass",
  html: "markup",
  xml: "markup",
  svg: "markup",
  md: "markdown",
  mdx: "markdown",
  python: "python",
  py: "python",
  java: "java",
  c: "c",
  cpp: "cpp",
  "c++": "cpp",
  "c#": "csharp",
  cs: "csharp",
  php: "php",
  ruby: "ruby",
  rb: "ruby",
  go: "go",
  rust: "rust",
  kotlin: "kotlin",
  kt: "kotlin",
  swift: "swift",
  sql: "sql",
  yaml: "yaml",
  yml: "yaml",
  dockerfile: "docker",
  docker: "docker",
  graphql: "graphql",
  gql: "graphql",
}

const CodeBlock: React.FC<CodeBlockProps> = ({ 
  children, 
  className, 
  title,
  showLineNumbers = false,
  highlightLines = []
}) => {
  const [copied, setCopied] = useState(false)
  
  // Extract language from className
  const languageFromClass = className?.replace(/language-/, "") || "text"
  const language = (languageMap[languageFromClass] || languageFromClass) as Language

  const handleCopy = async () => {
    await navigator.clipboard.writeText(children.trim())
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const isHighlighted = (lineNumber: number) => highlightLines.includes(lineNumber)

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="relative my-6 rounded-lg overflow-hidden bg-gray-900 shadow-xl"
    >
      {title && (
        <div className="px-4 py-2 bg-gray-800 border-b border-gray-700 text-gray-300 text-sm font-mono flex items-center justify-between">
          <span>{title}</span>
          <span className="text-xs text-gray-500">{language}</span>
        </div>
      )}
      <div className="relative group">
        <button
          onClick={handleCopy}
          className="absolute top-2 right-2 px-3 py-1 text-xs bg-gray-800 hover:bg-gray-700 text-gray-300 rounded transition-all duration-200 z-10 opacity-0 group-hover:opacity-100"
          aria-label="Copy code"
        >
          {copied ? (
            <span className="flex items-center gap-1">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Copied!
            </span>
          ) : (
            <span className="flex items-center gap-1">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
              </svg>
              Copy
            </span>
          )}
        </button>
        <Highlight
          theme={themes.nightOwl}
          code={children.trim()}
          language={language}
        >
          {({ className: highlightClassName, style, tokens, getLineProps, getTokenProps }) => (
            <pre 
              className={`${highlightClassName} overflow-x-auto text-sm leading-relaxed`} 
              style={{ 
                ...style, 
                background: 'transparent', 
                margin: 0,
                padding: showLineNumbers ? '1rem 1rem 1rem 0' : '1rem',
              }}
            >
              <code className="block">
                {tokens.map((line, i) => {
                  const lineNumber = i + 1
                  const lineProps = getLineProps({ line, key: i })
                  return (
                    <div 
                      key={i}
                      {...lineProps}
                      className={`${lineProps.className} ${
                        isHighlighted(lineNumber) 
                          ? 'bg-blue-900/20 border-l-2 border-blue-400' 
                          : ''
                      }`}
                      style={{
                        ...lineProps.style,
                        display: 'table-row',
                      }}
                    >
                      {showLineNumbers && (
                        <span 
                          className="table-cell text-gray-500 pr-4 pl-4 text-right select-none"
                          style={{ width: '3em' }}
                        >
                          {lineNumber}
                        </span>
                      )}
                      <span className={`table-cell ${isHighlighted(lineNumber) ? 'pl-2' : ''}`}>
                        {line.map((token, key) => (
                          <span key={key} {...getTokenProps({ token, key })} />
                        ))}
                      </span>
                    </div>
                  )
                })}
              </code>
            </pre>
          )}
        </Highlight>
        {!title && (
          <div className="absolute bottom-2 right-2 text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity">
            {language}
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default CodeBlock
