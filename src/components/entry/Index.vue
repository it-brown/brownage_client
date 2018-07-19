<template lang='pug'>
.vue-index
    .reactive-title {{ reactiveTitle() }}
    common-navbar.is-light(:brand='title')

    router-view
</template>

<script lang='ts'>
import { Vue, Component } from 'vue-property-decorator';
import Buefy from 'buefy';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import RootVue from '@/components/base/RootVue';

import CommonNavbar from '@/components/common/CommonNavbar.vue';
import CommonHero from '@/components/common/CommonHero.vue';
import Home from '@/components/home/Home.vue';
import Gantt from '@/components/chart/Gantt.vue';
import { TaskItem } from '@/scripts/model/chart/TaskItem';
import { ProjectSchedule } from '@/scripts/model/chart/ProjectSchedule';
import IndexStore from '@/scripts/model/store/IndexStore';
import IndexRouter from '@/scripts/model/router/IndexRouter';

Vue.use(Buefy);
Vue.use(Vuex);
Vue.use(VueRouter);

/**
 * Vue Component
 */
@Component({
    components: {
        CommonNavbar, CommonHero, Home, Gantt
    },
    store: new IndexStore(),
    router: new IndexRouter()
})
export default class Index extends RootVue {
    public title = 'Brownage';
    public subtitle = 'Schedule';

    protected beforeCreate(): void {
        this.$store.dispatch('initializeStore');
    }
}
</script>

<style lang='sass'>
@import 'entry/all'

.vue-index
</style>
