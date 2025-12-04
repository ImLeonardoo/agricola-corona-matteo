export interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  category: 'Ortaggi' | 'Cereali' | 'Farine' | 'Altro';
}

export interface Service {
  id: string;
  name: string;
  description: string;
  iconName: string;
}

export interface NavItem {
  label: string;
  path: string;
}
