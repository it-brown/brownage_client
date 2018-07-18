<template lang='pug'>
.vue-task-input
    .columns.is-gapless
        .column.cell-height.border-grid(v-for='cell in inputCells' :key='cell.id' :class='cell.cellStyle'): span {{ cell.title }}
</template>

<script lang='ts'>
import { Vue, Component } from 'vue-property-decorator';

/**
 * Vue Component
 */
@Component
export default class TaskInput extends Vue {
    protected inputCells = [
        { id: 1, title: 'Task name', cellStyle: 'is-6' },
        { id: 2, title: 'Start time', cellStyle: 'is-3' },
        { id: 3, title: 'Duration', cellStyle: 'is-3' }
    ]
}
</script>

<style lang='sass' scoped>
@import 'entry/variable'

.vue-task-input
</style>
