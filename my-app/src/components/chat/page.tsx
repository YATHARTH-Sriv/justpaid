'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ToolInvocation } from 'ai';
import { Message, useChat } from 'ai/react';

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit, addToolResult } = useChat({
    maxSteps: 5,
    async onToolCall({ toolCall }) {
      if (toolCall.toolName === 'getcompanyname') {
        const companyName = input;
        return companyName;
      }
    },
  });

  return (
    // <div className="flex justify-center items-center h-screen w-full bg-gradient-to-b from-gray-100 to-gray-200 text-gray-900">
      <Card className="w-full  shadow-2xl hover:shadow-xl transition-shadow duration-300">
        <CardHeader className="bg-primary text-white p-4 rounded-t-lg">
          <CardTitle className="text-3xl">AI Business Assistant</CardTitle>
          <CardDescription>Ask for revenue, expenses, profit, and more about your company!</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <ScrollArea className="h-[400px] w-full mb-4 bg-white shadow-inner rounded-lg p-4">
            {messages?.map((m: Message) => (
              <div key={m.id} className="mb-4">
                <p>
                  <strong className="text-blue-600">{m.role}:</strong> {m.content}
                </p>
                {m.toolInvocations?.map((toolInvocation: ToolInvocation) => {
                  const toolCallId = toolInvocation.toolCallId;
                  const addResult = (result: string) =>
                    addToolResult({ toolCallId, result });

                  return 'result' in toolInvocation ? (
                    <div key={toolCallId} className="text-green-600">
                      {`Tool ${toolInvocation.toolName}: ${toolInvocation.result}`}
                    </div>
                  ) : (
                    <div key={toolCallId} className="text-orange-600">
                      {`Calling ${toolInvocation.toolName}...`}
                    </div>
                  );
                })}
              </div>
            ))}
          </ScrollArea>

          <form onSubmit={handleSubmit} className="flex items-center">
            <Input
              type="text"
              placeholder="Ask about your business..."
              value={input}
              onChange={handleInputChange}
              className="flex-grow shadow-lg rounded-md"
            />
            <Button type="submit" className="ml-2 bg-primary text-white hover:bg-primary-dark">
              Send
            </Button>
          </form>
        </CardContent>
      </Card>
    // </div>
  );
}
