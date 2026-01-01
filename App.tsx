
import React, { useState, useRef, useEffect } from 'react';
import { 
  ChatBubbleLeftRightIcon, 
  MapPinIcon, 
  GlobeAltIcon, 
  PaperAirplaneIcon,
  RocketLaunchIcon,
  WrenchScrewdriverIcon,
  PhoneIcon,
  CheckCircleIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline';
import { Message, CampaignSource } from './types';
import { COMPANY_INFO } from './data/knowledgeBase';
import { sendMessageToGemini } from './services/geminiService';

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [campaign, setCampaign] = useState<CampaignSource>(CampaignSource.NONE);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const ref = params.get('ref');
    
    if (ref === 'fb_cnc') {
      simulateAdEntry(CampaignSource.FB_AD_CNC, "Assalam-o-Alaikum! CNC Router machine ki details chahiye.");
    } else if (ref === 'wa_ad') {
      simulateAdEntry(CampaignSource.WA_LASER, "Assalam-o-Alaikum! WhatsApp ad se aaya hoon, machinery prices batayen.");
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async (e?: React.FormEvent, overrideText?: string) => {
    if (e) e.preventDefault();
    const textToSend = overrideText || inputText;
    if (!textToSend.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: textToSend,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    if (!overrideText) setInputText('');
    setIsLoading(true);

    const response = await sendMessageToGemini([...messages, userMessage], campaign);

    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: response,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, botMessage]);
    setIsLoading(false);
  };

  const simulateAdEntry = (source: CampaignSource, initialQuery: string) => {
    setCampaign(source);
    setMessages([]);
    handleSend(undefined, initialQuery);
  };

  const forwardOrderToAllAdmins = (summary: string) => {
    const cleanSummary = summary.replace(/\*/g, '').replace(/ORDER_SUMMARY:/i, '').trim();
    const whatsappMessage = `*New Lead from Awami Bot*\n\n${cleanSummary}\n\n_Sent via Web Bot_`;
    
    // Iterate through all admins
    COMPANY_INFO.admins.forEach((adminPhone, index) => {
      const waUrl = `https://api.whatsapp.com/send?phone=${adminPhone}&text=${encodeURIComponent(whatsappMessage)}`;
      // Small delay between opening tabs to help bypass some popup blockers
      setTimeout(() => {
        window.open(waUrl, '_blank');
      }, index * 600);
    });
    
    const adminCount = COMPANY_INFO.admins.length;
    alert(adminCount > 1 
      ? "Tamam Admins ke liye WhatsApp tabs open kar di gayi hain. Agar open nahi hui to browser mein 'Popups Allow' kar den."
      : "Admin ke liye WhatsApp tab open kar di gayi hai. Agar open nahi hui to browser mein 'Popups Allow' kar den."
    );
  };

  const parseOrderSummary = (content: string) => {
    const regex = /ORDER_SUMMARY:([\s\S]*)/i;
    const match = content.match(regex);
    return match ? match[1].trim() : null;
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      {/* Sidebar */}
      <aside className="w-80 bg-[#0f172a] text-white flex-col hidden lg:flex border-r border-slate-800">
        <div className="p-8">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2.5 rounded-2xl shadow-lg shadow-blue-500/20">
              <RocketLaunchIcon className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-black tracking-tight uppercase leading-none">
                Awami <span className="text-blue-400 font-medium">Trader</span>
              </h1>
              <p className="text-[10px] text-slate-400 font-bold tracking-widest uppercase mt-1">Industrial Machinery</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          <div className="px-4 py-3 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Quick Links</div>
          <a href={COMPANY_INFO.website} target="_blank" className="flex items-center gap-3 p-3.5 rounded-xl hover:bg-slate-800 transition-all border border-transparent hover:border-slate-700">
            <GlobeAltIcon className="w-5 h-5 text-blue-400" />
            <span className="text-sm font-semibold">Our Website</span>
          </a>
          <a href={COMPANY_INFO.mapLink} target="_blank" className="flex items-center gap-3 p-3.5 rounded-xl hover:bg-slate-800 transition-all border border-transparent hover:border-slate-700">
            <MapPinIcon className="w-5 h-5 text-rose-500" />
            <span className="text-sm font-semibold">Location</span>
          </a>
        </nav>
      </aside>

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col relative bg-[#f8fafc]">
        <header className="h-20 border-b bg-white/95 backdrop-blur-md flex items-center justify-between px-6 z-10 sticky top-0 shadow-sm">
          <div className="flex items-center gap-4">
            <h2 className="font-black text-slate-900 text-lg uppercase tracking-tight">Awami Sales Assistant</h2>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 sm:p-8 space-y-6 bg-slate-50/50">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center max-w-xl mx-auto px-4">
              <div className="w-20 h-20 bg-blue-600 rounded-3xl shadow-xl flex items-center justify-center mb-6">
                <WrenchScrewdriverIcon className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-2 uppercase">Awami Trader AI</h3>
              <p className="text-slate-500 font-medium">CNC, Laser, Printers aur machinery ki maloomat ke liye poochen.</p>
            </div>
          ) : (
            messages.map((msg) => {
              const summary = parseOrderSummary(msg.content);
              const cleanContent = msg.content.split(/ORDER_SUMMARY:/i)[0].trim();

              return (
                <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2`}>
                  <div className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'} max-w-[90%] sm:max-w-[75%]`}>
                    <div className={`p-4 rounded-2xl shadow-sm ${
                      msg.role === 'user' 
                        ? 'bg-blue-600 text-white rounded-tr-none' 
                        : 'bg-white border border-slate-200 text-slate-800 rounded-tl-none'
                    }`}>
                      <div className="whitespace-pre-wrap text-sm leading-relaxed font-semibold">
                        {cleanContent}
                      </div>
                      
                      {summary && (
                        <div className="mt-4 p-5 bg-blue-50 border border-blue-200 rounded-2xl animate-in zoom-in-95 shadow-md">
                          <div className="flex items-center gap-2 mb-4">
                            <CheckCircleIcon className="w-5 h-5 text-green-600" />
                            <h4 className="text-[11px] font-black uppercase text-blue-700 tracking-widest">Order Summary Ready</h4>
                          </div>
                          <div className="space-y-2 text-xs font-bold text-slate-700 bg-white p-4 rounded-xl shadow-inner mb-5">
                            {summary.split('\n').map((line, i) => (
                              <div key={i} className="flex justify-between border-b border-slate-50 last:border-0 pb-1.5 pt-1.5">
                                <span className="opacity-50 text-[10px]">{line.split(':')[0]}</span>
                                <span className="text-blue-800 text-right">{line.split(':')[1]}</span>
                              </div>
                            ))}
                          </div>
                          
                          <button 
                            onClick={() => forwardOrderToAllAdmins(summary)}
                            className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 shadow-xl transition-all active:scale-[0.98] group"
                          >
                            <UserGroupIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                            {COMPANY_INFO.admins.length > 1 ? "Send to All Admins" : "Send to Admin"}
                          </button>
                          <p className="text-[9px] text-center mt-3 text-slate-400 font-bold uppercase tracking-tight">
                            {COMPANY_INFO.admins.length > 1 ? "Click once to notify all available admins" : "Click to notify the admin"}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm">
                <div className="flex gap-1.5">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-4 sm:p-6 bg-white border-t border-slate-100">
          <form onSubmit={handleSend} className="relative max-w-4xl mx-auto flex gap-2">
            <input 
              type="text" 
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Machine name, name aur phone likhen..."
              className="flex-1 p-4 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 outline-none font-bold text-slate-800 text-sm placeholder:text-slate-400"
            />
            <button 
              type="submit"
              disabled={isLoading || !inputText.trim()}
              className="bg-blue-600 text-white px-6 rounded-xl hover:bg-blue-700 disabled:opacity-50 transition-all flex items-center justify-center shadow-lg shadow-blue-500/20"
            >
              <PaperAirplaneIcon className="w-6 h-6" />
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default App;
