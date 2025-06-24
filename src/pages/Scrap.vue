<template>
  <v-container>
    <h1 class="text-h4 font-weight-bold my-4">스크랩한 뉴스</h1>

    <v-row v-if="loading">
      <v-col v-for="n in 15" :key="n" cols="12">
        <v-skeleton-loader type="list-item-avatar-three-line"></v-skeleton-loader>
      </v-col>
    </v-row>
    <v-row v-else-if="error">
      <v-col>
        <v-alert type="error">스크랩한 뉴스를 불러오는데 실패했습니다.</v-alert>
      </v-col>
    </v-row>
    <v-row v-else-if="scrappedNewsData && scrappedNewsData.results">
       <v-col cols="12" v-if="scrappedNewsData.results.length === 0">
        <v-alert type="info">스크랩한 뉴스가 없습니다.</v-alert>
      </v-col>
      <v-col v-for="news in scrappedNewsData.results" :key="news.id" cols="12">
        <v-card
          class="sketch-card mb-4"
          flat
          :href="news.link"
          target="_blank"
        >
          <v-card-title class="text-h6 font-weight-bold" style="padding-right: 56px;">{{ news.title }}</v-card-title>
          <v-card-subtitle>{{ news.news_company }} | {{ new Date(news.publication_date).toLocaleDateString() }}</v-card-subtitle>
          <v-card-text class="mt-2">{{ news.summary }}</v-card-text>
          <v-btn
            icon
            variant="text"
            class="scrap-btn"
            @click.prevent="toggleScrap(news)"
            style="position: absolute; top: 8px; right: 8px;"
          >
            <v-icon color="yellow-darken-2">mdi-bookmark</v-icon>
          </v-btn>
        </v-card>
      </v-col>
    </v-row>
     <v-row v-else>
       <v-col>
        <v-alert type="info">로그인이 필요한 서비스입니다.</v-alert>
      </v-col>
     </v-row>

     <v-row v-if="!loading && pageCount > 1">
        <v-col>
            <v-pagination
                v-model="currentPage"
                :length="pageCount"
                rounded="circle"
                class="my-8"
            ></v-pagination>
        </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import { useApi } from '@/composables/useApi';
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();
const currentPage = ref(1);
const totalResults = ref(0);
const itemsPerPage = 15;

const { data: scrappedNewsData, error, loading, fetchData: fetchScrappedNews } = useApi('scraps');
const { fetchData: scrapFetch } = useApi('scrap');

const pageCount = computed(() => Math.ceil(totalResults.value / itemsPerPage));

const fetchScraps = async () => {
    if (authStore.isLoggedIn) {
        await fetchScrappedNews({ params: { page: currentPage.value }});
        if (scrappedNewsData.value) {
            totalResults.value = scrappedNewsData.value.count;
        }
    }
}

const toggleScrap = async (news) => {
  await scrapFetch({
    method: 'put',
    params: { news: news.id }
  });
  // refetch the list
  fetchScraps();
};

watch(currentPage, fetchScraps);

onMounted(fetchScraps);
</script> 