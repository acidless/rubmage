export default class JSendSerializer {
  static serialize(success: boolean, data?: object) {
    return { success, data };
  }
}
