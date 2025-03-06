import  { Pool } from 'pg';
import { injectable } from 'tsyringe';

@injectable()
export class Database {
  private static pool: Pool | null = null;
  public static get connection(): Pool {
    if (!this.pool) {
      this.pool = new Pool({
        connectionString: process.env.DB_URL,
        ssl: { rejectUnauthorized: false },
      });
    }
    return this.pool;
  }
}


