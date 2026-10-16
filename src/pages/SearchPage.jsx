import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Stack from '@mui/material/Stack'
import SearchOffIcon from '@mui/icons-material/SearchOff'
import EventAvailableIcon from '@mui/icons-material/EventAvailable'
import PageContainer from '../components/layout/PageContainer.jsx'
import EmptyState from '../components/common/EmptyState.jsx'
import ErrorAlert from '../components/common/ErrorAlert.jsx'
import LoadingState from '../components/common/LoadingState.jsx'
import AvailabilityLegend from '../components/search/AvailabilityLegend.jsx'
import AvailabilitySummary from '../components/search/AvailabilitySummary.jsx'
import RoomGrid from '../components/search/RoomGrid.jsx'
import SearchFilters from '../components/search/SearchFilters.jsx'
import SearchForm from '../components/search/SearchForm.jsx'
import StaySeasonPanel from '../components/search/StaySeasonPanel.jsx'
import { hotelApiService } from '../api/hotelApiInstance.js'
import useAsync from '../hooks/useAsync.js'
import DateFormatter from '../utils/DateFormatter.js'

/**
 * Página de búsqueda de disponibilidad. El rango de fechas y el tipo viven en la URL.
 */
function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()

  const checkIn = searchParams.get('checkIn') ?? ''
  const checkOut = searchParams.get('checkOut') ?? ''
  const roomType = searchParams.get('roomType') ?? ''
  const hasValidRange = Boolean(checkIn && checkOut) && DateFormatter.nightsBetween(checkIn, checkOut) > 0
  const [availableOnly, setAvailableOnly] = useState(false)
  const [sortBy, setSortBy] = useState('number')

  const { data: rooms, loading, error, execute } = useAsync(
    () => (hasValidRange ? hotelApiService.searchAvailability(checkIn, checkOut, roomType || undefined) : Promise.resolve(null)),
    [checkIn, checkOut, roomType, hasValidRange],
  )

  const handleSearch = (values) => {
    const params = { checkIn: values.checkIn, checkOut: values.checkOut }
    if (values.roomType) {
      params.roomType = values.roomType
    }
    setSearchParams(params)
  }

  const handleSelect = (room) => {
    const params = new URLSearchParams({ checkIn, checkOut })
    navigate(`/reservar/${room.roomId}?${params.toString()}`)
  }

  const handleRoomTypeChange = (type) => {
    const params = { checkIn, checkOut }
    if (type) {
      params.roomType = type
    }
    setSearchParams(params)
  }

  const handleRetry = () => {
    execute().catch(() => {})
  }

  let content
  if (!hasValidRange) {
    content = (
      <EmptyState
        icon={<EventAvailableIcon fontSize="inherit" />}
        title="Selecciona tus fechas"
        description="Indica la fecha de entrada y de salida para ver las habitaciones disponibles."
      />
    )
  } else if (loading) {
    content = <LoadingState message="Consultando disponibilidad..." />
  } else if (error) {
    content = (
      <ErrorAlert
        message={error.message || 'No fue posible consultar la disponibilidad. Intenta de nuevo.'}
        onRetry={handleRetry}
      />
    )
  } else if (!rooms || rooms.length === 0) {
    content = (
      <EmptyState
        icon={<SearchOffIcon fontSize="inherit" />}
        title="No hay habitaciones para este filtro"
        description="Prueba con otro tipo de habitación o con otras fechas."
      />
    )
  } else {
    content = (
      <Stack spacing={3}>
        <AvailabilitySummary checkIn={checkIn} checkOut={checkOut} rooms={rooms} />
        <AvailabilityLegend />
        <RoomGrid rooms={rooms} onSelect={handleSelect} />
      </Stack>
    )
  }

  const nights = DateFormatter.nightsBetween(checkIn, checkOut)
  const subtitle = hasValidRange
    ? `${DateFormatter.format(checkIn)} - ${DateFormatter.format(checkOut)} · ${nights} ${nights === 1 ? 'noche' : 'noches'}`
    : undefined

  return (
    <PageContainer
      title="Habitaciones disponibles"
      subtitle={subtitle}
      band={
        <SearchForm
          key={searchParams.toString()}
          initialValues={{ checkIn, checkOut, roomType }}
          onSubmit={handleSearch}
        />
      }
    >
      {hasValidRange ? (
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={3} sx={{ alignItems: 'flex-start' }}>
          <Stack spacing={2.5} sx={{ width: { xs: '100%', md: 280 }, flexShrink: 0 }}>
            <SearchFilters
              roomType={roomType}
              onRoomTypeChange={handleRoomTypeChange}
              availableOnly={availableOnly}
              onAvailableOnlyChange={setAvailableOnly}
              sortBy={sortBy}
              onSortChange={setSortBy}
            />
            <StaySeasonPanel checkIn={checkIn} checkOut={checkOut} />
          </Stack>
          <Stack spacing={3} sx={{ flex: 1, minWidth: 0, width: '100%' }}>
            {content}
          </Stack>
        </Stack>
      ) : (
        content
      )}
    </PageContainer>
  )
}

export default SearchPage
