import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import AppNavbar from './AppNavbar'
import Footer from './Footer'

// Shared page shell: every route renders inside <Outlet /> between the
// navbar and the footer.
export default function Layout() {
  const { pathname } = useLocation()

  // A single-page app keeps the scroll position between routes, so jump back
  // to the top whenever the page changes.
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <>
      <a href="#main" className="ht-skip-link">
        Skip to content
      </a>
      <AppNavbar />
      <main id="main" tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
