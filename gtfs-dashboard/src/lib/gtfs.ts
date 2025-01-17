export interface VehiclePosition {
  vehicle: {
    id: string;
  };
  position: {
    latitude: number;
    longitude: number;
  };
}

export interface Alert {
  headerText: {
    translation: { text: string }[];
  };
  descriptionText: {
    translation: { text: string }[];
  };
}

export interface TripUpdate {
  trip: {
    tripId: string;
    routeId: string;
  };
  stopTimeUpdate: {
    stopSequence: number;
    arrival: {
      delay: number;
    };
  }[];
}

export interface GtfsData {
  vehiclePositions: VehiclePosition[];
  serviceAlerts: Alert[];
  tripUpdates: TripUpdate[];
}

export async function fetchGtfsData(): Promise<GtfsData> {
  const response = await fetch('http://localhost:3000/api/gtfs-data', { next: {
    revalidate: 30 }
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
}


