import React, { useEffect, useState } from 'react';
import { DefaultInput, InputNoLabel, TopBar1 } from './template_element';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line, Scatter } from 'react-chartjs-2';
import axios from 'axios';
import { Data } from 'electron';
import { color } from 'chart.js/helpers';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface DataEntry {
  [key: string]: any;
}

interface Inputs {
  vessel_name: string;
  period1: string;
  period2: string;
}

const DirectorPdo: React.FC = () => {
  const [dataNr, setDataNr] = useState<DataEntry[]>([]);
  const [dataOh, setDataOh] = useState<any>([]);
  const [selectedXAxis, setSelectedXAxis] = useState<string>('');
  const [selectedYAxis, setSelectedYAxis] = useState<string>('');
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [selectedAction, setSelectedAction] = useState<string>('');
  const [selectedCluster, setSelectedCluster] = useState<string>('');
  const [chartData, setChartData] = useState<any>({ labels: [], datasets: [] });
  const [dataDr, setDataDr] = useState<DataEntry[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [nrResponse, officerNrsResponse, officerLogsResponse, officerDrsResponse, engineerDashboardResponse] = await Promise.all([
          axios.get('http://sezero.pythonanywhere.com/nr/'),
          axios.get("http://sezero.pythonanywhere.com/officer-nrs/"),
          axios.get("http://sezero.pythonanywhere.com/officer-logs/"),
          axios.get("http://sezero.pythonanywhere.com/officer-drs/"),
          axios.get("http://sezero.pythonanywhere.com/engineer-dashboard"),
        ]);

        const combinedNrData = [...nrResponse.data, ...officerNrsResponse.data];
        const combinedOhData = [
          ...officerLogsResponse.data,
          ...officerDrsResponse.data,
          ...engineerDashboardResponse.data
        ];
        // console.log(combinedNrData, combinedOhData)

        setDataNr(combinedNrData);
        setDataOh(combinedOhData);

      } catch (error) {
        console.log(error);
      }
    };

    fetchData();

    const fetchDr = async () => {
      const officerDrsResponse = await axios.get("http://sezero.pythonanywhere.com/officer-drs/");
      setDataDr(officerDrsResponse.data)
    }
    fetchDr()
  }, []);

  const xAxisOptionsOh: string[] = [
    "id", "cloud", "date_logbook", "direct", "force", "lat1", "lat2", "lat3", "lat4",
    "long1", "long2", "long3", "long4", "rcd", "route", "sc", "time1", "time2",
    "vessel_name", "voyage_code", "wc", "accept", "user",
    "date_dr", "displacement", "rc", "td", "trim",
    "rhme1", "rhme2", "rpmme1", "rpmme2", "typeme1", "typeme2", "fucme1", "fucme2",
    "rhae1", "rhae2", "rhae3", "rhae4", "loadae1", "loadae2", "loadae3", "loadae4",
    "typeae1", "typeae2", "typeae3", "typeae4", "fucae1", "fucae2", "fucae3", "fucae4",
    "date", "rhboiler", "typeboiler", "fucboiler", "correction_type1", "correction1",
    "correction_type2", "correction2"
  ]

  const xAxisOptionsNr: string[] = [
    "ae1", "ae2", "ae3", "ae_type1", "ae_type2", "ae_type3",
    "boiler1", "boiler2", "boiler3", "boiler_type1", "boiler_type2", "boiler_type3",
    "date", "foc1", "foc2", "foc3", "foc_type1", "foc_type2", "foc_type3",
    "id", "me1", "me2", "me3", "me_type1", "me_type2", "me_type3",
    "pr1", "pr2", "pr3", "pr_type1", "pr_type2", "pr_type3",
    "remain1", "remain2", "remain3", "remain_type1", "remain_type2", "remain_type3",
    "user", "vessel_name", "voyage_code",
    "date_nr", "distance", "speed"
  ]


  const yAxisOptionsOh: string[] = [...xAxisOptionsOh];
  const yAxisOptionsNr: string[] = [...xAxisOptionsNr];

  const getOptions = (selectedOption: string) => {
    if (selectedOption === 'oh') {
      return { xAxisOptions: xAxisOptionsOh, yAxisOptions: yAxisOptionsOh };
    } else if (selectedOption === 'nr') {
      return { xAxisOptions: xAxisOptionsNr, yAxisOptions: yAxisOptionsNr };
    } else {
      return { xAxisOptions: [], yAxisOptions: [] };
    }
  };

  useEffect(() => {
    if (selectedXAxis && selectedYAxis) {
      const dataOhFilter = dataOh.filter((item: DataEntry) => {
        return item.date >= inputs.period1 && item.date <= inputs.period2 && item.vessel_name === inputs.vessel_name
      });
      const dataNrFilter = dataNr.filter((item: DataEntry) => {
        return item.date_nr >= inputs.period1 && item.date_nr <= inputs.period2 && item.vessel_name === inputs.vessel_name
      });

      const dataToUse = selectedOption === 'nr' ? dataNrFilter : dataOhFilter;



      const filteredLabels = dataToUse.map((item: DataEntry) => item[selectedXAxis]);
      const filteredData = dataToUse.map((item: DataEntry) => item[selectedYAxis]);
      setChartData({
        labels: filteredLabels,
        datasets: [
          {
            label: `${selectedYAxis} vs ${selectedXAxis}`,
            data: filteredData,
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
          }
        ],
        options:{
          
        }
      });
    }
  }, [selectedXAxis, selectedYAxis, selectedOption, dataNr, dataOh]);

  const [inputs, setInputs] = useState<Inputs>({
    vessel_name: "",
    period1: "",
    period2: ""
  });

  const handleInputChange = (fieldName: keyof Inputs, value: string) => {
    setInputs((prevState) => ({
      ...prevState,
      [fieldName]: value
    }));
  };

  const { xAxisOptions, yAxisOptions } = getOptions(selectedOption);

  function FOCSeaOrPort(me1: any, me2: any, rhme1: any, rhme2: any) {
    const res = (me1 + me2) / (rhme1 + rhme2);
    return res;
  }


  const filteredData1 = dataOh && dataOh.filter((item: DataEntry) => {
    return item.date >= inputs.period1 && item.date <= inputs.period2 && item.vessel_name === inputs.vessel_name && item.route.substring(0, 2) != item.route.substring(3, 5);
  });
  const filteredData2 = dataDr && dataDr.filter((item: DataEntry) => {
    return item.date_dr >= inputs.period1 && item.date_dr <= inputs.period2 && item.vessel_name === inputs.vessel_name && item.displacement > 0;
  });
  // console.log(dataNr)
  const filteredData3 = dataNr && dataNr.filter((item: DataEntry) => {
    return item.date_nr >= inputs.period1 && item.date_nr <= inputs.period2 && item.vessel_name === inputs.vessel_name && item.speed > 0;
  });
  const filteredData4 = dataOh && dataOh.filter((item: DataEntry) => {
    return item.date >= inputs.period1 && item.date <= inputs.period2 && item.vessel_name === inputs.vessel_name && item.route.substring(0, 2) == item.route.substring(3, 5);
  });
  const dataFOC = filteredData1.map((item: DataEntry) => {
    return FOCSeaOrPort(parseFloat(item.fucme1), parseFloat(item.fucme2), parseFloat(item.rhme1), parseFloat(item.rhme2));
  });
  const dataFOCmanv = filteredData4.map((item: DataEntry) => {
    return parseFloat(item.fucme1) + parseFloat(item.fucme2)
  });
  const dataFOCAEsea = filteredData1.map((item: DataEntry) => {
    return parseFloat(item.fucae1) + parseFloat(item.fucae2) + parseFloat(item.fucae3) + parseFloat(item.fucae4)
  })
  const dataFOCAEport = filteredData4.map((item: DataEntry) => {
    return parseFloat(item.fucae1) + parseFloat(item.fucae2) + parseFloat(item.fucae3) + parseFloat(item.fucae4)
  })
  console.log(dataFOCAEsea)
  const displacement = filteredData2.map((item: DataEntry) => {
    return parseFloat(item.displacement)
  })
  const speed = filteredData3.map((item: DataEntry) => {
    return parseFloat(item.speed)
  })
  const duration = filteredData4.map((item: DataEntry) => {
    return parseFloat(item.rhme1) + parseFloat(item.rhme2)
  })
  const durationAESea = filteredData1.map((item: DataEntry) => {
    return parseFloat(item.rhae1) + parseFloat(item.rhae2) + parseFloat(item.rhae3) + parseFloat(item.rhae4)
  })
  const durationAEPort = filteredData4.map((item: DataEntry) => {
    return parseFloat(item.rhae1) + parseFloat(item.rhae2) + parseFloat(item.rhae3) + parseFloat(item.rhae4)
  })

  // console.log(durationAESea)
  // console.log(speed)
  // console.log(displacement)
  // console.log(dataFOC)
  const clusters = [
    { range: [0, 6229], color: 'rgba(255, 99, 132, 0.5)' },
    { range: [6229, 7825], color: 'rgba(54, 100, 235, 0.5)' },
    { range: [7825, 8989], color: 'rgba(75, 192, 192, 0.5)' },
    { range: [8989, 10078], color: 'rgba(153, 102, 255, 0.5)' },
    { range: [10078, 11584], color: 'rgba(255, 159, 64, 0.5)' }
  ];
  const clustersSeaSpeed = [
    { range: [150, 245.9], color: 'rgba(255, 99, 132, 0.5)' },
    { range: [245.9, 293.2], color: 'rgba(54, 100, 235, 0.5)' },
    { range: [293.2, 338.9], color: 'rgba(75, 192, 192, 0.5)' },
    { range: [338.9, 391.1], color: 'rgba(153, 102, 255, 0.5)' },
    { range: [391.1, 475], color: 'rgba(255, 159, 64, 0.5)' }
  ];
  const clustersManvDur = [
    { range: [210, 1420], color: 'rgba(255, 99, 132, 0.5)' },
    { range: [1420, 2583], color: 'rgba(54, 100, 235, 0.5)' },
    { range: [2583, 4064], color: 'rgba(75, 192, 192, 0.5)' },
    { range: [4064, 6589], color: 'rgba(153, 102, 255, 0.5)' },
    { range: [6589, 11910], color: 'rgba(255, 159, 64, 0.5)' }
  ];
  const clustersSeaDur = [
    { range: [256, 2457], color: 'rgba(255, 99, 132, 0.5)' },
    { range: [2457, 4673], color: 'rgba(54, 100, 235, 0.5)' },
    { range: [4673, 6483], color: 'rgba(75, 192, 192, 0.5)' },
    { range: [6483, 12061], color: 'rgba(153, 102, 255, 0.5)' },
    { range: [12061, 18102], color: 'rgba(255, 159, 64, 0.5)' }
  ]
  const clustersPortDur = [
    { range: [192, 3117], color: 'rgba(255, 99, 132, 0.5)' },
    { range: [3117, 5961], color: 'rgba(54, 100, 235, 0.5)' },
    { range: [5961, 10448], color: 'rgba(75, 192, 192, 0.5)' },
    { range: [10448, 18006], color: 'rgba(153, 102, 255, 0.5)' },
  ]

  // Fungsi untuk menentukan kluster berdasarkan displacement
  function getCluster(displacement: any) {
    for (const cluster of clusters) {
      if (displacement >= cluster.range[0] && displacement <= cluster.range[1]) {
        return cluster.color;
      }
    }
    return 'rgba(201, 203, 207, 0.2)'; // Default color jika tidak sesuai dengan kluster manapun
  }
  function getClusterSeaSpeed(foc: any) {
    for (const cluster of clustersSeaSpeed) {
      if (foc >= cluster.range[0] && foc <= cluster.range[1]) {
        return cluster.color;
      }
    }
    return 'rgba(201, 203, 207, 0.2)'; // Default color jika tidak sesuai dengan kluster manapun
  }
  function getClusterManvDur(foc: any) {
    for (const cluster of clustersManvDur) {
      if (foc >= cluster.range[0] && foc <= cluster.range[1]) {
        return cluster.color;
      }
    }
    return 'rgba(201, 203, 207, 0.2)'; // Default color jika tidak sesuai dengan kluster manapun
  }
  function getClusterSeaDur(foc: any) {
    for (const cluster of clustersSeaDur) {
      if (foc >= cluster.range[0] && foc <= cluster.range[1]) {
        return cluster.color;
      }
    }
    return 'rgba(201, 203, 207, 0.2)'; // Default color jika tidak sesuai dengan kluster manapun
  }
  function getClusterPortDur(foc: any) {
    for (const cluster of clustersPortDur) {
      if (foc >= cluster.range[0] && foc <= cluster.range[1]) {
        return cluster.color;
      }
    }
    return 'rgba(201, 203, 207, 0.2)'; // Default color jika tidak sesuai dengan kluster manapun
  }



  // Buat data dengan warna latar belakang sesuai kluster
  const clusteredData = dataFOC.map((foc: any, index: any) => ({
    x: foc,
    y: displacement[index],
    backgroundColor: getCluster(displacement[index])
  }));
  const clusterData1 = {
    labels: displacement,
    datasets: [
      {
        label: '',
        data: clusteredData.map((item: any) => ({ x: item.x, y: item.y })),
        fill: true,
        backgroundColor: clusteredData.map((item: any) => item.backgroundColor),
        tension: 0.1,
      }
    ],
    options: {
      plugins: {
        legend: {
          display: true,
          labels: {
            generateLabels: function (chart: any) {
              return clusters.map((cluster, index) => ({
                text: `Cluster ${index + 1}: ${cluster.range[0]} - ${cluster.range[1]}`,
                fillStyle: cluster.color,
                strokeStyle: cluster.color,
                hidden: false,
                index: index
              }));
            }
          }
        }
      }
    }
  };
  const clusteredDataSeaSpeed = dataFOC.map((foc: any, index: any) => ({
    x: foc,
    y: speed[index],
    backgroundColor: getClusterSeaSpeed(foc)
  }));

  const clusterData2 = {
    labels: speed,
    datasets: [
      {
        label: '',
        data: clusteredDataSeaSpeed.map((item: any) => ({ x: item.x, y: item.y })),
        fill: true,
        backgroundColor: clusteredDataSeaSpeed.map((item: any) => item.backgroundColor),
        tension: 0.1,
      }
    ],
    options: {
      plugins: {
        legend: {
          display: true,
          labels: {
            generateLabels: function (chart: any) {
              return clustersSeaSpeed.map((cluster, index) => ({
                text: `Cluster ${index + 1}: ${cluster.range[0]} - ${cluster.range[1]}`,
                fillStyle: cluster.color,
                strokeStyle: cluster.color,
                hidden: false,
                index: index
              }));
            }
          }
        }
      }
    }
  };
  const clusteredDataManvDur = dataFOCmanv.map((foc: any, index: any) => ({
    x: foc,
    y: duration[index],
    backgroundColor: getClusterManvDur(foc)
  }));

  const clusterData3 = {
    labels: duration,
    datasets: [
      {
        label: '',
        data: clusteredDataManvDur.map((item: any) => ({ x: item.x, y: item.y })),
        fill: true,
        backgroundColor: clusteredDataManvDur.map((item: any) => item.backgroundColor),
        tension: 0.1,
      }
    ],
    options: {
      plugins: {
        legend: {
          display: true,
          labels: {
            generateLabels: function (chart: any) {
              return clustersManvDur.map((cluster, index) => ({
                text: `Cluster ${index + 1}: ${cluster.range[0]} - ${cluster.range[1]}`,
                fillStyle: cluster.color,
                strokeStyle: cluster.color,
                hidden: false,
                index: index
              }));
            }
          }
        }
      }
    }
  };
  const clusteredDataSeaDur = dataFOCAEsea.map((foc: any, index: any) => ({
    x: foc,
    y: durationAESea[index],
    backgroundColor: getClusterSeaDur(foc)
  }));

  const clusterData4 = {
    labels: durationAESea,
    datasets: [
      {
        label: '',
        data: clusteredDataSeaDur.map((item: any) => ({ x: item.x, y: item.y })),
        fill: true,
        backgroundColor: clusteredDataSeaDur.map((item: any) => item.backgroundColor),
        tension: 0.1,
      }
    ],
    options: {
      plugins: {
        legend: {
          display: true,
          labels: {
            generateLabels: function (chart: any) {
              return clustersSeaDur.map((cluster, index) => ({
                text: `Cluster ${index + 1}: ${cluster.range[0]} - ${cluster.range[1]}`,
                fillStyle: cluster.color,
                strokeStyle: cluster.color,
                hidden: false,
                index: index
              }));
            }
          }
        }
      }
    }
  };
  const clusteredDataPortDur = dataFOCAEport.map((foc: any, index: any) => ({
    x: foc,
    y: durationAEPort[index],
    backgroundColor: getClusterPortDur(foc)
  }));

  const clusterData5 = {
    labels: durationAEPort,
    datasets: [
      {
        label: '',
        data: clusteredDataPortDur.map((item: any) => ({ x: item.x, y: item.y })),
        fill: true,
        backgroundColor: clusteredDataPortDur.map((item: any) => item.backgroundColor),
        tension: 0.1,
      }
    ],
    options: {
      plugins: {
        legend: {
          display: true,
          labels: {
            generateLabels: function (chart: any) {
              return clustersPortDur.map((cluster, index) => ({
                text: `Cluster ${index + 1}: ${cluster.range[0]} - ${cluster.range[1]}`,
                fillStyle: cluster.color,
                strokeStyle: cluster.color,
                hidden: false,
                index: index
              }));
            }
          }
        }
      }
    }
  };


  return (
    <div>
      <TopBar1 />
      <div className='flex flex-row gap-10'>
        <DefaultInput label="Vessel Name" type="text" value={inputs.vessel_name} onChange={(e: any) => handleInputChange("vessel_name", e.target.value)} />
        <div className='flex flex-col gap-2'>
          <h1>Period</h1>
          <div className='flex flex-row gap-3 items-center'>
            <InputNoLabel type="date" value={inputs.period1} onChange={(e: any) => handleInputChange("period1", e.target.value)} />
            <h1>to</h1>
            <InputNoLabel type="date" value={inputs.period2} onChange={(e: any) => handleInputChange("period2", e.target.value)} />
          </div>
        </div>
      </div>
      <div className='flex flex-row gap-10 mt-4 items-center'>
        <div className='flex flex-col gap-2 '>
          <h1>Action</h1>
          <select className='bg-white border focus:outline-none border-gray-400 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2 py-1' onChange={(e) => setSelectedAction(e.target.value)}>
            <option value="">Select</option>
            <option value="cluster">Clusterize</option>
            <option value="visual">Visualize Any Data</option>
          </select>
        </div>

      </div>
      {
        selectedAction == "visual" ?
          <>
            <div className='mt-4 flex flex-row gap-10'>
              <div className='flex flex-col gap-2'>
                <h1>Data</h1>
                <select className='bg-white border focus:outline-none border-gray-400 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2 py-1' onChange={(e) => setSelectedOption(e.target.value)}>
                  <option value="">Select</option>
                  <option value="oh">Operational Historical Data</option>
                  <option value="nr">Noon Report Data</option>
                </select>
              </div>
              <div className='flex flex-col gap-2'>
                <h1>X-axis</h1>
                <select className='bg-white border focus:outline-none border-gray-400 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2 py-1' onChange={(e) => setSelectedXAxis(e.target.value)}>
                  <option value="">Select</option>
                  {xAxisOptions.map((option, index) => (
                    <option key={index} value={option}>{option}</option>
                  ))}
                </select>
              </div>
              <div className='flex flex-col gap-2'>
                <h1>Y-axis</h1>
                <select className='bg-white border focus:outline-none border-gray-400 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2 py-1' onChange={(e) => setSelectedYAxis(e.target.value)}>
                  <option value="">Select</option>
                  {yAxisOptions.map((option, index) => (
                    <option key={index} value={option}>{option}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className='mt-6'>
              <Scatter data={chartData} />
            </div>
          </>
          :
          selectedAction == "cluster" ?
            <>
              <div className='flex flex-col gap-2 w-fit mt-4'>
                <h1>Clusterize</h1>
                <select className='bg-white border focus:outline-none border-gray-400 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2 py-1' onChange={(e) => setSelectedCluster(e.target.value)}>
                  <option value="">Select</option>
                  <option value="focseadis">FOCSea (l/h)(x) vs Displacement (ton)(y)</option>
                  <option value="focseaspeed">FOCSea (l/h)(x) vs Speed (kn)(y)</option>
                  <option value="focmanvdur">FOCManv (l/h)(x) vs Duration (h)(y)</option>
                  <option value="focaeseadur">FOCAESea (l/h)(x) vs Duration (h)(y)</option>
                  <option value="focaeportdur">FOCAEPort (l/h)(x) vs Duration (h)(y)</option>
                </select>
              </div>
              <div className='mt-4'>
                <Scatter data={selectedCluster == "focseadis" ? clusterData1 : selectedCluster == "focseaspeed" ? clusterData2 : selectedCluster == "focmanvdur" ? clusterData3 : selectedCluster == "focaeseadur" ? clusterData4 : selectedCluster == "focaeportdur" ? clusterData5 : chartData} options={selectedCluster == "focseadis" ? clusterData1.options : selectedCluster == "focseaspeed" ? clusterData2.options : selectedCluster == "focmanvdur" ? clusterData3.options : selectedCluster == "focaeseadur" ? clusterData4.options : selectedCluster == "focaeportdur" ? clusterData5.options : chartData.options}></Scatter>
              </div>
            </>
            : ""
      }

    </div>
  );
};

export default DirectorPdo;
