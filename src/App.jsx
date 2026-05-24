import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpDown,
  BarChart3,
  BookOpen,
  Bot,
  CalendarCheck,
  CheckCircle2,
  ChevronRight,
  ClipboardList,
  Clock3,
  Euro,
  Filter,
  Globe2,
  LayoutDashboard,
  ListChecks,
  Mail,
  Rocket,
  Search,
  ShieldCheck,
  Sparkles,
  Store,
  Target,
  TrendingUp,
  Users,
  Video,
} from "lucide-react";

function cx(...classes) {
  return classes.filter(Boolean).join(" ");
}

function normalizeSearchText(value) {
  return value
    .toLocaleLowerCase("tr-TR")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ı/g, "i");
}

function Card({ className = "", ...props }) {
  return <div className={cx("rounded-lg border border-slate-200 bg-white shadow-sm", className)} {...props} />;
}

function CardContent({ className = "", ...props }) {
  return <div className={className} {...props} />;
}

function Button({ className = "", variant = "default", size = "md", type = "button", ...props }) {
  const variants = {
    default: "bg-slate-950 text-white hover:bg-slate-800",
    outline: "border border-slate-300 bg-white text-slate-950 hover:bg-slate-50",
    subtle: "bg-slate-100 text-slate-800 hover:bg-slate-200",
    ghost: "text-slate-600 hover:bg-slate-100 hover:text-slate-950",
  };
  const sizes = {
    sm: "h-8 gap-2 px-3 text-xs",
    md: "h-10 gap-2 px-4 text-sm",
    lg: "h-11 gap-2 px-5 text-sm",
  };

  return (
    <button
      type={type}
      className={cx(
        "inline-flex shrink-0 items-center justify-center rounded-lg font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        variants[variant] || variants.default,
        sizes[size] || sizes.md,
        className
      )}
      {...props}
    />
  );
}

const navigation = [
  { id: "overview", label: "Genel Bakış", shortLabel: "Genel", icon: LayoutDashboard },
  { id: "validation", label: "Validasyon", shortLabel: "Validasyon", icon: BarChart3 },
  { id: "sprint", label: "Sprint Planı", shortLabel: "Sprint", icon: ListChecks },
];

const productTracks = [
  {
    key: "math",
    title: "Matematik + AI",
    shortTitle: "Matematik",
    icon: BookOpen,
    score: 95,
    mvpTime: "10 gün",
    target: "Öğrenci, veli, öğretmen",
    promise: "Hazır çalışma paketleri ve AI destekli kişiselleştirme.",
    market: "Yüksek talep",
    risk: "Orta rekabet",
    accent: "bg-cyan-50 text-cyan-700 ring-cyan-200",
    iconAccent: "bg-cyan-600 text-white",
    chart: "bg-cyan-500",
    formats: ["Workbook", "Worksheet", "PDF", "Prompt Pack"],
    nextMove: "5. sınıf için tek konuya odaklanan 25 sayfalık çalışma paketi üret.",
  },
  {
    key: "parents",
    title: "Ebeveyn + AI",
    shortTitle: "Ebeveyn",
    icon: Users,
    score: 84,
    mvpTime: "7 gün",
    target: "Yoğun aileler",
    promise: "Ev rutini, ekran süresi ve öğrenme aktiviteleri için pratik sistemler.",
    market: "Güçlü niş",
    risk: "Düşük teknik bariyer",
    accent: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    iconAccent: "bg-emerald-600 text-white",
    chart: "bg-emerald-500",
    formats: ["Printable", "Planner", "Routine Kit", "PDF"],
    nextMove: "7 günlük çocuk rutin planlayıcısı ve kısa ebeveyn rehberi hazırla.",
  },
  {
    key: "ai",
    title: "AI Verimlilik",
    shortTitle: "AI Sistem",
    icon: Bot,
    score: 88,
    mvpTime: "5 gün",
    target: "Freelancer, öğretmen, küçük işletme",
    promise: "Hazır prompt sistemleri ve tekrar kullanılabilir üretim şablonları.",
    market: "Hızlı test",
    risk: "Konumlandırma kritik",
    accent: "bg-violet-50 text-violet-700 ring-violet-200",
    iconAccent: "bg-violet-600 text-white",
    chart: "bg-violet-500",
    formats: ["Prompt Pack", "Template", "Mini E-kitap", "Agent"],
    nextMove: "Almanca küçük işletmeler için satış metni prompt paketini çıkar.",
  },
  {
    key: "cyber",
    title: "Cybersecurity Başlangıç",
    shortTitle: "Cyber",
    icon: ShieldCheck,
    score: 76,
    mvpTime: "14 gün",
    target: "IT kariyerine başlayanlar",
    promise: "SOC analyst yol haritası, checklist ve AI destekli çalışma planı.",
    market: "Uzun vadeli güven",
    risk: "İlk satış daha yavaş",
    accent: "bg-amber-50 text-amber-800 ring-amber-200",
    iconAccent: "bg-amber-500 text-white",
    chart: "bg-amber-500",
    formats: ["Roadmap", "Checklist", "Prompt Kit", "Mini Course"],
    nextMove: "Security+ sonrası 30 günlük SOC Analyst öğrenme planı oluştur.",
  },
];

