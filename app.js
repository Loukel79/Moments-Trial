const state = {
  step: 0,
  availability: "",
  location: "",
  need: "",
  connected: "",
  safe: "",
  useAgain: "",
  useful: "",
  change: ""
};

// Paste your live survey link here. Works with Google Forms, Tally, Typeform or Microsoft Forms.
// Example: const SURVEY_URL = "https://forms.gle/your-form-link";
const SURVEY_URL = "https://forms.gle/7tKftafw9rZfwZBeA";

const totalSteps = 13;
const screen = document.getElementById("screen");
const progressBar = document.getElementById("progressBar");
const stepLabel = document.getElementById("stepLabel");
const resetBtn = document.getElementById("resetBtn");

const availabilityOptions = ["15 minutes", "30 minutes", "45 minutes", "1 hour"];
const locationOptions = ["Central Auckland", "Britomart", "Karangahape Road", "Ponsonby", "Grey Lynn", "Morningside", "Media Design School", "Auckland Art Gallery", "Commercial Bay", "Other"];
const needOptions = ["Encouragement", "Perspective", "I feel professionally stuck", "Talk through an idea", "Creative reset", "Feel connected", "Career shift", "Low-pressure conversation"];
const scaleOptions = ["Yes", "Somewhat", "No"];
const useAgainOptions = ["Yes", "Maybe", "No"];

