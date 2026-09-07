import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ConsentBanner } from './components/ConsentBanner'
import { HomePage } from './pages/HomePage'
import { NotFoundPage } from './pages/NotFoundPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <ConsentBanner />
    </BrowserRouter>
  )
}
