<template>
<div class="resume" id="elegant-serif">
  <header>
    <h1>{{ fullName() }}</h1>
    <div class="rule"><span>{{ person.position }}</span></div>
    <div class="contact">
      <span v-if="person.contact.phone"><a :href="contactLinks.phone">{{ person.contact.phone }}</a></span>
      <span v-if="person.contact.email"><a :href="contactLinks.email">{{ person.contact.email }}</a></span>
      <span v-if="person.contact.city">{{ person.contact.city }}</span>
      <span v-if="person.contact.website"><a :href="contactLinks.website">{{ person.contact.website }}</a></span>
    </div>
  </header>

  <p class="about" v-if="person.about">{{ person.about }}</p>

  <div class="cols">
    <main>
      <section v-if="person.experience.length">
        <h2>{{ lang.experience }}</h2>
        <div class="entry" v-for="(job, i) in person.experience" :key="'e' + i">
          <div class="title">{{ job.position }}</div>
          <div class="org">{{ job.company }} &mdash; <em>{{ job.timeperiod }}</em></div>
          <p>{{ job.description }}</p>
        </div>
      </section>
      <section v-if="person.education.length">
        <h2>{{ lang.education }}</h2>
        <div class="entry" v-for="(edu, i) in person.education" :key="'d' + i">
          <div class="title">{{ edu.degree }}</div>
          <div class="org"><em>{{ edu.timeperiod }}</em></div>
          <p>{{ edu.description }}</p>
        </div>
      </section>
    </main>
    <aside>
      <section v-if="person.skills.length">
        <h2>{{ lang.skills }}</h2>
        <div class="li" v-for="(skill, i) in person.skills" :key="'s' + i">{{ skill.name }}</div>
      </section>
      <section v-if="person.languages.length">
        <h2>Languages</h2>
        <div class="li" v-for="(language, i) in person.languages" :key="'l' + i">{{ language.name }}</div>
      </section>
      <section v-if="person.certifications.length">
        <h2>Certifications</h2>
        <div class="entry" v-for="(cert, i) in person.certifications" :key="'c' + i">
          <div class="title small">{{ cert.name }}</div>
          <div class="org"><em>{{ cert.issuer }} {{ cert.timeperiod }}</em></div>
        </div>
      </section>
    </aside>
  </div>
</div>
</template>

<script>
import Vue from 'vue';
import { getVueOptions } from './options';

const name = 'elegant-serif';
export default Vue.component(name, getVueOptions(name));
</script>

<style scoped>
#elegant-serif {
  height: 100%;
  padding: 60px 64px;
  box-sizing: border-box;
  font-family: Georgia, 'Palatino Linotype', Palatino, serif;
  color: #2a2a2a;
  font-size: 13px;
  line-height: 1.55;
  background: #fdfbf7;
}
a { color: inherit; text-decoration: none; }
header { text-align: center; }
h1 { font-size: 38px; font-weight: normal; letter-spacing: 6px; text-transform: uppercase; margin: 0; }
.rule { display: flex; align-items: center; margin: 10px 0; color: #a8864a; }
.rule::before, .rule::after { content: ''; flex: 1; border-top: 1px solid #a8864a; }
.rule span { padding: 0 14px; letter-spacing: 4px; text-transform: uppercase; font-size: 13px; }
.contact span:not(:last-child)::after { content: '\2022'; margin: 0 10px; color: #a8864a; }
.about { text-align: center; font-style: italic; margin: 22px 30px 8px; }
.cols { display: flex; gap: 36px; margin-top: 10px; }
main { flex: 2; }
aside { flex: 1; border-left: 1px solid #e3d8c2; padding-left: 26px; }
h2 {
  font-size: 13px; font-weight: normal; letter-spacing: 4px; text-transform: uppercase;
  color: #a8864a; margin: 18px 0 10px;
}
.entry { margin-bottom: 14px; }
.title { font-weight: bold; font-size: 14px; }
.title.small { font-size: 13px; }
.org { color: #666; }
p { margin: 3px 0 0; }
.li { margin-bottom: 4px; }
</style>
