declare module ReactDOM {
  type Element = {
    tag: string;
    props?: any;
    children: Element[];
  };
  type Component = {
    key: number;
    tag: string;
    props?: any;
    children: Element[];
  };
  type TextNode = string | number | boolean;
  type Node = Element | Component | TextNode;
}
