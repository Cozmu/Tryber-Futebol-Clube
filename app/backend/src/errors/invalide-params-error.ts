class InvalidParamError extends Error {
  public statusCode: number;
  constructor(message: string) {
    super(message);
    this.statusCode = 401;
  }
}

export default InvalidParamError;
