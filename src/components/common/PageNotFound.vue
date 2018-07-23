<template lang='pug'>
.vue-page-not-found
    section.section
        .content.has-text-grey.has-text-centered
            p: b-icon(icon='emoticon-sad' size='is-large')
            p Page not found.
</template>

<script lang='ts'>
import { Vue, Component } from 'vue-property-decorator';

/**
 * Vue Component
 */
@Component
export default class PageNotFound extends Vue {
}
</script>

<style lang='sass' scoped>
@import 'entry/variable'

.vue-page-not-found
</style>
