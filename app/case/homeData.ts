import { 
  Briefcase, 
  Plane, 
  FileQuestion, 
  GraduationCap,
  Building2,
  Car,
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
  Languages,
  MapPin,
  Train,
  PiggyBank
} from "lucide-react";

export const furtherSteps = [
  {
    id: 'visa',
    title: "Confirm visa Appointment",
    description: "Confirm your secured residency permit",
    question: "Select your",
    emphasisText: "visa status",
    answers: [
      { id: "visa-work", label: "Work Visa", icon: Briefcase },
      { id: "visa-tourist", label: "Tourist Visa", icon: Plane },
      { id: "visa-other", label: "Other", icon: FileQuestion, isWide: true }
    ]
  },
  {
    id: 'school',
    title: "Confirm School Setup",
    description: "Set up enrollment details for your children's schooling in Abu Dhabi",
    question: "How is your",
    emphasisText: "child's education",
    answers: [
      { id: "school-confirmed", label: "School Confirmed", icon: GraduationCap },
      { id: "school-nochild", label: "I don't have a child", icon: Users },
    ]
  },
  {
    id: 'dlicense',
    title: "Confirm Driver's License",
    description: "Start the process to get your official UAE driving license",
    question: "Got a",
    emphasisText: "drivers license?",
    answers: [
      { id: "dlicense-confimed", label: "Yes, I have a license", icon: Car },
      { id: "dlicense-none", label: "No, I don't have a license", icon: FileQuestion },
      { id: "dlicense-inprogress", label: "No, but I'm in the process of getting one", icon: UserPlus, isWide: true }
    ]
  },
  {
    id: 'insurance',
    title: "Confirm Medical Insurance",
    description: "Ensure you have adequate health coverage in the UAE",
    question: "Select your",
    emphasisText: "insurance status",
    answers: [
      { id: "insurance-confirmed", label: "I have insurance", icon: HeartPulse },
      { id: "insurance-none", label: "I'm getting insurance", icon: Heart },
      { id: "insurance-other", label: "other", icon: Stethoscope, isWide: true },
    ],
  },
  {
    id: 'sim',
    title: "Confirm your Mobile SIM Card",
    description: "Stay connected by choosing the best telecom provider in the UAE",
    question: "Select your",
    emphasisText: "SIM type",
    answers: [
      { id: "sim-confirmed", label: "I have coverage", icon: Phone },
      { id: "sim-none", label: "I don't have coverage", icon: Smartphone },
      { id: "sim-wouldlike", label: "I would like to get coverage", icon: Tablet, isWide: true }
    ]
  },
  {
    id: 'bank',
    title: "Confirm your Bank Account",
    description: "Confirm your UAE bank account for financial transactions",
    question: "Select your",
    emphasisText: "financial status",
    answers: [
      { id: "bank-confirmed", label: "I have setup my accounts", icon: CreditCard },
      { id: "bank-mid", label: "I have partially setup my accounts", icon: Wallet },
      { id: "bank-none", label: "I don't have an account", icon: PiggyBank, isWide: true }
    ]
  },
  {
    id: 'culture',
    title: "Learn about Emirati Culture",
    description: "Discover local customs and traditions specific to Abu Dhabi",
    question: "Select your",
    emphasisText: "learning path",
    answers: [
      { id: "workshops", label: "Cultural Workshops", icon: UsersRound },
      { id: "events", label: "Cultural Events", icon: BookOpen },
      { id: "both", label: "Combined Learning", icon: Languages, isWide: true }
    ]
  },
  {
    id: 'infrastructure',
    title: "Explore UAE Infrastructure",
    description: "Get informed about public transport, utilities, and connectivity services",
    question: "Select your",
    emphasisText: "area focus",
    answers: [
      { id: "local", label: "Local Area", icon: MapPin },
      { id: "city", label: "Whole City", icon: Building2 },
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