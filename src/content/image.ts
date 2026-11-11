import type { PageContent } from "./types";

export const imageContent: Record<string, PageContent> = {
  "image-compressor": {
    title: "Image Compressor: Reduce JPG, PNG, WebP Size",
    description:
      "Image compressor for JPG, PNG and WebP. Shrink photos with a quality slider, free, in your browser, with no upload and no watermark.",
    h1: "Compress Images Online Without Uploading Them",
    intro:
      "Drop in up to 20 photos, pick a quality level and see the new file size before you download. Everything is processed inside your browser, so your pictures never leave your device.",
    steps: [
      "Add your JPG, PNG or WebP files by dragging them onto the page or choosing them from your device.",
      "Move the quality slider and watch the before and after size update for each image.",
      "Optionally resize the image or switch the output format to WebP for smaller files.",
      "Download each image on its own, or take them all as one ZIP.",
    ],
    guide: [
      {
        heading: "How image compression actually shrinks a file",
        paragraphs: [
          "A photo from a modern phone often weighs 3 to 8 MB. Most of that is detail your eyes cannot pick out on a screen. JPEG and WebP compression throws away some of that detail in a way that is hard to notice, and the file gets much smaller.",
          "This is called lossy compression. The quality slider controls how aggressive it is. At 80 percent, a typical photo drops to roughly a quarter of its original size with no visible change at normal viewing distance. Below 50 percent you start to see blocky patches and smeared edges, especially around text and sharp lines.",
          "PNG works differently. It is lossless, so the pixels stay exact and the savings are usually small for photographs. PNG is the right choice for logos, screenshots and flat graphics, not for pictures of people or landscapes.",
        ],
      },
      {
        heading: "Picking a quality setting that fits the job",
        paragraphs: [
          "For a website or blog, 70 to 80 percent is a good starting range. Pages load faster and the pictures still look clean. For a photo you plan to print or crop heavily later, stay at 90 percent or above and keep the original file as a backup.",
          "If you need a specific file size, such as an upload limit on a form, use the target size presets on the dedicated pages for 100 KB, 50 KB and 20 KB. They search for the right quality automatically instead of making you guess.",
          "Resizing helps more than most people expect. A 4000 pixel wide photo shown in a 800 pixel wide blog column wastes most of its pixels. Scaling it down to 1600 pixels before compressing can cut the file by another half.",
        ],
      },
      {
        heading: "What happens to metadata and transparency",
        paragraphs: [
          "Photos carry hidden EXIF data: camera model, date, and often the GPS location where you took the shot. Because each image is re-encoded here, that metadata is dropped by default. That is useful when you post pictures publicly and do not want to share where you live.",
          "Transparency is only kept when the output format supports it. PNG and WebP can have transparent areas. JPG cannot, so a transparent PNG converted to JPG gets a white background.",
        ],
      },
      {
        heading: "Why browser-based compression is safer",
        paragraphs: [
          "Many compressors send your files to a server, process them there and send them back. That is fine for a holiday snap but uncomfortable for ID cards, receipts or client work. Here the compression code runs on your own device, and no file is uploaded at any point.",
          "Each file can be up to 25 MB, and you can process up to 20 at a time. On a slow phone, large batches may take a little longer, but nothing is sent over the network while you wait.",
        ],
      },
    ],
    faqs: [
      {
        q: "Does compressing an image reduce its quality?",
        a: "With JPG and WebP, yes, slightly, because some detail is discarded. At 75 to 85 percent quality the difference is rarely visible. PNG compression keeps every pixel but saves less space.",
      },
      {
        q: "Are my images uploaded to a server?",
        a: "No. The compression runs in your browser using your own device, so your files stay with you. You can even turn off your connection after the page loads and it will still work.",
      },
      {
        q: "How many images can I compress at once?",
        a: "Up to 20 images per batch, with a limit of 25 MB for each file. Download them one by one or as a single ZIP.",
      },
      {
        q: "Will the compressed image have a watermark?",
        a: "No. The tool does not add a watermark, logo or any other mark to your pictures, and there are no daily limits.",
      },
      {
        q: "Which format gives the smallest file?",
        a: "For photographs, WebP is usually smaller than JPG at the same visual quality. JPG is the safer choice when the file must open everywhere, such as in older email clients or government portals.",
      },
      {
        q: "Is the GPS location removed from my photos?",
        a: "Yes. Re-encoding the image drops EXIF data, including GPS coordinates, camera details and timestamps.",
      },
    ],
  },

  "compress-image-to-100kb": {
    title: "Compress Image to 100KB Online, Free",
    description:
      "Compress an image to 100KB online. The tool finds the right quality for you, runs free in your browser and never uploads your photo.",
    h1: "Reduce Image Size to 100 KB or Less",
    intro:
      "Choose the 100 KB target and the tool searches for the highest quality that still fits under the limit. Your photo stays on your device the whole time.",
    steps: [
      "Add your JPG, PNG or WebP image.",
      "Select the 100 KB target size preset.",
      "Wait a moment while the tool tests quality levels and picks the best one.",
      "Check the result size shown next to the original, then download the file.",
    ],
    guide: [
      {
        heading: "Where a 100 KB limit shows up",
        paragraphs: [
          "A 100 KB cap is common on application forms, school admission portals, e-commerce seller dashboards and profile picture fields. It is large enough for a clear passport style photo or a product thumbnail, but far smaller than anything a phone camera produces by default.",
          "If a form says the image must be under 100 KB, aim a little lower, around 95 KB. Some upload systems count a kilobyte as 1,000 bytes and others as 1,024, so a file sitting at exactly the limit can be rejected.",
        ],
      },
      {
        heading: "How the automatic target works",
        paragraphs: [
          "Guessing quality by hand is slow. You drag the slider, check the size, drag again. The target mode does that loop for you by testing different quality values and keeping the highest one whose output is still at or under 100 KB.",
          "If a very large photo cannot reach 100 KB by lowering quality alone, the tool also reduces the pixel dimensions. That is the same thing you would do manually, and it is usually the right call, since a 6000 pixel image gains nothing from being kept at full size on a small form field.",
          "PNG files are a special case. PNG is lossless, so quality does not apply to it. To hit the target, a PNG is converted to a lossy format. If you need to keep a PNG, choose a larger target or resize it by percentage instead.",
        ],
      },
      {
        heading: "Getting the best look at 100 KB",
        paragraphs: [
          "Crop first. Cutting away empty background means the remaining pixels get more of the file budget. A face photo cropped tightly looks sharper at 100 KB than the same photo with a wide margin of wall.",
          "Photos with smooth areas, such as a plain studio background, compress far better than busy scenes with grass, text or patterns. If a busy image looks rough at 100 KB, try reducing its dimensions to around 1000 pixels on the long side before you compress.",
          "Check the result at full size before uploading. Faces and printed text are where compression damage shows first.",
        ],
      },
      {
        heading: "Privacy for documents and ID photos",
        paragraphs: [
          "Photos for forms often include faces, signatures or ID details. Processing happens in your browser, so nothing is sent to us or anyone else. The output also has its EXIF data removed, which includes the location the photo was taken.",
        ],
      },
      {
        heading: "A quick workflow that works every time",
        paragraphs: [
          "Open the original from your phone gallery, not a copy that came through a messaging app. Chat apps already recompress pictures, and starting from that copy leaves less to work with.",
          "Add the file, pick the 100 KB preset, and compare the preview with the original at 100 percent zoom. If the face or text looks fine, download it. If it looks rough, crop the picture first and run it again, since a tighter crop means more of the byte budget goes to the part that matters.",
          "Finally, rename the file to something plain such as photo-100kb.jpg. A few upload systems reject names with spaces, brackets or accented letters.",
        ],
      },
    ],
    faqs: [
      {
        q: "How do I compress a photo to exactly 100 KB?",
        a: "Pick the 100 KB preset and the tool lands just under the limit. It will not hit 100.0 KB to the byte, because the goal is the best quality at or below the target.",
      },
      {
        q: "Why is my compressed image smaller than 100 KB?",
        a: "Quality moves in steps, so the highest step that fits is often a few kilobytes below the limit. Small or simple images may also be under 100 KB already at full quality.",
      },
      {
        q: "Can I compress a PNG to 100 KB?",
        a: "Yes, but PNG is lossless, so reaching a small target means converting it to a lossy format such as JPG or WebP. Transparent areas become white when the result is a JPG.",
      },
      {
        q: "Will the tool change my image dimensions?",
        a: "Only if lowering quality alone cannot reach 100 KB. In that case it shrinks the image a bit and tries again.",
      },
      {
        q: "Is there a limit on how big the original can be?",
        a: "Each file can be up to 25 MB. You can add up to 20 images in one batch.",
      },
      {
        q: "Does it work on my phone?",
        a: "Yes. It runs in any modern mobile browser. Large photos may take a few seconds on older phones.",
      },
    ],
  },

  "compress-image-to-50kb": {
    title: "Compress Image to 50KB Online, Free",
    description:
      "Compress an image to 50KB for forms and portals. Automatic quality search, free, runs in your browser with no upload or watermark.",
    h1: "Make an Image 50 KB or Smaller",
    intro:
      "Many exam and job portals set a 50 KB ceiling for photos. Use the 50 KB preset to get a clear result under that limit without trial and error.",
    steps: [
      "Add the photo you need to shrink.",
      "Choose the 50 KB target size.",
      "Let the tool find the best quality, and downscale if needed.",
      "Look at the preview, confirm the size, and download.",
    ],
    guide: [
      {
        heading: "What 50 KB looks like in practice",
        paragraphs: [
          "Fifty kilobytes is about one twentieth of a typical phone photo. That sounds extreme, but for a small portrait it is quite workable. A face photo at 400 by 500 pixels saved as JPG at moderate quality commonly lands between 30 and 50 KB.",
          "The dimensions matter more than the quality value here. A 3000 pixel wide picture squeezed into 50 KB will look muddy, because every pixel gets almost nothing to work with. The same picture scaled to 600 pixels wide keeps far more clarity at the same file size.",
        ],
      },
      {
        heading: "Typical places that ask for 50 KB",
        paragraphs: [
          "Candidate photo and signature fields on recruitment forms are the usual case, along with some visa and registration systems. The photo field often wants 20 to 50 KB, while the signature field is smaller still.",
          "Always read the exact wording. Some forms specify a minimum as well, for example between 20 and 50 KB, and a few also require specific pixel dimensions. The target mode handles the file size. If dimensions are mandated, use the resize option first and compress afterward.",
        ],
      },
      {
        heading: "Tips for a cleaner result",
        paragraphs: [
          "Start from the best original you have. Compressing an already compressed screenshot or a photo forwarded through a chat app stacks the damage, and you will see ringing around edges.",
          "Use good, even lighting in the original photo. Shadows and noisy backgrounds eat file size, so a bright, plain backdrop will fit into 50 KB with room to spare.",
          "Avoid saving the same file repeatedly in lossy formats. Keep one original and make each compressed copy from it.",
        ],
      },
      {
        heading: "About the signature and stamp-size images",
        paragraphs: [
          "Signatures on white paper compress extremely well, often below 20 KB, because most of the image is flat white. Crop closely around the signature and keep the contrast high. A faint pencil signature may turn gray and blotchy, so use a dark pen.",
        ],
      },
      {
        heading: "Step-by-step for a form photo",
        paragraphs: [
          "Take the photo against a light, plain wall in daylight and hold the phone at eye level. Good input matters more than any setting. Then crop so the head and shoulders fill the frame.",
          "Add the cropped image and choose the 50 KB target. Look at the result next to the original. You should see the same face with slightly softer hair and clothing texture, which is the normal trade at this size.",
          "If the form wants a certain pixel size such as 200 by 230, use the resize option first with the aspect lock off, then compress. Doing it in that order gives the compressor a smaller image to work with and keeps the output sharper.",
        ],
      },
    ],
    faqs: [
      {
        q: "How do I reduce a photo to 50 KB without losing quality?",
        a: "You cannot keep full quality, but you can keep it looking good. Crop tightly, let the tool reduce dimensions if needed, and avoid starting from an already compressed copy.",
      },
      {
        q: "Is 50 KB enough for a passport size photo?",
        a: "Yes, for on-screen use. A 413 by 531 pixel portrait fits comfortably under 50 KB as a JPG. It is not intended for high resolution printing.",
      },
      {
        q: "Can I set a minimum size as well?",
        a: "The tool aims for the best quality under your maximum. If a form needs a minimum too, check the result size and nudge the quality slider up until it lands in range.",
      },
      {
        q: "Why does my image look blurry at 50 KB?",
        a: "The original probably had too many pixels for the budget. Resize it to a smaller width first, then compress again.",
      },
      {
        q: "Does the tool keep my photo private?",
        a: "Yes. Compression runs locally in your browser, so the photo is never uploaded.",
      },
      {
        q: "Can I do several photos at once?",
        a: "Yes, up to 20 images per batch, each with a size up to 25 MB, downloadable as a ZIP.",
      },
    ],
  },

  "compress-image-to-20kb": {
    title: "Compress Image to 20KB Online, Free",
    description:
      "Compress an image to 20KB for signature and photo fields. Free, runs in your browser, and your file is never uploaded anywhere.",
    h1: "Shrink an Image to 20 KB",
    intro:
      "Twenty kilobytes is a tight limit, often used for signature and thumbnail fields. The 20 KB preset reduces quality and size together until the file fits.",
    steps: [
      "Add your signature, photo or scan.",
      "Pick the 20 KB target size.",
      "Let the tool shrink the quality and dimensions as needed.",
      "Review the preview and download the result.",
    ],
    guide: [
      {
        heading: "Why 20 KB needs a different approach",
        paragraphs: [
          "At 20 KB there is very little room. Lowering quality alone will rarely be enough for a large picture, because below a certain point the JPEG blocks become obvious before the size gets small enough. The tool therefore lowers the pixel dimensions as well, which spreads the limited bytes over fewer pixels and keeps the picture readable.",
          "For small images, this is fine. A 200 by 250 pixel photo at 20 KB looks acceptable on screen. A 2000 pixel photo forced into 20 KB without resizing would look like a mosaic.",
        ],
      },
      {
        heading: "Signatures: the easiest case",
        paragraphs: [
          "A scanned signature is mostly white paper with a thin dark line. That kind of image compresses very well. Crop to the signature, increase contrast if the ink looks pale, and the result typically falls well under 20 KB with decent edges.",
          "Sign with a dark pen on plain white paper with no lines. Ruled paper adds detail that costs bytes and looks messy after compression. Good lighting when you photograph the sheet also prevents gray shadows across the background.",
        ],
      },
      {
        heading: "What to expect from photos at this size",
        paragraphs: [
          "Face photos can work at 20 KB if they are small, around 150 to 250 pixels wide. Fine detail like hair strands and fabric texture will soften, but faces stay recognizable. If an upload field also specifies pixel dimensions, resize to those numbers first so the compressor does not have to guess.",
          "Do not use a 20 KB version for anything beyond the upload field. Keep your original and make the small copy only for the form.",
        ],
      },
      {
        heading: "Using the output correctly",
        paragraphs: [
          "Most strict portals expect JPG or JPEG. If your source is PNG, the tool converts it to a lossy format to reach the target, and transparent areas turn white in JPG. Check the file extension before uploading, and make sure the name has no unusual characters.",
        ],
      },
      {
        heading: "Common 20 KB mistakes to avoid",
        paragraphs: [
          "The most frequent mistake is scanning at very high resolution. A 600 dpi scan of a small signature produces millions of pixels for a line that needs a few thousand. Scan or photograph at normal settings and crop tightly.",
          "Another is photographing a signature with a flash. The glare creates bright patches that turn into noisy gray areas after compression. Use natural light from the side and keep the paper flat.",
          "Finally, do not stretch a tiny image back up. If a 20 KB file is blown up to fill a larger space, it will look soft. Keep the small copy for the upload field only.",
        ],
      },
    ],
    faqs: [
      {
        q: "Can any image be compressed to 20 KB?",
        a: "Almost any image can, but large detailed photos need to be scaled down a lot. The result will be small in pixel size as well as file size.",
      },
      {
        q: "How do I compress a signature to 20 KB?",
        a: "Crop it tightly, then use the 20 KB preset. Signatures on plain white paper usually fit without much loss.",
      },
      {
        q: "Why did the dimensions of my image change?",
        a: "Quality alone could not reach 20 KB, so the tool reduced the size of the picture as well. This gives a cleaner result than extreme quality loss.",
      },
      {
        q: "Which format should I upload?",
        a: "Use JPG unless the portal says otherwise. It is accepted almost everywhere.",
      },
      {
        q: "Is the image sent to a server?",
        a: "No. All processing happens in your browser, and nothing is uploaded.",
      },
      {
        q: "Does the output contain a watermark?",
        a: "No. The file is plain, with no watermark, and EXIF data such as location is removed.",
      },
    ],
  },

  "heic-to-jpg": {
    title: "HEIC to JPG Converter, Free and Private",
    description:
      "Convert HEIC photos from your iPhone to JPG online. Free, runs in your browser, no upload, batch up to 20 files and download as ZIP.",
    h1: "Convert HEIC Photos to JPG",
    intro:
      "iPhone photos saved as HEIC often will not open on Windows or upload to websites. Convert them to JPG here, in your browser, without sending them anywhere.",
    steps: [
      "Add one or more HEIC files from your device.",
      "Keep the output set to JPG and adjust quality if you want a smaller file.",
      "Wait for the conversion to finish on each photo.",
      "Download the JPGs one by one or all together as a ZIP.",
    ],
    guide: [
      {
        heading: "What HEIC is and why your iPhone uses it",
        paragraphs: [
          "HEIC is Apple's default photo format since iOS 11. It stores the same picture as JPG in about half the space, which lets an iPhone hold twice as many photos before storage fills up. The format is based on the HEVC video codec and can also keep extras like Live Photo data and depth information.",
          "The downside is compatibility. Older Windows versions need a paid extension to show HEIC, many web forms reject it, and some email clients and printing kiosks cannot open it. JPG is the format everything understands.",
        ],
      },
      {
        heading: "Converting without losing much quality",
        paragraphs: [
          "Both HEIC and JPG are lossy, so a conversion decodes the photo and encodes it again. At a high quality setting, such as 90 percent, the result is visually the same as the original for everyday use. The JPG will be larger than the HEIC, often around double.",
          "If the converted file is too big for an upload form, lower the quality a notch or resize the photo. For a strict limit like 100 KB, run the JPG through the image compressor afterward.",
        ],
      },
      {
        heading: "Changing the iPhone setting instead",
        paragraphs: [
          "You can also stop the problem at the source. Open Settings, then Camera, then Formats, and choose Most Compatible. New photos will be saved as JPG. This does not fix photos you have already taken, which is where a converter helps.",
          "When you share a photo from the Photos app through AirDrop to a Mac or through email, iOS sometimes converts it for you. Uploading straight from the library to a website does not always do that, which is why the file arrives as HEIC.",
        ],
      },
      {
        heading: "What gets kept and what gets dropped",
        paragraphs: [
          "Orientation is respected, so photos should not come out sideways. Location and camera metadata are removed during conversion, which is good for privacy but means the JPG will not show where it was taken. Live Photo motion is not kept; you get the still frame.",
        ],
      },
      {
        heading: "Opening HEIC files on other devices",
        paragraphs: [
          "Recent versions of Windows can show HEIC when the right codec is installed, and Android phones differ by brand. Rather than hunting for add-ons, converting once to JPG gives you a file that opens on every computer, phone and printer.",
          "If you send photos to a relative with an older laptop, convert them first. The same goes for school or government sites that list JPG and PNG as the only accepted types. A HEIC file will often just fail with a vague error message and no hint about why.",
          "Moving a whole trip's worth of pictures is where HEIC causes the most grief. Add up to 20 at a time, convert, and download the ZIP. Repeat in groups if you have more. Keep an eye on the file sizes shown, since JPGs from a 48 megapixel sensor can be large.",
        ],
      },
    ],
    faqs: [
      {
        q: "Is HEIC the same as HEIF?",
        a: "HEIF is the container standard and HEIC is the version Apple uses, with HEVC compression. In daily use people treat the names as interchangeable.",
      },
      {
        q: "Are my iPhone photos uploaded when I convert them?",
        a: "No. The conversion happens in your browser on your device, and the files are never sent to a server.",
      },
      {
        q: "Can I convert many HEIC files at once?",
        a: "Yes, up to 20 files per batch, 25 MB each, and download them together as a ZIP.",
      },
      {
        q: "Why is the JPG bigger than the HEIC?",
        a: "HEIC compresses more efficiently, so the same picture takes more bytes as JPG. Lower the quality or resize if you need it smaller.",
      },
      {
        q: "Will the JPG keep the GPS location?",
        a: "No. Metadata including GPS is stripped when the image is re-encoded.",
      },
      {
        q: "Does it work on Android and desktop?",
        a: "Yes, in any modern browser. HEIC support depends on the browser engine, and the tool handles the decoding itself.",
      },
    ],
  },

  "png-to-jpg": {
    title: "PNG to JPG Converter, Free Online",
    description:
      "Convert PNG to JPG online and cut file size. Free, private and runs in your browser, with no upload, no watermark and ZIP download.",
    h1: "Convert PNG Images to JPG",
    intro:
      "Turn PNG screenshots and graphics into smaller JPG files. Set the quality, check the new size and download, all without uploading anything.",
    steps: [
      "Add your PNG files.",
      "Choose JPG as the output format.",
      "Set the quality slider and compare the before and after size.",
      "Download the converted files individually or as a ZIP.",
    ],
    guide: [
      {
        heading: "When converting PNG to JPG makes sense",
        paragraphs: [
          "PNG is lossless, which makes it large for photographs. A 4 MB PNG of a photo often becomes a 400 KB JPG with no visible difference. If you are emailing pictures, attaching them to a job application, or uploading to a site with a size cap, JPG is usually the better pick.",
          "PNG still wins for screenshots with text, logos, diagrams and anything with sharp edges or flat color. JPG adds faint fuzz around such edges, and the file may not even end up smaller.",
        ],
      },
      {
        heading: "The transparency issue",
        paragraphs: [
          "PNG can have transparent areas. JPG cannot. When you convert, every transparent pixel is filled with white. For a logo that will sit on a white page that is perfect. For a logo that needs to sit on a colored background, keep it as PNG or WebP.",
          "If you want a different background color than white, the background remover can place your subject on a solid color first, and then you can convert the result.",
        ],
      },
      {
        heading: "Choosing a quality value",
        paragraphs: [
          "Start at 85 percent. It keeps photographs clean and typically reduces size by 70 to 90 percent compared with PNG. For screenshots that include small text, go up to 92 or 95 percent to keep letters crisp. Anything under 60 percent will show visible blockiness.",
          "The tool shows the percentage saved for each file, so you can see immediately whether the conversion is worth it. If a screenshot grows or barely shrinks, keep the PNG.",
        ],
      },
      {
        heading: "Metadata and batches",
        paragraphs: [
          "PNG files rarely carry location data, but any text chunks and color profiles are not carried forward after re-encoding. You can convert up to 20 files at once, each up to 25 MB, and download them as a ZIP.",
        ],
      },
      {
        heading: "A worked example",
        paragraphs: [
          "Say you have a 1920 by 1080 screenshot of a holiday photo saved as PNG at 3.2 MB. Converted to JPG at 85 percent, it might come to around 350 KB, a saving of nearly 90 percent. Open both side by side and the difference is hard to spot.",
          "Now take a PNG of a spreadsheet with thin gridlines and small text. At the same settings the JPG may be 280 KB against a 120 KB PNG, with visible fuzz around the numbers. The rule of thumb is simple: photographs go to JPG, text and line art stay PNG.",
          "If the PNG came from a high resolution display, it may be far larger in pixels than you need. Set a width of 1600 pixels or less in the same step. You get a smaller JPG and one less export to run later.",
        ],
      },
    ],
    faqs: [
      {
        q: "Does converting PNG to JPG reduce quality?",
        a: "JPG is lossy, so a little detail is lost. At 85 to 90 percent quality the difference is hard to see in photos.",
      },
      {
        q: "Why did my transparent background turn white?",
        a: "JPG has no transparency, so the tool fills transparent areas with white.",
      },
      {
        q: "Is the JPG always smaller than the PNG?",
        a: "Not always. Photographs shrink a lot. Simple graphics and screenshots can stay about the same or grow.",
      },
      {
        q: "Are my files uploaded?",
        a: "No. The conversion runs inside your browser and nothing leaves your device.",
      },
      {
        q: "Can I convert several PNGs at once?",
        a: "Yes, up to 20 per batch, with a maximum of 25 MB each.",
      },
      {
        q: "What quality should I use for screenshots?",
        a: "Use 90 percent or higher to keep small text readable, or leave screenshots as PNG.",
      },
    ],
  },

  "jpg-to-png": {
    title: "JPG to PNG Converter, Free Online",
    description:
      "Convert JPG to PNG online for free. Runs in your browser with no upload and no watermark, with batch conversion and ZIP download.",
    h1: "Convert JPG Images to PNG",
    intro:
      "Change a JPG into a lossless PNG in a couple of clicks. The conversion happens on your device, so the original never gets uploaded.",
    steps: [
      "Add your JPG or JPEG files.",
      "Select PNG as the output format.",
      "Start the conversion and compare file sizes.",
      "Download the PNG files, or a ZIP if you added several.",
    ],
    guide: [
      {
        heading: "What you gain by converting to PNG",
        paragraphs: [
          "A JPG that has been converted to PNG does not get sharper. The detail JPEG compression threw away stays gone. What you get is a format that stops any further quality loss: PNG can be opened, edited and saved again as many times as you like without degrading.",
          "That is the main reason to convert. If you plan to edit a picture in several rounds, add text on top, or place it in a design file, start from PNG so each save keeps the pixels exactly as they are.",
        ],
      },
      {
        heading: "Expect a bigger file",
        paragraphs: [
          "PNG stores pixels without discarding data, so a photograph saved as PNG is often three to ten times larger than the JPG it came from. A 500 KB JPG could turn into 3 MB. That is normal and not a sign that something went wrong.",
          "If size matters more than editing flexibility, stay with JPG or try WebP, which handles photos far better. Use PNG when you need exact pixels, such as app screenshots, diagrams, pixel art, or sources for a logo.",
        ],
      },
      {
        heading: "Transparency does not appear on its own",
        paragraphs: [
          "PNG supports transparency, but converting a JPG will not create any. The result has the same solid background as the original. To get a cutout with a see-through background, run the picture through the background remover, which outputs a transparent PNG.",
        ],
      },
      {
        heading: "Where PNG is required",
        paragraphs: [
          "Some design tools, game engines and website builders prefer or require PNG for icons and overlays. Print shops sometimes ask for PNG when text and line art must stay sharp. Check the accepted formats of the destination before choosing.",
          "Metadata such as camera details and GPS is not kept after conversion, so the PNG is also a cleaner file to share publicly.",
        ],
      },
      {
        heading: "Practical reasons people convert",
        paragraphs: [
          "Designers often convert a JPG to PNG before layering text over it in an editor, so repeated exports do not slowly eat the picture. Teachers do it for screenshots that will be marked up and re-saved several times.",
          "Others need PNG because a website builder, a presentation tool or a sticker printing service lists it as the accepted type. In those cases the file looks identical, and only the container changes.",
          "If you convert and the file gets too heavy to email, resize it by percentage. Halving the width and height cuts the pixel count to a quarter.",
          "The converted file keeps your original name with a new extension. When you convert a batch, check that two files did not end up with the same name in the ZIP, for instance IMG_001.jpg and IMG_001.JPG, since some systems treat these as one.",
        ],
      },
    ],
    faqs: [
      {
        q: "Will converting JPG to PNG improve the image?",
        a: "No. It cannot restore detail already lost in the JPG. It only prevents further loss from future edits and saves.",
      },
      {
        q: "Why is the PNG so much larger?",
        a: "PNG is lossless, so it stores far more data than a compressed JPG, especially for photographs.",
      },
      {
        q: "Can I make the background transparent?",
        a: "Not through conversion alone. Use the background remover to cut out the subject and export a transparent PNG.",
      },
      {
        q: "Is my image uploaded anywhere?",
        a: "No, the conversion runs entirely in your browser.",
      },
      {
        q: "Can I convert multiple JPG files together?",
        a: "Yes. Add up to 20 files, each up to 25 MB, and download them as a ZIP.",
      },
      {
        q: "Can I shrink the PNG afterward?",
        a: "You can resize it by width, height or percentage. Quality sliders do not apply to PNG since it is lossless.",
      },
    ],
  },

  "webp-to-jpg": {
    title: "WebP to JPG Converter, Free Online",
    description:
      "Convert WebP to JPG online for free. Works in your browser with no upload, handles batches and gives you a ZIP when you are done.",
    h1: "Convert WebP Images to JPG",
    intro:
      "Saved a picture from the web and it came down as WebP? Convert it to a JPG that opens anywhere, without uploading it to a server.",
    steps: [
      "Add your WebP images.",
      "Keep JPG as the output and choose a quality level.",
      "Review the new sizes shown for each file.",
      "Download the JPGs one at a time or as a ZIP.",
    ],
    guide: [
      {
        heading: "Why so many images arrive as WebP",
        paragraphs: [
          "WebP is a format developed by Google to make web images smaller. Sites serve it because it loads faster than JPG at similar quality. When you right-click and save a picture from such a site, you often get a .webp file instead of the .jpg you expected.",
          "Browsers display WebP without trouble, but plenty of other software does not. Older photo editors, some office programs, print services and many upload forms still insist on JPG or PNG. That is where a conversion helps.",
        ],
      },
      {
        heading: "Transparent WebP files",
        paragraphs: [
          "WebP can contain transparency, like a PNG. Since JPG cannot, any transparent area is filled with white during conversion. If you need the transparency preserved, convert to PNG instead.",
          "Animated WebP files are a separate case. This tool treats the image as a still picture, so you get a single frame rather than an animation.",
        ],
      },
      {
        heading: "Keeping the result sharp",
        paragraphs: [
          "Converting from one lossy format to another stacks compression. To limit the damage, choose a high quality value such as 90 percent. The JPG may then be larger than the original WebP, which is expected, because WebP is more efficient. You can lower the quality afterward if the file needs to be small.",
          "Avoid repeated conversions back and forth. If you still have access to the original source, export from there rather than converting a WebP that came from a JPG in the first place.",
        ],
      },
      {
        heading: "Batch jobs and privacy",
        paragraphs: [
          "If you saved a whole set of product pictures or wallpapers, add them all at once. Up to 20 files of 25 MB each can be processed in one go. Nothing is uploaded, and the converted files carry no metadata from the originals.",
        ],
      },
      {
        heading: "Opening and sharing WebP files elsewhere",
        paragraphs: [
          "Your browser and most modern phones show WebP without trouble, so the problem usually appears later. You attach the file to an email and the recipient cannot preview it. You drag it into a document and nothing happens. You upload it to a marketplace and get an invalid file type message.",
          "Converting to JPG before you share it removes those surprises. If you will also reduce the size, do it in the same pass: convert first, then use the compressor with a target such as 100 KB. Keep the WebP if you only want to reuse the picture inside another web page, where it is the more efficient choice.",
          "For product photos and wallpapers, 88 to 92 percent is a safe range. For simple web graphics, 80 percent is plenty. Look at the size shown next to each file and adjust until the balance feels right for what you are doing.",
        ],
      },
    ],
    faqs: [
      {
        q: "Why does my downloaded picture save as WebP?",
        a: "The website serves WebP to browsers that support it because the files are smaller. Your browser then saves it in that format.",
      },
      {
        q: "Does WebP to JPG lose quality?",
        a: "A little, since both are lossy formats. A high quality setting keeps the difference minor.",
      },
      {
        q: "What happens to transparency?",
        a: "Transparent parts are filled with white in the JPG. Convert to PNG if you want to keep transparency.",
      },
      {
        q: "Are animated WebP files supported?",
        a: "Only as a still image. You will get one frame, not an animation.",
      },
      {
        q: "Is it safe to convert private images here?",
        a: "Yes. Files are processed in your browser and never uploaded.",
      },
      {
        q: "Is there a file limit?",
        a: "You can add up to 20 files per batch, and each can be up to 25 MB.",
      },
    ],
  },
};
