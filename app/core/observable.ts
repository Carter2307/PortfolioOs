const observers: any[] = [];

export interface ObservableData {
  data: any,
  event: string
}

export default Object.freeze({
  notify: (observableData: ObservableData) => observers.forEach((observer) => observer(observableData)),
  subscribe: (func: any) => observers.push(func),
  unsubscribe: (func: any) => {
    [...observers].forEach((observer, index) => {
      if (observer === func) {
        observers.splice(index, 1);
      }
    });
  },
});
