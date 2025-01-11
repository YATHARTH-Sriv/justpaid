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
    <Card className="w-full shadow-2xl hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="bg-primary text-white p-4 rounded-t-lg">
        <CardTitle className="text-3xl">AI Business Assistant</CardTitle>
        <CardDescription className="text-gray-100">
          Ask for revenue, expenses, profit, and more about your company!
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <ScrollArea className="h-[400px] w-full mb-4 bg-white shadow-inner rounded-lg p-4">
          {messages?.map((m: Message) => (
            <div key={m.id} className="mb-4">
              <p>
                <strong className="text-blue-600">{m.role}:</strong>{' '}
                <span className="whitespace-pre-wrap">{m.content}</span>
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

        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <div className="relative flex-grow">
            <Input
              type="text"
              placeholder="Ask about your business..."
              value={input}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent cursor-text"
              style={{ cursor: 'text' }}
              autoComplete="off"
              required
            />
          </div>
          <Button 
            type="submit" 
            className="bg-primary text-white hover:bg-primary/90 px-4 py-2"
          >
            Send
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}