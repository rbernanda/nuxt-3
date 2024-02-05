<template>
  <div class="p-4 pb-0">
    <!-- MARK: Header -->
    <h1 class="text-primary-950 font-bold text-3xl">
      Welcome back, Administrator
    </h1>
    <p class="mt-2 text-gray-500">
      Track, manage and forecast your platform information here.
    </p>

    <!-- MARK: Card List -->
    <div class="grid grid-cols-1 mt-8 gap-2 lg:grid-cols-3">
      <Card class="border border-gray-200">
        <template #title>
          <div class="flex justify-between">
            <span class="text-base font-medium text-primary-950"
              >Revenue in Percentage</span
            >
            <i class="pi pi-ellipsis-v text-gray-500"></i>
          </div>
        </template>
        <template #content>
          <div class="flex justify-between space-x-2 items-end">
            <div class="inline-flex space-x-2 items-center">
              <i class="pi pi-arrow-up text-green-500"></i>
              <span class="text-green-700">20%</span>
              <span class="text-gray-500">vs last month</span>
            </div>
            <img src="/icons/chart.svg" alt="Chart" />
          </div>
        </template>
      </Card>
      <Card class="border border-gray-200">
        <template #title>
          <div class="flex justify-between">
            <span class="text-base font-medium text-primary-950"
              >Total Order</span
            >
            <img alt="total order" src="/icons/total-orders.svg" />
          </div>
        </template>
        <template #content>
          <p class="text-4xl font-semibold">400 Orders</p>
        </template>
      </Card>
      <Card class="border border-gray-200">
        <template #title>
          <div class="flex justify-between">
            <span class="text-base font-medium text-primary-950"
              >Pending Customer</span
            >
            <img alt="total order" src="/icons/total-customers.svg" />
          </div>
        </template>
        <template #content>
          <p class="text-4xl font-semibold">20 Customers</p>
        </template>
      </Card>
    </div>

    <!-- MARK: Data Table -->
    <div class="card mt-4">
      <DataTable
        scrollable
        scrollHeight="650px"
        paginator
        lazy
        :rows="pagination.limit"
        v-model:selection="selectedCompany"
        :value="companies"
        dataKey="id"
        stripedRows
        tableStyle="min-width: 50rem"
        :totalRecords="totalCompanies"
        @row-edit-save="onRowEditSave"
        editMode="row"
        v-model:editingRows="editingRows"
        paginatorTemplate="PrevPageLink PageLinks NextPageLink"
        v-on:page="onChangePage"
      >
        <template #header>
          <div class="flex justify-end">
            <span class="relative">
              <i
                class="pi pi-search absolute top-2/4 -mt-2 left-3 text-surface-400 dark:text-surface-600"
              />
              <InputText
                v-model="searchValue"
                placeholder="Search"
                class="pl-10 w-full font-normal pr-8"
                @keydown.enter="onSearch"
              />
              <i
                v-if="searchValue"
                @click="onSearchReset"
                class="pi pi-times-circle cursor-pointer hover:text-surface-600 transition-colors duration-200 absolute top-2/4 -mt-2 right-3 text-surface-400 dark:text-surface-600"
              />
            </span>
          </div>
        </template>

        <template #paginatorstart>
          {{ `Page ${currentPage} of ${totalPages}` }}
        </template>

        <template #empty>
          <div class="flex justify-center items-center p-4">
            <i class="pi pi-inbox text-surface-500" style="font-size: 1.5rem" />
            <span class="ml-2 text-surface-500">No Data</span>
          </div>
        </template>

        <Column selectionMode="multiple" headerStyle="width: 3rem"> </Column>

        <Column header="Company">
          <template #editor="{ data }">
            <div class="flex items-center">
              <div class="ml-2 flex space-y-2 flex-col">
                <InputText v-model="data.name" />
                <InputText v-model="data.website" />
              </div>
            </div>
          </template>
          <template #body="{ data }">
            <div
              class="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0"
            >
              <img class="w-10 h-10 rounded-full" :src="data.logo" />
              <div class="ml-2 flex flex-col">
                <span class="text-primary-900">{{ data.name }}</span>
                <span class="text-gray-500">{{ data.website }}</span>
              </div>
            </div>
          </template>
        </Column>

        <Column field="license" header="License Use">
          <template #body="{ data }">
            <ProgressBar
              :value="data.license"
              :showValue="false"
              style="height: 6px"
            ></ProgressBar>
          </template>
          <template #editor="{ data, field }">
            <InputNumber
              v-model="data[field]"
              inputId="minmax-buttons"
              mode="decimal"
              showButtons
              :min="0"
              :max="100"
            />
          </template>
        </Column>

        <Column field="status" header="Status">
          <template #editor="{ data }">
            <Dropdown
              v-model="data.status"
              :options="statuses"
              placeholder="Select One"
              class="p-column-filter"
            >
            </Dropdown>
          </template>
          <template #body="{ data }">
            <Tag :value="data.status" :class="getSeverity(data.status)" />
          </template>
        </Column>

        <Column field="users" header="Users">
          <template #body="{ data }">
            <AvatarGroup>
              <Avatar
                v-for="user in data.users.slice(0, 5)"
                :key="user.id"
                :image="user.avatar"
                size="normal"
                shape="circle"
              />
              <Avatar
                v-if="data.users.length > 5"
                :label="`+${data.users.length - 5}`"
                size="normal"
                shape="circle"
                class="text-xs border border-white"
              />
            </AvatarGroup>
          </template>
        </Column>

        <Column header="About">
          <template #editor="{ data }">
            <div class="flex flex-col space-y-1">
              <InputText v-model="data.subtitle" />
              <InputText v-model="data.description" />
            </div>
          </template>
          <template #body="{ data }">
            <div class="flex flex-col">
              <span class="text-primary-900">{{ data.subtitle }}</span>
              <span class="text-gray-500">{{ data.description }}</span>
            </div>
          </template>
        </Column>

        <Column :rowEditor="true" style="width: 3rem"></Column>

        <Column field="id" style="width: 3rem">
          <template #body="{ data }">
            <div
              @click="onDelete($event, data as Company)"
              class="flex justify-center items-center cursor-pointer p-1.5 hover:bg-red-500 rounded-full hover:text-gray-100 text-current transition-colors duration-400"
            >
              <i class="pi pi-trash" />
            </div>
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CompanyStatus } from "~/utils/types";

