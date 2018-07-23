<template lang='pug'>
.vue-home
    section.main
        label Add Project
        b-field
            b-input(type='text' v-model='newProject' expanded)
            p.control: button.button.is-primary(@click='addProject') Add!
</template>

<script lang='ts'>
import { Vue, Component } from 'vue-property-decorator';

import { TaskItem } from '@/scripts/model/chart/TaskItem';
import { ProjectSchedule } from '@/scripts/model/chart/ProjectSchedule';

/**
 * Vue Component
 */
@Component
export default class Home extends Vue {
    protected newProject = '';
    protected projectSchedule: ProjectSchedule[] = [];

    protected async addProject(): Promise<void> {
        const projectId = this.projectSchedule.length == 0 ? 1 : this.projectSchedule[this.projectSchedule.length - 1].id + 1
        await this.projectSchedule.push({
            id: projectId,
            name: this.newProject,
            tasks: [] as TaskItem[]
        });
        await this.$store.dispatch('changeProjectList', this.projectSchedule);
        await this.$store.dispatch('changeProjectId', projectId);
        localStorage.setItem('projectSchedule', JSON.stringify(this.projectSchedule));
        localStorage.setItem('onEditProjectId', projectId.toString());
        this.$router.push({ name: 'project', params: { id: projectId.toString() } });
    }

    protected beforeMount(): void {
        this.projectSchedule = this.$store.getters.projectList;
    }
}
</script>

<style lang='sass' scoped>
@import 'entry/variable'

.vue-home
    section.main
        max-width: 800px
        margin-left: auto
        margin-right: auto
</style>
