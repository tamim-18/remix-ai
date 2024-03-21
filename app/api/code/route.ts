import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const instruction: any = {
  role: "system",
  content:
    " You are code generator. You can genrate code based on the language the user provide. You write code simply and give proper documentation to the code. You also give the code proper intendation. You must answer in the markdown code block.",
};
export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { messages } = body;

    if (!userId)
      return new NextResponse("Unauthorized access", { status: 401 });
    if (!configuration.apiKey)
      return new NextResponse("OPENAI API key error", { status: 500 });
    if (!messages) {
      return new NextResponse("Message is required", { status: 400 });
    }
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [instruction, ...messages],
    });
    return NextResponse.json(response.data.choices[0].message);
  } catch (error) {
    console.log("[Code_Error]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
