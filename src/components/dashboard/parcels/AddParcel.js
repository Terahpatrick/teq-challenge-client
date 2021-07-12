import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import toast from "react-hot-toast";
import { useState } from "react";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import CustomButton from "shared/CustomButton";
import { useLocation, useHistory } from "react-router-dom";
import { createParcel, updateParcelService } from "services/services";
import { useFetchData } from "hooks/fetchData";

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

export default function AddParcel() {
  const classes = useStyles();

  const location = useLocation();
  const updateParcel = location.state;
  const history = useHistory();

  const { data: c } = useFetchData("customers");
  const customers = c || [];

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    name: updateParcel ? updateParcel.name : "",
    sender_id: updateParcel ? updateParcel.sender_id : "",
    recepient_id: updateParcel ? updateParcel.recepient_id : "",
    amount: updateParcel ? updateParcel.amount : "",
    description: updateParcel ? updateParcel.description : "",
    status: updateParcel ? updateParcel.status : "",
  });

  const handleChange = (e) => {
    e.preventDefault();
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const update = updateParcel ? true : false;

  const onSubmit = async () => {
    delete data.teller_id;
    data.amount = +data.amount;
    data.sender_id = +data.sender_id;
    data.recepient_id = +data.recepient_id;
    if (update) {
      try {
        setLoading(true);
        const res = await updateParcelService(updateParcel.id, data);
        toast.success(res.data.message);
        setLoading(false);

        setTimeout(() => {
          history.push("/dashboard/parcels");
        }, 3000);
      } catch (ex) {
        setLoading(false);
        toast.error(ex.response.data.message);
      }
    } else {
      try {
        delete data.status;

        setLoading(true);
        const res = await createParcel(data);
        toast.success(res.data.message);
        setLoading(false);

        setTimeout(() => {
          history.push("/dashboard/parcels");
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
          {update ? "Update Dispatch" : "Dispatch Parcel"}
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
                  value={data.name}
                  onChange={handleChange}
                  placeholder="Name"
                  className={classes.input}
                  type="text"
                  autoComplete="name"
                />
                <Typography>Sender</Typography>
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
                      name: "sender_id",
                    }}
                    value={data.sender_id}
                    onChange={handleChange}
                  >
                    <option value="">Sender</option>
                    {customers.map((item) => (
                      <option value={item.id} key={item.id}>
                        {item.name}
                      </option>
                    ))}
                  </Select>
                </FormControl>

                <Typography>Receipient</Typography>
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
                      name: "recepient_id",
                    }}
                    value={data.recepient_id}
                    onChange={handleChange}
                  >
                    <option value="">Recepient</option>
                    {customers.map((item) => (
                      <option value={item.id} key={item.id}>
                        {item.name}
                      </option>
                    ))}
                  </Select>
                </FormControl>

                <Typography>Amount</Typography>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="amount"
                  placeholder="Amount"
                  type="number"
                  className={classes.input}
                  multiline
                  value={data.amount}
                  onChange={handleChange}
                />

                <Typography>Description</Typography>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="description"
                  placeholder="description"
                  type="text"
                  className={classes.input}
                  multiline
                  value={data.description}
                  onChange={handleChange}
                />

                {update && (
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
                        name: "status",
                      }}
                      value={data.status}
                      onChange={handleChange}
                    >
                      <option value="">Status</option>
                      <option value="sent">Sent</option>
                      <option value="received">Received</option>
                    </Select>
                  </FormControl>
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
                  Sender
                </Typography>
                <Typography color="initial">{data.sender_id}</Typography>
              </div>
              <div className={classes.infoWrapper}>
                <Typography variant="h3" color="initial">
                  Recepient
                </Typography>
                <Typography color="initial">{data.recepient_id}</Typography>
              </div>

              <div className={classes.infoWrapper}>
                <Typography variant="h3" color="initial">
                  Description
                </Typography>
                <Typography color="initial">KSH. {data.amount}</Typography>
              </div>

              <div className={classes.infoWrapper}>
                <Typography variant="h3" color="initial">
                  Description
                </Typography>
                <Typography color="initial">{data.description}</Typography>
              </div>

              {update && (
                <div className={classes.infoWrapper}>
                  <Typography variant="h3" color="initial">
                    Status
                  </Typography>
                  <Typography color="initial">{data.status}</Typography>
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
