import React, { useState, useEffect, useRef } from 'react';
import { 
  GraduationCap, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  Send, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  RotateCcw, 
  BookOpen, 
  Award, 
  Lightbulb,
  FileCheck,
  ChevronRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { speech } from '../../utils/speech';
import { SPOKEN_SCENARIOS, STUDY_TOPICS } from '../../services/studyData';
import { chatWithEnglishTutor, analyzeEnglishSentence } from '../../services/aiEngine';

export default function StudyTrainer({ language }) {
  const [activeModule, setActiveModule] = useState('voice'); // 'voice', 'grammar', 'quiz'

  // ---------------------------------------------------------
  // 1. SPOKEN ENGLISH STATE
  // ---------------------------------------------------------
  const [selectedScenarioId, setSelectedScenarioId] = useState('interview');
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isAiThinking, setIsAiThinking] = useState(false);
  const [fluencyLevel, setFluencyLevel] = useState('B2 (Upper Intermediate)');
  const [micError, setMicError] = useState(null);
  const chatBottomRef = useRef(null);

  const currentScenario = SPOKEN_SCENARIOS.find(s => s.id === selectedScenarioId) || SPOKEN_SCENARIOS[0];

  useEffect(() => {
    setMessages([
      {
        sender: 'ai',
        text: currentScenario.initialMessage,
        feedback: null,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
    speech.speak(currentScenario.initialMessage);
  }, [selectedScenarioId]);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (textToSend) => {
    const message = textToSend || inputText;
    if (!message.trim()) return;

    const userMsg = {
      sender: 'user',
      text: message,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsAiThinking(true);

    try {
      const response = await chatWithEnglishTutor(messages, message, selectedScenarioId);
      const aiMsg = {
        sender: 'ai',
        text: response.reply,
        feedback: response.feedback,
        time: response.timestamp
      };
      setMessages((prev) => [...prev, aiMsg]);
      speech.speak(response.reply);
    } catch (err) {
      console.error(err);
    } finally {
      setIsAiThinking(false);
    }
  };

  const toggleMic = () => {
    if (isListening) {
      speech.stopListening();
      setIsListening(false);
    } else {
      setMicError(null);
      setIsListening(true);
      speech.startListening(
        (result) => {
          if (result.final) {
            setInputText(result.final);
            handleSendMessage(result.final);
            setIsListening(false);
          } else {
            setInputText(result.interim);
          }
        },
        (error) => {
          setMicError('Microphone permission or browser SpeechRecognition issue. You can still type below!');
          setIsListening(false);
        },
        () => {
          setIsListening(false);
        }
      );
    }
  };

  // ---------------------------------------------------------
  // 2. GRAMMAR DOCTOR STATE
  // ---------------------------------------------------------
  const [grammarInput, setGrammarInput] = useState('I did not went to college yesterday because myself is sick and he don\'t know about it.');
  const [grammarResult, setGrammarResult] = useState(null);
  const [isCheckingGrammar, setIsCheckingGrammar] = useState(false);

  const handleGrammarCheck = async () => {
    if (!grammarInput.trim()) return;
    setIsCheckingGrammar(true);
    try {
      const res = await analyzeEnglishSentence(grammarInput);
      setGrammarResult(res);
    } catch (e) {
      console.error(e);
    } finally {
      setIsCheckingGrammar(false);
    }
  };

  // ---------------------------------------------------------
  // 3. STUDY & QUIZ HUB STATE
  // ---------------------------------------------------------
  const [selectedTopicId, setSelectedTopicId] = useState('ai-basics');
  const [activeQuizIndex, setActiveQuizIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [quizScore, setQuizScore] = useState(0);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [flippedCardIndex, setFlippedCardIndex] = useState(null);

  const currentTopic = STUDY_TOPICS.find(t => t.id === selectedTopicId) || STUDY_TOPICS[0];
  const currentQuestion = currentTopic.quiz[activeQuizIndex];

  const handleAnswerSelect = (optionIndex) => {
    if (isAnswerSubmitted) return;
    setSelectedOption(optionIndex);
    setIsAnswerSubmitted(true);

    if (optionIndex === currentQuestion.answer) {
      setQuizScore((prev) => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    setSelectedOption(null);
    setIsAnswerSubmitted(false);

    if (activeQuizIndex + 1 < currentTopic.quiz.length) {
      setActiveQuizIndex((prev) => prev + 1);
    } else {
      setIsQuizCompleted(true);
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  const handleResetQuiz = () => {
    setActiveQuizIndex(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setQuizScore(0);
    setIsQuizCompleted(false);
  };

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-8">
      {/* Module Navigation Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-500/30 text-emerald-800 dark:text-emerald-300 text-xs font-semibold uppercase tracking-wider mb-2">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>AI English & Learning Academy</span>
          </div>
          <h1 className="text-2xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {language === 'ta' ? 'ஆங்கில & கல்வி பயிற்சி தளம்' : 'AI English Coach & Study Trainer'}
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
            {language === 'ta'
              ? 'குரல் வழியே ஆங்கிலம் பேசுங்கள், இலக்கணப் பிழைகளைத் திருத்துங்கள், வினாடி வினா மூலம் படியுங்கள்.'
              : 'Interactive spoken English voice simulator, instant grammar repair with Tamil explanations, and smart study flashcards.'}
          </p>
        </div>

        {/* 3 Main Tab Buttons */}
        <div className="flex items-center gap-1.5 p-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs rounded-2xl">
          <button
            onClick={() => setActiveModule('voice')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
              activeModule === 'voice'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Mic className="w-3.5 h-3.5" />
            <span>Spoken English Voice</span>
          </button>
          <button
            onClick={() => setActiveModule('grammar')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
              activeModule === 'grammar'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <FileCheck className="w-3.5 h-3.5" />
            <span>Grammar & Tamil Help</span>
          </button>
          <button
            onClick={() => setActiveModule('quiz')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
              activeModule === 'quiz'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Study Hub & Quizzes</span>
          </button>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 1. SPOKEN ENGLISH VOICE TAB */}
      {/* ======================================================== */}
      {activeModule === 'voice' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Scenarios Selector & Fluency Badge */}
          <div className="lg:col-span-4 space-y-4">
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Fluency Assessment</span>
                <span className="px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 border border-emerald-200 dark:border-emerald-500/40 text-emerald-800 dark:text-emerald-300 text-xs font-bold">
                  {fluencyLevel}
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Practice daily conversation, job interviews, or IELTS speaking. The AI listens, speaks back, and corrects your grammar in real time.
              </p>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 px-1">
                Select Conversation Scenario:
              </label>
              {SPOKEN_SCENARIOS.map((sc) => (
                <button
                  key={sc.id}
                  onClick={() => setSelectedScenarioId(sc.id)}
                  className={`w-full p-4 rounded-xl text-left transition border cursor-pointer ${
                    selectedScenarioId === sc.id
                      ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-500/60 text-slate-900 dark:text-white shadow-xs'
                      : 'bg-white dark:bg-slate-900/40 border-slate-200 dark:border-slate-800/80 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-900'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-slate-900 dark:text-white">{sc.title}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-emerald-700 dark:text-emerald-400 font-mono font-bold">
                      {sc.difficulty}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2">{sc.description}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Right: Live Interactive Voice & Text Dialogue */}
          <div className="lg:col-span-8 flex flex-col h-[620px] rounded-2xl bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 shadow-sm dark:shadow-none overflow-hidden">
            {/* Header info */}
            <div className="px-6 py-4 bg-slate-50 dark:bg-slate-950/80 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <span>{currentScenario.title}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 font-bold">
                    AI Active Voice
                  </span>
                </h3>
                <span className="text-xs text-slate-500 dark:text-slate-400">💡 {currentScenario.tips}</span>
              </div>
              <button
                onClick={() => setMessages([{ sender: 'ai', text: currentScenario.initialMessage, time: 'Just now' }])}
                className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition cursor-pointer"
                title="Restart Conversation"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Messages Scroll Area */}
            <div className="flex-1 p-6 overflow-y-auto space-y-4">
              {messages.map((m, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] text-slate-500">{m.sender === 'user' ? 'You' : 'AI English Coach'}</span>
                    <span className="text-[10px] text-slate-400 font-mono">{m.time}</span>
                  </div>
                  <div
                    className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed ${
                      m.sender === 'user'
                        ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-br-sm shadow-sm'
                        : 'bg-slate-100 dark:bg-slate-800/90 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-700/80 rounded-bl-sm'
                    }`}
                  >
                    {m.text}

                    {/* Audio read button */}
                    {m.sender === 'ai' && (
                      <button
                        onClick={() => speech.speak(m.text)}
                        className="mt-2 text-xs flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400 hover:text-emerald-600 dark:hover:text-emerald-300 font-semibold cursor-pointer"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                        <span>Listen Again</span>
                      </button>
                    )}
                  </div>

                  {/* Immediate grammar tip from AI */}
                  {m.feedback && (
                    <div className="mt-1.5 max-w-[85%] p-2 rounded-lg bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-500/30 text-[11px] text-purple-800 dark:text-purple-300 flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400 shrink-0" />
                      <span>{m.feedback}</span>
                    </div>
                  )}
                </div>
              ))}

              {isAiThinking && (
                <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 p-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Coach is analyzing pronunciation & composing reply...</span>
                </div>
              )}
              <div ref={chatBottomRef} />
            </div>

            {/* Quick Answer Suggestion Pills */}
            <div className="px-6 py-2 bg-slate-50 dark:bg-slate-950/60 border-t border-slate-200 dark:border-slate-800/60 flex items-center gap-2 overflow-x-auto">
              <span className="text-[11px] text-slate-500 uppercase font-bold shrink-0">Hints:</span>
              {currentScenario.suggestedResponses.map((hint, idx) => (
                <button
                  key={idx}
                  onClick={() => setInputText(hint)}
                  className="text-xs px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-700 whitespace-nowrap transition cursor-pointer"
                >
                  "{hint}"
                </button>
              ))}
            </div>

            {/* Input Bar with Voice Mic Button */}
            <div className="p-4 bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800">
              {micError && (
                <div className="text-xs text-amber-600 dark:text-amber-400 mb-2 flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{micError}</span>
                </div>
              )}
              <div className="flex items-center gap-3">
                <button
                  onClick={toggleMic}
                  className={`p-3 rounded-xl transition cursor-pointer flex items-center justify-center shrink-0 ${
                    isListening
                      ? 'bg-red-600 text-white animate-pulse shadow-md shadow-red-600/30'
                      : 'bg-emerald-50 dark:bg-emerald-600/20 hover:bg-emerald-100 dark:hover:bg-emerald-600/30 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/30'
                  }`}
                  title={isListening ? 'Listening... click to stop' : 'Click to speak via Microphone'}
                >
                  {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                </button>

                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder={isListening ? "Listening to your voice... Speak now!" : "Speak with the mic or type your response in English..."}
                  className="flex-1 px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                />

                <button
                  onClick={() => handleSendMessage()}
                  disabled={!inputText.trim()}
                  className="p-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition cursor-pointer disabled:opacity-40"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 2. GRAMMAR DOCTOR & TAMIL EXPLANATION TAB */}
      {/* ======================================================== */}
      {activeModule === 'grammar' && (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800/80 shadow-sm dark:shadow-none space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-400">
                {language === 'ta' ? 'ஆங்கில வாக்கியத்தை சரிபார்க்கவும்:' : 'Paste any sentence or paragraph to inspect:'}
              </label>
              <span className="text-xs text-emerald-700 dark:text-emerald-400 font-bold">Bilingual Tamil & English Insights</span>
            </div>

            <textarea
              value={grammarInput}
              onChange={(e) => setGrammarInput(e.target.value)}
              rows={4}
              placeholder="e.g. I did not went there yesterday because he don't like it..."
              className="w-full p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-sm text-slate-900 dark:text-white leading-relaxed focus:outline-none focus:border-emerald-500"
            />

            <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500 dark:text-slate-400">Sample errors:</span>
                <button
                  onClick={() => setGrammarInput("Myself is Vignesh and I did not received the email.")}
                  className="text-xs px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white"
                >
                  "Myself is..."
                </button>
                <button
                  onClick={() => setGrammarInput("He don't know the answer and revert back later.")}
                  className="text-xs px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white"
                >
                  "He don't know..."
                </button>
              </div>

              <button
                onClick={handleGrammarCheck}
                disabled={isCheckingGrammar || !grammarInput.trim()}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-md shadow-emerald-600/20 transition flex items-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isCheckingGrammar ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Analyzing...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Check & Polish English</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Grammar Analysis Output */}
          {grammarResult && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left: Issues & Tamil Explanation */}
              <div className="p-6 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-amber-500" />
                    <span>Mistakes Detected & Tamil Guide</span>
                  </h3>
                  <span className="text-xs px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-emerald-700 dark:text-emerald-400 font-mono font-bold">
                    Score: {grammarResult.fluencyScore}/100
                  </span>
                </div>

                {grammarResult.issues.length > 0 ? (
                  <div className="space-y-3">
                    {grammarResult.issues.map((iss, i) => (
                      <div key={i} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2">
                        <div className="text-xs font-bold text-red-600 dark:text-red-400 flex items-center gap-1.5">
                          <span>❌ Mistake:</span>
                          <span>{iss.mistake}</span>
                        </div>
                        <div className="text-xs font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
                          <span>✅ Fix:</span>
                          <span>{iss.fix}</span>
                        </div>
                        <div className="p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-500/20 text-xs text-emerald-900 dark:text-emerald-200 leading-relaxed font-sans">
                          <span className="font-bold block text-emerald-700 dark:text-emerald-300 mb-0.5">தமிழ் விளக்கம்:</span>
                          {iss.tamilExplanation}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-6 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-500/30 text-emerald-800 dark:text-emerald-300 text-sm flex items-center gap-3">
                    <CheckCircle2 className="w-6 h-6 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <div>
                      <div className="font-bold">Excellent English!</div>
                      <div className="text-xs text-emerald-700 dark:text-emerald-400/80 mt-1">{grammarResult.tamilHelp}</div>
                    </div>
                  </div>
                )}
              </div>

              {/* Right: Polished Native Variations */}
              <div className="p-6 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                  <span>3 Native Polished Versions</span>
                </h3>

                <div className="space-y-3">
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-400">
                      Formal & Standard
                    </span>
                    <p className="text-sm text-slate-800 dark:text-slate-200">{grammarResult.improvedVersions.formal}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                      Native Casual (Everyday Spoken)
                    </span>
                    <p className="text-sm text-slate-800 dark:text-slate-200">{grammarResult.improvedVersions.casual}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
                      Executive / Business Professional
                    </span>
                    <p className="text-sm text-slate-800 dark:text-slate-200">{grammarResult.improvedVersions.business}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ======================================================== */}
      {/* 3. STUDY HUB, FLASHCARDS & QUIZ TAB */}
      {/* ======================================================== */}
      {activeModule === 'quiz' && (
        <div className="space-y-8">
          {/* Topic Selector Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mr-2">Subject:</span>
            {STUDY_TOPICS.map((topic) => (
              <button
                key={topic.id}
                onClick={() => {
                  setSelectedTopicId(topic.id);
                  handleResetQuiz();
                  setFlippedCardIndex(null);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                  selectedTopicId === topic.id
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-xs'
                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800'
                }`}
              >
                {topic.title}
              </button>
            ))}
          </div>

          {/* Topic Summary & Key takeaways */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
              <Lightbulb className="w-4 h-4" />
              <span>Concept Summary (Feynman Technique)</span>
            </div>
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed max-w-4xl">
              {currentTopic.summary}
            </p>
            <div className="grid md:grid-cols-2 gap-3 pt-2">
              {currentTopic.keyPoints.map((pt, i) => (
                <div key={i} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80 text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2">
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">•</span>
                  <span>{pt}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Flashcards */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Interactive Memory Flashcards (Click to flip)</span>
              </h3>
              <span className="text-xs text-slate-500">3 Flashcards Available</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {currentTopic.flashcards.map((card, idx) => {
                const isFlipped = flippedCardIndex === idx;
                return (
                  <div
                    key={idx}
                    onClick={() => setFlippedCardIndex(isFlipped ? null : idx)}
                    className={`p-6 rounded-2xl border transition-all duration-300 cursor-pointer min-h-[160px] flex flex-col justify-between ${
                      isFlipped
                        ? 'bg-gradient-to-b from-emerald-50 to-white dark:from-emerald-950/70 dark:to-slate-900 border-emerald-300 dark:border-emerald-500/50 shadow-md'
                        : 'bg-white dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 shadow-xs'
                    }`}
                  >
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 block mb-2">
                        {isFlipped ? 'Answer Key' : `Question ${idx + 1}`}
                      </span>
                      <p className={`text-sm leading-relaxed ${isFlipped ? 'text-emerald-900 dark:text-emerald-200 font-medium' : 'text-slate-900 dark:text-white font-bold'}`}>
                        {isFlipped ? card.a : card.q}
                      </p>
                    </div>
                    <div className="text-[10px] text-slate-400 dark:text-slate-500 font-mono mt-4 text-right">
                      {isFlipped ? 'Click to flip back' : 'Click to reveal answer ➔'}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Interactive MCQ Quiz */}
          <div className="p-6 md:p-8 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-500" />
                <h3 className="text-base font-bold text-slate-900 dark:text-white">Interactive Mastery Quiz</h3>
              </div>
              <div className="text-xs font-mono text-slate-600 dark:text-slate-400">
                Score: <span className="text-emerald-600 dark:text-emerald-400 font-bold">{quizScore}</span> / {currentTopic.quiz.length}
              </div>
            </div>

            {!isQuizCompleted ? (
              <div className="space-y-6">
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 mb-2">
                    Question {activeQuizIndex + 1} of {currentTopic.quiz.length}
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                    {currentQuestion.question}
                  </h4>
                </div>

                {/* Option choices */}
                <div className="space-y-3">
                  {currentQuestion.options.map((option, optIdx) => {
                    let optionStyle = 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900';
                    if (isAnswerSubmitted) {
                      if (optIdx === currentQuestion.answer) {
                        optionStyle = 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 text-emerald-900 dark:text-emerald-200 font-bold shadow-xs';
                      } else if (optIdx === selectedOption) {
                        optionStyle = 'bg-red-50 dark:bg-red-950/60 border-red-400 dark:border-red-500 text-red-900 dark:text-red-200';
                      }
                    }

                    return (
                      <button
                        key={optIdx}
                        disabled={isAnswerSubmitted}
                        onClick={() => handleAnswerSelect(optIdx)}
                        className={`w-full p-4 rounded-xl border text-left text-sm transition cursor-pointer flex items-center justify-between ${optionStyle}`}
                      >
                        <span>{option}</span>
                        {isAnswerSubmitted && optIdx === currentQuestion.answer && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Explanation upon submit */}
                {isAnswerSubmitted && (
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-3">
                    <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                      <span className="font-bold text-emerald-700 dark:text-emerald-400">Explanation: </span>
                      {currentQuestion.explanation}
                    </p>
                    <button
                      onClick={handleNextQuestion}
                      className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition cursor-pointer flex items-center gap-2"
                    >
                      <span>{activeQuizIndex + 1 < currentTopic.quiz.length ? 'Next Question' : 'View Results'}</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto text-2xl font-black">
                  🎉
                </div>
                <h4 className="text-2xl font-extrabold text-slate-900 dark:text-white">Quiz Completed!</h4>
                <p className="text-slate-600 dark:text-slate-400 text-sm max-w-md mx-auto">
                  You scored <span className="text-emerald-600 dark:text-emerald-400 font-bold text-lg">{quizScore} out of {currentTopic.quiz.length}</span>! Keep practicing daily to maintain fluency and mastery.
                </p>
                <button
                  onClick={handleResetQuiz}
                  className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition cursor-pointer"
                >
                  Try Again
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
