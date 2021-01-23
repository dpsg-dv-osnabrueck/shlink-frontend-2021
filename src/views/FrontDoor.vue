<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="auto">
        <v-progress-circular indeterminate color="primary" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'FrontDoor',
  computed: {
    ...mapGetters({
      isAuthenticated: 'authentication/isAuthenticated',
    }),
  },
  methods: {
    redirect() {
      if (this.isAuthenticated) {
        if (this.$route.path === '/') {
          this.$router.push({ name: 'Home' });
        }
      } else {
        this.$router.push({ name: 'Login' });
      }
    },
  },
  mounted() {
    this.redirect();
  },
};
</script>
