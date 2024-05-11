import React, {ReactNode} from "react";
import './dock.css'

interface DockProps {
  children: ReactNode,
  magnification: number
}

interface DockContext {
  hovered: boolean,
  zoomLevel: number,
  width: number
}


const DockContext = React.createContext<DockContext>(null);

export const useDock = () => {
  return React.useContext(DockContext)
}

export const Dock = ({children, magnification}: DockProps) => {
  const [hovered, setHovered] = React.useState(false);
  const [width, setWidth] = React.useState(0);
  const docRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if(docRef.current) {
      setWidth(docRef.current.clientWidth)
    }
  }, [])

  return <DockContext.Provider value={{hovered, width, zoomLevel: magnification}}>
    <div
      className={"dock"}
      ref={docRef}
      onMouseOver={() => {
        setHovered(true);
      }}
      onMouseOut={() => setHovered(false)}
    >
      {children}
    </div>
  </DockContext.Provider>
}