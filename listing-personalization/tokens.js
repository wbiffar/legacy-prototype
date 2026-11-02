/* Tailwind design tokens for the Listing Page Personalization prototype
   ("Today for you").

   Same palette as my-people/shared/tokens.js and guestbook-prompt/tokens.js —
   one source of truth across the prototypes. The Figma variables map onto it
   exactly, so every colour in the mocks is already a token here:

     surface/container  #fbf7ef  → gold-50     (the page background)
     surface/card       #ffffff  → white
     surface/gold-container, gold/100, yellow/100  #f6e5b8 → gold-100
     border/default, warmBlack/300  #dbdad7 → wb-300
     text/heading, accent/primary, navy/700  #293548 → navy-700
     text/secondary     #514d45  → wb-700
     text/primary, warmBlack/900, black  #262116 → wb-900
     text/link          #42608f  → navy-500
     warmBlack/100      #f6f6f6  → wb-100
     warmBlack/500      #807e7a  → wb-500
     warmBlack/400      #afadaa  → wb-400
     gold/700           #a48849  → gold-700   (the "1938 – 2026" line)
     gold/900           #655b34  → gold-900   (source-badge text)
     seaFoam/700        #216e6a  → seafoam-700 (toggle "on")

   Note the one real conflict with design-system.md: that doc says toggles are
   navy/700 when on, but the Tune-panel comp uses seaFoam/700. The comp wins
   here because it is the newer artefact and the toggle sits beside navy
   buttons it would otherwise be mistaken for. Flagged for Wes. */
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
