<template>
  <li>
    <NuxtLink
      :to="props.href"
      class="flex items-center p-2 rounded-lg text-white hover:bg-gray-700 group"
    >
      <img :src="props.icon" class="w-5 h-5" :alt="props.label" />
      <span class="ms-3">{{ props.label }}</span>
    </NuxtLink>
  </li>
</template>

<script setup lang="ts">
const props = defineProps<{
  href: string;
  icon: string;
  label: string;
}>();
</script>
