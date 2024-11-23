export type User = {
  sysIdUser: number;
  username: string;
  email: string;
  hoVaTen: string;
  balance: string;
  joinTime: string | null;
  avatar: string | null;
  totalSpent: number;
  gender: boolean;
  dob: string;
  phoneNumber: string | null;
  ownedGames: any[];
};