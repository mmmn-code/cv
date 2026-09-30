<template>
<div class="resume" id="tech-dark">
  <header>
    <div class="prompt">~/resume $ whoami</div>
    <h1>{{ fullName() }}</h1>
    <div class="position">&lt;{{ person.position }} /&gt;</div>
    <div class="contact">
      <span v-if="person.contact.email"><i class="fa fa-envelope"></i> <a :href="contactLinks.email">{{ person.contact.email }}</a></span>
      <span v-if="person.contact.phone"><i class="fa fa-phone"></i> <a :href="contactLinks.phone">{{ person.contact.phone }}</a></span>
      <span v-if="person.contact.github"><i class="fa fa-github"></i> <a :href="contactLinks.github">{{ person.contact.github }}</a></span>
      <span v-if="person.contact.linkedin"><i class="fa fa-linkedin"></i> <a :href="contactLinks.linkedin">{{ person.contact.linkedin }}</a></span>
      <span v-if="person.contact.website"><i class="fa fa-globe"></i> <a :href="contactLinks.website">{{ person.contact.website }}</a></span>
      <span v-if="person.contact.city"><i class="fa fa-map-marker"></i> {{ person.contact.city }}</span>
    </div>
  </header>

  <div class="cols">
    <main>
      <section v-if="person.about">
        <h2>// {{ lang.about }}</h2>
        <p>{{ person.about }}</p>
      </section>
      <section v-if="person.experience.length">
        <h2>// {{ lang.experience }}</h2>
        <div class="entry" v-for="(job, i) in person.experience" :key="'e' + i">
          <div class="title">{{ job.position }} <span>@{{ job.company }}</span></div>
          <div class="when">{{ job.timeperiod }}</div>
          <p>{{ job.description }}</p>
        </div>
      </section>
      <section v-if="person.projects.length">
        <h2>// {{ lang.projects }}</h2>
        <div class="entry" v-for="(project, i) in person.projects" :key="'p' + i">
          <div class="title">{{ project.name }} <span v-if="project.platform">[{{ project.platform }}]</span></div>
          <p>{{ project.description }}</p>
        </div>
      </section>
    </main>
    <aside>
      <section v-if="person.skills.length">
        <h2>// {{ lang.skills }}</h2>
        <div class="skill" v-for="(skill, i) in person.skills" :key="'s' + i">
          <div class="row"><span>{{ skill.name }}</span><span class="pct">{{ skill.level || 0 }}%</span></div>
          <div class="bar"><div :style="{ width: (skill.level || 0) + '%' }"></div></div>
        </div>
      </section>
      <section v-if="person.education.length">
        <h2>// {{ lang.education }}</h2>
        <div class="entry" v-for="(edu, i) in person.education" :key="'d' + i">
          <div class="title">{{ edu.degree }}</div>
          <div class="when">{{ edu.timeperiod }}</div>
        </div>
      </section>
      <section v-if="person.certifications.length">
        <h2>// Certifications</h2>
        <div class="entry" v-for="(cert, i) in person.certifications" :key="'c' + i">
          <div class="title">{{ cert.name }}</div>
          <div class="when">{{ cert.issuer }} {{ cert.timeperiod }}</div>
        </div>
      </section>
      <section v-if="person.languages.length">
        <h2>// Languages</h2>
        <span class="tag" v-for="(language, i) in person.languages" :key="'l' + i">{{ language.name }}</span>
      </section>
    </aside>
  </div>
</div>
</template>

<script>
import Vue from 'vue';
import { getVueOptions } from './options';

const name = 'tech-dark';
export default Vue.component(name, getVueOptions(name));
</script>

<style scoped>
#tech-dark {
  height: 100%;
  background: #1e1f29;
  color: #d6d8e3;
  font-family: 'Source Sans Pro', Arial, sans-serif;
  font-size: 12.5px;
  line-height: 1.5;
  padding: 44px 48px;
  box-sizing: border-box;
}
a { color: inherit; text-decoration: none; }
.prompt, h2, .position, .pct, .when { font-family: Menlo, Consolas, 'Courier New', monospace; }
.prompt { color: #6b6f86; font-size: 12px; }
h1 { margin: 4px 0 0; font-size: 36px; color: #fff; }
.position { color: #50fa7b; font-size: 14px; margin: 4px 0 12px; }
.contact { display: flex; flex-wrap: wrap; gap: 4px 18px; color: #aeb2c7; }
.contact i { color: #bd93f9; }
header { border-bottom: 1px solid #353747; padding-bottom: 16px; }
.cols { display: flex; gap: 32px; margin-top: 8px; }
main { flex: 3; }
aside { flex: 2; }
h2 { color: #bd93f9; font-size: 13px; font-weight: normal; margin: 18px 0 8px; }
.entry { margin-bottom: 12px; }
.title { color: #fff; font-weight: 600; }
.title span { color: #8be9fd; font-weight: normal; }
.when { color: #6b6f86; font-size: 11px; }
p { margin: 3px 0 0; }
.skill { margin-bottom: 8px; }
.row { display: flex; justify-content: space-between; }
.pct { color: #6b6f86; font-size: 11px; }
.bar { height: 4px; background: #353747; border-radius: 2px; margin-top: 3px; }
.bar div { height: 100%; background: linear-gradient(90deg, #50fa7b, #8be9fd); border-radius: 2px; }
.tag {
  display: inline-block; background: #2b2d3a; color: #8be9fd;
  border-radius: 4px; padding: 1px 8px; margin: 0 6px 6px 0;
}
</style>
