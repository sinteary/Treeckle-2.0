import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import {
  LoginPage,
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
  DASHBOARD_PATH,
  BOOKINGS_PATH,
  EVENTS_PATH,
  ADMIN_BOOKINGS_PATH,
  ADMIN_SETTINGS_PATH,
  ADMIN_USERS_PATH,
  PROFILE_PATH,
} from "./utils/route-path-constants";
import "./App.scss";

const isLoggedIn = true;

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route
            path={LOGIN_PATH}
            exact
            render={() =>
              isLoggedIn ? <Redirect to={DASHBOARD_PATH} /> : <LoginPage />
            }
          />
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
      </Router>
    </div>
  );
}

export default App;
