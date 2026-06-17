<<<<<<< HEAD
import { GoogleGenerativeAI } from "@google/generative-ai";

export const getGeminiMove = async (apiKey: string, fen: string, history: string[]) => {
  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ 
      model: "gemini-3.1-flash-lite",
      systemInstruction: "You are a Grandmaster level chess engine. You will be provided with the current FEN and move history. Analyze the position and return ONLY the best move in Standard Algebraic Notation (SAN), like 'e4', 'Nf3', or 'O-O'. Do not include any explanation or extra text. If there are multiple good moves, pick one. Ensure the move is legal in the given FEN position."
    });

    const prompt = `Current FEN: ${fen}\nMove History: ${history.join(", ")}\n\nWhat is the best move for ${fen.split(" ")[1] === 'w' ? 'White' : 'Black'}?`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text().trim();
    
    // Simple sanitization to get just the SAN move
    const moveMatch = text.match(/[KQRBN]?[a-h]?[1-8]?x?[a-h][1-8](\=[QRBN])?[+#]?|O-O-O|O-O/);
    return moveMatch ? moveMatch[0] : text;
  } catch (error) {
    console.error("Gemini AI Error:", error);
    throw error;
  }
};
=======
import { GoogleGenerativeAI } from "@google/generative-ai";

export const getGeminiMove = async (apiKey: string, fen: string, history: string[]) => {
  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ 
      model: "gemini-3.1-flash-lite",
      systemInstruction: "You are a Grandmaster level chess engine. You will be provided with the current FEN and move history. Analyze the position and return ONLY the best move in Standard Algebraic Notation (SAN), like 'e4', 'Nf3', or 'O-O'. Do not include any explanation or extra text. If there are multiple good moves, pick one. Ensure the move is legal in the given FEN position."
    });

    const prompt = `Current FEN: ${fen}\nMove History: ${history.join(", ")}\n\nWhat is the best move for ${fen.split(" ")[1] === 'w' ? 'White' : 'Black'}?`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text().trim();
    
    // Simple sanitization to get just the SAN move
    const moveMatch = text.match(/[KQRBN]?[a-h]?[1-8]?x?[a-h][1-8](\=[QRBN])?[+#]?|O-O-O|O-O/);
    return moveMatch ? moveMatch[0] : text;
  } catch (error) {
    console.error("Gemini AI Error:", error);
    throw error;
  }
};
>>>>>>> 58ae2d66e6140b224578a2d3f1955de90803f31d
