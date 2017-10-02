export class Loader {
  public isLoading: boolean;

  show() {
    this.isLoading = true;
  }

  hide() {
    this.isLoading = false;
  }
}
