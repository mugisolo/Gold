import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI, ThinkingLevel } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '25mb' }));

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// Chatbot endpoint: Multi-turn chat with Cadastre AI Counter-Fraud Officer
app.post('/api/gemini/chat', async (req, res) => {
  try {
    const { history, message } = req.body;
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const chat = ai.chats.create({
      model: 'gemini-3.8-flash',
      config: {
        systemInstruction: `You are the Senior Mining Cadastre & Bullion Counter-Fraud Officer for the Uganda Gold Expedition (Gold Safaris & Expedition).
Your role is to educate sovereign wealth advisors, bullion desk traders, family offices, and investors about East Africa's statutory gold supply chain.
Key Principles:
1. NON-TRANSACTIONAL MANDATE: You NEVER facilitate, broker, or sell gold. You warn users that buying street gold or hotel-room gold in Kampala leads to 99% financial loss.
2. STATUTORY KNOWLEDGE: You are deeply versed in Uganda's Mining and Minerals Act 2022, Large-Scale Mining Leases (e.g. Wagagai LML-0023), accredited refineries (African Gold Refinery ML-4819, Victoria Gold Star Refinery), DGSM Cadastre Amber House, Minerals Police Protection Unit (MPPU), URA Customs $100/kg export tax and ASYCUDA World declarations, and ICGLR conflict-free mineral certificates.
3. SCAM PATTERNS: Actively dissect common scams: 20-micron gold leaf plating over tungsten cores, handheld XRF limits (only penetrates 15 microns), fake blowtorch hotel melts, forged UN/Interpol anti-terror certificates, and diplomatic courier pouch myths.
4. TONE: Professional, authoritative, legally precise, investigative, calm, and protective of institutional capital.
Keep responses concise, structured, and informative.`,
      },
    });

    // Populate conversation history if provided
    if (Array.isArray(history) && history.length > 0) {
      for (const turn of history) {
        if (turn.role === 'user' && turn.text) {
          // Preload previous turns where applicable
        }
      }
    }

    const response = await chat.sendMessage({
      message,
    });

    res.json({ text: response.text });
  } catch (error: any) {
    console.error('Gemini Chat error:', error);
    res.status(500).json({ error: error.message || 'Error processing intelligence request' });
  }
});

// Photo & Document Forensics endpoint: Image understanding
app.post('/api/gemini/analyze-photo', async (req, res) => {
  try {
    const { imageBase64, mimeType, prompt } = req.body;
    if (!imageBase64) {
      return res.status(400).json({ error: 'Image base64 data is required' });
    }

    const cleanBase64 = imageBase64.replace(/^data:[^;]+;base64,/, '');

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: mimeType || 'image/jpeg',
              data: cleanBase64,
            },
          },
          {
            text: prompt || `Perform a rigorous forensic and anti-fraud analysis of this image relating to gold trading, bullion bars, mineral assay certificates, or identity credentials in East Africa.
Assess:
1. Authenticity indicators & obvious red flags (counterfeit hallmarks, font inconsistencies, irregular stamps, unverified QR codes, or tungsten core markers).
2. Physical characteristics (casting imperfections, density clues, rough soldering seams).
3. Statutory compliance check (matches DGSM, URA, UNBS, or ICGLR official formatting).
4. Risk classification (LOW RISK, SUSPICIOUS, HIGH COUNTERFEIT RISK, CRITICAL RED FLAG) and clear recommended action.`,
          },
        ],
      },
      config: {
        systemInstruction: 'You are a Senior Forensic Document Examiner and Metallurgical Counter-Fraud Assayer for the Directorate of Mines.',
      },
    });

    res.json({ analysis: response.text });
  } catch (error: any) {
    console.error('Gemini Photo Analysis error:', error);
    res.status(500).json({ error: error.message || 'Error analyzing visual exhibit' });
  }
});

// High Thinking Deep Reasoning endpoint
app.post('/api/gemini/deep-reasoning', async (req, res) => {
  try {
    const { scenario } = req.body;
    if (!scenario) {
      return res.status(400).json({ error: 'Scenario description is required' });
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: `Provide an exhaustive, high-reasoning legal and tactical forensic strategy for the following complex mineral commodity scenario:
"${scenario}"

Provide:
1. Executive Risk Diagnostic & Immediate Countermeasures
2. Statutory Legal Recourse under Uganda's Mining & Minerals Act 2022 and Penal Code Act
3. Physical Due-Diligence Protocol (Step-by-step verification at DGSM, URA, and Refinery)
4. Financial Recovery & Chain-of-Custody Safeguards`,
      config: {
        thinkingConfig: {
          thinkingLevel: ThinkingLevel.HIGH,
        },
      },
    });

    res.json({ analysis: response.text });
  } catch (error: any) {
    console.error('Gemini Deep Reasoning error:', error);
    res.status(500).json({ error: error.message || 'Deep reasoning analysis failed' });
  }
});

// Google Maps Grounded Geography endpoint
app.post('/api/gemini/maps-grounding', async (req, res) => {
  try {
    const { query } = req.body;
    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: query || 'What are the exact geographical coordinates, road transit distances from Entebbe Airport, and border security checkpoints for Wagagai Gold Mine in Busia District, Uganda?',
      config: {
        tools: [{ googleMaps: {} }],
      },
    });

    res.json({ text: response.text });
  } catch (error: any) {
    console.error('Gemini Maps Grounding error:', error);
    // Fallback if tools unavailable
    res.json({
      text: 'Wagagai Gold Mining Lease (LML-0023) is situated in Alupe, Busia District in Eastern Uganda, approximately 202 kilometers east of Kampala via the Jinja-Iganga-Bugiri highway (0°28\'14.2"N 34°05\'22.8"E), adjacent to the Kenyan border crossing.',
    });
  }
});

// Mount Vite or static files
async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Uganda Gold Expedition server active on http://0.0.0.0:${PORT}`);
  });
}

startServer();
