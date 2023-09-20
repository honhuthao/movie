import { useRoutes } from "react-router-dom";
import { router } from "./router";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div>
      <ToastContainer style={{ marginTop: "80px" }} />
      {useRoutes(router)}
    </div>
  );
}

export default App;
