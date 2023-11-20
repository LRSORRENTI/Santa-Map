import Head from 'next/head';

import Header from '@components/Header';
import Footer from '@components/Footer';

import styles from './Layout.module.scss';

const Layout = ({ children, className, ...rest }) => {
  return (
    <div className={styles.layout}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        {/* <meta name="viewport" content="width=device-width, initial-scale=0"/> */}
        <meta name="viewport" content="width=1024, user-scalable=no"/>

      </Head>
      {/* <Header /> */}
      <main className={styles.main}>{children}</main>
      {/* <Footer /> */}
    </div>
  );
};

export default Layout;
