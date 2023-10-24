import type { Dispatcher } from '@lib/react-reconciler';

type CurrentDispatcher = {
  root: null | Dispatcher;
  current: null | Dispatcher;
};

const ReactCurrentDispatcher: CurrentDispatcher = {
  root: null,
  current: null
};

export default ReactCurrentDispatcher;
