import VueRouter from 'vue-router';
import Home from '@/components/home/Home.vue';
import Gantt from '@/components/chart/Gantt.vue';

export default class IndexRouter extends VueRouter {
    public constructor() {
        super({
            mode: 'hash',
            routes: [
                { path: '/', component: Home },
                { path: '/project/:name', component: Gantt }
            ]
        })
    }
}
