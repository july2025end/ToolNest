import type { PageContent } from "./types";

export const hubContent: Record<string, PageContent> = {
  "pdf-tools": {
    title: "Free PDF Tools: Merge, Split, Compress",
    description:
      "Free PDF tools that run in your browser: merge, split, compress, rotate, number, watermark and convert. No upload, no sign-up, no watermark.",
    h1: "Free Online PDF Tools",
    intro:
      "Merge, split, reorder, compress and convert PDFs without installing anything. Every tool runs in your browser, so your documents stay on your device.",
    steps: [
      "Pick the tool that matches your task from the list.",
      "Add your file, up to 100 MB per PDF, and set the options.",
      "Download the result. Nothing is uploaded and nothing is added to your file.",
    ],
    guide: [
      {
        heading: "Which PDF tool should you use?",
        paragraphs: [
          "Start with what you want the final file to look like. To join documents, use merge. To cut one document into parts, use split. To keep a few pages, use extract, and to throw a few away, use delete. If the pages are in the wrong order or sideways, organize and rotate fix that.",
          "Turning pictures into a document is a job for JPG to PDF, and the opposite direction is PDF to JPG. When the file is too large for an email or a form, use compress. For finishing touches on a document you plan to share, add page numbers or a text watermark.",
        ],
      },
      {
        heading: "A typical order of work",
        paragraphs: [
          "Most real tasks use two or three tools in sequence. A good order is to clean first (delete, rotate), then arrange (organize, merge), then finish (page numbers, watermark) and compress last. Compressing at the end means you do not recompress the file after every edit.",
          "For a job application, for instance, you might photograph your certificates, build a PDF from the photos, rotate any sideways pages, merge it with your resume, number the pages and compress it to fit the portal limit.",
        ],
      },
      {
        heading: "Why these tools run in your browser",
        paragraphs: [
          "PDF files often hold sensitive things: contracts, bank statements, ID scans. Uploading them to an unknown server is a risk many people would rather avoid. Here the work is done by code running on your computer or phone, so the file does not travel anywhere. You can compare that with online services that must receive your document to process it.",
          "The trade-off is that your device does the work. Big files may take longer on an older phone, and the limit is 100 MB per PDF.",
        ],
      },
      {
        heading: "What these tools cannot do",
        paragraphs: [
          "Password-protected or encrypted PDFs are not supported, so remove the protection before you start. There is no PDF to Word conversion, and no OCR to turn scanned pages into editable text. Compress has two modes: normal keeps text selectable with modest savings, and strong turns pages into images for a much smaller file.",
          "If a tool is not listed, it does not exist here yet. Everything that is listed is free, with no daily limits and no watermark added to your files.",
        ],
      },
    ],
    faqs: [
      {
        q: "Are these PDF tools really free?",
        a: "Yes. There is no sign-up, no daily limit and no watermark on the output.",
      },
      {
        q: "Are my PDFs uploaded to a server?",
        a: "No. All processing happens in your browser on your own device.",
      },
      {
        q: "What is the maximum PDF size?",
        a: "Each PDF can be up to 100 MB.",
      },
      {
        q: "Can I edit the text inside a PDF?",
        a: "No. These tools work on whole pages: merge, split, reorder, rotate, compress, number and watermark. They do not edit text.",
      },
      {
        q: "Does it work on my phone?",
        a: "Yes, in any modern mobile browser. Very large files may be slow on older phones.",
      },
      {
        q: "Can I convert PDF to Word?",
        a: "Not at this time. You can convert PDF pages to JPG images.",
      },
    ],
  },

  calculators: {
    title: "Free Online Calculators: Loan, SIP, Tax",
    description:
      "Free online calculators for loan EMI, compound interest, SIP and savings goals, percentages and discounts with tax. Private and instant.",
    h1: "Free Online Calculators",
    intro:
      "Plan a loan, estimate savings growth, work out percentages and add up discounts with tax. Every calculator runs in your browser and updates as you type.",
    steps: [
      "Choose a calculator from the list.",
      "Select your currency and fill in the numbers.",
      "Read the results, then change an input to compare scenarios.",
    ],
    guide: [
      {
        heading: "Calculators for borrowing",
        paragraphs: [
          "The EMI calculator takes a loan amount, an interest rate and a term, and returns your monthly payment, the total interest and a full amortization table in monthly and yearly views. Use it before you sign for a home, car or personal loan, and compare the total interest across terms rather than looking only at the monthly figure.",
          "Seeing the schedule also shows how much of each early payment goes to interest, which helps you decide whether an extra payment is worth making.",
        ],
      },
      {
        heading: "Calculators for saving and investing",
        paragraphs: [
          "Compound interest shows how a balance grows when interest earns interest, with monthly contributions, five compounding frequencies and a chart. The SIP and savings goal calculator answers two questions: what a monthly investment grows into, and how much per month you need to reach a target by a date.",
          "Both depend on the return you assume. Try a cautious rate and a hopeful one, and plan around the lower result. A realistic range is more useful than a single number.",
        ],
      },
      {
        heading: "Everyday money math",
        paragraphs: [
          "The percentage calculator handles three questions: X percent of Y, the percent change from one value to another, and what percent one number is of another. It is useful for tips, grades, price changes and salary raises.",
          "The discount calculator adds sales tax or GST. It shows the sale price, the amount you save and the final total, and it can treat the price as tax-inclusive or tax-exclusive. That helps when you compare shops, check an invoice or split GST out of a total.",
        ],
      },
      {
        heading: "Estimates, not advice",
        paragraphs: [
          "These tools give estimates based on the numbers you enter. They leave out fees, taxes, changing rates and the rules of a particular lender or bank. Use them to understand your options and to prepare questions, and rely on official documents for final figures.",
          "Nothing you type is sent anywhere. The calculations run in your browser, and you can pick a currency such as dollars, rupees, pounds or euros to match your situation.",
        ],
      },
    ],
    faqs: [
      {
        q: "Are these calculators free?",
        a: "Yes. They are free to use, with no sign-up and no limits.",
      },
      {
        q: "Is my financial data stored?",
        a: "No. Calculations run in your browser and the numbers are not sent to a server.",
      },
      {
        q: "Can I change the currency?",
        a: "Yes. Use the currency selector to switch between options such as $, PKR, INR, GBP and EUR.",
      },
      {
        q: "Are the results accurate?",
        a: "They follow standard formulas and are accurate for the inputs you provide. Real loans and investments may have fees or changing rates, so treat the results as estimates.",
      },
      {
        q: "Is this financial advice?",
        a: "No. These calculators are for information and planning only.",
      },
      {
        q: "Which calculator should I use for a loan?",
        a: "Use the EMI calculator for the monthly payment and total interest.",
      },
    ],
  },
};
