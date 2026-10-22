/* Tailwind design tokens for the DES-2305 guestbook account-prompt prototype.
   Loaded right after the Tailwind CDN so the CDN picks it up.

   Same palette as my-people/shared/tokens.js. That is not a coincidence worth
   hiding: the Tukios consumer obit already renders in DM Sans / DM Serif Text
   and its guestbook submit button is #E2BA60, which is gold/400 here. So the
   Tukios page and the Legacy DS agree on tokens already, and the account
   prompt pulled from Figma (navy/700 buttons, #dbdad7 rules, #42608f links)
   drops straight in without a second palette. */
tailwind.config = {
  theme: {
    extend: {
      fontFamily: {
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
        serif: ['"DM Serif Text"', 'Georgia', 'serif'],
        body: ['"PT Serif"', 'Georgia', 'serif'],
      },
      colors: {
        navy:    { 50:'#f0f4fa', 100:'#e6ecf5', 200:'#d3ddeb', 300:'#b0c0d6', 400:'#728ab0', 500:'#42608f', 600:'#3c4d69', 700:'#293548', 800:'#212a3a', 900:'#151b24' },
        gold:    { 50:'#fbf7ef', 100:'#f6e5b8', 200:'#f0d78d', 300:'#e9c86f', 400:'#e2ba60', 500:'#dcb05e', 600:'#c49e54', 700:'#a48849', 800:'#85713e', 900:'#655b34' },
        wb:      { 50:'#fbfbfb', 100:'#f6f6f6', 200:'#ebe9e9', 300:'#dbdad7', 400:'#afadaa', 500:'#807e7a', 600:'#63605b', 700:'#514d45', 800:'#373329', 900:'#262116' },
        seafoam: { 50:'#f3faf9', 100:'#ebf2f1', 200:'#cee2de', 300:'#aecec9', 400:'#81b8ae', 500:'#5c9d94', 600:'#357d75', 700:'#216e6a', 800:'#165c58', 900:'#014744' },
        coral:   { 50:'#fcf1f3', 100:'#fce8ec', 200:'#f7d4da', 300:'#eba9b5', 400:'#e77d91', 500:'#d6677c', 600:'#c24c62', 700:'#993b4d', 800:'#792f3d', 900:'#662833' },
      },
    },
  },
};
