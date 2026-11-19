var bookSelect = document.getElementById("am-book");
var chapterSelect = document.getElementById("am-chapter");
var verseInput = document.getElementById("am-verse");
var readButton = document.getElementById("am-read");
var statusBox = document.getElementById("am-status");
var readerBox = document.getElementById("am-reader");
var readerContent = document.getElementById("am-reader-content");

if (!bookSelect || !chapterSelect || !verseInput ||
    !readButton || !statusBox || !readerBox || !readerContent) {
  return;
}


/* ===== গতি বাড়ানোর জন্য Cache ও Fetch নিয়ন্ত্রণ ===== */

var chapterCache = new Map();
var CACHE_LIMIT = 8;

var activeController = null;
var requestId = 0;

/* =====================================================
   বাংলা লেখা / HTML Entity ঠিক করার ফাংশন
   Blogger কোনো বাংলা লেখাকে &#...; আকারে সংরক্ষণ করলে
   এই ফাংশন সেটিকে আবার স্বাভাবিক বাংলা অক্ষরে রূপান্তর করে।
   একাধিকবার encode হয়ে গেলেও সর্বোচ্চ 4 ধাপে ঠিক করবে।
===================================================== */

function decodeHtmlText(value) {
  var textarea = document.createElement("textarea");
  var result = String(value == null ? "" : value);

  for (var i = 0; i < 4; i++) {
    textarea.innerHTML = result;
    var decoded = textarea.value;

    if (decoded === result) {
      break;
    }

    result = decoded;
  }

  return result;
}


/* বাংলা ও আরবি অঙ্ককে ইংরেজি অঙ্কে রূপান্তর */

function toEnglishDigits(value) {
  var digits = "০১২৩৪৫৬৭৮৯";
  var arabic = "٠١٢٣٤٥٦٧٨٩";

  return String(value).replace(/[০-৯٠-٩]/g, function (digit) {
    var index = digits.indexOf(digit);

    if (index !== -1) {
      return String(index);
    }

    index = arabic.indexOf(digit);

    return index !== -1 ? String(index) : digit;
  });
}


/* ইংরেজি অঙ্ককে বাংলা অঙ্কে রূপান্তর */

function toBengaliDigits(value) {
  return String(value).replace(/[0-9]/g, function (digit) {
    return "০১২৩৪৫৬৭৮৯".charAt(Number(digit));
  });
}


/* বার্তা দেখানোর ব্যবস্থা */

function showStatus(message) {
  statusBox.textContent = message;
  statusBox.classList.add("am-show");
}

function clearStatus() {
  statusBox.textContent = "";
  statusBox.classList.remove("am-show");
}


/* কিতাবের তালিকা তৈরি */

function populateBooks() {
  /* HTML-এ থাকা প্রাথমিক অপশনও নিরাপদভাবে বাংলা করে বসানো হচ্ছে */
  var initialBookOption = bookSelect.querySelector('option[value=""]');
  if (initialBookOption) {
    initialBookOption.textContent = decodeHtmlText("— কিতাব নির্বাচন করুন —");
  }

  var initialChapterOption = chapterSelect.querySelector('option[value=""]');
  if (initialChapterOption) {
    initialChapterOption.textContent = decodeHtmlText("— প্রথমে কিতাব নির্বাচন করুন —");
  }

  var groups = [];

  books.forEach(function (book) {
    if (groups.indexOf(book.group) === -1) {
      groups.push(book.group);
    }
  });

  groups.forEach(function (groupName) {
    var optgroup = document.createElement("optgroup");
    optgroup.label = decodeHtmlText(groupName);

    books.forEach(function (book) {
      if (book.group === groupName) {
        var option = document.createElement("option");

        option.value = book.slug;
        option.textContent = decodeHtmlText(book.name);

        optgroup.appendChild(option);
      }
    });

    bookSelect.appendChild(optgroup);
  });
}


/* কিতাব নির্বাচন করলে অধ্যায়ের তালিকা তৈরি */

