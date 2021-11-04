import Vue from 'vue'
import VueRouter from 'vue-router';
import Map from '../views/Map.vue';
import store from '../store/index.js';

Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
	return originalPush.call(this, location).catch(err => {
		if (err.name !== 'NavigationDuplicated') throw err;
	});
};

console.log(store);


function is_login(to, from, next){
  /* must call `next` */
  if(store.state.user_id != undefined){
    return next();
  }
  return next('/login');
}

function not_login(to, from, next){
  /* must call `next` */
  if(store.state.user_id == undefined){
    return next();
  }
  return next('/');
}


const routes = [
  {
    path: '',
    component: Map,
    props:{
      key:"main"
    }
  },
  {
    path: '/',
    component: Map,
    props:{
      key:"main"
    }
  },
  {
    name: 'map',
    path: '/map',
    component: Map,
    props:{
      key:"object-detect",
      info:{
        type:'plane',
        date:'20210121'
      }
    }
  },
  {
    path: '/dualmap',
    component: () => import('../views/DualMap.vue') 
  },
  {
    path: '/home',
    component: () => import('../views/Home.vue') 
  },
  {
    path: '/stat',
    component: () => import('../views/Stat.vue') 
  },
  {
    path: '/login',
    component: () => import('../views/Login.vue'),
    beforeEnter: not_login
  },
  {
    path: '/register',
    component: () => import('../views/Register.vue') 
  },
  {
    path: '/addlayer',
    component: () => import('../views/AddLayer.vue'),
    beforeEnter: is_login
  },
  {
    path: '/addlayergroup',
    component: () => import('../views/AddLayerGroup.vue'),
    beforeEnter: is_login
  },
  {
    path: '/aboutus',
    component: () => import('../views/AboutUs.vue') 
  },
  {
    path: '/profile',
    component: () => import('../views/Profile.vue'),
    beforeEnter: is_login
  },
  {
    path: '/layergroups',
    component: () => import('../views/LayerGroups.vue') 
  },
  {
    path: '/layers',
    component: () => import('../views/Layers.vue'),
    props:true
  },
  {
    path: '/add',
    component: () => import('../views/AddNew.vue') 
  },
  
  {
    path: '/users/:user_id',
    component: () => import('../views/RouterView.vue'),
    props:true,
    children:[
      {path:'', component:  () => import('../views/Dashboard.vue'), beforeEnter: is_login},
      {path:'profile', component:  () => import('../views/Profile.vue'), beforeEnter: is_login}, 
      {
        name: 'layergroups',
        path:'layergroups',
        component: () => import('../views/LayerGroups.vue'), 
        props: true
      },
      {
        name: 'layergroup',
        path:'layergroups/:layergroup',
        component: () => import('../views/RouterView.vue'), 
        props: true,
        children: [
          {
            name: 'layergroupMap',
            path: '', 
            component: () => import('../views/Map.vue'),
            props: true,
          },
          {
            name: 'layers',
            path: 'layers', 
            component: () => import('../views/Layers.vue'),
            props: true,
          },
          {
            name: 'layer',
            path: 'layers/:layer', 
            component: () => import('../views/Map.vue'),
            props: true,
          },   
        ]
      },
      
    ],
    // beforeEnter: is_login
  },
  {
    path: '*',
    component: () => import('../views/NotFound.vue') 
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


export default router
