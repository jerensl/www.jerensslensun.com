import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import { Footer } from '@/components/Footer'
import { Seo } from '@/components/Seo'
import { generateRss } from '@/libs/rss'
import { getPlaiceholder } from 'plaiceholder'
import { Header } from '@/components/Header'
import { IntroductionSection } from '@/components/sections/Introduction.section'
import { CareerSection } from '@/components/sections/Career.section'

export const getStaticProps: GetStaticProps = async () => {
    generateRss()

    const { base64 } = await getPlaiceholder(
        'https://ik.imagekit.io/jerensl/illustration-landing-page.png',
        { size: 10 }
    )

    return {
        props: { blurDataURL: base64 },
    }
}

export default function Home({
    blurDataURL,
}: InferGetStaticPropsType<typeof getStaticProps>): React.ReactElement {
    return (
        <>
            <Seo path="/" />
            <Header blurDataURL={blurDataURL} />
            <div className="h-56 lg:h-64" />
            <IntroductionSection />
            <div className="h-56 lg:h-64" />
            <CareerSection />
            <div className="h-56 lg:h-64" />
            <Footer />
        </>
    )
}
