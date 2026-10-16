import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Divider from '@mui/material/Divider'
import Skeleton from '@mui/material/Skeleton'
import Stack from '@mui/material/Stack'

/**
 * Esqueleto con la misma forma que RoomResultCard, mientras se consulta la disponibilidad.
 */
function RoomResultSkeleton() {
  return (
    <Card component="div" aria-hidden="true" sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, overflow: 'hidden' }}>
      <Skeleton variant="rectangular" sx={{ width: { xs: '100%', md: 240 }, aspectRatio: { xs: '16 / 9', md: 'auto' }, minHeight: { md: 200 }, height: { xs: 'auto', md: 'auto' }, flexShrink: 0 }} />
      <Stack spacing={1.25} sx={{ p: { xs: 2.5, md: 3 }, flexGrow: 1, minWidth: 0 }}>
        <Skeleton variant="text" width="45%" sx={{ fontSize: '1.25rem' }} />
        <Skeleton variant="text" width="60%" />
        <Skeleton variant="text" width="90%" />
        <Skeleton variant="rounded" width={180} height={28} sx={{ mt: 0.5 }} />
      </Stack>
      <Divider orientation="vertical" flexItem sx={{ display: { xs: 'none', md: 'block' } }} />
      <Divider sx={{ display: { xs: 'block', md: 'none' } }} />
      <Box sx={{ p: { xs: 2.5, md: 3 }, width: { xs: '100%', md: 200 }, flexShrink: 0 }}>
        <Stack spacing={1} sx={{ alignItems: { md: 'flex-end' } }}>
          <Skeleton variant="text" width={80} />
          <Skeleton variant="text" width={120} sx={{ fontSize: '1.5rem' }} />
          <Skeleton variant="rounded" width="100%" height={40} sx={{ mt: 1 }} />
        </Stack>
      </Box>
    </Card>
  )
}

export default RoomResultSkeleton
