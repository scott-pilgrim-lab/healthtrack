import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import About from './pages/About'
import Contact from './pages/Contact'
import Dashboard from './pages/Dashboard'
import Features from './pages/Features'
import Home from './pages/Home'
import NotFound from './pages/NotFound'

// Route table. Every page is a child of <Layout>, which renders the shared
// navbar and footer around the matched page.
export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="features" element={<Features />} />
        <Route path="contact" element={<Contact />} />
        <Route path="dashboard" element={<Dashboard />} />
        {/* Anything else falls through to the 404 page. */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
