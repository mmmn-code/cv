<template>
<div class="home">
  <header>
    <h1>Resume Builder</h1>
    <p>Fill in your details once, then pick any of {{ templates.length }} templates. Your data stays in this browser.</p>
    <div class="actions">
      <router-link class="btn primary" to="/editor">{{ hasSavedData ? 'Edit my resume' : 'Create my resume' }}</router-link>
      <router-link v-if="hasSavedData" class="btn" :to="'/resume/' + current">View my resume</router-link>
    </div>
  </header>

  <div class="grid">
    <div class="card" v-for="t in templates" :key="t.id" :class="{ selected: t.id === current }">
      <div class="thumb" role="link" tabindex="0" :aria-label="'Open ' + t.label" @click="open(t.id)" @keyup.enter="open(t.id)">
        <scaled-sheet :template="t.id" :width="220"></scaled-sheet>
      </div>
      <div class="caption">
        <span>{{ t.label }} <em v-if="t.isNew">new</em></span>
        <router-link :to="'/editor?template=' + t.id" @click.native="choose(t.id)">Use</router-link>
      </div>
    </div>
  </div>

  <footer>
    Based on <a href="https://github.com/salomonelli/best-resume-ever" target="_blank" rel="noopener">best-resume-ever</a> (MIT).
  </footer>
</div>
</template>

<script>
import ScaledSheet from '../components/ScaledSheet';
import { templates } from '../resumes/catalog';
import { store } from '../store';

export default {
    name: 'home',
    components: { ScaledSheet },
    data () {
        return { templates };
    },
    computed: {
        current () {
            return store.template;
        },
        hasSavedData () {
            return store.hasSavedData;
        }
    },
    methods: {
        choose (id) {
            store.setTemplate(id);
        },
        open (id) {
            this.choose(id);
            this.$router.push('/resume/' + id);
        }
    }
};
</script>

<style scoped>
.home {
  font-family: 'Roboto', Arial, sans-serif;
  background: #eceff1;
  min-height: 100vh;
  padding: 0 16px 40px;
  box-sizing: border-box;
}
header { text-align: center; padding: 40px 0 28px; }
h1 { font-weight: 300; font-size: 34px; margin: 0 0 8px; color: #263238; }
header p { color: #546e7a; margin: 0 0 20px; }
.actions { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }
.btn {
  padding: 10px 20px; border-radius: 4px; text-decoration: none;
  background: #fff; color: #263238; border: 1px solid #b0bec5; font-size: 15px;
}
.btn.primary { background: #1e88e5; color: #fff; border-color: #1e88e5; }
.grid {
  display: grid; grid-template-columns: repeat(auto-fill, 220px);
  gap: 24px; justify-content: center; max-width: 1300px; margin: 0 auto;
}
.card { background: #fff; border-radius: 6px; overflow: hidden; box-shadow: 0 1px 4px rgba(0,0,0,.15); }
.thumb { cursor: pointer; }
.card.selected { outline: 3px solid #1e88e5; }
.card:hover { box-shadow: 0 4px 14px rgba(0,0,0,.2); }
.caption {
  display: flex; justify-content: space-between; align-items: center;
  padding: 10px 12px; border-top: 1px solid #eceff1; font-size: 14px; color: #263238;
}
.caption em {
  font-style: normal; font-size: 10px; text-transform: uppercase; background: #43a047;
  color: #fff; border-radius: 3px; padding: 1px 5px; margin-left: 4px;
}
.caption a { color: #1e88e5; text-decoration: none; font-weight: 500; }
footer { text-align: center; color: #78909c; font-size: 13px; margin-top: 40px; }
footer a { color: inherit; }
</style>
