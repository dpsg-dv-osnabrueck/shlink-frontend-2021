<template>
  <v-container v-if="hasAuthModule">
    <v-row>
      <v-col class="text-right">
        <p class="caption">
          {{ userName }} (<a @click="logout">{{ i18n.LOGOUT_LABEL }}</a
          >)
        </p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';

export default {
  name: 'UserInfo',
  computed: {
    ...mapState(['authentication']),
    ...mapGetters('translation', ['i18n']),

    userName() {
      return this.authentication.user.email;
    },

    hasAuthModule() {
      const auth = Boolean(process.env.VUE_APP_MATTERMOST_AUTH);
      return !auth;
    },
  },
  methods: {
    ...mapActions({
      logoutUser: 'authentication/logout',
    }),

    logout() {
      this.logoutUser().then(() => {
        this.$router.push({ name: 'Login' });
      });
    },
  },
};
</script>
