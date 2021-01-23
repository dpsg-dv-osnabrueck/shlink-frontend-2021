<template>
  <v-card>
    <v-card-title>
      {{ i18n.LOGIN_TITLE }}
    </v-card-title>
    <v-card-text>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-alert type="error" v-if="wrongCreds" class="mb-2">
          {{ authentication.errorMessage }}
        </v-alert>
        <v-alert
          type="error"
          v-if="authentication.status === status.error"
          class="mb-2"
        >
          {{ i18n.LOGIN_ERROR }}
        </v-alert>
        <v-text-field
          v-model="userData.name"
          :rules="nameRules"
          :placeholder="i18n.LOGIN_FORM_USERNAME"
          required
          prepend-inner-icon="mdi-account-circle"
        />

        <v-text-field
          v-model="userData.password"
          :rules="nameRules"
          :placeholder="i18n.LOGIN_FORM_PASSWORD"
          required
          type="password"
          prepend-inner-icon="mdi-lock"
        />

        <v-text-field
          v-if="authentication.mfa"
          v-model="userData.token"
          :rules="nameRules"
          :placeholder="i18n.LOGIN_FORM_MFA"
          required
          :error="
            authentication.mattermostStatus === mattermostStatus.InvalidToken
          "
          :error-message="authentication.errorMessage"
          prepend-inner-icon="mdi-account-key"
        />
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            :disabled="!valid"
            color="primary"
            class="mr-4"
            @click="checkMFA"
            :loading="authentication.status === status.loading"
          >
            <v-icon> mdi-login </v-icon>
            {{ i18n.LOGIN_FORM_BUTTON_LOGIN }}
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';
import requestStatus from '@/data/requestStatus';
import MattermostStatus from '@/data/mmStatus';

export default {
  name: 'LoginForm',
  data: () => ({
    valid: true,
    userData: {
      name: '',
      password: '',
      token: null,
    },
    checkedMFA: false,
  }),

  methods: {
    ...mapActions({
      authenticateClient: 'authentication/authenticateClient',
      mfa: 'authentication/checkMFA',
    }),

    validate() {
      this.$refs.form.validate();
    },

    resetValidation() {
      this.$refs.form.resetValidation();
    },

    checkMFA() {
      this.validate();
      this.$nextTick(() => {
        if (this.valid) {
          this.mfa(this.userData.name).then(() => {
            this.resetValidation();
            this.$nextTick(() => {
              if (!this.authentication.mfa) {
                this.loginUser();
              } else if (this.userData.token) {
                this.loginUser();
              }
            });
          });
        }
      });
    },

    loginUser() {
      this.authenticateClient({
        login_id: this.userData.name,
        password: this.userData.password,
        token: this.userData.token,
      }).then(() => {
        this.$router.push({ name: 'Shlink' });
      });
    },

    authenticate() {
      this.validate();
      this.$nextTick(() => {
        if (this.valid) {
          this.loginUser();
        }
      });
    },
  },
  computed: {
    ...mapState(['authentication']),
    ...mapGetters('translation', ['i18n']),
    mattermostStatus() {
      return MattermostStatus;
    },

    status() {
      return requestStatus;
    },

    nameRules() {
      return [(v) => !!v || this.i18n.FORM_REQUIRED];
    },

    wrongCreds() {
      return this.authentication.mattermostStatus === this.mattermostStatus.wrongCreds;
    },
  },
};
</script>
