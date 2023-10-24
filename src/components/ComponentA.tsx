import React from '@myReact';

function ComponentA(): JSX.Element {
  const [count, setCount] = React.useState<number>(0);

  React.useEffect(() => {
    console.log('count가 바뀔 때 마다 실행: ' + count);
  }, [count]);

  return (
    <p>
      <p>{`countA: ${count}`}</p>
      <button onclick={() => setCount(count => count + 1)}>count up</button>
    </p>
  );
}

export default ComponentA;
