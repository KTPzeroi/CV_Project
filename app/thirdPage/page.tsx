import React from "react";

const TablePage: React.FC = () => {
  const data = [
    { name: "John Doe", age: 30 },
    { name: "Jane Smith", age: 25 },
    { name: "Alex Johnson", age: 35 },
  ];

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-2xl font-bold mb-4">Total Price</h1>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full border border-white">
          {/* Table Head */}
          <thead>
            <tr>
              <th className="bg-primary text-white border border-white">User</th>
              <th className="bg-primary text-white border border-white">Price</th>
            </tr>
          </thead>
          {/* Table Body */}
          <tbody>
            {data.map((item, index) => (
              <tr key={index} className="border border-white">
                <td className="border border-white">{item.name}</td>
                <td className="border border-white">{item.age}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TablePage;
