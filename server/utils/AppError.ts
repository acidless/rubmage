export default class AppError {
  status = 500;
  message = 'Server Error';

  constructor(status: number, message: string) {
    this.status = status;
    this.message = message;
  }
}
