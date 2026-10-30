export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      hierarchies: {
        Row: {
          id: string
          gerencia: string
          coordenacao: string
          squad_name: string
          created_at: string
        }
        Insert: {
          id?: string
          gerencia: string
          coordenacao: string
          squad_name: string
          created_at?: string
        }
        Update: {
          id?: string
          gerencia?: string
          coordenacao?: string
          squad_name?: string
          created_at?: string
        }
      }
      qas: {
        Row: {
          id: string
          sap: string
          name: string
          email: string | null
          hierarchy_id: string | null
          previous_scan_score: number | null
          previous_scan_classification: string | null
          created_at: string
        }
        Insert: {
          id?: string
          sap: string
          name: string
          email?: string | null
          hierarchy_id?: string | null
          previous_scan_score?: number | null
          previous_scan_classification?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          sap?: string
          name?: string
          email?: string | null
          hierarchy_id?: string | null
          previous_scan_score?: number | null
          previous_scan_classification?: string | null
          created_at?: string
        }
      }
      questions: {
        Row: {
          id: number
          code: string
          dimension: string
          dimension_label: string
          title: string
          statement: string
          options: Json
          correct_answer: string
          explanation: string | null
          weight: number
          created_at: string
        }
        Insert: {
          id: number
          code: string
          dimension: string
          dimension_label: string
          title: string
          statement: string
          options: Json
          correct_answer: string
          explanation?: string | null
          weight?: number
          created_at?: string
        }
        Update: {
          id?: number
          code?: string
          dimension?: string
          dimension_label?: string
          title?: string
          statement?: string
          options?: Json
          correct_answer?: string
          explanation?: string | null
          weight?: number
          created_at?: string
        }
      }
      assessments: {
        Row: {
          id: string
          qa_id: string
          status: string
          answers: Json
          practical_repo_url: string | null
          practical_storage_path: string | null
          practical_strategy: string | null
          ai_tool_used: string | null
          ai_prompt: string | null
          ai_accepted_rejected: string | null
          ai_hallucination_answer: string | null
          ai_refactoring: string | null
          quality_fundamentals_score: number
          automation_readiness_score: number
          engineering_readiness_score: number
          cicd_data_readiness_score: number
          ai_readiness_score: number
          overall_score: number
          classification: string
          predominant_profile: string
          transition_diagnosis: string | null
          recommended_action: string | null
          completed_at: string
        }
        Insert: {
          id?: string
          qa_id: string
          status?: string
          answers?: Json
          practical_repo_url?: string | null
          practical_storage_path?: string | null
          practical_strategy?: string | null
          ai_tool_used?: string | null
          ai_prompt?: string | null
          ai_accepted_rejected?: string | null
          ai_hallucination_answer?: string | null
          ai_refactoring?: string | null
          quality_fundamentals_score: number
          automation_readiness_score: number
          engineering_readiness_score: number
          cicd_data_readiness_score: number
          ai_readiness_score: number
          overall_score: number
          classification: string
          predominant_profile: string
          transition_diagnosis?: string | null
          recommended_action?: string | null
          completed_at?: string
        }
        Update: {
          id?: string
          qa_id?: string
          status?: string
          answers?: Json
          practical_repo_url?: string | null
          practical_storage_path?: string | null
          practical_strategy?: string | null
          ai_tool_used?: string | null
          ai_prompt?: string | null
          ai_accepted_rejected?: string | null
          ai_hallucination_answer?: string | null
          ai_refactoring?: string | null
          quality_fundamentals_score?: number
          automation_readiness_score?: number
          engineering_readiness_score?: number
          cicd_data_readiness_score?: number
          ai_readiness_score?: number
          overall_score?: number
          classification?: string
          predominant_profile?: string
          transition_diagnosis?: string | null
          recommended_action?: string | null
          completed_at?: string
        }
      }
      squad_diagnostics: {
        Row: {
          id: string
          hierarchy_id: string
          stack: string[]
          web_coverage: number
          api_coverage: number
          mobile_coverage: number
          regressive_count: number
          automated_count: number
          has_pipeline: boolean
          has_automated_data: boolean
          opportunities: Json
          action_plan_text: string | null
          target_coverage_90_days: number
          evaluated_by: string | null
          updated_at: string
        }
        Insert: {
          id?: string
          hierarchy_id: string
          stack?: string[]
          web_coverage?: number
          api_coverage?: number
          mobile_coverage?: number
          regressive_count?: number
          automated_count?: number
          has_pipeline?: boolean
          has_automated_data?: boolean
          opportunities?: Json
          action_plan_text?: string | null
          target_coverage_90_days?: number
          evaluated_by?: string | null
          updated_at?: string
        }
        Update: {
          id?: string
          hierarchy_id?: string
          stack?: string[]
          web_coverage?: number
          api_coverage?: number
          mobile_coverage?: number
          regressive_count?: number
          automated_count?: number
          has_pipeline?: boolean
          has_automated_data?: boolean
          opportunities?: Json
          action_plan_text?: string | null
          target_coverage_90_days?: number
          evaluated_by?: string | null
          updated_at?: string
        }
      }
    }
  }
}
