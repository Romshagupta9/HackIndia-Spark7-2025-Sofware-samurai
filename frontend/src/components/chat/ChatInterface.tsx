
import { useState, useRef, useEffect } from "react";
import { Send, Mic, MicOff, AlertCircle, User, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: number;
}

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      text: "Hello! I'm Saarthi, your AI career assistant. How can I help you today? You can ask me about resume optimization, interview preparation, job search strategies, or any other career-related questions.",
      sender: "bot",
      timestamp: Date.now(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Automatically scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (inputValue.trim() === "") return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsProcessing(true);

    // Simulate AI response delay
    setTimeout(() => {
      generateResponse(userMessage.text);
    }, 1500);
  };

  const generateResponse = async (userInput: string) => {
    try {
      const response = await fetch("http://localhost:5000/api/chatbot/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userInput }),
      });
  
      const data = await response.json();
  
      const aiMessage: Message = {
        id: Date.now().toString(),
        text: data.reply || "Sorry, I couldn't understand that. Try again.",
        sender: "bot",
        timestamp: Date.now(),
      };
  
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error generating Gemini response:", error);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          text: "Something went wrong while contacting Gemini. Please try again later.",
          sender: "bot",
          timestamp: Date.now(),
        },
      ]);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleToggleVoice = () => {
    if (!isListening) {
      // Check if browser supports speech recognition
      if (!("webkitSpeechRecognition" in window) && !("SpeechRecognition" in window)) {
        toast({
          title: "Voice Input Not Supported",
          description: "Your browser doesn't support voice recognition. Try using Chrome or Edge.",
          variant: "destructive",
        });
        return;
      }

      setIsListening(true);
      // In a real app, we would initialize speech recognition here
      toast({
        title: "Voice Input Activated",
        description: "Speak now... (Voice functionality is simulated in this demo)",
      });

      // Simulate voice recognition after 3 seconds
      setTimeout(() => {
        setInputValue("How can I improve my resume for tech jobs?");
        setIsListening(false);
      }, 3000);
    } else {
      // Stop voice recognition
      setIsListening(false);
      toast({
        title: "Voice Input Stopped",
      });
    }
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="h-[600px] flex flex-col bg-white dark:bg-gray-900 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800 shadow-sm">
      {/* Chat header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-blue-purple-gradient flex items-center justify-center mr-3">
            <span className="text-white font-bold text-sm">S</span>
          </div>
          <div>
            <h3 className="font-semibold">Saarthi AI Assistant</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Online • Powered by GPT-3.5 Turbo
            </p>
          </div>
        </div>
      </div>

      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender === "bot" ? "justify-start" : "justify-end"
            }`}
          >
            <div
              className={`max-w-[80%] rounded-2xl p-4 ${
                message.sender === "bot"
                  ? "bg-gray-100 dark:bg-gray-800 rounded-tl-none"
                  : "bg-blue-purple-gradient text-white rounded-br-none"
              }`}
            >
              <div className="flex items-center mb-1">
                {message.sender === "bot" ? (
                  <span className="text-xs font-medium">Saarthi AI</span>
                ) : (
                  <span className="text-xs font-medium">You</span>
                )}
                <span className="text-xs ml-2 opacity-70">
                  {formatDate(message.timestamp)}
                </span>
              </div>
              <p className="whitespace-pre-line">{message.text}</p>
            </div>
          </div>
        ))}
        {isProcessing && (
          <div className="flex justify-start">
            <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl rounded-tl-none p-4 max-w-[80%]">
              <div className="flex items-center space-x-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span className="text-sm">Saarthi is thinking...</span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-800">
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={handleToggleVoice}
            className={isListening ? "bg-red-100 text-red-600 dark:bg-red-900/50 dark:text-red-400" : ""}
          >
            {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
          </Button>
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={isListening ? "Listening..." : "Type a message..."}
            className="flex-1"
            onKeyPress={(e) => {
              if (e.key === "Enter") handleSendMessage();
            }}
            disabled={isListening}
          />
          <Button onClick={handleSendMessage} disabled={inputValue.trim() === "" || isProcessing}>
            <Send className="h-5 w-5" />
          </Button>
        </div>

        {/* Suggestion chips */}
        <div className="mt-3 flex flex-wrap gap-2">
          <button
            onClick={() => setInputValue("How can I improve my resume?")}
            className="text-xs bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full px-3 py-1.5 transition-colors"
          >
            How can I improve my resume?
          </button>
          <button
            onClick={() => setInputValue("Interview tips for software engineer roles")}
            className="text-xs bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full px-3 py-1.5 transition-colors"
          >
            Interview tips for software engineers
          </button>
          <button
            onClick={() => setInputValue("In-demand skills for 2025")}
            className="text-xs bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full px-3 py-1.5 transition-colors"
          >
            In-demand skills for 2025
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
