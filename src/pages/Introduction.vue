<template>
  <v-container>
    <!-- Hero Section -->
    <v-row class="text-center my-12">
      <v-col>
        <h1 class="text-h2 font-weight-bold">
          <span style="color: #4A55A2;">AI</span>가 그려주는<br>세상의 모든 <span style="color: #4A55A2;">인사이트</span>
        </h1>
        <p class="text-h6 mt-6 text-grey-darken-2">
          정보의 홍수 속, 당신을 위한 똑똑한 나침반이 되어줄게요.
        </p>
      </v-col>
    </v-row>

    <!-- How It Works Section -->
    <v-row justify="center">
      <v-col cols="12" md="10">
        <v-card class="sketch-card pa-8">
          <h2 class="text-h4 font-weight-bold text-center mb-8">인사이트는 이렇게 만들어져요</h2>
          <v-timeline align="start" truncate-line="both">
            <v-timeline-item
              v-for="(step, i) in howItWorksSteps"
              :key="i"
              dot-color="grey-lighten-1"
              size="small"
            >
              <div class="d-flex">
                <div class="font-weight-bold text-h5 mr-4">{{ step.icon }}</div>
                <div>
                  <h3 class="text-h6 font-weight-bold">{{ step.title }}</h3>
                  <p class="text-body-1 mt-1">{{ step.description }}</p>
                </div>
              </div>
            </v-timeline-item>
          </v-timeline>
        </v-card>
      </v-col>
    </v-row>
    
    <!-- Report Section -->
    <v-row justify="center" class="my-16">
       <v-col cols="12" class="text-center">
         <h2 class="text-h4 font-weight-bold">당신은 이런 리포트를 받게 될 거예요</h2>
      </v-col>
      <v-col
        v-for="report in reportItems"
        :key="report.title"
        cols="12"
        md="4"
      >
        <v-card class="sketch-card pa-6 text-center" height="100%">
          <h3 class="text-h5 font-weight-bold">{{ report.title }}</h3>
          <p class="mt-4">{{ report.text }}</p>
        </v-card>
      </v-col>
    </v-row>

    <!-- For Whom Section -->
    <v-row justify="center">
      <v-col cols="12" md="10">
        <v-card class="sketch-card pa-8">
          <h2 class="text-h4 font-weight-bold text-center mb-8">누구에게나 유용하죠!</h2>
          <p class="text-center mb-6">특히 이런 분들께 추천해요.</p>
          <div class="text-center mb-8">
            <v-btn
              v-for="persona in Object.keys(personaData.datasets)"
              :key="persona"
              @click="activePersona = persona"
              class="sketch-btn mx-1"
              :color="activePersona === persona ? 'primary' : 'white'"
            >
              {{ personaData.datasets[persona].label.split('의')[0] }}
            </v-btn>
          </div>
          <div style="height:350px; position: relative;">
            <Bar :data="personaChartData" :options="chartOptions" />
          </div>
        </v-card>
      </v-col>
    </v-row>

    <!-- CTA Section -->
    <v-row class="my-16">
      <v-col class="text-center">
        <h2 class="text-h4 font-weight-bold mb-4">미래를 먼저 읽는 지혜, 궁금하지 않나요?</h2>
        <v-btn to="/login" class="sketch-btn" size="large" color="primary">
          베타 서비스 시작하기
        </v-btn>
      </v-col>
    </v-row>

  </v-container>
</template>

<script setup>
import { ref, computed } from 'vue';
import { Bar } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);
ChartJS.defaults.font.family = "'Gaegu', cursive";
ChartJS.defaults.font.size = 14;

const howItWorksSteps = ref([
  { icon: '📥', title: '매일매일 뉴스 수집', description: '전 세계 뉴스에서 데이터를 실시간으로 모아요.' },
  { icon: '⚙️', title: 'AI의 심층 분석', description: '숨겨진 맥락, 트렌드, 인과관계를 찾아내요.' },
  { icon: '🎯', title: '당신만을 위한 맞춤', description: '관심사와 역할에 맞춰 내용을 조정해요.' },
  { icon: '📈', title: '읽기 쉬운 리포트 전달', description: '이해하기 쉬운 주간 리포트로 만들어요.' },
]);

const reportItems = ref([
  { title: '트렌드 분석', text: '시장의 대화가 어떻게 변하는지, 누가 새로운 주도자인지 알려줘요.' },
  { title: '인과 분석', text: '뉴스가 왜 일어났고, 어떤 영향을 미칠지 뿌리까지 파헤쳐요.' },
  { title: '산업 간 연결', text: '한 분야의 나비효과가 내 산업에 미칠 영향을 예측해줘요.' },
]);

const activePersona = ref('executive');
const personaData = {
  labels: ['전략적 의사결정', '경쟁 환경 분석', '신기술 동향', '직무/역량 연관성', '면접 준비 지원'],
  datasets: {
    executive: {
      label: '경영진',
      data: [95, 90, 80, 40, 20],
      backgroundColor: '#4A55A2',
    },
    jobseeker: {
      label: '취준생',
      data: [50, 60, 85, 95, 90],
      backgroundColor: '#6A78C2',
    },
    analyst: {
      label: '분석가',
      data: [70, 85, 95, 60, 30],
      backgroundColor: '#909AD8',
    }
  }
};

const personaChartData = computed(() => ({
  labels: personaData.labels,
  datasets: [personaData.datasets[activePersona.value]]
}));

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false
    }
  },
  scales: {
    y: {
      beginAtZero: true,
      max: 100,
      ticks: {
        stepSize: 25,
      }
    }
  }
};
</script>

<style scoped>
.v-timeline--vertical.v-timeline {
    grid-row-gap: 24px;
}
</style> 