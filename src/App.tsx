import {DockArea} from "./ui/Dock/dock.tsx";
import React, {useRef} from "react";
import {DotGrid} from "./ui/DotGrid/DotGrid.tsx";

function App() {
  const magnification = 1;
  return (
    <>
      <DockArea magnification={magnification}/>
      <DotGrid cols={8} rows={8} squareSize={8} dotSize={4}/>
    </>
  )
}

export default App
