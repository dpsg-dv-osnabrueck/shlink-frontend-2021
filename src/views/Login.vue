<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="5">
        <LoginForm />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';
import LoginForm from '@/components/LoginForm.vue';

export default {
  name: 'Login',
  components: {
    LoginForm,
  },
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
      }
    },
  },
  mounted() {
    this.redirect();
  },
};
</script>
