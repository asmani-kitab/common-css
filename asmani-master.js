(function () {
"use strict";

/* =====================================================
   গুরুত্বপূর্ণ নোট ১:
   নিচের তালিকায় প্রতিটি কিতাবের নাম, অধ্যায়সংখ্যা
   এবং সম্পূর্ণ URL দেওয়া হয়েছে।

   URL-এর শেষে {chapter} লেখা অংশটি পরিবর্তন করবেন না,
   যদি নিচের স্বয়ংক্রিয় URL তৈরির নিয়ম ব্যবহার করেন।

   উদাহরণ (শুধু তখনই কাজ করবে, যদি Blogger Custom Permalink-ও এভাবে হয়):
   genesis-{chapter}.html

   অধ্যায় ১ হলে:
   https://divineword4u.blogspot.com/p/genesis-1.html

   অধ্যায় ২ হলে:
   https://divineword4u.blogspot.com/p/genesis-2.html

   আপনার Blogger পেইজের প্রকৃত URL আলাদা হলে,
   সংশ্লিষ্ট কিতাবের url-এর ঠিকানাটি পরিবর্তন করবেন।

   সৃষ্টির ইতিহাসের ১ম ও ২য় অধ্যায়ের আপনার দেওয়া
   প্রকৃত URL chapterUrls তালিকায় রাখা হয়েছে।

   কোনো অধ্যায়ের URL অন্যরকম হলে সেই কিতাবের object-এর
   ভেতরে chapterUrls যোগ করে অধ্যায় নম্বর অনুযায়ী URL দিন।
   উদাহরণ:
   chapterUrls:{
     "1":"https://divineword4u.blogspot.com/p/blog-page_504.html",
     "2":"https://divineword4u.blogspot.com/p/blog-page_228.html",
     "3":"https://divineword4u.blogspot.com/p/আপনার-তৃতীয়-অধ্যায়ের-লিংক.html"
   }

   একই কিতাবের জন্য একটিমাত্র object রাখবেন।
   একই slug দিয়ে দ্বিতীয় object তৈরি করবেন না।
===================================================== */

var books = [

  /* ========== তাওরাত শরীফ ========== */

  {
    group:"তাওরাত শরীফ",
    name:"সৃষ্টির ইতিহাস",
    slug:"genesis",
    chapters:50,

    /* সাধারণ URL-এর নিয়ম:
       যেসব অধ্যায়ের আলাদা URL নিচে দেওয়া নেই,
       সেগুলোর জন্য এই ঠিকানা ব্যবহার হবে। */
    url:"https://divineword4u.blogspot.com/p/genesis-{chapter}.html",

    /* সৃষ্টির ইতিহাসের প্রকাশিত অধ্যায়গুলোর প্রকৃত URL:
       পরবর্তী অধ্যায়ের URL পেলে এখানে নতুন লাইন যোগ করবেন।
       উদাহরণ:
       "3":"https://divineword4u.blogspot.com/p/আপনার-তৃতীয়-অধ্যায়ের-লিংক.html"
    */
    chapterUrls:{
      	"1":"https://divineword4u.blogspot.com/p/blog-page_504.html",
    	"2":"https://divineword4u.blogspot.com/p/blog-page_228.html",
     	"3":"https://divineword4u.blogspot.com/p/blog-page_797.html",
		"4":"https://divineword4u.blogspot.com/p/blog-page_592.html",
		"5":"https://divineword4u.blogspot.com/p/blog-page_13.html",
        "6":"https://divineword4u.blogspot.com/p/blog-page_830.html",
        "7":"https://divineword4u.blogspot.com/p/blog-page_216.html",
        "8":"https://divineword4u.blogspot.com/p/blog-page_710.html",
        "9":"https://divineword4u.blogspot.com/p/blog-page_71.html",
        "10":"https://divineword4u.blogspot.com/p/blog-page_974.html",
        "11":"https://divineword4u.blogspot.com/p/blog-page_831.html",
        "12":"https://divineword4u.blogspot.com/p/blog-page_700.html",
        "13":"https://divineword4u.blogspot.com/p/blog-page_624.html",
        "14":"https://divineword4u.blogspot.com/p/blog-page_734.html",
        "15":"https://divineword4u.blogspot.com/p/blog-page_287.html",
        "16":"https://divineword4u.blogspot.com/p/blog-page_897.html",
        "17":"https://divineword4u.blogspot.com/p/blog-page_655.html",
        "18":"https://divineword4u.blogspot.com/p/blog-page_343.html",
        "19":"https://divineword4u.blogspot.com/p/blog-page_428.html",
        "20":"https://divineword4u.blogspot.com/p/blog-page_708.html",
        "21":"https://divineword4u.blogspot.com/p/blog-page_324.html",
        "22":"https://divineword4u.blogspot.com/p/blog-page_633.html",
        "23":"https://divineword4u.blogspot.com/p/blog-page_281.html",
        "24":"https://divineword4u.blogspot.com/p/blog-page_756.html",
        "25":"https://divineword4u.blogspot.com/p/blog-page_623.html",
        "26":"https://divineword4u.blogspot.com/p/blog-page_408.html",
        "27":"https://divineword4u.blogspot.com/p/blog-page_255.html",
        "28":"CHAPTER_28_URL",
        "29":"CHAPTER_29_URL",
        "30":"CHAPTER_30_URL",
        "31":"CHAPTER_31_URL",
        "32":"CHAPTER_32_URL",
        "33":"CHAPTER_33_URL",
        "34":"CHAPTER_34_URL",
        "35":"CHAPTER_35_URL",
        "36":"CHAPTER_36_URL",
        "37":"CHAPTER_37_URL",
        "38":"CHAPTER_38_URL",
        "39":"CHAPTER_39_URL",
        "40":"CHAPTER_40_URL",
        "41":"CHAPTER_41_URL",
        "42":"CHAPTER_42_URL",
        "43":"CHAPTER_43_URL",
        "44":"CHAPTER_44_URL",
        "45":"CHAPTER_45_URL",
        "46":"CHAPTER_46_URL",
        "47":"CHAPTER_47_URL",
        "48":"CHAPTER_48_URL",
        "49":"CHAPTER_49_URL",
        "50":"CHAPTER_50_URL"
    }
  },
  
  {
    group:"তাওরাত শরীফ",
    name:"যাত্রাপুস্তক",
    slug:"exodus",
    chapters:40,
    url:"https://divineword4u.blogspot.com/p/exodus-{chapter}.html"
  },
  {
    group:"তাওরাত শরীফ",
    name:"লেবীয়",
    slug:"leviticus",
    chapters:27,
    url:"https://divineword4u.blogspot.com/p/leviticus-{chapter}.html"
  },
  {
    group:"তাওরাত শরীফ",
    name:"শুমারী",
    slug:"numbers",
    chapters:36,
    url:"https://divineword4u.blogspot.com/p/numbers-{chapter}.html"
  },
  {
    group:"তাওরাত শরীফ",
    name:"দ্বিতীয় বিবরণ",
    slug:"deuteronomy",
    chapters:34,
    url:"https://divineword4u.blogspot.com/p/deuteronomy-{chapter}.html"
  },

  /* ========== নবীদের কিতাব ১ম অংশ ========== */

  {
    group:"নবীদের কিতাব ১ম অংশ",
    name:"ইউসা",
    slug:"joshua",
    chapters:24,
    url:"https://divineword4u.blogspot.com/p/joshua-{chapter}.html"
  },
  {
    group:"নবীদের কিতাব ১ম অংশ",
    name:"কাজীগণ",
    slug:"judges",
    chapters:21,
    url:"https://divineword4u.blogspot.com/p/judges-{chapter}.html"
  },
  {
    group:"নবীদের কিতাব ১ম অংশ",
    name:"রূত",
    slug:"ruth",
    chapters:4,
    url:"https://divineword4u.blogspot.com/p/ruth-{chapter}.html"
  },
  {
    group:"নবীদের কিতাব ১ম অংশ",
    name:"১ম শামুয়েল",
    slug:"1-samuel",
    chapters:31,
    url:"https://divineword4u.blogspot.com/p/1-samuel-{chapter}.html"
  },
  {
    group:"নবীদের কিতাব ১ম অংশ",
    name:"২য় শামুয়েল",
    slug:"2-samuel",
    chapters:24,
    url:"https://divineword4u.blogspot.com/p/2-samuel-{chapter}.html"
  },
  {
    group:"নবীদের কিতাব ১ম অংশ",
    name:"১ম বাদশাহ্‌নামা",
    slug:"1-kings",
    chapters:22,
    url:"https://divineword4u.blogspot.com/p/1-kings-{chapter}.html"
  },
  {
    group:"নবীদের কিতাব ১ম অংশ",
    name:"২য় বাদশাহ্‌নামা",
    slug:"2-kings",
    chapters:25,
    url:"https://divineword4u.blogspot.com/p/2-kings-{chapter}.html"
  },
  {
    group:"নবীদের কিতাব ১ম অংশ",
    name:"১ম খান্দাননামা",
    slug:"1-chronicles",
    chapters:29,
    url:"https://divineword4u.blogspot.com/p/1-chronicles-{chapter}.html"
  },
  {
    group:"নবীদের কিতাব ১ম অংশ",
    name:"২য় খান্দাননামা",
    slug:"2-chronicles",
    chapters:36,
    url:"https://divineword4u.blogspot.com/p/2-chronicles-{chapter}.html"
  },
  {
    group:"নবীদের কিতাব ১ম অংশ",
    name:"উযায়ের",
    slug:"ezra",
    chapters:10,
    url:"https://divineword4u.blogspot.com/p/ezra-{chapter}.html"
  },
  {
    group:"নবীদের কিতাব ১ম অংশ",
    name:"নহিমিয়া",
    slug:"nehemiah",
    chapters:13,
    url:"https://divineword4u.blogspot.com/p/nehemiah-{chapter}.html"
  },
  {
    group:"নবীদের কিতাব ১ম অংশ",
    name:"ইষ্টের",
    slug:"esther",
    chapters:10,
    url:"https://divineword4u.blogspot.com/p/esther-{chapter}.html"
  },

  /* ========== যবুর শরীফ ========== */

  {
    group:"যবুর শরীফ",
    name:"আইয়ুব",
    slug:"job",
    chapters:42,
    url:"https://divineword4u.blogspot.com/p/job-{chapter}.html"
  },
  {
    group:"যবুর শরীফ",
    name:"জবুর",
    slug:"psalms",
    chapters:150,
    url:"https://divineword4u.blogspot.com/p/psalms-{chapter}.html"
  },
  {
    group:"যবুর শরীফ",
    name:"মেসাল",
    slug:"proverbs",
    chapters:31,
    url:"https://divineword4u.blogspot.com/p/proverbs-{chapter}.html"
  },
  {
    group:"যবুর শরীফ",
    name:"হেদায়েতকারী",
    slug:"ecclesiastes",
    chapters:12,
    url:"https://divineword4u.blogspot.com/p/ecclesiastes-{chapter}.html"
  },
  {
    group:"যবুর শরীফ",
    name:"সোলায়মানের শীর",
    slug:"song-of-solomon",
    chapters:8,
    url:"https://divineword4u.blogspot.com/p/song-of-solomon-{chapter}.html"
  },

  /* ========== নবীদের কিতাব ২য় অংশ ========== */

  {
    group:"নবীদের কিতাব ২য় অংশ",
    name:"ইশাইয়া",
    slug:"isaiah",
    chapters:66,
    url:"https://divineword4u.blogspot.com/p/isaiah-{chapter}.html"
  },
  {
    group:"নবীদের কিতাব ২য় অংশ",
    name:"ইয়ারমিয়া",
    slug:"jeremiah",
    chapters:52,
    url:"https://divineword4u.blogspot.com/p/jeremiah-{chapter}.html"
  },
  {
    group:"নবীদের কিতাব ২য় অংশ",
    name:"বিলাপগাথা",
    slug:"lamentations",
    chapters:5,
    url:"https://divineword4u.blogspot.com/p/lamentations-{chapter}.html"
  },
  {
    group:"নবীদের কিতাব ২য় অংশ",
    name:"ইহিস্কেল",
    slug:"ezekiel",
    chapters:48,
    url:"https://divineword4u.blogspot.com/p/ezekiel-{chapter}.html"
  },
  {
    group:"নবীদের কিতাব ২য় অংশ",
    name:"দানিয়েল",
    slug:"daniel",
    chapters:12,
    url:"https://divineword4u.blogspot.com/p/daniel-{chapter}.html"
  },
  {
    group:"নবীদের কিতাব ২য় অংশ",
    name:"হোসিয়া",
    slug:"hosea",
    chapters:14,
    url:"https://divineword4u.blogspot.com/p/hosea-{chapter}.html"
  },
  {
    group:"নবীদের কিতাব ২য় অংশ",
    name:"যোয়েল",
    slug:"joel",
    chapters:3,
    url:"https://divineword4u.blogspot.com/p/joel-{chapter}.html"
  },
  {
    group:"নবীদের কিতাব ২য় অংশ",
    name:"আমোস",
    slug:"amos",
    chapters:9,
    url:"https://divineword4u.blogspot.com/p/amos-{chapter}.html"
  },
  {
    group:"নবীদের কিতাব ২য় অংশ",
    name:"ওবদিয়",
    slug:"obadiah",
    chapters:1,
    url:"https://divineword4u.blogspot.com/p/obadiah-{chapter}.html"
  },
  {
    group:"নবীদের কিতাব ২য় অংশ",
    name:"ইউনুস",
    slug:"jonah",
    chapters:4,
    url:"https://divineword4u.blogspot.com/p/jonah-{chapter}.html"
  },
  {
    group:"নবীদের কিতাব ২য় অংশ",
    name:"মিকাহ্‌",
    slug:"micah",
    chapters:7,
    url:"https://divineword4u.blogspot.com/p/micah-{chapter}.html"
  },
  {
    group:"নবীদের কিতাব ২য় অংশ",
    name:"নাহূম",
    slug:"nahum",
    chapters:3,
    url:"https://divineword4u.blogspot.com/p/nahum-{chapter}.html"
  },
  {
    group:"নবীদের কিতাব ২য় অংশ",
    name:"হাবাক্কুক",
    slug:"habakkuk",
    chapters:3,
    url:"https://divineword4u.blogspot.com/p/habakkuk-{chapter}.html"
  },
  {
    group:"নবীদের কিতাব ২য় অংশ",
    name:"সফনিয়",
    slug:"zephaniah",
    chapters:3,
    url:"https://divineword4u.blogspot.com/p/zephaniah-{chapter}.html"
  },
  {
    group:"নবীদের কিতাব ২য় অংশ",
    name:"হগয়",
    slug:"haggai",
    chapters:2,
    url:"https://divineword4u.blogspot.com/p/haggai-{chapter}.html"
  },
  {
    group:"নবীদের কিতাব ২য় অংশ",
    name:"জাকারিয়া",
    slug:"zechariah",
    chapters:14,
    url:"https://divineword4u.blogspot.com/p/zechariah-{chapter}.html"
  },
  {
    group:"নবীদের কিতাব ২য় অংশ",
    name:"মালাখি",
    slug:"malachi",
    chapters:4,
    url:"https://divineword4u.blogspot.com/p/malachi-{chapter}.html"
  },

  /* ========== ইঞ্জিল শরীফ========== */

  {
    group:"ইঞ্জিল শরীফ",
    name:"মথি",
    slug:"matthew",
    chapters:28,
    url:"https://divineword4u.blogspot.com/p/matthew-{chapter}.html"
  },
  {
    group:"ইঞ্জিল শরীফ",
    name:"মার্ক",
    slug:"mark",
    chapters:16,
    url:"https://divineword4u.blogspot.com/p/mark-{chapter}.html"
  },
  {
    group:"ইঞ্জিল শরীফ",
    name:"লূক",
    slug:"luke",
    chapters:24,
    url:"https://divineword4u.blogspot.com/p/luke-{chapter}.html"
  },
  {
    group:"ইঞ্জিল শরীফ",
    name:"ইউহোন্না",
    slug:"john",
    chapters:21,
    url:"https://divineword4u.blogspot.com/p/john-{chapter}.html"
  },
  {
    group:"ইঞ্জিল শরীফ",
    name:"প্রেরিত",
    slug:"acts",
    chapters:28,
    url:"https://divineword4u.blogspot.com/p/acts-{chapter}.html"
  },
  {
    group:"ইঞ্জিল শরীফ",
    name:"রোমীয়",
    slug:"romans",
    chapters:16,
    url:"https://divineword4u.blogspot.com/p/romans-{chapter}.html"
  },
  {
    group:"ইঞ্জিল শরীফ",
    name:"১ম করিন্থীয়",
    slug:"1-corinthians",
    chapters:16,
    url:"https://divineword4u.blogspot.com/p/1-corinthians-{chapter}.html"
  },
  {
    group:"ইঞ্জিল শরীফ",
    name:"২য় করিন্থীয়",
    slug:"2-corinthians",
    chapters:13,
    url:"https://divineword4u.blogspot.com/p/2-corinthians-{chapter}.html"
  },
  {
    group:"ইঞ্জিল শরীফ",
    name:"গালাতীয়",
    slug:"galatians",
    chapters:6,
    url:"https://divineword4u.blogspot.com/p/galatians-{chapter}.html"
  },
  {
    group:"ইঞ্জিল শরীফ",
    name:"ইফিষীয়",
    slug:"ephesians",
    chapters:6,
    url:"https://divineword4u.blogspot.com/p/ephesians-{chapter}.html"
  },
  {
    group:"ইঞ্জিল শরীফ",
    name:"ফিলিপীয়",
    slug:"philippians",
    chapters:4,
    url:"https://divineword4u.blogspot.com/p/philippians-{chapter}.html"
  },
  {
    group:"ইঞ্জিল শরীফ",
    name:"কলসীয়",
    slug:"colossians",
    chapters:4,
    url:"https://divineword4u.blogspot.com/p/colossians-{chapter}.html"
  },
  {
    group:"ইঞ্জিল শরীফ",
    name:"১ম থিষলনীকীয়",
    slug:"1-thessalonians",
    chapters:5,
    url:"https://divineword4u.blogspot.com/p/1-thessalonians-{chapter}.html"
  },
  {
    group:"ইঞ্জিল শরীফ",
    name:"২য় থিষলনীকীয়",
    slug:"2-thessalonians",
    chapters:3,
    url:"https://divineword4u.blogspot.com/p/2-thessalonians-{chapter}.html"
  },
  {
    group:"ইঞ্জিল শরীফ",
    name:"১ম তীমথিয়",
    slug:"1-timothy",
    chapters:6,
    url:"https://divineword4u.blogspot.com/p/1-timothy-{chapter}.html"
  },
  {
    group:"ইঞ্জিল শরীফ",
    name:"২য় তীমথিয়",
    slug:"2-timothy",
    chapters:4,
    url:"https://divineword4u.blogspot.com/p/2-timothy-{chapter}.html"
  },
  {
    group:"ইঞ্জিল শরীফ",
    name:"তীত",
    slug:"titus",
    chapters:3,
    url:"https://divineword4u.blogspot.com/p/titus-{chapter}.html"
  },
  {
    group:"ইঞ্জিল শরীফ",
    name:"ফিলীমন",
    slug:"philemon",
    chapters:1,
    url:"https://divineword4u.blogspot.com/p/philemon-{chapter}.html"
  },
  {
    group:"ইঞ্জিল শরীফ",
    name:"ইবরানী",
    slug:"hebrews",
    chapters:13,
    url:"https://divineword4u.blogspot.com/p/hebrews-{chapter}.html"
  },
  {
    group:"ইঞ্জিল শরীফ",
    name:"ইয়াকুব",
    slug:"james",
    chapters:5,
    url:"https://divineword4u.blogspot.com/p/james-{chapter}.html"
  },
  {
    group:"ইঞ্জিল শরীফ",
    name:"১ম পিতর",
    slug:"1-peter",
    chapters:5,
    url:"https://divineword4u.blogspot.com/p/1-peter-{chapter}.html"
  },
  {
    group:"ইঞ্জিল শরীফ",
    name:"২য় পিতর",
    slug:"2-peter",
    chapters:3,
    url:"https://divineword4u.blogspot.com/p/2-peter-{chapter}.html"
  },
  {
    group:"ইঞ্জিল শরীফ",
    name:"১ম ইউহোন্না",
    slug:"1-john",
    chapters:5,
    url:"https://divineword4u.blogspot.com/p/1-john-{chapter}.html"
  },
  {
    group:"ইঞ্জিল শরীফ",
    name:"২য় ইউহোন্না",
    slug:"2-john",
    chapters:1,
    url:"https://divineword4u.blogspot.com/p/2-john-{chapter}.html"
  },
  {
    group:"ইঞ্জিল শরীফ",
    name:"৩য় ইউহোন্না",
    slug:"3-john",
    chapters:1,
    url:"https://divineword4u.blogspot.com/p/3-john-{chapter}.html"
  },
  {
    group:"ইঞ্জিল শরীফ",
    name:"এহুদা",
    slug:"jude",
    chapters:1,
    url:"https://divineword4u.blogspot.com/p/jude-{chapter}.html"
  },
  {
    group:"ইঞ্জিল শরীফ",
    name:"প্রকাশিত কালাম",
    slug:"revelation",
    chapters:22,
    url:"https://divineword4u.blogspot.com/p/revelation-{chapter}.html"
  }

];

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
