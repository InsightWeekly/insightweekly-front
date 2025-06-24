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

    <v-row v-if="searched" class="mt-8">
      <v-col cols="12"
        v-for="article in searchResults"
        :key="article.id"
      >
        <v-card class="sketch-card" flat>
          <v-card-title class="text-h6 font-weight-bold">{{ article.title }}</v-card-title>
          <v-card-subtitle>
            {{ article.source }} | {{ new Date(article.date).toLocaleDateString() }} | {{ article.author }}
          </v-card-subtitle>
          <v-card-text class="mt-2">
            {{ article.summary }}
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="sketch-btn" variant="text" @click="scrapArticle(article)">
              <v-icon left :color="article.isScrapped ? 'yellow-darken-2' : ''">
                {{ article.isScrapped ? 'mdi-bookmark' : 'mdi-bookmark-outline' }}
              </v-icon>
              스크랩
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';

const searchQuery = ref('');
const lastQuery = ref('');
const searched = ref(false);
const searchResults = ref([]);

const allArticles = ref([
  { id: 1, title: "AI, 신약 개발 속도 10년 앞당긴다", source: "A뉴스", author: "김기자", date: "2023-10-27T10:00:00Z", summary: "혁신적인 AI 알고리즘이 신약 후보물질 발굴 시간을 획기적으로 단축시켜 제약 산업에 큰 변화를 가져올 것으로 기대됩니다.", recommendation: 95, category: 'AI', isScrapped: false },
  { id: 2, title: "자율주행차, 도심 물류 시스템 혁신", source: "B일보", author: "박기자", date: "2023-10-27T09:00:00Z", summary: "도심 내 라스트마일 배송에 자율주행 로봇이 투입되며 효율성이 극대화되고 있습니다. 관련 규제 완화가 시급합니다.", recommendation: 92, category: '자율주행', isScrapped: false },
  { id: 3, title: "글로벌 공급망, 생성형 AI로 재편", source: "C경제", author: "이코노", date: "2023-10-26T15:00:00Z", summary: "생성형 AI가 수요 예측과 재고 관리를 자동화하여 공급망 리스크를 최소화하고, 기업의 비용 절감에 기여하고 있습니다.", recommendation: 88, category: '공급망', isScrapped: false },
  { id: 4, title: "반도체 기술, AI 발전에 날개를 달다", source: "E테크", author: "오테크", date: "2023-10-25T18:00:00Z", summary: "차세대 반도체 개발이 AI 연산 능력을 기하급수적으로 향상시키고 있습니다.", recommendation: 99, category: 'AI', isScrapped: false },
]);

const scrapArticle = (article) => {
  article.isScrapped = !article.isScrapped;
};

const performSearch = () => {
  searched.value = true;
  lastQuery.value = searchQuery.value;
  if (!searchQuery.value) {
    searchResults.value = [];
    return;
  }
  searchResults.value = allArticles.value.filter(
    (article) =>
      article.title.includes(searchQuery.value) ||
      article.summary.includes(searchQuery.value)
  );
};
</script> 