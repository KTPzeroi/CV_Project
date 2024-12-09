<<<<<<< HEAD
"use client";
import React, { useEffect, useState } from "react";

const ThirdPage = () => {
  const [userSelections, setUserSelections] = useState([]);
  const [users, setUsers] = useState([]);
  const [calculatedSelections, setCalculatedSelections] = useState([]);

  useEffect(() => {
    const savedUsers = localStorage.getItem("users");
    const savedSelections = localStorage.getItem("userSelections");
    const savedCalculated = localStorage.getItem("calculatedSelections");

    if (savedUsers) setUsers(JSON.parse(savedUsers));
    if (savedSelections) setUserSelections(JSON.parse(savedSelections));
    if (savedCalculated) setCalculatedSelections(JSON.parse(savedCalculated));
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-black text-white p-6">
      <h1 className="text-4xl font-bold text-center mb-6">Summary of Orders</h1>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full border border-gray-300">
          <thead>
            <tr>
              <th className="bg-primary text-white">User</th>
              <th className="bg-primary text-white">Selected Foods</th>
              <th className="bg-primary text-white">Total Price</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, userIndex) => {
              const userSelection = userSelections[userIndex] || [];
              const totalPrice = userSelection.reduce((acc, selectedFood) => {
                const calculatedFood = calculatedSelections.find(
                  (food) => food.name === selectedFood.name
                );
                return acc + (calculatedFood ? calculatedFood.price : 0);
              }, 0);

              return (
                <tr key={userIndex}>
                  <td>{user}</td>
                  <td>
                    {userSelection.map((food, index) => (
                      <div key={index}>
                        {food.name} ({food.price.toFixed(2)})
                      </div>
                    ))}
                  </td>
                  <td>{totalPrice.toFixed(2)}</td>
                </tr>
              );
            })}
=======
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
>>>>>>> e660e29800b1ceaffe86b7e306c59d5f93e73ae3
          </tbody>
        </table>
      </div>
    </div>
  );
};

<<<<<<< HEAD
export default ThirdPage;
=======
export default TablePage;
>>>>>>> e660e29800b1ceaffe86b7e306c59d5f93e73ae3
