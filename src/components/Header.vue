<template>
  <v-app-bar :elevation="0" color="background">
    <v-btn to="/" variant="text" class="text-h5 font-weight-bold" style="text-transform: none;">
      Insight Weekly
    </v-btn>
    <v-spacer></v-spacer>

    <!-- Desktop Menu -->
    <template v-if="!display.smAndDown">
      <v-btn to="/main" variant="text" class="font-weight-bold">메인</v-btn>
      <v-btn to="/search" variant="text" class="font-weight-bold">검색</v-btn>
      <v-btn to="/analysis" variant="text" class="font-weight-bold">분석</v-btn>
      <v-btn v-if="!authStore.isLoggedIn" to="/login" variant="text" class="font-weight-bold">로그인</v-btn>
      <v-btn v-else @click="handleLogout" variant="text" class="font-weight-bold">로그아웃</v-btn>
    </template>

    <!-- Mobile Menu -->
    <v-app-bar-nav-icon v-else @click="drawer = !drawer"></v-app-bar-nav-icon>
  </v-app-bar>

  <v-navigation-drawer v-model="drawer" location="right" temporary>
    <v-list>
      <v-list-item to="/main" @click="drawer = false">
        <v-list-item-title>메인</v-list-item-title>
      </v-list-item>
      <v-list-item to="/search" @click="drawer = false">
        <v-list-item-title>검색</v-list-item-title>
      </v-list-item>
      <v-list-item to="/analysis" @click="drawer = false">
        <v-list-item-title>분석</v-list-item-title>
      </v-list-item>
      <v-list-item v-if="!authStore.isLoggedIn" to="/login" @click="drawer = false">
        <v-list-item-title>로그인</v-list-item-title>
      </v-list-item>
      <v-list-item v-else @click="handleMobileLogout">
        <v-list-item-title>로그아웃</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import { ref } from 'vue';
import { useDisplay } from 'vuetify';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';

const display = useDisplay();
const authStore = useAuthStore();
const router = useRouter();
const drawer = ref(false);

const handleLogout = () => {
  authStore.logout();
  router.push('/login');
};

const handleMobileLogout = () => {
  handleLogout();
  drawer.value = false;
};
</script> 