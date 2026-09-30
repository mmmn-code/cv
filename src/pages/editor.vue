<template>
<div class="editor">
  <nav class="topbar">
    <router-link to="/" class="brand">&larr; Templates</router-link>
    <label class="tpl">
      Template
      <select :value="template" @change="setTemplate($event.target.value)">
        <option v-for="t in templates" :key="t.id" :value="t.id">{{ t.label }}</option>
      </select>
    </label>
    <span class="status" :class="{ bad: saveFailed }">{{ saveFailed ? 'Could not save (browser storage full or blocked)' : status }}</span>
    <router-link class="btn primary" :to="'/resume/' + template">View &amp; print</router-link>
  </nav>

  <div class="layout">
    <form class="form" @submit.prevent>
      <div class="panel data-actions">
        <button type="button" class="btn" @click="exportJson">Export data</button>
        <label class="btn">Import data<input type="file" accept="application/json,.json" @change="importJson"></label>
        <button type="button" class="btn" @click="confirmThen('Replace your data with the sample resume?', loadSample)">Load sample</button>
        <button type="button" class="btn" @click="confirmThen('Clear every field and start a blank resume?', startBlank)">Start blank</button>
        <button type="button" class="btn danger" @click="confirmThen('Delete all your resume data and photo from this browser? This cannot be undone.', deleteAll)">Delete all my data</button>
      </div>

      <fieldset class="panel">
        <legend>Personal details</legend>
        <div class="photo-row">
          <div class="photo" :style="photo ? { backgroundImage: 'url(' + photo + ')' } : {}">
            <span v-if="!photo">No photo</span>
          </div>
          <div>
            <label class="btn">{{ photo ? 'Change photo' : 'Upload photo' }}<input type="file" accept="image/*" @change="uploadPhoto"></label>
            <button v-if="photo" type="button" class="btn danger-text" @click="clearPhoto">Remove photo</button>
          </div>
        </div>
        <div class="grid3">
          <label>First name<input v-model="person.name.first"></label>
          <label>Middle name<input v-model="person.name.middle"></label>
          <label>Last name<input v-model="person.name.last"></label>
        </div>
        <label>Job title<input v-model="person.position" placeholder="Marketing Manager"></label>
        <label>About me<textarea v-model="person.about" rows="4"></textarea></label>
        <label>Resume language
          <select v-model="person.lang">
            <option v-for="code in langCodes" :key="code" :value="code">{{ code }}</option>
          </select>
        </label>
      </fieldset>

      <fieldset class="panel">
        <legend>Contact</legend>
        <div class="grid2">
          <label v-for="f in contactFields" :key="f.k">{{ f.label }}
            <input v-model="person.contact[f.k]" :placeholder="f.placeholder">
          </label>
        </div>
      </fieldset>

      <fieldset class="panel" v-for="list in lists" :key="list.key">
        <legend>{{ list.title }} <small>({{ person[list.key].length }})</small></legend>
        <p class="hint" v-if="list.hint">{{ list.hint }}</p>

        <div class="item" v-for="(item, i) in person[list.key]" :key="list.key + i">
          <div class="item-head">
            <button type="button" class="item-title" @click="toggle(list.key, i)">
              <span class="caret">{{ isOpen(list.key, i) ? '&#9662;' : '&#9656;' }}</span>
              {{ list.summary(item) || '(untitled)' }}
            </button>
            <button type="button" class="icon" title="Move up" :disabled="i === 0" @click="move(list.key, i, -1)">&uarr;</button>
            <button type="button" class="icon" title="Move down" :disabled="i === person[list.key].length - 1" @click="move(list.key, i, 1)">&darr;</button>
            <button type="button" class="icon" title="Edit" @click="toggle(list.key, i)">&#9998;</button>
            <button type="button" class="icon del" title="Delete" @click="remove(list, i)">&#10005;</button>
          </div>
          <div class="item-body" v-if="isOpen(list.key, i)">
            <label v-for="f in list.fields" :key="f.k" :class="{ wide: f.type === 'textarea' }">
              {{ f.label }}
              <textarea v-if="f.type === 'textarea'" v-model="item[f.k]" rows="3" :placeholder="f.placeholder"></textarea>
              <span v-else-if="f.type === 'level'" class="level">
                <input type="range" min="0" max="100" step="5" v-model.number="item[f.k]">
                <output>{{ item[f.k] || 0 }}%</output>
              </span>
              <input v-else v-model="item[f.k]" :placeholder="f.placeholder">
            </label>
          </div>
        </div>

        <button type="button" class="btn add" @click="add(list)">+ Add {{ list.noun }}</button>
      </fieldset>

      <fieldset class="panel">
        <legend>Extra</legend>
        <label>Additional knowledge <small>(shown by some older templates)</small>
          <textarea v-model="person.knowledge" rows="3"></textarea>
        </label>
      </fieldset>
    </form>

    <aside class="preview" ref="preview">
      <scaled-sheet :template="template" :width="previewWidth"></scaled-sheet>
    </aside>
  </div>
