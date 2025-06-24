<template>
  <v-container>
    <v-row justify="center" class="text-center">
      <v-col cols="12" md="8">
        <h1 class="text-h3 font-weight-bold my-8">궁금한 키워드를 낙서해보세요</h1>
        <v-text-field
          v-model="searchQuery"
          placeholder="AI, 반도체, 메타버스 ..."
          variant="underlined"
          append-inner-icon="mdi-magnify"
          @click:append-inner="performSearch"
          @keyup.enter="performSearch"
          clearable
          class="text-h5"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row v-if="searched" align="center" class="mt-8">
        <v-col>
            <span v-if="totalResults > 0">총 {{ totalResults }}개의 검색 결과</span>
        </v-col>
        <v-col class="d-flex justify-end">
             <v-btn-toggle
                v-model="sortOrder"
                mandatory
                variant="outlined"
                color="primary"
                >
                <v-btn value="1">최신순</v-btn>
                <v-btn value="0">오래된 순</v-btn>
            </v-btn-toggle>
        </v-col>
    </v-row>

    <v-row v-if="loading" class="mt-8">
      <v-col>
        <div class="text-center">
          <v-progress-circular indeterminate color="primary"></v-progress-circular>
        </div>
      </v-col>
    </v-row>

    <v-row v-else-if="searched" class="mt-4">
      <v-col cols="12" v-if="!searchData || searchData.results.length === 0">
        <v-alert type="info">"{{ lastQuery }}"에 대한 검색 결과가 없습니다.</v-alert>
      </v-col>
      <v-col
        cols="12"
        v-for="article in searchData.results"
        :key="article.id"
      >
        <v-card
          class="sketch-card mb-4"
          flat
          :href="article.link"
          target="_blank"
        >
          <v-card-title class="text-h6 font-weight-bold" style="padding-right: 56px;">{{ article.title }}</v-card-title>
          <v-card-subtitle>
            {{ article.news_company }} | {{ new Date(article.publication_date).toLocaleDateString() }}
          </v-card-subtitle>
          <v-card-text class="mt-2">
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

    <v-row v-if="searched && !loading && totalResults > 0">
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
import { ref, computed, watch } from 'vue';
import { useApi } from '@/composables/useApi';
import { useAuthStore } from '@/stores/auth';

const searchQuery = ref('');
const lastQuery = ref('');
const searched = ref(false);
const sortOrder = ref('1');
const currentPage = ref(1);
const totalResults = ref(0);
const itemsPerPage = 24;

const scrappedNews = ref(new Set());
const authStore = useAuthStore();

const { data: searchData, loading, fetchData: searchFetch } = useApi('search');
const { data: scrapResult, fetchData: scrapFetchMethod } = useApi('scrap');
const { data: initialScraps, fetchData: fetchInitialScraps } = useApi('scraps');

const pageCount = computed(() => Math.ceil(totalResults.value / itemsPerPage));

const executeSearch = async () => {
  if (!lastQuery.value) return;
  searched.value = true;
  await searchFetch({ 
      params: { 
          keyword: lastQuery.value,
          page: currentPage.value,
          sort: sortOrder.value 
        } 
    });
    if(searchData.value) {
        totalResults.value = searchData.value.count;
    }
};

const performSearch = () => {
    if (!searchQuery.value) return;
    currentPage.value = 1;
    lastQuery.value = searchQuery.value;
    executeSearch();
};

watch([currentPage, sortOrder], executeSearch);

const isScrapped = (newsId) => {
  return scrappedNews.value.has(newsId);
};

const toggleScrap = async (article) => {
    if (!authStore.isLoggedIn) {
        alert('로그인이 필요합니다.');
        return;
    }
  await scrapFetchMethod({
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

// Initial load for scraps if logged in
watch(() => authStore.isLoggedIn, (loggedIn) => {
    if (loggedIn) {
        fetchInitialScraps().then(() => {
            if (initialScraps.value && initialScraps.value.results) {
                const scrappedIds = initialScraps.value.results.map(n => n.id);
                scrappedNews.value = new Set(scrappedIds);
            }
        });
    }
}, { immediate: true });
</script> 