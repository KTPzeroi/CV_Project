"use client";  // เพิ่มบรรทัดนี้ที่ด้านบนสุดของไฟล์

import React, { useEffect, useState } from "react";

const Page = () => {
  const [foods, setFoods] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // ดึงข้อมูลจาก localStorage เมื่อโหลดหน้า
    const savedFoods = localStorage.getItem("foods");
    const savedUsers = localStorage.getItem("users");

    // ถ้ามีข้อมูลใน localStorage ให้ตั้งค่า state
    if (savedFoods) {
      setFoods(JSON.parse(savedFoods));
    } else {
      // ถ้าไม่มีข้อมูลใน localStorage ให้ลบข้อมูลใน state
      setFoods([]);
    }

    if (savedUsers) {
      setUsers(JSON.parse(savedUsers));
    } else {
      setUsers([]);
    }

    // ทำให้ข้อมูลใน localStorage หมดอายุ
    const timeout = setTimeout(() => {
      localStorage.removeItem("foods");
      localStorage.removeItem("users");
    }, 300000); // ลบข้อมูลหลังจาก 5 นาที

    // เคลียร์ timeout เมื่อ component ถูก unmount หรือ rerender
    return () => clearTimeout(timeout);
  }, []); // ใช้ [] เพื่อให้ effect นี้ทำงานแค่ครั้งเดียวเมื่อ component ถูก mount

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <div className="w-full max-w-md bg-gray-800 shadow-lg rounded-lg p-4 text-gray-100">
        <h1 className="text-2xl font-bold mb-4 text-center">เมนูอาหาร</h1>

        {/* แสดงรายการอาหาร */}
        <div className="h-64 overflow-y-auto border border-gray-700 rounded-md p-2">
          {foods.map((food, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-2 border-b border-gray-700 last:border-b-0 hover:bg-gray-700"
            >
              <span>{food.name}</span>
              <span>{food.price}</span>
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-blue-500"
              />
            </div>
          ))}
        </div>

        {/* แสดงจำนวนผู้ใช้ */}
        <div className="h-64 overflow-y-auto border border-gray-700 rounded-md p-2 mt-4">
          {users.map((user, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-2 border-b border-gray-700 last:border-b-0 hover:bg-gray-700"
            >
              <span>{user}</span>
            </div>
          ))}
        </div>

        {/* ปุ่มยืนยัน */}
        <div className="flex justify-center mt-4">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg">
            ยืนยัน
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
