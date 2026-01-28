
export interface MemberDetails {
  fullNameAr: string;
  fullNameFr: string;
  birthDate: string;
  birthPlace: string;
  bloodType: string;
  idNumber: string;
  role: string;
  issueDate: string;
  expiryDate: string;
  photo: string | null;
  gender: string;
}

export enum BloodTypes {
  A_PLUS = "A+",
  A_MINUS = "A-",
  B_PLUS = "B+",
  B_MINUS = "B-",
  O_PLUS = "O+",
  O_MINUS = "O-",
  AB_PLUS = "AB+",
  AB_MINUS = "AB-"
}

export enum MemberRoles {
  VOLUNTEER = "متطوع (Bénévole)",
  RESCUER = "مسعف (Secouriste)",
  CHEF = "رئيس فرقة (Chef d'équipe)",
  MEMBER = "عضو مكتب (Membre)",
  ADHERENT = "منخرط (Adhérent)"
}
