import { mapActions } from 'vuex';

export default {
  methods: {
    ...mapActions({
      logOutUser: 'auth/logOutUser',
    }),

    logout() {
      this.logOutUser().then(() => {
        this.$router.push({ name: 'Login' });
      });
    },
  },

};
