import styles from './404.module.css';
import Link from 'next/link';

export default function Custom404() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>404 - Page Not Found</h1>
      <p className={styles.description}>
        Sorry, the page you are looking for does not exist or has been removed.
      </p>
      <Link href="/" className={styles.link}>
        Return to Homepage
      </Link>
    </div>
  );
}
