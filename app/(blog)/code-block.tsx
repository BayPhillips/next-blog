import React from "react";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { solarizedDarkAtom } from "react-syntax-highlighter/dist/esm/styles/prism";

interface Props {
  value: {
    code: string
    language: string
  }
}

const CodeBlock: React.FC<Props> = ({ value }: Props) => {
  const { code, language } = value
  console.log(`What is ${code} and language ${language}`);
  return (
    <SyntaxHighlighter
      language={language}
      style={solarizedDarkAtom}
    >
      {code}
    </SyntaxHighlighter>
  )
}

export default CodeBlock