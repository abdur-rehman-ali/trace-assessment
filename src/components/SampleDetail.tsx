import { SampleDetailProps } from "../interfaces/sampleDetailPropsType"

const SampleDetail = ({sampleId, minDepth, maxDepth}: SampleDetailProps) => {
  return (
    <tr key={sampleId} className=" dark:bg-gray-900">
      <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{sampleId}</td>
      <td className="px-6 py-4">{minDepth}</td>
      <td className="px-6 py-4">{maxDepth}</td>
    </tr>
  )
}

export default SampleDetail