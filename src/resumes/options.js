import {
    store
} from '../store';
import {
    terms
} from '../terms';

// Called by templates to decrease redundancy
function getVueOptions (name) {
    const opt = {
        name: name,
        data () {
            return {
                terms: terms,
            };
        },
        methods: {
            // skill/language level (0-100) as filled dots out of 5
            dots (level) {
                const n = Math.round((Number(level) || 0) / 20);
                return Math.max(0, Math.min(5, n));
            },
            fullName () {
                const n = this.person.name;
                return [n.first, n.middle, n.last].filter(Boolean).join(' ');
            },
            withProtocol (url) {
                if (!url) {
                    return '';
                }
                return /^https?:\/\//.test(url) ? url : `https://${url}`;
            },
        },
        computed: {
            person () {
                return store.person;
            },
            photo () {
                return store.photo;
            },
            lang () {
                const defaultLang = this.terms.en;
                const useLang = this.terms[this.person.lang];

                // overwrite non-set fields with default lang
                Object.keys(defaultLang)
                    .filter(k => !useLang[k])
                    .forEach(k => {
                        useLang[k] = defaultLang[k];
                    });

                return useLang;
            },

            contactLinks() {
                const links = {};

                if(this.person.contact.github) {
                    links.github = `https://github.com/${this.person.contact.github}`;
                }

                if(this.person.contact.codefights) {
                    links.codefights = `https://codefights.com/profile/${this.person.contact.codefights}`;
                }

                if(this.person.contact.medium) {
                    links.medium = `https://medium.com/@${this.person.contact.medium}`;
                }

                if(this.person.contact.email) {
                    links.email = `mailto:${this.person.contact.email}`;
                }

                if(this.person.contact.linkedin) {
                    links.linkedin = `https://linkedin.com/in/${this.person.contact.linkedin}`;
                }

                if(this.person.contact.twitter) {
                    links.twitter = `https://twitter.com/${this.person.contact.twitter}`;
                }

                if(this.person.contact.website) {
                    links.website = this.withProtocol(this.person.contact.website);
                }

                if(this.person.contact.phone) {
                    links.phone = `tel:${this.person.contact.phone}`;
                }

                return links;
            },
        }
    };
    return opt;
}

export {
    getVueOptions
};
