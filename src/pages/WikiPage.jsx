import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import {
  BookOpen,
  ChevronRight,
  Search,
  CheckCircle,
  BarChart2,
  FileText,
  Users,
  AlertTriangle,
  TrendingUp,
} from 'lucide-react';

const WikiPage = () => {
  const { topic } = useParams();
  const { isDark } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTopic, setSelectedTopic] = useState(topic || 'how-cse-works');

  const topics = [
    {
      id: 'how-cse-works',
      title: 'How the CSE Works',
      icon: <BarChart2 size={20} />,
      sections: [
        {
          title: 'What is a Stock Exchange?',
          content: `A stock exchange is a marketplace where securities such as stocks, bonds, and other financial instruments are bought and sold. The Colombo Stock Exchange (CSE) is Sri Lanka's primary stock exchange, facilitating capital formation and investment opportunities.

The CSE operates as a regulated marketplace where companies can raise capital by issuing shares to the public, and investors can buy and sell these shares based on market dynamics.`,
        },
        {
          title: 'CSE History and Structure',
          content: `The Colombo Stock Exchange was established in 1985, evolving from the Colombo Share Brokers' Association which was founded in 1896. Today, it operates under the Securities and Exchange Commission of Sri Lanka.

The exchange lists over 290 companies across 20 business sectors, with a combined market capitalization exceeding LKR 3 trillion. The CSE operates both the Main Board and the Diri Savi Board for different types of listings.`,
        },
        {
          title: 'Trading Hours and Mechanisms',
          content: `The CSE operates from Monday to Friday with the following schedule:

• Pre-Open Session: 9:00 AM - 9:30 AM
• Continuous Trading: 9:30 AM - 2:30 PM
• Pre-Close Session: 2:30 PM - 2:35 PM

Trading is conducted through an Automated Trading System (ATS) that matches buy and sell orders based on price and time priority.`,
        },
        {
          title: 'Settlement Process',
          content: `The CSE follows a T+2 settlement cycle, meaning trades are settled two business days after the transaction date. The Central Depository System (CDS) handles the clearing and settlement of all trades.

Investors must maintain a CDS account to hold their securities in electronic form. This system ensures secure and efficient transfer of ownership.`,
        },
      ],
    },
    {
      id: 'financial-statements',
      title: 'Understanding Financial Statements',
      icon: <FileText size={20} />,
      sections: [
        {
          title: 'Balance Sheet Basics',
          content: `A balance sheet provides a snapshot of a company's financial position at a specific point in time. It shows:

• Assets: What the company owns (cash, inventory, property, equipment)
• Liabilities: What the company owes (loans, accounts payable)
• Shareholders' Equity: The residual interest (assets minus liabilities)

The fundamental equation is: Assets = Liabilities + Shareholders' Equity`,
        },
        {
          title: 'Income Statement Interpretation',
          content: `The income statement shows a company's financial performance over a period of time:

• Revenue: Total income from sales
• Cost of Goods Sold: Direct costs of production
• Gross Profit: Revenue minus COGS
• Operating Expenses: Administrative and selling costs
• Net Income: Final profit after all expenses and taxes

Key metrics include gross margin, operating margin, and net profit margin.`,
        },
        {
          title: 'Cash Flow Analysis',
          content: `The cash flow statement shows how cash moves in and out of the business:

• Operating Activities: Cash from core business operations
• Investing Activities: Cash spent on or received from investments
• Financing Activities: Cash from debt, equity, or dividends

Free Cash Flow = Operating Cash Flow - Capital Expenditures`,
        },
        {
          title: 'Key Financial Ratios',
          content: `Important ratios for stock analysis:

• P/E Ratio: Price per share / Earnings per share
• P/B Ratio: Market price / Book value per share
• ROE: Net Income / Shareholders' Equity
• Debt-to-Equity: Total Debt / Total Equity
• Current Ratio: Current Assets / Current Liabilities
• Dividend Yield: Annual Dividend / Stock Price`,
        },
      ],
    },
    {
      id: 'investment-strategies',
      title: 'Types of Stocks and Investment Strategies',
      icon: <TrendingUp size={20} />,
      sections: [
        {
          title: 'Blue Chip vs Growth Stocks',
          content: `Blue Chip Stocks:
• Large, well-established companies
• Stable earnings and dividends
• Lower risk, moderate returns
• Examples: JKH, Commercial Bank, HNB

Growth Stocks:
• Companies with high growth potential
• Often reinvest profits instead of dividends
• Higher risk, higher potential returns
• Typically in emerging sectors`,
        },
        {
          title: 'Value Investing',
          content: `Value investing involves finding undervalued stocks trading below their intrinsic value:

• Look for low P/E and P/B ratios
• Strong fundamentals but temporarily out of favor
• Margin of safety in price
• Long-term investment horizon
• Famous practitioners: Warren Buffett, Benjamin Graham`,
        },
        {
          title: 'Dividend Investing',
          content: `Dividend investing focuses on stocks that pay regular dividends:

• Steady income stream
• Often mature, stable companies
• Reinvesting dividends compounds returns
• Key metrics: Dividend yield, payout ratio
• Consider dividend growth history`,
        },
        {
          title: 'Risk Management',
          content: `Essential risk management principles:

• Diversification across sectors and stocks
• Position sizing (no more than 5-10% in single stock)
• Stop-loss orders to limit losses
• Regular portfolio review
• Emergency fund before investing
• Never invest money you can't afford to lose`,
        },
      ],
    },
    {
      id: 'stockbrokers',
      title: 'The Role of Stockbrokers',
      icon: <Users size={20} />,
      sections: [
        {
          title: 'What Brokers Do',
          content: `Stockbrokers are licensed intermediaries who:

• Execute buy and sell orders on your behalf
• Provide market research and recommendations
• Offer trading platforms and tools
• Ensure compliance with regulations
• Maintain your trading and CDS accounts`,
        },
        {
          title: 'How to Choose a Broker',
          content: `Consider these factors when selecting a broker:

• Brokerage fees and commissions
• Online trading platform quality
• Research and educational resources
• Customer service responsiveness
• Mobile app availability
• Reputation and track record`,
        },
        {
          title: 'Account Opening Process',
          content: `Steps to open a trading account:

1. Choose a broker
2. Submit application form
3. Provide required documents:
   - NIC copy
   - Proof of address
   - Bank statement
4. Complete risk disclosure
5. Initial deposit
6. Receive CDS account number`,
        },
        {
          title: 'Brokerage Fees Structure',
          content: `Common fee structures in Sri Lanka:

• Commission: 0.5% - 1.5% of trade value
• Minimum charge: LKR 100-500 per transaction
• CSE fees: 0.12%
• SEC fees: 0.045%
• CDS fees: Variable

Always compare total costs including all fees.`,
        },
      ],
    },
    {
      id: 'dos-and-donts',
      title: "Common Dos and Don'ts for Beginners",
      icon: <AlertTriangle size={20} />,
      sections: [
        {
          title: 'Investment Best Practices',
          content: `DO:
• Research before investing
• Start with small amounts
• Diversify your portfolio
• Think long-term
• Keep learning
• Track your investments
• Have an emergency fund first
• Understand what you invest in`,
        },
        {
          title: 'Red Flags to Avoid',
          content: `DON'T:
• Invest based on tips without research
• Put all money in one stock
• Try to time the market
• Panic sell during volatility
• Ignore company fundamentals
• Invest borrowed money
• Follow the crowd blindly
• Expect overnight riches`,
        },
        {
          title: 'Portfolio Diversification',
          content: `Diversification principles:

• Spread across 10-15 stocks minimum
• Include different sectors
• Mix of growth and value stocks
• Consider market cap diversity
• Geographic diversification (if possible)
• Rebalance periodically
• Don't over-diversify (50+ stocks)`,
        },
        {
          title: 'Emotional Discipline',
          content: `Managing emotions in investing:

• Stick to your investment plan
• Avoid FOMO (Fear of Missing Out)
• Don't let fear drive decisions
• Keep perspective during volatility
• Review decisions objectively
• Take breaks from market watching
• Learn from mistakes
• Patience is key to success`,
        },
      ],
    },
  ];

  const currentTopic = topics.find((t) => t.id === selectedTopic) || topics[0];

  const filteredTopics = topics.filter((topic) =>
    topic.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`min-h-screen ${isDark ? 'bg-[#0a0e27]' : 'bg-gray-50'}`}>
      <Header />

      <main className="pt-24 pb-12 px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Investment Wiki
            </h1>
            <p className={`mt-2 ${isDark ? 'text-purple-200' : 'text-gray-600'}`}>
              Learn everything you need to know about investing in the CSE
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div
                className={`rounded-2xl p-6 sticky top-24 ${
                  isDark ? 'bg-[#16213e]/80 border border-purple-800/50' : 'bg-white shadow-md'
                }`}
              >
                {/* Search */}
                <div className="relative mb-6">
                  <Search
                    className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${
                      isDark ? 'text-purple-400' : 'text-gray-400'
                    }`}
                  />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search topics..."
                    className={`w-full pl-9 pr-4 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-accent-cyan ${
                      isDark
                        ? 'bg-[#0a0e27] border-purple-800 text-white placeholder-purple-400'
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                    }`}
                  />
                </div>

                {/* Topics List */}
                <nav className="space-y-2">
                  {filteredTopics.map((topic) => (
                    <button
                      key={topic.id}
                      onClick={() => setSelectedTopic(topic.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                        selectedTopic === topic.id
                          ? 'bg-accent-cyan/10 text-accent-cyan'
                          : isDark
                          ? 'text-purple-200 hover:bg-purple-800/30'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {topic.icon}
                      <span className="text-sm font-medium">{topic.title}</span>
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Content */}
            <div className="lg:col-span-3">
              <div
                className={`rounded-2xl p-8 ${
                  isDark ? 'bg-[#16213e]/80 border border-purple-800/50' : 'bg-white shadow-md'
                }`}
              >
                {/* Breadcrumb */}
                <div className="flex items-center gap-2 mb-6 text-sm">
                  <Link
                    to="/wiki"
                    className={`${isDark ? 'text-purple-200 hover:text-white' : 'text-gray-500 hover:text-gray-700'}`}
                  >
                    Wiki
                  </Link>
                  <ChevronRight size={16} className={isDark ? 'text-purple-400' : 'text-gray-400'} />
                  <span className={isDark ? 'text-white' : 'text-gray-900'}>{currentTopic.title}</span>
                </div>

                {/* Topic Title */}
                <h2
                  className={`text-2xl font-bold mb-8 flex items-center gap-3 ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  {currentTopic.icon}
                  {currentTopic.title}
                </h2>

                {/* Sections */}
                <div className="space-y-8">
                  {currentTopic.sections.map((section, index) => (
                    <div key={index}>
                      <h3
                        className={`text-lg font-semibold mb-4 ${
                          isDark ? 'text-accent-cyan' : 'text-emerald-600'
                        }`}
                      >
                        {section.title}
                      </h3>
                      <div
                        className={`prose prose-sm max-w-none ${
                          isDark ? 'prose-invert text-purple-100' : 'text-gray-600'
                        }`}
                      >
                        {section.content.split('\n').map((paragraph, pIndex) => (
                          <p key={pIndex} className="mb-3 whitespace-pre-line leading-relaxed">
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Navigation */}
                <div className="mt-12 pt-8 border-t border-purple-800/30 flex justify-between">
                  {topics.findIndex((t) => t.id === selectedTopic) > 0 && (
                    <button
                      onClick={() =>
                        setSelectedTopic(
                          topics[topics.findIndex((t) => t.id === selectedTopic) - 1].id
                        )
                      }
                      className={`text-sm font-medium ${
                        isDark ? 'text-accent-cyan hover:text-accent-cyan/80' : 'text-emerald-600 hover:text-emerald-500'
                      }`}
                    >
                      &larr; Previous Topic
                    </button>
                  )}
                  {topics.findIndex((t) => t.id === selectedTopic) < topics.length - 1 && (
                    <button
                      onClick={() =>
                        setSelectedTopic(
                          topics[topics.findIndex((t) => t.id === selectedTopic) + 1].id
                        )
                      }
                      className={`text-sm font-medium ml-auto ${
                        isDark ? 'text-accent-cyan hover:text-accent-cyan/80' : 'text-emerald-600 hover:text-emerald-500'
                      }`}
                    >
                      Next Topic &rarr;
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default WikiPage;
