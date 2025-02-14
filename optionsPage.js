
// ------------------------------------------------------
//            see highlighter.js userOptions
// ------------------------------------------------------
const defaultOptions = `({
  // -------------------------------------------------------------------------------------
  //                    Hello, and thanks for trying my extension, this is all JavaScript
  // -------------------------------------------------------------------------------------

  highlightedClassName: 'highlighted_selection',

  styles: {
    display: 'inline',
    backgroundColor: 'yellow',
  },

  isWindowLocationValid: function (windowLocation) {
    const blacklistedHosts = [
      'linkedin.com',
      'collabedit.com',
      'coderpad.io',
      'jsbin.com',
      'plnkr.co',
    ];
    return !blacklistedHosts.includes(windowLocation.host);
  },

  areKeysPressed: function (pressedKeys = []) {
    // return pressedKeys.includes('Meta'); // CMD key
    // return pressedKeys.includes('Alt'); // Option key
    return true;
  },

  occurrenceRegex: function (selectionString) {
    return new RegExp(selectionString, 'i'); // partial word, case insensitive
    // return new RegExp(selectionString); // partial word, case sensitive
    // return new RegExp(\`\\\\b\${selectionString}\\\\b\`, 'i'); // whole word, case insensitive
    // return new RegExp(\`\\\\b\${selectionString}\\\\b\`); // whole word, case sensitive
  },

  isAncestorNodeValid: (
    function isAncestorNodeValid (ancestorNode) {
      return (
        (!ancestorNode) ||
        // eg. (!ancestorNode.classList || !ancestorNode.classList.contains('CodeMirror')) &&
        (ancestorNode.nodeName !== 'SCRIPT') &&
        (ancestorNode.nodeName !== 'STYLE') &&
        (ancestorNode.nodeName !== 'HEAD') &&
        (ancestorNode.nodeName !== 'INPUT') &&
        (ancestorNode.nodeName !== 'TEXTAREA') &&
        (ancestorNode.contentEditable !== 'true') &&
        (isAncestorNodeValid(ancestorNode.parentNode))
      );
    }
  ),

  trimRegex: function () {
    // leading, selectionString, trailing
    // trim parts maintained for offset analysis
    return /^(\\s*)(\\S+(?:\\s+\\S+)*)(\\s*)$/;
  },

  isSelectionValid: function ({ selectionString, selection }) {
    return (selectionString.length >= 3 && !/None|Caret/.exec(selection.type));
  },
})`;

const optionsTextArea = document.querySelector('textarea#options-text');

chrome.storage.sync.get('optionsText', e => {
  optionsTextArea.value = (e.optionsText || defaultOptions);
});

document.querySelector('button#submit-button').addEventListener('click', e => {
  chrome.storage.sync.set({ optionsText: optionsTextArea.value, });
});

document.querySelector('button#reset-button').addEventListener('click', e => {
  if (window.confirm('Are you sure?')) {
    chrome.storage.sync.clear(() => window.location.reload());
  }
});
