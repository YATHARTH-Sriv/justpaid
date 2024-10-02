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
    <div className="text-black">
      <Card className="w-full shadow-lg hover:shadow-xl transition-shadow duration-300 mt-6">
        <CardHeader>
          <CardTitle className="text-2xl text-primary">Chat with AI Assistant</CardTitle>
          <CardDescription>Get deeper insights about your business</CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px] w-full pr-4 mb-4">
            {messages?.map((m: Message) => (
              <div key={m.id}>
                <strong>{m.role}:</strong> {m.content}
                {m.toolInvocations?.map((toolInvocation: ToolInvocation) => {
                  const toolCallId = toolInvocation.toolCallId;
                  const addResult = (result: string) =>
                    addToolResult({ toolCallId, result });

                  return 'result' in toolInvocation ? (
                    <div key={toolCallId}>
                      Tool call {`${toolInvocation.toolName}: `} {toolInvocation.result}
                    </div>
                  ) : (
                    <div key={toolCallId}>Calling {toolInvocation.toolName}...</div>
                  );
                })}
                <br />
              </div>
            ))}
          </ScrollArea>

          <form onSubmit={handleSubmit} className="flex mt-4">
            <Input
              type="text"
              placeholder="Ask about your business..."
              value={input}
              onChange={handleInputChange}
              className="flex-grow"
            />
            <Button type="submit" className="ml-2">
              Send
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
