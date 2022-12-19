export interface RegisterI {
  id: number;
  name: string;
  description: string;
  module_id: number;
}

export interface ModuleI {
  id: number;
  name: string;
  project_id: number;
  registers: RegisterI[];
}

export interface ProjectI {
  id: number;
  name: string;
  modules: ModuleI[];
}