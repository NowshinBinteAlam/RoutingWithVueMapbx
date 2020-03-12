<template>
  <div>
   <button class="play_button" type="submit" position="relative" @click="buttonClick">Start</button>
    <l-map ref="map"
      :zoom="zoom"
      :center="{lat: currentLocation.lat, lng: currentLocation.lng}"
      style="height: 100%"
      @update:center="geolocation"
      @update:zoom="zoomUpdate"
      >
      <l-tile-layer
        :url="url"
        :attribution="attribution"/>
      <l-marker :lat-lng="{lat: currentLocation.lat, lng: currentLocation.lng}" :icon="icon">
            <l-popup >
            <div @click="popupClick">
              I am here...
            </div>
          </l-popup>
      </l-marker>
      <!--<l-polyline :lat-lngs="travel"/>-->
    </l-map>
  </div>
</template>

<script>

//import L from 'leaflet';
//import icon from 'leaflet';
//import {Routing, props, line, circle} from 'leaflet';
import {L, LControlAttribution,LMap, LTileLayer, LMarker, LPopup , LIcon, LPolyline, LCircle } from 'vue2-leaflet';
import 'leaflet-routing-machine';
import 'leaflet-control-geocoder';

import "../../node_modules/leaflet/dist/leaflet.css";
import '../../node_modules/leaflet-routing-machine/dist/leaflet-routing-machine.js';
import '../../node_modules/leaflet-routing-machine/dist/leaflet-routing-machine.css';

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});
import AppNavBar from '../components/AppNavBar';

export default {
  name: 'Map',
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup,
    LIcon,
    LPolyline,
    LCircle,
    L,
    AppNavBar
  },
  data () {
    defaultIcon: null;
    return {
      zoom: 12,
      center:L.latLng(47.413220, -1.219482),
      url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      marker: L.latLng(47.413220, -1.219482),
      currentZoom: 13,
      currentCenter: L.latLng(47.413220, -1.219482),
      showParagraph: false,
      currentLocation : { lat : 0, lng : 0},
      icon: L.icon({
        iconUrl: 'https://unpkg.com/leaflet@1.0.3/dist/images/marker-icon-2x.png',
        iconSize: [25, 41],
        iconAnchor: [12.5, 41],
        popupAnchor: [0, -41]
      }),
      staticAnchor: [16, 37],
      iconSize: 64,
      map: null,
      };
    },
  mounted: function() {
    this.geolocation();
    this.$nextTick(() => {
      this.map = this.$refs.map.mapObject 
    });
    console.log(this.map);
    console.log(this.$refs.map.mapObject);
    var latlngs = [
      [45.51, -122.68],
      [37.77, -122.43],
      [34.04, -118.2]
    ];
    //alert(this.$refs.map.mapObject.getCenter());
    //L.circle([50.5, 30.5], {radius: 200}).addTo(this.$refs.map.mapObject);

    //L.polyline(latlngs, {color: 'red'}).addTo(this.$refs.map.mapObject);;
    //this.initializeRouting();
    },
  methods: {
    zoomUpdate (zoom) {
      this.currentZoom = zoom;
      },
    showLongText () {
      this.showParagraph = !this.showParagraph;
      },
    popupClick () {
      alert('Popup Click!');
      },
    buttonClick() {
      console.log(this.currentLocation.lat, this.currentLocation.lng);
      L.circle([this.currentLocation.lat, this.currentLocation.lng], {radius: 200}).addTo(this.$refs.map.mapObject);
      this.initializeRouting();
    },
    geolocation : function() {
      window.navigator.geolocation.getCurrentPosition((position,currentLocation) => {
        this.currentLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        console.log("here i am :");
        console.log("here is my location :"+JSON.stringify(this.currentLocation));
      },()=>{
        console.log('Oh no.. they didnt give us their location... ');
        });
      },
    initializeRouting() {
      L.Routing.control({
        waypoints: [
          L.latLng(48.7801165, 9.1731849),
          L.latLng(48.7764501, 9.2500882)
          ],
        /*router: new L.Routing.osrmv1({
          language: 'en',
          profile: 'car',
          }),*/
        /*line: new L.Routing.line({
          styles: [{color: 'blue', opacity: 1, weight: 5}]
          }),*/
        router: new L.Routing.mapbox('pk.eyJ1IjoibmVlbGEwMTkiLCJhIjoiY2pndzlvZHFuMTdsYzJxbnZ6OXI0c2pkeCJ9.bsd5VID5633UXuEDCe28uA'),
        geocoder: L.Control.Geocoder.nominatim({}),
        routeWhileDragging: true,
        collapsible: false,
          }).addTo(this.$refs.map.mapObject);
      },
  },
};
</script>
<style>
#play_button{
position: absolute;
left: 120px;
right:0;
}

</style>