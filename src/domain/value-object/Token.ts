export class Token {
  private hash: string;

  constructor(hash: string) {
    this.verifyToken(hash);
    this.hash = hash.trim();
  }

  public get value(): string {
    return this.hash;
  }

  private verifyToken(hash: string): void {
    if (!hash || hash.trim().length === 0) throw new Error('token não foi informado.');
  }
}
