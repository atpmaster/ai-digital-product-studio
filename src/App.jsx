import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Rocket,
  Target,
  BookOpen,
  ShieldCheck,
  Users,
  Bot,
  Globe2,
  Euro,
  CalendarDays,
  CheckCircle2,
  TrendingUp,
  Store,
  Video,
  Mail,
  Search,
  Filter,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const productTracks = [
  {
    key: "math",
    title: "AI Destekli Matematik Ürünleri",
    icon: BookOpen,
    score: 95,
    color: "from-blue-500 to-cyan-400",
    audience: "Öğrenciler, veliler, öğretmenler",
    formats: ["PDF", "Workbook", "Worksheet", "Prompt Pack"],
    examples: [
      "5. sınıf matematik çalışma paketi",
      "Abitur / Realschule sınav hazırlık PDF'leri",
      "AI worksheet generator prompt sistemi",
      "Veliler için evde matematik destek kiti",
    ],
    why: "Matematik öğretmenliği geçmişin ve AI üretim kabiliyetin doğrudan rekabet avantajı yaratıyor.",
  },
  {
    key: "parents",
    title: "Parent + AI Ürünleri",
    icon: Users,
    score: 84,
    color: "from-emerald-500 to-lime-400",
    audience: "Meşgul ebeveynler, aileler",
    formats: ["Printable", "PDF", "Planner", "Routine Kit"],
    examples: [
      "Çocuklar için ekran süresi yönetim sistemi",
      "Aile haftalık planlayıcı",
      "AI prompts for busy parents",
      "5 yaş çocuklar için öğrenme aktiviteleri",
    ],
    why: "3 çocuk babası olman bu kategoride otantik ve pratik ürünler üretmeni sağlar.",
  },
  {
    key: "ai",
    title: "AI Prompt / Productivity Sistemleri",
    icon: Bot,
    score: 88,
    color: "from-purple-500 to-fuchsia-400",
    audience: "Freelancerlar, öğretmenler, küçük işletmeler",
    formats: ["Prompt Pack", "Mini E-kitap", "Template", "Agent"],
    examples: [
      "German small business ChatGPT prompt pack",
      "Öğretmenler için AI ders planlama sistemi",
      "Etsy listing generator agent",
      "No-face YouTube içerik üretim sistemi",
    ],
    why: "Almanca, İngilizce ve Türkçe üretim yapabilmen pazarı genişletir.",
  },
  {
    key: "cyber",
    title: "Cybersecurity + AI Başlangıç Kitleri",
    icon: ShieldCheck,
    score: 76,
    color: "from-slate-700 to-slate-500",
    audience: "IT kariyerine başlamak isteyenler",
    formats: ["Roadmap PDF", "Checklist", "Prompt Kit", "Mini Course"],
    examples: [
      "Security+ sonrası SOC Analyst roadmap",
      "Cybersecurity beginner checklist",
      "AI prompts for cybersecurity learners",
      "Almanya'da IT kariyer başlangıç rehberi",
    ],
    why: "Security+ ve praktikum geçmişin bu alanda güvenilirlik sağlar; fakat ilk gelir için matematik kadar hızlı olmayabilir.",
  },
];

const phases = [
  {
    phase: "Faz 1",
    weeks: "1-2. Hafta",
    title: "Validation",
    goal: "3 küçük ürün çıkar, satış sinyali al.",
    tasks: ["1 Etsy printable", "1 Gumroad PDF", "1 prompt bundle", "Basit landing page"],
  },
  {
    phase: "Faz 2",
    weeks: "3-6. Hafta",
    title: "Expansion",
    goal: "Kazanan nişi büyüt ve ürün ailesi oluştur.",
    tasks: ["Bundle paketi", "SEO başlıkları", "Pinterest pinleri", "E-posta listesi"],
  },
  {
    phase: "Faz 3",
    weeks: "7-12. Hafta",
    title: "Authority",
    goal: "YouTube, X ve topluluk üzerinden güven inşa et.",
    tasks: ["No-face YouTube içerikleri", "Lead magnet", "Mini kurs", "AI agent demo"],
  },
];

const channels = [
  { name: "Etsy", icon: Store, role: "Printable, worksheet ve planner satışları", priority: "Yüksek" },
  { name: "Gumroad", icon: Euro, role: "PDF, e-kitap, prompt pack ve agent satışları", priority: "Yüksek" },
  { name: "Kendi Site", icon: Globe2, role: "Marka merkezi, blog, lead magnet, satış sayfaları", priority: "Orta" },
  { name: "YouTube", icon: Video, role: "No-face trafik ve otorite kanalı", priority: "Orta" },
  { name: "E-posta", icon: Mail, role: "Uzun vadeli müşteri ilişkisi", priority: "Orta" },
];

