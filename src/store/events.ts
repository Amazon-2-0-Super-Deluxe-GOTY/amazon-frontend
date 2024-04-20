import { create } from "zustand";
import { type Emitter, createNanoEvents, type Unsubscribe } from "nanoevents";

type RouterEventsType = "change";

interface RouterEventsState {
  eventEmitter: Emitter<Record<RouterEventsType, (value: string) => void>>;
  addEventListener: (
    event: RouterEventsType,
    cb: (value: string) => void
  ) => Unsubscribe;
  emit: (event: RouterEventsType, value: string) => void;
}

export const useRouterEvents = create<RouterEventsState>()((set, get) => ({
  eventEmitter: createNanoEvents(),
  addEventListener(event, cb) {
    return get().eventEmitter.on(event, cb);
  },
  emit(event, value) {
    get().eventEmitter.emit(event, value);
  },
}));
