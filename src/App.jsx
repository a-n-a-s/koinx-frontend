import React, { useState, useMemo, useEffect } from "react";
import Koinx_logo from "./components/Koinx_logo";
import Menu from "./components/Menu";
import Notice from "./components/notice";
import Expand from "./components/expand";
import HoldingsTable from "./components/HoldingsTable";
import { fetchCapitalGains, fetchHoldings } from "./data/mockData";

const App = () => {
  const [selectedCoins, setSelectedCoins] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isNotesOpen, setIsNotesOpen] = useState(false);

  const [holdings, setHoldings] = useState([]);
  const [preGains, setPreGains] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [gainsRes, holdingsRes] = await Promise.all([
          fetchCapitalGains(),
          fetchHoldings()
        ]);
        setPreGains(gainsRes.capitalGains);
        setHoldings(holdingsRes);
      } catch (err) {
        setError("Failed to fetch data.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  // Handlers for table selection
  const handleSelectCoin = (coin) => {
    setSelectedCoins((prev) =>
      prev.includes(coin) ? prev.filter((c) => c !== coin) : [...prev, coin]
    );
  };

  const handleSelectAll = (isChecked) => {
    if (isChecked) {
      setSelectedCoins(holdings.map((h) => h.coin));
    } else {
      setSelectedCoins([]);
    }
  };

  // Pre-Harvesting Calculations
  const preStcgNet = preGains ? preGains.stcg.profits - preGains.stcg.losses : 0;
  const preLtcgNet = preGains ? preGains.ltcg.profits - preGains.ltcg.losses : 0;
  const preRealizedGains = preStcgNet + preLtcgNet;

  // After-Harvesting Calculations
  const postGains = useMemo(() => {
    if (!preGains) return null;
    let newStcgProfits = preGains.stcg.profits;
    let newStcgLosses = preGains.stcg.losses;
    let newLtcgProfits = preGains.ltcg.profits;
    let newLtcgLosses = preGains.ltcg.losses;

    selectedCoins.forEach((coinId) => {
      const holding = holdings.find((h) => h.coin === coinId);
      if (holding) {
        // Handle STCG
        if (holding.stcg.gain > 0) {
          newStcgProfits += holding.stcg.gain;
        } else {
          newStcgLosses += Math.abs(holding.stcg.gain);
        }

        // Handle LTCG
        if (holding.ltcg.gain > 0) {
          newLtcgProfits += holding.ltcg.gain;
        } else {
          newLtcgLosses += Math.abs(holding.ltcg.gain);
        }
      }
    });

    const postStcgNet = newStcgProfits - newStcgLosses;
    const postLtcgNet = newLtcgProfits - newLtcgLosses;
    const postRealizedGains = postStcgNet + postLtcgNet;

    return {
      stcg: { profits: newStcgProfits, losses: newStcgLosses, net: postStcgNet },
      ltcg: { profits: newLtcgProfits, losses: newLtcgLosses, net: postLtcgNet },
      realizedGains: postRealizedGains,
    };
  }, [selectedCoins, preGains, holdings]);

  const taxSavings = postGains ? preRealizedGains - postGains.realizedGains : 0;

  // Helper for formatting currency
  const formatCurrency = (val) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(val || 0);

  return (
    <div className={isDarkMode ? "dark" : ""}>
      <div className="min-h-screen bg-[#f1f5f9] dark:bg-[#0f172a] text-gray-900 dark:text-gray-100 pb-10 transition-colors duration-300">
        {/* header */}
        <div className="flex justify-between items-center p-6 bg-white dark:bg-[#1e293b] shadow-sm mb-2 transition-colors duration-300">
          <Koinx_logo />
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors shadow-sm text-lg"
              title="Toggle Dark Mode"
            >
              {isDarkMode ? "☀️" : "🌙"}
            </button>
            <Menu />
          </div>
        </div>

        {/* content */}
        <div className="px-4 md:px-8 max-w-7xl mx-auto">
          {isLoading ? (
            <div className="animate-pulse">
              {/* Title Skeleton */}
              <div className="mt-4 h-7 bg-gray-200 dark:bg-gray-800 rounded w-48 mb-4"></div>
              {/* Notice Skeleton */}
              <div className="my-4 h-14 bg-gray-200 dark:bg-gray-800 rounded-lg w-full"></div>
              
              {/* Cards Skeleton */}
              <div className="flex flex-col md:flex-row gap-6 mt-6">
                <div className="bg-gray-200 dark:bg-gray-800 h-[300px] rounded-xl flex-1 shadow-sm"></div>
                <div className="bg-gray-200 dark:bg-gray-800 h-[300px] rounded-xl flex-1 shadow-sm"></div>
              </div>

              {/* Table Skeleton */}
              <div className="mt-6 h-[400px] bg-gray-200 dark:bg-gray-800 rounded-xl w-full shadow-sm"></div>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-20 text-red-500">
              <p>{error}</p>
            </div>
          ) : (
            <>
              <div className="mt-4">
                <h1 className="text-xl font-semibold dark:text-white flex items-center">
                  Tax Harvesting{" "}
                  <span className="relative group text-blue-600 dark:text-blue-400 text-sm underline mx-2 cursor-pointer">
                    How it works?
                    {/* Tooltip */}
                    <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-64 p-3 bg-gray-900 dark:bg-gray-800 text-white text-xs rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 font-normal leading-relaxed pointer-events-none before:content-[''] before:absolute before:bottom-full before:left-1/2 before:-translate-x-1/2 before:border-8 before:border-transparent before:border-b-gray-900 dark:before:border-b-gray-800">
                      Select underperforming assets from your portfolio to offset your capital gains. This reduces your overall tax liability while letting you reinvest the proceeds.
                    </div>
                  </span>
                </h1>
              </div>
              
              <div className="my-4 border border-blue-200 dark:border-blue-500/30 bg-blue-50 dark:bg-blue-500/10 rounded-lg overflow-hidden transition-colors duration-300">
                <div 
                  className="font-semibold text-sm text-gray-800 dark:text-blue-100 p-3 flex justify-between items-center cursor-pointer hover:bg-blue-100/50 dark:hover:bg-blue-500/20 transition-colors"
                  onClick={() => setIsNotesOpen(!isNotesOpen)}
                >
                  <div className="flex gap-2 items-center">
                    <Notice />
                    Important Notes & Disclaimers
                  </div>
                  <div className={`transition-transform duration-300 ${isNotesOpen ? 'rotate-180' : ''}`}>
                    <Expand />
                  </div>
                </div>
                
                <div 
                  className={`transition-all duration-300 ease-in-out ${isNotesOpen ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  <div className="p-4 pt-1 text-xs text-gray-600 dark:text-gray-300 border-t border-blue-200/50 dark:border-blue-500/20 mt-1">
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Tax harvesting is subject to market risks. Please consult a registered financial advisor before making tax decisions.</li>
                      <li>Calculations provided are estimations based on selected assets and may not reflect your actual final tax liabilities.</li>
                      <li>Net Capital Gains and Realized Capital Gains computations are performed based on the provided dummy parameters for this application.</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              {/* Cards Container */}
              <div className="flex flex-col md:flex-row gap-6 mt-6">
                {/* card1 */}
                <div className="bg-white dark:bg-[#1e293b] p-6 rounded-xl shadow-md flex-1 transition-colors duration-300 border border-transparent dark:border-gray-800">
                  <h1 className="text-lg font-semibold text-gray-900 dark:text-white border-b dark:border-gray-700 pb-3 mb-4">
                    Pre Harvesting
                  </h1>
                  <div className="grid grid-cols-3 gap-y-4 text-sm font-medium text-gray-600 dark:text-gray-400">
                    <div></div>
                    <div className="text-right">Short-term</div>
                    <div className="text-right">Long-term</div>

                    <div>Profits</div>
                    <div className="text-right">{formatCurrency(preGains.stcg.profits)}</div>
                    <div className="text-right">{formatCurrency(preGains.ltcg.profits)}</div>

                    <div>Losses</div>
                    <div className="text-right text-red-500 dark:text-red-400">-{formatCurrency(preGains.stcg.losses)}</div>
                    <div className="text-right text-red-500 dark:text-red-400">-{formatCurrency(preGains.ltcg.losses)}</div>

                    <div className="font-bold text-black dark:text-white mt-2">Net Capital Gains</div>
                    <div className="text-right font-bold text-black dark:text-white mt-2">
                      {formatCurrency(preStcgNet)}
                    </div>
                    <div className="text-right font-bold text-black dark:text-white mt-2">
                      {formatCurrency(preLtcgNet)}
                    </div>
                  </div>
                  <div className="mt-6 pt-4 border-t dark:border-gray-700">
                    <p className="text-lg font-bold text-black dark:text-white flex justify-between">
                      <span>Realized Capital Gains</span>
                      <span>{formatCurrency(preRealizedGains)}</span>
                    </p>
                  </div>
                </div>

                {/* card2 */}
                <div className="p-6 rounded-xl shadow-md flex-1 text-white bg-gradient-to-br from-[#3c9aff] to-[#0066fe] border border-blue-400/30">
                  <h1 className="text-lg font-semibold border-b-2 border-blue-300 pb-3 mb-4 text-white">
                    After Harvesting
                  </h1>
                  <div className="grid grid-cols-3 gap-y-4 text-sm font-medium text-blue-100">
                    <div></div>
                    <div className="text-right">Short-term</div>
                    <div className="text-right">Long-term</div>

                    <div>Profits</div>
                    <div className="text-right">{formatCurrency(postGains.stcg.profits)}</div>
                    <div className="text-right">{formatCurrency(postGains.ltcg.profits)}</div>

                    <div>Losses</div>
                    <div className="text-right text-blue-200">-{formatCurrency(postGains.stcg.losses)}</div>
                    <div className="text-right text-blue-200">-{formatCurrency(postGains.ltcg.losses)}</div>

                    <div className="font-bold text-white mt-2">Net Capital Gains</div>
                    <div className="text-right font-bold text-white mt-2">
                      {formatCurrency(postGains.stcg.net)}
                    </div>
                    <div className="text-right font-bold text-white mt-2">
                      {formatCurrency(postGains.ltcg.net)}
                    </div>
                  </div>
                  <div className="mt-6 pt-4 border-t border-blue-300">
                    <p className="text-lg font-bold flex justify-between text-white">
                      <span>Realized Capital Gains</span>
                      <span>{formatCurrency(postGains.realizedGains)}</span>
                    </p>
                    {taxSavings > 0 && (
                      <div className="mt-3 bg-white/20 p-2 rounded-lg text-center font-semibold animate-pulse text-white backdrop-blur-sm shadow-inner">
                        🎉 You're going to save {formatCurrency(taxSavings)}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Holdings */}
              <div className="mt-6 px-4 py-4 bg-white dark:bg-[#1e293b] rounded-xl shadow-sm transition-colors duration-300 border border-transparent dark:border-gray-800">
                <h1 className="text-lg font-semibold text-gray-900 dark:text-white">Holdings</h1>
                <HoldingsTable
                  holdings={holdings}
                  selectedCoins={selectedCoins}
                  onSelectCoin={handleSelectCoin}
                  onSelectAll={handleSelectAll}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
