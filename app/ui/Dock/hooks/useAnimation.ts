import React from "react";

import { useState } from 'react';

export const useAnimation = () => {
  const [currentValue, setCurrentValue] = useState(0);

  const animateNumber = (x1, x2, d) => {
    const startTime = new Date().getTime();

    const updateNumber = () => {
      const currentTime = new Date().getTime();
      const elapsedTime = currentTime - startTime;
      if (elapsedTime < d) {
        const progress = (elapsedTime / d);
        const newValue = x1 + (x2 - x1) * progress;
        setCurrentValue(newValue);
        requestAnimationFrame(updateNumber);
      } else {
        setCurrentValue(x2);
      }
    };

    updateNumber();
  };

  return animateNumber;
};



// Easing function - Quadratic ease-out
function easeOutQuad(t) {
  return 1 - Math.pow(1 - t, 3);
}

/*
function easeInOutExpo(x) {
  return x === 0
    ? 0
    : x === 1
      ? 1
      : x < 0.5 ? Math.pow(2, 20 * x - 10) / 2
        : (2 - Math.pow(2, -20 * x + 10)) / 2;
}


function easeOutBack(x: number): number {
  const c1 = 1.70158;
  const c3 = c1 + 1;

  return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
}*/
