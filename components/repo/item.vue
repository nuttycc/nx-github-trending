<script setup lang="ts">
const props = defineProps<{
  repo: Repository;
}>();
</script>
<template>
  <RepoSlot>
    <template #repo-name>{{ props.repo.name }}</template>

    <template #owner-avatar>
      <NuxtImg
        :src="repo.owner.avatar_url"
        width="17"
        height="17"
        :placeholder="[17, 17]"
        loading="lazy"
        format="webp"
        class="rounded-full bg-gray-500"
      />
    </template>

    <template #repo-star>
      {{ repo.stargazers_count }}
    </template>

    <template #repo-lang>
      {{ repo.language ?? '-' }}
    </template>

    <template #repo-url>
      <NuxtLink
        :to="`https://github.com/${repo.full_name}`"
        target="_blank"
        class="underline hover:text-gray-400 truncate block"
        >https://github.com/{{ repo.full_name }}</NuxtLink
      >
    </template>

    <template #repo-desc>
      <div class="line-clamp-3">{{ repo.description }}</div>
    </template>
  </RepoSlot>
</template>
