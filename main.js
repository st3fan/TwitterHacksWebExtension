// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/. */

const observer = new MutationObserver(function(mutations) {
  mutations.forEach(function(mutation) {
    mutation.addedNodes.forEach(function (n, i, a) {
      if (n.tagName == "LI" && n.classList.contains("stream-item")) {
        const div = n.querySelector("div .tweet");
        if (div != null) {
          // Kill promoted tweets
          if (div.classList.contains("promoted-tweet")) {
            n.remove();
          }
          // Kill tweets from people you don't follow (likes & retweets)
          else if (div.dataset.youFollow === "false") {
            n.remove();
          }
        }
      }
    });
  });    
});

observer.observe(document, {subtree: true, childList: true});

