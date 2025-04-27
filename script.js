const boykotDays = [15, 21, 27]; // İşaretlenecek günler
const today = new Date();
const currentDate = today.getDate(); // Bugünün tarihi

// Takvimi oluştur
function generateCalendar() {
  const calendarContainer = document.getElementById("calendar");
  calendarContainer.innerHTML = "";

  // Takvim için önceki ve sonraki ayları al
  const startDate = new Date(today.getFullYear(), today.getMonth(), 1);
  const endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  const numDays = endDate.getDate();

  // Her gün için bir hücre oluştur
  for (let i = 1; i <= numDays; i++) {
    const dayElement = document.createElement("div");
    dayElement.classList.add("day");
    dayElement.textContent = i;

    // Eğer bu gün işaretlenecek bir günse, highlight sınıfı ekle
    if (boykotDays.includes(i)) {
      dayElement.classList.add("highlight");
    }

    // Bugünse boykot uyarısı göster
    if (i === currentDate) {
      if (boykotDays.includes(i)) {
        document.getElementById("boykot-message").textContent = "Bugün Boykot Uyarısı!";
      } else {
        document.getElementById("boykot-message").textContent = "";
      }
    }

    calendarContainer.appendChild(dayElement);
  }
}

generateCalendar();
