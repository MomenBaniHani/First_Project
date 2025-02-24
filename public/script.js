const apiUrl = "http://localhost:3001/api";

//read file
async function readFile() {
  const fileName = document.getElementById("readFileName").value;
  const respons = await fetch(`${apiUrl}/read?fileName=${fileName}`);
  const data = await respons.json();
  document.getElementById("readContent").textContent =
    data.content || data.console.error;
}
//write file
async function writeFile() {
  const fileName = document.getElementById("writeFileName").value;
  const content = document.getElementById("writeContent").value;
  await fetch(`${apiUrl}/write`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ fileName, content }),
  });
}

//append file
async function appendFile() {
  const fileName = document.getElementById("appendFileName").value;
  const content = document.getElementById("appendContent").value;
  await fetch(`${apiUrl}/write`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ fileName, content }),
  });
}
//delete file
async function deleteFile() {
  const fileName = document.getElementById("deleteFileName").value;
  await fetch(`${apiUrl}/delete?fileName=${fileName}`, { method: "DELETE" });
}

//rename file
async function renameFile() {
  const oldName = document.getElementById("oldFileName").value;
  const newName = document.getElementById("newFileName").value;
  await fetch(`${apiUrl}/rename`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ oldName, newName }),
  });
}

//create directory
async function createDirectory() {
  const dirName = document.getElementById("createDirName").value;
  await fetch(`${apiUrl}/create-dir`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ dirName }),
  });
}

//delete directory
async function deleteDirectory() {
  const dirName = document.getElementById("deleteDirName").value;
  await fetch(`${apiUrl}/delete-dir?dirName=${dirName}`, { method: "DELETE" });
}
