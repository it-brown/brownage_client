import VueRouter from 'vue-router';
import Gantt from '@/components/chart/Gantt.vue';

const User = {
    template: '<div>User {{ $route.params.id }}</div>'
}

export default class IndexRouter extends VueRouter {
    public constructor() {
        super({
            mode: 'history',
            routes: [
                { path: '/project/:id', component: User }
            ]
        })
    }
}
