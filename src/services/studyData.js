// Study data, English speaking scenarios, grammar checks & interactive quizzes

export const SPOKEN_SCENARIOS = [
  {
    id: 'interview',
    title: 'Job Interview Simulation',
    difficulty: 'Intermediate / B2',
    description: 'Practice self-introduction, answering strengths & weaknesses, and behavioral questions.',
    initialMessage: "Hello! Welcome to our interview. Could you please introduce yourself and tell me about your background?",
    suggestedResponses: [
      "Hi! Thank you for having me. My name is...",
      "Sure, I have been working in software development for...",
      "I graduated in computer science and I am passionate about AI..."
    ],
    tips: "Focus on speaking in complete sentences and maintain clear pacing."
  },
  {
    id: 'casual-coffee',
    title: 'Casual Cafe & Friend Talk',
    difficulty: 'Beginner / A2-B1',
    description: 'Order food, talk about hobbies, movies, weekend plans, and casual daily topics.',
    initialMessage: "Hey there! Long time no see. How has your week been going so far?",
    suggestedResponses: [
      "Hey! It's been pretty busy with work, but good.",
      "Not too bad! I spent the weekend learning AI tools.",
      "Things are great! Are you free to grab a cup of coffee?"
    ],
    tips: "Use contractions like 'I'm', 'It's', and friendly casual expressions."
  },
  {
    id: 'ielts-speaking',
    title: 'IELTS Speaking Part 2',
    difficulty: 'Advanced / C1',
    description: 'Describe a memorable journey or an inspiring person for 2 minutes with structured vocabulary.',
    initialMessage: "Good morning. Please describe a journey or trip you went on that you found memorable. You should mention where you went, with whom, and why it was special.",
    suggestedResponses: [
      "I would like to talk about a memorable expedition I took to Ooty...",
      "One of the most unforgettable journeys of my life was when...",
      "To begin with, the trip took place two years ago when my family decided to..."
    ],
    tips: "Use transition connectors like 'Furthermore', 'Consequently', and 'In retrospect'."
  },
  {
    id: 'tamil-english',
    title: 'Tamil to Spoken English Bridge (தமிழ் ➔ English)',
    difficulty: 'All Levels',
    description: 'Learn how to translate your Tamil thoughts into natural native English sentences without mother-tongue influence.',
    initialMessage: "வணக்கம்! நீங்கள் தமிழில் நினைக்கும் விஷயங்களை இயல்பான ஆங்கிலத்தில் பேச பயிற்சி செய்யலாம். What would you like to talk about today?",
    suggestedResponses: [
      "I want to practice how to talk to clients in English.",
      "I feel nervous when speaking English in front of others.",
      "Can you teach me daily conversation phrases?"
    ],
    tips: "Avoid direct literal word-by-word translation. Think in English sentence structures (Subject + Verb + Object)."
  }
];

export const GRAMMAR_COMMON_MISTAKES = [
  {
    trigger: /did\s+not\s+(went|saw|ate|came|did)/i,
    mistake: "Using past tense verb after 'did not'",
    fix: "Use base verb after 'did not'. For example: 'did not go' instead of 'did not went'.",
    tamilExplanation: "'did not' அல்லது 'didn't' வந்த பிறகு வினைச்சொல் (verb) எப்போதுமே நிகழ்கால base form-ல் (go, see, eat) இருக்க வேண்டும். 'did not went' தப்பு, 'did not go' தான் சரி."
  },
  {
    trigger: /myself\s+is/i,
    mistake: "Saying 'Myself is [Name]'",
    fix: "Say 'I am [Name]' or 'My name is [Name]'.",
    tamilExplanation: "'Myself is...' என்று நம்மை அறிமுகப்படுத்தக் கூடாது. அதற்கு பதிலாக 'My name is...' அல்லது 'I am...' என்று சொல்ல வேண்டும்."
  },
  {
    trigger: /he\s+don't|she\s+don't|it\s+don't/i,
    mistake: "Using 'don't' with third-person singular (He/She/It)",
    fix: "Use 'doesn't' (does not) with He, She, and It.",
    tamilExplanation: "He, She, It வரும்போது 'don't' வரக்கூடாது, 'doesn't' (does not) தான் பயன்படுத்த வேண்டும். எ.கா: 'He doesn't know'."
  },
  {
    trigger: /revert\s+back/i,
    mistake: "Redundant phrase 'revert back'",
    fix: "Just say 'revert' or 'reply'.",
    tamilExplanation: "'Revert' என்ற சொல்லுக்கே 'திரும்பி பதிலளிப்பது' என்று பொருள். எனவே மீண்டும் 'back' என்று சேர்க்கத் தேவையில்லை."
  },
  {
    trigger: /pass\s+out/i,
    mistake: "Saying 'I passed out from college'",
    fix: "Say 'I graduated from college' ('pass out' means to faint/lose consciousness).",
    tamilExplanation: "ஆங்கிலத்தில் 'pass out' என்றால் மயக்கமடைவது (faint) என்று அர்த்தம். கல்லூரியில் படித்து முடித்ததற்கு 'I graduated' என்று தான் சொல்ல வேண்டும்."
  }
];

