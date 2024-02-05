export const useCompanyStore = defineStore("company", () => {
  const ds = DataSource.getInstance();
  const pagination = usePaginationStore();

  const companies = ref<Company[]>([]);
  const totalCompanies = ref(0);

  onMounted(() => {
    fetchCompanies({
      offset: pagination.offset,
      limit: pagination.limit,
    });
  });

  const editCompany = (company: Company) => {
    ds.editCompany(company);
  };

  const deleteCompany = (id: number) => {
    ds.deleteCompany(id);
  };

  const deleteManyCompanies = (ids: number[]) => {
    ds.deleteManyCompanies(ids);
  };

  const fetchCompanies = ({
    offset,
    limit,
    q,
  }: {
    q?: string;
    limit: number;
    offset: number;
  }) => {
    const { data, metadata } = ds.getCompanies(offset, limit, q);
    companies.value = data;
    totalCompanies.value = metadata.totalItems;
  };

  return {
    companies,
    editCompany,
    deleteCompany,
    deleteManyCompanies,
    fetchCompanies,
    totalCompanies,
  };
});

export const usePaginationStore = defineStore("pagination", () => {
  const offset = ref(0);
  const limit = ref(7);

  const setPagination = (pagination: { limit: number; offset: number }) => {
    offset.value = pagination.offset;
    limit.value = pagination.limit;
  };

  onUnmounted(() => {
    setPagination({ limit: 7, offset: 0 });
  });

  return {
    offset,
    limit,
    setPagination,
  };
});