const statuses: CompanyStatus[] = [
  CompanyStatus.churned,
  CompanyStatus.customer,
];

const store = useCompanyStore();
const confirm = useConfirm();
const toast = useToast();
const { companies, totalCompanies } = storeToRefs(store);
const pagination = usePaginationStore();

const searchValue = ref(null);
const selectedCompany = ref<Company[]>();
const editingRows = ref([]);

const currentPage = ref(1);
const totalPages = computed(
  () => Math.ceil(totalCompanies.value / pagination.limit) || 0
);

const onChangePage = (event: any) => {
  currentPage.value = event.page + 1;

  const offset = event.page * pagination.limit;
  const limit = pagination.limit;

  pagination.setPagination({ offset, limit });
  store.fetchCompanies({ offset, limit });
};

const onRowEditSave = (event: any) => {
  const { newData } = event;
  store.editCompany(newData);
  selectedCompany.value = selectedCompany.value?.filter(
    (p) => p.id !== newData.id
  );
  store.fetchCompanies({ offset: pagination.offset, limit: pagination.limit });
  toast.add({
    severity: "success",
    summary: "Edited",
    detail: "Company successfully edited",
    life: 3000,
  });
};

const onDelete = (event: MouseEvent, company: Company) => {
  const companiesIds = selectedCompany.value?.map((p) => p.id) || [];
  const countCompanies = companiesIds.length;
  confirm.require({
    target: event.currentTarget as HTMLElement,
    message: `Are you sure you want to delete ${
      countCompanies > 1 ? `${countCompanies} companies` : "this company"
    }?`,
    acceptLabel: "Delete",
    rejectLabel: "Cancel",
    acceptClass: "!bg-red-500",
    accept: () => {
      if (countCompanies > 0) {
        store.deleteManyCompanies(companiesIds);
      } else {
        store.deleteCompany(company.id);
      }
      selectedCompany.value = [];
      store.fetchCompanies({
        offset: pagination.offset,
        limit: pagination.limit,
      });
      toast.add({
        severity: "success",
        summary: "Deleted",
        detail: "Company has been deleted",
        life: 3000,
      });
    },
  });
};

const onSearch = (event: any) => {
  store.fetchCompanies({
    offset: 0,
    limit: pagination.limit,
    q: event.target.value,
  });
};

const onSearchReset = () => {
  searchValue.value = null;
  store.fetchCompanies({
    offset: 0,
    limit: pagination.limit,
  });
};

const getSeverity = (status: CompanyStatus) => {
  let commonClass = "p-2 !rounded-full ";

  switch (status) {
    case CompanyStatus.churned:
      commonClass += "!bg-gray-200 !text-gray-700";
      break;
    case CompanyStatus.customer:
      commonClass += "!bg-green-100 !text-green-700";
      break;
  }

  return commonClass;
};
</script>
