import React, { useContext } from "react";
import { UserContext } from "../../../context-providers";
import "./index.scss";

function DashboardPage() {
  const { name } = useContext(UserContext);

  return (
    <div>
      <h1>Welcome, {name}!</h1>
      <h2>Head over to the "Bookings" tab to view/make bookings.</h2>

      <p>
        <strong>Note:</strong> Treeckle is currently in development as part of a
        ​
        <a
          className="text-link"
          href="https://www.cs3216.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          CS3216
        </a>{" "}
        Final Project, and we are working hard towards making residential life
        better for you. If you have feedback for us and/or would like to have
        your voice heard in the future of this application, please fill up this{" "}
        <a
          className="text-link"
          href="https://forms.gle/pk9LXadxp1dgDaSD8"
          target="_blank"
          rel="noopener noreferrer"
        >
          form
        </a>
        .
      </p>

      <p>
        For urgent queries or concerns, please contact us at ​
        <a className="text-link" href="mailto:admin@treeckle.com">
          admin@treeckle.com
        </a>
        .
      </p>
    </div>
  );
}

export default DashboardPage;
