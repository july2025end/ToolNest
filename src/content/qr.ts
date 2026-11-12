import type { PageContent } from "./types";

export const qrContent: Record<string, PageContent> = {
  "qr-code-generator": {
    title: "QR Code Generator: Free, No Expiry",
    description:
      "QR code generator for URLs, text, Wi-Fi, vCard, email, phone, SMS and WhatsApp. Free static codes, PNG and SVG download, no sign-up.",
    h1: "Free QR Code Generator",
    intro:
      "Pick a type, enter your details and watch the code update live. Download it as a PNG or SVG. The codes are static, so they never expire and nothing is tracked.",
    steps: [
      "Choose a type: URL, text, Wi-Fi, contact card, email, phone, SMS or WhatsApp.",
      "Fill in the details and watch the live preview.",
      "Adjust colors, size, margin and error correction, and add a logo if you like.",
      "Download the code as a PNG or SVG.",
    ],
    guide: [
      {
        heading: "Static codes: what that means for you",
        paragraphs: [
          "Every code made here is static. Your link, text or contact data is written directly into the pattern of squares. There is no short link in between, no redirect through our servers and no account that has to stay active. A code you print today will work for as long as the thing it points to exists.",
          "Dynamic QR services work differently. They encode their own short address and forward visitors, which lets them count scans and change the destination later, but the code stops working if you stop paying. If you do not need analytics, a static code is simpler and safer.",
        ],
      },
      {
        heading: "Error correction and why it matters",
        paragraphs: [
          "QR codes carry built-in redundancy so they can still be read when dirty or damaged. There are four levels. L restores about 7 percent of the data, M about 15 percent, Q about 25 percent and H about 30 percent. Higher levels make the pattern denser, so the squares get smaller for the same size of code.",
          "Medium is a good default for screens and clean prints. Choose Q or H for stickers, packaging, outdoor signs or anything likely to get scratched. When you add a logo in the center, the tool raises correction to H automatically, since the logo covers part of the code.",
        ],
      },
      {
        heading: "Size, margin and contrast",
        paragraphs: [
          "The blank border around a code is called the quiet zone. Scanners need it to find the edges, so keep the margin at four modules or more. Cropping it for a tight design is the most common reason a code fails to scan.",
          "Dark squares on a light background scan best. Inverted codes, with light squares on a dark background, are not read by some older apps. The tool warns you when the contrast between your two colors is too low. As a size guide, a printed code should be at least 2 cm wide for close scanning, and larger the farther away people will be: roughly one tenth of the scanning distance.",
        ],
      },
      {
        heading: "Which format to download",
        paragraphs: [
          "PNG is a pixel image and suits websites, documents and chat. Pick a size big enough for your use; 1000 pixels is plenty for most prints. SVG is a vector file that stays sharp at any size, so use it for posters, signs and anything a printer will resize.",
          "Before you print a batch, scan the code with two different phones and test it at the final size. A quick check can save a whole print run.",
        ],
      },
      {
        heading: "What you can encode",
        paragraphs: [
          "Besides web addresses, you can encode plain text, a Wi-Fi login, a contact card, an email with subject and body, a phone number, a pre-filled text message and a WhatsApp chat link. Each type is stored in a standard format that phone cameras recognize without a special app.",
        ],
      },
    ],
    faqs: [
      {
        q: "Do these QR codes expire?",
        a: "No. They are static, so the data is built into the code itself. They work as long as the destination does.",
      },
      {
        q: "Can I track scans?",
        a: "No. Static codes carry no tracking and no redirect, which is also why they cannot be changed later.",
      },
      {
        q: "Is it free to use commercially?",
        a: "Yes. There is no watermark, no sign-up and no limit on codes. The result is yours to use on packaging, menus or flyers.",
      },
      {
        q: "Why won't my QR code scan?",
        a: "The usual causes are low contrast, a missing quiet zone, a code printed too small or too much data in it. Increase the margin and size and try a simpler or shorter payload.",
      },
      {
        q: "Does adding a logo affect scanning?",
        a: "It can. The tool raises error correction to H to compensate, but keep the logo small and test the code before printing.",
      },
      {
        q: "PNG or SVG?",
        a: "Use PNG for screens and documents. Use SVG when the code will be resized or printed at large sizes.",
      },
      {
        q: "Is my data sent to a server?",
        a: "No. The code is generated in your browser from what you type.",
      },
    ],
  },

  "wifi-qr-code-generator": {
    title: "Wi-Fi QR Code Generator for Guests",
    description:
      "Make a Wi-Fi QR code so guests join your network without typing the password. Free, runs in your browser, nothing is stored or sent.",
    h1: "Wi-Fi QR Code Generator",
    intro:
      "Enter your network name and password to create a code that connects phones in one scan. Print it, frame it and stop reading out passwords.",
    steps: [
      "Enter your network name (SSID) exactly as it appears.",
      "Choose the security type: WPA/WPA2, WEP or none, and type the password.",
      "Tick hidden network only if your router does not broadcast its name.",
      "Download the code as PNG or SVG and print or share it.",
    ],
    guide: [
      {
        heading: "How a Wi-Fi QR code works",
        paragraphs: [
          "A Wi-Fi code is just text in a standard shape that phone cameras understand. It looks like WIFI:T:WPA;S:HomeNet;P:mypassword;; where T is the security type, S is the network name and P is the password. When someone scans it, their phone offers to join that network. No app is needed on current iPhone and Android devices.",
          "Because the password is inside the code, anyone who scans it can join. Treat a printed Wi-Fi code like you would the password written on a card.",
          "On iPhone, point the camera at the code and tap the banner that appears. On most Android phones the camera or the Google Lens button does the same, and some models also have a scan option inside the Wi-Fi settings. After joining, the phone remembers the network like any other.",
        ],
      },
      {
        heading: "Choosing the right security type",
        paragraphs: [
          "Most routers made in the last decade use WPA2 or WPA3, and for both you choose WPA here. WEP is an outdated scheme that you should only select if your device still uses it, and you should consider replacing it. Choose none only for an open network that has no password.",
          "Check your router label or its admin page if you are unsure. A wrong security type is the number one reason a scan opens the prompt but then fails to connect.",
          "If a guest says the code scanned but the phone shows a wrong password message, retype the password into this tool slowly. Lowercase L and capital I look alike on many screens, as do zero and the letter O.",
        ],
      },
      {
        heading: "Special characters and hidden networks",
        paragraphs: [
          "Characters such as semicolons, colons, commas and backslashes have a meaning inside the code format. The tool escapes them for you so that a tricky password still works. Type the name and password exactly, including capital letters, because they are case sensitive.",
          "If your network name is hidden, tick the hidden option. Otherwise, phones may not find it when they try to join. Hidden networks are not much of a security feature, and they can make connecting slower, so most home users leave this off.",
        ],
      },
      {
        heading: "Where to put the code",
        paragraphs: [
          "Printed on a card by the front door, inside a holiday rental's welcome folder, or on a cafe table, a Wi-Fi code saves a lot of typing. Use dark ink on white paper, keep the quiet zone around it, and raise error correction to Q for cards that will be handled often.",
          "If you change your password, the old code stops working, and you need to make and print a new one. Guests who already joined are not affected until their device reconnects. For a guest network, consider a separate password you can change without touching your own devices.",
        ],
      },
    ],
    faqs: [
      {
        q: "Is my Wi-Fi password sent anywhere?",
        a: "No. The code is built in your browser. Nothing you type is uploaded or stored.",
      },
      {
        q: "What does WIFI:T:WPA;S:name;P:password;; mean?",
        a: "It is the standard text format for a Wi-Fi code. T is the security type, S the network name, P the password, and the double semicolons end it.",
      },
      {
        q: "Which security type should I pick?",
        a: "Choose WPA for WPA, WPA2 and WPA3 networks. Pick WEP or none only if your network really uses them.",
      },
      {
        q: "Will it work on iPhone and Android?",
        a: "Yes. The built-in camera app on current versions of both can scan it and offer to join.",
      },
      {
        q: "Does the code expire?",
        a: "No. It works until you change the network name or password.",
      },
      {
        q: "Is it safe to put on a wall?",
        a: "Anyone who can see the code can join your network. Use it where you would be fine sharing the password, or set up a guest network.",
      },
    ],
  },
};
