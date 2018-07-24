<template lang='pug'>
.vue-task-edit-modal
    .modal(:class='{ "is-active": isActive }')
        .modal-background
        .modal-card
            header.modal-card-head
                p.modal-card-title {{ mode }} task
            section.modal-card-body
                b-field(label='Description')
                    b-input(type='textarea' v-model='description')

                b-field(label='Time period')
                    .columns.is-pagless
                        .column.is-5: b-datepicker(v-model='day' :first-day-of-week='0' placeholder='Click to select...' )
                        .column.is-3
                            .duration-picker.is-inline-flex
                                p.control
                                    button.button.is-primary(@click='duration == 0 ? "" : duration--')
                                        b-icon(icon='minus')
                                b-input(v-model='duration' type='text')
                                p.control
                                    button.button.is-primary(@click='duration++')
                                        b-icon(icon='plus')
                        .column.is-4: span {{ day.toLocaleDateString() }} - {{ addDurationToStartDate.toLocaleDateString() }}
            footer.brownage-modal-card-foot
                .level-left
                    button.button.is-success.margin(type='button' @click='editTask(mode)') Save
                    button.button.is-warning.margin(type='button' @click='closeModal') Cancel
                button.button.is-danger(v-if='mode == "Update"' type='button' @click='deleteTask') Delete
        button.modal-close.is-large(aria-label='close' @click='closeModal')
</template>

<script lang='ts'>
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';

import { TaskItem } from '@/scripts/model/chart/TaskItem';
import { ProjectSchedule } from '@/scripts/model/chart/ProjectSchedule';

/**
 * Vue Component
 */
@Component
export default class TaskEditModal extends Vue {
    @Prop({ type: Boolean, default: () => false })
    protected isActive?: boolean;
    @Prop({ type: String })
    protected mode?: 'Create' | 'Update';
    @Prop({ type: Object})
    protected taskData?: TaskItem;

    protected project: ProjectSchedule | null = null;
    protected duration = 1;
    protected day = new Date();
    protected description = '';

    @Watch('taskData', { deep: true })
    protected setTaskValue(): void {
        if (this.taskData) {
            this.description = this.taskData.text;
            this.day = new Date(this.taskData.start_date);
            this.duration = this.taskData.duration;
        }
    }

    protected initTaskValue(): void {
        if (this.taskData) {
            this.description = '';
            this.day = new Date();
            this.duration = 1;
        }
    }

    protected get addDurationToStartDate(): Date{
        const startDate = this.day;
        const year = startDate.getFullYear();
        const month = startDate.getMonth();
        const day = startDate.getDate();
        return new Date(year, month, day + this.duration);
    }
    protected editTask(mode: 'Create' | 'Update'): void {
        if (this.project == null) {
            return;
        }
        if (mode == 'Create') {
            const newTask = {
                id: this.project.tasks.length ? this.project.tasks[this.project.tasks.length - 1].id + 1 : 1,
                text: this.description,
                start_date: this.day.toLocaleDateString(),
                duration: this.duration,
                progress: 0
            } as TaskItem;

            this.project.tasks.push(newTask);
            this.updateProjectListState();
            this.closeModal();
        }

        if (mode == 'Update') {
            const matchTask = this.project.tasks.find((task) => {
                if (this.taskData) {
                    return task.id == this.taskData.id;
                }
                return false;
            });
            if (matchTask) {
                matchTask.text = this.description;
                matchTask.start_date = this.day.toLocaleDateString();
                matchTask.duration = this.duration;
            }
            this.updateProjectListState()
            this.closeModal();
        }
    }

    protected deleteTask(): void {
        if (this.mode == 'Update' && this.project != null) {
            const targetTask = this.project.tasks.find((task, i) => {
                if (this.taskData) {
                    return task.id == this.taskData.id;
                }
                return false;
            });
            const targetTaskIndex = this.project.tasks.indexOf(targetTask!);
            this.project.tasks.splice(targetTaskIndex, 1);

            this.updateProjectListState();
            this.closeModal();
        }
    }

    protected updateProjectListState(): void {
        const projectList = this.$store.getters.projectList as ProjectSchedule[];
        const updatedProjectList = projectList.map((project) => {
            if (this.project == null) {
                return;
            }
            if (project.id == this.$store.getters.getOnEditProjectId) {
                project.tasks = this.project.tasks;
                return project;
            }
            return project;
        });
        this.$store.dispatch('changeProjectList', updatedProjectList);
        localStorage.setItem('projectSchedule', JSON.stringify(updatedProjectList));
    }

    protected closeModal(): void {
        this.initTaskValue();
        this.$emit('update:isActive', false);
    }

    protected beforeMount(): void {
        this.project = this.$store.getters.getProjectById;
    }
}
</script>

<style lang='sass' scoped>
@import 'entry/variable'

.vue-task-edit-modal
</style>
