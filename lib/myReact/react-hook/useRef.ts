const refs: { current: any }[] = [];
let refIdx = 0;

export default function useRef(): { current: any } {
  if (refs.length === refIdx) {
    refs.push({ current: null });
  }
  return refs[refIdx++];
}

export function resetRefIdx(): void {
  refIdx = 0;
}
