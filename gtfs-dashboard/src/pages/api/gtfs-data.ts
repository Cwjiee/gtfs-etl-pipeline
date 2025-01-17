import { NextApiRequest, NextApiResponse } from 'next'
import { GtfsData } from '../../lib/gtfs'

export default function GET(
  req: NextApiRequest,
  res: NextApiResponse<GtfsData>
) {
  // In a real-world scenario, you would fetch this data from your GTFS Realtime feed
  const mockData: GtfsData = {
    vehiclePositions: [
      {
        vehicle: { id: "1" },
        position: { latitude: 40.7128, longitude: -74.0060 }
      },
      {
        vehicle: { id: "2" },
        position: { latitude: 34.0522, longitude: -118.2437 }
      }
    ],
    serviceAlerts: [
      {
        headerText: { translation: [{ text: "Service Disruption" }] },
        descriptionText: { translation: [{ text: "Delays on Line 1 due to maintenance" }] }
      }
    ],
    tripUpdates: [
      {
        trip: { tripId: "trip1", routeId: "route1" },
        stopTimeUpdate: [{ stopSequence: 1, arrival: { delay: 300 } }]
      }
    ]
  }

  res.status(200).json(mockData)
}


