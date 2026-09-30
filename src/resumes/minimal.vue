<template>
<div class="resume" id="minimal">
  <header>
    <h1>{{ fullName() }}</h1>
    <div class="position">{{ person.position }}</div>
  </header>

  <div class="row" v-if="person.about">
    <h2>About</h2>
    <div class="content"><p>{{ person.about }}</p></div>
  </div>

  <div class="row">
    <h2>{{ lang.contact }}</h2>
    <div class="content contact">
      <a v-if="person.contact.email" :href="contactLinks.email">{{ person.contact.email }}</a>
      <a v-if="person.contact.phone" :href="contactLinks.phone">{{ person.contact.phone }}</a>
      <span v-if="person.contact.city">{{ person.contact.city }}</span>
      <a v-if="person.contact.website" :href="contactLinks.website">{{ person.contact.website }}</a>
      <a v-if="person.contact.linkedin" :href="contactLinks.linkedin">in/{{ person.contact.linkedin }}</a>
      <a v-if="person.contact.github" :href="contactLinks.github">github/{{ person.contact.github }}</a>
    </div>
  </div>

  <div class="row" v-if="person.experience.length">
    <h2>{{ lang.experience }}</h2>
    <div class="content">
      <div class="entry" v-for="(job, i) in person.experience" :key="'e' + i">
        <div class="when">{{ job.timeperiod }}</div>
        <div class="title">{{ job.position }}, {{ job.company }}</div>
        <p>{{ job.description }}</p>
      </div>
    </div>
  </div>

  <div class="row" v-if="person.education.length">
    <h2>{{ lang.education }}</h2>
    <div class="content">
      <div class="entry" v-for="(edu, i) in person.education" :key="'d' + i">
        <div class="when">{{ edu.timeperiod }}</div>
        <div class="title">{{ edu.degree }}</div>
        <p>{{ edu.description }}</p>
      </div>
    </div>
  </div>

  <div class="row" v-if="person.skills.length">
    <h2>{{ lang.skills }}</h2>
    <div class="content"><p>{{ person.skills.map(s => s.name).join(', ') }}</p></div>
  </div>

  <div class="row" v-if="person.languages.length">
    <h2>Languages</h2>
    <div class="content"><p>{{ person.languages.map(l => l.name).join(', ') }}</p></div>
  </div>

  <div class="row" v-if="person.certifications.length">
    <h2>Certifications</h2>
    <div class="content">
      <div class="entry" v-for="(cert, i) in person.certifications" :key="'c' + i">
        <div class="title">{{ cert.name }}</div>
        <p>{{ cert.issuer }} <span class="when">{{ cert.timeperiod }}</span></p>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import Vue from 'vue';
import { getVueOptions } from './options';

const name = 'minimal';
export default Vue.component(name, getVueOptions(name));
</script>

<style scoped>
#minimal {
  height: 100%;
  padding: 70px 72px;
  box-sizing: border-box;
  font-family: 'Roboto', Helvetica, Arial, sans-serif;
  font-weight: 300;
  color: #333;
  font-size: 13px;
  line-height: 1.6;
}
a { color: inherit; text-decoration: none; }
header { margin-bottom: 36px; }
h1 { font-size: 40px; font-weight: 300; margin: 0; letter-spacing: -1px; color: #111; }
.position { font-size: 16px; color: #888; margin-top: 2px; }
.row { display: flex; margin-bottom: 22px; }
h2 {
  width: 24%; flex: none; margin: 0; font-size: 11px; font-weight: 500;
  text-transform: uppercase; letter-spacing: 2px; color: #999; padding-top: 3px;
}
.content { flex: 1; }
.contact { display: flex; flex-wrap: wrap; gap: 4px 18px; }
p { margin: 2px 0 0; }
.entry { margin-bottom: 14px; }
.when { font-size: 11px; color: #999; }
.title { font-weight: 500; color: #111; }
</style>
