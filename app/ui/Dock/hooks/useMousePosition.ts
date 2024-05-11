import React from "react";
import {MockScope} from "undici-types/mock-interceptor";

type MousePosition  = {
  x: number
  y: number
}

export const useMousePosition = (handler: (position: MousePosition) => void) => {

  const onMouseEnter = (e:MouseEvent) => {
    e.preventDefault();
    const element = e.currentTarget as HTMLElement;

    function onMouseMove(e: MouseEvent) {
      handler({x: e.x, y: e.y})
    }

    document.addEventListener('mousemove', onMouseMove);

    element.onmouseout = () => {
      document.removeEventListener("mousemove", onMouseMove);
      element.onmouseout = null;
    }

  }


  return () => {
    return {onMouseEnter}
  }
}