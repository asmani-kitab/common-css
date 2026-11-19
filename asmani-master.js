
/* =================================================
   ASMANI KITAB MASTER JAVASCRIPT
   Bengali Safe | Fast Loading | Chapter Cache
================================================= */


/* ===== ১. Blogger HTML উপাদান সংগ্রহ ===== */

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


/* ===== ২. Cache ও Fetch নিয়ন্ত্রণ ===== */

var chapterCache = new Map();
var CACHE_LIMIT = 8;

var activeController = null;
var requestId = 0;


/* ===== ৩. বাংলা HTML Entity ঠিক করা ===== */

function decodeHtmlText(value) {
  var textarea = document.createElement("textarea");
  var result = String(value == null ? "" : value);

  for (var i = 0; i < 4; i++) {
    textarea.innerHTML = result;

    var decoded = textarea.value;

    if (decoded === result) break;

    result = decoded;
  }

  return result;
}


/* ===== ৪. বাংলা ও আরবি অঙ্ককে ইংরেজি করা ===== */

function toEnglishDigits(value) {
  var digits = "০১২৩৪৫৬৭৮৯";
  var arabic = "٠١٢٣٤٥٦٧٨٩";

  return String(value).replace(/[০-৯٠-٩]/g, function(digit) {
    var index = digits.indexOf(digit);

    if (index !== -1) return String(index);

    index = arabic.indexOf(digit);

    return index !== -1 ? String(index) : digit;
  });
}


/* ===== ৫. ইংরেজি অঙ্ককে বাংলা করা ===== */

function toBengaliDigits(value) {
  return String(value).replace(/[0-9]/g, function(digit) {
    return "০১২৩৪৫৬৭৮৯".charAt(Number(digit));
  });
}


/* ===== ৬. Status বার্তা ===== */

function showStatus(message) {
  statusBox.textContent = message;
  statusBox.classList.add("am-show");
}

function clearStatus() {
  statusBox.textContent = "";
  statusBox.classList.remove("am-show");
}


/* ===== ৭. কিতাবের ড্রপডাউন তৈরি ===== */

function populateBooks() {
  bookSelect.innerHTML = "";

  var firstOption = document.createElement("option");

  firstOption.value = "";
  firstOption.textContent =
    decodeHtmlText("— কিতাব নির্বাচন করুন —");

  bookSelect.appendChild(firstOption);

  var groups = new Map();

  books.forEach(function(book) {
    if (!groups.has(book.group)) {
      groups.set(book.group, []);
    }

    groups.get(book.group).push(book);
  });

  groups.forEach(function(groupBooks, groupName) {
    var optgroup = document.createElement("optgroup");

    optgroup.label = decodeHtmlText(groupName);

    groupBooks.forEach(function(book) {
      var option = document.createElement("option");

      option.value = book.slug;
      option.textContent = decodeHtmlText(book.name);

      optgroup.appendChild(option);
    });

    bookSelect.appendChild(optgroup);
  });

  chapterSelect.innerHTML = "";

  var chapterOption = document.createElement("option");

  chapterOption.value = "";
  chapterOption.textContent =
    decodeHtmlText("— প্রথমে কিতাব নির্বাচন করুন —");

  chapterSelect.appendChild(chapterOption);

  chapterSelect.disabled = true;
}


/* ===== ৮. অধ্যায়ের ড্রপডাউন তৈরি ===== */

function updateChapters() {
  var selectedSlug = bookSelect.value;

  chapterSelect.innerHTML = "";

  var firstOption = document.createElement("option");

  firstOption.value = "";

  if (!selectedSlug) {
    firstOption.textContent =
      decodeHtmlText("— প্রথমে কিতাব নির্বাচন করুন —");

    chapterSelect.appendChild(firstOption);

    chapterSelect.disabled = true;

    clearStatus();

    return;
  }

  var selectedBook = books.find(function(book) {
    return book.slug === selectedSlug;
  });

  if (!selectedBook) return;

  firstOption.textContent =
    decodeHtmlText("— অধ্যায় নির্বাচন করুন —");

  chapterSelect.appendChild(firstOption);

  chapterSelect.disabled = false;

  for (var i = 1; i <= selectedBook.chapters; i++) {
    var option = document.createElement("option");

    option.value = String(i);

    option.textContent =
      decodeHtmlText("অধ্যায় " + toBengaliDigits(i));

    chapterSelect.appendChild(option);
  }

  clearStatus();
}


/* ===== ৯. অধ্যায়ের URL নির্ধারণ ===== */

