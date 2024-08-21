import React, { useState, useEffect } from 'react';
import AppStore from '../flux/store';

const ResultsView = () => {
  const [state, setState] = useState(AppStore.state);

  useEffect(() => {
    const unsubscribe = AppStore.subscribe(setState);

    // Cleanup function to unsubscribe when component unmounts
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  return (
    <div id='mainText'>
      {state.results.length > 0 ? (
        state.results.map((result, index) => (
          <div key={index}>{result}</div>
        ))
      ) : (
        <div class="text"><p id="text">
          Waiting for your prompt<br />
          This will be exciting.<br />
          Please be patient while I build your prompt.
        </p></div>
      )}
    </div>
  );
};

export default ResultsView;
