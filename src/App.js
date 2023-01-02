import React from "react";
import Drawer from "@mui/material/Drawer";
import Form from "./Components/Form";
import './App.css'
function App() {
  const [isOpen, setIsOpen] = React.useState(false);
  function toggleDrawer() {
    setIsOpen((prevState) => !prevState);
  }
  return (
    <div className="App">
      <button className="button"onClick={toggleDrawer}>Save segment</button>

      <Drawer className="drawer" open={isOpen} onClose={toggleDrawer} anchor="right">
        <Form/>
      </Drawer>
    </div>
  );
}

export default App;
