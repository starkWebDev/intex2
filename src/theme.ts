import { createMuiTheme } from "@material-ui/core/styles";
import { blueGrey } from "@material-ui/core/colors";


export const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#104891",
            dark: "#0b3265",
            light: "#3f6ca7",
            contrastText: "#ffffff"
        },
        secondary: {
            main: "#00695c",
            dark: "#004940",
            light: "#33877c",
            contrastText: "#ffffff"
        },
        background: {
            default: blueGrey[100]
        }
    }
});
