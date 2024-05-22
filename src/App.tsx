// App.tsx

import React, { useState, useEffect } from 'react';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import MapComponent from './MapComponent';

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



async function fetchData(): Promise<FloodMonitoringStation[]>{

  const apiUrl = 'http://environment.data.gov.uk/flood-monitoring/id/stations'; 
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

const App: React.FC = () => {
  const [markers, setMarkers] = useState<FloodMonitoringStation[]>([]);

  useEffect(() => {
    // Fetch marker data from API or other source
    const dummyData: FloodMonitoringStation[] = [dummyStation];
    setMarkers(dummyData);
    fetchData().then( data => {
      console.log(data);
      console.log(typeof(data));
      // this removes empty long and lat values so they do not break map component on render
      setMarkers(data.filter(
        (p) =>  typeof p.lat === 'number' && typeof p.long === 'number'
      ));
    }
    );
  }, []);

  return (
    
    <div> ``
    <div>
      <header style={{
        backgroundImage: "url('https://tile.loc.gov/storage-services/service/pnp/prokc/21500/21503v.jpg')",
        backgroundSize: 'contain',
        fontFamily: 'Georgia, Times New Roman, Times, serif',
        color: '#ffffff',
        height: '300px',
        textAlign: 'center',
        paddingTop: '50px'
      }}>
        <h1>Henry Maher</h1>
        {/* You can add any additional content for the header here */}
      </header>
      <nav style={{
        backgroundColor: '#ffffff',
        border: '2px solid #000000',
        padding: '10px',
        textAlign: 'center'
      }}>
        <a href="#">Home</a>
        <a href="#">About</a>
        <a href="#">Services</a>
        <a href="#">Contact</a>
        {/* Add more navigation links as needed */}
      </nav>
      <div className="about-container" style={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: '50px',
        borderTop: '2px solid #000000',
        borderBottom: '2px solid #000000'
      }}>
        <div className="about-left" style={{ width: '50%', paddingRight: '20px' }}>
          <h2>About Me</h2>
          <p>This is the left side of the about me section.</p>
        </div>
        <div className="about-right" style={{ width: '50%', paddingLeft: '20px' }}>
          <img src="about-image.jpg" className="about-image" style={{ float: 'right', width: '200px' }} /> {/* Path to your about me image */}
        </div>
      </div>
    {/* <div style={{ height: '400px', width: '100%' }}> */}
    <MapComponent/>
    </div>
    </div>
  );
};

export default App;