export type Language = "en" | "es" | "fr";

export interface Translations {
  nav: {
    home: string;
    coach: string;
    health: string;
    plan: string;
    labs: string;
    progress: string;
    timeline: string;
    prevention: string;
    doctor: string;
    devices: string;
    family: string;
    settings: string;
  };
  home: {
    greeting: string;
    subgreeting: string;
    topPrioritiesTitle: string;
    topPrioritiesSubtitle: string;
    todayActionsTitle: string;
    todayActionsSubtitle: string;
    quickPromptTitle: string;
    scoreCardTitle: string;
    scoreCardSubtitle: string;
    devicesCardTitle: string;
    devicesCardConnected: string;
    syncAll: string;
  };
  coach: {
    title: string;
    subtitle: string;
    inputPlaceholder: string;
    sendButton: string;
    quickPrompts: string;
    prepareDoctor: string;
    safetyNotice: string;
  };
  doctor: {
    title: string;
    subtitle: string;
    printButton: string;
    copyButton: string;
    copied: string;
    patientDetails: string;
    reasonTitle: string;
    vitalsTitle: string;
    labsTitle: string;
    questionsTitle: string;
    addQuestion: string;
  };
  common: {
    evidenceGrade: string;
    done: string;
    pending: string;
    skipped: string;
    syncing: string;
    connected: string;
    disconnected: string;
    emergencyWarning: string;
  };
}

