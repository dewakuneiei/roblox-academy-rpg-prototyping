import React, { useState, useEffect } from 'react';
import { Play, RotateCcw, CheckCircle, XCircle, Info, Sword } from 'lucide-react';

interface CodeArenaProps {
  onSuccess: () => void;
}

export const CodeArena: React.FC<CodeArenaProps> = ({ onSuccess }) => {
  const [code, setCode] = useState('func _ready():\n  ');
  const [output, setOutput] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);

  const goal = {
    title: "ประกาศชื่อผู้กล้า",
    description: "สร้างตัวแปรชื่อ 'heroName' และกำหนดค่าเป็นชื่อของคุณ (String) จากนั้นให้ print ออกมา",
    hint: 'ใช้คำสั่ง: local heroName = "YourName"\nprint(heroName)',
  };

  const handleRun = () => {
    setIsRunning(true);
    setOutput([]);
    setIsSuccess(null);

    // Simulate processing time
    setTimeout(() => {
      const logs: string[] = [];
      let success = false;

      // Simple mock parser logic
      if (code.includes('local heroName') || code.includes('var heroName')) {
        if (code.includes('"')) {
            // Extract name simply for demo
            const match = code.match(/"([^"]+)"/);
            const name = match ? match[1] : "Unknown";
            
            if (code.includes('print(')) {
                logs.push(`> System: Compiling Lua Script...`);
                logs.push(`> Output: ${name}`);
                logs.push(`> System: Character Created Successfully!`);
                success = true;
            } else {
                logs.push(`> Error: คุณลืมสั่ง print(heroName)`);
            }
        } else {
            logs.push(`> Error: ข้อมูล String ต้องอยู่ในเครื่องหมาย " "`);
        }
      } else {
        logs.push(`> Error: ไม่พบตัวแปร heroName`);
      }

      setOutput(logs);
      setIsSuccess(success);
      setIsRunning(false);
    }, 1000);
  };

  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-80px)] overflow-hidden">
      {/* Top Bar for Challenge */}
      <div className="h-14 bg-roblox-panel border-b border-gray-700 flex items-center justify-between px-6 shrink-0">
        <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-red-500/20 rounded-lg flex items-center justify-center">
                <Sword size={18} className="text-red-500" />
            </div>
            <span className="font-bold text-white">ภารกิจ: {goal.title}</span>
        </div>
        <button className="text-gray-400 hover:text-white flex items-center gap-2 text-sm">
            <Info size={16} />
            ดูคำใบ้ (Hint)
        </button>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Left: Goals & Instructions */}
        <div className="w-1/4 bg-roblox-dark border-r border-gray-700 p-6 overflow-y-auto hidden lg:block">
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 mb-6">
                <h3 className="text-blue-400 font-bold mb-2 text-sm uppercase">เป้าหมาย</h3>
                <p className="text-gray-300 text-sm leading-relaxed">{goal.description}</p>
            </div>
            
            <div className="space-y-4">
                 <h3 className="text-gray-500 font-bold text-xs uppercase tracking-wider">Requirements</h3>
                 <div className="flex items-start gap-3">
                    <div className={`mt-1 w-4 h-4 rounded border flex items-center justify-center shrink-0 ${isSuccess ? 'bg-green-500 border-green-500' : 'border-gray-600'}`}>
                        {isSuccess && <CheckCircle size={12} className="text-white" />}
                    </div>
                    <p className="text-sm text-gray-400">สร้างตัวแปร <code className="bg-gray-800 px-1 rounded text-red-300">heroName</code></p>
                 </div>
                 <div className="flex items-start gap-3">
                    <div className={`mt-1 w-4 h-4 rounded border flex items-center justify-center shrink-0 ${isSuccess ? 'bg-green-500 border-green-500' : 'border-gray-600'}`}>
                         {isSuccess && <CheckCircle size={12} className="text-white" />}
                    </div>
                    <p className="text-sm text-gray-400">กำหนดค่าเป็นชื่อของคุณ</p>
                 </div>
            </div>
        </div>

        {/* Center: Code Editor */}
        <div className="flex-1 flex flex-col bg-[#0d1117] relative">
            <div className="flex-1 p-4 overflow-auto">
                 <div className="relative font-mono text-lg leading-relaxed">
                    <textarea 
                        spellCheck="false"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        className="w-full h-full bg-transparent text-gray-300 resize-none outline-none pl-12 pt-2"
                        style={{ minHeight: '400px' }}
                    />
                    {/* Line Numbers Fake */}
                    <div className="absolute top-0 left-0 pt-2 w-10 text-right text-gray-600 select-none pointer-events-none font-mono text-lg leading-relaxed">
                         {code.split('\n').map((_, i) => (
                             <div key={i}>{i + 1}</div>
                         ))}
                    </div>
                 </div>
            </div>

            {/* Action Bar */}
            <div className="h-16 bg-gray-900 border-t border-gray-800 flex items-center justify-end px-6 gap-3">
                 <button 
                    onClick={() => setCode('func _ready():\n  ')}
                    className="px-4 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors flex items-center gap-2 font-medium"
                 >
                    <RotateCcw size={18} />
                    Reset
                 </button>
                 <button 
                    onClick={handleRun}
                    disabled={isRunning}
                    className={`px-6 py-2 rounded-lg text-white font-bold flex items-center gap-2 shadow-lg transition-all ${
                        isRunning ? 'bg-gray-600 cursor-wait' : 'bg-green-600 hover:bg-green-500 active:translate-y-0.5 shadow-green-900/20'
                    }`}
                 >
                    {isRunning ? 'Running...' : 'Run Code'}
                    {!isRunning && <Play size={18} fill="currentColor" />}
                 </button>
            </div>
        </div>

        {/* Right: Output / Game Preview */}
        <div className="w-1/3 bg-gray-900 border-l border-gray-700 flex flex-col">
            <div className="bg-black flex-1 m-4 rounded-xl border-4 border-gray-800 relative overflow-hidden flex items-center justify-center">
                 {/* This represents the Game View */}
                 {isSuccess ? (
                     <div className="text-center animate-bounce">
                         <div className="w-24 h-24 bg-white rounded-full mx-auto mb-4 overflow-hidden border-4 border-roblox-accent shadow-xl shadow-roblox-accent/50">
                            <img src="https://picsum.photos/200" alt="Avatar" />
                         </div>
                         <h3 className="text-2xl font-bold text-white shadow-black drop-shadow-md">
                            {code.match(/"([^"]+)"/)?.[1] || "Hero"}
                         </h3>
                         <span className="text-roblox-success font-bold text-sm bg-black/50 px-3 py-1 rounded-full mt-2 inline-block">LVL 1 Novice</span>
                     </div>
                 ) : (
                     <div className="text-gray-600 text-center">
                         <div className="w-16 h-16 bg-gray-800 rounded-lg mx-auto mb-2 animate-pulse"></div>
                         <p>Waiting for code...</p>
                     </div>
                 )}
            </div>

            <div className="h-48 bg-roblox-panel border-t border-gray-700 p-4 overflow-y-auto font-mono text-sm">
                <div className="text-gray-500 mb-2 border-b border-gray-700 pb-1">Console Output</div>
                {output.length === 0 && <span className="text-gray-600 italic">No output yet.</span>}
                {output.map((line, idx) => (
                    <div key={idx} className={`${line.includes('Error') ? 'text-red-400' : 'text-green-400'} mb-1`}>
                        {line}
                    </div>
                ))}
            </div>
            
            {isSuccess && (
                <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-50 animate-in fade-in duration-300">
                    <div className="bg-roblox-panel p-8 rounded-2xl border border-roblox-success text-center max-w-sm w-full shadow-2xl shadow-green-500/20 transform scale-100">
                        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                            <CheckCircle size={32} className="text-white" />
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-2">ภารกิจสำเร็จ!</h2>
                        <p className="text-gray-400 mb-6">+100 XP | +20 Gems</p>
                        <button 
                            onClick={onSuccess}
                            className="w-full py-3 bg-roblox-success hover:bg-green-400 text-white font-bold rounded-xl transition-colors"
                        >
                            ไปด่านถัดไป
                        </button>
                    </div>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};