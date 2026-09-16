/* Handoff across the auth round trip (DES-2280).

   The gate promises that nothing is SAVED until the visitor authenticates, and
   that still holds. What lives here is a PENDING TRANSACTION, not a saved
   relationship: it sits in sessionStorage for the length of the redirect, dies
   with the tab, and is dropped the moment the visitor comes back any way other
   than through the callback. Abandon the flow and the answer is gone, which is
   the behaviour the gate describes.

   This is the mechanism DES-2280's "the held answer must survive the round
   trip" edge case is about, and the same one DES-2268 needs in order to know a
   confirmation is due on return. */
(function () {
  var KEY = 'legacyAuthHandoff.v1';
  function read() {
    try { return JSON.parse(sessionStorage.getItem(KEY)) || null; } catch (_) { return null; }
  }
  window.LEGACY_AUTH = {
    KEY: KEY,
    start: function (payload) { try { sessionStorage.setItem(KEY, JSON.stringify(payload)); } catch (_) {} },
    read: read,
    clear: function () { try { sessionStorage.removeItem(KEY); } catch (_) {} },
    // Where to send the visitor back to. Falls back to the person page so a
    // direct visit to these screens still lands somewhere sensible.
    returnTo: function () {
      var h = read();
      var base = (h && h.returnTo) || 'future-index.html?id=ralph';
      return base + (base.indexOf('?') >= 0 ? '&' : '?') + 'auth=1';
    },
  };
})();
