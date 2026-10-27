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
      photo: null, relation: 'Aunt',
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
    },

    // ---- Other "Reed" people: shared-last-name links for Marcus, not part of
    //      the account holder's family tree (DES-2251 §5/§7). ----
    gloria: {
      first: 'Gloria', last: 'Reed', full: 'Gloria Reed', dates: '1958 – 2022',
      photo: null, relation: null,
      source: 'Los Angeles Times', home: 'Crenshaw Memorial', location: 'Los Angeles, CA',
      obit: 'Gloria Reed passed away on July 9, 2022, at the age of 64. A gospel and soul singer, she filled Los Angeles churches and clubs alike with a voice people drove across the city to hear.'
    },
    james: {
      first: 'James', last: 'Reed', full: 'James Reed', dates: '1949 – 2018',
      photo: null, relation: null,
      source: 'Los Angeles Times', home: 'Angelus Funeral Home', location: 'Los Angeles, CA',
      obit: 'James Reed passed away on March 2, 2018, at the age of 68. A session drummer, he kept time on countless records made in Los Angeles and mentored younger players every chance he got.'
    },
    dorothy: {
      first: 'Dorothy', last: 'Reed', full: 'Dorothy Reed', dates: '1931 – 2009',
      photo: null, relation: null,
      source: 'Los Angeles Sentinel', home: 'Angelus Funeral Home', location: 'Los Angeles, CA',
      obit: 'Dorothy Reed passed away on October 18, 2009, at the age of 78. The heart of a large Los Angeles family, she led her church choir for decades and never met a neighbor she didn’t feed.'
    },

    // ---- Recommendation pool (DES-2304) ----
    // Possible-match candidates beyond the family graph, so the carousel always
    // has 30 suggestions to draw on once anyone is saved. They are real pages
    // in the demo — a card opens them like any other person.
    recJanice: {
      first: 'Janice', last: 'Whitfield', full: 'Janice Lynn Whitfield', dates: '1968 – 2021',
      photo: null, relation: null,
      source: 'The Denver Post', home: 'Whitfield Chapel', location: 'Denver, CO',
      obit: 'Janice Lynn Whitfield passed away on May 4, 2021, at the age of 53. A school nurse for twenty-five years, she looked after half of Denver\'s children and remembered every one of their names.'
    },
    recTimothy: {
      first: 'Timothy', last: 'Alan', full: 'Timothy Marc Alan', dates: '1955 – 2024',
      photo: null, relation: null,
      source: 'Chicago Sun-Times', home: 'Restwood Funeral Home', location: 'Chicago, IL',
      obit: 'Timothy Marc Alan passed away on January 19, 2024, at the age of 68. A lifelong Chicagoan and union carpenter, he built half the back porches on his block and refused payment for most of them.'
    },
    recMargaretA: {
      first: 'Margaret', last: 'Thomas', full: 'Margaret Alice Thomas', dates: '1944 – 2026',
      photo: null, relation: null,
      source: 'Chicago Sun-Times', home: 'Eternal Springs Funeral Home', location: 'Dixon, IL',
      obit: 'Margaret Alice Thomas passed away on February 2, 2026, at the age of 81. She taught piano in Dixon for four decades and kept a jar of butterscotch candy on the bench for every student.'
    },
    recJaniceA: {
      first: 'Janice', last: 'Whitfield', full: 'Janice Amanda Whitfield', dates: '1973 – 2026',
      photo: null, relation: null,
      source: 'Chicago Sun-Times', home: 'Restwood Funeral Home', location: 'Chicago, IL',
      obit: 'Janice Amanda Whitfield passed away on June 11, 2026, at the age of 52. A librarian and fierce defender of the quiet corner, she matched readers to books with uncanny accuracy.'
    },
    recMichael: {
      first: 'Michael', last: 'Adams', full: 'Michael Brian Adams', dates: '1985 – 2023',
      photo: null, relation: null,
      source: 'The Boston Globe', home: 'Fairview Memorial Chapel', location: 'Boston, MA',
      obit: 'Michael Brian Adams passed away on September 30, 2023, at the age of 38. A high-school baseball coach, he is remembered for the dugout speeches his players still quote to each other.'
    },
    recSophia: {
      first: 'Sophia', last: 'Harper', full: 'Sophia Harper', dates: '1952 – 2025',
      photo: null, relation: null,
      source: 'The Sacramento Bee', home: 'Green Valley Funeral Home', location: 'Sacramento, CA',
      obit: 'Sophia Harper passed away on March 17, 2025, at the age of 72. A nurse, a quilter, and the first to arrive whenever a neighbor needed anything at all.'
    },
    recRobertD: {
      first: 'Robert', last: 'Thomas', full: 'Robert Dale Thomas', dates: '1950 – 2024',
      photo: null, relation: null,
      source: 'The Fresno Bee', home: 'Fresno Memorial Gardens', location: 'Fresno, CA',
      obit: 'Robert Dale Thomas passed away on August 8, 2024, at the age of 74. He farmed the same stretch of land his grandfather did and could read the weather better than any forecast.'
    },
    recLiam: {
      first: 'Liam', last: 'Victor', full: 'Liam Victor', dates: '1965 – 2024',
      photo: null, relation: null,
      source: 'The Denver Post', home: 'Mountain View Chapel', location: 'Denver, CO',
      obit: 'Liam Victor passed away on November 2, 2024, at the age of 59. A trail guide and mapmaker, he knew every switchback in the front range by heart.'
    },
    recClara: {
      first: 'Clara', last: 'Timmons', full: 'Clara Timmons', dates: '1938 – 2025',
      photo: null, relation: null,
      source: 'The Boston Globe', home: 'Fairview Memorial Chapel', location: 'Boston, MA',
      obit: 'Clara Timmons passed away on April 22, 2025, at the age of 86. She ran the corner bakery for fifty years and never once wrote down a recipe.'
    },
    recDavid: {
      first: 'David', last: 'Allen', full: 'David Allen', dates: '1947 – 2023',
      photo: null, relation: null,
      source: 'Los Angeles Times', home: 'Crenshaw Memorial', location: 'Los Angeles, CA',
      obit: 'David Allen passed away on July 5, 2023, at the age of 76. A studio engineer, he spent his life making other people sound their best and never asked for the credit.'
    },
    recEmma: {
      first: 'Emma', last: 'Miller', full: 'Emma Miller', dates: '1940 – 2026',
      photo: null, relation: null,
      source: 'The Sacramento Bee', home: 'Green Valley Funeral Home', location: 'Sacramento, CA',
      obit: 'Emma Miller passed away on January 30, 2026, at the age of 85. A county clerk for thirty years, she knew everyone\'s business and told no one\'s.'
    },
    recJamesN: {
      first: 'James', last: 'Norton', full: 'James Norton', dates: '1953 – 2025',
      photo: null, relation: null,
      source: 'Chicago Sun-Times', home: 'Restwood Funeral Home', location: 'Chicago, IL',
      obit: 'James Norton passed away on October 14, 2025, at the age of 72. A fire captain for the city, he retired to a quiet street and kept the hydrant on his corner clear all winter.'
    },
    recPatriciaK: {
      first: 'Patricia', last: 'Kelly', full: 'Patricia Kelly', dates: '1945 – 2022',
      photo: null, relation: null,
      source: 'Chicago Sun-Times', home: 'Eternal Springs Funeral Home', location: 'Dixon, IL',
      obit: 'Patricia Kelly passed away on December 3, 2022, at the age of 77. She kept the books for three generations of Dixon family businesses and remembered all of their stories.'
    },
    recQuinn: {
      first: 'Quinn', last: 'Robinson', full: 'Quinn Robinson', dates: '1961 – 2024',
      photo: null, relation: null,
      source: 'Los Angeles Times', home: 'Angelus Funeral Home', location: 'Los Angeles, CA',
      obit: 'Quinn Robinson passed away on May 28, 2024, at the age of 63. A bus driver on the same route for twenty-two years, he greeted every rider by name.'
    },
    recTyler: {
      first: 'Tyler', last: 'Smith', full: 'Tyler Smith', dates: '1972 – 2025',
      photo: null, relation: null,
      source: 'The Fresno Bee', home: 'Fresno Memorial Gardens', location: 'Fresno, CA',
      obit: 'Tyler Smith passed away on February 9, 2025, at the age of 52. A high-school art teacher whose murals still cover three walls of the gymnasium.'
    },
    recHelen: {
      first: 'Helen', last: 'Thomas', full: 'Helen Marie Thomas', dates: '1929 – 2015',
      photo: null, relation: null,
      source: 'The Fresno Bee', home: 'Fresno Memorial Gardens', location: 'Fresno, CA',
      obit: 'Helen Marie Thomas passed away in 2015 at the age of 86. She raised four children in Fresno and kept a garden that fed most of the street each summer.'
    },
    recArthur: {
      first: 'Arthur', last: 'Whitfield', full: 'Arthur Whitfield', dates: '1920 – 1998',
      photo: null, relation: null,
      source: 'Chicago Sun-Times', home: 'Restwood Funeral Home', location: 'Chicago, IL',
      obit: 'Arthur Whitfield passed away in 1998 at the age of 78. A veteran and a steelworker, he was known on his block for a workshop that was open to any kid with a broken bicycle.'
    },
    recRose: {
      first: 'Rose', last: 'Delgado', full: 'Rose Delgado', dates: '1933 – 2011',
      photo: null, relation: null,
      source: 'The Fresno Bee', home: 'Fresno Memorial Gardens', location: 'Fresno, CA',
      obit: 'Rose Delgado passed away in 2011 at the age of 78. She sewed wedding dresses for half of Fresno and signed each one inside the hem.'
    },
    recCarlos: {
      first: 'Carlos', last: 'Ramirez', full: 'Carlos Ramirez', dates: '1941 – 2019',
      photo: null, relation: null,
      source: 'Chicago Sun-Times', home: 'Eternal Springs Funeral Home', location: 'Dixon, IL',
      obit: 'Carlos Ramirez passed away in 2019 at the age of 78. A machinist and a devoted grandfather, he spent every Saturday morning at the hardware store whether he needed anything or not.'
    },
    recBeatrice: {
      first: 'Beatrice', last: 'Sanderson', full: 'Beatrice Sanderson', dates: '1926 – 2004',
      photo: null, relation: null,
      source: 'The Boston Globe', home: 'Fairview Memorial Chapel', location: 'Boston, MA',
      obit: 'Beatrice Sanderson passed away in 2004 at the age of 78. A Boston school teacher for thirty-five years, she kept in touch with students long after they had children of their own.'
    },
    recWalter: {
      first: 'Walter', last: 'Reed', full: 'Walter Reed', dates: '1918 – 1992',
      photo: null, relation: null,
      source: 'Los Angeles Sentinel', home: 'Angelus Funeral Home', location: 'Los Angeles, CA',
      obit: 'Walter Reed passed away in 1992 at the age of 74. A Pullman porter turned small-business owner, he opened the first record shop on his stretch of Central Avenue.'
    },
    recNora: {
      first: 'Nora', last: 'Pike', full: 'Nora Pike', dates: '1958 – 2023',
      photo: null, relation: null,
      source: 'The Denver Post', home: 'Mountain View Chapel', location: 'Denver, CO',
      obit: 'Nora Pike passed away on June 19, 2023, at the age of 65. A veterinarian who made house calls for anything too large to fit in a car.'
    },
    recSamuel: {
      first: 'Samuel', last: 'Thomas', full: 'Samuel Thomas', dates: '1962 – 2020',
      photo: null, relation: null,
      source: 'The Sacramento Bee', home: 'Green Valley Funeral Home', location: 'Sacramento, CA',
      obit: 'Samuel Thomas passed away on April 3, 2020, at the age of 58. A letter carrier for most of his life, he walked the same twelve miles a day and liked every one of them.'
    },
    recGrace: {
      first: 'Grace', last: 'Whitfield', full: 'Grace Ellen Whitfield', dates: '1936 – 2016',
      photo: null, relation: null,
      source: 'The Denver Post', home: 'Whitfield Chapel', location: 'Denver, CO',
      obit: 'Grace Ellen Whitfield passed away in 2016 at the age of 80. She organized the church rummage sale for forty years and could price anything at a glance.'
    },
    recVincent: {
      first: 'Vincent', last: 'Delgado', full: 'Vincent Delgado', dates: '1949 – 2021',
      photo: null, relation: null,
      source: 'The Fresno Bee', home: 'Fresno Memorial Gardens', location: 'Fresno, CA',
      obit: 'Vincent Delgado passed away on September 12, 2021, at the age of 72. An irrigation engineer, he spent his career getting water where it needed to go.'
    },
    recOlivia: {
      first: 'Olivia', last: 'Sanderson', full: 'Olivia Sanderson', dates: '1954 – 2022',
      photo: null, relation: null,
      source: 'The Boston Globe', home: 'Fairview Memorial Chapel', location: 'Boston, MA',
      obit: 'Olivia Sanderson passed away on November 25, 2022, at the age of 68. A harbor pilot and one of the first women licensed on the bay.'
    },
    recFrances: {
      first: 'Frances', last: 'Thomas', full: 'Frances Thomas', dates: '1955 – 2023',
      photo: null, relation: null,
      source: 'Chicago Sun-Times', home: 'Eternal Springs Funeral Home', location: 'Dixon, IL',
      obit: 'Frances Thomas passed away on July 21, 2023, at the age of 68. She ran the town newspaper\'s front desk and knew every birth, wedding, and loss before it went to print.'
    },
    recEdward: {
      first: 'Edward', last: 'Whitfield', full: 'Edward Whitfield', dates: '1931 – 2009',
      photo: null, relation: null,
      source: 'The Denver Post', home: 'Whitfield Chapel', location: 'Denver, CO',
      obit: 'Edward Whitfield passed away in 2009 at the age of 78. A rail engineer for thirty-one years, he could tell you the grade of every mile between Denver and Cheyenne.'
    },
    recMarian: {
      first: 'Marian', last: 'Reed', full: 'Marian Reed', dates: '1944 – 2018',
      photo: null, relation: null,
      source: 'Los Angeles Sentinel', home: 'Angelus Funeral Home', location: 'Los Angeles, CA',
      obit: 'Marian Reed passed away in 2018 at the age of 74. A civil rights organizer and a formidable cook, she fed every meeting she ever hosted.'
    },
    recGlenn: {
      first: 'Glenn', last: 'Sanderson', full: 'Glenn Sanderson', dates: '1949 – 2021',
      photo: null, relation: null,
      source: 'The Boston Globe', home: 'Fairview Memorial Chapel', location: 'Boston, MA',
      obit: 'Glenn Sanderson passed away on August 30, 2021, at the age of 72. A lobsterman out of Gloucester who was on the water by four every morning of his working life.'
    },
    recAnita: {
      first: 'Anita', last: 'Delgado', full: 'Anita Delgado', dates: '1937 – 2014',
      photo: null, relation: null,
      source: 'The Fresno Bee', home: 'Fresno Memorial Gardens', location: 'Fresno, CA',
      obit: 'Anita Delgado passed away in 2014 at the age of 77. She kept the family bakery open through two recessions and never raised the price of a dozen.'
    },
    recHoward: {
      first: 'Howard', last: 'Ramirez', full: 'Howard Ramirez', dates: '1958 – 2022',
      photo: null, relation: null,
      source: 'Chicago Sun-Times', home: 'Restwood Funeral Home', location: 'Chicago, IL',
      obit: 'Howard Ramirez passed away on March 6, 2022, at the age of 64. A city planner who spent his career arguing, successfully, for more trees.'
    },
    recLouise: {
      first: 'Louise', last: 'Harper', full: 'Louise Harper', dates: '1942 – 2020',
      photo: null, relation: null,
      source: 'The Sacramento Bee', home: 'Green Valley Funeral Home', location: 'Sacramento, CA',
      obit: 'Louise Harper passed away on October 9, 2020, at the age of 78. A court reporter for four decades, she heard the whole county\'s business and repeated none of it.'
    },
    recPhilip: {
      first: 'Philip', last: 'Alan', full: 'Philip Alan', dates: '1966 – 2024',
      photo: null, relation: null,
      source: 'The Denver Post', home: 'Mountain View Chapel', location: 'Denver, CO',
      obit: 'Philip Alan passed away on December 15, 2024, at the age of 58. A ski patroller turned paramedic, he spent his life getting to people fast.'
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

  // No-photo avatar color: assigned at random the first time a person is seen,
  // then persisted per id so it stays stable across renders and reloads (and is
  // the same everywhere that person appears). Cleared by "Reset demo".
  var AVATAR_COLORS = ['#728ab0', '#e77d91', '#81b8ae', '#e2ba60', '#afadaa'];
  var STORE_KEY = 'legacyMyPeople.v0';
  window.LEGACY_AVATAR_COLOR = function (id) {
    try {
      var o = JSON.parse(localStorage.getItem(STORE_KEY)) || {};
      o.avatarColors = o.avatarColors || {};
      if (!o.avatarColors[id]) {
        o.avatarColors[id] = AVATAR_COLORS[Math.floor(Math.random() * AVATAR_COLORS.length)];
        localStorage.setItem(STORE_KEY, JSON.stringify(o));
      }
      return o.avatarColors[id];
    } catch (_) { return AVATAR_COLORS[0]; }
  };
})();
