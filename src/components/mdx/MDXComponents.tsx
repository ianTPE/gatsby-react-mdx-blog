import React from "react"
import AlertBox from "./global-components/AlertBox"
import CodeBlock from "./global-components/CodeBlock"
import InlineCode from "./global-components/InlineCode"

const MDXComponents = {
  // Custom components
  AlertBox,
  
  // Override default HTML elements
  pre: (props: any) => {
    // If there's a code element child, use CodeBlock
    const codeElement = props.children?.props
    if (codeElement?.className || codeElement?.children) {
      return (
        <CodeBlock 
          className={codeElement.className}
          title={props.title}
          showLineNumbers={props.showLineNumbers}
          highlightLines={props.highlightLines}
        >
          {codeElement.children || ''}
        </CodeBlock>
      )
    }
    return <pre className="overflow-x-auto p-4 bg-gray-100 dark:bg-gray-800 rounded-lg" {...props} />
  },
  
  // Inline code
  code: InlineCode,
  
  // Styled HTML elements
  h1: (props: any) => (
    <h1 className="text-4xl font-bold mt-8 mb-4 text-gray-900 dark:text-gray-100" {...props} />
  ),
  h2: (props: any) => (
    <h2 className="text-3xl font-bold mt-6 mb-3 text-gray-900 dark:text-gray-100" {...props} />
  ),
  h3: (props: any) => (
    <h3 className="text-2xl font-semibold mt-5 mb-2 text-gray-900 dark:text-gray-100" {...props} />
  ),
  p: (props: any) => (
    <p className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed" {...props} />
  ),
  a: (props: any) => (
    <a 
      className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-600 underline transition-colors" 
      {...props} 
    />
  ),
  ul: (props: any) => (
    <ul className="list-disc list-inside mb-4 space-y-2 text-gray-700 dark:text-gray-300" {...props} />
  ),
  ol: (props: any) => (
    <ol className="list-decimal list-inside mb-4 space-y-2 text-gray-700 dark:text-gray-300" {...props} />
  ),
  blockquote: (props: any) => (
    <blockquote className="border-l-4 border-gray-300 dark:border-gray-600 pl-4 my-4 italic text-gray-600 dark:text-gray-400" {...props} />
  ),
  table: (props: any) => (
    <div className="overflow-x-auto my-6">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700" {...props} />
    </div>
  ),
  th: (props: any) => (
    <th className="px-6 py-3 bg-gray-50 dark:bg-gray-800 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider" {...props} />
  ),
  td: (props: any) => (
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100" {...props} />
  ),
}

export default MDXComponents
