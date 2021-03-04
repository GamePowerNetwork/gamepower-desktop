import { createMuiTheme } from '@material-ui/core/styles'
import { purple } from '@material-ui/core/colors'


// A custom theme for this app
const theme = createMuiTheme({
  palette: {
    type: "light",
    primary: {
      light: "#fff",
      main: purple[900],
    },
    secondary: {
      main: purple[100],
    },
    background: {
      default: "#d5d7d4",
    },
    contrastThreshold: 10,
  },
})

export default theme