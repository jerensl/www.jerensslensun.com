import React from 'react'
import { format } from 'date-fns'
import { Metadata } from '../domain/Blog'
import Link from 'next/link'
import Image from 'next/image'

const blobStorageIoImageLoader = ({ src }) => {
    return `https://res.cloudinary.com/do9os7lxv/image/upload/v1637714730/personal/${src}`
}

export const SearchArticle = ({
    posts,
}: {
    posts: Metadata[]
}): React.ReactElement => {
    const [searchArticles, setSearchArticles] = React.useState<string>('')
    const [filteredPost, setFilteredPost] = React.useState<Array<Metadata>>([
        ...posts,
    ])

    React.useEffect(() => {
        const articles = posts.filter((post) =>
            post.title.toLowerCase().includes(searchArticles.toLowerCase())
        )

        setFilteredPost(articles)
    }, [searchArticles, posts])

    return (
        <section className="grid grid-cols-auto-fill gap-5">
            <input
                className="p-2 col-span-full m-auto w-full md:w-96 rounded border-2 placeholder-gray-500 border-gray-300 placeholder-opacity-100"
                placeholder="Search Articles..."
                aria-label="Search Articles"
                onChange={(event) => {
                    setSearchArticles(event.target.value)
                }}
            />
            {!filteredPost.length && 'No articles found.'}
            {filteredPost?.map(
                ({ cover, date, description, slug, title }: Metadata) => {
                    return (
                        <article key={slug} className="max-w-md">
                            <div className="overflow-hidden">
                                <Link href={`/blog/${slug}`} passHref>
                                    <a>
                                        <Image
                                            loader={blobStorageIoImageLoader}
                                            src={cover}
                                            alt="Person"
                                            objectFit="cover"
                                            height="200px"
                                            width="450px"
                                            className="transition duration-250 ease-in-out scale-100 hover:scale-110 cursor-pointer"
                                        />
                                    </a>
                                </Link>
                            </div>
                            <h1 className="text-2xl font-bold leading-8 tracking-tight">
                                {title}
                            </h1>
                            <p className="text-gray-500">
                                {format(new Date(date), 'MMMM dd, yyyy')}
                            </p>
                            <p className="line-clamp-3">{description}</p>
                            <Link passHref href={`/blog/${slug}`}>
                                <a className="text-current cursor-pointer opacity-60 hover:opacity-100">
                                    Read More →
                                </a>
                            </Link>
                        </article>
                    )
                }
            )}
        </section>
    )
}