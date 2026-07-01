
(function() {
    'use strict';

    // Create a small, unobtrusive container
    const monkeyDiv = document.createElement('div');
    monkeyDiv.id = 'tankar-monkey';
    monkeyDiv.innerHTML = '🐒 Tankar Monkey';
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
    monkeyDiv.style.pointerEvents = 'none';   // so it doesn't block clicks
    monkeyDiv.style.userSelect = 'none';
    monkeyDiv.style.backdropFilter = 'blur(4px)';
    monkeyDiv.style.boxShadow = '0 1px 3px rgba(0,0,0,0.2)';

    // Append only when the page is fully loaded
    window.addEventListener('load', () => {
        document.body.appendChild(monkeyDiv);
    });
})();
