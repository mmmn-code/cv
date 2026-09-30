<template>
<div class="resume" id="bold-header">
  <header>
    <div v-if="photo" class="photo" :style="{ backgroundImage: 'url(' + photo + ')' }"></div>
    <div>
      <h1>{{ person.name.first }}<br>{{ person.name.last }}</h1>
      <div class="position">{{ person.position }}</div>
    </div>
  </header>

  <div class="contact">
    <span v-if="person.contact.email"><i class="fa fa-envelope"></i><a :href="contactLinks.email">{{ person.contact.email }}</a></span>
    <span v-if="person.contact.phone"><i class="fa fa-phone"></i><a :href="contactLinks.phone">{{ person.contact.phone }}</a></span>
    <span v-if="person.contact.city"><i class="fa fa-map-marker"></i>{{ person.contact.city }}</span>
    <span v-if="person.contact.website"><i class="fa fa-globe"></i><a :href="contactLinks.website">{{ person.contact.website }}</a></span>
  </div>

  <div class="grid">
    <div class="card wide" v-if="person.about">
      <h2>{{ lang.about }}</h2>
      <p>{{ person.about }}</p>
    </div>

    <div class="card wide" v-if="person.experience.length">
      <h2>{{ lang.experience }}</h2>
      <div class="entry" v-for="(job, i) in person.experience" :key="'e' + i">
        <div class="title">{{ job.position }} <span>@ {{ job.company }}</span></div>
        <div class="when">{{ job.timeperiod }}</div>
        <p>{{ job.description }}</p>
      </div>
    </div>

    <div class="card" v-if="person.education.length">
      <h2>{{ lang.education }}</h2>
      <div class="entry" v-for="(edu, i) in person.education" :key="'d' + i">
        <div class="title">{{ edu.degree }}</div>
        <div class="when">{{ edu.timeperiod }}</div>
        <p>{{ edu.description }}</p>
      </div>
    </div>

    <div class="card">
      <template v-if="person.skills.length">
        <h2>{{ lang.skills }}</h2>
        <div class="rated" v-for="(skill, i) in person.skills" :key="'s' + i">
          <span>{{ skill.name }}</span>
          <span class="dots"><i v-for="n in 5" :key="n" :class="{ on: n <= dots(skill.level) }"></i></span>
        </div>
      </template>
      <template v-if="person.languages.length">
        <h2 class="gap">Languages</h2>
        <div class="rated" v-for="(language, i) in person.languages" :key="'l' + i">
          <span>{{ language.name }}</span>
          <span class="dots"><i v-for="n in 5" :key="n" :class="{ on: n <= dots(language.level) }"></i></span>
        </div>
      </template>
    </div>

    <div class="card wide" v-if="person.certifications.length">
      <h2>Certifications</h2>
      <div class="entry inline" v-for="(cert, i) in person.certifications" :key="'c' + i">
        <span class="title">{{ cert.name }}</span> <span>{{ cert.issuer }}</span> <span class="when">{{ cert.timeperiod }}</span>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import Vue from 'vue';
import { getVueOptions } from './options';

const name = 'bold-header';
export default Vue.component(name, getVueOptions(name));
</script>

<style scoped>
#bold-header {
  height: 100%;
  font-family: 'Roboto', Arial, sans-serif;
  font-size: 12.5px;
  line-height: 1.5;
  color: #333;
  background: #fafafa;
}
a { color: inherit; text-decoration: none; }
header {
  background: linear-gradient(120deg, #ff6b5b, #ff9a5a);
  color: #fff; padding: 40px 50px 56px;
  display: flex; align-items: center; gap: 28px;
  clip-path: polygon(0 0, 100% 0, 100% 80%, 0 100%);
}
.photo {
  width: 120px; height: 120px; border-radius: 18px; flex: none;
  background-size: cover; background-position: center; border: 4px solid rgba(255,255,255,.8);
}
h1 { margin: 0; font-size: 46px; line-height: 1; font-weight: 900; text-transform: uppercase; }
.position { font-size: 17px; margin-top: 8px; letter-spacing: 1px; }
.contact { padding: 4px 50px 10px; display: flex; flex-wrap: wrap; gap: 6px 22px; }
.contact i { color: #ff6b5b; margin-right: 6px; }
.grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; padding: 6px 50px; }
.card { background: #fff; border-radius: 10px; padding: 14px 18px; box-shadow: 0 1px 4px rgba(0,0,0,.08); }
.card.wide { grid-column: span 2; }
h2 { margin: 0 0 8px; font-size: 14px; color: #ff6b5b; text-transform: uppercase; letter-spacing: 1px; }
h2.gap { margin-top: 12px; }
.entry { margin-bottom: 10px; }
.entry.inline { margin-bottom: 4px; }
.title { font-weight: 700; }
.title span { font-weight: 400; color: #ff6b5b; }
.when { color: #999; font-size: 11.5px; }
p { margin: 2px 0 0; }
.rated { display: flex; justify-content: space-between; margin-bottom: 5px; }
.dots i { display: inline-block; width: 8px; height: 8px; border-radius: 50%; background: #ffd9d4; margin-left: 4px; }
.dots i.on { background: #ff6b5b; }
</style>
