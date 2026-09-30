<template>
<div class="resume" id="two-tone">
  <aside>
    <div v-if="photo" class="photo" :style="{ backgroundImage: 'url(' + photo + ')' }"></div>

    <section>
      <h2>{{ lang.contact }}</h2>
      <div class="item" v-if="person.contact.phone"><i class="fa fa-phone"></i><a :href="contactLinks.phone">{{ person.contact.phone }}</a></div>
      <div class="item" v-if="person.contact.email"><i class="fa fa-envelope"></i><a :href="contactLinks.email">{{ person.contact.email }}</a></div>
      <div class="item" v-if="person.contact.city"><i class="fa fa-home"></i>{{ person.contact.street }} {{ person.contact.city }}</div>
      <div class="item" v-if="person.contact.website"><i class="fa fa-globe"></i><a :href="contactLinks.website">{{ person.contact.website }}</a></div>
      <div class="item" v-if="person.contact.linkedin"><i class="fa fa-linkedin"></i><a :href="contactLinks.linkedin">{{ person.contact.linkedin }}</a></div>
      <div class="item" v-if="person.contact.github"><i class="fa fa-github"></i><a :href="contactLinks.github">{{ person.contact.github }}</a></div>
    </section>

    <section v-if="person.skills.length">
      <h2>{{ lang.skills }}</h2>
      <div class="skill" v-for="(skill, i) in person.skills" :key="'s' + i">
        {{ skill.name }}
        <div class="bar"><div :style="{ width: (skill.level || 0) + '%' }"></div></div>
      </div>
    </section>

    <section v-if="person.languages.length">
      <h2>Languages</h2>
      <div class="skill" v-for="(language, i) in person.languages" :key="'l' + i">
        {{ language.name }}
        <div class="bar"><div :style="{ width: (language.level || 0) + '%' }"></div></div>
      </div>
    </section>

    <section v-if="person.hobbies.length">
      <h2>Hobbies</h2>
      <div class="item" v-for="(hobby, i) in person.hobbies" :key="'h' + i"><i :class="hobby.iconClass || 'fa fa-heart'"></i>{{ hobby.name }}</div>
    </section>
  </aside>

  <main>
    <h1>{{ person.name.first }} <b>{{ person.name.last }}</b></h1>
    <div class="position">{{ person.position }}</div>
    <p class="about" v-if="person.about">{{ person.about }}</p>

    <section v-if="person.experience.length">
      <h2>{{ lang.experience }}</h2>
      <div class="entry" v-for="(job, i) in person.experience" :key="'e' + i">
        <div class="head"><span class="title">{{ job.position }}</span><span class="when">{{ job.timeperiod }}</span></div>
        <div class="org">{{ job.company }}</div>
        <p>{{ job.description }}</p>
      </div>
    </section>

    <section v-if="person.education.length">
      <h2>{{ lang.education }}</h2>
      <div class="entry" v-for="(edu, i) in person.education" :key="'d' + i">
        <div class="head"><span class="title">{{ edu.degree }}</span><span class="when">{{ edu.timeperiod }}</span></div>
        <p>{{ edu.description }}</p>
      </div>
    </section>

    <section v-if="person.certifications.length">
      <h2>Certifications</h2>
      <div class="entry" v-for="(cert, i) in person.certifications" :key="'c' + i">
        <div class="head"><span class="title">{{ cert.name }}</span><span class="when">{{ cert.timeperiod }}</span></div>
        <div class="org">{{ cert.issuer }}</div>
      </div>
    </section>
  </main>
</div>
</template>

<script>
import Vue from 'vue';
import { getVueOptions } from './options';

const name = 'two-tone';
export default Vue.component(name, getVueOptions(name));
</script>

<style scoped>
#two-tone {
  display: flex;
  height: 100%;
  font-family: 'Raleway', 'Open Sans', Arial, sans-serif;
  font-size: 12.5px;
  line-height: 1.5;
  color: #333;
}
a { color: inherit; text-decoration: none; }
aside {
  width: 34%; background: #2d3e50; color: #e6ebf0;
  padding: 44px 28px; box-sizing: border-box;
}
main { width: 66%; padding: 50px 44px; box-sizing: border-box; }
.photo {
  width: 150px; height: 150px; border-radius: 50%; margin: 0 auto 20px;
  background-size: cover; background-position: center; border: 5px solid #e67e22;
}
aside h2 { color: #fff; border-bottom: 1px solid #4a5d72; }
h2 {
  font-size: 14px; text-transform: uppercase; letter-spacing: 2px;
  padding-bottom: 5px; margin: 20px 0 10px; color: #2d3e50; border-bottom: 2px solid #e67e22;
}
.item { margin-bottom: 7px; word-break: break-all; }
.item i { width: 22px; color: #e67e22; }
.skill { margin-bottom: 8px; }
.bar { height: 5px; background: #4a5d72; border-radius: 3px; margin-top: 3px; }
.bar div { height: 100%; background: #e67e22; border-radius: 3px; }
h1 { font-size: 38px; font-weight: 300; margin: 0; color: #2d3e50; }
h1 b { font-weight: 800; }
.position { color: #e67e22; font-size: 16px; letter-spacing: 2px; text-transform: uppercase; }
.about { margin-top: 14px; }
.entry { margin-bottom: 14px; }
.head { display: flex; justify-content: space-between; }
.title { font-weight: 700; font-size: 13.5px; }
.when { color: #888; white-space: nowrap; margin-left: 10px; }
.org { color: #e67e22; font-weight: 600; }
p { margin: 2px 0 0; }
</style>
