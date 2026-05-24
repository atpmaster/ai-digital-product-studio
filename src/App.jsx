import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  ArrowRight,
  BarChart3,
  CheckCircle2,
  ClipboardList,
  Clock3,
  Filter,
  Fingerprint,
  Gamepad2,
  Globe2,
  LayoutDashboard,
  ListChecks,
  LockKeyhole,
  MessageSquareWarning,
  Rocket,
  Search,
  ShieldAlert,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Target,
  Users,
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
    warning: "bg-amber-500 text-slate-950 hover:bg-amber-400",
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
  { id: "path", label: "Güvenlik Yolu", shortLabel: "Yol", icon: ShieldCheck },
  { id: "plan", label: "Aile Planı", shortLabel: "Plan", icon: ListChecks },
];

const securityModules = [
  {
    id: "cyberbullying",
    title: "Siber Zorbalık Müdahale Kiti",
    shortTitle: "Siber zorbalık",
    icon: MessageSquareWarning,
    age: "10-16",
    priority: "Acil",
    score: 96,
    effort: "3 gün",
    format: "PDF + kontrol listesi",
    channel: "Ebeveyn rehberi",
    accent: "bg-rose-50 text-rose-700 ring-rose-200",
    iconAccent: "bg-rose-600 text-white",
    chart: "bg-rose-500",
    summary:
      "Çocuğun zorbalığa maruz kaldığında neyi kaydedeceğini, kime söyleyeceğini ve ailenin hangi sırayla hareket edeceğini netleştirir.",
    deliverables: ["Kanıt toplama sayfası", "Okul görüşme notu", "Çocukla konuşma rehberi", "Acil durum akışı"],
    firstStep: "Zorbalık kanıtlarını ekran görüntüsü, tarih ve platform bilgisiyle saklayan tek sayfalık şablon hazırla.",
  },
  {
    id: "digital-footprint",
    title: "Dijital Ayak İzini Temizleme Rehberi",
    shortTitle: "Dijital ayak izi",
    icon: Fingerprint,
    age: "13-16",
    priority: "Öncelik",
    score: 91,
    effort: "5 gün",
    format: "Rehber + takip tablosu",
    channel: "Mini kurs",
    accent: "bg-cyan-50 text-cyan-700 ring-cyan-200",
    iconAccent: "bg-cyan-600 text-white",
    chart: "bg-cyan-500",
    summary:
      "Eski hesaplar, açık profiller, arama sonuçları, fotoğraf izinleri ve veri paylaşımı noktalarını sistemli şekilde azaltır.",
    deliverables: ["Hesap envanteri", "Silme talebi şablonları", "Profil gizlilik kontrolü", "30 günlük temizlik planı"],
    firstStep: "Çocuğun kullandığı uygulama, oyun, e-posta ve sosyal medya hesapları için görünürlük envanteri oluştur.",
  },
  {
    id: "family-link",
    title: "Family Link ve Cihaz Kurulum Planı",
    shortTitle: "Family Link",
    icon: Smartphone,
    age: "6-12",
    priority: "Rutin",
    score: 88,
    effort: "2 gün",
    format: "Kurulum checklist",
    channel: "Printable",
    accent: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    iconAccent: "bg-emerald-600 text-white",
    chart: "bg-emerald-500",
    summary:
      "Google Family Link, ekran süresi, uygulama onayı, konum paylaşımı ve uyku saatleri gibi aile kurallarını tek çerçevede toplar.",
    deliverables: ["Kurulum kontrol listesi", "Ekran süresi anlaşması", "Uygulama onay kuralları", "Haftalık aile kontrolü"],
    firstStep: "Yaşa göre ekran süresi, uygulama indirme izni ve uyku saati sınırlarını tek aile kural sayfasında tanımla.",
  },
  {
    id: "privacy",
    title: "Sosyal Medya Gizlilik Kilidi",
    shortTitle: "Gizlilik kilidi",
    icon: LockKeyhole,
    age: "10-16",
    priority: "Öncelik",
    score: 86,
    effort: "4 gün",
    format: "Adım adım rehber",
    channel: "PDF paket",
    accent: "bg-violet-50 text-violet-700 ring-violet-200",
    iconAccent: "bg-violet-600 text-white",
    chart: "bg-violet-500",
    summary:
      "Profil görünürlüğü, etiketleme, mesaj izinleri, arkadaş listesi ve fotoğraf paylaşımı risklerini aile diliyle anlatır.",
    deliverables: ["Gizlilik kontrol kartları", "Paylaşmadan önce soruları", "DM güvenlik kuralları", "Aile konuşma metni"],
    firstStep: "Instagram, TikTok ve oyun profilleri için görünürlük ve mesajlaşma ayarlarını tek kontrol listesine indir.",
  },
  {
    id: "gaming-chat",
    title: "Oyun ve Sohbet Güvenliği Planı",
    shortTitle: "Oyun güvenliği",
    icon: Gamepad2,
    age: "8-14",
    priority: "Rehber",
    score: 82,
    effort: "4 gün",
    format: "Aile anlaşması",
    channel: "Worksheet",
    accent: "bg-amber-50 text-amber-800 ring-amber-200",
    iconAccent: "bg-amber-500 text-white",
    chart: "bg-amber-500",
    summary:
      "Oyun içi sohbet, yabancılarla iletişim, hediye dolandırıcılığı ve özel bilgi paylaşımı için açık aile sınırları kurar.",
    deliverables: ["Oyun izin matrisi", "Yabancı mesaj kuralı", "Dolandırıcılık örnekleri", "Haftalık oyun kontrolü"],
    firstStep: "Çocuğun oynadığı oyunları sohbet, satın alma ve yabancı etkileşimi risklerine göre puanla.",
  },
  {
    id: "incident-response",
    title: "Acil Dijital Güvenlik Protokolü",
    shortTitle: "Acil protokol",
    icon: ShieldAlert,
    age: "Tüm yaşlar",
    priority: "Acil",
    score: 94,
    effort: "2 gün",
    format: "Tek sayfa protokol",
    channel: "Aile panosu",
    accent: "bg-red-50 text-red-700 ring-red-200",
    iconAccent: "bg-red-600 text-white",
    chart: "bg-red-500",
    summary:
      "Şantaj, tehdit, hesap ele geçirme, uygunsuz görüntü paylaşımı veya yoğun zorbalık anında ailenin ilk 24 saatini düzenler.",
    deliverables: ["İlk 24 saat akışı", "Şifre yenileme listesi", "Bildirim kanalları", "Duygusal destek notları"],
    firstStep: "Acil durumda kapatılacak hesaplar, aranacak kişiler ve saklanacak kanıtları tek sayfada topla.",
  },
];

