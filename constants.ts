import { NavItem, PageView } from './types';

export const COMPANY_NAME = "Precision Remaps";
export const OWNER_NAME = "Chris";
export const EXPERIENCE_YEARS = 14;
export const LOCATION = "64-68 Well Street, Paisley";
export const FULL_ADDRESS = "64-68 Well Street, Paisley, PA1 2QE";
export const PHONE_NUMBER = "+44 7728 722248";

// Placeholder for the logo provided in the prompt description
export const LOGO_URL = "logo.png.jpeg"; 

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', view: PageView.HOME },
  { label: 'Performance Lookup', view: PageView.LOOKUP },
  { label: 'Deals', view: PageView.DEALS },
  { label: 'About Us', view: PageView.ABOUT },
  { label: 'Contact', view: PageView.CONTACT },
];