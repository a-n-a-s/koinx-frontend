# KoinX - Tax Loss Harvesting Assignment

## Job Details

- Commitment - Part-time (20-25 hours/week)
- Location - Remote
- Stipend: Rs. 10000-20000 per month depending on your experience and expertise
- Job Description: [https://koinx.notion.site/Frontend-Intern-Job-Description-c7d7fa7b8ece435a8ee0f5507ddfd174?pvs=4](https://www.notion.so/Frontend-Intern-Job-Description-c7d7fa7b8ece435a8ee0f5507ddfd174?pvs=21).
- Once you’re done with the tasks below, please submit your details and the links in this form within 48 hours of you receiving this document: https://forms.gle/kx1EQWT2yh3NKQcK7.
- We will be reviewing assignments on a first-come-first-serve basis.
- Candidate Requirements:
    - At least 1 year remaining in college (i.e., 2027 and beyond graduates only)
    - At least 3 months of experience with using React.js/Next.js

## Assignment Objective

- This assignment is designed to assess your ability to build a responsive and functional React application.
- You are required to build a tax loss harvesting tool, mock API integrations and handle business logic in an optimised way.
- You’re free to use AI tools to help you with building the application.

## Assignment Overview

Your task is to **build a Tax Loss Harvesting interface**, closely matching the provided Figma design and functionality outlined below.

Figma Link: https://www.figma.com/design/3YqHlvx1X59Nb3iP97BGkG/KoinX-Frontend-Intern-Assigment?node-id=0-1&t=IjGblowKhpiKfT4r-1

## Working Demo

[Tax_Loss_Harvesting_Demo.mp4](attachment:d302a3cd-a3ed-4fc8-9d15-f14e8683fdaa:Tax_Loss_Harvesting_Demo.mp4)

## UI

Create a responsive React based Tax Loss Harvesting tool interface that:

1. Displays capital gains (pre and post harvesting).
2. Renders the list of holdings.
3. Updates the “After Harvesting” view based on user selections.

## APIs & Responses

You will have to create two mock APIs and use the below shared responses:

- Holdings API (Expand for dummy response)
    
    ```json
    [
      {
        "coin": "USDC",
        "coinName": "USDC",
        "logo": "https://coin-images.coingecko.com/coins/images/6319/large/usdc.png?1696506694",
        "currentPrice": 85.41,
        "totalHolding": 0.0015339999999994802,
        "averageBuyPrice": 1.5863185433764244,
        "stcg": {
          "balance": 0.0015339999999994802,
          "gain": 0.12858552735441697
        },
        "ltcg": {
          "balance": 0,
          "gain": 0
        }
      },
      {
        "coin": "WETH",
        "coinName": "Polygon PoS Bridged WETH (Polygon POS)",
        "logo": "https://coin-images.coingecko.com/coins/images/2518/large/weth.png?1696503332",
        "currentPrice": 211756,
        "totalHolding": 0.00023999998390319965,
        "averageBuyPrice": 3599.856066001555,
        "stcg": {
          "balance": 0.00023999998390319965,
          "gain": 49.957471193511736
        },
        "ltcg": {
          "balance": 0,
          "gain": 0
        }
      },
      {
        "coin": "SOL",
        "coinName": "SOL (Wormhole)",
        "logo": "https://coin-images.coingecko.com/coins/images/22876/large/SOL_wh_small.png?1696522175",
        "currentPrice": 14758.01,
        "totalHolding": 3.469446951953614e-17,
        "averageBuyPrice": 221.42847548590152,
        "stcg": {
          "balance": 3.469446951953614e-17,
          "gain": 5.043389846205066e-13
        },
        "ltcg": {
          "balance": 0,
          "gain": 0
        }
      },
      {
        "coin": "WPOL",
        "coinName": "Wrapped POL",
        "logo": "https://koinx-statics.s3.ap-south-1.amazonaws.com/currencies/DefaultCoin.svg",
        "currentPrice": 22.08,
        "totalHolding": 2.3172764293128694,
        "averageBuyPrice": 0.5227311370876341,
        "stcg": {
          "balance": 1.3172764293128694,
          "gain": 49.954151016387065
        },
        "ltcg": {
          "balance": 1,
          "gain": 20
        }
      },
      {
        "coin": "MATIC",
        "coinName": "Polygon",
        "logo": "https://coin-images.coingecko.com/coins/images/4713/large/polygon.png?1698233745",
        "currentPrice": 22.22,
        "totalHolding": 2.75145540184285,
        "averageBuyPrice": 0.6880274617804887,
        "stcg": {
          "balance": 2.75145540184285,
          "gain": 59.244262152615974
        },
        "ltcg": {
          "balance": 0,
          "gain": 0
        }
      },
      {
        "coin": "GONE",
        "coinName": "Gone",
        "logo": "https://koinx-statics.s3.ap-south-1.amazonaws.com/currencies/DefaultCoin.svg",
        "currentPrice": 0.0001462,
        "totalHolding": 696324.3075326696,
        "averageBuyPrice": 0.00001637624055112482,
        "stcg": {
          "balance": 696324.3075326696,
          "gain": 90.39943939952589
        },
        "ltcg": {
          "balance": 0,
          "gain": 0
        }
      },
      {
        "coin": "USDT",
        "coinName": "Arbitrum Bridged USDT (Arbitrum)",
        "logo": "https://coin-images.coingecko.com/coins/images/325/large/Tether.png?1696501661",
        "currentPrice": 85.42,
        "totalHolding": 0.0001580000000558357,
        "averageBuyPrice": 1.4988059369185402,
        "stcg": {
          "balance": 0.0001580000000558357,
          "gain": 0.01325954866665267
        },
        "ltcg": {
          "balance": 0,
          "gain": 0
        }
      },
      {
        "coin": "USDC",
        "coinName": "Bridged USDC (Polygon PoS Bridge)",
        "logo": "https://coin-images.coingecko.com/coins/images/33000/large/usdc.png?1700119918",
        "currentPrice": 85.41,
        "totalHolding": 0.005806999999992795,
        "averageBuyPrice": 1.5405071277176852,
        "stcg": {
          "balance": 0.005806999999992795,
          "gain": 0.48703014510873915
        },
        "ltcg": {
          "balance": 0,
          "gain": 0
        }
      },
      {
        "coin": "SLN",
        "coinName": "Smart Layer Network",
        "logo": "https://koinx-statics.s3.ap-south-1.amazonaws.com/currencies/DefaultCoin.svg",
        "currentPrice": 6.66,
        "totalHolding": 0.01,
        "averageBuyPrice": 4.999247835735738,
        "stcg": {
          "balance": 0.01,
          "gain": 0.016607521642642627
        },
        "ltcg": {
          "balance": 0,
          "gain": 0
        }
      },
      {
        "coin": "OX",
        "coinName": "OX Coin",
        "logo": "https://coin-images.coingecko.com/coins/images/35365/large/logo.png?1708395976",
        "currentPrice": 0.13319,
        "totalHolding": 5,
        "averageBuyPrice": 0.018408606024462898,
        "stcg": {
          "balance": 5,
          "gain": 0.5739069698776855
        },
        "ltcg": {
          "balance": 0,
          "gain": 0
        }
      },
      {
        "coin": "FLAME",
        "coinName": "FireStarter",
        "logo": "https://coin-images.coingecko.com/coins/images/17359/large/WhiteOnBlack_Primary_Logo.png?1696516910",
        "currentPrice": 0.355985,
        "totalHolding": 1.4210854715202004e-14,
        "averageBuyPrice": 0.07889041030290807,
        "stcg": {
          "balance": 1.4210854715202004e-14,
          "gain": 3.9377509565538836e-15
        },
        "ltcg": {
          "balance": 0,
          "gain": 0
        }
      },
      {
        "coin": "PIG",
        "coinName": "Pigcoin",
        "logo": "https://coin-images.coingecko.com/coins/images/35425/large/pigcoin_200.png?1708544734",
        "currentPrice": 0.00008706,
        "totalHolding": 1.79,
        "averageBuyPrice": 0,
        "stcg": {
          "balance": 1.79,
          "gain": 0.0001558374
        },
        "ltcg": {
          "balance": 0,
          "gain": 0
        }
      },
      {
        "coin": "$CULO",
        "coinName": "CULO",
        "logo": "https://coin-images.coingecko.com/coins/images/34662/large/CULO-logo-inverted_200.png?1705641744",
        "currentPrice": 0.00001623,
        "totalHolding": 150000,
        "averageBuyPrice": 0,
        "stcg": {
          "balance": 150000,
          "gain": 2.4345
        },
        "ltcg": {
          "balance": 0,
          "gain": 0
        }
      },
      {
        "coin": "ETH",
        "coinName": "Ethereum",
        "logo": "https://coin-images.coingecko.com/coins/images/279/large/ethereum.png?1696501628",
        "currentPrice": 216182,
        "totalHolding": 0.0004211938732637162,
        "averageBuyPrice": 3909.792264648455,
        "stcg": {
          "balance": 0.0004211938732637162,
          "gain": 89.40775336229291
        },
        "ltcg": {
          "balance": 0,
          "gain": 0
        }
      },
      {
        "coin": "QUICK",
        "coinName": "Quickswap [OLD]",
        "logo": "https://coin-images.coingecko.com/coins/images/13970/large/quick.png?1696513704",
        "currentPrice": 2319.83,
        "totalHolding": 5.961538207532868e-11,
        "averageBuyPrice": 65.86759737193783,
        "stcg": {
          "balance": 5.961538207532868e-11,
          "gain": 1.3437082981609774e-7
        },
        "ltcg": {
          "balance": 0,
          "gain": 0
        }
      },
      {
        "coin": "DFYN",
        "coinName": "Dfyn Network",
        "logo": "https://coin-images.coingecko.com/coins/images/15368/large/SgqhfWz4_400x400_%281%29.jpg?1696515016",
        "currentPrice": 0.300613,
        "totalHolding": 3.1178615245153196e-11,
        "averageBuyPrice": 0.03486178524947315,
        "stcg": {
          "balance": 3.1178615245153196e-11,
          "gain": 8.285754875638759e-12
        },
        "ltcg": {
          "balance": 0,
          "gain": 0
        }
      },
      {
        "coin": "LINK",
        "coinName": "Chainlink",
        "logo": "https://coin-images.coingecko.com/coins/images/877/large/chainlink-new-logo.png?1696502009",
        "currentPrice": 1450.14,
        "totalHolding": 0.000047233224826389,
        "averageBuyPrice": 9.172984515948809,
        "stcg": {
          "balance": 0.000047233224826389,
          "gain": 0.06806151900976895
        },
        "ltcg": {
          "balance": 0,
          "gain": 0
        }
      },
      {
        "coin": "BLOK",
        "coinName": "Bloktopia",
        "logo": "https://coin-images.coingecko.com/coins/images/18819/large/logo-bholdus-6.png?1696518281",
        "currentPrice": 0.02974533,
        "totalHolding": 9.822542779147625e-11,
        "averageBuyPrice": 0.005182145656093,
        "stcg": {
          "balance": 9.822542779147625e-11,
          "gain": 2.412729290101157e-12
        },
        "ltcg": {
          "balance": 0,
          "gain": 0
        }
      },
      {
        "coin": "SPHERE",
        "coinName": "Sphere Finance",
        "logo": "https://coin-images.coingecko.com/coins/images/24424/large/2iR2JsL.png?1696523606",
        "currentPrice": 0.00729945,
        "totalHolding": 2.2737367544323206e-13,
        "averageBuyPrice": 0.011065778585432803,
        "stcg": {
          "balance": 2.2737367544323206e-13,
          "gain": -8.563639733967655e-16
        },
        "ltcg": {
          "balance": 0,
          "gain": 0
        }
      },
      {
        "coin": "TRADE",
        "coinName": "Polytrade",
        "logo": "https://coin-images.coingecko.com/coins/images/16416/large/Logo_colored_200.png?1696516012",
        "currentPrice": 17.51,
        "totalHolding": 3.325212327709437e-11,
        "averageBuyPrice": 0.25960465528043797,
        "stcg": {
          "balance": 3.325212327709437e-11,
          "gain": 5.736122725812298e-10
        },
        "ltcg": {
          "balance": 0,
          "gain": 0
        }
      },
      {
        "coin": "WELT",
        "coinName": "Fabwelt",
        "logo": "https://coin-images.coingecko.com/coins/images/20505/large/welt.PNG?1696519911",
        "currentPrice": 0.060863,
        "totalHolding": 1.063542780948968,
        "averageBuyPrice": 0.01520546569793174,
        "stcg": {
          "balance": 1.063542780948968,
          "gain": 0.048558741002894576
        },
        "ltcg": {
          "balance": 0,
          "gain": 0
        }
      },
      {
        "coin": "FTM",
        "coinName": "Fantom",
        "logo": "https://koinx-statics.s3.ap-south-1.amazonaws.com/currencies/DefaultCoin.svg",
        "currentPrice": 52.99,
        "totalHolding": 0.04265758808550148,
        "averageBuyPrice": 1.7040326829291739,
        "stcg": {
          "balance": 0.04265758808550148,
          "gain": 2.1877356683780986
        },
        "ltcg": {
          "balance": 0,
          "gain": 0
        }
      },
      {
        "coin": "EZ",
        "coinName": "EasyFi V2",
        "logo": "https://koinx-statics.s3.ap-south-1.amazonaws.com/currencies/DefaultCoin.svg",
        "currentPrice": 0.885074,
        "totalHolding": 0.0005424384664524931,
        "averageBuyPrice": 6.539367177529248,
        "stcg": {
          "balance": 0.0005424384664524931,
          "gain": -0.0030671061200917595
        },
        "ltcg": {
          "balance": 0,
          "gain": 0
        }
      },
      {
        "coin": "FRM",
        "coinName": "Ferrum Network",
        "logo": "https://coin-images.coingecko.com/coins/images/8251/large/FRM.png?1696508455",
        "currentPrice": 0.093794,
        "totalHolding": 6.442993445432421e-7,
        "averageBuyPrice": 0.453964789704584,
        "stcg": {
          "balance": 6.442993445432421e-7,
          "gain": -2.3205780373028534e-7
        },
        "ltcg": {
          "balance": 0,
          "gain": 0
        }
      },
      {
        "coin": "TITAN",
        "coinName": "IRON Titanium",
        "logo": "https://koinx-statics.s3.ap-south-1.amazonaws.com/currencies/DefaultCoin.svg",
        "currentPrice": 8.65643e-7,
        "totalHolding": 8.861,
        "averageBuyPrice": 8.531798889329416e-7,
        "stcg": {
          "balance": 8.861,
          "gain": 1.1043562716520403e-7
        },
        "ltcg": {
          "balance": 0,
          "gain": 0
        }
      }
    ]
    
    ```
    
- Capital Gains API ((Expand for dummy response)
    
    ```json
    {
        "capitalGains": {
            "stcg": {
                "profits": 70200.88,
                "losses": 1548.53
            },
            "ltcg": {
                "profits": 5020,
                "losses": 3050
            },
        }
    }
    
    ```
    

Note: Feel free to mock these APIs however you want, just ensure that the deployed link should be fully functional and data should be visible. (By creating a dummy server, creating promises within the React app itself etc.)

## Functional Requirements

### Pre-Harvesting Card (Left - Dark Background)

- Use data from the **Capital Gains API**.
- Display **Short-term** and **Long-term**:
    - Profits
    - Losses
    - Net Capital Gains = `profits - losses`
- **Realised Capital Gains** = Sum of both net gains.

### After Harvesting Card (Right - Blue Background)

- Initially mirrors the Pre-Harvesting card.
- On selecting/deselecting holdings (checkbox in table), update:
    - Profits and Losses based on individual holding's gains.
    - For each selected asset:
        - If gain > 0, add it to **profits**.
        - If gain < 0, add it to **losses**.
    - Update net and realised capital gains.
- Show "You're going to save ₹X" message **only if**:
    - Pre-harvesting realised capital gains > Post-harvesting capital gains.

### Example:

If holding ETH has:

- Short-term gain: ₹500
- Long-term gain: -₹1000

And initial gains API was:

```json
capitalGains: {
  stcg: { profits: 100, losses: 500 },
  ltcg: { profits: 1200, losses: 100 }
}

/**
Net Short Term Gains = stcg.profits - stcg.losses = 100 - 500 = -400
Net Long Term Gains = ltcg.profits - ltcg.losses = 1200 - 100 = 1100
Realised Capital Gains = Net Short Term Gains + Net Long Term Gains = -400 + 1100 = 700
**/

```

Then selecting ETH results in the following updated capital gains data:

```json
capitalGains: {
  stcg: { profits: 600, losses: 500 }, //short term gain of ETH was added to profits since it's a positive value
  ltcg: { profits: 1200, losses: 1100 } //long term gain of ETH was added to losses since it's a negative value
}

/**
Net Short Term Gains = stcg.profits - stcg.losses = 600 - 500 = 100
Net Long Term Gains = ltcg.profits - ltcg.losses = 1200 - 1100 = 100
Realised Capital Gains = Net Short Term Gains + Net Long Term Gains = 100 + 100 = 200
**/

```

Net gain drops from ₹700 to ₹200 → Taxes reduce → Show savings line.

### Holdings Table (Below Cards)

Use the **Holdings API** to render the holdings table in the below mentioned data format:

| Asset | Holdings
Avg Buy Price | Current Price | Short-Term Gain | Long-Term Gain | Amount to Sell |
| --- | --- | --- | --- | --- | --- |
| `coin` , `coinName` , `logo` | `totalHoldings` , `averageBuyPrice` | `currentPrice` | `stcg.gain` , `stcg.balance` | `ltcg.gain` , `ltcg.balance` | To be populated with `totalHoldings` when the user selects the row |
- Sort assets in any logical order.
- Make each row selectable via a checkbox, along with a checkbox to select/deselect all rows at once available in the table header.
- On selection, update the “After Harvesting” card in real-time.

## Tech Requirements

- React
- CSS of your choice (Tailwind/SCSS/Styled-components etc.)
- API mocking (Using promises, or an actual mock server or however you prefer)
- Feel free to use the following:
    - Component libraries (e.g., Shadcn/UI, Material UI)
    - TypeScript

## Deliverables

- A GitHub repo with:
    - Working React app
    - Clear folder structure
    - `README.md` with:
        - Setup instructions
        - Screenshots
        - Assumptions (if any)
- Deployed link of your app (free to use hosting providers: Vercel/Netlify).

## Bonus Points

- Mobile responsiveness
- Clean, reusable components
- Proper state management (e.g., useContext or Redux)
- Visual feedback for selections
- Loader/Error states for API calls
- “View All” functionality in the holdings table

## Submission Note

Complete the provided assignment and share the GitHub Link along with your details in this form: https://forms.gle/kx1EQWT2yh3NKQcK7.