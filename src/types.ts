export type ListingType = 'FREE' | 'SELL' | 'EXCHANGE' | 'BORROW';

export type MainCategory =
  | 'Study Material Hub'
  | 'Electronics & Components'
  | 'Engineering Tools'
  | 'Lab Materials'
  | 'Student Marketplace';

export type EngineeringSubCategory = 'Mechanical' | 'Civil' | 'Electrical' | 'CS';

export type DepartmentType =
  | 'CSE'
  | 'ECE'
  | 'EEE'
  | 'ME'
  | 'CE'
  | 'IT'
  | 'Science'
  | 'Management'
  | 'Other';

export type ItemCondition = 'Like New' | 'Good' | 'Fair' | 'Needs Minor Repair';

export type ItemStatus = 'Available' | 'Reserved' | 'Borrowed' | 'Reused';

export interface CampusItem {
  id: string;
  title: string;
  category: MainCategory;
  sub_category?: EngineeringSubCategory; // For Engineering Tools & Lab Materials
  listingType: ListingType;
  price?: number; // In INR ₹ (0 if FREE or EXCHANGE)
  exchangeFor?: string; // e.g., "I have a Java book and need a DSA book"
  borrowDurationDays?: number; // e.g., 7 days
  condition: ItemCondition;
  description: string;
  imageUrl: string;
  department: DepartmentType;
  yearOfStudy: '1st Year' | '2nd Year' | '3rd Year' | '4th Year' | 'PG / Research';
  ownerId: string;
  ownerName: string;
  ownerEmail: string;
  ownerPhone?: string;
  location: CampusLocation;
  status: ItemStatus;
  createdAt: string;
  viewsCount: number;
  tags: string[];
  ecoImpact: {
    wasteAvoidedKg: number;
    co2AvoidedKg: number;
    savingsInr: number;
    isEWaste?: boolean;
  };
}

export type CampusLocation =
  | 'Library'
  | 'Department'
  | 'Hostel'
  | 'Main block'
  | 'Waste collection point'
  | 'Recycling center';

export interface StudentUser {
  id: string;
  name: string;
  email: string;
  department: DepartmentType;
  year: '1st Year' | '2nd Year' | '3rd Year' | '4th Year' | 'PG / Research';
  rollNumber: string;
  greenPoints: number;
  itemsDonated: number;
  itemsReused: number;
  itemsExchanged: number;
  avatarUrl: string;
  isAdmin?: boolean;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: 'borrow_request' | 'exchange_proposal' | 'green_alert' | 'system' | 'general';
  actionable?: boolean;
  actionTaken?: boolean;
  requesterName?: string;
  targetItemId?: string;
  itemTitle?: string;
}

export interface ExchangeProposal {
  id: string;
  fromStudentId: string;
  fromStudentName: string;
  toStudentId: string;
  offeredItemTitle: string;
  requestedItemId: string;
  requestedItemTitle: string;
  message: string;
  status: 'Pending' | 'Accepted' | 'Declined';
  createdAt: string;
}

export interface BorrowRecord {
  id: string;
  itemId: string;
  itemTitle: string;
  borrowerName: string;
  borrowerEmail: string;
  borrowDate: string;
  returnDueDate: string;
  status: 'Active' | 'Returned' | 'Overdue';
}

export interface RepairReport {
  id: string;
  itemTitle: string;
  category: string;
  issueDescription: string;
  location: string;
  reportedBy: string;
  reportedAt: string;
  assignedTo: string;
  status: 'Reported' | 'In Progress' | 'Repaired' | 'Salvaged for Parts';
}

export interface LostFoundItem {
  id: string;
  type: 'Lost' | 'Found';
  title: string;
  description: string;
  category: 'ID Cards' | 'Books' | 'Calculators' | 'Bags' | 'Electronics' | 'Belongings';
  location: CampusLocation;
  contactPerson: string;
  dateReported: string;
  claimed: boolean;
  imageUrl?: string;
}

export interface CampusIdea {
  id: string;
  title: string;
  author: string;
  department: string;
  description: string;
  category: 'Sustainability' | 'Academic' | 'Hostel' | 'Infrastructure' | 'Lab';
  upvotes: number;
  userUpvoted?: boolean;
  status: 'Under Review' | 'Approved' | 'In Progress' | 'Implemented';
  date: string;
}

export interface InternshipApplication {
  id: string;
  company: string;
  role: string;
  type: 'Internship' | 'Research' | 'Hackathon';
  stipendOrReward: string;
  status: 'Bookmarked' | 'Applied' | 'Interview Scheduled' | 'Offered' | 'Certified';
  deadline: string;
  location: string;
  appliedDate?: string;
}

export interface SeniorNoteResource {
  id: string;
  title: string;
  seniorName: string;
  seniorDept: DepartmentType;
  yearGraduating: string;
  subject: string;
  semester: string;
  fileType: 'PDF Notes' | 'Question Bank' | 'Viva Guide' | 'Project Blueprint';
  downloadsCount: number;
  adviceSnippet: string;
}
