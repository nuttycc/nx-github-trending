<template>
  <article
    class="flex h-fit w-full cursor-default flex-col gap-3 rounded-sm border bg-white py-4 pr-1 pl-3 transition-shadow duration-300 ease-out hover:inset-ring-1 hover:inset-ring-violet-600 dark:border-gray-600 dark:bg-gray-800"
  >
    <header class="flex flex-row items-center justify-between gap-1">
      <div class="truncate font-medium text-violet-500">
        <slot name="repo-name" />
      </div>
      <div class="flex items-center gap-2 text-xs">
        <div class="flex items-center">
          <span>
            <slot name="repo-star" />
          </span>
          <span> ⭐ </span>
        </div>
        <div class="rounded bg-gray-100 px-1.5 py-0.5 text-xs dark:bg-gray-700">
          <slot name="repo-lang" />
        </div>
        <div>
          <slot name="owner-avatar" />
        </div>
      </div>
    </header>

    <div class="flex items-center gap-2 text-sm text-gray-500">
      <span>
        <slot name="repo-url" />
      </span>
    </div>

    <div class="flex-grow text-sm leading-relaxed text-pretty text-gray-400">
      <slot name="repo-desc" />
    </div>
  </article>
</template>

<style scoped>
.article {
  transition: transform 0.2s ease;
}
.article:hover {
  transform: translateY(-2px);
}
</style>
