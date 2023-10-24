declare module ReactDOM {
  type Element = {
    tag: string;
    props?: any;
    children: Element[];
  };
  type Component = {
    tag: Function;
    props?: any;
  };

  type TextNode = string | number | boolean;
}
