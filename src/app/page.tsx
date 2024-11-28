'use client';

import styles from './Page.module.css';

export default function Page() {
  return (
    <main className={styles.main}>
      {/* Background Video */}
      <video
        className={styles.backgroundVideo}
        src="https://memorylog-app.s3.us-west-1.amazonaws.com/maui-vhs-1.mp4"
        autoPlay
        muted
        loop
      />

      {/* Center Center: Title */}
      <h1 className={styles.title}>Memorylog</h1>

      {/* Bottom Center: Credit */}
      <div className={styles.credit}>
        <p className={styles.creditSmall}>a project by</p>
        <p className={styles.creditLarge}>Vinícius Miazaki de Moraes</p>
      </div>
    </main>
  );
}
