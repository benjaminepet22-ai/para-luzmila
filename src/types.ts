export interface FloralCard {
  id: string;
  title: string;
  formatName: string;
  aspectRatioLabel: string;
  imageUrl: string;
  description: string;
}

export interface DedicationNote {
  recipient: string;
  sender: string;
  message: string;
  date: string;
}
