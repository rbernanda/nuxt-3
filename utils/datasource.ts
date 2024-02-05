import { type Company, CompanyStatus, type CompanyUser } from "./types";

export class DataSource {
  private static instance: DataSource;

  private companies: Company[] = [];
  private users: CompanyUser[] = [];

  private constructor() {
    this.users = this.createUsers();
    this.companies = this.createCompanies();
  }

  public static getInstance() {
    if (!DataSource.instance) {
      DataSource.instance = new DataSource();
    }
    return DataSource.instance;
  }

  private createCompanies(): Company[] {
    return [
      {
        id: 1,
        name: "Catalog",
        website: "catalogapp.io",
        logo: "/icons/companies/catalog.svg",
        license: 10,
        status: CompanyStatus.customer,
        users: this.getRandomUsers(2),
        subtitle: "Content curating app",
        description: "Brings all your news into one place",
      },
      {
        id: 2,
        name: "Company 2",
        website: "www.company2.com",
        logo: "/icons/companies/circooles.svg",
        license: 99,
        status: CompanyStatus.churned,
        users: this.getRandomUsers(6),
        subtitle: "Company 2 subtitle",
        description: "Company 2 description",
      },
      {
        id: 3,
        name: "Company 3",
        website: "www.company3.com",
        logo: "/icons/companies/command-r.svg",
        license: 50,
        status: CompanyStatus.customer,
        users: this.getRandomUsers(8),
        subtitle: "Company 3 subtitle",
        description: "Company 3 description",
      },
      {
        id: 4,
        name: "Company 4",
        website: "www.company4.com",
        logo: "/icons/companies/hourglass.svg",
        license: 25,
        status: CompanyStatus.customer,
        users: this.getRandomUsers(3),
        subtitle: "Company 4 subtitle",
        description: "Company 4 description",
      },
      {
        id: 5,
        name: "Company 5",
        website: "www.company5.com",
        logo: "/icons/companies/layers.svg",
        license: 15,
        status: CompanyStatus.churned,
        users: this.getRandomUsers(4),
        subtitle: "Company 5 subtitle",
        description: "Company 5 description",
      },
      {
        id: 6,
        name: "Company 6",
        website: "www.company6.com",
        logo: "/icons/companies/quotient.svg",
        license: 30,
        status: CompanyStatus.churned,
        users: this.getRandomUsers(5),
        subtitle: "Company 6 subtitle",
        description: "Company 6 description",
      },
      {
        id: 7,
        name: "Company 7",
        website: "www.company7.com",
        logo: "/icons/companies/sisyphus.svg",
        license: 20,
        status: CompanyStatus.churned,
        users: this.getRandomUsers(7),
        subtitle: "Company 7 subtitle",
        description: "Company 7 description",
      },
      {
        id: 8,
        name: "Company 8",
        website: "www.company8.com",
        logo: "/icons/companies/command-r.svg",
        license: 40,
        status: CompanyStatus.customer,
        users: this.getRandomUsers(9),
        subtitle: "Company 8 subtitle",
        description: "Company 8 description",
      },
      {
        id: 9,
        name: "Company 9",
        website: "www.company9.com",
        logo: "/icons/companies/layers.svg",
        license: 5,
        status: CompanyStatus.churned,
        users: this.getRandomUsers(2),
        subtitle: "Company 9 subtitle",
        description: "Company 9 description",
      },
      {
        id: 10,
        name: "Company 10",
        website: "www.company10.com",
        logo: "/icons/companies/catalog.svg",
        license: 75,
        status: CompanyStatus.customer,
        users: this.getRandomUsers(10),
        subtitle: "Company 10 subtitle",
        description: "Company 10 description",
      },
    ];
  }

  private createUsers(): CompanyUser[] {
    return [
      { id: 1, avatar: "/icons/avatars/ava-1.svg" },
      { id: 2, avatar: "/icons/avatars/ava-2.svg" },
      { id: 3, avatar: "/icons/avatars/ava-3.svg" },
      { id: 4, avatar: "/icons/avatars/ava-4.svg" },
      { id: 5, avatar: "/icons/avatars/ava-5.svg" },
      { id: 6, avatar: "/icons/avatars/ava-6.svg" },
      { id: 7, avatar: "/icons/avatars/ava-4.svg" },
      { id: 8, avatar: "/icons/avatars/ava-3.svg" },
      { id: 9, avatar: "/icons/avatars/ava-2.svg" },
      { id: 10, avatar: "/icons/avatars/ava-1.svg" },
    ];
  }

  public getCompanies(
    offset: number = 0,
    limit: number = 7,
    q: string = ""
  ): { data: Company[]; metadata: Metadata } {
    if (!q) {
      return {
        data: this.companies.slice(offset, offset + limit),
        metadata: {
          totalItems: this.companies.length,
        },
      };
    }

    const lowerCaseFilter = q.toLowerCase();
    const filteredCompanies = this.companies.filter((company) => {
      return (
        company.name.toLowerCase().includes(lowerCaseFilter) ||
        company.website.toLowerCase().includes(lowerCaseFilter) ||
        company.subtitle.toLowerCase().includes(lowerCaseFilter) ||
        company.description.toLowerCase().includes(lowerCaseFilter) ||
        company.status.toLowerCase().includes(lowerCaseFilter)
      );
    });

    return {
      data: filteredCompanies.slice(offset, offset + limit),
      metadata: {
        totalItems: filteredCompanies.length,
      },
    };
  }

  private getRandomUsers(count: number): CompanyUser[] {
    const shuffled = this.users.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.min(count, this.users.length));
  }

  public deleteCompany(id: number) {
    this.companies = this.companies.filter((company) => company.id !== id);
  }

  public deleteManyCompanies(ids: number[]) {
    this.companies = this.companies.filter(
      (company) => !ids.includes(company.id)
    );
  }

  public editCompany(company: Company) {
    this.companies = this.companies.map((c) =>
      c.id === company.id ? company : c
    );
  }
}
