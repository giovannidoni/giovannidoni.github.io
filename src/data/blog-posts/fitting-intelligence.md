# Fitting intelligence

## A pragmatic, modular AI stack—smaller models, privacy-safe orchestration, and control without a monolith.

![Image](/lovable-uploads/monolith_16x9_top_1920x1080.jpg)

Not long ago I was thinking that intelligence comes in different forms and sizes. You get a spectrum of intelligences that are often optimised for carrying out a specific set of tasks, often quite fruitful 🐝.

If we compared the neural system of a bee to that of a human, we would not be all that surprised by the difference in sizes: 100B vs 1M - about 5 orders of magnitude - and I expect the difference to increase by a few more orders when counting the connections. And yet, regardless of the generalisation capabilities of human intelligence, an insect performs quite effectively at what it does - e.g. pollinating, reproducing, and surviving. Sounds fairly intelligence to me.

That led me to think that artificial intelligence should present itself with a similar spectrum of intelligences; after all, tasks often require a varying degree of specialisation vs generality trade-off that should leave plenty of space for both sides to coexist.

## Fundation-ally
As I was about to write about it a couple of months ago, I stumbled upon two posts that made me think. The [first](https://netflixtechblog.com/foundation-model-for-personalized-recommendation-1a0bd8e02d39) was about the news that Netflix released a foundational model for their recommendation system, followed by a [second one](https://stripe.com/gb/newsroom/news/sessions-2025) from Stripe, which also built a foundational model for all fraud detection applications. The hammer to all nails here is, needless to say, a transformer model.

Beyond the all-encompassing effectiveness of transformers we’ve all gotten used to - what is the biggest advantage of this, I wondered? Well, I like to think about it in terms of **complexity management**: for companies of a certain size and maturity, it is more effective to centralise complexity into a single model than to leave it shallow but homogeneously distributed, and scattered across several models. This increases control and reduces management, communication, and attention-budget overhead.

Often, in fact, companies offer products powered by hundreds of ML/AI models, which can make managing their lifecycle quite complex. In particular, there are some recurrent challenges I’ve experienced first-hand:

- understanding the interactions between models and the consumers engaging with them, and the resulting feedback loops to consider for training them;

- understanding interactions between models themselves, which can vary with seasonality or across different model iterations;

- sharing responsibility across teams to monitor, detect, and address model interactions.

Wouldn't it be nice if one main model could function as a primary entry point for all the different downstream applications? That seems to be the direction companies like Netflix and Stripe are heading. Naturally, they have the scale - both in skills and resources - to invest in foundational models.

Further down this direction of the AI capabilities spectrum, we have LLM service providers and integrators offering Gemini, ChatGPT, and Claude at scale - a scale that few companies can afford. On the opposite side, we have the vast majority of companies, for whom tech investment is more of a tool than a product.

All professionals working in companies of this latter group know that many tasks can now often be done well using one of these foundational models out of the box. It’s no wonder that the following question:

> When do we actually need an ML engineer for a project?

is being asked by many in leadership positions these days. The models are getting better, the costs are getting lower - and the impression is that a foundational model might take it all, real quick.

## AI levels
As (almost) everyone else, I’m really impressed by the power of the most capable models available today - particularly their apparent ability to compress all the knowledge there is. It feels quite natural to wonder and hypothesise how things will evolve. So let me chip in my 5 cents.

Let’s take a step back first. In order of complexity, I identify three levels in practice:

1. The first level is the ability to process sources much faster than a human and find information that is already available in the context - i.e. **Extraction**.

2. The second level requires the model’s ability to perform somewhat complex transformations following directives - i.e. **Patterned Inference**.

2. The third level is planning - the model’s capacity to break down a complex task into smaller steps that can lead to solving a problem - i.e. **Planning**.

Let’s consider the first level. Information retrieval is one of the biggest problems people inside an organisation face, and often one of the largest sources of inefficiency. This is where current AI systems really shine: they add power to pattern recognition systems with increased flexibility - what I call “**ctrl + f 2.0**”.

Bring it up a notch, and you can apply some degree of predictivity based on the information available in context and embedded within the LLM. You can also extend extraction tasks by providing additional capabilities in various forms e.g. mostly fine tuning. Importantly, as models improve - both in the size of the context they can use and the complexity of their inferences - we observe in the reports and in out practice the bar constantly rising.

But if the bar is rising, so are our expectations: as they increase, we start entering into a domain where complex requests might or might not receive accurate responses. What’s needed then is to break problems into manageable tasks - thus avoiding information bottlenecks - while anticipating outcomes or potential issues. This, in essence, is one of the ways we reason - and it’s where the structuring of agents into workflows can play a role.

## The extraction-reasoning-planning tradeoff

As AI systems become more capable, the temptation grows to centralise tasks into a single model or agent. This can have some advantages, but not necessarily for all. In practical business operations, most AI use cases fall somewhere along a spectrum of extraction, reasoning, and planning. Understanding the trade-offs along this spectrum is key to building successful, simple yet powerful and transparent intelligent automation systems.

Let me spell them out for you again:

1. **Extraction**: low-risk and well-defined; parsing forms, reading tables, or graphs. These can often be handled by smaller, faster models with high reliability, minimal context requirements, low cost and easily self-served.

2. **Inference**: tasks that require bridging across inputs and applying logic or heuristics - e.g. summarising information, or resolving ambiguity in a process. Delegating these tasks can be more error-prone, not necessarily because of the task complexity itself, but due to the need to translate instruction, context, and prompts into the right framing - and to monitor the outcome through observability by design.

3. **Planning** is where things get complex - and riskier. Breaking down multi-step tasks, choosing optimal sequences, coordinating agents. These tasks carry the highest potential for automation, and the highest cost of failure. While things are rapidly evolving in this space, success often hinges on robust testing and evaluation strategies, transparency throughout the workflow, clarity on the objective, and a bias for simplicity.

The further right you move on the spectrum, the more powerful the model you need - but also the more context, control, and validation you must implement. Most businesses don't need (nor can they safely manage) autonomous planning across all operations. What they do need is a balanced intelligence stack. Thinking in terms of this trade-off allows us to design AI systems that are pragmatic, composable, and privacy-conscious - rather than defaulting to a single black-box LLM for every task.

What about agents?

Agents come into play when you combine level-3 planning with level-1 and level-2 operators. However, in most organizations, the greatest value will likely come not from agents but from workflows (for a good description, read here). The distinction is that, with workflows, you - the company, manager, or senior IC - define the process, which is then executed autonomously; with agents, the process is determined autonomously. The processes you already have represent consolidated (level-3) intelligence. They'll remain valuable for some time, so don't throw that investment under the bus.


## More upside? Yes, they say.
As an ML/AI practitioner, I’ve worked for the better part of the last 10 years across different companies, and the evidence has consistently been that ML is most often deployed to improve efficiencies. Although there are undoubtedly notable examples - chiefly in the advertising space - I’ve rarely seen AI/ML serve as core components of a product from day one (plenty of notable exceptions here, but the minority nonetheless). More often, the creation of tools using ML/AI has aimed at producing incremental gains over pre-existing solutions or processes.

With the advancements in AI over the past few years, we’re now witnessing the creation of entirely new products built around AI from the ground up. This marks a significant shift, clearly reflected in how companies are reorienting their investment focus - from profitability to growth - driven by AI’s tailwinds and promises. 

![Image](/lovable-uploads/graph-statistics-survey.png)
*source: https://www.bondcao.com/report/pdf/Trends_Artificial_Intelligence.pdf*

How much of this investment will translate into real, incremental revenue is still to be seen.

What is clear, though, is that this momentum is being met with great enthusiasm and energy - a mindset focused on upside potential, rather than the limited scope of the now-outdated “cost-saving” exercise.

The extraction-reasoning-planning tradeoff
As AI systems become more capable, the temptation grows to centralise tasks into a single model or agent. This can have some advantages, but not necessarily for all. In practical business operations, most AI use cases fall somewhere along a spectrum of extraction, reasoning, and planning. Understanding the trade-offs along this spectrum is key to building successful, simple yet powerful and transparent intelligent automation systems.

Let me spell them out for you again:

- **Extraction**: low-risk and well-defined; parsing forms, reading tables, or graphs. These can often be handled by smaller, faster models with high reliability, minimal context requirements, and strong explainability.

- **Inference**: tasks that require bridging across inputs and applying logic or heuristics - e.g. summarising information, or resolving ambiguity in a process. Delegating these tasks can be more error-prone, not necessarily because of the task complexity itself, but due to the need to translate instruction, context, and prompts into the right framing - and to monitor the outcome through observability by design.

- **Planning** is where things get complex - and riskier. Breaking down multi-step tasks, choosing optimal sequences, coordinating agents. These tasks carry the highest potential for automation, and the highest cost of failure. While things are rapidly evolving in this space, success often hinges on robust testing and evaluation strategies, transparency throughout the workflow, clarity on the objective, and a bias for simplicity (see Anthropic guide for building [agents](https://www.anthropic.com/engineering/building-effective-agents)).

The further right you move on the spectrum, the more powerful the model you need - but also the more context, control, and validation you must implement. Most businesses don’t need (nor can they safely manage) autonomous planning across all operations. What they do need is a balanced intelligence stack. Thinking in terms of this trade-off allows us to design AI systems that are pragmatic, composable, and privacy-conscious - rather than defaulting to a single black-box LLM for every task.

## The elephant in the room
Let's talk about privacy, shall we? GDPR and the upcoming AI Act have thrust safety and security to the core of the generative-AI wave - and every leader of a mature organisation knows why. Every query you run is processed across clusters and systems, then logged and stored under opaque terms buried in lengthy agreements. Reports of LLMs leaking sensitive data - like passwords - keep surfacing. While many of those claims aren't rock-solid, try bypassing your go-to model's guardrails and asking it to guess your password. Thanks to its memory and inference power, you might be surprised how close it gets.

More importantly, as the use of LLMs spreads, we're providing more and more information. This is a real problem for many companies, which are understandably anything but excited about the potential risk of exposing confidential data to third parties.
Larger companies have likely been flexing their legal teams muscle to set up processes to evaluate providers and draft agreements that ensure data is protected and safe. Similarly, providers have started offering solutions to meet these requirements, such as:

- Private cloud or on-premise models
- Model and data isolation
- Access control
- Data minimisation and smart routing

Solutions like these can satisfy specific needs, but the landscape is multifaceted. Much depends on the organisation's appetite for innovation, governance setup, and the specific regulatory frameworks involved - especially in sensitive fields like healthcare and finance.

![Image](/lovable-uploads/chart.png)

What about smaller companies?

This is where the waters get murkier. The rapidly evolving landscape leaves little room for a comprehensive understanding of how to safely integrate LLMs into operations. Innovation is coming weekly at a questionable signal to noise ratio, the maturity landscape of tools is evolving, and it's easy to get carried away - by either enthusiasm or concern.

## So what: shaping the Intelligence Stack
If there's one gap that's becoming increasingly visible, it's the lack of AI-native infrastructure tailored to the needs of mid-market companies. While large enterprises have the legal and financial resources to adopt and adapt foundational models with privacy-preserving infrastructure, mid-market companies are left with far less space of manoeuvre.

A more pragmatic view is starting to take shape: the most effective solutions won't come from monolithic LLMs, but from modular, hybrid systems - intelligent, yet purposefully constrained. These systems will combine smaller models trained on a company's internal processes with foundational models used selectively for reasoning and planning - within clear boundaries. Crucially, they'll need to operate without indiscriminately pushing sensitive data to the cloud.

The aim isn't just to build smarter assistants, but systems that can reliably operate within a company's internal context - its workflows, domain knowledge, and operational quirks.

A privacy-safe, locally adapted stack combining:

- Open-source LLMs or distilled variants running on-prem / cloud VPC

- Task-specific SMLs for extraction and prediction

- An orchestration layer to blend reasoning, retrieval, and human-in-the-loop

We don't need general artificial intelligence everywhere. What we need is an intelligence stack - where plenty of fruit comes just thanks to bees that pollinates with just 1 million neurons.
