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
  GraduationCap,
  HelpCircle,
  BookOpen,
  LogOut,
  X,
  PlayCircle,
  Tv,
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
  { id: "ages", label: "Yaş İçerikleri", shortLabel: "Yaş", icon: Users },
  { id: "quizzes", label: "Bilinç Testleri", shortLabel: "Test", icon: GraduationCap },
  { id: "guides", label: "Güvenlik Rehberleri", shortLabel: "Rehber", icon: BookOpen },
  { id: "videos", label: "Siber TV / Akademi", shortLabel: "TV", icon: Tv },
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
    minTechLevel: "basic",
    suggestedForWorkStyle: ["desk", "field", "flexible"],
    stepsByTechLevel: {
      basic: "Çocukla sakin bir konuşma yapın, ekran görüntüsü alın ve durumu okul rehberlik servisine bildirin.",
      intermediate: "Uygulama içi şikayet mekanizmasını çalıştırın, zorbalık yapan hesabı engelleyin ve delilleri e-posta ile arşivleyin.",
      advanced: "Zorba hesapların IP/meta-verilerini analiz edin, mesaj loglarını kriptografik zaman damgasıyla mühürleyip resmi bilişim suçları ihbar kanallarından bildirin."
    }
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
    minTechLevel: "intermediate",
    suggestedForWorkStyle: ["desk", "flexible"],
    stepsByTechLevel: {
      basic: "Çocuğun kullandığı tarayıcı geçmişini temizleyin ve sosyal medya hesaplarını birlikte inceleyip eski fotoğrafları kaldırın.",
      intermediate: "Google arama sonuçlarından ad-soyad temizleme formunu doldurun ve kullanılmayan eski oyun/web üyeliklerini silin.",
      advanced: "Çocuğun adına açılmış sahte hesapları tespit etmek için otomatik OSINT (açık kaynak istihbaratı) araçları çalıştırın ve veri koruma kanunu (KVKK) kapsamında resmi silme talepleri gönderin."
    }
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
    minTechLevel: "intermediate",
    suggestedForWorkStyle: ["field", "desk", "flexible"],
    stepsByTechLevel: {
      basic: "Cihazı geceleri ortak alanda şarj etme kuralı koyun ve ekran süresini saatle takip edin.",
      intermediate: "Google Family Link veya Apple Aile Paylaşımı uygulamasını kurarak günlük ekran sınırı ve uygulama indirme onayı tanımlayın.",
      advanced: "Cihazlarda özel DNS profilleri tanımlayarak uygulama mağazası dışı APK indirmelerini engelleyin ve MDM (Mobil Cihaz Yönetimi) profili oluşturun."
    }
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
    minTechLevel: "basic",
    suggestedForWorkStyle: ["desk", "flexible"],
    stepsByTechLevel: {
      basic: "Çocuğun sosyal medya hesaplarını gizli profile getirin ve sadece tanıdığı kişileri arkadaş olarak eklemesini sağlayın.",
      intermediate: "Etiketleme, konum ekleme, mesaj alma ve yorum yapma izinlerini sadece çift taraflı takipçilere/arkadaşlara sınırlandırın.",
      advanced: "Sosyal medya API'leri üzerinden veri sızıntılarını kontrol edin, iki aşamalı doğrulamayı (2FA) donanımsal güvenlik anahtarlarıyla (Yubikey) kurun."
    }
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
    minTechLevel: "basic",
    suggestedForWorkStyle: ["field", "flexible"],
    stepsByTechLevel: {
      basic: "Çocuğun oyun oynadığı odayı ortak yaşam alanı olarak seçin ve kulaklık yerine hoparlör kullanmasını isteyin.",
      intermediate: "Roblox, Discord ve Steam gibi platformlarda sesli/yazılı sohbeti kapatın veya sadece onaylı arkadaşlarla sınırlandırın.",
      advanced: "Discord web-hook'ları veya ağ paket analizörleri kullanarak çocuğun oyun içi sohbetlerde maruz kaldığı bağlantıları ve dosyaları filtreleyin."
    }
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
    minTechLevel: "basic",
    suggestedForWorkStyle: ["desk", "field", "flexible"],
    stepsByTechLevel: {
      basic: "İnternet bağlantısını kesin, çocuğa güvende olduğunu hissettirin ve durumu okul rehberlik öğretmeni ile paylaşın.",
      intermediate: "Siber suçlar ihbar hattına bildirim yapın ve ele geçirilen hesapların şifre sıfırlama akışlarını başlatın.",
      advanced: "Etkilenen cihazlarda RAM imajı ve ağ trafik loglarını (PCAP) yedekleyin, adli bilişim analizi için disk imajını güvenli bir yere kopyalayın."
    }
  },
  {
    id: "network-filter",
    title: "Ev Tipi Ağ Filtreleme (NextDNS / Pi-hole)",
    shortTitle: "Ağ filtreleme",
    icon: LockKeyhole,
    age: "Tüm yaşlar",
    priority: "Öncelik",
    score: 89,
    effort: "1 gün",
    format: "Kurulum rehberi",
    channel: "Modem ayarı",
    accent: "bg-indigo-50 text-indigo-700 ring-indigo-200",
    iconAccent: "bg-indigo-600 text-white",
    chart: "bg-indigo-500",
    summary: "Evdeki tüm cihazların internet trafiğini modem seviyesinde süzerek reklamları, takipçileri ve zararlı içerikleri otomatik engeller.",
    deliverables: ["NextDNS profil şablonu", "Pi-hole Raspberry Pi kurulum rehberi", "Ortak blocklist listesi", "Ebeveyn kontrol DNS profili"],
    firstStep: "NextDNS üzerinde ücretsiz hesap oluşturup ev ağınız için ebeveyn koruma filtresi tanımlayın.",
    minTechLevel: "advanced",
    suggestedForWorkStyle: ["desk"],
    stepsByTechLevel: {
      basic: "İnternet sağlayıcınızın (TTNET, Turkcell vb.) ücretsiz sunduğu Güvenli İnternet Aile Profilini aktif edin.",
      intermediate: "Evdeki modemin arayüzüne girerek DNS adreslerini temiz ve güvenli DNS servisleri (Cloudflare Aile DNS veya AdGuard DNS) ile değiştirin.",
      advanced: "Ev ağınız için Pi-hole sunucusu kurun veya NextDNS profilini modeminize DoT/DoH (DNS over TLS/HTTPS) protokolüyle entegre edin."
    }
  }
];

const ageFilters = ["Tüm yaşlar", "6-12", "8-14", "10-16", "13-16"];
const priorityFilters = ["Tümü", "Acil", "Öncelik", "Rutin", "Rehber"];

