<template>
  <ConfirmPopup />
  <Toast />
  <NuxtLayout>
    <NuxtLoadingIndicator />
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
import "primeicons/primeicons.css";

useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - "Visa Indonesia` : "Visa Indonesia";
  },
  meta: [{ name: "Backoffice system built with Nuxt 3" }],
});
</script>
