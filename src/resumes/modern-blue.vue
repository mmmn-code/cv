<template>
<div class="resume" id="modern-blue">
  <aside class="side">
    <div v-if="photo" class="photo" :style="{ backgroundImage: 'url(' + photo + ')' }"></div>
    <h1 class="name">{{ person.name.first }} {{ person.name.middle }}<br>{{ person.name.last }}</h1>
    <div class="position">{{ person.position }}</div>

    <section v-if="person.about">
      <h2>{{ lang.about }}</h2>
      <p>{{ person.about }}</p>
    </section>

    <section>
      <h2>{{ lang.contact }}</h2>
      <ul class="contact">
        <li v-if="person.contact.email"><i class="fa fa-envelope"></i><a :href="contactLinks.email">{{ person.contact.email }}</a></li>
        <li v-if="person.contact.phone"><i class="fa fa-phone"></i><a :href="contactLinks.phone">{{ person.contact.phone }}</a></li>
        <li v-if="person.contact.city"><i class="fa fa-map-marker"></i>{{ person.contact.street }} {{ person.contact.city }}</li>
        <li v-if="person.contact.linkedin"><i class="fa fa-linkedin-square"></i><a :href="contactLinks.linkedin">linkedin.com/in/{{ person.contact.linkedin }}</a></li>
        <li v-if="person.contact.twitter"><i class="fa fa-twitter-square"></i><a :href="contactLinks.twitter">twitter.com/{{ person.contact.twitter }}</a></li>
        <li v-if="person.contact.github"><i class="fa fa-github"></i><a :href="contactLinks.github">github.com/{{ person.contact.github }}</a></li>
        <li v-if="person.contact.website"><i class="fa fa-globe"></i><a :href="contactLinks.website">{{ person.contact.website }}</a></li>
      </ul>
    </section>

    <section v-if="person.skills.length">
      <h2>{{ lang.skills }}</h2>
      <div class="rated" v-for="(skill, i) in person.skills" :key="'s' + i">
        <span>{{ skill.name }}</span>
        <span class="dots"><i v-for="n in 5" :key="n" :class="{ on: n <= dots(skill.level) }"></i></span>
      </div>
    </section>

    <section v-if="person.languages.length">
      <h2>Languages</h2>
      <div class="rated" v-for="(language, i) in person.languages" :key="'l' + i">
        <span>{{ language.name }}</span>
        <span class="dots"><i v-for="n in 5" :key="n" :class="{ on: n <= dots(language.level) }"></i></span>
      </div>
    </section>
  </aside>

  <main class="main">
    <section v-if="person.experience.length">
      <h2>Work Experience</h2>
      <div class="entry" v-for="(job, i) in person.experience" :key="'e' + i">
        <div class="title">{{ job.position }}</div>
        <div class="org">{{ job.company }}</div>
        <div class="meta" v-if="job.location">{{ job.location }}</div>
        <div class="meta">{{ job.timeperiod }}</div>
        <p>{{ job.description }}</p>
      </div>
    </section>

    <section v-if="person.education.length">
      <h2>{{ lang.education }}</h2>
      <div class="entry" v-for="(edu, i) in person.education" :key="'d' + i">
        <div class="title">{{ edu.degree }}</div>
        <div class="meta">{{ edu.timeperiod }}</div>
        <p>{{ edu.description }}</p>
      </div>
    </section>

    <section v-if="person.certifications.length">
      <h2>Certifications</h2>
      <div class="entry" v-for="(cert, i) in person.certifications" :key="'c' + i">
        <div class="title">{{ cert.name }}</div>
        <div class="org">{{ cert.issuer }}</div>
        <div class="meta">{{ cert.timeperiod }}</div>
      </div>
    </section>

    <section v-if="person.projects.length">
      <h2>{{ lang.projects }}</h2>
      <div class="entry" v-for="(project, i) in person.projects" :key="'p' + i">
        <div class="title">{{ project.name }}</div>
        <div class="meta">{{ project.platform }} {{ project.timeperiod }}</div>
        <p>{{ project.description }}</p>
      </div>
    </section>
  </main>
</div>
</template>

<script>
import Vue from 'vue';
import { getVueOptions } from './options';

const name = 'modern-blue';
export default Vue.component(name, getVueOptions(name));
</script>

<style scoped>
#modern-blue {
  display: flex;
  height: 100%;
  font-family: 'Open Sans', Arial, sans-serif;
  color: #333;
  font-size: 12.5px;
  line-height: 1.5;
  border-top: 14px solid #5cb85c;
  box-sizing: border-box;
}
a { color: inherit; text-decoration: none; }
.side { width: 40%; padding: 40px 28px 30px 44px; box-sizing: border-box; }
.main { width: 60%; padding: 40px 44px 30px 20px; box-sizing: border-box; }
.photo {
  width: 96px; height: 96px; border-radius: 50%;
  background-size: cover; background-position: center;
  margin-bottom: 16px;
}
.name { color: #7b8ff7; font-size: 34px; line-height: 1.15; margin: 0 0 12px; font-weight: 600; }
.position { text-transform: uppercase; letter-spacing: 1px; font-size: 14px; margin-bottom: 18px; }
h2 {
  color: #7b8ff7; font-size: 14px; font-weight: 600; text-transform: uppercase;
  border-bottom: 2px solid #c9d1fb; padding-bottom: 4px; margin: 18px 0 10px;
}
p { margin: 4px 0 0; }
.contact { list-style: none; padding: 0; margin: 0; }
.contact li { margin-bottom: 5px; word-break: break-all; }
.contact i { color: #7b8ff7; width: 20px; }
.rated { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
.dots i {
  display: inline-block; width: 9px; height: 9px; border-radius: 50%;
  background: #e2e6fd; margin-left: 5px;
}
.dots i.on { background: #7b8ff7; }
.entry { margin-bottom: 16px; }
.title { font-weight: 700; }
.org { font-weight: 600; margin-top: 2px; }
.meta { color: #555; margin-top: 2px; }
</style>
