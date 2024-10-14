import {Outlet} from 'react-router-dom'
import Header from '../Header'
import Footer from '../Footer'

const RootLayout = () => {
    return (
        <section>
            <header>
                <nav>
                    <Header />
                    <Outlet />
                    <Footer />
                </nav>
            </header>
        </section>
    )
}

export default RootLayout