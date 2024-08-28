import './App.css';
import {RouterProvider} from "react-router-dom";
import router from "./router";
import ReactQueryWrapper from "./provider";

function App() {
  return(
      <ReactQueryWrapper>
        <RouterProvider router={router}/>
      </ReactQueryWrapper>
  );
}

export default App;
