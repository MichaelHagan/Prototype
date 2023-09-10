import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardHeader } from "@mui/material";
import Chart from 'chart.js/auto';

export const Dashboard = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    data: [],
  });

  // Create a ref to hold the chart instance
  const chartRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Replace with your actual API endpoints to fetch chart data
        const api = `http://localhost:5000`;
        const token = localStorage.getItem('auth');

        const headers = {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        };

        const requestOptions = {
          method: 'GET',
          headers: headers,
        };

        const ordersResponse = await fetch(`${api}/orders/jobOwner`, requestOptions);
        const ordersData = await ordersResponse.json();

        const carsResponse = await fetch(`${api}/cars/jobOwner`, requestOptions);
        const carsData = await carsResponse.json();

        const carUtilization = carsData.map((car) => {
          const bookingsForCar = ordersData.filter((order) => order.CarId === car.id);
          return {
            carName: car.name,
            utilization: bookingsForCar.length,
          };
        });

        const chartLabels = carUtilization.map((car) => car.carName);
        const chartValues = carUtilization.map((car) => car.utilization);

        setChartData({
          labels: chartLabels,
          data: chartValues,
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Create a reference to the chart canvas element
    const chartCanvas = document.getElementById('pieChart');

    // Destroy the previous chart if it exists
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    // Initialize the pie chart with fetched data
    chartRef.current = new Chart(chartCanvas, {
      type: 'doughnut',
      data: {
        labels: chartData.labels,
        datasets: [{
          data: chartData.data,
          backgroundColor: randomColors(chartData.data.length),
        }],
      },
    });

    // Cleanup: Destroy the chart when the component unmounts
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [chartData]); // Run this effect whenever chartData changes

  // Function to generate random colors
  const randomColors = (count) => {
    const colors = [];
    for (let i = 0; i < count; i++) {
      const hue = (360 / count) * i;
      colors.push(`hsl(${hue}, 70%, 50%)`);
    }
    return colors;
  };

  return (
    <Card>
      <CardHeader title={`Hello ${localStorage.getItem('name')}`} />
      <CardContent>
        <h5>Welcome to the admin panel</h5>
        <br />
        <h5>Car Utilization</h5>
        <div style={{ maxWidth: '400px' }}>
          <canvas id="pieChart" width="400" height="400"></canvas>
        </div>
      </CardContent>
    </Card>
  );
};
