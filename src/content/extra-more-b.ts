import type { PageContent } from "./types";

const LOCAL = { q: "Is anything sent to a server?", a: "No. It all runs in your browser and nothing you enter is stored or sent." };

export const extraMoreB: Record<string, PageContent> = {
  "barcode-generator": {
    title: "Barcode Generator: Code 128, EAN-13, UPC",
    description:
      "Create barcodes online for free: Code 128, EAN-13, UPC-A, EAN-8, Code 39 and ITF-14. Download PNG or print-ready SVG. No sign-up.",
    h1: "Free Barcode Generator",
    intro:
      "Type a number or text, choose the barcode type and download a sharp PNG or a scalable SVG for printing on labels, packaging and stock lists.",
    steps: [
      "Choose the barcode type.",
      "Enter the value. You'll see a warning if it doesn't fit the type.",
      "Adjust the height, bar width and text.",
      "Download PNG for documents or SVG for print.",
    ],
    guide: [
      {
        heading: "Which barcode type should I use?",
        paragraphs: [
          "Code 128 holds letters, numbers and symbols and is the best choice for your own labels, inventory, tickets and shipping. EAN-13 and UPC-A are the retail barcodes on products in shops: EAN-13 is used worldwide and UPC-A in the US and Canada. EAN-8 is a short version for small packages. ITF-14 is printed on outer shipping cartons, and Code 39 is common in older industrial and government systems.",
          "For EAN and UPC, you can enter the number with or without its last check digit. If you give it, it must be correct, so typing mistakes are caught.",
        ],
      },
      {
        heading: "Printing barcodes that scan",
        paragraphs: [
          "Use the SVG download for printing: it stays perfectly sharp at any size. Print in black on white, keep the quiet zone (blank space) on both sides, and don't shrink a retail barcode below about 80% of its normal size. Test with a phone scanner before printing a big batch.",
          "Products sold in shops need an official number from GS1. This tool draws the barcode for a number you already have.",
        ],
      },
    ],
    faqs: [
      { q: "Are the barcodes free to use?", a: "Yes, including commercially. There is no watermark." },
      { q: "Which format is best for printing?", a: "SVG. It scales to any size without blurring." },
      { q: "Where do I get an EAN or UPC number for my product?", a: "From GS1, the organisation that issues retail barcode numbers in each country." },
      LOCAL,
    ],
  },

  "qr-code-scanner": {
    title: "QR Code Scanner Online: Camera or Photo",
    description:
      "Scan QR codes online with your camera or from a photo or screenshot. Shows links, text and Wi-Fi passwords. Free, private, no app needed.",
    h1: "QR Code Scanner",
    intro:
      "Point your camera at a QR code, or upload a photo or screenshot that contains one, and see what it says before you open anything. No app needed.",
    steps: [
      "Tap Scan with camera and allow camera access, or upload a photo or screenshot.",
      "Hold the code inside the frame until it's read.",
      "Copy the text, open the link or see the Wi-Fi password.",
    ],
    guide: [
      {
        heading: "Scanning from a screenshot",
        paragraphs: [
          "A QR code on your own screen, in a WhatsApp image, an email or a PDF, can't be scanned with the same phone's camera. Take a screenshot and upload it here instead. You can also paste it directly.",
          "Wi-Fi QR codes are decoded into the network name and password, which is handy for connecting a laptop or reading the password out to someone.",
        ],
      },
      {
        heading: "Stay safe with QR codes",
        paragraphs: [
          "Scammers sometimes stick fake QR codes over real ones on parking meters, posters and restaurant tables. This scanner shows you the full link first and never opens it automatically. Check that the address belongs to the business you expect before you tap Open link, and never enter payment details on a site you reached through an unexpected code.",
        ],
      },
    ],
    faqs: [
      { q: "How do I scan a QR code from a screenshot?", a: "Upload or paste the screenshot. The code is read straight from the image." },
      { q: "Why doesn't the camera start?", a: "Allow camera access when your browser asks. The camera only works on secure (https) pages; you can always upload a photo instead." },
      { q: "Does it work on iPhone and Android?", a: "Yes, in Safari, Chrome and other modern browsers." },
      { q: "Is the camera image sent anywhere?", a: "No. Frames are analysed on your device and nothing is recorded or uploaded." },
    ],
  },

  "tip-calculator": {
    title: "Tip Calculator: Tip and Split the Bill",
    description:
      "Work out the tip and split the bill between friends. Pick 10–25%, round each share up and see what everyone pays. Free and instant.",
    h1: "Tip Calculator",
    intro:
      "Enter the bill, choose a tip percentage and the number of people to see the tip, the total and what each person pays.",
    steps: ["Enter the bill amount.", "Tap a tip percentage or type your own.", "Set how many people are splitting the bill."],
    guide: [
      {
        heading: "How much to tip",
        paragraphs: [
          "Customs vary widely. In the US, 15–20% is usual at sit-down restaurants and 18–20% or more for very good service. In the UK and much of Europe, 10–12.5% is common, and many restaurants add a service charge to the bill, so check before adding more. In Japan, tipping is generally not expected. In Pakistan, India and the Gulf, around 10% is a generous tip where no service charge is added.",
          "Tip on the amount before tax if you want to follow the traditional US rule, or on the total if it's simpler.",
        ],
      },
      {
        heading: "Splitting fairly",
        paragraphs: [
          "Turn on rounding to make each share a whole amount. The few extra cents go to the tip, so nobody has to dig for coins and the server isn't short.",
        ],
      },
    ],
    faqs: [
      { q: "How do I calculate a 15% tip?", a: "Multiply the bill by 0.15, or move the decimal one place left for 10% and add half of that again." },
      { q: "Can I split the bill?", a: "Yes. Set the number of people and each person's share is shown." },
      { q: "Can I use my own currency?", a: "Yes. Choose it from the currency menu; your choice is remembered on this device." },
    ],
  },

  "gpa-calculator": {
    title: "GPA Calculator: 4.0 Scale With Credits",
    description:
      "Calculate your GPA on a 4.0 scale from letter grades and credit hours. Add courses, see your weighted GPA instantly. Free, no sign-up.",
    h1: "GPA Calculator",
    intro: "Add your courses with their letter grade and credits to calculate your grade point average on the common 4.0 scale.",
    steps: ["Choose the grade for each course.", "Enter the credits or credit hours.", "Add or remove courses; your GPA updates as you go."],
    guide: [
      {
        heading: "How GPA is calculated",
        paragraphs: [
          "Each letter grade has a point value: A = 4.0, A− = 3.7, B+ = 3.3, B = 3.0 and so on down to F = 0. Multiply each course's points by its credits, add those up, and divide by the total credits. Courses with more credits count for more, which is why a B in a 4-credit course pulls your GPA down more than a B in a 2-credit course.",
          "For example, an A in a 3-credit course, a B+ in a 4-credit course and a C in a 2-credit course gives (12 + 13.2 + 4) ÷ 9 = 3.24.",
        ],
      },
      {
        heading: "Scales differ between schools",
        paragraphs: [
          "Some universities give an A+ 4.3, some don't use plus and minus grades at all, and countries such as Pakistan and India often use percentage or 5- and 10-point scales. Check your institution's conversion table for official purposes.",
        ],
      },
    ],
    faqs: [
      { q: "How do I calculate my GPA?", a: "Enter each course's grade and credits. The calculator multiplies, adds and divides for you." },
      { q: "What is a good GPA?", a: "On a 4.0 scale, 3.0 or above is generally good and 3.5 or above is strong, but expectations vary by school and programme." },
      { q: "Do pass/fail courses count?", a: "Usually not. Leave them out." },
    ],
  },

  "unit-converter": {
    title: "Unit Converter: Length, Weight, Temperature",
    description:
      "Convert length, weight, temperature, area, volume, speed and data units instantly: cm to inches, kg to lb, °C to °F, marla and kanal. Free.",
    h1: "Unit Converter",
    intro:
      "Convert between metric and imperial units in one place: length, weight, temperature, area (including marla and kanal), volume, speed and data sizes. Results update as you type.",
    steps: ["Choose what you're converting, such as Length or Weight.", "Type the value and pick the from and to units.", "Read the result. Use the swap button to reverse the conversion."],
    guide: [
      {
        heading: "Common conversions",
        paragraphs: [
          "1 inch is exactly 2.54 cm, 1 foot is 30.48 cm and 1 mile is about 1.609 km. 1 kilogram is about 2.205 pounds and 1 stone is 14 pounds. To turn Celsius into Fahrenheit, multiply by 9/5 and add 32, so 37 °C is 98.6 °F.",
          "For area, the calculator includes marla (272.25 square feet) and kanal (20 marla), as used in property listings in Pakistan. Local marla sizes can differ, so check the definition used in your area for legal documents.",
        ],
      },
      {
        heading: "Why is my 1 TB drive smaller?",
        paragraphs: [
          "Storage makers count 1 GB as 1,000,000,000 bytes, while Windows counts in units of 1,024 (gibibytes). That's why a 1 TB drive shows about 931 GB on a computer. The Data section shows both systems.",
        ],
      },
    ],
    faqs: [
      { q: "How many centimetres are in an inch?", a: "Exactly 2.54." },
      { q: "How do I convert kg to pounds?", a: "Multiply by about 2.2046, or choose Weight and convert kilograms to pounds." },
      { q: "How big is a kanal?", a: "Here, 1 kanal = 20 marla = 5,445 square feet, about 506 m²." },
      { q: "Are US and UK gallons the same?", a: "No. A US gallon is 3.785 litres and a UK gallon is 4.546 litres. Both are included." },
    ],
  },

  "time-zone-converter": {
    title: "Time Zone Converter: Meeting Planner",
    description:
      "Convert a time between time zones and cities, with daylight saving handled automatically. Compare several cities at once. Free and instant.",
    h1: "Time Zone Converter",
    intro:
      "Pick a date and time in one time zone and see the matching local time in any city around the world, which is perfect for planning calls and meetings. Daylight saving time is applied for the date you choose.",
    steps: ["Set the date, time and the time zone it's in (yours by default).", "See the time in each city on the list.", "Add or remove cities to compare."],
    guide: [
      {
        heading: "Planning a meeting across time zones",
        paragraphs: [
          "Enter a proposed time and check that it falls in working hours for everyone. Times at night (10 pm to 7 am) are greyed out so they're easy to spot. When people are spread across many zones, the early morning in the Americas often lines up with the afternoon in Europe and the evening in South Asia.",
          "Always share the time with the time zone written out, for example '15:00 London (UTC+00:00)', to avoid confusion.",
        ],
      },
      {
        heading: "Daylight saving time",
        paragraphs: [
          "The US, Canada, the UK and much of Europe move their clocks forward in spring and back in autumn, on different weekends. Pakistan, India, the UAE, Japan and many other countries don't change their clocks. Because the converter uses the exact date you pick, it shows the correct difference even in the weeks when only some countries have switched.",
        ],
      },
    ],
    faqs: [
      { q: "Does it handle daylight saving time?", a: "Yes, automatically for the date you choose." },
      { q: "How do I add a city?", a: "Choose it in the Add a city or time zone list and tap Add." },
      { q: "What is UTC?", a: "Coordinated Universal Time, the reference that every time zone is measured from." },
    ],
  },

  "json-formatter": {
    title: "JSON Formatter and Validator Online",
    description:
      "Format, beautify, validate and minify JSON online. Find errors with line and column, sort keys. Free and private: your JSON stays in your browser.",
    h1: "JSON Formatter and Validator",
    intro:
      "Paste JSON to make it readable, check that it is valid, minify it or sort its keys. Errors show the line and column so you can fix them quickly.",
    steps: ["Paste your JSON.", "Tap Format & validate, Minify or Sort keys.", "Copy or download the result."],
    guide: [
      {
        heading: "Common JSON errors",
        paragraphs: [
          "Most invalid JSON comes from a few mistakes: a trailing comma after the last item, single quotes instead of double quotes, keys without quotes, or comments, which JSON does not allow. The error message points to the line and column where parsing stopped, which is usually just after the real problem.",
          "Formatting with 2 spaces is the most common style for config files and APIs. Minifying removes all spaces and line breaks to make files smaller for sending over a network.",
        ],
      },
      {
        heading: "Safe for private data",
        paragraphs: [
          "API responses, tokens and config files often contain secrets. This formatter runs entirely in your browser, so nothing you paste is uploaded or logged.",
        ],
      },
    ],
    faqs: [
      { q: "How do I check if JSON is valid?", a: "Paste it and tap Format & validate. You'll see 'Valid JSON' or the error and where it is." },
      { q: "What does minify do?", a: "It removes all unnecessary spaces and line breaks to make the JSON as small as possible." },
      { q: "Can I sort the keys?", a: "Yes. Sort keys orders every object's keys alphabetically, which makes two JSON files easier to compare." },
      LOCAL,
    ],
  },

  "base64-encode-decode": {
    title: "Base64 Encode and Decode Online",
    description:
      "Encode text or files to Base64 and decode Base64 back to text. UTF-8 and emoji safe, URL-safe option and data URLs for images. Free.",
    h1: "Base64 Encoder and Decoder",
    intro:
      "Convert text to Base64 and back instantly, or turn an image or file into a data URL you can paste into HTML, CSS or JSON. Works with any language and emoji.",
    steps: ["Choose Encode or Decode.", "Type or paste your text, or add a file to encode.", "Copy the result."],
    guide: [
      {
        heading: "What Base64 is for",
        paragraphs: [
          "Base64 turns any data into plain letters, numbers and a few symbols so it can travel safely through systems that only handle text, such as email, JSON, URLs and HTML. It is used for email attachments, small images embedded in web pages, API keys in HTTP headers and JWT tokens.",
          "Base64 is an encoding, not encryption. Anyone can decode it, so never use it to hide passwords or secrets.",
        ],
      },
      {
        heading: "URL-safe Base64 and data URLs",
        paragraphs: [
          "URL-safe Base64 swaps + and / for - and _ and drops the = padding, so it can be used in web addresses and file names. The decoder accepts both forms. Encoding a file gives a data URL such as data:image/png;base64,…, which you can paste into an img tag or a CSS background.",
        ],
      },
    ],
    faqs: [
      { q: "Is Base64 encryption?", a: "No. It's an encoding that anyone can reverse. Don't use it to protect secrets." },
      { q: "Does it support emoji and other languages?", a: "Yes. Text is encoded as UTF-8, so every language and emoji round-trips correctly." },
      { q: "Can I convert an image to Base64?", a: "Yes. In Encode mode, add the image to get a data URL." },
      LOCAL,
    ],
  },

  "lorem-ipsum-generator": {
    title: "Lorem Ipsum Generator: Placeholder Text",
    description:
      "Generate lorem ipsum placeholder text by paragraphs, sentences or words, with optional HTML <p> tags. Copy in one tap. Free.",
    h1: "Lorem Ipsum Generator",
    intro:
      "Create dummy text for mock-ups, designs and templates. Choose paragraphs, sentences or words, then copy it in one tap.",
    steps: ["Choose paragraphs, sentences or words.", "Set how many you need.", "Copy the text, or generate again for a new version."],
    guide: [
      {
        heading: "Why designers use lorem ipsum",
        paragraphs: [
          "Placeholder text lets you judge a layout, font and spacing without readers getting distracted by the words. Lorem ipsum has been used since the 1500s and comes from a scrambled passage of Cicero's 'On the Ends of Good and Evil', written in 45 BC. Its mix of short and long words looks like real text.",
          "Replace placeholder text before you publish. Search engines treat lorem ipsum as low-quality content, and it's easy to miss in a corner of a website.",
        ],
      },
    ],
    faqs: [
      { q: "What does lorem ipsum mean?", a: "It is scrambled Latin from a text by Cicero and has no real meaning, which is the point." },
      { q: "Can I get HTML paragraphs?", a: "Yes. Tick Wrap in <p> tags when generating paragraphs." },
      { q: "Is it free to use?", a: "Yes, for anything." },
    ],
  },
};
