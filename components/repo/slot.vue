<template>
  <article
    class="h-fit w-full p-4 flex flex-col gap-3 rounded-sm border cursor-default dark:border-gray-600 
    hover:inset-ring-1 hover:inset-ring-violet-600 transition-shadow duration-300 ease-out bg-white dark:bg-gray-800"
  >
    <header class="flex flex-row items-center justify-between">
      <div class="text-violet-500 font-medium truncate">
        <slot name="repo-name" />
      </div>
      <div class="flex gap-2 items-center text-xs">
        <div class="flex items-center">
          <span>
            <slot name="repo-star" />
          </span>
          <span> ⭐ </span>
        </div>
        <div class="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-700 rounded text-xs">
          <slot name="repo-lang" />
        </div>
        <div>
          <slot name="owner-avatar" />
        </div>
      </div>
    </header>

    <div class="text-gray-500 text-sm flex gap-2 items-center truncate">
      <span>
        <slot name="repo-url" />
      </span>
    </div>

    <div class="text-gray-400 text-sm text-pretty leading-relaxed flex-grow">
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
