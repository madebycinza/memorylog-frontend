"use client";

import TransitionContent from '@/app/utils/TransitionContent';
import styles from '@/app/[...slug]/404.module.css';

export default function Custom404() {
  return (
    <TransitionContent>
      <div className={styles.container}>
        <h1 className={styles.title}>404</h1>
        <p className={styles.description}>Page Not Found</p>
      </div>
    </TransitionContent>
  );
}
