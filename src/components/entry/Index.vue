<template lang='pug'>
.vue-index
    .reactive-title {{ reactiveTitle() }}
    common-navbar.is-light(:brand='title')

    router-view
</template>

<script lang='ts'>
import { Vue, Component } from 'vue-property-decorator';
import Buefy from 'buefy';
import VueRouter from 'vue-router';
import RootVue from '@/components/base/RootVue';

import CommonNavbar from '@/components/common/CommonNavbar.vue';
import { TaskItem } from '@/scripts/model/chart/TaskItem';
import { ProjectSchedule } from '@/scripts/model/chart/ProjectSchedule';
import store from '@/scripts/model/store/IndexStore';
import router from '@/scripts/model/router/IndexRouter';
import UrlUtil from '@/scripts/util/UrlUtil';

Vue.use(Buefy);
Vue.use(VueRouter);

/**
 * Vue Component
 */
@Component({
    components: {
        CommonNavbar
    },
    store: store,
    router: router
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
