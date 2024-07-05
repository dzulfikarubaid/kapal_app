import React, { useEffect, useState } from 'react';
import { DefaultInput, InputNoLabel, TopBar1 } from './template_element';
import { Scatter } from 'react-chartjs-2';
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend
);

function DirectorPdf() {
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [chartData, setChartData] = useState({ datasets: [] });
  const [xAxisType, setXAxisType] = useState('speed');
  const [vesselName, setVesselName] = useState('');
  const [startPeriod, setStartPeriod] = useState('');
  const [endPeriod, setEndPeriod] = useState('');

  useEffect(() => {
    axios.get('http://sezero.pythonanywhere.com/get-fpr/')
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

    axios.get('http://sezero.pythonanywhere.com/officer-nrs/')
      .then((response) => {
        setData2(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    console.log(data2)
    if (data.length > 0 && data2.length > 0 && vesselName && startPeriod && endPeriod) {
      const filteredData2 = data2.filter(item2 =>
        item2.vessel_name === vesselName &&
        item2.date_nr >= startPeriod &&
        item2.date_nr <= endPeriod
      );

      const filteredData = data.filter(item => item.vessel_name === vesselName);

      const totalPrice = filteredData.map(item => (
        Number(item.price1value) + Number(item.price2value) + Number(item.price3value)
      ));
      console.log(filteredData)
      console.log(filteredData2)
      const xAxisData = xAxisType === 'speed'
        ? filteredData2.map(item2 => item2.speed)
        : filteredData2.map(item2 => item2.distance);

      setChartData({
        datasets: [
          {
            label: `Total Price vs ${xAxisType.charAt(0).toUpperCase() + xAxisType.slice(1)}`,
            data: xAxisData.map((x, index) => ({ x, y: totalPrice[index] })),
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
          }
        ]
      });
    }
  }, [data, data2, vesselName, startPeriod, endPeriod, xAxisType]);

  const handleXAxisChange = (e) => {
    setXAxisType(e.target.value);
  };

  return (
    <div>
      <TopBar1 />
      <div className='w-full flex flex-row justify-between mb-4'>
        <DefaultInput label="Vessel Name" value={vesselName} onChange={(e) => setVesselName(e.target.value)} />
        <div className='flex flex-col gap-2'>
          <h1>Period</h1>
          <div className='flex flex-row gap-3 items-center'>
            <InputNoLabel type="month" value={startPeriod} onChange={(e) => setStartPeriod(e.target.value)} />
            <h1>to</h1>
            <InputNoLabel type="month" value={endPeriod} onChange={(e) => setEndPeriod(e.target.value)} />
          </div>
        </div>
      </div>
      <div className="chart-controls">
        <label htmlFor="x-axis-type">Select X-axis: </label>
        <select id="x-axis-type" value={xAxisType} onChange={handleXAxisChange}>
          <option value="speed">Speed (Knot)</option>
          <option value="distance">Distance (Nm)</option>
        </select>
      </div>
      <div className="chart-container">
        <Scatter
          data={chartData}
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
              },
              title: {
                display: true,
                text: `Total Price by ${xAxisType.charAt(0).toUpperCase() + xAxisType.slice(1)}`,
              },
            },
            scales: {
              x: {
                title: {
                  display: true,
                  text: xAxisType.charAt(0).toUpperCase() + xAxisType.slice(1),
                },
              },
              y: {
                title: {
                  display: true,
                  text: 'Total Price (Rp)',
                },
              },
            },
          }}
        />
      </div>
    </div>
  );
}

export default DirectorPdf;