function getChapterUrl(selectedBook, chapterNumber) {
  var chapterKey = String(chapterNumber);

  if (selectedBook.chapterUrls &&
      selectedBook.chapterUrls[chapterKey]) {
    return selectedBook.chapterUrls[chapterKey];
  }

  if (!selectedBook.url) return "";

  return selectedBook.url.replace(
    "{chapter}",
    chapterKey
  );
}


/* ===== ১০. Cache-এ অধ্যায় সংরক্ষণ ===== */

function saveToCache(url, html) {
  if (chapterCache.has(url)) {
    chapterCache.delete(url);
  }

  chapterCache.set(url, html);

  if (chapterCache.size > CACHE_LIMIT) {
    var oldestKey = chapterCache.keys().next().value;

    chapterCache.delete(oldestKey);
  }
}


/* ===== ১১. অধ্যায়ের মূল লেখা সংগ্রহ ===== */

function extractChapter(pageHtml) {
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
    throw new Error("অধ্যায়ের মূল লেখা খুঁজে পাওয়া যায়নি।");
  }

  var elements = sourceContent.querySelectorAll("h3, p");

  var container = document.createElement("div");

  var verseCount = 0;

  elements.forEach(function(element) {
    var isHeading = element.tagName === "H3";

    var isVerse =
      element.tagName === "P" &&
      element.querySelector(".verse-number");

    if (!isHeading && !isVerse) return;

    var copy = element.cloneNode(true);

    copy.querySelectorAll(
      "script, style, iframe, form, button, input, select, textarea"
    ).forEach(function(node) {
      node.remove();
    });

    /* অপ্রয়োজনীয় event attribute বাদ */
    var nodes = [copy].concat(
      Array.from(copy.querySelectorAll("*"))
    );

    nodes.forEach(function(node) {
      Array.from(node.attributes).forEach(function(attribute) {
        if (/^on/i.test(attribute.name)) {
          node.removeAttribute(attribute.name);
        }
      });
    });

    container.appendChild(copy);

    if (isVerse) {
      verseCount++;
    }
  });

  if (verseCount === 0) {
    throw new Error(
      'এই পেইজে .verse-number ক্লাসযুক্ত পদ পাওয়া যায়নি।'
    );
  }

  return container.innerHTML;
}


/* ===== ১২. অধ্যায়ের লেখা প্রদর্শন ===== */

function renderChapter(html, verseNumber, currentRequest) {
  if (currentRequest !== requestId) return;

  readerContent.innerHTML = html;

  clearStatus();

  if (verseNumber) {
    window.requestAnimationFrame(function() {
      if (currentRequest !== requestId) return;

      var verseNode = readerContent.querySelector(
        '[id="verse-' + Number(verseNumber) + '"]'
      );

      if (verseNode) {
        verseNode.classList.add("am-verse-highlight");

        verseNode.scrollIntoView({
          behavior: "smooth",
          block: "center"
        });

      } else {
        readerBox.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });

        showStatus(
          "অধ্যায়ের লেখা দেখানো হয়েছে, তবে নির্বাচিত পদটি পাওয়া যায়নি।"
        );
      }
    });

  } else {
    readerBox.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }
}


/* ===== ১৩. একই পেইজে অধ্যায় লোড ===== */

