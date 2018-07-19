<template lang='pug'>
.vue-index
    .reactive-title {{ reactiveTitle() }}
    common-navbar.is-light(:brand='title')

    .columns.is-gapless
        .column.is-4.border-surround: task-input
        .column.is-8.border-surround: gantt(:tasks='tasks')
</template>

<script lang='ts'>
import { Vue, Component } from 'vue-property-decorator';
import Buefy from 'buefy';
import Vuex from 'vuex';
import RootVue from '@/components/base/RootVue';

import CommonNavbar from '@/components/common/CommonNavbar.vue';
import CommonHero from '@/components/common/CommonHero.vue';
import TaskInput from '@/components/common/TaskInput.vue';
import Gantt from '@/components/chart/Gantt.vue';
import { TaskItem } from '@/scripts/model/chart/TaskItem';
import IndexStore from '@/scripts/store/IndexStore';

Vue.use(Buefy);
Vue.use(Vuex);

/**
 * Vue Component
 */
@Component({
    components: {
        CommonNavbar, CommonHero, TaskInput, Gantt
    },
    store: new IndexStore()
})
export default class Index extends RootVue {
    public title = 'Brownage';
    public subtitle = 'Schedule';

    protected tasks: TaskItem[] = [
        { id: 1, text: 'go for ramen', start_date: '2018/7/12', duration: 1, progress: 1 },
        { id: 2, text: 'hackathon', start_date: '2018/7/13', duration: 3, progress: 0 }
    ]
}
</script>

<style lang='sass'>
@import 'entry/all'

.vue-index
    section.main
        max-width: 800px
        margin-left: auto
        margin-right: auto

    .border-surround
        border: solid 1px #D3D3D3
</style>
