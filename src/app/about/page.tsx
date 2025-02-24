"use client";

import TransitionContent from '@/app/utils/TransitionContent';
import styles from '@/app/about/about.module.css';

export default function About() {
  return (
    <TransitionContent>
      <div className={styles.container}>
        <h1>About this project</h1>
        <p>Heloooooo!</p>
      </div>
    </TransitionContent>
  );
}