const sortOptions = [
  { key: "dynamicScore", label: "Profil eşleşme skoru" },
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
  { id: "age-map", label: "Yaş grubu içerik haritasını çıkar", detail: "3-5, 6-8, 9-11, 12-14 ve 15-17 için ayrı çıktı planı." },
  { id: "template", label: "İlk kontrol listesini üret", detail: "Siber zorbalık kanıt toplama ve ilk 24 saat adımları." },
  { id: "familylink", label: "Family Link sayfasını hazırla", detail: "Ekran süresi, uygulama izni ve uyku saati kuralları." },
  { id: "footprint", label: "Dijital ayak izi envanteri", detail: "Eski hesaplar, açık profiller ve silme talepleri için takip tablosu." },
  { id: "age-samples", label: "Her yaş için örnek sayfa üret", detail: "Bir ebeveyn sayfası, bir çocuk etkinliği ve bir kontrol listesi." },
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

const ageContentRoadmaps = [
  {
    id: "3-5",
    range: "3-5",
    title: "İlk ekran alışkanlıkları",
    icon: Smartphone,
    score: 74,
    focus: "Ekran rutini, ebeveyn eşliği ve güvenli içerik seçimi.",
    parentPromise: "Ekranı tek başına bırakılan bir ödül değil, birlikte kullanılan sınırlı bir araç haline getirir.",
    childOutcome: "Çocuk ekranın ne zaman başlayıp biteceğini basit rutinlerle öğrenir.",
    products: ["Ekran zamanı kartları", "Uyku öncesi ekran kapatma rutini", "Güvenli video listesi", "Aile ekran sözleşmesi"],
    contentFormats: ["Printable kart", "Ebeveyn mini rehberi", "Günlük rutin çizelgesi"],
    roadmap: [
      { week: "Hafta 1", goal: "Ekran başlangıç ve bitiş rutinini kur", output: "3 kartlık görsel rutin seti" },
      { week: "Hafta 2", goal: "İçerik seçimini ebeveyn kontrolüne bağla", output: "Güvenli içerik kontrol listesi" },
      { week: "Hafta 3", goal: "Ekransız alternatifleri görünür yap", output: "20 aktivitelik aile kartı" },
    ],
  },
  {
    id: "6-8",
    range: "6-8",
    title: "İlk cihaz ve Family Link",
    icon: Smartphone,
    score: 88,
    focus: "Family Link, uygulama onayı, ekran süresi ve basit mahremiyet dili.",
    parentPromise: "İlk cihaz kullanımında sınırları tartışma yerine net bir sistemle yönetir.",
    childOutcome: "Çocuk izin istemeyi, yabancı bağlantıları ve özel bilgiyi paylaşmamayı öğrenir.",
    products: ["Family Link kurulum rehberi", "Uygulama izin kartları", "Ekran süresi anlaşması", "Özel bilgi paylaşma posteri"],
    contentFormats: ["Kurulum checklist", "Aile anlaşması", "Çocuk dilinde poster"],
    roadmap: [
      { week: "Hafta 1", goal: "Family Link ve temel cihaz kurallarını ayarla", output: "Kurulum kontrol listesi" },
      { week: "Hafta 2", goal: "Uygulama indirme ve satın alma iznini netleştir", output: "Uygulama izin matrisi" },
      { week: "Hafta 3", goal: "Özel bilgi paylaşımı için çocuk dili geliştir", output: "Paylaşma/paylaşma kartları" },
    ],
  },
  {
    id: "9-11",
    range: "9-11",
    title: "Oyun, sohbet ve yabancı riski",
    icon: Gamepad2,
    score: 86,
    focus: "Oyun içi sohbet, arkadaş ekleme, hediye dolandırıcılığı ve güvenli profil.",
    parentPromise: "Oyunları yasaklamak yerine risk seviyesine göre izin ve takip düzeni kurar.",
    childOutcome: "Çocuk yabancı mesajları ve manipülatif oyun tekliflerini ayırt eder.",
    products: ["Oyun risk puanlama tablosu", "Yabancı mesaj senaryoları", "Güvenli profil checklist", "Haftalık oyun kontrol sayfası"],
    contentFormats: ["Worksheet", "Rol yapma senaryosu", "Haftalık takip tablosu"],
    roadmap: [
      { week: "Hafta 1", goal: "Oynanan oyunların sohbet ve satın alma riskini çıkar", output: "Oyun izin matrisi" },
      { week: "Hafta 2", goal: "Yabancı mesaj ve hediye dolandırıcılığı konuşmasını yap", output: "5 konuşma senaryosu" },
      { week: "Hafta 3", goal: "Profil, kullanıcı adı ve arkadaş listesi güvenliğini kontrol et", output: "Profil güvenliği checklist" },
    ],
  },
  {
    id: "12-14",
    range: "12-14",
    title: "Sosyal medya ve siber zorbalık",
    icon: MessageSquareWarning,
    score: 96,
    focus: "Siber zorbalık, grup sohbetleri, ekran görüntüsü kanıtı, gizlilik ve aileye haber verme.",
    parentPromise: "Kriz anında panik yerine kanıt, destek ve bildirim adımlarını sıraya koyar.",
    childOutcome: "Çocuk zorbalık yaşadığında utanmadan yardım istemeyi ve kanıt saklamayı bilir.",
    products: ["Siber zorbalık müdahale akışı", "Grup sohbeti güvenlik rehberi", "Kanıt toplama şablonu", "Okul görüşme notu"],
    contentFormats: ["Acil protokol", "Ebeveyn rehberi", "Çocuk konuşma kartı"],
    roadmap: [
      { week: "Hafta 1", goal: "Siber zorbalığı tanıma ve kanıt saklama sistemini kur", output: "Kanıt toplama şablonu" },
      { week: "Hafta 2", goal: "Sosyal medya gizlilik ayarlarını kilitle", output: "Platform bazlı gizlilik kartları" },
      { week: "Hafta 3", goal: "Okul, platform ve aile bildirim sırasını belirle", output: "İlk 24 saat müdahale planı" },
    ],
  },
  {
    id: "15-17",
    range: "15-17",
    title: "Dijital ayak izi ve itibar",
    icon: Fingerprint,
    score: 91,
    focus: "Eski hesaplar, açık profiller, fotoğraf izinleri, arama sonuçları ve gelecek itibarı.",
    parentPromise: "Genci kontrol etmek yerine dijital itibarını yönetebilen bağımsız bir birey olmaya hazırlar.",
    childOutcome: "Genç, hangi içeriklerin kalıcı iz bıraktığını ve nasıl temizleneceğini bilir.",
    products: ["Dijital ayak izi envanteri", "Eski hesap silme planı", "Profil temizlik checklist", "Paylaşmadan önce karar ağacı"],
    contentFormats: ["30 günlük plan", "Notion/Sheet takip tablosu", "Genç rehberi"],
    roadmap: [
      { week: "Hafta 1", goal: "Tüm hesap ve görünür profil envanterini çıkar", output: "Hesap envanteri tablosu" },
      { week: "Hafta 2", goal: "Eski hesapları kapat veya gizlilik seviyesini yükselt", output: "Silme talebi şablonları" },
      { week: "Hafta 3", goal: "Gelecek okul/iş başvuruları için dijital itibar kontrolü yap", output: "Paylaşım karar ağacı" },
    ],
  },
];

const parentQuizQuestions = [
  {
    id: 1,
    scenario: "Çocuğunuzun son zamanlarda cihazını sizden gizlediğini ve ekran başındayken aşırı gergin veya üzgün olduğunu fark ettiniz. İlk yapılması gereken nedir?",
    icon: ShieldAlert,
    options: [
      { key: "A", text: "Önemsiz bir ergenlik dönemi davranışıdır, görmezden gelirim." },
      { key: "B", text: "Cihazı hemen elinden alır ve ceza olarak interneti kapatırım." },
      { key: "C", text: "Siber zorbalığa maruz kalıyor veya uygunsuz bir içeriğe denk gelmiş olabileceğinden şüphelenip onunla sakin bir güven konuşması yaparım.", isCorrect: true }
    ],
    explainer: "Çocukların ekrandayken gerilmesi ve cihaz kaçırması siber zorbalık veya tacizin en net göstergelerindendir. Tepkisel değil, güven verici yaklaşmak çocuğun durumu sizinle paylaşmasını kolaylaştırır."
  },
  {
    id: 2,
    scenario: "Çocuğunuz sosyal medyada birinin kendisini tehdit ettiğini veya uygunsuz fotoğraflarını paylaştığını söyledi. Hukuki süreç için kanıtları nasıl saklamalısınız?",
    icon: ClipboardList,
    options: [
      { key: "A", text: "Tüm mesajları ve platformu hemen kapatıp silerim." },
      { key: "B", text: "Ekran görüntülerini platform ismi, tarih, saat ve profil bağlantıları (URL) görünecek şekilde kaydederim.", isCorrect: true },
      { key: "C", text: "Kanıt saklamaya gerek yoktur, sadece kişiyi engellerim." }
    ],
    explainer: "Siber zorbalıkta hukuki şikayetlerin geçerli olabilmesi için platform bilgisi, gönderici profil ID'si, tarih ve saat içeren ekran görüntülerinin silinmeden saklanması kritiktir."
  },
  {
    id: 3,
    scenario: "Family Link veya Apple Ekran Süresi gibi ebeveyn denetim araçlarını kurarken en sağlıklı yaklaşım hangisidir?",
    icon: Smartphone,
    options: [
      { key: "A", text: "Uygulamayı çocuğa haber vermeden kurup gizlice izlemek." },
      { key: "B", text: "Kuralları ve süreleri çocukla birlikte tartışarak, ortak bir 'Ekran Süresi Anlaşması' imzalayarak şeffafça kurmak.", isCorrect: true },
      { key: "C", text: "Cihazdaki tüm interneti süresiz olarak kilitlemek." }
    ],
    explainer: "Dijital ebeveynlikte şeffaflık güven yaratır. Gizlice izleme veya katı yasaklar, çocukların alternatif ve güvensiz yollara (gizli cihazlar, VPN vb.) yönelmesine sebep olur."
  },
  {
    id: 4,
    scenario: "Ev ağınızın genel güvenliğini artırmak ve çocuğunuzun tüm cihazlardan zararlı/yetişkin sitelere girmesini engellemek için en teknik ve profesyonel çözüm nedir?",
    icon: LockKeyhole,
    options: [
      { key: "A", text: "Antivirüs programı kurmak." },
      { key: "B", text: "Modemin DNS adreslerini ebeveyn kontrollü güvenli DNS (NextDNS/Cloudflare Aile) ile değiştirmek veya Pi-hole kurmak.", isCorrect: true },
      { key: "C", text: "Sadece Google Güvenli Arama seçeneğini aktif etmek." }
    ],
    explainer: "Modem veya DNS seviyesinde filtreleme yapmak, ev ağındaki tüm cihazların (TV, tablet, telefon) zararlı içeriklere erişimini tek bir merkezden ve cihaz bağımsız olarak engellemenin en etkili yoludur."
  },
  {
    id: 5,
    scenario: "Çocuğunuzun oynadığı çevrimiçi bir oyunda (Roblox, Discord vb.) yabancı bir kullanıcının ona ücretsiz oyun içi para (Robux vb.) hediye etmek istediğini öğrendiniz. Yaklaşımınız ne olmalıdır?",
    icon: Gamepad2,
    options: [
      { key: "A", text: "Hediye olduğu için kabul etmesine izin veririm." },
      { key: "B", text: "Çevrimiçi oyunlardaki bu tür tekliflerin hesap çalma veya kötü niyetli yaklaşım (grooming) başlangıcı olabileceğini anlatıp sohbeti kesmesini isterim.", isCorrect: true },
      { key: "C", text: "Oyunu bilgisayardan tamamen silerim." }
    ],
    explainer: "Kötü niyetli kişiler, çocukların güvenini kazanmak için oyun içi hediyeleri (skin, para vb.) yem olarak kullanırlar. Çocuğa bu tip manipülasyonları fark etme bilinci aşılanmalıdır."
  }
];

const childQuizQuestions = [
  {
    id: 1,
    scenario: "Çevrimiçi bir oyunda oynarken tanımadığın biri sana 'Karakterini çok sevdim, şifreni verirsen sana bedava elmas yükleyebilirim' dedi. Ne yapmalısın?",
    icon: Gamepad2,
    options: [
      { key: "A", text: "Hemen şifremi verip elmasları beklerim." },
      { key: "B", text: "'Şifrem sadece bana ve aileme özeldir' deyip teklifi reddederim ve durumu ebeveynime haber veririm.", isCorrect: true },
      { key: "C", text: "Şifremi veririm ama hemen ardından değiştiririm." }
    ],
    explainer: "Şifreler ve kişisel bilgiler asla kimseyle paylaşılmamalıdır. Bedava elmas veya para teklifleri genellikle hesap hırsızlığı tuzaklarıdır!"
  },
  {
    id: 2,
    scenario: "Bir grup sohbetinde veya sosyal medyada bir arkadaşının seninle dalga geçtiğini, üzücü mesajlar veya fotoğraflar paylaştığını gördün. İlk yapman gereken nedir?",
    icon: MessageSquareWarning,
    options: [
      { key: "A", text: "Ben de ona daha kötü sözler söyleyerek karşılık veririm." },
      { key: "B", text: "Mesajların ekran görüntüsünü alır, o kişiyi engeller ve durumu güvendiğim bir yetişkine (anne, baba veya öğretmen) söylerim.", isCorrect: true },
      { key: "C", text: "Utanıp ağlarım ve bilgisayarı kapatıp kimseye bir şey demem." }
    ],
    explainer: "Siber zorbalıkla karşılaştığında asla sessiz kalmamalı veya aynı şekilde yanıt vermemelisin. Kanıtı saklayıp güvendiğin bir yetişkine söylemek en siber kahramanca adımdır."
  },
  {
    id: 3,
    scenario: "Yeni bir oyun indirmek istiyorsun ama ekranda aniden 'Tebrikler! 1 Milyonuncu ziyaretçimiz oldunuz, hemen buraya tıkla ve telefon numaranı yaz' diye bir kutu çıktı. Ne yapmalısın?",
    icon: AlertTriangle,
    options: [
      { key: "A", text: "Hemen telefon numaramı yazarım ki ödülü kaçırmayayım." },
      { key: "B", text: "Bu tip kutuların virüs bulaştırmak veya fatura çıkartmak için tasarlanmış birer tuzak olduğunu bilip tıklamadan kapatırım.", isCorrect: true },
      { key: "C", text: "Arkadaşıma gönderirim, o tıklasın." }
    ],
    explainer: "İnternette 'Bedava ödül kazandınız' diyen pencereler veya pop-up'lar çoğunlukla virüs bulaştırma ya da üyelik dolandırıcılığı amaçlıdır."
  },
  {
    id: 4,
    scenario: "İnternette harika bir oyun oynarken veya video izlerken bir yabancı sana adını, soyadını, hangi okulda okuduğunu veya ev adresini sordu. Ne yapmalısın?",
    icon: Smartphone,
    options: [
      { key: "A", text: "Arkadaş olmak istediği için okul adımı ve adımı söylerim." },
      { key: "B", text: "'İnternette özel bilgilerimi yabancılarla paylaşamam' diyerek paylaşımı reddeder ve aileme bildiririm.", isCorrect: true },
      { key: "C", text: "Uydurma bir okul ve adres yazarım." }
    ],
    explainer: "Gerçek hayatta yabancılara adresimizi vermediğimiz gibi internette de kişisel bilgilerimizi (okul, adres, ad soyad) paylaşmamalıyız."
  },
  {
    id: 5,
    scenario: "İnternette yanlışlıkla korkutucu veya seni çok rahatsız eden bir resim ya da video ile karşılaştın. Ne yapmalısın?",
    icon: ShieldAlert,
    options: [
      { key: "A", text: "Kendimi suçlu hissedip kimseye söylemem ve içime kapanırım." },
      { key: "B", text: "Ekranı kapatırım ve hemen ebeveynime gidip 'Böyle bir şey gördüm ve beni çok rahatsız etti' diyerek paylaşırım.", isCorrect: true },
      { key: "C", text: "Merak edip izlemeye devam ederim." }
    ],
    explainer: "İnternette rahatsız edici içeriklerle karşılaşmak senin suçun değildir. Bunu ailene söylemek korkunu azaltır ve cihazı daha güvenli hale getirmelerine yardım eder."
  }
];

const safetyGuidesData = [
  {
    id: "3-5",
    age: "3-5",
    title: "İlk Ekran Alışkanlıkları Rehberi",
    color: "from-emerald-500 to-teal-600 bg-emerald-50/50 text-emerald-900 border-emerald-200",
    icon: Smartphone,
    summary: "Okul öncesi dönemdeki çocuklar için sağlıklı ekran alışkanlıkları ve ebeveyn eşliğinde güvenli teknoloji kullanımı rehberi.",
    parentTips: [
      "Ekran süresini günlük maksimum 30-45 dakika ile sınırlayın.",
      "Cihazı yalnız başına bırakılan bir 'bakıcı' değil, birlikte etkileşim kurulan interaktif bir araç olarak kullanın.",
      "Yemek saatlerini ve uykudan önceki 1 saati tamamen ekransız bölge ilan edin.",
      "Sadece sizin onayladığınız çocuk dostu, reklamsız uygulamaları ve video listelerini (YT Kids vb.) açın."
    ],
    childRules: [
      "Tablet veya telefon kullanmak istediğimde önce anneme veya babama sorarım.",
      "Süre dolduğunda cihazı güler yüzle kapatır ve yerine koyarım.",
      "Ekranda bilmediğim veya korkutucu bir şey çıkarsa hemen aileme gösteririm."
    ],
    agreement: "Biz bir aileyiz! Ekran saatlerimizi birlikte planlar, göz sağlığımızı korur ve ekransız fiziksel oyunlara (resim yapma, boyama, yapboz vb.) her gün bolca vakit ayırırız."
  },
  {
    id: "6-8",
    age: "6-8",
    title: "İlk Cihaz ve Temel Mahremiyet Kılavuzu",
    color: "from-cyan-500 to-blue-600 bg-cyan-50/50 text-cyan-900 border-cyan-200",
    icon: ShieldCheck,
    summary: "İlkokul çağındaki çocuklar için Family Link cihaz sınırları ve ilk dijital mahremiyet kuralları rehberi.",
    parentTips: [
      "Google Family Link uygulamasını kurup indirme onayı ve uyku saati kilidi tanımlayın.",
      "Çocuğun cihaz kullanımını fiziksel olarak gözlemleyebileceğiniz ortak alanlarda (salon vb.) yapmasını sağlayın.",
      "Ev ağınızda modem seviyesinde Güvenli İnternet veya Aile Filtre profillerini aktif edin.",
      "Çocuğunuza yabancılardan gelen arkadaşlık veya oyun davetlerini reddetmesi gerektiğini uygulamalı gösterin."
    ],
    childRules: [
      "Yeni bir oyun veya uygulama indirmeden önce mutlaka ailemden onay alırım.",
      "İnternette karşılaştığım yabancılara adımı, okulumu, fotoğrafımı veya ev adresimi asla söylemem.",
      "Ekrandayken beni üzen veya şaşırtan bir şey olursa korkmadan hemen aileme haber veririm."
    ],
    agreement: "İnternet dünyasını keşfederken sınırlarımızı biliriz! Aile cihaz kurallarına saygı duyar, dijital mahremiyetimizi korur ve güvenliğimizi her şeyin önünde tutarız."
  },
  {
    id: "9-11",
    age: "9-11",
    title: "Oyun, Çevrimiçi Sohbet ve Dolandırıcılık Kılavuzu",
    color: "from-amber-500 to-orange-600 bg-amber-50/50 text-amber-900 border-amber-200",
    icon: Gamepad2,
    summary: "Çevrimiçi oyunlar (Roblox, Minecraft vb.), Discord kanalları, arkadaş ekleme ve bedava oyun içi para dolandırıcılıklarından korunma rehberi.",
    parentTips: [
      "Çocuğun oynadığı oyunlardaki sohbet izinlerini kısıtlayın ve yabancılarla birebir konuşmalarını engelleyin.",
      "Oyun içi hediye veya bedava para (Robux, V-Bucks vb.) tekliflerinin kimlik/hesap hırsızlığı tuzuğı olduğunu öğretin.",
      "Çocuğunuzun takma adlarında (kullanıcı adlarında) gerçek adını, soyadını veya doğum yılını kullanmamasını sağlayın.",
      "Haftalık olarak oynadığı oyunları ve arkadaş listesini birlikte gözden geçirme rutini oluşturun."
    ],
    childRules: [
      "Oyunlarda tanımadığım birinin bana ücretsiz hediye veya oyun parası verme tekliflerini hemen reddederim.",
      "Şifremi en yakın arkadaşım dahil hiç kimseyle paylaşmam, şifremin sadece aileme özel olduğunu bilirim.",
      "Oyun içi sohbetlerde birisi canımı sıkacak veya beni korkutacak bir şey yazarsa onu engeller ve aileme söylerim."
    ],
    agreement: "Çevrimiçi oyunlarda adil ve güvende kalırız! Yabancılarla oyun içi sohbet etmeyiz, bedava hediyelere inanmayız ve şifremizi bir sır gibi saklarız."
  },
  {
    id: "12-14",
    age: "12-14",
    title: "Sosyal Medya ve Siber Zorbalıkla Mücadele Kılavuzu",
    color: "from-rose-500 to-red-600 bg-rose-50/50 text-rose-900 border-rose-200",
    icon: MessageSquareWarning,
    summary: "Sosyal medya platformları (Instagram, TikTok vb.), grup sohbetleri, siber zorbalığı tanıma ve yasal kanıt toplama rehberi.",
    parentTips: [
      "Platform gizlilik ayarlarını kilitleyin: Hesabı gizliye alın, DM (doğrudan mesaj) izinlerini sadece takipçilere sınırlayın.",
      "Siber zorbalık anında ilk 24 saat içinde panik yapmadan ekran görüntüsü ve platform linki kanıtlarını arşivleyin.",
      "Çocuğunuzun siber zorbalık yaşadığında utanmaması veya cihazının elinden alınacağını düşünmemesi için ona güven verin.",
      "Okul yönetimi ve rehberlik servisiyle koordinasyon içinde kalarak siber akran zorbalığını raporlayın."
    ],
    childRules: [
      "Grup sohbetlerinde veya profillerimde başkalarını üzecek kırıcı mesajlar veya fotoğraflar paylaşmam.",
      "Birisi bana siber zorbalık yaparsa ona aynı şekilde yanıt vermem, mesajları saklayıp o kişiyi hemen engellerim.",
      "Yaşadığım olumsuz durumları utanmadan, çekinmeden hemen ailemle veya öğretmenimle paylaşırım."
    ],
    agreement: "Sosyal medyada sevgi ve saygıyı koruruz! Siber zorbalığa asla sessiz kalmayız, kanıtlarımızı saklarız, zorbalara karşılık vermeyiz ve ailemizle her şeyi şeffafça konuşuruz."
  },
  {
    id: "15-17",
    age: "15-17",
    title: "Dijital Ayak İzi ve Gelecek İtibarı Kılavuzu",
    color: "from-indigo-500 to-violet-600 bg-indigo-50/50 text-indigo-900 border-indigo-200",
    icon: Fingerprint,
    summary: "Gelecekteki üniversite, burs veya iş başvurularını etkileyebilecek eski internet hesaplarının silinmesi ve dijital itibar temizliği rehberi.",
    parentTips: [
      "Gence denetleyici değil, bir 'dijital itibar danışmanı' olarak yaklaşın ve internetin kalıcı doğasını anlatın.",
      "Çocuğunuzla birlikte eski forum, oyun ve kullanılmayan sosyal medya hesaplarını kapatmak için 30 günlük plan yapın.",
      "Google arama motorunda çocuğunuzun adını aratarak çıkan sonuçları analiz edin ve gerekirse silme talebi gönderin.",
      "İki aşamalı doğrulama (2FA) ve şifre yöneticisi kullanımı konusunda gence rehberlik edin."
    ],
    childRules: [
      "Bugün paylaştığım bir fotoğrafın veya yorumun yıllar sonra karşıma çıkabileceğini bilerek paylaşım yaparım.",
      "Kullanmadığım eski hesaplarımı tamamen siler, aktif hesaplarımın gizlilik ve etiketleme ayarlarını yüksek tutarım.",
      "Başkalarının özel fotoğraflarını veya bilgilerini onların izni olmadan asla internette paylaşmam."
    ],
    agreement: "Dijital ayak izimizin bilincindeyiz! Gelecekteki hayallerimizi korumak için internette temiz ve saygın izler bırakır, eski hesaplarımızı temizler ve güvenlik ayarlarımızı en üstte tutarız."
  }
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
  const moduleImages = {
    cyberbullying: "https://images.unsplash.com/photo-1562577309-4932fdd64cd1?w=200&auto=format&fit=crop&q=60",
    privacy: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=200&auto=format&fit=crop&q=60",
    screentime: "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=200&auto=format&fit=crop&q=60",
    gaming: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=200&auto=format&fit=crop&q=60",
    digitalfootprint: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=200&auto=format&fit=crop&q=60",
    agreements: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=200&auto=format&fit=crop&q=60"
  };
  const imgUrl = moduleImages[module.id] || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&auto=format&fit=crop&q=60";

  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cx(
        "w-full rounded-lg border p-4 text-left transition hover:border-slate-300 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400",
        active ? "border-slate-950 bg-slate-50 shadow-md ring-1 ring-slate-950" : "border-slate-200 bg-white"
      )}
    >
      <div className="flex flex-col sm:flex-row items-start gap-4">
        <div className="w-16 h-16 shrink-0 overflow-hidden rounded-lg border border-slate-200 hidden sm:block">
          <img src={imgUrl} alt={module.title} className="w-full h-full object-cover" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="font-semibold text-slate-950 flex items-center gap-1.5">
                <Icon className="h-4 w-4 text-indigo-600 shrink-0" />
                {module.title}
              </p>
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
  const unsplashIds = [
    "1544717297-fa95b6ee9643",
    "1600132806370-bf17e65e942f",
    "1502086223501-7ea6ecd79368",
    "1511556532299-8f662fc26c06",
    "1526374965328-7f61d4dc18c5",
    "1550751827-4bd374c3f58b",
    "1563986768609-322da13575f3",
    "1510511459019-5dda7724fd87",
    "1488590528505-98d2b5aba04b",
    "1538481199705-c710c4e965fc",
    "1509198397868-475647b2a1e5",
    "1542751371-adc38448a05e",
    "1607604276583-eef5d076aa5f",
    "1511512578047-dfb367046420",
    "1562577309-4932fdd64cd1",
    "1611162617213-7d7a39e9b1d7",
    "1611606063065-ee7946f0787a",
    "1616469829581-73993eb86b02",
    "1563986768494-0d2b44f2f2a8",
    "1434030216411-0b793f4b4173",
    "1522202176988-66273c2fd55f",
    "1516321318423-f06f85e504b3",
    "1517245386807-bb43f82c33c4"
  ];

  const quizUnsplashIds = [
    "1550751827-4bd374c3f58b",
    "1563986768609-322da13575f3",
    "1607604276583-eef5d076aa5f",
    "1562577309-4932fdd64cd1",
    "1508739773434-c26b3d09e071",
    "1542751371-adc38448a05e",
    "1510511459019-5dda7724fd87",
    "1611606063065-ee7946f0787a",
    "1434030216411-0b793f4b4173",
    "1511556532299-8f662fc26c06"
  ];

  const [activeTab, setActiveTab] = useState("overview");
  const [selectedModuleId, setSelectedModuleId] = useState("cyberbullying");
  const [query, setQuery] = useState("");
  const [ageFilter, setAgeFilter] = useState("Tüm yaşlar");
  const [priorityFilter, setPriorityFilter] = useState("Tümü");
  const [sortKey, setSortKey] = useState("dynamicScore");
  const [completedTasks, setCompletedTasks] = useState(["scope"]);
  const [activeAgeGroup, setActiveAgeGroup] = useState("12-14");

  // YENİ EBEVEYN PROFİL DURUM DEĞİŞKENLERİ
  const [profileAges, setProfileAges] = useState(["12-14"]);
  const [profileTechLevel, setProfileTechLevel] = useState("intermediate");
  const [profileWorkStyle, setProfileWorkStyle] = useState("desk");
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // YENİ ÜYE GİRİŞ & KAYIT DURUM DEĞİŞKENLERİ
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem("digital_safety_user");
    return saved ? JSON.parse(saved) : null;
  });
  const [authMode, setAuthMode] = useState("login"); // 'login' veya 'register'
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [nameInput, setNameInput] = useState("");
  const [authError, setAuthError] = useState("");
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // YENİ REHBER DURUM DEĞİŞKENLERİ
  const [selectedGuideAge, setSelectedGuideAge] = useState("12-14");

  // YENİ İNTERAKTİF VİDEO OYNATICI DURUM DEĞİŞKENLERİ
  const [playingVideo, setPlayingVideo] = useState(null); // null veya 0 (Family Link), 1 (Siber Zorbalık), 2 (Oyun Güvenliği)
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [videoProgress, setVideoProgress] = useState(0);
  const [videoStep, setVideoStep] = useState(1);
  const [videoChoice, setVideoChoice] = useState(null); // null, 'A', 'B'
  const [v1ScreenTime, setV1ScreenTime] = useState(2); // saat limit
  const [v1Apps, setV1Apps] = useState({ tiktok: 'engelli', instagram: 'engelli', minecraft: 'izinli' });
  const [v1Bedtime, setV1Bedtime] = useState('21:30');
  const [v1Stage, setV1Stage] = useState('config'); // config, success
  const [v2Status, setV2Status] = useState('initial'); // initial, chat1, decision, result_a, result_b
  const [v3Status, setV3Status] = useState('initial'); // initial, q1_prompt, q1_result_a, q1_result_b, q2_prompt, q2_result_a, q2_result_b, success

  // YENİ BİLİNÇ TESTLERİ DURUM DEĞİŞKENLERİ
  const [activeQuiz, setActiveQuiz] = useState(null); // 'parent', 'child' veya null
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null); // Seçilen şık nesnesi
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  // Yaş aralığı çakışma kontrolü yardımcısı
  const isAgeRangeOverlapping = (ageRangeStr, selectedRanges) => {
    if (ageRangeStr === "Tüm yaşlar") return true;
    return selectedRanges.some(selectedRange => {
      const [sStart, sEnd] = selectedRange.split("-").map(Number);
      const [mStart, mEnd] = ageRangeStr.split("-").map(Number);
      return (sStart <= mEnd && sEnd >= mStart);
    });
  };

  // Dinamik Eşleştirme Motoru: Modülleri ebeveyn profiline göre yeniden puanla ve aksiyonları belirle
  const personalizedModules = useMemo(() => {
    return securityModules.map(module => {
      let personalizationScore = module.score;

      // 1. Yazılım / Teknoloji Seviyesi Faktörü
      if (profileTechLevel === "basic") {
        if (module.minTechLevel === "advanced") personalizationScore -= 40;
        else if (module.minTechLevel === "intermediate") personalizationScore -= 15;
      } else if (profileTechLevel === "intermediate") {
        if (module.minTechLevel === "advanced") personalizationScore -= 20;
      } else if (profileTechLevel === "advanced") {
        if (module.minTechLevel === "advanced") personalizationScore += 15;
      }

      // 2. Meslek / Çalışma Düzeni Faktörü
      if (module.suggestedForWorkStyle && module.suggestedForWorkStyle.includes(profileWorkStyle)) {
        personalizationScore += 10;
      } else {
        personalizationScore -= 5;
      }

      // 3. Çocuk Yaş Grubu Faktörü
      const ageMatches = isAgeRangeOverlapping(module.age, profileAges);
      if (ageMatches) {
        personalizationScore += 15;
      } else {
        personalizationScore -= 30;
      }

      const dynamicScore = Math.min(100, Math.max(10, personalizationScore));
      const activeStep = module.stepsByTechLevel?.[profileTechLevel] || module.firstStep;

      return {
        ...module,
        dynamicScore,
        activeStep
      };
    });
  }, [profileAges, profileTechLevel, profileWorkStyle]);

  const visibleModules = useMemo(() => {
    const normalizedQuery = normalizeSearchText(query.trim());

    return personalizedModules
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
        if (sortKey === "score") return b.score - a.score;
        return b.dynamicScore - a.dynamicScore;
      });
  }, [personalizedModules, ageFilter, priorityFilter, query, sortKey]);

  const selectedModule = useMemo(
    () =>
      visibleModules.find((module) => module.id === selectedModuleId) ||
      personalizedModules.find((module) => module.id === selectedModuleId) ||
      visibleModules[0] ||
      personalizedModules[0],
    [selectedModuleId, visibleModules, personalizedModules]
  );

  const completedCount = completedTasks.length;
  const completionRate = Math.round((completedCount / sprintTasks.length) * 100);

  // Profil puanlamasına göre dinamik olarak en iyi 3 modülü belirleme (Metriklerde göstermek için)
  const topModule = useMemo(() => {
    return personalizedModules.reduce((best, module) => (module.dynamicScore > best.dynamicScore ? module : best), personalizedModules[0]);
  }, [personalizedModules]);

  const secondModule = useMemo(() => {
    const sorted = [...personalizedModules].sort((a, b) => b.dynamicScore - a.dynamicScore);
    return sorted[1] || sorted[0];
  }, [personalizedModules]);

  const thirdModule = useMemo(() => {
    const sorted = [...personalizedModules].sort((a, b) => b.dynamicScore - a.dynamicScore);
    return sorted[2] || sorted[0];
  }, [personalizedModules]);

  const selectedAgePath =
    ageContentRoadmaps.find((item) => item.id === activeAgeGroup) || ageContentRoadmaps[0];

  // İnteraktif Video Oynatıcı Zamanlayıcı Efekti
  React.useEffect(() => {
    let interval = null;
    if (playingVideo !== null && videoPlaying) {
      interval = setInterval(() => {
        setVideoProgress((prev) => {
          if (prev >= 100) {
            setVideoPlaying(false);
            if (playingVideo === 0) setV1Stage('success');
            if (playingVideo === 1 && v2Status === 'result_b') setV2Status('success');
            if (playingVideo === 2 && v3Status === 'q2_result_b') setV3Status('success');
            return 100;
          }
          const nextVal = prev + 1.5;

          // Video 0 (Family Link) adımları
          if (playingVideo === 0) {
            if (nextVal < 33) setVideoStep(1);
            else if (nextVal < 66) setVideoStep(2);
            else setVideoStep(3);
          }

          // Video 1 (Siber Zorbalık) adımları ve karar zamanı
          if (playingVideo === 1) {
            if (nextVal < 30) {
              setVideoStep(1);
              if (v2Status === 'initial') {
                setV2Status('chat1');
              }
            } else if (nextVal >= 30 && nextVal < 70) {
              setVideoStep(2);
              if (v2Status === 'chat1' || v2Status === 'initial') {
                setV2Status('decision');
                setVideoPlaying(false); // Karar için duraklat
                return 30;
              }
            } else {
              setVideoStep(3);
            }
          }

          // Video 2 (Oyun Güvenliği) adımları ve karar zamanları
          if (playingVideo === 2) {
            if (nextVal < 40) {
              setVideoStep(1);
              if (v3Status === 'initial') {
                setV3Status('q1_prompt');
                setVideoPlaying(false); // Duraklat
                return 15;
              }
            } else if (nextVal >= 40 && nextVal < 80) {
              setVideoStep(2);
              if (v3Status === 'q1_result_b') {
                setV3Status('q2_prompt');
                setVideoPlaying(false); // Duraklat
                return 50;
              }
            } else {
              setVideoStep(3);
            }
          }

          return nextVal > 100 ? 100 : nextVal;
        });
      }, 100);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [playingVideo, videoPlaying, v2Status, v3Status]);

  function toggleTask(taskId) {
    setCompletedTasks((current) =>
      current.includes(taskId) ? current.filter((id) => id !== taskId) : [...current, taskId]
    );
  }

  // YENİ ÜYE GİRİŞ & ÇIKIŞ İŞLEYİCİLERİ
  const handleLogin = (e) => {
    if (e) e.preventDefault();
    if (!emailInput || !passwordInput) {
      setAuthError("Lütfen tüm alanları doldurun.");
      return;
    }
    const user = { email: emailInput, name: emailInput.split("@")[0] };
    localStorage.setItem("digital_safety_user", JSON.stringify(user));
    setCurrentUser(user);
    setEmailInput("");
    setPasswordInput("");
    setAuthError("");
    setIsAuthModalOpen(false);
  };

  const handleRegister = (e) => {
    if (e) e.preventDefault();
    if (!emailInput || !passwordInput || !nameInput) {
      setAuthError("Lütfen tüm alanları doldurun.");
      return;
    }
    const user = { email: emailInput, name: nameInput };
    localStorage.setItem("digital_safety_user", JSON.stringify(user));
    setCurrentUser(user);
    setEmailInput("");
    setPasswordInput("");
    setNameInput("");
    setAuthError("");
    setIsAuthModalOpen(false);
  };

  const handleDemoLogin = () => {
    const user = { email: "demo@ebeveyn.com", name: "Demo Ebeveyn" };
    localStorage.setItem("digital_safety_user", JSON.stringify(user));
    setCurrentUser(user);
    setAuthError("");
    setIsAuthModalOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("digital_safety_user");
    setCurrentUser(null);
  };

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
              <h1 className="text-xl font-semibold text-slate-950">
                Merhaba, <span className="text-indigo-600 font-bold">{currentUser ? currentUser.name : "Misafir Ebeveyn"}</span>
              </h1>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Button variant="outline" onClick={() => setActiveTab("path")}>
              <Target className="h-4 w-4" />
              Güvenlik yolunu aç
            </Button>
            <Button variant="subtle" onClick={() => setActiveTab("ages")}>
              <Users className="h-4 w-4" />
              Yaşa göre içerik
            </Button>
            <Button onClick={() => setActiveTab("plan")}>
              <Rocket className="h-4 w-4" />
              Aile planı
            </Button>
            {currentUser ? (
              <Button variant="outline" onClick={handleLogout} className="border-red-200 hover:bg-red-50 text-red-600">
                <LogOut className="h-4 w-4" />
                Çıkış
              </Button>
            ) : (
              <Button onClick={() => setIsAuthModalOpen(true)} className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold">
                <ShieldCheck className="h-4 w-4" />
                Giriş Yap / Üye Ol
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="mx-auto grid w-full max-w-[1440px] gap-0 lg:grid-cols-[280px_minmax(0,1fr)]">
        <aside className="min-w-0 border-b border-slate-200 bg-white px-4 py-4 lg:min-h-[calc(100vh-73px)] lg:border-b-0 lg:border-r lg:px-5">
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-4 lg:block lg:space-y-2">
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
          {/* AKILLI EBEYEN PROFİL SİHİRBAZI */}
          <Card className="mb-6 border-slate-200 bg-white shadow-sm overflow-hidden">
            <CardContent className="p-5">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-950 text-white">
                    <Sparkles className="h-5 w-5 text-amber-400 animate-pulse" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-950">Akıllı Aile Profilleme & Öneri Motoru</h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Profilinizi mesleğinize, yazılım bilginize ve çocuklarınızın yaşlarına göre özelleştirerek kişiselleştirilmiş güvenlik adımları edinin.
                    </p>
                  </div>
                </div>
                <Button
                  variant={isProfileOpen ? "outline" : "default"}
                  size="sm"
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="text-xs font-semibold"
                >
                  <Filter className="h-3.5 w-3.5" />
                  {isProfileOpen ? "Profili Kapat" : "Profil Ayarlarını Düzenle"}
                </Button>
              </div>

              {/* Collapsible Form */}
              {isProfileOpen && (
                <div className="mt-5 border-t border-slate-100 pt-5 grid gap-5 md:grid-cols-3">
                  {/* Yaş Grupları */}
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Çocukların Yaş Grupları</label>
                    <div className="grid grid-cols-2 gap-2">
                      {["3-5", "6-8", "9-11", "12-14", "15-17"].map((age) => {
                        const checked = profileAges.includes(age);
                        return (
                          <button
                            key={age}
                            type="button"
                            onClick={() => {
                              setProfileAges((prev) =>
                                prev.includes(age)
                                  ? prev.length > 1
                                    ? prev.filter((a) => a !== age)
                                    : prev
                                  : [...prev, age]
                              );
                            }}
                            className={cx(
                              "flex h-9 items-center justify-center rounded-lg border text-xs font-semibold transition",
                              checked
                                ? "border-slate-950 bg-slate-950 text-white"
                                : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                            )}
                          >
                            {age} Yaş
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Ebeveyn Teknoloji Düzeyi */}
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Ebeveyn Teknoloji Düzeyi</label>
                    <div className="flex flex-col gap-2">
                      {[
                        { key: "basic", label: "Başlangıç / Temel", desc: "Fiziksel kurallar ve basılı rehberler" },
                        { key: "intermediate", label: "Orta Düzey", desc: "Uygulama kurulumları ve hesap gizlilikleri" },
                        { key: "advanced", label: "İleri / Teknik", desc: "Ağ filtreleme (DNS/Modem), Pi-hole vb." }
                      ].map((level) => {
                        const active = profileTechLevel === level.key;
                        return (
                          <button
                            key={level.key}
                            type="button"
                            onClick={() => setProfileTechLevel(level.key)}
                            className={cx(
                              "w-full flex flex-col items-start p-2.5 rounded-lg border text-left transition",
                              active
                                ? "border-slate-950 bg-slate-50 ring-1 ring-slate-950"
                                : "border-slate-200 bg-white hover:bg-slate-50"
                            )}
                          >
                            <span className="text-xs font-semibold text-slate-950">{level.label}</span>
                            <span className="text-[10px] text-slate-500 mt-0.5">{level.desc}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Çalışma Düzeni / Meslek */}
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Çalışma Düzeni / Meslek</label>
                    <div className="flex flex-col gap-2">
                      {[
                        { key: "desk", label: "Masa Başı / Uzaktan Çalışan", desc: "PC başı. Tarayıcı eklentileri & anlık loglar" },
                        { key: "field", label: "Saha / Mobil Yoğun", desc: "Dışarıda aktif. Otomatik kilitler & SMS bildirimleri" },
                        { key: "flexible", label: "Esnek / Ev Odaklı", desc: "Esnek zamanlı. Aile toplantıları & basılı panolar" }
                      ].map((style) => {
                        const active = profileWorkStyle === style.key;
                        return (
                          <button
                            key={style.key}
                            type="button"
                            onClick={() => setProfileWorkStyle(style.key)}
                            className={cx(
                              "w-full flex flex-col items-start p-2.5 rounded-lg border text-left transition",
                              active
                                ? "border-slate-950 bg-slate-50 ring-1 ring-slate-950"
                                : "border-slate-200 bg-white hover:bg-slate-50"
                            )}
                          >
                            <span className="text-xs font-semibold text-slate-950">{style.label}</span>
                            <span className="text-[10px] text-slate-500 mt-0.5">{style.desc}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* Aktif Profil Hapları */}
              <div className="mt-4 flex flex-wrap gap-2 border-t border-slate-100 pt-4 text-xs">
                <span className="text-slate-500 py-1 font-medium">Aktif Filtreler:</span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-50 border border-slate-200 px-2.5 py-1 font-semibold text-slate-800">
                  <Users className="h-3 w-3 text-slate-500" />
                  {profileAges.join(", ")} Yaş
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-50 border border-slate-200 px-2.5 py-1 font-semibold text-slate-800">
                  <LockKeyhole className="h-3 w-3 text-slate-500" />
                  {profileTechLevel === "basic" ? "Temel Ebeveyn" : profileTechLevel === "intermediate" ? "Orta Ebeveyn" : "Teknik Ebeveyn"}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-50 border border-slate-200 px-2.5 py-1 font-semibold text-slate-800">
                  <Smartphone className="h-3 w-3 text-slate-500" />
                  {profileWorkStyle === "desk" ? "Masa Başı" : profileWorkStyle === "field" ? "Saha / Mobil" : "Esnek / Ev"}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* DİNAMİK METRİKLER */}
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            <MetricTile icon={topModule.icon} label="1. Öncelikli Risk" value={topModule.shortTitle} note="Profilinize göre en acil" tone={topModule.accent} />
            <MetricTile icon={secondModule.icon} label="2. Öncelikli Risk" value={secondModule.shortTitle} note="Profil uyumuna göre ikinci" tone={secondModule.accent} />
            <MetricTile icon={thirdModule.icon} label="3. Öncelikli Risk" value={thirdModule.shortTitle} note="Profil uyumuna göre üçüncü" tone={thirdModule.accent} />
            <MetricTile icon={Users} label="Aktif Çocuklar" value={`${profileAges.length} Yaş Grubu`} note={profileAges.join(", ") + " yaş odaklı"} tone="bg-violet-50 text-violet-700" />
            <MetricTile icon={Clock3} label="Sprint İlerlemesi" value={`${completionRate}%`} note={`${completedCount}/${sprintTasks.length} görev tamamlandı`} tone="bg-amber-50 text-amber-800" />
          </div>

          {activeTab === "overview" && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1.1fr)_390px]">
              <section className="space-y-6">
                <Card className="overflow-hidden bg-gradient-to-br from-white to-indigo-50/20">
                  <CardContent className="p-0">
                    <div className="grid gap-6 md:grid-cols-[1fr_240px] p-5 sm:p-6 items-center">
                      <div>
                        <p className="text-sm font-medium text-indigo-600">Ürün Yolu & Vizyonu</p>
                        <h2 className="mt-1 text-2xl font-bold text-slate-900">Aileler İçin Dijital Güvenlik Operasyon Sistemi</h2>
                        <p className="mt-3 text-sm leading-relaxed text-slate-600">
                          Tek odak; çocukların siber zorbalık, dijital mahremiyet ihlalleri, ekran bağımlılığı, oyun içi sohbet dolandırıcılıkları ve kalıcı dijital ayak izleri gibi risklere karşı 360 derece korunması ve bilinçlendirilmesidir.
                        </p>
                        <div className="mt-4 flex gap-2">
                          <Button variant="outline" onClick={() => setActiveTab("path")} className="text-xs h-8">
                            <BarChart3 className="h-3.5 w-3.5" />
                            Tüm Modülleri Gör
                          </Button>
                        </div>
                      </div>
                      <div className="hidden md:block">
                        <img 
                          src="/safety_hero.png" 
                          alt="Aile Siber Güvenlik" 
                          className="w-full h-auto rounded-xl object-cover shadow-md border border-white"
                        />
                      </div>
                    </div>

                    <div className="p-5 sm:p-6 border-t border-slate-100 bg-slate-50/50">
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">En Popüler Güvenlik Modülleri</p>
                      <div className="grid gap-3 lg:grid-cols-2">
                        {personalizedModules.slice(0, 4).map((module) => (
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
                    <div className="flex items-center gap-2 mt-4">
                      <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Profilinize Özel İlk Adım</p>
                      <span className="rounded-full bg-slate-100 border border-slate-200 text-[8px] text-slate-700 px-1.5 py-0.5 font-semibold uppercase">
                        {profileTechLevel === "basic" ? "Temel" : profileTechLevel === "intermediate" ? "Orta" : "İleri"}
                      </span>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{topModule.activeStep}</p>
                    <div className="mt-5 space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-500">Profil Eşleşme Skoru</span>
                        <span className="font-semibold">{topModule.dynamicScore}/100</span>
                      </div>
                      <ScoreBar score={topModule.dynamicScore} className={topModule.chart} />
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

              <Card className="overflow-hidden">
                <div className="h-32 overflow-hidden bg-slate-900 border-b border-slate-105 flex items-center justify-center relative">
                  <img 
                    src={`/safety_${selectedModule.age === "Tüm yaşlar" ? "hero" : selectedModule.age}.png`} 
                    alt={selectedModule.title} 
                    className="w-full h-full object-cover opacity-70"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent" />
                </div>
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
                        <span className="text-slate-500">Profil Eşleşme Skoru</span>
                        <span className="font-semibold text-slate-950">{selectedModule.dynamicScore}%</span>
                      </div>
                      <ScoreBar score={selectedModule.dynamicScore} className={selectedModule.chart} />
                    </div>
                    <div>
                      <div className="mb-2 flex items-center justify-between text-sm">
                        <span className="text-slate-500">Genel Risk Önceliği</span>
                        <span className="font-semibold text-slate-950">{selectedModule.score}%</span>
                      </div>
                      <ScoreBar score={selectedModule.score} className="bg-slate-200" />
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
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold text-slate-950">Profilinize Özel İlk Aksiyon</p>
                      <span className="rounded-full bg-slate-950 text-[10px] text-white px-2 py-0.5 font-bold uppercase tracking-wider">
                        {profileTechLevel === "basic" ? "Temel" : profileTechLevel === "intermediate" ? "Orta" : "İleri"}
                      </span>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{selectedModule.activeStep}</p>
                  </div>

                  <Button className="mt-6 w-full" onClick={() => setActiveTab("plan")}>
                    <CheckCircle2 className="h-4 w-4" />
                    Aile planına geç
                  </Button>
                </CardContent>
              </Card>
            </motion.section>
          )}

          {activeTab === "ages" && (
            <motion.section initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1fr)_380px]">
              <Card>
                <CardContent className="p-5 sm:p-6">
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-500">Yaşa göre içerik üretimi</p>
                      <h2 className="mt-1 text-2xl font-semibold">Her yaş grubuna özel dijital güvenlik yolu</h2>
                      <p className="mt-3 max-w-3xl leading-7 text-slate-600">
                        Aynı güvenlik konusunu her yaşa aynı dille anlatmıyoruz. Bu bölüm, ebeveyn rehberi, çocuk etkinliği,
                        kontrol listesi ve haftalık üretim adımlarını yaş grubuna göre sınıflandırır.
                      </p>
                    </div>
                    <Button onClick={() => setActiveTab("plan")}>
                      <ArrowRight className="h-4 w-4" />
                      Üretim sprinti
                    </Button>
                  </div>

                  <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-5">
                    {ageContentRoadmaps.map((agePath) => {
                      const Icon = agePath.icon;
                      const active = selectedAgePath.id === agePath.id;

                      return (
                        <button
                          key={agePath.id}
                          type="button"
                          onClick={() => setActiveAgeGroup(agePath.id)}
                          aria-pressed={active}
                          className={cx(
                            "rounded-lg border p-4 text-left transition hover:border-slate-300 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400",
                            active ? "border-slate-950 bg-slate-50" : "border-slate-200 bg-white"
                          )}
                        >
                          <div className="flex items-center justify-between gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-950 text-white">
                              <Icon className="h-5 w-5" />
                            </div>
                            <span className="text-sm font-semibold text-slate-500">{agePath.score}</span>
                          </div>
                          <p className="mt-4 text-sm font-medium text-slate-500">{agePath.range} yaş</p>
                          <h3 className="mt-1 font-semibold text-slate-950">{agePath.title}</h3>
                        </button>
                      );
                    })}
                  </div>

                  <div className="mt-6 grid gap-4 lg:grid-cols-3">
                    {selectedAgePath.roadmap.map((step) => (
                      <div key={step.week} className="rounded-lg border border-slate-200 bg-white p-4">
                        <div className="flex items-center justify-between gap-3">
                          <span className="rounded-full bg-slate-950 px-3 py-1 text-xs font-semibold text-white">{step.week}</span>
                          <span className="text-xs font-medium text-slate-500">{selectedAgePath.range} yaş</span>
                        </div>
                        <h3 className="mt-4 font-semibold">{step.goal}</h3>
                        <p className="mt-2 text-sm leading-6 text-slate-600">{step.output}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 rounded-lg border border-slate-200 bg-slate-50 p-5">
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-slate-700">
                        <Sparkles className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-semibold text-slate-950">Bu yaş grubu için üretilecek içerik seti</p>
                        <p className="mt-2 leading-7 text-slate-600">{selectedAgePath.focus}</p>
                      </div>
                    </div>

                    <div className="mt-5 grid gap-3 md:grid-cols-2">
                      {selectedAgePath.products.map((product) => (
                        <div key={product} className="flex items-center gap-2 rounded-lg bg-white p-3 text-sm font-medium text-slate-700">
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
                          {product}
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="overflow-hidden">
                <div className="h-32 overflow-hidden bg-slate-900 border-b border-slate-105 flex items-center justify-center relative">
                  <img 
                    src={`/safety_${selectedAgePath.range}.png`} 
                    alt={selectedAgePath.title} 
                    className="w-full h-full object-cover opacity-75"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent" />
                </div>
                <CardContent className="p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-medium text-slate-500">Seçili yaş grubu</p>
                      <h3 className="mt-1 text-xl font-semibold">{selectedAgePath.range} yaş · {selectedAgePath.title}</h3>
                    </div>
                    <span className="rounded-lg bg-slate-950 px-3 py-1 text-sm font-semibold text-white">{selectedAgePath.score}</span>
                  </div>

                  <div className="mt-5 space-y-4">
                    <div>
                      <p className="text-sm font-semibold text-slate-950">Ebeveyne vaat</p>
                      <p className="mt-2 text-sm leading-6 text-slate-600">{selectedAgePath.parentPromise}</p>
                    </div>
                    <div className="border-t border-slate-200 pt-4">
                      <p className="text-sm font-semibold text-slate-950">Çocukta hedeflenen davranış</p>
                      <p className="mt-2 text-sm leading-6 text-slate-600">{selectedAgePath.childOutcome}</p>
                    </div>
                  </div>

                  <div className="mt-6 border-t border-slate-200 pt-5">
                    <p className="text-sm font-semibold text-slate-950">Formatlar</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {selectedAgePath.contentFormats.map((format) => (
                        <span key={format} className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">
                          {format}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 border-t border-slate-200 pt-5">
                    <p className="text-sm font-semibold text-slate-950">Üretim talimatı</p>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {selectedAgePath.range} yaş için dili basit, uygulanabilir ve aile içi konuşmaya uygun tut. Her içerikte
                      ebeveyn aksiyonu, çocuk cümlesi ve kontrol edilebilir bir çıktı üret.
                    </p>
                  </div>

                  <Button className="mt-6 w-full" onClick={() => setActiveTab("path")}>
                    <ShieldCheck className="h-4 w-4" />
                    Güvenlik modüllerine bağla
                  </Button>
                </CardContent>
              </Card>
            </motion.section>
          )}

          {activeTab === "quizzes" && (
            <motion.section initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-6">
              {/* QUIZ SEÇİMİ EKRANI */}
              {!activeQuiz && (
                <div className="space-y-6">
                  {/* Quiz Giriş Bannerı */}
                  <Card className="overflow-hidden border-slate-200 bg-gradient-to-br from-slate-900 to-indigo-950 text-white shadow-lg">
                    <CardContent className="p-0">
                      <div className="grid gap-6 md:grid-cols-[1fr_200px] p-6 items-center">
                        <div>
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500/20 text-indigo-400 mb-3 border border-indigo-500/30">
                            <GraduationCap className="h-5 w-5" />
                          </div>
                          <h3 className="text-xl font-bold text-white">Siber Güvenlik Farkındalık Akademisi</h3>
                          <p className="text-xs leading-relaxed text-indigo-200 mt-2">
                            Hem çocukların hem de ebeveynlerin dijital dünyada karşılaştığı siber tehditleri (siber zorbalık, oyun dolandırıcılıkları, hesap çalma tuzakları) ne düzeyde tanıdığını ve önlediğini ölçen zenginleştirilmiş testler.
                          </p>
                        </div>
                        <div className="hidden md:block">
                          <img 
                            src="/safety_hero.png" 
                            alt="Bilinç Akademisi" 
                            className="w-full h-auto rounded-lg object-cover shadow border border-white/10"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="grid gap-6 md:grid-cols-2">
                    {/* Ebeveyn Testi Kartı */}
                    <Card className="border-slate-200 bg-white hover:border-slate-300 transition overflow-hidden">
                      <CardContent className="p-6 flex flex-col justify-between h-full min-h-[320px]">
                        <div>
                          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-950 text-white mb-5 shadow-md">
                            <Users className="h-6 w-6" />
                          </div>
                          <h2 className="text-xl font-bold text-slate-950">Ebeveyn Dijital Farkındalık Testi</h2>
                          <p className="mt-3 text-sm leading-6 text-slate-600">
                            Çocuklarımızın maruz kalabileceği siber zorbalık belirtilerini tanıma, cihaz denetimlerini doğru kurma ve kriz anında sergilenmesi gereken ebeveyn reflekslerini ölçen 5 senaryolu farkındalık testi.
                          </p>
                        </div>
                        <div className="mt-6">
                          <Button 
                            className="w-full flex items-center justify-center gap-2"
                            onClick={() => {
                              setActiveQuiz("parent");
                              setCurrentQuestionIndex(0);
                              setSelectedAnswer(null);
                              setIsAnswerSubmitted(false);
                              setQuizScore(0);
                              setQuizCompleted(false);
                            }}
                          >
                            <GraduationCap className="h-4 w-4" />
                            Testi Başlat (Ebeveyn)
                          </Button>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Çocuk Testi Kartı */}
                    <Card className="border-slate-200 bg-white hover:border-slate-300 transition overflow-hidden">
                      <CardContent className="p-6 flex flex-col justify-between h-full min-h-[320px]">
                        <div>
                          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600 text-white mb-5 shadow-md">
                            <Gamepad2 className="h-6 w-6" />
                          </div>
                          <h2 className="text-xl font-bold text-slate-950">Siber Süper Kahraman Testi (Çocuk)</h2>
                          <p className="mt-3 text-sm leading-6 text-slate-600">
                            İnternet dünyasında ve çevrimiçi oyunlarda şifre güvenliği, yabancı mesajlara yaklaşım, siber zorbalıkla baş etme ve zararlı linkleri ayırt edebilme becerisini ölçen eğlenceli ve çocuk dostu siber kahraman testi.
                          </p>
                        </div>
                        <div className="mt-6">
                          <Button 
                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white flex items-center justify-center gap-2"
                            onClick={() => {
                              setActiveQuiz("child");
                              setCurrentQuestionIndex(0);
                              setSelectedAnswer(null);
                              setIsAnswerSubmitted(false);
                              setQuizScore(0);
                              setQuizCompleted(false);
                            }}
                          >
                            <Rocket className="h-4 w-4" />
                            Kahramanlık Testini Başlat
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )}

              {/* TEST SORU EKRANI */}
              {activeQuiz && !quizCompleted && (
                (() => {
                  const questions = activeQuiz === "parent" ? parentQuizQuestions : childQuizQuestions;
                  const currentQuestion = questions[currentQuestionIndex];
                  const Icon = currentQuestion.icon;

                  return (
                    <Card className="border-slate-200 bg-white shadow-md max-w-3xl mx-auto overflow-hidden">
                      <div className="h-32 overflow-hidden bg-slate-950 flex items-center justify-center relative">
                        <img 
                          src={activeQuiz === "parent" ? "/safety_hero.png" : "/safety_9-11.png"} 
                          alt="Bilinç Testi" 
                          className="w-full h-full object-cover opacity-60"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent" />
                      </div>
                      <CardContent className="p-6 sm:p-8">
                        {/* Test İlerleme Çubuğu */}
                        <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-4 uppercase tracking-wider">
                          <span>{activeQuiz === "parent" ? "Ebeveyn Testi" : "Siber Kahraman Testi"}</span>
                          <span>Soru {currentQuestionIndex + 1} / {questions.length}</span>
                        </div>
                        <ScoreBar score={((currentQuestionIndex + 1) / questions.length) * 100} className={activeQuiz === "parent" ? "bg-slate-950" : "bg-indigo-600"} />

                        {/* Senaryo Soru Kartı */}
                        <div className="mt-8 grid gap-4 p-5 rounded-xl border border-slate-100 bg-slate-50">
                          <div className="flex items-start gap-4">
                            <div className={cx(
                              "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg shadow-sm text-white",
                              activeQuiz === "parent" ? "bg-slate-950" : "bg-indigo-600"
                            )}>
                              <Icon className="h-5 w-5" />
                            </div>
                            <div>
                              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">SENARYO</p>
                              <p className="mt-1 text-base font-semibold leading-relaxed text-slate-900">{currentQuestion.scenario}</p>
                            </div>
                          </div>
                          <div className="w-full h-44 overflow-hidden rounded-lg border border-slate-200 shadow-md print-hide">
                            <img 
                              src={`https://images.unsplash.com/photo-${quizUnsplashIds[currentQuestionIndex % quizUnsplashIds.length]}?w=500&auto=format&fit=crop&q=60`} 
                              alt="Senaryo Görseli" 
                              className="w-full h-full object-cover" 
                            />
                          </div>
                        </div>

                        {/* Şıklar */}
                        <div className="mt-6 space-y-3">
                          {currentQuestion.options.map((option) => {
                            const isSelected = selectedAnswer?.key === option.key;
                            let optionClass = "border-slate-200 bg-white text-slate-800 hover:bg-slate-50 hover:border-slate-300";
                            
                            if (isAnswerSubmitted) {
                              if (option.isCorrect) {
                                optionClass = "border-emerald-500 bg-emerald-50 text-emerald-900 font-medium";
                              } else if (isSelected) {
                                optionClass = "border-rose-500 bg-rose-50 text-rose-900";
                              } else {
                                optionClass = "border-slate-100 bg-white text-slate-400 opacity-60 pointer-events-none";
                              }
                            } else if (isSelected) {
                              optionClass = activeQuiz === "parent" 
                                ? "border-slate-950 bg-slate-950 text-white font-medium shadow-sm" 
                                : "border-indigo-600 bg-indigo-600 text-white font-medium shadow-sm";
                            }

                            return (
                              <button
                                key={option.key}
                                type="button"
                                disabled={isAnswerSubmitted}
                                onClick={() => setSelectedAnswer(option)}
                                className={cx(
                                  "w-full flex items-start gap-3 p-4 rounded-xl border text-left text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-300",
                                  optionClass
                                )}
                              >
                                <span className={cx(
                                  "flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold border",
                                  isAnswerSubmitted && option.isCorrect ? "bg-emerald-500 border-emerald-500 text-white" :
                                  isAnswerSubmitted && isSelected && !option.isCorrect ? "bg-rose-500 border-rose-500 text-white" :
                                  isSelected ? "bg-white border-transparent text-slate-950" : "bg-slate-50 border-slate-200 text-slate-500"
                                )}>
                                  {option.key}
                                </span>
                                <span className="flex-1 leading-normal">{option.text}</span>
                              </button>
                            );
                          })}
                        </div>

                        {/* Cevap Açıklaması */}
                        {isAnswerSubmitted && (
                          <motion.div
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={cx(
                              "mt-6 p-5 rounded-xl border flex gap-3",
                              selectedAnswer.isCorrect 
                                ? "border-emerald-200 bg-emerald-50/30 text-emerald-800" 
                                : "border-amber-200 bg-amber-50/30 text-amber-800"
                            )}
                          >
                            <HelpCircle className="h-5 w-5 shrink-0 mt-0.5" />
                            <div>
                              <p className="font-bold text-sm">
                                {selectedAnswer.isCorrect ? "Tebrikler! Doğru Cevap" : "Yanlış Şıkkı Seçtiniz"}
                              </p>
                              <p className="mt-1 text-xs leading-relaxed opacity-90">{currentQuestion.explainer}</p>
                            </div>
                          </motion.div>
                        )}

                        {/* Alt Butonlar */}
                        <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
                          <Button variant="outline" size="sm" onClick={() => setActiveQuiz(null)}>
                            Testten Çık
                          </Button>

                          {!isAnswerSubmitted ? (
                            <Button
                              size="md"
                              disabled={!selectedAnswer}
                              onClick={() => {
                                setIsAnswerSubmitted(true);
                                if (selectedAnswer.isCorrect) {
                                  setQuizScore((prev) => prev + 1);
                                }
                              }}
                              className={activeQuiz === "parent" ? "bg-slate-950" : "bg-indigo-600"}
                            >
                              Cevabı Kontrol Et
                            </Button>
                          ) : (
                            <Button
                              size="md"
                              onClick={() => {
                                if (currentQuestionIndex + 1 < questions.length) {
                                  setCurrentQuestionIndex((prev) => prev + 1);
                                  setSelectedAnswer(null);
                                  setIsAnswerSubmitted(false);
                                } else {
                                  setQuizCompleted(true);
                                }
                              }}
                              className={cx(
                                "flex items-center gap-2",
                                activeQuiz === "parent" ? "bg-slate-950" : "bg-indigo-600"
                              )}
                            >
                              {currentQuestionIndex + 1 < questions.length ? "Sıradaki Soru" : "Sonuçları Gör"}
                              <ArrowRight className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })()
              )}

              {/* TEST SONUÇ VE SERTİFİKA EKRANI */}
              {quizCompleted && (
                (() => {
                  const questions = activeQuiz === "parent" ? parentQuizQuestions : childQuizQuestions;
                  const scorePercentage = Math.round((quizScore / questions.length) * 100);
                  
                  let badgeTitle = "";
                  let badgeDesc = "";
                  let badgeColor = "";

                  if (activeQuiz === "parent") {
                    if (scorePercentage >= 80) {
                      badgeTitle = "Bilinçli Dijital Ebeveyn";
                      badgeDesc = "Çocuğunuzun dijital ayak izlerini, siber zorbalık risklerini ve modem/cihaz kilitlerini üst düzey farkındalıkla yönetebiliyorsunuz!";
                      badgeColor = "from-amber-400 to-yellow-600 text-yellow-950 ring-yellow-300 bg-yellow-50";
                    } else if (scorePercentage >= 50) {
                      badgeTitle = "Gelişmekte Olan Dijital Koruyucu";
                      badgeDesc = "Temel dijital güvenlik becerilerine sahipsiniz. Ebeveyn profilleme sihirbazı yardımıyla teknik kısımları daha da geliştirebilirsiniz.";
                      badgeColor = "from-slate-400 to-slate-600 text-slate-950 ring-slate-300 bg-slate-50";
                    } else {
                      badgeTitle = "Aday Dijital Ebeveyn";
                      badgeDesc = "Dijital tehlikeler karşısında ailenizi korumak için kontrol listelerimizi ve ebeveyn mini rehberlerimizi çalışmanız önerilir.";
                      badgeColor = "from-rose-400 to-rose-600 text-rose-950 ring-rose-300 bg-rose-50";
                    }
                  } else {
                    if (scorePercentage >= 80) {
                      badgeTitle = "Siber Süper Kahraman";
                      badgeDesc = "Şifre güvenliğinden şüpheli teklifleri ayırt etmeye kadar tüm siber tuzaklardan kaçınabilen gerçek bir internet süper kahramanısın!";
                      badgeColor = "from-indigo-400 to-indigo-600 text-indigo-950 ring-indigo-300 bg-indigo-50";
                    } else if (scorePercentage >= 50) {
                      badgeTitle = "Çırak Siber Ajan";
                      badgeDesc = "İnternette oldukça dikkatlisin ama yine de bazı oyun tuzaklarına karşı dikkatli olmalısın. İpuçlarımızı incelemeye devam et!";
                      badgeColor = "from-emerald-400 to-emerald-600 text-emerald-950 ring-emerald-300 bg-emerald-50";
                    } else {
                      badgeTitle = "Siber Eğitimci Adayı";
                      badgeDesc = "İnternette güvende kalmak için ebeveynlerinden destek almalı ve siber kurallar posterimizi odana asarak tekrar etmelisin.";
                      badgeColor = "from-teal-400 to-teal-600 text-teal-950 ring-teal-300 bg-teal-50";
                    }
                  }

                  return (
                    <Card className="border-slate-200 bg-white shadow-xl max-w-xl mx-auto overflow-hidden">
                      <div className={cx("h-3 bg-gradient-to-r", badgeColor)} />
                      <CardContent className="p-8 text-center">
                        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-slate-50 border border-slate-100 shadow-md mb-6 relative">
                          <Sparkles className="h-10 w-10 text-amber-500" />
                        </div>

                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">TEST TAMAMLANDI</p>
                        <h2 className="text-3xl font-extrabold text-slate-950 mt-1">Skorunuz: {quizScore} / {questions.length}</h2>
                        
                        <div className="mt-5 max-w-xs mx-auto">
                          <ScoreBar score={scorePercentage} className={activeQuiz === "parent" ? "bg-amber-500" : "bg-indigo-600"} />
                          <p className="text-xs text-slate-500 mt-2 font-medium">Bilinç Başarı Oranı: %{scorePercentage}</p>
                        </div>

                        <div className={cx(
                          "mt-8 p-6 rounded-xl border ring-4 ring-offset-2 flex flex-col items-center justify-center text-center",
                          badgeColor
                        )}>
                          <ShieldCheck className="h-12 w-12 mb-3 text-slate-900" />
                          <p className="text-[10px] font-bold uppercase tracking-widest opacity-80">DİJİTAL BAŞARI SERTİFİKASI</p>
                          <h3 className="text-lg font-black tracking-tight mt-1">{badgeTitle}</h3>
                          <p className="mt-3 text-xs leading-relaxed max-w-sm font-medium opacity-90">{badgeDesc}</p>
                        </div>

                        <div className="mt-8 flex flex-col gap-2 sm:flex-row sm:items-center justify-center">
                          <Button 
                            variant="outline"
                            onClick={() => {
                              setActiveQuiz(null);
                              setQuizCompleted(false);
                            }}
                            className="w-full sm:w-auto"
                          >
                            Diğer Testleri Gör
                          </Button>
                          <Button
                            onClick={() => {
                              setCurrentQuestionIndex(0);
                              setSelectedAnswer(null);
                              setIsAnswerSubmitted(false);
                              setQuizScore(0);
                              setQuizCompleted(false);
                            }}
                            className={cx(
                              "w-full sm:w-auto",
                              activeQuiz === "parent" ? "bg-slate-950" : "bg-indigo-600"
                            )}
                          >
                            Yeniden Başlat
                          </Button>
                          <Button
                            onClick={() => {
                              setActiveTab(activeQuiz === "parent" ? "path" : "ages");
                            }}
                            variant="subtle"
                            className="w-full sm:w-auto"
                          >
                            Güvenlik Yoluna Dön
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })()
              )}
            </motion.section>
          )}

          {activeTab === "guides" && (
            <motion.section initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-6 grid gap-6 xl:grid-cols-[280px_minmax(0,1fr)]">
              {/* YAŞ GRUBU SEÇİM MENÜSÜ */}
              <aside className="space-y-2 print-hide">
                <Card>
                  <CardContent className="p-4">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Rehber Yaş Grupları</p>
                    <div className="flex flex-col gap-1">
                      {safetyGuidesData.map((guide) => {
                        const active = selectedGuideAge === guide.age;
                        const GuideIcon = guide.icon;

                        return (
                          <button
                            key={guide.id}
                            type="button"
                            onClick={() => setSelectedGuideAge(guide.age)}
                            className={cx(
                              "w-full flex items-center gap-3 h-11 px-3 rounded-lg text-xs font-semibold text-left transition",
                              active
                                ? "bg-slate-950 text-white shadow-sm"
                                : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"
                            )}
                          >
                            <GuideIcon className="h-4 w-4 shrink-0" />
                            <span>{guide.age} Yaş Rehberi</span>
                          </button>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>

                {/* PDF Hızlı Bilgi Kartı */}
                <Card className="bg-slate-900 text-white">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles className="h-4 w-4 text-amber-400" />
                      <h4 className="font-bold text-xs">Vektörel PDF Çıktısı</h4>
                    </div>
                    <p className="text-[11px] leading-5 text-slate-300">
                      Rehberi yazdırırken tarayıcınızın 'PDF Olarak Kaydet' özelliğini kullanarak yüksek kalitede, A4 boyutunda dikey kılavuzlar üretebilirsiniz.
                    </p>
                  </CardContent>
                </Card>
              </aside>

              {/* REHBER İÇERİK SAYFASI (Yazdırılabilir A4 Layout) */}
              <div className="min-w-0">
                {(() => {
                  const guide = safetyGuidesData.find(g => g.age === selectedGuideAge) || safetyGuidesData[0];
                  const GuideIcon = guide.icon;

                  return (
                    <Card className="border-slate-200 bg-white shadow-md print-card overflow-hidden">
                      {/* PDF Yazdırma Başlığı */}
                      <div className="hidden print:block text-center border-b-2 border-slate-950 pb-6 mb-8">
                        <div className="flex items-center justify-center gap-2 mb-2">
                          <ShieldCheck className="h-8 w-8 text-slate-950" />
                          <span className="text-xl font-black tracking-tight uppercase">Aile Siber Güvenlik Akademisi</span>
                        </div>
                        <h1 className="text-2xl font-black">{guide.title}</h1>
                        <p className="text-xs text-slate-500 mt-1">Bu kılavuz {currentUser.name} Ailesi için özel olarak hazırlanmıştır.</p>
                      </div>

                      {/* Web Ekranı Başlığı */}
                      <div className="p-6 sm:p-8 border-b border-slate-100 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between print-hide">
                        <div className="flex items-start gap-4">
                          <div className={cx(
                            "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-white shadow-md",
                            guide.id === "3-5" ? "bg-emerald-600" :
                            guide.id === "6-8" ? "bg-cyan-600" :
                            guide.id === "9-11" ? "bg-amber-600" :
                            guide.id === "12-14" ? "bg-rose-600" : "bg-indigo-600"
                          )}>
                            <GuideIcon className="h-6 w-6" />
                          </div>
                          <div>
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{guide.age} YAŞ DİJİTAL REHBERİ</span>
                            <h2 className="text-2xl font-extrabold text-slate-950 mt-0.5">{guide.title}</h2>
                          </div>
                        </div>

                        {/* PDF İNDİR BUTONU */}
                        <Button
                          onClick={() => window.print()}
                          className={cx(
                            "flex items-center justify-center gap-2 shadow-sm font-semibold",
                            guide.id === "3-5" ? "bg-emerald-600 hover:bg-emerald-700 text-white" :
                            guide.id === "6-8" ? "bg-cyan-600 hover:bg-cyan-700 text-white" :
                            guide.id === "9-11" ? "bg-amber-600 hover:bg-amber-700 text-white" :
                            guide.id === "12-14" ? "bg-rose-600 hover:bg-rose-700 text-white" : "bg-indigo-600 hover:bg-indigo-700 text-white"
                          )}
                        >
                          <ClipboardList className="h-4 w-4" />
                          PDF / Çıktı Olarak Al
                        </Button>
                      </div>

                      {/* Kılavuz Ana İçeriği */}
                      <div className="p-6 sm:p-8 space-y-8 print-pdf-layout">
                        {/* Özet ve Giriş Görsel Destekli */}
                        <div className="grid gap-6 md:grid-cols-[1fr_180px] items-center p-5 rounded-xl border border-slate-100 bg-slate-50/50">
                          <div>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">GENEL BAKIŞ & REHBER VİZYONU</p>
                            <p className="mt-2 text-sm leading-relaxed text-slate-700 font-semibold">{guide.summary}</p>
                          </div>
                          <div className="hidden md:block print-hide">
                            <img 
                              src={`/safety_${guide.age}.png`} 
                              alt={guide.title} 
                              className="w-full h-24 rounded-lg object-cover shadow border border-white"
                            />
                          </div>
                        </div>

                        {/* İki Sütunlu İçerik (Ebeveyn & Çocuk) */}
                        <div className="grid gap-6 md:grid-cols-2">
                          {/* Ebeveyn Kılavuzu */}
                          <div className="space-y-4">
                            <h3 className="text-base font-bold text-slate-950 flex items-center gap-2 border-b border-slate-100 pb-2">
                              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-950 text-white text-xs font-bold">1</span>
                              Ebeveyn Denetim Rehberi
                            </h3>
                            <div className="grid gap-3">
                              {guide.parentTips.map((tip, idx) => {
                                const imgIdx = (Number(guide.id.split("-")[0]) || 3) + idx;
                                const tipImageUrl = `https://images.unsplash.com/photo-${unsplashIds[imgIdx % unsplashIds.length]}?w=200&auto=format&fit=crop&q=60`;
                                return (
                                  <div key={idx} className="flex gap-3 p-2.5 rounded-lg border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition items-center">
                                    <div className="w-16 h-12 shrink-0 overflow-hidden rounded-md border border-slate-200 hidden sm:block print-hide">
                                      <img src={tipImageUrl} alt="İpucu" className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex gap-2 items-start">
                                      <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500 mt-0.5" />
                                      <span className="text-xs text-slate-600 leading-normal font-semibold">{tip}</span>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>

                          {/* Çocuk Kuralları */}
                          <div className="space-y-4">
                            <h3 className="text-base font-bold text-slate-950 flex items-center gap-2 border-b border-slate-100 pb-2">
                              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 text-white text-xs font-bold">2</span>
                              Çocuk Siber Kuralları
                            </h3>
                            <div className="grid gap-3">
                              {guide.childRules.map((rule, idx) => {
                                const imgIdx = (Number(guide.id.split("-")[0]) || 3) + idx + 7;
                                const ruleImageUrl = `https://images.unsplash.com/photo-${unsplashIds[imgIdx % unsplashIds.length]}?w=200&auto=format&fit=crop&q=60`;
                                return (
                                  <div key={idx} className="flex gap-3 p-2.5 rounded-lg border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition items-center">
                                    <div className="w-16 h-12 shrink-0 overflow-hidden rounded-md border border-slate-200 hidden sm:block print-hide">
                                      <img src={ruleImageUrl} alt="Kural" className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex gap-2 items-start">
                                      <Sparkles className="h-4 w-4 shrink-0 text-amber-500 mt-0.5" />
                                      <span className="text-xs text-slate-600 leading-normal font-semibold">{rule}</span>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </div>

                        {/* Aile Siber Sözleşmesi */}
                        <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 text-center bg-slate-50/50">
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">AİLE ORTAK ANLAŞMASI</p>
                          <h4 className="text-base font-black tracking-tight text-slate-900 mt-1">Siber Güvenlik Sözleşmemiz</h4>
                          <p className="mt-3 text-xs leading-relaxed text-slate-600 max-w-lg mx-auto font-medium italic">
                            "{guide.agreement}"
                          </p>

                          {/* İmza Alanı */}
                          <div className="hidden print:flex items-center justify-around mt-8 pt-6 border-t border-slate-200 text-xs">
                            <div className="text-center">
                              <div className="w-32 border-b border-slate-400 h-8 mx-auto"></div>
                              <p className="mt-2 font-bold text-slate-700">Ebeveyn İmzası</p>
                            </div>
                            <div className="text-center">
                              <div className="w-32 border-b border-slate-400 h-8 mx-auto"></div>
                              <p className="mt-2 font-bold text-slate-700">Çocuk İmzası</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  );
                })()}
              </div>
            </motion.section>
          )}

          {activeTab === "videos" && (
            <motion.section initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-6">
              {playingVideo !== null ? (
                /* THEATER PLAYER VIEW */
                <div className="grid gap-6 lg:grid-cols-[1fr_320px] mb-6">
                  {/* Interactive Screen and controls */}
                  <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col justify-between print-hide">
                    {/* Header bar */}
                    <div className="p-4 bg-slate-950 border-b border-slate-900 flex justify-between items-center text-xs">
                      <div className="flex items-center gap-2">
                        <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="font-extrabold text-white uppercase tracking-wider">
                          {playingVideo === 0 && "Google Family Link Parental Control Tutorial"}
                          {playingVideo === 1 && "Siber Zorbalığı Önleme & Farkındalık Kılavuzu"}
                          {playingVideo === 2 && "Çevrimiçi Oyunlarda (Roblox, Minecraft) Güvenli Kalın"}
                        </span>
                      </div>
                      <button 
                        onClick={() => { setPlayingVideo(null); setVideoPlaying(false); }}
                        className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-white font-extrabold rounded text-[10px] uppercase transition flex items-center gap-1"
                      >
                        Tüm Videoları Gör &larr;
                      </button>
                    </div>

                    {/* Simulator Container */}
                    <div className="p-6 bg-slate-950/60 flex items-center justify-center flex-1 min-h-[460px]">
                      {playingVideo === 0 && (
                        /* Google Family Link Simulator */
                        <div className="flex flex-col items-center justify-center w-full relative">
                          <div className="w-[280px] h-[440px] bg-slate-900 rounded-[32px] border-4 border-slate-700 shadow-2xl relative flex flex-col overflow-hidden">
                            {/* Notch */}
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-4 bg-slate-700 rounded-b-xl flex items-center justify-center z-10">
                              <div className="w-8 h-1 bg-slate-900 rounded-full" />
                            </div>

                            {/* Internal Phone screen */}
                            <div className="flex-1 p-4 pt-6 bg-slate-950 text-slate-100 flex flex-col justify-between overflow-y-auto">
                              {v1Stage === 'config' ? (
                                <div className="flex flex-col h-full justify-between">
                                  <div>
                                    <div className="text-center pb-2 border-b border-white/10 mb-3">
                                      <span className="text-[9px] uppercase font-bold text-indigo-400 tracking-wider">Family Link Panel</span>
                                      <h5 className="text-xs font-black text-white">Ebeveyn Denetimi Masası</h5>
                                    </div>

                                    {videoStep === 1 && (
                                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
                                        <div className="p-2.5 bg-indigo-950/50 border border-indigo-500/20 rounded-lg">
                                          <p className="text-[8px] text-slate-400 font-bold uppercase">ADIM 1 / 3</p>
                                          <h6 className="text-[11px] font-extrabold text-white mt-0.5">Ekran Süresi Limiti</h6>
                                          <p className="text-[10px] text-indigo-200/80 mt-1 leading-normal">
                                            Günlük aktif telefon kullanım süresini sınırlandırın.
                                          </p>
                                        </div>

                                        <div className="py-1 space-y-2">
                                          <div className="flex justify-between items-center text-[10px] font-bold">
                                            <span>Süre:</span>
                                            <span className="text-indigo-400 px-2 py-0.5 rounded bg-indigo-500/20 border border-indigo-500/30">
                                              {v1ScreenTime} Saat
                                            </span>
                                          </div>
                                          <input
                                            type="range"
                                            min="1"
                                            max="6"
                                            value={v1ScreenTime}
                                            onChange={(e) => setV1ScreenTime(Number(e.target.value))}
                                            className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                                          />
                                          <div className="text-[9px] leading-snug">
                                            {v1ScreenTime <= 2 ? (
                                              <span className="text-emerald-400 font-bold">🟢 Pedagojik Limit (İdeal)</span>
                                            ) : (
                                              <span className="text-amber-400 font-bold">🟡 Uzun Ekran Süresi! (Önerilmez)</span>
                                            )}
                                          </div>
                                        </div>
                                      </motion.div>
                                    )}

                                    {videoStep === 2 && (
                                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
                                        <div className="p-2.5 bg-indigo-950/50 border border-indigo-500/20 rounded-lg">
                                          <p className="text-[8px] text-slate-400 font-bold uppercase">ADIM 2 / 3</p>
                                          <h6 className="text-[11px] font-extrabold text-white mt-0.5">Uygulama Engelleme</h6>
                                          <p className="text-[10px] text-indigo-200/80 mt-1 leading-normal">
                                            Çocuğun cihazındaki uygulamaları yönetin.
                                          </p>
                                        </div>

                                        <div className="space-y-1.5">
                                          {Object.entries(v1Apps).map(([app, status]) => (
                                            <div key={app} className="flex justify-between items-center p-2 rounded bg-slate-900 border border-white/5 text-[10px]">
                                              <span className="capitalize font-bold text-slate-200">{app}</span>
                                              <button
                                                onClick={() => setV1Apps(prev => ({ ...prev, [app]: status === 'izinli' ? 'engelli' : 'izinli' }))}
                                                className={cx(
                                                  "px-2 py-0.5 rounded text-[8px] font-extrabold tracking-wider transition uppercase",
                                                  status === 'izinli'
                                                    ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                                                    : "bg-rose-500/20 text-rose-400 border border-rose-500/30"
                                                )}
                                              >
                                                {status === 'izinli' ? 'İzinli' : 'Engelli'}
                                              </button>
                                            </div>
                                          ))}
                                        </div>
                                      </motion.div>
                                    )}

                                    {videoStep === 3 && (
                                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
                                        <div className="p-2.5 bg-indigo-950/50 border border-indigo-500/20 rounded-lg">
                                          <p className="text-[8px] text-slate-400 font-bold uppercase">ADIM 3 / 3</p>
                                          <h6 className="text-[11px] font-extrabold text-white mt-0.5">Uyku Saati Kilidi</h6>
                                          <p className="text-[10px] text-indigo-200/80 mt-1 leading-normal">
                                            Uyku vaktinde cihazı otomatik kilitleyin.
                                          </p>
                                        </div>

                                        <div className="space-y-2">
                                          <label className="block text-[10px] font-bold text-slate-300">Uyku Saati:</label>
                                          <div className="grid grid-cols-3 gap-1">
                                            {['20:30', '21:30', '22:30'].map((time) => (
                                              <button
                                                key={time}
                                                onClick={() => setV1Bedtime(time)}
                                                className={cx(
                                                  "py-1 rounded text-[10px] font-bold transition",
                                                  v1Bedtime === time
                                                    ? "bg-indigo-600 text-white border border-indigo-400"
                                                    : "bg-slate-900 text-slate-300 border border-white/10 hover:bg-slate-800"
                                                )}
                                              >
                                                {time}
                                              </button>
                                            ))}
                                          </div>
                                        </div>
                                      </motion.div>
                                    )}
                                  </div>

                                  <div className="pt-2">
                                    {videoStep < 3 ? (
                                      <button
                                        onClick={() => {
                                          const nextP = videoStep === 1 ? 35 : 68;
                                          setVideoProgress(nextP);
                                          setVideoStep(videoStep + 1);
                                        }}
                                        className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-[10px] font-extrabold text-white transition flex items-center justify-center gap-1"
                                      >
                                        İleri <ArrowRight className="h-3 w-3" />
                                      </button>
                                    ) : (
                                      <button
                                        onClick={() => {
                                          setVideoProgress(100);
                                          setV1Stage('success');
                                        }}
                                        className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 rounded-lg text-[10px] font-extrabold text-white transition"
                                      >
                                        Family Link'i Aktifleştir 🔒
                                      </button>
                                    )}
                                  </div>
                                </div>
                              ) : (
                                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex-1 flex flex-col justify-between items-center text-center py-4">
                                  <div className="space-y-3">
                                    <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
                                      <ShieldCheck className="h-6 w-6" />
                                    </div>
                                    <h5 className="text-xs font-black text-white">CİHAZ KORUMASI AKTİF!</h5>
                                    <p className="text-[10px] leading-relaxed text-slate-300">
                                      Family Link kuralları başarıyla uygulandı ve çocuk cihazı koruma altına alındı.
                                    </p>
                                    <div className="p-2.5 bg-emerald-950/40 rounded-lg border border-emerald-500/10 text-[9px] text-left text-emerald-100/90 space-y-1">
                                      <div className="flex items-center gap-1 font-bold">
                                        <CheckCircle2 className="h-2.5 w-2.5 text-emerald-400" />
                                        <span>Günlük Limit: {v1ScreenTime} Saat</span>
                                      </div>
                                      <div className="flex items-center gap-1 font-bold">
                                        <CheckCircle2 className="h-2.5 w-2.5 text-emerald-400" />
                                        <span>TikTok: {v1Apps.tiktok === 'engelli' ? 'Engelli 🚫' : 'İzinli ✅'}</span>
                                      </div>
                                      <div className="flex items-center gap-1 font-bold">
                                        <CheckCircle2 className="h-2.5 w-2.5 text-emerald-400" />
                                        <span>Uyku Saati: {v1Bedtime} 🌙</span>
                                      </div>
                                    </div>
                                  </div>

                                  <button
                                    onClick={() => { setV1Stage('config'); setVideoProgress(0); setVideoStep(1); }}
                                    className="w-full py-1.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-[9px] font-bold text-slate-200 transition"
                                  >
                                    Simülasyonu Yenile 🔄
                                  </button>
                                </motion.div>
                              )}
                            </div>
                          </div>
                        </div>
                      )}

                      {playingVideo === 1 && (
                        /* Siber Zorbalık Chat Simulator */
                        <div className="flex flex-col items-center justify-center w-full relative">
                          <div className="w-[300px] bg-slate-900 rounded-2xl border border-slate-700 shadow-2xl overflow-hidden flex flex-col h-[380px] relative">
                            {/* Chat Header */}
                            <div className="p-3 bg-indigo-950 border-b border-white/5 flex items-center justify-between">
                              <div className="flex items-center gap-1.5">
                                <div className="w-7 h-7 rounded-full bg-slate-800 border border-rose-500 flex items-center justify-center text-rose-400 text-[10px] font-black">
                                  GA
                                </div>
                                <div>
                                  <h5 className="text-[10px] font-extrabold text-white">Gölge_Avcı</h5>
                                  <span className="text-[8px] text-rose-400 font-bold tracking-wider uppercase">ÇEVRİMİÇİ</span>
                                </div>
                              </div>
                              <div className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                            </div>

                            {/* Chat Area */}
                            <div className="flex-1 p-3 overflow-y-auto space-y-2.5 bg-slate-950 flex flex-col justify-end text-[10px]">
                              {v2Status === 'initial' && (
                                <div className="text-center my-auto space-y-2 py-4">
                                  <div className="text-2xl animate-bounce">📱</div>
                                  <p className="text-slate-400 text-[9px] leading-relaxed max-w-[180px] mx-auto">
                                    Simülasyonu başlatmak için alttaki <b>Oynat</b> tuşuna basın.
                                  </p>
                                </div>
                              )}

                              {(v2Status === 'chat1' || v2Status === 'decision' || v2Status === 'result_a' || v2Status === 'result_b' || v2Status === 'success') && (
                                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="self-start max-w-[85%] bg-slate-900 p-2 rounded-lg border border-white/5 text-slate-100">
                                  <span className="font-extrabold text-rose-400 block text-[8px] mb-0.5">Gölge_Avcı:</span>
                                  Hey ezik! Sen bu oyunda çok kötüsün. Hemen oyundan çık yoksa senin IP adresini bulup evine virüs atacağım! 😡👿
                                </motion.div>
                              )}

                              {v2Status === 'result_a' && (
                                <>
                                  <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="self-end max-w-[85%] bg-rose-600/20 border border-rose-500/30 p-2 rounded-lg text-rose-200">
                                    <span className="font-extrabold text-rose-400 block text-[8px] mb-0.5">Sen (Cevap Verdin):</span>
                                    Sıkıysa gel yap! Senden mi korkacağım! Asıl sen eziksin! 😤
                                  </motion.div>
                                  <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="self-start max-w-[85%] bg-slate-900 p-2 rounded-lg border border-white/5 text-slate-100">
                                    <span className="font-extrabold text-rose-400 block text-[8px] mb-0.5">Gölge_Avcı:</span>
                                    Hahaha, demek öyle! Bekle bilgisayarını çökertiyorum şimdi bekle... 💻🔥
                                  </motion.div>
                                </>
                              )}

                              {v2Status === 'result_b' && (
                                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="self-end max-w-[85%] bg-emerald-600/20 border border-emerald-500/30 p-2 rounded-lg text-emerald-200">
                                  <span className="font-extrabold text-emerald-400 block text-[8px] mb-0.5">Sen (Kalkan Şıkkı):</span>
                                  [Zorbayı Engelledin, Kanıt Kaydettin ve Ebeveynine Söyledin] 🛡️
                                </motion.div>
                              )}
                            </div>

                            {/* Decision Panel overlay */}
                            {v2Status === 'decision' && (
                              <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="p-3 bg-slate-900 border-t border-indigo-500/30 flex flex-col gap-1.5 z-10">
                                <span className="text-[8px] font-black text-amber-400 tracking-wider flex items-center gap-1 uppercase">
                                  <AlertTriangle className="h-3 w-3" /> KRİTİK SEÇİM ANI!
                                </span>
                                <p className="text-[9px] text-slate-300">Tehdit karşısında ne yapmalısın?</p>
                                <div className="grid gap-1 mt-1">
                                  <button
                                    onClick={() => setV2Status('result_a')}
                                    className="w-full p-1.5 bg-rose-950/50 hover:bg-rose-900/60 border border-rose-500/30 rounded text-left text-[8px] font-bold text-rose-200 transition"
                                  >
                                    🔴 A: Cevap ver ve 'Sıkıysa yap, senden mi korkacağım' yaz.
                                  </button>
                                  <button
                                    onClick={() => { setV2Status('result_b'); setVideoProgress(100); setVideoPlaying(true); }}
                                    className="w-full p-1.5 bg-emerald-950/50 hover:bg-emerald-900/60 border border-emerald-500/30 rounded text-left text-[8px] font-bold text-emerald-200 transition"
                                  >
                                    🟢 B: Asla CEVAP VERME! Zorbayı engelle ve ebeveynine bildir.
                                  </button>
                                </div>
                              </motion.div>
                            )}

                            {/* Error popup */}
                            {v2Status === 'result_a' && (
                              <div className="p-2 bg-rose-950 border-t border-rose-500/20 text-center">
                                <p className="text-[9px] text-rose-200">
                                  ❌ Hatalı Karar! Tartışmak zorbanın eline koz verir.
                                </p>
                                <button
                                  onClick={() => setV2Status('decision')}
                                  className="mt-1.5 px-2 py-0.5 bg-white text-rose-950 text-[8px] font-bold rounded hover:bg-slate-100 transition"
                                >
                                  Geri Dön ve Güvenli Kal &larr;
                                </button>
                              </div>
                            )}

                            {v2Status === 'success' && (
                              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 bg-slate-950/95 flex flex-col items-center justify-center p-4 text-center z-20">
                                <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-2 animate-bounce">
                                  <Sparkles className="h-6 w-6" />
                                </div>
                                <h5 className="text-[11px] font-black text-white uppercase">Siber Kalkan Aktif!</h5>
                                <p className="text-[9px] text-slate-300 leading-relaxed mt-1 max-w-[200px]">
                                  Mükemmel! Zorbayı engelledin, sessiz kaldın ve ailene haber vererek siber kahraman rozetini kazandın!
                                </p>
                                <button
                                  onClick={() => { setV2Status('initial'); setVideoProgress(0); setVideoPlaying(false); }}
                                  className="mt-3 px-3 py-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded text-[9px] font-extrabold transition"
                                >
                                  Yeniden Başlat 🔄
                                </button>
                              </motion.div>
                            )}
                          </div>
                        </div>
                      )}

                      {playingVideo === 2 && (
                        /* Çevrimiçi Oyun Güvenliği Simülatörü */
                        <div className="flex flex-col items-center justify-center w-full relative">
                          <div className="w-[300px] bg-slate-900 rounded-2xl border border-indigo-500/20 shadow-2xl overflow-hidden flex flex-col h-[380px] relative">
                            {/* Console Header */}
                            <div className="p-2.5 bg-indigo-950 border-b border-white/5 flex items-center justify-between text-[10px]">
                              <div className="flex items-center gap-1">
                                <Gamepad2 className="h-3.5 w-3.5 text-indigo-400" />
                                <span className="font-extrabold text-white tracking-wider text-[9px]">SİBER_CRAFT OYUN</span>
                              </div>
                              <span className="text-[8px] font-bold bg-amber-500/10 border border-amber-500/30 text-amber-400 px-1.5 py-0.2 rounded">
                                SEVİYE 1
                              </span>
                            </div>

                            {/* Game Screen Content */}
                            <div className="flex-1 p-3 bg-slate-950 flex flex-col justify-center items-center text-center text-[10px] relative">
                              {v3Status === 'initial' && (
                                <div className="space-y-2 py-4">
                                  <div className="text-3xl animate-pulse">🎮</div>
                                  <h5 className="font-extrabold text-white text-xs">Oyun Güvenliği Simülatörü</h5>
                                  <p className="text-slate-400 text-[9px] leading-relaxed max-w-[180px] mx-auto">
                                    Bedava elmas tuzakları ve yabancı sohbet istekleri simülasyonu için <b>Oynat</b> tuşuna basın.
                                  </p>
                                </div>
                              )}

                              {v3Status === 'q1_prompt' && (
                                <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="space-y-3 max-w-[240px]">
                                  <div className="text-xl animate-bounce">🎁💎</div>
                                  <div className="bg-indigo-950/80 p-2 rounded border border-indigo-500/20 text-left">
                                    <span className="text-[8px] font-black text-indigo-400 uppercase tracking-widest">Hediye Sandığı:</span>
                                    <p className="text-[9px] text-white mt-0.5 leading-normal">
                                      Tebrikler! 10,000 Bedava Robux kazandınız. Hesaba aktarmak için <b>şifrenizi girin:</b>
                                    </p>
                                  </div>
                                  <div className="grid gap-1">
                                    <button
                                      onClick={() => setV3Status('q1_result_a')}
                                      className="w-full py-1 bg-rose-950/60 hover:bg-rose-900/70 border border-rose-500/30 rounded text-[8px] font-bold text-rose-200 transition"
                                    >
                                      🔴 Şifremi girip bedava Robux'ı alayım.
                                    </button>
                                    <button
                                      onClick={() => setV3Status('q1_result_b')}
                                      className="w-full py-1 bg-emerald-950/60 hover:bg-emerald-900/70 border border-emerald-500/30 rounded text-[8px] font-bold text-emerald-200 transition"
                                    >
                                      🟢 Bu bir dolandırıcılık! Asla şifremi girmem.
                                    </button>
                                  </div>
                                </motion.div>
                              )}

                              {v3Status === 'q1_result_a' && (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-2">
                                  <div className="text-2xl">😢❌</div>
                                  <h5 className="font-extrabold text-rose-400 text-xs">HESAP ÇALINDI!</h5>
                                  <p className="text-[9px] text-slate-300 max-w-[200px] leading-relaxed">
                                    Asla bedava vaat eden sitelere şifrenizi vermemelisiniz. Bu bir hesap çalma tuzağıdır!
                                  </p>
                                  <button
                                    onClick={() => setV3Status('q1_prompt')}
                                    className="px-2 py-0.5 bg-white text-rose-950 text-[8px] font-bold rounded hover:bg-slate-100 transition"
                                  >
                                    Geri Dön ve Tekrar Dene &rarr;
                                  </button>
                                </motion.div>
                              )}

                              {v3Status === 'q1_result_b' && (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3 max-w-[240px]">
                                  <div className="text-2xl text-emerald-400">🛡️✨</div>
                                  <h5 className="font-extrabold text-emerald-400">HARİKA! TUZAĞI FARK ETTİN.</h5>
                                  <p className="text-[9px] text-slate-350 leading-relaxed">
                                    Bedava elmas yalanlarına inanmadın. Şimdi ikinci adımdaki yabancı sohbet davetiyle karşılaşacaksın.
                                  </p>
                                  <button
                                    onClick={() => { setV3Status('q2_prompt'); setVideoProgress(50); }}
                                    className="w-full py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded text-[8px] font-extrabold tracking-wider"
                                  >
                                    ADIM 2'YE GEÇ &rarr;
                                  </button>
                                </motion.div>
                              )}

                              {v3Status === 'q2_prompt' && (
                                <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="space-y-3 max-w-[240px]">
                                  <div className="bg-slate-900 border border-white/5 p-2 rounded text-left">
                                    <span className="text-[8px] font-black text-rose-400 uppercase tracking-widest">Süper_Oyuncu2026:</span>
                                    <p className="text-[9px] text-slate-200 mt-0.5 leading-normal">
                                      "Selam oyunda çok iyisin. Sana özel kostüm hediye etmek istiyorum. Telefon numaranı ve ev adresini verir misin?"
                                    </p>
                                  </div>
                                  <div className="grid gap-1">
                                    <button
                                      onClick={() => setV3Status('q2_result_a')}
                                      className="w-full py-1 bg-rose-950/60 hover:bg-rose-900/70 border border-rose-500/30 rounded text-[8px] font-bold text-rose-200 transition"
                                    >
                                      🔴 Veririm, ne de olsa oyun arkadaşım.
                                    </button>
                                    <button
                                      onClick={() => { setV3Status('q2_result_b'); setVideoProgress(100); setVideoPlaying(true); }}
                                      className="w-full py-1 bg-emerald-950/60 hover:bg-emerald-900/70 border border-emerald-500/30 rounded text-[8px] font-bold text-emerald-200 transition"
                                    >
                                      🟢 Kişisel bilgilerimi asla vermem! Sohbeti kapatırım.
                                    </button>
                                  </div>
                                </motion.div>
                              )}

                              {v3Status === 'q2_result_a' && (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-2">
                                  <div className="text-2xl">⚠️🚨</div>
                                  <h5 className="font-extrabold text-rose-400 text-xs">TEHLİKE! BİLGİ KAPTIRILDI</h5>
                                  <p className="text-[9px] text-slate-300 max-w-[200px] leading-relaxed">
                                    İnternetteki yabancılar gerçek hayatta tehlike oluşturabilir. Ev adresini ve telefonunu kimseye verme!
                                  </p>
                                  <button
                                    onClick={() => setV3Status('q2_prompt')}
                                    className="px-2 py-0.5 bg-white text-rose-950 text-[8px] font-bold rounded hover:bg-slate-100 transition"
                                  >
                                    Geri Dön ve Bilgileri Gizle &rarr;
                                  </button>
                                </motion.div>
                              )}

                              {v3Status === 'success' && (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 bg-slate-950/95 flex flex-col items-center justify-center p-4 text-center z-20">
                                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-2 animate-bounce">
                                    <Sparkles className="h-6 w-6" />
                                  </div>
                                  <h5 className="text-[11px] font-black text-white uppercase">Sertifikalı Güvenli Oyuncu!</h5>
                                  <p className="text-[9px] text-slate-300 leading-relaxed mt-1 max-w-[200px]">
                                    Tebrikler! Bedava vaatlere kanmadın, kişisel bilgilerini korudun ve siber dünyada oyunun kralı oldun!
                                  </p>
                                  <button
                                    onClick={() => { setV3Status('initial'); setVideoProgress(0); setVideoPlaying(false); }}
                                    className="mt-3 px-3 py-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded text-[9px] font-extrabold transition"
                                  >
                                    Yeniden Oyna 🎮
                                  </button>
                                </motion.div>
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Timeline Controls */}
                    <div className="p-4 bg-slate-950 border-t border-slate-900 flex flex-col gap-2.5">
                      <div className="flex items-center gap-3">
                        <span className="text-[9px] text-slate-400 font-bold">0:{(videoProgress * 0.05).toFixed(0).padStart(2, '0')}</span>
                        <div 
                          onClick={(e) => {
                            const rect = e.currentTarget.getBoundingClientRect();
                            const clickX = e.clientX - rect.left;
                            const percentage = (clickX / rect.width) * 100;
                            setVideoProgress(percentage);
                            if (playingVideo === 0) {
                              if (percentage < 33) setVideoStep(1);
                              else if (percentage < 66) setVideoStep(2);
                              else setVideoStep(3);
                            }
                          }}
                          className="flex-1 h-1.5 bg-slate-800 rounded-full cursor-pointer relative overflow-hidden"
                        >
                          <div className="h-full bg-indigo-500 rounded-full transition-all duration-150" style={{ width: `${videoProgress}%` }} />
                        </div>
                        <span className="text-[9px] text-slate-400 font-bold">0:05</span>
                      </div>

                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => setVideoPlaying(!videoPlaying)}
                            className="p-1.5 bg-indigo-650 hover:bg-indigo-600 rounded-full text-white transition"
                          >
                            {videoPlaying ? (
                              <svg className="h-3 w-3 fill-current" viewBox="0 0 24 24">
                                <rect x="5" y="4" width="4" height="16" />
                                <rect x="15" y="4" width="4" height="16" />
                              </svg>
                            ) : (
                              <svg className="h-3 w-3 fill-current" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z" />
                              </svg>
                            )}
                          </button>

                          <div className="flex items-center gap-1.5">
                            <span className={cx("text-[8px] px-1.5 py-0.5 rounded font-black", videoStep === 1 ? "bg-indigo-600/30 text-indigo-400" : "bg-slate-800 text-slate-400")}>ADIM 1</span>
                            <span className={cx("text-[8px] px-1.5 py-0.5 rounded font-black", videoStep === 2 ? "bg-indigo-600/30 text-indigo-400" : "bg-slate-800 text-slate-400")}>ADIM 2</span>
                            <span className={cx("text-[8px] px-1.5 py-0.5 rounded font-black", videoStep === 3 ? "bg-indigo-600/30 text-indigo-400" : "bg-slate-800 text-slate-400")}>ADIM 3</span>
                          </div>
                        </div>

                        <span className="text-[8px] text-indigo-400 font-extrabold uppercase tracking-wider bg-indigo-950 px-2 py-0.5 rounded border border-indigo-900">
                          Sıfırdan Üretim Simülatörü 🛠️
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Playlist sidebar */}
                  <div className="space-y-2.5">
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Siber Akademi Dersleri</h4>
                    {[
                      {
                        title: "Google Family Link Parental Control Tutorial",
                        desc: "Cihaz kilitleri, uygulama izinleri ve çocuk ekran süresi takibini adım adım nasıl yapacağınızı bu kapsamlı Family Link rehberiyle öğrenin.",
                        tag: "Ebeveyn Rehberi",
                        duration: "4:32"
                      },
                      {
                        title: "Siber Zorbalığı Önleme & Farkındalık Kılavuzu",
                        desc: "Çocukların siber zorbalığı tanıması, kanıtları saklaması ve durumu ebeveynlerine bildirmesini öğreten harika bir animasyon kılavuz.",
                        tag: "Çocuklar İçin",
                        duration: "5:15"
                      },
                      {
                        title: "Çevrimiçi Oyunlarda (Roblox, Minecraft) Güvenli Kalın",
                        desc: "Bedava oyun parası tuzaklarından, yabancı sohbet davetlerinden ve şifre çalma yöntemlerinden korunmanın en güvenli yolları.",
                        tag: "Oyun Güvenliği",
                        duration: "3:40"
                      }
                    ].map((video, idx) => (
                      <div 
                        key={idx}
                        onClick={() => {
                          setPlayingVideo(idx);
                          setVideoProgress(0);
                          setVideoStep(1);
                          setVideoPlaying(true);
                          if (idx === 0) { setV1Stage('config'); setV1ScreenTime(2); setV1Apps({ tiktok: 'engelli', instagram: 'engelli', minecraft: 'izinli' }); setV1Bedtime('21:30'); }
                          if (idx === 1) setV2Status('initial');
                          if (idx === 2) setV3Status('initial');
                        }}
                        className={cx(
                          "p-3 rounded-xl border transition cursor-pointer flex flex-col justify-between gap-1.5",
                          playingVideo === idx
                            ? "bg-slate-900 border-indigo-500 text-white shadow"
                            : "bg-white border-slate-200 hover:border-slate-300 text-slate-800"
                        )}
                      >
                        <div>
                          <span className={cx("text-[7px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded", playingVideo === idx ? "bg-indigo-500/20 text-indigo-400" : "bg-indigo-50 text-indigo-700")}>
                            {video.tag}
                          </span>
                          <h5 className="text-[11px] font-black mt-1 leading-snug">{video.title}</h5>
                        </div>
                        <p className="text-[9px] text-slate-450 leading-normal line-clamp-2">{video.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                /* GRID CARDS VIEW */
                <>
                  <Card className="overflow-hidden border-slate-200 bg-gradient-to-br from-slate-900 to-indigo-950 text-white shadow-lg mb-6 print-hide">
                    <CardContent className="p-0">
                      <div className="grid gap-6 md:grid-cols-[1fr_200px] p-6 items-center">
                        <div>
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500/20 text-indigo-400 mb-3 border border-indigo-500/30">
                            <Tv className="h-5 w-5" />
                          </div>
                          <h3 className="text-xl font-bold text-white">Siber Güvenlik İnteraktif Video Kütüphanesi</h3>
                          <p className="text-xs leading-relaxed text-indigo-200 mt-2">
                            Aşağıdaki eğitimlerden birini seçip, sıfırdan sizin için özel olarak simüle edilen <b>interaktif video deneyimini</b> başlatabilirsiniz.
                          </p>
                        </div>
                        <div className="hidden md:block">
                          <img 
                            src="/safety_hero.png" 
                            alt="Siber TV" 
                            className="w-full h-auto rounded-lg object-cover shadow border border-white/10"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="grid gap-6 md:grid-cols-3">
                    {[
                      {
                        title: "Google Family Link Parental Control Tutorial",
                        desc: "Cihaz kilitleri, uygulama izinleri ve çocuk ekran süresi takibini adım adım nasıl yapacağınızı bu kapsamlı Family Link rehberiyle öğrenin.",
                        tag: "Ebeveyn Rehberi",
                        duration: "4:32"
                      },
                      {
                        title: "Siber Zorbalığı Önleme & Farkındalık Kılavuzu",
                        desc: "Çocukların siber zorbalığı tanıması, kanıtları saklaması ve durumu ebeveynlerine bildirmesini öğreten harika bir animasyon kılavuz.",
                        tag: "Çocuklar İçin",
                        duration: "5:15"
                      },
                      {
                        title: "Çevrimiçi Oyunlarda (Roblox, Minecraft) Güvenli Kalın",
                        desc: "Bedava oyun parası tuzaklarından, yabancı sohbet davetlerinden ve şifre çalma yöntemlerinden korunmanın en güvenli yolları.",
                        tag: "Oyun Güvenliği",
                        duration: "3:40"
                      }
                    ].map((video, idx) => (
                      <Card key={idx} className="border-slate-200 bg-white hover:border-slate-350 hover:shadow-lg transition shadow-md overflow-hidden flex flex-col h-full justify-between">
                        <div>
                          {/* Video Custom Local Thumbnail */}
                          <div className="w-full aspect-video bg-slate-950 border-b border-slate-200 overflow-hidden relative group flex items-center justify-center">
                            <img 
                              src={`/safety_hero.png`} 
                              alt={video.title} 
                              className="w-full h-full object-cover opacity-40 group-hover:scale-105 transition-all duration-300"
                            />
                            <div className="absolute inset-0 bg-slate-900/40 group-hover:bg-slate-900/20 transition-all duration-300" />
                            {/* Glowing Play Icon Button overlay */}
                            <button 
                              onClick={() => {
                                setPlayingVideo(idx);
                                setVideoProgress(0);
                                setVideoStep(1);
                                setVideoPlaying(true);
                                if (idx === 0) { setV1Stage('config'); setV1ScreenTime(2); setV1Apps({ tiktok: 'engelli', instagram: 'engelli', minecraft: 'izinli' }); setV1Bedtime('21:30'); }
                                if (idx === 1) setV2Status('initial');
                                if (idx === 2) setV3Status('initial');
                              }}
                              className="absolute w-12 h-12 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white flex items-center justify-center shadow-lg transition transform group-hover:scale-110 duration-200"
                            >
                              <PlayCircle className="h-7 w-7" />
                            </button>
                          </div>
                          <div className="p-5">
                            <div className="flex items-center justify-between gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                              <span className="rounded-full bg-indigo-50 border border-indigo-150 px-2 py-0.5 text-indigo-700">{video.tag}</span>
                              <span className="flex items-center gap-1">
                                <PlayCircle className="h-3.5 w-3.5 text-slate-400" />
                                {video.duration}
                              </span>
                            </div>
                            <h4 className="font-bold text-slate-900 leading-snug">{video.title}</h4>
                            <p className="text-xs text-slate-500 leading-relaxed mt-2">{video.desc}</p>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </>
              )}
            </motion.section>
          )}

          {activeTab === "plan" && (
            <motion.section initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-6 grid gap-6 xl:grid-cols-[390px_minmax(0,1fr)]">
              <Card className="overflow-hidden">
                <div className="h-32 overflow-hidden bg-slate-900 border-b border-slate-105 flex items-center justify-center relative">
                  <img 
                    src="/safety_hero.png" 
                    alt="Aile Güvenlik Kit MVP" 
                    className="w-full h-full object-cover opacity-60"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent" />
                </div>
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

          {activeTab === "pricing" && (
            <motion.section initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-6">
              {/* Premium Header Card */}
              <Card className="overflow-hidden border-slate-200 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-950 text-white shadow-lg mb-8 print-hide">
                <CardContent className="p-8 relative">
                  <div className="absolute -right-16 -top-16 w-48 h-48 rounded-full bg-indigo-500/10 blur-2xl pointer-events-none" />
                  <div className="absolute -left-16 -bottom-16 w-48 h-48 rounded-full bg-emerald-500/10 blur-2xl pointer-events-none" />
                  
                  <div className="max-w-2xl relative z-10 space-y-4">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 uppercase tracking-widest">
                      <Sparkles className="h-3.5 w-3.5" /> Üyelik Paketleri
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                      Çocuğunuz İçin En Güvenli Dijital Ortamı Seçin
                    </h3>
                    <p className="text-xs sm:text-sm leading-relaxed text-slate-355 max-w-xl">
                      Ebeveyn bilinç testlerimiz, siber zorbalık tespit kitlerimiz ve A4 PDF yazdırma rehberlerimiz ile ailenizin dijital farkındalığını artırın. İhtiyacınıza uygun planı seçip saniyeler içinde simüle edebilirsiniz.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Monthly / Yearly billing cycle selector switch */}
              <div className="flex justify-center items-center gap-3 mb-8 print-hide">
                <span className={cx("text-xs font-bold transition", billingCycle === "monthly" ? "text-indigo-600" : "text-slate-500")}>
                  Aylık Ödeme
                </span>
                <button
                  type="button"
                  onClick={() => setBillingCycle(billingCycle === "monthly" ? "yearly" : "monthly")}
                  className="w-12 h-6 bg-slate-200 hover:bg-slate-350 rounded-full p-0.5 transition relative flex items-center"
                >
                  <div className={cx("w-5 h-5 bg-indigo-600 rounded-full shadow transition-all duration-300 transform", billingCycle === "yearly" ? "translate-x-6 bg-indigo-500" : "translate-x-0")} />
                </button>
                <span className={cx("text-xs font-bold transition flex items-center gap-1.5", billingCycle === "yearly" ? "text-indigo-600" : "text-slate-500")}>
                  Yıllık Ödeme <span className="bg-emerald-500/15 border border-emerald-500/20 text-emerald-600 text-[9px] px-1.5 py-0.5 rounded font-black tracking-wide">%20 İNDİRİM 🎁</span>
                </span>
              </div>

              {/* Grid Pricing Tiers */}
              <div className="grid gap-6 md:grid-cols-3 mb-10 print-hide">
                {/* 1. Standart Free Plan */}
                <Card className={cx("border-slate-200 bg-white transition shadow flex flex-col justify-between overflow-hidden relative", userPlan === "free" && "ring-2 ring-slate-900 border-slate-900")}>
                  {userPlan === "free" && (
                    <span className="absolute top-0 right-0 bg-slate-950 text-white text-[8px] font-black tracking-widest px-3 py-1 rounded-bl uppercase">
                      Aktif Plan
                    </span>
                  )}
                  <div className="p-6 border-b border-slate-100 bg-slate-50/50">
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">KADEME 1</span>
                    <h4 className="text-base font-extrabold text-slate-950 mt-1">Standart Plan</h4>
                    <p className="text-[11px] text-slate-500 leading-normal mt-1.5">Temel siber güvenlik farkındalığı arayan aileler için.</p>
                    <div className="mt-4 flex items-baseline gap-1.5">
                      <span className="text-2xl font-black text-slate-950">0 TL</span>
                      <span className="text-[10px] text-slate-450 font-bold uppercase tracking-wider">/ sonsuza kadar</span>
                    </div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col justify-between gap-6">
                    <ul className="space-y-3 text-[11px] text-slate-600 font-medium">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                        <span>Temel Bilinç Testlerine Erişim</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                        <span>Yalnızca 3-5 Yaş Kılavuzu</span>
                      </li>
                      <li className="flex items-center gap-2 text-slate-400 font-medium">
                        <span>🔒 PDF İndirme Sınırı (Sadece 3-5 yaş)</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                        <span>1 Çocuk Cihazı Takibi</span>
                      </li>
                      <li className="flex items-center gap-2 text-slate-400 font-medium">
                        <span>🚫 7/24 Siber Canlı Destek Yok</span>
                      </li>
                    </ul>
                    <button
                      type="button"
                      disabled={userPlan === "free"}
                      onClick={() => {
                        setUserPlan("free");
                        localStorage.setItem("digital_safety_plan", "free");
                      }}
                      className={cx(
                        "w-full py-2.5 rounded-lg text-xs font-black tracking-wider transition uppercase",
                        userPlan === "free"
                          ? "bg-slate-100 text-slate-400 border border-slate-200 cursor-default"
                          : "bg-slate-950 hover:bg-slate-900 text-white"
                      )}
                    >
                      {userPlan === "free" ? "Aktif Üyelik" : "Standart Plana Geç"}
                    </button>
                  </div>
                </Card>

                {/* 2. Aile Premium Plan */}
                <Card className={cx("bg-white border-amber-200 transition shadow-lg flex flex-col justify-between overflow-hidden relative", userPlan === "premium" && "ring-2 ring-amber-500 border-amber-500")}>
                  <div className="absolute top-0 right-0 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[8px] font-black tracking-widest px-3 py-1 rounded-bl uppercase">
                    {userPlan === "premium" ? "Aktif Plan" : "POPÜLER ⭐"}
                  </div>
                  <div className="p-6 border-b border-amber-100 bg-amber-500/5">
                    <span className="text-[9px] font-black text-amber-600 uppercase tracking-widest">KADEME 2</span>
                    <h4 className="text-base font-extrabold text-slate-950 mt-1">Aile Premium Paketi</h4>
                    <p className="text-[11px] text-slate-500 leading-normal mt-1.5">Siber dünyada tam kapsamlı dijital güvenlik ve PDF kütüphanesi.</p>
                    <div className="mt-4 flex items-baseline gap-1.5">
                      <span className="text-2xl font-black text-slate-950">
                        {billingCycle === "monthly" ? "149 TL" : "119 TL"}
                      </span>
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                        / ay {billingCycle === "yearly" && "(Yıllık Ödeme)"}
                      </span>
                    </div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col justify-between gap-6">
                    <ul className="space-y-3 text-[11px] text-slate-600 font-medium">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                        <span><b>Tüm Yaş Grupları</b> (3-17 Yaş) Rehberleri</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                        <span><b>Sınırsız Vektörel PDF</b> İndirme & Çıktı</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                        <span>Tüm Siber TV Simülasyonlarına Erişim</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                        <span><b>3 Çocuk Cihazı</b> Takibi (Family Link)</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                        <span>Haftalık Ebeveyn Gelişim Karnesi</span>
                      </li>
                    </ul>
                    <button
                      type="button"
                      onClick={() => {
                        if (userPlan === "premium") return;
                        setSelectedCheckoutPlan("premium");
                        setIsCheckoutOpen(true);
                      }}
                      className={cx(
                        "w-full py-2.5 rounded-lg text-xs font-black tracking-wider transition uppercase",
                        userPlan === "premium"
                          ? "bg-amber-100 text-amber-800 border border-amber-200 cursor-default"
                          : "bg-amber-500 hover:bg-amber-600 text-white shadow-lg shadow-amber-500/20"
                      )}
                    >
                      {userPlan === "premium" ? "Aktif Üyelik" : "Hemen Yükselt ⭐"}
                    </button>
                  </div>
                </Card>

                {/* 3. Siber Kahraman Plan */}
                <Card className={cx("bg-white border-indigo-200 transition shadow-lg flex flex-col justify-between overflow-hidden relative", userPlan === "hero" && "ring-2 ring-indigo-650 border-indigo-650")}>
                  <div className="absolute top-0 right-0 bg-gradient-to-r from-indigo-600 to-indigo-850 text-white text-[8px] font-black tracking-widest px-3 py-1 rounded-bl uppercase">
                    {userPlan === "hero" ? "Aktif Plan" : "LİMİTSİZ 🏆"}
                  </div>
                  <div className="p-6 border-b border-indigo-100 bg-indigo-500/5">
                    <span className="text-[9px] font-black text-indigo-600 uppercase tracking-widest">KADEME 3</span>
                    <h4 className="text-base font-extrabold text-slate-950 mt-1">Siber Kahraman (Ultimate)</h4>
                    <p className="text-[11px] text-slate-500 leading-normal mt-1.5">7/24 pedagog & siber güvenlik danışmanlığı ile profesyonel koruma.</p>
                    <div className="mt-4 flex items-baseline gap-1.5">
                      <span className="text-2xl font-black text-slate-950">
                        {billingCycle === "monthly" ? "299 TL" : "239 TL"}
                      </span>
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                        / ay {billingCycle === "yearly" && "(Yıllık Ödeme)"}
                      </span>
                    </div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col justify-between gap-6">
                    <ul className="space-y-3 text-[11px] text-slate-600 font-medium">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                        <span>Aile Premium'daki Tüm Özellikler</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                        <span><b>Sınırsız Çocuk Cihazı</b> Takibi</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                        <span><b>7/24 Canlı Siber Uzman & Pedagog Desteği</b></span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                        <span>Özel Haftalık Raporlar & Tavsiyeler</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                        <span>Öncelikli Telefon & Canlı Destek Hattı</span>
                      </li>
                    </ul>
                    <button
                      type="button"
                      onClick={() => {
                        if (userPlan === "hero") return;
                        setSelectedCheckoutPlan("hero");
                        setIsCheckoutOpen(true);
                      }}
                      className={cx(
                        "w-full py-2.5 rounded-lg text-xs font-black tracking-wider transition uppercase",
                        userPlan === "hero"
                          ? "bg-indigo-100 text-indigo-800 border border-indigo-200 cursor-default"
                          : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-650/20"
                      )}
                    >
                      {userPlan === "hero" ? "Aktif Üyelik" : "Kahramana Yüksel ⚡"}
                    </button>
                  </div>
                </Card>
              </div>
            </motion.section>
          )}
        </main>
      </div>

      {/* GİRİŞ / KAYIT MODALI */}
      {isAuthModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-sm p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 text-white relative overflow-hidden"
          >
            {/* Arka plan gradyan süslemesi */}
            <div className="absolute -top-12 -right-12 h-32 w-32 rounded-full bg-indigo-500/20 blur-xl"></div>
            <div className="absolute -bottom-12 -left-12 h-32 w-32 rounded-full bg-rose-500/10 blur-xl"></div>

            {/* Kapatma Butonu */}
            <button
              onClick={() => {
                setIsAuthModalOpen(false);
                setAuthError("");
              }}
              className="absolute top-4 right-4 text-slate-400 hover:text-white transition"
              type="button"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Logo ve Başlık */}
            <div className="flex flex-col items-center mb-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600 text-white mb-3">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h2 className="text-xl font-bold text-slate-100">
                {authMode === "login" ? "Hesabınıza Giriş Yapın" : "Yeni Hesap Oluşturun"}
              </h2>
              <p className="text-sm text-slate-400 mt-1 text-center">
                {authMode === "login"
                  ? "Aile Dijital Güvenlik dünyasına adım atın"
                  : "Ailenizin dijital güvenliğini birlikte yönetin"}
              </p>
            </div>

            {/* Hata Bildirimi */}
            {authError && (
              <div className="mb-4 rounded-lg bg-red-950/50 border border-red-800/50 p-3 text-xs text-red-400 flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 shrink-0 text-red-500" />
                <span>{authError}</span>
              </div>
            )}

            {/* Giriş / Kayıt Formu */}
            <form onSubmit={authMode === "login" ? handleLogin : handleRegister} className="space-y-4 relative z-10">
              {authMode === "register" && (
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                    Ad Soyad
                  </label>
                  <input
                    type="text"
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    placeholder="Örn: Ahmet Yılmaz"
                    className="w-full h-11 px-3.5 rounded-lg bg-slate-950/80 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition text-sm"
                    required
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                  E-Posta Adresi
                </label>
                <input
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full h-11 px-3.5 rounded-lg bg-slate-950/80 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                  Şifre
                </label>
                <input
                  type="password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="••••••••"
                  className="w-full h-11 px-3.5 rounded-lg bg-slate-950/80 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition text-sm"
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full h-11 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-lg shadow-indigo-600/20 flex items-center justify-center gap-2 mt-6 animate-pulse"
              >
                <LockKeyhole className="h-4 w-4" />
                {authMode === "login" ? "Giriş Yap" : "Hesap Oluştur"}
              </Button>
            </form>

            {/* Alternatif Butonlar ve Geçişler */}
            <div className="mt-5 pt-5 border-t border-slate-800 text-center space-y-4 relative z-10">
              <button
                type="button"
                onClick={handleDemoLogin}
                className="w-full h-11 border border-slate-800 bg-slate-950/40 hover:bg-slate-950/80 text-indigo-400 font-semibold rounded-lg flex items-center justify-center gap-2 transition text-sm"
              >
                <Sparkles className="h-4 w-4 animate-bounce" />
                Demo Girişi Yap (Hızlı İnceleme)
              </button>

              <p className="text-sm text-slate-400 font-medium">
                {authMode === "login" ? "Hesabınız yok mu?" : "Zaten hesabınız var mı?"}{" "}
                <button
                  type="button"
                  onClick={() => {
                    setAuthMode(authMode === "login" ? "register" : "login");
                    setAuthError("");
                  }}
                  className="text-indigo-400 hover:underline font-bold"
                >
                  {authMode === "login" ? "Kayıt Olun" : "Giriş Yapın"}
                </button>
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
