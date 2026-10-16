import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import FilterListOffIcon from '@mui/icons-material/FilterListOff'
import SearchOffIcon from '@mui/icons-material/SearchOff'
import EventAvailableIcon from '@mui/icons-material/EventAvailable'
import PageContainer from '../components/layout/PageContainer.jsx'
import EmptyState from '../components/common/EmptyState.jsx'
import ErrorAlert from '../components/common/ErrorAlert.jsx'
import ResultsToolbar from '../components/search/ResultsToolbar.jsx'
import RoomResultCard from '../components/search/RoomResultCard.jsx'
import RoomResultSkeleton from '../components/search/RoomResultSkeleton.jsx'
import SearchFilters from '../components/search/SearchFilters.jsx'
import SearchForm from '../components/search/SearchForm.jsx'
import StaySeasonPanel from '../components/search/StaySeasonPanel.jsx'
import { hotelApiService } from '../api/hotelApiInstance.js'
import useAsync from '../hooks/useAsync.js'
import DateFormatter from '../utils/DateFormatter.js'

const ROOM_SORTERS = {
  'price-asc': (a, b) => a.estimatedTotal - b.estimatedTotal,
  'price-desc': (a, b) => b.estimatedTotal - a.estimatedTotal,
  number: (a, b) => String(a.number).localeCompare(String(b.number), 'es', { numeric: true }),
}

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

  const visibleRooms = (rooms ?? [])
    .filter((room) => !availableOnly || room.available)
    .sort(ROOM_SORTERS[sortBy] ?? ROOM_SORTERS.number)

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

  const handleClearFilters = () => {
    setAvailableOnly(false)
    handleRoomTypeChange('')
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
    content = (
      <Stack spacing={2.5} role="status" aria-live="polite" aria-label="Consultando disponibilidad">
        {[0, 1, 2].map((index) => (
          <RoomResultSkeleton key={index} />
        ))}
      </Stack>
    )
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
      >
        {roomType && (
          <Button variant="outlined" onClick={handleClearFilters}>
            Quitar filtros
          </Button>
        )}
      </EmptyState>
    )
  } else if (visibleRooms.length === 0) {
    content = (
      <EmptyState
        icon={<FilterListOffIcon fontSize="inherit" />}
        title="Ninguna habitación coincide con tus filtros"
        description="Quita el filtro de disponibilidad para ver también las habitaciones ocupadas en tus fechas."
      >
        <Button variant="outlined" onClick={handleClearFilters}>
          Quitar filtros
        </Button>
      </EmptyState>
    )
  } else {
    content = (
      <Stack spacing={3}>
        <ResultsToolbar
          availableCount={rooms.filter((room) => room.available).length}
          totalCount={rooms.length}
          visibleCount={visibleRooms.length}
        />
        <Stack component="ul" aria-label="Habitaciones" spacing={2.5} sx={{ listStyle: 'none', p: 0, m: 0 }}>
          {visibleRooms.map((room) => (
            <Box component="li" key={room.roomId}>
              <RoomResultCard room={room} onSelect={handleSelect} />
            </Box>
          ))}
        </Stack>
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
          <Stack spacing={2.5} sx={{ width: { xs: '100%', md: 300 }, flexShrink: 0 }}>
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
