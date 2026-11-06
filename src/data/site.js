export const SITE = {
  name: 'Association for Students’ Social Welfare Nigeria',
  short: 'ASSW Nigeria',
  motto: 'Empowering students, building the future.',
  shortDescription: 'We work to improve the student experience by connecting welfare with skills, enterprise, mentorship, leadership and access to opportunity.',
  sccnDescription: 'A national platform for student-owned businesses to become visible, connected and better prepared to pursue growth opportunities.',
  catalogueDescription: 'Discover businesses built by students across institutions, sectors and communities.',
  oppDescription: 'Find relevant opportunities and practical guidance to help your venture prepare, apply and grow.',
  address: ['No. 1 Zambezi Crescent', 'Maitama, Abuja, Nigeria'],
  email: 'asswnigeria@gmail.com',
  social: '@assw_ng',
  phone: '[Official number to be confirmed]',
  contribution: 5000,
  disclaimer:
    'Membership does not guarantee funding, grants, loans, customers, procurement, investment, employment or selection for any third-party programme. Opportunities are subject to eligibility, due diligence, availability and the independent selection criteria of the relevant provider.',
};

export const CATEGORIES = [
  'Fashion & clothing', 'Beauty & cosmetics', 'Food & catering', 'Agriculture & agribusiness', 'Technology & software', 'Digital services',
  'Graphics, branding & printing', 'Photography & media', 'Logistics & delivery', 'Education & tutoring', 'Health & wellness', 'Retail & trading',
  'Manufacturing', 'Creative arts', 'Events & entertainment', 'Sports', 'Consulting & professional services', 'Finance & business services',
  'Construction', 'Real-estate-related services', 'Other',
];

export const STATES = ['Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno', 'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'FCT', 'Gombe', 'Imo', 'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara', 'Lagos', 'Nasarawa', 'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau', 'Rivers', 'Sokoto', 'Taraba', 'Yobe', 'Zamfara'];

export const STAGES = [
  ['Idea', 'Exploring a problem'], ['Pre-launch', 'Building, not selling yet'], ['Early-stage', 'First customers'], ['Proof of concept', 'Evidence it works'],
  ['Revenue-generating', 'Regular sales'], ['Growth-stage', 'Scaling up'], ['Expansion', 'New markets or products'],
];

export const NEEDS = ['Capital', 'Equipment', 'Mentorship', 'Customers', 'Branding', 'Technology', 'Training', 'Registration', 'Pitch / application support', 'Market access'];
export const INTERESTS = ['Grants', 'Competitions', 'Accelerators', 'Loans', 'Equity', 'Procurement', 'Jobs', 'Training', 'Mentorship', 'Market access'];

export const READINESS = ['Needs Basic Support', 'Developing', 'Application Preparation', 'Opportunity-Ready for a Specific Call', 'Referred', 'Outcome Pending'];

export const naira = (n) => '₦' + Number(n).toLocaleString('en-NG');