</div>
</template>

<script>
// confirm() guards deletes; alert() reports unreadable files.
/* eslint-disable no-alert */
import Vue from 'vue';
import ScaledSheet from '../components/ScaledSheet';
import { templates } from '../resumes/catalog';
import { terms } from '../terms';
import { store } from '../store';

const LISTS = [
    {
        key: 'experience',
        title: 'Work experience',
        noun: 'job',
        blank: () => ({ position: '',
            company: '',
            location: '',
            timeperiod: '',
            description: '',
            website: '' }),
        summary: x => [x.position, x.company].filter(Boolean).join(' · '),
        fields: [
            { k: 'position',
                label: 'Job title' },
            { k: 'company',
                label: 'Company' },
            { k: 'location',
                label: 'Location' },
            { k: 'timeperiod',
                label: 'Dates',
                placeholder: 'Jul 2018 - Present' },
            { k: 'website',
                label: 'Company website' },
            { k: 'description',
                label: 'Description',
                type: 'textarea' }
        ]
    },
    {
        key: 'education',
        title: 'Education',
        noun: 'education',
        blank: () => ({ degree: '',
            timeperiod: '',
            description: '',
            website: '' }),
        summary: x => x.degree,
        fields: [
            { k: 'degree',
                label: 'Degree' },
            { k: 'timeperiod',
                label: 'Dates',
                placeholder: 'Aug 2015 - Jun 2017' },
            { k: 'website',
                label: 'Website' },
            { k: 'description',
                label: 'School / details',
                type: 'textarea' }
        ]
    },
    {
        key: 'skills',
        title: 'Skills',
        noun: 'skill',
        blank: () => ({ name: '',
            level: 80 }),
        summary: x => x.name && `${x.name} (${x.level || 0}%)`,
        fields: [
            { k: 'name',
                label: 'Skill' },
            { k: 'level',
                label: 'Level',
                type: 'level' }
        ]
    },
    {
        key: 'languages',
        title: 'Languages',
        noun: 'language',
        hint: 'Shown by the new templates.',
        blank: () => ({ name: '',
            level: 80 }),
        summary: x => x.name && `${x.name} (${x.level || 0}%)`,
        fields: [
            { k: 'name',
                label: 'Language' },
            { k: 'level',
                label: 'Level',
                type: 'level' }
        ]
    },
    {
        key: 'certifications',
        title: 'Certifications',
        noun: 'certification',
        hint: 'Shown by the new templates.',
        blank: () => ({ name: '',
            issuer: '',
            timeperiod: '' }),
        summary: x => x.name,
        fields: [
            { k: 'name',
                label: 'Certification' },
            { k: 'issuer',
                label: 'Issued by' },
            { k: 'timeperiod',
                label: 'Dates' }
        ]
    },
    {
        key: 'projects',
        title: 'Projects',
        noun: 'project',
        blank: () => ({ name: '',
            platform: '',
            timeperiod: '',
            description: '',
            url: '' }),
        summary: x => x.name,
        fields: [
            { k: 'name',
                label: 'Project name' },
            { k: 'platform',
                label: 'Platform / tech' },
            { k: 'timeperiod',
                label: 'Dates' },
            { k: 'url',
                label: 'Link' },
            { k: 'description',
                label: 'Description',
                type: 'textarea' }
        ]
    },
    {
        key: 'hobbies',
        title: 'Hobbies',
        noun: 'hobby',
        blank: () => ({ name: '',
            iconClass: 'fa fa-heart',
            url: '' }),
        summary: x => x.name,
        fields: [
            { k: 'name',
                label: 'Hobby' },
            { k: 'iconClass',
                label: 'Icon',
                placeholder: 'fa fa-gamepad' },
            { k: 'url',
                label: 'Link' }
        ]
    },
    {
        key: 'contributions',
        title: 'Contributions',
        noun: 'contribution',
        blank: () => ({ name: '',
            description: '',
            url: '' }),
        summary: x => x.name,
        fields: [
            { k: 'name',
                label: 'Name' },
            { k: 'url',
                label: 'Link' },
            { k: 'description',
                label: 'Description',
                type: 'textarea' }
        ]
    }
];

