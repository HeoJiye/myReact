# myReact

myReact는 TypeScript로 작성된 간단한 React 라이브러리입니다.  
myReact는 React의 기본적인 기능을 구현하고 있으며, Virtual DOM을 사용하여 성능을 최적화하고 있습니다.

## 1. @babel/plugin-transform-react-jsx 플러그인 사용

@babel/plugin-transform-react-jsx 플러그인을 사용하여, jsx 코드를 가상 돔 (ReactDOM) 생성하는 코드로 변환합니다.

```javascript
import React from '@myReact';

function App() {
  return <div className="greetMessage">hello world</div>;
}
```

```javascript
// 실제 리액트 라이브러리가 아닌, 프로젝트 내에 직접 구현한 myReact입니다.
import React from '@myReact';

function App() {
  return React.createElement('div', { className: 'greetMessage' }, ['hello world']);
}
```

## 2. myReact 라이브러리 구현

### react-dom

#### function createElement(tag, props, children): ReactDOM.Element

JSX 문법이 `React.createElement()` 함수로 변환됩니다.  
JSX를 읽어낸 결과를 ReactDOM.Element `{tag, props, children}` 형태의 가상 돔으로 변환합니다.

#### function createRoot(container: HtmlElement): { render: () => ReactDOM.Element }

매개변수로 넘긴 container를 root로 선택하는 함수입니다.  
반환된 객체의 render 함수에 ReactDOM을 생성하는 함수를 넘기면, root 아래 렌더링됩니다.

렌더링되면, root와 현재 ReactDOM과 ReactDOM을 생성하는 함수를 저장해둡니다.

아래는 사용 예시입니다.

```javascript
function App() {
  return <div>hello world</div>;
}

const root = React.createRoot(document.getElementById('root'));
root.render(App);
```

#### function render(element: ReactDOM.Element): HtmlElement

가상 돔 ReactDOM.Element를 실제 돔 HtmlDOM으로 변환하는 함수입니다.

#### function reconcileDOM(prevReactDOM, nextReactDOM, htmlDOM)

이전 가상 돔(ReactDOM)과 다음 가상 돔(ReactDOM)을 비교해서 차이를 실제 돔에 적용하는 함수입니다.

- tag name이 바뀔 경우, 해당 태그를 새로 렌더링함.
- tag name이 같고, props 가 다를 경우, props만 수정함.
- 그 후 자식을 비교해서 자식이 더 이상 없을 때까지 반복함.

### react-hook

hook은 전역 배열과 인덱스를 활용해 구현되었습니다.  
이런 구현 방식은 한계점이 있어, 추후 개선될 수 있습니다.

#### useState

#### useEffect

#### useRef
