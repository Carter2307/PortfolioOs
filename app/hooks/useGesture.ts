export function useDrag(handler: (x: number, y: number) => void) {
  const onMouseDown = (event: MouseEvent) => {
    const element = event.currentTarget as HTMLElement;

    let shiftX = event.clientX - element.getBoundingClientRect().left;
    let shiftY = event.clientY - element.getBoundingClientRect().top;

    function moveAt(x: number, y: number) {
      handler(x - shiftX, y - shiftY)
    }

    function onMouseMove(event: MouseEvent) {
      moveAt(event.clientX, event.clientY);
    }

    document.addEventListener("mousemove", onMouseMove);

    element.onmouseup = (_) => {
      document.removeEventListener("mousemove", onMouseMove);
      element.onmouseup = null;
    }
  }


  return () => {
    return {onMouseDown}
  }
}