const ideas = [
  {
    id: "math-workbook",
    trackKey: "math",
    product: "5. Sınıf Matematik Çalışma Paketi",
    category: "Matematik + AI",
    lang: "TR",
    demand: 9,
    competition: 5,
    speed: 8,
    revenue: 8,
    score: 92,
    platform: "Etsy",
    status: "Öncelik",
    price: "7-12€",
    owner: "MVP",
    week: "Bu hafta",
    angle: "Velilerin evde hızlı pratik yaptırması için konu bazlı, çözümlü ve yazdırılabilir paket.",
    firstStep: "Kesirler konusunda 20 soru, 5 mini test ve cevap anahtarı üret.",
  },
  {
    id: "math-abitur",
    trackKey: "math",
    product: "Realschule Sınav Hazırlık PDF",
    category: "Matematik + AI",
    lang: "DE",
    demand: 8,
    competition: 6,
    speed: 6,
    revenue: 9,
    score: 84,
    platform: "Gumroad",
    status: "Test",
    price: "15-29€",
    owner: "Araştırma",
    week: "2. hafta",
    angle: "Almanya'daki öğrenciler için sınav odaklı, kısa açıklamalı ve pratik ağırlıklı kaynak.",
    firstStep: "En çok çıkan 5 konu ve arama hacmi için başlık listesi çıkar.",
  },
  {
    id: "ai-teacher-prompts",
    trackKey: "ai",
    product: "Öğretmenler İçin AI Ders Planı Paketi",
    category: "AI Verimlilik",
    lang: "TR/DE",
    demand: 8,
    competition: 4,
    speed: 9,
    revenue: 7,
    score: 87,
    platform: "Gumroad",
    status: "Hızlı MVP",
    price: "9-19€",
    owner: "MVP",
    week: "Bu hafta",
    angle: "Ders planı, çalışma kağıdı, değerlendirme ve veli mesajı için kopyala-kullan prompt sistemi.",
    firstStep: "10 temel öğretmen iş akışını tek sayfalık prompt sistemine dönüştür.",
  },
  {
    id: "ai-small-business",
    trackKey: "ai",
    product: "Almanca Küçük İşletme Prompt Seti",
    category: "AI Verimlilik",
    lang: "DE",
    demand: 7,
    competition: 4,
    speed: 8,
    revenue: 8,
    score: 82,
    platform: "Gumroad",
    status: "Test",
    price: "12-24€",
    owner: "Validasyon",
    week: "2. hafta",
    angle: "Yerel işletmeler için teklif, sosyal medya, e-posta ve Google yorum cevap şablonları.",
    firstStep: "Kuaför, restoran ve tamirci için 3 örnek kullanım senaryosu yaz.",
  },
  {
    id: "kids-routine",
    trackKey: "parents",
    product: "Çocuk Rutin Planlayıcı Sistemi",
    category: "Ebeveyn + AI",
    lang: "TR/EN",
    demand: 7,
    competition: 6,
    speed: 8,
    revenue: 7,
    score: 78,
    platform: "Etsy",
    status: "Test",
    price: "5-9€",
    owner: "Validasyon",
    week: "Bu hafta",
    angle: "Sabah, okul sonrası ve uyku rutini için ailelerin yazdırıp kullanacağı sade planlayıcı.",
    firstStep: "3 rutin şablonu ve 20 davranış kartı taslağı hazırla.",
  },
  {
    id: "screen-time",
    trackKey: "parents",
    product: "Ekran Süresi Anlaşma Kiti",
    category: "Ebeveyn + AI",
    lang: "TR",
    demand: 8,
    competition: 5,
    speed: 7,
    revenue: 7,
    score: 80,
    platform: "Etsy",
    status: "Öncelik",
    price: "6-10€",
    owner: "MVP",
    week: "2. hafta",
    angle: "Çocukla çatışmadan ekran süresi sınırı koymak için anlaşma, takip ve ödül sistemi.",
    firstStep: "Aile sözleşmesi, haftalık takip sayfası ve ödül fikirleri oluştur.",
  },
  {
    id: "cyber-roadmap",
    trackKey: "cyber",
    product: "SOC Analyst Başlangıç Yol Haritası",
    category: "Cybersecurity",
    lang: "EN",
    demand: 6,
    competition: 7,
    speed: 6,
    revenue: 8,
    score: 72,
    platform: "Gumroad",
    status: "Faz 2",
    price: "19-39€",
    owner: "Plan",
    week: "4. hafta",
    angle: "Security+ sonrası dağınık öğrenmeyi 30 günlük görev planına çeviren pratik rehber.",
    firstStep: "Hafta hafta beceri listesi ve mini lab önerilerini çıkar.",
  },
];

