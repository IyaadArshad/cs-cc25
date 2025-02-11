import { Briefcase, CheckCircle, FileQuestion, Plane, XCircle } from "lucide-react";

export const furtherSteps = [
  {
    id: 'visa',
    title: "Confirm visa Appointment",
    description: "Confirm your secured residency permit",
    question: "Select your visa status",
    answers: [
      { id: "workVisa", label: "Work Visa", icon: Briefcase as any },
      { id: "touristVisa", label: "Tourist Visa", icon: Plane as any },
      { id: "other", label: "Other", icon: FileQuestion as any },
    ],
  },
  {
    title: "Confirm School Setup",
    description: "Set up enrollment details for your children's schooling in Abu Dhabi",
    question: "Enroll School?",
    answers: [
      { id: "yes", label: "Yes", icon: CheckCircle },
      { id: "no", label: "No", icon: XCircle },
    ],
  },
  {
    title: "Locate Hospitals Nearby",
    description: "Find quality healthcare providers and facilities near you",
    question: "Hospitals Listed?",
    answers: [
      { id: "yes", label: "Yes", icon: CheckCircle },
      { id: "no", label: "No", icon: XCircle },
    ],
  },
  {
    title: "Apply for a Driver's License",
    description: "Start the process to get your official UAE driving license",
    question: "License Applied?",
    answers: [
      { id: "yes", label: "Yes", icon: CheckCircle },
      { id: "no", label: "No", icon: XCircle },
    ],
  },
  {
    title: "Obtain Medical Insurance",
    description: "Ensure you have adequate health coverage in the UAE",
    question: "Insurance Active?",
    answers: [
      { id: "yes", label: "Yes", icon: CheckCircle },
      { id: "no", label: "No", icon: XCircle },
    ],
  },
  {
    title: "Register for a Mobile SIM Card",
    description: "Stay connected by choosing the best telecom provider in the UAE",
    question: "SIM Activated?",
    answers: [
      { id: "yes", label: "Yes", icon: CheckCircle },
      { id: "no", label: "No", icon: XCircle },
    ],
  },
  {
    title: "Set up a Bank Account",
    description: "Open a UAE bank account for seamless financial transactions",
    question: "Bank Account Open?",
    answers: [
      { id: "yes", label: "Yes", icon: CheckCircle },
      { id: "no", label: "No", icon: XCircle },
    ],
  },
  {
    title: "Connect with Expat Communities",
    description: "Join local groups to share experiences and receive support",
    question: "Expat Joined?",
    answers: [
      { id: "yes", label: "Yes", icon: CheckCircle },
      { id: "no", label: "No", icon: XCircle },
    ],
  },
  {
    title: "Learn about Emirati Culture",
    description: "Discover local customs and traditions specific to Abu Dhabi",
    question: "Culture Learned?",
    answers: [
      { id: "yes", label: "Yes", icon: CheckCircle },
      { id: "no", label: "No", icon: XCircle },
    ],
  },
  {
    title: "Explore UAE Infrastructure",
    description: "Get informed about public transport, utilities, and connectivity services",
    question: "Infra Ready?",
    answers: [
      { id: "yes", label: "Yes", icon: CheckCircle },
      { id: "no", label: "No", icon: XCircle },
    ],
  },
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