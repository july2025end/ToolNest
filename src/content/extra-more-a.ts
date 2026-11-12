import type { PageContent } from "./types";

const LOCAL_IMG = { q: "Is my photo uploaded?", a: "No. Everything happens in your browser on your own device, and nothing is sent to a server." };
const LOCAL_PDF = { q: "Is my PDF uploaded?", a: "No. The PDF is processed in your browser on your own device and never leaves it." };

export const extraMoreA: Record<string, PageContent> = {
  "passport-photo-maker": {
    title: "Passport Photo Maker: Free, Print at Home",
    description:
      "Make passport and visa photos online for free: 35×45 mm, 2×2 in and more, white background, and a 4×6 print sheet. Private, no upload.",
    h1: "Passport Photo Maker",
    intro:
      "Turn any well-lit photo into a passport or visa photo in the right size, with a white background if you need one. Download a single photo for online forms or a 4×6 inch sheet to print at any photo kiosk.",
    steps: [
      "Add a photo of yourself facing the camera.",
      "Choose your size: 35 × 45 mm, 2 × 2 in, 50 × 70 mm or 33 × 48 mm.",
      "Tap Make background white if the wall behind you isn't plain.",
      "Drag the frame so your head and shoulders fit, then download.",
    ],
    guide: [
      {
        heading: "Which size do I need?",
        paragraphs: [
          "35 × 45 mm is the most common size worldwide. It is used for UK and EU passports and Schengen visas, as well as Pakistan, Australia and the Indian passport. The US uses a 2 × 2 inch square for passports and visas, as does the Indian visa. Canada asks for 50 × 70 mm, and Chinese visas use 33 × 48 mm.",
          "Rules change from time to time, and some countries reject photos taken at home, so check the official requirements before you print or upload.",
        ],
      },
      {
        heading: "Taking a photo that gets accepted",
        paragraphs: [
          "Stand about a metre from a plain, light wall with even light on your face and no shadows behind you. Look straight at the camera with a neutral expression and your mouth closed. Remove glasses if your country requires it, and keep hair away from your eyes. Ask someone else to take the photo from head height rather than taking a selfie, which distorts the face.",
          "In the frame, the top of the head should be close to the top edge, with the chin around three quarters of the way down. Your face should fill about 70% of the photo's height.",
        ],
      },
      {
        heading: "Printing for less",
        paragraphs: [
          "The print sheet is a standard 6 × 4 inch (10 × 15 cm) photo with as many copies as fit. Order it as a normal photo print at a pharmacy, supermarket kiosk or online print service and cut along the light grey lines. It usually costs far less than a photo booth. Make sure the print is set to 100% size, not 'fit to page'.",
        ],
      },
    ],
    faqs: [
      { q: "How do I make a passport photo at home?", a: "Take a clear photo against a light wall, add it here, choose your country's size, frame your face and download a single photo or a 4×6 print sheet." },
      { q: "Can I change the background to white?", a: "Yes. Tap Make background white. A small AI model removes the background on your device and puts you on white." },
      { q: "What resolution are the photos?", a: "300 DPI, the standard for photo printing. A 35 × 45 mm photo is 413 × 531 pixels." },
      { q: "How many photos fit on the print sheet?", a: "It depends on the size: for example 8 photos of 35 × 45 mm or 6 photos of 2 × 2 in fit on a 6 × 4 inch sheet." },
      { q: "Will my photo be accepted?", a: "The size and framing follow the common rules, but each country makes its own decisions. Check the official guidance, especially on lighting, expression and glasses." },
      LOCAL_IMG,
    ],
  },

  "blur-image": {
    title: "Blur Image Online: Hide Faces and Text",
    description:
      "Blur, pixelate or black out parts of an image to hide faces, names, number plates and personal details. Free, private, works on phones.",
    h1: "Blur or Redact Part of an Image",
    intro:
      "Drag over anything you want to hide, such as a face, an address, a card number or a number plate, and choose blur, pixelate or a solid black box. Your image never leaves your device.",
    steps: [
      "Add a photo or screenshot.",
      "Drag on the image to cover what you want to hide. Add as many areas as you need.",
      "Choose Blur, Pixelate or Black box and adjust the strength.",
      "Download the edited image.",
    ],
    guide: [
      {
        heading: "Blur, pixelate or black box?",
        paragraphs: [
          "Blur softens an area so it no longer shows detail, which looks natural for faces and backgrounds. Pixelate turns the area into large squares, the classic look for hiding faces and number plates. A black box removes the information completely.",
          "For anything sensitive, such as passwords, bank or card numbers, ID numbers and signatures, always use a black box. Light blur on short text can sometimes be guessed or partly reversed, but a solid box cannot.",
        ],
      },
      {
        heading: "Sharing screenshots safely",
        paragraphs: [
          "Before posting a screenshot of a chat, an order or an error message, check for names, phone numbers, email addresses, order numbers and QR codes. The download is a new image file containing only the visible pixels, with location and camera details stripped, so the hidden parts cannot be recovered from layers or metadata.",
        ],
      },
    ],
    faqs: [
      { q: "How do I blur a face in a photo?", a: "Drag a box over the face, choose Blur or Pixelate and download." },
      { q: "Can blurred text be read again?", a: "Strong blur is hard to reverse, but for sensitive text use Black box, which removes the information completely." },
      { q: "Can I hide several things at once?", a: "Yes. Draw as many boxes as you need, and move or resize any of them before downloading." },
      LOCAL_IMG,
    ],
  },

  "image-to-text": {
    title: "Image to Text (OCR): Copy Text From Photos",
    description:
      "Extract text from images, screenshots and photos of documents with free OCR in your browser. Copy or download as .txt. No upload, no sign-up.",
    h1: "Image to Text Converter (OCR)",
    intro:
      "Turn a photo of a page, a screenshot or a scanned document into text you can copy, edit and search. Recognition runs on your own device, so private documents stay private.",
    steps: [
      "Add an image with text, such as a screenshot, scan or photo of a page.",
      "Wait a few seconds while the text is recognised.",
      "Check and edit the text, then copy it or download it as a .txt file.",
    ],
    guide: [
      {
        heading: "Getting the most accurate result",
        paragraphs: [
          "OCR (optical character recognition) works best on sharp, evenly lit images of printed text. Photograph the page straight on, fill the frame with the text and avoid shadows and glare. Screenshots give the best results of all, because the letters are perfectly clean.",
          "Crop away anything that isn't text, such as photos, logos or the edge of the desk, for a cleaner result. Always check names, numbers and amounts before relying on them.",
        ],
      },
      {
        heading: "What it can and can't read",
        paragraphs: [
          "This tool reads printed English text, including text in columns and tables, although the layout is simplified to plain lines. It does not read handwriting, and other languages and alphabets are not supported yet.",
          "The recogniser and its English dictionary (about 7 MB) download the first time you use it and are then cached by your browser.",
        ],
      },
    ],
    faqs: [
      { q: "How do I copy text from an image?", a: "Add the image, wait for recognition to finish, then tap Copy text." },
      { q: "Does it work with screenshots?", a: "Yes, and screenshots give the most accurate results. You can paste a screenshot straight into the page." },
      { q: "Can it read handwriting?", a: "No. It is designed for printed text." },
      { q: "Which languages are supported?", a: "English for now." },
      LOCAL_IMG,
    ],
  },

  "color-picker-from-image": {
    title: "Colour Picker From Image: HEX and RGB",
    description:
      "Pick any colour from an image and get its HEX, RGB and HSL codes, plus the main colour palette of the photo. Free, private, works on phones.",
    h1: "Pick Colours From an Image",
    intro:
      "Tap anywhere on a photo, logo or screenshot to get the exact colour code, and see the image's main colours as a ready-made palette. Tap any code to copy it.",
    steps: [
      "Add an image.",
      "Tap or click a spot on the image. Drag to explore nearby colours.",
      "Copy the HEX, RGB or HSL code, or use the palette of main colours.",
    ],
    guide: [
      {
        heading: "HEX, RGB and HSL",
        paragraphs: [
          "HEX codes such as #0071E3 are used in web design, Canva, Figma and most design apps. RGB gives the red, green and blue values from 0 to 255, which some apps and code ask for. HSL describes hue, saturation and lightness, which makes it easy to create lighter or darker versions of a colour.",
          "The picker averages a tiny 3 × 3 pixel area, so a single stray pixel in a photo doesn't throw the result off.",
        ],
      },
      {
        heading: "Building a palette from a photo",
        paragraphs: [
          "The main colours are found by grouping similar pixels together and are listed from most to least common, with roughly how much of the image each one covers. It's a quick way to match a brand, decorate a room from a favourite picture or pick colours for a slide deck that suit your photos.",
        ],
      },
    ],
    faqs: [
      { q: "How do I find the HEX code of a colour in an image?", a: "Add the image and tap the colour. The HEX code appears with a copy button." },
      { q: "Can I get a colour palette from a photo?", a: "Yes. The main colours are shown automatically under the image." },
      { q: "Does it work with screenshots and logos?", a: "Yes. Paste a screenshot or add any JPG, PNG, WebP or HEIC image." },
      LOCAL_IMG,
    ],
  },

  "add-text-to-image": {
    title: "Add Text to Image Online: Captions, Memes",
    description:
      "Add text to a photo online: top and bottom captions, meme style or clean fonts, any colour, with outline. Free, private, no watermark.",
    h1: "Add Text to an Image",
    intro:
      "Write a caption on any photo and download it in seconds, from classic meme text to clean captions for social posts. The preview updates as you type.",
    steps: [
      "Add an image.",
      "Type your top and bottom text.",
      "Pick the style, size and colour. Keep the outline on for text over busy backgrounds.",
      "Download the image.",
    ],
    guide: [
      {
        heading: "Making text easy to read",
        paragraphs: [
          "Text needs contrast with what is behind it. White text with a black outline reads well on almost any photo, which is why it is the classic meme style. On a plain light area, dark text without an outline looks cleaner. Keep captions short: fewer words at a larger size beat a paragraph in small type.",
          "Long text wraps onto several lines automatically and stays inside the edges of the image. Turn ALL CAPS off for a calmer look.",
        ],
      },
      {
        heading: "Fonts on different devices",
        paragraphs: [
          "The Bold meme style uses Impact where your device has it, as Windows and Mac do. Phones without it use the boldest similar font available. Clean and Classic use your device's own sans-serif and serif fonts.",
        ],
      },
    ],
    faqs: [
      { q: "How do I make a meme?", a: "Add a picture, type top and bottom text in the Bold meme style and download." },
      { q: "Is there a watermark?", a: "No. The image you download is yours, with no watermark." },
      { q: "Can I change the text colour?", a: "Yes. Pick any colour; the outline switches to black or white automatically to stay readable." },
      LOCAL_IMG,
    ],
  },

  "unlock-pdf": {
    title: "Unlock PDF: Remove a PDF Password, Free",
    description:
      "Remove the password from a PDF you're allowed to open. Also lifts print and copy restrictions. Free, private, runs in your browser.",
    h1: "Unlock a PDF",
    intro:
      "Type the password once and download a copy of the PDF that opens without it. PDFs that open but block printing or copying can be unlocked without any password.",
    steps: [
      "Add the protected PDF.",
      "Enter its password, or leave the box empty if it opens but can't be printed or copied.",
      "Tap Unlock PDF and download the unlocked copy.",
    ],
    guide: [
      {
        heading: "Two kinds of PDF protection",
        paragraphs: [
          "An open password stops a PDF from opening at all. Banks, payroll systems and phone companies often use one on statements, typically based on your date of birth or account number. Enter it here once and you get a copy you can open, merge or compress without typing it every time.",
          "A permissions password lets anyone open the PDF but blocks printing, copying or editing. These restrictions can be removed without knowing the password: leave the box empty and tap Unlock.",
        ],
      },
      {
        heading: "This is not a password cracker",
        paragraphs: [
          "If you don't know the open password, this tool can't unlock the file, and it does not try to guess it. Only unlock documents that you own or have permission to change.",
          "Unlocking happens entirely on your device using the open-source qpdf engine, so your PDF and password are never uploaded.",
        ],
      },
    ],
    faqs: [
      { q: "How do I remove a password from a PDF?", a: "Add the PDF, enter its password and download the unlocked copy." },
      { q: "Can I unlock a PDF without the password?", a: "Only if it opens without one and just blocks printing or copying. If it asks for a password to open, you need that password." },
      { q: "Will the content change?", a: "No. The text, images and layout stay exactly the same; only the encryption is removed." },
      LOCAL_PDF,
    ],
  },

  "protect-pdf": {
    title: "Protect PDF With a Password, Free",
    description:
      "Add a password to a PDF with strong AES-256 encryption before you email or share it. Free, private, works on phone and computer.",
    h1: "Password-Protect a PDF",
    intro:
      "Lock a PDF with a password so only people you share it with can open it. The file is encrypted with AES-256 on your own device before you send it anywhere.",
    steps: [
      "Add your PDF.",
      "Choose a password and type it again to confirm.",
      "Tap Protect PDF and download the encrypted copy.",
    ],
    guide: [
      {
        heading: "How the protection works",
        paragraphs: [
          "The PDF is encrypted with AES-256, the strongest standard PDF encryption, which every modern PDF reader supports. Anyone opening it, in Adobe Acrobat, Preview, a browser or a phone app, has to enter the password first.",
          "Share the password in a different way from the file. If you email the PDF, send the password by text message or tell it in person.",
        ],
      },
      {
        heading: "Choosing a password",
        paragraphs: [
          "Longer is stronger. A phrase of three or four random words is easy to say over the phone and hard to guess. There is no way to recover a forgotten password, so keep the original unprotected file somewhere safe.",
        ],
      },
    ],
    faqs: [
      { q: "How do I put a password on a PDF?", a: "Add the PDF, type a password twice and download the protected copy." },
      { q: "How secure is it?", a: "It uses AES-256 encryption. With a strong password, the PDF can't realistically be opened without it." },
      { q: "What if I forget the password?", a: "It can't be recovered. Keep your original file." },
      LOCAL_PDF,
    ],
  },

  "flatten-pdf": {
    title: "Flatten PDF: Lock Form Fields in Place",
    description:
      "Flatten a PDF so filled-in form fields, comments and annotations become part of the page and can't be edited. Free, private, no upload.",
    h1: "Flatten a PDF",
    intro:
      "Turn filled-in form fields, comments and stamps into fixed page content so they print correctly and can't be changed by the next person who opens the file.",
    steps: ["Add your PDF.", "Tap Flatten PDF.", "Download the flattened copy."],
    guide: [
      {
        heading: "When to flatten a PDF",
        paragraphs: [
          "Flatten a form after you've filled it in and before you send it, so your answers can't be edited by accident and look the same in every PDF reader. Flattening also fixes forms whose answers don't show up when printed or previewed on a phone, and it is a good last step after signing.",
          "Text that is part of the page stays selectable. Only interactive parts, such as form fields, checkboxes, comments and highlights, are merged into the page.",
        ],
      },
    ],
    faqs: [
      { q: "What does flattening a PDF do?", a: "It turns form fields and annotations into ordinary page content, so they can no longer be edited." },
      { q: "Can I undo flattening?", a: "Not in the flattened file. Keep the original if you might need to edit it later." },
      { q: "Will my text still be selectable?", a: "Yes. Normal page text is unchanged." },
      LOCAL_PDF,
    ],
  },

  "edit-pdf-metadata": {
    title: "Edit PDF Metadata: Title, Author, Keywords",
    description:
      "View and change a PDF's title, author, subject and keywords, or clear them before sharing. Free, private, runs in your browser.",
    h1: "Edit PDF Metadata",
    intro:
      "See the hidden details stored inside a PDF, such as its title, author, keywords and the program that created it, then change or clear them and download the updated file.",
    steps: ["Add your PDF.", "Edit or clear the fields you want to change.", "Download the updated PDF."],
    guide: [
      {
        heading: "Why metadata matters",
        paragraphs: [
          "The title is shown in browser tabs and PDF readers instead of the file name, and search engines use it when they list the PDF. A clear title and subject make published reports, menus and price lists look more professional and easier to find.",
          "Metadata can also reveal more than you intend, such as the author's full name, a company name or the software used. Use Clear all before sharing a document publicly if you'd rather not include those details.",
        ],
      },
    ],
    faqs: [
      { q: "How do I change the title of a PDF?", a: "Add the PDF, type a new title and download. The title then shows in PDF readers and browser tabs." },
      { q: "Can I remove the author name?", a: "Yes. Clear the Author field, or use Clear all, and download." },
      { q: "Does it change the content?", a: "No. Only the document properties change." },
      LOCAL_PDF,
    ],
  },
};
