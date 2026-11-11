import type { PageContent } from "./types";

export const financeContent: Record<string, PageContent> = {
  "emi-calculator": {
    title: "EMI Calculator: Loan Payment and Interest",
    description:
      "EMI calculator with a full amortization table. See monthly payment, total interest and yearly breakdown. Free, private, no sign-up needed.",
    h1: "Loan EMI Calculator With Amortization Table",
    intro:
      "Enter the loan amount, interest rate and term to see your monthly payment, total interest and a payment-by-payment schedule. It is an estimate, and everything is calculated in your browser.",
    steps: [
      "Choose your currency and enter the loan amount.",
      "Enter the annual interest rate and the loan term in years or months.",
      "Read the monthly EMI, total interest and total payment.",
      "Open the amortization table and switch between monthly and yearly views.",
    ],
    guide: [
      {
        heading: "How the EMI formula works",
        paragraphs: [
          "EMI stands for equated monthly installment: one fixed payment each month that covers both interest and a slice of the principal. The formula is EMI = P x r x (1 + r)^n / ((1 + r)^n - 1). P is the loan amount, r is the monthly interest rate (annual rate divided by 12), and n is the number of monthly payments.",
          "Take a 500,000 loan at 10 percent a year for five years. The monthly rate is 0.8333 percent and n is 60. The formula gives an EMI of about 10,624. Over 60 payments you repay roughly 637,400, so the total interest is around 137,400.",
          "Reducing-balance loans, the usual kind for homes and cars, work this way. Flat-rate loans quote interest on the original amount for the whole term, which looks cheaper but costs more in practice. If a lender quotes a flat rate, convert it to a reducing-balance rate before comparing offers.",
        ],
      },
      {
        heading: "Reading the amortization table",
        paragraphs: [
          "Early payments are mostly interest. In the example above, the first EMI includes about 4,167 of interest and only about 6,457 of principal. Because interest is charged on the remaining balance, it shrinks each month and the principal part grows, until the last payments are almost all principal.",
          "That pattern explains why paying off a loan early saves most in the first years. An extra payment in month 6 cuts a balance that still carries many months of interest. The monthly view shows each payment, and the yearly view adds them up so you can see how much you pay each year and how much debt is left on 31 December.",
          "Use the table to plan prepayments. Pick a month, note the remaining balance and decide whether a lump sum is worth more than keeping that cash. Check with your lender first, since some charge a fee for early repayment.",
        ],
      },
      {
        heading: "Rate versus term: what really changes the cost",
        paragraphs: [
          "A longer term lowers the EMI and raises the total interest. The same 500,000 at 10 percent over ten years has an EMI near 6,607, much easier on the monthly budget, but total interest climbs to about 292,900, more than double the five-year figure.",
          "A small rate cut matters more than it looks. Half a percentage point on a large, long loan can save a very large sum over the term. Compare offers by total interest and total payment, not by EMI alone.",
        ],
      },
      {
        heading: "What this estimate leaves out",
        paragraphs: [
          "Real loans can include processing fees, insurance, late payment charges and different rules for how interest accrues. Floating-rate loans change with the market, so your EMI may move. Some lenders calculate interest daily on the outstanding balance, which gives slightly different numbers.",
          "Use the result to compare options and plan a budget. Ask your lender for an official schedule before you sign. This calculator provides estimates only and is not financial advice.",
          "Also remember the first payment date. If the loan starts mid-month, the first period may be longer or shorter, and the lender can add a small amount of broken-period interest to the first installment.",
        ],
      },
    ],
    faqs: [
      {
        q: "How is EMI calculated?",
        a: "EMI = P x r x (1 + r)^n / ((1 + r)^n - 1), where P is the principal, r the monthly rate and n the number of months.",
      },
      {
        q: "Does the calculator work for home, car and personal loans?",
        a: "Yes. Any fixed-rate, fixed-term loan with equal monthly payments follows the same math.",
      },
      {
        q: "Why is most of my early EMI interest?",
        a: "Interest is charged on the outstanding balance, which is highest at the start. As the balance falls, more of each payment goes to principal.",
      },
      {
        q: "Can I see year-by-year totals?",
        a: "Yes. Switch the amortization table to the yearly view.",
      },
      {
        q: "Does it include processing fees or insurance?",
        a: "No. Only principal and interest are calculated. Add such charges separately.",
      },
      {
        q: "Which currencies can I pick?",
        a: "You can choose from options such as $, PKR, INR, GBP and EUR. This changes the symbol only, not the math.",
      },
      {
        q: "Is my data saved?",
        a: "No. The numbers are calculated in your browser and are not sent anywhere.",
      },
    ],
  },

  "compound-interest-calculator": {
    title: "Compound Interest Calculator With Chart",
    description:
      "Compound interest calculator with monthly contributions, five compounding frequencies and a growth chart. Free, private and in your browser.",
    h1: "Compound Interest Calculator",
    intro:
      "See how an amount grows when interest earns interest. Add regular monthly contributions, choose how often interest compounds and read the result on a growth chart.",
    steps: [
      "Enter the starting amount, annual interest rate and number of years.",
      "Choose the compounding frequency from yearly to daily.",
      "Add a monthly contribution if you plan to save regularly.",
      "Read the final balance, the interest earned and the growth chart.",
    ],
    guide: [
      {
        heading: "The formula behind the curve",
        paragraphs: [
          "Compound interest means each period's interest is added to the balance, and the next period's interest is calculated on the larger number. The formula is A = P x (1 + r/n)^(n x t), where P is the starting amount, r the annual rate, n the number of compounding periods per year and t the years.",
          "A deposit of 10,000 at 6 percent for 10 years compounded yearly grows to about 17,908. With simple interest, you would only reach 16,000, because the interest never earns interest of its own. The 1,908 difference is the compounding effect.",
          "The rate you enter should be the annual rate. The calculator divides it by the number of periods for you, so do not convert it to monthly first. If your account states a monthly rate, multiply by 12 for the annual figure.",
        ],
      },
      {
        heading: "Does compounding frequency matter?",
        paragraphs: [
          "A little. The same 10,000 at 6 percent for 10 years ends at about 17,908 with yearly compounding, 18,194 with monthly and about 18,220 with daily. The jump from yearly to monthly is visible, but from monthly to daily it is small.",
          "Time and rate matter far more. Check how a bank or fund states its rate: a nominal annual rate compounded monthly is lower than the effective annual rate it produces, and comparing the two directly would be misleading.",
          "Loans work the same way in reverse. A credit card that compounds daily at 24 percent costs noticeably more than the headline rate suggests, which is why carrying a balance gets expensive so quickly.",
        ],
      },
      {
        heading: "The power of regular contributions",
        paragraphs: [
          "Adding money every month often beats a big lump sum, because each contribution starts compounding as soon as it goes in. Saving 200 per month for 20 years at 7 percent builds a balance of about 104,000, from 48,000 of your own money. The remaining 56,000 or so is growth.",
          "The chart shows two lines: what you put in and what the balance becomes. The gap between them widens as the years pass, which is the main message of compounding. Starting early beats starting big.",
          "Try changing only the monthly amount and watch the chart. Adding 50 per month often moves the final balance more than a full percentage point of extra return, and you control it completely.",
        ],
      },
      {
        heading: "Using the numbers sensibly",
        paragraphs: [
          "The calculator assumes a fixed rate for the whole period. Real investments move up and down, and savings account rates change. Inflation also reduces what the future amount can buy, so for long horizons try a lower rate to see a cautious scenario.",
          "Fees, taxes and withdrawals are not included. Treat the output as an estimate for planning, not as a promise or financial advice.",
        ],
      },
    ],
    faqs: [
      {
        q: "What is the compound interest formula?",
        a: "A = P x (1 + r/n)^(n x t), where P is principal, r the annual rate, n the compounding periods per year and t the number of years.",
      },
      {
        q: "What is the difference between simple and compound interest?",
        a: "Simple interest is charged only on the original amount. Compound interest is charged on the original amount plus interest already earned.",
      },
      {
        q: "Which compounding frequency can I choose?",
        a: "Yearly, half-yearly, quarterly, monthly or daily.",
      },
      {
        q: "Can I add monthly deposits?",
        a: "Yes. Enter a monthly contribution and it is included in the growth and the chart.",
      },
      {
        q: "Is the chart based on real data?",
        a: "It is based on your inputs and a constant rate. It is an illustration, not a forecast.",
      },
      {
        q: "Does it include taxes or fees?",
        a: "No. Subtract those yourself, or use a lower rate to see their effect.",
      },
    ],
  },

  "sip-calculator": {
    title: "SIP Calculator and Savings Goal Planner",
    description:
      "SIP calculator that shows future value of monthly savings, plus a goal planner that works out how much to save each month. Free and private.",
    h1: "SIP and Savings Goal Calculator",
    intro:
      "Two questions in one place: what will my monthly SIP grow into, and how much do I need to save each month to reach a target amount.",
    steps: [
      "Choose a mode: future value of a SIP, or monthly amount needed for a goal.",
      "Enter the monthly amount or the goal, the expected annual return and the number of years.",
      "Read the result, including the total you invest and the estimated gain.",
      "Change the inputs to compare different scenarios.",
    ],
    guide: [
      {
        heading: "What a SIP is",
        paragraphs: [
          "A systematic investment plan, or SIP, means putting a fixed amount into an investment on a regular schedule, usually monthly. The idea is discipline: you invest through ups and downs rather than trying to guess the right moment. When prices are low your money buys more units, and when they are high it buys fewer.",
          "The calculator treats a SIP as a monthly saving that grows at a steady annual rate. It works just as well for a recurring deposit or a plain savings plan.",
          "SIPs became popular because they remove decisions. The amount leaves your account on a set date, so saving happens first and spending adjusts around it. Many people also raise the amount a little each year when their income rises, which this calculator can mimic if you rerun it with a bigger figure.",
        ],
      },
      {
        heading: "Future value with a worked example",
        paragraphs: [
          "Invest 5,000 a month for 10 years with an assumed return of 12 percent a year. The monthly rate is 1 percent and there are 120 payments. The result is roughly 1.15 million. You put in 600,000 yourself, and about 550,000 is growth.",
          "Extend the same plan to 20 years and the balance reaches about 4.95 million on 1.2 million invested. Doubling the time more than quadruples the outcome. That is why starting early matters more than the size of the monthly amount.",
          "The calculator also shows the invested total beside the future value, so you can see the gain separately. This split is a useful sanity check: if the gain looks too large for the years involved, your return assumption is probably too high.",
        ],
      },
      {
        heading: "Working backwards from a goal",
        paragraphs: [
          "Goal mode flips the question. Say you want 1,000,000 in 10 years and expect 12 percent. The calculator estimates you need about 4,350 a month. If that is too high for your budget, you have three levers: save for more years, accept a smaller goal, or find a higher return, which usually means taking more risk.",
          "Use it for concrete plans: a down payment, a wedding, school fees or an emergency fund. Write the date next to the number, since a goal with a deadline is easier to stick to.",
          "If the monthly figure is out of reach, try lengthening the period by two or three years before changing the goal. Because compounding builds on itself, those extra years usually cut the monthly amount by more than you would guess.",
        ],
      },
      {
        heading: "Be careful with the return assumption",
        paragraphs: [
          "Nobody knows what return an investment will deliver. Savings accounts pay low, steady rates, while stock-based funds swing widely and may lose money in some years. Run the calculation with a conservative rate and an optimistic one, and plan around the lower number.",
          "Inflation reduces the value of the future sum, and fees reduce the return. This is an estimate to help you plan, not a prediction, and not financial advice.",
        ],
      },
    ],
    faqs: [
      {
        q: "How is SIP future value calculated?",
        a: "Each monthly amount grows at the monthly rate for the remaining months, and the results are added together. The formula is the future value of a series of equal payments.",
      },
      {
        q: "Can I find out how much to invest each month?",
        a: "Yes. Switch to the goal mode, enter your target amount, return and years, and it shows the monthly saving needed.",
      },
      {
        q: "What return should I assume?",
        a: "Pick a cautious number you consider realistic for the type of investment. Try a few values to see the range.",
      },
      {
        q: "Does a SIP guarantee returns?",
        a: "No. A SIP is a method of investing regularly. Returns depend on the investment you choose.",
      },
      {
        q: "Can I use it for something other than mutual funds?",
        a: "Yes. It suits any regular monthly saving that grows at a steady rate.",
      },
      {
        q: "Are taxes and fees included?",
        a: "No. Subtract them from your expected return to get a more realistic view.",
      },
    ],
  },

  "percentage-calculator": {
    title: "Percentage Calculator: Find X% of Y",
    description:
      "Percentage calculator for X% of Y, percent change between two numbers and what percent one number is of another. Free and instant.",
    h1: "Percentage Calculator",
    intro:
      "Three common percentage questions, answered instantly: what is X percent of Y, how much did a number change in percent, and what percent is one number of another.",
    steps: [
      "Choose the type of question you want to answer.",
      "Type your two numbers into the matching fields.",
      "Read the result as you type.",
      "Change a value to try another scenario.",
    ],
    guide: [
      {
        heading: "X percent of Y",
        paragraphs: [
          "To find a part of a number, divide the percentage by 100 and multiply. 15 percent of 240 is 0.15 x 240 = 36. This is the case for tips, commissions, a share of a bill or the amount of a discount.",
          "A mental shortcut helps: 10 percent is the number with its decimal point moved one place left. For 15 percent, take 10 percent and add half of it. For 240 that is 24 plus 12, which gives 36.",
          "Discounts, tips and sales commissions all use this form. If you need to take a percentage away, as in a 30 percent off sticker, you can multiply by 0.70 directly instead of working out the discount and subtracting it.",
        ],
      },
      {
        heading: "Percentage change from X to Y",
        paragraphs: [
          "Percentage change is (new - old) / old x 100. If a price goes from 80 to 100, the change is 20 / 80 = 25 percent increase. If it goes from 100 back to 80, the change is -20 / 100 = 20 percent decrease. The two numbers differ because the base is different, which surprises many people.",
          "A positive result is an increase and a negative result is a decrease. Use it for price changes, salary raises, exam score improvements, website traffic or a change in your savings between two dates.",
          "For a drop, the sign is negative, so a fall from 250 to 200 is -20 percent. Compare like with like: monthly sales this year against the same month last year is more meaningful than against the previous month if your business is seasonal.",
        ],
      },
      {
        heading: "X is what percent of Y",
        paragraphs: [
          "To turn a part into a percentage of a whole, divide the part by the whole and multiply by 100. If you scored 42 out of 60, the result is 42 / 60 x 100 = 70 percent. This works for marks, completion rates, budget shares and survey results.",
          "Be clear which number is the whole. Asking what percent 20 is of 80 gives 25 percent, while asking what percent 80 is of 20 gives 400 percent.",
          "You can use it for nutrition labels too. If a snack has 12 g of fat and your daily target is 70 g, it provides about 17 percent of that target. Rounding to a whole number is usually enough, though the calculator shows more decimals if you need them.",
        ],
      },
      {
        heading: "Common mistakes to avoid",
        paragraphs: [
          "Percentage points and percent are different. If an interest rate rises from 5 to 6 percent, it went up by one percentage point, and by 20 percent in relative terms. Another trap is adding successive percentages. A 20 percent rise followed by a 20 percent fall does not return you to the start: 100 becomes 120, then 96.",
          "When in doubt about the base, ask what the percentage is taken from. That number is the one to divide by.",
          "Another common slip is using the wrong base for markups and margins. A 25 percent markup on cost is a 20 percent margin on the selling price. If a spreadsheet and a calculator disagree, check which number each one divides by.",
        ],
      },
    ],
    faqs: [
      {
        q: "How do I calculate a percentage of a number?",
        a: "Divide the percentage by 100 and multiply by the number. For example, 15 percent of 240 is 0.15 x 240 = 36.",
      },
      {
        q: "How do I find percentage increase?",
        a: "Subtract the old value from the new, divide by the old value and multiply by 100.",
      },
      {
        q: "How do I find what percent one number is of another?",
        a: "Divide the first number by the second and multiply by 100.",
      },
      {
        q: "Why is a 50 percent increase not undone by a 50 percent decrease?",
        a: "The base changes. 100 up 50 percent is 150, and 150 down 50 percent is 75.",
      },
      {
        q: "Can the result be above 100 percent?",
        a: "Yes. If the part is larger than the whole, or a value more than doubles, the result is over 100 percent.",
      },
      {
        q: "Is my input saved?",
        a: "No. Everything is calculated in your browser.",
      },
    ],
  },

  "discount-calculator": {
    title: "Discount Calculator With Sales Tax and GST",
    description:
      "Discount calculator with sales tax and GST. Find the sale price, amount saved and final total, with tax inclusive or exclusive. Free and private.",
    h1: "Discount and Sales Tax Calculator",
    intro:
      "Enter the price, discount percentage and tax rate to see the final price and how much you save. Switch between tax-inclusive and tax-exclusive prices.",
    steps: [
      "Select your currency and enter the original price.",
      "Enter the discount percentage and the tax or GST rate.",
      "Choose whether the price already includes tax or not.",
      "Read the sale price, tax amount, savings and final total.",
    ],
    guide: [
      {
        heading: "How a discount is calculated",
        paragraphs: [
          "The saving is the price multiplied by the discount percentage. A 25 percent discount on 80 is 20, so you pay 60. Another way to write it is price x (1 - discount), which is 80 x 0.75 = 60.",
          "For stacked offers, apply them one after another, not by adding them. A 20 percent discount followed by another 10 percent is not 30 percent off. On 100, the first takes it to 80, the second to 72, which is 28 percent in total.",
          "It helps to know what you really save when a shop advertises a percentage. Check whether a percentage applies to every item or only the cheaper one in a multi-buy. Work out the total price you will actually pay for the quantity you want.",
        ],
      },
      {
        heading: "Tax-exclusive prices",
        paragraphs: [
          "In many countries, including the United States, shelf prices exclude sales tax, and the tax is added at checkout. In that case tax is normally charged on the discounted price. With a 60 sale price and 8 percent tax, the tax is 4.80 and you pay 64.80.",
          "Check the order. Some coupons are applied before tax, and others after, so the final amount can differ by a few cents or more on large purchases.",
          "If you shop across state lines or online, the rate may depend on where the item ships. Enter the rate shown at checkout for the most accurate total.",
        ],
      },
      {
        heading: "Tax-inclusive prices and GST",
        paragraphs: [
          "In places that use GST or VAT, the tag often already contains the tax. To split it, divide by 1 plus the rate. A price of 1,180 with 18 percent GST included has a base of 1,180 / 1.18 = 1,000, so the GST is 180.",
          "A common slip is subtracting 18 percent of 1,180, which gives 212 and a wrong base. The tax is a share of the pre-tax price, not of the total. The tax-inclusive option in the calculator does this for you, which makes it useful for invoices, expense claims and comparing prices between shops.",
          "The same logic applies to VAT and other value-added taxes. Only the rate changes, for instance 5, 12, 18 or 28 percent for GST slabs or 20 percent for UK VAT.",
        ],
      },
      {
        heading: "Shopping and business uses",
        paragraphs: [
          "Shoppers can use it to compare a big percentage off a high price with a smaller one off a low price. Sellers can use it to check the margin left after a sale. Remember that the percentage changes the profit by far more than the price: on a 20 percent margin, a 10 percent discount removes half of the profit.",
          "These are estimates for convenience. Rounding rules and local tax rules can change the exact total, so use your invoice or receipt as the official figure.",
        ],
      },
    ],
    faqs: [
      {
        q: "How do I calculate the price after a discount?",
        a: "Multiply the price by (1 minus the discount as a decimal). For 25 percent off 80, that is 80 x 0.75 = 60.",
      },
      {
        q: "Is tax calculated before or after the discount?",
        a: "Usually after, on the reduced price. Some coupons work differently, so check the store's rules.",
      },
      {
        q: "How do I remove GST from a price?",
        a: "Divide the tax-inclusive price by 1 plus the GST rate. For 18 percent, divide by 1.18.",
      },
      {
        q: "What is the difference between inclusive and exclusive?",
        a: "Inclusive means the tax is already in the price. Exclusive means it will be added on top.",
      },
      {
        q: "Can I combine two discounts?",
        a: "Apply them one after another. Two discounts of 20 and 10 percent come to 28 percent in total, not 30.",
      },
      {
        q: "Does it work for any currency?",
        a: "Yes. Pick a currency symbol from the selector. The calculation is the same.",
      },
    ],
  },
};
