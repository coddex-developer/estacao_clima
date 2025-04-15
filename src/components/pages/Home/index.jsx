import { AnimatePresence } from "framer-motion"
import PageWrapper from "../../EfectsPage/PageWrapper"
import ScrollTop from "../../EfectsPage/ScrollTop"
import Footer from "../../Footer"
import Header from "../../Header"
import MyWork from "../../MyWork"
import Navbar from "../../Navbar"
import PrimarySection from "../../PrimarySection"
import SecondarySection from "../../SecondarySection"
import { Outlet } from "react-router-dom"

function Home() {
    return (
        <>
            <ScrollTop />
            <Navbar />
            <PageWrapper>
                <AnimatePresence mode="wait">
                    <Outlet key={location.pathname} />
                    <Header />
                    <PrimarySection />
                    <MyWork />
                    <SecondarySection />
                </AnimatePresence>
            </PageWrapper>
            <Footer />
        </>
    )
}

export default Home