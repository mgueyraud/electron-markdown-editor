import React, { useState } from 'react'
import runmode, { getLanguage } from './runmode'
import { useEffect } from 'react'

type Token = {
  text: string
  style: string | null
}

const RemarkCode: React.FC<
  React.DetailedHTMLProps<React.HtmlHTMLAttributes<HTMLElement>, HTMLElement>
> = props => {
  const [spans, setSpans] = useState<Token[]>([])
  const { className } = props
  const langName = (className || '').substring(9)

  useEffect(() => {
    getLanguage(langName).then(language => {
      if (language) {
        const body = props.children instanceof Array ? props.children[0] : null
        const tokens: Token[] = []

        runmode(
          body as string,
          language,
          (text: string, style: string | null, _from: number, _to: number) => {
            tokens.push({ text, style })
          }
        )

        setSpans(tokens)
      }
    })
  }, [props.children])

  if (spans.length > 0) {
    return (
      <code>
        {spans.map((span, i) => {
          return (
            <span key={i} className={span.style || ''}>
              {span.text}
            </span>
          )
        })}
      </code>
    )
  } else {
    return <code>{props.children}</code>
  }
}

export default RemarkCode
