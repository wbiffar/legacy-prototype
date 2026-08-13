/* Shared "My People" demo data — used by index.html (dashboard) and person.html.
   One source of truth so each card opens the matching person's page. */
(function () {
  var U = 'https://images.unsplash.com/photo-';
  window.LEGACY_PEOPLE = {
    ralph: {
      first: 'Ralph', last: 'Thomas', full: 'Ralph Thomas', dates: '1935 – 2023',
      photo: 'assets/people/ralph.jpg', relation: null,
      source: 'Chicago Sun-Times', home: 'Eternal Springs Funeral Home', location: 'Dixon, IL',
      obit: 'Ralph Thomas passed away February 14, 2023, at the age of 86. Ralph was born in Fresno, California, on March 18, 1935, to his parents, Robert Thomas and Veronica Delgado. He is survived by his daughters Elena and Sofia, his grandchildren, and a wide circle of friends who cherished his warmth and humor.'
    },
    mohammad: {
      first: 'Anthony', last: 'Thomas', full: 'Anthony Maxwell Thomas', dates: '1940 – 2024',
      photo: 'assets/people/anthony.png', relation: 'Grandfather',
      source: 'The Sacramento Bee', home: 'Green Valley Funeral Home', location: 'Sacramento, CA',
      obit: 'Anthony Maxwell Thomas passed away on June 2, 2024, at the age of 84. A devoted grandfather and lifelong teacher, he is remembered for his warmth, his patience, and the countless students whose lives he shaped over four decades in the classroom.'
    },
    douglas: {
      first: 'Douglas', last: 'Whitfield', full: 'Douglas Michael Whitfield', dates: '1948 – 2023',
      photo: null, relation: 'Uncle',
      source: 'Chicago Sun-Times', home: 'Restwood Funeral Home', location: 'Chicago, IL',
      obit: 'Douglas Michael Whitfield passed away on November 12, 2023, at the age of 75. Doug was a proud Chicagoan, a Navy veteran, and a friend to everyone he met. He never missed a Cubs game and never met a stranger.'
    },
    jennifer: {
      first: 'Jennifer', last: 'Sanderson', full: 'Jennifer Sanderson', dates: '1951 – 2024',
      photo: 'assets/people/jennifer.png', relation: 'Friend',
      source: 'The Boston Globe', home: 'Fairview Memorial Chapel', location: 'Boston, MA',
      obit: 'Jennifer Sanderson passed away on March 8, 2024, at the age of 72. A gifted gardener and tireless community volunteer, Jennifer brought color and kindness to everyone around her, and her front-porch conversations were legendary.'
    },
    eleanor: {
      first: 'Eleanor', last: 'Whitfield', full: 'Eleanor Whitfield', dates: '1938 – 2024',
      photo: 'assets/people/eleanor.png', relation: 'Aunt',
      source: 'The Denver Post', home: 'Whitfield Chapel', location: 'Denver, CO',
      obit: 'Eleanor Whitfield passed away on August 1, 2024, at the age of 86. Known to all as Aunt Ellie, she was the heart of every family gathering and kept the stories — and the recipes — that held the family together.'
    },
    marcus: {
      first: 'Marcus', last: 'Reed', full: 'Marcus Allen Reed', dates: '1955 – 2023',
      photo: 'assets/people/marcus.png', relation: null,
      source: 'Los Angeles Times', home: 'Crenshaw Memorial', location: 'Los Angeles, CA',
      obit: 'Marcus Allen Reed passed away on December 20, 2023, at the age of 68. A jazz musician and mentor, Marcus filled every room with music and generosity, and his Sunday sessions launched a generation of young players.'
    },

    // ---- Extended family (DES-2251 §5 relationship tree, see FAMILY-TREE.md) ----
    robert: {
      first: 'Robert', last: 'Thomas', full: 'Robert Thomas', dates: '1904 – 1979',
      photo: null, relation: 'Great-grandfather',
      source: 'The Fresno Bee', home: 'Fresno Memorial Gardens', location: 'Fresno, CA',
      obit: 'Robert Thomas passed away in 1979 at the age of 75. A railroad man and father of five, he raised his family in Fresno alongside his wife, Veronica, and was known for a steady hand and a good story.'
    },
    veronica: {
      first: 'Veronica', last: 'Delgado', full: 'Veronica Delgado Thomas', dates: '1908 – 1986',
      photo: null, relation: 'Great-grandmother',
      source: 'The Fresno Bee', home: 'Fresno Memorial Gardens', location: 'Fresno, CA',
      obit: 'Veronica (Delgado) Thomas passed away in 1986 at the age of 78. The heart of the Thomas home in Fresno, she kept the family close, the kitchen full, and every grandchild remembered by name.'
    },
    patricia: {
      first: 'Patricia', last: 'Thomas', full: 'Patricia (Ramirez) Thomas', dates: '1938 – 2019',
      photo: null, relation: 'Great-aunt',
      source: 'Chicago Sun-Times', home: 'Eternal Springs Funeral Home', location: 'Dixon, IL',
      obit: 'Patricia (Ramirez) Thomas passed away in 2019 at the age of 81. She married Ralph Thomas in 1958 and shared six decades with him in Dixon, where her garden and her generosity were local legend.'
    },
    george: {
      first: 'George', last: 'Whitfield', full: 'George Whitfield', dates: '1912 – 1988',
      photo: null, relation: 'Grandfather',
      source: 'Chicago Sun-Times', home: 'Restwood Funeral Home', location: 'Chicago, IL',
      obit: 'George Whitfield passed away in 1988 at the age of 76. A lifelong Chicagoan and union machinist, he and his wife Margaret raised three children on the South Side and never missed a Sunday dinner.'
    },
    margaret: {
      first: 'Margaret', last: 'Whitfield', full: 'Margaret Whitfield', dates: '1916 – 1994',
      photo: null, relation: 'Grandmother',
      source: 'Chicago Sun-Times', home: 'Restwood Funeral Home', location: 'Chicago, IL',
      obit: 'Margaret Whitfield passed away in 1994 at the age of 78. A schoolteacher for thirty years, she gave the Whitfield family its love of books, its sharp humor, and its Sunday-dinner traditions.'
    }
  };

  // Default demo "saved" set shown on the dashboard before any changes.
  window.LEGACY_DEFAULT_SAVED = ['mohammad', 'douglas', 'jennifer'];

  // Sizing helpers for the shared Unsplash base URLs.
  window.LEGACY_PHOTO = function (base, kind) {
    if (!base) return null;
    // Local (or non-Unsplash) assets are used as-is; only Unsplash URLs take crop params.
    if (base.indexOf('images.unsplash.com') === -1) return base;
    return base + (kind === 'hero' ? '?w=560&h=720&fit=crop&q=80' : '?w=360&h=360&fit=crop&q=80');
  };
  window.LEGACY_INITIALS = function (name) {
    var p = String(name || '').trim().split(/\s+/);
    return ((p[0] || '')[0] || '') + ((p[p.length - 1] || '')[0] || '');
  };
})();
