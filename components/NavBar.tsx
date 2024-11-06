// components/NavBar.tsx
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import styles from './NavBar.module.css';

const NavBar: React.FC = () => {
  const router = useRouter();

  return (
    <nav className={styles.nav}>
      <ul className={styles.navList}>
        <li className={`${styles.navItem} ${router.pathname === '/' ? styles.active : ''}`}>
          <Link href="/">Home</Link>
        </li>
        <li className={`${styles.navItem} ${router.pathname === '/' ? styles.active : ''}`}>
          <Link href="/releasevalue">Axie Release</Link>
        </li>
      </ul>
    </nav>
  );
};


export default NavBar;