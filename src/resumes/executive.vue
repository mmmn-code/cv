<template>
<div class="resume" id="executive">
  <header>
    <div>
      <h1>{{ fullName() }}</h1>
      <div class="position">{{ person.position }}</div>
    </div>
    <div v-if="photo" class="photo" :style="{ backgroundImage: 'url(' + photo + ')' }"></div>
  </header>

  <div class="body">
    <main>
      <section v-if="person.about">
        <h2>Profile</h2>
        <p>{{ person.about }}</p>
      </section>

      <section v-if="person.experience.length">
        <h2>{{ lang.experience }}</h2>
        <div class="entry" v-for="(job, i) in person.experience" :key="'e' + i">
          <div class="title">{{ job.position }}</div>
          <div class="org">{{ job.company }} <span>{{ job.timeperiod }}</span></div>
          <p>{{ job.description }}</p>
        </div>
      </section>

      <section v-if="person.education.length">
        <h2>{{ lang.education }}</h2>
        <div class="entry" v-for="(edu, i) in person.education" :key="'d' + i">
          <div class="title">{{ edu.degree }}</div>
          <div class="org"><span>{{ edu.timeperiod }}</span></div>
          <p>{{ edu.description }}</p>
        </div>
      </section>
    </main>

    <aside>
      <section>
        <h2>{{ lang.contact }}</h2>
        <div class="item" v-if="person.contact.email"><i class="fa fa-envelope"></i><a :href="contactLinks.email">{{ person.contact.email }}</a></div>
        <div class="item" v-if="person.contact.phone"><i class="fa fa-phone"></i><a :href="contactLinks.phone">{{ person.contact.phone }}</a></div>
        <div class="item" v-if="person.contact.city"><i class="fa fa-map-marker"></i>{{ person.contact.city }}</div>
        <div class="item" v-if="person.contact.linkedin"><i class="fa fa-linkedin"></i><a :href="contactLinks.linkedin">{{ person.contact.linkedin }}</a></div>
        <div class="item" v-if="person.contact.website"><i class="fa fa-globe"></i><a :href="contactLinks.website">{{ person.contact.website }}</a></div>
      </section>

      <section v-if="person.skills.length">
        <h2>{{ lang.skills }}</h2>
        <div class="skill" v-for="(skill, i) in person.skills" :key="'s' + i">
          <div>{{ skill.name }}</div>
          <div class="bar"><div :style="{ width: (skill.level || 0) + '%' }"></div></div>
        </div>
      </section>

      <section v-if="person.languages.length">
        <h2>Languages</h2>
        <div class="item" v-for="(language, i) in person.languages" :key="'l' + i">{{ language.name }}</div>
      </section>

      <section v-if="person.certifications.length">
        <h2>Certifications</h2>
        <div class="cert" v-for="(cert, i) in person.certifications" :key="'c' + i">
          <strong>{{ cert.name }}</strong>
          <div>{{ cert.issuer }} {{ cert.timeperiod }}</div>
        </div>
      </section>
    </aside>
  </div>
</div>
</template>

<script>
import Vue from 'vue';
import { getVueOptions } from './options';

const name = 'executive';
export default Vue.component(name, getVueOptions(name));
</script>

<style scoped>
#executive {
  height: 100%;
  font-family: 'Source Sans Pro', Arial, sans-serif;
  color: #2b2b2b;
  font-size: 13px;
  line-height: 1.5;
  display: flex;
  flex-direction: column;
}
a { color: inherit; text-decoration: none; }
header {
  background: #1f2d4a; color: #fff;
  padding: 44px 56px; display: flex; justify-content: space-between; align-items: center;
}
h1 { margin: 0; font-size: 36px; font-weight: 600; letter-spacing: 1px; }
.position { color: #d4af6a; font-size: 16px; text-transform: uppercase; letter-spacing: 3px; margin-top: 6px; }
.photo {
  width: 110px; height: 110px; border-radius: 50%; border: 4px solid #d4af6a;
  background-size: cover; background-position: center; flex: none;
}
.body { display: flex; flex: 1; }
main { width: 64%; padding: 26px 30px 26px 56px; box-sizing: border-box; }
aside { width: 36%; background: #f2f3f6; padding: 26px 34px; box-sizing: border-box; }
h2 {
  color: #1f2d4a; font-size: 15px; text-transform: uppercase; letter-spacing: 2px;
  margin: 14px 0 10px; padding-bottom: 4px; border-bottom: 2px solid #d4af6a; display: inline-block;
}
p { margin: 3px 0 0; }
.entry { margin-bottom: 14px; }
.title { font-weight: 700; font-size: 14px; }
.org { color: #1f2d4a; font-weight: 600; }
.org span { color: #888; font-weight: normal; margin-left: 6px; }
.item { margin-bottom: 6px; word-break: break-all; }
.item i { width: 18px; color: #1f2d4a; }
.skill { margin-bottom: 8px; }
.bar { height: 5px; background: #d9dce3; border-radius: 3px; margin-top: 3px; }
.bar div { height: 100%; background: #1f2d4a; border-radius: 3px; }
.cert { margin-bottom: 8px; }
.cert div { color: #666; }
</style>
