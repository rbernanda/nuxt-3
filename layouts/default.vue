<template>
  <div class="flex flex-col sm:flex-row w-full overflow-x-hidden">
    <Navbar />
    <div
      class="mt-4 sm:mt-0 sm:p-4 pb-0 sm:ml-64 bg-gray-50 min-h-screen rounded-tl-3xl w-full overflow-y-scroll"
    >
      <slot />
    </div>
  </div>
</template>
