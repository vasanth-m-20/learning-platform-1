// --- STATE ---
let user = null;
let currentTopicIndex = 0;
let currentScore = 0;
let currentReelUrl = ""; 
let scrollObserver = null; 
let isScrolling = false;
let isReteachMode = false; 
let questionStartTime = 0;
let questionTimes = [];
let DB_TOPICS = []; // Will be set to DB_TOPICS_PYTHON or DB_TOPICS_JAVA

// NEW: Timer state
let timeUntilDeduction = 60; // Seconds before losing a point on Home

// --- INIT ---
(async () => {
  stopAllVideos();
  document.body.style.overflow = "hidden"; 
  createOverlay();

  const data = await chrome.storage.local.get(["sgUser", "sgTopicIndex", "sgIsScrolling", "sgIsReteachMode"]);
  
  if (data.sgTopicIndex) currentTopicIndex = data.sgTopicIndex;
  if (data.sgIsReteachMode) isReteachMode = data.sgIsReteachMode;
  
  if (data.sgUser) {
    user = data.sgUser;
    if (user.points === undefined) user.points = 0;

    // SET THE CORRECT TOPIC DATABASE BASED ON USER'S DOMAIN
    DB_TOPICS = user.domain === 'java' ? DB_TOPICS_JAVA : DB_TOPICS_PYTHON;

    if (data.sgIsScrolling && user.points > 0) {
      startScrollMode(); 
    } else {
      showLogin(true); 
    }
  } else {
    showLogin(false); 
  }
})();

function stopAllVideos() {
    const videos = document.querySelectorAll('video');
    videos.forEach(vid => { vid.pause(); vid.muted = true; });
}

// --- UI BUILDERS ---
function createOverlay() {
  if (document.getElementById('sg-overlay')) return;
  const div = document.createElement('div');
  div.id = 'sg-overlay';
  document.body.appendChild(div);
}

function render(html) {
  createOverlay();
  const overlay = document.getElementById('sg-overlay');
  overlay.style.display = 'flex'; 
  overlay.innerHTML = html;
  stopAllVideos();
}

// --- 1. LOGIN (FIXED VALIDATION FOR NEW USERS) ---
function showLogin(isReturning) {
  render(`
    <div class="sg-card login-card">
      <div class="logo-wrapper"><div class="logo-icon">🚀</div></div>
      <h1>${isReturning ? 'Welcome Back' : 'Spartans'}</h1>
      <p class="sub-text">${isReturning ? 'Enter password to unlock.' : 'Setup your profile.'}</p>
      
      ${!isReturning ? `
        <div class="input-wrapper">
            <span class="input-icon">👤</span>
            <input type="text" id="sg-name" placeholder="Full Name (Optional)">
        </div>
        <div class="input-wrapper">
            <span class="input-icon">📅</span>
            <input type="date" id="sg-dob" placeholder="DOB">
        </div>
        <div class="input-wrapper">
            <span class="input-icon">📚</span>
            <select id="sg-domain">
                <option value="python">Python Programming</option>
                <option value="java">Java Programming</option>
            </select>
        </div>
      ` : ''}

      <div class="input-wrapper">
        <span class="input-icon">🔒</span>
        <input type="password" id="sg-pass" placeholder="Password (Required)">
      </div>
      
      <button class="sg-btn primary-btn" id="login-btn">${isReturning ? 'Unlock Feed' : 'Start Learning'}</button>
      ${isReturning ? `<p id="sg-error" class="error-msg"></p>` : ''}
    </div>
  `);

  document.getElementById('login-btn').onclick = () => {
    const pass = document.getElementById('sg-pass').value;
    if (isReturning) {
      if (pass === user.password) showChoice();
      else document.getElementById('sg-error').innerText = "Incorrect Password";
    } else {
      // FIX START: Make name and dob optional and use domain to set DB_TOPICS
      let name = document.getElementById('sg-name').value.trim();
      let dob = document.getElementById('sg-dob').value;
      const domain = document.getElementById('sg-domain').value;
      
      // Use default values if fields are empty
      name = name || 'Anonymous Learner'; 
      dob = dob || '2000-01-01'; // Use a default date if not provided
      
      // Now, only strictly require the password.
      if (pass) {
        user = { name, dob, domain, password: pass, points: 0 };
        // Set the global DB_TOPICS based on selection
        DB_TOPICS = domain === 'java' ? DB_TOPICS_JAVA : DB_TOPICS_PYTHON; 
        chrome.storage.local.set({ sgUser: user, sgTopicIndex: 0 });
        showChoice();
      } else {
          alert("Please enter a Password to secure your profile."); 
      }
      // FIX END
    }
  };
}

