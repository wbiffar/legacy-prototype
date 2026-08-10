/* Shared "My People" demo data — used by index.html (dashboard) and person.html.
   One source of truth so each card opens the matching person's page. */
(function () {
  var U = 'https://images.unsplash.com/photo-';
  window.LEGACY_PEOPLE = {
    ralph: {
      first: 'Ralph', last: 'Thomas', full: 'Ralph Thomas', dates: '1935 – 2023',
      photo: U + '1472099645785-5658abf4ff4e', relation: null,
      source: 'Chicago Sun-Times', home: 'Eternal Springs Funeral Home', location: 'Dixon, IL',
      obit: 'Ralph Thomas passed away February 14, 2023, at the age of 86. Ralph was born in Fresno, California, on March 18, 1935, to his parents, Robert Thomas and Veronica Delgado. He is survived by his daughters Elena and Sofia, his grandchildren, and a wide circle of friends who cherished his warmth and humor.'
    },
    mohammad: {
      first: 'Mohammad', last: 'Blumenthal', full: 'Mohammad Blumenthal Reallylongname', dates: '1940 – 2024',
      photo: U + '1560250097-0b93528c311a', relation: 'Grandfather',
      source: 'The Sacramento Bee', home: 'Green Valley Funeral Home', location: 'Sacramento, CA',
      obit: 'Mohammad Blumenthal passed away on June 2, 2024, at the age of 84. A devoted grandfather and lifelong teacher, he is remembered for his warmth, his patience, and the countless students whose lives he shaped over four decades in the classroom.'
    },
    douglas: {
      first: 'Douglas', last: 'Jones', full: 'Douglas Michael Jones', dates: '1948 – 2023',
      photo: null, relation: null,
      source: 'Chicago Sun-Times', home: 'Restwood Funeral Home', location: 'Chicago, IL',
      obit: 'Douglas Michael Jones passed away on November 12, 2023, at the age of 75. Doug was a proud Chicagoan, a Navy veteran, and a friend to everyone he met. He never missed a Cubs game and never met a stranger.'
    },
    jennifer: {
      first: 'Jennifer', last: 'Sanderson', full: 'Jennifer Sanderson', dates: '1951 – 2024',
      photo: U + '1566616213894-2d4e1baee5d8', relation: 'Friend',
      source: 'The Boston Globe', home: 'Fairview Memorial Chapel', location: 'Boston, MA',
      obit: 'Jennifer Sanderson passed away on March 8, 2024, at the age of 72. A gifted gardener and tireless community volunteer, Jennifer brought color and kindness to everyone around her, and her front-porch conversations were legendary.'
    },
    eleanor: {
      first: 'Eleanor', last: 'Whitfield', full: 'Eleanor Whitfield', dates: '1938 – 2024',
      photo: U + '1581579438747-1dc8d17bbce4', relation: 'Aunt',
      source: 'The Denver Post', home: 'Whitfield Chapel', location: 'Denver, CO',
      obit: 'Eleanor Whitfield passed away on August 1, 2024, at the age of 86. Known to all as Aunt Ellie, she was the heart of every family gathering and kept the stories — and the recipes — that held the family together.'
    },
    marcus: {
      first: 'Marcus', last: 'Reed', full: 'Marcus Allen Reed', dates: '1955 – 2023',
      photo: U + '1547425260-76bcadfb4f2c', relation: null,
      source: 'Los Angeles Times', home: 'Crenshaw Memorial', location: 'Los Angeles, CA',
      obit: 'Marcus Allen Reed passed away on December 20, 2023, at the age of 68. A jazz musician and mentor, Marcus filled every room with music and generosity, and his Sunday sessions launched a generation of young players.'
    }
  };

  // Default demo "saved" set shown on the dashboard before any changes.
  window.LEGACY_DEFAULT_SAVED = ['mohammad', 'douglas', 'jennifer'];

  // Sizing helpers for the shared Unsplash base URLs.
  window.LEGACY_PHOTO = function (base, kind) {
    if (!base) return null;
    return base + (kind === 'hero' ? '?w=560&h=720&fit=crop&q=80' : '?w=360&h=360&fit=crop&q=80');
  };
  window.LEGACY_INITIALS = function (name) {
    var p = String(name || '').trim().split(/\s+/);
    return ((p[0] || '')[0] || '') + ((p[p.length - 1] || '')[0] || '');
  };
})();
