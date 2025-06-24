<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1 class="text-h3 font-weight-bold my-4">오늘의 뉴스</h1>
        <v-chip-group v-model="selectedCategory" color="primary" mandatory>
          <v-chip v-for="category in categories" :key="category" :value="category" variant="outlined" size="large">
            {{ category }}
          </v-chip>
        </v-chip-group>
      </v-col>
    </v-row>

    <v-divider class="my-4"></v-divider>

    <v-row>
      <v-col v-for="article in paginatedArticles" :key="article.id" cols="12" sm="6" md="4" lg="3">
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

    <v-row>
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
import { ref, computed } from 'vue';

const sortBy = ref('recommended');
const categories = ['전체', 'AI', '자율주행', '공급망', '바이오', '메타버스'];
const selectedCategory = ref('전체');
const currentPage = ref(1);
const itemsPerPage = 24;

// Dummy data for news articles with categories - expanded for pagination
const articles = ref([
  { id: 1, title: "AI, 신약 개발 속도 10년 앞당긴다", source: "A뉴스", author: "김기자", date: "2023-10-27T10:00:00Z", summary: "혁신적인 AI 알고리즘이 신약 후보물질 발굴 시간을 획기적으로 단축시켜 제약 산업에 큰 변화를 가져올 것으로 기대됩니다.", recommendation: 95, category: 'AI', isScrapped: false },
  { id: 2, title: "자율주행차, 도심 물류 시스템 혁신", source: "B일보", author: "박기자", date: "2023-10-27T09:00:00Z", summary: "도심 내 라스트마일 배송에 자율주행 로봇이 투입되며 효율성이 극대화되고 있습니다. 관련 규제 완화가 시급합니다.", recommendation: 92, category: '자율주행', isScrapped: false },
  { id: 3, title: "글로벌 공급망, 생성형 AI로 재편", source: "C경제", author: "이코노", date: "2023-10-26T15:00:00Z", summary: "생성형 AI가 수요 예측과 재고 관리를 자동화하여 공급망 리스크를 최소화하고, 기업의 비용 절감에 기여하고 있습니다.", recommendation: 88, category: '공급망', isScrapped: false },
  { id: 4, title: "메타버스, 원격의료의 새로운 지평 열어", source: "D사이언스", author: "최박사", date: "2023-10-25T11:00:00Z", summary: "가상현실 속에서 의사와 환자가 만나 진료하는 시대가 현실로 다가왔습니다. 기술적, 법적 과제 해결이 필요합니다.", recommendation: 85, category: '메타버스', isScrapped: false },
  { id: 5, title: "양자컴퓨팅, 금융 모델링의 한계를 넘다", source: "E테크", author: "오테크", date: "2023-10-26T18:00:00Z", summary: "기존 컴퓨터로는 불가능했던 복잡한 금융 리스크 분석이 양자컴퓨팅으로 가능해지면서 금융 시장의 예측 정확도가 높아질 전망입니다.", recommendation: 98, category: 'AI', isScrapped: false },
  { id: 6, title: "유전자 가위 기술, 희귀병 치료에 새 희망", source: "F바이오", author: "강교수", date: "2023-10-24T13:00:00Z", summary: "크리스퍼 유전자 가위 기술이 유전 질환 치료의 새로운 가능성을 열었습니다. 윤리적 문제에 대한 사회적 합의가 중요합니다.", recommendation: 79, category: '바이오', isScrapped: false },
  // ... (duplicated data for pagination)
  ...Array.from({ length: 4 }, (_, i) => i + 1).flatMap(i => [
    { id: 7 + (i * 6), title: `AI 시대의 새로운 윤리 문제 ${i+1}`, source: "A뉴스", author: "김기자", date: "2023-10-23T10:00:00Z", summary: "AI 기술 발전과 함께 발생하는 다양한 윤리적 문제들에 대한 심층 분석 보고서입니다.", recommendation: 89 - i, category: 'AI', isScrapped: false },
    { id: 8 + (i * 6), title: `자율주행 트럭, 24시간 운송 시대 연다 ${i+1}`, source: "B일보", author: "박기자", date: "2023-10-22T09:00:00Z", summary: "자율주행 트럭의 상용화가 물류 산업에 가져올 혁명적인 변화를 예측합니다.", recommendation: 91 - i, category: '자율주행', isScrapped: false },
    { id: 9 + (i * 6), title: `공급망 관리, 블록체인 도입 효과는? ${i+1}`, source: "C경제", author: "이코노", date: "2023-10-21T15:00:00Z", summary: "블록체인 기술이 공급망의 투명성과 신뢰도를 어떻게 향상시키는지 분석합니다.", recommendation: 87 - i, category: '공급망', isScrapped: false },
    { id: 10 + (i * 6), title: `메타버스, 교육 현장의 새로운 가능성 ${i+1}`, source: "D사이언스", author: "최박사", date: "2023-10-20T11:00:00Z", summary: "가상현실을 이용한 몰입형 교육 콘텐츠가 학생들의 학습 효과를 높이고 있습니다.", recommendation: 84 - i, category: '메타버스', isScrapped: false },
    { id: 11 + (i * 6), title: `AI가 작곡한 음악, 저작권은 누구에게? ${i+1}`, source: "E테크", author: "오테크", date: "2023-10-19T18:00:00Z", summary: "인공지능 창작물의 저작권 귀속 문제에 대한 법적, 철학적 논의가 활발합니다.", recommendation: 97 - i, category: 'AI', isScrapped: false },
    { id: 12 + (i * 6), title: `개인 맞춤형 항암 치료, 바이오마커의 중요성 ${i+1}`, source: "F바이오", author: "강교수", date: "2023-10-18T13:00:00Z", summary: "환자 개개인의 유전 정보를 활용한 맞춤형 항암 치료 기술의 최신 동향을 소개합니다.", recommendation: 78 - i, category: '바이오', isScrapped: false },
  ])
]);

const scrapArticle = (article) => {
  article.isScrapped = !article.isScrapped;
};

const filteredAndSortedArticles = computed(() => {
  let items = articles.value;

  // Filter by category
  if (selectedCategory.value !== '전체') {
    items = items.filter(article => article.category === selectedCategory.value);
  }

  // Sort
  const sorted = [...items];
  if (sortBy.value === 'latest') {
    return sorted.sort((a, b) => new Date(b.date) - new Date(a.date));
  }
  // 'recommended'
  return sorted.sort((a, b) => b.recommendation - a.recommendation);
});

const pageCount = computed(() => {
  return Math.ceil(filteredAndSortedArticles.value.length / itemsPerPage);
});

const paginatedArticles = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredAndSortedArticles.value.slice(start, end);
});
</script> 