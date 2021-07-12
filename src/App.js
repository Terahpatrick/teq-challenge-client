// * React import and libraries
import { Toaster } from "react-hot-toast";
import { Switch, Route, Redirect } from "react-router-dom";

// * Material core
import CssBaseline from "@material-ui/core/CssBaseline";

// * custom imports
import LoginPage from "pages/LoginPage";
import UsersPage from "pages/UsersPage";
import AddUserPage from "pages/AddUserPage";
import CustomersPage from "pages/CustomersPage";
import AddCustomerPage from "pages/AddCustomerPage";
import ParcelPage from "pages/ParcelPage";
import AddParcelPage from "pages/AddParcelPage";
import DashboardPage from "pages/DashboardPage";
import { getUserToken } from "utilities/user";
import { ProtectedRoute } from "utilities/ProtectedRoutes";
import NotFoundPage from "pages/NotFoundPage";

export default function App() {
  const token = getUserToken();
  return (
    <div>
      <CssBaseline />
      <Switch>
        <Route exact path="/" component={LoginPage} />
        <ProtectedRoute
          exact
          token={token}
          path="/dashboard"
          component={DashboardPage}
        />
        <ProtectedRoute
          exact
          path="/dashboard/users"
          token={token}
          component={UsersPage}
        />
        <ProtectedRoute
          exact
          token={token}
          path="/dashboard/users/add"
          component={AddUserPage}
        />
        <ProtectedRoute
          exact
          token={token}
          path="/dashboard/customers"
          component={CustomersPage}
        />
        <ProtectedRoute
          exact
          path="/dashboard/customers/add"
          token={token}
          component={AddCustomerPage}
        />
        <ProtectedRoute
          exact
          path="/dashboard/parcels"
          token={token}
          component={ParcelPage}
        />
        <ProtectedRoute
          exact
          path="/dashboard/parcels/add"
          token={token}
          component={AddParcelPage}
        />
        <Route path="/404" component={NotFoundPage} />
        <Redirect to="/404" />
      </Switch>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}