function setStep(nextStep) {
  state.step = Math.max(0, Math.min(totalSteps - 1, nextStep));
  render();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function resetPrototype() {
  Object.assign(state, {
    step: 0,
    availability: "",
    location: "",
    need: "",
    connected: "",
    safe: "",
    useAgain: "",
    useful: "",
    change: ""
  });
  render();
}

function selectOption(key, value) {
  state[key] = value;
  render();
}

function updateText(key, value) {
  state[key] = value;
}

function buildSurveyUrl() {
  if (!SURVEY_URL || SURVEY_URL === "PASTE_YOUR_SURVEY_LINK_HERE") {
    alert("Paste your live survey link into app.js where it says SURVEY_URL, then upload the prototype again.");
    return;
  }

  window.open(SURVEY_URL, "_blank", "noopener,noreferrer");
}

function safeAttr(text) {
  return String(text).replace(/'/g, "&#39;").replace(/\"/g, "&quot;");
}

function optionButtons(options, key) {
  return `<div class="option-grid">${options.map(option => `
    <button class="option-btn ${state[key] === option ? "selected" : ""}" type="button" onclick="selectOption('${key}', '${safeAttr(option)}')">${option}</button>
  `).join("")}</div>`;
}

function actions(primary, next, secondary = null, disabled = false) {
  return `<div class="actions">
    <button class="btn btn-primary" type="button" ${disabled ? "disabled" : ""} onclick="setStep(${next})">${primary}</button>
    ${secondary ? `<button class="btn btn-secondary" type="button" onclick="setStep(${secondary.step})">${secondary.label}</button>` : ""}
  </div>`;
}

function backAction() {
  return state.step > 0 ? `<button class="btn btn-text" type="button" onclick="setStep(${state.step - 1})">Back</button>` : "";
}

const screens = [
  () => `
    <div class="screen-content">
      <p class="kicker">Meet Moments</p>
      <h1>Because moments like this matter.</h1>
      <p class="lead">A location-aware service that helps women in design access spontaneous, in-person peer connection at the moment they need it.</p>
      <p class="statement">A quiet signal for connection, not another networking platform.</p>
      <div class="info-card">
        <p class="small"><strong>Prototype note:</strong> This version tests the flow, language and trust model. It does not use real GPS, live accounts or real matching.</p>
      </div>
      ${actions("Start a Moment", 1, {label: "Skip intro", step: 2})}
    </div>`,

  () => `
    <div class="screen-content">
      <p class="kicker">How it works</p>
      <h2>A small pause in a full life.</h2>
      <p class="lead">You let Moments know you are available, choose where you are, and name what kind of peer support would be useful.</p>
      <ul class="bullet-list">
        <li>No networking performance.</li>
        <li>No long-term commitment.</li>
        <li>No pressure to explain more than you want to.</li>
        <li>Just one useful moment of face-to-face connection.</li>
      </ul>
      ${actions("I’m available", 2)}
      ${backAction()}
    </div>`,

  () => `
    <div class="screen-content">
      <p class="kicker">Availability</p>
      <h2>How much time do you have?</h2>
      <p class="muted">Moments are designed to fit into real life, between work, study, care, commuting and everything else.</p>
      ${optionButtons(availabilityOptions, "availability")}
      ${actions("Next", 3, null, !state.availability)}
      ${backAction()}
    </div>`,

  () => `
    <div class="screen-content">
      <p class="kicker">Approximate location</p>
      <h2>Where are you?</h2>
      <p class="muted">Choose your area. Your exact location is not shared.</p>
      ${optionButtons(locationOptions, "location")}
      <div class="info-card"><p class="small">For this prototype, location is manually selected so testers can focus on trust and usefulness, not technical accuracy.</p></div>
      ${actions("Next", 4, null, !state.location)}
      ${backAction()}
    </div>`,

  () => `
    <div class="screen-content">
      <p class="kicker">Need state</p>
      <h2>What kind of Moment would help?</h2>
      <p class="muted">Choose the closest fit. You can keep it light.</p>
      ${optionButtons(needOptions, "need")}
      ${actions("Find a Moment", 5, null, !state.need)}
      ${backAction()}
    </div>`,

  () => `
    <div class="screen-content">
      <p class="kicker">Looking nearby</p>
      <h2>Finding a possible Moment.</h2>
      <div class="loader" aria-hidden="true"></div>
      <p class="muted">Checking for another woman in design who is nearby, available and open to a similar conversation.</p>
      <div class="info-card dark"><p class="small">This is simulated. In testing, the aim is to understand whether this interaction feels clear, safe and useful.</p></div>
      ${actions("Show simulated match", 6)}
      ${backAction()}
    </div>`,

  () => `
    <div class="screen-content">
      <p class="kicker">Possible Moment</p>
      <h2>Someone is nearby.</h2>
      <div class="profile-card">
        <div class="profile-top">
          <div class="avatar" aria-hidden="true">S</div>
          <div>
            <h3>Serena</h3>
            <p>Senior designer, freelance and contract</p>
          </div>
        </div>
        <div class="shared">
          <p class="small">Also available for ${state.availability || "30 minutes"}</p>
          <p class="small">Open to, ${state.need || "perspective"}</p>
          <p class="small">Nearby, ${state.location || "Central Auckland"}</p>
        </div>
      </div>
      <p class="muted">Only limited profile information is shown before both people agree.</p>
      ${actions("Request this Moment", 7, {label: "Not now", step: 12})}
      ${backAction()}
    </div>`,

  () => `
    <div class="screen-content">
      <p class="kicker">Trust first</p>
      <h2>Before you request.</h2>
      <p class="lead">Moments are designed around public places, mutual consent and easy exit.</p>
      <ul class="bullet-list">
        <li>Meet in a public place.</li>
        <li>Your exact location is not shared automatically.</li>
        <li>Both people need to agree before a Moment is confirmed.</li>
        <li>You can cancel at any time.</li>
        <li>You are never expected to disclose more than you want to.</li>
      </ul>
      ${actions("I understand, send request", 8)}
      ${backAction()}
    </div>`,

  () => `
    <div class="screen-content">
      <p class="kicker">Request sent</p>
      <h2>Waiting for Serena.</h2>
      <p class="lead">Your request has been sent. A Moment only happens if both people agree.</p>
      <div class="loader" aria-hidden="true"></div>
      ${actions("Simulate acceptance", 9, {label: "Cancel request", step: 12})}
      ${backAction()}
    </div>`,

  () => `
    <div class="screen-content">
      <p class="kicker">Confirmed</p>
      <h2>Your Moment is confirmed.</h2>
      <div class="info-card dark">
        <p><strong>Where</strong><br>Public café near ${state.location || "Britomart"}</p>
        <p><strong>When</strong><br>Today, 2:30pm, ${state.availability || "30 minutes"}</p>
      </div>
      <p class="statement">Start with, “What would be useful for you to talk through today?”</p>
      ${actions("I’m on my way", 10, {label: "Cancel Moment", step: 12})}
      ${backAction()}
    </div>`,

  () => `
    <div class="screen-content">
      <p class="kicker">For the conversation</p>
      <h2>You do not need to perform.</h2>
      <p class="muted">Use one prompt, or ignore them and begin where you are.</p>
      <div class="prompt-list">
        <div class="prompt-card">What is feeling hard right now?</div>
        <div class="prompt-card">What are you trying to make sense of?</div>
        <div class="prompt-card">What would help you leave feeling clearer?</div>
        <div class="prompt-card">What is one thing you want to be reminded of?</div>
      </div>
      ${actions("Finish Moment", 11)}
      ${backAction()}
    </div>`,

  () => `
    <div class="screen-content">
      <p class="kicker">Reflection</p>
      <h2>How was your Moment?</h2>
      <p class="muted">These answers help test whether the idea is useful, safe and worth developing.</p>
      <div class="field"><label>Did this Moment help you feel more connected?</label>${optionButtons(scaleOptions, "connected")}</div>
      <div class="field"><label>Did it feel safe enough?</label>${optionButtons(scaleOptions, "safe")}</div>
      <div class="field"><label>Would you use this again?</label>${optionButtons(useAgainOptions, "useAgain")}</div>
      <div class="field"><label>What felt most useful?</label><textarea oninput="updateText('useful', this.value)">${state.useful}</textarea></div>
      <div class="field"><label>What would need to change?</label><textarea oninput="updateText('change', this.value)">${state.change}</textarea></div>
      ${actions("Submit reflection", 12, null, !(state.connected && state.safe && state.useAgain))}
      ${backAction()}
    </div>`,

  () => `
    <div class="screen-content">
      <p class="kicker">Thank you</p>
      <h2>Moments like these matter.</h2>
      <p class="lead">Your feedback helps shape Moments into a service that is useful, safe and grounded in the real lives of women in design.</p>
      <div class="result-card">
        <p><strong>Time:</strong> ${state.availability || "Not selected"}</p>
        <p><strong>Location:</strong> ${state.location || "Not selected"}</p>
        <p><strong>Need:</strong> ${state.need || "Not selected"}</p>
        <p><strong>Connected:</strong> ${state.connected || "Not answered"}</p>
        <p><strong>Safe:</strong> ${state.safe || "Not answered"}</p>
        <p><strong>Use again:</strong> ${state.useAgain || "Not answered"}</p>
      </div>
      <div class="actions">
        <button class="btn btn-survey" type="button" onclick="buildSurveyUrl()">Open feedback survey</button>
        <button class="btn btn-secondary" type="button" onclick="setStep(0)">Test again</button>
      </div>
    </div>`
];

function render() {
  const progress = ((state.step + 1) / totalSteps) * 100;
  progressBar.style.width = `${progress}%`;
  stepLabel.textContent = `Step ${state.step + 1} of ${totalSteps}`;
  screen.innerHTML = screens[state.step]();
}

resetBtn.addEventListener("click", resetPrototype);
render();
