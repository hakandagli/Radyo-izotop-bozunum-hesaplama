import VueRouter from "vue-router";
import ExampleComponent from "./components/ExampleComponent";
import decay from "./components/decay";
import time from "./components/time";
import calculateDecay from "./components/calculateDecay";
import calculateTime from "./components/calculateTime";
const routes= [

    {
        path: "/",
        component:  ExampleComponent,
        name: "home",
        props: true
    },{
        path: "/decay",
        component: decay,
        name: "decayDashboard",
        props: true
    },
    {
        path: "/decay/calculate",
        component: calculateDecay,
        name: "decayCalculate",
        props:true 
    },{
        path: "/time",
        component: time,
        name: "timeDashboard",
        props: true
    },{
        path: "/time/calculate",
        component: calculateTime,
        name: "timeCalculate",
        props:true 
    }


]

const router = new VueRouter({

    routes,
    mode: 'history'

});

export default router;