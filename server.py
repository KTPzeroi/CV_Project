from flask import Flask, request, jsonify
from flask_cors import CORS
from PIL import Image
import pytesseract
import os

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

@app.route("/upload", methods=["POST"])
def upload_file():
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["file"]
    if file.filename == "":
        return jsonify({"error": "No file selected"}), 400

    # ตัวเลือกประเภทการประมวลผล (Foods หรือ Prices)
    process_type = request.args.get("type", "Foods")  # ค่าเริ่มต้นเป็น Foods

    # บันทึกไฟล์
    file_path = os.path.join(app.config["UPLOAD_FOLDER"], file.filename)
    file.save(file_path)

    try:
        # ใช้ pytesseract OCR
        image = Image.open(file_path)
        text = pytesseract.image_to_string(image, lang="eng+tha")  # อ่านภาษาไทยและอังกฤษ

        # ตัดบรรทัดที่ไม่มีข้อมูลออก
        filtered_text = "\n".join([line.strip() for line in text.splitlines() if line.strip()])

        # ลบไฟล์หลังประมวลผล
        os.remove(file_path)

        # เพิ่มข้อความที่แยกได้ตามประเภท
        if process_type == "Foods":
            return jsonify({"text": f"{filtered_text}"})
        elif process_type == "Prices":
            return jsonify({"text": f"{filtered_text}"})
        else:
            return jsonify({"error": "Invalid type specified"}), 400

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000, debug=True)
