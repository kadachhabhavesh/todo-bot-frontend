function TableBodySkeleton() {
  return (
    <>
      {[...Array(8)].map(() => (
        <tr className="animate-pulse border-b-2 border-gray-200">
          <td className="px-4 py-3 w-6/12">
            <div className="h-4 bg-gray-300 rounded"></div>
          </td>
          <td className="px-4 py-3">
            <div className="h-4 bg-gray-300 rounded"></div>
          </td>
          <td className="px-4 py-3">
            <div className="h-4 bg-gray-300 rounded"></div>
          </td>
          <td className="px-4 py-3">
            <div className="h-4 bg-gray-300 rounded"></div>
          </td>
          <td className="px-4 py-3 w-16">
            <div className="h-4 bg-gray-300 rounded"></div>
          </td>
        </tr>
      ))}
    </>
  );
}

export default TableBodySkeleton;
