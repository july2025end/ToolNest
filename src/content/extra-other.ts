import type { PageContent } from "./types";

const PRIVATE_PDF = {
  q: "Is my PDF uploaded to a server?",
  a: "No. The PDF is processed in your browser on your own device and never leaves it.",
};

export const extraOtherContent: Record<string, PageContent> = {
  "png-to-pdf": {
    title: "PNG to PDF Converter, Free and Private",
    description:
      "Convert PNG screenshots and graphics into one PDF. Set the page order, pick a page size and download. Free, no upload, no watermark.",
    h1: "Convert PNG to PDF",
    intro:
      "Turn PNG screenshots, scans and diagrams into a single PDF you can email or upload. Set the page order, then download. Everything runs in your browser.",
    steps: [
      "Add your PNG images (JPG works too).",
      "Put the pages in order with the move buttons.",
      "Choose the page size and margins.",
      "Download your PDF.",
    ],
    guide: [
      {
        heading: "Screenshots and graphics as a document",
        paragraphs: [
          "PNG is the usual format for screenshots, charts and designs, but many forms and offices ask for a PDF. Converting keeps every image sharp, and combining them into one file makes them easy to send and print in order.",
          "If your PDF ends up too large for an email or portal, run it through Compress PDF afterwards, or convert your PNG files to JPG first, which makes photos much smaller.",
        ],
      },
      {
        heading: "Page size and order",
        paragraphs: [
          "Each image becomes one page. Use the move buttons to change the order before you download. A standard page size such as A4 or Letter makes the PDF print neatly, while fitting the page to the image keeps the exact proportions of each screenshot.",
        ],
      },
    ],
    faqs: [
      { q: "Can I combine several PNG files into one PDF?", a: "Yes. Add them all, put them in order and download a single PDF." },
      { q: "Will my PNG lose quality?", a: "No. PNG images are placed in the PDF without lossy compression." },
      { q: "Can I mix PNG and JPG images?", a: "Yes. Both can go into the same PDF." },
      PRIVATE_PDF,
    ],
  },

  "pdf-to-png": {
    title: "PDF to PNG Converter, Free and Private",
    description:
      "Convert every page of a PDF to a sharp PNG image. Choose the resolution and download all pages as a ZIP. Free, private, no upload.",
    h1: "Convert PDF Pages to PNG",
    intro:
      "Save each page of a PDF as a crisp, lossless PNG image, ideal for slides, documents with text and diagrams. Pick the resolution, then download the pages as a ZIP.",
    steps: [
      "Add your PDF.",
      "PNG is already selected. Choose the resolution (DPI).",
      "Convert and preview the pages.",
      "Download all images as a ZIP.",
    ],
    guide: [
      {
        heading: "PNG or JPG?",
        paragraphs: [
          "PNG is lossless, so text, lines and charts stay perfectly sharp with no blurry edges. It is the better choice for pages that are mostly text or graphics. JPG makes smaller files and is better for pages that are mainly photos.",
          "150 DPI is good for viewing on screen. Use 300 DPI if you want to print the images or zoom in on small text, but expect bigger files.",
        ],
      },
      {
        heading: "Private by design",
        paragraphs: [
          "Pages are rendered by your browser, so confidential documents such as contracts or statements never leave your device. Password-protected PDFs need the password removed first.",
        ],
      },
    ],
    faqs: [
      { q: "How do I convert a PDF to PNG?", a: "Add the PDF, keep PNG selected, convert and download the images as a ZIP." },
      { q: "What resolution should I pick?", a: "150 DPI for screens, 300 DPI for printing or small text." },
      { q: "Why are PNG files larger than JPG?", a: "PNG is lossless and keeps every pixel exactly, which takes more space." },
      PRIVATE_PDF,
    ],
  },

  "sign-pdf": {
    title: "Sign PDF Online Free: Draw or Type",
    description:
      "Sign a PDF online for free. Draw your signature with a finger or mouse, or type it, then place it on any page. No sign-up, no upload.",
    h1: "Sign a PDF Online",
    intro:
      "Draw your signature on screen or type your name, then drag it into place on the page and download the signed PDF. Your document never leaves your device.",
    steps: [
      "Add the PDF you need to sign.",
      "Draw your signature, or type your name to create one.",
      "Go to the right page, tap Add signature and drag it into place. Adjust the size if needed.",
      "Download the signed PDF.",
    ],
    guide: [
      {
        heading: "Draw or type?",
        paragraphs: [
          "Drawing looks most like your handwritten signature. On a phone or tablet, use your finger or a stylus; on a computer, a mouse or trackpad works. If drawing is awkward, type your name and it is turned into a handwriting-style signature.",
          "Blue ink helps a printed copy look clearly signed rather than photocopied, which some offices prefer. Black is the standard choice.",
        ],
      },
      {
        heading: "Placing your signature",
        paragraphs: [
          "Use Previous and Next to find the page with the signature line, then tap Add signature. Drag it onto the line and use the size slider so it fits. You can add it to as many pages as you need, for example to initial every page of a contract, and remove any copy you placed by mistake.",
        ],
      },
      {
        heading: "Is an electronic signature legal?",
        paragraphs: [
          "In many countries, including the US (ESIGN Act), the EU (eIDAS) and the UK, a simple electronic signature like this is legally valid for most everyday agreements. Some documents, such as wills or property deeds, may require a witnessed or certified digital signature instead. If you are unsure, check with the person or organisation asking you to sign.",
          "This tool adds an image of your signature to the PDF. It does not add a cryptographic certificate.",
        ],
      },
    ],
    faqs: [
      { q: "Is it really free to sign a PDF here?", a: "Yes. There is no sign-up, no limit and no watermark." },
      { q: "Can I sign a PDF on my phone?", a: "Yes. Draw your signature with your finger and drag it into place. It works on iPhone, Android and tablets." },
      { q: "Is my signature saved anywhere?", a: "No. It exists only on this page and is gone when you close the tab." },
      { q: "Can I sign more than one page?", a: "Yes. Add the signature to as many pages as you need before downloading." },
      { q: "Is this a legally binding signature?", a: "A simple electronic signature is accepted for most everyday agreements in many countries. Some documents need a certified digital signature." },
      PRIVATE_PDF,
    ],
  },

  "age-calculator": {
    title: "Age Calculator: Exact Age in Years, Days",
    description:
      "Calculate your exact age in years, months and days, plus total weeks and days and the countdown to your next birthday. Free and instant.",
    h1: "Age Calculator",
    intro:
      "Enter a date of birth to see the exact age in years, months and days, how many days old you are and how long until the next birthday. You can also find an age on any past or future date.",
    steps: [
      "Enter the date of birth.",
      "Leave the second date as today, or change it to find an age on another date.",
      "Read the age in years, months and days, plus totals and the next birthday.",
    ],
    guide: [
      {
        heading: "How age is calculated",
        paragraphs: [
          "Age is counted in whole calendar months first and then the days left over, the same way people say it out loud. For example, from 31 January to 1 March is one month and one day. Leap years are taken into account, so total days are exact.",
          "If you were born on 29 February, your next birthday in a non-leap year is shown as 28 February, the date most people celebrate on.",
        ],
      },
      {
        heading: "Useful for forms and planning",
        paragraphs: [
          "Many applications ask for your age on a specific date, such as the closing date of a job advert or the start of a school year. Set the second date to that day to get the exact answer. You can also use it to work out the time between any two dates, like the age of a company or the length of a project.",
        ],
      },
    ],
    faqs: [
      { q: "How do I calculate my exact age?", a: "Enter your date of birth. The calculator shows your age in years, months and days as of today." },
      { q: "Can I calculate age on a specific date?", a: "Yes. Change the second date to any day, past or future." },
      { q: "How many days old am I?", a: "Your total age in days is shown under the main result, along with weeks and months." },
      { q: "How are leap years handled?", a: "They are counted exactly. A 29 February birthday falls on 28 February in non-leap years." },
      { q: "Is my date of birth stored?", a: "No. The calculation happens in your browser and nothing is saved." },
    ],
  },

  "bmi-calculator": {
    title: "BMI Calculator for Adults: kg, cm, lb, ft",
    description:
      "Calculate your body mass index in metric or imperial units and see your WHO category and a healthy weight range for your height. Free.",
    h1: "BMI Calculator",
    intro:
      "Enter your weight and height to get your body mass index, the WHO weight category and the healthy weight range for your height. Works in kilograms and centimetres or pounds, feet and inches.",
    steps: [
      "Choose metric or imperial units.",
      "Enter your weight and height.",
      "Read your BMI, your category and your healthy weight range.",
    ],
    guide: [
      {
        heading: "What the numbers mean",
        paragraphs: [
          "BMI is your weight in kilograms divided by your height in metres squared. For adults, the World Health Organization uses these ranges: under 18.5 is underweight, 18.5 to 24.9 is a healthy weight, 25 to 29.9 is overweight and 30 or more is obesity.",
          "The healthy weight range shown is the weight that would put someone of your height between a BMI of 18.5 and 24.9.",
        ],
      },
      {
        heading: "The limits of BMI",
        paragraphs: [
          "BMI is a quick screening number, not a diagnosis. It does not tell muscle from fat, so athletes can score as overweight while being very fit. It also does not show where fat is stored, which matters for health. Some health services use lower cut-offs for people of South Asian, Chinese and other Asian backgrounds, and children and teenagers are assessed with age-specific charts instead.",
          "If your result worries you, talk to a doctor, who can look at waist size, blood pressure and other measures too.",
        ],
      },
    ],
    faqs: [
      { q: "What is a healthy BMI?", a: "For most adults, 18.5 to 24.9." },
      { q: "How is BMI calculated?", a: "Weight in kilograms divided by height in metres squared. Imperial values are converted automatically." },
      { q: "Is BMI accurate?", a: "It is a useful rough guide for adults but does not measure body fat directly or account for muscle." },
      { q: "Can I use this for children?", a: "No. Children and teenagers need age- and sex-specific BMI charts." },
      { q: "Is my data stored?", a: "No. The calculation happens in your browser." },
    ],
  },

  "word-counter": {
    title: "Word Counter: Words, Characters, Pages",
    description:
      "Free word counter: count words, characters with and without spaces, sentences and paragraphs, plus reading time. Live as you type, nothing saved.",
    h1: "Word Counter",
    intro:
      "Type or paste your text to count words, characters, sentences and paragraphs instantly, with reading and speaking time. Your text stays in your browser.",
    steps: [
      "Type or paste your text into the box.",
      "The counts update as you type.",
      "Use Clear to start again.",
    ],
    guide: [
      {
        heading: "What gets counted",
        paragraphs: [
          "A word is any group of letters or numbers separated by spaces, so 'well-known' counts as one word and a lone dash counts as none. Characters are counted with and without spaces, because some forms and social sites limit one or the other. Sentences end with a full stop, question mark or exclamation mark, and paragraphs are separated by a blank line.",
          "Reading time assumes an average silent reading speed of about 238 words per minute, and speaking time about 150 words per minute, which is a typical pace for a speech or presentation.",
        ],
      },
      {
        heading: "Common limits to aim for",
        paragraphs: [
          "Meta descriptions for search results work best at about 120–155 characters. Personal statements and college essays often have limits around 500–650 words, and many cover letters aim for 250–400 words. Checking as you write saves rewriting later.",
        ],
      },
    ],
    faqs: [
      { q: "Is my text saved or uploaded?", a: "No. It stays in your browser and disappears when you close the tab." },
      { q: "Does it count characters with spaces?", a: "Yes. Both counts, with and without spaces, are shown." },
      { q: "How is reading time worked out?", a: "Using an average of about 238 words per minute for reading and 150 for speaking." },
      { q: "Does it work in other languages?", a: "Yes for languages that separate words with spaces. For Chinese, Japanese and Thai, use the character count, because those languages do not put spaces between words." },
    ],
  },

  "case-converter": {
    title: "Case Converter: Upper, Lower, Title Case",
    description:
      "Convert text to UPPER CASE, lower case, Title Case, Sentence case, camelCase, snake_case and more. Paste, click, copy. Free and private.",
    h1: "Case Converter",
    intro:
      "Paste your text and switch it to upper, lower, title or sentence case in one tap, then copy it. Handy for headings, accidental Caps Lock and code names.",
    steps: [
      "Type or paste your text.",
      "Choose the case you want.",
      "Copy the result with one tap.",
    ],
    guide: [
      {
        heading: "Which case to use",
        paragraphs: [
          "Sentence case capitalises only the first word of each sentence and is the easiest to read for most text. Title Case capitalises the main words and leaves small words like 'of', 'and' and 'the' in lower case, the style used for book and article titles. UPPER CASE is best kept for short labels, because long passages in capitals are hard to read.",
          "Capitalized Case capitalises every word, which some brands use for buttons. Fixed text typed with Caps Lock on? Choose Sentence case.",
        ],
      },
      {
        heading: "For developers",
        paragraphs: [
          "camelCase, snake_case and kebab-case turn phrases into names for variables, database columns, files and URLs. Punctuation is removed and words are joined with the right separator.",
        ],
      },
    ],
    faqs: [
      { q: "How do I fix text typed in Caps Lock?", a: "Paste it and choose Sentence case." },
      { q: "What is title case?", a: "Capitalising the main words of a title while leaving short words like 'of' and 'the' in lower case." },
      { q: "Is my text stored?", a: "No. Conversion happens in your browser." },
    ],
  },

  "password-generator": {
    title: "Strong Password Generator, Free and Secure",
    description:
      "Generate strong random passwords on your device. Choose the length, numbers and symbols, see the strength and copy in one tap. Never sent or stored.",
    h1: "Strong Password Generator",
    intro:
      "Create a random, hard-to-guess password in one tap. Passwords are generated on your device with your browser's secure random number generator and are never sent anywhere.",
    steps: [
      "Set the length. 16 characters or more is recommended.",
      "Choose which character types to include.",
      "Tap New for another password, then Copy.",
    ],
    guide: [
      {
        heading: "What makes a password strong",
        paragraphs: [
          "Length matters most. Each extra character multiplies the number of possible passwords, so a 16-character random password is far stronger than an 8-character one with symbols. Mixing upper and lower case letters, numbers and symbols helps further. The strength bar estimates how hard the password would be to guess by brute force.",
          "Look-alike characters such as l, I, O, 0 and 1 are left out by default so the password is easier to read and type. Include them if you only ever paste the password.",
        ],
      },
      {
        heading: "Keeping passwords safe",
        paragraphs: [
          "Use a different password for every account, so one leak does not unlock the others. A password manager can store them for you, and turning on two-factor authentication adds another layer of protection.",
          "Every password here is created in your browser. Nothing is sent over the network or saved, so not even we can see it.",
        ],
      },
    ],
    faqs: [
      { q: "Are these passwords really random?", a: "Yes. They use your browser's cryptographically secure random number generator." },
      { q: "Is the password sent or stored anywhere?", a: "No. It is created on your device and never leaves it." },
      { q: "How long should a password be?", a: "At least 12 characters, and 16 or more for important accounts." },
      { q: "Why are some characters missing?", a: "Look-alikes such as l, I, O, 0 and 1 are skipped by default to avoid typing mistakes. You can turn them back on." },
    ],
  },
};
