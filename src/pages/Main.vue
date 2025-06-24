<template>
  <v-container>
    <v-row align="center" class="my-4">
      <v-col cols="12" md="4">
        <h1 class="text-h3 font-weight-bold">오늘의 뉴스</h1>
      </v-col>
      <v-col cols="12" md="8" class="d-md-flex justify-end align-center">
        <v-select
          v-model="selectedCategory"
          :items="categories"
          label="카테고리"
          variant="underlined"
          class="flex-grow-0 mr-md-4"
          style="min-width: 200px;"
          dense
          hide-details
        ></v-select>
        <v-btn-toggle
          v-model="sortOrder"
          mandatory
          variant="outlined"
          color="primary"
          class="mt-4 mt-md-0"
        >
          <v-btn value="1">최신순</v-btn>
          <v-btn value="0">오래된 순</v-btn>
        </v-btn-toggle>
      </v-col>
    </v-row>

    <v-divider class="my-4"></v-divider>

    <v-row v-if="newsLoading">
        <v-col v-for="n in 24" :key="n" cols="12" sm="6" md="4" lg="3">
            <v-skeleton-loader type="card-avatar"></v-skeleton-loader>
        </v-col>
    </v-row>
    <v-row v-else>
      <v-col v-for="article in articles" :key="article.id" cols="12" sm="6" md="4" lg="3">
        <v-card
          class="sketch-card d-flex flex-column"
          flat
          height="100%"
          :href="article.link"
          target="_blank"
        >
          <v-card-title class="text-h6 font-weight-bold flex-grow-1" style="padding-right: 56px;">{{ article.title }}</v-card-title>
          <v-card-subtitle>
            {{ article.news_company }} | {{ new Date(article.publication_date).toLocaleDateString() }}
          </v-card-subtitle>
          <v-card-text class="mt-2 flex-grow-1">
            {{ article.summary }}
          </v-card-text>
          
          <v-btn
            icon
            variant="text"
            class="sketch-btn scrap-btn"
            @click.prevent="toggleScrap(article)"
            style="position: absolute; top: 8px; right: 8px;"
          >
            <v-icon :color="isScrapped(article.id) ? 'yellow-darken-2' : ''">
              {{ isScrapped(article.id) ? 'mdi-bookmark' : 'mdi-bookmark-outline' }}
            </v-icon>
          </v-btn>

        </v-card>
      </v-col>
    </v-row>

    <v-row v-if="!newsLoading">
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
import { ref, computed, onMounted, watch } from 'vue';
import { useApi } from '@/composables/useApi';
import { useAuthStore } from '@/stores/auth';

const categories = ['전체', "IT_과학", "건강", "경제", "교육", "국제", "라이프스타일", "문화", "사건사고", "사회일반", "산업", "스포츠", "여성복지", "여행레저", "연예", "정치", "지역", "취미", "기타"];
const selectedCategory = ref('전체');
const sortOrder = ref('1'); // '1' for latest, '0' for oldest
const currentPage = ref(1);
const itemsPerPage = 24;
const totalNewsCount = ref(0);

const articles = ref([]);
const scrappedNews = ref(new Set());
const authStore = useAuthStore();

const { data: newsData, loading: newsLoading, fetchData } = useApi('news');
const { data: scrapResult, fetchData: scrapFetch } = useApi('scrap');
const { data: initialScraps, fetchData: fetchInitialScraps } = useApi('scraps');

const pageCount = computed(() => {
  return Math.ceil(totalNewsCount.value / itemsPerPage);
});

const isScrapped = (newsId) => {
  return scrappedNews.value.has(newsId);
};

const toggleScrap = async (article) => {
  if (!authStore.isLoggedIn) {
    alert('로그인이 필요합니다.');
    return;
  }
  await scrapFetch({
    method: 'put',
    params: { news: article.id }
  });

  if (scrapResult.value) {
    if (scrapResult.value.active) {
      scrappedNews.value.add(article.id);
    } else {
      scrappedNews.value.delete(article.id);
    }
  }
};

const fetchNews = async () => {
    const params = {
        sort: sortOrder.value,
        page: currentPage.value,
        category: selectedCategory.value,
    };
    await fetchData({ params });
    if (newsData.value) {
        articles.value = newsData.value.results;
        totalNewsCount.value = newsData.value.count;
    }
}

watch([currentPage, selectedCategory, sortOrder], fetchNews, { immediate: false });

onMounted(async () => {
    await fetchNews();
    if(authStore.isLoggedIn) {
        await fetchInitialScraps();
        if (initialScraps.value && initialScraps.value.results) {
            const scrappedIds = initialScraps.value.results.map(n => n.id);
            scrappedNews.value = new Set(scrappedIds);
        }
    }
});
</script> 