// --- 2. CHOICE ---
function showChoice() {
  // DB_TOPICS is now correctly set in INIT or LOGIN
  if (currentTopicIndex >= DB_TOPICS.length) {
      render(`<div class="sg-card"><h1>🏆 Course Complete!</h1><button class="sg-btn primary-btn" onclick="reset()">Restart</button></div>`);
      window.reset = () => { currentTopicIndex=0; chrome.storage.local.set({sgTopicIndex:0}); showChoice(); };
      return;
  }

  const topic = DB_TOPICS[currentTopicIndex];
  const modeTitle = isReteachMode ? "Reteach Mode" : "Learn Mode";
  const modeColor = isReteachMode ? "#ff4444" : "#4cc9f0";

  render(`
    <div class="sg-card">
      <div style="margin-bottom:10px; color:${modeColor}; font-weight:800; letter-spacing:2px;">${modeTitle}</div>
      <h2>Topic: <span style="color:#fff">${topic.name}</span></h2>
      <div class="stats-row">
         <div class="stat-card">
            <span class="stat-label">Balance</span>
            <div class="stat-value">${user.points} <span style="font-size:0.5em; color:#888;">Pts</span></div>
         </div>
      </div>
      <div class="btn-grid">
        <button class="sg-btn primary-btn" id="btn-watch">▶ Watch Video</button>
        <button class="sg-btn secondary-btn" id="btn-quiz">✏️ Take Quiz</button>
      </div>
    </div>
  `);
  
  document.getElementById('btn-watch').onclick = () => showVideo(topic);
  document.getElementById('btn-quiz').onclick = () => runQuiz(topic);
}

function showVideo(topic) {
  const videoUrl = isReteachMode ? topic.video_reteach : topic.video_main;
  render(`
    <div class="sg-card wide">
      <h2>📺 ${isReteachMode ? "Reteach" : "Learn"}: <span style="color:#4cc9f0">${topic.name}</span></h2>
      <div class="video-wrapper">
        <iframe src="${videoUrl}" sandbox="allow-scripts allow-same-origin allow-presentation" frameborder="0"></iframe>
      </div>
      <button class="sg-btn primary-btn pulse" id="btn-finish-video">I Finished Watching → Take Quiz</button>
    </div>
  `);
  document.getElementById('btn-finish-video').onclick = () => runQuiz(topic);
}

// --- 3. QUIZ ---
function runQuiz(topic) {
  currentScore = 0;
  let qIndex = 0;
  questionTimes = [];
  const questions = isReteachMode ? topic.questions_batch_2 : topic.questions_batch_1;
  
  const nextQuestion = () => {
    if (qIndex >= questions.length) { finishQuiz(topic, questions.length); return; }
    const qData = questions[qIndex];
    questionStartTime = Date.now();

    render(`
      <div class="sg-card">
        <div style="display:flex; justify-content:space-between; margin-bottom:20px; color:#888; font-weight:bold; font-size:1.2rem;">
            <span>QUIZ: ${topic.name}</span>
            <span id="live-score" style="color:${currentScore >= 0 ? '#4cc9f0' : '#ef4444'}">Score: ${currentScore}</span>
        </div>
        <p class="question-text">Q${qIndex + 1}: ${qData.q}</p>
        <div class="options-grid">
          ${qData.o.map((opt, i) => `<button class="opt-btn" id="opt-${i}">${opt}</button>`).join('')}
        </div>
      </div>
    `);

    qData.o.forEach((_, i) => {
      document.getElementById(`opt-${i}`).onclick = function() {
        this.style.background = (i === qData.a) ? "rgba(34, 197, 94, 0.3)" : "rgba(239, 68, 68, 0.3)";
        this.style.borderColor = (i === qData.a) ? "#22c55e" : "#ef4444";
        const elapsed = ((Date.now() - questionStartTime) / 1000).toFixed(1);
        questionTimes.push(elapsed);
        if (i === qData.a) currentScore++; else currentScore--; 
        const sEl = document.getElementById('live-score');
        if(sEl) { sEl.innerText = `Score: ${currentScore}`; sEl.style.color = currentScore >= 0 ? '#4cc9f0' : '#ef4444'; }
        setTimeout(() => { qIndex++; nextQuestion(); }, 700);
      };
    });
  };
  nextQuestion();
}