const firstMvp = [
  "Niş seç: Matematik + AI veya Parent + AI",
  "Tek problem belirle: örn. veliler çocuklarına nasıl pratik yaptıracak?",
  "20-40 sayfalık PDF/workbook üret",
  "Canva ile görsel tasarım yap",
  "Etsy + Gumroad'a yükle",
  "10 kısa içerikle tanıt",
  "7 gün veri topla: görüntülenme, favori, tıklama, satış",
];

function ScoreBar({ score }) {
  return (
    <div className="h-2 w-full rounded-full bg-slate-200 overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${score}%` }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="h-full rounded-full bg-slate-900"
      />
    </div>
  );
}

export default function AIDigitalProductStudioDashboard() {
  const [activeTrack, setActiveTrack] = useState("math");
  const [query, setQuery] = useState("");

  const selected = useMemo(
    () => productTracks.find((item) => item.key === activeTrack) || productTracks[0],
    [activeTrack]
  );

  const filteredTracks = productTracks.filter((track) =>
    `${track.title} ${track.audience} ${track.examples.join(" ")}`.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 text-slate-950">
      <section className="relative overflow-hidden px-6 py-10 md:px-12 lg:px-20">
        <div className="absolute inset-0 -z-10 opacity-30">
          <div className="absolute left-10 top-10 h-72 w-72 rounded-full bg-blue-200 blur-3xl" />
          <div className="absolute right-10 top-40 h-72 w-72 rounded-full bg-purple-200 blur-3xl" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-7xl"
        >
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border bg-white/80 px-4 py-2 text-sm shadow-sm backdrop-blur">
            <Sparkles className="h-4 w-4" />
            AI destekli dijital ürün stüdyosu · 90 günlük başlangıç planı
          </div>

          <div className="grid gap-8 lg:grid-cols-[1.25fr_0.75fr] lg:items-center">
            <div>
              <h1 className="max-w-4xl text-4xl font-bold tracking-tight md:text-6xl">
                Çok dilli dijital ürünlerle ilk anlamlı geliri oluşturma planı
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
                Hedef: matematik, ebeveynlik, AI araçları ve cybersecurity geçmişini birleştirerek Etsy, Gumroad, Skool, YouTube ve kendi web sitesi üzerinden ölçeklenebilir ürünler üretmek.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Button className="rounded-2xl px-5 py-6 text-base">
                  İlk MVP'yi Seç <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button variant="outline" className="rounded-2xl px-5 py-6 text-base">
                  Ürün Havuzunu Gör
                </Button>
              </div>
            </div>

            <Card className="rounded-3xl border-0 bg-slate-950 text-white shadow-2xl">
              <CardContent className="p-7">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-300">İlk 3 Ay Hedefi</p>
                    <h2 className="mt-1 text-4xl font-bold">300-500€ / ay</h2>
                  </div>
                  <Target className="h-10 w-10 text-cyan-300" />
                </div>
                <div className="mt-8 grid grid-cols-2 gap-4">
                  <div className="rounded-2xl bg-white/10 p-4">
                    <p className="text-sm text-slate-300">Günlük süre</p>
                    <p className="mt-1 text-xl font-semibold">2-3 saat</p>
                  </div>
                  <div className="rounded-2xl bg-white/10 p-4">
                    <p className="text-sm text-slate-300">Dil stratejisi</p>
                    <p className="mt-1 text-xl font-semibold">TR · EN · DE</p>
                  </div>
                  <div className="rounded-2xl bg-white/10 p-4">
                    <p className="text-sm text-slate-300">Üretim stili</p>
                    <p className="mt-1 text-xl font-semibold">No-face</p>
                  </div>
                  <div className="rounded-2xl bg-white/10 p-4">
                    <p className="text-sm text-slate-300">Ana format</p>
                    <p className="mt-1 text-xl font-semibold">PDF + Agent</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </section>

      <main className="mx-auto max-w-7xl px-6 pb-16 md:px-12 lg:px-20">
        <section className="grid gap-4 md:grid-cols-4">
          {[
            { label: "Başlangıç ürünü", value: "3 MVP", icon: Rocket },
            { label: "Ana pazarlar", value: "Etsy + Gumroad", icon: Store },
            { label: "İçerik motoru", value: "YouTube + X", icon: TrendingUp },
            { label: "Uzun vadeli varlık", value: "Kendi site", icon: Globe2 },
          ].map((item) => (
            <Card key={item.label} className="rounded-3xl border-0 shadow-sm">
              <CardContent className="flex items-center gap-4 p-5">
                <div className="rounded-2xl bg-slate-100 p-3">
                  <item.icon className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm text-slate-500">{item.label}</p>
                  <p className="font-semibold">{item.value}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </section>

        <section className="mt-10 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <Card className="rounded-3xl border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="mb-5 flex items-center justify-between gap-3">
                <div>
                  <h2 className="text-2xl font-bold">Ürün Yolları</h2>
                  <p className="mt-1 text-sm text-slate-500">Potansiyel nişleri puanlayıp seçiyoruz.</p>
                </div>
                <Filter className="h-5 w-5 text-slate-400" />
              </div>

              <div className="mb-5 flex items-center gap-2 rounded-2xl border bg-white px-3 py-2">
                <Search className="h-4 w-4 text-slate-400" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Niş veya ürün ara..."
                  className="w-full bg-transparent text-sm outline-none"
                />
              </div>

              <div className="space-y-3">
                {filteredTracks.map((track) => (
                  <button
                    key={track.key}
                    onClick={() => setActiveTrack(track.key)}
                    className={`w-full rounded-2xl border p-4 text-left transition hover:bg-slate-50 ${
                      activeTrack === track.key ? "border-slate-900 bg-slate-50" : "border-slate-200 bg-white"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`rounded-2xl bg-gradient-to-br ${track.color} p-3 text-white`}>
                        <track.icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between gap-3">
                          <p className="font-semibold">{track.title}</p>
                          <span className="text-sm font-bold">{track.score}</span>
                        </div>
                        <div className="mt-2">
                          <ScoreBar score={track.score} />
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          <motion.div key={selected.key} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="h-full rounded-3xl border-0 shadow-sm">
              <CardContent className="p-7">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-slate-500">Seçili strateji</p>
                    <h2 className="mt-1 text-3xl font-bold">{selected.title}</h2>
                  </div>
                  <div className={`rounded-3xl bg-gradient-to-br ${selected.color} p-4 text-white`}>
                    <selected.icon className="h-8 w-8" />
                  </div>
                </div>

                <p className="mt-5 rounded-2xl bg-slate-50 p-4 leading-7 text-slate-700">{selected.why}</p>

                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  <div>
                    <h3 className="font-semibold">Hedef kitle</h3>
                    <p className="mt-2 text-slate-600">{selected.audience}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold">Formatlar</h3>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {selected.formats.map((format) => (
                        <span key={format} className="rounded-full bg-slate-100 px-3 py-1 text-sm">
                          {format}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-7">
                  <h3 className="font-semibold">Ürün fikirleri</h3>
                  <div className="mt-3 grid gap-3 md:grid-cols-2">
                    {selected.examples.map((example) => (
                      <div key={example} className="flex gap-3 rounded-2xl border bg-white p-4">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" />
                        <p className="text-sm leading-6">{example}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </section>

        <section className="mt-10">
          <div className="mb-5 flex items-center gap-3">
            <CalendarDays className="h-6 w-6" />
            <h2 className="text-2xl font-bold">90 Günlük Yol Haritası</h2>
          </div>
          <div className="grid gap-5 lg:grid-cols-3">
            {phases.map((phase, index) => (
              <Card key={phase.phase} className="rounded-3xl border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="mb-5 flex items-center justify-between">
                    <span className="rounded-full bg-slate-900 px-3 py-1 text-sm font-medium text-white">{phase.phase}</span>
                    <span className="text-sm text-slate-500">{phase.weeks}</span>
                  </div>
                  <h3 className="text-xl font-bold">{phase.title}</h3>
                  <p className="mt-2 min-h-[52px] text-slate-600">{phase.goal}</p>
                  <div className="mt-5 space-y-3">
                    {phase.tasks.map((task) => (
                      <div key={task} className="flex items-center gap-2 text-sm">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-xs font-bold">
                          {index + 1}
                        </div>
                        {task}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="mt-10 grid gap-6 lg:grid-cols-[1fr_0.9fr]">
          <Card className="rounded-3xl border-0 shadow-sm">
            <CardContent className="p-7">
              <h2 className="text-2xl font-bold">İlk MVP Üretim Akışı</h2>
              <p className="mt-2 text-slate-600">İlk amaç mükemmel ürün değil; hızlı satış sinyali almak.</p>
              <div className="mt-6 space-y-4">
                {firstMvp.map((step, index) => (
                  <div key={step} className="flex gap-4">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-slate-900 text-sm font-bold text-white">
                      {index + 1}
                    </div>
                    <div className="rounded-2xl border bg-white p-4 flex-1">
                      <p className="font-medium">{step}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border-0 bg-gradient-to-br from-slate-900 to-slate-700 text-white shadow-sm">
            <CardContent className="p-7">
              <h2 className="text-2xl font-bold">Satış Kanalları</h2>
              <p className="mt-2 text-slate-300">Her kanalın rolü farklı; ilk aşamada hepsini aynı anda zorlamıyoruz.</p>
              <div className="mt-6 space-y-4">
                {channels.map((channel) => (
                  <div key={channel.name} className="rounded-2xl bg-white/10 p-4">
                    <div className="flex items-center gap-3">
                      <channel.icon className="h-5 w-5 text-cyan-300" />
                      <div className="flex-1">
                        <div className="flex items-center justify-between gap-3">
                          <p className="font-semibold">{channel.name}</p>
                          <span className="rounded-full bg-white/10 px-2 py-1 text-xs">{channel.priority}</span>
                        </div>
                        <p className="mt-1 text-sm text-slate-300">{channel.role}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="mt-10 rounded-3xl bg-white p-7 shadow-sm">
          <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <h2 className="text-2xl font-bold">Bir Sonraki Karar</h2>
              <p className="mt-2 leading-7 text-slate-600">
                Şimdi bu dashboard'u canlı bir proje merkezine çevirebiliriz. İlk geliştirme adımı: seçilen niş için ürün validasyon tablosu, fiyatlandırma, SEO başlıkları ve haftalık görev takip sistemi eklemek.
              </p>
            </div>
            <div className="grid gap-3 md:grid-cols-3">
              {["Niş seçimi", "İlk ürün brief'i", "Satış sayfası"].map((item) => (
                <div key={item} className="rounded-2xl border bg-slate-50 p-4 text-center font-semibold">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>
              <section className="mt-10">
          <div className="mb-5 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold">Product Validation Board</h2>
              <p className="mt-1 text-slate-600">
                İlk gelir için ürün fikirlerini veri odaklı filtreliyoruz.
              </p>
            </div>
            <div className="rounded-2xl bg-slate-900 px-4 py-2 text-sm font-medium text-white">
              Sprint 1
            </div>
          </div>

          <div className="overflow-hidden rounded-3xl border bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="bg-slate-100 text-left text-slate-700">
                  <tr>
                    <th className="px-5 py-4 font-semibold">Ürün</th>
                    <th className="px-5 py-4 font-semibold">Kategori</th>
                    <th className="px-5 py-4 font-semibold">Dil</th>
                    <th className="px-5 py-4 font-semibold">Talep</th>
                    <th className="px-5 py-4 font-semibold">Rekabet</th>
                    <th className="px-5 py-4 font-semibold">Üretim Hızı</th>
                    <th className="px-5 py-4 font-semibold">Gelir Pot.</th>
                    <th className="px-5 py-4 font-semibold">Platform</th>
                    <th className="px-5 py-4 font-semibold">Durum</th>
                  </tr>
                </thead>

                <tbody>
                  {[
                    {
                      product: "5th Grade Math Workbook",
                      category: "Math + AI",
                      lang: "EN",
                      demand: "9/10",
                      competition: "5/10",
                      speed: "8/10",
                      revenue: "8/10",
                      platform: "Etsy",
                      status: "Priority",
                    },
                    {
                      product: "German Teacher AI Prompt Pack",
                      category: "AI Productivity",
                      lang: "DE",
                      demand: "8/10",
                      competition: "4/10",
                      speed: "9/10",
                      revenue: "7/10",
                      platform: "Gumroad",
                      status: "Fast MVP",
                    },
                    {
                      product: "Kids Routine Printable System",
                      category: "Parents",
                      lang: "TR/EN",
                      demand: "7/10",
                      competition: "6/10",
                      speed: "8/10",
                      revenue: "7/10",
                      platform: "Etsy",
                      status: "Test",
                    },
                    {
                      product: "Cybersecurity AI Starter Kit",
                      category: "Cybersecurity",
                      lang: "EN",
                      demand: "6/10",
                      competition: "7/10",
                      speed: "6/10",
                      revenue: "8/10",
                      platform: "Gumroad",
                      status: "Phase 2",
                    },
                  ].map((item) => (
                    <tr key={item.product} className="border-t hover:bg-slate-50">
                      <td className="px-5 py-4 font-medium">{item.product}</td>
                      <td className="px-5 py-4">{item.category}</td>
                      <td className="px-5 py-4">{item.lang}</td>
                      <td className="px-5 py-4">{item.demand}</td>
                      <td className="px-5 py-4">{item.competition}</td>
                      <td className="px-5 py-4">{item.speed}</td>
                      <td className="px-5 py-4">{item.revenue}</td>
                      <td className="px-5 py-4">{item.platform}</td>
                      <td className="px-5 py-4">
                        <span className="rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white">
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
