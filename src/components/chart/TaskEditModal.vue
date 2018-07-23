<template lang='pug'>
.vue-task-edit-modal
    .modal(:class='{ "is-active": isActive }')
        .modal-background
        .modal-card
            header.modal-card-head
                p.modal-card-title Edit task
            section.modal-card-body
                b-field(label='Description')
                    b-input(type='textarea')

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
                    button.button.is-success.margin(type='button' @click='') Save
                    button.button.is-warning.margin(type='button' @click='closeModal') Cancel
                button.button.is-danger(type='button' @click='') Delete
        button.modal-close.is-large(aria-label='close' @click='closeModal')
</template>

<script lang='ts'>
import { Vue, Component, Prop } from 'vue-property-decorator';

/**
 * Vue Component
 */
@Component
export default class TaskEditModal extends Vue {
    @Prop({ type: Boolean, default: () => false })
    protected isActive?: boolean;

    protected duration = 1;
    protected day = new Date();

    protected get addDurationToStartDate(): Date{
        const startDate = this.day;
        const year = startDate.getFullYear();
        const month = startDate.getMonth();
        const day = startDate.getDate();
        return new Date(year, month, day + this.duration);
    }

    protected closeModal(): void {
        this.$emit('update:isActive', false);
    }
}
</script>

<style lang='sass' scoped>
@import 'entry/variable'

.vue-task-edit-modal
</style>
