// eventをlistenするcallbackを登録し、発火することができるobj
export class EventEmitter {
  constructor() {
    this._listeners = new Map();
  }
  addEventListener(eventType, callback) {
    if (!this._listeners.has(eventType)) {
      this._listeners.set(eventType, new Set());
    }
    const listenerSet = this._listeners.get(eventType);
    listenerSet.add(callback);
  }
  emit(eventType) {
    const listenerSet = this._listeners.get(eventType);
    if (!listenerSet) {
      return;
    }
    // なぜthisを束縛したのだ？
    listenerSet.forEach(callback => callback.call(this));
  }
}
