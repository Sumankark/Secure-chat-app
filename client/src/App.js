import { createContext, useState } from "react";
import "./App.css";
import NestingRoute from "./Components/Routing/NestingRoute";

export let GlobalVariableContext = createContext();
function App() {
  let [token, setToken] = useState(localStorage.getItem("token"));
  return (
    <div className="App">
      <GlobalVariableContext.Provider
        value={{ token: token, setToken: setToken }}
      >
        <NestingRoute></NestingRoute>
      </GlobalVariableContext.Provider>{" "}
    </div>
  );
}

export default App;
