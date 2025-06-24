<template>
  <v-app class="d-flex flex-column">
    <Header />
    <v-main style="flex-grow: 1;">
      <router-view />
    </v-main>
    <Footer />
  </v-app>
</template>

<script setup>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
</script>
