import React, { useState, useEffect } from 'react';
import { Sparkles, Moon, Heart, Share2, RefreshCcw, ArrowRight, MessageCircle, Star } from 'lucide-react';


const MidnightPharmacy = () => {
  const [screen, setScreen] = useState('intro'); // intro, test, loading, result
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [animate, setAnimate] = useState(false);

  // 질문 리스트
  const questions = [
    {
      id: 1,
      text: "지금 시각은 새벽 2시, 당신이 깨어있는 이유는?",
      options: [
        { text: "내일 할 일이 걱정돼서 심장이 쿵쿵", type: "ANXIETY" },
        { text: "그냥 폰 보다가 시간 가는 줄 몰랐음", type: "LETHARGY" },
        { text: "과거의 이불킥 흑역사가 떠올라서", type: "REGRET" },
        { text: "외롭고 센치한 기분이 들어서", type: "LONELY" },
      ]
    },
    {
      id: 2,
      text: "약국 문을 열고 들어왔습니다. 어떤 향기가 나나요?",
      options: [
        { text: "포근한 라벤더와 따뜻한 우유 향", type: "LONELY" },
        { text: "상쾌한 민트와 차가운 새벽 공기 향", type: "ANXIETY" },
        { text: "달콤한 솜사탕과 오래된 책 냄새", type: "REGRET" },
        { text: "아무 냄새도 나지 않는 무향", type: "LETHARGY" },
      ]
    },
    {
      id: 3,
      text: "약사 선생님이 '가장 버리고 싶은 감정'을 묻네요.",
      options: [
        { text: "남들과 비교하게 되는 조급함", type: "ANXIETY" },
        { text: "아무것도 하기 싫은 무기력함", type: "LETHARGY" },
        { text: "텅 빈 것 같은 공허함", type: "LONELY" },
        { text: "자꾸만 되새김질하는 후회", type: "REGRET" },
      ]
    },
    {
      id: 4,
      text: "마지막으로, 지금 가장 먹고 싶은 것은?",
      options: [
        { text: "매운 떡볶이 (스트레스 타파)", type: "ANXIETY" },
        { text: "따뜻한 핫초코 (위로가 필요해)", type: "LONELY" },
        { text: "시원한 맥주 한 잔 (잊고 싶어)", type: "REGRET" },
        { text: "그냥 물 한 잔 (만사 귀찮음)", type: "LETHARGY" },
      ]
    }
  ];

  // 결과 데이터
  const results = {
    ANXIETY: {
      title: "동동 구르는 걱정 토끼",
      subtitle: "미래 걱정 증후군",
      desc: "너무 잘하고 싶은 마음이 당신을 괴롭히고 있군요. 완벽하지 않아도 괜찮아요.",
      prescription: "걱정은 내일의 나에게 토스하기",
      item: "따뜻한 수면양말",
      color: "from-purple-500 to-indigo-500",
      icon: "🐰",
      chem: "느긋한 나무늘보"
    },
    LETHARGY: {
      title: "침대와 한몸 된 나무늘보",
      subtitle: "만성 귀차니즘 & 번아웃",
      desc: "에너지가 방전되었어요. 억지로 무언가 하려 하지 말고 푹 쉬는 게 최고의 약입니다.",
      prescription: "죄책감 없이 하루종일 뒹굴거리기",
      item: "폭신한 바디필로우",
      color: "from-green-400 to-teal-500",
      icon: "🦥",
      chem: "동동 구르는 걱정 토끼"
    },
    LONELY: {
      title: "달을 보며 우는 외로운 늑대",
      subtitle: "새벽 감성 과다 증후군",
      desc: "사람의 온기가 그리운 밤이네요. 혼자만의 시간도 좋지만, 가끔은 먼저 연락해봐요.",
      prescription: "좋아하는 유튜버 영상 정주행하기",
      item: "은은한 무드등",
      color: "from-blue-400 to-cyan-500",
      icon: "🐺",
      chem: "추억 먹는 다람쥐"
    },
    REGRET: {
      title: "추억 먹는 다람쥐",
      subtitle: "이불킥 & 과거 회상 중독",
      desc: "지나간 일은 바꿀 수 없어요. 그땐 그게 최선이었을 거예요. 당신을 용서해주세요.",
      prescription: "흑역사를 유머로 승화시켜버리기",
      item: "기억 삭제 (맛) 젤리",
      color: "from-orange-400 to-pink-500",
      icon: "🐿️",
      chem: "달을 보며 우는 외로운 늑대"
    }
  };

  const handleAnswer = (type) => {
    setAnimate(true);
    setTimeout(() => {
      const newAnswers = [...answers, type];
      setAnswers(newAnswers);
      setAnimate(false);
      
      if (currentQ < questions.length - 1) {
        setCurrentQ(currentQ + 1);
      } else {
        setScreen('loading');
        setTimeout(() => {
          setScreen('result');
        }, 2500);
      }
    }, 300);
  };

  const calculateResult = () => {
    const counts = answers.reduce((acc, curr) => {
      acc[curr] = (acc[curr] || 0) + 1;
      return acc;
    }, {});
    
    // 가장 많이 선택된 유형 찾기 (동점일 경우 마지막 선택 우선)
    let maxType = answers[0];
    let maxCount = 0;
    
    Object.entries(counts).forEach(([type, count]) => {
      if (count >= maxCount) {
        maxCount = count;
        maxType = type;
      }
    });
    
    return results[maxType];
  };

  const resetTest = () => {
    setScreen('intro');
    setCurrentQ(0);
    setAnswers([]);
  };

  // ---------------------------
  //     공유 기능 모음
  // ---------------------------
  const handleShare = async () => {
  // 🔥 여기에서 직접 결과 계산하기
  const result = calculateResult();

  const shareData = {
    title: "🩺 Midnight Pharmacy – 내 마음 상태 진단",
    text: `방금 마음 테스트를 해봤어!\n결과: ${result.title}`,
    url: window.location.href,
  };

  try {
    if (navigator.share) {
      await navigator.share(shareData);
    } else {
      await navigator.clipboard.writeText(`${shareData.text}\n${shareData.url}`);
      alert("공유가 지원되지 않는 환경이라 링크가 복사되었습니다.");
    }
  } catch (err) {
    console.error("공유 오류:", err);
  }
  };


  const shareUrl = window.location.href;

  const shareToTwitter = (text) => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}`;
    window.open(url, "_blank");
  };

  const shareToKakao = (title) => {
    // 카카오 SDK 없이 링크 공유 (일반 웹 공유 방식)
    const url = `https://sharer.kakao.com/talk/friends/picker/link?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(title)}`;
    window.open(url, "_blank");
  };

  const shareToInstagram = () => {
    alert("인스타그램은 웹에서 직접 링크 공유가 불가능해요! 링크를 복사해 인스타 DM 또는 스토리에 붙여넣어주세요 😊");
    navigator.clipboard.writeText(shareUrl);
  };

  const shareToDiscord = () => {
    navigator.clipboard.writeText(shareUrl);
    window.open("https://discord.com/channels/@me", "_blank");
  };

  const copyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    alert("링크가 복사되었습니다!");
  };

  // --- 화면 컴포넌트들 ---

  const IntroScreen = () => (
    <div className="flex flex-col items-center justify-center h-full p-6 text-center space-y-8 animate-fade-in">
      <div className="relative">
        <div className="absolute inset-0 bg-purple-500 blur-3xl opacity-20 rounded-full"></div>
        <Moon className="w-20 h-20 text-yellow-200 animate-pulse relative z-10" />
      </div>
      <div>
        <h1 className="text-3xl font-bold text-white mb-2 tracking-tighter">한밤의 마음 약국</h1>
        <p className="text-purple-200">잠 못 드는 당신을 위한<br/>신비한 처방전</p>
      </div>
      <div className="bg-white/10 p-4 rounded-xl text-sm text-gray-300 backdrop-blur-sm max-w-xs border border-white/10">
        "어서 오세요.<br/>오늘 당신의 마음은 어디가 아픈가요?"
      </div>
      <button 
        onClick={() => setScreen('test')}
        className="w-full max-w-xs py-4 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl text-white font-bold shadow-lg shadow-purple-900/50 hover:scale-105 transition-transform flex items-center justify-center gap-2"
      >
        약국 문 열기 <Sparkles size={18} />
      </button>
      <div className="text-xs text-gray-500 mt-8">
        참여자 수: 1,203,442명
      </div>
    </div>
  );

  const TestScreen = () => (
    <div className="flex flex-col h-full p-6 max-w-md mx-auto">
      <div className="w-full bg-gray-800 h-2 rounded-full mb-8 overflow-hidden">
        <div 
          className="bg-purple-500 h-full transition-all duration-500 ease-out"
          style={{ width: `${((currentQ + 1) / questions.length) * 100}%` }}
        ></div>
      </div>

      <div className={`flex-1 flex flex-col justify-center transition-opacity duration-300 ${animate ? 'opacity-0' : 'opacity-100'}`}>
        <div className="mb-2 text-purple-400 font-bold text-sm tracking-widest">QUESTION {currentQ + 1}</div>
        <h2 className="text-2xl font-bold text-white mb-8 leading-snug">
          {questions[currentQ].text}
        </h2>

        <div className="space-y-3">
          {questions[currentQ].options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => handleAnswer(option.type)}
              className="w-full p-4 text-left bg-gray-800/50 hover:bg-purple-900/30 border border-gray-700 hover:border-purple-500 rounded-xl text-gray-200 transition-all active:scale-95 flex justify-between group"

            >
              <span>{option.text}</span>
              <ArrowRight className="opacity-0 group-hover:opacity-100 text-purple-400 transition-opacity" size={20}/>
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  const LoadingScreen = () => (
    <div className="flex flex-col items-center justify-center h-full text-center p-6 space-y-6">
      <div className="relative w-24 h-24">
        <div className="absolute inset-0 border-4 border-purple-900/50 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-t-purple-400 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center text-4xl animate-bounce">
          💊
        </div>
      </div>
      <div className="space-y-2">
        <h3 className="text-xl font-bold text-white">처방전 조제 중...</h3>
        <p className="text-gray-400 text-sm">당신의 마음 증상을 분석하고 있습니다.</p>
      </div>
      <div className="text-xs text-gray-600 mt-8">
        달빛 한 스푼 넣는 중...<br/>
        별가루 뿌리는 중...
      </div>
    </div>
  );

  const ResultScreen = () => {
    const result = calculateResult();

    return (
      <div className="flex flex-col h-full overflow-y-auto bg-slate-900 pb-8">
        <div className="p-6 flex flex-col items-center animate-slide-up">
          {/* Result Card */}
          <div className="w-full max-w-sm bg-white text-slate-900 rounded-2xl overflow-hidden shadow-2xl relative mb-6">
            {/* Ticket Header */}
            <div className={`h-32 bg-gradient-to-br ${result.color} p-6 flex flex-col items-center justify-center relative`}>
               <div className="absolute top-0 w-full h-full opacity-30 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
               <div className="text-6xl mb-2 drop-shadow-md">{result.icon}</div>
               <div className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-white text-xs font-bold tracking-wider">
                 PRESCRIPTION #2024
               </div>
            </div>
            
            {/* Ticket Body */}
            <div className="p-6 text-center">
              <h2 className="text-2xl font-bold mb-1 text-slate-800">{result.title}</h2>
              <p className="text-slate-500 text-sm mb-6 font-medium">{result.subtitle}</p>
              
              <div className="bg-slate-50 rounded-xl p-4 mb-6 text-sm text-slate-600 leading-relaxed border border-slate-100">
                "{result.desc}"
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 bg-indigo-50 p-3 rounded-lg border border-indigo-100">
                  <div className="bg-white p-2 rounded-full shadow-sm text-indigo-500">
                    <Heart size={18} fill="currentColor" />
                  </div>
                  <div className="text-left">
                    <div className="text-xs text-indigo-400 font-bold uppercase">Today's Mission</div>
                    <div className="text-indigo-900 font-bold text-sm">{result.prescription}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-yellow-50 p-3 rounded-lg border border-yellow-100">
                  <div className="bg-white p-2 rounded-full shadow-sm text-yellow-500">
                    <Star size={18} fill="currentColor" />
                  </div>
                  <div className="text-left">
                    <div className="text-xs text-yellow-400 font-bold uppercase">Lucky Item</div>
                    <div className="text-yellow-900 font-bold text-sm">{result.item}</div>
                  </div>
                </div>
              </div>

              {/* Dotted Line */}
              <div className="my-6 border-t-2 border-dashed border-slate-200 relative">
                <div className="absolute -left-8 -top-3 w-6 h-6 bg-slate-900 rounded-full"></div>
                <div className="absolute -right-8 -top-3 w-6 h-6 bg-slate-900 rounded-full"></div>
              </div>

              <div className="flex justify-between items-center text-xs text-slate-400 font-medium px-2">
                 <span>환상의 짝꿍: {result.chem}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 w-full max-w-sm mb-8">
            <button 
              onClick={handleShare}
              className="flex-1 bg-gray-800 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-gray-700 transition-colors"
            >
              <Share2 size={18} /> 공유하기
            </button>
            <button 
              onClick={resetTest}
              className="flex-1 bg-gray-800 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-gray-700 transition-colors"

            >
              <RefreshCcw size={18} /> 다시하기
            </button>
          </div>
          
           <div className="text-center text-gray-500 text-xs">
            © 2024 Midnight Pharmacy. All rights reserved.
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full min-h-screen bg-slate-900 flex items-center justify-center font-sans overflow-hidden relative">
        {/* Background Effects */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute top-10 left-10 w-2 bg-white rounded-full h-2 opacity-50 animate-pulse"></div>
            <div className="absolute bottom-20 right-20 w-1 bg-white rounded-full h-1 opacity-70 animate-ping"></div>
            <div className="absolute top-1/2 left-1/3 w-1 bg-white rounded-full h-1 opacity-30"></div>
        </div>

      <div className="w-full max-w-md h-[100dvh] bg-slate-900 relative shadow-2xl overflow-hidden sm:rounded-[2rem] sm:h-[90dvh] sm:border-4 sm:border-slate-800">
        {screen === 'intro' && <IntroScreen />}
        {screen === 'test' && <TestScreen />}
        {screen === 'loading' && <LoadingScreen />}
        {screen === 'result' && <ResultScreen />}
      </div>
    </div>
  );
};

export default MidnightPharmacy;