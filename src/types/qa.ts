export interface Hierarchy {
  id: string;
  gerencia: string;
  coordenacao: string;
  squad_name: string;
}

export type ScanClassification = 'Alto' | 'Médio' | 'Baixo' | 'Não Avaliado';

export interface QA {
  id: string;
  sap: string;
  name: string;
  email?: string;
  hierarchy_id?: string;
  hierarchy?: Hierarchy;
  previous_scan_score?: number;
  previous_scan_classification?: ScanClassification;
  created_at?: string;
}
