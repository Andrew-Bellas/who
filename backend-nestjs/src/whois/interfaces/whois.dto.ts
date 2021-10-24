export interface Owner {
  name: string;
  organization: string;
  region: string;
  country: string;
}

export interface WhoisDTO {
  latitude?: string;
  longitude?: string;
  ip: string;
  domain: string;
  owners: Owner[];
}

