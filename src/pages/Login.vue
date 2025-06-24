<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-card class="sketch-card pa-4 pa-md-8">
          
          <v-tabs v-model="tab" color="primary" grow class="login-tabs mb-8">
            <v-tab value="login" class="font-weight-bold text-h6">로그인</v-tab>
            <v-tab value="register" class="font-weight-bold text-h6">회원가입</v-tab>
          </v-tabs>

          <v-window v-model="tab">
            <!-- Login Form -->
            <v-window-item value="login">
              <v-form @submit.prevent="handleLogin">
                <v-text-field
                  v-model="loginForm.username"
                  label="사용자명"
                  variant="underlined"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="loginForm.password"
                  label="비밀번호"
                  type="password"
                  variant="underlined"
                  required
                  class="mt-4"
                ></v-text-field>
                <v-btn type="submit" block size="x-large" class="sketch-btn mt-10">로그인</v-btn>
              </v-form>
            </v-window-item>

            <!-- Registration Form -->
            <v-window-item value="register">
              <v-form @submit.prevent="handleRegister">
                <v-text-field
                  v-model="registerForm.username"
                  label="사용자명"
                  variant="underlined"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="registerForm.email"
                  label="이메일"
                  type="email"
                  variant="underlined"
                  required
                  class="mt-4"
                ></v-text-field>
                <v-text-field
                  v-model="registerForm.password"
                  label="비밀번호"
                  type="password"
                  variant="underlined"
                  required
                  class="mt-4"
                ></v-text-field>
                <v-text-field
                  v-model="registerForm.password_check"
                  label="비밀번호 확인"
                  type="password"
                  variant="underlined"
                  required
                  class="mt-4"
                ></v-text-field>
                <v-btn type="submit" block size="x-large" class="sketch-btn mt-10">회원가입</v-btn>
              </v-form>
            </v-window-item>
          </v-window>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';

const tab = ref('login');
const authStore = useAuthStore();
const router = useRouter();

const loginForm = ref({
  username: '',
  password: '',
});

const registerForm = ref({
  username: '',
  email: '',
  password: '',
  password_check: '',
});

const handleLogin = async () => {
  const success = await authStore.login(loginForm.value);
  if (success) {
    router.push('/');
  } else {
    alert('로그인에 실패했습니다.');
  }
};

const handleRegister = async () => {
  const success = await authStore.signup(registerForm.value);
  if (success) {
    router.push('/select-category');
  } else {
    // Error alert is now handled in the auth store
  }
};
</script>

<style scoped>
.login-tabs .v-tab {
  border-bottom: 2px solid transparent;
}
.login-tabs .v-tab--selected {
  border-color: #4A55A2;
}
</style> 