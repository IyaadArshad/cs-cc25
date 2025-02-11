import { 
  Briefcase, 
  Plane, 
  FileQuestion, 
  GraduationCap,
  School,
  Building2,
  Car,
  Bus,
  Heart,
  HeartPulse,
  Stethoscope,
  Smartphone,
  Phone,
  Tablet,
  CreditCard,
  Wallet,
  Users,
  UserPlus,
  UsersRound,
  BookOpen,
  GalleryVerticalEnd,
  Languages,
  MapPin,
  Map,
  Train,
  PiggyBank
} from "lucide-react";

export const furtherSteps = [
  {
    id: 'visa',
    title: "Confirm visa Appointment",
    description: "Confirm your secured residency permit",
    question: "Select your visa status",
    answers: [
      { id: "workVisa", label: "Work Visa", icon: Briefcase },
      { id: "touristVisa", label: "Tourist Visa", icon: Plane },
      { id: "other", label: "Other", icon: FileQuestion, isWide: true }
    ]
  },
  {
    id: 'education',
    title: "Confirm School Setup",
    description: "Set up enrollment details for your children's schooling in Abu Dhabi",
    question: "Select education level",
    answers: [
      { id: "primary", label: "Primary School", icon: School },
      { id: "secondary", label: "Secondary School", icon: GraduationCap },
      { id: "other", label: "Other Institution", icon: Building2, isWide: true }
    ]
  },
  {
    id: 'transport',
    title: "Apply for a Driver's License",
    description: "Start the process to get your official UAE driving license",
    question: "Select transport need",
    answers: [
      { id: "car", label: "Personal Car", icon: Car },
      { id: "publicTransport", label: "Public Transport", icon: Bus },
      { id: "both", label: "Both Options", icon: Car, isWide: true }
    ]
  },
  {
    id: 'health',
    title: "Obtain Medical Insurance",
    description: "Ensure you have adequate health coverage in the UAE",
    question: "Select coverage type",
    answers: [
      { id: "individual", label: "Individual Plan", icon: Heart },
      { id: "family", label: "Family Plan", icon: HeartPulse },
      { id: "corporate", label: "Corporate Plan", icon: Stethoscope, isWide: true },
    ],
  },
  {
    id: 'communication',
    title: "Register for a Mobile SIM Card",
    description: "Stay connected by choosing the best telecom provider in the UAE",
    question: "Select plan type",
    answers: [
      { id: "prepaid", label: "Prepaid SIM", icon: Smartphone },
      { id: "postpaid", label: "Postpaid Plan", icon: Phone },
      { id: "internet", label: "Internet Bundle", icon: Tablet, isWide: true }
    ]
  },
  {
    id: 'banking',
    title: "Set up a Bank Account",
    description: "Open a UAE bank account for seamless financial transactions",
    question: "Select account type",
    answers: [
      { id: "savings", label: "Savings Account", icon: PiggyBank },
      { id: "current", label: "Current Account", icon: CreditCard },
      { id: "both", label: "Both Accounts", icon: Wallet, isWide: true }
    ]
  },
  {
    id: 'community',
    title: "Connect with Expat Communities",
    description: "Join local groups to share experiences and receive support",
    question: "Select community type",
    answers: [
      { id: "local", label: "Local Groups", icon: Users },
      { id: "online", label: "Online Forums", icon: UserPlus },
      { id: "both", label: "Both Networks", icon: UsersRound, isWide: true }
    ]
  },
  {
    id: 'culture',
    title: "Learn about Emirati Culture",
    description: "Discover local customs and traditions specific to Abu Dhabi",
    question: "Select learning path",
    answers: [
      { id: "workshops", label: "Cultural Workshops", icon: BookOpen },
      { id: "events", label: "Cultural Events", icon: GalleryVerticalEnd },
      { id: "both", label: "Combined Learning", icon: Languages, isWide: true }
    ]
  },
  {
    id: 'infrastructure',
    title: "Explore UAE Infrastructure",
    description: "Get informed about public transport, utilities, and connectivity services",
    question: "Select area focus",
    answers: [
      { id: "local", label: "Local Area", icon: MapPin },
      { id: "city", label: "Whole City", icon: Map },
      { id: "transport", label: "Transport Routes", icon: Train, isWide: true }
    ]
  }
];

export const cardData = [
  {
    title: "Get an Emirates ID",
    content:
      "An Emirates ID grants residents of the UAE a proof of identification and is required for most things in dubai ",
  },
  {
    title: "Open a new bank account",
    content:
      "You will need a UAE bank account for essential daily transactions, Some banks offer free international transfers for the first few months!",
  },
  {
    title: "Set up a mobile SIM card",
    content: "A UAE SIM card is essential for local calls, mobile payments, and OTP verifications",
  },
];