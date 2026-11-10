/* =========================================================
   XYROX-UTILITIES — REAL GOOGLE SIGN-IN ENGINE (auth.js)
   Uses official Google Firebase Authentication (OAuth 2.0)
   ========================================================= */

// 1. HARDCODE YOUR FIREBASE CONFIG HERE (This secures it for all devices)
const DEFAULT_FIREBASE_CONFIG = {
  apiKey: "AIzaSyAKi1ckZIFVxWHy51UBUW5juwjbxNrlcd8",
  authDomain: "xyrox6789-17138.firebaseapp.com",
  projectId: "xyrox6789-17138",
  appId: "PASTE_YOUR_APP_ID_HERE_IF_YOU_HAVE_IT" 
};

// 2. PUT YOUR PERSONAL GMAIL HERE SO ONLY YOU GET THE [FOUNDER] BADGE
const FOUNDER_EMAILS = [
  "xyrox6789@gmail.com" // <-- Replace with your real Gmail address
];

let firebaseAuthInstance = null;
let currentGoogleUser = null;

// Dynamically load Firebase SDKs on any page if not already loaded
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

// Get active Firebase configuration (Now permanently uses the hardcoded one)
function getActiveFirebaseConfig() {
  if (DEFAULT_FIREBASE_CONFIG.apiKey && DEFAULT_FIREBASE_CONFIG.apiKey !== "PASTE_YOUR_API_KEY_HERE") {
    return DEFAULT_FIREBASE_CONFIG;
  }
  // Fallback to local storage only if they somehow haven't hardcoded it yet
  try {
    const saved = localStorage.getItem("xyrox_firebase_config");
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed && parsed.apiKey && parsed.authDomain) return parsed;
    }
  } catch (e) {
    console.error("Invalid saved Firebase config:", e);
  }
  return null;
}

// Initialize Firebase Google Auth
function initRealGoogleAuth() {
  // Render cached user immediately so sidebar doesn't flicker
  const cachedUser = localStorage.getItem("xyrox_google_user");
  if (cachedUser) {
    try {
      currentGoogleUser = JSON.parse(cachedUser);
      updateGlobalAuthUI(currentGoogleUser);
    } catch (e) {}
  } else {
    updateGlobalAuthUI(null);
  }

  const config = getActiveFirebaseConfig();

  if (!config) {
    console.warn("Firebase config is missing. Please hardcode it in auth.js");
    return;
  }

  ensureFirebaseSDKLoaded(() => {
    try {
      if (!firebase.apps.length) {
        firebase.initializeApp(config);
      }
      firebaseAuthInstance = firebase.auth();

      // Listen for real Google Sign-In state changes
      firebaseAuthInstance.onAuthStateChanged((user) => {
        if (user) {
          const emailLower = (user.email || "").toLowerCase();
          const isFounder = FOUNDER_EMAILS.map(e => e.toLowerCase()).includes(emailLower);
          const customName = localStorage.getItem(`xyrox_custom_name_${user.uid}`);

          currentGoogleUser = {
            uid: user.uid,
            displayName: customName || user.displayName || user.email.split("@")[0],
            googleName: user.displayName || "Google User",
            email: user.email || "",
            photoURL: user.photoURL || "",
            isFounder: isFounder
          };

          localStorage.setItem("xyrox_google_user", JSON.stringify(currentGoogleUser));
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

// Trigger the REAL Google Sign-In OAuth Popup
function signInWithRealGoogle() {
  const config = getActiveFirebaseConfig();
  if (!config) {
    alert("Firebase API Keys are missing in auth.js! Please update the file on GitHub.");
    return;
  }

  ensureFirebaseSDKLoaded(() => {
    if (!firebase.apps.length) {
      firebase.initializeApp(config);
    }
    const auth = firebase.auth();
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });

    // Open real Google account selector popup
    auth.signInWithPopup(provider).catch((error) => {
      // Fallback to redirect if mobile browser blocks popups
      if (error.code === "auth/popup-blocked" || error.code === "auth/operation-not-supported-in-this-environment") {
        auth.signInWithRedirect(provider);
      } else {
        console.error("Google Sign-In Error:", error);
        alert("Google Sign-In Error: " + error.message);
      }
    });
  });
}

// Sign Out of Google
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

// Update Sidebar, Settings Profile, and Global Chat across the entire site
function updateGlobalAuthUI(user) {
  const sidebarName = document.getElementById("sidebarAuthName");
  const sidebarStatus = document.getElementById("sidebarAuthStatus");
  const loggedOutView = document.getElementById("loggedOutView");
  const loggedInView = document.getElementById("loggedInView");

  if (user) {
    // 1. Update Sidebar Name & Badge
    if (sidebarName) {
      sidebarName.innerHTML = user.isFounder
        ? `${escapeHtml(user.displayName)} <span class="px-1 py-0.5 rounded text-[8px] font-bold bg-white text-black uppercase ml-1">Founder</span>`
        : escapeHtml(user.displayName);
    }
    if (sidebarStatus) {
      sidebarStatus.textContent = user.email || "Google Verified";
    }

    // 2. Update Settings Page (if currently on settings.html)
    if (loggedOutView && loggedInView) {
      loggedOutView.classList.add("hidden");
      loggedInView.classList.remove("hidden");

      const profileName = document.getElementById("profileName");
      const profileEmail = document.getElementById("profileEmail");
      const profileUid = document.getElementById("profileUid");
      const profileAvatarImg = document.getElementById("profileAvatarImg");
      const profileAvatarFallback = document.getElementById("profileAvatarFallback");
      const customUsernameInput = document.getElementById("customUsernameInput");

      if (profileName) {
        profileName.innerHTML = user.isFounder
          ? `${escapeHtml(user.displayName)} <span class="px-2 py-0.5 rounded text-[10px] font-bold tracking-wider bg-white text-black uppercase">Founder</span>`
          : `${escapeHtml(user.displayName)} <span class="px-2 py-0.5 rounded text-[10px] font-mono bg-white/10 text-gray-300 border border-white/10 uppercase">Member</span>`;
      }
      if (profileEmail) profileEmail.textContent = user.email;
      if (profileUid) profileUid.textContent = user.uid.slice(0, 12) + "...";
      if (customUsernameInput && !customUsernameInput.value) {
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

    // 3. Unlock Global Chat Input (if currently on chat.html)
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
    // Logged Out State
    if (sidebarName) sidebarName.textContent = "Guest Mode";
    if (sidebarStatus) sidebarStatus.textContent = "Sign In via Google";

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
        inputField.placeholder = "Sign in with Google in Settings to send messages...";
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
