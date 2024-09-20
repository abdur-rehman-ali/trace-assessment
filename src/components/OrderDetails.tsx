import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import SampleDetail from './SampleDetail';
import { SampleDetailProps } from '../interfaces/sampleDetailPropsType';
import { Sample } from '../interfaces/sampleType';


const OrderDetails = () => {
  const { orderId } = useParams();
  const [samples, setSamples] = useState<Sample[]>([]);

  useEffect(() => {
    (async () => {
      const response = await fetch('/data/samplesData.json')
      const samplesData = await response.json();
      const orderSamples = samplesData.filter((sample: Sample) => sample.orderId === orderId);
      setSamples(orderSamples);
    })()
  }, [orderId]);

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Order {orderId} - Sample Details</h1>
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">Sample ID</th>
            <th scope="col" className="px-6 py-3">Min Depth (inches)</th>
            <th scope="col" className="px-6 py-3">Max Depth (inches)</th>
          </tr>
        </thead>
        <tbody>
          {samples.length > 0 ? (
            samples.map((sample: SampleDetailProps) => (
              <SampleDetail
                sampleId={sample.sampleId}
                minDepth={sample.minDepth}
                maxDepth={sample.maxDepth}
                key={sample.sampleId}
              />
            ))
          ) : (
            <tr>
              <td colSpan={3} className="px-6 py-4 text-center">No samples found for this order.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default OrderDetails;
