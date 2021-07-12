import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

import { makeStyles } from "@material-ui/core/styles";
import UsersTable from "./users/UsersTable";
import { useFetchData } from "hooks/fetchData";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: "1rem",
    margin: "1rem 0",
    textAlign: "center",
    height: "10rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
}));
export default function Dashboard() {
  const classes = useStyles();

  const { data: parcel } = useFetchData("parcels") || [];
  const { data: users } = useFetchData("users");
  const { data: customers } = useFetchData("customers");
  const { data: revenue } = useFetchData("parcels/revenue");

  const parcels = parcel || [];

  const totalUsers = users?.length || 0;
  const totalCustomers = customers?.length || 0;
  const totalParcels = parcels?.length || 0;
  const totalRevenue = revenue?.revenue || 0;

  let sentParcels = 0;
  let receivedParcels = 0;
  for (let item of parcels) {
    if (item.status === "sent") sentParcels++;
    else receivedParcels++;
  }


  return (
    <div>
      <Typography variant="h2" color="initial">
        Dashboard
      </Typography>

      <Grid container spacing={2}>
        <Grid item md={4} sm={6} xs={12}>
          <Paper className={classes.paper}>
            <Typography variant="h3" style={{ marginBottom: ".8rem" }}>
              Total Users
            </Typography>
            <Typography variant="h2" color="primary">
              {totalUsers}
            </Typography>
          </Paper>
        </Grid>
        <Grid item md={4} sm={6} xs={12}>
          <Paper className={classes.paper}>
            <Typography variant="h3" style={{ marginBottom: ".8rem" }}>
              Total Customers
            </Typography>
            <Typography variant="h2" color="primary">
              {totalCustomers}
            </Typography>
          </Paper>
        </Grid>
        <Grid item md={4} sm={6} xs={12}>
          <Paper className={classes.paper}>
            <Typography variant="h3" style={{ marginBottom: ".8rem" }}>
              Total Revenue
            </Typography>
            <Typography variant="h2" color="primary">
              KSH. {totalRevenue}
            </Typography>
          </Paper>
        </Grid>
        <Grid item md={4} sm={6} xs={12}>
          <Paper className={classes.paper}>
            <Typography variant="h3" style={{ marginBottom: ".8rem" }}>
              Total Parcels
            </Typography>
            <Typography variant="h2" color="primary">
              {totalParcels}
            </Typography>
          </Paper>
        </Grid>
        <Grid item md={4} sm={6} xs={12}>
          <Paper className={classes.paper}>
            <Typography variant="h3" style={{ marginBottom: ".8rem" }}>
              Sent Parcels
            </Typography>
            <Typography variant="h2" color="primary">
              {sentParcels}
            </Typography>
          </Paper>
        </Grid>
        <Grid item md={4} sm={6} xs={12}>
          <Paper className={classes.paper}>
            <Typography variant="h3" style={{ marginBottom: ".8rem" }}>
              Received Parcels
            </Typography>
            <Typography variant="h2" color="primary">
              {receivedParcels}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
      <Typography
        variant="h3"
        style={{ marginBottom: "1rem", marginTop: "2rem" }}
      >
        Users summary
      </Typography>
      <UsersTable />
    </div>
  );
}
