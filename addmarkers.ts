import { Component, OnInit } from '@angular/core';
import { Map, View } from 'ol';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Icon from 'ol/style/Icon';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  map: Map;

  ngOnInit() {
    this.initializeMap();
    this.addMarkers();
  }

  initializeMap() {
    // Map initialization code here...
  }

  addMarkers() {
    const iconStyle = new Icon({
      src: 'assets/marker.png', // Replace with the path to your marker image
      anchor: [0.5, 1] // Adjust the anchor point if needed
    });

    const markerFeature = new Feature({
      geometry: new Point([longitude, latitude]) // Replace with the coordinates of your marker
    });
    markerFeature.setStyle(iconStyle);

    const vectorSource = new VectorSource({
      features: [markerFeature]
    });

    const vectorLayer = new VectorLayer({
      source: vectorSource
    });

    this.map.addLayer(vectorLayer);
  }
}
