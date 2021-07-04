import Vue from 'vue'
import VueRouter from 'vue-router';
import Map from '../views/Map.vue';

Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
	return originalPush.call(this, location).catch(err => {
		if (err.name !== 'NavigationDuplicated') throw err;
	});
};

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
    component: () => import('../views/Login.vue') 
  },
  {
    path: '/register',
    component: () => import('../views/Register.vue') 
  }
  // {
  //   path: '/map',
  //   name: 'map',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
