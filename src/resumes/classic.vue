<template>
<div class="resume" id="classic">
  <header>
    <h1>{{ fullName() }}</h1>
    <div class="position">{{ person.position }}</div>
    <div class="contact">
      <span v-if="person.contact.email"><a :href="contactLinks.email">{{ person.contact.email }}</a></span>
      <span v-if="person.contact.phone"><a :href="contactLinks.phone">{{ person.contact.phone }}</a></span>
      <span v-if="person.contact.city">{{ person.contact.city }}</span>
      <span v-if="person.contact.website"><a :href="contactLinks.website">{{ person.contact.website }}</a></span>
      <span v-if="person.contact.linkedin"><a :href="contactLinks.linkedin">linkedin.com/in/{{ person.contact.linkedin }}</a></span>
    </div>
  </header>

  <section v-if="person.about">
    <h2>Summary</h2>
    <p>{{ person.about }}</p>
  </section>

  <section v-if="person.experience.length">
    <h2>{{ lang.experience }}</h2>
    <div class="entry" v-for="(job, i) in person.experience" :key="'e' + i">
      <div class="row">
        <strong>{{ job.position }}</strong><span class="when">{{ job.timeperiod }}</span>
      </div>
      <div class="org">{{ job.company }}<template v-if="job.location">, {{ job.location }}</template></div>
      <p>{{ job.description }}</p>
    </div>
  </section>

  <section v-if="person.education.length">
    <h2>{{ lang.education }}</h2>
    <div class="entry" v-for="(edu, i) in person.education" :key="'d' + i">
      <div class="row">
        <strong>{{ edu.degree }}</strong><span class="when">{{ edu.timeperiod }}</span>
      </div>
      <p>{{ edu.description }}</p>
    </div>
  </section>

  <section v-if="person.skills.length">
    <h2>{{ lang.skills }}</h2>
    <p>{{ person.skills.map(s => s.name).join(' · ') }}</p>
  </section>

  <section v-if="person.certifications.length">
    <h2>Certifications</h2>
    <div class="row" v-for="(cert, i) in person.certifications" :key="'c' + i">
      <span><strong>{{ cert.name }}</strong><template v-if="cert.issuer">, {{ cert.issuer }}</template></span>
      <span class="when">{{ cert.timeperiod }}</span>
    </div>
  </section>

  <section v-if="person.languages.length">
    <h2>Languages</h2>
    <p>{{ person.languages.map(l => l.name).join(' · ') }}</p>
  </section>
</div>
</template>

<script>
import Vue from 'vue';
import { getVueOptions } from './options';

const name = 'classic';
export default Vue.component(name, getVueOptions(name));
</script>

<style scoped>
#classic {
  height: 100%;
  padding: 56px 70px;
  box-sizing: border-box;
  font-family: Georgia, 'Times New Roman', serif;
  color: #222;
  font-size: 13px;
  line-height: 1.5;
}
a { color: inherit; text-decoration: none; }
header { text-align: center; margin-bottom: 18px; }
h1 { font-size: 34px; font-weight: normal; letter-spacing: 2px; margin: 0; text-transform: uppercase; }
.position { font-style: italic; font-size: 15px; margin: 4px 0 10px; }
.contact span:not(:last-child)::after { content: '|'; margin: 0 8px; color: #999; }
h2 {
  font-size: 13px; letter-spacing: 3px; text-transform: uppercase; font-weight: bold;
  border-bottom: 1px solid #222; padding-bottom: 3px; margin: 20px 0 10px;
}
p { margin: 3px 0 0; }
.entry { margin-bottom: 12px; }
.row { display: flex; justify-content: space-between; }
.when { color: #555; font-style: italic; white-space: nowrap; margin-left: 12px; }
.org { color: #444; }
</style>
