export class ConfigService {
  private get(key: string): string {
    return process.env[key];
  }

  public get dataBaseConnectionString() {
    return this.get('DB_CONNECTION_STRING');
  }
}
