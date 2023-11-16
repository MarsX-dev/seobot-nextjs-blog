export class Cache<T> {
  private cache: T | null = null;
  private expiresAt: number | null = null;

  constructor(private ttl: number = 60000) {}

  async get(fetchFunction: () => Promise<T>): Promise<T> {
    const now = Date.now();

    if (this.cache && this.expiresAt && now < this.expiresAt) {
      return this.cache;
    }

    this.cache = await fetchFunction();
    this.expiresAt = now + this.ttl;
    return this.cache;
  }
}
