export interface GetEmployeeResponse {
  id: string;
  name: string;
  emailAddress: string;
  phoneNumber: string;
  daysWorked: number;
  cafe: string;
  cafeId: string;
  startDate: Date;
  gender: "M" | "F" | "O";
}
