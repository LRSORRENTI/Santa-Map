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
import IdBar from '@components/IdBar/IdBar';
import styles from '@styles/Home.module.scss';
import ChristmasLights from '@components/ChristmasLights/ChristmasLights';
import dotenv from 'dotenv/config'


const NEXT_PUBLIC_MAPBOX_API_KEY = process.env.NEXT_PUBLIC_MAPBOX_API_KEY;
const tileLayerUrl = `https://api.mapbox.com/styles/v1/luke-rs/clp2rcwm700y601qndjnf4wxr/tiles/256/{z}/{x}/{y}@2x?access_token=${NEXT_PUBLIC_MAPBOX_API_KEY}`

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
  
// The api stops in the year 2019, to get current date and time:

  // const currentDate = new Date(Date.now());
  // Uncomment the above on Christmas to see the tracker 
  // work in real time, for now I'll leave the below date 
  // hardcoded for visual fidelity

  const currentDate = new Date('2023-12-25T02:34:30.115Z');
  const currentYear = currentDate.getFullYear();

    const destinations = data?.destinations.map((destination) => {
    const { arrival, departure } = destination;
  
    const arrivalDate = new Date(arrival);
    const departureDate = new Date(departure);
  
    arrivalDate.setFullYear(currentYear);
    departureDate.setFullYear(currentYear);
  
    // Mapping through each destination, ultimately creating a new array of destinations
    // Getting the arrival and departure dates into a new Date object
    // Using our currentYear value to adjust our arrival and departure
    // Returning all the destination data with the updated values

    return {
      ...destination,
      arrival: arrivalDate.getTime(),
      departure:  departureDate.getTime(),
    }
  });

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
        <title>Santa Tracker</title>
        <meta name="description" content="Create mapping apps with Next.js Leaflet Starter" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Section className="section">
        <Container>
        <ChristmasLights/>
          <h1 className={styles.title}>
            Where is Santa Claus?
          </h1>
          <IdBar/>

          <Map className={styles.homeMap} width="800" height="400" center={[0, 0]} zoom={1}>
            {({ TileLayer, Marker, Popup }, Leaflet) => (
              <>
               
                <TileLayer url={tileLayerUrl}/>
                {/* <Marker position={DEFAULT_CENTER}>
                  <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                  </Popup>
                </Marker> */}
                   {destinations?.map(({ id, arrival, departure, location, city, region }) => {
                        // Starting off, let's figure out where Santa currently is.

                        // For every destination, we have our arrival time and departure time, 
                        //which we're already using in the Popup. We can compare those values to the current 
                        // time to determine where he is.

                        // Next, we need to dynamically set our icon URLs to 
                        // use new icons in different time instances.

                        let iconUrl = '/images/tree.png';

                        const arrivalDate = new Date(arrival);
                        const arrivalHours = arrivalDate.getHours()
                        const arrivalMinutes = arrivalDate.getMinutes()
                        const arrivalTime = `${arrivalHours}:${arrivalMinutes}`;

                        const departureDate = new Date(departure);
                        const departureHours = departureDate.getHours()
                        const departureMinutes = departureDate.getMinutes()
                        const departureTime = `${departureHours}:${departureMinutes}`;
                        
                        const santaWasHere = currentDate.getTime() - departureDate.getTime() > 0;
                        const santaIsHere = currentDate.getTime() - arrivalDate.getTime() > 0 && !santaWasHere
                        
                        let className = '';

                        if ( santaIsHere ) {
                          iconUrl = '/images/santa.png';
                          className = `${className} ${styles.iconSantaIsHere}`;
                        }
                        
                        if ( santaWasHere ) {
                          iconUrl = '/images/present.png';
                        }

                        //Here we're:

                        // Using the arrival and departure times to create new dates
                        // Getting specific values for both date and time
                        // Formatting the time
                        // Adding arrival and departure datetimes to Popup
                        // And when we reload the page and click on a pin, we should see all of our information!
            return (
              <Marker key={id} 
                      position={[location.lat, location.lng]}
                      icon={Leaflet.icon({
                        iconUrl,
                        // iconRetinaUrl: '/images/tree-marker-icon-2x.png',
                        iconSize: [21, 21],
                        className
                      })}>
              <Popup>
                <strong>Location:</strong> { city }, { region }
                <br />
                <strong>Arrival:</strong> { arrivalDate.toDateString() } @ { arrivalTime }
                <br />
                <strong>Departure:</strong> { arrivalDate.toDateString() } @ { departureTime }
              </Popup>
              </Marker>
                    )
                })}
              </>
            )}
          </Map>
                
          {/* <h1 className={styles.titleTwo}>
          https://github.com/LRSORRENTI/Santa-Map
          </h1> */}
        </Container>
        
      </Section>
      
    </Layout>
  )
}
