<template>
<div class="scaled" :style="{ width: width + 'px', height: height + 'px' }">
  <div class="scaler" :style="{ transform: 'scale(' + scale + ')' }">
    <resume-sheet :template="template"></resume-sheet>
  </div>
</div>
</template>

<script>
import ResumeSheet from './ResumeSheet';

// 21cm x 29.68cm at 96dpi
const PAGE_WIDTH = 793.7;
const PAGE_HEIGHT = 1121.8;

export default {
    name: 'scaled-sheet',
    components: { ResumeSheet },
    props: {
        template: { type: String,
            required: true },
        width: { type: Number,
            required: true }
    },
    computed: {
        scale () {
            return this.width / PAGE_WIDTH;
        },
        height () {
            return Math.round(PAGE_HEIGHT * this.scale);
        }
    }
};
</script>

<style scoped>
.scaled {
  overflow: hidden;
  position: relative;
}
.scaler {
  transform-origin: top left;
  pointer-events: none;
}
</style>