function finishQuiz(topic, totalQuestions) {
  const passed = currentScore >= 3; 
  const timeLogHTML = questionTimes.map((t, i) => `<li><span>Q${i+1}</span><span>${t}s</span></li>`).join('');

  if (passed) {
    if (currentScore > 0) user.points += currentScore; 
    isReteachMode = false; 
    chrome.storage.local.set({ sgUser: user, sgIsReteachMode: false });

    render(`
      <div class="sg-card">
        <h1 style="color:#22c55e">🎉 Mission Passed!</h1>
        <div class="stats-row">
            <div class="stat-card"><span class="stat-label">Score</span><div class="stat-value" style="color:#22c55e">${currentScore}/${totalQuestions}</div></div>
            <div class="stat-card"><span class="stat-label">Balance</span><div class="stat-value" style="color:#ffd700">${user.points}</div></div>
        </div>
        <div class="time-log"><ul>${timeLogHTML}</ul></div>
        <div class="action-grid">
            <button class="sg-btn primary-btn" id="btn-scroll">Spend Points (Unlock)</button>
            <button class="sg-btn secondary-btn" id="btn-next">Save & Next Topic ➡</button>
        </div>
      </div>
    `);
    document.getElementById('btn-scroll').onclick = startScrollMode;
    document.getElementById('btn-next').onclick = () => forceNextTopic();
  } else {
    isReteachMode = true;
    chrome.storage.local.set({ sgIsReteachMode: true });
    render(`
      <div class="sg-card">
        <h1 style="color:#ef4444">⚠️ Failed</h1>
        <div class="stats-row">
            <div class="stat-card"><span class="stat-label">Score</span><div class="stat-value" style="color:#ef4444">${currentScore}/${totalQuestions}</div></div>
            <div class="stat-card"><span class="stat-label">Need</span><div class="stat-value">3 / 5</div></div>
        </div>
        <button class="sg-btn primary-btn" id="btn-reteach">📺 Watch Reteach Video</button>
      </div>
    `);
    document.getElementById('btn-reteach').onclick = () => showVideo(topic);
  }
}

// --- 4. SCROLL MODE (THE FIX) ---
function startScrollMode() {
  document.getElementById('sg-overlay').style.display = 'none';
  document.body.style.overflow = "auto"; // Allow scroll
  chrome.storage.local.set({ sgIsScrolling: true });

  // Create Timer UI if missing
  let timerDiv = document.getElementById('sg-timer');
  if (!timerDiv) {
    timerDiv = document.createElement('div');
    timerDiv.id = 'sg-timer';
    document.body.appendChild(timerDiv);
  }
  
  currentReelUrl = window.location.href;
  timeUntilDeduction = 60; // Reset min timer
  
  // Initial UI update
  updateTimerUI("START");

  if (scrollObserver) clearInterval(scrollObserver);

  // Runs every 1 second
  scrollObserver = setInterval(() => {
      const currentUrl = window.location.href;
      const isReels = currentUrl.includes("/reels/");

      if (isReels) {
          // --- REELS LOGIC (Swipe Cost) ---
          if (currentUrl !== currentReelUrl) {
              currentReelUrl = currentUrl;
              user.points--; 
              chrome.storage.local.set({ sgUser: user });
          }
          updateTimerUI("REELS");
      } 
      else {
          // --- HOME LOGIC (Time Cost) ---
          timeUntilDeduction--;
          if (timeUntilDeduction <= 0) {
              user.points--;
              timeUntilDeduction = 60;
              chrome.storage.local.set({ sgUser: user });
          }
          updateTimerUI("HOME");
      }

      // STOP if 0 points
      if (user.points <= 0) stopScrollMode(true);

  }, 1000);
}

function updateTimerUI(mode) {
    const div = document.getElementById('sg-timer');
    if (!div) return;

    let subText = "";
    if (mode === "REELS") subText = "Swipe = -1 Pt";
    else subText = `Next -1 in: ${timeUntilDeduction}s`;

    div.innerHTML = `
        <div style="display:flex; flex-direction:column; align-items:flex-start;">
            <div class="reel-count">💎 ${user.points}</div>
            <div class="reel-label">${subText}</div>
        </div>
        <button id="sg-exit-btn">EXIT</button>
    `;

    // Bind Exit Button
    document.getElementById('sg-exit-btn').onclick = () => stopScrollMode(false);
}

function stopScrollMode(forced = false) {
  clearInterval(scrollObserver);
  const timerDiv = document.getElementById('sg-timer');
  if(timerDiv) timerDiv.remove();
  
  document.body.style.overflow = "hidden"; 
  stopAllVideos(); 
  
  if (forced) {
    user.points = 0;
    chrome.storage.local.set({ sgUser: user, sgIsScrolling: false });
    forceNextTopic(); 
  } else {
    chrome.storage.local.set({ sgIsScrolling: false });
    // FIX: When manually exiting, assume topic is complete and move to the next one.
    forceNextTopic(); 
  }
  document.getElementById('sg-overlay').style.display = 'flex';
}

function forceNextTopic() {
    currentTopicIndex++;
    isReteachMode = false; 
    chrome.storage.local.set({ sgTopicIndex: currentTopicIndex, sgIsReteachMode: false });
    showChoice();
}