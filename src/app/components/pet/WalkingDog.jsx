"use client";
import DogSprite from "./DogSprite";
import useDogMotion, { DOG_SIZE } from "./useDogMotion";
import styles from "./Dog.module.css";

export default function WalkingDog() {
  const { rootRef, flipRef, mode, handlers } = useDogMotion();

  return (
    <div
      ref={rootRef}
      className={styles.root}
      data-state={mode}
      style={{ width: DOG_SIZE.width, height: DOG_SIZE.height }}
      aria-hidden="true"
      {...handlers}
    >
      <div ref={flipRef} className={styles.flip}>
        <DogSprite />
      </div>
    </div>
  );
}