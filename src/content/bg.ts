import type { PageContent } from "./types";

export const bgContent: Record<string, PageContent> = {
  "background-remover": {
    title: "Background Remover: Free, Runs in Browser",
    description:
      "Remove image backgrounds free with an AI model that runs in your browser. No upload, transparent PNG or solid color, before and after slider.",
    h1: "Remove the Background From a Photo",
    intro:
      "Drop in a picture and get a clean cutout as a transparent PNG, or swap in a solid color or your own image. The AI model runs on your device, so your photo is never uploaded.",
    steps: [
      "Add a photo with a clear subject, such as a person, product or pet.",
      "Wait for the model to run. The first use downloads it once.",
      "Drag the before and after slider to check the edges.",
      "Download a transparent PNG, or choose a solid color or an uploaded image as the new background.",
    ],
    guide: [
      {
        heading: "How it works without uploading your photo",
        paragraphs: [
          "Most background removers send your picture to a server. This one does not. On first use, your browser downloads an open-source model called ormbg, released under the Apache-2.0 license. It is roughly 45 MB, and your browser keeps a copy, so later visits start quickly.",
          "After that, the model runs locally on your own processor. The photo stays on your device from start to finish. That makes it a sensible choice for passport photos, product shots before a launch, and pictures of other people.",
        ],
      },
      {
        heading: "What gives the best results",
        paragraphs: [
          "The model does best with a clear main subject: a person, a product on a table, a pet, a plant. It separates the subject from the background by shape and color, so a bit of contrast between the two goes a long way. Good, even lighting helps more than a high resolution.",
          "Expect weaker results with wispy hair, fur, glass, smoke and thin chains, where the edge is partly see-through. Subjects whose color matches the background, such as a white mug on white paper, are also hard. If an edge looks rough, use the slider to check at full size, then try a photo with a plainer backdrop.",
          "A few quick habits improve the outcome. Keep the subject fully inside the frame, avoid motion blur, and do not let a busy pattern run right up against the subject's outline. If a picture fails, try a slightly different crop before you give up on it.",
        ],
      },
      {
        heading: "Choosing the output",
        paragraphs: [
          "A transparent PNG is the most flexible: place it on a slide, a poster or an online store listing. If a marketplace wants a plain white background, choose a solid color instead and the tool fills it in for you. For something more creative, upload another image to use as the backdrop.",
          "Transparent areas are kept only in PNG. If you save the result as a JPG afterward, the see-through parts become white.",
        ],
      },
      {
        heading: "Speed and device limits",
        paragraphs: [
          "Because the work is done on your device, speed depends on your hardware. A recent laptop finishes a photo in a few seconds. An older phone can take much longer, and very large pictures may run slowly. Resize a big photo to around 2000 pixels on the long side before you start if things drag.",
          "The initial 45 MB download is best done on Wi-Fi if you are on a mobile plan.",
        ],
      },
      {
        heading: "Product photos and ID pictures",
        paragraphs: [
          "For shop listings, shoot the product in daylight against a plain surface, remove the background and place it on white. For ID or visa pictures, check the official background color rule first, then pick that exact color. Always look at the edges before you submit anything, since an automatic cutout is a starting point, not a guarantee.",
        ],
      },
    ],
    faqs: [
      {
        q: "Is my photo uploaded to remove the background?",
        a: "No. The AI model is downloaded to your browser and runs on your device. The photo is never sent to a server.",
      },
      {
        q: "Why does it download 45 MB the first time?",
        a: "That is the AI model. Your browser stores it, so you only download it once on that device and browser.",
      },
      {
        q: "Which photos work best?",
        a: "Pictures with a clear subject and some contrast against the background, like people, products and pets.",
      },
      {
        q: "Can it handle hair?",
        a: "It does a decent job, but fine hair and fur can look imperfect. Check the edges with the slider.",
      },
      {
        q: "Can I put a new background behind the subject?",
        a: "Yes. Pick a solid color or upload an image as the replacement.",
      },
      {
        q: "Is the result free to use commercially?",
        a: "The tool adds no watermark and has no limits. You are responsible for having the rights to the photo you process.",
      },
      {
        q: "Why is it slow on my phone?",
        a: "The model runs on your phone's processor. Older phones are slower, and resizing the photo first helps.",
      },
    ],
  },
};
