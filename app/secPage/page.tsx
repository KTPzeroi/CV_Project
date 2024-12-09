"use client";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [foods, setFoods] = useState([]);
  const [currentUserIndex, setCurrentUserIndex] = useState(0);
  const [users, setUsers] = useState([]);
  const [userSelections, setUserSelections] = useState([]);

  useEffect(() => {
    const savedFoods = localStorage.getItem("foods");
    const savedUsers = localStorage.getItem("users");

    if (savedFoods) {
      setFoods(JSON.parse(savedFoods));
    } else {
      setFoods([]);
    }

    if (savedUsers) {
      const usersArray = JSON.parse(savedUsers);
      setUsers(usersArray);
      setUserSelections(usersArray.map(() => [])); // เตรียม array ว่างสำหรับเก็บข้อมูลแต่ละ user
    }

    const timeout = setTimeout(() => {
      localStorage.removeItem("foods");
      localStorage.removeItem("users");
    }, 300000); // ลบข้อมูลหลังจาก 5 นาที

    return () => clearTimeout(timeout);
  }, []);

  const handleCheckboxChange = (food, isChecked) => {
    setUserSelections((prevSelections) => {
      const newSelections = [...prevSelections];
      const currentUserSelection = newSelections[currentUserIndex];

      if (isChecked) {
        // เพิ่มเมนูที่เลือก
        newSelections[currentUserIndex] = [...currentUserSelection, food];
      } else {
        // เอาเมนูที่ยกเลิกเลือกออก
        newSelections[currentUserIndex] = currentUserSelection.filter(
          (selectedFood) => selectedFood.name !== food.name
        );
      }

      return newSelections;
    });
  };

  const handleConfirm = () => {
    console.log("User Selections:", userSelections);

    // รีเซ็ตค่า checkbox ทั้งหมด
    const checkboxes = document.querySelectorAll("input[type='checkbox']");
    checkboxes.forEach((checkbox) => {
      checkbox.checked = false;
    });

    // เปลี่ยนผู้ใช้ถัดไป
    setCurrentUserIndex((prevIndex) => (prevIndex + 1) % users.length);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      <h1 className="text-4xl font-bold text-center text-white mt-4 mb-4">เมนูอาหาร</h1>

      <div className="flex flex-col justify-center items-center flex-grow">
        <div className="w-full max-w-md bg-gray-800 shadow-lg rounded-lg p-4 text-gray-100 mt-2">
          <h2 className="text-2xl font-semibold mb-4 text-center">{users[currentUserIndex]}</h2>

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
                  onChange={(e) =>
                    handleCheckboxChange(food, e.target.checked)
                  }
                />
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-4">
            <button
              onClick={handleConfirm}
              className="btn btn-primary"
            >
              ยืนยัน
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;










