import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home'
import Dashboard from "@/views/Dashboard";
import KeyFigures from "@/views/KeyFigures";
import OverviewGraph from "@/views/OverviewGraph";
import Eco2mix from "@/views/Eco2mix";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/dashboard/', name: 'dashboard', component: Dashboard,
    children: [
      {
        path: 'yearly/:year/:region/',
        name: 'Yearly',
        component: KeyFigures
      },
      {
        path: 'overview/:region/',
        name: 'Overview',
        component: OverviewGraph
      },
      {
        path: 'emissions/',
        name: 'Emissions',
        component: Eco2mix
      }
    ]
  },
]

const router = new VueRouter({
  routes
})

export default router
