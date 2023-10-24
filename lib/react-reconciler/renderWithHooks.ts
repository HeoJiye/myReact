import ReactCurrentDispatcher from '@lib/react/ReactCurrentDispatcher';
import createDispatcher, { Dispatcher } from './createDispatcher';

export default function renderWithHooks(component: ReactDOM.Component): ReactDOM.Element {
  const prevDispatcher = ReactCurrentDispatcher.current;
  const dispatcher = getNextDispatcher(component);

  ReactCurrentDispatcher.current = dispatcher;
  DispatcherResetBeforeRender(dispatcher);

  const element = render(component);

  if (prevDispatcher !== null) {
    ReactCurrentDispatcher.current = prevDispatcher;
  }
  return element;
}

function getNextDispatcher(component: ReactDOM.Component): Dispatcher {
  if (ReactCurrentDispatcher.current === null) {
    return getRootDispatcher();
  }
  return getChildrenDispatcher(ReactCurrentDispatcher.current, component);
}

function getRootDispatcher(): Dispatcher {
  if (ReactCurrentDispatcher.root === null) {
    ReactCurrentDispatcher.root = createDispatcher();
  }
  return ReactCurrentDispatcher.root;
}

function getChildrenDispatcher(dispatcher: Dispatcher, component: ReactDOM.Component): Dispatcher {
  if (dispatcher.children[component.tag.name] === undefined) {
    dispatcher.children[component.tag.name] = [];
    dispatcher.children[component.tag.name].push(createDispatcher());
  }

  if (dispatcher.childrenIdx[component.tag.name] === undefined) {
    dispatcher.childrenIdx[component.tag.name] = 0;
  }

  const childrenIdx = dispatcher.childrenIdx[component.tag.name]++;

  if (dispatcher.children[component.tag.name][childrenIdx] === undefined) {
    dispatcher.children[component.tag.name][childrenIdx] = createDispatcher();
  }
  return dispatcher.children[component.tag.name][childrenIdx];
}

function DispatcherResetBeforeRender(dispatcher: Dispatcher): void {
  dispatcher.childrenIdx = {};
  dispatcher.resetHookIdx();
}

function render(component: ReactDOM.Component): ReactDOM.Element {
  return component.tag(component.props);
}
