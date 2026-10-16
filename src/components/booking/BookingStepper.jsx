import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import Stepper from '@mui/material/Stepper'

const STEPS = ['Habitación', 'Datos del huésped', 'Confirmación']

/**
 * Indicador de progreso del proceso de reserva.
 * @param {Object} props
 * @param {number} props.activeStep Índice del paso activo (0 a 2).
 */
function BookingStepper({ activeStep }) {
  return (
    <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }} aria-label="Pasos de la reserva">
      {STEPS.map((label) => (
        <Step key={label}>
          <StepLabel>{label}</StepLabel>
        </Step>
      ))}
    </Stepper>
  )
}

export default BookingStepper
