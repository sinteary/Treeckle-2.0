import React from "react";
import { toast } from "react-toastify";
import Routes from "./routes";
import { UserProvider } from "./context-providers";
import "react-toastify/dist/ReactToastify.min.css";
import "./App.scss";

toast.configure({
  position: "bottom-center",
  autoClose: 3000,
});

function App() {
  return (
    <div className="App">
      <UserProvider>
        <Routes />
      </UserProvider>
    </div>
  );
}

export default App;
