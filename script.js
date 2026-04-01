let selectedSex = null;

function selectSex(btn, sex) {
  selectedSex = sex;
  document.querySelectorAll(".sexButton").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
}

function calculate() {
  const weight = parseFloat(document.querySelector(".bodyWeight").value);
  const heightFt = parseFloat(document.querySelector(".heightFt").value)
  const heightIn = parseFloat(document.querySelector(".heightIn").value);
  const height = (heightFt * 12) + heightIn;
  const age = parseFloat(document.querySelector(".age").value);

  const activityFactor = parseFloat(document.querySelector(".activitySelect").value);

  //Input Check
  if (!weight || !height || !age || !selectedSex || !activityFactor) {
    document.getElementById("result").textContent = "Please fill in all fields.";
    return;
  }

  // Mifflin-St Jeor BMR (imperial: lbs & inches)
  const bmrBase = (4.536 * weight) + (12.7 * height) - (5 * age);
  const bmr = selectedSex === "male" ? bmrBase + 5 : bmrBase - 161;

  const tdee = bmr * activityFactor;

  document.getElementById("result").textContent =
    `BMR: ${Math.round(bmr)} cal/day | TDEE: ${Math.round(tdee)} cal/day`;
}
