import React from 'react'
import { pre } from './Pre'
import { CopyToClipboard } from './copy-clipboard'

interface Components {
    children: any
    theme: 'pink' | 'turq' | 'orange'
    showLineNumbers: any
}

const components = {
    pre: ({ children, theme, showLineNumbers }: Components) => {
        return (
            <CopyToClipboard>
                <pre
                    className={pre({
                        theme,
                        showLineNumbers: typeof showLineNumbers === 'string',
                        css: {
                            mx: '-$3',
                            mt: '$3',
                            mb: '$5',

                            '[data-preview] + &': {
                                marginTop: '0',
                                borderTopLeftRadius: 0,
                                borderTopRightRadius: 0,
                            },

                            '@bp1': {
                                mx: 0,
                                borderRadius: '$3',
                            },
                        },
                    })}
                >
                    {children}
                </pre>
            </CopyToClipboard>
        )
    },
}

export { components }
