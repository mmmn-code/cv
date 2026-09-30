<template>
<div class="resume" id="compact">
  <header>
    <div>
      <h1>{{ fullName() }}</h1>
      <div class="position">{{ person.position }}</div>
    </div>
    <div class="contact">
      <div v-if="person.contact.email"><a :href="contactLinks.email">{{ person.contact.email }}</a> <i class="fa fa-envelope"></i></div>
      <div v-if="person.contact.phone"><a :href="contactLinks.phone">{{ person.contact.phone }}</a> <i class="fa fa-phone"></i></div>
      <div v-if="person.contact.city">{{ person.contact.city }} <i class="fa fa-map-marker"></i></div>
      <div v-if="person.contact.linkedin"><a :href="contactLinks.linkedin">in/{{ person.contact.linkedin }}</a> <i class="fa fa-linkedin"></i></div>
      <div v-if="person.contact.website"><a :href="contactLinks.website">{{ person.contact.website }}</a> <i class="fa fa-globe"></i></div>
    </div>
  </header>

  <p class="about" v-if="person.about">{{ person.about }}</p>

  <section v-if="person.skills.length">
    <h2>{{ lang.skills }}</h2>
    <span class="tag" v-for="(skill, i) in person.skills" :key="'s' + i">{{ skill.name }}</span>
  </section>

  <section v-if="person.experience.length">
    <h2>{{ lang.experience }}</h2>
    <div class="entry" v-for="(job, i) in person.experience" :key="'e' + i">
      <div class="when">{{ job.timeperiod }}</div>
      <div>
        <div><strong>{{ job.position }}</strong> · {{ job.company }}</div>
        <p>{{ job.description }}</p>
      </div>
    </div>
  </section>

  <section v-if="person.projects.length">
    <h2>{{ lang.projects }}</h2>
    <div class="entry" v-for="(project, i) in person.projects" :key="'p' + i">
      <div class="when">{{ project.timeperiod }}</div>
      <div>
        <div><strong>{{ project.name }}</strong><template v-if="project.platform"> · {{ project.platform }}</template></div>
        <p>{{ project.description }}</p>
      </div>
    </div>
  </section>

  <section v-if="person.education.length">
    <h2>{{ lang.education }}</h2>
    <div class="entry" v-for="(edu, i) in person.education" :key="'d' + i">
      <div class="when">{{ edu.timeperiod }}</div>
      <div>
        <strong>{{ edu.degree }}</strong>
        <p>{{ edu.description }}</p>
      </div>
    </div>
  </section>

  <div class="split">
    <section v-if="person.certifications.length">
      <h2>Certifications</h2>
      <div class="small" v-for="(cert, i) in person.certifications" :key="'c' + i">
        <strong>{{ cert.name }}</strong> — {{ cert.issuer }} <span class="muted">{{ cert.timeperiod }}</span>
      </div>
    </section>
    <section v-if="person.languages.length">
      <h2>Languages</h2>
      <span class="tag" v-for="(language, i) in person.languages" :key="'l' + i">{{ language.name }}</span>
    </section>
  </div>
</div>
</template>

<script>
import Vue from 'vue';
import { getVueOptions } from './options';

const name = 'compact';
export default Vue.component(name, getVueOptions(name));
</script>

<style scoped>
#compact {
  height: 100%;
  padding: 36px 44px;
  box-sizing: border-box;
  font-family: 'Source Sans Pro', Arial, sans-serif;
  font-size: 12px;
  line-height: 1.4;
  color: #262626;
}
a { color: inherit; text-decoration: none; }
header {
  display: flex; justify-content: space-between; align-items: flex-end;
  border-bottom: 3px solid #2e8b57; padding-bottom: 10px;
}
h1 { margin: 0; font-size: 30px; color: #1c5236; }
.position { font-size: 14px; color: #2e8b57; font-weight: 600; }
.contact { text-align: right; font-size: 11.5px; }
.contact i { width: 14px; text-align: center; color: #2e8b57; }
.about { margin: 10px 0 0; }
h2 {
  font-size: 12px; text-transform: uppercase; letter-spacing: 1.5px; color: #2e8b57;
  margin: 14px 0 6px; border-bottom: 1px solid #cfe5d8; padding-bottom: 2px;
}
.entry { display: flex; margin-bottom: 8px; }
.when { width: 120px; flex: none; color: #777; font-size: 11px; padding-top: 1px; }
p { margin: 1px 0 0; }
.tag {
  display: inline-block; border: 1px solid #2e8b57; color: #1c5236;
  border-radius: 3px; padding: 1px 7px; margin: 0 5px 5px 0; font-size: 11.5px;
}
.split { display: flex; gap: 30px; }
.split section { flex: 1; }
.small { margin-bottom: 4px; }
.muted { color: #777; }
</style>
