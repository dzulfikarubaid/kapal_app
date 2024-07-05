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
import { Line } from 'react-chartjs-2';
import axios from 'axios';

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
  const [dataOh, setDataOh] = useState<DataEntry[]>([]);
  const [selectedXAxis, setSelectedXAxis] = useState<string>('');
  const [selectedYAxis, setSelectedYAxis] = useState<string>('');
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [chartData, setChartData] = useState<any>({ labels: [], datasets: [] });

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
        console.log(combinedNrData, combinedOhData)

        setDataNr(combinedNrData);
        setDataOh(combinedOhData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
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
      const dataToUse = selectedOption === 'nr' ? dataNr : dataOh;

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
        ]
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

  return (
    <div>
      <TopBar1 />
      <div className='flex flex-row gap-10'>
        <DefaultInput label="Vessel Name" type="text" value={inputs.vessel_name} onChange={(e:any) => handleInputChange("vessel_name", e.target.value)} />
        <div className='flex flex-col gap-2'>
          <h1>Period</h1>
          <div className='flex flex-row gap-3 items-center'>
            <InputNoLabel type="date" value={inputs.period1} onChange={(e:any) => handleInputChange("period1", e.target.value)} />
            <h1>to</h1>
            <InputNoLabel type="date" value={inputs.period2} onChange={(e:any) => handleInputChange("period2", e.target.value)} />
          </div>
        </div>
      </div>
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
        <Line data={chartData} />
      </div>
    </div>
  );
};

export default DirectorPdo;