function updateChapters() {
  var selectedSlug = bookSelect.value;

  chapterSelect.innerHTML = "";

  if (!selectedSlug) {
    chapterSelect.disabled = true;

    var defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.textContent = decodeHtmlText("— প্রথমে কিতাব নির্বাচন করুন —");

    chapterSelect.appendChild(defaultOption);

    clearStatus();
    return;
  }

  var selectedBook = books.find(function (book) {
    return book.slug === selectedSlug;
  });

  if (!selectedBook) {
    return;
  }

  chapterSelect.disabled = false;

  var firstOption = document.createElement("option");
  firstOption.value = "";
  firstOption.textContent = decodeHtmlText("— অধ্যায় নির্বাচন করুন —");

  chapterSelect.appendChild(firstOption);

  for (var i = 1; i <= selectedBook.chapters; i++) {
    var option = document.createElement("option");

    option.value = String(i);
    option.textContent = decodeHtmlText("অধ্যায় " + toBengaliDigits(i));

    chapterSelect.appendChild(option);
  }

  clearStatus();
}


/* =====================================================
   গুরুত্বপূর্ণ নোট ৪:
   এই ফাংশনটি নির্বাচিত কিতাব ও অধ্যায়ের URL তৈরি করে।
   {chapter} অংশের জায়গায় অধ্যায়ের নম্বর বসায়।

   পদ নম্বর লিখলে URL-এর শেষে #verse-1, #verse-2
   ইত্যাদি যুক্ত হয়।
===================================================== */


/* নির্বাচিত কিতাব ও অধ্যায়ের সম্পূর্ণ URL নির্ধারণ */
function getChapterUrl(selectedBook, chapterNumber) {
  if (selectedBook.chapterUrls &&
      selectedBook.chapterUrls[String(chapterNumber)]) {
    return selectedBook.chapterUrls[String(chapterNumber)];
  }

  if (!selectedBook.url) {
    return "";
  }

  return selectedBook.url.replace("{chapter}", String(chapterNumber));
}



