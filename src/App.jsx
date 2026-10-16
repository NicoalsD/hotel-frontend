import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import SearchPage from './pages/SearchPage.jsx'
import BookingPage from './pages/BookingPage.jsx'
import ReservationsPage from './pages/ReservationsPage.jsx'
import ReservationDetailPage from './pages/ReservationDetailPage.jsx'
import InvoicePage from './pages/InvoicePage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/buscar" element={<SearchPage />} />
      <Route path="/reservar/:roomId" element={<BookingPage />} />
      <Route path="/reservas" element={<ReservationsPage />} />
      <Route path="/reservas/:reservationId" element={<ReservationDetailPage />} />
      <Route path="/reservas/:reservationId/factura" element={<InvoicePage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default App