const ageFilters = ["Tüm yaşlar", "6-12", "8-14", "10-16", "13-16"];
const priorityFilters = ["Tümü", "Acil", "Öncelik", "Rutin", "Rehber"];

const sortOptions = [
  { key: "score", label: "Risk önceliği" },
  { key: "effortValue", label: "En hızlı üretim" },
  { key: "ageValue", label: "Yaş grubu" },
];

const priorityStyles = {
  Acil: "bg-red-100 text-red-800",
  Öncelik: "bg-slate-950 text-white",
  Rutin: "bg-emerald-100 text-emerald-800",
  Rehber: "bg-amber-100 text-amber-900",
};

const channels = [
  { name: "PDF Rehber", icon: ClipboardList, role: "Ailelerin çıktı alıp takip edeceği ana ürün", fit: 94 },
  { name: "Mini Kurs", icon: Globe2, role: "Ebeveynlere kısa video ve örnek senaryo anlatımı", fit: 83 },
  { name: "Aile Kontrol Panosu", icon: Users, role: "Haftalık konuşma, kontrol ve aksiyon takibi", fit: 89 },
  { name: "Acil Durum Kartı", icon: AlertTriangle, role: "Buzdolabı veya aile dosyasında tutulacak hızlı protokol", fit: 96 },
];

const sprintTasks = [
  { id: "scope", label: "Tek ürün vaadini yaz", detail: "Ailelere çocuklarını dijital risklerden koruyan net sonuç cümlesi." },
  { id: "map", label: "6 güvenlik modülünü sırala", detail: "Zorbalık, ayak izi, Family Link, gizlilik, oyun, acil protokol." },
  { id: "template", label: "İlk kontrol listesini üret", detail: "Siber zorbalık kanıt toplama ve ilk 24 saat adımları." },
  { id: "familylink", label: "Family Link sayfasını hazırla", detail: "Ekran süresi, uygulama izni ve uyku saati kuralları." },
  { id: "footprint", label: "Dijital ayak izi envanteri", detail: "Eski hesaplar, açık profiller ve silme talepleri için takip tablosu." },
  { id: "publish", label: "MVP paketini yayına al", detail: "PDF kapak, örnek sayfalar, satış açıklaması ve fiyat aralığı." },
];

