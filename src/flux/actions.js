import AppStore from './store'; // Make sure the path to `store.js` is correct

export function updatePrompt(prompt) {
  AppStore.dispatcher.dispatch({
    type: 'UPDATE_PROMPT',
    payload: prompt
  });
}

export function setResults(results) {
  AppStore.dispatcher.dispatch({
    type: 'SET_RESULTS',
    payload: results
  });
}
