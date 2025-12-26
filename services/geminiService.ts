import { GoogleGenAI, Type } from "@google/genai";
import { GeneratedContent, InputData } from "../types";

export const generateSocialContent = async (input: InputData): Promise<GeneratedContent> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  // Use gemini-3-flash-preview for maximum availability and stability in this environment
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
      text: "Analyze this image and the text below to generate content."
    });
  }

  parts.push({
    text: `
    Act as a world-class viral content strategist and elite copywriter.
    
    SOURCE INPUT:
    "${input.text}"

    TASK:
    Generate comprehensive social media content in THREE distinct tones and one MASSIVE long-form article.
    
    1. FORMAL: Professional, corporate, authoritative (for LinkedIn/Official channels).
    2. CASUAL: Slang, high-energy, relatable, "internet native" language (for Twitter/TikTok).
    3. WISE: Philosophical, deep, reflective, mentoring tone.
    
    CRITICAL REQUIREMENT:
    Write a "Long Article" that is EXTREMELY detailed, SEO-optimized, and STRICTLY OVER 6000 CHARACTERS long. 
    Dive deep into the topic, use subheadings, bullet points, data references, and extensive analysis. 
    It must be a complete guide/essay.

    REQUIREMENTS:
    - Twitter threads must be 5-7 tweets.
    - Video scripts must have visual cues.
    - The Long Article must be substantial (>6000 chars).
    - Provide viral hashtags and keywords.
    - Analyze the content's virality potential and provide scores (0-100) for emotion, logic, trendiness, clarity, and controversy.
    `
  });

  const socialContentSchema = {
    type: Type.OBJECT,
    properties: {
      twitterThread: {
        type: Type.ARRAY,
        items: { type: Type.STRING },
      },
      linkedInPost: { type: Type.STRING },
      facebookPost: { type: Type.STRING },
      videoScript: {
        type: Type.OBJECT,
        properties: {
          hook: { type: Type.STRING },
          body: { type: Type.STRING },
          callToAction: { type: Type.STRING },
          visualCues: { type: Type.STRING }
        },
        required: ["hook", "body", "callToAction", "visualCues"]
      }
    },
    required: ["twitterThread", "linkedInPost", "facebookPost", "videoScript"]
  };

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
              Formal: socialContentSchema,
              Casual: socialContentSchema,
              Wise: socialContentSchema
            },
            required: ["Formal", "Casual", "Wise"]
          },
          longArticle: {
            type: Type.STRING,
            description: "A comprehensive article strictly over 6000 characters."
          },
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
  
  throw new Error("Failed to generate content");
};


export const generateVeoVideo = async (script: string): Promise<string> => {
  const win = window as any;
  
  const performGeneration = async () => {
    // Check key selection for Veo models as per required guidelines
    if (win.aistudio && win.aistudio.hasSelectedApiKey) {
      const hasKey = await win.aistudio.hasSelectedApiKey();
      if (!hasKey) {
        await win.aistudio.openSelectKey();
      }
    }

    const freshAi = new GoogleGenAI({ apiKey: process.env.API_KEY });

    let operation = await freshAi.models.generateVideos({
      model: 'veo-3.1-fast-generate-preview',
      prompt: script.substring(0, 300),
      config: {
        numberOfVideos: 1,
        resolution: '720p',
        aspectRatio: '9:16'
      }
    });

    while (!operation.done) {
      await new Promise(resolve => setTimeout(resolve, 10000));
      operation = await freshAi.operations.getVideosOperation({operation: operation});
    }

    const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
    if (!downloadLink) throw new Error("No video generated");

    return `${downloadLink}&key=${process.env.API_KEY}`;
  };

  try {
    return await performGeneration();
  } catch (e: any) {
    const errorMessage = e.message || JSON.stringify(e);
    // Handle the specific 404/Not Found error by re-prompting for key selection
    if (errorMessage.includes("Requested entity was not found") || errorMessage.includes("404")) {
      if (win.aistudio && win.aistudio.openSelectKey) {
        await win.aistudio.openSelectKey();
        // After opening dialog, we proceed immediately assuming key selection as per instructions
        return await performGeneration();
      }
    }
    throw e;
  }
};