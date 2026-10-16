import { createTheme } from '@mui/material/styles'

/**
 * Paleta del sistema visual de Hotel Reservas UCC.
 * Azul marino para la estructura, azul de acción para los botones principales
 * y ámbar como marco del buscador y marca de temporada alta.
 */
export const tokens = {
  navy: '#0b2747',
  navyDark: '#071b33',
  action: '#0a5cc2',
  actionDark: '#084a9c',
  amber: '#f2b01e',
  amberSoft: '#fdf3d7',
  ink: '#1a2433',
  inkMuted: '#596579',
  line: '#d9dee6',
  ground: '#f4f6f9',
  white: '#ffffff',
  success: '#0b7a3e',
  successSoft: '#e6f4ec',
  danger: '#c4271b',
  dangerSoft: '#fdecea',
  shadow: '0 2px 8px rgba(11, 39, 71, 0.10)',
  shadowRaised: '0 8px 24px rgba(11, 39, 71, 0.16)',
}

const fontFamily = '"Figtree Variable", "Segoe UI", system-ui, -apple-system, sans-serif'

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: tokens.action, dark: tokens.actionDark, contrastText: tokens.white },
    secondary: { main: tokens.navy, dark: tokens.navyDark, contrastText: tokens.white },
    warning: { main: tokens.amber, contrastText: tokens.ink },
    success: { main: tokens.success, light: tokens.successSoft },
    error: { main: tokens.danger, light: tokens.dangerSoft },
    text: { primary: tokens.ink, secondary: tokens.inkMuted },
    divider: tokens.line,
    background: { default: tokens.white, paper: tokens.white },
  },
  shape: { borderRadius: 8 },
  typography: {
    fontFamily,
    h1: { fontSize: 'clamp(2rem, 1.4rem + 2.4vw, 3.25rem)', fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1.1 },
    h2: { fontSize: 'clamp(1.5rem, 1.25rem + 1vw, 2rem)', fontWeight: 800, letterSpacing: '-0.015em', lineHeight: 1.2 },
    h3: { fontSize: '1.375rem', fontWeight: 700, lineHeight: 1.25 },
    h4: { fontSize: '1.25rem', fontWeight: 700, lineHeight: 1.3 },
    h5: { fontSize: '1.125rem', fontWeight: 700, lineHeight: 1.35 },
    h6: { fontSize: '1rem', fontWeight: 700, lineHeight: 1.4 },
    subtitle1: { fontSize: '1rem', fontWeight: 600 },
    subtitle2: { fontSize: '0.875rem', fontWeight: 700 },
    body1: { fontSize: '1rem', lineHeight: 1.55 },
    body2: { fontSize: '0.875rem', lineHeight: 1.5 },
    caption: { fontSize: '0.8125rem', lineHeight: 1.45 },
    button: { textTransform: 'none', fontWeight: 700, letterSpacing: 0 },
    overline: { textTransform: 'none', letterSpacing: 0, fontWeight: 700, fontSize: '0.8125rem' },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: { backgroundColor: tokens.white, fontVariantNumeric: 'lining-nums' },
      },
    },
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: { borderRadius: 6, paddingInline: 18, minHeight: 40 },
        sizeLarge: { minHeight: 48, fontSize: '1rem', paddingInline: 24 },
        outlined: { borderWidth: 1 },
      },
    },
    MuiPaper: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        outlined: { borderColor: tokens.line },
      },
    },
    MuiCard: {
      defaultProps: { variant: 'outlined' },
      styleOverrides: {
        root: { borderColor: tokens.line, borderRadius: 10 },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          backgroundColor: tokens.white,
          '& .MuiOutlinedInput-notchedOutline': { borderColor: '#a9b3c2' },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { borderRadius: 6, fontWeight: 700 },
        sizeSmall: { height: 24, fontSize: '0.75rem' },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: { fontWeight: 700, color: tokens.inkMuted, backgroundColor: tokens.ground },
        root: { borderColor: tokens.line, fontVariantNumeric: 'tabular-nums' },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: { borderRadius: 8 },
      },
    },
    MuiLink: {
      defaultProps: { underline: 'hover' },
      styleOverrides: { root: { fontWeight: 600, textUnderlineOffset: '3px' } },
    },
    MuiTooltip: {
      styleOverrides: { tooltip: { backgroundColor: tokens.ink, fontSize: '0.8125rem' } },
    },
  },
})

export default theme
