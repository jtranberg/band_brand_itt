import { Dispatcher } from 'flux';

class AppStore {
  constructor() {
    this.dispatcher = new Dispatcher();
    this.state = {
      prompt: '',
      results: []
    };

    this.dispatcher.register(this.handleAction.bind(this));
  }

  handleAction(action) {
    switch (action.type) {
      case 'UPDATE_PROMPT':
        this.state.prompt = action.payload;
        this.emitChange();
        break;
      case 'SET_RESULTS':
        this.state.results = action.payload;
        this.emitChange();
        break;
      default:
        break;
    }
  }

  emitChange() {
    if (this.onChangeCallback) {
      this.onChangeCallback(this.state);
    }
  }

  subscribe(callback) {
    this.onChangeCallback = callback;
  }
}

// Assign the instance to a variable before exporting
const storeInstance = new AppStore();
export default storeInstance;
