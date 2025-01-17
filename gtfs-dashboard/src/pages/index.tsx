import { useState, useEffect } from 'react'
import { GetServerSideProps } from 'next'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import { fetchGtfsData, GtfsData } from '../lib/gtfs'
import ServiceAlerts from '../components/ServiceAlerts'
import TripUpdates from '../components/TripUpdates'

// const VehicleMap = dynamic(() => import('../components/VehicleMap'), { ssr: false })

interface DashboardProps {
  initialData: GtfsData;
}

export default function Dashboard({ initialData }: DashboardProps) {
  const [data, setData] = useState<GtfsData>(initialData);

  useEffect(() => {
    const updateData = async () => {
      try {
        const newData = await fetchGtfsData();
        setData(newData);
      } catch (error) {
        console.error('Error fetching GTFS data:', error);
      }
    };

    const intervalId = setInterval(updateData, 30000); // Update every 30 seconds

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <Head>
        <title>GTFS Realtime Dashboard</title>
        <meta name="description" content="Dashboard for public transport data using GTFS Realtime" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 className="text-3xl font-bold mb-8">Public Transport Dashboard</h1>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Vehicle Positions</h2>
        {/*<VehicleMap vehicles={data.vehiclePositions} /> */}
      </div>
      
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Service Alerts</h2>
        <ServiceAlerts alerts={data.serviceAlerts} />
      </div>
      
      <div>
        <h2 className="text-2xl font-semibold mb-4">Trip Updates</h2>
        <TripUpdates updates={data.tripUpdates} />
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const initialData = await fetchGtfsData();
  return { props: { initialData } };
};


