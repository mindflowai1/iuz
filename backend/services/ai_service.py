import random
from typing import Dict, Any

class AIService:
    @staticmethod
    def classify_lead(text: str) -> Dict[str, Any]:
        """
        Simulates Claude Sonnet 4.5 analyzing a lead text.
        Returns classifications and suggested actions.
        """
        # Simulated logic based on keywords
        text_lower = text.lower()
        
        area = "Cível" # Default
        if "divórcio" in text_lower or "separação" in text_lower:
            area = "Família"
        elif "trabalho" in text_lower or "demissão" in text_lower:
            area = "Trabalhista"
        elif "empresa" in text_lower or "contrato" in text_lower:
            area = "Empresarial"
            
        urgency = "Média"
        if "urgente" in text_lower or "hoje" in text_lower:
            urgency = "Alta"
            
        score = random.randint(60, 95)
        
        return {
            "area_do_direito": area,
            "classificacao_dor": f"Cliente relatando problemas relacionados a {area}.",
            "urgencia": urgency,
            "score_qualificacao": score,
            "insights": "Cliente demonstra intenção clara. Recomenda-se contato imediato.",
            "proximos_passos": "Agendar reunião de qualificação."
        }

    @staticmethod
    def summarize_document(ocr_text: str) -> str:
        """
        Simulates summarizing a legal document.
        """
        return f"Resumo Executivo (Simulado via Claude): O documento apresentado refere-se a uma petição inicial sobre {ocr_text[:30]}... Os pontos principais indicam prazos peremptórios e necessidade de contestação em 15 dias."
