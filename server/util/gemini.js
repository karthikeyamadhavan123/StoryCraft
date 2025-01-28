const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const { GoogleGenerativeAI } = require('@google/generative-ai')
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_SECRET_KEY)
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

const generate = async (prompt) => {
    try {
        const res = await model.generateContent(prompt)
        return res
    } catch (error) {
        console.log(error);

    }
}
module.exports=generate

