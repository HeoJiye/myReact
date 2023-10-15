declare module ReactHook {
  type Component = {
    useState: UseState;
    resetHookIdxs: () => void;
  };
  type SetStateParam<T> = T | ((prev: T) => T);
  type UseState = <T>(initState: T) => [T, (state: SetStateParam<T>) => void];
}
