/* =========================================================
   XYROX-UTILITIES — REAL GOOGLE SIGN-IN ENGINE (auth.js)
   STEP 1 FIX:
   - Each person ONLY gets their own Google account name/avatar
   - Never shares or hardcodes "Namit Gupta" for other users
   - Hides raw Google UID completely
   - Injects a Top-Right Sign-In / Profile button on every page
     so you never have to scroll with 2 fingers to find Sign In!
   ========================================================= */

// 1. PASTE YOUR FIREBASE KEYS HERE IN GITHUB
const DEFAULT_FIREBASE_CONFIG = {
  apiKey: "AIzaSyAKi1ckZIFVxWHy51UBUW5juwjbxNrlcd8",
  authDomain: "xyrox6789-17138.firebaseapp.com",
  projectId: "xyrox6789-17138",
  appId: "PASTE_YOUR_APP_ID_HERE_IF_YOU_HAVE_IT"
};

// 2. PUT ONLY YOUR PERSONAL GMAIL HERE FOR THE [FOUNDER] BADGE
const FOUNDER_EMAILS = [
  "xyrox6789@gmail.com"
];

let firebaseAuthInstance = null;
let currentGoogleUser = null;

function ensureFirebaseSDKLoaded(callback) {
  if (typeof firebase !== "undefined" && firebase.auth) {
    callback();
    return;
  }
  const appScript = document.createElement("script");
  appScript.src = "https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js";
  appScript.onload = () => {
    const authScript = document.createElement("script");
    authScript.src = "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth-compat.js";
    authScript.onload = callback;
    document.head.appendChild(authScript);
  };
  document.head.appendChild(appScript);
}

function getActiveFirebaseConfig() {
  if (DEFAULT_FIREBASE_CONFIG.apiKey && DEFAULT_FIREBASE_CONFIG.apiKey !== "PASTE_YOUR_API_KEY_HERE") {
    return DEFAULT_FIREBASE_CONFIG;
  }
  try {
    const saved = localStorage.getItem("xyrox_firebase_config");
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed && parsed.apiKey && parsed.authDomain) return parsed;
    }
  } catch (e) {}
  return null;
}

// Build a clean Top-Right Sign-In / Account Bar on every page automatically
function injectTopAuthQuickBar() {
  if (document.getElementById("xyroxTopAuthWidget")) return;

  const widget = document.createElement("div");
  widget.id = "xyroxTopAuthWidget";
  widget.className = "fixed top-3.5 right-4 z-40 flex items-center gap-2";
  document.body.appendChild(widget);
}

function initRealGoogleAuth() {
  injectTopAuthQuickBar();
  updateGlobalAuthUI(null);

  const config = getActiveFirebaseConfig();
  if (!config) {
    console.warn("Firebase config not set in auth.js yet.");
    return;
  }

  ensureFirebaseSDKLoaded(() => {
    try {
      if (!firebase.apps.length) {
        firebase.initializeApp(config);
      }
      firebaseAuthInstance = firebase.auth();

      // Always read the LIVE authenticated user directly from Google Firebase
      firebaseAuthInstance.onAuthStateChanged((user) => {
        if (user) {
          const emailLower = (user.email || "").toLowerCase();
          const isFounder = FOUNDER_EMAILS.map(e => e.toLowerCase()).includes(emailLower);

          // Per-user custom nickname keyed strictly by their own unique Google UID
          const customName = localStorage.getItem(`xyrox_custom_name_${user.uid}`);

          // Strictly use THIS user's own Google displayName or email prefix
          const realGoogleName = user.displayName || (user.email ? user.email.split("@")[0] : "Member");

          currentGoogleUser = {
            uid: user.uid,
            displayName: customName ? customName : realGoogleName,
            googleName: realGoogleName,
            email: user.email || "",
            photoURL: user.photoURL || "",
            isFounder: isFounder
          };

          updateGlobalAuthUI(currentGoogleUser);
        } else {
          currentGoogleUser = null;
          localStorage.removeItem("xyrox_google_user");
          updateGlobalAuthUI(null);
        }
      });
    } catch (err) {
      console.error("Firebase Init Error:", err);
    }
  });
}

// Always force Google Account Picker so another user never auto-logs into your account
function signInWithRealGoogle() {
  const config = getActiveFirebaseConfig();
  if (!config) {
    alert("Firebase API Keys are missing in auth.js! Make sure you pasted your keys in auth.js.");
    return;
  }

  ensureFirebaseSDKLoaded(() => {
    if (!firebase.apps.length) {
      firebase.initializeApp(config);
    }
    const auth = firebase.auth();
    const provider = new firebase.auth.GoogleAuthProvider();
    // Forces Google to ask WHICH Google account to use every single time
    provider.setCustomParameters({ prompt: "select_account" });

    auth.signInWithPopup(provider).catch((error) => {
      if (error.code === "auth/popup-blocked" || error.code === "auth/operation-not-supported-in-this-environment") {
        auth.signInWithRedirect(provider);
      } else {
        alert("Google Sign-In Error: " + error.message);
      }
    });
  });
}

function signOutFromGoogle() {
  localStorage.removeItem("xyrox_google_user");
  currentGoogleUser = null;
  if (firebaseAuthInstance) {
    firebaseAuthInstance.signOut().then(() => {
      updateGlobalAuthUI(null);
    });
  } else {
    updateGlobalAuthUI(null);
  }
}

