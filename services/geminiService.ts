import { GoogleGenAI, Type } from "@google/genai";
import { GeneratedContent, InputData } from "../types";

export const generateSocialContent = async (input: InputData): Promise<GeneratedContent> => {
  // استخدام مفتاح البيئة مباشرة كما هو مطلوب في التعليمات
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  // اختيار نموذج Flash لأنه يوفر أعلى حدود استخدام مجانية وسرعة فائقة
  const model = "gemini-3-flash-preview"; 

  const parts: any[] = [];
  
  if (input.image && input.mimeType) {
    parts.push({
      inlineData: {
        data: input.image,
        mimeType: input.mimeType
      }
    });
    parts.push({
      text: "Analyze this image and the input text to create viral content."
    });
  }

  parts.push({
    text: `
    Act as a world-class viral content strategist.
    SOURCE: "${input.text}"

    TASK:
    Generate content in Formal, Casual, and Wise tones. 
    Crucially, write a 'Long Article' that is exhaustive, SEO-ready, and over 6000 characters.
    Include Twitter threads (7-10 tweets), LinkedIn/Facebook posts, and a high-impact Video Script.
    Provide virality scores and hashtags.
    `
  });

  try {
    const response = await ai.models.generateContent({
      model,
      contents: { parts },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            variations: {
              type: Type.OBJECT,
              properties: {
                Formal: { type: Type.OBJECT, properties: { twitterThread: { type: Type.ARRAY, items: { type: Type.STRING } }, linkedInPost: { type: Type.STRING }, facebookPost: { type: Type.STRING }, videoScript: { type: Type.OBJECT, properties: { hook: { type: Type.STRING }, body: { type: Type.STRING }, callToAction: { type: Type.STRING }, visualCues: { type: Type.STRING } }, required: ["hook", "body", "callToAction", "visualCues"] } }, required: ["twitterThread", "linkedInPost", "facebookPost", "videoScript"] },
                Casual: { type: Type.OBJECT, properties: { twitterThread: { type: Type.ARRAY, items: { type: Type.STRING } }, linkedInPost: { type: Type.STRING }, facebookPost: { type: Type.STRING }, videoScript: { type: Type.OBJECT, properties: { hook: { type: Type.STRING }, body: { type: Type.STRING }, callToAction: { type: Type.STRING }, visualCues: { type: Type.STRING } }, required: ["hook", "body", "callToAction", "visualCues"] } }, required: ["twitterThread", "linkedInPost", "facebookPost", "videoScript"] },
                Wise: { type: Type.OBJECT, properties: { twitterThread: { type: Type.ARRAY, items: { type: Type.STRING } }, linkedInPost: { type: Type.STRING }, facebookPost: { type: Type.STRING }, videoScript: { type: Type.OBJECT, properties: { hook: { type: Type.STRING }, body: { type: Type.STRING }, callToAction: { type: Type.STRING }, visualCues: { type: Type.STRING } }, required: ["hook", "body", "callToAction", "visualCues"] } }, required: ["twitterThread", "linkedInPost", "facebookPost", "videoScript"] }
              },
              required: ["Formal", "Casual", "Wise"]
            },
            longArticle: { type: Type.STRING },
            suggestedHashtags: { type: Type.ARRAY, items: { type: Type.STRING } },
            suggestedKeywords: { type: Type.ARRAY, items: { type: Type.STRING } },
            viralityScore: {
              type: Type.OBJECT,
              properties: {
                emotion: { type: Type.NUMBER },
                logic: { type: Type.NUMBER },
                trendiness: { type: Type.NUMBER },
                clarity: { type: Type.NUMBER },
                controversy: { type: Type.NUMBER }
              },
              required: ["emotion", "logic", "trendiness", "clarity", "controversy"]
            }
          },
          required: ["variations", "longArticle", "suggestedHashtags", "suggestedKeywords", "viralityScore"]
        }
      }
    });

    if (response.text) {
      let cleanText = response.text.trim();
      if (cleanText.startsWith("```")) {
        cleanText = cleanText.replace(/^```(json)?/, "").replace(/```$/, "").trim();
      }
      return JSON.parse(cleanText) as GeneratedContent;
    }
  } catch (error: any) {
    console.error("Engine Error:", error);
    throw new Error("عذراً، المحرك غير متاح حالياً. تأكد من إعداد مفتاح API في بيئة العمل.");
  }
  throw new Error("تعذر توليف المحتوى.");
};

export const generateVeoVideo = async (script: string): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  let operation = await ai.models.generateVideos({
    model: 'veo-3.1-fast-generate-preview',
    prompt: script.substring(0, 300),
    config: { numberOfVideos: 1, resolution: '720p', aspectRatio: '9:16' }
  });
  while (!operation.done) {
    await new Promise(resolve => setTimeout(resolve, 10000));
    operation = await ai.operations.getVideosOperation({operation: operation});
  }
  const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
  return `${downloadLink}&key=${process.env.API_KEY}`;
};