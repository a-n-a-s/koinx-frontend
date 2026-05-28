import React, { useState, useMemo } from "react";

const HoldingsTable = ({ holdings, selectedCoins, onSelectCoin, onSelectAll }) => {
  const [isViewAll, setIsViewAll] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  // Check if all items are selected for the master checkbox
  const isAllSelected = holdings.length > 0 && selectedCoins.length === holdings.length;

  // Sorting logic
  const sortedHoldings = useMemo(() => {
    let sortableItems = [...holdings];
    if (sortConfig.key) {
      sortableItems.sort((a, b) => {
        let aValue = a[sortConfig.key];
        let bValue = b[sortConfig.key];

        if (sortConfig.key === 'stcg') {
          aValue = a.stcg.gain;
          bValue = b.stcg.gain;
        } else if (sortConfig.key === 'ltcg') {
          aValue = a.ltcg.gain;
          bValue = b.ltcg.gain;
        } else if (sortConfig.key === 'coinName') {
           aValue = a.coinName.toLowerCase();
           bValue = b.coinName.toLowerCase();
        }

        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }
    return sortableItems;
  }, [holdings, sortConfig]);

  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (key) => {
    const isActive = sortConfig.key === key;
    const isAsc = isActive && sortConfig.direction === 'asc';
    return (
      <svg
        className={`inline-block w-3.5 h-3.5 ml-1.5 transition-all duration-200 ${
          isActive ? "text-blue-600 dark:text-blue-400 opacity-100" : "text-gray-400 opacity-0 group-hover:opacity-50"
        } ${isAsc ? "rotate-180" : ""}`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
      </svg>
    );
  };

  const displayedHoldings = isViewAll ? sortedHoldings : sortedHoldings.slice(0, 4);

  return (
    <div className="w-full mt-4">
      {/* Wrapper to make the table scrollable horizontally and vertically (showing ~4 rows) */}
      <div className={`overflow-x-auto custom-scrollbar rounded-lg border border-gray-200 dark:border-gray-700 relative shadow-sm transition-all duration-300 ${isViewAll ? 'max-h-[600px] overflow-y-auto' : ''}`}>
        <table className="w-full text-left min-w-[800px] table-fixed border-collapse bg-white dark:bg-[#1e293b]">
          {/* Header with light bluish background */}
          <thead className="bg-[#f1f5f9] dark:bg-[#0f172a] text-gray-500 dark:text-gray-400 text-xs font-semibold sticky top-0 z-10 shadow-sm transition-colors duration-300">
            <tr>
              <th className="p-4 w-[5%]">
                <input
                  type="checkbox"
                  className="w-4 h-4 cursor-pointer accent-blue-600 rounded border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                  checked={isAllSelected}
                  onChange={(e) => onSelectAll(e.target.checked)}
                />
              </th>
              <th className="p-4 w-[20%] uppercase tracking-wider cursor-pointer group hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors select-none truncate" onClick={() => requestSort('coinName')}>
                <div className="flex items-center">Asset {getSortIcon('coinName')}</div>
              </th>
              <th className="p-4 w-[15%] uppercase tracking-wider cursor-pointer group hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors select-none" onClick={() => requestSort('totalHolding')}>
                <div className="flex flex-col">
                  <div className="flex items-center">Holdings {getSortIcon('totalHolding')}</div>
                  <span className="font-normal text-gray-400 dark:text-gray-500 capitalize mt-0.5 truncate">Avg. Buy Price</span>
                </div>
              </th>
              <th className="p-4 w-[15%] uppercase tracking-wider cursor-pointer group hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors select-none truncate" onClick={() => requestSort('currentPrice')}>
                <div className="flex items-center">Current Price {getSortIcon('currentPrice')}</div>
              </th>
              <th className="p-4 w-[15%] uppercase tracking-wider cursor-pointer group hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors select-none truncate" onClick={() => requestSort('stcg')}>
                <div className="flex items-center">Short-Term {getSortIcon('stcg')}</div>
              </th>
              <th className="p-4 w-[15%] uppercase tracking-wider cursor-pointer group hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors select-none truncate" onClick={() => requestSort('ltcg')}>
                <div className="flex items-center">Long-Term {getSortIcon('ltcg')}</div>
              </th>
              <th className="p-4 w-[15%] uppercase tracking-wider truncate">Amount to Sell</th>
            </tr>
          </thead>

          <tbody className="text-sm">
            {displayedHoldings.map((asset) => {
              const isSelected = selectedCoins.includes(asset.coin);

              return (
                <tr
                  key={asset.coin}
                  className={`border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-[#334155] transition-colors duration-300 ${
                    isSelected ? "bg-blue-50 dark:bg-blue-900/20" : ""
                  }`}
                >
                  <td className="p-4">
                    <input
                      type="checkbox"
                      className="w-4 h-4 cursor-pointer accent-blue-600 rounded border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                      checked={isSelected}
                      onChange={() => onSelectCoin(asset.coin)}
                    />
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-3 overflow-hidden">
                      <img src={asset.logo} alt={asset.coin} className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex-shrink-0" />
                      <div className="min-w-0">
                        <p className="font-bold text-gray-900 dark:text-gray-100 truncate">{asset.coinName}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{asset.coin}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 overflow-hidden">
                    <p className="font-bold text-gray-900 dark:text-gray-100 truncate">{asset.totalHolding.toFixed(4)}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">${asset.averageBuyPrice.toFixed(2)}</p>
                  </td>
                  <td className="p-4 font-bold text-gray-900 dark:text-gray-100 truncate">
                    ${asset.currentPrice.toFixed(4)}
                  </td>
                  <td className="p-4 overflow-hidden">
                    <p className={`font-bold truncate ${asset.stcg.gain >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                      {asset.stcg.gain >= 0 ? '+' : '-'}${Math.abs(asset.stcg.gain).toFixed(2)}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{asset.stcg.balance.toFixed(4)} {asset.coin}</p>
                  </td>
                  <td className="p-4 overflow-hidden">
                    <p className={`font-bold truncate ${asset.ltcg.gain >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                      {asset.ltcg.gain >= 0 ? '+' : '-'}${Math.abs(asset.ltcg.gain).toFixed(2)}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{asset.ltcg.balance.toFixed(4)} {asset.coin}</p>
                  </td>
                  <td className="p-4 font-bold text-gray-900 dark:text-gray-100 truncate">
                    {/* Only show amount if selected */}
                    {isSelected ? asset.totalHolding.toFixed(4) : "-"}
                  </td>
                </tr>
              );
            })}
            {holdings.length === 0 && (
              <tr>
                <td colSpan="7" className="p-8 text-center text-gray-500 dark:text-gray-400">
                  No holdings found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {holdings.length > 4 && (
        <div className="flex justify-center mt-4">
          <button
            onClick={() => setIsViewAll(!isViewAll)}
            className="px-6 py-2 bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/20 dark:hover:bg-blue-900/40 text-blue-600 dark:text-blue-400 font-semibold text-sm rounded-full transition-colors duration-300 shadow-sm border border-blue-200 dark:border-blue-800/50"
          >
            {isViewAll ? "View Less" : `View All (${holdings.length})`}
          </button>
        </div>
      )}
    </div>
  );
};

export default HoldingsTable;
