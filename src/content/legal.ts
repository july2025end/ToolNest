import type { LegalPage } from "./types";

export const legalContent: Record<"about" | "privacy" | "terms", LegalPage> = {
  about: {
    title: "About Us",
    description:
      "ToolNest offers free online tools for images, PDFs, QR codes and calculators that run in your browser, so your files stay on your device.",
    h1: "About ToolNest",
    updated: "2026-11-09",
    sections: [
      {
        heading: "Why ToolNest exists",
        paragraphs: [
          "Most people need a small utility a few times a year: shrink a photo for a form, merge two PDFs, make a QR code for a menu. Too often the quick search leads to a site that asks for an account, adds a watermark, limits you to a few uses a day, or quietly uploads your documents to a server you know nothing about.",
          "ToolNest is our answer to that. It is a collection of simple tools that are free, that do the job without fuss, and that treat your files with respect. We want a person to arrive with a problem, solve it in a minute and leave.",
        ],
      },
      {
        heading: "How it works",
        paragraphs: [
          "The tools run inside your web browser. When you add a photo or a PDF, your own device does the work, using code that was delivered to the page. Your files are not uploaded to our servers, and we never see them. This is why many of the tools keep working even if your connection drops after the page has loaded.",
          "The trade-off is that your device does the heavy lifting. A big batch of photos or a long PDF takes longer on an old phone than on a modern laptop. We think that is a fair price for privacy, and we keep file limits in place so that the tools remain stable.",
          "One tool, the background remover, uses an open-source AI model. It is downloaded to your browser the first time you use it, kept in your browser's cache, and then run locally. Your photos are not sent anywhere for that either.",
        ],
      },
      {
        heading: "What you can do here",
        paragraphs: [
          "Today the site covers four areas. The image tools compress, resize and convert pictures, including HEIC to JPG. The PDF tools merge, split, reorder, rotate, compress and convert documents, and add page numbers or watermarks. The QR code generator makes static codes for links, Wi-Fi, contacts and more. The calculators cover loans, compound interest, savings plans, percentages and discounts with tax.",
          "We add tools slowly and test them before they go live. If something does not work as described, please tell us.",
        ],
      },
      {
        heading: "Who it is for",
        paragraphs: [
          "ToolNest is for students filling in application forms, small business owners preparing invoices and listings, people who just want to send a smaller photo to a relative, and anyone who is tired of being asked to sign up for a one-minute job. You do not need an account, and there is nothing to install.",
        ],
      },
      {
        heading: "How the site is funded",
        paragraphs: [
          "The site is free to use. Running it costs money for hosting and a little for development time. In the future we may show advertising to cover those costs. If we do, we will keep ads out of the way of the tools, and our privacy policy explains what that involves. We will not charge for the tools described here, add watermarks, or sell your files, because we never have them.",
        ],
      },
      {
        heading: "Get in touch",
        paragraphs: [
          "Found a bug, have an idea for a tool, or noticed a mistake in one of our guides? Use the contact page and send us a message. We read everything, although we cannot promise a reply to every note. Clear descriptions of what you did and which browser you used help us most.",
        ],
      },
    ],
  },

  privacy: {
    title: "Privacy Policy",
    description:
      "How ToolNest handles your data: files stay in your browser, and we collect only anonymous usage counts, feedback messages and basic server logs.",
    h1: "Privacy Policy",
    updated: "2026-11-09",
    sections: [
      {
        heading: "The short version",
        paragraphs: [
          "Your files never leave your device. Images, PDFs and the text you type into our tools are processed inside your browser and are not uploaded to our servers. We collect very little, and what we do collect is described below in plain terms.",
        ],
      },
      {
        heading: "Files and content you use with the tools",
        paragraphs: [
          "When you compress an image, merge a PDF, create a QR code or use a calculator, the work happens on your device. We do not receive your files, the numbers you enter or the data you encode. We cannot read them, store them or recover them for you, so please keep your own copies.",
          "The background remover downloads an AI model to your browser the first time you use it, and your browser keeps it in its cache. After that it runs on your device and your photos are not sent anywhere.",
        ],
      },
      {
        heading: "Anonymous usage counts",
        paragraphs: [
          "To learn which tools are useful, we record a simple count each time a tool is used. The record contains the name of the tool and the date. It contains no personal data, no file names and no file contents, and it does not use cookies. We use these totals to decide what to improve or build next.",
        ],
      },
      {
        heading: "Feedback and contact messages",
        paragraphs: [
          "If you send us a message through the feedback form, we collect what you type: your message, and your name and email address if you choose to provide them. Both of those are optional. The message is stored with our database provider, Supabase. We use it to read your feedback, fix problems and, if you gave an email address and asked for one, reply to you.",
          "Please do not include passwords, financial details or other sensitive information in a message. If you would like us to delete something you sent, contact us and we will remove it.",
        ],
      },
      {
        heading: "Hosting and server logs",
        paragraphs: [
          "The website is hosted by Vercel. Like most hosting providers, Vercel keeps server logs that can include your IP address, browser and device type (the user agent), the pages you request and the time of the request. These logs are used to deliver the site, keep it secure and diagnose faults. We do not use them to identify individual visitors.",
        ],
      },
      {
        heading: "Advertising and cookies",
        paragraphs: [
          "We may show ads in the future, and if we do, we expect to use Google AdSense. Google and its partners may use cookies and similar technologies to serve and measure ads, including ads based on your earlier visits to this and other websites. You can read how Google uses data at https://policies.google.com/technologies/ads.",
          "You can opt out of personalized advertising at https://adssettings.google.com. You can also block or delete cookies in your browser settings. If advertising goes live, we will update this policy and show any consent choices required where you live.",
        ],
      },
      {
        heading: "Local storage on your device",
        paragraphs: [
          "The site stores your light or dark theme choice in your browser's localStorage so that it remembers your preference. This stays on your device. It is not sent to us, and you can clear it at any time in your browser settings.",
        ],
      },
      {
        heading: "Children",
        paragraphs: [
          "ToolNest is a general audience site and is not directed at children under 13. We do not knowingly collect personal information from children. If you believe a child has sent us personal information through the feedback form, contact us and we will delete it.",
        ],
      },
      {
        heading: "Changes to this policy",
        paragraphs: [
          "We may update this policy when the site changes, for example when we begin showing ads. The date at the top shows when it was last revised. Continued use of the site after a change means you accept the updated policy.",
        ],
      },
      {
        heading: "Contact",
        paragraphs: [
          "Questions about privacy, or a request to see or delete a message you sent, can go through the contact page. Please tell us what you wrote and roughly when, so we can find it.",
        ],
      },
    ],
  },

  terms: {
    title: "Terms of Use",
    description:
      "The terms for using ToolNest: free tools provided as-is, calculators are estimates not advice, and you are responsible for your files and rights.",
    h1: "Terms of Use",
    updated: "2026-11-09",
    sections: [
      {
        heading: "Agreeing to these terms",
        paragraphs: [
          "By using ToolNest you agree to these terms. If you do not agree, please do not use the site. We have tried to keep them short and readable.",
        ],
      },
      {
        heading: "Free use",
        paragraphs: [
          "The tools on this site are free for personal and commercial use. You do not need an account. We do not add watermarks to your output, and we do not claim any rights over the files you process or the results you download.",
        ],
      },
      {
        heading: "Provided as is",
        paragraphs: [
          "The site and its tools are provided as is and as available, without warranties of any kind, express or implied. We do not promise that the tools will be error-free, uninterrupted or suitable for a particular purpose. Image and PDF conversions are lossy or change files in ways that you should check. Always keep a copy of your original files and review the output before you rely on it or send it to someone else.",
        ],
      },
      {
        heading: "Calculators are estimates, not advice",
        paragraphs: [
          "The loan, interest, savings, percentage and discount calculators give estimates based on standard formulas and the numbers you provide. They do not account for fees, taxes, changing rates or the specific terms of a lender or product. Nothing on this site is financial, legal or tax advice. For decisions that matter, check official figures and speak to a qualified professional.",
        ],
      },
      {
        heading: "Your files and your responsibilities",
        paragraphs: [
          "You are responsible for the files you process and for having the right to use them. Do not use the tools with material that infringes someone else's copyright, privacy or other rights. Because files are handled on your own device, we cannot see or check them, and we cannot recover them if you lose them.",
          "The output of a tool, such as a QR code, a compressed picture or a merged PDF, is your responsibility too. Test a QR code before printing it in bulk, and confirm that a compressed file meets the requirements of the form or portal you will submit it to.",
        ],
      },
      {
        heading: "Acceptable use",
        paragraphs: [
          "Do not use the site to break the law, to produce harmful or deceptive material, or to attack or overload it. Do not try to interfere with the way the site works, scrape it at a scale that harms other visitors, or use it to create QR codes that point to malware, scams or phishing pages. We may block access if we see this kind of misuse.",
        ],
      },
      {
        heading: "Third-party software and licenses",
        paragraphs: [
          "The site uses open-source software, including libraries for handling PDFs and images and an open-source background removal model released under the Apache-2.0 license. These components stay under their own licenses. Their authors are not responsible for this site, and nothing here changes the terms under which you may use them.",
        ],
      },
      {
        heading: "Limitation of liability",
        paragraphs: [
          "To the fullest extent the law allows, ToolNest and the people who run it are not liable for any loss or damage that results from using the site, including lost or damaged files, lost data, lost profit, or decisions made from calculator results. Because the service is free, our total liability for any claim is limited to the smallest amount the law allows. Some places do not allow certain limits, so these may not apply to you in full.",
        ],
      },
      {
        heading: "Changes to the site and these terms",
        paragraphs: [
          "We may change, add or remove tools at any time, and we may update these terms. The date at the top shows the latest revision. If you keep using the site after a change, you accept the new terms.",
        ],
      },
      {
        heading: "Governing law and contact",
        paragraphs: [
          "These terms are governed by the laws of [your jurisdiction], and any dispute will be handled by the courts there, unless the law where you live says otherwise. For questions about these terms, use the contact page.",
        ],
      },
    ],
  },
};
