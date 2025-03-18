
export interface Agent {
  id: string;
  name: string;
  description: string;
  usage: number;
  createdAt: string;
  status: 'active' | 'inactive' | 'pending';
  version?: string;
  lastUpdated?: string;
  category?: string;
  author?: string;
}
