// src/MapComponent.tsx
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import MarkerClusterGroup from "react-leaflet-cluster";
import L from 'leaflet';

// Set the default icon
const defaultIcon = L.icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = defaultIcon;

// Dummy data
const dummyStation: FloodMonitoringStation = {
  "@id_x": "http://environment.data.gov.uk/flood-monitoring/id/stations/1029TH",
  RLOIid: "7041",
  catchmentName: "Cotswolds",
  dateOpened: "1994-01-01",
  easting: 417990,
  label_x: "Bourton Dickler",
  lat: 51.874767,
  long: -1.740083,
  measures: [
      {
          "@id": "http://environment.data.gov.uk/flood-monitoring/id/measures/1029TH-level-downstage-i-15_min-mASD",
          parameter: "level",
          parameterName: "Water Level",
          period: 900,
          qualifier: "Downstream Stage",
          unitName: "mASD"
      },
      {
          "@id": "http://environment.data.gov.uk/flood-monitoring/id/measures/1029TH-level-stage-i-15_min-mASD",
          parameter: "level",
          parameterName: "Water Level",
          period: 900,
          qualifier: "Stage",
          unitName: "mASD"
      }
  ],
  northing: 219610,
  notation_x: "1029TH",
  riverName: "River Dikler",
  stageScale: "http://environment.data.gov.uk/flood-monitoring/id/stations/1029TH/stageScale",
  stationReference: "1029TH",
  status: "http://environment.data.gov.uk/flood-monitoring/def/core/statusActive",
  town: "Little Rissington",
  wiskiID: "1029TH",
  datumOffset: null,
  gridReference: null,
  downstageScale: null,
  "@id_y": "http://environment.data.gov.uk/flood-monitoring/id/measures/1029TH-level-downstage-i-15_min-mASD",
  datumType: "http://environment.data.gov.uk/flood-monitoring/def/core/datumASD",
  label_y: "RIVER DIKLER AT BOURTON ON THE WATER - level-downstage-i-15_min-mASD",
  latestReading: {
      "@id": "http://environment.data.gov.uk/flood-monitoring/data/readings/1029TH-level-downstage-i-15_min-mASD/2024-05-16T10-15-00Z",
      date: "2024-05-16",
      dateTime: "2024-05-16T10:15:00Z",
      measure: "http://environment.data.gov.uk/flood-monitoring/id/measures/1029TH-level-downstage-i-15_min-mASD",
      value: -0.133
  },
  notation_y: "1029TH-level-downstage-i-15_min-mASD",
  parameter: "level",
  parameterName: "Water Level",
  period: 900,
  qualifier: "Downstream Stage",
  station: "http://environment.data.gov.uk/flood-monitoring/id/stations/1029TH",
  unit: "http://qudt.org/1.1/vocab/unit#Meter",
  unitName: "mASD",
  valueType: "instantaneous",
  reading: "http://environment.data.gov.uk/flood-monitoring/data/readings/1029TH-level-downstage-i-15_min-mASD/2024-05-16T10-15-00Z",
  readingValue: -0.133
};

interface Measure {
  "@id": string;
  parameter: string;
  parameterName: string;
  period: number;
  qualifier: string;
  unitName: string;
}

interface LatestReading {
  "@id": string;
  date: string;
  dateTime: string;
  measure: string;
  value: number;
}

interface APIResponse {
  items: FloodMonitoringStation[]
}

interface FloodMonitoringStation {
  "@id_x": string;
  RLOIid: string;
  catchmentName: string;
  dateOpened: string;
  easting: number;
  label_x: string;
  lat: number;
  long: number;
  measures: Measure[];
  northing: number;
  notation_x: string;
  riverName: string;
  stageScale: string;
  stationReference: string;
  status: string;
  town: string;
  wiskiID: string;
  datumOffset: number | null;
  gridReference: string | null;
  downstageScale: string | null;
  "@id_y": string;
  datumType: string;
  label_y: string;
  latestReading: LatestReading;
  notation_y: string;
  parameter: string;
  parameterName: string;
  period: number;
  qualifier: string;
  station: string;
  unit: string;
  unitName: string;
  valueType: string;
  reading: string;
  readingValue: number;
}

async function fetchData(): Promise<FloodMonitoringStation[]> {
  const apiUrl = 'https://environment.data.gov.uk/flood-monitoring/id/stations';
  try {
      const response: Response = await fetch(apiUrl);
      if (!response.ok) {
          throw new Error('Failed to fetch data');
      }
      const data: APIResponse = await response.json();
      return data.items;
  } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
  }
};

const MapComponent: React.FC = () => {
  const [markers, setMarkers] = useState<FloodMonitoringStation[]>([]);

  useEffect(() => {
    // Fetch marker data from API or other source
    const dummyData: FloodMonitoringStation[] = [dummyStation];
    setMarkers(dummyData);
    fetchData().then(data => {
      console.log(data);
      console.log(typeof (data));
      // This removes empty long and lat values so they do not break the map component on render
      setMarkers(data.filter(
        (p) => typeof p.lat === 'number' && typeof p.long === 'number'
      ));
    });
  }, []);

  return (
    <MapContainer center={[51.505, -0.09]} maxZoom={18} zoom={7} style={{ height: '400px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <MarkerClusterGroup>
        {markers.map(marker => (
          <Marker key={marker.wiskiID} position={[marker.lat, marker.long]}>
            <Popup>
              <div>
                <h3>{marker.catchmentName}</h3>
                <p>{marker.label_x}</p>
              </div>
            </Popup>
          </Marker>
        ))}
        </MarkerClusterGroup>
    </MapContainer>
  );
};

export default MapComponent;
