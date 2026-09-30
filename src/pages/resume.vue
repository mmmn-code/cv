<template>
<div class="page-wrapper">
  <nav class="toolbar">
    <router-link to="/">&larr; All templates</router-link>
    <router-link :to="'/editor?template=' + $route.params.resumeid">Edit my data</router-link>
    <button @click="print">Print / Save as PDF</button>
  </nav>
  <resume-sheet class="sheet" :template="$route.params.resumeid"></resume-sheet>
</div>
</template>

<script>
import ResumeSheet from '../components/ResumeSheet';

export default {
    name: 'resume',
    components: { ResumeSheet },
    methods: {
        print () {
            window.print();
        }
    }
};
</script>

<style scoped>
.page-wrapper {
  overflow-x: hidden;
  background: #cccccc;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.toolbar {
  display: flex;
  gap: 10px;
  padding: 10px 16px;
  background: #263238;
  font-family: 'Roboto', Arial, sans-serif;
}
.toolbar a, .toolbar button {
  color: #fff;
  background: #37474f;
  border: 0;
  border-radius: 4px;
  padding: 7px 14px;
  font-size: 14px;
  text-decoration: none;
  cursor: pointer;
  font-family: inherit;
}
.toolbar button { background: #1e88e5; margin-left: auto; }
.sheet {
  margin: 24px auto;
  box-shadow: 0 2px 12px rgba(0,0,0,.3);
}
@media print {
  .toolbar { display: none; }
  .sheet { margin: 0; box-shadow: none; }
  .page-wrapper { background: none; }
}
</style>
