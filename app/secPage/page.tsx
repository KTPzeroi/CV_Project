"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";

const SecPage = () => {
  const [foods, setFoods] = useState([]);
  const [currentUserIndex, setCurrentUserIndex] = useState(0);
  const [users, setUsers] = useState([]);
  const [userSelections, setUserSelections] = useState([]);
  const router = useRouter();

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
    // คำนวณราคาใหม่ โดยหารตามจำนวนคนที่เลือกเมนูซ้ำกัน
    const updatedSelections = foods.map((food) => {
      const count = userSelections.filter((selection) =>
        selection.some((selectedFood) => selectedFood.name === food.name)
      ).length;

      if (count > 1) {
        return { ...food, price: food.price / count };
      }
      return food;
    });

    // บันทึกข้อมูลลงใน localStorage
    localStorage.setItem("userSelections", JSON.stringify(userSelections));
    localStorage.setItem(
      "calculatedSelections",
      JSON.stringify(updatedSelections)
    );

    // ไปยังผู้ใช้คนถัดไปหรือหน้า thirdPage
    if (currentUserIndex === users.length - 1) {
      router.push("/thirdPage");
    } else {
      setCurrentUserIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handleBack = () => {
    if (currentUserIndex > 0) {
      setCurrentUserIndex((prevIndex) => prevIndex - 1);
    }
  };

  return (
    <div className="font-title">
      <Navbar></Navbar>
      <div className="flex flex-col min-h-screen bg-white">
        <h1 className="text-xl font-bold text-center text-black mt-6 ">
          เมนูอาหาร
        </h1>
        <div className="flex flex-col items-center flex-grow">
          <div className="w-screen max-w-md   rounded-lg p-4   text-black ">
            <h2 className="text-2xl font-semibold mb-4 text-center">
              {users[currentUserIndex]}
            </h2>

            <div className="h-64 overflow-y-auto border border-zinc-300 border-2 rounded-2xl p-2  text-black font-bold ">
              {foods.map((food, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-2 border-b  "
                >
                  <span>{food.name}</span>
                  <span>{food.price}</span>
                  <input
                    type="checkbox"
                    className="form-checkbox h-5 w-5  checkbox border-2 border-black "
                    checked={userSelections[currentUserIndex]?.some(
                      (selectedFood) => selectedFood.name === food.name
                    )}
                    onChange={(e) =>
                      handleCheckboxChange(food, e.target.checked)
                    }
                  />
                </div>
              ))}
            </div>

            <div className="flex justify-between mt-4">
              <button
                onClick={handleBack}
                className="btn bg-gray-600 text-white text-base border-none "
                disabled={currentUserIndex === 0}
              >
               ◀ ย้อนกลับ  
              </button>
              <button
                onClick={handleConfirm}
                className="btn bg-red-600 text-white text-base border-none "
              >
                ยืนยัน ✔
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecPage;

