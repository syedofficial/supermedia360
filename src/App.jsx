import { useEffect } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Philosophy from './components/Philosophy'
import Services from './components/Services'
import WhyUs from './components/WhyUs'
import Packages from './components/Packages'
import Portfolio from './components/Portfolio'
import Testimonials from './components/Testimonials'
import Industries from './components/Industries'
import CTA from './components/CTA'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'
import { ScrollTrigger } from './lib/motion'
import { initSmoothScroll, destroySmoothScroll } from './lib/smoothScroll'

function App() {
  useEffect(() => {
    initSmoothScroll()

    const refresh = () => ScrollTrigger.refresh()
    window.addEventListener('load', refresh)
    document.fonts?.ready?.then(refresh)

    return () => {
      window.removeEventListener('load', refresh)
      destroySmoothScroll()
    }
  }, [])

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Philosophy />
        <Services />
        <WhyUs />
        <Packages />
        <Portfolio />
        <Testimonials />
        <Industries />
        <CTA />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}

export default App
