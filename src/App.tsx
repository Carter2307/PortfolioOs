import {Dock} from "./components/Dock/dock.tsx";
import {DockApp} from "./components/Dock/DockApp";
import {DockCard} from "./components/Dock/DockCard";
import apps from "./data/apps.tsx";
import {Header} from "./components/Header/header.tsx";

function App() {
  const magnification = 1;

  return (
    <>
      <Header/>
      <Dock magnification={magnification}>
        {apps.map((a, index) => {
          return <DockApp key={index} onClick={a.run} app={a}>
            <DockCard src={a.icon} />
          </DockApp>
        })}
      </Dock>
    </>
  )
}

export default App
