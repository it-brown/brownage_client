<template lang='pug'>
.vue-task-input
    task-edit-modal(:isActive.sync='isComponentModalActive')
    .task-header.columns.is-gapless
        .column.auto.task-add(@click='isComponentModalActive = true'): b-icon(icon='plus')
        .column.cell-height.border-grid(v-for='cell in inputCells' :key='cell.id' :class='cell.cellStyle'): span {{ cell.title }}

    .task-row.columns.is-gapless(v-for='task in tasks' :key='task.id')
        .column.auto.task-add(@click='isComponentModalActive = true'): b-icon(icon='plus')
        .column.cell-height.is-clipped(v-for='cell in inputCells' :key='cell.id' :class='cell.cellStyle'): span.padding-light {{ task[cell.key] }}
</template>

<script lang='ts'>
import { Vue, Component, Prop } from 'vue-property-decorator';

import { TaskItem } from '@/scripts/model/chart/TaskItem';
import TaskEditModal from '@/components/chart/TaskEditModal.vue';

/**
 * Vue Component
 */
@Component({
    components: {
        TaskEditModal
    }
})
export default class TaskInput extends Vue {
    @Prop({ type: Array })
    protected tasks?: TaskItem[];

    protected isComponentModalActive = false;

    protected inputCells = [
        { id: 1, title: 'Task name', cellStyle: 'is-5', key: 'text'},
        { id: 2, title: 'Start time', cellStyle: 'is-3', key: 'start_date' },
        { id: 3, title: 'Duration', cellStyle: 'is-4', key: 'duration' }
    ]
}
</script>

<style lang='sass' scoped>
@import 'entry/variable'

.vue-task-input
    .task-row, .task-header
        position: relative

        .task-add
            position: absolute
            right: 0
            color: $primary
            border: none
</style>
