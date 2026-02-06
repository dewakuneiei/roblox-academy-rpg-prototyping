import React, { useState } from 'react';
import { HelpCircle, AlertCircle, Check } from 'lucide-react';
import { QuizQuestion } from '../types';

interface QuizProps {
    onFinish: () => void;
}

export const Quiz: React.FC<QuizProps> = ({ onFinish }) => {
    const questions: QuizQuestion[] = [
        {
            id: 1,
            question: "คำสั่งใดใช้ประกาศตัวแปรใน Lua?",
            options: ["var x = 10", "local x = 10", "int x = 10", "dim x = 10"],
            correctIndex: 1
        },
        {
            id: 2,
            question: "หากต้องการเก็บข้อความ 'Hello' ต้องใช้ตัวแปรประเภทใด?",
            options: ["Number", "Boolean", "String", "Table"],
            correctIndex: 2
        },
        {
            id: 3,
            question: "ผลลัพธ์ของ print(10 + 5) คืออะไร?",
            options: ["105", "15", "Error", "10 + 5"],
            correctIndex: 1
        }
    ];

    const [currentQ, setCurrentQ] = useState(0);
    const [selected, setSelected] = useState<number | null>(null);
    const [isChecked, setIsChecked] = useState(false);
    const [score, setScore] = useState(0);

    const handleCheck = () => {
        if (selected === null) return;
        setIsChecked(true);
        if (selected === questions[currentQ].correctIndex) {
            setScore(score + 1);
        }
    };

    const handleNext = () => {
        if (currentQ < questions.length - 1) {
            setCurrentQ(currentQ + 1);
            setSelected(null);
            setIsChecked(false);
        } else {
            onFinish();
        }
    };

    const q = questions[currentQ];

    return (
        <div className="flex-1 flex flex-col items-center justify-center bg-roblox-dark p-6">
            <div className="w-full max-w-2xl">
                {/* Progress Bar */}
                <div className="w-full h-4 bg-gray-800 rounded-full mb-8 overflow-hidden">
                    <div 
                        className="h-full bg-roblox-gold transition-all duration-300" 
                        style={{ width: `${((currentQ) / questions.length) * 100}%` }}
                    />
                </div>

                <div className="bg-roblox-panel border border-gray-700 rounded-2xl p-8 shadow-2xl relative">
                    {/* Question Header */}
                    <div className="flex items-start gap-4 mb-8">
                        <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center shrink-0 shadow-lg shadow-blue-500/30">
                            <HelpCircle size={24} className="text-white" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-white mb-2">คำถามที่ {currentQ + 1}</h2>
                            <p className="text-gray-300 text-lg">{q.question}</p>
                        </div>
                    </div>

                    {/* Options */}
                    <div className="space-y-4">
                        {q.options.map((opt, idx) => {
                            let statusClass = "border-gray-600 bg-gray-800 hover:bg-gray-700"; // Default
                            if (isChecked) {
                                if (idx === q.correctIndex) statusClass = "border-green-500 bg-green-500/20 text-green-300";
                                else if (idx === selected) statusClass = "border-red-500 bg-red-500/20 text-red-300";
                                else statusClass = "border-gray-700 bg-gray-800 opacity-50";
                            } else if (selected === idx) {
                                statusClass = "border-blue-500 bg-blue-500/20 text-blue-300 ring-2 ring-blue-500/50";
                            }

                            return (
                                <button
                                    key={idx}
                                    disabled={isChecked}
                                    onClick={() => setSelected(idx)}
                                    className={`w-full p-4 rounded-xl border-2 text-left font-medium transition-all duration-200 flex items-center justify-between group ${statusClass}`}
                                >
                                    <span>{opt}</span>
                                    {isChecked && idx === q.correctIndex && <Check size={20} className="text-green-500" />}
                                    {isChecked && idx === selected && idx !== q.correctIndex && <AlertCircle size={20} className="text-red-500" />}
                                </button>
                            );
                        })}
                    </div>

                    {/* Footer Actions */}
                    <div className="mt-8 pt-6 border-t border-gray-700 flex justify-between items-center">
                        <div className="text-gray-400 font-mono text-sm">
                            Score: {score}/{questions.length}
                        </div>
                        {isChecked ? (
                            <button 
                                onClick={handleNext}
                                className="bg-white text-roblox-dark px-8 py-3 rounded-xl font-bold hover:scale-105 transition-transform"
                            >
                                {currentQ === questions.length - 1 ? "จบการทดสอบ" : "ข้อถัดไป"}
                            </button>
                        ) : (
                            <button 
                                onClick={handleCheck}
                                disabled={selected === null}
                                className="bg-roblox-accent text-white px-8 py-3 rounded-xl font-bold hover:bg-red-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                ตรวจคำตอบ
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};