"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // ใช้ useRouter สำหรับ navigation
import Navbar from "../components/Navbar";

const ThirdPage = () => {
  const [userSelections, setUserSelections] = useState([]);
  const [users, setUsers] = useState([]);
  const [calculatedSelections, setCalculatedSelections] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const savedUsers = localStorage.getItem("users");
    const savedSelections = localStorage.getItem("userSelections");
    const savedCalculated = localStorage.getItem("calculatedSelections");

    if (savedUsers) setUsers(JSON.parse(savedUsers));
    if (savedSelections) setUserSelections(JSON.parse(savedSelections));
    if (savedCalculated) setCalculatedSelections(JSON.parse(savedCalculated));
  }, []);

  const handleFinish = () => {
    // ล้างค่าทั้งหมดใน localStorage
    localStorage.removeItem("users");
    localStorage.removeItem("userSelections");
    localStorage.removeItem("calculatedSelections");

    // ย้อนกลับไปที่หน้าแรก
    router.push("/");
  };

  return (
    <div className="font-title">
      <Navbar />
      <div className="flex flex-col min-h-screen bg-white text-black p-6">
        <h1 className="text-2xl font-bold text-center mb-8">
          Summary of Orders
        </h1>
        <div className="overflow-x-auto rounded-lg">
          <table className="table w-full text-base">
            <thead>
              <tr className="border-none">
                <th className="bg-red-600 text-white text-base">User</th>
                <th className="bg-red-600 text-white text-base">
                  Selected Foods
                </th>
                <th className="bg-red-600 text-white text-base">Total Price</th>
              </tr>
            </thead>
            <tbody className="font-bold">
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
        {/* ปุ่มเสร็จสิ้น */}
        <div className="flex justify-center mt-8">
          <button
            onClick={handleFinish}
            className="btn bg-red-600 text-white text-base px-8 py-3 rounded-lg"
          >
            เสร็จสิ้น
          </button>
        </div>
      </div>
    </div>
  );
};

export default ThirdPage;

