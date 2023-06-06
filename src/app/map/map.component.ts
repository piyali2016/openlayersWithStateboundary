import { Component, OnInit } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import GeoJSON from 'ol/format/GeoJSON';
import { Fill, Style, Stroke } from 'ol/style';
import { fromLonLat } from 'ol/proj';
import { HttpClient } from '@angular/common/http';
import * as d3 from 'd3';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  map!: Map;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.initializeMap();
    this.loadGeoJSON();
  }

  initializeMap(): void {
    this.map = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new OSM()
        })
      ],
      view: new View({
        center: fromLonLat([78.9629, 20.5937]), // Adjust the center coordinates as needed
        zoom: 4 // Adjust the zoom level as needed
      })
    });
  }

  loadGeoJSON(): void {
    this.http.get('assets/india.geojson').subscribe((geojson: any) => {
      const geojsonFormat = new GeoJSON();
      const features = geojsonFormat.readFeatures(geojson);

      const styleFunction = (feature: any, resolution:any) => {
           
        return new Style({
          fill: new Fill({
            color:'grey'
          }),
          stroke:new Stroke({
              color:'white',
              lineDash:[4],
              width:3
          })
        });
      };

      const vectorLayer = new VectorLayer({
        source: new VectorSource({
          format: new GeoJSON(),
          url: 'assets/india.geojson'
        }),
        style: styleFunction
      });

      this.map.addLayer(vectorLayer);
    });
  }

  getChoroplethData(): any {
    // Implement this function to fetch and return the choropleth data for the states
    // You can make an HTTP request or use any other method to retrieve the data
    // Return the choropleth data in the desired format (e.g., object or array)
  }
}
