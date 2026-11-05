/* Legacy Life Stories (Living Legacy) — Tailwind tokens.
   Same palette as every other prototype in this repo so the DS stays
   one source of truth. Mirrors design-system.md § Semantic Tokens:

     surface/page         #fbf7ef  → gold-50
     surface/card         #ffffff  → white
     surface/gold-container, gold/100  #f6e5b8 → gold-100
     border/default, warmBlack/300  #dbdad7 → wb-300
     text/heading, navy/700  #293548 → navy-700
     text/primary, warmBlack/900, black  #262116 → wb-900
     text/secondary, warmBlack/700  #514d45 → wb-700
     text/link, navy/500  #42608f → navy-500
     accent/gold, gold/500  #dcb05e → gold-500
     seaFoam/500  #5c9d94 → seafoam-500 (success)
     coral/600    #c24c62 → coral-600  (error)

   PT Serif Text is used on the book cover and the serif display lines
   in the PRD's "a life's story" tone of voice — otherwise DM Sans.  */
tailwind.config = {
  theme: {
    extend: {
      fontFamily: {
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
        serif: ['"DM Serif Text"', 'Georgia', 'serif'],
        book:  ['"PT Serif"', 'Georgia', 'serif'],
      },
      colors: {
        navy:    { 50:'#f0f4fa', 100:'#e6ecf5', 200:'#d3ddeb', 300:'#b0c0d6', 400:'#728ab0', 500:'#42608f', 600:'#3c4d69', 700:'#293548', 800:'#212a3a', 900:'#151b24' },
        gold:    { 50:'#fbf7ef', 100:'#f6e5b8', 200:'#f0d78d', 300:'#e9c86f', 400:'#e2ba60', 500:'#dcb05e', 600:'#c49e54', 700:'#a48849', 800:'#85713e', 900:'#655b34' },
        wb:      { 50:'#fbfbfb', 100:'#f6f6f6', 200:'#ebe9e9', 300:'#dbdad7', 400:'#afadaa', 500:'#807e7a', 600:'#63605b', 700:'#514d45', 800:'#373329', 900:'#262116' },
        seafoam: { 50:'#f3faf9', 100:'#ebf2f1', 200:'#cee2de', 300:'#aecec9', 400:'#81b8ae', 500:'#5c9d94', 600:'#357d75', 700:'#216e6a', 800:'#165c58', 900:'#014744' },
        coral:   { 50:'#fcf1f3', 100:'#fce8ec', 200:'#f7d4da', 300:'#eba9b5', 400:'#e77d91', 500:'#d6677c', 600:'#c24c62', 700:'#993b4d', 800:'#792f3d', 900:'#662833' },
      },
      boxShadow: {
        // DS shadow-sm, kept for cards; the softer "float" shadow is used on
        // modals and cover previews. Both reference rgba warm-black so they
        // match the warm page background.
        sm: '0 1px 2px 0 rgba(38,33,22,0.08)',
        float: '0 24px 40px -16px rgba(38,33,22,0.18), 0 8px 16px -8px rgba(38,33,22,0.10)',
        card: '0 2px 4px 0 rgba(38,33,22,0.04), 0 1px 2px 0 rgba(38,33,22,0.06)',
      },
    },
  },
};
