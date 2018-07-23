import VueRouter from 'vue-router';
import Home from '@/components/home/Home.vue';
import Gantt from '@/components/chart/Gantt.vue';
import PageNotFound from '@/components/common/PageNotFound.vue';
import store from '@/scripts/model/store/IndexStore';

class IndexRouter extends VueRouter {
    public constructor() {
        super({
            mode: 'history',
            routes: [
                { path: '/', name: 'home', component: Home },
                { path: '/project/:id', name: 'project', component: Gantt }
            ]
        });
    }
}
const router = new IndexRouter();
export default router;
