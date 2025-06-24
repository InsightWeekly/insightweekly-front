<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="10" md="8" lg="6">
        <v-card class="sketch-card pa-8 text-center">
          <h1 class="text-h4 font-weight-bold mb-8">선호 카테고리 3가지를 선택해주세요!</h1>
          <p class="mb-8 text-grey-darken-1">최대 3개까지 선택할 수 있습니다. 맞춤 뉴스를 추천해드려요.</p>
          
          <v-chip-group
            v-model="selectedCategories"
            column
            multiple
          >
            <v-chip
              v-for="category in categories"
              :key="category"
              :value="category"
              filter
              variant="outlined"
              size="large"
              class="ma-2"
              :disabled="selectedCategories.length >= 3 && !selectedCategories.includes(category)"
            >
              {{ category }}
            </v-chip>
          </v-chip-group>

          <v-btn
            @click="saveCategories"
            :disabled="selectedCategories.length === 0"
            size="x-large"
            class="sketch-btn mt-8"
            color="primary"
          >
            제출하기
          </v-btn>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useApi } from '@/composables/useApi';

const router = useRouter();
const { fetchData } = useApi('account/update-category');

const selectedCategories = ref([]);
const categories = ["IT_과학", "건강", "경제", "교육", "국제", "라이프스타일", "문화", "사건사고", "사회일반", "산업", "스포츠", "여성복지", "여행레저", "연예", "정치", "지역", "취미", "기타"];

const saveCategories = async () => {
  if (selectedCategories.value.length > 0) {
    await fetchData({
      method: 'put',
      data: {
        categories: selectedCategories.value
      }
    });
    // On success, redirect to the main page
    router.push('/main');
  } else {
    alert('하나 이상의 카테고리를 선택해주세요.');
  }
};
</script> 