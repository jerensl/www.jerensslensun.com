import '../styles/globals.css'
import '@fortawesome/fontawesome-svg-core/styles.css'
import type { AppProps } from 'next/app'
import { config } from '@fortawesome/fontawesome-svg-core'
import { NavbarMobile } from '../components/NavbarMobile'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Navbar } from '../components/Navbar'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

config.autoAddCss = false

const queryClient = new QueryClient()

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <QueryClientProvider client={queryClient}>
                <ToastContainer />
                <Navbar />
                <NavbarMobile />
                <Component {...pageProps} />
            </QueryClientProvider>
        </>
    )
}

export default MyApp
