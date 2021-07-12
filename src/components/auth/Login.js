import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Avatar from "@material-ui/core/Avatar";
import TextField from "@material-ui/core/TextField";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import CustomButton from "shared/CustomButton";
import { login } from "services/services";
import { getDecodedUser, setUserToken } from "utilities/user";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: theme.palette.primary.main,
    height: "100vh",
  },

  paper: {
    marginTop: "12rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    maxWidth: "30rem",
    padding: "2rem 1rem",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Login() {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onBlur" });

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const res = await login(data);
      toast.success(res.data.message);
      setUserToken(res.data.data.token);
      setLoading(false);

      const user = getDecodedUser(res.data.data.token);

      setTimeout(() => {
        if (user.role === "admin") {
          window.location.href = "/dashboard";
        } else {
          window.location.href = "/dashboard/customers";
        }
      }, 3000);
    } catch (ex) {
      setLoading(false);
      toast.error(ex.response.data.message);
    }
  };

  return (
    <Container component="main" maxWidth className={classes.container}>
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h2">
          Login
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            {...register("email", {
              required: true,
            })}
            error={errors.email ? true : false}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            {...register("password", {
              required: true,
            })}
            error={errors.password ? true : false}
          />
          <CustomButton onClick={handleSubmit(onSubmit)} loading={loading}>
            Login
          </CustomButton>
        </form>
      </Paper>
    </Container>
  );
}
