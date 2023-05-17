import React from 'react';

// Sample dataset
import data from '../dataset.json';

// Utility function to calculate class-wise mean of Flavanoids
const getClassMean = (alcoholClass) => {
  const classData = data.filter((d) => d.Alcohol === alcoholClass);
  const sum = classData.reduce((acc, d) => acc + d.Flavanoids, 0);
  return sum / classData.length;
};

// Utility function to calculate class-wise median of Flavanoids
const getClassMedian = (alcoholClass) => {
  const classData = data.filter((d) => d.Alcohol === alcoholClass);
  const sortedData = classData.sort((a, b) => a.Flavanoids - b.Flavanoids);
  const middle = Math.floor(sortedData.length / 2);
  if (sortedData.length % 2 === 0) {
    return (sortedData[middle - 1].Flavanoids + sortedData[middle].Flavanoids) / 2;
  }
  return sortedData[middle].Flavanoids;
};

// Utility function to calculate class-wise mode of Flavanoids
const getClassMode = (alcoholClass) => {
  const classData = data.filter((d) => d.Alcohol === alcoholClass);
  const counts = {};
  let mode = null;
  let maxCount = 0;
  for (const d of classData) {
    counts[d.Flavanoids] = (counts[d.Flavanoids] || 0) + 1;
    if (counts[d.Flavanoids] > maxCount) {
      mode = d.Flavanoids;
      maxCount = counts[d.Flavanoids];
    }
  }
  return mode;
};

// React component to display class-wise mean, median, and mode of Flavanoids
const FlavanoidsTable = () => {
  const classes = [...new Set(data.map((d) => d.Alcohol))];
  return (
    <table style={{width: "300px",}} >
      <thead>
        <tr>
          <th>Measure</th>
          {classes.map((c) => (
            <th key={c}>Class {c}</th>
          ))}
        </tr>
      </thead>
      <tbody >
        <tr>
          <td>Flavanoids <br/> Mean</td>
          {classes.map((c) => (
            <td key={c}>{getClassMean(c).toFixed(2)}</td>
          ))}
        </tr>
        <tr>
          <td>Flavanoids<br /> Median</td>
          {classes.map((c) => (
            <td key={c}>{getClassMedian(c).toFixed(2)}</td>
          ))}
        </tr>
        <tr>
          <td>Flavanoids <br /> Mode</td>
          {classes.map((c) => (
            <td key={c}>{getClassMode(c)}</td>
          ))}
        </tr>
      </tbody>
    </table>
  );
};

export default FlavanoidsTable;
