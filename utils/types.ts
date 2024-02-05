export enum CompanyStatus {
  customer = "Customer",
  churned = "Churned",
}

export type CompanyUser = {
  id: number;
  avatar: string;
};

export type Company = {
  id: number;
  name: string;
  website: string;
  logo: string;
  license: number;
  status: CompanyStatus;
  users: CompanyUser[];
  subtitle: string;
  description: string;
};

export type Metadata = {
  totalItems: number;
};
