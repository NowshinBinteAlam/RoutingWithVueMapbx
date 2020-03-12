/* eslint-disable */
<script>
import L from 'leaflet';
import { LMap, LTileLayer, LMarker, LPopup , LIcon} from 'vue2-leaflet';
import 'leaflet-routing-machine';
import 'leaflet-control-geocoder';
import '../Mapbox';

export default {
  name: 'Routing',
  components: {
    
  },
  data () {
    url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png';
    const propTypes = {
        map: PropTypes.object,
      };
    const { routingPopUp } = this.state;
    if (routingPopUp) return <Popup {...this.state.routingPopUp} />;

    return null;
  },
  mounted: function() {
    
 },
  methods: {
    

  constructor(props) {
      constructor(props);
      this.state = {
        routingPopUp: null,
      };
      this.initializeRouting = this.initializeRouting.bind(this);
      this.destroyRouting = this.destroyRouting.bind(this);
      this.createPopupsHandler = this.createPopupsHandler.bind(this);
      this.setRoutingPopUp = this.setRoutingPopUp.bind(this);
  },

  componentDidUpdate() {
    this.initializeRouting();
  },

  componentWillUnmount() {
    this.destroyRouting();
  },

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

  destroyRouting() {
    if (this.props.map) {
      this.props.map.leafletElement.removeControl(this.routing);
      L.DomEvent.off(this.props.map.leafletElement, 'click', this.createPopupsHandler);
    }
  },

  createPopupsHandler(e) {
    const position = e.latlng;
    const startBtnOnClick = () => {
      this.routing.spliceWaypoints(0, 1, position);
      this.setRoutingPopUp(null);
    };
    const endBtnOnClick = () => {
      this.routing.spliceWaypoints(this.routing.getWaypoints().length - 1, 1, position);
      this.setRoutingPopUp(null);
    };
    const startBtn = <button onClick={startBtnOnClick}>Set begin position</button>;
    const endBtn = <button onClick={endBtnOnClick}>Set end position</button>;
    const children = (<div>
      {startBtn}
      {endBtn}
    </div>);
    const onClose = this.setRoutingPopUp;
    this.setRoutingPopUp({ children, position, onClose });
  },

  setRoutingPopUp(routingPopUp) {
    this.setState({ routingPopUp });
  }
  }
}
</script>
