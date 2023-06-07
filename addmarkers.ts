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
  
 loadGeoJSON(): void {
  this.http.get('assets/india.geojson').subscribe((data: any) => {
    const geojson = data;

    // Add the vector layer for state boundaries
    const vectorSource = new VectorSource({
      format: new GeoJSON(),
      features: new GeoJSON().readFeatures(geojson)
    });

    const vectorLayer = new VectorLayer({
      source: vectorSource,
      style: this.getStyleFunction()
    });

    this.map.addLayer(vectorLayer);

    // Add markers using the loaded data
    this.addMarkers(geojson);
  });
}

addMarkers(geojson: any) {
  const vectorSource = new VectorSource();
  const iconStyle = new Style({
    image: new Icon({
      src: 'assets/marker.png', // Replace with the path to your marker image
      anchor: [0.5, 1] // Adjust the anchor point if needed
    })
  });

  // Iterate over the features in the GeoJSON data
  geojson.features.forEach((feature: any) => {
    // Extract the coordinates from the feature properties or geometry
    const coordinates = feature.geometry.coordinates;

    // Create the marker feature
    const markerFeature = new Feature({
      geometry: new Point(coordinates)
    });

    // Set the style for the marker feature
    markerFeature.setStyle(iconStyle);

    // Add the marker feature to the vector source
    this.vectorSource.addFeature(markerFeature);
  });
   const vectorLayer = new VectorLayer({
      source: vectorSource
    });

    this.map.addLayer(vectorLayer);
}

}
