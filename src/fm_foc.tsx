import React, { useEffect, useState } from 'react';
import { DefaultInput, InputNoLabel, TopBar1 } from './template_element';
import axios from 'axios';

function FmFoc() {
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [vesselName, setVesselName] = useState('');
  const [startPeriod, setStartPeriod] = useState('');
  const [endPeriod, setEndPeriod] = useState('');
  const [showRute, setShowRute] = useState(false);
  const [showSpeed, setShowSpeed] = useState(false);
  const [showDistance, setShowDistance] = useState(false);
  const [routeFilter, setRouteFilter] = useState('');
  const [minSpeedFilter, setMinSpeedFilter] = useState('');
  const [maxSpeedFilter, setMaxSpeedFilter] = useState('');
  const [minDistanceFilter, setMinDistanceFilter] = useState('');
  const [maxDistanceFilter, setMaxDistanceFilter] = useState('');

  useEffect(() => {
    axios.get('http://sezero.pythonanywhere.com/get-fpr/')
      .then((response) => {
        console.log(response.data);
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
        const errors = error.response.data;

        let error_message = "";
        Object.keys(errors).forEach(key => {
          error_message += `${key}: ${errors[key]}\n`
        });
        alert(error_message);
      });
    axios.get('http://sezero.pythonanywhere.com/officer-nrs/')
      .then((response) => {
        console.log(response.data);
        setData2(response.data);
      })
      .catch((error) => {
        console.log(error);
        const errors = error.response.data;

        let error_message = "";
        Object.keys(errors).forEach(key => {
          error_message += `${key}: ${errors[key]}\n`
        });
        alert(error_message);
      });
  }, []);

  const handleVesselNameChange = (e) => {
    setVesselName(e.target.value);
  };

  const handleStartPeriodChange = (e) => {
    setStartPeriod(e.target.value);
  };

  const handleEndPeriodChange = (e) => {
    setEndPeriod(e.target.value);
  };

  const filteredData = data.filter(item => {
    let isMatch = item.vessel_name === vesselName;
    if (showRute && routeFilter) {
      isMatch = isMatch && item.route.includes(routeFilter);
    }
    const speedDistance = data2.find(item2 => item2.vessel_name === vesselName);
    if (showSpeed && speedDistance) {
      const speed = Number(speedDistance.speed);
      isMatch = isMatch && (!minSpeedFilter || speed >= Number(minSpeedFilter)) && (!maxSpeedFilter || speed <= Number(maxSpeedFilter));
    }
    if (showDistance && speedDistance) {
      const distance = Number(speedDistance.distance);
      isMatch = isMatch && (!minDistanceFilter || distance >= Number(minDistanceFilter)) && (!maxDistanceFilter || distance <= Number(maxDistanceFilter));
    }
    return isMatch;
  });

  const vesselData = filteredData.length > 0 ? filteredData[0] : null;
  const speedDistance = data2.find(item2 => item2.vessel_name === vesselName);

  const isDataAvailable = vesselName && startPeriod && endPeriod && vesselData && speedDistance;

  return (
    <div>
      <TopBar1 />
      <div className='w-full flex flex-row justify-between'>
        <DefaultInput label="Vessel Name" value={vesselName} onChange={handleVesselNameChange} />
        <div className='flex flex-col gap-2'>
          <h1>Period</h1>
          <div className='flex flex-row gap-3 items-center'>
            <InputNoLabel type="month" value={startPeriod} onChange={handleStartPeriodChange} />
            <h1>to</h1>
            <InputNoLabel type="month" value={endPeriod} onChange={handleEndPeriodChange} />
          </div>
        </div>
      </div>
      <div className='flex flex-row gap-12 pt-20 items-start justify-start'>
        <div className='flex flex-col gap-4'>
          <div className='flex flex-row gap-2'>
            <input type="checkbox" name="rute" id="rute" checked={showRute} onChange={() => setShowRute(!showRute)} />
            <label htmlFor="rute">Rute</label>
          </div>
          {showRute && <DefaultInput label="Rute" value={routeFilter} onChange={(e) => setRouteFilter(e.target.value)} />}

          <div className='flex flex-row gap-2'>
            <input type="checkbox" name="speed" id="speed" checked={showSpeed} onChange={() => setShowSpeed(!showSpeed)} />
            <label htmlFor="speed">Speed (Knot)</label>
          </div>
          {showSpeed &&
            <div className='flex flex-row gap-2'>
              <InputNoLabel label="Min Speed (Knot)" value={minSpeedFilter} onChange={(e) => setMinSpeedFilter(e.target.value)} />
              <InputNoLabel label="Max Speed (Knot)" value={maxSpeedFilter} onChange={(e) => setMaxSpeedFilter(e.target.value)} />
            </div>
          }

          <div className='flex flex-row gap-2'>
            <input type="checkbox" name="distance" id="distance" checked={showDistance} onChange={() => setShowDistance(!showDistance)} />
            <label htmlFor="distance">Distance (Nm)</label>
          </div>
          {showDistance &&
            <div className='flex flex-row gap-2'>
              <InputNoLabel label="Min Distance (Nm)" value={minDistanceFilter} onChange={(e) => setMinDistanceFilter(e.target.value)} />
              <InputNoLabel label="Max Distance (Nm)" value={maxDistanceFilter} onChange={(e) => setMaxDistanceFilter(e.target.value)} />
            </div>
          }
        </div>
        <table className='styled-table'>
          <thead>
            <tr>
              <th rowSpan={2}>Vessel Name</th>
              <th rowSpan={2}>Route</th>
              <th rowSpan={2}>Speed (Knot)</th>
              <th rowSpan={2}>Distance (Nm)</th>
              <th colSpan={3}>Fuel Oil Consumption (liter)</th>
              <th colSpan={3}>Price (Rp/liter)</th>
              <th rowSpan={2}>Total Price</th>
            </tr>
            <tr>
              <th>MDO</th>
              <th>HSD</th>
              <th>LSFO</th>
              <th>MDO</th>
              <th>HSD</th>
              <th>LSFO</th>
            </tr>
          </thead>
          <tbody className='text-center'>
            {isDataAvailable ? (
              <tr>
                <td>{vesselData.vessel_name}</td>
                <td>{vesselData.route}</td>
                <td>{speedDistance.speed}</td>
                <td>{speedDistance.distance}</td>
                <td>{vesselData.br2value}</td> {/* MDO Consumption */}
                <td>{vesselData.br1value}</td> {/* HSD Consumption */}
                <td>{vesselData.br3value}</td> {/* LSFO Consumption */}
                <td>{vesselData.price2value}</td> {/* MDO Price */}
                <td>{vesselData.price1value}</td> {/* HSD Price */}
                <td>{vesselData.price3value}</td> {/* LSFO Price */}
                <td>Rp{Number(vesselData.price1value) + Number(vesselData.price2value) + Number(vesselData.price3value)}</td>
              </tr>
            ) : (
              <tr>
                <td colSpan="11">Please provide the vessel name, period, and any other filters to see the data</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default FmFoc;
