import React from 'react';
import PromptInput from './components/PromptInput';
import ResultsView from './components/ResultsView'; // This should work correctly now

function App() {
  return (
    <div className="App">
      <h1 className="title">Band Brand TTI</h1>
      <ResultsView />
      <PromptInput />
      
    </div>
  );
}

export default App;
