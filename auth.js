/* 
  ================================================
  XYROX-UTILITIES MASTER AUTH (auth.js)
  ================================================
  Handles Google Sign-In logic and remembers the 
  user's session across different HTML tabs.
*/

// Check login status whenever any page loads
document.addEventListener('DOMContentLoaded', () => {
    checkAuthStatus();
});

function checkAuthStatus() {
    // Check browser memory to see if we are logged in
    const isLoggedIn = localStorage.getItem('xyrox_auth') === 'true';
    
    // Update the Sidebar UI everywhere
    const sidebarName = document.getElementById('sidebarAuthName');
    const sidebarStatus = document.getElementById('sidebarAuthStatus');
    
    if (isLoggedIn) {
        if (sidebarName) sidebarName.innerHTML = 'xyrox6789 <span class="px-1 py-0.5 rounded text-[8px] font-bold bg-white text-black uppercase ml-1">Founder</span>';
        if (sidebarStatus) sidebarStatus.textContent = 'Google Synced';
        
        // If we are on the Settings page, show the logged-in profile
        const loggedOutView = document.getElementById('loggedOutView');
        const loggedInView = document.getElementById('loggedInView');
        if (loggedOutView && loggedInView) {
            loggedOutView.classList.add('hidden');
            loggedInView.classList.remove('hidden');
        }

        // If we are on the Chat page, unlock the chat input
        const chatInput = document.getElementById('chatInputContainer');
        if(chatInput) {
            chatInput.classList.remove('opacity-50', 'cursor-not-allowed');
            const inputField = chatInput.querySelector('input');
            const btnField = chatInput.querySelector('button');
            if(inputField) {
                inputField.disabled = false;
                inputField.placeholder = "Message #xyrox-global...";
            }
            if(btnField) btnField.disabled = false;
        }

    } else {
        if (sidebarName) sidebarName.textContent = 'Guest Mode';
        if (sidebarStatus) sidebarStatus.textContent = 'Sign In via Google';
        
        // If we are on the Settings page, show the login button
        const loggedOutView = document.getElementById('loggedOutView');
        const loggedInView = document.getElementById('loggedInView');
        if (loggedOutView && loggedInView) {
            loggedOutView.classList.remove('hidden');
            loggedInView.classList.add('hidden');
        }
    }
}

// Simulates clicking the Google Login button
function simulateGoogleLogin() {
    // In the future, you will paste your actual Firebase Google popup code here.
    // For now, we instantly log you in and save it to the browser.
    localStorage.setItem('xyrox_auth', 'true');
    checkAuthStatus();
}

// Simulates signing out
function simulateSignOut() {
    localStorage.removeItem('xyrox_auth');
    checkAuthStatus();
}
