
const Home = () => import(/* webpackChunkName: "home" */'@/views/home/index.vue');

const routes = [
    {
        path: '/home',
        meta: {
            title: 'home',
            index: 0
        },
        component: Home
    },
    {
        path: '*',
        redirect: '/home'
    }
]

export default routes;