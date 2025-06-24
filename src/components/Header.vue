<template>
  <v-app-bar :elevation="0" color="background">
    <v-btn to="/" variant="text" class="text-h5 font-weight-bold" style="text-transform: none;">
      Insight Weekly
    </v-btn>
    <v-spacer></v-spacer>
    <v-btn to="/main" variant="text" class="font-weight-bold">메인</v-btn>
    <v-btn to="/search" variant="text" class="font-weight-bold">검색</v-btn>
    <v-btn to="/analysis" variant="text" class="font-weight-bold">분석</v-btn>
    <v-btn v-if="!authStore.isLoggedIn" to="/login" variant="text" class="font-weight-bold">로그인</v-btn>
    <v-btn v-else @click="handleLogout" variant="text" class="font-weight-bold">로그아웃</v-btn>
  </v-app-bar>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

const handleLogout = () => {
  authStore.logout();
  router.push('/login');
};
</script> 