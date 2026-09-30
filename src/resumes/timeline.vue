<template>
<div class="resume" id="timeline">
  <header>
    <div v-if="photo" class="photo" :style="{ backgroundImage: 'url(' + photo + ')' }"></div>
    <div>
      <h1>{{ fullName() }}</h1>
      <div class="position">{{ person.position }}</div>
      <div class="contact">
        <span v-if="person.contact.email"><i class="fa fa-envelope"></i> <a :href="contactLinks.email">{{ person.contact.email }}</a></span>
        <span v-if="person.contact.phone"><i class="fa fa-phone"></i> <a :href="contactLinks.phone">{{ person.contact.phone }}</a></span>
        <span v-if="person.contact.city"><i class="fa fa-map-marker"></i> {{ person.contact.city }}</span>
        <span v-if="person.contact.website"><i class="fa fa-globe"></i> <a :href="contactLinks.website">{{ person.contact.website }}</a></span>
      </div>
    </div>
  </header>

  <p class="about" v-if="person.about">{{ person.about }}</p>

  <section v-if="person.experience.length">
    <h2><i class="fa fa-briefcase"></i> {{ lang.experience }}</h2>
    <div class="line">
      <div class="node" v-for="(job, i) in person.experience" :key="'e' + i">
        <div class="when">{{ job.timeperiod }}</div>
        <div class="title">{{ job.position }}</div>
        <div class="org">{{ job.company }}</div>
        <p>{{ job.description }}</p>
      </div>
    </div>
  </section>

  <section v-if="person.education.length">
    <h2><i class="fa fa-graduation-cap"></i> {{ lang.education }}</h2>
    <div class="line">
      <div class="node" v-for="(edu, i) in person.education" :key="'d' + i">
        <div class="when">{{ edu.timeperiod }}</div>
        <div class="title">{{ edu.degree }}</div>
        <p>{{ edu.description }}</p>
      </div>
    </div>
  </section>

  <div class="cols">
    <section v-if="person.skills.length">
      <h2><i class="fa fa-star"></i> {{ lang.skills }}</h2>
      <span class="tag" v-for="(skill, i) in person.skills" :key="'s' + i">{{ skill.name }}</span>
    </section>
    <section v-if="person.languages.length">
      <h2><i class="fa fa-language"></i> Languages</h2>
      <span class="tag" v-for="(language, i) in person.languages" :key="'l' + i">{{ language.name }}</span>
    </section>
  </div>
</div>
</template>

<script>
import Vue from 'vue';
import { getVueOptions } from './options';

const name = 'timeline';
export default Vue.component(name, getVueOptions(name));
</script>

<style scoped>
#timeline {
  height: 100%;
  padding: 48px 60px;
  box-sizing: border-box;
  font-family: 'Open Sans', Arial, sans-serif;
  color: #2f3b40;
  font-size: 12.5px;
  line-height: 1.5;
}
a { color: inherit; text-decoration: none; }
header { display: flex; align-items: center; gap: 24px; }
.photo {
  width: 100px; height: 100px; border-radius: 50%; flex: none;
  background-size: cover; background-position: center; border: 3px solid #14a098;
}
h1 { margin: 0; font-size: 32px; color: #0f5e5a; }
.position { color: #14a098; font-size: 15px; font-weight: 600; margin: 2px 0 8px; }
.contact span { margin-right: 14px; white-space: nowrap; }
.contact i { color: #14a098; }
.about { margin: 20px 0 6px; }
h2 { color: #0f5e5a; font-size: 15px; text-transform: uppercase; letter-spacing: 1px; margin: 18px 0 10px; }
h2 i { color: #14a098; width: 20px; }
.line { border-left: 2px solid #b8e3df; margin-left: 8px; padding-left: 22px; }
.node { position: relative; margin-bottom: 14px; }
.node::before {
  content: ''; position: absolute; left: -29px; top: 4px;
  width: 10px; height: 10px; border-radius: 50%; background: #14a098; border: 2px solid #fff;
}
.when { color: #14a098; font-weight: 600; font-size: 11.5px; }
.title { font-weight: 700; font-size: 14px; }
.org { color: #666; }
p { margin: 2px 0 0; }
.cols { display: flex; gap: 40px; }
.cols section { flex: 1; }
.tag {
  display: inline-block; background: #e5f5f3; color: #0f5e5a;
  border-radius: 12px; padding: 2px 10px; margin: 0 6px 6px 0;
}
</style>