function loadChapter(selectedBook, chapterNumber, verseNumber) {
  var targetUrl = getChapterUrl(
    selectedBook,
    chapterNumber
  );

  if (!/^https?:\/\/[^ ]+$/i.test(targetUrl) ||
      targetUrl.indexOf("CHAPTER_") !== -1) {
    showStatus(
      "এই অধ্যায়ের URL সঠিক নয়। কিতাবের URL তালিকা পরীক্ষা করুন।"
    );

    return;
  }

  var cleanUrl = targetUrl.split("#")[0];

  /* আগের Fetch বাতিল */
  if (activeController) {
    activeController.abort();
  }

  activeController = null;

  var currentRequest = ++requestId;

  readerBox.classList.add("am-reader-show");

  readerContent.innerHTML =
    '<div class="am-reader-loading">অধ্যায়ের লেখা লোড হচ্ছে...</div>';

  clearStatus();

  updateNavigationButtons(
    selectedBook,
    chapterNumber
  );

  /* Cache-এ থাকলে সরাসরি প্রদর্শন */
  if (chapterCache.has(cleanUrl)) {
    var cachedHtml = chapterCache.get(cleanUrl);

    /* ব্যবহৃত Cache-কে সর্বশেষ অবস্থানে রাখা */
    chapterCache.delete(cleanUrl);

    chapterCache.set(cleanUrl, cachedHtml);

    renderChapter(
      cachedHtml,
      verseNumber,
      currentRequest
    );

    return;
  }

  if ("AbortController" in window) {
    activeController = new AbortController();
  }

  var fetchOptions = {
    method: "GET",
    credentials: "same-origin"
  };

  if (activeController) {
    fetchOptions.signal = activeController.signal;
  }

  fetch(cleanUrl, fetchOptions)

    .then(function(response) {
      if (!response.ok) {
        throw new Error(
          "পৃষ্ঠা পাওয়া যায়নি (" + response.status + ")"
        );
      }

      return response.text();
    })

    .then(function(pageHtml) {
      if (currentRequest !== requestId) return;

      var chapterHtml = extractChapter(pageHtml);

      saveToCache(cleanUrl, chapterHtml);

      renderChapter(
        chapterHtml,
        verseNumber,
        currentRequest
      );
    })

    .catch(function(error) {
      if (currentRequest !== requestId) return;

      if (error.name === "AbortError") return;

      readerContent.innerHTML =
        '<div class="am-reader-error">' +
        'এই অধ্যায়ের মূল পদগুলো লোড করা যায়নি।<br>' +
        'অধ্যায়ের URL এবং প্রতিটি পদের ' +
        '<b>verse-number</b> ক্লাস পরীক্ষা করুন।<br><br>' +
        '<a href="' +
        cleanUrl.replace(/&/g, "&amp;").replace(/"/g, "&quot;") +
        '" target="_blank" rel="noopener">' +
        'অধ্যায়টি আলাদা পেইজে খুলুন</a>' +
        '</div>';

      showStatus(error.message);

      readerBox.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    });
}


/* ===== ১৪. আগের ও পরের অধ্যায়ের বাটন ===== */

function updateNavigationButtons(selectedBook, chapterNumber) {
  var bookIndex = books.findIndex(function(book) {
    return book.slug === selectedBook.slug;
  });

  var atFirst =
    bookIndex === 0 &&
    chapterNumber === 1;

  var atLast =
    bookIndex === books.length - 1 &&
    chapterNumber === selectedBook.chapters;

  readerBox.querySelectorAll(
    '[data-am-direction="-1"]'
  ).forEach(function(button) {
    button.disabled = atFirst;
  });

  readerBox.querySelectorAll(
    '[data-am-direction="1"]'
  ).forEach(function(button) {
    button.disabled = atLast;
  });
}


/* ===== ১৫. আগের ও পরের অধ্যায়ে যাওয়া ===== */

function moveChapter(direction) {
  var currentSlug = bookSelect.value;

  var currentChapter = Number(chapterSelect.value);

  if (!currentSlug || !currentChapter) return;

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

  loadChapter(
    targetBook,
    targetChapter,
    ""
  );
}


/* ===== ১৬. পাঠ শুরু করুন বাটন ===== */

function openChapter() {
  var bookSlug = bookSelect.value;

  var chapterValue = chapterSelect.value;

  var verseValue = toEnglishDigits(
    verseInput.value.trim()
  );

  if (!bookSlug) {
    showStatus("প্রথমে একটি কিতাব নির্বাচন করুন.");

    bookSelect.focus();

    return;
  }

  if (!chapterValue) {
    showStatus("অনুগ্রহ করে একটি অধ্যায় নির্বাচন করুন।");

    chapterSelect.focus();

    return;
  }

  if (verseValue !== "" &&
      (!/^[0-9]+$/.test(verseValue) ||
       Number(verseValue) < 1)) {
    showStatus("সঠিক পদ নম্বর লিখুন।");

    verseInput.focus();

    return;
  }

  var selectedBook = books.find(function(book) {
    return book.slug === bookSlug;
  });

  var chapterNumber = Number(chapterValue);

  if (!selectedBook ||
      chapterNumber < 1 ||
      chapterNumber > selectedBook.chapters) {
    showStatus("নির্বাচিত অধ্যায়ের তথ্য সঠিক নয়।");

    return;
  }

  loadChapter(
    selectedBook,
    chapterNumber,
    verseValue
  );
}


/* ===== ১৭. বাটন ও ড্রপডাউন নিয়ন্ত্রণ ===== */

bookSelect.addEventListener(
  "change",
  updateChapters
);

readButton.addEventListener(
  "click",
  openChapter
);

readerBox.querySelectorAll(
  "[data-am-direction]"
).forEach(function(button) {
  button.addEventListener("click", function() {
    moveChapter(
      Number(button.getAttribute("data-am-direction"))
    );
  });
});

verseInput.addEventListener(
  "keydown",
  function(event) {
    if (event.key === "Enter") {
      openChapter();
    }
  }
);


/* ===== ১৮. পেইজ চালু হলে কিতাব দেখানো ===== */

populateBooks();

