import SearchOffIcon from '@mui/icons-material/SearchOff'
import Button from '@mui/material/Button'
import { Link as RouterLink } from 'react-router-dom'
import EmptyState from '../components/common/EmptyState.jsx'
import PageContainer from '../components/layout/PageContainer.jsx'

/**
 * Página mostrada cuando la ruta solicitada no existe.
 */
function NotFoundPage() {
  return (
    <PageContainer>
      <EmptyState
        title="Página no encontrada"
        titleComponent="h1"
        description="La página que buscas no existe o fue movida."
        icon={<SearchOffIcon />}
      >
        <Button variant="contained" component={RouterLink} to="/">
          Volver al inicio
        </Button>
      </EmptyState>
    </PageContainer>
  )
}

export default NotFoundPage
