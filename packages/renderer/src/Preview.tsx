import React from 'react'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkReact from 'remark-react'
import './Preview.css'
import 'github-markdown-css/github-markdown.css'
import RemarkCode from './RemarkCode'
import { defaultSchema } from 'hast-util-sanitize'

const schema = {
  ...defaultSchema,
  attributes: {
    ...defaultSchema.attributes,
    code: [...(defaultSchema.attributes?.code || []), 'className']
  }
}

interface Props {
  doc: string
}

const Preview: React.FC<Props> = ({ doc }) => {
  const md = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkReact, {
      createElement: React.createElement,
      sanitize: schema,
      remarkReactComponents: {
        code: RemarkCode
      }
    })
    .processSync(doc).result

  return <div className="preview markdown-body">{md}</div>
}

export default Preview
