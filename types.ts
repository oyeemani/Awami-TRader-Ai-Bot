
export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
}

export interface Product {
  name: string;
  price: number;
}

export enum CampaignSource {
  NONE = 'none',
  FB_AD_CNC = 'fb_ad_cnc',
  WA_LASER = 'wa_laser',
  FB_PRINTER = 'fb_printer'
}

export interface ChatState {
  messages: Message[];
  isLoading: boolean;
  activeCampaign: CampaignSource;
}
