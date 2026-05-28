import React, { useState } from "react";

const HoldingsTable = ({ holdings, selectedCoins, onSelectCoin, onSelectAll }) => {
  const [isViewAll, setIsViewAll] = useState(false);

  // Check if all items are selected for the master checkbox
  const isAllSelected = holdings.length > 0 && selectedCoins.length === holdings.length;

  const displayedHoldings = isViewAll ? holdings : holdings.slice(0, 4);

  return (
    <div className="w-full mt-4">
      {/* Wrapper to make the table scrollable horizontally and vertically (showing ~4 rows) */}
      <div className={`overflow-x-auto custom-scrollbar rounded-lg border border-gray-200 dark:border-gray-700 relative shadow-sm transition-all duration-300 ${isViewAll ? 'max-h-[600px] overflow-y-auto' : ''}`}>
        <table className="w-full text-left min-w-[800px] border-collapse bg-white dark:bg-[#1e293b]">
          {/* Header with light bluish background */}
          <thead className="bg-[#f1f5f9] dark:bg-[#0f172a] text-gray-500 dark:text-gray-400 text-sm font-semibold sticky top-0 z-10 shadow-sm transition-colors duration-300">
            <tr>
              <th className="p-4">
                <input
                  type="checkbox"
                  className="w-4 h-4 cursor-pointer accent-blue-600 rounded border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                  checked={isAllSelected}
                  onChange={(e) => onSelectAll(e.target.checked)}
                />
              </th>
              <th className="p-4 uppercase tracking-wider text-xs">Asset</th>
              <th className="p-4 uppercase tracking-wider text-xs">
                Holdings <br />
                <span className="font-normal text-gray-400 dark:text-gray-500 capitalize">Avg. Buy Price</span>
              </th>
              <th className="p-4 uppercase tracking-wider text-xs">Current Price</th>
              <th className="p-4 uppercase tracking-wider text-xs">Short-Term Gain</th>
              <th className="p-4 uppercase tracking-wider text-xs">Long-Term Gain</th>
              <th className="p-4 uppercase tracking-wider text-xs">Amount to Sell</th>
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
                    <div className="flex items-center gap-3">
                      <img src={asset.logo} alt={asset.coin} className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800" />
                      <div>
                        <p className="font-bold text-gray-900 dark:text-gray-100">{asset.coinName}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{asset.coin}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <p className="font-bold text-gray-900 dark:text-gray-100">{asset.totalHolding.toFixed(4)}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">${asset.averageBuyPrice.toFixed(2)}</p>
                  </td>
                  <td className="p-4 font-bold text-gray-900 dark:text-gray-100">
                    ${asset.currentPrice.toFixed(4)}
                  </td>
                  <td className="p-4">
                    <p className={`font-bold ${asset.stcg.gain >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                      {asset.stcg.gain >= 0 ? '+' : '-'}${Math.abs(asset.stcg.gain).toFixed(2)}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{asset.stcg.balance.toFixed(4)} {asset.coin}</p>
                  </td>
                  <td className="p-4">
                    <p className={`font-bold ${asset.ltcg.gain >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                      {asset.ltcg.gain >= 0 ? '+' : '-'}${Math.abs(asset.ltcg.gain).toFixed(2)}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{asset.ltcg.balance.toFixed(4)} {asset.coin}</p>
                  </td>
                  <td className="p-4 font-bold text-gray-900 dark:text-gray-100">
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
