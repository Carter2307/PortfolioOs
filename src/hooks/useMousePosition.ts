import React from "react";

export const UseMousePosition = () => {
  const [mouse, setMouse] = React.useState<MouseEvent>();

  function onmousemove(e: PointerEvent) {
    e.preventDefault();
    setMouse(e);
  }

  React.useEffect(() => {
    window.addEventListener("pointermove", onmousemove)

    return () => {
      window.removeEventListener("pointermove", onmousemove)
    }
  }, [])


  return mouse
}