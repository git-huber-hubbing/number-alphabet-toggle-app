const displayEl = document.getElementById('display');
const modeEl = document.getElementById('mode');
const toggleModeBtn = document.getElementById('toggle-mode');
const nextValueBtn = document.getElementById('next-value');

let currentMode = 'number'; // 'number' or 'alphabet'

function updateModeLabel() {
  if (currentMode === 'number') {
    modeEl.textContent = 'Mode: Numbers';
    toggleModeBtn.textContent = 'Switch to Alphabets';
  } else {
    modeEl.textContent = 'Mode: Alphabets';
    toggleModeBtn.textContent = 'Switch to Numbers';
  }
}

async function fetchNextValue() {
  const endpoint = currentMode === 'number' ? '/api/next-number' : '/api/next-letter';
  try {
    const res = await fetch(endpoint);
    const data = await res.json();
    displayEl.textContent = data.value;
  } catch (err) {
    console.error('Failed to fetch next value', err);
    displayEl.textContent = 'Error';
  }
}

toggleModeBtn.addEventListener('click', () => {
  currentMode = currentMode === 'number' ? 'alphabet' : 'number';
  updateModeLabel();
});

nextValueBtn.addEventListener('click', () => {
  fetchNextValue();
});

// Initialize UI
updateModeLabel();
