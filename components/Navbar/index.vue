<template>
  <button
    ref="excludeComponent"
    @click="showSidebar"
    type="button"
    class="bg-primary-950 p-2 mt-2 ms-3 text-sm text-gray-500 sm:hidden"
  >
    <span class="sr-only">Open sidebar</span>
    <svg
      class="w-6 h-6"
      aria-hidden="true"
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        clip-rule="evenodd"
        fill-rule="evenodd"
        d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
      ></path>
    </svg>
  </button>

  <aside
    ref="sidebarRef"
    :class="{
      'fixed top-0 left-0 z-50 w-64 h-screen transition-transform sm:translate-x-0 bg-primary-950': true,
      'translate-x-0': isSidebarOpen,
      '-translate-x-full': !isSidebarOpen,
    }"
  >
    <div class="h-full px-3 py-4 overflow-y-auto flex flex-col">
      <NuxtLink to="/" class="flex items-center mb-4">
        <span
          class="self-center text-2xl font-bold whitespace-nowrap text-white"
          >Visa Indonesia</span
        >
      </NuxtLink>
      <ul class="space-y-2 font-medium">
        <NavbarItem
          v-for="item in navItems"
          :key="item.href"
          :href="item.href"
          :label="item.label"
          :icon="item.icon"
          :class="{ 'bg-gray-700 rounded-lg': route.path === item.href }"
        />
      </ul>
      <div class="mt-auto pt-4">
        <hr class="bg-gray-500" />
        <div class="flex justify-between items-center py-4">
          <Avatar
            image="/icons/avatars/ava-1.svg"
            size="normal"
            shape="circle"
          />
          <div class="flex flex-col">
            <span class="font-semibold text-sm text-white">Administrator</span>
            <span class="text-sm font-normal text-gray-400"
              >admin@spdigital.com</span
            >
          </div>
          <i
            class="pi pi-sign-out text-gray-400 cursor-pointer hover:text-gray-200 transition-colors duration-200"
            aria-hidden="true"
          ></i>
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
const navItems = [
  { href: "/", label: "Dashboard", icon: "/icons/dashboard.svg" },
  { href: "/services", label: "Service", icon: "/icons/service.svg" },
  { href: "/orders", label: "Order", icon: "/icons/order.svg" },
  { href: "/customers", label: "Customer", icon: "/icons/customer.svg" },
  {
    href: "/customers-identity",
    label: "Customer Identity",
    icon: "/icons/customer-identity.svg",
  },
  { href: "/promos-code", label: "Promo Code", icon: "/icons/promo-code.svg" },
  { href: "/admins", label: "Admin User", icon: "/icons/admin.svg" },
];

const route = useRoute();
const isSidebarOpen = ref(false);
const sidebarRef = ref();
const excludeComponent = ref();

const showSidebar = () => {
  isSidebarOpen.value = true;
};

const listener = (event: MouseEvent) => {
  if (
    event.target === sidebarRef.value ||
    event.composedPath().includes(sidebarRef.value) ||
    event.target === excludeComponent.value ||
    event.composedPath().includes(excludeComponent.value)
  ) {
    return;
  }
  isSidebarOpen.value = false;
};
onMounted(() => {
  window.addEventListener("click", listener);
});
onBeforeUnmount(() => {
  window.removeEventListener("click", listener);
});
</script>
