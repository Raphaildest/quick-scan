import { QA } from '../types/qa';
import { initialHierarchies } from './hierarchyData';

export const initialQAs: QA[] = [
  {
    id: 'a1111111-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    sap: '100234',
    name: 'Maria Silva',
    email: 'maria.silva@nttdata.com',
    hierarchy_id: initialHierarchies[0].id,
    hierarchy: initialHierarchies[0],
    previous_scan_score: 65,
    previous_scan_classification: 'Médio',
    created_at: new Date().toISOString()
  },
  {
    id: 'a2222222-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    sap: '100582',
    name: 'Carlos Eduardo Santos',
    email: 'carlos.santos@nttdata.com',
    hierarchy_id: initialHierarchies[0].id,
    hierarchy: initialHierarchies[0],
    previous_scan_score: 48,
    previous_scan_classification: 'Baixo',
    created_at: new Date().toISOString()
  },
  {
    id: 'a3333333-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    sap: '100891',
    name: 'Fernanda Oliveira',
    email: 'fernanda.oliveira@nttdata.com',
    hierarchy_id: initialHierarchies[0].id,
    hierarchy: initialHierarchies[0],
    previous_scan_score: 84,
    previous_scan_classification: 'Alto',
    created_at: new Date().toISOString()
  },
  {
    id: 'a4444444-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    sap: '101012',
    name: 'Rafael Mendes',
    email: 'rafael.mendes@nttdata.com',
    hierarchy_id: initialHierarchies[1].id,
    hierarchy: initialHierarchies[1],
    previous_scan_score: 72,
    previous_scan_classification: 'Médio',
    created_at: new Date().toISOString()
  },
  {
    id: 'a5555555-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    sap: '101344',
    name: 'Juliana Costa',
    email: 'juliana.costa@nttdata.com',
    hierarchy_id: initialHierarchies[1].id,
    hierarchy: initialHierarchies[1],
    previous_scan_score: 88,
    previous_scan_classification: 'Alto',
    created_at: new Date().toISOString()
  },
  {
    id: 'a6666666-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    sap: '101567',
    name: 'Lucas Barbosa',
    email: 'lucas.barbosa@nttdata.com',
    hierarchy_id: initialHierarchies[2].id,
    hierarchy: initialHierarchies[2],
    previous_scan_score: 55,
    previous_scan_classification: 'Baixo',
    created_at: new Date().toISOString()
  },
  {
    id: 'a7777777-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    sap: '102019',
    name: 'Beatriz Lima',
    email: 'beatriz.lima@nttdata.com',
    hierarchy_id: initialHierarchies[3].id,
    hierarchy: initialHierarchies[3],
    previous_scan_score: 91,
    previous_scan_classification: 'Alto',
    created_at: new Date().toISOString()
  },
  {
    id: 'a8888888-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    sap: '102450',
    name: 'Thiago Rocha',
    email: 'thiago.rocha@nttdata.com',
    hierarchy_id: initialHierarchies[3].id,
    hierarchy: initialHierarchies[3],
    previous_scan_score: 62,
    previous_scan_classification: 'Médio',
    created_at: new Date().toISOString()
  },
  {
    id: 'a9999999-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    sap: '103110',
    name: 'Aline Martins',
    email: 'aline.martins@nttdata.com',
    hierarchy_id: initialHierarchies[4].id,
    hierarchy: initialHierarchies[4],
    previous_scan_score: 78,
    previous_scan_classification: 'Médio',
    created_at: new Date().toISOString()
  },
  {
    id: 'b1111111-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
    sap: '103554',
    name: 'Rodrigo Nogueira',
    email: 'rodrigo.nogueira@nttdata.com',
    hierarchy_id: initialHierarchies[4].id,
    hierarchy: initialHierarchies[4],
    previous_scan_score: 42,
    previous_scan_classification: 'Baixo',
    created_at: new Date().toISOString()
  },
  {
    id: 'b2222222-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
    sap: '104001',
    name: 'Patricia Albuquerque',
    email: 'patricia.albuquerque@nttdata.com',
    hierarchy_id: initialHierarchies[2].id,
    hierarchy: initialHierarchies[2],
    previous_scan_score: undefined,
    previous_scan_classification: 'Não Avaliado',
    created_at: new Date().toISOString()
  },
  {
    id: 'b3333333-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
    sap: '104231',
    name: 'Marcelo Castro',
    email: 'marcelo.castro@nttdata.com',
    hierarchy_id: initialHierarchies[5].id,
    hierarchy: initialHierarchies[5],
    previous_scan_score: 85,
    previous_scan_classification: 'Alto',
    created_at: new Date().toISOString()
  },
  {
    id: 'b4444444-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
    sap: '104590',
    name: 'Camila Farias',
    email: 'camila.farias@nttdata.com',
    hierarchy_id: initialHierarchies[5].id,
    hierarchy: initialHierarchies[5],
    previous_scan_score: 68,
    previous_scan_classification: 'Médio',
    created_at: new Date().toISOString()
  },
  {
    id: 'b5555555-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
    sap: '105120',
    name: 'Gustavo Prado',
    email: 'gustavo.prado@nttdata.com',
    hierarchy_id: initialHierarchies[6].id,
    hierarchy: initialHierarchies[6],
    previous_scan_score: 92,
    previous_scan_classification: 'Alto',
    created_at: new Date().toISOString()
  },
  {
    id: 'b6666666-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
    sap: '105432',
    name: 'Larissa Souza',
    email: 'larissa.souza@nttdata.com',
    hierarchy_id: initialHierarchies[6].id,
    hierarchy: initialHierarchies[6],
    previous_scan_score: 74,
    previous_scan_classification: 'Médio',
    created_at: new Date().toISOString()
  },
  {
    id: 'b7777777-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
    sap: '105877',
    name: 'Felipe Cardoso',
    email: 'felipe.cardoso@nttdata.com',
    hierarchy_id: initialHierarchies[7].id,
    hierarchy: initialHierarchies[7],
    previous_scan_score: 86,
    previous_scan_classification: 'Alto',
    created_at: new Date().toISOString()
  },
  {
    id: 'b8888888-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
    sap: '106201',
    name: 'Amanda Vieira',
    email: 'amanda.vieira@nttdata.com',
    hierarchy_id: initialHierarchies[7].id,
    hierarchy: initialHierarchies[7],
    previous_scan_score: 51,
    previous_scan_classification: 'Baixo',
    created_at: new Date().toISOString()
  },
  {
    id: 'b9999999-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
    sap: '106540',
    name: 'Bruno Carvalho',
    email: 'bruno.carvalho@nttdata.com',
    hierarchy_id: initialHierarchies[0].id,
    hierarchy: initialHierarchies[0],
    previous_scan_score: 82,
    previous_scan_classification: 'Alto',
    created_at: new Date().toISOString()
  },
  {
    id: 'c1111111-cccc-cccc-cccc-cccccccccccc',
    sap: '106912',
    name: 'Vanessa Ribeiro',
    email: 'vanessa.ribeiro@nttdata.com',
    hierarchy_id: initialHierarchies[1].id,
    hierarchy: initialHierarchies[1],
    previous_scan_score: 44,
    previous_scan_classification: 'Baixo',
    created_at: new Date().toISOString()
  },
  {
    id: 'c2222222-cccc-cccc-cccc-cccccccccccc',
    sap: '107234',
    name: 'Daniel Moreira',
    email: 'daniel.moreira@nttdata.com',
    hierarchy_id: initialHierarchies[2].id,
    hierarchy: initialHierarchies[2],
    previous_scan_score: 65,
    previous_scan_classification: 'Médio',
    created_at: new Date().toISOString()
  },
  {
    id: 'c3333333-cccc-cccc-cccc-cccccccccccc',
    sap: '107650',
    name: 'Gabriela Ramos',
    email: 'gabriela.ramos@nttdata.com',
    hierarchy_id: initialHierarchies[3].id,
    hierarchy: initialHierarchies[3],
    previous_scan_score: 90,
    previous_scan_classification: 'Alto',
    created_at: new Date().toISOString()
  },
  {
    id: 'c4444444-cccc-cccc-cccc-cccccccccccc',
    sap: '108112',
    name: 'Leandro Silveira',
    email: 'leandro.silveira@nttdata.com',
    hierarchy_id: initialHierarchies[4].id,
    hierarchy: initialHierarchies[4],
    previous_scan_score: 70,
    previous_scan_classification: 'Médio',
    created_at: new Date().toISOString()
  },
  {
    id: 'c5555555-cccc-cccc-cccc-cccccccccccc',
    sap: '108543',
    name: 'Renan Pires',
    email: 'renan.pires@nttdata.com',
    hierarchy_id: initialHierarchies[6].id,
    hierarchy: initialHierarchies[6],
    previous_scan_score: 49,
    previous_scan_classification: 'Baixo',
    created_at: new Date().toISOString()
  },
  {
    id: 'c6666666-cccc-cccc-cccc-cccccccccccc',
    sap: '109001',
    name: 'Tatiana Ferreira',
    email: 'tatiana.ferreira@nttdata.com',
    hierarchy_id: initialHierarchies[7].id,
    hierarchy: initialHierarchies[7],
    previous_scan_score: undefined,
    previous_scan_classification: 'Não Avaliado',
    created_at: new Date().toISOString()
  }
];