const channels = [
  { name: "Etsy", icon: Store, role: "Printable ve workbook için hızlı pazar testi", priority: "Birincil", fit: 92 },
  { name: "Gumroad", icon: Euro, role: "PDF, prompt pack ve mini ürün satışları", priority: "Birincil", fit: 88 },
  { name: "Kendi Site", icon: Globe2, role: "Marka, blog, lead magnet ve e-posta listesi", priority: "Büyüme", fit: 74 },
  { name: "YouTube", icon: Video, role: "No-face trafik ve otorite kanalı", priority: "Büyüme", fit: 69 },
  { name: "E-posta", icon: Mail, role: "Tekrar satış ve ürün ailesi duyuruları", priority: "Sistem", fit: 81 },
];

const sprintTasks = [
  { id: "niche", label: "Tek nişi seç", detail: "İlk MVP için tek hedef kitle ve tek problem." },
  { id: "brief", label: "Ürün brief'i yaz", detail: "Fiyat, format, sonuç vaadi ve içerik bölümleri." },
  { id: "sample", label: "Örnek sayfa üret", detail: "Satış sayfasında gösterilecek 3 gerçek ekran." },
  { id: "listing", label: "Satış başlığı hazırla", detail: "Etsy/Gumroad için SEO uyumlu 5 başlık." },
  { id: "publish", label: "Yayına al", detail: "Ürün dosyası, kapak görseli ve kısa açıklama." },
  { id: "measure", label: "7 gün ölç", detail: "Görüntülenme, favori, tıklama ve satış sinyali." },
];

const phases = [
  {
    phase: "Faz 1",
    weeks: "1-2. hafta",
    title: "Validasyon",
    goal: "3 küçük ürün çıkarıp gerçek talep sinyali topla.",
    tasks: ["1 Etsy printable", "1 Gumroad PDF", "1 prompt paketi", "Basit satış sayfası"],
  },
  {
    phase: "Faz 2",
    weeks: "3-6. hafta",
    title: "Ürün Ailesi",
    goal: "Kazanan fikri paket, seviye ve dil varyasyonlarıyla büyüt.",
    tasks: ["Bundle paketi", "SEO başlıkları", "Pinterest pinleri", "E-posta listesi"],
  },
  {
    phase: "Faz 3",
    weeks: "7-12. hafta",
    title: "Otorite",
    goal: "No-face içerik ve lead magnet ile sürekli trafik kur.",
    tasks: ["YouTube içerikleri", "Lead magnet", "Mini kurs", "AI agent demo"],
  },
];

const statusFilters = ["Tümü", "Öncelik", "Hızlı MVP", "Test", "Faz 2"];

const sortOptions = [
  { key: "score", label: "Öncelik skoru" },
  { key: "speed", label: "Üretim hızı" },
  { key: "revenue", label: "Gelir potansiyeli" },
  { key: "demand", label: "Talep" },
];

const statusStyles = {
  Öncelik: "bg-slate-950 text-white",
  "Hızlı MVP": "bg-emerald-100 text-emerald-800",
  Test: "bg-cyan-100 text-cyan-800",
  "Faz 2": "bg-amber-100 text-amber-900",
};

