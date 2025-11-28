const diaryInput = document.getElementById("diaryText");
const entriesSection = document.getElementById("entries");
const saveButton = document.getElementById("saveEntry");
const themeButton = document.getElementById("toggleTheme");

let diaryEntries = JSON.parse(localStorage.getItem("diary")) || [];

// Tampilkan diary
function displayEntries() {
    entriesSection.innerHTML = "";
    diaryEntries.forEach((entry, index) => {
        const div = document.createElement("div");
        div.className = "entry";
        div.innerHTML = `
            <p>${entry.text}</p>
            <small>${entry.date}</small><br>
            <button onclick="deleteEntry(${index})">Hapus</button>
        `;
        entriesSection.appendChild(div);
    });
}

// Tambah diary
saveButton.addEventListener("click", () => {
    const text = diaryInput.value.trim();
    if (!text) return alert("Isinya tidak boleh kosong!");

    const newEntry = {
        text,
        date: new Date().toLocaleString()
    };

    diaryEntries.unshift(newEntry);
    localStorage.setItem("diary", JSON.stringify(diaryEntries));

    diaryInput.value = "";
    displayEntries();
});

// Hapus entry
function deleteEntry(index) {
    diaryEntries.splice(index, 1);
    localStorage.setItem("diary", JSON.stringify(diaryEntries));
    displayEntries();
}

// Theme toggle
themeButton.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    themeButton.textContent = document.body.classList.contains("dark") ? "Light Mode" : "Dark Mode";
});

// Load awal
displayEntries();
