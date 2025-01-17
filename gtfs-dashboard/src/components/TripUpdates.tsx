import { TripUpdate } from '../lib/gtfs'

interface TripUpdatesProps {
  updates: TripUpdate[];
}

export default function TripUpdates({ updates }: TripUpdatesProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trip ID</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Route ID</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stop Sequence</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Delay (seconds)</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {updates.map((update, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{update.trip.tripId}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{update.trip.routeId}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{update.stopTimeUpdate[0]?.stopSequence}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{update.stopTimeUpdate[0]?.arrival?.delay}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}


