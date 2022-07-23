export default function runClientSide(fn: Function) {
  if (typeof window !== "undefined") {
    fn();
  }
}
