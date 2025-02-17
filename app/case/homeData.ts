import { BanknotesIcon } from "@heroicons/react/24/outline";
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
  PiggyBank,
  LucideBanknote,
  UserCheck
} from "lucide-react";

export const furtherSteps = [
  {
    id: 'setup',
    title: "Setup Account",
    description: "Complete your profile setup",
    question: "Setup your",
    emphasisText: "account",
    answers: [
      { id: "setup-complete", label: "Already Completed", icon: UserCheck },
      { id: "setup-none", label: "Not Started", icon: UserPlus },
    ]
  },
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
    question: "Confirm",
    emphasisText: "schooling",
    answers: [
      { id: "school-confirmed", label: "School Confirmed", icon: GraduationCap },
      { id: "school-nochild", label: "I don't have a child", icon: Users },
      { id: "school-inprogress", label: "Finding a school", icon: UserPlus, isWide: true }
    ]
  },
  {
    id: 'dlicense',
    title: "Confirm Driver's License",
    description: "Start the process to get your official UAE driving license",
    question: "Driving",
    emphasisText: "license?",
    answers: [
      { id: "dlicense-confimed", label: "Yes, I have a license", icon: Car },
      { id: "dlicense-none", label: "No, I don't have one", icon: FileQuestion },
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
      { id: "insurance-none", label: "I'm not covered", icon: LucideBanknote },
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
    question: "Got a bank",
    emphasisText: "account  ?",
    answers: [
      { id: "bank-confirmed", label: "Yes, I have my bank", icon: PiggyBank },
      { id: "bank-mid", label: "I don't have one", icon: BanknotesIcon },
      { id: "bank-none", label: "I'm in the process of getting one", icon: Building2, isWide: true }
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