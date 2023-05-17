import React from 'react';
import DatasetStats from './components/DatasetStats';
import GammaStatistics from './components/GammaStatistics';
import dataset from './dataset.json';

function App() {
  return (
    <div className="App">
      <h2 style={{justifyContent:'center', display:'flex',marginTop:'5%'}}>Class-wise Mean, Median, Mode of
“Flavanoids” for the entire dataset.</h2>
      <div style={{justifyContent:'center', display:'flex',marginTop:'2%'}}>
      <h4><DatasetStats  /></h4>
      </div>
      
        <h2 style={{justifyContent:'center', display:'flex', marginTop:'6%'}}>The Class-Wise Mean, Median, Mode of “Gamma” for the
entire dataset.</h2>
<div style={{justifyContent:'center', display:'flex',marginTop:'2%'}}>
      <h4><GammaStatistics data={dataset} /></h4>
      </div>
    </div>
  );
}

export default App;
