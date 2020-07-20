import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { NavigationContainer } from "./components/navigation";
import {
  LoginPage,
  AccountCreationPage,
  ResetPasswordPage,
  DashboardPage,
  BookingsPage,
  EventsPage,
  AdminBookingsPage,
  AdminUsersPage,
  AdminSettingsPage,
  ProfilePage,
} from "./components/pages";
import {
  LOGIN_PATH,
  NEW_USER_PATH,
  RESET_USER_PATH,
  DASHBOARD_PATH,
  BOOKINGS_PATH,
  EVENTS_PATH,
  ADMIN_BOOKINGS_PATH,
  ADMIN_SETTINGS_PATH,
  ADMIN_USERS_PATH,
  PROFILE_PATH,
} from "./utils/route-path-constants";
import { UserContext } from "./context-providers";

function Routes() {
  const { token } = useContext(UserContext);

  return (
    <Router>
      <NavigationContainer>
        <Switch>
          <Route
            path={LOGIN_PATH}
            exact
            render={() =>
              token ? <Redirect to={DASHBOARD_PATH} /> : <LoginPage />
            }
          />
          <Route path={NEW_USER_PATH} render={() => <AccountCreationPage />} />
          <Route path={RESET_USER_PATH} render={() => <ResetPasswordPage />} />
          {!token && <Route children={() => <Redirect to={LOGIN_PATH} />} />}
          <Route path={DASHBOARD_PATH} exact render={() => <DashboardPage />} />
          <Route path={BOOKINGS_PATH} exact render={() => <BookingsPage />} />
          <Route path={EVENTS_PATH} exact render={() => <EventsPage />} />
          <Route
            path={ADMIN_BOOKINGS_PATH}
            exact
            render={() => <AdminBookingsPage />}
          />
          <Route
            path={ADMIN_USERS_PATH}
            exact
            render={() => <AdminUsersPage />}
          />
          <Route
            path={ADMIN_SETTINGS_PATH}
            exact
            render={() => <AdminSettingsPage />}
          />
          <Route path={PROFILE_PATH} exact render={() => <ProfilePage />} />
          <Route children={() => <Redirect to={LOGIN_PATH} />} />
        </Switch>
      </NavigationContainer>
    </Router>
  );
}

export default Routes;
