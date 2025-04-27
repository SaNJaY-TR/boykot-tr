const today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();

const boykotDaysInterval = 6; // Her 6 günde bir işaretleme yapılacak

// Takvimi oluştur
function generateCalendar() {
  const calendarContainer = document.getElementById("calendar");
  const monthYear = document.getElementById("month-year");
  calendarContainer.innerHTML = "";

  // Ayın ilk günü
  const firstDay = new Date(currentYear, currentMonth, 1);
  const lastDay = new Date(currentYear, currentMonth + 1, 0);
  const numDays = lastDay.getDate();
  
  // Ayın başlangıcı
  const startDay = firstDay.getDay(); // Haftanın hangi günü olduğuna bakılır
  const totalDays = startDay + numDays; // Tüm günlerin sayısı

  // Ay ismi ve yılı güncelle
  monthYear.textContent = `${firstDay.toLocaleString('default', { month: 'long' })} ${currentYear}`;

  // Boş hücreler (Ayın ilk gününden önceki boşluklar)
  for (let i = 0; i < startDay; i++) {
    const emptyDay = document.createElement("div");
    calendarContainer.appendChild(emptyDay);
  }

  // Günleri oluştur
  for (let i = 1; i <= numDays; i++) {
    const dayElement = document.createElement("div");
    dayElement.classList.add("day");
    dayElement.textContent = i;

    // Her 6 günde bir işaretle
    if (i % boykotDaysInterval === 0) {
      dayElement.classList.add("highlight");
    }

    // Bugünü işaretle
    if (i === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear()) {
      dayElement.style.backgroundColor = "#ff9999"; // Bugünü vurgula
      if (i % boykotDaysInterval === 0) {
        document.getElementById("boykot-message").textContent = "Bugün Boykot Uyarısı!";
      }
    }

    calendarContainer.appendChild(dayElement);
  }
}

// Ayı değiştirme
document.getElementById("prev-month").addEventListener("click", () => {
  if (currentMonth === 0) {
    currentMonth = 11;
    currentYear--;
  } else {
    currentMonth--;
  }
  generateCalendar();
});

document.getElementById("next-month").addEventListener("click", () => {
  if (currentMonth === 11) {
    currentMonth = 0;
    currentYear++;
  } else {
    currentMonth++;
  }
  generateCalendar();
});

generateCalendar();
