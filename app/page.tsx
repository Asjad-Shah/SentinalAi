'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import DemoModal from '../components/DemoModal'
import { 
  ArrowRight, ChevronDown, ChevronUp,
  FileText,
  BarChart3, Network, Lock, TrendingUp, Shield,
  Zap, Database, Brain, Users
} from 'lucide-react'

const rotatingWords = [
  ['Fraud', 'Detection'],
  ['Risk', 'Scoring'],
  ['Loan', 'Protection'],
  ['Application', 'Screening'],
  ['Anomaly', 'Detection']
]

// Product tabs (moved outside component to avoid TDZ issues)
const productTabs = [
  { name: 'Application Screening', icon: FileText },
  { name: 'Risk Scoring', icon: BarChart3 },
  { name: 'Explainable AI', icon: Brain },
  { name: 'Pre-Approval Detection', icon: Shield },
  { name: 'Pre-Funding Verification', icon: Lock },
  { name: 'Ensemble Models', icon: Database },
  { name: 'Real-time API', icon: Zap },
  { name: 'Feedback Loop', icon: TrendingUp },
  { name: 'Compliance Reporting', icon: FileText },
  { name: 'MLOps Pipeline', icon: Network }
]

export default function Home() {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false)
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [expandedLayer, setExpandedLayer] = useState<number | null>(0)
  const [expandedAgent, setExpandedAgent] = useState<number | null>(0)
  const [activeProductTab, setActiveProductTab] = useState(0)
  const [isVisible, setIsVisible] = useState<{ [key: string]: boolean }>({})
  const [isPaused, setIsPaused] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [typedWord1, setTypedWord1] = useState('')
  const [typedWord2, setTypedWord2] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  // Typing animation effect
  useEffect(() => {
    const currentWords = rotatingWords[currentWordIndex]
    setTypedWord1('')
    setTypedWord2('')
    setIsTyping(true)

    // Type first word
    let charIndex1 = 0
    const typeInterval1 = setInterval(() => {
      if (charIndex1 < currentWords[0].length) {
        setTypedWord1(currentWords[0].substring(0, charIndex1 + 1))
        charIndex1++
      } else {
        clearInterval(typeInterval1)
        // Start typing second word after a short delay
        setTimeout(() => {
          let charIndex2 = 0
          const typeInterval2 = setInterval(() => {
            if (charIndex2 < currentWords[1].length) {
              setTypedWord2(currentWords[1].substring(0, charIndex2 + 1))
              charIndex2++
            } else {
              clearInterval(typeInterval2)
              setIsTyping(false)
            }
          }, 80) // Typing speed: 80ms per character
        }, 200) // Delay before starting second word
      }
    }, 80) // Typing speed: 80ms per character

    return () => {
      clearInterval(typeInterval1)
    }
  }, [currentWordIndex])

  // Auto-rotate words
  useEffect(() => {
    const totalTypingTime = rotatingWords[currentWordIndex][0].length * 80 + 
                            rotatingWords[currentWordIndex][1].length * 80 + 
                            500 // Extra time to display
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % rotatingWords.length)
    }, totalTypingTime + 2000) // Wait for typing to complete + 2 seconds display time
    return () => clearInterval(interval)
  }, [currentWordIndex])

  // Auto-rotate product tabs (slider) with smooth transitions
  useEffect(() => {
    if (isPaused) return
    const interval = setInterval(() => {
      setIsTransitioning(true)
      setTimeout(() => {
        setActiveProductTab((prev) => (prev + 1) % productTabs.length)
        setTimeout(() => setIsTransitioning(false), 100)
      }, 800) // Slide out duration - slower
    }, 6000) // Change every 6 seconds (slower)
    return () => clearInterval(interval)
  }, [isPaused, productTabs.length])

  // Handle manual tab change with transition
  const handleTabChange = (idx: number) => {
    if (idx === activeProductTab) return
    setIsTransitioning(true)
    setTimeout(() => {
      setActiveProductTab(idx)
      setTimeout(() => setIsTransitioning(false), 100)
    }, 800) // Slide out duration - slower
  }

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({
              ...prev,
              [entry.target.id]: true,
            }))
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    )

    const elements = document.querySelectorAll('[data-animate]')
    elements.forEach((el) => observer.observe(el))

    // Check if stats section is already visible on mount
    const statsElement = document.getElementById('stats')
    if (statsElement) {
      const rect = statsElement.getBoundingClientRect()
      const isInViewport = rect.top < window.innerHeight && rect.bottom > 0
      if (isInViewport) {
        setIsVisible((prev) => ({
          ...prev,
          stats: true,
        }))
      }
    }

    return () => {
      elements.forEach((el) => observer.unobserve(el))
    }
  }, [])


  const companyLogos = [
    'Financial Institutions', 'Lending Platforms', 'Credit Unions', 'Online Lenders',
    'Loan Servicers', 'Fintech Companies', 'Banks', 'Credit Providers'
  ]

  // productTabs moved to module scope above

  const aiAgents = [
    {
      title: 'Fraud Detection Co-Pilot',
      description: 'Acts as an intelligent ride-along partner for your review team, providing real-time fraud probability scores (0.0 to 1.0) and plain-English explanations. Detects high-risk and fraudulent loan applications at pre-funding stage, helping your team make faster, more accurate decisions with data-driven insights.',
      expanded: expandedAgent === 0
    },
    {
      title: 'Applicant Persona Profiler',
      description: 'Identifies three distinct applicant personas: "Digital Ghost" (70% fraud concentration, lacks verifiable data), "High-Friction Anomaly" (abnormally slow process with long pauses), and "Safe Bet" (100% legitimate, ideal for fast-track approvals). These behavioral patterns serve as powerful leading indicators of risk.',
      expanded: expandedAgent === 1
    },
    {
      title: 'Anomaly Watchdog',
      description: 'Unsupervised Isolation Forest algorithm that studies all applications to build a mathematical profile of normal applicants. Sounds the alarm when it sees applications that are mathematically weird or do not fit in, even if it is a type of fraud never encountered before, providing crucial protection against new fraud tactics.',
      expanded: expandedAgent === 2
    },
    {
      title: 'Explainable AI Reporter',
      description: 'GenAI-powered PDF reports that translate complex model logic into plain English. For every flagged application, provides risk probability, primary risk factors (e.g., "unusually high number of digits in email address"), and mitigating factors, turning raw data into actionable intelligence.',
      expanded: expandedAgent === 3
    }
  ]

  const mlLayers = [
    {
      number: '01',
      title: 'Data Integration & Feature Engineering',
      description: 'Secure data ingestion from OLL and TLOS systems with encrypted PII handling. Transforms approximately 100 raw data points into 650+ predictive features, capturing behavioral anomalies (deltaH timing features), contact information patterns, profile stability factors, and identity verification signals.',
      expanded: expandedLayer === 0
    },
    {
      number: '02',
      title: 'Ensemble Model Architecture',
      description: 'The "Task Force" ensemble combines two detection philosophies: XGBoost "Detective" (supervised learning expert on known fraud patterns) and Isolation Forest "Watchdog" (unsupervised anomaly detector). The 50/50 ensemble score dramatically improves detection rates, achieving 50% fraud detection on test sets.',
      expanded: expandedLayer === 1
    },
    {
      number: '03',
      title: 'Real-time Inference API',
      description: 'Headless API deployment on AWS Lambda/SageMaker with secure API Gateway. Listens for new LoanApplication records, executes feature engineering pipeline, and writes FraudScore (0.0-1.0) and FraudFlag (binary) back to TLOS. Simultaneously generates GenAI-powered explanation reports via Amazon Bedrock.',
      expanded: expandedLayer === 2
    },
    {
      number: '04',
      title: 'Continuous Learning & MLOps',
      description: 'Automated feedback loop captures loan outcomes (defaults, reversals, early legal actions) to create ground-truth labels. Automated retraining pipelines detect data drift, retrain models in SageMaker, and deploy only if new model beats previous accuracy metrics. Includes CloudWatch/QuickSight dashboards for technical and business metrics.',
      expanded: expandedLayer === 3
    }
  ]

  const testimonials = [
    {
      quote: 'The AI Co-Pilot has transformed how we review applications. Getting plain-English explanations for every risk score helps our team make faster, more confident decisions.',
      author: 'Risk Review Team Lead',
      role: 'Financial Institution',
      company: 'Leading Lender'
    },
    {
      quote: 'The ensemble model approach caught fraud patterns we never would have identified manually. The 50% detection rate on unseen fraudsters is impressive.',
      author: 'Fraud Prevention Manager',
      role: 'Loan Operations',
      company: 'Credit Provider'
    },
    {
      quote: 'What sets this apart is the continuous learning. Every decision we make improves the model.',
      author: 'Chief Technology Officer',
      role: 'Fintech Platform',
      company: 'Digital Lender'
    }
  ]

  return (
    <main className="min-h-screen bg-sardine-navy text-gray-300">
      {/* Header/Navigation */}
      <header className="sticky top-0 z-50 bg-sardine-navy/95 border-b border-sardine-stats-blue/10 backdrop-blur-sm">
        <nav className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-sardine-stats-blue rounded" />
              <span className="text-xl font-bold text-white tracking-tight">Sentinel AI</span>
            </div>
            <div className="hidden md:flex items-center gap-6">
              <a href="#modular-blocks" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Capabilities</a>
              <a href="#ai-agents" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">AI Agents</a>
              <a href="#data-platform" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Technology</a>
              <a href="#stats" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Results</a>
              <a href="#testimonials" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Stories</a>
            </div>
            <div className="flex items-center">
              <button 
                onClick={() => setIsDemoModalOpen(true)}
                className="px-6 py-2.5 bg-gradient-to-r from-[#1E88E5] via-[#42A5F5] to-[#1565C0] text-white rounded-lg font-semibold text-sm tracking-wide hover:shadow-lg hover:shadow-[#1E88E5]/30 transition-all duration-300 hover:scale-105 active:scale-95"
              >
                Get a Demo
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center px-4 sm:px-6 lg:px-8 py-20 bg-gradient-to-b from-sardine-navy via-sardine-dark-blue to-sardine-navy">
        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Text Content */}
            <div className="space-y-6 md:space-y-8 animate-slide-in-left">
              <div className="space-y-4 md:space-y-6">
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight animate-fade-in">
                  The smartest platform for
                </h1>
                
                <div className="relative h-24 sm:h-28 md:h-32 lg:h-36">
                  <div className="absolute inset-0">
                    <div className="flex flex-col space-y-1">
                      <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-sardine-stats-blue leading-[1.1] tracking-tight capitalize">
                        {typedWord1}
                        {isTyping && typedWord1.length < rotatingWords[currentWordIndex][0].length && (
                          <span className="inline-block w-0.5 h-[0.9em] bg-sardine-stats-blue ml-1 animate-pulse">|</span>
                        )}
                      </div>
                      <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight capitalize">
                        {typedWord2}
                        {!isTyping && typedWord2.length === rotatingWords[currentWordIndex][1].length && (
                          <span className="inline-block w-0.5 h-[0.9em] bg-white ml-1 animate-pulse">|</span>
                        )}
                        {isTyping && typedWord1.length === rotatingWords[currentWordIndex][0].length && typedWord2.length < rotatingWords[currentWordIndex][1].length && (
                          <span className="inline-block w-0.5 h-[0.9em] bg-white ml-1 animate-pulse">|</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-base md:text-lg lg:text-xl text-gray-400 leading-relaxed max-w-2xl pt-2 animate-delay-200">
                The first AI Co-Pilot that stops fraud and explains why. Real-time fraud detection with explainable AI that acts as a ride-along partner for your review team, providing risk scores and plain-English explanations.
              </p>

              <div className="pt-2 animate-delay-300">
                <button 
                  onClick={() => setIsDemoModalOpen(true)}
                  className="px-8 py-4 bg-gradient-to-r from-[#1E88E5] via-[#42A5F5] to-[#1565C0] text-white rounded-lg font-semibold text-base md:text-lg tracking-wide hover:shadow-xl hover:shadow-[#1E88E5]/30 transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#1E88E5] focus:ring-offset-2 transform transition-bounce"
                >
                  Get a Demo →
                </button>
              </div>
            </div>

            {/* Right: Dashboard Screenshot */}
            <div className="relative animate-slide-in-right animate-delay-200">
              <div className="bg-sardine-dark-blue border border-sardine-stats-blue/10 rounded-2xl shadow-2xl overflow-hidden hover-lift transition-smooth">
                <div className="bg-[#0f172a] border-b border-sardine-stats-blue/10 px-6 py-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                    <span className="ml-4 text-sm text-gray-400 font-mono">Fraud Detection {'>'} Application Review</span>
                  </div>
                </div>
                <div className="pt-6 p-0 bg-sardine-navy/50">
                  <Image
                    src="/images/hero-application-review.png"
                    alt="Application Review Dashboard"
                    width={1200}
                    height={800}
                    className="w-full h-auto rounded-lg shadow-lg"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Company Logos */}
      <section className="py-12 md:py-16 px-4 sm:px-6 lg:px-8 bg-sardine-dark-blue border-y border-sardine-stats-blue/10 overflow-hidden" data-animate id="company-logos">
        <div className="container mx-auto max-w-7xl">
          <div className="relative">
            {/* Continuous scrolling animation */}
            <div className="flex gap-6 animate-scroll-infinite">
              {/* First set of logos */}
              {companyLogos.map((logo, idx) => (
                <div
                  key={`first-${idx}`}
                  className="group flex items-center justify-center h-16 px-6 rounded-lg border border-sardine-stats-blue/10 bg-sardine-navy hover:border-sardine-stats-blue/30 hover:bg-sardine-stats-blue/5 transition-all duration-300 cursor-pointer hover-lift flex-shrink-0"
                >
                        <span className="text-gray-400 font-semibold text-sm group-hover:text-sardine-stats-blue transition-colors duration-300 text-center whitespace-nowrap">
                    {logo}
                  </span>
                </div>
              ))}
              {/* Duplicate set for seamless loop */}
              {companyLogos.map((logo, idx) => (
                <div
                  key={`second-${idx}`}
                  className="group flex items-center justify-center h-16 px-6 rounded-lg border border-sardine-stats-blue/10 bg-sardine-navy hover:border-sardine-stats-blue/30 hover:bg-sardine-stats-blue/5 transition-all duration-300 cursor-pointer hover-lift flex-shrink-0"
                >
                        <span className="text-gray-400 font-semibold text-sm group-hover:text-sardine-stats-blue transition-colors duration-300 text-center whitespace-nowrap">
                    {logo}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Modular Building Blocks */}
      <section className="py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-sardine-navy" data-animate id="modular-blocks">
        <div className="container mx-auto max-w-7xl">
          <div className={`text-center mb-12 md:mb-16 ${
            isVisible['modular-blocks'] ? 'animate-slide-up' : 'opacity-0'
          }`}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6 leading-tight tracking-tight">
              Comprehensive <span className="text-sardine-stats-blue">fraud detection</span> capabilities
            </h2>
          </div>

          {/* Product Slider Controls */}
          <div className="flex flex-col items-center gap-6 mb-10 md:mb-12">
            {/* Dots Indicator */}
            <div className="flex items-center gap-2 flex-wrap justify-center">
              {productTabs.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => handleTabChange(idx)}
                  className={`transition-all duration-300 rounded-full focus:outline-none focus:ring-2 focus:ring-sardine-stats-blue focus:ring-offset-2 ${
                    activeProductTab === idx
                      ? 'w-3 h-3 bg-sardine-stats-blue scale-125'
                      : 'w-2 h-2 bg-sardine-stats-blue/20 hover:bg-sardine-stats-blue/50'
                  }`}
                  aria-label={`Go to ${productTabs[idx].name}`}
                />
              ))}
            </div>
            
            {/* Pause/Play Control */}
            <button
              onClick={() => setIsPaused(!isPaused)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-sardine-stats-blue/10 bg-sardine-dark-blue hover:border-sardine-stats-blue/50 hover:bg-sardine-stats-blue/5 transition-all duration-300 text-sm text-gray-300"
              aria-label={isPaused ? 'Resume auto-slide' : 'Pause auto-slide'}
            >
              {isPaused ? (
                <>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                  </svg>
                  Resume
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  Pause
                </>
              )}
            </button>
          </div>

          {/* Active Product Detail - with light blue gradient background */}
          <div className="bg-sardine-dark-blue border border-sardine-stats-blue/10 rounded-2xl p-6 md:p-8 lg:p-12 transition-smooth hover:shadow-xl hover:shadow-sardine-stats-blue/5 relative overflow-hidden">
            <div className={`grid lg:grid-cols-2 gap-8 lg:gap-12 items-center transition-all duration-1000 ease-in-out ${
              isTransitioning ? 'opacity-0 translate-x-20 scale-95' : 'opacity-100 translate-x-0 scale-100'
            }`}>
              {/* Left: Text Content */}
              <div className="space-y-4 md:space-y-6">
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight tracking-tight">
                  {productTabs[activeProductTab].name}
                </h3>
                <p className="text-base md:text-lg text-gray-300 leading-relaxed">
                  {activeProductTab === 0 && "Automatically screen loan applications in real-time as they enter the TLOS LoanApplication table. Our system triggers at pre-funding stage, flagging high-risk and fraudulent applications before they reach your review team. Integrates seamlessly into your existing OLL → TLOS loan lifecycle."}
                  {activeProductTab === 1 && "Generate precise fraud probability scores (0.0 to 1.0) for each application using our ensemble ML models. The Task Force combines XGBoost Detective and Isolation Forest Watchdog scores in a 50/50 average, calibrated to your historical fraud patterns and business rules."}
                  {activeProductTab === 2 && "Get plain-English PDF reports for every flagged application using GenAI (Amazon Bedrock). Reports answer: What is the risk? Why is it risky? Are there mitigating factors? Transforms complex SHAP explanations into actionable intelligence your team can immediately use."}
                  {activeProductTab === 3 && "Catch fraud at pre-approval stage, before credit bureau pulls. Save credit check costs and protect capital by identifying high-risk applicants early. System can trigger immediately after application submission, providing risk assessment before underwriting decisions."}
                  {activeProductTab === 4 && "Final safety check at pre-funding stage before fund dispersal. Verify applications one last time to prevent fraudulent loans from being funded. System writes FraudScore and FraudFlag directly to LoanApplication table for seamless integration."}
                  {activeProductTab === 5 && "Ensemble 'Task Force' combines XGBoost 'Detective' (supervised expert on known fraud) with Isolation Forest 'Watchdog' (unsupervised anomaly detector). This hybrid approach achieved 50% fraud detection on test sets, dramatically outperforming single-model approaches."}
                  {activeProductTab === 6 && "Headless API service deployed on AWS Lambda/SageMaker with secure API Gateway. Listens for new LoanApplication records, processes through feature engineering pipeline (100 raw points → 650+ features), and returns FraudScore, FraudFlag, and explanation report URL."}
                  {activeProductTab === 7 && "Continuous learning system captures loan outcomes (early reversals, legal actions, defaults) from TLOS Payment and Loan tables to create ground-truth labels. These labels feed automated retraining cycles, ensuring the model adapts and improves with every loan cycle."}
                  {activeProductTab === 8 && "Generate compliance-ready PDF reports with detailed SHAP explanations. Track all fraud detection decisions with audit trails showing risk probability, top factors (behavioral anomalies, email patterns, profile stability), and mitigating factors suitable for regulatory review."}
                  {activeProductTab === 9 && "Automated MLOps pipeline detects data drift, triggers retraining in SageMaker, and deploys new models only if they beat previous accuracy metrics (F1 Score, Recall). Includes CloudWatch/QuickSight dashboards for technical metrics (API latency, error rates) and business metrics (applications flagged, capital protected, persona distribution)."}
                </p>
                <button className="text-sardine-stats-blue font-medium flex items-center gap-2 hover:gap-3 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-sardine-stats-blue focus:ring-offset-2 rounded group">
                  Learn more <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </div>

              {/* Right: Data Visualization */}
              <div className={`bg-sardine-dark-blue border border-sardine-stats-blue/10 rounded-xl p-6 min-h-0 hover:scale-[1.02] transition-all duration-1000 ease-in-out shadow-xl hover:shadow-sardine-stats-blue/5 overflow-hidden ${
                isTransitioning ? 'opacity-0 -translate-x-20 scale-95' : 'opacity-100 translate-x-0 scale-100'
              }`}>
                {/* Window Frame for Visualization */}
                <div className="w-full h-full bg-[#0f172a] rounded-lg border border-sardine-stats-blue/20 overflow-hidden shadow-2xl relative">
                   <div className="h-8 bg-[#1e293b] flex items-center px-4 gap-2 border-b border-white/5 absolute top-0 left-0 right-0 z-10">
                    <div className="w-3 h-3 rounded-full bg-[#FF5F56]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#FFBD2E]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#27C93F]"></div>
                  </div>
                  <div className="pt-8 w-full bg-sardine-navy/50">
                {activeProductTab === 0 ? (
                  // Application Screening - Risk Indicators Image
                  <div className="w-full p-0">
                    <Image
                      src="/images/product-application-screening.png"
                      alt="Application Screening Risk Indicators"
                      width={800}
                      height={600}
                      className="w-full h-auto rounded-lg"
                      priority={activeProductTab === 0}
                    />
                  </div>
                ) : activeProductTab === 1 ? (
                  // Risk Scoring Visualization
                  <div className="space-y-4 w-full p-8 flex flex-col items-center justify-center h-full">
                    <div className="bg-sardine-dark-blue/50 backdrop-blur-sm rounded-lg p-6 border border-sardine-stats-blue/20 w-full max-w-md">
                      <div className="text-gray-400 text-sm mb-2">FRAUD RISK SCORE</div>
                      <div className="text-3xl font-bold text-red-400 mb-2">0.85</div>
                      <div className="text-gray-500 text-xs">High Risk Threshold: 0.70</div>
                    </div>
                    <div className="bg-sardine-dark-blue/50 backdrop-blur-sm rounded-lg p-6 border border-sardine-stats-blue/20 w-full max-w-md">
                      <div className="text-gray-400 text-sm mb-2">ENSEMBLE CONFIDENCE</div>
                      <div className="text-2xl font-bold text-sardine-stats-blue">92%</div>
                    </div>
                  </div>
                ) : activeProductTab === 2 ? (
                  // Explainable AI - Visualization Image
                  <div className="w-full p-0">
                    <Image
                      src="/images/product-explainable-ai.png"
                      alt="Explainable AI Visualization"
                      width={800}
                      height={600}
                      className="w-full h-auto rounded-lg"
                      priority={activeProductTab === 2}
                    />
                  </div>
                ) : activeProductTab === 3 ? (
                  // Pre-Approval Detection - Visualization Image
                  <div className="w-full p-0">
                    <Image
                      src="/images/product-pre-approval.png"
                      alt="Pre-Approval Detection Visualization"
                      width={800}
                      height={600}
                      className="w-full h-auto rounded-lg"
                      priority={activeProductTab === 3}
                    />
                  </div>
                ) : activeProductTab === 4 ? (
                  // Pre-Funding Verification - Visualization Image
                  <div className="w-full p-0">
                    <Image
                      src="/images/product-pre-funding.png"
                      alt="Pre-Funding Verification Visualization"
                      width={800}
                      height={600}
                      className="w-full h-auto rounded-lg"
                      priority={activeProductTab === 4}
                    />
                  </div>
                ) : activeProductTab === 5 ? (
                  // Ensemble Models - Visualization Image
                  <div className="w-full p-0">
                    <Image
                      src="/images/product-ensemble-models.png"
                      alt="Ensemble Models Visualization"
                      width={800}
                      height={600}
                      className="w-full h-auto rounded-lg"
                      priority={activeProductTab === 5}
                    />
                  </div>
                ) : activeProductTab === 6 ? (
                  // Real-time API - Visualization Image
                  <div className="w-full p-0">
                    <Image
                      src="/images/product-real-time-api.png"
                      alt="Real-time API Visualization"
                      width={800}
                      height={600}
                      className="w-full h-auto rounded-lg"
                      priority={activeProductTab === 6}
                    />
                  </div>
                ) : activeProductTab === 7 ? (
                  // Feedback Loop - Visualization Image
                  <div className="w-full p-0">
                    <Image
                      src="/images/product-feedback-loop.png"
                      alt="Feedback Loop Visualization"
                      width={800}
                      height={600}
                      className="w-full h-auto rounded-lg"
                      priority={activeProductTab === 7}
                    />
                  </div>
                ) : activeProductTab === 8 ? (
                  // Compliance Reporting - Visualization Image
                  <div className="w-full p-0">
                    <Image
                      src="/images/product-compliance-reporting.png"
                      alt="Compliance Reporting Visualization"
                      width={800}
                      height={600}
                      className="w-full h-auto rounded-lg"
                      priority={activeProductTab === 8}
                    />
                  </div>
                ) : activeProductTab === 9 ? (
                  // MLOps Pipeline - Visualization Image
                  <div className="w-full p-0">
                    <Image
                      src="/images/product-mlops-pipeline.png"
                      alt="MLOps Pipeline Visualization"
                      width={800}
                      height={600}
                      className="w-full h-auto rounded-lg"
                      priority={activeProductTab === 9}
                    />
                  </div>
                ) : (
                  // Placeholder
                  <div className="text-center">
                    <div className="text-4xl mb-4">📊</div>
                    <p className="text-gray-400 text-sm mb-2">Product visualization</p>
                    <p className="text-gray-500 text-xs">Replace with actual {productTabs[activeProductTab].name} screenshot</p>
                  </div>
                )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Agents Section */}
      <section className="py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-sardine-navy" data-animate id="ai-agents">
        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Left: Accordion */}
            <div className={isVisible['ai-agents'] ? 'animate-slide-in-left' : 'opacity-0'}>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 md:mb-8 leading-tight tracking-tight">
                AI Co-Pilots that augment your fraud review team
              </h2>
              <div className="space-y-2 mb-6 md:mb-8">
                {aiAgents.map((agent, idx) => (
                  <div
                    key={idx}
                    className={`border rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-sardine-stats-blue/5 ${
                      agent.expanded 
                        ? 'border-sardine-stats-blue/30 bg-sardine-dark-blue shadow-lg shadow-sardine-stats-blue/10' 
                        : 'border-sardine-stats-blue/10 bg-sardine-dark-blue/50'
                    }`}
                    style={{ animationDelay: `${idx * 0.1}s` }}
                  >
                    <button
                      onClick={() => setExpandedAgent(expandedAgent === idx ? null : idx)}
                      className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-sardine-stats-blue/5 transition-all duration-300 focus:outline-none rounded-lg group"
                    >
                      <span className={`font-bold text-base transition-colors ${
                        agent.expanded ? 'text-sardine-stats-blue' : 'text-white group-hover:text-sardine-stats-blue'
                      }`}>{agent.title}</span>
                      {agent.expanded ? (
                        <ChevronUp className="w-5 h-5 text-sardine-stats-blue transition-transform duration-300 rotate-180" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-400 transition-transform duration-300 group-hover:text-sardine-stats-blue group-hover:translate-y-1" />
                      )}
                    </button>
                    <div className={`overflow-hidden transition-all duration-300 ${
                      agent.expanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}>
                      <div className="px-6 pb-6 pt-2 border-t border-sardine-stats-blue/10">
                        <p className="text-gray-300 leading-relaxed text-sm">{agent.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button className="px-6 py-3 bg-gradient-to-r from-[#1E88E5] via-[#42A5F5] to-[#1565C0] text-white rounded-lg font-medium hover:shadow-lg hover:shadow-[#1E88E5]/30 hover:scale-105 transition-all focus:outline-none">
                Learn More About Our AI →
              </button>
            </div>

            {/* Right: Agent Details Card */}
            <div className={`bg-sardine-dark-blue border border-sardine-stats-blue/10 rounded-2xl p-6 md:p-8 shadow-xl hover-lift ${
              isVisible['ai-agents'] ? 'animate-slide-in-right animate-delay-200' : 'opacity-0'
            }`}>
              {/* Breadcrumbs */}
              <div className="mb-5 md:mb-6">
                <div className="text-sm text-sardine-stats-blue font-medium">
                  AI Agents {'>'} {aiAgents[expandedAgent || 0].title}
                </div>
              </div>

              {/* Agent Name */}
              <div className="mb-5 md:mb-6">
                <div className="text-xs text-gray-400 mb-2 uppercase tracking-wide">Agent Name</div>
                <div className="font-bold text-xl md:text-2xl text-white leading-tight">{aiAgents[expandedAgent || 0].title}</div>
              </div>

              {/* Mission */}
              <div className="mb-6 md:mb-8">
                <div className="text-xs text-gray-400 mb-2 uppercase tracking-wide">Mission</div>
                <div className="text-sm md:text-base text-gray-300 leading-relaxed">{aiAgents[expandedAgent || 0].description}</div>
              </div>

              {/* SOP Diagram */}
              <div>
                <div className="text-xs text-gray-400 mb-3 uppercase tracking-wide">SOP Diagram</div>
                <div className="bg-[#0f172a] rounded-xl border border-sardine-stats-blue/20 overflow-hidden">
                  {/* Window Controls */}
                  <div className="h-8 bg-[#1e293b] flex items-center px-4 gap-2 border-b border-white/5">
                    <div className="w-3 h-3 rounded-full bg-[#FF5F56]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#FFBD2E]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#27C93F]"></div>
                  </div>
                  <div className="p-0 min-h-0 bg-sardine-navy/50">
                    <Image
                      src="/images/ai-agent-sop-diagram.png"
                      alt="AI Agent SOP Diagram"
                      width={600}
                      height={400}
                      className="w-full h-auto rounded-lg shadow-2xl"
                    />
                  </div>
                </div>
              </div>

              {/* Agent Interface */}
              <div className="mt-6">
                <div className="text-xs text-gray-400 mb-3 uppercase tracking-wide">Agent Interface</div>
                <div className="bg-[#0f172a] rounded-xl border border-sardine-stats-blue/20 overflow-hidden">
                  {/* Window Controls */}
                  <div className="h-8 bg-[#1e293b] flex items-center px-4 gap-2 border-b border-white/5">
                    <div className="w-3 h-3 rounded-full bg-[#FF5F56]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#FFBD2E]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#27C93F]"></div>
                  </div>
                  <div className="p-0 min-h-0 bg-sardine-navy/50">
                    <Image
                      src="/images/ai-agent-interface.png"
                      alt="AI Agent Interface"
                      width={1000}
                      height={700}
                      className="w-full h-auto rounded-lg shadow-2xl"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-sardine-navy" data-animate id="stats">
        <div className="container mx-auto max-w-7xl">
          {/* Title and Description Row */}
          <div className={`grid lg:grid-cols-2 gap-8 lg:gap-12 items-start mb-12 md:mb-16 lg:mb-20 ${
            isVisible['stats'] ? 'animate-slide-up' : 'opacity-0'
          }`}>
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight">
                The power of<br />explainable AI
              </h2>
            </div>
            <div className="pt-2">
              <p className="text-base md:text-lg text-gray-300 leading-relaxed bg-sardine-dark-blue border border-sardine-stats-blue/10 rounded-2xl p-6 md:p-8 transition-smooth shadow-lg">
                Our AI Co-Pilot doesn&rsquo;t just detect fraud it explains why. Get real-time risk scores with plain English explanations that help your team make faster, more confident decisions.
              </p>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            <div className="space-y-6">
              {[
                { label: 'Fraud Detection Rate', value: '50%', progress: 50 },
                { label: 'Features Generated', value: '650+', progress: 90 },
                { label: 'Applicant Personas', value: '3', progress: 100 }
              ].map((stat, idx) => (
                <div
                  key={idx}
                  className={`bg-sardine-dark-blue border border-sardine-stats-blue/10 rounded-2xl p-6 md:p-8 transition-smooth hover:shadow-lg hover:shadow-sardine-stats-blue/10 ${
                    isVisible['stats'] ? 'animate-slide-up' : 'opacity-0'
                  }`}
                  style={{ animationDelay: `${0.3 + idx * 0.1}s` }}
                >
                  <div className="flex items-center justify-between mb-3 md:mb-4">
                    <div className="text-sm md:text-base font-medium text-gray-400 uppercase tracking-wide">{stat.label}</div>
                    <div className="w-8 h-8 rounded-lg bg-sardine-stats-blue/10 border border-sardine-stats-blue/20 flex items-center justify-center">
                      <BarChart3 className="w-4 h-4 text-sardine-stats-blue" />
                    </div>
                  </div>
                  <div className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-none tracking-tight mb-4">
                    {stat.value}
                  </div>
                  <div className="h-2 bg-sardine-navy rounded-full overflow-hidden border border-sardine-stats-blue/20">
                    <div
                      className="h-full bg-sardine-stats-blue transition-all duration-700 ease-out"
                      style={{ width: isVisible['stats'] ? `${stat.progress}%` : '0%', transitionDelay: `${0.3 + idx * 0.1}s` }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className={`relative ${isVisible['stats'] ? 'animate-slide-up' : 'opacity-0'}`} style={{ animationDelay: '0.6s' }}>
              <div className="absolute -inset-6 bg-sardine-stats-blue/5 rounded-3xl blur-3xl" />
              <div className="bg-[#0f172a] rounded-xl border border-sardine-stats-blue/20 overflow-hidden shadow-2xl hover:scale-105 transition-transform duration-300">
                <div className="h-8 bg-[#1e293b] flex items-center px-4 gap-2 border-b border-white/5">
                  <div className="w-3 h-3 rounded-full bg-[#FF5F56]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#FFBD2E]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#27C93F]"></div>
                </div>
                <div className="p-6 md:p-8 bg-sardine-navy/50">
                  <Image
                    src="/images/stats-visualization.png"
                    alt="Statistics Visualization"
                    width={1200}
                    height={400}
                    className="object-cover w-full rounded-lg shadow-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Case Study Section */}
      <section className="py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-sardine-navy to-sardine-dark-blue">
        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Left: Stats */}
            <div className="space-y-6 md:space-y-8">
              <div className="pt-6 border-t border-sardine-stats-blue/10">
                <h3 className="text-lg md:text-xl font-bold text-white mb-2 leading-tight">50% fraud detection on test set</h3>
                <p className="text-sm md:text-base text-gray-300 leading-relaxed">
                  Our ensemble &quot;Task Force&quot; model successfully detected <strong>50% of never-before-seen fraudsters</strong> in the holdout test set. This was achieved by combining the XGBoost &quot;Detective&quot; (25% fraud recall) with the Isolation Forest &quot;Watchdog&quot; in a 50/50 ensemble, dramatically outperforming single-model approaches.
                </p>
              </div>
              <div className="pt-6 border-t border-sardine-stats-blue/10">
                <h3 className="text-lg md:text-xl font-bold text-white mb-2 leading-tight">Three distinct applicant personas discovered</h3>
                <p className="text-sm md:text-base text-gray-300 leading-relaxed">
                  Unsupervised analysis using UMAP + HDBSCAN revealed three clear behavioral personas: &quot;Digital Ghost&quot; (70% fraud concentration, lacks verifiable data), &quot;High-Friction Anomaly&quot; (abnormally slow process), and &quot;Safe Bet&quot; (100% legitimate, ideal for fast-track). These personas enable strategic triage and focused expert attention.
                </p>
                <div className="mt-4 flex items-center gap-4">
                  <div className="flex-1">
                    <div className="h-3 bg-sardine-dark-blue rounded-full overflow-hidden border border-sardine-stats-blue/20">
                      <div className="h-full bg-sardine-stats-blue w-[50%] shadow-[0_0_10px_rgba(54,179,227,0.5)]" />
                    </div>
                    <div className="text-xs text-gray-400 mt-1">50%↑ Fraud Detected</div>
                  </div>
                  <div className="flex-1">
                    <div className="h-3 bg-sardine-dark-blue rounded-full overflow-hidden border border-sardine-stats-blue/20">
                      <div className="h-full bg-gray-600 w-[50%]" />
                    </div>
                    <div className="text-xs text-gray-400 mt-1">50%↓ Remaining Risk</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Case Study Image */}
            <div className="bg-gradient-to-br from-[#36B3E3] via-[#6BC5E8] to-[#8DD3F0] rounded-2xl p-8 text-white shadow-xl overflow-hidden relative group">
              <div className="mb-6 relative z-10">
                <h3 className="text-xl md:text-2xl font-bold mb-2 leading-tight text-white">AI Co-Pilot protects capital at pre-approval stage</h3>
                <div className="text-xs text-white/80 mb-4">Key Capabilities</div>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded text-xs uppercase border border-white/30">ENSEMBLE MODELS</span>
                  <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded text-xs uppercase border border-white/30">REAL-TIME API</span>
                  <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded text-xs uppercase border border-white/30">EXPLAINABLE AI</span>
                </div>
              </div>
              <div className="bg-[#0f172a] rounded-lg h-auto border border-white/20 overflow-hidden shadow-2xl relative z-10">
                {/* Window Controls */}
                <div className="absolute top-0 left-0 right-0 h-8 bg-[#1e293b] flex items-center px-4 gap-2 border-b border-white/5 z-20">
                  <div className="w-3 h-3 rounded-full bg-[#FF5F56]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#FFBD2E]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#27C93F]"></div>
                </div>
                <div className="pt-8 w-full bg-sardine-navy/50">
                  <Image
                    src="/images/case-study-dashboard.png"
                    alt="Case Study Dashboard"
                    width={800}
                    height={600}
                    className="w-full h-auto rounded-lg shadow-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Catch Fraud Section */}
      <section className="py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-sardine-navy" data-animate id="catch-fraud">
        <div className="container mx-auto max-w-7xl">
          <div className={`text-center mb-10 md:mb-12 lg:mb-16 ${
            isVisible['catch-fraud'] ? 'animate-slide-up' : 'opacity-0'
          }`}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6 leading-tight tracking-tight">
              Catch fraud before it costs you
            </h2>
            <p className="text-base md:text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Detect fraudulent loan applications at pre-approval and pre-funding stages. Our AI identifies early reversals, legal actions, repos, UCC failures, and other high-severity fraud indicators.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                icon: Shield,
                title: 'Early Fraud Indicators',
                description: 'Detect early payment reversals, legal actions, repos, UCC failures, known forgeries, and first-payment defaults. Our rules-based engine translates real-world outcomes into definitive FRAUD labels, ensuring the model predicts actual business impact.',
                visualization: 'Risk indicators: EARLY REVERSAL (HIGH), LEGAL ACTION (MEDIUM), UCC FAILURE (HIGH), FIRST-PAYMENT DEFAULT (HIGH)'
              },
              {
                icon: Brain,
                title: 'Applicant Persona Analysis',
                description: 'Identify three distinct personas: "Digital Ghost" (70% fraud, lacks verifiable data), "High-Friction Anomaly" (abnormally slow with long pauses), and "Safe Bet" (100% legitimate). These behavioral patterns enable strategic triage and fast-track approvals for low-risk applicants.',
                visualization: 'Persona: DIGITAL GHOST detected, IDV CHECKS: 100% below average, BEHAVIORAL ANOMALY (HIGH)'
              },
              {
                icon: Zap,
                title: 'Real-time Risk Scoring',
                description: 'Get instant fraud probability scores (0.0-1.0) with GenAI-powered PDF explanations. Reports answer: What is the risk? Why is it risky? Are there mitigating factors? Transforms complex SHAP data into plain-English actionable intelligence.',
                visualization: 'Risk Score: 0.85 (HIGH), Top Factors: High email digit ratio, Long application pauses, Low IDV checks'
              }
            ].map((item, idx) => (
              <div 
                key={idx} 
                className={`bg-sardine-dark-blue border border-sardine-stats-blue/10 rounded-2xl p-5 md:p-6 flex flex-col hover-lift stagger-item transition-smooth hover:shadow-lg hover:shadow-sardine-stats-blue/5 ${
                  isVisible['catch-fraud'] ? 'animate-slide-up' : 'opacity-0'
                }`}
                style={{ animationDelay: `${0.2 + idx * 0.1}s` }}
              >
                {/* Icon */}
                <div className="flex justify-center mb-5 md:mb-6">
                  <div className="w-14 h-14 md:w-16 md:h-16 bg-sardine-stats-blue/10 border border-sardine-stats-blue/20 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-lg group-hover:bg-sardine-stats-blue/20">
                    <item.icon className="w-7 h-7 md:w-8 md:h-8 text-sardine-stats-blue" />
                  </div>
                </div>

                {/* Content */}
                <div className="text-center mb-5 md:mb-6 flex-grow">
                  <h3 className="text-lg md:text-xl font-bold text-white mb-3 leading-tight">{item.title}</h3>
                  <p className="text-gray-300 leading-relaxed text-sm md:text-base">{item.description}</p>
                </div>

                {/* Dark Purple Visualization Box */}
                <div className="bg-gradient-to-br from-[#36B3E3] via-[#6BC5E8] to-[#8DD3F0] rounded-xl p-5 md:p-6 flex flex-col items-center justify-center relative shadow-lg">
                  <div className="absolute top-3 md:top-4">
                    <div className="w-7 h-7 md:w-8 md:h-8 flex items-center justify-center">
                      <BarChart3 className="w-5 h-5 md:w-6 md:h-6 text-white/50" />
                    </div>
                  </div>
                  <div className="text-center text-white/90 text-xs mt-6 md:mt-4 px-2 font-medium">
                    <p className="leading-relaxed drop-shadow-sm">{item.visualization}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Data-Driven Platform */}
      <section className="py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-sardine-navy" data-animate id="data-platform">
        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Left: Accordion */}
            <div className={isVisible['data-platform'] ? 'animate-slide-in-left' : 'opacity-0'}>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 md:mb-8 leading-tight tracking-tight">
                Enterprise-grade AI infrastructure
              </h2>
              <div className="space-y-2">
                {mlLayers.map((layer, idx) => (
                  <div
                    key={idx}
                    className={`border rounded-2xl overflow-hidden transition-all duration-300 bg-sardine-dark-blue/50 hover:shadow-lg hover:shadow-sardine-stats-blue/5 ${
                      layer.expanded 
                        ? 'border-sardine-stats-blue/30 bg-sardine-dark-blue shadow-lg shadow-sardine-stats-blue/10' 
                        : 'border-sardine-stats-blue/10'
                    }`}
                    style={{ animationDelay: `${idx * 0.1}s` }}
                  >
                    <button
                      onClick={() => setExpandedLayer(expandedLayer === idx ? null : idx)}
                      className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-sardine-stats-blue/5 transition-all duration-300 focus:outline-none rounded-lg group"
                    >
                      <div className="flex items-center gap-4">
                        <span className="text-xl font-bold text-sardine-stats-blue">{layer.number}</span>
                        <span className={`font-bold text-base transition-colors ${
                          layer.expanded ? 'text-white' : 'text-gray-300 group-hover:text-white'
                        }`}>{layer.title}</span>
                      </div>
                      {layer.expanded ? (
                        <ChevronUp className="w-5 h-5 text-sardine-stats-blue transition-transform duration-300 rotate-180" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-400 transition-transform duration-300 group-hover:text-sardine-stats-blue group-hover:translate-y-1" />
                      )}
                    </button>
                    <div className={`overflow-hidden transition-all duration-300 ${
                      layer.expanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}>
                      <div className="px-6 pb-6 pt-2 border-t border-sardine-stats-blue/10">
                        <p className="text-gray-300 leading-relaxed text-sm">{layer.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: ML Layer Architecture and Feature Engineering */}
            <div className={`flex items-center justify-center ${
              isVisible['data-platform'] ? 'animate-slide-in-right animate-delay-200' : 'opacity-0'
            }`}>
              <div className="relative w-full max-w-2xl space-y-6">
                {/* ML Layer Architecture Diagram */}
                <div className="bg-[#0f172a] rounded-2xl border border-sardine-stats-blue/20 overflow-hidden shadow-2xl">
                  <div className="h-8 bg-[#1e293b] flex items-center px-4 gap-2 border-b border-white/5">
                    <div className="w-3 h-3 rounded-full bg-[#FF5F56]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#FFBD2E]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#27C93F]"></div>
                  </div>
                  <div className="p-6 md:p-8 bg-sardine-navy/50">
                    <div className="text-xs text-gray-400 mb-3 uppercase tracking-wide">ML Layer Architecture</div>
                    <Image
                      src="/images/ml-layer-architecture.png"
                      alt="ML Layer Architecture"
                      width={1000}
                      height={800}
                      className="w-full h-auto rounded-lg shadow-lg"
                    />
                  </div>
                </div>
                
                {/* Feature Engineering Visualization */}
                <div className="bg-[#0f172a] rounded-2xl border border-sardine-stats-blue/20 overflow-hidden shadow-2xl">
                  <div className="h-8 bg-[#1e293b] flex items-center px-4 gap-2 border-b border-white/5">
                    <div className="w-3 h-3 rounded-full bg-[#FF5F56]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#FFBD2E]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#27C93F]"></div>
                  </div>
                  <div className="p-6 md:p-8 bg-sardine-navy/50">
                    <div className="text-xs text-gray-400 mb-3 uppercase tracking-wide">Feature Engineering</div>
                    <Image
                      src="/images/feature-engineering.png"
                      alt="Feature Engineering Visualization"
                      width={1000}
                      height={600}
                      className="w-full h-auto rounded-lg shadow-lg"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-sardine-navy" data-animate id="testimonials">
        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Left: Quote */}
            <div className={`bg-sardine-dark-blue border border-sardine-stats-blue/20 rounded-2xl p-8 md:p-10 lg:p-12 text-white hover-lift transition-smooth relative overflow-hidden group ${
              isVisible['testimonials'] ? 'animate-slide-in-left' : 'opacity-0'
            }`}>
              <div className="absolute top-0 right-0 w-64 h-64 bg-sardine-stats-blue/5 rounded-full blur-3xl -mr-32 -mt-32 transition-all duration-700 group-hover:bg-sardine-stats-blue/10"></div>
              
              <div className="text-5xl md:text-6xl font-bold mb-4 md:mb-6 text-sardine-stats-blue/20">&quot;</div>
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-6 md:mb-8 leading-relaxed tracking-tight relative z-10">
                {testimonials[0].quote}
              </h2>
              <div className="flex items-center gap-4 relative z-10">
                <div className="w-14 h-14 md:w-16 md:h-16 bg-sardine-stats-blue/10 border border-sardine-stats-blue/20 rounded-full flex items-center justify-center">
                  <Users className="w-7 h-7 md:w-8 md:h-8 text-sardine-stats-blue" />
                </div>
                <div>
                  <div className="font-bold text-base md:text-lg text-white">{testimonials[0].author}</div>
                  <div className="text-gray-400 text-sm md:text-base font-medium">{testimonials[0].role}</div>
                </div>
              </div>
            </div>

            {/* Right: Dashboard */}
            <div className={`bg-sardine-dark-blue border border-sardine-stats-blue/10 rounded-2xl p-5 md:p-6 hover-lift transition-smooth hover:shadow-lg hover:shadow-sardine-stats-blue/5 ${
              isVisible['testimonials'] ? 'animate-slide-in-right animate-delay-200' : 'opacity-0'
            }`}>
              <div className="mb-4 pb-4 border-b border-sardine-stats-blue/10">
                <div className="text-sm text-sardine-stats-blue font-medium">Customer Intelligence {'>'} Anika Carder</div>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="text-xs text-gray-400 mb-2 uppercase tracking-wide">Risk reason codes</div>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1.5 bg-red-500/20 text-red-300 border border-red-500/30 rounded-full text-xs font-medium">Has blocked sessions</span>
                    <span className="px-3 py-1.5 bg-orange-500/20 text-orange-300 border border-orange-500/30 rounded-full text-xs font-medium">Sent live: high risk</span>
                    <span className="px-3 py-1.5 bg-yellow-400/20 text-yellow-300 border border-yellow-400/30 rounded-full text-xs font-medium">No email provided</span>
                    <span className="px-3 py-1.5 bg-green-400/20 text-green-300 border border-green-400/30 rounded-full text-xs font-medium">ID theft: low risk</span>
                  </div>
                </div>
                <div className="bg-sardine-navy/50 rounded-lg p-4 border border-sardine-stats-blue/10">
                  <div className="text-xs text-gray-400 mb-1">In queue</div>
                  <div className="text-sm text-white font-medium">21 days • Fraud Queue • 22-02-2023</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-sardine-navy to-sardine-dark-blue" data-animate id="footer-cta">
        <div className="container mx-auto max-w-4xl">
          <div className={`text-center space-y-6 md:space-y-8 ${
            isVisible['footer-cta'] ? 'animate-slide-up' : 'opacity-0'
          }`}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight">
              See it in action.
            </h2>
            <p className="text-base md:text-lg lg:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              The first AI Co-Pilot that stops fraud and explains why. Deploy our headless API in your AWS environment and start protecting capital at the pre-approval stage with real-time fraud detection.
            </p>
            <div className="pt-2">
              <button 
                onClick={() => setIsDemoModalOpen(true)}
                className="px-8 md:px-10 py-4 md:py-5 bg-gradient-to-r from-[#1E88E5] via-[#42A5F5] to-[#1565C0] text-white rounded-lg font-semibold text-base md:text-lg hover:shadow-xl hover:shadow-[#1E88E5]/30 transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none transform transition-bounce"
              >
                Get a Demo →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-sardine-navy border-t border-sardine-stats-blue/10 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl">
          <div className="grid md:grid-cols-5 gap-8 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-sardine-stats-blue rounded" />
                <span className="text-xl font-bold tracking-tight">Sentinel AI</span>
              </div>
              <div className="text-sm text-white/70 mb-4">Follow us</div>
              <div className="flex gap-4">
                <div className="w-8 h-8 border border-white/20 rounded flex items-center justify-center hover:bg-white/10 cursor-pointer">X</div>
                <div className="w-8 h-8 border border-white/20 rounded flex items-center justify-center hover:bg-white/10 cursor-pointer">in</div>
              </div>
            </div>
            <div>
              <div className="text-sm font-bold mb-4 tracking-wide uppercase">Fraud Detection</div>
              <div className="space-y-2 text-sm text-white/70">
                <div className="hover:text-white cursor-pointer transition-colors duration-200">Application Screening</div>
                <div className="hover:text-white cursor-pointer transition-colors duration-200">Risk Scoring</div>
                <div className="hover:text-white cursor-pointer transition-colors duration-200">Anomaly Detection</div>
                <div className="hover:text-white cursor-pointer transition-colors duration-200">Pre-Approval Detection</div>
                <div className="hover:text-white cursor-pointer transition-colors duration-200">Pre-Funding Verification</div>
              </div>
            </div>
            <div>
              <div className="text-sm font-bold mb-4 tracking-wide uppercase">AI Capabilities</div>
              <div className="space-y-2 text-sm text-white/70">
                <div className="flex items-center gap-2 hover:text-white cursor-pointer transition-colors duration-200">
                  <ArrowRight className="w-3 h-3" />
                  <span>Applicant Personas</span>
                </div>
                <div className="flex items-center gap-2 hover:text-white cursor-pointer transition-colors duration-200">
                  <ArrowRight className="w-3 h-3" />
                  <span>Explainable AI</span>
                </div>
                <div className="flex items-center gap-2 hover:text-white cursor-pointer transition-colors duration-200">
                  <ArrowRight className="w-3 h-3" />
                  <span>Ensemble Models</span>
                </div>
                <div className="flex items-center gap-2 hover:text-white cursor-pointer transition-colors duration-200">
                  <ArrowRight className="w-3 h-3" />
                  <span>Real-time API</span>
                </div>
                <div className="flex items-center gap-2 hover:text-white cursor-pointer transition-colors duration-200">
                  <ArrowRight className="w-3 h-3" />
                  <span>MLOps Pipeline</span>
                </div>
              </div>
            </div>
            <div>
              <div className="text-sm font-bold mb-4 tracking-wide uppercase">Resources</div>
              <div className="space-y-2 text-sm text-white/70">
                <div className="flex items-center gap-2 hover:text-white cursor-pointer transition-colors duration-200">
                  <ArrowRight className="w-3 h-3" />
                  <span>API Documentation</span>
                </div>
                <div className="flex items-center gap-2 hover:text-white cursor-pointer transition-colors duration-200">
                  <ArrowRight className="w-3 h-3" />
                  <span>Integration Guides</span>
                </div>
                <div className="flex items-center gap-2 hover:text-white cursor-pointer transition-colors duration-200">
                  <ArrowRight className="w-3 h-3" />
                  <span>Case Studies</span>
                </div>
                <div className="flex items-center gap-2 hover:text-white cursor-pointer transition-colors duration-200">
                  <ArrowRight className="w-3 h-3" />
                  <span>API Status</span>
                </div>
              </div>
            </div>
            <div>
              <div className="text-sm font-bold mb-4 tracking-wide uppercase">Company</div>
              <div className="space-y-2 text-sm text-white/70">
                <div className="hover:text-white cursor-pointer transition-colors duration-200">About Sentinel AI</div>
                <div className="hover:text-white cursor-pointer transition-colors duration-200">Careers</div>
                <div className="hover:text-white cursor-pointer transition-colors duration-200">Partners</div>
                <div className="hover:text-white cursor-pointer transition-colors duration-200">Contact us</div>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-white/10 flex justify-between items-center text-sm text-white/70">
            <div>© 2025 Sentinel AI Corp.</div>
            <div className="flex gap-6">
              <span className="hover:text-white cursor-pointer">Privacy Policy</span>
              <span className="hover:text-white cursor-pointer">Security</span>
            </div>
          </div>
        </div>
      </footer>
      <DemoModal isOpen={isDemoModalOpen} onClose={() => setIsDemoModalOpen(false)} />
    </main>
  )
}
