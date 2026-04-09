import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps'
import { mockThreats } from '../data/mock-threats'

const GEO_URL = '/countries-110m.json'

export function ThreatMap() {
  return (
    <ComposableMap
      projectionConfig={{ scale: 140 }}
      style={{ width: '100%', height: '100%' }}
    >
      <Geographies geography={GEO_URL}>
        {({ geographies }) =>
          geographies.map((geo) => (
            <Geography
              key={geo.rsmKey}
              geography={geo}
              className='fill-muted stroke-border stroke-[0.5px] outline-none'
            />
          ))
        }
      </Geographies>

      {mockThreats.map((threat) => (
        <Marker key={threat.id} coordinates={threat.coordinates}>
          {/* Outer pulsing ring */}
          <circle r={8} className='fill-red-500/20 animate-ping' />
          {/* Inner solid dot */}
          <circle r={4} className='fill-red-500' />
        </Marker>
      ))}
    </ComposableMap>
  )
}
