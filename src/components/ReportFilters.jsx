import React, { useState } from 'react';

const ReportFilters = ({ onGenerateReport }) => {
  const [timeFrame, setTimeFrame] = useState('last30Days');

  const handleChange = (e) => {
    setTimeFrame(e.target.value);
  };

  const handleGenerate = () => {
    onGenerateReport(timeFrame);
  };

  return (
    <div>
      <h2>Generate Report</h2>
      <label>
        Time Frame:
        <select value={timeFrame} onChange={handleChange}>
          <option value="last30Days">Last 30 Days</option>
          <option value="lastQuarter">Last Quarter</option>
          <option value="lastYear">Last Year</option>
        </select>
      </label>
      <button onClick={handleGenerate}>Generate Report</button>
    </div>
  );
};

export default ReportFilters;