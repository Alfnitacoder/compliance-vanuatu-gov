export type Department = 'DEPC' | 'DoE' | 'VMGD' | 'DoCC' | 'NDMO';

export interface DepartmentInfo {
  id: Department;
  name: string;
  description: string;
  color: string;
}