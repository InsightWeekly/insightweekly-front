<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="8" lg="7">
        <h1 class="text-h4 font-weight-bold my-8 text-center">마이페이지</h1>

        <!-- Category Selection Card -->
        <v-card class="sketch-card pa-8 text-center mb-8">
          <h2 class="text-h5 font-weight-bold mb-2">관심 카테고리 수정</h2>
          <p class="mb-8 text-grey-darken-1">최대 3개까지 선택할 수 있습니다.</p>
          
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
            size="large"
            class="sketch-btn mt-8"
            color="primary"
          >
            카테고리 저장
          </v-btn>
        </v-card>

        <!-- Logout Card -->
        <v-card class="sketch-card pa-8 text-center">
            <h2 class="text-h5 font-weight-bold mb-4">로그아웃</h2>
            <v-btn @click="handleLogout" size="large" class="sketch-btn">
                로그아웃하기
            </v-btn>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useApi } from '@/composables/useApi';
import { useAuthStore } from '@/stores/auth';

const router = useRouter();
const authStore = useAuthStore();
const { data: userData, fetchData: fetchUserData } = useApi('account/profile');
const { fetchData: updateCategoryFetch } = useApi('account/update-category');

const selectedCategories = ref([]);
const categories = ["IT_과학", "건강", "경제", "교육", "국제", "라이프스타일", "문화", "사건사고", "사회일반", "산업", "스포츠", "여성복지", "여행레저", "연예", "정치", "지역", "취미", "기타"];

const saveCategories = async () => {
  if (selectedCategories.value.length > 0) {
    await updateCategoryFetch({
      method: 'put',
      data: {
        categories: selectedCategories.value
      }
    });
    alert('카테고리가 저장되었습니다.');
  } else {
    alert('하나 이상의 카테고리를 선택해주세요.');
  }
};

const handleLogout = () => {
  authStore.logout();
  router.push('/');
};

onMounted(async () => {
  if (!authStore.isLoggedIn) {
    router.push('/login');
    return;
  }
  await fetchUserData();
  if (userData.value && userData.value.interest_category) {
    selectedCategories.value = userData.value.interest_category.split(',');
  }
});
</script> 