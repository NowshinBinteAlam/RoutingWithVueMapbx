

<script>
import L from 'leaflet';
import { LMap, LTileLayer, LMarker, LPopup , LIcon, LPolyline} from 'vue2-leaflet';
import '../../node_modules/leaflet-routing-machine/dist/leaflet-routing-machine.js';
import '../../node_modules/leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet-control-geocoder';
import 'leaflet-routing-machine';
import '../Mapbox';


export default {
  name: 'TestRouting',
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup,
    LIcon,
    
  },
  data () {
    return null;
  },
  mounted: function() {
    this.initializeRouting();
 },

  methods: {
      initializeRouting() {
    if (this.props.map && !this.routing) {
      const plan = new L.Routing.Plan([
        L.latLng(48.7803903, 9.17304129113012),
        L.latLng(48.7761079, 9.2507503)
      ], {
        routeWhileDragging: false,
        geocoder: L.Control.Geocoder.nominatim(),
      });

      this.routing = L.Routing.control({
        plan,
        serviceUrl: 'url',
        router: L.Routing.mapbox(MAPBOX_TOKEN),
      });

      this.props.map.leafletElement.addControl(this.routing);
      L.DomEvent.on(this.props.map.leafletElement, 'click', this.createPopupsHandler);
    }
  },
  }
};
</script>