function ScoreBar({ score, className = "bg-slate-900" }) {
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${score}%` }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className={cx("h-full rounded-full", className)}
      />
    </div>
  );
}

function StatusBadge({ status }) {
  return (
    <span className={cx("inline-flex rounded-full px-2.5 py-1 text-xs font-semibold", statusStyles[status] || "bg-slate-100 text-slate-700")}>
      {status}
    </span>
  );
}

function MetricTile({ icon: Icon, label, value, note, tone }) {
  return (
    <Card>
      <CardContent className="flex min-h-[112px] items-start gap-4 p-5">
        <div className={cx("flex h-10 w-10 shrink-0 items-center justify-center rounded-lg", tone)}>
          <Icon className="h-5 w-5" />
        </div>
        <div className="min-w-0">
          <p className="text-sm text-slate-500">{label}</p>
          <p className="mt-1 text-2xl font-semibold tracking-tight text-slate-950">{value}</p>
          <p className="mt-1 text-sm text-slate-500">{note}</p>
        </div>
      </CardContent>
    </Card>
  );
}

function TrackButton({ track, active, onClick }) {
  const Icon = track.icon;

  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cx(
        "w-full rounded-lg border p-4 text-left transition hover:border-slate-300 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400",
        active ? "border-slate-950 bg-slate-50" : "border-slate-200 bg-white"
      )}
    >
      <div className="flex items-start gap-3">
        <div className={cx("flex h-10 w-10 shrink-0 items-center justify-center rounded-lg", track.iconAccent)}>
          <Icon className="h-5 w-5" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-3">
            <p className="font-semibold text-slate-950">{track.title}</p>
            <span className="text-sm font-semibold text-slate-700">{track.score}</span>
          </div>
          <p className="mt-1 text-sm leading-5 text-slate-500">{track.promise}</p>
          <div className="mt-3">
            <ScoreBar score={track.score} className={track.chart} />
          </div>
        </div>
      </div>
    </button>
  );
}

export default function AIDigitalProductStudioDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [activeTrack, setActiveTrack] = useState("math");
  const [validationTrack, setValidationTrack] = useState("all");
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("Tümü");
  const [sortKey, setSortKey] = useState("score");
  const [selectedIdeaId, setSelectedIdeaId] = useState("math-workbook");
  const [completedTasks, setCompletedTasks] = useState(["niche"]);

  const currentTrack = useMemo(
    () => productTracks.find((track) => track.key === activeTrack) || productTracks[0],
    [activeTrack]
  );

  const visibleIdeas = useMemo(() => {
    const normalizedQuery = normalizeSearchText(query.trim());

    return ideas
      .filter((idea) => validationTrack === "all" || idea.trackKey === validationTrack)
      .filter((idea) => statusFilter === "Tümü" || idea.status === statusFilter)
      .filter((idea) => {
        if (!normalizedQuery) return true;
        const haystack = normalizeSearchText(`${idea.product} ${idea.category} ${idea.lang} ${idea.platform} ${idea.angle}`);
        return haystack.includes(normalizedQuery);
      })
      .sort((a, b) => b[sortKey] - a[sortKey]);
  }, [query, sortKey, statusFilter, validationTrack]);

  const selectedIdea = useMemo(
    () =>
      visibleIdeas.find((idea) => idea.id === selectedIdeaId) ||
      visibleIdeas[0] ||
      ideas.find((idea) => idea.id === selectedIdeaId) ||
      ideas[0],
    [selectedIdeaId, visibleIdeas]
  );

  const completedCount = completedTasks.length;
  const completionRate = Math.round((completedCount / sprintTasks.length) * 100);
  const trackIdeas = ideas.filter((idea) => idea.trackKey === activeTrack);
  const bestIdea = trackIdeas.reduce((best, idea) => (idea.score > best.score ? idea : best), trackIdeas[0]);

  function selectTrack(trackKey) {
    const firstIdea = ideas.find((idea) => idea.trackKey === trackKey);
    setActiveTrack(trackKey);
    setValidationTrack(trackKey);
    if (firstIdea) setSelectedIdeaId(firstIdea.id);
  }

  function toggleTask(taskId) {
    setCompletedTasks((current) =>
      current.includes(taskId) ? current.filter((id) => id !== taskId) : [...current, taskId]
    );
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-slate-100 text-slate-950">
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-950 text-white">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">AI Digital Product Studio</p>
              <h1 className="text-xl font-semibold tracking-tight text-slate-950">Ürün karar ve validasyon paneli</h1>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Button variant="outline" onClick={() => setActiveTab("validation")}>
              <Target className="h-4 w-4" />
              MVP seç
            </Button>
            <Button onClick={() => setActiveTab("sprint")}>
              <Rocket className="h-4 w-4" />
              Sprinti aç
            </Button>
          </div>
        </div>
      </div>

      <div className="mx-auto grid w-full max-w-[1440px] gap-0 lg:grid-cols-[280px_minmax(0,1fr)]">
        <aside className="min-w-0 border-b border-slate-200 bg-white px-4 py-4 lg:min-h-[calc(100vh-73px)] lg:border-b-0 lg:border-r lg:px-5">
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-3 lg:block lg:space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveTab(item.id)}
                  className={cx(
                    "flex h-10 min-w-0 items-center justify-start gap-3 rounded-lg px-3 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 sm:justify-center sm:gap-2 sm:px-2 lg:w-full lg:justify-start lg:gap-3 lg:px-3",
                    activeTab === item.id ? "bg-slate-950 text-white" : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span className="min-w-0 truncate lg:hidden">{item.shortLabel}</span>
                  <span className="hidden lg:inline">{item.label}</span>
                </button>
              );
            })}
          </div>

          <div className="mt-6 hidden lg:block">
            <p className="mb-3 text-xs font-semibold uppercase text-slate-400">Odak alanları</p>
            <div className="space-y-2">
              {productTracks.map((track) => {
                const Icon = track.icon;
                return (
                  <button
                    key={track.key}
                    type="button"
                    onClick={() => selectTrack(track.key)}
                    className={cx(
                      "flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition",
                      activeTrack === track.key ? "bg-slate-100 text-slate-950" : "text-slate-600 hover:bg-slate-50"
                    )}
                  >
                    <span className="flex min-w-0 items-center gap-2">
                      <Icon className="h-4 w-4 shrink-0" />
                      <span className="truncate">{track.shortTitle}</span>
                    </span>
                    <span className="font-semibold">{track.score}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-6 hidden rounded-lg border border-slate-200 bg-slate-50 p-4 lg:block">
            <p className="text-sm font-semibold text-slate-950">Bu haftanın odağı</p>
            <p className="mt-2 text-sm leading-6 text-slate-600">{bestIdea.product}</p>
            <div className="mt-4 flex items-center justify-between text-sm">
              <span className="text-slate-500">Sprint</span>
              <span className="font-semibold text-slate-950">{completionRate}%</span>
            </div>
            <div className="mt-2">
              <ScoreBar score={completionRate} className="bg-emerald-500" />
            </div>
          </div>
        </aside>

        <main className="min-w-0 px-4 py-6 sm:px-6 lg:px-8">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <MetricTile icon={Target} label="En güçlü niş" value={currentTrack.shortTitle} note={`${currentTrack.score}/100 pazar uyumu`} tone={currentTrack.accent} />
            <MetricTile icon={Clock3} label="MVP süresi" value={currentTrack.mvpTime} note="İlk satış sinyali için" tone="bg-blue-50 text-blue-700" />
            <MetricTile icon={TrendingUp} label="İlk gelir hedefi" value="300-500€" note="90 gün içinde aylık" tone="bg-emerald-50 text-emerald-700" />
            <MetricTile icon={CalendarCheck} label="Sprint ilerleme" value={`${completionRate}%`} note={`${completedCount}/${sprintTasks.length} görev tamamlandı`} tone="bg-amber-50 text-amber-800" />
          </div>

          {activeTab === "overview" && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1.1fr)_390px]">
              <section className="space-y-6">
                <Card>
                  <CardContent className="p-5 sm:p-6">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <p className="text-sm font-medium text-slate-500">Stratejik seçim</p>
                        <h2 className="mt-1 text-2xl font-semibold tracking-tight">Önce tek nişi kazanılabilir hale getir</h2>
                      </div>
                      <Button variant="subtle" onClick={() => setActiveTab("validation")}>
                        <BarChart3 className="h-4 w-4" />
                        Validasyon
                      </Button>
                    </div>

                    <div className="mt-5 grid gap-3 lg:grid-cols-2">
                      {productTracks.map((track) => (
                        <TrackButton key={track.key} track={track} active={activeTrack === track.key} onClick={() => selectTrack(track.key)} />
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-5 sm:p-6">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                      <div>
                        <p className="text-sm font-medium text-slate-500">Seçili strateji</p>
                        <h2 className="mt-1 text-2xl font-semibold tracking-tight">{currentTrack.title}</h2>
                        <p className="mt-3 max-w-3xl leading-7 text-slate-600">{currentTrack.promise}</p>
                      </div>
                      <div className={cx("inline-flex w-fit items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold ring-1", currentTrack.accent)}>
                        <currentTrack.icon className="h-4 w-4" />
                        {currentTrack.market}
                      </div>
                    </div>

                    <div className="mt-6 grid gap-4 md:grid-cols-3">
                      <div className="border-t border-slate-200 pt-4">
                        <p className="text-sm text-slate-500">Hedef kitle</p>
                        <p className="mt-1 font-semibold">{currentTrack.target}</p>
                      </div>
                      <div className="border-t border-slate-200 pt-4">
                        <p className="text-sm text-slate-500">Risk</p>
                        <p className="mt-1 font-semibold">{currentTrack.risk}</p>
                      </div>
                      <div className="border-t border-slate-200 pt-4">
                        <p className="text-sm text-slate-500">Sıradaki hamle</p>
                        <p className="mt-1 font-semibold">{currentTrack.mvpTime} içinde MVP</p>
                      </div>
                    </div>

                    <div className="mt-6 flex flex-wrap gap-2">
                      {currentTrack.formats.map((format) => (
                        <span key={format} className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">
                          {format}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </section>

              <aside className="space-y-6">
                <Card>
                  <CardContent className="p-5">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-slate-500">En yakın ürün</p>
                        <h3 className="mt-1 text-lg font-semibold">{bestIdea.product}</h3>
                      </div>
                      <StatusBadge status={bestIdea.status} />
                    </div>
                    <p className="mt-4 text-sm leading-6 text-slate-600">{bestIdea.angle}</p>
                    <div className="mt-5 space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-500">Skor</span>
                        <span className="font-semibold">{bestIdea.score}/100</span>
                      </div>
                      <ScoreBar score={bestIdea.score} className={currentTrack.chart} />
                    </div>
                    <Button className="mt-5 w-full" onClick={() => setActiveTab("validation")}>
                      <ClipboardList className="h-4 w-4" />
                      Ürün detayına geç
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-5">
                    <div className="mb-4 flex items-center justify-between">
                      <h3 className="font-semibold">Kanal uyumu</h3>
                      <Globe2 className="h-4 w-4 text-slate-400" />
                    </div>
                    <div className="space-y-4">
                      {channels.map((channel) => {
                        const Icon = channel.icon;
                        return (
                          <div key={channel.name} className="border-t border-slate-100 pt-4 first:border-t-0 first:pt-0">
                            <div className="flex items-start gap-3">
                              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-700">
                                <Icon className="h-4 w-4" />
                              </div>
                              <div className="min-w-0 flex-1">
                                <div className="flex items-center justify-between gap-3">
                                  <p className="font-medium">{channel.name}</p>
                                  <span className="text-xs font-semibold text-slate-500">{channel.fit}%</span>
                                </div>
                                <p className="mt-1 text-sm leading-5 text-slate-500">{channel.role}</p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </aside>
            </motion.div>
          )}

          {activeTab === "validation" && (
            <motion.section initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1fr)_380px]">
              <Card>
                <CardContent className="p-5 sm:p-6">
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-500">Product Validation Board</p>
                      <h2 className="mt-1 text-2xl font-semibold tracking-tight">Fikirleri veriyle sırala, tek MVP seç</h2>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Button variant="outline" onClick={() => setQuery("")}>
                        <Filter className="h-4 w-4" />
                        Temizle
                      </Button>
                      <Button onClick={() => setActiveTab("sprint")}>
                        <ArrowRight className="h-4 w-4" />
                        Sprint
                      </Button>
                    </div>
                  </div>

                  <div className="mt-5 flex gap-2 overflow-x-auto pb-1">
                    <button
                      type="button"
                      onClick={() => setValidationTrack("all")}
                      className={cx(
                        "flex h-9 shrink-0 items-center gap-2 rounded-lg px-3 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400",
                        validationTrack === "all" ? "bg-slate-950 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                      )}
                    >
                      <Sparkles className="h-4 w-4" />
                      Tüm alanlar
                    </button>
                    {productTracks.map((track) => {
                      const Icon = track.icon;
                      return (
                        <button
                          key={track.key}
                          type="button"
                          onClick={() => setValidationTrack(track.key)}
                          className={cx(
                            "flex h-9 shrink-0 items-center gap-2 rounded-lg px-3 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400",
                            validationTrack === track.key ? "bg-slate-950 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                          )}
                        >
                          <Icon className="h-4 w-4" />
                          {track.shortTitle}
                        </button>
                      );
                    })}
                  </div>

                  <div className="mt-4 grid gap-3 lg:grid-cols-[minmax(0,1fr)_180px]">
                    <label className="flex h-11 items-center gap-3 rounded-lg border border-slate-300 bg-white px-3 focus-within:ring-2 focus-within:ring-slate-300">
                      <Search className="h-4 w-4 shrink-0 text-slate-400" />
                      <input
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                        className="min-w-0 flex-1 bg-transparent text-sm outline-none"
                        placeholder="Ürün, platform veya açı ara"
                        aria-label="Ürün ara"
                      />
                    </label>

                    <label className="flex h-11 items-center gap-2 rounded-lg border border-slate-300 bg-white px-3">
                      <ArrowUpDown className="h-4 w-4 text-slate-400" />
                      <select
                        value={sortKey}
                        onChange={(event) => setSortKey(event.target.value)}
                        className="min-w-0 flex-1 bg-transparent text-sm outline-none"
                        aria-label="Sıralama"
                      >
                        {sortOptions.map((option) => (
                          <option key={option.key} value={option.key}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>

                  <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
                    {statusFilters.map((status) => (
                      <button
                        key={status}
                        type="button"
                        onClick={() => setStatusFilter(status)}
                        className={cx(
                          "h-9 shrink-0 rounded-lg px-3 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400",
                          statusFilter === status ? "bg-slate-950 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                        )}
                      >
                        {status}
                      </button>
                    ))}
                  </div>

                  <div className="mt-5 overflow-hidden rounded-lg border border-slate-200">
                    <div className="overflow-x-auto">
                      <table className="min-w-[920px] w-full text-sm">
                        <thead className="bg-slate-50 text-left text-slate-600">
                          <tr>
                            <th className="px-4 py-3 font-semibold">Ürün</th>
                            <th className="px-4 py-3 font-semibold">Dil</th>
                            <th className="px-4 py-3 font-semibold">Talep</th>
                            <th className="px-4 py-3 font-semibold">Rekabet</th>
                            <th className="px-4 py-3 font-semibold">Hız</th>
                            <th className="px-4 py-3 font-semibold">Gelir</th>
                            <th className="px-4 py-3 font-semibold">Platform</th>
                            <th className="px-4 py-3 font-semibold">Durum</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {visibleIdeas.map((idea) => (
                            <tr
                              key={idea.id}
                              onClick={() => setSelectedIdeaId(idea.id)}
                              className={cx(
                                "cursor-pointer bg-white transition hover:bg-slate-50",
                                selectedIdea.id === idea.id && "bg-cyan-50/60"
                              )}
                            >
                              <td className="px-4 py-4">
                                <div className="flex items-center gap-3">
                                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-700">
                                    <ChevronRight className="h-4 w-4" />
                                  </div>
                                  <div>
                                    <p className="font-semibold text-slate-950">{idea.product}</p>
                                    <p className="mt-1 text-xs text-slate-500">{idea.category} · {idea.price}</p>
                                  </div>
                                </div>
                              </td>
                              <td className="px-4 py-4 font-medium">{idea.lang}</td>
                              <td className="px-4 py-4">{idea.demand}/10</td>
                              <td className="px-4 py-4">{idea.competition}/10</td>
                              <td className="px-4 py-4">{idea.speed}/10</td>
                              <td className="px-4 py-4">{idea.revenue}/10</td>
                              <td className="px-4 py-4">{idea.platform}</td>
                              <td className="px-4 py-4">
                                <StatusBadge status={idea.status} />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    {visibleIdeas.length === 0 && (
                      <div className="bg-white px-4 py-12 text-center">
                        <p className="font-medium text-slate-900">Sonuç bulunamadı</p>
                        <p className="mt-1 text-sm text-slate-500">Aramayı veya durum filtresini değiştir.</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-medium text-slate-500">Seçili MVP</p>
                      <h3 className="mt-1 text-xl font-semibold leading-7">{selectedIdea.product}</h3>
                    </div>
                    <StatusBadge status={selectedIdea.status} />
                  </div>

                  <p className="mt-4 text-sm leading-6 text-slate-600">{selectedIdea.angle}</p>

                  <div className="mt-5 space-y-4">
                    {[
                      ["Öncelik skoru", selectedIdea.score, "bg-slate-900"],
                      ["Talep", selectedIdea.demand * 10, "bg-cyan-500"],
                      ["Üretim hızı", selectedIdea.speed * 10, "bg-emerald-500"],
                      ["Gelir potansiyeli", selectedIdea.revenue * 10, "bg-amber-500"],
                    ].map(([label, value, color]) => (
                      <div key={label}>
                        <div className="mb-2 flex items-center justify-between text-sm">
                          <span className="text-slate-500">{label}</span>
                          <span className="font-semibold text-slate-950">{value}%</span>
                        </div>
                        <ScoreBar score={value} className={color} />
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 grid grid-cols-2 gap-3 border-t border-slate-200 pt-5">
                    <div>
                      <p className="text-sm text-slate-500">Platform</p>
                      <p className="mt-1 font-semibold">{selectedIdea.platform}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Fiyat</p>
                      <p className="mt-1 font-semibold">{selectedIdea.price}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Sahip</p>
                      <p className="mt-1 font-semibold">{selectedIdea.owner}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Zaman</p>
                      <p className="mt-1 font-semibold">{selectedIdea.week}</p>
                    </div>
                  </div>

                  <div className="mt-6 border-t border-slate-200 pt-5">
                    <p className="text-sm font-semibold text-slate-950">İlk aksiyon</p>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{selectedIdea.firstStep}</p>
                  </div>

                  <Button className="mt-6 w-full" onClick={() => setActiveTab("sprint")}>
                    <CheckCircle2 className="h-4 w-4" />
                    Sprint görevlerine ekle
                  </Button>
                </CardContent>
              </Card>
            </motion.section>
          )}

          {activeTab === "sprint" && (
            <motion.section initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-6 grid gap-6 xl:grid-cols-[390px_minmax(0,1fr)]">
              <Card>
                <CardContent className="p-5 sm:p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-medium text-slate-500">Sprint 1</p>
                      <h2 className="mt-1 text-2xl font-semibold tracking-tight">İlk satış sinyali</h2>
                    </div>
                    <span className="rounded-lg bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-800">{completionRate}%</span>
                  </div>
                  <p className="mt-3 leading-7 text-slate-600">{currentTrack.nextMove}</p>

                  <div className="mt-6 space-y-3">
                    {sprintTasks.map((task) => {
                      const checked = completedTasks.includes(task.id);
                      return (
                        <label
                          key={task.id}
                          className={cx(
                            "flex cursor-pointer gap-3 rounded-lg border p-3 transition",
                            checked ? "border-emerald-200 bg-emerald-50" : "border-slate-200 bg-white hover:bg-slate-50"
                          )}
                        >
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => toggleTask(task.id)}
                            className="mt-1 h-4 w-4 rounded border-slate-300 text-slate-950 focus:ring-slate-400"
                          />
                          <span>
                            <span className="block font-medium text-slate-950">{task.label}</span>
                            <span className="mt-1 block text-sm leading-5 text-slate-500">{task.detail}</span>
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-6">
                <Card>
                  <CardContent className="p-5 sm:p-6">
                    <div className="mb-5 flex items-center gap-3">
                      <CalendarCheck className="h-5 w-5 text-slate-500" />
                      <h2 className="text-xl font-semibold">90 günlük yol haritası</h2>
                    </div>

                    <div className="grid gap-4 lg:grid-cols-3">
                      {phases.map((phase) => (
                        <div key={phase.phase} className="rounded-lg border border-slate-200 bg-white p-4">
                          <div className="flex items-center justify-between gap-3">
                            <span className="rounded-full bg-slate-950 px-3 py-1 text-xs font-semibold text-white">{phase.phase}</span>
                            <span className="text-xs font-medium text-slate-500">{phase.weeks}</span>
                          </div>
                          <h3 className="mt-4 font-semibold">{phase.title}</h3>
                          <p className="mt-2 min-h-[72px] text-sm leading-6 text-slate-600">{phase.goal}</p>
                          <div className="mt-4 space-y-2 border-t border-slate-100 pt-4">
                            {phase.tasks.map((task) => (
                              <div key={task} className="flex items-center gap-2 text-sm text-slate-600">
                                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                                {task}
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-slate-950 text-white">
                  <CardContent className="p-5 sm:p-6">
                    <div className="grid gap-5 lg:grid-cols-[1fr_260px] lg:items-center">
                      <div>
                        <p className="text-sm font-medium text-slate-300">Bir sonraki karar</p>
                        <h2 className="mt-1 text-2xl font-semibold">Mükemmel ürün değil, ölçülebilir ürün çıkar</h2>
                        <p className="mt-3 leading-7 text-slate-300">
                          İlk hafta hedefi; tek probleme odaklanan küçük bir ürün, net satış başlığı ve 7 günlük veri takibi.
                        </p>
                      </div>
                      <Button variant="outline" className="border-white/20 bg-white text-slate-950 hover:bg-slate-100" onClick={() => setActiveTab("validation")}>
                        <BarChart3 className="h-4 w-4" />
                        Panoya dön
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.section>
          )}
        </main>
      </div>
    </div>
  );
}
