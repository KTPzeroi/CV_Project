"use client";
import React, { useState } from "react";
import axios from "axios";

const Page = () => {
  const [foodText, setFoodText] = useState(""); // สำหรับรายการอาหาร
  const [priceText, setPriceText] = useState(""); // สำหรับราคาอาหาร
  const [file, setFile] = useState(null);

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

      // ตรวจสอบว่าเป็นประเภทไหนแล้วตั้งค่าตัวแปรตามประเภท
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
    const foods = foodItems.map((food, index) => ({
      name: food,
      price: parseFloat(priceItems[index]), // แปลงราคาจาก string เป็นตัวเลข
    }));

    console.log(foods); // แสดงผล foods
  };

  return (
    <div className="container flex flex-col w-screen h-screen justify-center items-center">
      <p className="mb-4">รายการอาหาร</p>
      <input
        type="file"
        onChange={handleFileChange}
        className="file-input file-input-bordered w-full max-w-xs mb-2"
      />
      <button
        onClick={() => handleUpload("Foods")}
        className="btn btn-primary w-full max-w-xs mb-2"
      >
        Upload and Process (Foods)
      </button>

      <p className="mb-4">ราคาอาหารแต่ละจาน</p>
      <input
        type="file"
        onChange={handleFileChange}
        className="file-input file-input-bordered w-full max-w-xs mb-2"
      />
      <button
        onClick={() => handleUpload("Prices")}
        className="btn btn-primary w-full max-w-xs mb-6"
      >
        Upload and Process (Prices)
      </button>

      <p>รายการอาหาร</p>
      <textarea
        placeholder="Foods"
        value={foodText}
        readOnly
        className="textarea textarea-bordered textarea-lg w-full max-w-xs mb-2"
      ></textarea>

      <p>ราคาอาหารแต่ละจาน</p>
      <textarea
        placeholder="Prices"
        value={priceText}
        readOnly
        className="textarea textarea-bordered textarea-lg w-full max-w-xs"
      ></textarea>

      <button onClick={handleGoForward} className="btn btn-primary mt-4">
        ไปต่อค้าบ
      </button>
    </div>
  );
};

export default Page;