export const STUDY_TOPICS = [
  {
    id: 'ai-basics',
    title: 'Artificial Intelligence & Machine Learning',
    subject: 'Technology',
    summary: 'AI enables computers to perform tasks that typically require human intelligence, such as visual perception, speech recognition, decision-making, and language translation.',
    keyPoints: [
      'Machine Learning: Algorithms that learn from data patterns without explicit programming.',
      'Neural Networks: Layers of mathematical nodes inspired by biological neurons.',
      'LLMs (Large Language Models): Deep models trained on billions of tokens to generate text, code, and reasoning.',
      'Transformer Architecture: Uses Self-Attention mechanism to process words in parallel.'
    ],
    flashcards: [
      { q: 'What is the core idea of a Transformer in AI?', a: 'Self-Attention mechanism, allowing the model to weigh the importance of all words in a sentence simultaneously.' },
      { q: 'What is the difference between Supervised and Unsupervised Learning?', a: 'Supervised uses labeled training data; Unsupervised finds hidden patterns in unlabeled data.' },
      { q: 'What does "Inference" mean in ML?', a: 'Running a trained model to make predictions on new, unseen data.' }
    ],
    quiz: [
      {
        question: 'Which neural network architecture powers modern LLMs like Gemini and GPT?',
        options: ['Convolutional Neural Network (CNN)', 'Transformer Architecture', 'Recurrent Neural Network (RNN)', 'Decision Forest'],
        answer: 1,
        explanation: 'Transformers, introduced in 2017 with self-attention, are the foundation of modern large language models.'
      },
      {
        question: 'What is "Prompt Engineering"?',
        options: ['Soldering GPU computer chips', 'Writing structured instructions to guide AI responses', 'Building network cables', 'Designing website logos'],
        answer: 1,
        explanation: 'Prompt engineering is the art of crafting inputs to get optimal results from AI models.'
      },
      {
        question: 'What is "Fine-Tuning" in AI?',
        options: ['Tuning the audio volume', 'Adapting a pre-trained model on specialized custom data', 'Cleaning the computer monitor', 'Changing the website font'],
        answer: 1,
        explanation: 'Fine-tuning trains an already capable base model on domain-specific datasets to excel at niche tasks.'
      }
    ]
  },
  {
    id: 'english-grammar',
    title: 'Essential English Tenses & Vocabulary',
    subject: 'Languages',
    summary: 'Mastering the 12 English tenses and active/passive voice empowers confident public speaking, professional emails, and IELTS examination success.',
    keyPoints: [
      'Present Simple: Habits and general truths ("The sun rises in the east").',
      'Present Continuous: Actions happening right now ("I am studying").',
      'Present Perfect: Past actions with present relevance ("I have finished my homework").',
      'Active Voice puts the doer first, making sentences punchy and direct.'
    ],
    flashcards: [
      { q: 'When do we use "have been" vs "had been"?', a: '"Have been" refers to an action continuing up to the present. "Had been" refers to an action completed before another past event.' },
      { q: 'What is an Oxford comma?', a: 'The comma before the conjunction (and/or) in a list of three or more items (e.g. apples, oranges, and bananas).' },
      { q: 'What does "Eloquent" mean?', a: 'Fluent, persuasive, and graceful in speaking or writing.' }
    ],
    quiz: [
      {
        question: 'Choose the grammatically correct sentence:',
        options: [
          'She don’t like to drink coffee.',
          'She doesn’t likes to drink coffee.',
          'She doesn’t like to drink coffee.',
          'She did not liked coffee.'
        ],
        answer: 2,
        explanation: 'With third person singular (she), we use "doesn\'t" followed by base verb "like".'
      },
      {
        question: 'Which word is an antonym (opposite) of "Fragile"?',
        options: ['Delicate', 'Sturdy', 'Brittle', 'Feeble'],
        answer: 1,
        explanation: 'Fragile means easily broken; Sturdy means strongly built and durable.'
      },
      {
        question: 'Identify the sentence in Passive Voice:',
        options: [
          'The chef cooked a delicious meal.',
          'A delicious meal was cooked by the chef.',
          'The chef is cooking tonight.',
          'Everyone loved the meal.'
        ],
        answer: 1,
        explanation: 'In "A delicious meal was cooked by the chef", the receiver of the action is the subject.'
      }
    ]
  },
  {
    id: 'web-dev',
    title: 'Modern Web Development (HTML5, CSS, React)',
    subject: 'Programming',
    summary: 'The modern web stack combines semantic HTML, responsive Tailwind CSS styling, and component-based React for building high-performance web applications.',
    keyPoints: [
      'Virtual DOM: React compares memory snapshots to efficiently update only changed elements.',
      'Tailwind CSS: Utility-first CSS framework providing speed and flexibility without writing raw CSS files.',
      'Responsive Design: Media queries and flexbox/grid ensuring seamless display across all devices.',
      'State Management: Keeping UI synced with user actions and backend data.'
    ],
    flashcards: [
      { q: 'What is JSX in React?', a: 'A syntax extension for JavaScript that looks like HTML and allows writing markup directly inside JS.' },
      { q: 'What does the useEffect hook do?', a: 'It performs side effects in function components, such as data fetching, timers, or DOM subscriptions.' },
      { q: 'What is the purpose of meta viewport tag in HTML?', a: 'It controls the page dimensions and scaling on mobile browser viewports.' }
    ],
    quiz: [
      {
        question: 'What is the primary benefit of React hooks introduced in React 16.8?',
        options: [
          'They allow using state and lifecycle features without writing class components',
          'They replace HTML entirely',
          'They make websites load without an internet connection',
          'They increase the price of server hosting'
        ],
        answer: 0,
        explanation: 'Hooks allow function components to manage state and lifecycle without boilerplate class syntax.'
      },
      {
        question: 'In Tailwind CSS, which class sets display flex and centers items horizontally and vertically?',
        options: ['center-all', 'flex items-center justify-center', 'align-center-both', 'display-grid-center'],
        answer: 1,
        explanation: '"flex items-center justify-center" applies flexbox alignment on both cross and main axes.'
      }
    ]
  }
];
