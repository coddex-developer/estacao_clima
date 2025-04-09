import Footer from "../../Footer"
import Header from "../../Header"
import MyWork from "../../MyWork"
import Navbar from "../../Navbar"
import PrimarySection from "../../PrimarySection"
import SecondarySection from "../../SecondarySection"

function Home() {
    return (
        <>
            <Navbar />
            <Header />
            <PrimarySection />
            <MyWork />
            <SecondarySection />
            <Footer />
        </>
    )
}

export default Home