/* একই পেইজের মধ্যে অধ্যায়ের লেখা লোড */
function loadChapter(selectedBook, chapterNumber, verseNumber) {

  /* প্রতিটি নতুন অনুরোধের জন্য আলাদা ID */
  var currentRequest = ++requestId;

  /* আগের Fetch অনুরোধ চলমান থাকলে বাতিল */
  if (activeController) {
    activeController.abort();
    activeController = null;
  }

  var targetUrl = getChapterUrl(selectedBook, chapterNumber);

  if (!/^https?:\/\//i.test(targetUrl)) {
    showStatus("\u098F\u0987 \u0985\u09A7\u09CD\u09AF\u09BE\u09AF\u09BC\u09C7\u09B0 URL \u09B8\u09A0\u09BF\u0995 \u09A8\u09AF\u09BC\u0964 \u0995\u09BF\u09A4\u09BE\u09AC\u09C7\u09B0 URL \u09A4\u09BE\u09B2\u09BF\u0995\u09BE \u09AA\u09B0\u09C0\u0995\u09CD\u09B7\u09BE \u0995\u09B0\u09C1\u09A8\u0964");
    return;
  }

  readerBox.classList.add("am-reader-show");

  readerContent.innerHTML =
    '<div class="am-reader-loading">\u0985\u09A7\u09CD\u09AF\u09BE\u09AF\u09BC\u09C7\u09B0 \u09B2\u09C7\u0996\u09BE \u09B2\u09CB\u09A1 \u09B9\u099A\u09CD\u099B\u09C7...</div>';

  clearStatus();
  updateNavigationButtons(selectedBook, chapterNumber);

  var cleanUrl = targetUrl.split("#")[0];


  /* ===== অধ্যায়ের লেখা প্রদর্শনের ফাংশন ===== */

  function displayChapter(chapterHtml) {

    /* পুরোনো অনুরোধের ফলাফল প্রদর্শন করা হবে না */
    if (currentRequest !== requestId) {
      return;
    }

    readerContent.innerHTML = "";

    var verseContainer = document.createElement("div");
    verseContainer.innerHTML = chapterHtml;

    readerContent.appendChild(verseContainer);


    /* পদ নম্বর দিলে সেই পদের কাছে নিয়ে যাবে */

    if (verseNumber) {

      window.setTimeout(function() {

        /* এর মধ্যে নতুন অধ্যায় খোলা হলে পুরোনো Scroll বন্ধ */
        if (currentRequest !== requestId) {
          return;
        }

        var verseNode = readerContent.querySelector(
          '[id="verse-' + Number(verseNumber) + '"]'
        );

        if (verseNode) {

          verseNode.classList.add("am-verse-highlight");

          verseNode.scrollIntoView({
            behavior:"smooth",
            block:"center"
          });

        } else {

          readerBox.scrollIntoView({
            behavior:"smooth",
            block:"start"
          });

          showStatus(
            "\u0985\u09A7\u09CD\u09AF\u09BE\u09AF\u09BC\u09C7\u09B0 \u09AC\u09BE\u0995\u09CD\u09AF\u0997\u09C1\u09B2\u09CB \u09A6\u09C7\u0996\u09BE\u09A8\u09CB \u09B9\u09AF\u09BC\u09C7\u099B\u09C7, \u09A4\u09AC\u09C7 \u09A8\u09BF\u09B0\u09CD\u09AC\u09BE\u099A\u09BF\u09A4 \u09AA\u09A6\u09C7\u09B0 \u099C\u09A8\u09CD\u09AF id=\"verse-" +
            Number(verseNumber) +
            "\" \u09AA\u09BE\u0993\u09AF\u09BC\u09BE \u09AF\u09BE\u09AF\u09BC\u09A8\u09BF\u0964"
          );

        }

      }, 100);

    } else {

      readerBox.scrollIntoView({
        behavior:"smooth",
        block:"start"
      });

    }

  }


  /* ===== আগে খোলা অধ্যায় Cache-এ থাকলে সরাসরি দেখানো ===== */

  if (chapterCache.has(cleanUrl)) {

    var cachedHtml = chapterCache.get(cleanUrl);

    /* সর্বশেষ ব্যবহৃত অধ্যায় হিসেবে Cache-এর শেষে রাখা */
    chapterCache.delete(cleanUrl);
    chapterCache.set(cleanUrl, cachedHtml);

    displayChapter(cachedHtml);

    return;
  }


  /* ===== নতুন অধ্যায় Fetch করা ===== */

  if ("AbortController" in window) {
    activeController = new AbortController();
  }

  var fetchOptions = {
    method:"GET",
    credentials:"same-origin"
  };

  if (activeController) {
    fetchOptions.signal = activeController.signal;
  }


  fetch(cleanUrl, fetchOptions)

  .then(function(response) {

    if (!response.ok) {
      throw new Error(
        "\u09AA\u09C3\u09B7\u09CD\u09A0\u09BE \u09AA\u09BE\u0993\u09AF\u09BC\u09BE \u09AF\u09BE\u09AF\u09BC\u09A8\u09BF (" +
        response.status +
        ")"
      );
    }

    return response.text();

  })

  .then(function(pageHtml) {

    /* নতুন অনুরোধ এসে থাকলে পুরোনো ফলাফল বাদ */
    if (currentRequest !== requestId) {
      return;
    }

    var parser = new DOMParser();

    var pageDoc = parser.parseFromString(
      pageHtml,
      "text/html"
    );

    var sourceContent =
      pageDoc.querySelector(".post-body") ||
      pageDoc.querySelector(".entry-content") ||
      pageDoc.querySelector(".post-body-container") ||
      pageDoc.querySelector("article .post-body") ||
      pageDoc.querySelector("article");

    if (!sourceContent) {
      throw new Error(
        "\u0985\u09A7\u09CD\u09AF\u09BE\u09AF\u09BC\u09C7\u09B0 \u09AE\u09C2\u09B2 \u09B2\u09C7\u0996\u09BE \u0996\u09C1\u0981\u099C\u09C7 \u09AA\u09BE\u0993\u09AF\u09BC\u09BE \u09AF\u09BE\u09AF\u09BC\u09A8\u09BF\u0964"
      );
    }


    /*
      মূল অধ্যায়ের h3 টাইটেল ও পদগুলো সংগ্রহ করা হবে।
      টাইটেল এবং পদ যে ক্রমে আছে, সেই ক্রমেই দেখানো হবে।
      মেনু, লেখক পরিচিতি, ফুটার বা অন্য লেখা দেখানো হবে না।
    */

    var contentElements = sourceContent.querySelectorAll("h3, p");

    var verseContainer = document.createElement("div");

    var verseCount = 0;

    contentElements.forEach(function(element) {

      /* টাইটেল বা সাব-টাইটেল */
      if (element.tagName === "H3") {

        var headingCopy = element.cloneNode(true);

        headingCopy.querySelectorAll(
          "script,style,iframe,form,button,input,select,textarea"
        ).forEach(function(node) {
          node.remove();
        });

        verseContainer.appendChild(headingCopy);
      }

      /* পদ বা আয়াত */
      else if (
        element.tagName === "P" &&
        element.querySelector(".verse-number")
      ) {

        var verseCopy = element.cloneNode(true);

        /* নিরাপত্তা ও অপ্রয়োজনীয় উপাদান বাদ */
        verseCopy.querySelectorAll(
          "script,style,iframe,form,button,input,select,textarea"
        ).forEach(function(node) {
          node.remove();
        });

        verseContainer.appendChild(verseCopy);

        verseCount++;
      }

    });


    if (verseCount === 0) {
      throw new Error(
        "\u098F\u0987 \u09AA\u09C7\u0987\u099C\u09C7 .verse-number \u0995\u09CD\u09B2\u09BE\u09B8\u09AF\u09C1\u0995\u09CD\u09A4 \u09AA\u09A6 \u09AA\u09BE\u0993\u09AF\u09BC\u09BE \u09AF\u09BE\u09AF\u09BC\u09A8\u09BF\u0964 \u09AA\u09CD\u09B0\u09A4\u09BF\u099F\u09BF \u09AA\u09A6\u09C7\u09B0 span-\u098F class=\"verse-number\" \u0986\u099B\u09C7 \u0995\u09BF \u09A8\u09BE \u09AA\u09B0\u09C0\u0995\u09CD\u09B7\u09BE \u0995\u09B0\u09C1\u09A8\u0964"
      );
    }


    /* ===== Cache-এ অধ্যায়ের HTML সংরক্ষণ ===== */

    var chapterHtml = verseContainer.innerHTML;

    chapterCache.set(cleanUrl, chapterHtml);


    /* Cache সর্বোচ্চ ৮টি অধ্যায়ে সীমাবদ্ধ রাখা */

    if (chapterCache.size > CACHE_LIMIT) {

      var oldestKey = chapterCache.keys().next().value;

      chapterCache.delete(oldestKey);

    }


    /* অধ্যায়ের লেখা প্রদর্শন */

    displayChapter(chapterHtml);

  })

  .catch(function(error) {

    /* নতুন অনুরোধের কারণে পুরোনো Error দেখানো হবে না */
    if (currentRequest !== requestId) {
      return;
    }

    /* Fetch বাতিল হলে Error দেখানোর প্রয়োজন নেই */
    if (error.name === "AbortError") {
      return;
    }

    readerContent.innerHTML =
      '<div class="am-reader-error">' +
      '\u098F\u0987 \u0985\u09A7\u09CD\u09AF\u09BE\u09AF\u09BC\u09C7\u09B0 \u09B6\u09C1\u09A7\u09C1 \u09AE\u09C2\u09B2 \u09AA\u09A6\u0997\u09C1\u09B2\u09CB \u09B2\u09CB\u09A1 \u0995\u09B0\u09BE \u09AF\u09BE\u09AF\u09BC\u09A8\u09BF\u0964<br>' +
      '\u0985\u09A7\u09CD\u09AF\u09BE\u09AF\u09BC\u09C7\u09B0 URL \u098F\u09AC\u0982 \u09AA\u09CD\u09B0\u09A4\u09BF\u099F\u09BF \u09AA\u09A6\u09C7\u09B0 <b>verse-number</b> \u0995\u09CD\u09B2\u09BE\u09B8 \u09AA\u09B0\u09C0\u0995\u09CD\u09B7\u09BE \u0995\u09B0\u09C1\u09A8\u0964<br><br>' +
      '<a href="' +
      cleanUrl.replace(/&/g, "&amp;").replace(/"/g, "&quot;") +
      '" target="_blank" rel="noopener">\u0985\u09A7\u09CD\u09AF\u09BE\u09AF\u09BC\u099F\u09BF \u0986\u09B2\u09BE\u09A6\u09BE \u09AA\u09C7\u0987\u099C\u09C7 \u0996\u09C1\u09B2\u09C1\u09A8</a>' +
      '</div>';

    readerBox.classList.add("am-reader-show");

    readerBox.scrollIntoView({
      behavior:"smooth",
      block:"start"
    });

    showStatus(error.message);

  });

}

/* আগের ও পরের অধ্যায়ের বাটনের অবস্থা নির্ধারণ */
function updateNavigationButtons(selectedBook, chapterNumber) {
  var bookIndex = books.findIndex(function(book) {
    return book.slug === selectedBook.slug;
  });

  var atFirst = bookIndex === 0 && chapterNumber === 1;
  var atLast = bookIndex === books.length - 1 &&
               chapterNumber === selectedBook.chapters;

  readerBox.querySelectorAll('[data-am-direction="-1"]').forEach(function(btn) {
    btn.disabled = atFirst;
  });

  readerBox.querySelectorAll('[data-am-direction="1"]').forEach(function(btn) {
    btn.disabled = atLast;
  });
}

/* আগের/পরের অধ্যায়ে একই পেইজে যাওয়া; প্রয়োজনে পরের কিতাবে প্রবেশ */
function moveChapter(direction) {
  var currentSlug = bookSelect.value;
  var currentChapter = Number(chapterSelect.value);

  if (!currentSlug || !currentChapter) {
    return;
  }

  var bookIndex = books.findIndex(function(book) {
    return book.slug === currentSlug;
  });

  if (bookIndex < 0) return;

  var targetBook = books[bookIndex];
  var targetChapter = currentChapter + direction;

  if (targetChapter < 1) {
    if (bookIndex === 0) return;
    targetBook = books[bookIndex - 1];
    targetChapter = targetBook.chapters;
  } else if (targetChapter > targetBook.chapters) {
    if (bookIndex >= books.length - 1) return;
    targetBook = books[bookIndex + 1];
    targetChapter = 1;
  }

  bookSelect.value = targetBook.slug;
  updateChapters();
  chapterSelect.value = String(targetChapter);
  verseInput.value = "";

  loadChapter(targetBook, targetChapter, "");
}

function openChapter() {
  var bookSlug = bookSelect.value;
  var chapterValue = chapterSelect.value;
  var verseValue = toEnglishDigits(verseInput.value.trim());

  if (!bookSlug) {
    showStatus("\u09AA\u09CD\u09B0\u09A5\u09AE\u09C7 \u098F\u0995\u099F\u09BF \u0995\u09BF\u09A4\u09BE\u09AC \u09A8\u09BF\u09B0\u09CD\u09AC\u09BE\u099A\u09A8 \u0995\u09B0\u09C1\u09A8\u0964");
    bookSelect.focus();
    return;
  }

  if (!chapterValue) {
    showStatus("\u0985\u09A8\u09C1\u0997\u09CD\u09B0\u09B9 \u0995\u09B0\u09C7 \u098F\u0995\u099F\u09BF \u0985\u09A7\u09CD\u09AF\u09BE\u09AF\u09BC \u09A8\u09BF\u09B0\u09CD\u09AC\u09BE\u099A\u09A8 \u0995\u09B0\u09C1\u09A8\u0964");
    chapterSelect.focus();
    return;
  }

  if (verseValue !== "") {
    if (!/^[0-9]+$/.test(verseValue) || Number(verseValue) < 1) {
      showStatus("\u09B8\u09A0\u09BF\u0995 \u09AA\u09A6 \u09A8\u09AE\u09CD\u09AC\u09B0 \u09B2\u09BF\u0996\u09C1\u09A8\u0964");
      verseInput.focus();
      return;
    }
  }

  var selectedBook = books.find(function (book) {
    return book.slug === bookSlug;
  });

  var chapterNumber = Number(chapterValue);

  if (!selectedBook ||
      chapterNumber < 1 ||
      chapterNumber > selectedBook.chapters) {
    showStatus("\u09A8\u09BF\u09B0\u09CD\u09AC\u09BE\u099A\u09BF\u09A4 \u0985\u09A7\u09CD\u09AF\u09BE\u09AF\u09BC\u09C7\u09B0 \u09A4\u09A5\u09CD\u09AF \u09B8\u09A0\u09BF\u0995 \u09A8\u09AF\u09BC\u0964");
    return;
  }

  /*
   * এখানে সম্পূর্ণ URL তৈরি হচ্ছে।
   * {chapter} এর জায়গায় অধ্যায়ের নম্বর বসবে।
   */

  /*
   * প্রথমে chapterUrls-এ নির্দিষ্ট অধ্যায়ের আলাদা URL আছে কি না দেখা হবে।
   * থাকলে সেটি ব্যবহার হবে; না থাকলে url-এর {chapter} বদলে URL তৈরি হবে।
   *
   * উদাহরণ:
   * chapterUrls:{"1":"https://.../blog-page_504.html"}
   * url:"https://.../genesis-{chapter}.html"
   */
  var targetUrl = "";

  if (selectedBook.chapterUrls && selectedBook.chapterUrls[String(chapterNumber)]) {
    targetUrl = selectedBook.chapterUrls[String(chapterNumber)];
  } else {
    targetUrl = selectedBook.url.replace(
      "{chapter}",
      String(chapterNumber)
    );
  }

  if (!/^https?:\/\//i.test(targetUrl)) {
    showStatus("\u098F\u0987 \u0985\u09A7\u09CD\u09AF\u09BE\u09AF\u09BC\u09C7\u09B0 URL \u09B8\u09A0\u09BF\u0995 \u09A8\u09AF\u09BC\u0964 books \u09A4\u09BE\u09B2\u09BF\u0995\u09BE\u09AF\u09BC URL \u09AA\u09B0\u09C0\u0995\u09CD\u09B7\u09BE \u0995\u09B0\u09C1\u09A8\u0964");
    return;
  }

  /*
   * পদ নম্বর দেওয়া থাকলে পদে যাওয়ার লিংক যুক্ত হবে।
   */

  if (verseValue !== "") {
    targetUrl += "#verse-" + Number(verseValue);
  }

  /*
   * অন্য পেইজে না গিয়ে একই মাস্টার পেইজের নিচে অধ্যায় দেখানো হবে।
   */
  loadChapter(selectedBook, chapterNumber, verseValue);
}


/* =====================================================
   গুরুত্বপূর্ণ নোট ৫:
   নিচের অংশে বাটন ও ড্রপডাউন কাজ করার নির্দেশ দেওয়া আছে।
   সাধারণত এই অংশ পরিবর্তন করার প্রয়োজন নেই।
===================================================== */

bookSelect.addEventListener("change", updateChapters);

readButton.addEventListener("click", openChapter);

/* উপরে ও নিচে থাকা আগের/পরের অধ্যায়ের অ্যারো বাটন */
readerBox.querySelectorAll("[data-am-direction]").forEach(function(button) {
  button.addEventListener("click", function() {
    moveChapter(Number(button.getAttribute("data-am-direction")));
  });
});

verseInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    openChapter();
  }
});


/* পেইজ চালু হলে কিতাবের তালিকা তৈরি হবে */

populateBooks();

})();