const CONTACT_FIELDS = [
    { k: 'email',
        label: 'Email' },
    { k: 'phone',
        label: 'Phone' },
    { k: 'street',
        label: 'Street' },
    { k: 'city',
        label: 'City' },
    { k: 'website',
        label: 'Website',
        placeholder: 'www.example.com' },
    { k: 'linkedin',
        label: 'LinkedIn username',
        placeholder: 'your-name' },
    { k: 'twitter',
        label: 'Twitter username' },
    { k: 'github',
        label: 'GitHub username' },
    { k: 'medium',
        label: 'Medium username' }
];

// Keep the stored photo small enough for browser storage.
function shrinkImage (file, maxSize) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onerror = reject;
        reader.onload = () => {
            const img = new Image();
            img.onerror = reject;
            img.onload = () => {
                const scale = Math.min(1, maxSize / Math.max(img.width, img.height));
                const canvas = document.createElement('canvas');
                canvas.width = Math.round(img.width * scale);
                canvas.height = Math.round(img.height * scale);
                canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height);
                resolve(canvas.toDataURL('image/jpeg', 0.85));
            };
            img.src = reader.result;
        };
        reader.readAsDataURL(file);
    });
}

export default {
    name: 'editor',
    components: { ScaledSheet },
    data () {
        return {
            templates,
            lists: LISTS,
            contactFields: CONTACT_FIELDS,
            langCodes: Object.keys(terms),
            open: {},
            status: '',
            previewWidth: 520
        };
    },
    computed: {
        person () {
            return store.person;
        },
        photo () {
            return store.photo;
        },
        template () {
            return store.template;
        },
        saveFailed () {
            return store.saveFailed;
        }
    },
    watch: {
        person: {
            deep: true,
            handler () {
                // Deleting swaps in a blank resume; that change must not be saved back.
                if (this.skipNextSave) {
                    this.skipNextSave = false;
                    return;
                }
                this.status = 'Saving…';
                clearTimeout(this.saveTimer);
                this.saveTimer = setTimeout(() => {
                    this.saveTimer = null;
                    store.save();
                    this.status = 'All changes saved';
                }, 400);
            }
        }
    },
    created () {
        const fromQuery = this.$route.query.template;
        if (fromQuery && templates.some(t => t.id === fromQuery)) {
            store.setTemplate(fromQuery);
        }
    },
    mounted () {
        this.fitPreview();
        window.addEventListener('resize', this.fitPreview);
    },
    beforeDestroy () {
        window.removeEventListener('resize', this.fitPreview);
        if (this.saveTimer) {
            clearTimeout(this.saveTimer);
            store.save();
        }
    },
    methods: {
        fitPreview () {
            const el = this.$refs.preview;
            if (el) {
                this.previewWidth = Math.max(260, Math.min(700, el.clientWidth - 32));
            }
        },
        setTemplate (id) {
            store.setTemplate(id);
        },
        isOpen (key, i) {
            return !!this.open[key + i];
        },
        toggle (key, i) {
            Vue.set(this.open, key + i, !this.open[key + i]);
        },
        add (list) {
            const items = this.person[list.key];
            items.push(list.blank());
            Vue.set(this.open, list.key + (items.length - 1), true);
        },
        remove (list, i) {
            const label = list.summary(this.person[list.key][i]) || `this ${list.noun}`;
            if (window.confirm(`Delete "${label}"?`)) {
                this.person[list.key].splice(i, 1);
                this.open = {};
            }
        },
        move (key, i, dir) {
            const items = this.person[key];
            const j = i + dir;
            if (j < 0 || j >= items.length) {
                return;
            }
            items.splice(j, 0, items.splice(i, 1)[0]);
            this.open = {};
        },
        confirmThen (message, fn) {
            if (window.confirm(message)) {
                fn();
                this.open = {};
            }
        },
        loadSample () {
            store.loadSample();
        },
        startBlank () {
            store.startBlank();
        },
        deleteAll () {
            clearTimeout(this.saveTimer);
            this.saveTimer = null;
            this.skipNextSave = true;
            store.deleteAll();
            this.status = 'Your data was deleted from this browser';
        },
        clearPhoto () {
            store.clearPhoto();
        },
        uploadPhoto (e) {
            const file = e.target.files[0];
            e.target.value = '';
            if (!file) {
                return;
            }
            shrinkImage(file, 400)
                .then(url => store.setPhoto(url))
                .catch(() => window.alert('That image could not be read. Try a JPG or PNG.'));
        },
        exportJson () {
            const blob = new Blob([JSON.stringify({ person: this.person,
                photo: this.photo }, null, 2)], { type: 'application/json' });
            const a = document.createElement('a');
            a.href = URL.createObjectURL(blob);
            a.download = 'my-resume.json';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            setTimeout(() => URL.revokeObjectURL(a.href), 1000);
        },
        importJson (e) {
            const file = e.target.files[0];
            e.target.value = '';
            if (!file) {
                return;
            }
            const reader = new FileReader();
            reader.onload = () => {
                try {
                    const data = JSON.parse(reader.result);
                    const person = data.person || data;
                    if (!person || !person.name || Array.isArray(person)) {
                        throw new Error('not a resume');
                    }
                    store.setPerson(person);
                    if (data.photo) {
                        store.setPhoto(data.photo);
                    }
                    this.open = {};
                } catch (err) {
                    window.alert('That file is not a resume exported from this site.');
                }
            };
            reader.readAsText(file);
        }
    }
};
</script>

