# Insight Weekly Frontend

Vue.js와 Vuetify를 사용하여 'Insight Weekly' 웹 애플리케이션의 프론트엔드를 개발합니다.

## 개발 진행 과정

### **1. 초기 구조 설정 및 페이지 생성 (2024-05-23)**

-   기본으로 생성된 모든 페이지와 컴포넌트를 삭제하고, 프로젝트 요구사항에 맞춰 새로운 페이지 구조를 설정했습니다.
-   **페이지**: `Introduction.vue`, `Main.vue`, `Search.vue`, `Analysis.vue`, `Login.vue`
-   루트 경로(`/`)는 메인 페이지(`Main.vue`)를 표시하도록 `pages/index.vue`를 설정했습니다.

### **2. 공통 레이아웃 (Header/Footer) 구현 (2024-05-23)**

-   모든 페이지에서 일관된 경험을 제공하기 위해 공통 `Header.vue`와 `Footer.vue` 컴포넌트를 제작했습니다.
-   `layouts/default.vue` 파일을 수정하여 모든 페이지에 헤더와 푸터가 자동으로 적용되도록 설정했습니다.

### **3. 소개 페이지 상세 구현 (2024-05-23)**

-   사용자가 제공한 HTML 프로토타입을 기반으로 `Introduction.vue` 페이지를 구현했습니다.
-   `chart.js`와 `vue-chartjs` 라이브러리를 도입하여 데이터 시각화 차트를 추가했습니다.
-   Vuetify의 `v-tabs`, `v-card` 컴포넌트를 활용하여 복잡한 레이아웃을 구성하고, 스크롤과 연동되는 내비게이션 기능을 구현했습니다.

### **4. 디자인 및 레이아웃 개선 (2024-05-23)**

-   **헤더**: 소개 페이지 내 중복 헤더를 제거하고, 초기에는 `v-menu`를 사용한 드롭다운 메뉴를 구현했으나, 최종적으로는 단순한 버튼 형태로 변경하여 사용자 경험을 개선했습니다.
-   **전체 테마**: 기존의 다크 모드에서 `light` 테마로 변경하고, 일관성 있는 색상 팔레트를 `vuetify.js`에 정의했습니다.
-   **페이지별 구현**:
    -   `Main.vue`: 뉴스 목록과 '추천순/최신순' 정렬 기능을 구현했습니다. 이후 카테고리 필터링 기능이 추가되었습니다.
    -   `Search.vue`: 검색창과 결과 목록 UI를 구현했습니다.
    -   `Login.vue`: `v-tabs`를 사용하여 로그인과 회원가입 폼을 전환할 수 있도록 구현했습니다.
-   **푸터 위치**: 콘텐츠가 적은 페이지에서 푸터가 화면 하단에 고정되도록 `default.vue` 레이아웃을 수정했습니다.
-   **분석 페이지**: 자유로운 디자인 요청에 따라 데이터 시각화 대시보드 형태로 새롭게 디자인했습니다.

### **5. "스케치" 스타일 전면 개편 (2024-05-23)**

-   사용자의 피드백을 반영하여, 딱딱한 디자인에서 벗어나 손그림 느낌의 "스케치" 스타일로 전체 디자인을 개편했습니다.
-   'Gaegu' 웹 폰트를 프로젝트에 적용했습니다.
-   손글씨 느낌의 테두리와 그림자 효과를 가진 `.sketch-card`, `.sketch-btn` 등의 글로벌 CSS 클래스를 `styles/settings.scss`에 정의했습니다.
-   모든 페이지(메인, 검색, 로그인, 분석, 소개)와 공용 컴포넌트(Header, Footer)에 새로운 스케치 스타일을 적용하여 디자인 통일성을 확보했습니다.
-   사용자 피드백에 따라 그림자 효과를 더 자연스럽게 조정하고, 분석 페이지 차트의 높이가 비정상적으로 늘어나는 버그를 수정했습니다.

### **6. 기능 추가 및 고도화 (2024-05-23)**

-   **카드 구조 변경**: 모든 뉴스 카드에서 이미지를 제거하고, "제목, 발행일, 작성자, 요약, 스크랩" 요소로 구성된 새로운 카드 레이아웃을 적용했습니다.
-   **반응형 그리드**: 화면 너비에 따라 뉴스 카드가 4, 3, 2, 1개로 동적으로 표시되도록 `v-col`의 그리드 설정을 수정했습니다.
-   **페이지네이션**: 메인 페이지에 한 페이지당 24개의 뉴스를 보여주고, 페이지 이동을 위한 `v-pagination` 컴포넌트를 추가했습니다.
-   **로고 링크**: 헤더의 로고 클릭 시 소개 페이지로 이동하도록 링크를 설정했습니다.
-   **스크랩 기능**: 스크랩 버튼 클릭 시 별도의 알림 없이 아이콘 모양만 토글되도록 구현했습니다. 각 기사 데이터에 `isScrapped` 상태를 추가하여 관리합니다.
-   **로그인 상태 관리**: Pinia를 사용하여 `auth` 스토어를 생성하고, 로그인 상태를 전역으로 관리하도록 설정했습니다. 로그인 성공 시 헤더의 '로그인' 버튼이 '로그아웃'으로 변경됩니다.

