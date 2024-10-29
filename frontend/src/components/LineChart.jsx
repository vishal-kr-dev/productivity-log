import React, { useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Title,
} from 'chart.js';
import useSessionStore from '../Store/sessionStore';

// Register ChartJS components
ChartJS.register(
  LinearScale,
  CategoryScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Title
);

// Constants
const ACTIVITY_TYPES = {
  DSA: {
    label: "DSA",
    color: 'rgba(75, 192, 192, 1)',
  },
  'Web Dev': {
    label: "Web Dev",
    color: 'rgba(255, 99, 132, 1)',
  },
  Academics: {
    label: "Academics",
    color: 'rgba(0, 255, 0, 1)',
  },
  Others: {
    label: "Others",
    color: 'rgba(255, 206, 86, 1)',
  },
};

const LineChartComponent = () => {
  const { sessions } = useSessionStore();

  const chartData = useMemo(() => {
    if (!sessions?.length) {
      return {
        labels: [],
        datasets: []
      };
    }

    try {
      // Initialize date-duration maps for each activity type
      const dateDurationMaps = Object.keys(ACTIVITY_TYPES).reduce((acc, type) => {
        acc[type] = new Map();
        return acc;
      }, {});

      // Process sessions
      sessions.forEach(session => {
        try {
          const { type, createdAt, duration } = session;
          
          if (!ACTIVITY_TYPES[type]) return;
          
          const date = new Date(createdAt);
          if (isNaN(date.getTime())) return;
          
          const formattedDate = date.toISOString().split('T')[0];
          const hours = Number((duration / 3600).toFixed(2));
          
          const currentMap = dateDurationMaps[type];
          currentMap.set(
            formattedDate,
            (currentMap.get(formattedDate) || 0) + hours
          );
        } catch (err) {
          console.warn('Error processing session:', session, err);
        }
      });

      // Get unique dates and sort them
      const allDates = new Set();
      Object.values(dateDurationMaps).forEach(map => {
        map.forEach((_, date) => allDates.add(date));
      });
      const sortedDates = Array.from(allDates).sort();

      // Create datasets
      const datasets = Object.entries(ACTIVITY_TYPES).map(([type, config]) => {
        const durationMap = dateDurationMaps[type];
        return {
          label: config.label,
          data: sortedDates.map(date => 
            Number((durationMap.get(date) || 0).toFixed(2))
          ),
          fill: false,
          borderColor: config.color,
          tension: 0.1,
        };
      });

      return {
        labels: sortedDates,
        datasets
      };
    } catch (error) {
      console.error('Error generating chart data:', error);
      return {
        labels: [],
        datasets: []
      };
    }
  }, [sessions]);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          usePointStyle: true,
          padding: 20,
        },
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        callbacks: {
          label: (context) => {
            const label = context.dataset.label || '';
            const value = context.parsed.y || 0;
            return `${label}: ${value.toFixed(2)} hours`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Hours',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Date',
        },
      },
    },
  };

  if (!sessions?.length) {
    return (
      <div className="flex items-center justify-center h-48 bg-gray-50 rounded-lg">
        <p className="text-gray-500">No session data available</p>
      </div>
    );
  }

  return (
    <div className="w-[1000px] h-[280px] p-4 bg-white rounded-lg shadow">
      <Line 
        data={chartData} 
        options={chartOptions}
      />
    </div>
  );
};

export default LineChartComponent;