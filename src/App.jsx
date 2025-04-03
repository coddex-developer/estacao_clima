import { useState } from 'react'
import Navbar from './components/Navbar'
import Header from './components/Header'
import PrimarySection from './components/PrimarySection'
import MyWork from './components/MyWork'
import SecondarySection from './components/SecondarySection'
import Footer from './components/Footer'

function App() {

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

export default App
