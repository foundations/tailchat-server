import ExtendableError from 'es6-error';

class PawError extends ExtendableError {
  public code: number;
  public type: string;
  public data: any;
  public retryable: boolean;
  public message: string = '服务器出错';

  constructor(message?: string, code?: number, type?: string, data?: unknown) {
    super(message);
    this.code = code ?? this.code ?? 500;
    this.type = type ?? this.type;
    this.data = data ?? this.data;
    this.retryable = this.retryable ?? false;
  }
}

export class DataNotFoundError extends PawError {
  constructor(message?: string, code?: number, type?: string, data?: unknown) {
    super(message ?? '找不到数据', code ?? 404, type, data);
  }
}

export class EntityError extends PawError {
  constructor(
    message?: string,
    code?: number,
    type?: string,
    data?: { field: string; message: string }[]
  ) {
    super(message ?? '表单不正确', code ?? 442, type, data);
  }
}