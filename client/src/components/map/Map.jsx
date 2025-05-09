
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// import './map.scss';
// import "leaflet/dist/leaflet.css";
// import L from 'leaflet';
// import Pin from '../pin/Pin';

// function Map({ items }) {
//     // Log the items to check data
  
//   // Default center if no items
//   const defaultCenter = [52.4797, -1.90269];
//   const center = items.length === 1 
//     ? [items[0].latitude, items[0].longitude]
//     : defaultCenter;

//   return (
//     <MapContainer center={center} zoom={10} scrollWheelZoom={false} className='map'>
//       <TileLayer
//         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//       />
//       {items.length > 0 ? (
//         items.map(item => (
//           <Pin item={item} key={item.id} />
//         ))
//       ) : (
//         <Marker position={defaultCenter}>
//           <Popup>No posts available</Popup>
//         </Marker>
//       )}
//     </MapContainer>
//   );
// }

// export default Map;

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import './map.scss';
import "leaflet/dist/leaflet.css";
import L from 'leaflet';
import Pin from '../pin/Pin';

// Import Leaflet marker assets
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Set default icon options for Leaflet markers
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

function Map({ items }) {
  // Default center if no items
  const defaultCenter = [52.4797, -1.90269];
  const center = items.length === 1
    ? [items[0].latitude, items[0].longitude]
    : defaultCenter;

  return (
    <MapContainer center={center} zoom={10} scrollWheelZoom={false} className='map'>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {items.length > 0 ? (
        items.map(item => (
          <Pin item={item} key={item.id} />
        ))
      ) : (
        <Marker position={defaultCenter}>
          <Popup>No posts available</Popup>
        </Marker>
      )}
    </MapContainer>
  );
}

export default Map;
