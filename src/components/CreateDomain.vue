<template>
  <v-card color="primary" dark flat :rounded="false">
    <v-container class="mb-6">
      <v-row justify="center">
        <v-col cols="8">
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-row>
              <v-col cols="7">
                <v-text-field
                  v-model="longUrl"
                  :rules="nameRules.concat(urlRules)"
                  :placeholder="i18n.DOMAIN_CREATE_LONG_URL"
                  solo
                  light
                  required
                  :hide-details="valid"
                />
              </v-col>
              <v-col cols="3">
                <v-text-field
                  v-model="customSlug"
                  :placeholder="i18n.DOMAIN_CREATE_CUSTOM"
                  solo
                  light
                  :hide-details="valid"
                />
              </v-col>
              <v-spacer />
              <v-col cols="auto">
                <v-btn
                  color="info"
                  depressed
                  @click="authenticate"
                  large
                  class="shortButton"
                >
                  {{ i18n.DOMAIN_CREATE_BUTTON }}
                </v-btn>
              </v-col>
              <v-col cols="10">
                <v-alert type="error" v-if="duplicateSlug">
                  {{ i18n.DOMAIN_CREATE_DUPLICATE }}
                </v-alert>
              </v-col>
            </v-row>
          </v-form>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';
import { find } from 'lodash';

export default {
  name: 'CreateDomain',
  computed: {
    ...mapGetters('translation', ['i18n']),
    ...mapState(['shlink']),
    nameRules() {
      return [(v) => !!v || this.i18n.FORM_REQUIRED];
    },

    urlRules() {
      return [(v) => /^^(http|https):\/\//.test(v) || this.i18n.FORM_URL_TYPE];
    },
  },
  methods: {
    ...mapActions(['createUrl']),
    validate() {
      this.$refs.form.validate();
    },

    resetValidation() {
      this.$refs.form.resetValidation();
    },

    reset() {
      this.$refs.form.reset();
      this.longUrl = '';
      this.customSlug = null;
      this.duplicateSlug = false;
    },

    authenticate() {
      this.validate();
      this.customSlugExists();
      this.$nextTick(() => {
        if (this.valid && !this.duplicateSlug) {
          this.createUrl({
            longUrl: this.longUrl,
            customSlug: this.customSlug,
          }).then(() => {
            this.reset();
          });
        }
      });
    },

    customSlugExists() {
      const slug = find(this.shlink.urls, { shortCode: this.customSlug });
      if (slug) {
        this.duplicateSlug = true;
      } else {
        this.duplicateSlug = false;
      }
    },
  },
  data() {
    return {
      longUrl: '',
      customSlug: null,
      valid: true,
      duplicateSlug: false,
    };
  },
};
</script>
<style scoped>
.shortButton {
  margin-top: 1px;
}
</style>
