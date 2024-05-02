import {Dock} from "./ui/Dock/dock.tsx";
import {DotGrid} from "./ui/DotGrid/DotGrid.tsx";
import {DockApp} from "./ui/Dock/DockApp";
import {DockCard} from "./ui/Dock/DockCard";

function App() {
  const magnification = 1;
  const app1 = new App("Calculator", "icon src","<Component/>")
  // app1 => {_id, run, name, icon}

  const APPS = [
    {
      name: "Calculator",
      icon: "",
      run: () => {
        console.log("Calculator")
      }
    },
    {
      name: "Music",
      icon: "",
      run: () => {
      }
    },
    {
      name: "Note",
      icon: "",
      run: () => {
      }
    },
    {
      name: "Currency",
      icon: "",
      run: () => {
      }
    },
    {
      name: "Setting",
      icon: "",
      run: () => {
      }
    }
  ]
  return (
    <>
      <Dock magnification={magnification}>
        {APPS.map((app, index) => {
          return <DockApp key={index} onClick={app.run}>
            <DockCard src={app.name} />
          </DockApp>
        })}
      </Dock>
      <DotGrid cols={8} rows={8} squareSize={8} dotSize={4}/>
    </>
  )
}

export default App
