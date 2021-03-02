import { createMuiTheme } from '@material-ui/core/styles'
import { purple, red } from '@material-ui/core/colors'


// A custom theme for this app
const theme = createMuiTheme({
    palette: {
        type: "dark",
        primary: {
            light: purple[100],
            main: purple[900],
        },
        secondary: {
            main: purple[100],
        },
    },
    overrides: {
        MuiTab: {
            textColorPrimary: '#FFF',
        }
    }
})

export default theme