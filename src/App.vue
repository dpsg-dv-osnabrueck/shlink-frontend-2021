<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row justify="center">
          <v-col cols="auto">
            <img :src="logo" width="120" height="120" />
          </v-col>
        </v-row>
      </v-container>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import logo from '@/assets/img/logo.svg';

export default {
  computed: {
    logo() {
      return logo;
    },
  },
};
</script>
