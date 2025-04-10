export class AppError extends Error {
  #msg;
  #statusCode;
  #details;

  constructor({ msg, statusCode = 500, details }) {
    super(msg);

    this.#statusCode = statusCode;
    this.#msg = msg;
    this.#details = details;
  }

  getMessage() {
    return this.#msg;
  }

  getStatusCode() {
    return this.#statusCode;
  }

  getDetails() {
    return { ...this.#details };
  }

  toJSON() {
    return {
      statusCode: this.getStatusCode(),
      message: this.getMessage(),
      details: this.getDetails(),
    };
  }
}
