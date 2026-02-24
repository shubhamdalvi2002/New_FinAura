/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  TrendingUp, 
  ShieldCheck, 
  Users, 
  PieChart, 
  Calculator, 
  ArrowRight, 
  Menu, 
  X, 
  Sun, 
  Moon, 
  CheckCircle2, 
  MessageSquare,
  Phone,
  Mail,
  MapPin,
  ChevronRight,
  Star,
  Clock,
  Briefcase,
  Target,
  RefreshCw,
  Award
} from 'lucide-react';

// --- Types ---
interface Service {
  id: string;
  title: string;
  description: string;
  icon: any;
}

interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  rating: number;
}

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  image: string;
}

// --- Components ---

const Navbar = ({ darkMode, toggleDarkMode }: { darkMode: boolean; toggleDarkMode: () => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Calculators', href: '#calculators' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'glass py-3 shadow-lg' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center">
            <TrendingUp className="text-accent" size={24} />
          </div>
          <span className={`text-2xl font-bold tracking-tight ${darkMode ? 'text-white' : 'text-primary'}`}>
            FinAura<span className="text-accent">Capital</span>
          </span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className={`text-sm font-medium hover:text-accent transition-colors ${darkMode ? 'text-gray-300' : 'text-primary'}`}
            >
              {link.name}
            </a>
          ))}
          <button 
            onClick={toggleDarkMode}
            className={`p-2 rounded-full transition-colors ${darkMode ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700' : 'bg-gray-100 text-primary hover:bg-gray-200'}`}
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <a 
            href="#contact" 
            className="bg-secondary text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-primary transition-all hover:shadow-lg active:scale-95"
          >
            Book Call
          </a>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center gap-4">
          <button onClick={toggleDarkMode} className="p-2">
            {darkMode ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-primary" />}
          </button>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className={darkMode ? 'text-white' : 'text-primary'}>
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={`md:hidden ${darkMode ? 'bg-charcoal' : 'bg-white'} border-t border-gray-200 dark:border-gray-800`}
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-3 py-4 text-base font-medium rounded-md ${darkMode ? 'text-gray-300 hover:bg-gray-800' : 'text-primary hover:bg-gray-50'}`}
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-4">
                <a 
                  href="#contact" 
                  onClick={() => setIsMenuOpen(false)}
                  className="block w-full text-center bg-secondary text-white px-6 py-3 rounded-xl font-semibold"
                >
                  Book Free Consultation
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const CalculatorSection = ({ darkMode }: { darkMode: boolean }) => {
  const [calcType, setCalcType] = useState<'SIP' | 'SWP'>('SIP');
  
  // SIP State
  const [sipMonthly, setSipMonthly] = useState(5000);
  const [sipReturn, setSipReturn] = useState(12);
  const [sipYears, setSipYears] = useState(10);

  // SWP State
  const [swpInitial, setSwpInitial] = useState(1000000);
  const [swpWithdrawal, setSwpWithdrawal] = useState(10000);
  const [swpReturn, setSwpReturn] = useState(8);
  const [swpYears, setSwpYears] = useState(10);

  const sipResults = useMemo(() => {
    const i = sipReturn / 100 / 12;
    const n = sipYears * 12;
    const totalValue = sipMonthly * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
    const investedAmount = sipMonthly * n;
    const estReturns = totalValue - investedAmount;
    return { investedAmount, estReturns, totalValue };
  }, [sipMonthly, sipReturn, sipYears]);

  const swpResults = useMemo(() => {
    // Simplified SWP calculation for display
    const r = swpReturn / 100 / 12;
    const n = swpYears * 12;
    let balance = swpInitial;
    let totalWithdrawn = 0;
    
    for (let month = 1; month <= n; month++) {
      balance = balance * (1 + r) - swpWithdrawal;
      totalWithdrawn += swpWithdrawal;
      if (balance <= 0) {
        balance = 0;
        break;
      }
    }
    
    return { totalWithdrawn, finalBalance: balance };
  }, [swpInitial, swpWithdrawal, swpReturn, swpYears]);

  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);

  return (
    <section id="calculators" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-primary'}`}>
            Interactive <span className="text-accent">Calculators</span>
          </h2>
          <p className={`max-w-2xl mx-auto ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Plan your financial future with our precise investment tools.
          </p>
        </div>

        <div className="flex justify-center mb-10">
          <div className={`p-1 rounded-xl flex ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
            <button 
              onClick={() => setCalcType('SIP')}
              className={`px-8 py-2 rounded-lg text-sm font-semibold transition-all ${calcType === 'SIP' ? 'bg-secondary text-white shadow-md' : (darkMode ? 'text-gray-400' : 'text-gray-600')}`}
            >
              SIP Calculator
            </button>
            <button 
              onClick={() => setCalcType('SWP')}
              className={`px-8 py-2 rounded-lg text-sm font-semibold transition-all ${calcType === 'SWP' ? 'bg-secondary text-white shadow-md' : (darkMode ? 'text-gray-400' : 'text-gray-600')}`}
            >
              SWP Calculator
            </button>
          </div>
        </div>

        <div className={`grid md:grid-cols-2 gap-12 p-8 md:p-12 rounded-3xl shadow-xl ${darkMode ? 'bg-gray-900 border border-gray-800' : 'bg-white'}`}>
          {/* Inputs */}
          <div className="space-y-8">
            {calcType === 'SIP' ? (
              <>
                <div>
                  <div className="flex justify-between mb-2">
                    <label className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Monthly Investment</label>
                    <span className="text-secondary font-bold">{formatCurrency(sipMonthly)}</span>
                  </div>
                  <input 
                    type="range" min="500" max="100000" step="500" value={sipMonthly} 
                    onChange={(e) => setSipMonthly(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-secondary"
                  />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <label className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Expected Return (%)</label>
                    <span className="text-secondary font-bold">{sipReturn}%</span>
                  </div>
                  <input 
                    type="range" min="1" max="30" step="0.5" value={sipReturn} 
                    onChange={(e) => setSipReturn(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-secondary"
                  />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <label className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Duration (Years)</label>
                    <span className="text-secondary font-bold">{sipYears}y</span>
                  </div>
                  <input 
                    type="range" min="1" max="40" step="1" value={sipYears} 
                    onChange={(e) => setSipYears(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-secondary"
                  />
                </div>
              </>
            ) : (
              <>
                <div>
                  <div className="flex justify-between mb-2">
                    <label className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Initial Investment</label>
                    <span className="text-secondary font-bold">{formatCurrency(swpInitial)}</span>
                  </div>
                  <input 
                    type="range" min="100000" max="10000000" step="50000" value={swpInitial} 
                    onChange={(e) => setSwpInitial(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-secondary"
                  />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <label className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Monthly Withdrawal</label>
                    <span className="text-secondary font-bold">{formatCurrency(swpWithdrawal)}</span>
                  </div>
                  <input 
                    type="range" min="1000" max="200000" step="1000" value={swpWithdrawal} 
                    onChange={(e) => setSwpWithdrawal(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-secondary"
                  />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <label className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Expected Return (%)</label>
                    <span className="text-secondary font-bold">{swpReturn}%</span>
                  </div>
                  <input 
                    type="range" min="1" max="20" step="0.5" value={swpReturn} 
                    onChange={(e) => setSwpReturn(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-secondary"
                  />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <label className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Duration (Years)</label>
                    <span className="text-secondary font-bold">{swpYears}y</span>
                  </div>
                  <input 
                    type="range" min="1" max="30" step="1" value={swpYears} 
                    onChange={(e) => setSwpYears(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-secondary"
                  />
                </div>
              </>
            )}
          </div>

          {/* Outputs */}
          <div className={`p-8 rounded-2xl flex flex-col justify-center ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
            {calcType === 'SIP' ? (
              <div className="space-y-6">
                <div className="flex justify-between items-center pb-4 border-b border-gray-200 dark:border-gray-700">
                  <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Invested Amount</span>
                  <span className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-primary'}`}>{formatCurrency(sipResults.investedAmount)}</span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-gray-200 dark:border-gray-700">
                  <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Estimated Returns</span>
                  <span className="text-lg font-semibold text-success">{formatCurrency(sipResults.estReturns)}</span>
                </div>
                <div className="flex justify-between items-center pt-2">
                  <span className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-primary'}`}>Total Value</span>
                  <span className="text-3xl font-extrabold text-secondary">{formatCurrency(sipResults.totalValue)}</span>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex justify-between items-center pb-4 border-b border-gray-200 dark:border-gray-700">
                  <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Total Withdrawn</span>
                  <span className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-primary'}`}>{formatCurrency(swpResults.totalWithdrawn)}</span>
                </div>
                <div className="flex justify-between items-center pt-2">
                  <span className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-primary'}`}>Final Balance</span>
                  <span className="text-3xl font-extrabold text-secondary">{formatCurrency(swpResults.finalBalance)}</span>
                </div>
                {swpResults.finalBalance === 0 && (
                  <p className="text-red-500 text-sm mt-4 font-medium">Note: Capital exhausted before the end of tenure.</p>
                )}
              </div>
            )}
            <button className="mt-10 w-full bg-accent text-primary font-bold py-4 rounded-xl hover:shadow-lg transition-all active:scale-95">
              Download Detailed Report
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('finAuraDarkMode');
    if (saved === 'true') setDarkMode(true);
  }, []);

  const toggleDarkMode = () => {
    const newVal = !darkMode;
    setDarkMode(newVal);
    localStorage.setItem('finAuraDarkMode', String(newVal));
    if (newVal) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  };

  const services: Service[] = [
    { id: 'sip', title: 'SIP Planning', description: 'Automated monthly investments to build long-term wealth systematically.', icon: TrendingUp },
    { id: 'swp', title: 'SWP Strategy', description: 'Smart withdrawal plans for a regular income stream post-retirement.', icon: RefreshCw },
    { id: 'mf', title: 'Mutual Fund Advisory', description: 'Expert selection of top-performing funds tailored to your risk profile.', icon: PieChart },
    { id: 'elss', title: 'ELSS Tax Saving', description: 'Maximize your tax deductions under Section 80C with equity growth.', icon: ShieldCheck },
    { id: 'retirement', title: 'Retirement Planning', description: 'Secure your golden years with a robust corpus and inflation-adjusted income.', icon: Clock },
    { id: 'goal', title: 'Goal-Based Investing', description: 'Dedicated portfolios for your house, education, or dream vacation.', icon: Target },
    { id: 'portfolio', title: 'Portfolio Review', description: 'Comprehensive analysis and rebalancing of your existing investments.', icon: Briefcase },
    { id: 'consult', title: 'Financial Consultation', description: 'One-on-one sessions with experts to map your financial journey.', icon: MessageSquare },
  ];

  const testimonials: Testimonial[] = [
    { id: 1, name: 'Ananya Sharma', role: 'Software Engineer', content: 'FinAura Capital transformed how I look at my savings. The SIP strategy they built for me is already showing great results.', rating: 5 },
    { id: 2, name: 'Vikram Mehta', role: 'Business Owner', content: 'Professional, transparent, and highly knowledgeable. Shubham and his team truly put the client first.', rating: 5 },
    { id: 3, name: 'Rahul Deshmukh', role: 'Marketing Head', content: 'The tax-saving ELSS advice was a game-changer for my year-end planning. Highly recommend their services!', rating: 4 },
  ];

  const blogPosts: BlogPost[] = [
    { id: 1, title: '5 Mistakes First-Time Investors Make', excerpt: 'Learn how to avoid common pitfalls and start your wealth journey on the right foot.', category: 'Education', date: 'Feb 20, 2026', image: 'https://picsum.photos/seed/invest1/800/600' },
    { id: 2, title: 'Market Outlook: Q1 2026 Trends', excerpt: 'A deep dive into the current market dynamics and what it means for your portfolio.', category: 'Market', date: 'Feb 15, 2026', image: 'https://picsum.photos/seed/invest2/800/600' },
    { id: 3, title: 'The Power of Compounding Explained', excerpt: 'Why starting early is the single most important factor in wealth creation.', category: 'Strategy', date: 'Feb 10, 2026', image: 'https://picsum.photos/seed/invest3/800/600' },
  ];

  return (
    <div className={darkMode ? 'dark' : ''}>
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className={`absolute inset-0 opacity-20 ${darkMode ? 'bg-[radial-gradient(circle_at_50%_50%,#1E3A8A,transparent)]' : 'bg-[radial-gradient(circle_at_50%_50%,#D4AF37,transparent)]'}`} />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-bold uppercase tracking-wider mb-6">
              <ShieldCheck size={14} /> SEBI Compliant Advisory
            </div>
            <h1 className={`text-5xl md:text-7xl font-extrabold leading-tight mb-6 ${darkMode ? 'text-white' : 'text-primary'}`}>
              Build Wealth. <br />
              <span className="text-accent">Secure Your Future.</span>
            </h1>
            <p className={`text-lg md:text-xl mb-10 max-w-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Smart, goal-based investment solutions designed to grow your money confidently with expert guidance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#calculators" className="bg-secondary text-white px-8 py-4 rounded-xl font-bold text-center hover:bg-primary transition-all shadow-lg hover:shadow-secondary/20 active:scale-95 flex items-center justify-center gap-2">
                Start Investing <ArrowRight size={20} />
              </a>
              <a href="#contact" className={`px-8 py-4 rounded-xl font-bold text-center border-2 transition-all active:scale-95 ${darkMode ? 'border-gray-700 text-white hover:bg-gray-800' : 'border-gray-200 text-primary hover:bg-gray-50'}`}>
                Book Free Consultation
              </a>
            </div>
            
            <div className="mt-12 flex items-center gap-8">
              <div>
                <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-primary'}`}>100+</p>
                <p className="text-sm text-gray-500">Happy Clients</p>
              </div>
              <div className="w-px h-10 bg-gray-200 dark:bg-gray-800" />
              <div>
                <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-primary'}`}>₹50Cr+</p>
                <p className="text-sm text-gray-500">AUM Managed</p>
              </div>
              <div className="w-px h-10 bg-gray-200 dark:bg-gray-800" />
              <div>
                <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-primary'}`}>10+</p>
                <p className="text-sm text-gray-500">Years Experience</p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="relative z-10 bg-white dark:bg-gray-900 p-6 rounded-[2rem] shadow-2xl border border-gray-100 dark:border-gray-800">
              <div className="flex justify-between items-center mb-8">
                <h3 className={`font-bold ${darkMode ? 'text-white' : 'text-primary'}`}>Portfolio Growth</h3>
                <div className="flex gap-1">
                  <div className="w-2 h-2 rounded-full bg-red-400" />
                  <div className="w-2 h-2 rounded-full bg-yellow-400" />
                  <div className="w-2 h-2 rounded-full bg-green-400" />
                </div>
              </div>
              <div className="h-64 flex items-end gap-3">
                {[40, 65, 45, 80, 55, 90, 75, 100].map((h, i) => (
                  <motion.div 
                    key={i}
                    initial={{ height: 0 }}
                    animate={{ height: `${h}%` }}
                    transition={{ duration: 1, delay: i * 0.1 }}
                    className={`flex-1 rounded-t-lg ${i === 7 ? 'bg-accent' : 'bg-secondary/20 dark:bg-secondary/40'}`}
                  />
                ))}
              </div>
              <div className="mt-8 p-4 rounded-xl bg-gray-50 dark:bg-gray-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-success/20 flex items-center justify-center text-success">
                    <TrendingUp size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Monthly Return</p>
                    <p className={`font-bold ${darkMode ? 'text-white' : 'text-primary'}`}>+12.4%</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500">Total Value</p>
                  <p className={`font-bold ${darkMode ? 'text-white' : 'text-primary'}`}>₹24,50,000</p>
                </div>
              </div>
            </div>
            {/* Decorative blobs */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-accent/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-secondary/20 rounded-full blur-3xl" />
          </motion.div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className={`py-12 ${darkMode ? 'bg-gray-900/50' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: ShieldCheck, label: 'SEBI Registered', value: 'Compliant' },
              { icon: Users, label: 'Active Clients', value: '100+' },
              { icon: Award, label: 'Success Rate', value: '98%' },
              { icon: RefreshCw, label: 'Fee Structure', value: 'Transparent' },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center text-center">
                <item.icon className="text-accent mb-3" size={32} />
                <p className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{item.label}</p>
                <p className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-primary'}`}>{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <img 
              src="https://picsum.photos/seed/founder/800/1000" 
              alt="Founder" 
              className="rounded-3xl shadow-2xl z-10 relative"
              referrerPolicy="no-referrer"
            />
            <div className="absolute -bottom-6 -right-6 bg-secondary text-white p-8 rounded-2xl shadow-xl z-20 hidden sm:block">
              <p className="text-3xl font-bold mb-1">Shubham Dalvi</p>
              <p className="text-accent font-medium">Founder & Chief Advisor</p>
            </div>
          </div>
          <div>
            <h2 className={`text-3xl md:text-4xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-primary'}`}>
              About <span className="text-accent">FinAura Capital</span>
            </h2>
            <p className={`text-lg mb-6 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Founded by Shubham Vilas Dalvi, FinAura Capital was born out of a mission to simplify investing for the modern Indian professional. We believe that wealth building shouldn't be a mystery, but a disciplined, data-driven journey.
            </p>
            <div className="space-y-4 mb-10">
              {[
                'Long-term wealth building focus',
                'Ethical and unbiased advisory',
                'Risk-managed investment strategies',
                'Personalized client-first approach'
              ].map((text, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle2 className="text-success" size={20} />
                  <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>{text}</span>
                </div>
              ))}
            </div>
            <button className="bg-primary text-white dark:bg-white dark:text-primary px-8 py-4 rounded-xl font-bold hover:shadow-lg transition-all active:scale-95">
              Learn More About Our Philosophy
            </button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className={`py-24 ${darkMode ? 'bg-gray-900/50' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-primary'}`}>
              Our <span className="text-accent">Services</span>
            </h2>
            <p className={`max-w-2xl mx-auto ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Comprehensive financial solutions tailored to your life stages and aspirations.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service) => (
              <motion.div 
                key={service.id}
                whileHover={{ y: -10 }}
                className={`p-8 rounded-3xl transition-all border ${darkMode ? 'bg-gray-900 border-gray-800 hover:border-accent/50' : 'bg-white border-gray-100 hover:border-accent/50 hover:shadow-xl'}`}
              >
                <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary mb-6">
                  <service.icon size={28} />
                </div>
                <h3 className={`text-xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-primary'}`}>{service.title}</h3>
                <p className={`text-sm leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{service.description}</p>
                <a href="#contact" className="mt-6 inline-flex items-center gap-2 text-accent font-bold text-sm hover:gap-3 transition-all">
                  Get Started <ChevronRight size={16} />
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Calculators */}
      <CalculatorSection darkMode={darkMode} />

      {/* Why Choose Us */}
      <section className={`py-24 ${darkMode ? 'bg-gray-900/50' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className={`text-3xl md:text-4xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-primary'}`}>
                Why Choose <span className="text-accent">FinAura?</span>
              </h2>
              <p className={`text-lg mb-10 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                We combine human expertise with data-driven insights to deliver superior investment outcomes.
              </p>
              <div className="grid sm:grid-cols-2 gap-6">
                {[
                  { title: 'Data-Driven Strategy', desc: 'No guesswork, only proven algorithms.', icon: PieChart },
                  { title: 'Risk Optimization', desc: 'Protecting your downside is our priority.', icon: ShieldCheck },
                  { title: 'Transparent Reporting', desc: 'Real-time access to your portfolio.', icon: RefreshCw },
                  { title: 'Dedicated Support', desc: 'We are here for you, whenever you need.', icon: MessageSquare },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
                      <item.icon size={20} />
                    </div>
                    <div>
                      <h4 className={`font-bold mb-1 ${darkMode ? 'text-white' : 'text-primary'}`}>{item.title}</h4>
                      <p className="text-sm text-gray-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src="https://picsum.photos/seed/finance/800/800" 
                  alt="Finance" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-secondary rounded-3xl -z-10" />
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-accent rounded-3xl -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-primary'}`}>
              Client <span className="text-accent">Success Stories</span>
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <div key={t.id} className={`p-8 rounded-3xl border ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-100 shadow-lg'}`}>
                <div className="flex gap-1 mb-6">
                  {[...Array(t.rating)].map((_, i) => <Star key={i} size={16} className="fill-accent text-accent" />)}
                </div>
                <p className={`italic mb-8 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>"{t.content}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gray-200" />
                  <div>
                    <p className={`font-bold ${darkMode ? 'text-white' : 'text-primary'}`}>{t.name}</p>
                    <p className="text-xs text-gray-500">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className={`py-24 ${darkMode ? 'bg-gray-900/50' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="text-left">
              <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-primary'}`}>
                Market <span className="text-accent">Insights</span>
              </h2>
              <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Stay updated with the latest in finance and investing.</p>
            </div>
            <button className="text-secondary font-bold flex items-center gap-2 hover:gap-3 transition-all">
              View All Articles <ArrowRight size={20} />
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <div key={post.id} className={`group rounded-3xl overflow-hidden transition-all ${darkMode ? 'bg-gray-900' : 'bg-white shadow-md hover:shadow-xl'}`}>
                <div className="h-48 overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-xs font-bold text-accent uppercase tracking-wider">{post.category}</span>
                    <span className="text-xs text-gray-500">{post.date}</span>
                  </div>
                  <h3 className={`text-xl font-bold mb-3 group-hover:text-secondary transition-colors ${darkMode ? 'text-white' : 'text-primary'}`}>{post.title}</h3>
                  <p className={`text-sm mb-6 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{post.excerpt}</p>
                  <button className={`text-sm font-bold flex items-center gap-1 ${darkMode ? 'text-gray-300' : 'text-primary'}`}>
                    Read More <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-[3rem] overflow-hidden bg-secondary p-12 md:p-20 text-center text-white">
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 rounded-full blur-3xl -mr-32 -mt-32" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -ml-32 -mb-32" />
            
            <h2 className="text-4xl md:text-6xl font-extrabold mb-8 relative z-10">
              Start Your Investment <br className="hidden md:block" /> Journey Today
            </h2>
            <p className="text-lg md:text-xl mb-12 text-blue-100 max-w-2xl mx-auto relative z-10">
              Join 100+ investors who are building their dream future with FinAura Capital.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
              <a href="#contact" className="bg-accent text-primary px-10 py-5 rounded-2xl font-bold text-lg hover:shadow-2xl transition-all active:scale-95">
                Schedule Free Call
              </a>
              <a href="https://wa.me/919999999999" className="bg-white/10 backdrop-blur-md border border-white/20 px-10 py-5 rounded-2xl font-bold text-lg hover:bg-white/20 transition-all active:scale-95 flex items-center justify-center gap-2">
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <h2 className={`text-3xl md:text-4xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-primary'}`}>
                Get in <span className="text-accent">Touch</span>
              </h2>
              <p className={`text-lg mb-10 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
              </p>
              
              <div className="space-y-8">
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary">
                    <Phone size={24} />
                  </div>
                  <div>
                    <p className={`font-bold ${darkMode ? 'text-white' : 'text-primary'}`}>Call Us</p>
                    <p className="text-gray-500">+91 98765 43210</p>
                  </div>
                </div>
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary">
                    <Mail size={24} />
                  </div>
                  <div>
                    <p className={`font-bold ${darkMode ? 'text-white' : 'text-primary'}`}>Email Us</p>
                    <p className="text-gray-500">hello@finaura.capital</p>
                  </div>
                </div>
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <p className={`font-bold ${darkMode ? 'text-white' : 'text-primary'}`}>Visit Us</p>
                    <p className="text-gray-500">Financial District, Mumbai, India</p>
                  </div>
                </div>
              </div>
            </div>

            <div className={`p-8 md:p-10 rounded-[2rem] shadow-2xl border ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-100'}`}>
              <form className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Full Name</label>
                    <input type="text" className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-secondary outline-none transition-all ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-gray-50 border-gray-200'}`} placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <label className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Email Address</label>
                    <input type="email" className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-secondary outline-none transition-all ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-gray-50 border-gray-200'}`} placeholder="john@example.com" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Phone Number</label>
                  <input type="tel" className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-secondary outline-none transition-all ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-gray-50 border-gray-200'}`} placeholder="+91 00000 00000" />
                </div>
                <div className="space-y-2">
                  <label className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Investment Goal</label>
                  <select className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-secondary outline-none transition-all ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-gray-50 border-gray-200'}`}>
                    <option>Retirement Planning</option>
                    <option>Tax Saving (ELSS)</option>
                    <option>Child's Education</option>
                    <option>Wealth Creation</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Message</label>
                  <textarea rows={4} className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-secondary outline-none transition-all ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-gray-50 border-gray-200'}`} placeholder="How can we help you?"></textarea>
                </div>
                <button className="w-full bg-secondary text-white font-bold py-4 rounded-xl hover:shadow-lg transition-all active:scale-95">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`pt-24 pb-12 ${darkMode ? 'bg-gray-950' : 'bg-primary text-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <TrendingUp className="text-accent" size={32} />
                <span className="text-2xl font-bold tracking-tight">FinAura<span className="text-accent">Capital</span></span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Premium investment advisory services designed to help you build long-term wealth with confidence and clarity.
              </p>
              <div className="flex gap-4">
                {['twitter', 'linkedin', 'instagram', 'facebook'].map((social) => (
                  <a key={social} href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-accent hover:text-primary transition-all">
                    <span className="sr-only">{social}</span>
                    <div className="w-5 h-5 bg-current opacity-50" />
                  </a>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-bold mb-6 text-lg">Quick Links</h4>
              <ul className="space-y-4 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-accent transition-colors">Home</a></li>
                <li><a href="#about" className="hover:text-accent transition-colors">About Us</a></li>
                <li><a href="#services" className="hover:text-accent transition-colors">Services</a></li>
                <li><a href="#calculators" className="hover:text-accent transition-colors">Calculators</a></li>
                <li><a href="#contact" className="hover:text-accent transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-6 text-lg">Services</h4>
              <ul className="space-y-4 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-accent transition-colors">SIP Planning</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">Mutual Funds</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">Tax Saving</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">Retirement</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">Portfolio Review</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-6 text-lg">Newsletter</h4>
              <p className="text-gray-400 text-sm mb-6">Subscribe to get weekly market insights and investment tips.</p>
              <form className="flex gap-2">
                <input type="email" placeholder="Email" className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm outline-none focus:border-accent flex-1" />
                <button className="bg-accent text-primary p-2 rounded-lg font-bold">
                  <ArrowRight size={20} />
                </button>
              </form>
            </div>
          </div>
          
          <div className="pt-12 border-t border-white/10 text-center space-y-6">
            <p className="text-xs text-gray-500 max-w-4xl mx-auto">
              Disclaimer: Mutual Fund investments are subject to market risks, read all scheme related documents carefully. The information provided is for educational purposes and should not be considered as financial advice.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-xs text-gray-500">
              <a href="#" className="hover:text-gray-300">Privacy Policy</a>
              <a href="#" className="hover:text-gray-300">Terms & Conditions</a>
              <a href="#" className="hover:text-gray-300">Risk Disclosure</a>
            </div>
            <p className="text-sm text-gray-400">
              © 2026 FinAura Capital. All rights reserved. Designed by Shubham Vilas Dalvi.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
