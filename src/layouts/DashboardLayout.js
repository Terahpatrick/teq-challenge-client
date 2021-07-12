// * react and libaries
import React from "react";
import PropTypes from "prop-types";
import { useLocation, useHistory } from "react-router-dom";

// * material core
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Popover from "@material-ui/core/Popover";
import Avatar from "@material-ui/core/Avatar";

// * material icons
import DashboardIcon from "@material-ui/icons/DashboardOutlined";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import PeopleIcon from "@material-ui/icons/People";
import SupervisedUserCircleIcon from "@material-ui/icons/SupervisedUserCircle";
import LocalMallIcon from "@material-ui/icons/LocalMall";

// * assets
// import { getUserInfo, getCustomerInfo } from "utils/user";

// * styles
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { getDecodedUser, getUserToken, logoutUser } from "utilities/user";

const drawerWidth = 280;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawerRoot: {
    backgroundColor: theme.palette.primary.main,
    color: "white",
    minHeight: "100vh",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
    backgroundColor: "white",
    color: theme.palette.primary.main,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    backgroundColor: "#ebecf0",
    minHeight: "100vh",
  },

  logo: {
    margin: "2rem",
  },
  listItem: {
    margin: "1rem 0",
    "&:hover": {
      backgroundColor: theme.palette.secondary.main,
    },
  },

  activelist: {
    backgroundColor: "white",
    color: theme.palette.primary.main,
    borderLeft: `6px solid ${theme.palette.secondary.main}`,

    "&:hover": {
      backgroundColor: theme.palette.secondary.main,
    },
  },

  main: {
    backgroundColor: "#ebecf0",
  },

  accountSwitch: {
    margin: "1rem 0 2rem 0",
  },

  innerSwitch: {
    backgroundColor: theme.palette.secondary.main,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: ".5rem 1rem",
    cursor: "pointer",
  },
}));

function DashboardLayout(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const location = useLocation();
  const history = useHistory();

  const userToken = getUserToken();
  const user = getDecodedUser(userToken);
  console.log(user);

  const name = user.name.split(" ");
  const one = name[0]?.substring(0, 1).toUpperCase() || "";
  const two = name[1]?.substring(0, 1).toUpperCase() || "";
  const initials = one.concat(two);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleActiveLink = (path) => {
    if (location.pathname.includes(path)) return true;
    return false;
  };

  const navigate = (url, name) => {
    history.push({
      pathname: url,
      state: {
        name,
      },
    });
  };

  // For popover switch accouts
  const [anchorEl1, setAnchorEl1] = React.useState(null);

  const handleClick1 = (event) => {
    setAnchorEl1(event.currentTarget);
  };

  const handleClose1 = () => {
    setAnchorEl1(null);
  };

  const open1 = Boolean(anchorEl1);
  const id1 = open1 ? "simple-popover" : undefined;

  const drawer = (
    <div className={classes.drawerRoot}>
      <div className={classes.toolbar}>
        <div
          style={{
            marginTop: "2rem",
            marginLeft: "2rem",
          }}
        >
          <Typography variant="h2" color="initial">
            {user.role === "admin" ? "ADMIN" : "TELLER"}
          </Typography>
        </div>
      </div>

      <List>
        {user.role === "admin" && (
          <ListItem
            button
            className={
              location.pathname === "/dashboard" || !location.pathname
                ? classes.activelist
                : classes.listItem
            }
            onClick={() => navigate("/dashboard", "")}
          >
            <ListItemIcon>
              <DashboardIcon
                style={{
                  color:
                    location.pathname === "/dashboard" || !location.pathname
                      ? "#0D5EAA"
                      : "white",
                }}
                fontSize="large"
              />
            </ListItemIcon>
            <ListItemText primary="Dashboard" style={{ fontSize: "2rem" }} />
          </ListItem>
        )}

        {user.role === "admin" && (
          <ListItem
            button
            className={
              handleActiveLink("users") ? classes.activelist : classes.listItem
            }
            onClick={() => navigate("/dashboard/users", "")}
          >
            <ListItemIcon>
              <PeopleIcon
                style={{
                  color: handleActiveLink("users") ? "#0D5EAA" : "white",
                }}
                fontSize="large"
              />
            </ListItemIcon>
            <ListItemText primary="Users" />
          </ListItem>
        )}
        <ListItem
          button
          className={
            handleActiveLink("customers")
              ? classes.activelist
              : classes.listItem
          }
          onClick={() => navigate("/dashboard/customers", "")}
        >
          <ListItemIcon>
            <SupervisedUserCircleIcon
              style={{
                color: handleActiveLink("customers") ? "#0D5EAA" : "white",
              }}
              fontSize="large"
            />
          </ListItemIcon>
          <ListItemText primary="Customers" />
        </ListItem>

        <ListItem
          button
          className={
            handleActiveLink("parcels") ? classes.activelist : classes.listItem
          }
          onClick={() => navigate("/dashboard/parcels", "")}
        >
          <ListItemIcon>
            <LocalMallIcon
              style={{
                color: handleActiveLink("parcels") ? "#0D5EAA" : "white",
              }}
              fontSize="large"
            />
          </ListItemIcon>
          <ListItemText primary="Parcels" />
        </ListItem>
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <span></span>

          <div className={classes.avatar}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
              }}
              onClick={handleClick1}
            >
              <Avatar style={{ background: "#0D5EAA" }}>{initials}</Avatar>
              <ExpandMoreIcon />
            </div>
            <Popover
              id={id1}
              open={open1}
              anchorEl={anchorEl1}
              onClose={handleClose1}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
            >
              <List>
                <ListItem
                  button
                  style={{ width: "260px" }}
                  onClick={logoutUser}
                >
                  <ListItemIcon>
                    <ExitToAppIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText primary="Logout" color="primary" />
                </ListItem>
              </List>
            </Popover>
          </div>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true,
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <div className={classes.main}>{props.children}</div>
      </main>
    </div>
  );
}

DashboardLayout.propTypes = {
  window: PropTypes.func,
};

export default DashboardLayout;
