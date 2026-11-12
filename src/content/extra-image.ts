import type { PageContent } from "./types";

const PRIVATE = {
  q: "Are my images uploaded?",
  a: "No. Everything happens in your browser on your own device, so your photos are never sent to a server.",
};

export const extraImageContent: Record<string, PageContent> = {
  "resize-image": {
    title: "Resize Image Online: Pixels, Percent, Social",
    description:
      "Resize images to exact pixels, a percentage or ready-made sizes for Instagram, YouTube and the web. Free, private, works on phone and desktop.",
    h1: "Resize an Image to Any Size",
    intro:
      "Pick a ready-made size or type the width and height you need, and download the resized photo in seconds. Batch up to 20 images at once, all inside your browser.",
    steps: [
      "Add one or more JPG, PNG, WebP or HEIC images.",
      "Tap a preset such as Instagram 1080×1080, or type your own width and height.",
      "Leave Keep aspect ratio on to avoid stretching, or turn it off for an exact size.",
      "Download each image, or all of them as one ZIP.",
    ],
    guide: [
      {
        heading: "Pixels, percentage or a preset?",
        paragraphs: [
          "Use pixels when a website, form or app tells you the size it wants, for example 600 × 600 for a profile photo. Use a percentage when you simply want everything smaller, such as 50% to halve both sides. The presets cover the sizes people ask for most: square Instagram posts, Full HD screens, YouTube thumbnails, and 1200 or 800 pixels wide for websites and email.",
          "With Keep aspect ratio on, the image is scaled to fit inside the width and height you give, so nothing gets squashed. If you need an exact shape, such as a square from a landscape photo, crop it first with the crop tool and then resize.",
        ],
      },
      {
        heading: "Why resizing makes files so much smaller",
        paragraphs: [
          "A modern phone photo is often 4000 pixels wide, far more than any screen needs. Halving the width and height cuts the number of pixels to a quarter, which usually shrinks the file by 70% or more before any compression. That makes resizing the quickest way to get a photo under an upload limit while it still looks sharp.",
          "Making an image larger than the original is possible, but it cannot add detail that was never captured, so enlarged images look soft. For the best quality, start from the biggest version of the photo you have.",
        ],
      },
      {
        heading: "Private and fast on any device",
        paragraphs: [
          "Resizing runs in your browser using your device's own graphics, so there is no upload and no waiting in a queue. It works the same on a phone, tablet or computer, and location data stored inside photos is removed from the files you download.",
        ],
      },
    ],
    faqs: [
      { q: "How do I resize an image without stretching it?", a: "Keep the Keep aspect ratio box ticked. The image is then scaled to fit inside your width and height without distortion." },
      { q: "What size should an Instagram photo be?", a: "1080 × 1080 pixels for a square post. Portrait posts are 1080 × 1350." },
      { q: "Can I resize several images at once?", a: "Yes. Add up to 20 images and the same size is applied to all of them. Download them one by one or as a ZIP." },
      { q: "Does resizing reduce quality?", a: "Making an image smaller keeps it sharp. Making it bigger than the original makes it look soft, because no new detail can be added." },
      PRIVATE,
    ],
  },

  "crop-image": {
    title: "Crop Image Online: Square, 16:9 or Free",
    description:
      "Crop images online by dragging a box, or choose square, 4:5, 16:9 or story shapes. Free, no upload, works with touch on phones and tablets.",
    h1: "Crop an Image Online",
    intro:
      "Drag the box over the part you want to keep, or pick a shape like square or 16:9. It works with a finger on phones and tablets and with a mouse on a computer.",
    steps: [
      "Add a JPG, PNG, WebP or HEIC image.",
      "Choose a shape, or keep Free to crop any rectangle.",
      "Drag the box to move it and drag its corners to resize it.",
      "Download the cropped image as the original format, JPG or PNG.",
    ],
    guide: [
      {
        heading: "Choosing the right shape",
        paragraphs: [
          "Square (1:1) suits profile pictures and Instagram posts. 4:5 is the tallest portrait Instagram allows in the feed. 16:9 matches YouTube thumbnails, presentations and most screens, while 9:16 is the full-screen shape used by Stories, Reels, Shorts and TikTok. 4:3 and 3:2 are the shapes most cameras and phones shoot in, handy when you want to straighten a composition without changing its proportions.",
          "Free lets you draw any rectangle, which is useful for cutting a signature, a receipt or a single item out of a bigger photo.",
        ],
      },
      {
        heading: "Tips for a better crop",
        paragraphs: [
          "The faint grid splits the box into thirds. Placing the subject's eyes or the horizon along one of those lines usually looks more balanced than putting it dead centre. Leave a little space in front of a face or a moving object so it has room to look or move into.",
          "Cropping keeps the original resolution of the area you select, so the result is as sharp as the photo you started with. If you also need a specific pixel size, resize the cropped image afterwards.",
        ],
      },
      {
        heading: "Keyboard and accessibility",
        paragraphs: [
          "You can crop without a mouse. Tab to the crop area, use the arrow keys to move it and hold Shift with the arrow keys to make it bigger or smaller. The size of the result in pixels is shown below the image the whole time.",
        ],
      },
    ],
    faqs: [
      { q: "How do I crop a picture into a square?", a: "Choose Square as the shape, drag the box over the part you want and download." },
      { q: "Does cropping reduce image quality?", a: "No. The pixels you keep are copied exactly. Saving as JPG adds very light compression; choose PNG for a lossless copy." },
      { q: "Can I crop on my phone?", a: "Yes. Drag the box and its corners with your finger. The page does not scroll while you are dragging." },
      { q: "What is the 9:16 shape for?", a: "It is the full-screen vertical shape used by Instagram Stories and Reels, TikTok and YouTube Shorts." },
      PRIVATE,
    ],
  },

  "compress-image-to-200kb": {
    title: "Compress Image to 200KB Online, Free",
    description:
      "Compress JPG, PNG or WebP images to under 200 KB automatically, keeping the best quality that fits. Free, private and nothing is uploaded.",
    h1: "Compress an Image to 200 KB",
    intro:
      "Add your photos and each one is reduced to 200 KB or less at the highest quality that fits. Useful for job portals, visa forms and websites with an upload limit.",
    steps: [
      "Add one or more images, up to 20 at a time.",
      "The target is already set to 200 KB. Change it if your form asks for a different size.",
      "Check the new size next to each file.",
      "Download each image, or all of them as a ZIP.",
    ],
    guide: [
      {
        heading: "How the 200 KB target works",
        paragraphs: [
          "Instead of guessing a quality setting, the tool tries different compression levels and keeps the best-looking version that is still under 200 KB. If a very large photo is still too big even at the lowest quality, it is scaled down a little as well, so the result meets the limit.",
          "200 KB is enough for a clear, full-screen photo. Most people cannot tell a well-compressed 200 KB JPG from the original on a phone or laptop screen.",
        ],
      },
      {
        heading: "When to choose a different size",
        paragraphs: [
          "If a form says 'maximum 100 KB' or '50 KB', use those tools instead, because they target the smaller limit directly. For printing or professional work, keep files larger, such as 500 KB or more, so fine detail survives.",
          "PNG files are saved as JPG in target mode, because PNG cannot be compressed to an exact size. If you need transparency, use the WebP format or keep the PNG and resize it instead.",
        ],
      },
    ],
    faqs: [
      { q: "Will my photo look worse at 200 KB?", a: "Usually not noticeably. The tool keeps the highest quality that fits, and 200 KB is plenty for screen viewing." },
      { q: "Can I compress several images to 200 KB at once?", a: "Yes, up to 20 images. Each one is compressed separately to fit the limit." },
      { q: "Why did my PNG become a JPG?", a: "PNG is a lossless format that cannot be squeezed to a target size, so JPG is used in this mode." },
      { q: "What if my image is already under 200 KB?", a: "It is re-saved at high quality and still stays under 200 KB, so you can use it as it is." },
      PRIVATE,
    ],
  },

  "compress-image-to-500kb": {
    title: "Compress Image to 500KB Online, Free",
    description:
      "Reduce JPG, PNG or WebP photos to 500 KB or less while keeping them sharp. Automatic, free, private and works on phone, tablet and desktop.",
    h1: "Compress an Image to 500 KB",
    intro:
      "Bring big phone and camera photos under 500 KB without visible quality loss. Each image is compressed to the best quality that fits, right in your browser.",
    steps: [
      "Add your images, up to 20 at a time.",
      "The target is set to 500 KB. Adjust it if you need a different limit.",
      "Compare the before and after sizes.",
      "Download the images one by one or as a ZIP.",
    ],
    guide: [
      {
        heading: "High quality with a size cap",
        paragraphs: [
          "500 KB is a generous limit. It keeps photos sharp enough to zoom in a little, to print at small sizes and to use as website banners, while still being a fraction of a typical 3–8 MB phone photo. The tool tries several compression levels and picks the best one that stays under the limit.",
          "Common places that ask for files under 500 KB include school and university applications, government portals, online shops and email newsletters.",
        ],
      },
      {
        heading: "Getting the most out of 500 KB",
        paragraphs: [
          "If you control the dimensions, resizing a huge photo to around 2000 pixels on the long side before compressing leaves more of the 500 KB budget for detail. For website images, WebP gives the same quality at a smaller size than JPG.",
        ],
      },
    ],
    faqs: [
      { q: "Is 500 KB good quality?", a: "Yes. For screens and small prints, a well-compressed 500 KB photo looks the same as the original to most people." },
      { q: "Can I set a different size?", a: "Yes. Type any limit in KB or tap one of the quick sizes." },
      { q: "Does it work with HEIC photos from iPhone?", a: "Yes. HEIC photos are converted and compressed in one step." },
      PRIVATE,
    ],
  },

  "jpg-to-webp": {
    title: "JPG to WebP Converter, Free Online",
    description:
      "Convert JPG photos to WebP for faster websites. Smaller files at the same quality, batch up to 20 images, free and private in your browser.",
    h1: "Convert JPG to WebP",
    intro:
      "WebP images are often 25–35% smaller than JPG at the same visual quality. Convert your photos in a batch and download them ready for your website.",
    steps: [
      "Add your JPG images, up to 20 at a time.",
      "Adjust the quality slider if you want even smaller files.",
      "Optionally resize them for the web.",
      "Download each WebP file, or all of them as a ZIP.",
    ],
    guide: [
      {
        heading: "Why use WebP?",
        paragraphs: [
          "WebP is an image format designed for the web. It compresses photos more efficiently than JPG, so pages load faster, use less mobile data and score better in speed tests such as Google PageSpeed Insights. Every modern browser can show WebP images. Saving WebP needs Chrome, Edge or Firefox; Safari can display WebP but cannot create it yet, so on an iPhone or Mac choose JPG or use another browser.",
          "For a website, combine conversion with resizing: an image displayed 1200 pixels wide does not need to be 4000 pixels wide. Doing both often cuts the file size by 90%.",
        ],
      },
      {
        heading: "When to keep JPG",
        paragraphs: [
          "Some older desktop software, printers and email programs still do not open WebP. If you are sending a photo to someone or attaching it to a document, JPG is the safer choice. Keep your originals and use WebP copies for the web.",
        ],
      },
    ],
    faqs: [
      { q: "Is WebP better than JPG?", a: "For websites, usually yes: smaller files at the same quality. For sharing and printing, JPG is more widely supported." },
      { q: "Do all browsers support WebP?", a: "All modern browsers display WebP. To create WebP files here, use Chrome, Edge or Firefox, because Safari cannot save WebP yet." },
      { q: "Can I convert WebP back to JPG?", a: "Yes, use the WebP to JPG converter." },
      PRIVATE,
    ],
  },

  "png-to-webp": {
    title: "PNG to WebP Converter, Keeps Transparency",
    description:
      "Convert PNG to WebP and keep transparent backgrounds while cutting file size. Free, batch up to 20 images, private and runs in your browser.",
    h1: "Convert PNG to WebP",
    intro:
      "Turn large PNG screenshots, logos and graphics into much smaller WebP files. Transparent backgrounds are kept, so logos still sit cleanly on any colour.",
    steps: [
      "Add your PNG images, up to 20 at a time.",
      "Set the quality. 80% suits most graphics and screenshots.",
      "Resize them if they are bigger than needed.",
      "Download the WebP files one by one or as a ZIP.",
    ],
    guide: [
      {
        heading: "Smaller graphics without losing transparency",
        paragraphs: [
          "PNG is lossless, which makes it great for editing but heavy for websites. WebP supports transparency like PNG, yet compresses far better, so a 1 MB PNG often becomes 100–300 KB as WebP with no visible difference.",
          "Screenshots with text stay readable at around 80% quality. For logos and icons with sharp edges, use a higher quality setting.",
        ],
      },
      {
        heading: "Where WebP works",
        paragraphs: [
          "All modern browsers show WebP, and most website builders accept it. To create WebP files here, use Chrome, Edge or Firefox; Safari cannot save WebP yet. Keep the original PNG if you plan to edit the image later.",
        ],
      },
    ],
    faqs: [
      { q: "Does PNG to WebP keep a transparent background?", a: "Yes. Transparency is preserved in the WebP file." },
      { q: "How much smaller will my file be?", a: "Often 60–90% smaller, depending on the image and the quality you pick." },
      { q: "Can I use WebP on my website?", a: "Yes. Every modern browser supports it." },
      PRIVATE,
    ],
  },
};
