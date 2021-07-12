// * Material core
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

// * styles
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  btn: {
    margin: theme.spacing(3, 0, 3),
    padding: ".5rem",
    borderRadius: "2rem",
    fontSize: "16px",
  },
}));

export default function CustomButton({ children, width, onClick, loading }) {
  const classes = useStyles();
  return (
    <Button
      fullWidth
      variant="contained"
      color="primary"
      className={classes.btn}
      style={{ width }}
      onClick={onClick}
    >
      {loading && <CircularProgress size={30} color="white" />}
      {!loading && children}
    </Button>
  );
}
