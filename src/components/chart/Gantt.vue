<template lang='pug'>
.vue-gantt.table-container
    .columns.is-gapless
        .column.has-text-centered.cell.border-grid(v-for='day in getMonthDays(new Date().getFullYear(), new Date().getMonth() + 1)'): span {{ day }}
    .columns.is-gapless(v-for='task, i in 3' :key='i')
        .column.cell.border-grid(v-for='day in getMonthDays(new Date().getFullYear(), new Date().getMonth() + 1)')
</template>

<script lang='ts'>
import { Vue, Component, Prop } from 'vue-property-decorator';
import { TaskItem } from '@/scripts/model/chart/TaskItem';

/**
 * Vue Component
 */
@Component
export default class Gantt extends Vue {
    @Prop({ type: Array })
    protected tasks?: TaskItem[];

    protected months = [
        { id: 1, value: 7 }
    ];

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
}
</script>

<style lang='sass' scoped>
@import 'entry/variable'

.vue-gantt
</style>