const roadmap = [
  {
    phase: "1. Aşama",
    weeks: "1-2. hafta",
    title: "Koruma Temeli",
    goal: "Aile kuralları, cihaz ayarları ve acil durum dilini netleştir.",
    tasks: ["Family Link kurulumu", "Ekran süresi anlaşması", "Acil kişi listesi", "Kanıt toplama şablonu"],
  },
  {
    phase: "2. Aşama",
    weeks: "3-5. hafta",
    title: "Risk Temizliği",
    goal: "Dijital ayak izini azalt, sosyal medya ve oyun profillerini güvenli hale getir.",
    tasks: ["Hesap envanteri", "Gizlilik kilidi", "Eski hesap silme", "Oyun sohbet kuralları"],
  },
  {
    phase: "3. Aşama",
    weeks: "6-8. hafta",
    title: "Aile Rutini",
    goal: "Haftalık kontrol ve açık konuşma sistemiyle güvenliği sürdürülebilir yap.",
    tasks: ["Haftalık aile toplantısı", "Risk senaryoları", "Güvenli paylaşım kartları", "Aylık ayar kontrolü"],
  },
];

function getEffortValue(effort) {
  return Number.parseInt(effort, 10) || 10;
}

function getAgeValue(age) {
  return Number.parseInt(age, 10) || 99;
}

