import { mapGetters } from 'vuex';
import regex from '@/data/regex';

export default {

  computed: {
    ...mapGetters('translation', ['i18n']),

    zipRules() {
      return [(v) => regex.zipCodeGermany.test(v) || this.i18n.FORM_VALIDATION_ZIP];
    },

    emailRules() {
      return [(v) => regex.email.test(v) || this.i18n.FORM_VALIDATION_EMAIL];
    },

    requiredRules() {
      return [(v) => !!v || this.i18n.FORM_VALIDATION_REQUIRED];
    },

    gender() {
      return [
        { text: this.i18n.FORM_GENDER_FEMALE, value: 'female' },
        { text: this.i18n.FORM_GENDER_MALE, value: 'male' },
        { text: this.i18n.FORM_GENDER_NON_BINARY, value: 'noGender' },
      ];
    },

    salutation() {
      return [
        { text: this.i18n.FORM_TITLE_DOCTOR, value: this.i18n.FORM_TITLE_DOCTOR },
        { text: this.i18n.FORM_TITLE_PROFESSOR, value: this.i18n.FORM_TITLE_PROFESSOR },
        {
          text: this.i18n.FORM_TITLE_PROFESSOR_DOCTOR,
          value: this.i18n.FORM_TITLE_PROFESSOR_DOCTOR,
        },
      ];
    },
  },
};
