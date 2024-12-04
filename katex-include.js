(function() {
    // Add KaTeX CSS
    const katexCSS = document.createElement('link');
    katexCSS.rel = 'stylesheet';
    katexCSS.href = 'https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css';
    katexCSS.integrity = 'sha384-nB0miv6/jRmo5UMMR1wu3Gz6NLsoTkbqJghGIsx//Rlm+ZU03BU6SQNC66uf4l5+';
    katexCSS.crossOrigin = 'anonymous';
    document.head.appendChild(katexCSS);

    // Add KaTeX main script
    const katexScript = document.createElement('script');
    katexScript.src = 'https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.js';
    katexScript.defer = true;
    katexScript.integrity = 'sha384-7zkQWkzuo3B5mTepMUcHkMB5jZaolc2xDwL6VFqjFALcbeS9Ggm/Yr2r3Dy4lfFg';
    katexScript.crossOrigin = 'anonymous';
    document.head.appendChild(katexScript);

    // Add KaTeX auto-render script
    const autoRenderScript = document.createElement('script');
    autoRenderScript.src = 'https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/contrib/auto-render.min.js';
    autoRenderScript.defer = true;
    autoRenderScript.integrity = 'sha384-43gviWU0YVjaDtb/GhzOouOXtZMP/7XUzwPTstBeZFe/+rCMvRwr4yROQP43s0Xk';
    autoRenderScript.crossOrigin = 'anonymous';
    autoRenderScript.onload = function() {
        renderMathInElement(document.body);
    };
    document.head.appendChild(autoRenderScript);
})();