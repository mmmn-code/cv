<template>
<div class="page" :style="photoStyle">
  <div class="page-inner">
    <component :is="template"></component>
  </div>
</div>
</template>

<script>
import '../resumes/resumes';
import { store } from '../store';

export default {
    name: 'resume-sheet',
    props: {
        template: {
            type: String,
            required: true
        }
    },
    computed: {
        // Older templates read the photo from this CSS variable.
        photoStyle () {
            return {
                '--resume-photo': store.photo ? `url("${store.photo}")` : 'none'
            };
        }
    }
};
</script>

<style scoped>
.page {
  background: white;
  position: relative;
  width: 21cm;
  height: 29.68cm;
  overflow: hidden;
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
}
.page-inner {
  height: 100%;
  width: 100%;
}
</style>
