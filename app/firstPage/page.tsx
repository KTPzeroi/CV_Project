"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation"; // Import useRouter
import Navbar from "../components/Navbar";

const Page = () => {
  const router = useRouter();
  const [foodText, setFoodText] = useState("");
  const [priceText, setPriceText] = useState("");
  const [file, setFile] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [numUsers, setNumUsers] = useState("");
  const [userArray, setUserArray] = useState([]);
  const [foods, setFoods] = useState([]);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async (type) => {
    if (!file) {
      alert("Please upload a file first!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        `http://127.0.0.1:5000/upload?type=${type}`, // ส่ง type ไปใน query params
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (type === "Foods") {
        setFoodText(response.data.text); // แสดงผลข้อความที่ได้จาก OCR สำหรับ Foods
      } else if (type === "Prices") {
        setPriceText(response.data.text); // แสดงผลข้อความที่ได้จาก OCR สำหรับ Prices
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Error processing the image.");
    }
  };

  const handleGoForward = () => {
    // แยกค่าจาก foodText และ priceText โดยการ split บรรทัด
    const foodItems = foodText
      .split("\n")
      .map((item) => item.trim())
      .filter((item) => item);
    const priceItems = priceText
      .split("\n")
      .map((item) => item.trim())
      .filter((item) => item);

    // ตรวจสอบให้แน่ใจว่า foodItems และ priceItems มีจำนวนเท่ากัน
    if (foodItems.length !== priceItems.length) {
      alert("จำนวนรายการอาหารและราคาต้องเท่ากัน");
      return;
    }

    // สร้าง object foods
    const foodData = foodItems.map((food, index) => ({
      name: food,
      price: parseFloat(priceItems[index]), // แปลงราคาจาก string เป็นตัวเลข
    }));

    setFoods(foodData); // เก็บข้อมูล foods ใน state
    setIsModalOpen(true); // เปิด Popup

    // เก็บข้อมูลลงใน localStorage
    localStorage.setItem("foods", JSON.stringify(foodData));
    localStorage.setItem("users", JSON.stringify(userArray));
  };

  const handleConfirmUsers = () => {
    const num = parseInt(numUsers, 10);
    if (isNaN(num) || num <= 0) {
      alert("กรุณากรอกตัวเลขที่ถูกต้อง");
      return;
    }
    const users = Array.from({ length: num }, (_, i) => `User ${i + 1}`);
    setUserArray(users);
    setIsModalOpen(false); // ปิด Popup

    // เก็บข้อมูลผู้ใช้ลงใน localStorage
    localStorage.setItem("users", JSON.stringify(users));
    console.log("Users:", users); // แสดงผล array ของผู้ใช้
    console.log("Foods:", foods); // แสดงข้อมูล foods ใน console

    // Navigate to secPage
    router.push("/secPage");
  };

  return (
    <div className="bg-white font-title">
      <Navbar></Navbar>
      <div className="flex justify-center">
        <div className="container flex flex-col w-screen h-screen  items-center  ">
          <p className="mb-4 mt-6 font-bold text-xl text-black">รายการอาหาร</p>
          <input
            type="file"
            onChange={handleFileChange}
            className="bg-black file-input file-input-bordered w-full max-w-xs mb-2 file:bg-black file:text-white"
          />
          <button
            onClick={() => handleUpload("Foods")}
            className="btn bg-red-600 text-white w-full max-w-xs mb-8 text-base border-none"
          >
            อัพโหลดรูปรายการอาหาร 🍽️
          </button>

          <p className="mb-4 font-bold text-xl text-black">ราคาอาหารแต่ละจาน</p>
          <input
            type="file"
            onChange={handleFileChange}
            className="file-input file-input-bordered w-full max-w-xs mb-2  bg-black file:bg-black file:text-white"
          />
          <button
            onClick={() => handleUpload("Prices")}
            className="btn bg-red-600 text-white w-full max-w-xs mb-10 text-base border-none "
          >
            อัพโหลดรูปราคาอาหาร 🏷️
          </button>
          <div className="border w-screen"></div>
          <p className="font-bold text-xl text-black mt-6 mb-4 ">รายการอาหาร</p>
          <textarea
            placeholder="Foods"
            value={foodText}
            readOnly
            className="textarea textarea-bordered textarea-md w-full max-w-xs mb-2 bg-black text-white h-56 text-base"
          ></textarea>

          <p className="font-bold text-xl text-black mt-6 mb-4">
            ราคาอาหารแต่ละจาน
          </p>
          <textarea
            placeholder="Prices"
            value={priceText}
            readOnly
            className="textarea textarea-bordered textarea-md w-full max-w-xs bg-black text-white h-56 text-base"
          ></textarea>

          <button
            onClick={handleGoForward}
            className="btn btn-primary bg-red-600 text-white border-none mt-8 text-base mb-6"
          >
            หน้าต่อไป ➜
          </button>
          {isModalOpen && (
            <div className="modal modal-open ">
              <div className="modal-box bg-white">
                <h3 className="font-bold text-lg text-black">
                  กรอกจำนวนผู้ใช้
                </h3>
                <input
                  type="number"
                  value={numUsers}
                  onChange={(e) => setNumUsers(e.target.value)}
                  placeholder="กรอกจำนวนผู้ใช้"
                  className="input input-bordered w-full mt-4 bg-white border-black border-2 text-black text-base"
                />
                <div className="modal-action">
                  <button
                    onClick={handleConfirmUsers}
                    className="btn bg-red-600 text-white border-none"
                  >
                    Confirm
                  </button>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="btn bg-black text-white border-none"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
