// script.js

// Mood selector
const moodOptions = document.querySelectorAll('#mood-options span');
moodOptions.forEach(mood => {
  mood.addEventListener('click', () => {
    moodOptions.forEach(m => m.classList.remove('selected'));
    mood.classList.add('selected');
  });
});

// Highlight current weekday
const today = new Date();
const dayIndex = today.getDay();
const weekdays = document.querySelectorAll('#weekdays span');
weekdays[dayIndex].classList.add('current-day');

// Add schedule
function addSchedule() {
  const timeInput = document.getElementById('time');
  const activityInput = document.getElementById('activity');
  const scheduleList = document.getElementById('schedule-list');

  const time = timeInput.value.trim();
  const activity = activityInput.value.trim();

  if (time && activity) {
    const li = document.createElement('li');
    li.textContent = `${time} - ${activity}`;
    scheduleList.appendChild(li);
    timeInput.value = '';
    activityInput.value = '';
  }
}

// Water intake logic
const waterContainer = document.getElementById('water-glasses');
for (let i = 0; i < 8; i++) {
  const glass = document.createElement('span');
  glass.addEventListener('click', () => {
    glass.classList.toggle('full');
  });
  waterContainer.appendChild(glass);
}

// Fruit intake logic
const fruitContainer = document.getElementById('fruit-apples');
for (let i = 0; i < 5; i++) {
  const apple = document.createElement('span');
  apple.addEventListener('click', () => {
    apple.classList.toggle('eaten');
  });
  fruitContainer.appendChild(apple);
}
