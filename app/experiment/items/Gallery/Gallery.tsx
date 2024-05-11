'use client';

import React, { MouseEventHandler, ReactNode } from 'react';
import { animated, useSpring } from '@react-spring/web';
import './gallery.css';

const IMAGES = [
  'https://i.pinimg.com/564x/0c/92/74/0c9274d95c9cc40b2aa341d82cc338d2.jpg',
  'https://i.pinimg.com/564x/4b/60/f2/4b60f2b0475c202206245183b9ddb5a5.jpg',
  'https://i.pinimg.com/564x/ef/37/36/ef373664faae48ac8e03733d7aabd828.jpg',
  'https://i.pinimg.com/564x/10/82/ae/1082ae067f1f12257be4096e0106549e.jpg',
  'https://i.pinimg.com/564x/42/b7/04/42b704ffd72688957623b0f757a504b4.jpg',
  'https://i.pinimg.com/564x/10/59/0f/10590f9dab72a942afea8966ff313d06.jpg',
];

const closeIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    x="0px"
    y="0px"
    width="24"
    height="24"
    viewBox="0 0 30 30"
  >
    <path
      d="M 7 4 C 6.744125 4 6.4879687 4.0974687 6.2929688 4.2929688 L 4.2929688 6.2929688 C 3.9019687 6.6839688 3.9019687 7.3170313 4.2929688 7.7070312 L 11.585938 15 L 4.2929688 22.292969 C 3.9019687 22.683969 3.9019687 23.317031 4.2929688 23.707031 L 6.2929688 25.707031 C 6.6839688 26.098031 7.3170313 26.098031 7.7070312 25.707031 L 15 18.414062 L 22.292969 25.707031 C 22.682969 26.098031 23.317031 26.098031 23.707031 25.707031 L 25.707031 23.707031 C 26.098031 23.316031 26.098031 22.682969 25.707031 22.292969 L 18.414062 15 L 25.707031 7.7070312 C 26.098031 7.3170312 26.098031 6.6829688 25.707031 6.2929688 L 23.707031 4.2929688 C 23.316031 3.9019687 22.682969 3.9019687 22.292969 4.2929688 L 15 11.585938 L 7.7070312 4.2929688 C 7.5115312 4.0974687 7.255875 4 7 4 z"
      fill={'white'}
    ></path>
  </svg>
);

export function Gallery() {
  return (
    <div className={'gallery'}>
      <CardsFakeGrid />
      <Cards />
    </div>
  );
}

function Card(props) {
  const { children, src, style, ...rest } = props;

  const css = {
    //transformOrigin: `${window.innerWidth / 2}px ${window.innerHeight / 2}px`,
  };
  return (
    <div className={'gallery-card'} style={{ ...css, ...style }} {...rest}>
      <img className={'gallery-card-image'} src={src} alt={'women picture'} />
    </div>
  );
}

function Cards() {
  const rotations = [-15, -5, 10, -20, -10, 15];
  const [expanded, setExpanded] = React.useState(false);
  const cardButtonRef = React.useRef<HTMLButtonElement | null>(null);
  const [springs, api] = useSpring(() => ({
    from: { y: 200, opacity: 0 },
    config: {
      mass: 1,
      friction: 10,
      tension: 200,
    },
  }));

  function onclickHandler(event: React.MouseEvent) {
    if (!cardButtonRef.current) return;
    const container = cardButtonRef.current as HTMLButtonElement;
    const childrens = Array.from(container.children) as HTMLElement[];
    const fakeChildrens = Array.from(
      document.querySelector('.gallery-fake-grid-wrapper')?.children,
    );

    childrens.forEach((c: HTMLElement, index: number) => {
      const fakeMappingItem = fakeChildrens[index];

      const props = {
        x: c.getBoundingClientRect().x,
        y: c.getBoundingClientRect().y,
        height: c.getBoundingClientRect().height,
        width: c.getBoundingClientRect().width,
        rotation: 0,
      };

      if (!expanded) {
        c.dataset.initialX = c.getBoundingClientRect().x.toString();
        c.dataset.initialY = c.getBoundingClientRect().y.toString();
      }

      const finalProps = {
        x: fakeMappingItem.getBoundingClientRect().x - props.x,

        y: fakeMappingItem.getBoundingClientRect().y - props.y,

        height: fakeMappingItem.getBoundingClientRect().height,
        width: fakeMappingItem.getBoundingClientRect().width,
      };

      console.log(finalProps);

      if (expanded) {
        c.style.height = `4rem`;
        c.style.width = `4rem`;
        c.style.transform = `translate3d(0,0, 0) rotate(${rotations[index]}deg)`;
        api.start({
          to: { y: 200, opacity: 0 },
        });
        setExpanded(false);
      } else {
        c.style.height = `${finalProps.height}px`;
        c.style.width = `${finalProps.width}px`;
        c.style.transform = `translate3d(${finalProps.x}px,${finalProps.y}px, 0) rotate(0deg)`;
        api.start({
          to: { y: 0, opacity: 1 },
        });
        setExpanded(true);
      }
    });
  }

  return (
    <div className={'gallery-buttons'}>
      <button
        className={'gallery-cards-button'}
        onClick={onclickHandler}
        ref={cardButtonRef}
      >
        {IMAGES.map((el, index) => {
          return (
            <Card
              key={index}
              style={{ transform: `rotate(${rotations[index]}deg)` }}
              src={el}
            ></Card>
          );
        })}
      </button>
      {expanded && (
        <div className={'gallery-close-button-wrapper'}>
          <animated.button
            className={'gallery-close-button'}
            onClick={onclickHandler}
            style={{ ...springs }}
          >
            {closeIcon}
          </animated.button>
        </div>
      )}
    </div>
  );
}

function CardsFakeGrid() {
  return (
    <div className={'gallery-fake-grid flex justify-center  items-center'}>
      <div className={'gallery-fake-grid-wrapper'}>
        {IMAGES.map((el, index) => {
          return <Rectangle key={index}>{index}</Rectangle>;
        })}
      </div>
    </div>
  );
}

function Rectangle({ children }: { children: ReactNode }) {
  return <div className={'rectangle'}>{children}</div>;
}
