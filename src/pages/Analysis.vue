<template>
  <v-container>
    <h1 class="text-h3 font-weight-bold my-4">분석 대시보드</h1>
    
    <!-- Key Metrics -->
    <v-row v-if="analysisData">
      <v-col cols="12" sm="6" md="4">
        <v-card class="sketch-card text-center pa-2">
          <v-card-text class="text-subtitle-1 text-grey-darken-1">오늘 수집된 뉴스</v-card-text>
          <v-card-title class="text-h4 font-weight-bold">{{ analysisData.summary.today_collected_news_count }}</v-card-title>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" md="4">
        <v-card class="sketch-card text-center pa-2">
          <v-card-text class="text-subtitle-1 text-grey-darken-1">오늘의 조회수</v-card-text>
          <v-card-title class="text-h4 font-weight-bold">{{ analysisData.summary.today_views_count }}</v-card-title>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" md="4">
        <v-card class="sketch-card text-center pa-2">
          <v-card-text class="text-subtitle-1 text-grey-darken-1">오늘의 스크랩 수</v-card-text>
          <v-card-title class="text-h4 font-weight-bold">{{ analysisData.summary.today_scraps_count }}</v-card-title>
        </v-card>
      </v-col>
    </v-row>

    <!-- Charts -->
    <v-row v-if="analysisData">
      <v-col cols="12" md="6">
        <v-card class="sketch-card">
          <v-card-title class="text-center">주간 조회수 트렌드</v-card-title>
          <v-card-text>
            <div style="height:300px; position: relative;">
              <Line :data="weeklyViewTrendData" :options="chartOptions" />
            </div>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card class="sketch-card">
          <v-card-title class="text-center">주간 스크랩 트렌드</v-card-title>
          <v-card-text>
            <div style="height:300px; position: relative;">
              <Line :data="weeklyScrapTrendData" :options="chartOptions" />
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Detailed Analysis Table -->
     <v-row v-if="analysisData">
      <v-col>
        <v-card>
          <v-card-title>주간 인기 뉴스 TOP 10</v-card-title>
          <v-data-table
            :headers="tableHeaders"
            :items="analysisData.weekly_top10_news"
            item-key="id"
            class="elevation-0"
          >
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { Line } from 'vue-chartjs';
import { Chart, registerables } from 'chart.js';
import { useApi } from '@/composables/useApi';
Chart.register(...registerables);

const { data: analysisData, error, loading, fetchData } = useApi('analysis');

onMounted(() => {
  fetchData();
});

const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { position: 'bottom' } }
});

const weeklyViewTrendData = computed(() => {
    if (!analysisData.value || !analysisData.value.weekly_view_trend) return {};
    const trend = analysisData.value.weekly_view_trend;
    return {
        labels: trend.map(item => new Date(item.view_time__date).toLocaleDateString()),
        datasets: [
            {
                label: '조회수',
                data: trend.map(item => item.views),
                borderColor: '#4A55A2',
                tension: 0.1,
                fill: false
            },
        ],
    };
});

const weeklyScrapTrendData = computed(() => {
    if (!analysisData.value || !analysisData.value.weekly_scrap_trend) return {};
    const trend = analysisData.value.weekly_scrap_trend;
    return {
        labels: trend.map(item => new Date(item.scrap_date).toLocaleDateString()),
        datasets: [
            {
                label: '스크랩 수',
                data: trend.map(item => item.scraps),
                borderColor: '#6A78C2',
                tension: 0.1,
                fill: false
            },
        ],
    };
});

const tableHeaders = ref([
    { title: 'ID', key: 'id', align: 'start' },
    { title: '제목', key: 'title' },
    { title: '카테고리', key: 'category' },
    { title: '조회수', key: 'view_count' },
]);

</script> 