import React from "react";
import "./dotgrid.css"

export function DotGrid(props) {
  const {cols, rows, squareSize, dotSize, ...rest} = props;


  //Method 1 : Using CSS Grid and fit the square to the grid space
  const gridStyle = {
    display: "grid",
    gridTemplateColumns: `repeat(${cols}, ${squareSize}fr)`,
    gridTemplateRows: `repeat(${rows}, ${squareSize}fr)`
  }
  return <section className={"dot-grids"} style={gridStyle}>
    {
      [1, 2, 3, 4, 5, 6, 7, 8].map((el, index) => {
        return <div className={"grids-square"}></div>
      })
    }
    {
      [1, 2, 3, 4, 5, 6, 7, 8].map((el, index) => {
        return <div className={"grids-square"}></div>
      })
    }
    {
      [1, 2, 3, 4, 5, 6, 7, 8].map((el, index) => {
        return <div className={"grids-square"}></div>
      })
    }


  </section>
}

