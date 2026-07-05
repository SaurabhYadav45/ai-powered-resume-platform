/**
 * aiAnalysis Utility (with Cover Letter)
 * @description Connects to the Google Gemini API for resume analysis and cover letter generation.
 */

// const { GoogleGenerativeAI } = require("@google/generative-ai");

// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
// const model = genAI.getGenerativeModel({ model: "Gemini 2.0 Flash" });


// --- OPENAI CONFIGURATION (ACTIVE) ---
const OpenAI = require("openai");
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Helper to clean JSON output from markdown
const cleanAndParseJSON = (text) => {
  const cleanedText = text.replace(/^```json\s*/, '').replace(/```$/, '');
  const startIndex = cleanedText.indexOf('{');
  const endIndex = cleanedText.lastIndexOf('}');
  
  if (startIndex === -1 || endIndex === -1) {
    throw new Error("Valid JSON not found in response");
  }
  
  const jsonString = cleanedText.substring(startIndex, endIndex + 1);
  return JSON.parse(jsonString);
};

const aiAnalysis = {
  analyze: async (resumeText, jobDescription) => {
    console.log("--- [AI Service] Starting ENHANCED Gemini analysis ---");
    
    // const generationConfig = {
    //   temperature: 0.4, 
    //   topK: 1,
    //   topP: 1,
    //   maxOutputTokens: 8192,
    //   responseMimeType: "application/json",
    // };

    const prompt = `
      **Role:** You are an expert resume reviewer and senior hiring manager for a top tech company. Your feedback is critical, constructive, and highly valuable.

      **Context:** You have been given the text from a candidate's resume. You may also have a job description to compare it against. Your goal is to provide a detailed analysis that will genuinely help the candidate improve their resume and land more interviews.

      **Resume Text:**
      """
      ${resumeText}
      """

      ${jobDescription ? `
      **Job Description to Match Against:**
      """
      ${jobDescription}
      """
      ` : ''}

      **Task:**
      Analyze the provided texts and generate a JSON object with the following structure.

      **Strict Output Instructions:**
      1.  Your entire response must be a single, valid JSON object.
      2.  Do not include any text, explanations, or markdown formatting (like \`\`\`json) outside of the JSON object.
      3.  **CRITICAL:** Keep the "suggestions" EXTREMELY concise. Maximum 15 words per bullet point. Get straight to the point (e.g., "Add metrics to your sales achievements." instead of "You should try to add more numbers to your sales...").

      **Enhanced Analysis Requirements:**
      For "formattingFeedback", provide specific, actionable feedback on:
      - Layout and visual hierarchy (margins, spacing, alignment)
      - Font consistency and sizing
      - Section organization and flow
      - Use of bold/italics for emphasis
      - ATS compatibility (avoid columns, tables, headers/footers)
      
      For "suggestions", focus on these high-impact areas:
      - Quantifying achievements with specific metrics (% increases, $ savings, team sizes)
      - Using stronger, more specific action verbs
      - Tailoring the professional summary to match target roles
      - Optimizing keyword placement for ATS
      - Improving bullet point structure and impact
      
      For "missingSkills", identify critical technical and soft skills that:
      - Are commonly required in the candidate's field
      - Would significantly strengthen their profile
      - Are mentioned in the job description but absent from resume
      - Could be added without fabrication

      **JSON Output Structure:**
      {
        "skillsMatch": <A percentage (number from 0-100) representing how well the resume's skills and experience align with the job description. If no job description is provided, estimate a general score based on the resume's overall quality and clarity for a generic role in its likely field.>,
        "missingSkills": <An array of 3-5 specific, high-impact skills or qualifications mentioned in the job description that are completely missing from the resume. If no job description, suggest 3-5 generally valuable skills for the candidate's likely career path.>,
        "formattingFeedback": <A single string of concise, professional feedback on the resume's formatting. Comment on readability, use of white space, consistency, and overall layout.>,
        "suggestions": <An array of 3-4 powerful, actionable suggestions for improvement. Focus on high-impact areas like quantifying achievements with metrics (e.g., "Increased sales by 20%"), using stronger action verbs, and tailoring the professional summary. REMEMBER: Keep these short (under 15 words).>,
        "keywordFrequency": <An array of the top 5-7 most frequent and relevant professional keywords (technical skills, software, methodologies) found in the resume, along with their counts. Format as {"keyword": "KeywordName", "count": <number>}.>,
        "atsScore": <A percentage (number from 0-100) estimating how well the resume will perform against Applicant Tracking Systems. Consider factors like keyword optimization, proper formatting, and absence of elements that could confuse ATS.>,
        "atsOptimizationTips": <An array of 3-4 specific, actionable tips for optimizing the resume for Applicant Tracking Systems. Focus on concrete actions like "Incorporate X keyword from the job description" or "Replace 'team player' with 'cross-functional collaboration'".>,
        "impactScore": <A percentage (number from 0-100) evaluating how well the candidate quantifies their accomplishments with metrics and demonstrates impact.>,
        "actionVerbsScore": <A percentage (number from 0-100) assessing the strength and variety of action verbs used throughout the resume.>,
        "contentRelevance": <A percentage (number from 0-100) measuring how well the experience aligns with typical requirements for the candidate's likely career field.>,
        "lengthScore": <A percentage (number from 0-100) evaluating if the resume length is appropriate (typically 1-2 pages for most professionals).>,
        "quantificationScore": <A percentage (number from 0-100) calculating the proportion of bullet points that contain concrete numbers, percentages, or dollar amounts.>,
        "unquantifiedBulletPoints": <An array of 1-3 strings. Find 1-3 bullet points from the resume that lack metrics. For each, return the original bullet point followed by a short suggestion in brackets. Example: "Developed an EdTech platform [Suggestion: Add how many active users or features built]”>,
        "buzzwordsDetected": <An array of strings. Identify any clichés or empty buzzwords used (e.g., "Team player", "Hard worker", "Synergy"). Return empty array if none found.>,
        "readabilityScore": <A percentage (number from 0-100) assessing how easy the resume is to skim. Penalize dense text blocks, passive voice, or overly complex jargon.>,
        "industryBenchmark": <An object containing benchmark data for comparison. Include: {"avgSkillsMatch": <number 0-100>, "avgAtsScore": <number 0-100>, "avgImpactScore": <number 0-100>, "topKeywords": ["keyword1", "keyword2", "keyword3"]}. Estimate realistic averages for the candidate's field.>
      }
    `;

    try {
      // const result = await model.generateContent(prompt, generationConfig);
      // const response = result.response;
      // let text = response.text();
      // const startIndex = text.indexOf('{');
      // const endIndex = text.lastIndexOf('}');
      // if (startIndex === -1 || endIndex === -1) {
      //   throw new Error("No valid JSON object found in the AI response.");
      // }
      // const jsonString = text.substring(startIndex, endIndex + 1);
      // const analysisJson = JSON.parse(jsonString);
      // console.log("--- [AI Service] Enhanced analysis complete. ---");
      // return analysisJson;


      // --- OPENAI IMPLEMENTATION ---
      const completion = await openai.chat.completions.create({
        model: "gpt-4o", // or "gpt-3.5-turbo"
        messages: [
          { role: "system", content: "You are a helpful assistant that outputs strictly JSON." },
          { role: "user", content: prompt }
        ],
        temperature: 0.4,
        response_format: { type: "json_object" }, // Enforce JSON mode
      });

      const text = completion.choices[0].message.content;
      console.log("--- [AI Service] Enhanced analysis complete. ---");
      return JSON.parse(text); // OpenAI JSON mode usually returns clean JSON, but parsing is still needed
    } catch (error) {
      console.error("--- [AI Service] Error calling or parsing Gemini API response: ---", error);
      throw new Error("The AI analysis failed. The response may not be valid JSON.");
    }
  },

  /**
   * @async
   * @function generateCoverLetter
   * @description Generates a cover letter based on a resume and job description.
   * @param {string} resumeText - The extracted text from the user's resume.
   * @param {string} jobDescription - The job description text.
   * @returns {Promise<string>} A promise that resolves with the generated cover letter text.
   */
  generateCoverLetter: async (resumeText, jobDescription) => {
    console.log("--- [AI Service] Starting Cover Letter Generation ---");

    // const generationConfig = {
    //   temperature: 0.7, // Higher temperature for more creative writing
    //   topK: 1,
    //   topP: 1,
    //   maxOutputTokens: 8192,
    // };

    const prompt = `
      **Role:** You are a professional career writer with expertise in crafting compelling cover letters that get candidates noticed.

      **Context:** You have been provided with a candidate's resume text and the job description for a role they are applying for.

      **Resume Text:**
      """
      ${resumeText}
      """

      **Job Description:**
      """
      ${jobDescription}
      """

      **Task:**
      Write a professional, concise, and impactful cover letter tailored specifically to this candidate and role. Follow these instructions precisely:
      
      **Structure Requirements:**
      1.  **Header:** Begin with the candidate's contact information aligned left, followed by the date, then the employer's contact information.
      2.  **Salutation:** Use "Dear Hiring Manager" if no specific name is provided, or "Dear [Name]" if available.
      3.  **Opening Paragraph:** Start with a powerful hook that connects the candidate's background to the company's needs. Clearly state the position being applied for.
      4.  **Body Paragraphs (1-2):** Highlight 2-3 specific achievements or experiences from the resume that directly address key requirements in the job description. Use quantifiable results whenever possible.
      5.  **Closing Paragraph:** Reinforce the candidate's fit for the role, express enthusiasm for contributing to the company, and include a clear call to action for an interview.
      6.  **Sign-off:** Use professional closing ("Sincerely," "Best regards,") followed by the candidate's name.
      
      **Content Guidelines:**
      - Personalize the letter to show research about the company and role
      - Quantify achievements with specific metrics when possible
      - Use strong action verbs and confident language
      - Address the company's pain points and how the candidate solves them
      - Keep the tone professional yet personable
      - Limit to 300-400 words (approximately 3/4 page)
      
      **Output:** Your response should be only the complete text of the cover letter with proper formatting. Do not include any extra headings, titles, or explanations.
    `;

    try {
      // const result = await model.generateContent(prompt, generationConfig);
      // const response = result.response;
      // const coverLetterText = response.text();

      // console.log("--- [AI Service] Cover Letter generation complete. ---");
      // return coverLetterText;

      // --- OPENAI IMPLEMENTATION ---
      const completion = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          { role: "system", content: "You are a professional career coach." },
          { role: "user", content: prompt }
        ],
        temperature: 0.7,
      });

      console.log("--- [AI Service] Cover Letter generation complete. ---");
      return completion.choices[0].message.content;
    } catch (error) {
      console.error("--- [AI Service] Error generating cover letter: ---", error);
      throw new Error("The AI failed to generate a cover letter.");
    }
  },


  // 3. Build Resume Content (UPDATED)
  buildResumeContent: async (userData) => {
    console.log("--- [AI Service] Starting Resume Content Generation ---");

    // const generationConfig = {
    //   temperature: 0.5,
    //   maxOutputTokens: 8192,
    //   responseMimeType: "application/json",
    // };

    const prompt = `
      **Role:** Professional Resume Writer.
      **Task:** Rewrite the user's raw data into a professional, ATS-optimized resume JSON structure.
      
      **Instructions:**
      1. **Header:** Use the exact Name, Email, Phone, GitHub, LinkedIn provided.
      2. **Summary:** Write a concise 3-line professional summary.
      3. **Experience:** Convert raw descriptions into 2-3 punchy bullet points using action verbs.
      4. **Projects:** Rewrite "descriptionRaw" into 2-3 bullet points. **IMPORTANT:** Preserve the "link" and "repo" fields exactly as provided in the input.
      5. **Skills:** Clean up the skills list.
      6. **Education:** Keep details as provided.

      **Raw User Data:**
      ${JSON.stringify(userData)}

      **Output JSON Structure:**
      {
        "fullName": "${userData.fullName}",
        "email": "${userData.email}",
        "phone": "${userData.phone || ''}",
        "github": "${userData.github || ''}",
        "linkedin": "${userData.linkedin || ''}",
        "professionalSummary": "String",
        "education": [
          { "institution": "String", "degree": "String", "year": "String", "grade": "String" }
        ],
        "skills": ["String", "String"],
        "experience": [
          { "company": "String", "role": "String", "date": "String", "descriptionPoints": ["String", "String"] }
        ],
        "projects": [
          { 
            "title": "String", 
            "techStack": "String", 
            "descriptionPoints": ["String", "String"],
            "link": "String", 
            "repo": "String"
          }
        ],
        "achievements": ["String", "String"]
      }
    `;

    try {
      // const result = await model.generateContent(prompt, generationConfig);
      // let text = result.response.text();
      
      // // Clean markdown if present
      // text = text.replace(/^```json\s*/, '').replace(/```$/, '');
      // const startIndex = text.indexOf('{');
      // const endIndex = text.lastIndexOf('}');
      
      // if (startIndex === -1) throw new Error("Valid JSON not found");

      // return JSON.parse(text.substring(startIndex, endIndex + 1));


      // --- OPENAI IMPLEMENTATION ---
      const completion = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          { role: "system", content: "You are a professional resume writer that outputs strictly JSON." },
          { role: "user", content: prompt }
        ],
        temperature: 0.5,
        response_format: { type: "json_object" },
      });

      const text = completion.choices[0].message.content;
      return JSON.parse(text);
    } catch (error) {
      console.error("Resume Builder Error:", error);
      throw new Error("Failed to build resume content.");
    }
  },

  /**
   * @async
   * @function improveText
   * @description Enhances a single resume bullet point or summary using AI.
   */
  improveText: async (textToImprove) => {
    console.log("--- [AI Service] Starting Text Improvement ---");

    const prompt = `
      You are an expert resume writer. Improve the following resume text to make it more professional, impactful, and concise. 
      Use strong action verbs. Quantify achievements if the numbers are implied, or leave placeholders if they are not.
      
      Original Text: "${textToImprove}"
      
      Output ONLY the improved text. Do not include any quotes, explanations, prefixes, or markdown. Just the raw string.
    `;

    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          { role: "system", content: "You are a professional resume writer." },
          { role: "user", content: prompt }
        ],
        temperature: 0.5,
      });

      const improvedText = completion.choices[0].message.content.trim();
      // Remove surrounding quotes if OpenAI added them accidentally
      return improvedText.replace(/^["']|["']$/g, '');
    } catch (error) {
      console.error("--- [AI Service] Error improving text: ---", error);
      throw new Error("Failed to improve text.");
    }
  }
};

module.exports = aiAnalysis;
