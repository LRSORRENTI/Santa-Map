import Head from 'next/head';

import useSWR from 'swr';

// We could use fetch and store data in state,
// using SWR gives a cleaner 
// way to manage that request.

import Layout from '@components/Layout';
import Section from '@components/Section';
import Container from '@components/Container';
import Map from '@components/Map';
import Button from '@components/Button';

import styles from '@styles/Home.module.scss';

const DEFAULT_CENTER = [38.907132, -77.036546]

// And to use our newly imported SWR hook,
// we have two parts, where first we
// define our "fetch" function, 
// which is essentially the abstracted request logic.

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Home() {
  const { data } = useSWR(
    'https://firebasestorage.googleapis.com/v0/b/santa-tracker-firebase.appspot.com/o/route%2Fsanta_en.json?alt=media&2018b',
    fetcher
  );
  

  // A review of what's happening, we're using the useSWR hook 
  // which will give us some data fetching 
  // features (caching, revalidation). 
  // But we need to tell SWR 2 things: how to fetch the 
  // data (fetcher) and where (our endpoint).

  // And with that, we should have our data, 
  // which we can now test by adding a console log. 
  // There, when we load our page and look in the console, 
  // we should see a bunch of destinations logged out:

  return (
    <Layout>
      <Head>
        <title>Next.js Leaflet Starter</title>
        <meta name="description" content="Create mapping apps with Next.js Leaflet Starter" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Section>
        <Container>
          <h1 className={styles.title}>
            Next.js Leaflet Starter
          </h1>

          <Map className={styles.homeMap} width="800" height="400" center={DEFAULT_CENTER} zoom={12}>
            {({ TileLayer, Marker, Popup }) => (
              <>
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                />
                {/* <Marker position={DEFAULT_CENTER}>
                  <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                  </Popup>
                </Marker> */}
                   {data?.destinations?.map(({ id, location, city, region }) => {
            return (
                      <Marker key={id} position={[location.lat, location.lng]}>
                      <Popup>{ city }, { region }</Popup>
                      </Marker>
                    )
                })}
              </>
            )}
          </Map>

          <p className={styles.description}>
              Santa Tracker
          </p>

          <p className={styles.view}>
            <Button>View</Button>
          </p>
        </Container>
      </Section>
    </Layout>
  )
}
