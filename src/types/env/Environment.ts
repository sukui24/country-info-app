export interface Environment {
  port: number;
  db: {
    host: string;
    port: number;
    user: string;
    pass: string;
    name: string;
  };
  nagerUrl: string;
  countriesUrl: string;
}
