import { NextResponse } from "next/server";
import { UserProfile, Biomarker, HealthPriority, CoachMessage } from "@/types/health";

interface CoachRequestBody {
  message: string;
  userProfile?: UserProfile;
  priorities?: HealthPriority[];
  biomarkers?: Biomarker[];
  language?: "en" | "es" | "fr";
}

export async function POST(req: Request) {
  try {
    const body: CoachRequestBody = await req.json();
    const { message, userProfile, biomarkers, language = "en" } = body;

    if (!message || !message.trim()) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    const lower = message.toLowerCase();
    const country = userProfile?.country || "Spain";
    const emergencyNumber = country === "Morocco" ? "SAMU 15 / Police 19" : "Europe Emergency: 112";

    // 1. Red Flag / Acute Emergency Triage Protocol
    const emergencyKeywords = [
      "chest pain",
      "heart attack",
      "shortness of breath",
      "numbness in arm",
      "face drooping",
      "stroke",
      "fainting",
      "dolor en el pecho",
      "dificultad para respirar",
      "douleur thoracique",
      "difficulté à respirer",
      "perte de connaissance",
    ];

    if (emergencyKeywords.some((kw) => lower.includes(kw))) {
      return NextResponse.json({
        text:
          language === "es"
            ? `⚠️ **PROTOCOLO DE URGENCIA ACTIVADO**\n\nLos síntomas descritos (como dolor torácico, dificultad respiratoria súbita o entumecimiento) pueden indicar una urgencia médica cardiovascular o neurológica aguda.\n\n**No esperes ni intentes cambios de estilo de vida.**\n\n• En España / Europa: Llama inmediatamente al **112**\n• En Marruecos: Llama al **15** (SAMU) o **141**\n• Acude sin demora al servicio de urgencias hospitalario más cercano.`
            : language === "fr"
            ? `⚠️ **PROTOCOLE D'URGENCE MÉDICALE ACTIVÉ**\n\nLes symptômes décrits (douleur thoracique, essoufflement brutal, engourdissement) peuvent être le signe d'une urgence cardiovasculaire ou neurologique aiguë.\n\n**N'attendez pas et ne cherchez pas de solution alternative.**\n\n• En France / Europe : Appelez le **15** (SAMU) ou le **112**\n• Au Maroc : Appelez le **15** (SAMU) ou le **141**\n• Rendez-vous immédiatement aux urgences les plus proches.`
            : `⚠️ **URGENT SAFETY PROTOCOL ACTIVATED**\n\nSymptoms such as chest discomfort, sudden shortness of breath, radiating arm pain, or severe weakness may signal an acute cardiovascular or neurological emergency.\n\n**Do not wait, monitor, or attempt lifestyle interventions.**\n\n• In Spain / Europe: Call **112** immediately\n• In Morocco: Call **15** (SAMU) or **141**\n• Go directly to the nearest hospital emergency department.`,
        safetyMode: "urgent_emergency",
        emergencyHelpline: emergencyNumber,
        suggestedActions: [
          { label: "Call Emergency Services (112 / 15)", actionId: "call_emergency" },
        ],
      });
    }

    // 2. Prescription Medication Boundary
    const medicationKeywords = [
      "stop taking",
      "stop my medication",
      "change dosage",
      "start taking statin",
      "dejar de tomar",
      "cambiar dosis",
      "arrêter mon médicament",
      "changer la dose",
    ];

    if (medicationKeywords.some((kw) => lower.includes(kw))) {
      return NextResponse.json({
        text:
          language === "es"
            ? `No puedo recomendarte iniciar, suspender o alterar medicamentos recetados. Cualquier cambio farmacológico requiere supervisión médica directa.\n\nPuedo preparar un resumen estructurado de tus registros de presión arterial (media 134/84 mmHg) y valores de ApoB para que lo revises con tu médico de cabecera.`
            : language === "fr"
            ? `Je ne peux pas vous conseiller de modifier, débuter ou interrompre un traitement médical. Toute adaptation doit être validée par votre médecin traitant.\n\nJe peux en revanche compiler vos relevés tensionnels (moyenne 134/84 mmHg) et votre bilan ApoB sous forme de fiche de consultation clinique.`
            : `I cannot recommend altering, starting, or discontinuing prescription medication. Such decisions require comprehensive clinical assessment with your prescribing physician.\n\nHowever, I can prepare a structured summary of your home blood pressure logs (average 134/84 mmHg) and ApoB readings so you can review them collaboratively with your doctor.`,
        safetyMode: "clinician_recommended",
        suggestedActions: [
          { label: "Generate Doctor Consultation Brief", actionId: "open_doctor_summary" },
        ],
      });
    }

    // 3. Gemini API Integration (if GEMINI_API_KEY is available in environment)
    const geminiApiKey = process.env.GEMINI_API_KEY;
    if (geminiApiKey) {
      try {
        const promptSystem = `You are Norya, a science-first personal health operating system.
Your character: Calm, minimal, evidence-based, warm, highly practical.
You are helping ${userProfile?.firstName || "Sarah"} (Age: ${userProfile?.age || 44}, Country: ${country}).
Current Physiological State:
- Weight: ${userProfile?.weightKg || 82.4} kg (Down from 86.1 kg)
- Blood Pressure: ${userProfile?.bloodPressureSystolic || 134}/${userProfile?.bloodPressureDiastolic || 84} mmHg
- Resting Heart Rate: ${userProfile?.restingHeartRateBpm || 67} bpm
- ApoB: 105 mg/dL (Target <80-90 mg/dL, Grade A)
- HbA1c: 5.7% (Improved from 5.9%)
- Sleep recent 3-day average: 5h 54m (Baseline: 7h 02m)

Rules:
1. Ground answers strictly in evidence-based preventive health.
2. Max 3 priorities. No biohacking theater, no unnecessary €100/mo gadget recommendations.
3. Language must be ${language === "es" ? "Spanish" : language === "fr" ? "French" : "English"}.
4. Return a clean, calm, helpful explanation with 2-3 specific action steps for the next 24 hours.`;

        const geminiRes = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${geminiApiKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [
                {
                  role: "user",
                  parts: [{ text: `${promptSystem}\n\nUser Question: ${message}` }],
                },
              ],
              generationConfig: {
                temperature: 0.2,
                maxOutputTokens: 600,
              },
            }),
          }
        );

        if (geminiRes.ok) {
          const geminiData = await geminiRes.json();
          const generatedText = geminiData.candidates?.[0]?.content?.parts?.[0]?.text;
          if (generatedText) {
            return NextResponse.json({
              text: generatedText,
              safetyMode: "wellness",
            });
          }
        }
      } catch (geminiError) {
        console.error("Gemini API call failed, falling back to local clinical engine", geminiError);
      }
    }

    // 4. Clinical Context Engine Fallback (Instant, deterministic, zero latency)
    let responseText = "";
    let recommendations: string[] = [];
    let contextMetrics: CoachMessage["contextMetrics"] = undefined;
    let suggestedActions: CoachMessage["suggestedActions"] = undefined;
    let safetyMode: CoachMessage["safetyMode"] = "wellness";

    if (lower.includes("tired") || lower.includes("fatigue") || lower.includes("sleep") || lower.includes("cansada") || lower.includes("fatigué")) {
      responseText =
        language === "es"
          ? `Tus datos de sueño recientes explican tu cansancio: has promediado 5h 54m en las últimas 3 noches (frente a tu línea base de 7h 02m). Además, tu frecuencia cardíaca en reposo se ha elevado 5 lpm.\n\nEn lugar de un entrenamiento intenso que elevaría el cortisol, hoy es ideal para recuperación activa.`
          : language === "fr"
          ? `Vos données récentes de sommeil expliquent cette fatigue : vous avez dormi 5h 54m en moyenne ces 3 dernières nuits (contre 7h 02m en temps normal). De plus, votre fréquence cardiaque au repos a augmenté de 5 bpm.\n\nPlutôt qu'un entraînement intense, privilégiez aujourd'hui la récupération active.`
          : `Your recent sleep data reveals why you feel fatigued: you averaged 5h 54m over the past 3 nights, compared with your stable 7h 02m baseline. In addition, your resting heart rate is elevated by 5 bpm above baseline.\n\nInstead of a high-stress workout that could spike systemic cortisol, today is ideally suited to active recovery.`;

      contextMetrics = [
        { label: "3-Night Sleep Avg", value: "5h 54m (Target: 7h+)", status: "warning" },
        { label: "Resting Heart Rate", value: "72 bpm (+5 bpm)", status: "warning" },
      ];
      recommendations = [
        language === "es" ? "Paseo suave de 35 minutos al aire libre" : language === "fr" ? "Marche douce de 35 minutes en extérieur" : "Choose a gentle 35-minute outdoor walk rather than strenuous exercise",
        language === "es" ? "Hidratación constante (500ml agua + electrolitos)" : language === "fr" ? "Hydratation (500ml eau + pincée de sel/électrolytes)" : "Ensure adequate hydration (500ml water + pinch of salt/electrolytes)",
        language === "es" ? "Luces apagadas antes de las 22:15 hoy" : language === "fr" ? "Extinction des écrans à 22h15 ce soir" : "Aim for lights-out by 22:15 tonight to begin sleep debt payback",
      ];
      suggestedActions = [{ label: "Switch today's plan to Recovery", actionId: "switch_recovery" }];
    } else if (lower.includes("cgm") || lower.includes("glucose monitor") || lower.includes("sensor") || lower.includes("capteur")) {
      responseText =
        language === "es"
          ? `**No recomendado en este momento.**\n\nTus 3 prioridades principales son la reducción de la presión arterial, el movimiento aeróbico y la pérdida de peso constante. Un sensor de glucosa continuo (70€–100€/mes) no cambiará esas prioridades. Tu HbA1c ya está mejorando (5,7% frente a 5,9%), y tu presupuesto de 50€/mes rinde mucho más en calzado adecuado o alimentos ricos en fibra.`
          : language === "fr"
          ? `**Non recommandé actuellement.**\n\nVos trois priorités absolues sont la baisse de votre tension artérielle, la marche active et la poursuite de votre perte de poids. Un capteur de glycémie (70 à 100€/mois) ne modifiera pas ces priorités. Votre HbA1c s'améliore déjà (5,7%), et votre budget santé est bien mieux investi dans une alimentation riche en fibres.`
          : `**Not recommended right now.**\n\nYour top three priorities are blood pressure reduction, cardiorespiratory movement, and steady weight loss. A continuous glucose monitor (€70–€100/mo) will not change those priorities. Your HbA1c is already improving (5.7% from 5.9%), and your €50/mo health budget is far better allocated toward validated home blood pressure checks, quality groceries, or comfortable walking shoes.`;

      recommendations = [
        "Focus on proven fundamentals: 7,000 steps daily",
        "Maintain your 120g daily protein anchor",
        "Ignore biohacking theater and high-cost gadgets",
      ];
    } else if (lower.includes("apob") || lower.includes("cholesterol") || lower.includes("colesterol") || lower.includes("blood test") || lower.includes("analyse")) {
      safetyMode = "health_info";
      responseText =
        language === "es"
          ? `Aquí tienes la ciencia detrás de tu analítica:\n\n• **ApoB (105 mg/dL)**: Mide el número exacto de partículas aterogénicas que atraviesan la pared arterial. Dado el antecedente coronario de tu padre a los 62 años, optimizar el conteo de partículas (<80-90 mg/dL) ofrece mayor protección que mirar solo el colesterol total.\n• **HbA1c (5,7%)**: Ha bajado del 5,9%, confirmando que tu pérdida de 3,7 kg ha mejorado la sensibilidad a la insulina.`
          : language === "fr"
          ? `Voici l'analyse médicale de votre bilan :\n\n• **ApoB (105 mg/dL)** : Mesure le nombre exact de particules athérogènes capables de traverser la paroi artérielle. Compte tenu des antécédents coronariens familiaux, surveiller ce nombre de particules (<80-90 mg/dL) est bien plus prédictif que le cholestérol total.\n• **HbA1c (5,7%)** : En baisse par rapport à 5,9%, démontrant les effets bénéfiques de votre perte de 3,7 kg.`
          : `Here is the science behind your recent panel:\n\n• **ApoB (105 mg/dL)**: Apolipoprotein B measures the exact number of atherogenic cholesterol-carrying particles. Because your father had coronary artery disease at 62, managing particle count (<80-90 mg/dL) is more protective than watching standard total cholesterol alone.\n• **HbA1c (5.7%)**: Down from 5.9%, indicating that your 3.7 kg weight reduction has already improved cellular insulin sensitivity.\n• **Kidneys & Liver**: eGFR (94) and Triglycerides (142 mg/dL) are optimal.`;

      contextMetrics = [
        { label: "ApoB", value: "105 mg/dL (Target <90)", status: "warning" },
        { label: "HbA1c", value: "5.7% (Optimal trend)", status: "normal" },
      ];
      suggestedActions = [
        { label: "Open Deep-Dive Biomarker Drawer", actionId: "view_labs" },
        { label: "Prepare Doctor Brief", actionId: "open_doctor_summary" },
      ];
    } else {
      responseText =
        language === "es"
          ? `Entendido. Analizando tu contexto actual (Peso: ${userProfile?.weightKg || 82.4} kg, Presión Arterial: 134/84 mmHg, Pasos medios: 6.780), el estímulo más beneficioso sigue siendo la constancia cardiovascular diaria en lugar de intervenciones complejas.\n\n¿En qué más te gustaría que profundicemos hoy?`
          : language === "fr"
          ? `Bien compris. Au vu de vos constantes (Poids : ${userProfile?.weightKg || 82.4} kg, Tension : 134/84 mmHg, Pas quotidiens : 6 780), le levier le plus puissant reste la régularité de l'activité aérobie modérée plutôt que des protocoles complexes.\n\nComment puis-je vous aider sur vos analyses ou vos habitudes aujourd'hui ?`
          : `Understood. Looking across your health context (Weight: ${userProfile?.weightKg || 82.4} kg, BP: 134/84 mmHg, Avg steps: 6,780), the most impactful lever remains steady cardiovascular habit consistency rather than complex interventions.\n\nHow else can I assist with your plan or lab results today?`;
    }

    return NextResponse.json({
      text: responseText,
      recommendations: recommendations.length > 0 ? recommendations : undefined,
      contextMetrics,
      suggestedActions,
      safetyMode,
    });
  } catch (error) {
    console.error("Coach API error:", error);
    return NextResponse.json({ error: "Failed to generate coach response" }, { status: 500 });
  }
}
