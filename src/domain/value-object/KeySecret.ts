export class KeySecret {
  private key: string;

  constructor(key: string | undefined) {
    this.verifyKeySecret(key);
    this.key = key?.trim() as string;
  }

  public get value(): string {
    return this.key;
  }

  private verifyKeySecret(key: string | undefined): void {
    if (!key || key.trim().length === 0) throw new Error('chave secreta não foi informada.');
  }
}
