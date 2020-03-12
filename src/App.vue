<template>
<body>
  <div id="app">
    <app-nav-bar></app-nav-bar>
  </div>
  <map
      id="full_div"
      :is="currentView"/>
</body>
</template>

<script>

import Map from './components/Map';
import AppNavBar from './components/AppNavBar';
import  '../node_modules/vue-strap';


export default {
  name: 'App',
  components: {
   
    Map,
    AppNavBar,
   
   
  },
  data () {
    return {
      currentView: 'Map',
      from:'',
      to:''

    };
  },
  methods:{
    formSubmitted:(event) => {
      event.preventDefault();
      console.log("This is default");
      
    },
    valueChanged:(event) => {
      console.log("This changed");
      //console.log(event);
      //console.log("This is from:" + from.value);
      //console.log("This is to:" + this.to.value);
    },
  },
};

</script>

<style>


@import "../node_modules/leaflet/dist/leaflet.css";


.search {
  position: absolute;
  overflow-x: auto;
  float: left;
  left: 10px;
  top: 65px;
  width:250px;


}
#full_div {
  position: absolute;
  overflow-x: auto;
  top: 55px;
  right: 0;
  left: 0;
  bottom: 0;
  padding-left: 0px;
  border-left: 1px solid rgb(32, 24, 24);
}
</style>
