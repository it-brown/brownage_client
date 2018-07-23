<template lang='pug'>
.vue-task-input
    task-edit-modal(:isActive.sync='isComponentModalActive' :mode='taskModalMode' :taskId='taskId')
    .task-header.columns.is-gapless
        .column.auto.add-task(@click='addTask'): b-icon(icon='plus')
        .column.cell-height.border-grid(v-for='cell in inputCells' :key='cell.id' :class='cell.cellStyle'): span {{ cell.title }}

    .task-row.columns.is-gapless(v-for='task in tasks' :key='task.id')
        //- TODO: add task nesting action. link tasks.
        //-.column.auto.add-task(@click='addTask'): b-icon(icon='plus')
        .column.cell-height.is-clipped(v-for='cell in inputCells' :key='cell.id' :class='cell.cellStyle' @dblclick='updateTask(task.id)'): span.padding-light {{ task[cell.key] }}
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

    protected taskModalMode: 'create' | 'update' = 'create';
    protected taskId: number | null = null;
    protected isComponentModalActive = false;

    protected inputCells = [
        { id: 1, title: 'Task name', cellStyle: 'is-5', key: 'text'},
        { id: 2, title: 'Start time', cellStyle: 'is-3', key: 'start_date' },
        { id: 3, title: 'Duration', cellStyle: 'is-4', key: 'duration' }
    ]

    protected addTask(): void {
        this.isComponentModalActive = true;
        this.taskModalMode = 'create';
    }

    protected updateTask(taskId: number): void {
        this.isComponentModalActive = true;
        this.taskModalMode = 'update';
        this.taskId = taskId;
    }
}
</script>

<style lang='sass' scoped>
@import 'entry/variable'

.vue-task-input
    .task-row, .task-header
        position: relative

        .add-task
            position: absolute
            right: 0
            color: $primary
            border: none
</style>
