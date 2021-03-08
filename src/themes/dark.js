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
            main: "#FFF",
        },
        background: {
            default: "#121212",
        }
    },
    overrides: {
        MuiTab: {
            textColorPrimary: '#FFF',
        },
        MuiButton: {
            root: {
                
            },
            containedPrimary: {
                backgroundImage: "linear-gradient(103deg, rgb(204, 0, 43) 0%, rgb(191, 101, 0) 0%, rgb(189, 1, 189) 100%)",
            }
        },
        MuiPaper: {
            root: {
                backgroundColor: "#202020",
            }
        },
        MuiTypography: {
            root: {
                color: "rgb(201, 196, 189)",
            }
        }
    }
})

export default theme