export const translations: Record<Language, Translations> = {
  en: {
    nav: {
      home: "Home",
      coach: "AI Coach",
      health: "Health Domains",
      plan: "Plan & Habits",
      labs: "Labs & Tests",
      progress: "Progress",
      timeline: "Timeline",
      prevention: "Prevention",
      doctor: "Doctor Handoff",
      devices: "Connected Devices",
      family: "Circle of Care",
      settings: "Profile & Settings",
    },
    home: {
      greeting: "Good morning",
      subgreeting: "Here is your unified health cockpit for today.",
      topPrioritiesTitle: "Today's Top 3 Priorities",
      topPrioritiesSubtitle: "Ranked by scientific evidence and your personal biomarker trajectory. Focus on these; ignore the rest.",
      todayActionsTitle: "Daily Actions & Micro-Habits",
      todayActionsSubtitle: "Simple, high-leverage steps to execute today.",
      quickPromptTitle: "Ask Coach about your health data:",
      scoreCardTitle: "Health Opportunity Score",
      scoreCardSubtitle: "Points to gain through consistent habits (0 is optimal)",
      devicesCardTitle: "Connected Health Hardware",
      devicesCardConnected: "active feeds synced",
      syncAll: "Sync All Sources",
    },
    coach: {
      title: "Norya AI Health Coach",
      subtitle: "Contextual intelligence grounded in your biomarkers, blood pressure logs, and sleep trends.",
      inputPlaceholder: "Ask about your biomarkers, daily plan, tiredness, or doctor questions...",
      sendButton: "Send",
      quickPrompts: "Suggested prompts:",
      prepareDoctor: "Prepare for Doctor",
      safetyNotice: "Educational health intelligence only. Not diagnostic advice. In emergencies, call 112 or 15.",
    },
    doctor: {
      title: "Prepare for My Doctor",
      subtitle: "A concise, 1-page structured consultation brief for your upcoming medical visit.",
      printButton: "Print / Save PDF",
      copyButton: "Copy Text",
      copied: "Copied to Clipboard",
      patientDetails: "Patient Clinical Collaboration Brief",
      reasonTitle: "1. Reason for Review / Primary Concern",
      vitalsTitle: "2. Verified Vitals & 90-Day Trends",
      labsTitle: "3. Latest Out-of-Range Biomarkers",
      questionsTitle: "4. Questions for Your Clinician",
      addQuestion: "Add discussion question...",
    },
    common: {
      evidenceGrade: "Evidence Grade",
      done: "Completed",
      pending: "Pending",
      skipped: "Skipped",
      syncing: "Syncing...",
      connected: "Connected",
      disconnected: "Disconnected",
      emergencyWarning: "Urgent Clinical Alert: Severe symptoms detected. Please seek emergency medical care immediately.",
    },
  },
  es: {
    nav: {
      home: "Inicio",
      coach: "Entrenador IA",
      health: "Dominios de Salud",
      plan: "Plan y Hábitos",
      labs: "Analíticas y Pruebas",
      progress: "Progreso",
      timeline: "Cronología",
      prevention: "Prevención",
      doctor: "Resumen Médico",
      devices: "Dispositivos Conectados",
      family: "Círculo Familiar",
      settings: "Perfil y Ajustes",
    },
    home: {
      greeting: "Buenos días",
      subgreeting: "Aquí tienes tu panel de salud unificado para hoy.",
      topPrioritiesTitle: "Tus 3 Prioridades Principales",
      topPrioritiesSubtitle: "Clasificadas por evidencia científica y tu trayectoria personal. Céntrate en esto; ignora el ruido.",
      todayActionsTitle: "Acciones y Hábitos de Hoy",
      todayActionsSubtitle: "Pequeños pasos de alto impacto para completar hoy.",
      quickPromptTitle: "Pregunta al Entrenador sobre tus datos:",
      scoreCardTitle: "Puntuación de Oportunidad de Salud",
      scoreCardSubtitle: "Puntos a reducir mediante hábitos constantes (0 es óptimo)",
      devicesCardTitle: "Dispositivos de Salud Conectados",
      devicesCardConnected: "sensores activos sincronizados",
      syncAll: "Sincronizar Fuentes",
    },
    coach: {
      title: "Entrenador de Salud Norya IA",
      subtitle: "Inteligencia contextual basada en tus biomarcadores, presión arterial y sueño.",
      inputPlaceholder: "Pregunta sobre tus análisis, plan diario, cansancio o dudas para tu médico...",
      sendButton: "Enviar",
      quickPrompts: "Preguntas sugeridas:",
      prepareDoctor: "Preparar para el Médico",
      safetyNotice: "Información educativa de bienestar. No sustituye diagnóstico médico. En urgencias, llama al 112.",
    },
    doctor: {
      title: "Preparar para Mi Médico",
      subtitle: "Un resumen clínico estructurado de 1 página para tu próxima consulta médica.",
      printButton: "Imprimir / Guardar PDF",
      copyButton: "Copiar Texto",
      copied: "Copiado al portapapeles",
      patientDetails: "Informe de Colaboración Clínica del Paciente",
      reasonTitle: "1. Motivo de Consulta / Preocupación Principal",
      vitalsTitle: "2. Constantes Verificadas y Tendencias a 90 Días",
      labsTitle: "3. Biomarcadores Recientes Fuera de Rango",
      questionsTitle: "4. Preguntas para tu Médico",
      addQuestion: "Añadir pregunta para la consulta...",
    },
    common: {
      evidenceGrade: "Grado de Evidencia",
      done: "Completado",
      pending: "Pendiente",
      skipped: "Omitido",
      syncing: "Sincronizando...",
      connected: "Conectado",
      disconnected: "Desconectado",
      emergencyWarning: "Alerta Médica Urgente: Síntomas graves detectados. Acude a urgencias o llama al 112.",
    },
  },
  fr: {
    nav: {
      home: "Accueil",
      coach: "Coach IA",
      health: "Domaines de Santé",
      plan: "Plan & Habitudes",
      labs: "Analyses & Bilans",
      progress: "Progrès",
      timeline: "Chronologie",
      prevention: "Prévention",
      doctor: "Fiche Médecin",
      devices: "Appareils Connectés",
      family: "Cercle Familial",
      settings: "Profil & Paramètres",
    },
    home: {
      greeting: "Bonjour",
      subgreeting: "Voici votre tableau de bord de santé unifié du jour.",
      topPrioritiesTitle: "Vos 3 Priorités Absolues",
      topPrioritiesSubtitle: "Classées par preuve scientifique et biomarqueurs personnels. Concentrez-vous ici ; ignorez le reste.",
      todayActionsTitle: "Actions et Habitudes du Jour",
      todayActionsSubtitle: "Des étapes simples à fort impact à accomplir aujourd'hui.",
      quickPromptTitle: "Interrogez le Coach sur vos données :",
      scoreCardTitle: "Score d'Opportunité de Santé",
      scoreCardSubtitle: "Points à réduire grâce à des habitudes durables (0 est l'optimum)",
      devicesCardTitle: "Capteurs de Santé Connectés",
      devicesCardConnected: "sources actives synchronisées",
      syncAll: "Tout Synchroniser",
    },
    coach: {
      title: "Coach Santé Norya IA",
      subtitle: "Intelligence contextuelle alimentée par vos biomarqueurs, tension et sommeil.",
      inputPlaceholder: "Posez une question sur vos analyses, votre fatigue ou votre consultation...",
      sendButton: "Envoyer",
      quickPrompts: "Suggestions :",
      prepareDoctor: "Préparer ma Consultation",
      safetyNotice: "Outil éducatif de prévention. Ne remplace pas un médecin. En urgence, appelez le 15 (SAMU) ou le 112.",
    },
    doctor: {
      title: "Préparer ma Consultation Médicale",
      subtitle: "Une synthèse clinique structurée en 1 page pour votre prochain rendez-vous.",
      printButton: "Imprimer / PDF",
      copyButton: "Copier le Texte",
      copied: "Copié dans le presse-papier",
      patientDetails: "Fiche de Synthèse Médicale Patient",
      reasonTitle: "1. Motif de Consultation / Préoccupation",
      vitalsTitle: "2. Constantes et Tendances sur 90 Jours",
      labsTitle: "3. Derniers Biomarqueurs Hors Normes",
      questionsTitle: "4. Questions à Poser au Médecin",
      addQuestion: "Ajouter une question...",
    },
    common: {
      evidenceGrade: "Niveau de Preuve",
      done: "Terminé",
      pending: "En attente",
      skipped: "Ignoré",
      syncing: "Synchronisation...",
      connected: "Connecté",
      disconnected: "Déconnecté",
      emergencyWarning: "Alerte Médicale Urgente : Symptômes graves détectés. Contactez le 15 (SAMU) ou les urgences.",
    },
  },
};
