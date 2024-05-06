import React from "react";

export const useMousePosition = () => {
  const [position, setPosition] = React.useState({
    x: 0, y: 0
  })

  const handlemousemove = (e:MouseEvent) => {
    e.preventDefault();
    setPosition({x: e.x, y: e.y});
  }

  React.useEffect(() => {
    window.addEventListener("mousemove", handlemousemove);
    return () => {
      window.removeEventListener("mousemove", handlemousemove);
    }
  }, []);

  return position;
}