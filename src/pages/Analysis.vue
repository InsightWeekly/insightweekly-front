<template>
  <v-container>
    <h1 class="text-h3 font-weight-bold my-4">분석 대시보드</h1>
    
    <!-- Key Metrics -->
    <v-row>
      <v-col v-for="metric in keyMetrics" :key="metric.title" cols="12" sm="6" md="3">
        <v-card class="sketch-card text-center pa-2">
          <v-card-text class="text-subtitle-1 text-grey-darken-1">{{ metric.title }}</v-card-text>
          <v-card-title class="text-h4 font-weight-bold">{{ metric.value }}</v-card-title>
        </v-card>
      </v-col>
    </v-row>

    <!-- Charts -->
    <v-row>
      <v-col cols="12" md="4">
        <v-card class="sketch-card">
          <v-card-title class="text-center">주요 토픽 분포</v-card-title>
          <v-card-text>
            <div style="height:300px; position: relative;">
              <Doughnut :data="topicDistributionData" :options="chartOptions" />
            </div>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="8">
        <v-card class="sketch-card">
          <v-card-title class="text-center">주간 토픽 트렌드</v-card-title>
          <v-card-text>
            <div style="height:300px; position: relative;">
              <Line :data="weeklyTrendData" :options="chartOptions" />
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Detailed Analysis Table -->
     <v-row>
      <v-col>
        <v-card>
          <v-card-title>상세 분석 데이터</v-card-title>
          <v-data-table
            :headers="tableHeaders"
            :items="detailedData"
            item-key="id"
            class="elevation-0"
          >
            <template v-slot:item.sentiment="{ value }">
              <v-chip :color="getSentimentColor(value)">{{ value }}</v-chip>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';
import { Line, Doughnut } from 'vue-chartjs';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

const keyMetrics = ref([
  { title: '주간 분석 뉴스', value: '1,204' },
  { title: '핵심 토픽', value: '생성형 AI' },
  { title: '긍정 감성 지수', value: '78%' },
  { title: '언급된 기업 수', value: '315' },
]);

const topicDistributionData = ref({
  labels: ['AI/ML', '반도체', '자율주행', '바이오헬스', '기타'],
  datasets: [{
    data: [40, 25, 15, 10, 10],
    backgroundColor: ['#4A55A2', '#6A78C2', '#909AD8', '#A0AEC0', '#E2E8F0'],
  }],
});

const weeklyTrendData = ref({
  labels: ['월', '화', '수', '목', '금', '토', '일'],
  datasets: [
    { label: 'AI/ML', data: [65, 59, 80, 81, 56, 55, 60], borderColor: '#4A55A2', tension: 0.1, fill: false },
    { label: '반도체', data: [28, 48, 40, 19, 86, 27, 90], borderColor: '#6A78C2', tension: 0.1, fill: false },
  ],
});

const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { position: 'bottom' } }
});

const tableHeaders = ref([
    { title: 'ID', key: 'id' },
    { title: '핵심 내용', key: 'title' },
    { title: '카테고리', key: 'category' },
    { title: '감성분석', key: 'sentiment' },
    { title: '관련도', key: 'relevance' },
]);

const detailedData = ref([
    { id: 1, title: 'AI 기반 신약 개발 플랫폼, FDA 승인', category: 'AI', sentiment: '긍정', relevance: 98 },
    { id: 2, title: '자율주행 레벨 4 상용화, 규제 완화가 관건', category: '자율주행', sentiment: '중립', relevance: 95 },
    { id: 3, title: '공급망 병목 현상, 반도체 부족 심화', category: '반도체', sentiment: '부정', relevance: 92 },
    { id: 4, title: '원격 근무 확산, 메타버스 회의 솔루션 주목', category: '메타버스', sentiment: '긍정', relevance: 88 },
]);

const getSentimentColor = (sentiment) => {
    if (sentiment === '긍정') return 'success';
    if (sentiment === '부정') return 'error';
    return 'grey';
};

</script> 