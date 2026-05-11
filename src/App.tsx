import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Target, 
  MessageSquare, 
  ShieldCheck, 
  Zap, 
  Users, 
  Settings, 
  Briefcase, 
  Database, 
  PieChart, 
  Cpu,
  ChevronRight,
  Info,
  Lightbulb,
  CheckCircle2,
  AlertTriangle,
  GraduationCap,
  Trophy,
  RefreshCcw,
  ArrowRight
} from 'lucide-react';

const App = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedDept, setSelectedDept] = useState('Nhân sự');
  const [quizState, setQuizState] = useState({
    started: false,
    currentQuestion: 0,
    score: 0,
    showResults: false,
    answers: []
  });

  // Dữ liệu câu hỏi trắc nghiệm - Mở rộng lên 10 câu
  const quizQuestions = [
    {
      question: "Sự khác biệt cốt lõi giữa 'Sự thuần thục AI' (Fluency) và 'Sự quen thuộc' (Familiarity) là gì?",
      options: [
        "Sự thuần thục là biết cách sử dụng nhiều công cụ AI khác nhau.",
        "Sự thuần thục là hiểu KHI NÀO và LÀM THẾ NÀO để sử dụng AI một cách có chiến lược và trách nhiệm.",
        "Sự quen thuộc là khả năng viết code cho các mô hình AI.",
        "Không có sự khác biệt đáng kể giữa hai khái niệm này."
      ],
      correct: 1,
      explanation: "Biết cách dùng AI là dễ, nhưng biết khi nào và dùng thế nào cho đúng mới là sự thuần thục."
    },
    {
      question: "Thành phần nào trong 4Ds tập trung vào việc quyết định phần nào của quy trình nên giao cho AI?",
      options: [
        "Description (Mô tả)",
        "Discernment (Sáng suốt)",
        "Delegation (Ủy thác)",
        "Diligence (Cần mẫn)"
      ],
      correct: 2,
      explanation: "Delegation là chiến lược quyết định 'Cái gì' cần giao cho AI dựa trên đòn bẩy thay vì chỉ là tự động hóa."
    },
    {
      question: "Kỹ thuật 'Chain-of-Thought' (Chuỗi suy nghĩ) giúp ích gì cho mô hình AI?",
      options: [
        "Làm cho phản hồi ngắn gọn hơn.",
        "Yêu cầu AI suy nghĩ từng bước, cải thiện độ chính xác cho các tác vụ lý luận phức tạp.",
        "Xác định vai trò của AI là một chuyên gia.",
        "Tự động gửi email cho người dùng."
      ],
      correct: 1,
      explanation: "Yêu cầu AI 'Think step-by-step' giúp cải thiện đáng kể kết quả phân tích và lý luận."
    },
    {
      question: "Trong chiến lược 3As, khi AI đưa ra đề xuất và con người là bên duyệt cuối cùng, đó là chiến lược nào?",
      options: [
        "Automation (Tự động hóa)",
        "Assistance (Hỗ trợ)",
        "Augmentation (Tăng cường)",
        "AI Agent"
      ],
      correct: 1,
      explanation: "Assistance áp dụng cho các tác vụ có độ phức tạp trung bình, cần sự thẩm định của con người."
    },
    {
      question: "Nguyên tắc 'Non-negotiable' (Không thể thương lượng) trong quản trị AI là gì?",
      options: [
        "AI có thể chịu trách nhiệm cho các quyết định pháp lý.",
        "Mọi kết quả của AI đều hoàn toàn chính xác.",
        "Con người luôn phải chịu trách nhiệm và sở hữu các quyết định cuối cùng.",
        "AI không cần sự can thiệp của con người."
      ],
      correct: 2,
      explanation: "Bạn có thể ủy thác nhiệm vụ cho AI nhưng không bao giờ có thể ủy thác trách nhiệm giải trình."
    },
    {
      question: "Khía cạnh nào trong Description (3 Ps) định nghĩa vai trò cộng tác của AI (ví dụ: người phản biện, trợ lý tóm tắt)?",
      options: [
        "Product Description",
        "Process Description",
        "Performance Description",
        "Prompt Description"
      ],
      correct: 2,
      explanation: "Performance Description định nghĩa AI đóng vai trò gì trong sự cộng tác (Brainstorming partner, Concise analyst, v.v.)."
    },
    {
      question: "Tại sao năng lực Discernment (Sáng suốt) lại cực kỳ quan trọng khi làm việc với các mô hình ngôn ngữ lớn?",
      options: [
        "Vì AI thường phản hồi quá chậm.",
        "Vì mô hình AI được tối ưu hóa cho văn bản trôi chảy và tự tin, KHÔNG PHẢI độ chính xác.",
        "Vì AI không thể hiểu được tiếng Việt.",
        "Vì AI luôn yêu cầu dữ liệu đầu vào quá phức tạp."
      ],
      correct: 1,
      explanation: "AI có thể viết rất hay và tự tin nhưng nội dung có thể hoàn toàn sai lệch (ảo tưởng)."
    },
    {
      question: "Chiến lược Augmentation (Tăng cường) phù hợp nhất với loại tác vụ nào?",
      options: [
        "Gửi email nhắc lịch họp tự động.",
        "Soạn thảo một báo cáo ngắn từ dữ liệu có sẵn.",
        "Phân tích dữ liệu quy mô lớn vượt quá khả năng xử lý của con người để hỗ trợ quyết định chiến lược.",
        "Sắp xếp thư mục tài liệu cá nhân."
      ],
      correct: 2,
      explanation: "Augmentation mở rộng khả năng con người thông qua phân tích quy mô lớn và mô phỏng kịch bản phức tạp."
    },
    {
      question: "Trong Anatomy của một Prompt, 'Closing Cue' (Gợi ý kết thúc) có tác dụng gì?",
      options: [
        "Cung cấp thêm ví dụ cho AI.",
        "Đặt ra các ràng buộc về độ dài.",
        "Ra hiệu cho mô hình biết chính xác nơi câu trả lời của nó nên bắt đầu.",
        "Gán vai trò chuyên gia cho mô hình."
      ],
      correct: 2,
      explanation: "Một Closing Cue như 'Begin your analysis now:' giúp AI bắt đầu phản hồi đúng trọng tâm ngay lập tức."
    },
    {
      question: "Ba chiều của trách nhiệm trong Diligence (Cần mẫn) bao gồm những gì?",
      options: [
        "Tốc độ, Chi phí, Hiệu quả.",
        "Sáng tạo (Creation), Minh bạch (Transparency), Triển khai (Deployment).",
        "Lập trình, Kiểm thử, Vận hành.",
        "Nhập liệu, Phân tích, Xuất bản."
      ],
      correct: 1,
      explanation: "Diligence yêu cầu sự cẩn trọng từ khâu chọn công cụ, minh bạch về vai trò của AI đến khâu phê duyệt cuối cùng."
    }
  ];

  const departments = [
    { name: 'Nhân sự', icon: <Users className="w-4 h-4" /> },
    { name: 'Tài chính', icon: <PieChart className="w-4 h-4" /> },
    { name: 'Công nghệ', icon: <Cpu className="w-4 h-4" /> },
    { name: 'Marketing', icon: <Target className="w-4 h-4" /> },
    { name: 'QA', icon: <ShieldCheck className="w-4 h-4" /> },
    { name: 'Vận hành', icon: <Settings className="w-4 h-4" /> }
  ];

  const deptApplications = {
    'Nhân sự': [
      { task: "Tuyển dụng", auto: "Sàng lọc hồ sơ thô", assist: "Dự thảo JD & Câu hỏi phỏng vấn", aug: "Phân tích xu hướng nghỉ việc" },
      { task: "Đào tạo", auto: "Theo dõi hoàn thành khóa học", assist: "Gợi ý lộ trình cá nhân hóa", aug: "Dự báo khoảng cách kỹ năng 24 tháng" }
    ],
    'Tài chính': [
      { task: "Kế toán", auto: "Khớp hóa đơn tự động", assist: "Phân loại giao dịch bất thường", aug: "Stress-test kịch bản ngân sách" },
      { task: "Doanh thu", auto: "Ghi nhận doanh thu thuê bao", assist: "Soát xét hợp đồng phức tạp (IFRS 15)", aug: "Mô hình hóa độ nhạy chính sách giá" }
    ],
    'Công nghệ': [
      { task: "Phát triển", auto: "Định dạng code & Unit test stub", assist: "Gợi ý logic hàm & Sửa lỗi", aug: "Phân tích nợ kỹ thuật toàn codebase" },
      { task: "Hệ thống", auto: "Cấp quyền theo vai trò", assist: "Phân tích rủi ro thay đổi", aug: "Phát hiện tấn công hành vi tinh vi" }
    ],
    'Marketing': [
      { task: "Nội dung", auto: "Đăng bài đa kênh", assist: "Soạn thảo bản thô từ outline", aug: "Phân tích khoảng trống đối thủ" },
      { task: "Chiến dịch", auto: "Điều chỉnh giá thầu tự động", assist: "Đề xuất thông điệp A/B test", aug: "Mô hình lợi nhuận biên đa kênh" }
    ],
    'QA': [
      { task: "Tuân thủ", auto: "Theo dõi thời hạn chứng chỉ", assist: "Dự thảo báo cáo đánh giá lỗi", aug: "Bản đồ rủi ro đa khung quản lý" },
      { task: "CAPA", auto: "Điều phối quy trình NC", assist: "Kiểm tra tính hợp lệ của RCA", aug: "Phân tích nguyên nhân gốc rễ hệ thống" }
    ],
    'Vận hành': [
      { task: "Giao tiếp", auto: "Nhắc lịch & Phản hồi tự động", assist: "Dự thảo email gửi đối tác", aug: "Phân tích điểm nghẽn cộng tác" },
      { task: "Báo cáo", auto: "Cập nhật Dashboard định kỳ", assist: "Dự thảo diễn giải biến động", aug: "Phân tích động lực hiệu suất đa chiều" }
    ]
  };

  const handleAnswer = (optionIdx) => {
    const isCorrect = optionIdx === quizQuestions[quizState.currentQuestion].correct;
    const newScore = isCorrect ? quizState.score + 1 : quizState.score;
    
    if (quizState.currentQuestion + 1 < quizQuestions.length) {
      setQuizState({
        ...quizState,
        currentQuestion: quizState.currentQuestion + 1,
        score: newScore,
        answers: [...quizState.answers, optionIdx]
      });
    } else {
      setQuizState({
        ...quizState,
        score: newScore,
        showResults: true,
        answers: [...quizState.answers, optionIdx]
      });
    }
  };

  const resetQuiz = () => {
    setQuizState({
      started: false,
      currentQuestion: 0,
      score: 0,
      showResults: false,
      answers: []
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-12">
      {/* Header Điều hướng */}
      <header className="bg-slate-900 text-white shadow-xl p-4 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-white p-1 rounded-lg overflow-hidden h-12 w-auto flex items-center justify-center">
              <img 
                src={`${import.meta.env.BASE_URL}Bestarion_Logo_Bigsize.jpg`} 
                alt="Bestarion Logo" 
                className="h-full w-auto object-contain"
                onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
              />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">Thành thạo AI (AI Fluency)</h1>
              <p className="text-slate-400 text-[10px] font-medium uppercase tracking-widest">Học viện Đào tạo Chuyên sâu</p>
            </div>
          </div>
          <nav className="flex flex-wrap justify-center gap-1 bg-slate-800 p-1 rounded-xl">
            {[
              { id: 'overview', label: 'Tổng quan', icon: <BookOpen className="w-4 h-4" /> },
              { id: '4ds', label: 'Khung 4Ds', icon: <Settings className="w-4 h-4" /> },
              { id: '3as', label: 'Chiến lược 3As', icon: <Zap className="w-4 h-4" /> },
              { id: 'prompting', label: 'Prompting', icon: <MessageSquare className="w-4 h-4" /> },
              { id: 'test', label: 'Kiểm tra', icon: <GraduationCap className="w-4 h-4" /> }
            ].map((tab) => (
              <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all text-sm font-semibold ${activeTab === tab.id ? 'bg-orange-500 text-white shadow-lg' : 'text-slate-400 hover:text-white hover:bg-slate-700'}`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto mt-8 px-4">
        
        {/* TỔNG QUAN */}
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-in fade-in duration-500">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <section className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 overflow-hidden relative">
                  <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none">
                    <BookOpen className="w-48 h-48" />
                  </div>
                  <h2 className="text-3xl font-black text-slate-800 mb-6">Sự thuần thục {'>'} Sự quen thuộc</h2>
                  <p className="text-lg text-slate-600 leading-relaxed">
                    Sự thuần thục AI không phải là biết danh sách các công cụ. Đó là khả năng <span className="font-bold text-orange-500">tư duy chiến lược</span> để biết khi nào AI tạo ra giá trị mà không gây ra rủi ro pháp lý hay đạo đức.
                  </p>
                  <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { title: "Hiệu quả", desc: "Tăng tốc độ xử lý tác vụ cơ bản", icon: <Zap className="text-amber-500" /> },
                      { title: "Đạo đức", desc: "Chịu trách nhiệm cho mọi kết quả", icon: <ShieldCheck className="text-emerald-500" /> },
                      { title: "Sáng tạo", desc: "Dùng AI để mở rộng ý tưởng", icon: <Lightbulb className="text-blue-500" /> },
                      { title: "Phát triển", desc: "Xây dựng năng lực lâu dài", icon: <Target className="text-indigo-500" /> }
                    ].map((card, i) => (
                      <div key={i} className="flex gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                        <div className="mt-1">{card.icon}</div>
                        <div>
                          <h4 className="font-bold text-slate-800">{card.title}</h4>
                          <p className="text-xs text-slate-500">{card.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
              <div className="space-y-6">
                <div className="bg-slate-900 text-white rounded-3xl p-8 shadow-xl">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Info className="w-6 h-6 text-orange-500" /> Tầm nhìn 4Ds
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 bg-white/10 p-3 rounded-xl">
                      <div className="font-black text-2xl opacity-30 text-orange-400">01</div>
                      <p className="text-sm font-semibold">Giao việc đúng cách (Delegation)</p>
                    </div>
                    <div className="flex items-center gap-3 bg-white/10 p-3 rounded-xl">
                      <div className="font-black text-2xl opacity-30 text-orange-400">02</div>
                      <p className="text-sm font-semibold">Mô tả rõ ràng (Description)</p>
                    </div>
                    <div className="flex items-center gap-3 bg-white/10 p-3 rounded-xl">
                      <div className="font-black text-2xl opacity-30 text-orange-400">03</div>
                      <p className="text-sm font-semibold">Đánh giá sáng suốt (Discernment)</p>
                    </div>
                    <div className="flex items-center gap-3 bg-white/10 p-3 rounded-xl">
                      <div className="font-black text-2xl opacity-30 text-orange-400">04</div>
                      <p className="text-sm font-semibold">Trách nhiệm cần mẫn (Diligence)</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CHIỀU SÂU 4Ds */}
        {activeTab === '4ds' && (
          <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  id: 'delegation',
                  title: "Delegation (Ủy thác)",
                  role: "Chiến lược 'Cái gì'",
                  desc: "Xác định phần nào của quy trình nên giao cho AI. Trọng tâm là đòn bẩy (Leverage) thay vì thay thế.",
                  key: ["Nhận thức vấn đề", "Nhận thức nền tảng", "Phân chia nhiệm vụ"],
                  advice: "AI xử lý LƯỢNG (Dữ liệu, thô). Con người xử lý CHẤT (Chiến lược, quyết định).",
                  color: "bg-blue-600"
                },
                {
                  id: 'description',
                  title: "Description (Mô tả)",
                  role: "Kỹ năng 'Thế nào'",
                  desc: "Khả năng truyền đạt mục tiêu chính xác. Coi mỗi câu lệnh là một bản đặc tả yêu cầu sản phẩm.",
                  key: ["Mô tả Sản phẩm", "Mô tả Quy trình", "Mô tả Hiệu suất"],
                  advice: "Câu lệnh tốt = Ngữ cảnh + Ví dụ + Ràng buộc + Lý luận từng bước.",
                  color: "bg-purple-600"
                },
                {
                  id: 'discernment',
                  title: "Discernment (Sáng suốt)",
                  role: "Hệ thống 'Kiểm soát'",
                  desc: "AI tối ưu cho sự trôi chảy, không phải độ chính xác. Phải thẩm định kết quả trước khi dùng.",
                  key: ["Thẩm định Sản phẩm", "Thẩm định Quy trình", "Thẩm định Cộng tác"],
                  advice: "Luôn kiểm tra lỗi logic và sự ảo tưởng (hallucination) của mô hình.",
                  color: "bg-amber-600"
                },
                {
                  id: 'diligence',
                  title: "Diligence (Cần mẫn)",
                  role: "Ô 'Trách nhiệm'",
                  desc: "Đạo đức và trách nhiệm giải trình. Con người sở hữu kết quả cuối cùng dù AI có tham gia.",
                  key: ["Sáng tạo có trách nhiệm", "Minh bạch hóa", "Triển khai an toàn"],
                  advice: "Đừng bao giờ nói 'Do AI làm nên sai'. Bạn là người ký duyệt.",
                  color: "bg-emerald-600"
                }
              ].map((d) => (
                <div key={d.id} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-200 flex flex-col">
                  <div className={`${d.color} p-6 text-white`}>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-2xl font-black">{d.title}</h3>
                        <p className="text-white/70 text-sm font-bold uppercase tracking-wider">{d.role}</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-8 flex-grow space-y-6">
                    <p className="text-slate-600 font-medium leading-relaxed">{d.desc}</p>
                    <div className="space-y-3">
                      <p className="text-xs font-black text-slate-400 uppercase tracking-widest">3 Thành phần then chốt</p>
                      <div className="flex flex-wrap gap-2">
                        {d.key.map(k => (
                          <span key={k} className="bg-slate-100 text-slate-700 text-xs px-3 py-1.5 rounded-full font-bold border border-slate-200">
                            {k}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-2xl border-l-4 border-slate-300">
                      <p className="text-xs text-slate-500 font-bold mb-1 uppercase tracking-tighter">Lời khuyên chuyên gia</p>
                      <p className="text-slate-800 text-sm font-semibold italic">"{d.advice}"</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CHIẾN LƯỢC 3As & ỨNG DỤNG */}
        {activeTab === '3as' && (
          <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
            {/* Phân tích 3As */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "Automation",
                  subtitle: "Tự động hóa",
                  desc: "Tác vụ lặp lại, dựa trên quy tắc, rủi ro thấp.",
                  role: "Con người: Giám sát ngoại lệ.",
                  style: "border-blue-200 bg-blue-50 text-blue-900"
                },
                {
                  title: "Assistance",
                  subtitle: "Hỗ trợ",
                  desc: "Tác vụ cần phán đoán, ngữ cảnh, độ phức tạp vừa.",
                  role: "Con người: Xem xét & Phê duyệt.",
                  style: "border-amber-200 bg-amber-50 text-amber-900"
                },
                {
                  title: "Augmentation",
                  subtitle: "Tăng cường",
                  desc: "Phân tích quy mô lớn, chiến lược, dự báo.",
                  role: "Con người: Diễn giải & Chỉ đạo.",
                  style: "border-emerald-200 bg-emerald-50 text-emerald-900"
                }
              ].map((a, i) => (
                <div key={i} className={`p-6 rounded-3xl border-2 ${a.style} shadow-sm`}>
                  <h3 className="text-2xl font-black mb-1">{a.title}</h3>
                  <p className="text-xs font-bold uppercase mb-4 opacity-70">{a.subtitle}</p>
                  <p className="text-sm font-medium mb-6 leading-relaxed">{a.desc}</p>
                  <div className="flex items-center gap-2 text-xs font-bold bg-white/40 p-2 rounded-xl">
                    <Users className="w-4 h-4" />
                    <span>{a.role}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Ma trận Phòng ban */}
            <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="bg-slate-900 p-6">
                <h3 className="text-white font-bold flex items-center gap-3">
                  <Briefcase className="w-6 h-6 text-orange-500" /> Ma trận Phân bổ AI theo Phòng ban
                </h3>
              </div>
              <div className="flex overflow-x-auto bg-slate-50 p-2 gap-2 border-b border-slate-200 no-scrollbar">
                {departments.map(dept => (
                  <button
                    key={dept.name}
                    onClick={() => setSelectedDept(dept.name)}
                    className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${selectedDept === dept.name ? 'bg-orange-500 text-white shadow-md scale-105' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'}`}
                  >
                    {dept.icon}
                    {dept.name}
                  </button>
                ))}
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50/50 text-slate-400 text-[10px] uppercase tracking-[0.2em] font-black">
                      <th className="p-6 border-b border-slate-200">Giai đoạn/Tác vụ</th>
                      <th className="p-6 border-b border-slate-200 text-blue-600">Automation</th>
                      <th className="p-6 border-b border-slate-200 text-amber-600">Assistance</th>
                      <th className="p-6 border-b border-slate-200 text-emerald-600">Augmentation</th>
                    </tr>
                  </thead>
                  <tbody>
                    {deptApplications[selectedDept].map((row, i) => (
                      <tr key={i} className="group hover:bg-orange-50/10 transition-colors">
                        <td className="p-6 border-b border-slate-100 font-black text-slate-800">{row.task}</td>
                        <td className="p-6 border-b border-slate-100 text-sm font-medium text-slate-500 italic">{row.auto}</td>
                        <td className="p-6 border-b border-slate-100 text-sm font-medium text-slate-500 italic">{row.assist}</td>
                        <td className="p-6 border-b border-slate-100 text-sm font-medium text-slate-500 italic">{row.aug}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* PROMPTING */}
        {activeTab === 'prompting' && (
          <div className="space-y-8 animate-in fade-in duration-500">
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-orange-100 rounded-2xl">
                  <MessageSquare className="text-orange-600 w-8 h-8" />
                </div>
                <h2 className="text-3xl font-black text-slate-800">Giải phẫu Câu lệnh (Prompt Anatomy)</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { label: "Role (Vai trò)", icon: <Users className="w-4 h-4 text-blue-500" />, text: "Gán cho AI một chuyên môn cụ thể (ví dụ: 'Bạn là chuyên gia QA...')." },
                  { label: "Context (Ngữ cảnh)", icon: <Database className="w-4 h-4 text-purple-500" />, text: "Cung cấp nền tảng mà một chuyên gia cần có để thực hiện nhiệm vụ." },
                  { label: "Task (Nhiệm vụ)", icon: <Target className="w-4 h-4 text-amber-500" />, text: "Dùng các động từ mạnh: tóm tắt, phân tích, trích xuất, so sánh." },
                  { label: "Format (Định dạng)", icon: <PieChart className="w-4 h-4 text-emerald-500" />, text: "Cấu trúc đầu ra: JSON, Markdown, bảng, danh sách đánh số." },
                  { label: "Constraints (Ràng buộc)", icon: <ShieldCheck className="w-4 h-4 text-rose-500" />, text: "Điều gì AI KHÔNG nên làm hoặc giới hạn về độ dài, ngôn ngữ." },
                  { label: "Examples (Ví dụ)", icon: <Lightbulb className="w-4 h-4 text-indigo-500" />, text: "Cho AI thấy mẫu 'Tốt' trông như thế nào. Một ví dụ giá trị bằng 100 câu mô tả." }
                ].map((item, idx) => (
                  <div key={idx} className="p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:border-orange-200 transition-all">
                    <div className="flex items-center gap-2 mb-3">
                      {item.icon}
                      <p className="text-sm font-black uppercase text-slate-800 tracking-wider">{item.label}</p>
                    </div>
                    <p className="text-sm text-slate-500 font-medium leading-relaxed">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-900 rounded-3xl p-10 text-white shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <Zap className="w-40 h-40 text-orange-400" />
              </div>
              <h3 className="text-2xl font-black mb-8 flex items-center gap-3 text-orange-400">
                <Lightbulb className="w-7 h-7" /> Các kỹ thuật thúc đẩy lý luận
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-bold text-white mb-2">Chain-of-Thought (CoT)</h4>
                    <p className="text-slate-400 text-sm leading-relaxed italic">
                      Yêu cầu AI 'Suy nghĩ từng bước' trước khi đưa ra kết quả cuối cùng. Thích hợp cho toán học, logic và lập kế hoạch.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white mb-2">Negative Prompting</h4>
                    <p className="text-slate-400 text-sm leading-relaxed italic">
                      Nêu rõ những gì KHÔNG được làm (ví dụ: 'Không bao gồm lời giải thích', 'Không sử dụng biệt ngữ').
                    </p>
                  </div>
                </div>
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-bold text-white mb-2">Decomposition</h4>
                    <p className="text-slate-400 text-sm leading-relaxed italic">
                      Chia một tác vụ lớn thành nhiều tiểu tác vụ trong cùng một prompt hoặc chuỗi hội thoại.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white mb-2">Persona + Audience</h4>
                    <p className="text-slate-400 text-sm leading-relaxed italic">
                      Quy định AI là ai VÀ đang viết cho ai (ví dụ: 'Kiến trúc sư viết cho giám đốc phi kỹ thuật').
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* KIỂM TRA (QUIZ) */}
        {activeTab === 'test' && (
          <div className="max-w-2xl mx-auto animate-in zoom-in-95 duration-300">
            {!quizState.started && !quizState.showResults && (
              <div className="bg-white rounded-3xl p-10 text-center shadow-sm border border-slate-200">
                <div className="bg-orange-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <GraduationCap className="text-orange-500 w-10 h-10" />
                </div>
                <h2 className="text-2xl font-black text-slate-800 mb-4">Sẵn sàng kiểm tra năng lực?</h2>
                <p className="text-slate-500 mb-8 font-medium">
                  Bài trắc nghiệm 10 câu hỏi này sẽ giúp bạn đánh giá mức độ hiểu về khung năng lực AI Fluency theo giáo trình Atagrow.
                </p>
                <button 
                  onClick={() => setQuizState({...quizState, started: true})}
                  className="bg-orange-500 text-white px-8 py-3 rounded-xl font-bold hover:bg-orange-600 transition-all shadow-lg hover:shadow-orange-200 flex items-center gap-2 mx-auto"
                >
                  Bắt đầu ngay <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {quizState.started && !quizState.showResults && (
              <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="bg-slate-100 h-2 w-full">
                  <div 
                    className="bg-orange-500 h-full transition-all duration-300" 
                    style={{ width: `${((quizState.currentQuestion + 1) / quizQuestions.length) * 100}%` }}
                  />
                </div>
                <div className="p-8">
                  <span className="text-[10px] font-black uppercase text-slate-400 tracking-[0.3em]">
                    Câu hỏi {quizState.currentQuestion + 1} / {quizQuestions.length}
                  </span>
                  <h3 className="text-xl font-bold text-slate-800 mt-4 mb-8 leading-tight">
                    {quizQuestions[quizState.currentQuestion].question}
                  </h3>
                  <div className="space-y-3">
                    {quizQuestions[quizState.currentQuestion].options.map((option, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleAnswer(idx)}
                        className="w-full text-left p-5 rounded-2xl border-2 border-slate-100 hover:border-orange-500 hover:bg-orange-50 transition-all font-semibold text-slate-700 flex justify-between items-center group"
                      >
                        <span className="pr-4">{option}</span>
                        <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-orange-500 flex-shrink-0" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {quizState.showResults && (
              <div className="bg-white rounded-3xl p-10 text-center shadow-xl border border-slate-200">
                <div className="mb-8">
                  {quizState.score >= 8 ? (
                    <div className="bg-emerald-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Trophy className="text-emerald-600 w-12 h-12" />
                    </div>
                  ) : (
                    <div className="bg-orange-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                      <GraduationCap className="text-orange-500 w-12 h-12" />
                    </div>
                  )}
                  <h2 className="text-3xl font-black text-slate-800 mb-2">Kết quả: {quizState.score}/{quizQuestions.length}</h2>
                  <p className="text-slate-500 font-bold">
                    {quizState.score === 10 ? "Tuyệt vời! Bạn là một Chuyên gia AI Fluency thực thụ." : 
                     quizState.score >= 7 ? "Tốt! Bạn có nền tảng vững chắc, hãy xem lại các điểm còn thiếu." : 
                     "Bạn nên đọc kỹ lại tài liệu để nắm vững các chiến lược ủy thác và thẩm định."}
                  </p>
                </div>
                
                <div className="text-left space-y-4 mb-8 max-h-96 overflow-y-auto pr-2 no-scrollbar">
                  <p className="text-xs font-black text-slate-400 uppercase tracking-widest border-b pb-2 sticky top-0 bg-white z-10">Xem lại đáp án</p>
                  {quizQuestions.map((q, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-sm">
                      <p className="font-bold text-slate-800 mb-2">{idx + 1}. {q.question}</p>
                      <div className="flex gap-2 items-start text-xs font-medium">
                        {quizState.answers[idx] === q.correct ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                        ) : (
                          <AlertTriangle className="w-4 h-4 text-rose-500 mt-0.5 flex-shrink-0" />
                        )}
                        <p className={quizState.answers[idx] === q.correct ? "text-emerald-700" : "text-rose-700"}>
                          {quizQuestions[idx].options[q.correct]}
                        </p>
                      </div>
                      <p className="text-[10px] text-slate-400 mt-2 pl-6">Lý do: {q.explanation}</p>
                    </div>
                  ))}
                </div>

                <button 
                  onClick={resetQuiz}
                  className="bg-slate-800 text-white px-8 py-3 rounded-xl font-bold hover:bg-slate-900 transition-all flex items-center gap-2 mx-auto shadow-lg"
                >
                  <RefreshCcw className="w-4 h-4" /> Thử lại
                </button>
              </div>
            )}
          </div>
        )}

      </main>

      <footer className="max-w-6xl mx-auto mt-12 px-4 pt-10 border-t border-slate-200">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="h-6 w-auto overflow-hidden">
                <img 
                  src={`${import.meta.env.BASE_URL}Bestarion_Logo_Bigsize.jpg`} 
                  alt="Bestarion Logo" 
                  className="h-full w-auto object-contain brightness-0 opacity-50"
                  onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                />
              </div>
              <span className="font-black text-slate-400 tracking-tighter text-sm uppercase">AI FLUENCY MASTERY</span>
            </div>
            <p className="text-slate-400 text-[10px] uppercase font-bold tracking-widest italic">
              Kiến tạo tương lai cộng tác người-máy chuyên nghiệp
            </p>
          </div>
          <div className="flex gap-4">
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-100">
              <ShieldCheck className="text-emerald-500 w-4 h-4" />
              <span className="text-[10px] font-black text-slate-600 uppercase">An toàn & Đạo đức</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-100">
              <CheckCircle2 className="text-orange-500 w-4 h-4" />
              <span className="text-[10px] font-black text-slate-600 uppercase">Trách nhiệm con người</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
