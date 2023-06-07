import { Component, OnInit } from '@angular/core';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import Style from 'ol/style/Style';
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';
import Text from 'ol/style/Text';
import { Feature } from 'ol';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  map: Map;

  ngOnInit() {
    this.initializeMap();
    this.addIndiaBoundary();
    this.addMarkers();
  }

  initializeMap() {
    this.map = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new OSM()
        })
      ],
      view: new View({
        center: [0, 0],
        zoom: 2
      })
    });
  }

  addIndiaBoundary() {
    const indiaGeoJsonUrl = 'assets/india.geojson';

    const vectorSource = new VectorSource({
      url: indiaGeoJsonUrl,
      format: new GeoJSON()
    });

    const vectorLayer = new VectorLayer({
      source: vectorSource,
      style: new Style({
        stroke: new Stroke({
          color: 'rgba(0, 0, 0, 0.5)',
          width: 1
        }),
        fill: new Fill({
          color: 'rgba(255, 255, 255, 0.1)'
        })
      })
    });

    this.map.addLayer(vectorLayer);
  }

  addMarkers() {
    const markerData = [
      {
        name: 'Marker 1',
        latitude: 28.6139,
        longitude: 77.2090,
        description: 'This is Marker 1'
      },
      {
        name: 'Marker 2',
        latitude: 12.9716,
        longitude: 77.5946,
        description: 'This is Marker 2'
      },
      {
        name: 'Marker 3',
        latitude: 18.5204,
        longitude: 73.8567,
        description: 'This is Marker 3'
      }
    ];

    const vectorSource = new VectorSource();

    markerData.forEach(marker => {
      const markerFeature = new Feature({
        geometry: new Point([marker.longitude, marker.latitude])
      });

      const markerStyle = new Style({
        image: new Circle({
          radius: 6,
          fill: new Fill({ color: 'red' }),
          stroke: new Stroke({ color: 'white', width: 2 })
        }),
        text: new Text({
          text: marker.name,
          font: '12px Arial',
          offsetY: -15,
          fill: new Fill({ color: 'black' })
        })
      });

      markerFeature.setStyle(markerStyle);
      vectorSource.addFeature(markerFeature);

      markerFeature.on('click', (event) => {
        const selectedMarker = event.target;
        console.log('Clicked Marker:', selectedMarker.getProperties());
        // Perform any actions or display information related to the clicked marker
      });
    });

    const vectorLayer = new VectorLayer({
      source: vectorSource
    });

    this.map.addLayer(vectorLayer);
  }
}
