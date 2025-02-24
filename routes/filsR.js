//const { error } = require("console");
const express = require("express");
const path = require("path");
const fs = require("fs").promises;
const router = express.Router(); // like app.get  but router Organizes tracks better

//// Helper function to get absolute file path (prevents path traversal attacks)
//// هاي الدالة بترجع المسار الكامل للملف جوّا مجلد التخزين بطريقة آمنة
const getFilePath = (fileName) =>
  path.join(__dirname, "..", "storage", path.basename(fileName));

//GET
router.get("/read", async (req, res) => {
  try {
    const data = await fs.readFile(getFilePath(req.query.fileName), "utf-8");
    res.json({ content: data });
  } catch (err) {
    res.status(404).json({ error: "File Not Found" });
  }
});

//POST WRITE
router.post("/write", async (req, res) => {
  try {
    await fs.writeFile(
      getFilePath(req.body.fileName),
      req.body.content,
      "utf-8"
    );
    res.json({ message: "File written successfully" });
  } catch (err) {
    console.log("Response Object:", res);

    res.status(500).json({ error: err.message });
  }
});

//POST APPEND
router.post("/append", async (req, res) => {
  const { fileName, content } = req.body;
  try {
    await fs.appendFile(getFilePath(fileName), content, "utf-8");
    res.json({ message: "Content Apend Sucessfuly" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//PUT
router.put("/rename", async (req, res) => {
  const { oldName, newName } = req.body;
  if (!oldName || !newName) {
    res.status(500).json({ error: "Both names file old and new are required" });
  }
  const oldFilePath = getFilePath(oldName);
  const newFilePath = getFilePath(newName);
  try {
    //check if the old file are exist
    await fs.access(oldFilePath);

    await fs.rename(oldFilePath, newFilePath);
    res.json({ message: "File Renamed Sucessfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//POST TO CREATE DIRECTORY
router.post("/create-dir", async (req, res) => {
  const { dirName } = req.body;
  if (!dirName) {
    return res.status(400).json({ error: "Directory name is required" });
  }
  const dirPath = getFilePath(dirName);
  try {
    await fs.mkdir(dirPath, { recursive: true }); //creates nested directories if needed
    res.json({ message: "Directory Created Sucessfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//DELETE DIRECTORY
router.delete("/delete-dir", async (req, res) => {
  const { dirName } = req.query; // same req.body but we use .query for security
  if (!dirName) {
    res.status(400).json({ error: "Directory Name is Required" });
  }
  const dirPath = getFilePath(dirName);
  try {
    await fs.rm(dirPath, { recursive: true, force: true }); //Removes files and directories
    res.json({ message: "Directory deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//DELETE BASIC
router.delete("/delete", async (req, res) => {
  try {
    await fs.unlink(getFilePath(req.query.fileName)); // remove file
    res.json({ message: "File deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
module.exports = router;//// تصدير كائن الراوتر حتى نقدر نستدعيه واستخدامه في ملفات ثانية مثل server.js
//يعني عشان اقدر استخدمه بملفات ثانيه