function ScoreBar({ score, className = "bg-slate-900" }) {
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${score}%` }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className={cx("h-full rounded-full", className)}
      />
    </div>
  );
}

function PriorityBadge({ priority }) {
  return (
    <span className={cx("inline-flex rounded-full px-2.5 py-1 text-xs font-semibold", priorityStyles[priority] || "bg-slate-100 text-slate-700")}>
      {priority}
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
          <p className="mt-1 text-2xl font-semibold text-slate-950">{value}</p>
          <p className="mt-1 text-sm text-slate-500">{note}</p>
        </div>
      </CardContent>
    </Card>
  );
}

function ModuleCard({ module, active, onClick }) {
  const Icon = module.icon;

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
        <div className={cx("flex h-10 w-10 shrink-0 items-center justify-center rounded-lg", module.iconAccent)}>
          <Icon className="h-5 w-5" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="font-semibold text-slate-950">{module.title}</p>
              <p className="mt-1 text-sm leading-5 text-slate-500">{module.summary}</p>
            </div>
            <span className="text-sm font-semibold text-slate-700">{module.score}</span>
          </div>
          <div className="mt-3">
            <ScoreBar score={module.score} className={module.chart} />
          </div>
        </div>
      </div>
    </button>
  );
}

export default function FamilyDigitalSafetyDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedModuleId, setSelectedModuleId] = useState("cyberbullying");
  const [query, setQuery] = useState("");
  const [ageFilter, setAgeFilter] = useState("Tüm yaşlar");
  const [priorityFilter, setPriorityFilter] = useState("Tümü");
  const [sortKey, setSortKey] = useState("score");
  const [completedTasks, setCompletedTasks] = useState(["scope"]);

  const visibleModules = useMemo(() => {
    const normalizedQuery = normalizeSearchText(query.trim());

    return securityModules
      .filter((module) => ageFilter === "Tüm yaşlar" || module.age === ageFilter || module.age === "Tüm yaşlar")
      .filter((module) => priorityFilter === "Tümü" || module.priority === priorityFilter)
      .filter((module) => {
        if (!normalizedQuery) return true;
        const haystack = normalizeSearchText(`${module.title} ${module.summary} ${module.deliverables.join(" ")} ${module.firstStep}`);
        return haystack.includes(normalizedQuery);
      })
      .sort((a, b) => {
        if (sortKey === "effortValue") return getEffortValue(a.effort) - getEffortValue(b.effort);
        if (sortKey === "ageValue") return getAgeValue(a.age) - getAgeValue(b.age);
        return b.score - a.score;
      });
  }, [ageFilter, priorityFilter, query, sortKey]);

  const selectedModule = useMemo(
    () =>
      visibleModules.find((module) => module.id === selectedModuleId) ||
      securityModules.find((module) => module.id === selectedModuleId) ||
      visibleModules[0] ||
      securityModules[0],
    [selectedModuleId, visibleModules]
  );

  const completedCount = completedTasks.length;
  const completionRate = Math.round((completedCount / sprintTasks.length) * 100);
  const topModule = securityModules.reduce((best, module) => (module.score > best.score ? module : best), securityModules[0]);

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
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Aile Dijital Güvenlik Stüdyosu</p>
              <h1 className="text-xl font-semibold text-slate-950">Çocuklar için güvenli dijital yaşam planı</h1>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Button variant="outline" onClick={() => setActiveTab("path")}>
              <Target className="h-4 w-4" />
              Güvenlik yolunu aç
            </Button>
            <Button onClick={() => setActiveTab("plan")}>
              <Rocket className="h-4 w-4" />
              Aile planı
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
            <p className="mb-3 text-xs font-semibold uppercase text-slate-400">Tek odak</p>
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-rose-600 text-white">
                  <Users className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold">Aile ve çocuk güvenliği</p>
                  <p className="text-sm text-slate-500">6 modüllü ürün yolu</p>
                </div>
              </div>
              <div className="mt-4 space-y-2 text-sm text-slate-600">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  Siber zorbalık müdahalesi
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  Dijital ayak izi temizliği
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  Family Link ve cihaz kuralları
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 hidden rounded-lg border border-slate-200 bg-white p-4 lg:block">
            <p className="text-sm font-semibold text-slate-950">Sprint ilerleme</p>
            <div className="mt-4 flex items-center justify-between text-sm">
              <span className="text-slate-500">MVP paket</span>
              <span className="font-semibold text-slate-950">{completionRate}%</span>
            </div>
            <div className="mt-2">
              <ScoreBar score={completionRate} className="bg-emerald-500" />
            </div>
          </div>
        </aside>

        <main className="min-w-0 px-4 py-6 sm:px-6 lg:px-8">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <MetricTile icon={ShieldAlert} label="Öncelikli risk" value="Siber zorbalık" note="İlk müdahale paketi" tone="bg-rose-50 text-rose-700" />
            <MetricTile icon={Fingerprint} label="Ana dönüşüm" value="Ayak izi temizliği" note="30 günlük aile planı" tone="bg-cyan-50 text-cyan-700" />
            <MetricTile icon={Smartphone} label="Cihaz güvenliği" value="Family Link" note="Kurallar ve haftalık kontrol" tone="bg-emerald-50 text-emerald-700" />
            <MetricTile icon={Clock3} label="Sprint" value={`${completionRate}%`} note={`${completedCount}/${sprintTasks.length} görev tamamlandı`} tone="bg-amber-50 text-amber-800" />
          </div>

          {activeTab === "overview" && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1.1fr)_390px]">
              <section className="space-y-6">
                <Card>
                  <CardContent className="p-5 sm:p-6">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <p className="text-sm font-medium text-slate-500">Ürün yolu</p>
                        <h2 className="mt-1 text-2xl font-semibold">Aileler için dijital güvenlik operasyon sistemi</h2>
                        <p className="mt-3 max-w-3xl leading-7 text-slate-600">
                          Tek odak; çocukların dijital dünyada zorbalık, mahremiyet, ekran süresi, oyun içi sohbet ve iz bırakma risklerine karşı korunması.
                        </p>
                      </div>
                      <Button variant="subtle" onClick={() => setActiveTab("path")}>
                        <BarChart3 className="h-4 w-4" />
                        Modüller
                      </Button>
                    </div>

                    <div className="mt-5 grid gap-3 lg:grid-cols-2">
                      {securityModules.slice(0, 4).map((module) => (
                        <ModuleCard
                          key={module.id}
                          module={module}
                          active={selectedModule.id === module.id}
                          onClick={() => {
                            setSelectedModuleId(module.id);
                            setActiveTab("path");
                          }}
                        />
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-5 sm:p-6">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                      <div>
                        <p className="text-sm font-medium text-slate-500">İlk MVP paketi</p>
                        <h2 className="mt-1 text-2xl font-semibold">{topModule.title}</h2>
                        <p className="mt-3 max-w-3xl leading-7 text-slate-600">{topModule.summary}</p>
                      </div>
                      <div className={cx("inline-flex w-fit items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold ring-1", topModule.accent)}>
                        <MessageSquareWarning className="h-4 w-4" />
                        {topModule.priority}
                      </div>
                    </div>

                    <div className="mt-6 grid gap-4 md:grid-cols-3">
                      <div className="border-t border-slate-200 pt-4">
                        <p className="text-sm text-slate-500">Hedef aile</p>
                        <p className="mt-1 font-semibold">10-16 yaş çocuk sahibi ebeveynler</p>
                      </div>
                      <div className="border-t border-slate-200 pt-4">
                        <p className="text-sm text-slate-500">Format</p>
                        <p className="mt-1 font-semibold">PDF, checklist, aile anlaşması</p>
                      </div>
                      <div className="border-t border-slate-200 pt-4">
                        <p className="text-sm text-slate-500">İlk teslim</p>
                        <p className="mt-1 font-semibold">14 gün içinde MVP</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </section>

              <aside className="space-y-6">
                <Card>
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-sm font-medium text-slate-500">Acil ürün çekirdeği</p>
                        <h3 className="mt-1 text-lg font-semibold">{topModule.title}</h3>
                      </div>
                      <PriorityBadge priority={topModule.priority} />
                    </div>
                    <p className="mt-4 text-sm leading-6 text-slate-600">{topModule.firstStep}</p>
                    <div className="mt-5 space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-500">Risk önceliği</span>
                        <span className="font-semibold">{topModule.score}/100</span>
                      </div>
                      <ScoreBar score={topModule.score} className={topModule.chart} />
                    </div>
                    <Button className="mt-5 w-full" onClick={() => setActiveTab("path")}>
                      <ClipboardList className="h-4 w-4" />
                      Detaylara geç
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-5">
                    <div className="mb-4 flex items-center justify-between">
                      <h3 className="font-semibold">Ürün bileşenleri</h3>
                      <Sparkles className="h-4 w-4 text-slate-400" />
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

          {activeTab === "path" && (
            <motion.section initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1fr)_380px]">
              <Card>
                <CardContent className="p-5 sm:p-6">
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-500">Güvenlik modülleri</p>
                      <h2 className="mt-1 text-2xl font-semibold">Aile siber güvenliği yol haritası</h2>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Button
                        variant="outline"
                        onClick={() => {
                          setQuery("");
                          setAgeFilter("Tüm yaşlar");
                          setPriorityFilter("Tümü");
                        }}
                      >
                        <Filter className="h-4 w-4" />
                        Temizle
                      </Button>
                      <Button onClick={() => setActiveTab("plan")}>
                        <ArrowRight className="h-4 w-4" />
                        Plan
                      </Button>
                    </div>
                  </div>

                  <div className="mt-5 grid gap-3 lg:grid-cols-[minmax(0,1fr)_180px]">
                    <label className="flex h-11 items-center gap-3 rounded-lg border border-slate-300 bg-white px-3 focus-within:ring-2 focus-within:ring-slate-300">
                      <Search className="h-4 w-4 shrink-0 text-slate-400" />
                      <input
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                        className="min-w-0 flex-1 bg-transparent text-sm outline-none"
                        placeholder="Zorbalık, ayak izi, Family Link ara"
                        aria-label="Güvenlik modülü ara"
                      />
                    </label>

                    <label className="flex h-11 items-center gap-2 rounded-lg border border-slate-300 bg-white px-3">
                      <BarChart3 className="h-4 w-4 text-slate-400" />
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
                    {ageFilters.map((age) => (
                      <button
                        key={age}
                        type="button"
                        onClick={() => setAgeFilter(age)}
                        className={cx(
                          "h-9 shrink-0 rounded-lg px-3 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400",
                          ageFilter === age ? "bg-slate-950 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                        )}
                      >
                        {age}
                      </button>
                    ))}
                  </div>

                  <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
                    {priorityFilters.map((priority) => (
                      <button
                        key={priority}
                        type="button"
                        onClick={() => setPriorityFilter(priority)}
                        className={cx(
                          "h-9 shrink-0 rounded-lg px-3 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400",
                          priorityFilter === priority ? "bg-slate-950 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                        )}
                      >
                        {priority}
                      </button>
                    ))}
                  </div>

                  <div className="mt-5 grid gap-3">
                    {visibleModules.map((module) => (
                      <ModuleCard key={module.id} module={module} active={selectedModule.id === module.id} onClick={() => setSelectedModuleId(module.id)} />
                    ))}
                    {visibleModules.length === 0 && (
                      <div className="rounded-lg border border-slate-200 bg-white px-4 py-12 text-center">
                        <p className="font-medium text-slate-900">Sonuç bulunamadı</p>
                        <p className="mt-1 text-sm text-slate-500">Aramayı veya filtreleri değiştir.</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-medium text-slate-500">Seçili modül</p>
                      <h3 className="mt-1 text-xl font-semibold leading-7">{selectedModule.title}</h3>
                    </div>
                    <PriorityBadge priority={selectedModule.priority} />
                  </div>

                  <p className="mt-4 text-sm leading-6 text-slate-600">{selectedModule.summary}</p>

                  <div className="mt-5 space-y-4">
                    <div>
                      <div className="mb-2 flex items-center justify-between text-sm">
                        <span className="text-slate-500">Risk önceliği</span>
                        <span className="font-semibold text-slate-950">{selectedModule.score}%</span>
                      </div>
                      <ScoreBar score={selectedModule.score} className={selectedModule.chart} />
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-2 gap-3 border-t border-slate-200 pt-5">
                    <div>
                      <p className="text-sm text-slate-500">Yaş</p>
                      <p className="mt-1 font-semibold">{selectedModule.age}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Üretim</p>
                      <p className="mt-1 font-semibold">{selectedModule.effort}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Format</p>
                      <p className="mt-1 font-semibold">{selectedModule.format}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Kanal</p>
                      <p className="mt-1 font-semibold">{selectedModule.channel}</p>
                    </div>
                  </div>

                  <div className="mt-6 border-t border-slate-200 pt-5">
                    <p className="text-sm font-semibold text-slate-950">Teslim edilecek parçalar</p>
                    <div className="mt-3 space-y-2">
                      {selectedModule.deliverables.map((item) => (
                        <div key={item} className="flex items-center gap-2 text-sm text-slate-600">
                          <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 border-t border-slate-200 pt-5">
                    <p className="text-sm font-semibold text-slate-950">İlk aksiyon</p>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{selectedModule.firstStep}</p>
                  </div>

                  <Button className="mt-6 w-full" onClick={() => setActiveTab("plan")}>
                    <CheckCircle2 className="h-4 w-4" />
                    Aile planına geç
                  </Button>
                </CardContent>
              </Card>
            </motion.section>
          )}

          {activeTab === "plan" && (
            <motion.section initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-6 grid gap-6 xl:grid-cols-[390px_minmax(0,1fr)]">
              <Card>
                <CardContent className="p-5 sm:p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-medium text-slate-500">Sprint 1</p>
                      <h2 className="mt-1 text-2xl font-semibold">Aile Güvenlik Kiti MVP</h2>
                    </div>
                    <span className="rounded-lg bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-800">{completionRate}%</span>
                  </div>
                  <p className="mt-3 leading-7 text-slate-600">
                    İlk paket; siber zorbalık müdahalesi, dijital ayak izi envanteri ve Family Link kurallarını tek aile dosyasında birleştirir.
                  </p>

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
                      <ListChecks className="h-5 w-5 text-slate-500" />
                      <h2 className="text-xl font-semibold">8 haftalık aile güvenliği yolu</h2>
                    </div>

                    <div className="grid gap-4 lg:grid-cols-3">
                      {roadmap.map((phase) => (
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
                        <h2 className="mt-1 text-2xl font-semibold">Önce acil protokolü ve Family Link temelini çıkar</h2>
                        <p className="mt-3 leading-7 text-slate-300">
                          İlk sürümde aileye hemen uygulanabilir üç şey ver: zorbalık kanıt şablonu, cihaz kural sayfası ve dijital ayak izi envanteri.
                        </p>
                      </div>
                      <Button variant="outline" className="border-white/20 bg-white text-slate-950 hover:bg-slate-100" onClick={() => setActiveTab("path")}>
                        <ArrowRight className="h-4 w-4" />
                        Modüllere dön
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
