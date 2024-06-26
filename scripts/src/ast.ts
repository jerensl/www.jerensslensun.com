import type { Root } from 'npm:@types/mdast'
import remarkFrontmatter from 'remark-frontmatter'
import remarkParse from 'remark-parse'
import remarkStringify from 'remark-stringify'
import { unified } from 'unified'
import { read } from 'to-vfile'
import { visit, EXIT } from 'unist-util-visit'
import { parse, stringify } from '@std/yaml'
import dayjs from 'dayjs'
import { red } from '@std/fmt/colors';

interface IOptions {
    title: string
    published: boolean
    description: string
    tags: Array<string>
}

export async function markdownASTParse<T>(src: string, astVisit: (opts: T) => (tree: Root) => void, opts: T ) {
    const srcFile = await read(src).catch(() => {
        console.error(red("Source input File not exist"))
        Deno.exit(0)
    })

    const file = await unified()
    .use(remarkParse)
    .use(remarkFrontmatter, { type: 'yaml', marker: '-' })
    .use(astVisit, opts)
    .use(remarkStringify)
    .process(srcFile)

    return file
}

export function markdownASTVisit(options: IOptions): (tree: Root) => void {
    return (tree: Root) => {
        visit(tree, 'yaml', (node) => {
            const data = parse(node.value) as Record<string, string | boolean | Array<string>>

            data['title'] =  options.title
            data['description'] =  options.description
            if (data['date'] === null || data['date'] === "") {
                data['date'] = dayjs(dayjs(), "YYYY-MM-DDTh:mm:ssZ").toString()
            } 
            data['published'] =  options.published
            data['tags'] =  options.tags
            node.value = stringify(data).trim()
            
            return EXIT
        })
    }
}
