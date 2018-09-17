import { observable, computed, action } from 'mobx';

export class AppStore {
  constructor() {}

  @observable public docEntry: any;
  @observable public drawerOpen: boolean = true;

  @computed
  get isDrawerOpen() {
    return this.drawerOpen;
  }

  @action
  openDrawer = (): void => {
    this.drawerOpen = true;
  };

  @action
  closeDrawer = (): void => {
    console.log('---------- Closing Drawer------------');
    this.drawerOpen = false;
  };

  @action
  setDocEntry = (docEntry: any): void => {
    this.drawerOpen = true;
    this.docEntry = docEntry;
  };

  @action
  clear = (): void => {
    this.docEntry = false;
    this.drawerOpen = false;
  };
}

export default AppStore;
