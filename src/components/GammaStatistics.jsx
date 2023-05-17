function calculateGamma(data) {
  return data.map((d) => ({
    ...d,
    Gamma: (d.Ash * d.Hue) / d.Magnesium,
  }));
}

function calculateClassWiseGamma(data) {
  const classWiseGamma = {};
  data.forEach((d) => {
    const classValue = d.Alcohol;
    if (!classWiseGamma[classValue]) {
      classWiseGamma[classValue] = [];
    }
    classWiseGamma[classValue].push(d.Gamma);
  });
  return classWiseGamma;
}

function calculateClassWiseGammaMean(data) {
  const classWiseGamma = calculateClassWiseGamma(data);
  const classWiseGammaMean = {};
  Object.keys(classWiseGamma).forEach((classValue) => {
    const gammaValues = classWiseGamma[classValue];
    const sum = gammaValues.reduce((acc, val) => acc + val, 0);
    const mean = sum / gammaValues.length;
    classWiseGammaMean[classValue] = mean;
  });
  return classWiseGammaMean;
}

function calculateClassWiseGammaMedian(data) {
  const classWiseGamma = calculateClassWiseGamma(data);
  const classWiseGammaMedian = {};
  Object.keys(classWiseGamma).forEach((classValue) => {
    const gammaValues = classWiseGamma[classValue];
    gammaValues.sort((a, b) => a - b);
    const medianIndex = Math.floor(gammaValues.length / 2);
    const median =
      gammaValues.length % 2 === 0
        ? (gammaValues[medianIndex - 1] + gammaValues[medianIndex]) / 2
        : gammaValues[medianIndex];
    classWiseGammaMedian[classValue] = median;
  });
  return classWiseGammaMedian;
}

function calculateClassWiseGammaMode(data) {
  const classWiseGamma = calculateClassWiseGamma(data);
  const classWiseGammaMode = {};
  Object.keys(classWiseGamma).forEach((classValue) => {
    const gammaValues = classWiseGamma[classValue];
    const frequencyMap = {};
    gammaValues.forEach((gamma) => {
      if (!frequencyMap[gamma]) {
        frequencyMap[gamma] = 0;
      }
      frequencyMap[gamma]++;
    });
    let mode;
    let maxFrequency = 0;
    Object.keys(frequencyMap).forEach((gamma) => {
      if (frequencyMap[gamma] > maxFrequency) {
        mode = gamma;
        maxFrequency = frequencyMap[gamma];
      }
    });
    classWiseGammaMode[classValue] = mode;
  });
  return classWiseGammaMode;
}

function AlcoholTable(props) {
  const { data } = props;

  const gammaData = calculateGamma(data);
  const classWiseGammaMean = calculateClassWiseGammaMean(gammaData);
  const classWiseGammaMedian = calculateClassWiseGammaMedian(gammaData);
  const classWiseGammaMode = calculateClassWiseGammaMode(gammaData);

  const classes = Array.from(new Set(data.map((d) => d.Alcohol)));

  return (
    <table style={{width: "300px",}}>
      <thead>
        <tr><th>Measure</th>
      {classes.map((classValue) => (
        <th key={classValue}>Class {classValue}</th>
      ))}
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Gamma <br /> Mean</td>
      {classes.map((classValue) => (
        <td key={classValue}>{(classWiseGammaMean[classValue]).toFixed(3)}</td>
      ))}
    </tr>
    <tr>
      <td>Gamma <br /> Median</td>
      {classes.map((classValue) => (
        <td key={classValue}>{(classWiseGammaMedian[classValue]).toFixed(3)}</td>
      ))}
    </tr>
    <tr>
      <td>Gamma <br />Mode</td>
      {classes.map((classValue) => (
        <td key={classValue}>{parseFloat(classWiseGammaMode[classValue]).toFixed(3)}</td>
      ))}
    </tr>
  </tbody>
</table>
);
}

export default AlcoholTable;