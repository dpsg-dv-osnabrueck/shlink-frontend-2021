<template>
  <div>
    <UserInfo />
    <CreateDomain />
    <DomainList />
  </div>
</template>

<script>
import DomainList from '@/components/DomainList.vue';
import CreateDomain from '@/components/CreateDomain.vue';
import UserInfo from '@/components/UserInfo.vue';
import { mapActions, mapGetters, mapState } from 'vuex';

export default {
  name: 'Shortener',
  components: {
    DomainList,
    CreateDomain,
    UserInfo,
  },
  computed: {
    ...mapState(['authentication']),
    ...mapGetters({
      isAuthenticated: 'authentication/isAuthenticated',
    }),
  },
  methods: {
    ...mapActions({
      fetchUrls: 'shlink/fetchUrls',
    }),

    redirect() {
      if (!this.isAuthenticated) {
        this.$router.push({ name: 'Login' });
      }
    },
  },
  mounted() {
    this.fetchUrls();
    this.redirect();
  },
};
</script>
