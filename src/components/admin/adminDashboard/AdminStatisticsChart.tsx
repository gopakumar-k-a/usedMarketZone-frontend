import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';
import { AdminStatistics } from '@/types/admin/dashboard';

// Register required Chart.js components
ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const AdminStatisticsChart = ({ stats }: { stats: AdminStatistics }) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const setData = async () => {
      try {
        setChartData({
          labels: ['Reports', 'Products', 'Bid Products', 'Non-Bid Products', 'Users'],
          datasets: [
            {
              label: 'Admin Statistics',
              data: [
                stats.numberOfReports,
                stats.numberOfProducts,
                stats.numberOfBidProducts,
                stats.numberOfNonBidProducts,
                stats.numberOfUsers,
              ],
              backgroundColor: [
                'rgba(255, 99, 132, 0.6)',
                'rgba(54, 162, 235, 0.6)',
                'rgba(255, 206, 86, 0.6)',
                'rgba(75, 192, 192, 0.6)',
                'rgba(153, 102, 255, 0.6)',
              ],
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching admin statistics:', error);
      }
    };

    setData();
  }, [stats]);

  if (!chartData) return <div>Loading...</div>;

  return (
    <div>
      <Bar data={chartData} />
    </div>
  );
};

export default AdminStatisticsChart;
