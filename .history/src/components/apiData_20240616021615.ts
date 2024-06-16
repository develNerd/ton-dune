// apiData.ts

export interface ApiData {
    index: string;
    api: string;
    queryKey: string;
    description: string;
    requireConnect: boolean;
    response?: string;
  }
  
  export const apiDataList: ApiData[] = [
    {
      index: "1",
      api: "connect",
      description: "This is a default api that connects the wallet internally. It is required if the user wants to perform certain wallet transaction.",
      requireConnect: false,
      queryKey: "address",
      response: "Please Connect to Wallet"
    },
    {
      index: "2",
      api: "https://testnet.toncenter.com/api/v2/getAddressBalance",
      queryKey: "address",
      description: "Get the balance of the address",
      requireConnect: true
    },
    {
      index: "3",
      api: "https://testnet.toncenter.com/api/v2/getWalletInformation",
      queryKey: "address",
      description: "Get wallet information, if it's a wallet and the account state",
      requireConnect: true
    },
    {
      index: "4",
      api: "https://testnet.toncenter.com/api/v2/getTransactions",
      queryKey: "address",
      description: "Get Account transactions",
      requireConnect: true
    },
    {
      index: "5",
      api: "https://testnet.toncenter.com/api/v2/getBlockTransactions",
      queryKey: "address",
      description: "An api to get the transactions of a block",
      requireConnect: false
    }
  ];
  