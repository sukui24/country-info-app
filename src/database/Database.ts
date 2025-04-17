import { DataSource, EntityTarget, ObjectLiteral, Repository } from "typeorm";

export class Database {
  private _connected: boolean = false;
  private _repositories = new Map();

  constructor(private readonly dataSource: DataSource) {
    //
  }

  public async init() {
    await this.dataSource.initialize();
    this._connect();
  }

  /**
   * Get TypeORM repository for the given entity.
   *
   * Caches repositories to avoid multiple creations.
   */
  public getRepository<T extends ObjectLiteral>(
    target: EntityTarget<T>
  ): Repository<T> {
    if (!this._connected) {
      throw new Error("Database is not connected");
    }

    let repository = this._repositories.get(target) as Repository<T>;

    if (!repository) {
      repository = this.dataSource.getRepository(target);
      this._repositories.set(target, repository);
    }

    return repository;
  }

  public get connected() {
    return this._connected;
  }

  private _connect() {
    this._connected = true;
    console.log("Database connection established");
  }
}
