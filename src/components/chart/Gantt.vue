<template lang='pug'>
.vue-gantt
    .columns.is-gapless.is-multiline
        .column.is-4.border-surround: task-input(:tasks='project.tasks')
        .column.is-8.border-surround.table-container
            .columns.is-gapless
                .column.has-text-centered.cell.border-grid(v-for='day in getMonthDays(new Date().getFullYear(), new Date().getMonth() + 1)'): span {{ day }}
            .columns.is-gapless(v-for='task in project.tasks' :key='task.id')
                .column.cell.border-grid(v-for='day in getMonthDays(new Date().getFullYear(), new Date().getMonth() + 1)')
</template>

<script lang='ts'>
import { Vue, Component, Prop } from 'vue-property-decorator';
import { TaskItem } from '@/scripts/model/chart/TaskItem';

import TaskInput from '@/components/common/TaskInput.vue';
import { ProjectSchedule } from '@/scripts/model/chart/ProjectSchedule';

/**
 * Vue Component
 */
@Component({
    components: {
        TaskInput
    }
})
export default class Gantt extends Vue {
    protected project: ProjectSchedule | null = null;
    // number of days of current month
    protected currentMonthDays = this.getMonthDays(new Date().getFullYear(), new Date().getMonth());

    protected columnStyle(numberOfElements: number): string {
        if (numberOfElements < 12) {
            return `is-${12 / numberOfElements}`;
        } else {
            return 'auto';
        }
    }

    protected getMonthDays(year: number, month: number): number {
        return new Date(year, month, 0).getDate();
    }

    protected beforeMount(): void {
        this.project = this.$store.getters.getProjectById;
    }
}
</script>

<style lang='sass' scoped>
@import 'entry/variable'

.vue-gantt
</style>
