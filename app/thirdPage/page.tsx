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
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ThirdPage;