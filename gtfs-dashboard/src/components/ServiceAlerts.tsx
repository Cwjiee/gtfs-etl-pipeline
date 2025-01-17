import { Alert } from '../lib/gtfs'

interface ServiceAlertsProps {
  alerts: Alert[];
}

export default function ServiceAlerts({ alerts }: ServiceAlertsProps) {
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <ul className="divide-y divide-gray-200">
        {alerts.map((alert, index) => (
          <li key={index} className="px-4 py-4 sm:px-6">
            <div className="text-sm font-medium text-indigo-600">
              {alert.headerText.translation[0].text}
            </div>
            <div className="mt-2 text-sm text-gray-500">
              {alert.descriptionText.translation[0].text}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}


