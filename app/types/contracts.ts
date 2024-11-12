export interface ContractABI {
  name: string;
  type: string;
  inputs: Array<{
    name: string;
    type: string;
    indexed?: boolean;
  }>;
  outputs?: Array<{
    name: string;
    type: string;
  }>;
  stateMutability?: string;
  anonymous?: boolean;
} 
