import { Link } from 'react-router-dom';
import { SingleOrderProps } from '../interfaces/singleOrderPropsType';

const SingleOrder = ({ id, farmName, createdDate }: SingleOrderProps) => {
  return (
    <tr
      key={id}
      className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
    >
      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        {farmName}
      </th>
      <td className="px-6 py-4">{id}</td>
      <td className="px-6 py-4">{createdDate}</td>
      <td className="px-6 py-4">
        <Link to={`/orders/${id}`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
          See Details
        </Link>
      </td>
    </tr>
  )
}

export default SingleOrder