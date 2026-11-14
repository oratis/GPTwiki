import type { DraftArticle } from './types';
import { EDITORIAL_STYLE as STYLE } from './editorial-style';

// Original worked examples; every number in the diagrams is reproducible.
// Publish the reviewed bilingual snapshot via --release, not a new BATCHES entry.
export const dataLiteracyEn: DraftArticle[] = [
  {
    topicKey: 'reading-chart-scales',
    title: 'How to Read Chart Scales Without Being Misled',
    question: 'How can changing a chart’s axis change its message, and when is a logarithmic scale useful?',
    summary: 'A chart’s scale changes what looks large, small, or fast. Learn to check bar-chart baselines, distinguish percentage points from percentage changes, and read linear and logarithmic charts using two worked examples.',
    tags: ['statistics', 'data literacy', 'charts', 'mathematics'],
    language: 'en',
    image: {
      prompt: 'Two transparent coordinate frames showing the same pair of indigo and cyan columns at different baselines, with a magnifying lens drawing attention to the base of each frame. Conceptual illustration only, no quantitative labels. ' + STYLE,
      alt: 'Conceptual illustration of two chart frames with different baselines; the numbered examples below show the actual scale effects.',
    },
    sources: [
      { title: 'ONS — Axes and gridlines', url: 'https://service-manual.ons.gov.uk/data-visualisation/guidance/axes-and-gridlines' },
      { title: 'ONS — Percentages and percentage points', url: 'https://service-manual.ons.gov.uk/content/numbers/percentages' },
      { title: 'ONS — Bar charts', url: 'https://service-manual.ons.gov.uk/data-visualisation/chart-types/bar-charts' },
    ],
    content: `# How to Read Chart Scales Without Being Misled

A chart can contain accurate numbers and still encourage an exaggerated impression. Before interpreting a rising line or a towering bar, read the units, the starting value, and the spacing of the tick marks. These determine what distances on the page mean.

This article uses **invented teaching data**, not a survey or a product benchmark. The aim is to make each visual claim checkable with a few calculations.

## The same change can look modest or enormous

Imagine a service reporting satisfaction of 48% in period A and 52% in period B. With an axis starting at zero, the bars have heights proportional to 48 and 52. With an axis starting at 45%, the visible heights represent only 3 and 7 percentage points above that baseline.

![Figure 1. The same 48% and 52% values on two bar charts: a zero baseline preserves their ratio, while a 45% baseline makes the visible bars measure 3 and 7 points. Original GPTwiki diagram; invented data.](/editorial/data-literacy/reading-chart-scales-baselines.en.svg)

On the cropped chart, the second visible bar is 7 ÷ 3 ≈ 2.33 times as tall as the first. But the actual satisfaction rate is 52 ÷ 48 ≈ 1.083 times the earlier rate. The rate did not more than double. The picture magnified the difference by removing the common portion of both bars.

Bars invite us to compare lengths measured from a baseline. That is why the [ONS bar-chart guidance](https://service-manual.ons.gov.uk/data-visualisation/chart-types/bar-charts) calls for a zero starting point. The cropped version here is deliberately shown as a reading exercise, not as a recommended design.

There are also two valid numerical descriptions of this change:

| Question | Calculation | Answer |
| --- | --- | --- |
| How far apart are the percentages? | 52% − 48% | 4 percentage points |
| How large is the change relative to the starting rate? | (52 − 48) ÷ 48 × 100% | About 8.3% |

A percentage-point change subtracts rates; a percentage change divides the change by a stated starting value. The distinction is explained in the [ONS style guide](https://service-manual.ons.gov.uk/content/numbers/percentages). Writing “satisfaction rose by 4%” would not accurately describe this example.

## A nonzero axis is sometimes useful

A line chart encodes values through positions and their connections, rather than through filled lengths extending from a baseline. A clearly labelled narrow vertical range can reveal variation that a zero-based scale would obscure. Showing a room’s temperature between 19 and 23°C, for example, can help someone inspect small fluctuations.

Read a zoomed line chart as a close-up: inspect the ticks before judging how large a change is. For comparisons across several panels, check that their scales match. The [ONS guidance on axes](https://service-manual.ons.gov.uk/data-visualisation/guidance/axes-and-gridlines) distinguishes this use of cropped line or scatter plots from cropping bars. Whether a change matters still depends on the subject, not on its height in pixels.

## Linear and logarithmic scales answer different questions

Now consider an invented sequence of counts: 10, 20, 40, and 80 at four equally spaced times. Each step doubles the count. Yet the increases in raw units grow: +10, then +20, then +40.

![Figure 2. Counts of 10, 20, 40, and 80 bend upward on a linear scale but form a straight line on a base-2 logarithmic scale. Equal vertical steps on the right mean doubling. Original GPTwiki diagram; invented data.](/editorial/data-literacy/reading-chart-scales-growth.en.svg)

On a **linear scale**, equal vertical distances mean equal additions. Moving from 10 to 20 covers half the distance of moving from 20 to 40. This view is useful when the question is how many additional units arrived.

On the **logarithmic scale** shown here, equal distances mean equal ratios. The tick labels are 10, 20, 40, and 80, spaced evenly because each is twice the previous one. The straight line represents a constant multiplicative growth rate, not a constant number of additional units. Other log charts may use ticks such as 1, 10, 100, and 1,000; the principle is the same.

Ordinary logarithmic axes cannot represent zero or negative values. Do not silently replace zero with a small positive number: that changes the visual meaning. If a chart uses another transformation, its description should say so. A logarithmic view also compresses large absolute differences; the underlying counts remain essential context.

## A practical reading routine

1. **Identify the quantity.** Is this a count, rate, index, or change? A chart of total complaints answers a different question from complaints per 1,000 orders.
2. **Read the scale.** Where does it begin, and do equal spaces mean equal additions or equal ratios?
3. **Check the comparison.** Are the dates equally spaced? Do panels use the same units and limits?
4. **Calculate one change yourself.** Record both the absolute difference and its denominator before interpreting a dramatic shape.

**Try it:** a rate rises from 20% to 25%. That is 5 percentage points and a 25% increase relative to 20%. Neither calculation tells you why it changed or whether sampling uncertainty could explain the difference. A well-read chart describes a pattern; establishing its cause requires other evidence.

**Does a steep line prove rapid growth?** No. Its apparent angle also depends on the axis limits and the chart’s width and height. Compare labelled values over a specified interval instead.

**Are logarithmic charts deceptive?** They can be useful when ratios are the question. The problem is an unexplained scale or a conclusion that confuses ratios with raw changes, not the mere presence of logarithms.`,
  },
  {
    topicKey: 'mean-median-outliers',
    title: 'Mean vs Median: What an Average Leaves Out',
    question: 'When should I use the mean or the median, and how can a few unusual observations change the story?',
    summary: 'The mean tracks the total per observation; the median locates the middle of an ordered dataset. Worked delivery-time examples show how outliers, spread, and unequal group sizes change what an “average” can tell you.',
    tags: ['statistics', 'data literacy', 'averages', 'mathematics'],
    language: 'en',
    image: {
      prompt: 'A row of translucent delivery parcels clustered together with one parcel far away, a luminous balance beam and a central marker suggesting two different summaries of the same observations. Conceptual illustration, no numerical scale. ' + STYLE,
      alt: 'Conceptual illustration of clustered deliveries and one distant observation; the diagrams below compare the mean and median numerically.',
    },
    sources: [
      { title: 'NIST/SEMATECH — Measures of Location', url: 'https://www.itl.nist.gov/div898/handbook/eda/section3/eda351.htm' },
      { title: 'NIST/SEMATECH — Measures of Scale', url: 'https://www.itl.nist.gov/div898/handbook/eda/section3/eda356.htm' },
    ],
    content: `# Mean vs Median: What an Average Leaves Out

“The average delivery takes 28 minutes” sounds like a description of an ordinary order. It might instead describe eight quick deliveries and one very late one. A single number cannot show both the center and the shape of a dataset.

The **arithmetic mean** is the sum divided by the number of observations. The **median** is the middle value after sorting; for an even number of observations, the usual sample median is the mean of the two middle values. These definitions are set out in the [NIST statistical handbook](https://www.itl.nist.gov/div898/handbook/eda/section3/eda351.htm). They answer different questions, so choosing between them starts with what you need to know.

## One delayed delivery changes the mean

Consider nine invented delivery times, in minutes:

| Sorted observation | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Time | 18 | 19 | 20 | 20 | 21 | 22 | 22 | 23 | 90 |

The total is 255 minutes, so the mean is 255 ÷ 9 ≈ **28.3 minutes**. The fifth observation is **21 minutes**, so that is the median. Eight of the nine deliveries are below the mean. No order in this dataset took anything close to 28.3 minutes.

![Figure 1. Replacing a 24-minute delivery with a 90-minute delivery raises the mean from 21 to about 28.3 minutes, while the median stays at 21. Each dot is one delivery; repeated values are stacked. Original GPTwiki diagram; invented data.](/editorial/data-literacy/mean-median-outliers-shift.en.svg)

For comparison, replace the 90 with 24 and leave every other observation unchanged. The new total is 189 and the mean is 21. The median remains 21 because the middle position has not changed. This is the arithmetic behind the mean’s sensitivity to an extreme value: adding 66 minutes to one observation adds 66 ÷ 9 ≈ 7.3 minutes to the mean.

The median is resistant to a change at the far end of this list. It is not immune to all changes, and it does not describe how bad the longest wait was.

## Choose a summary to match the question

For a customer asking about the middle experience, the median is useful. For a planner accounting for the total delivery time across orders, the mean is useful: mean × number of orders recovers the total. Neither alone measures the risk of a very late delivery.

| Decision | Useful information |
| --- | --- |
| Describe the central delivery time | Median, alongside the distribution |
| Account for total minutes across orders | Mean and order count |
| Check a 30-minute service promise | Number and proportion of orders exceeding 30 minutes |
| Investigate long waits | Tail observations, timestamps, and causes |

In our nine-order example, exactly one order exceeds 30 minutes, so the observed late-order share is 1 ÷ 9 ≈ 11.1%. That is a description of these orders, not a reliable estimate for every future day. Nine observations provide little evidence about rare delays.

## Even the mean and median together can hide variation

Compare two more invented sets, each containing five deliveries:

- Set A: 19, 20, 20, 20, 21 minutes.
- Set B: 2, 3, 20, 37, 38 minutes.

Both have a mean of 20 and a median of 20. A customer’s experience is nevertheless much less consistent in set B.

![Figure 2. Two datasets have the same mean and median of 20 minutes. Set A ranges from 19 to 21; set B ranges from 2 to 38. Equal averages do not imply equal consistency. Original GPTwiki diagram; invented data.](/editorial/data-literacy/mean-median-outliers-spread.en.svg)

The range is 2 minutes in A and 36 in B. Range is easy to understand but depends entirely on the two extremes. Other summaries include standard deviation and the interquartile range, which describes the width of the middle half of the data. The [NIST discussion of spread](https://www.itl.nist.gov/div898/handbook/eda/section3/eda356.htm) explains why these measures respond differently to the center and tails. A dot plot is particularly informative when the dataset is small enough to display every observation.

## Do not average group averages without their sizes

Suppose one shop has two orders with a mean of 10 minutes, and another has eight orders with a mean of 20 minutes. Averaging the two shop means gives 15 minutes, which treats the shops equally. It does not treat the ten orders equally.

The overall order mean is (2 × 10 + 8 × 20) ÷ (2 + 8) = **18 minutes**. It is a weighted mean, with order counts as weights. The unweighted figure can answer a question about the average shop, but it answers a different question from the average order. Group medians cannot generally be combined this way to recover a pooled median.

## What to ask when someone quotes an average

Ask which average was calculated, what each observation represents, how many there were, and over what period. Then ask for a plot or a measure of spread. If the question concerns reliability, request the relevant late-event rate as well.

**Should the 90-minute delivery be deleted?** Only a documented reason can justify excluding it, such as a confirmed measurement error or an observation outside the defined scope. A real delay is evidence about the service. A useful report can show all observations and explain what changes under a clearly labelled exclusion.

**Try it:** changing the 90-minute observation to 180 raises the mean by 90 ÷ 9 = 10 minutes, to about 38.3. The median stays at 21. If the business reports only the median, that serious worsening at the tail disappears from the headline.`,
  },
  {
    topicKey: 'classifier-base-rates',
    title: 'Why 99% Accuracy Can Hide a Useless Classifier',
    question: 'How do accuracy, precision, recall, and the base rate change the meaning of a model’s alerts?',
    summary: 'When important events are rare, a high accuracy score can hide missed cases and false alarms. A worked inspection example separates precision from recall and shows why the same detection rates can produce very different alert quality.',
    tags: ['artificial intelligence', 'statistics', 'data literacy', 'machine learning'],
    language: 'en',
    image: {
      prompt: 'A translucent conveyor of small manufactured parts passing through an indigo inspection gate, a small set of parts diverted into an amber review tray, with clearly separate paths for inspection and acceptance. Conceptual illustration, not a technical diagram. ' + STYLE,
      alt: 'Conceptual illustration of an inspection gate and a review tray; the worked examples below distinguish real defects from false alarms.',
    },
    sources: [
      { title: 'Google Machine Learning Crash Course — Accuracy, recall, precision, and related metrics', url: 'https://developers.google.com/machine-learning/crash-course/classification/accuracy-precision-recall' },
      { title: 'Google Machine Learning Crash Course — Thresholds and the confusion matrix', url: 'https://developers.google.com/machine-learning/crash-course/classification/thresholding' },
      { title: 'Google Machine Learning Glossary — Metrics', url: 'https://developers.google.com/machine-learning/glossary/metrics' },
      { title: 'Google Machine Learning Crash Course — Dividing the original dataset', url: 'https://developers.google.com/machine-learning/crash-course/overfitting/dividing-datasets' },
    ],
    content: `# Why 99% Accuracy Can Hide a Useless Classifier

Suppose a factory inspects 10,000 parts, of which 100 are defective. A system that labels **every part acceptable** is correct on 9,900 parts: 99% accuracy. It also misses every defect. The impressive score reflects how common acceptable parts are, rather than a useful ability to find defects.

This is an **invented teaching example**, not a claim about a deployed model. Defects are the “positive” class; acceptable parts are the “negative” class. Positive names the condition being detected, not something desirable.

## Count the four possible outcomes

Now imagine a detector that catches 90 of the 100 defects and wrongly flags 198 of the 9,900 acceptable parts. Its results form a confusion matrix:

![Figure 1. Of 10,000 invented parts, the detector flags 90 real defects and 198 acceptable parts, misses 10 defects, and correctly passes 9,702 acceptable parts. Rows are actual condition; columns are the detector’s decision. Original GPTwiki diagram.](/editorial/data-literacy/classifier-base-rates-matrix.en.svg)

| Actual condition | Flagged for review | Passed | Total |
| --- | --- | --- | --- |
| Defective | 90 true positives | 10 false negatives | 100 |
| Acceptable | 198 false positives | 9,702 true negatives | 9,900 |
| Total | 288 | 9,712 | 10,000 |

The four labels keep the denominators straight. [Google’s introduction to the confusion matrix](https://developers.google.com/machine-learning/crash-course/classification/thresholding) explains this way of organizing binary decisions.

## Four metrics, four different questions

For this detector, the calculations are:

| Metric | Question | Calculation |
| --- | --- | --- |
| Accuracy | What share of all decisions were correct? | (90 + 9,702) ÷ 10,000 = **97.92%** |
| Recall | What share of actual defects were caught? | 90 ÷ 100 = **90%** |
| Precision | What share of flagged parts really were defective? | 90 ÷ 288 = **31.25%** |
| False-positive rate | What share of acceptable parts were wrongly flagged? | 198 ÷ 9,900 = **2%** |

These are distinct conditional proportions, as defined in [Google’s metric guide](https://developers.google.com/machine-learning/crash-course/classification/accuracy-precision-recall). A 2% false-positive rate does **not** mean that only 2% of alerts are wrong. Here, 198 ÷ 288 = 68.75% of the alerts are false alarms. The first percentage uses acceptable parts as its denominator; the second uses flagged parts.

Notice that this detector has lower accuracy than the “pass everything” rule. It can still be more useful if catching defects is valuable and human review is affordable. Deciding that requires the costs of missed defects and unnecessary review, not just one metric.

## The base rate changes what an alert means

The **base rate** is the fraction of actual defects among all inspected parts. In the first example it is 1%. Now suppose the detector is used on a different batch with 1,000 defects and 9,000 acceptable parts: a 10% base rate.

For illustration, assume recall stays at 90% and the false-positive rate stays at 2%. Then it catches 900 defects and wrongly flags 180 acceptable parts. Precision becomes 900 ÷ (900 + 180) ≈ **83.3%**.

![Figure 2. With recall fixed at 90% and the false-positive rate fixed at 2%, defects make up 31.25% of alerts at a 1% base rate and about 83.3% at a 10% base rate. Each bar represents 100% of alerts, not equal numbers of parts. Original GPTwiki diagram; hypothetical conditions.](/editorial/data-literacy/classifier-base-rates-alerts.en.svg)

The model has not become better at distinguishing the two classes under these assumptions. Its alerts contain more genuine cases because the incoming batch contains more defects. The relevant arithmetic is:

**Precision = (recall × base rate) ÷ [(recall × base rate) + (false-positive rate × (1 − base rate))].**

Use proportions such as 0.90 and 0.01 in this formula. It is simply the count calculation above expressed per inspected part. [Google’s metrics glossary](https://developers.google.com/machine-learning/glossary/metrics) provides the underlying definitions; the two factory batches and calculations here are original worked examples.

In practice, changing batches may also change lighting, defect types, equipment, or model performance. Holding the two rates constant isolates the base-rate effect; it is not a promise that a detector transfers unchanged to a new setting.

## A threshold is an operating choice

Many classifiers produce a score and flag cases above a selected threshold. Lowering it generally flags more cases, including both additional true positives and additional false positives. Raising it generally does the reverse. The actual balance must be measured on representative labelled data; a score is not automatically a well-calibrated probability.

An inspection team might compare thresholds by the number of reviews it can perform and the number of defects it can tolerate missing. A detector used only to prioritize human review has a different operating context from one that automatically discards parts. Reporting the threshold and the resulting counts makes those choices inspectable.

## How to read a model performance claim

Request the evaluation sample size, the class proportions, the four outcome counts, and the decision threshold. Ask whether evaluation data were kept separate from training and whether their conditions resemble deployment; [Google’s dataset-splitting guidance](https://developers.google.com/machine-learning/crash-course/overfitting/dividing-datasets) explains why a separate, representative test set matters. Also inspect relevant subgroups: a pooled score can hide poor performance on one kind of part.

**Try it:** with 10,000 parts, a 5% defect rate, 90% recall, and a 2% false-positive rate, there are 450 true alerts and 190 false alerts. Precision is 450 ÷ 640 ≈ 70.3%. The denominator is all alerts, not all defects.

**Is accuracy ever useful?** Yes, as one overall description when class balance and error costs are understood. It becomes misleading when it substitutes for those details.

**Does high recall guarantee trustworthy alerts?** No. Recall describes finding actual cases. Precision describes the contents of the review queue. A responsible evaluation reports both when both matter.`,
  },
  {
    topicKey: 'sampling-bias-large-surveys',
    title: 'Why a Bigger Survey Can Still Give the Wrong Answer',
    question: 'Why does sample size not fix selection bias, and what can survey weighting actually correct?',
    summary: 'More responses reduce some random uncertainty but cannot automatically repair who was left out. A campus survey example shows how selection changes results, when weighting helps, and why a margin of error is not a measure of every possible error.',
    tags: ['statistics', 'data literacy', 'surveys', 'research methods'],
    language: 'en',
    image: {
      prompt: 'A large transparent group of varied simple human figures approaching a survey frame, with only figures from one brightly lit path entering and other figures visible outside, illustrating incomplete coverage without words or numerical claims. ' + STYLE,
      alt: 'Conceptual illustration of a survey reaching only part of a larger population; the diagrams below show a numerical example of selection bias.',
    },
    sources: [
      { title: 'Statistics Canada — Selection of a sample', url: 'https://www150.statcan.gc.ca/n1/edu/power-pouvoir/ch13/sample-echantillon/5214900-eng.htm' },
      { title: 'Statistics Canada — Probability sampling', url: 'https://www150.statcan.gc.ca/n1/edu/power-pouvoir/ch13/prob/5214899-eng.htm' },
      { title: 'Statistics Canada — Non-probability sampling', url: 'https://www150.statcan.gc.ca/n1/edu/power-pouvoir/ch13/nonprob/5214898-eng.htm' },
      { title: 'U.S. Census Bureau — Nonsampling Error', url: 'https://www.census.gov/programs-surveys/sipp/methodology/nonsampling-error.html' },
      { title: 'Penn State STAT 100 — Confidence Intervals', url: 'https://online.stat.psu.edu/stat100/Lesson09' },
    ],
    content: `# Why a Bigger Survey Can Still Give the Wrong Answer

A survey with thousands of responses can describe its respondents very precisely while describing the intended population poorly. The first question is not just “How many answered?” It is “Who had a chance to answer, and who actually did?”

**Sampling variation** is the variation caused by which observations happen to be selected. **Selection bias** arises when the process systematically favors observations that produce a different answer from the population of interest. Increasing sample size can reduce random variation under a suitable design; it does not automatically remove a systematic mismatch. [Statistics Canada’s introduction to sample selection](https://www150.statcan.gc.ca/n1/edu/power-pouvoir/ch13/sample-echantillon/5214900-eng.htm) explains why design and sample size both matter.

## An invented campus survey

Imagine a campus with 1,000 students: 800 commute and 200 live on campus. In this teaching example, we know everyone’s preference about extending an evening shuttle service:

| Group | Students | Support within group | Supporters |
| --- | --- | --- | --- |
| Commuters | 800 | 20% | 160 |
| Campus residents | 200 | 80% | 160 |
| All students | 1,000 | **32%** | **320** |

Now suppose an opt-in survey receives 100 commuter responses and 100 resident responses. Assume, for the moment, that respondents within each group have exactly their group’s support rate. There are 20 commuter supporters and 80 resident supporters, so the survey reports **100 ÷ 200 = 50%** support.

![Figure 1. Commuters make up 80% of the invented campus population but only 50% of survey respondents. Residents are 20% of the population and 50% of respondents. Different group proportions change the combined result. Original GPTwiki diagram.](/editorial/data-literacy/sampling-bias-large-surveys-composition.en.svg)

The 50% is an accurate description of those 200 answers. It is a poor estimate of the campus-wide 32% because the group with higher support is overrepresented. If the survey obtained twice as many answers with the same group proportions and the same within-group rates, it would still report 50%. More of the same selection process has not solved the problem.

These numbers were constructed to isolate one mechanism. They do not imply that residents or commuters have these preferences in any real institution.

## What weighting can fix

If we know the population shares and the respondents represent their own groups, we can weight the two group rates by the correct proportions:

**0.80 × 20% + 0.20 × 80% = 32%.**

Equivalently, each commuter response can represent eight students and each resident response two. That reconstructs 800 commuters and 200 residents, with 160 supporters in each group.

![Figure 2. Giving the two respondent groups equal weight produces 50% support. Using population weights of 80% commuters and 20% residents gives 32%, matching the invented population only because the within-group response rates are assumed representative. Original GPTwiki diagram.](/editorial/data-literacy/sampling-bias-large-surveys-weights.en.svg)

But imagine that keen shuttle supporters are especially likely to answer within **both** groups. Suppose commuter respondents show 40% support and resident respondents 90%, while the real group rates remain 20% and 80%. Correcting the group proportions now gives 0.80 × 40% + 0.20 × 90% = **50%**, still far above the true 32%.

Weighting fixed the commuter–resident mix; it did not fix differences between responders and nonresponders within those groups. The [U.S. Census Bureau’s discussion of nonsampling error](https://www.census.gov/programs-surveys/sipp/methodology/nonsampling-error.html) describes both weighting adjustments and their limits. Matching a few demographic totals is therefore useful evidence about composition, not proof that all important differences have disappeared.

## Three places a survey can go wrong

- **Coverage:** a survey frame or invitation misses part of the target population. A QR code displayed only inside a residence hall is unlikely to reach all commuters.
- **Nonresponse:** selected people do not respond, and their answers would differ from those who do. A low response rate alone does not quantify the resulting bias; the missing people’s views matter.
- **Measurement:** the wording or response choices alter the answer. “Do you support a safer shuttle?” and “Do you support paying more for later service?” do not ask the same question.

An open online poll also lets people select themselves into the sample. [Statistics Canada’s guide to non-probability sampling](https://www150.statcan.gc.ca/n1/edu/power-pouvoir/ch13/nonprob/5214898-eng.htm) explains why such samples need additional assumptions before their results can be generalized. They can still be useful for collecting suggestions or finding problems; their limits depend on the claim being made.

## A margin of error has a limited job

For an ideal simple random sample from a large population, the approximate 95% margin of error for a proportion near 50% is **1.96 × √(0.25 ÷ n)**, using the normal approximation described in [Penn State’s confidence-interval lesson](https://online.stat.psu.edu/stat100/Lesson09). At 400 responses this is about 4.9 percentage points; at 1,600 it is about 2.45. Four times the observations roughly halves this random-error margin under the stated assumptions.

Those calculations are a separate large-population illustration, not a margin of error for our 1,000-student opt-in survey. Complex designs, finite populations, clustering, and weighting require appropriate variance calculations. Most importantly, a conventional sampling margin does not cover every coverage, nonresponse, or wording problem. Attaching the simple formula to any online poll does not make it valid.

[Probability sampling](https://www150.statcan.gc.ca/n1/edu/power-pouvoir/ch13/prob/5214899-eng.htm) uses random selection with calculable inclusion probabilities. These probabilities need not all be equal. It gives a basis for statistical inference, while still requiring careful coverage, follow-up, and measurement.

## Read the methods before the headline

Look for the target population, recruitment method, fieldwork dates, question wording, respondent count, weighting variables, and treatment of uncertainty. Ask whether the reported number describes respondents or estimates a wider population.

**Try it:** if the population were 60% commuters and 40% residents, with support still 20% and 80% within groups, overall support would be 0.60 × 20% + 0.40 × 80% = **44%**. The correct weight comes from the population you want to describe, not the group balance that happens to arrive in your inbox.`,
  },
];
