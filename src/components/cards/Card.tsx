import React from 'react'
import imageLoader from '@/constant/images'
import clsx from 'clsx'
import Image, { ImageLoader } from 'next/image'
import Link from 'next/link'

interface ContentCardProps {
    variant: 'elevated' | 'filled' | 'outlined'
    title: string
    subtitle?: string
    tags?: string[]
    description: string
    slug: string
    imageURL: string
    blurDataURL?: string
    loader: ImageLoader
}

export const ContentCard: React.FC<ContentCardProps> = ({
    variant,
    title,
    subtitle,
    tags,
    description,
    slug,
    imageURL,
    blurDataURL,
    loader,
}) => {
    return (
        <article
            className={clsx(
                'relative col-span-full sm:col-span-6 xl:col-span-4 rounded-medium h-[420px] sm:w-[320px] hover:bg-on-surface/8 active:bg-on-surface/12',
                {
                    'bg-surface border border-outline-variant':
                        variant === 'outlined',
                    'bg-surface-container-low shadow-elevation-1':
                        variant === 'elevated',
                    'bg-surface-container-high': variant === 'filled',
                }
            )}
        >
            <Link href={slug}>
                <div className="relative overflow-auto">
                    <Image
                        loader={loader}
                        src={imageURL}
                        alt={title}
                        blurDataURL={blurDataURL ?? undefined}
                        placeholder={blurDataURL ? 'blur' : 'empty'}
                        width="450"
                        height="200"
                        style={{
                            objectFit: 'cover',
                        }}
                        className="cursor-pointer rounded-t-medium"
                    />
                </div>
                <div className="flex flex-col gap-1 m-4">
                    {tags ? (
                        <div>
                            {tags.map((value) => {
                                return (
                                    <p
                                        key={value}
                                        className="inline-flex text-sm text-center text-gray-100 py-1 px-2 rounded-full bg-blue-500 hover:bg-blue-600 transition duration-150 ease-in-out"
                                    >
                                        {value}
                                    </p>
                                )
                            })}
                        </div>
                    ) : null}
                    <h3 className="text-2xl text-on-surface font-bold cursor-pointer">
                        {title
                            .split(' ')
                            .map(
                                (w) =>
                                    w.substring(0, 1).toUpperCase() +
                                    w.substring(1)
                            )
                            .join(' ')}
                    </h3>
                    {subtitle ? (
                        <h4>
                            <b> Status:</b> {subtitle}
                        </h4>
                    ) : null}
                    <p className="line-clamp-3 text-on-surface-variant">
                        {description}
                    </p>
                </div>
            </Link>
        </article>
    )
}
