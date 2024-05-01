import React, {ReactNode} from "react";
import './dockCard.css';

interface DockCardProps {
  src: string
}

export const DockCard = ({src}: DockCardProps) => {
  return <img className={"dock-card-image"} src={src} alt={""}/>
}