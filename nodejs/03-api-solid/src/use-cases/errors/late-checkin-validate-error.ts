export class LateCheckInValidateError extends Error {
  constructor() {
    super("You can only check in at the gym within 20 minutes of the class start time");
    this.name = "LateCheckInValidateError";
  }
}
