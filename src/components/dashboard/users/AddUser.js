import toast from "react-hot-toast";
import { useState } from "react";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import CustomButton from "shared/CustomButton";
import { useLocation, useHistory } from "react-router-dom";
import { createUser, updateUserService } from "services/services";

const useStyles = makeStyles((theme) => ({
  top: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "2rem",
    alignItems: "center",
  },

  formPaper: {
    padding: "2rem",
    backgroundColor: theme.palette.grey[50],
    borderRadius: "1rem",
  },

  infoPaper: {
    padding: "2rem",
    borderRadius: "1rem",
  },

  infoWrapper: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    margin: "2rem 0",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
      alignItems: "flex-start",
    },

    "& h2": {
      color: "gray",
      fontSize: "1.4rem",
    },
  },

  addBtn: {
    backgroundColor: theme.palette.grey[100],
  },
  deleteBtn: {
    backgroundColor: "tomato",
    marginLeft: "2rem",
  },
}));

export default function AddUser() {
  const classes = useStyles();
  const location = useLocation();
  const updateUser = location.state;
  const history = useHistory();

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    name: updateUser ? updateUser.name : "",
    email: updateUser ? updateUser.email : "",
    phone_number: updateUser ? updateUser.phone_number : "",
    role: updateUser ? updateUser.role : "",
    password: updateUser ? updateUser.password : "",
  });

  const handleChange = (e) => {
    e.preventDefault();
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const update = updateUser ? true : false;

  const onSubmit = async () => {
    if (update) {
      delete data.password;
      try {
        setLoading(true);
        const res = await updateUserService(updateUser.id, data);
        toast.success(res.data.message);
        setLoading(false);

        setTimeout(() => {
          history.push("/dashboard/users");
        }, 3000);
      } catch (ex) {
        setLoading(false);
        toast.error(ex.response.data.message);
      }
    } else {
      try {
        setLoading(true);
        const res = await createUser(data);
        toast.success(res.data.message);
        setLoading(false);

        setTimeout(() => {
          history.push("/dashboard/users");
        }, 3000);
      } catch (ex) {
        setLoading(false);
        toast.error(ex.response.data.message);
      }
    }
  };

  return (
    <div>
      <div className={classes.top}>
        <Typography variant="h2" color="initial">
          {update ? "Update User" : "Add User"}
        </Typography>
      </div>

      <div>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6} lg={8}>
            <Paper className={classes.formPaper}>
              <form className={classes.form} noValidate>
                <Typography>Name</Typography>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="name"
                  placeholder="Name"
                  className={classes.input}
                  type="text"
                  autoComplete="name"
                  value={data.name}
                  onChange={handleChange}
                />

                <Typography>Phone Number</Typography>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="phone_number"
                  placeholder="Phone Number"
                  className={classes.input}
                  type="number"
                  value={data.phone_number}
                  onChange={handleChange}
                />
                <Typography>Email</Typography>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  placeholder="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={data.email}
                  onChange={handleChange}
                />
                <Typography>Role</Typography>
                <FormControl
                  variant="outlined"
                  style={{
                    width: "100%",
                    margin: "1rem 0",
                  }}
                >
                  <Select
                    native
                    inputProps={{
                      name: "role",
                    }}
                    value={data.role}
                    onChange={handleChange}
                  >
                    <option value="">Role</option>
                    <option value="admin">Admin</option>
                    <option value="teller">Teller</option>
                  </Select>
                </FormControl>

                {!update && (
                  <div>
                    <Typography>Password</Typography>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      name="password"
                      placeholder="Password"
                      type="password"
                      value={data.password}
                      onChange={handleChange}
                    />
                  </div>
                )}
              </form>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <Paper className={classes.infoPaper}>
              <div className={classes.infoWrapper}>
                <Typography variant="h3" color="initial">
                  Name
                </Typography>
                <Typography color="initial">{data.name}</Typography>
              </div>
              <div className={classes.infoWrapper}>
                <Typography variant="h3" color="initial">
                  Phone
                </Typography>
                <Typography color="initial">{data.phone_number}</Typography>
              </div>
              <div className={classes.infoWrapper}>
                <Typography variant="h3" color="initial">
                  Email
                </Typography>
                <Typography color="initial">{data.email}</Typography>
              </div>
              <div className={classes.infoWrapper}>
                <Typography variant="h3" color="initial">
                  Role
                </Typography>
                <Typography color="initial">{data.role}</Typography>
              </div>
              {!update && (
                <div className={classes.infoWrapper}>
                  <Typography variant="h3" color="initial">
                    Password
                  </Typography>
                  <Typography color="initial">{data.password}</Typography>
                </div>
              )}
            </Paper>
            <CustomButton onClick={onSubmit} loading={loading}>
              {update ? "Update" : "Add"}
            </CustomButton>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
