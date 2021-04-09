import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home'
import Dashboard from "@/views/Dashboard";
import KeyFigures from "@/views/KeyFigures";
import OverviewGraph from "@/views/OverviewGraph";

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
        path: 'overview',
        name: 'Overview',
        component: OverviewGraph
      },
    ]
  },
]

const router = new VueRouter({
  routes
})

export default router
