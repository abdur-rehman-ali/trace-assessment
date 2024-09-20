import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { SampleDetailProps } from '../interfaces/sampleDetailPropsType';
import { Sample } from '../interfaces/sampleType';

const OrderDetails = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [samples, setSamples] = useState<Sample[]>([]);
  const [editingSampleId, setEditingSampleId] = useState<string | null>(null);
  const [minDepth, setMinDepth] = useState<number | null>(null);
  const [maxDepth, setMaxDepth] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const response = await fetch('/data/samplesData.json');
      const samplesData = await response.json();
      const orderSamples = samplesData.filter((sample: Sample) => sample.orderId === orderId);
      setSamples(orderSamples);
    })();
  }, [orderId]);

  const handleEditClick = (sample: SampleDetailProps) => {
    setEditingSampleId(sample.sampleId);
    setMinDepth(sample.minDepth);
    setMaxDepth(sample.maxDepth);
    setError(null);
  };

  const handleSave = () => {
    if (editingSampleId && minDepth !== null && maxDepth !== null) {
      if (minDepth < 0 || minDepth > 12 || maxDepth < 0 || maxDepth > 12) {
        setError('Depth values must be between 0 and 12 inches.');
        return;
      }
      if (minDepth > maxDepth) {
        setError('Minimum depth cannot be greater than maximum depth.');
        return;
      }

      const updatedSamples = samples.map(sample => {
        if (sample.sampleId === editingSampleId) {
          return { ...sample, minDepth, maxDepth };
        }
        return sample;
      });

      setSamples(updatedSamples);
      setEditingSampleId(null);
      setMinDepth(null);
      setMaxDepth(null);
      setError(null);
    }
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 px-4 py-2 bg-gray-300 text-black rounded"
      >
        Back
      </button>
      <h1 className="text-2xl font-bold mb-4">Order {orderId} - Sample Details</h1>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">Sample ID</th>
            <th scope="col" className="px-6 py-3">Min Depth (inches)</th>
            <th scope="col" className="px-6 py-3">Max Depth (inches)</th>
            <th scope="col" className="px-6 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {samples.length > 0 ? (
            samples.map((sample: SampleDetailProps) => (
              <tr key={sample.sampleId}>
                <td className="px-6 py-4">{sample.sampleId}</td>
                <td className="px-6 py-4">
                  {editingSampleId === sample.sampleId ? (
                    <input
                      type="number"
                      value={minDepth ?? ''}
                      onChange={(e) => setMinDepth(Number(e.target.value))}
                      className="border rounded px-2"
                      min="0"
                      max="12"
                    />
                  ) : (
                    sample.minDepth
                  )}
                </td>
                <td className="px-6 py-4">
                  {editingSampleId === sample.sampleId ? (
                    <input
                      type="number"
                      value={maxDepth ?? ''}
                      onChange={(e) => setMaxDepth(Number(e.target.value))}
                      className="border rounded px-2"
                      min="0"
                      max="12"
                    />
                  ) : (
                    sample.maxDepth
                  )}
                </td>
                <td className="px-6 py-4">
                  {editingSampleId === sample.sampleId ? (
                    <button
                      onClick={handleSave}
                      className="px-4 py-2 bg-blue-500 text-white rounded"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEditClick(sample)}
                      className="px-4 py-2 bg-green-500 text-white rounded"
                    >
                      Edit
                    </button>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="px-6 py-4 text-center">No samples found for this order.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default OrderDetails;
