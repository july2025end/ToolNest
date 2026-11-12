import type { PageContent } from "./types";

export const pdfContent: Record<string, PageContent> = {
  "merge-pdf": {
    title: "Merge PDF Files Online, Free and Private",
    description:
      "Merge PDF files into one document online. Drag to reorder, free, runs in your browser, with no upload and no watermark on the result.",
    h1: "Merge PDF Files Into One",
    intro:
      "Add your PDFs, drag them into the order you want and download a single merged document. The files are joined on your own device and never uploaded.",
    steps: [
      "Add two or more PDF files, up to 100 MB each.",
      "Drag the files up or down to set the order.",
      "Select Merge and wait for the combined file to build.",
      "Download the merged PDF.",
    ],
    guide: [
      {
        heading: "When merging PDFs saves you time",
        paragraphs: [
          "Job applications, visa files and loan paperwork often ask for one PDF, while your documents sit in five separate scans. Merging puts them in a single file so nothing gets lost in an email thread. Accountants use it to bundle monthly invoices, and students use it to combine chapter notes before printing.",
          "The page order in the merged file follows the order of the list. Check it before you press merge, since fixing the order afterward means another pass.",
          "A typical example is a rental application. You have a photo ID scan, three payslips, a bank statement and a reference letter, each a separate file. Merged in that order, the landlord opens one document and finds everything where they expect it, which makes approval quicker.",
          "It also helps when you print. One merged file means one print job, with no chance of a page from a different file being left in the tray.",
        ],
      },
      {
        heading: "Getting the order right",
        paragraphs: [
          "Drag each file by its handle to move it. A good habit is to name files with a leading number, such as 01-cover.pdf and 02-resume.pdf, so they start in the right sequence when you select them together. Some systems add files in the order you clicked them, others alphabetically, so double check the list.",
          "If you only need part of a document, trim it first with the extract pages tool, then merge. That avoids carrying along blank pages or cover sheets you do not need.",
          "After merging, scroll through the result once. Look at the point where one file ends and the next begins, because that is where a duplicated or missing page would show up.",
        ],
      },
      {
        heading: "What stays and what changes",
        paragraphs: [
          "Pages are copied across as they are, so text stays selectable, links keep working and images are not recompressed. Page sizes can differ between files. A mix of A4 and Letter pages is allowed, and each page keeps its own size.",
          "Bookmarks and form fields from the source files may not all carry over, so if a fillable form matters, fill it in before merging. Password-protected or encrypted PDFs cannot be opened by this tool. Remove the protection in the program that created them first.",
          "Fonts are embedded in each source file, so the merged document looks the same as the originals on any device. File properties such as title and author come from the new document rather than the sources.",
        ],
      },
      {
        heading: "File size after merging",
        paragraphs: [
          "The merged file is roughly the sum of its parts. If it is too large to email, run it through the compress PDF tool afterward. Normal mode makes small savings and keeps text selectable. Strong mode makes bigger savings but turns pages into images.",
          "Because the work happens in your browser, a very large merge uses your device's memory. On an older phone, split big jobs into two smaller merges.",
        ],
      },
    ],
    faqs: [
      {
        q: "How many PDFs can I merge?",
        a: "There is no fixed count. Each PDF can be up to 100 MB, and the practical limit is the memory on your device.",
      },
      {
        q: "Are my documents uploaded when I merge them?",
        a: "No. The merge runs in your browser, and the files never leave your computer or phone.",
      },
      {
        q: "Can I change the page order after merging?",
        a: "Yes. Open the merged file in the organize PDF tool to move or remove individual pages.",
      },
      {
        q: "Will the merged PDF have a watermark?",
        a: "No. Nothing is added to your document.",
      },
      {
        q: "Why can't I add my PDF?",
        a: "It is probably password protected or encrypted, which this tool does not support. It may also be over the 100 MB limit.",
      },
      {
        q: "Does merging reduce quality?",
        a: "No. Pages are copied as they are, without recompressing text or images.",
      },
    ],
  },

  "split-pdf": {
    title: "Split PDF by Page Range, Free Online",
    description:
      "Split a PDF by page ranges like 1-3,5 or into single pages. Free, private, runs in your browser and gives you the parts as a ZIP.",
    h1: "Split a PDF Into Smaller Files",
    intro:
      "Cut one large PDF into several, using page ranges or one file per page. The pieces are packed into a ZIP, and nothing is uploaded.",
    steps: [
      "Add the PDF you want to split.",
      "Enter page ranges such as 1-3,5, or choose to split every page.",
      "Select Split and wait for the parts to be created.",
      "Download the ZIP containing your new PDFs.",
    ],
    guide: [
      {
        heading: "How the range syntax works",
        paragraphs: [
          "Ranges are separated by commas, and each range becomes its own output file. Typing 1-3,5 creates two PDFs: one with pages 1 to 3 and one with page 5 alone. Typing 1-3,4-6,7-10 splits a ten page document into three files.",
          "A single number means that one page. A dash joins a start and an end page, both included. Page numbers refer to the position in the file, not the number printed in the corner, so a document with a cover and roman numeral front matter may need a small adjustment.",
          "Spaces around commas are fine, so 1-3, 5 works the same as 1-3,5. If a range goes past the last page of the document, the tool will point it out rather than guess what you meant.",
          "Ranges cannot be written backwards. If you want pages in reverse order, split them first and then use the organize PDF tool to rearrange the result.",
        ],
      },
      {
        heading: "Splitting every page",
        paragraphs: [
          "Choose the every-page option when you want a separate PDF for each page. This suits scanned stacks of receipts, single-sheet certificates or a batch of forms you need to hand out individually. A 30 page file gives you 30 PDFs, all inside one ZIP.",
          "File names in the ZIP are numbered in order, so they sort correctly in your folder.",
        ],
      },
      {
        heading: "Splitting versus extracting",
        paragraphs: [
          "Splitting produces multiple files at once. If you want one new PDF made from scattered pages, such as 2, 7 and 9 together, the extract pages tool is a better fit. If you only want to throw pages away, use delete pages.",
          "A common pattern is splitting a long contract into sections so that each department receives only the part it needs. Another is dividing a textbook scan by chapter so it is easier to open on a phone.",
          "Think about who will receive the file. If three different people each need a different section, split. If one person needs a custom selection, extract. Picking the matching tool means less cleanup afterward.",
        ],
      },
      {
        heading: "Limits to keep in mind",
        paragraphs: [
          "The PDF can be up to 100 MB. Encrypted or password-protected files are not supported, so remove the password elsewhere first. Output pages are copied directly, so quality, fonts and links are unchanged.",
          "If the resulting parts are still too large to send, compress them one by one. Pages with high resolution photos are usually the biggest contributors.",
          "Large scanned books deserve a little planning. Decide on the chapter boundaries first, write them down as ranges, and enter them all at once. That is faster than running the tool several times, and it keeps the output files consistently named.",
        ],
      },
    ],
    faqs: [
      {
        q: "How do I split a PDF into individual pages?",
        a: "Pick the every-page option and split. You will get one PDF per page in a ZIP file.",
      },
      {
        q: "What does 1-3,5 mean?",
        a: "It creates two files: one with pages 1 to 3 and another with page 5.",
      },
      {
        q: "Why is the output a ZIP?",
        a: "Splitting usually makes several files, and a ZIP lets you download them in one click.",
      },
      {
        q: "Is my PDF uploaded?",
        a: "No. It is split in your browser and stays on your device.",
      },
      {
        q: "Can I split a password protected PDF?",
        a: "No. Encrypted PDFs are not supported, so remove the password first.",
      },
      {
        q: "Does splitting change the quality of pages?",
        a: "No. Pages are copied across unchanged.",
      },
    ],
  },

  "extract-pdf-pages": {
    title: "Extract Pages From a PDF, Free Online",
    description:
      "Extract pages from a PDF into a new file. Choose pages or ranges, free, in your browser, with no upload and no watermark.",
    h1: "Extract Pages From a PDF",
    intro:
      "Pick the pages you need, from a single page to a scattered list, and save them as a new PDF. The original file is left untouched.",
    steps: [
      "Add the PDF to the page.",
      "Select the pages you want, or type a list such as 2,5-7.",
      "Select Extract to build the new PDF.",
      "Download the file containing only those pages.",
    ],
    guide: [
      {
        heading: "What extracting is good for",
        paragraphs: [
          "Extracting is the right move when only a slice of a document matters. You might need the signature page of a long agreement, the summary of a 60 page report, or the two pages of a bank statement a landlord asked for. Sending the whole document exposes information nobody requested.",
          "That privacy angle is worth taking seriously. Pulling out only the relevant pages is a clean way to share what is needed and keep the rest private.",
          "Students do this with lecture packs, pulling out the single reading they need to print. Freelancers do it with a long brief, sending a client only the quote page. Whenever a document has more in it than the reader should see, extracting is the polite and safe way to share it.",
        ],
      },
      {
        heading: "Choosing pages",
        paragraphs: [
          "You can select pages individually or type them. The list 2,5-7 gives a new PDF with pages 2, 5, 6 and 7, in that order. Page numbers count from the first page of the file, whatever number is printed on it.",
          "The extracted pages appear in the new file in the order you listed them, so you can use this to build a short custom document. If you need a different order afterward, open the result in the organize tool.",
          "Typing is quicker than clicking for long lists. If the pages you want are 3, 4, 5, 6 and 12, writing 3-6,12 gets there in a few keystrokes. Use the thumbnails to confirm you picked the right pages before extracting.",
        ],
      },
      {
        heading: "Extract, split or delete?",
        paragraphs: [
          "The three tools overlap but suit different jobs. Extract builds one new file from the pages you want. Split cuts the whole document into several files. Delete pages keeps everything except the pages you remove.",
          "If you want to keep 40 pages and drop 2, delete is quicker. If you want to keep 2 and drop 40, extract is quicker. The result is the same either way, so pick whichever needs less clicking.",
        ],
      },
      {
        heading: "Quality and limits",
        paragraphs: [
          "Pages are copied rather than re-rendered, so text stays sharp and searchable, and links keep working. The source can be up to 100 MB. Password protected PDFs are not supported. The extracted file is usually far smaller than the source, which helps with email size limits.",
          "Because extraction does not touch the page contents, it is also the fastest of the PDF tools, even for large files. The thing that takes time is loading the thumbnails of a long document on a slower device.",
        ],
      },
    ],
    faqs: [
      {
        q: "How do I extract just one page from a PDF?",
        a: "Select that single page and extract. The output is a one page PDF.",
      },
      {
        q: "Can I extract pages that are not next to each other?",
        a: "Yes. Type a list such as 1,4,9 or 2,5-7 to build the new file from separate pages.",
      },
      {
        q: "Does the original PDF change?",
        a: "No. Your original file is left as it is, and you download a new one.",
      },
      {
        q: "Will the extracted PDF keep selectable text?",
        a: "Yes. Pages are copied, not turned into images.",
      },
      {
        q: "Is it safe for sensitive documents?",
        a: "The work is done in your browser, so the file is not uploaded to a server.",
      },
      {
        q: "Is there a page limit?",
        a: "There is no page count limit, but the file must be 100 MB or less.",
      },
    ],
  },

  "delete-pdf-pages": {
    title: "Delete Pages From a PDF, Free Online",
    description:
      "Delete pages from a PDF and save a clean copy. Free, in your browser, with no upload, no sign-up and no watermark on the result.",
    h1: "Delete Pages From a PDF",
    intro:
      "Strike out blank sheets, old covers or private pages and download the cleaned PDF. Your original stays safe on your device.",
    steps: [
      "Add your PDF and let the page thumbnails load.",
      "Select the pages to remove, or type them as a list or range.",
      "Select Delete pages to build the new file.",
      "Download the PDF without those pages.",
    ],
    guide: [
      {
        heading: "Common reasons to delete pages",
        paragraphs: [
          "Scanners love to produce blank back sides. Documents downloaded from portals come with advertising pages or a terms sheet on the end. Contracts may include a page of personal notes you would rather not forward. Deleting these takes seconds and makes the file shorter and tidier.",
          "It also reduces size. A scan with ten stray blank pages at 300 dpi can carry several megabytes of nothing.",
          "Another frequent case is a form pack where you only need to submit some of the sections. Removing the rest lets you send exactly what was asked for, with no confusing extras.",
        ],
      },
      {
        heading: "Pick pages visually",
        paragraphs: [
          "Thumbnails let you see what you are removing, which helps when page numbers in the footer differ from the file position. Tap or click a page to mark it. You can also type a range such as 3-5, or a list such as 1,8,12.",
          "Before you download, count the pages left. A quick mistake, like marking page 10 instead of 1, is easier to catch on the thumbnails than after you have sent the file.",
          "If you are cleaning a scan, look for pages that appear pure white in the thumbnail. Be careful with nearly blank pages that carry a small note or a page number, since those can matter.",
          "On a phone, tapping small thumbnails can be fiddly. Typing the page numbers into the field is more precise there, and you can still glance at the thumbnails to check your list.",
        ],
      },
      {
        heading: "Deleting is not the same as redacting",
        paragraphs: [
          "Removing a page takes it out of the new file entirely. That is different from covering text on a page with a black box, which often leaves the words underneath. If sensitive content sits on a page you keep, remove the whole page, or use proper redaction in a dedicated editor before sharing.",
          "Also remember that metadata such as the title and author stays in the document properties unless you strip it separately.",
        ],
      },
      {
        heading: "Related tools",
        paragraphs: [
          "To reorder pages after cleaning, use organize PDF. To keep just a few pages, extract pages is the faster path. To make the file smaller still, finish with compress PDF. Files can be up to 100 MB, and password-protected PDFs are not supported.",
          "A typical cleanup order is delete, then organize, then compress. Doing the deletion first keeps the later steps quick, because each one works with a smaller file.",
          "If you are not sure which pages are junk, scroll the thumbnails first and note the numbers, then enter the list in one go. It saves you from deleting a page, realizing your mistake and starting again.",
        ],
      },
    ],
    faqs: [
      {
        q: "How do I delete one page from a PDF?",
        a: "Add the file, mark that page and choose delete. Then download the new version.",
      },
      {
        q: "Can I delete several pages at once?",
        a: "Yes. Mark several thumbnails or type a list such as 2,4,6-8.",
      },
      {
        q: "Can I undo a deletion?",
        a: "Your original file is not changed, so you can simply start again from it.",
      },
      {
        q: "Does deleting pages shrink the file?",
        a: "Usually yes, especially if the removed pages were scans or images.",
      },
      {
        q: "Is my file sent to a server?",
        a: "No. Pages are removed in your browser and nothing is uploaded.",
      },
      {
        q: "Why does the tool not open my PDF?",
        a: "It may be encrypted or over 100 MB. Password protected files are not supported.",
      },
    ],
  },

  "organize-pdf": {
    title: "Organize PDF Pages: Reorder and Remove",
    description:
      "Organize PDF pages with thumbnails. Reorder, rotate or remove pages in your browser, free, with no upload and no watermark.",
    h1: "Organize PDF Pages: Reorder Visually",
    intro:
      "See every page as a thumbnail, drag pages into a new order and save the result. It all happens on your device.",
    steps: [
      "Add your PDF and wait for the thumbnails to appear.",
      "Drag pages into the order you want.",
      "Remove or rotate any pages that need it.",
      "Download the reorganized PDF.",
    ],
    guide: [
      {
        heading: "Why a visual organizer helps",
        paragraphs: [
          "Scans rarely come out in the right order. A feeder jams, someone scans the back of a sheet first, or you add a late page at the end. Dragging thumbnails is far easier than guessing page numbers, because you can see which page is which.",
          "The same applies to presentations exported to PDF and to documents assembled from several sources, where an appendix needs to move up front.",
          "Think of it as laying paper pages on a table. You can see the cover, the contents and the appendix at once, and you move them with your hand rather than a number.",
        ],
      },
      {
        heading: "Working with a big document",
        paragraphs: [
          "For a long file, work in passes. First delete anything obviously unneeded so the grid gets smaller. Then move the largest blocks into place, such as the cover and contents, followed by the finer adjustments.",
          "Thumbnails are generated in your browser, so a 200 page file may take a moment to load on a modest phone. Rotating a sideways scan from the thumbnail view fixes it for the whole output, which is handy when a stack was scanned in mixed orientations.",
          "Give yourself a clear goal before you begin, such as contents after the cover, appendices last. Write the order on paper if it is complicated. It is easy to lose track when a hundred thumbnails look alike.",
          "Save intermediate versions if the changes are big. A copy named v1 before you start the second round of reordering gives you something to go back to.",
        ],
      },
      {
        heading: "Organizing across several files",
        paragraphs: [
          "To mix pages from two or more PDFs, merge them first in the order that is closest to what you want, then open the merged file here for the detailed rearranging. This two-step approach is more predictable than trying to interleave files in one pass.",
          "When you are done, check the first and last pages and any page you moved. Mistakes tend to show up near the boundaries.",
          "The same approach works for a photo album built from a PDF. Combine the files, then arrange the pages so the story reads left to right, top to bottom, which is how most people scan a grid.",
        ],
      },
      {
        heading: "What is preserved",
        paragraphs: [
          "Pages are copied and rearranged, not re-rendered, so text remains searchable and sharp. Internal links that point to a page you moved may not follow it, so test any table of contents links after reordering. Encrypted PDFs and files over 100 MB are not supported.",
          "Page sizes and orientations are also kept, so a mixed bundle of portrait and landscape sheets stays that way. Annotations and form fields attached to a page travel with it.",
          "After saving, open the new file in your usual PDF reader and page through it once. Check headers and footers, because a running page number printed on each page will not renumber itself when you move the page. If that matters, use the add page numbers tool on the final order.",
        ],
      },
    ],
    faqs: [
      {
        q: "How do I rearrange pages in a PDF?",
        a: "Open it here, drag the thumbnails into the order you want and download the result.",
      },
      {
        q: "Can I also remove pages here?",
        a: "Yes. You can drop unwanted pages while organizing, in the same pass.",
      },
      {
        q: "Can I rotate a single page?",
        a: "Yes. Rotate individual pages from the thumbnail view, or use the rotate tool for the whole file.",
      },
      {
        q: "Does reordering change the content?",
        a: "No. The pages are the same, only their order differs.",
      },
      {
        q: "Are my pages uploaded to generate thumbnails?",
        a: "No. Thumbnails are drawn in your browser from the file on your device.",
      },
      {
        q: "Can I combine different PDFs here?",
        a: "Use merge PDF first, then open the merged file here to fine tune the order.",
      },
    ],
  },

  "rotate-pdf": {
    title: "Rotate PDF Pages Online, Free and Private",
    description:
      "Rotate PDF pages by 90, 180 or 270 degrees. Rotate all or selected pages, free, in your browser, with no upload and no watermark.",
    h1: "Rotate PDF Pages and Save Permanently",
    intro:
      "Fix sideways or upside-down scans by rotating every page or just the ones you pick. The corrected PDF is saved so it opens the right way up everywhere.",
    steps: [
      "Add your PDF file.",
      "Choose all pages or select specific ones.",
      "Pick 90, 180 or 270 degrees.",
      "Apply the rotation and download the new PDF.",
    ],
    guide: [
      {
        heading: "Why scans end up sideways",
        paragraphs: [
          "A landscape table scanned on a feeder, a phone photo taken with the screen lock on, or a document placed upside down on the glass all produce pages that open rotated. Most PDF viewers let you turn the view, but that is temporary. The next person who opens the file sees it sideways again.",
          "Rotating here changes the page setting inside the file, so the correction is permanent.",
          "Another cause is a document whose pages were created in landscape orientation but saved with the wrong flag. Rotating the affected pages sets them straight, and you can rotate others the opposite way if a stack has mixed directions.",
        ],
      },
      {
        heading: "Choosing the angle",
        paragraphs: [
          "Ninety degrees turns the page clockwise by a quarter turn. A 270 degree rotation is the same as a quarter turn counter-clockwise. Use 180 degrees for a page that is upside down. If you are not sure, apply one angle and check the preview, then adjust.",
          "For a mixed document, say a few landscape tables inside a portrait report, select just those pages and rotate them alone. Everything else stays as it was.",
          "Use the thumbnails or the first page preview to judge the direction. A page that has its top edge on the left needs a 90 degree turn clockwise. A page with the top edge on the right needs 270.",
        ],
      },
      {
        heading: "Rotation versus changing the content",
        paragraphs: [
          "The tool sets a rotation flag on each page rather than redrawing it, so there is no quality loss. Text remains selectable and the file size barely changes. Some very old viewers ignore the flag, but virtually all current software, including browsers and phone readers, respects it.",
          "If you also need to reorder or delete pages, do that in the organize PDF tool afterward.",
          "Viewers that show a page differently from others are usually reading an older rotation flag from the source file, which this tool replaces.",
        ],
      },
      {
        heading: "Practical notes",
        paragraphs: [
          "The PDF may be up to 100 MB, and your file is not uploaded at any point. Encrypted PDFs are not supported. After saving, open the new file once and flip through to confirm every page faces the right direction before you send it.",
          "If you need to rotate and then reorder or trim the same file, do the rotation first. Then open the result in the organize PDF tool, where the thumbnails will already show every page the right way up.",
          "Rotation is also handy before you print. A landscape page that comes out sideways wastes paper and ink. Fix it once here, and every future print of this file comes out right.",
        ],
      },
    ],
    faqs: [
      {
        q: "How do I rotate a PDF permanently?",
        a: "Apply the rotation here and download the new file. The setting is stored in the PDF itself.",
      },
      {
        q: "Can I rotate only one page?",
        a: "Yes. Select the page and apply a rotation to it alone.",
      },
      {
        q: "Does rotating reduce quality?",
        a: "No. The page is not re-rendered, so text and images are unchanged.",
      },
      {
        q: "Which angle fixes an upside-down page?",
        a: "Use 180 degrees.",
      },
      {
        q: "Is my document uploaded?",
        a: "No. Rotation happens in your browser.",
      },
      {
        q: "What if my PDF is password protected?",
        a: "Encrypted PDFs are not supported. Remove the password first, then rotate.",
      },
    ],
  },

  "jpg-to-pdf": {
    title: "JPG to PDF Converter, Free and Private",
    description:
      "Convert JPG and PNG images to one PDF. Choose A4, Letter or fit-to-image page size and margins. Free, in-browser, no upload or watermark.",
    h1: "Convert JPG to PDF: Photos and Scans",
    intro:
      "Combine JPG or PNG images into a single PDF with the page size and margin you choose. Conversion happens in your browser, so your pictures stay on your device.",
    steps: [
      "Add your JPG or PNG images and drag them into order.",
      "Choose a page size: A4, Letter or fit to image.",
      "Pick a margin: none, small or large.",
      "Select Create PDF and download the file.",
    ],
    guide: [
      {
        heading: "Choosing a page size",
        paragraphs: [
          "A4 is the standard in most of the world, and Letter is the norm in the United States and Canada. If the PDF will be printed or submitted to an office, pick the size that office uses. Images are scaled to fit the page and centered without being stretched.",
          "Fit to image makes each page exactly the size of its picture. This suits receipts, screenshots and signed forms you only plan to view on screen, because nothing gets cropped or padded with white space.",
          "If your images have very different proportions, such as a square screenshot followed by a tall receipt, fit to image avoids awkward white bands. For a printed set, A4 or Letter with a small margin gives the most predictable result.",
          "Remember that images are placed without distortion. A wide photo on a portrait page will have empty bands above and below, which is normal. If you would rather fill the page, crop the image to the page proportions first. A4 is about 1 to 1.41, so a 3 by 4 crop is close.",
        ],
      },
      {
        heading: "Margins and orientation",
        paragraphs: [
          "No margin lets a photo fill the page edge to edge, which looks good for pictures. A small margin leaves a thin white border that printers handle better, since many cannot print right to the edge. A large margin suits document scans where you want room for hole punching or binding.",
          "Orientation is chosen automatically. A wide picture gets a landscape page and a tall one gets a portrait page, so you do not need to rotate anything yourself.",
        ],
      },
      {
        heading: "Keeping the PDF small enough to send",
        paragraphs: [
          "Phone photos are big. Ten pictures at 4 MB each make a 40 MB PDF that many email services refuse. Compress the images first with the image compressor, aiming for around 300 to 500 KB each for readable document scans, then build the PDF. You can also run the finished PDF through compress PDF.",
          "For text documents, photograph in good light straight from above. Skewed, shadowed pages are hard to read and compress poorly.",
        ],
      },
      {
        heading: "What to know before you start",
        paragraphs: [
          "The tool accepts JPG and PNG files. If your photos are HEIC from an iPhone or WebP from the web, convert them to JPG first. Transparent areas in a PNG show as white on the page. The order of the list is the order of the pages, so check it before creating the file.",
          "For a document scan, order matters more than anything. Number your photos in the gallery or rename them before adding them, and then check the list once more here. Rebuilding a 15 page PDF because page 4 and 5 swapped is annoying.",
        ],
      },
    ],
    faqs: [
      {
        q: "How do I make several photos into one PDF?",
        a: "Add all of them, drag them into the order you want and create the PDF. Each image becomes one page.",
      },
      {
        q: "Which page size should I choose?",
        a: "Use A4 or Letter for printing and official submissions. Use fit to image for screen viewing.",
      },
      {
        q: "Can I convert PNG files too?",
        a: "Yes, JPG and PNG are both accepted.",
      },
      {
        q: "Will my images be uploaded?",
        a: "No. The PDF is built in your browser.",
      },
      {
        q: "Why is the PDF so large?",
        a: "Original photos are embedded at full size. Compress the images first or compress the finished PDF.",
      },
      {
        q: "Does it add a watermark?",
        a: "No. Your PDF contains only your images.",
      },
    ],
  },

  "pdf-to-jpg": {
    title: "PDF to JPG Converter, Free and Private",
    description:
      "Convert PDF pages to JPG images. Set the quality, download all pages as a ZIP. Free, runs in your browser, with no upload or sign-up.",
    h1: "Convert Each PDF Page to a JPG Image",
    intro:
      "Turn a PDF into one JPG per page, with a quality setting you control. Pages are rendered on your device and delivered as a ZIP.",
    steps: [
      "Add your PDF file.",
      "Set the image quality with the slider.",
      "Select Convert and wait while each page is rendered.",
      "Download the ZIP with your JPG images.",
    ],
    guide: [
      {
        heading: "Why convert a PDF to images",
        paragraphs: [
          "Sometimes a PDF is the wrong container. You may want to drop a single page into a slide deck, post a certificate on social media, or send a one-page flyer through a chat app that does not preview PDFs. A JPG works in all of those places.",
          "Each page becomes its own image, named in order, so a 12 page PDF gives you 12 JPGs in the ZIP.",
        ],
      },
      {
        heading: "Quality and file size",
        paragraphs: [
          "Higher quality gives sharper text and larger files. For on-screen sharing, a medium to high setting is plenty. For pages with small print or fine line drawings, raise the quality so letters do not look fuzzy at the edges.",
          "JPG is designed for photographs. Pages that are mostly text will not look as crisp as they do in the PDF, because the PDF stores letters as shapes and the JPG stores them as pixels. If crispness is the priority, view the PDF itself where you can.",
          "As a rough guide, 70 to 80 percent suits colorful pages like brochures. For black and white forms, 85 percent or higher keeps the thin lines clean. Test with one page of the PDF first if you are unsure, using the extract tool to save time.",
          "Since the JPG quality setting also affects the size of the ZIP, a high setting on a long document can produce a large download. If you are converting 50 pages for email, a medium setting is usually the better trade.",
        ],
      },
      {
        heading: "Extracting images versus rendering pages",
        paragraphs: [
          "This tool renders the whole page as it appears, text, graphics and photos together. It does not pull out the original embedded pictures one by one. For a brochure that is exactly what you want. For a single embedded photo you would need the page, then a crop.",
          "If you only need some of the pages, extract them into a smaller PDF first so the conversion is faster and the ZIP is tidier.",
          "Page size on screen is fixed by the render, so zooming into the JPG later will not reveal more detail than was drawn. Keep that in mind if you need to read tiny print.",
        ],
      },
      {
        heading: "Limits and privacy",
        paragraphs: [
          "The PDF can be up to 100 MB. Rendering uses your device, so long documents take longer on older phones. Encrypted PDFs are not supported. Since nothing is uploaded, it is safe to convert pages containing personal details, though you should still be careful about where you share the images afterward.",
          "The ZIP names each image by page number, so they stay in order when you unzip them and sort by name.",
        ],
      },
    ],
    faqs: [
      {
        q: "How do I convert a PDF to JPG?",
        a: "Add the PDF, choose a quality and convert. You receive one JPG per page in a ZIP file.",
      },
      {
        q: "Can I convert only some pages?",
        a: "Extract the pages you need into a new PDF first, then convert that file.",
      },
      {
        q: "What quality should I choose?",
        a: "A high setting for pages with small text, a medium one for general sharing.",
      },
      {
        q: "Is the text still selectable in the JPG?",
        a: "No. A JPG is a picture, so the text cannot be selected or searched.",
      },
      {
        q: "Are my pages uploaded?",
        a: "No. Rendering takes place in your browser.",
      },
      {
        q: "Is there a size limit?",
        a: "The PDF can be up to 100 MB.",
      },
    ],
  },

  "compress-pdf": {
    title: "Compress PDF Online, Free and Private",
    description:
      "Compress PDF files in your browser with two modes: normal keeps text, strong shrinks scans. Free, with no upload and no watermark.",
    h1: "Compress PDF Files for Email and Upload",
    intro:
      "Choose normal mode to optimize the file structure, or strong mode to shrink scans dramatically. The PDF is processed on your device and never uploaded.",
    steps: [
      "Add your PDF, up to 100 MB.",
      "Pick normal or strong compression.",
      "Select Compress and compare the new size with the original.",
      "Download the smaller PDF.",
    ],
    guide: [
      {
        heading: "Normal mode versus strong mode",
        paragraphs: [
          "Normal mode re-saves the PDF with an optimized structure. Text stays selectable and searchable, and nothing visible changes. The gains are modest, often 5 to 30 percent, and they depend on how wastefully the file was written in the first place.",
          "Strong mode re-renders each page as a compressed JPEG image and builds a new PDF from them. This can bring a 40 MB scan down to a few megabytes. The trade-off is real: text is no longer selectable or searchable, and small print may look softer. Use it for scanned documents that are already just pictures of pages.",
        ],
      },
      {
        heading: "Choosing the right mode",
        paragraphs: [
          "If the PDF came from a word processor, exported slides or a web page, try normal mode first. It is already mostly text and vector shapes, so there is little to squeeze, and strong mode would make it worse by turning crisp letters into pixels.",
          "If the PDF came from a scanner or a phone camera app, strong mode is the one that matters. These files are just photographs of paper, so image compression is where the savings are.",
          "A simple test: try to select a word in the PDF. If you can, the text is real, and normal mode is the one that preserves it. If you cannot, the pages are pictures and strong mode will give a much larger saving.",
          "Mixed documents, such as a report with scanned signature pages at the back, are a case for splitting. Compress the text part in normal mode, the scanned part in strong mode, then merge the two results back into one file.",
        ],
      },
      {
        heading: "Hitting an email or portal limit",
        paragraphs: [
          "Many email providers cap attachments around 20 to 25 MB, and application portals commonly accept 2 to 5 MB. If strong mode is still too large, split the document or delete pages that do not matter, such as blank backs. Compressing the source photos before building a PDF from them with the JPG to PDF tool also helps.",
          "Always open the result and check the pages that matter, such as signatures and figures, before sending.",
        ],
      },
      {
        heading: "Safety and limits",
        paragraphs: [
          "Your file is handled by your browser only. Password-protected or encrypted PDFs are not supported, and the maximum input size is 100 MB. Keep your original, because strong mode cannot be reversed.",
          "Compare the sizes shown before and after. If the new file is not smaller, the tool tells you, and you can keep using the original. Strong mode works best at keeping legibility on scans made at 150 dpi or more.",
        ],
      },
    ],
    faqs: [
      {
        q: "How much can a PDF be compressed?",
        a: "Normal mode often saves a modest amount. Strong mode can cut scanned PDFs by 70 to 90 percent.",
      },
      {
        q: "Will I lose text in strong mode?",
        a: "The text is still visible but is no longer selectable or searchable, because each page becomes an image.",
      },
      {
        q: "Which mode keeps quality?",
        a: "Normal mode. It changes the structure of the file without touching how pages look.",
      },
      {
        q: "Why did my PDF barely shrink?",
        a: "It may already be optimized. Try strong mode if the file is made of scanned images.",
      },
      {
        q: "Is the PDF uploaded to compress it?",
        a: "No. Compression runs in your browser.",
      },
      {
        q: "Can I compress an encrypted PDF?",
        a: "No. Password-protected files are not supported.",
      },
    ],
  },

  "add-page-numbers-to-pdf": {
    title: "Add Page Numbers to a PDF, Free Online",
    description:
      "Add page numbers to a PDF. Pick the position, start number and format like Page 1 of N. Free, in-browser, with no upload or watermark.",
    h1: "Add Page Numbers to a PDF",
    intro:
      "Stamp page numbers onto every page of a PDF, choosing where they sit, where numbering starts and how they read.",
    steps: [
      "Add your PDF.",
      "Choose the position, such as bottom center or top right.",
      "Set the start number and pick the format, 1 or Page 1 of N.",
      "Apply the numbers and download the result.",
    ],
    guide: [
      {
        heading: "Picking a format",
        paragraphs: [
          "Plain numbers (1, 2, 3) are clean and take little space. The Page 1 of N format tells readers how long the document is, which is helpful for contracts and reports where a missing page matters. If someone prints your file and drops a sheet, they will notice at once.",
          "For short documents, plain numbers are enough. For anything legal or financial, use the long format.",
          "Legal and academic documents sometimes require a number on every page, including the first. Some style guides skip the cover and start numbering on the second page, so check the rules for your submission before you apply the numbers.",
        ],
      },
      {
        heading: "Position and start number",
        paragraphs: [
          "Bottom center is the safe default for most documents. Bottom right suits double sided printing and reports. Top positions are useful if a footer is already occupied by a company address or a confidentiality notice.",
          "The start number lets you begin somewhere other than 1. If your PDF is the second part of a larger report whose first part ended on page 24, start at 25. Page numbers are counted from the first page of the file, so a cover sheet counts as a page unless you split it off first.",
          "Mirror positions for two-sided printing are not offered, so choose a centered number if the document will be bound with a spine on either side. A centered footer looks right on both left and right pages.",
        ],
      },
      {
        heading: "Avoiding clashes with existing content",
        paragraphs: [
          "The numbers are drawn on top of each page. Scanned pages with content close to the edge or an existing footer may overlap with them. Look at the pages after applying the numbers, and try another position if anything collides.",
          "For documents with a cover page, a good routine is to split off the cover, number the rest starting at 1, then merge them back together.",
          "If your document already has page numbers in the footer, such as a report exported with its own numbering, do not add another set. The two will overlap or look like an error. Use top placement only if the top margin is clear.",
        ],
      },
      {
        heading: "File notes",
        paragraphs: [
          "Existing content, text selection and links are kept. Files can be up to 100 MB, and encrypted PDFs are not supported. The processing happens in your browser, so contracts and personal files are not uploaded.",
          "Because the numbers are added as ordinary text on the page, they look the same in every viewer. If you apply numbers twice by mistake, start again from your original file.",
        ],
      },
    ],
    faqs: [
      {
        q: "Can I start numbering from a different number?",
        a: "Yes. Set the start number to any value, for example 5 or 25.",
      },
      {
        q: "What formats are available?",
        a: "Plain numbers such as 1, or the longer Page 1 of N style.",
      },
      {
        q: "Where can the numbers go?",
        a: "You can choose a position on the page, such as bottom center, bottom right or at the top.",
      },
      {
        q: "Will it number a scanned PDF?",
        a: "Yes. The numbers are added on top of each page whether it is text or an image.",
      },
      {
        q: "Can I skip the cover page?",
        a: "Split the cover off first, number the remaining pages, then merge the cover back.",
      },
      {
        q: "Is my PDF uploaded?",
        a: "No. It is processed in your browser.",
      },
    ],
  },

  "watermark-pdf": {
    title: "Add a Text Watermark to PDF, Free Online",
    description:
      "Add a text watermark to every page of a PDF. Set text, size and opacity, with a diagonal layout. Free, in-browser, with no upload.",
    h1: "Add a Watermark to a PDF",
    intro:
      "Mark each page with words like CONFIDENTIAL or DRAFT. Choose the size and opacity, and the watermark runs diagonally across the page.",
    steps: [
      "Add your PDF.",
      "Type the watermark text.",
      "Adjust the size and opacity so the page remains readable.",
      "Apply the watermark and download the PDF.",
    ],
    guide: [
      {
        heading: "What a watermark is for",
        paragraphs: [
          "A watermark is a visible note that sits behind or across the content. Typical choices are DRAFT on an unapproved document, CONFIDENTIAL on internal files, COPY on duplicates, or the name of the person a file was sent to. It does not stop copying, but it makes the status of a document obvious at a glance.",
          "Law firms stamp PRIVILEGED on documents under review. Teachers mark SAMPLE on exam papers shared as a reference. Small businesses put PAID or QUOTE on invoice copies. In each case the word tells the reader something the body text does not.",
          "Placing the mark behind a clear, short word is more useful than a long sentence, which tends to get cut off or become unreadable at an angle.",
        ],
      },
      {
        heading: "Size and opacity",
        paragraphs: [
          "The goal is to be noticed without ruining readability. An opacity around 15 to 30 percent usually works well with black text. At 50 percent or more the watermark competes with the content and printing becomes harder to read. Increase the size for short words and reduce it for longer phrases, so the text fits within the page diagonal.",
          "The watermark runs diagonally, the traditional layout, because it covers more of the page and is harder to crop out than a mark in a corner.",
          "Different background colors change what works. On a white page, gray text at low opacity is subtle. On a page with dark photos or shaded tables, you might need a higher opacity to see the mark at all, so look at the result across a few different pages before you commit.",
        ],
      },
      {
        heading: "Limits of a watermark",
        paragraphs: [
          "Treat it as a label, not security. Someone with a PDF editor can often remove it, and a screenshot ignores it. If you need to restrict access, send the file through a controlled channel and keep an unmarked original.",
          "Also note that this tool adds text only. It does not add logo images, and it does not password protect the file.",
        ],
      },
      {
        heading: "Using it well",
        paragraphs: [
          "Personalizing the text, for example with a recipient name and date, discourages casual forwarding. Keep the wording short, in capitals, so it reads from a distance. Look at the first page and a dense page before sharing, since a page with tables or photos can hide the mark more than plain text does.",
          "Files up to 100 MB are supported, processing happens in your browser, and encrypted PDFs are not supported.",
          "Try the settings on a single page first if the file is long. Extract page one, test a few sizes and opacities, then apply the best combination to the full document.",
        ],
      },
    ],
    faqs: [
      {
        q: "Can I add a picture watermark?",
        a: "No. This tool adds text watermarks only.",
      },
      {
        q: "What opacity should I use?",
        a: "Between 15 and 30 percent usually keeps the page readable while the watermark stays visible.",
      },
      {
        q: "Will the watermark appear on every page?",
        a: "Yes. The text is applied across all pages of the PDF.",
      },
      {
        q: "Can the watermark be removed later?",
        a: "Possibly, with a PDF editor. Keep your unmarked original separate and treat the watermark as a label.",
      },
      {
        q: "Does my PDF leave my device?",
        a: "No. The watermark is added in your browser.",
      },
      {
        q: "Does the tool add its own watermark?",
        a: "No. Only the text you type is added.",
      },
    ],
  },
};
