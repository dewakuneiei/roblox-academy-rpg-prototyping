import React, { useState } from 'react';
import { ArrowRight, ArrowLeft, BookOpen, Volume2, X } from 'lucide-react';

interface LessonProps {
  onComplete: () => void;
  onExit: () => void;
}

export const Lesson: React.FC<LessonProps> = ({ onComplete, onExit }) => {
  const [step, setStep] = useState(0);

  const steps = [
    {
      title: "Introduction to Variables",
      subtitle: "การประกาศตัวแปร",
      content: `
        <h3 class="text-2xl font-bold text-white mb-6">What is a Variable?</h3>
        <p class="mb-6 text-lg text-gray-300">
            ในโลกของ Roblox ทุกสิ่งต้องมี <strong>"ชื่อ"</strong> เพื่อให้คอมพิวเตอร์รู้จักและจำได้ เราเรียกสิ่งนี้ว่า 
            <span class="text-roblox-accent font-bold">ตัวแปร (Variable)</span>
        </p>
        <div class="bg-gray-800/80 p-6 rounded-2xl border border-gray-700 my-8 shadow-inner">
            <h4 class="font-bold text-gray-400 mb-4 text-sm uppercase tracking-widest">SYNTAX EXAMPLE</h4>
            <div class="font-mono text-xl">
                <span class="text-purple-400">local</span> <span class="text-yellow-300">heroName</span> <span class="text-gray-400">=</span> <span class="text-green-300">"Knight"</span>
            </div>
        </div>
        <p class="mb-4 text-gray-300">
            คิดซะว่ามันคือ <strong>"กล่อง"</strong> ที่คุณแปะป้ายชื่อเอาไว้ เพื่อเก็บของสำคัญ
        </p>
      `,
      image: "https://picsum.photos/800/600"
    },
    {
      title: "Data Types",
      subtitle: "ประเภทของข้อมูล",
      content: `
        <h3 class="text-2xl font-bold text-white mb-6">Types of Variables</h3>
        <p class="mb-6 text-lg text-gray-300">กล่องตัวแปรเก็บของได้หลายแบบ ใน Lua มี 3 แบบหลักๆ:</p>
        
        <div class="space-y-4">
            <div class="bg-gray-800/50 p-4 rounded-xl flex items-center gap-4 border border-gray-700">
                <div class="w-12 h-12 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-xl">Aa</div>
                <div>
                    <span class="block font-bold text-white text-lg">String</span>
                    <span class="text-gray-400">ข้อความในเครื่องหมายคำพูด <code class="bg-gray-900 px-1 rounded text-green-300">"Hello"</code></span>
                </div>
            </div>
            <div class="bg-gray-800/50 p-4 rounded-xl flex items-center gap-4 border border-gray-700">
                <div class="w-12 h-12 rounded-lg bg-green-500/20 text-green-400 flex items-center justify-center font-bold text-xl">#</div>
                <div>
                    <span class="block font-bold text-white text-lg">Number</span>
                    <span class="text-gray-400">ตัวเลขทั่วไป เช่น <code class="bg-gray-900 px-1 rounded text-green-300">10, 50.5</code></span>
                </div>
            </div>
             <div class="bg-gray-800/50 p-4 rounded-xl flex items-center gap-4 border border-gray-700">
                <div class="w-12 h-12 rounded-lg bg-red-500/20 text-red-400 flex items-center justify-center font-bold text-xl">?</div>
                <div>
                    <span class="block font-bold text-white text-lg">Boolean</span>
                    <span class="text-gray-400">ค่าความจริง <code class="bg-gray-900 px-1 rounded text-purple-300">true</code> หรือ <code class="bg-gray-900 px-1 rounded text-purple-300">false</code></span>
                </div>
            </div>
        </div>
      `,
      image: "https://picsum.photos/801/600"
    }
  ];

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      onComplete();
    }
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  const currentContent = steps[step];

  return (
    <div className="fixed inset-0 z-50 bg-[#0B0E14] flex flex-col animate-in fade-in duration-300">
        {/* Lesson Header */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-gray-800 bg-[#0f1219]">
            <div className="flex items-center gap-4">
                <div className="bg-roblox-accent/20 p-2 rounded-lg">
                    <BookOpen size={20} className="text-roblox-accent" />
                </div>
                <div>
                    <h2 className="font-bold text-white text-sm uppercase tracking-wider opacity-70">Lesson 1</h2>
                    <p className="text-white font-bold leading-none">{currentContent.title}</p>
                </div>
            </div>
            <button 
                onClick={onExit}
                className="w-10 h-10 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition-colors text-white"
            >
                <X size={20} />
            </button>
        </div>

        {/* Main Content Split */}
        <div className="flex-1 flex overflow-hidden">
            {/* Left: Interactive Content / Text */}
            <div className="w-full lg:w-1/2 p-8 lg:p-12 overflow-y-auto flex flex-col">
                 <div className="max-w-xl mx-auto w-full flex-1 flex flex-col justify-center">
                    <div className="mb-6">
                        <span className="text-roblox-accent font-bold tracking-widest text-xs uppercase mb-2 block">Part {step + 1} of {steps.length}</span>
                        <h1 className="text-4xl font-bold text-white mb-2">{currentContent.subtitle}</h1>
                        <div className="h-1 w-20 bg-roblox-accent rounded-full"></div>
                    </div>

                    <div 
                        className="prose prose-invert max-w-none text-lg"
                        dangerouslySetInnerHTML={{ __html: currentContent.content }}
                    />
                 </div>
            </div>

            {/* Right: Visuals */}
            <div className="hidden lg:block w-1/2 bg-gray-900 relative">
                <img 
                    src={currentContent.image}
                    alt="Lesson Visual" 
                    className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-l from-[#0B0E14] to-transparent"></div>
            </div>
        </div>

        {/* Footer Navigation */}
        <div className="h-24 border-t border-gray-800 bg-[#0f1219] flex items-center justify-between px-8 lg:px-12">
            <div className="flex gap-2">
                 {steps.map((_, i) => (
                    <div key={i} className={`h-2 rounded-full transition-all duration-300 ${i === step ? 'w-12 bg-roblox-accent' : 'w-2 bg-gray-700'}`} />
                 ))}
            </div>

            <div className="flex items-center gap-4">
                 <button 
                    onClick={handleBack}
                    disabled={step === 0}
                    className={`px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all ${step === 0 ? 'text-gray-600 cursor-not-allowed' : 'text-gray-300 hover:text-white hover:bg-gray-800'}`}
                 >
                    <ArrowLeft size={20} />
                    Back
                 </button>
                 <button 
                    onClick={handleNext}
                    className="px-8 py-3 bg-roblox-accent hover:bg-red-500 text-white font-bold rounded-xl flex items-center gap-3 shadow-lg shadow-red-900/20 active:scale-95 transition-all"
                >
                    {step === steps.length - 1 ? 'Start Challenge' : 'Next'}
                    <ArrowRight size={20} />
                 </button>
            </div>
        </div>
    </div>
  );
};