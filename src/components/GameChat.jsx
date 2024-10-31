import React, { useState, useRef, useEffect } from 'react';

const GameChat = () => {
  const [messages, setMessages] = useState([
    { type: 'join', text: 'PlayerOne joined.', timestamp: Date.now() },
    { type: 'system', text: 'You have $500 cash.', timestamp: Date.now() },
    { type: 'announcement', text: 'Server will restart in 2min!', timestamp: Date.now() }
  ]);
  const [input, setInput] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedSuggestion, setSelectedSuggestion] = useState(0);
  const chatBoxRef = useRef(null);
  const inputRef = useRef(null);

  const commands = [
    { command: '/join', description: 'Join message for player', example: '/join <player>' },
    { command: '/money', description: 'Show money status', example: '/money <amount>' },
    { command: '/cash', description: 'Alternative for money command', example: '/cash <amount>' },
    { command: '/announce', description: 'Make an announcement', example: '/announce <message>' },
    { command: '/ann', description: 'Short for announce', example: '/ann <message>' },
    { command: '/system', description: 'System message', example: '/system <message>' },
    { command: '/sys', description: 'Short for system', example: '/sys <message>' },
    { command: '/help', description: 'Show all commands', example: '/help' }
  ];
  
  const messageColors = {
    join: 'text-green-400',
    system: 'text-purple-400',
    announcement: 'text-red-500',
    command: 'text-gray-300',
    money: 'text-green-500',
    error: 'text-red-400',
    help: 'text-blue-400',
    default: 'text-white'
  };

  const commandPatterns = {
    join: /^\/join\s+/i,
    money: /^\/money\s+|^\/cash\s+/i,
    announcement: /^\/announce\s+|^\/ann\s+/i,
    system: /^\/system\s+|^\/sys\s+/i,
    help: /^\/help$/i
  };

  const parseCommand = (input) => {
    if (commandPatterns.help.test(input)) {
      return {
        type: 'help',
        text: commands.map(cmd => `${cmd.command} - ${cmd.description}`).join('\n')
      };
    }

    for (const [type, pattern] of Object.entries(commandPatterns)) {
      if (pattern.test(input)) {
        const text = input.replace(pattern, '');
        return { type, text };
      }
    }
    
    if (input.startsWith('/')) {
      return { type: 'error', text: 'Unknown command. Type /help for available commands.' };
    }
    
    return { type: 'default', text: input };
  };

  const getFilteredSuggestions = () => {
    if (!input.startsWith('/')) return [];
    return commands.filter(cmd => 
      cmd.command.toLowerCase().startsWith(input.toLowerCase()) ||
      cmd.description.toLowerCase().includes(input.toLowerCase().slice(1))
    );
  };

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    setShowSuggestions(input.startsWith('/'));
    setSelectedSuggestion(0);
  }, [input]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      const { type, text } = parseCommand(input.trim());
      
      let formattedText = text;
      switch (type) {
        case 'join':
          formattedText = `${text} joined.`;
          break;
        case 'money':
          formattedText = `You have $${text} in your account.`;
          break;
        case 'announcement':
          formattedText = `Announcement: ${text}`;
          break;
        case 'system':
          formattedText = `System: ${text}`;
          break;
        case 'help':
          formattedText = text;
          break;
      }

      const newMessage = {
        type,
        text: formattedText,
        timestamp: Date.now()
      };
      
      setMessages(prev => [...prev, newMessage]);
      setInput('');
      setShowSuggestions(false);
    }
  };

  const handleKeyDown = (e) => {
    const suggestions = getFilteredSuggestions();
    
    if (suggestions.length > 0) {
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedSuggestion(prev => 
          prev > 0 ? prev - 1 : suggestions.length - 1
        );
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedSuggestion(prev => 
          prev < suggestions.length - 1 ? prev + 1 : 0
        );
      } else if (e.key === 'Tab') {
        e.preventDefault();
        setInput(suggestions[selectedSuggestion].command + ' ');
      }
    }
  };

  return (
    <div className="fixed bottom-4 left-4 w-96">
      <div className="relative">
        {showSuggestions && getFilteredSuggestions().length > 0 && (
          <div className="absolute bottom-full mb-2 w-full bg-black bg-opacity-90 rounded border border-gray-700 max-h-48 overflow-y-auto" >
            {getFilteredSuggestions().map((suggestion, index) => (
              <div
                key={suggestion.command}
                className={`px-2 py-1 text-sm ${
                  index === selectedSuggestion ? 'bg-gray-700' : ''
                }`}
                onClick={() => {
                  setInput(suggestion.command + ' ');
                  inputRef.current?.focus();
                }}
              >
                <div className="text-blue-400">{suggestion.command}</div>
                <div className="text-gray-400 text-xs">{suggestion.example}</div>
              </div>
            ))}
          </div>
        )}

        <div className="rounded">
          <div 
            ref={chatBoxRef}
            className="h-52 overflow-y-auto scrollbar-hide p-2 space-y-1"
            style={{ scrollbarWidth: 'none' }}
          >
            {messages.map((msg, idx) => (
              <div 
                key={idx} 
                className={`${messageColors[msg.type] || messageColors.default} text-sm whitespace-pre-line`}
              >
                {msg.text}
              </div>
            ))}
          </div>
          
          <form onSubmit={handleSubmit} className="p-2">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full bg-black bg-opacity-50 text-white px-2 py-1 rounded border border-gray-700 focus:outline-none focus:border-gray-500"
              placeholder="Type a message or command..."
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default GameChat;