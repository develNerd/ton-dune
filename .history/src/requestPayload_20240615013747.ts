// src/requestPayload.ts
export const requestPayload = {
    instances: [
      {
        content: `Here's a list of API objects
  [
      {
          "index": "1",
          "api": "connect",
          "description": "This is a default api that connects the wallet internally. It is required if the user wants to perform certain wallet transaction.",
          "response": "Please Connect to Wallet"
      },
      {
          "index": "2",
          "api": "https://testnet.toncenter.com/api/v2/getAddressBalance",
          "description": "Get the balance of the address",
          "requireConnect": true
      },
      {
          "index": "3",
          "api": "https://testnet.toncenter.com/api/v2/getWalletInformation",
          "description": "Get wallet information, if it's a wallet and the account state",
          "requireConnect": true
      },
      {
          "index": "4",
          "api": "https://testnet.toncenter.com/api/v2/getTransactions",
          "description": "Get Account transactions",
          "requireConnect": true
      },
      {
          "index": "5",
          "api": "https://testnet.toncenter.com/api/v2/getBlockTransactions",
          "description": "An api to get the transactions of a block"
      }
  ]
  
   I want the vertex api to return the \`data\` json  like below, when given a prompt
  
  {
      "data": {
          "index": "5",
          "wallet_address": "example_wallet_address_if_any"
      }
  }
  
  The api should only return a json like response with no sentence
  
  input: What is my account balance
  output: {
      "data": {
          "index": "2",
          "wallet_address": "null"
      }
  }
  
  input: What is the account balance for this address 3d2d33d32d32d3d32Q
  output: {
      "data": {
          "index": "2",
          "wallet_address": "3d2d33d32d32d3d32Q"
      }
  }
  
  input: Get me all of my transactions 
  output: {
      "index": "4",
      "wallet_address": "null"
  }
  
  input: Let me see the latest transactions made on the ton network
  output: {
      "index": "5",
      "wallet_address": "null"
  }
  
  input: balance
  output:
  `
      }
    ],
    parameters: {
      candidateCount: 1,
      maxOutputTokens: 1024,
      temperature: 0.9,
      topP: 1
    }
  };
  