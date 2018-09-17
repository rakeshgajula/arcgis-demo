import { History } from 'history';
import { AppStore } from './AppStore';
import { RouterStore } from './RouterStore';
import { STORE_APP, STORE_ROUTER } from 'app/constants';

export function createStores(history: History) {
  const appStore = new AppStore();
  const routerStore = new RouterStore(history);
  return {
    [STORE_APP]: appStore,
    [STORE_ROUTER]: routerStore
  };
}
