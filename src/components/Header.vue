<template>
  <v-app-bar :elevation="0" color="background">
    <v-btn to="/" variant="text" class="text-h5 font-weight-bold" style="text-transform: none;">
      Insight Weekly
    </v-btn>
    <v-spacer></v-spacer>

    <!-- Desktop Menu -->
    <div class="d-none d-md-flex align-center">
      <v-btn to="/main" variant="text" class="font-weight-bold">메인</v-btn>
      <v-btn to="/search" variant="text" class="font-weight-bold">검색</v-btn>
      <v-btn to="/analysis" variant="text" class="font-weight-bold">분석</v-btn>
      <v-btn v-if="!authStore.isLoggedIn" to="/login" variant="text" class="font-weight-bold">로그인</v-btn>
      <v-btn v-else @click="handleLogout" variant="text" class="font-weight-bold">로그아웃</v-btn>
    </div>

    <!-- Mobile Menu -->
    <div class="d-md-none">
      <v-menu>
        <template v-slot:activator="{ props }">
          <v-app-bar-nav-icon v-bind="props"></v-app-bar-nav-icon>
        </template>
        <v-list>
          <v-list-item to="/main">
            <v-list-item-title>메인</v-list-item-title>
          </v-list-item>
          <v-list-item to="/search">
            <v-list-item-title>검색</v-list-item-title>
          </v-list-item>
          <v-list-item to="/analysis">
            <v-list-item-title>분석</v-list-item-title>
          </v-list-item>
          <v-list-item v-if="!authStore.isLoggedIn" to="/login">
            <v-list-item-title>로그인</v-list-item-title>
          </v-list-item>
          <v-list-item v-else @click="handleLogout">
            <v-list-item-title>로그아웃</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
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