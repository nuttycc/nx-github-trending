<script setup lang="ts">
import VueMasonryWall from '@yeger/vue-masonry-wall';
import { useIntersectionObserver } from '@vueuse/core';

// 分页状态
const page = ref(0);
const isLoadingMore = ref(false);
const hasMore = ref(true);
const isHydrated = ref(false);

onMounted(() => {
  isHydrated.value = true;
});

// 获取初始数据（SSR 兼容）
const { data, status, error } = await useFetch('/api/trending-repos', {
  query: {
    page: page.value,
  },
});

// 存储所有已加载的仓库
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const repositories = ref<any[]>([]);

// 初始化仓库数据
watchEffect(() => {
  if (data.value?.repositories) {
    repositories.value = data.value.repositories;

    // 检查是否还有更多数据加载
    if (data.value.repositories.length < 20) {
      hasMore.value = false;
    }
  }
});

const selectedLang = ref('All');

const filteredRepos = computed(() => {
  if (selectedLang.value === 'All') {
    return repositories.value;
  }
  return repositories.value.filter((repo) => repo.language === selectedLang.value);
});

// 加载更多数据
const loadMore = async () => {
  if (isLoadingMore.value || !hasMore.value) return;

  console.log('Load more...');

  isLoadingMore.value = true;
  page.value++;

  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result: any = await $fetch('/api/trending-repos', {
      query: {
        page: page.value,
      },
    });

    if (result.repositories.length > 0) {
      repositories.value = [...repositories.value, ...result.repositories];

      // 检查是否还有更多数据
      if (result.repositories.length < 20) {
        hasMore.value = false;
      }
    } else {
      hasMore.value = false;
    }
  } catch (err) {
    console.error('Failed to load more repos:', err);
  } finally {
    isLoadingMore.value = false;
  }
};

// 设置Intersection Observer观察加载更多元素
const loadMoreRef = ref(null);
useIntersectionObserver(
  loadMoreRef,
  ([{ isIntersecting }]) => {
    if (isIntersecting) {
      console.log('IsIntersecting');
      loadMore();
    }
  },
  { threshold: 0.1 }
);

const masonryOptions = {
  padding: 12,
  responsive: true,
  rtl: false,
  responsiveBreakpoints: {
    sm: 640,
    md: 768,
    lg: 1024,
  },
};

const columnCount = computed(() => {
  return { default: 1, sm: 2, md: 3, lg: 4 };
});

function handleFilter(lang: string) {
  selectedLang.value = lang;
}
</script>

<template>
  <div class="px-8 py-2">
    <RepoFilter @filter="handleFilter" />
    <div class="flex gap-2 px-4 py-2 text-sm text-gray-500 dark:text-gray-400">
      <span>{{ data?.date }}</span>
      <div>
        共 {{ filteredRepos.length }} 个仓库
        <span v-if="selectedLang !== 'All'">({{ selectedLang }})</span>
      </div>
    </div>
    <div v-if="status === 'pending' && page === 0" class="flex items-center justify-center p-8">
      <div class="flex flex-col items-center gap-2">
        <div
          class="h-8 w-8 animate-spin rounded-full border-4 border-violet-500 border-t-transparent"
        />
        <div class="text-lg text-gray-600 dark:text-gray-300">正在加载仓库数据...</div>
      </div>
    </div>
    <div v-else-if="error" class="p-4 text-red-500">
      {{ error.message }}
    </div>
    <template v-else>
      <!-- 骨架屏 - 在数据已经获取但客户端尚未水合完成时显示 -->
      <div
        v-if="repositories.length > 0 && !isHydrated"
        class="grid grid-cols-1 gap-4 px-2 py-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      >
        <div
          v-for="i in 8"
          :key="i"
          class="h-[250px] animate-pulse rounded-sm border dark:border-gray-600"
        >
          <!-- 仓库名骨架 -->
          <div class="m-3 h-6 w-3/4 rounded bg-gray-200 dark:bg-gray-700" />

          <!-- 统计信息骨架 -->
          <div class="flex justify-end gap-2 px-3">
            <div class="h-4 w-8 rounded bg-gray-200 dark:bg-gray-700" />
            <div class="h-4 w-12 rounded bg-gray-200 dark:bg-gray-700" />
          </div>

          <!-- URL骨架 -->
          <div class="mx-3 my-4 h-4 w-5/6 rounded bg-gray-200 dark:bg-gray-700" />

          <!-- 描述骨架 -->
          <div class="space-y-2 px-3">
            <div class="h-3 w-full rounded bg-gray-200 dark:bg-gray-700" />
            <div class="h-3 w-5/6 rounded bg-gray-200 dark:bg-gray-700" />
            <div class="h-3 w-4/6 rounded bg-gray-200 dark:bg-gray-700" />
          </div>
        </div>
      </div>

      <!-- 真实数据渲染 -->
      <VueMasonryWall
        v-if="isHydrated"
        :items="filteredRepos"
        :column-count="columnCount"
        :column-width="350"
        :padding="masonryOptions.padding"
        :rtl="masonryOptions.rtl"
        :responsive="masonryOptions.responsive"
        :responsive-breakpoints="masonryOptions.responsiveBreakpoints"
        class="masonry-container px-2 py-4"
      >
        <template #default="{ item: repo }">
          <RepoItem :repo="repo" />
        </template>
      </VueMasonryWall>

      <!-- 加载更多指示器 -->
      <div v-if="hasMore" ref="loadMoreRef" class="flex justify-center py-8">
        <div v-if="isLoadingMore" class="flex items-center gap-2">
          <div
            class="h-5 w-5 animate-spin rounded-full border-2 border-violet-500 border-t-transparent"
          />
          <span class="text-gray-600 dark:text-gray-300">加载更多...</span>
        </div>
        <div v-else class="h-8" />
        <!-- 占位元素，用于触发Intersection Observer -->
      </div>

      <!-- 无更多数据提示 -->
      <div
        v-else-if="repositories.length > 0"
        class="py-6 text-center text-gray-500 dark:text-gray-400"
      >
        没有更多仓库了
      </div>
    </template>
  </div>
</template>

<style scoped>
.masonry-container {
  width: 100%;
  margin: 0 auto;
}
</style>
