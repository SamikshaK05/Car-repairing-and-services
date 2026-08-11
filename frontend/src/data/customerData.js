// Customer Dashboard Sample Data

export const INITIAL_CUSTOMER_PROFILE = {
  name: 'Samiksha',
  email: 'samiksha@example.com',
  phone: '+91 98765 43210',
  location: 'Pune, Maharashtra',
  memberSince: 'January 2024',
};

export const INITIAL_STATS = {
  myCars: 2,
  upcomingServices: 1,
  completedServices: 6,
  pendingInvoices: 1,
};

export const INITIAL_UPCOMING_SERVICE = {
  id: 'UP-2026-01',
  vehicle: 'Hyundai Creta',
  registration: 'MH 12 AB 1234',
  service: 'Full Car Service',
  serviceCenter: 'CarFix Pune – Baner',
  date: '18 August 2026',
  time: '10:30 AM',
  status: 'Confirmed',
};

export const INITIAL_CARS = [
  {
    id: 'car-1',
    brand: 'Hyundai',
    model: 'Creta',
    name: 'Hyundai Creta',
    registration: 'MH 12 AB 1234',
    fuel: 'Petrol',
    year: '2023',
    lastService: '10 July 2026',
    nextService: 'Recommended',
  },
  {
    id: 'car-2',
    brand: 'Honda',
    model: 'City',
    name: 'Honda City',
    registration: 'MH 12 CD 5678',
    fuel: 'Petrol',
    year: '2022',
    lastService: '02 March 2026',
    nextService: 'Recommended',
  },
];

export const INITIAL_SERVICE_HISTORY = [
  {
    id: 'SH-101',
    vehicle: 'Hyundai Creta',
    service: 'General Service',
    date: '10 July 2026',
    amount: '₹1,999',
    status: 'Completed',
    center: 'CarFix Pune – Baner',
  },
  {
    id: 'SH-102',
    vehicle: 'Hyundai Creta',
    service: 'AC Service',
    date: '15 May 2026',
    amount: '₹1,499',
    status: 'Completed',
    center: 'CarFix Pune – Baner',
  },
  {
    id: 'SH-103',
    vehicle: 'Honda City',
    service: 'Oil Change',
    date: '02 March 2026',
    amount: '₹999',
    status: 'Completed',
    center: 'CarFix Pune – Wakad',
  },
];

export const INITIAL_INVOICES = [
  {
    id: 'INV-1001',
    vehicle: 'Hyundai Creta',
    service: 'General Service',
    date: '10 July 2026',
    amount: '₹1,999',
    status: 'Paid',
    center: 'CarFix Pune – Baner',
  },
  {
    id: 'INV-1002',
    vehicle: 'Hyundai Creta',
    service: 'AC Service',
    date: '15 May 2026',
    amount: '₹1,499',
    status: 'Paid',
    center: 'CarFix Pune – Baner',
  },
  {
    id: 'INV-1003',
    vehicle: 'Honda City',
    service: 'Oil Change',
    date: '02 March 2026',
    amount: '₹999',
    status: 'Paid',
    center: 'CarFix Pune – Wakad',
  },
];

export const INITIAL_NOTIFICATIONS = [
  {
    id: 'n1',
    title: 'Upcoming Appointment',
    message: 'Your service appointment is coming up.',
    time: '2 hours ago',
    unread: true,
  },
  {
    id: 'n2',
    title: 'History Updated',
    message: 'Your vehicle service history was updated.',
    time: 'Yesterday',
    unread: false,
  },
];