function updateGlobalAuthUI(user) {
  const sidebarName = document.getElementById("sidebarAuthName");
  const sidebarStatus = document.getElementById("sidebarAuthStatus");
  const loggedOutView = document.getElementById("loggedOutView");
  const loggedInView = document.getElementById("loggedInView");
  const topWidget = document.getElementById("xyroxTopAuthWidget");

  if (user) {
    // 1. Update Top-Right Quick Bar (Always visible without scrolling!)
    if (topWidget) {
      const avatarHtml = user.photoURL
        ? `<img src="${escapeHtml(user.photoURL)}" class="w-6 h-6 rounded-full object-cover border border-white/20" />`
        : `<div class="w-6 h-6 rounded-full bg-white text-black font-bold text-[11px] flex items-center justify-center">${escapeHtml((user.displayName || "U").charAt(0).toUpperCase())}</div>`;

      topWidget.innerHTML = `
        <a href="settings.html" class="flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-[#111115]/90 backdrop-blur-xl border border-white/15 hover:border-white/30 text-xs text-white shadow-lg transition">
          ${avatarHtml}
          <span class="font-medium max-w-[110px] truncate">${escapeHtml(user.displayName)}</span>
          ${user.isFounder ? `<span class="px-1.5 py-0.5 rounded text-[9px] font-bold bg-white text-black uppercase">Founder</span>` : ""}
        </a>
      `;
    }

    // 2. Update Left Sidebar
    if (sidebarName) {
      sidebarName.innerHTML = user.isFounder
        ? `${escapeHtml(user.displayName)} <span class="px-1 py-0.5 rounded text-[8px] font-bold bg-white text-black uppercase ml-1">Founder</span>`
        : escapeHtml(user.displayName);
    }
    if (sidebarStatus) {
      sidebarStatus.textContent = "Account Connected";
    }

    // 3. Update Settings Page (if open)
    if (loggedOutView && loggedInView) {
      loggedOutView.classList.add("hidden");
      loggedInView.classList.remove("hidden");

      const profileName = document.getElementById("profileName");
      const profileEmail = document.getElementById("profileEmail");
      const profileAvatarImg = document.getElementById("profileAvatarImg");
      const profileAvatarFallback = document.getElementById("profileAvatarFallback");
      const customUsernameInput = document.getElementById("customUsernameInput");

      if (profileName) {
        profileName.innerHTML = user.isFounder
          ? `${escapeHtml(user.displayName)} <span class="px-2 py-0.5 rounded text-[10px] font-bold tracking-wider bg-white text-black uppercase">Founder</span>`
          : `${escapeHtml(user.displayName)} <span class="px-2 py-0.5 rounded text-[10px] font-mono bg-white/10 text-gray-300 border border-white/10 uppercase">Verified</span>`;
      }
      if (profileEmail) profileEmail.textContent = user.email;
      if (customUsernameInput) {
        customUsernameInput.value = user.displayName;
      }

      if (user.photoURL && profileAvatarImg && profileAvatarFallback) {
        profileAvatarImg.src = user.photoURL;
        profileAvatarImg.classList.remove("hidden");
        profileAvatarFallback.classList.add("hidden");
      } else if (profileAvatarFallback) {
        profileAvatarFallback.textContent = (user.displayName || "U").charAt(0).toUpperCase();
        if (profileAvatarImg) profileAvatarImg.classList.add("hidden");
        profileAvatarFallback.classList.remove("hidden");
      }
    }

    // 4. Unlock Global Chat Input
    const chatInput = document.getElementById("chatInputContainer");
    if (chatInput) {
      chatInput.classList.remove("opacity-50", "cursor-not-allowed");
      const inputField = chatInput.querySelector("input");
      const btnField = chatInput.querySelector("button");
      if (inputField) {
        inputField.disabled = false;
        inputField.placeholder = `Message #xyrox-global as ${user.displayName}...`;
      }
      if (btnField) btnField.disabled = false;
    }
  } else {
    // Logged Out: Show 1-Tap Sign In Button at Top Right of EVERY page
    if (topWidget) {
      topWidget.innerHTML = `
        <button onclick="signInWithRealGoogle()" class="flex items-center gap-2 px-3.5 py-2 rounded-full bg-white text-black hover:bg-gray-200 font-semibold text-xs shadow-lg transition">
          <svg class="w-3.5 h-3.5" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          <span>Sign In</span>
        </button>
      `;
    }

    if (sidebarName) sidebarName.textContent = "Guest Mode";
    if (sidebarStatus) sidebarStatus.textContent = "Tap to Sign In";

    if (loggedOutView && loggedInView) {
      loggedOutView.classList.remove("hidden");
      loggedInView.classList.add("hidden");
    }

    const chatInput = document.getElementById("chatInputContainer");
    if (chatInput) {
      chatInput.classList.add("opacity-50", "cursor-not-allowed");
      const inputField = chatInput.querySelector("input");
      const btnField = chatInput.querySelector("button");
      if (inputField) {
        inputField.disabled = true;
        inputField.placeholder = "Tap Sign In at top right to chat...";
      }
      if (btnField) btnField.disabled = true;
    }
  }
}

function escapeHtml(str) {
  return String(str || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

document.addEventListener("DOMContentLoaded", initRealGoogleAuth);