## ❗️ Important Links

- 📄 [Docs](https://vuetifyjs.com/)
- 🚨 [Issues](https://issues.vuetifyjs.com/)
- 🏬 [Store](https://store.vuetifyjs.com/)
- 🎮 [Playground](https://play.vuetifyjs.com/)
- 💬 [Discord](https://community.vuetifyjs.com)

## 💿 Install

Set up your project using your preferred package manager. Use the corresponding command to install the dependencies:

| Package Manager                                                | Command        |
|---------------------------------------------------------------|----------------|
| [yarn](https://yarnpkg.com/getting-started)                   | `yarn install` |
| [npm](https://docs.npmjs.com/cli/v7/commands/npm-install)     | `npm install`  |
| [pnpm](https://pnpm.io/installation)                          | `pnpm install` |
| [bun](https://bun.sh/#getting-started)                        | `bun install`  |

After completing the installation, your environment is ready for Vuetify development.

## ✨ Features

- 🖼️ **Optimized Front-End Stack**: Leverage the latest Vue 3 and Vuetify 3 for a modern, reactive UI development experience. [Vue 3](https://v3.vuejs.org/) | [Vuetify 3](https://vuetifyjs.com/en/)
- 🗃️ **State Management**: Integrated with [Pinia](https://pinia.vuejs.org/), the intuitive, modular state management solution for Vue.
- 🚦 **Routing and Layouts**: Utilizes Vue Router for SPA navigation and vite-plugin-vue-layouts for organizing Vue file layouts. [Vue Router](https://router.vuejs.org/) | [vite-plugin-vue-layouts](https://github.com/JohnCampionJr/vite-plugin-vue-layouts)
- ⚡ **Next-Gen Tooling**: Powered by Vite, experience fast cold starts and instant HMR (Hot Module Replacement). [Vite](https://vitejs.dev/)
- 🧩 **Automated Component Importing**: Streamline your workflow with unplugin-vue-components, automatically importing components as you use them. [unplugin-vue-components](https://github.com/antfu/unplugin-vue-components)

These features are curated to provide a seamless development experience from setup to deployment, ensuring that your Vuetify application is both powerful and maintainable.

## 💡 Usage

This section covers how to start the development server and build your project for production.

### Starting the Development Server

To start the development server with hot-reload, run the following command. The server will be accessible at [http://localhost:3000](http://localhost:3000):

```bash
yarn dev
```

(Repeat for npm, pnpm, and bun with respective commands.)

> Add NODE_OPTIONS='--no-warnings' to suppress the JSON import warnings that happen as part of the Vuetify import mapping. If you are on Node [v21.3.0](https://nodejs.org/en/blog/release/v21.3.0) or higher, you can change this to NODE_OPTIONS='--disable-warning=5401'. If you don't mind the warning, you can remove this from your package.json dev script.

### Building for Production

To build your project for production, use:

```bash
yarn build
```

(Repeat for npm, pnpm, and bun with respective commands.)

Once the build process is completed, your application will be ready for deployment in a production environment.

## 💪 Support Vuetify Development

This project is built with [Vuetify](https://vuetifyjs.com/en/), a UI Library with a comprehensive collection of Vue components. Vuetify is an MIT licensed Open Source project that has been made possible due to the generous contributions by our [sponsors and backers](https://vuetifyjs.com/introduction/sponsors-and-backers/). If you are interested in supporting this project, please consider:

- [Requesting Enterprise Support](https://support.vuetifyjs.com/)
- [Sponsoring John on Github](https://github.com/users/johnleider/sponsorship)
- [Sponsoring Kael on Github](https://github.com/users/kaelwd/sponsorship)
- [Supporting the team on Open Collective](https://opencollective.com/vuetify)
- [Becoming a sponsor on Patreon](https://www.patreon.com/vuetify)
- [Becoming a subscriber on Tidelift](https://tidelift.com/subscription/npm/vuetify)
- [Making a one-time donation with Paypal](https://paypal.me/vuetify)

## 📑 License
[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2016-present Vuetify, LLC

