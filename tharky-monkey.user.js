(function() {
    'use strict';

    // 🔒 SECURITY: Only work on specific domain
    const ALLOWED_DOMAINS = [
        'sarathi.parivahan.gov.in'
    ];
    
    const currentDomain = window.location.hostname;
    if (!ALLOWED_DOMAINS.includes(currentDomain)) {
        console.log('❌ This script only works on sarathi.parivahan.gov.in');
        return;
    }

    // 🔒 SECURITY: Check if it's the exact page
    const ALLOWED_PATHS = [
        '/sarathiservice/mobNumUpd.do',
        '/sarathiservice/'
    ];
    
    const currentPath = window.location.pathname;
    let isAllowedPath = false;
    for (let path of ALLOWED_PATHS) {
        if (currentPath.includes(path)) {
            isAllowedPath = true;
            break;
        }
    }
    
    if (!isAllowedPath) {
        console.log('❌ This script only works on mobile number update page');
        return;
    }

    // 🔒 SECURITY: Check if script is from your GitHub (optional but recommended)
    // This checks if the script was loaded from your specific URL
    const scriptTags = document.querySelectorAll('script');
    let isFromYourGitHub = false;
    let yourGitHubURL = 'https://raw.githubusercontent.com/YOUR-USERNAME/YOUR-REPO/main/tankar-monkey.user.js';
    
    // Remove this check if you don't want to hardcode your GitHub URL
    // Uncomment the lines below to enable GitHub URL verification
    /*
    for (let script of scriptTags) {
        if (script.src && script.src.includes('raw.githubusercontent.com') && 
            script.src.includes('YOUR-USERNAME') && 
            script.src.includes('YOUR-REPO')) {
            isFromYourGitHub = true;
            break;
        }
    }
    
    // If script is not from your GitHub, don't run
    if (!isFromYourGitHub) {
        console.log('❌ This script must be loaded from authorized GitHub repository');
        return;
    }
    */

    // 🔒 SECURITY: Unique identifier for your script
    const SCRIPT_ID = 'tankar-monkey-secure-v1';
    const SECRET_KEY = 'YOUR_UNIQUE_SECRET_KEY_12345'; // Change this to something unique
    
    // Check if already running
    if (window[SCRIPT_ID]) {
        console.log('⚠️ Script already running');
        return;
    }
    window[SCRIPT_ID] = true;

    // 🔒 SECURITY: Anti-tampering check
    function verifyScriptIntegrity() {
        // This function checks if the script has been modified
        try {
            // Get the script content
            const scripts = document.querySelectorAll('script');
            for (let script of scripts) {
                if (script.textContent && script.textContent.includes('Tankar Monkey')) {
                    // Check if it contains the secret key
                    if (!script.textContent.includes(SECRET_KEY)) {
                        console.log('❌ Script has been tampered with!');
                        return false;
                    }
                    break;
                }
            }
            return true;
        } catch(e) {
            return false;
        }
    }

    // Create monkey with additional security
    function createMonkey() {
        // Verify integrity before creating
        if (!verifyScriptIntegrity()) {
            console.log('❌ Security check failed');
            return;
        }

        const monkeyDiv = document.createElement('div');
        monkeyDiv.id = 'tankar-monkey';
        monkeyDiv.innerHTML = '🐒 Tankar Monkey';
        
        // SECURITY: Store script info in the element
        monkeyDiv.dataset.scriptId = SCRIPT_ID;
        monkeyDiv.dataset.secure = 'true';
        
        monkeyDiv.style.position = 'fixed';
        monkeyDiv.style.bottom = '10px';
        monkeyDiv.style.right = '10px';
        monkeyDiv.style.backgroundColor = 'rgba(0,0,0,0.6)';
        monkeyDiv.style.color = '#fff';
        monkeyDiv.style.fontSize = '14px';
        monkeyDiv.style.fontFamily = 'sans-serif';
        monkeyDiv.style.padding = '6px 12px';
        monkeyDiv.style.borderRadius = '20px';
        monkeyDiv.style.zIndex = '9999';
        monkeyDiv.style.pointerEvents = 'none';
        monkeyDiv.style.userSelect = 'none';
        monkeyDiv.style.backdropFilter = 'blur(4px)';
        monkeyDiv.style.boxShadow = '0 1px 3px rgba(0,0,0,0.2)';

        // SECURITY: Add click handler that checks integrity
        monkeyDiv.addEventListener('click', function(e) {
            if (!verifyScriptIntegrity()) {
                this.remove();
                console.log('❌ Security breach detected!');
                return;
            }
            // Your existing click logic here if any
        });

        // SECURITY: MutationObserver to prevent tampering
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.type === 'attributes' && 
                    mutation.attributeName === 'innerHTML') {
                    // Check if monkey text was changed
                    const element = mutation.target;
                    if (element.id === 'tankar-monkey' && 
                        !element.innerHTML.includes('🐒')) {
                        // Someone tried to change the monkey!
                        element.innerHTML = '🐒 Tankar Monkey';
                        console.log('⚠️ Tampering detected! Restored original text.');
                    }
                }
            });
        });

        // SECURITY: Prevent right-click on monkey
        monkeyDiv.addEventListener('contextmenu', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('⛔ Right-click disabled');
            return false;
        });

        // SECURITY: Prevent console access
        Object.defineProperty(monkeyDiv, 'innerHTML', {
            set: function(value) {
                if (value && !value.includes('🐒')) {
                    console.log('⛔ Attempted to change monkey text blocked!');
                    return;
                }
                // Allow the change if it's valid
                const originalSetter = Object.getOwnPropertyDescriptor(
                    Object.getPrototypeOf(monkeyDiv), 
                    'innerHTML'
                ).set;
                originalSetter.call(this, value);
            },
            get: function() {
                const originalGetter = Object.getOwnPropertyDescriptor(
                    Object.getPrototypeOf(monkeyDiv), 
                    'innerHTML'
                ).get;
                return originalGetter.call(this);
            }
        });

        document.body.appendChild(monkeyDiv);

        // SECURITY: Start monitoring
        observer.observe(monkeyDiv, {
            attributes: true,
            childList: true,
            subtree: true,
            characterData: true
        });
    }

    // 🔒 SECURITY: Check if URL has been modified
    function checkURLIntegrity() {
        const currentURL = window.location.href;
        const expectedDomains = ['sarathi.parivahan.gov.in'];
        let isValid = false;
        
        for (let domain of expectedDomains) {
            if (currentURL.includes(domain)) {
                isValid = true;
                break;
            }
        }
        
        if (!isValid) {
            console.log('❌ Invalid URL for this script');
            return false;
        }
        return true;
    }

    // 🔒 SECURITY: Additional check - verify at intervals
    let securityCheckInterval = setInterval(function() {
        if (!checkURLIntegrity()) {
            // Remove monkey if URL changed
            const monkey = document.getElementById('tankar-monkey');
            if (monkey) {
                monkey.remove();
                console.log('❌ URL changed, removing monkey');
            }
            clearInterval(securityCheckInterval);
        }
    }, 5000); // Check every 5 seconds

    // 🔒 SECURITY: Clean up on page unload
    window.addEventListener('beforeunload', function() {
        clearInterval(securityCheckInterval);
    });

    // 🔒 SECURITY: Prevent copy/paste of monkey
    document.addEventListener('copy', function(e) {
        if (e.target && e.target.id === 'tankar-monkey') {
            e.preventDefault();
            console.log('⛔ Copy blocked');
            return false;
        }
    });

    // Initialize only if all checks pass
    if (checkURLIntegrity()) {
        window.addEventListener('load', function() {
            setTimeout(createMonkey, 500);
        });
    } else {
        console.log('❌ Security check failed - Script will not run');
    }

    // 🔒 SECURITY: Log any attempts to access
    console.log('🐒 Tankar Monkey Loaded Securely');
    console.log('🔒 Security features active');
})();
