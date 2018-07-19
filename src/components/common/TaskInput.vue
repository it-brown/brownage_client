<template lang='pug'>
.vue-task-input
    .task-header.columns.is-gapless.is-multiline
        .column.cell-height.border-grid(v-for='cell in inputCells' :key='cell.id' :class='cell.cellStyle'): span {{ cell.title }}
        .task-add(@click='addTask'): b-icon(icon='plus')

    .task-row.columns.is-gapless(v-for='i in 3' :key='i')
        .column.cell-height.is-clipped(v-for='cell in inputCells' :key='cell.id' :class='cell.cellStyle'): span.padding-light test
        .task-add(@click='addTask'): b-icon(icon='plus')
</template>

<script lang='ts'>
import { Vue, Component } from 'vue-property-decorator';

/**
 * Vue Component
 */
@Component
export default class TaskInput extends Vue {
    protected inputCells = [
        { id: 1, title: 'Task name', cellStyle: 'is-5' },
        { id: 2, title: 'Start time', cellStyle: 'is-3' },
        { id: 3, title: 'Duration', cellStyle: 'is-4' }
    ]

    protected addTask(): void {
        this.$dialog.alert('hoge');
    }
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
</style>
