<template>
  <v-container v-if="urls.length">
    <v-row justify="center">
      <v-col cols="12" v-for="(url, index) in urls" :key="index">
        <v-row>
          <v-col cols="auto" align-self="center">
            <span class="font-weight-bold body-1">
              <a :href="url.shortUrl" target="_blank">{{ url.shortUrl }}</a
              >&nbsp;
            </span>
            <span class="font-italic caption px-2">
              {{ i18n.DOMAIN_LIST_REDIRECT }}&nbsp;
            </span>
            <span class="font-weight-bold body-1">{{ url.longUrl }}</span>
          </v-col>
          <v-spacer />
          <v-col cols="auto" align-self="center">
            <span class="caption text--disabled">
              {{ i18n.DOMAIN_LIST_CREATED }}&nbsp;{{
                formatDate(url.dateCreated)
              }}
            </span>
          </v-col>
          <v-col cols="auto" align-self="center">
            <span @click="deleteUrl(url.shortCode)">
              <v-btn fab dark small depressed color="red">
                <v-icon dark> mdi-delete </v-icon>
              </v-btn>
            </span>
          </v-col>
        </v-row>
        <v-divider />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';
import dateHelper from '@/helper/dateHelper';

export default {
  name: 'DomainList',
  computed: {
    ...mapState(['shlink']),
    ...mapGetters('translation', ['i18n']),
    urls() {
      if (!this.shlink.urls) return false;
      return this.shlink.urls;
    },
  },
  methods: {
    ...mapActions(['deleteUrl']),
    formatDate(date) {
      return dateHelper(date, 'dateTime');
    },
  },
};
</script>
