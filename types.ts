
export enum CarCategory {
  HATCHBACK = 'Hatchback',
  SEDAN = 'Sedan / Mini-SUV',
  SUV = 'SUV'
}

export interface ServiceStep {
  id: number;
  title: string;
  description: string;
  icon: string;
}

export interface ServiceDetailCategory {
  title: string;
  items: string[];
}

export interface ServicePackage {
  id: string;
  name: string;
  features: string[];
  prices: {
    [key in CarCategory]: number;
  };
  popular?: boolean;
}

export type ViewType = 'home' | 'about' | 'services' | 'contact' | 'booking' | 'doorstep';

export type Theme = 'dark' | 'light';