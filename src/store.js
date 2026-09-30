import Vue from 'vue';
import yaml from 'js-yaml';
import {
    PERSON
} from '../resume/data.yml';
import defaultPhoto from '../resume/id.jpg';

// Everything a visitor types is kept in their own browser only.
const DATA_KEY = 'resume-builder:person';
const PHOTO_KEY = 'resume-builder:photo';
const TEMPLATE_KEY = 'resume-builder:template';

const LISTS = ['experience', 'education', 'skills', 'languages', 'certifications', 'projects', 'hobbies', 'contributions'];

function readStorage (key) {
    try {
        return window.localStorage.getItem(key);
    } catch (e) {
        return null;
    }
}

function writeStorage (key, value) {
    try {
        if (value === null) {
            window.localStorage.removeItem(key);
        } else {
            window.localStorage.setItem(key, value);
        }
        return true;
    } catch (e) {
        return false;
    }
}

// Fill in anything missing so templates never read from undefined.
function normalize (p) {
    p = p || {};
    p.name = Object.assign({ first: '',
        middle: '',
        last: '' }, p.name);
    p.contact = Object.assign({}, p.contact);
    p.position = p.position || '';
    p.about = p.about || '';
    p.knowledge = p.knowledge || '';
    p.lang = p.lang || 'en';
    LISTS.forEach(k => {
        if (!Array.isArray(p[k])) {
            p[k] = [];
        }
    });
    return p;
}

function samplePerson () {
    return normalize(yaml.load(PERSON));
}

function blankPerson () {
    return normalize({ contact: { email: '',
        phone: '',
        city: '' } });
}

function loadPerson () {
    const raw = readStorage(DATA_KEY);
    if (raw) {
        try {
            return normalize(JSON.parse(raw));
        } catch (e) {
            // fall through to the sample data
        }
    }
    return samplePerson();
}

export const store = new Vue({
    data: {
        person: loadPerson(),
        // The sample photo belongs to the sample data; saved resumes only show an uploaded photo.
        photo: readStorage(PHOTO_KEY) || (readStorage(DATA_KEY) ? '' : defaultPhoto),
        template: readStorage(TEMPLATE_KEY) || 'modern-blue',
        hasSavedData: !!readStorage(DATA_KEY),
        saveFailed: false
    },
    methods: {
        save () {
            const ok = writeStorage(DATA_KEY, JSON.stringify(this.person));
            this.saveFailed = !ok;
            this.hasSavedData = ok;
        },
        setPerson (p) {
            this.person = normalize(p);
            this.save();
        },
        startBlank () {
            this.setPerson(blankPerson());
            this.clearPhoto();
        },
        loadSample () {
            this.setPerson(samplePerson());
            this.setPhoto(defaultPhoto);
        },
        setPhoto (dataUrl) {
            this.photo = dataUrl;
            this.saveFailed = !writeStorage(PHOTO_KEY, dataUrl);
        },
        clearPhoto () {
            this.photo = '';
            writeStorage(PHOTO_KEY, null);
        },
        setTemplate (name) {
            this.template = name;
            writeStorage(TEMPLATE_KEY, name);
        },
        // Removes everything this site stored in the browser.
        deleteAll () {
            writeStorage(DATA_KEY, null);
            writeStorage(PHOTO_KEY, null);
            writeStorage(TEMPLATE_KEY, null);
            this.person = blankPerson();
            this.photo = '';
            this.template = 'modern-blue';
            this.hasSavedData = false;
        }
    }
});
