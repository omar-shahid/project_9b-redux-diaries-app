import { makeStyles } from "@material-ui/core"
import { grey } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
    root: {
    //   flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(-1),
    },
    title: {
      flexGrow: 1,
    },
    headingGrey: {
        color: grey[800]
    },
    link: {
        textDecoration: "none",
        color: theme.palette.text.primary
    }
  }));

export default useStyles