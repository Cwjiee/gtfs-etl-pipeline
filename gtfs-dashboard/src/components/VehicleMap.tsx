 import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
 import 'leaflet/dist/leaflet.css'
 import { Icon } from "leaflet"
 import { VehiclePosition } from '../lib/gtfs'
 
 interface VehicleMapProps {
   vehicles: VehiclePosition[];
 }
 
 const customIcon = new Icon({
   iconUrl: "/marker-icon.png",
   iconSize: [25, 41],
   iconAnchor: [12, 41]
 });
 
 export default function VehicleMap({ vehicles }: VehicleMapProps) {
   return (
     <MapContainer center={[0, 0]} zoom={2} style={{ height: '400px', width: '100%' }}>
       <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
       {vehicles.map((vehicle) => (
         <Marker 
           key={vehicle.vehicle.id} 
           position={[vehicle.position.latitude, vehicle.position.longitude]}
           icon={customIcon}
         >
           <Popup>
             Vehicle ID: {vehicle.vehicle.id}
           </Popup>
         </Marker>
       ))}
     </MapContainer>
   )
 }
 
 
