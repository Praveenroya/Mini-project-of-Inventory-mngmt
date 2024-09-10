import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale);

const SupplierPerformanceReport = ({ timeFrame }) => {
  const [data, setData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    axios.get(`/api/supplier-performance?timeFrame=${timeFrame}`)
      .then(response => {
        const { labels, dataSets } = response.data;
        setData({
          labels,
          datasets: [
            {
              label: 'Supplier Performance',
              data: dataSets,
              backgroundColor: [
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 99, 132, 0.2)'
              ],
              borderColor: [
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(255, 99, 132, 1)'
              ],
              borderWidth: 1
            }
          ]
        });
      })
      .catch(error => console.error('Error fetching supplier performance data', error));
  }, [timeFrame]);

  return (
    <div>
      <h2>Supplier Performance</h2>
      <Pie data={data} />
    </div>
  );
};

export default SupplierPerformanceReport;