import { useHistory } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import UsersTable from "./UsersTable";

const useStyles = makeStyles((theme) => ({
  top: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "2rem",
    alignItems: "center",
  },

  addBtn: {
    backgroundColor: "tomato",
    color: "white",
    padding: ".5rem 1rem",
    "&:hover": {
      backgroundColor: "tomato",
    },
  },
}));

export default function Users() {
  const classes = useStyles();

  const history = useHistory();
  const navigate = (url) => {
    history.push({
      pathname: url,
    });
  };
  return (
    <div>
      <div className={classes.top}>
        <Typography variant="h2">Users</Typography>
        <Button
          variant="text"
          className={classes.addBtn}
          onClick={() => navigate("/dashboard/users/add")}
        >
          Add User
        </Button>
      </div>
      <UsersTable />
    </div>
  );
}
