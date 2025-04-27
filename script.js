const today = new Date(); // 2025 yılının 15 Nisan günü
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();

const boykotDaysInterval = 6; // Her 6 günde bir işaretleme yapılacak
let specialDays = []; // Özel işaretleme günlerini tutacak dizi

// Başlangıç tarihinden itibaren her 6 günde bir işaretleme yapılacak
function generateSpecialDays(startDate) {
  specialDays = [];
  let currentDate = new Date(startDate);

  for (let i = 0; i < 365 * 2; i++) { // 2 yıl boyunca işaretleme yapalım
    specialDays.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + boykotDaysInterval); // 6 gün sonrası
  }
}

// Takvimi oluştur
function generateCalendar() {
  const calendarContainer = document.getElementById("calendar");
  const monthYear = document.getElementById("month-year");
  calendarContainer.innerHTML = "";

  // Ayın ilk günü
  const firstDay = new Date(currentYear, currentMonth, 1);
  const lastDay = new Date(currentYear, currentMonth + 1, 0);
  const numDays = lastDay.getDate();
  
  // Ayın başlangıcı (Pazartesi ile başlayacak şekilde)
  const startDay = (firstDay.getDay() === 0) ? 6 : firstDay.getDay() - 1; // Eğer Pazar ise 6 (Pazartesi) olarak al, diğer günlerde bir azalt.

  // Ay ismi ve yılı güncelle
  monthYear.textContent = `${firstDay.toLocaleString('default', { month: 'long' })} ${currentYear}`;

  // Haftanın günleri (Pazartesi ile başla)
  const weekDays = ["Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi", "Pazar"];
  weekDays.forEach(day => {
    const dayElement = document.createElement("div");
    dayElement.classList.add("day");
    dayElement.textContent = day;
    dayElement.style.fontWeight = "bold";
    calendarContainer.appendChild(dayElement);
  });

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
    const currentDay = new Date(currentYear, currentMonth, i);
    if (specialDays.some(date => date.getDate() === currentDay.getDate() && date.getMonth() === currentDay.getMonth() && date.getFullYear() === currentDay.getFullYear())) {
      dayElement.classList.add("highlight");
    }

    // Bugünü işaretle
    if (i === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear()) {
      dayElement.classList.add("today");
      if (specialDays.some(date => date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear())) {
        document.getElementById("boykot-message").textContent = "Bugün Boykot" ;
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

// Başlangıçta özel günleri oluştur
generateSpecialDays(new Date(2025, 3, 9)); //Başlangıç

// Başlangıçta takvimi oluştur
generateCalendar();