<style scoped>
.editor {
  font-family: 'Roboto', Arial, sans-serif;
  background: #eceff1;
  min-height: 100vh;
  color: #263238;
  font-size: 14px;
}
.topbar {
  position: sticky; top: 0; z-index: 5;
  display: flex; align-items: center; gap: 14px; flex-wrap: wrap;
  padding: 10px 16px; background: #263238; color: #fff;
}
.brand { color: #fff; text-decoration: none; }
.tpl { display: flex; align-items: center; gap: 8px; margin: 0; color: #fff; }
.tpl select { padding: 5px; border-radius: 4px; border: 0; font-size: 14px; }
.status { color: #a5d6a7; font-size: 13px; margin-left: auto; }
.status.bad { color: #ff8a80; }
.layout { display: flex; align-items: flex-start; }
.form { flex: 1; min-width: 0; padding: 16px; max-width: 640px; box-sizing: border-box; }
.preview {
  flex: 1; position: sticky; top: 56px; padding: 16px;
  max-height: calc(100vh - 56px); overflow: auto; box-sizing: border-box;
}
.preview >>> .scaled { box-shadow: 0 2px 10px rgba(0,0,0,.25); margin: 0 auto; }
.panel {
  background: #fff; border: 0; border-radius: 6px; margin: 0 0 16px;
  padding: 14px 16px 16px; box-shadow: 0 1px 3px rgba(0,0,0,.12);
}
legend { font-weight: 500; font-size: 16px; padding: 0 4px; background: #fff; border-radius: 4px; }
legend small, label small { color: #78909c; font-weight: normal; }
.hint { color: #78909c; margin: 0 0 8px; font-size: 13px; }
label { display: block; margin: 8px 0 0; font-size: 13px; color: #546e7a; }
input, textarea, select {
  display: block; width: 100%; box-sizing: border-box; margin-top: 3px;
  padding: 7px 9px; border: 1px solid #cfd8dc; border-radius: 4px;
  font: inherit; font-size: 14px; color: #263238; background: #fff;
}
textarea { resize: vertical; }
input:focus, textarea:focus, select:focus { outline: 2px solid #90caf9; border-color: #1e88e5; }
.grid2, .grid3 { display: grid; gap: 0 12px; }
.grid2 { grid-template-columns: 1fr 1fr; }
.grid3 { grid-template-columns: 1fr 1fr 1fr; }
.btn {
  display: inline-block; padding: 7px 12px; border-radius: 4px; border: 1px solid #b0bec5;
  background: #fff; color: #263238; cursor: pointer; font: inherit; font-size: 13px;
  text-decoration: none; margin: 0;
}
.btn input[type=file] { display: none; }
.btn.primary { background: #1e88e5; border-color: #1e88e5; color: #fff; }
.btn.danger { border-color: #e53935; color: #e53935; }
.btn.danger-text { border: 0; color: #e53935; background: none; }
.btn.add { margin-top: 10px; border-style: dashed; color: #1e88e5; border-color: #1e88e5; }
.data-actions { display: flex; flex-wrap: wrap; gap: 8px; }
.photo-row { display: flex; align-items: center; gap: 16px; margin-bottom: 4px; }
.photo {
  width: 72px; height: 72px; border-radius: 50%; background: #eceff1 center/cover;
  display: flex; align-items: center; justify-content: center; color: #90a4ae; font-size: 11px;
}
.item { border: 1px solid #e0e6e9; border-radius: 5px; margin-bottom: 8px; }
.item-head { display: flex; align-items: center; }
.item-title {
  flex: 1; text-align: left; background: none; border: 0; padding: 9px 10px;
  font: inherit; cursor: pointer; color: #263238; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
}
.caret { color: #90a4ae; margin-right: 4px; }
.icon {
  background: none; border: 0; cursor: pointer; width: 32px; height: 32px;
  font-size: 15px; color: #607d8b; border-radius: 4px;
}
.icon:hover:not(:disabled) { background: #eceff1; }
.icon:disabled { opacity: .3; cursor: default; }
.icon.del { color: #e53935; }
.item-body {
  display: grid; grid-template-columns: 1fr 1fr; gap: 0 12px;
  padding: 0 12px 12px; border-top: 1px solid #eef2f4;
}
.item-body .wide { grid-column: span 2; }
.level { display: flex; align-items: center; gap: 8px; }
.level input { padding: 0; border: 0; }
.level output { width: 42px; text-align: right; color: #263238; }
@media (max-width: 900px) {
  .layout { flex-direction: column; }
  .form { max-width: none; width: 100%; }
  .preview { position: static; max-height: none; width: 100%; overflow-x: auto; }
  .status { margin-left: 0; width: 100%; order: 5; }
}
@media (max-width: 520px) {
  .grid2, .grid3, .item-body { grid-template-columns: 1fr; }
  .item-body .wide { grid-column: auto; }
}
</style>
