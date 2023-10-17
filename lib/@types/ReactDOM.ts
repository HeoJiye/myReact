declare module ReactDOM {
  type Element = {
    tag: string;
    props?: any;
    children: Element[];
  };
  type TextNode = string | number | boolean;
  type Node = Element | TextNode;
}
