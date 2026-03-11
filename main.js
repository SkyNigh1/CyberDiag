/* ================================================================
   CyberDiag — Main Script
   GSAP animations · Lenis smooth scroll · i18n · Headbar logic
   ================================================================ */

// ————————————————————————————————————————
// i18n translations
// ————————————————————————————————————————
const translations = {
  fr: {
    nav_download: 'TÉLÉCHARGER',
    hero_overtitle: '( Développé par l\'équipe Dyvine )',
    hero_title: 'AUDITEZ,<br>MAÎTRISEZ.',
    hero_description: 'CyberDiag analyse et audite la sécurité de vos systèmes et réseaux Linux, pour vous offrir une vision claire de vos vulnérabilités.',
    hero_btn_download: 'TÉLÉCHARGER',
    hero_btn_faq: 'QUESTIONS FRÉQUENTES',
    hero_scroll: 'Défiler pour découvrir',
    hero_tagline: '( Notre priorité 🢆 )',
    discover_title: 'EXPLOREZ<br>CYBERDIAG.',
    discover_desc: 'Un audit système & réseau, lisible par tous.<br>Du comptable au pentester — une sortie adaptée à chaque profil, un mode expert pour aller plus loin.',
    features_title: 'FONCTIONNALITÉS',
    features_subtitle: 'Découvrez tout ce que CyberDiag peut faire pour vous.',
    tab_modules: 'Modules',
    tab_history: 'Historique',
    tab_results: 'Résultats',
    tab_questions: 'Questionnaire',
    tab_levels: 'Niveaux',
    feature_badge: 'inclus dans l\'app',
    feature_1_title: 'Deux modes d\'utilisation',
    feature_1_desc: 'Des modules séparés pour les analyses système et réseau, adaptés à chaque profil.',
    feature_2_title: 'Historique',
    feature_2_desc: 'Retrouvez l\'historique complet de vos analyses passées en un coup d\'œil.',
    feature_3_title: 'Résultats détaillés',
    feature_3_desc: 'Des résultats détaillés et exportables en HTML pour partager vos audits facilement.',
    feature_4_title: 'Questionnaire',
    feature_4_desc: 'Un questionnaire pour adapter le niveau des résultats et obtenir un profil personnalisé.',
    feature_5_title: 'Niveaux de scans',
    feature_5_desc: 'Différents niveaux de scans pour être toujours au même niveau que l\'utilisateur.',
    dl_cta_text: 'Sécurisez votre infrastructure Linux en quelques minutes.<br>CyberDiag, gratuit, conçu par des passionnés.',
    dl_distro_label: 'Disponible sur',
    dl_btn_text: 'Télécharger CyberDiag (.zip)',
    dl_version: 'v1.0 — 12 MB',
    dl_tools_title: 'Les outils de notre équipe',
    faq_title: 'QUESTIONS FRÉQUENTES',
    faq_q1: 'CyberDiag fonctionne-t-il sur toutes les distributions Linux ?',
    faq_a1: 'Oui, CyberDiag est compatible avec les principales distributions Linux (Debian, Ubuntu, CentOS, Fedora, Arch, etc.).',
    faq_q2: 'Est-ce que CyberDiag est gratuit ?',
    faq_a2: 'CyberDiag est un projet open-source développé dans un cadre universitaire. Il est entièrement gratuit.',
    faq_q3: 'Faut-il des droits root pour utiliser CyberDiag ?',
    faq_a3: 'Certaines analyses nécessitent des droits administrateur pour accéder aux configurations système. Il est recommandé de l\'exécuter avec sudo.',
    faq_q4: 'Comment contribuer au projet ?',
    faq_a4: 'Vous pouvez contribuer via notre dépôt GitHub. Toute contribution est la bienvenue : code, documentation, retours d\'utilisation.',
    footer_studio: 'Équipe Dyvine&nbsp;Créations.',
    footer_location: '( Vannes — France )',
    footer_legal: '© 2026 CyberDiag, Équipe Dyvine Créations. All rights reserved.',
    footer_col_index: 'Index',
    footer_col_legal: 'Legal',
    footer_col_socials: 'Socials',
    footer_link_hero: 'Hero',
    footer_link_discover: 'Découvrir',
    footer_link_features: 'Fonctionnalités',
    footer_link_download: 'Télécharger',
    footer_link_faq: 'FAQ',
    footer_link_contact: 'Contact',
    footer_link_license: 'License Agreement',
    footer_link_privacy: 'Privacy Policy',
    footer_link_cookies: 'Cookie Policy',
    footer_cta_text: 'Votre infrastructure Linux mérite un audit.<br>Simple, rapide, accessible à tous.<br>Téléchargez CyberDiag maintenant.',
    footer_cta_btn: 'TÉLÉCHARGER',
    marquee_text: 'SÉCURISEZ VOS SYSTÈMES <span class="marquee-dot">🞼</span> AUDITEZ VOS RÉSEAUX <span class="marquee-dot">🞼</span> PROTÉGEZ VOS DONNÉES <span class="marquee-dot">🞼</span> SÉCURISEZ VOS SYSTÈMES <span class="marquee-dot">🞼</span> AUDITEZ VOS RÉSEAUX <span class="marquee-dot">🞼</span> PROTÉGEZ VOS DONNÉES <span class="marquee-dot">🞼</span>&nbsp;',
  },
  en: {
    nav_download: 'DOWNLOAD',
    hero_overtitle: '( Developed by the Dyvine team )',
    hero_title: 'AUDIT,<br>MASTER.',
    hero_description: 'CyberDiag analyzes and audits the security of your Linux systems and networks, providing a clear view of your vulnerabilities.',
    hero_btn_download: 'DOWNLOAD',
    hero_btn_faq: 'FAQ',
    hero_scroll: 'Scroll to discover',
    hero_tagline: '( Our priority 🢆 )',
    discover_title: 'EXPLORE<br>CYBERDIAG.',
    discover_desc: 'A system & network audit, readable by everyone.<br>From accountants to pentesters — an output adapted to each profile, an expert mode to go further.',
    features_title: 'FEATURES',
    features_subtitle: 'Discover everything CyberDiag can do for you.',
    tab_modules: 'Modules',
    tab_history: 'History',
    tab_results: 'Results',
    tab_questions: 'Questionnaire',
    tab_levels: 'Levels',
    feature_badge: 'included in the app',
    feature_1_title: 'Two modes of use',
    feature_1_desc: 'Separate modules for system and network analyses, adapted to each profile.',
    feature_2_title: 'History',
    feature_2_desc: 'Find the complete history of your past analyses at a glance.',
    feature_3_title: 'Detailed results',
    feature_3_desc: 'Detailed and exportable results in HTML to share your audits easily.',
    feature_4_title: 'Questionnaire',
    feature_4_desc: 'A questionnaire to adapt the level of results and obtain a personalized profile.',
    feature_5_title: 'Scan levels',
    feature_5_desc: 'Different scan levels to always match the user\'s level.',
    dl_cta_text: 'Secure your Linux infrastructure in minutes.<br>CyberDiag, free, designed by enthusiasts.',
    dl_distro_label: 'Available on',
    dl_btn_text: 'Download CyberDiag (.zip)',
    dl_version: 'v1.0 — 12 MB',
    dl_tools_title: 'Our team\'s tools',
    faq_title: 'FREQUENTLY ASKED QUESTIONS',
    faq_q1: 'Does CyberDiag work on all Linux distributions?',
    faq_a1: 'Yes, CyberDiag is compatible with major Linux distributions (Debian, Ubuntu, CentOS, Fedora, Arch, etc.).',
    faq_q2: 'Is CyberDiag free?',
    faq_a2: 'CyberDiag is an open-source project developed in a university context. It is completely free.',
    faq_q3: 'Do I need root privileges to use CyberDiag?',
    faq_a3: 'Some analyses require administrator rights to access system configurations. Using sudo is recommended.',
    faq_q4: 'How to contribute to the project?',
    faq_a4: 'You can contribute via our GitHub repository. Any contribution is welcome: code, documentation, feedback.',
    footer_studio: 'Dyvine team&nbsp;Creations.',
    footer_location: '( Vannes — France )',
    footer_legal: '© 2026 CyberDiag, Dyvine team Creations. All rights reserved.',
    footer_col_index: 'Index',
    footer_col_legal: 'Legal',
    footer_col_socials: 'Socials',
    footer_link_hero: 'Hero',
    footer_link_discover: 'Discover',
    footer_link_features: 'Features',
    footer_link_download: 'Download',
    footer_link_faq: 'FAQ',
    footer_link_contact: 'Contact',
    footer_link_license: 'License Agreement',
    footer_link_privacy: 'Privacy Policy',
    footer_link_cookies: 'Cookie Policy',
    footer_cta_text: 'Your Linux infrastructure deserves an audit.<br>Simple, fast, accessible to all.<br>Download CyberDiag now.',
    footer_cta_btn: 'DOWNLOAD',
    marquee_text: 'SECURE YOUR SYSTEMS <span class="marquee-dot">🞼</span> AUDIT YOUR NETWORKS <span class="marquee-dot">🞼</span> PROTECT YOUR DATA <span class="marquee-dot">🞼</span> SECURE YOUR SYSTEMS <span class="marquee-dot">🞼</span> AUDIT YOUR NETWORKS <span class="marquee-dot">🞼</span> PROTECT YOUR DATA <span class="marquee-dot">🞼</span>&nbsp;',
  },
  de: {
    nav_download: 'HERUNTERLADEN',
    hero_overtitle: '( Entwickelt vom Team Dyvine )',
    hero_title: 'AUDITIEREN,<br>BEHERRSCHEN.',
    hero_description: 'CyberDiag analysiert und auditiert die Sicherheit Ihrer Linux-Systeme und -Netzwerke, um Ihnen einen klaren Überblick über Ihre Schwachstellen zu geben.',
    hero_btn_download: 'HERUNTERLADEN',
    hero_btn_faq: 'HÄUFIGE FRAGEN',
    hero_scroll: 'Scrollen zum Entdecken',
    hero_tagline: '( Unsere Priorität 🢆 )',
    discover_title: 'ERKUNDEN SIE<br>CYBERDIAG.',
    discover_desc: 'Ein System- und Netzwerkaudit, für jeden lesbar.<br>Vom Buchhalter bis zum Pentester — eine an jedes Profil angepasste Ausgabe, ein Expertenmodus für Fortgeschrittene.',
    features_title: 'FUNKTIONEN',
    features_subtitle: 'Entdecken Sie alles, was CyberDiag für Sie tun kann.',
    tab_modules: 'Module',
    tab_history: 'Verlauf',
    tab_results: 'Ergebnisse',
    tab_questions: 'Fragebogen',
    tab_levels: 'Stufen',
    feature_badge: 'in der App enthalten',
    feature_1_title: 'Zwei Nutzungsmodi',
    feature_1_desc: 'Getrennte Module für System- und Netzwerkanalysen, angepasst an jedes Profil.',
    feature_2_title: 'Verlauf',
    feature_2_desc: 'Finden Sie den vollständigen Verlauf Ihrer vergangenen Analysen auf einen Blick.',
    feature_3_title: 'Detaillierte Ergebnisse',
    feature_3_desc: 'Detaillierte und in HTML exportierbare Ergebnisse, um Ihre Audits einfach zu teilen.',
    feature_4_title: 'Fragebogen',
    feature_4_desc: 'Ein Fragebogen zur Anpassung des Ergebnisniveaus und zum Erhalt eines personalisierten Profils.',
    feature_5_title: 'Scan-Stufen',
    feature_5_desc: 'Verschiedene Scan-Stufen, um immer auf dem gleichen Niveau wie der Benutzer zu sein.',
    dl_cta_text: 'Sichern Sie Ihre Linux-Infrastruktur in wenigen Minuten.<br>CyberDiag, kostenlos, von Enthusiasten entwickelt.',
    dl_distro_label: 'Verfügbar auf',
    dl_btn_text: 'CyberDiag herunterladen (.zip)',
    dl_version: 'v1.0 — 12 MB',
    dl_tools_title: 'Die Werkzeuge unseres Teams',
    faq_title: 'HÄUFIGE FRAGEN',
    faq_q1: 'Funktioniert CyberDiag auf allen Linux-Distributionen?',
    faq_a1: 'Ja, CyberDiag ist mit den wichtigsten Linux-Distributionen (Debian, Ubuntu, CentOS, Fedora, Arch usw.) kompatibel.',
    faq_q2: 'Ist CyberDiag kostenlos?',
    faq_a2: 'CyberDiag ist ein Open-Source-Projekt, das im universitären Rahmen entwickelt wurde. Es ist völlig kostenlos.',
    faq_q3: 'Benötigt man Root-Rechte, um CyberDiag zu nutzen?',
    faq_a3: 'Einige Analysen erfordern Administratorrechte, um auf Systemkonfigurationen zuzugreifen. Es wird empfohlen, es mit sudo auszuführen.',
    faq_q4: 'Wie kann man zum Projekt beitragen?',
    faq_a4: 'Sie können über unser GitHub-Repository beitragen. Jede Form von Beitrag ist willkommen: Code, Dokumentation, Feedback.',
    footer_studio: 'Team Dyvine&nbsp;Kreationen.',
    footer_location: '( Vannes — Frankreich )',
    footer_legal: '© 2026 CyberDiag, Team Dyvine Kreationen. Alle Rechte vorbehalten.',
    footer_col_index: 'Index',
    footer_col_legal: 'Rechtliches',
    footer_col_socials: 'Soziales',
    footer_link_hero: 'Hero',
    footer_link_discover: 'Entdecken',
    footer_link_features: 'Funktionen',
    footer_link_download: 'Herunterladen',
    footer_link_faq: 'Häufig gestellte Fragen',
    footer_link_contact: 'Kontakt',
    footer_link_license: 'Lizenzvereinbarung',
    footer_link_privacy: 'Datenschutzerklärung',
    footer_link_cookies: 'Cookie-Richtlinie',
    footer_cta_text: 'Ihre Linux-Infrastruktur verdient ein Audit.<br>Einfach, schnell, für alle zugänglich.<br>Laden Sie CyberDiag jetzt herunter.',
    footer_cta_btn: 'HERUNTERLADEN',
    marquee_text: 'SYSTEME SICHERN <span class="marquee-dot">🞼</span> NETZWERKE AUDITIEREN <span class="marquee-dot">🞼</span> DATEN SCHÜTZEN <span class="marquee-dot">🞼</span> SYSTEME SICHERN <span class="marquee-dot">🞼</span> NETZWERKE AUDITIEREN <span class="marquee-dot">🞼</span> DATEN SCHÜTZEN <span class="marquee-dot">🞼</span>&nbsp;',
  },
  es: {
    nav_download: 'DESCARGAR',
    hero_overtitle: '( Desarrollado por el equipo Dyvine )',
    hero_title: 'AUDITA,<br>DOMINA.',
    hero_description: 'CyberDiag analiza y audita la seguridad de sus sistemas y redes Linux, para ofrecerle una visión clara de sus vulnerabilidades.',
    hero_btn_download: 'DESCARGAR',
    hero_btn_faq: 'PREGUNTAS FRECUENTES',
    hero_scroll: 'Desliza para descubrir',
    hero_tagline: '( Nuestra prioridad 🢆 )',
    discover_title: 'EXPLORE<br>CYBERDIAG.',
    discover_desc: 'Una auditoría de sistema y red, legible para todos.<br>Desde el contable hasta el pentester — una salida adaptada a cada perfil, un modo experto para ir más allá.',
    features_title: 'FUNCIONALIDADES',
    features_subtitle: 'Descubra todo lo que CyberDiag puede hacer por usted.',
    tab_modules: 'Módulos',
    tab_history: 'Historial',
    tab_results: 'Resultados',
    tab_questions: 'Cuestionario',
    tab_levels: 'Niveles',
    feature_badge: 'incluido en la app',
    feature_1_title: 'Dos modos de uso',
    feature_1_desc: 'Módulos separados para análisis de sistema y red, adaptados a cada perfil.',
    feature_2_title: 'Historial',
    feature_2_desc: 'Encuentre el historial completo de sus análisis pasados de un vistazo.',
    feature_3_title: 'Resultados detallados',
    feature_3_desc: 'Resultados detallados y exportables en HTML para compartir sus auditorías fácilmente.',
    feature_4_title: 'Cuestionario',
    feature_4_desc: 'Un cuestionario para adaptar el nivel de los resultados y obtener un perfil personalizado.',
    feature_5_title: 'Niveles de escaneo',
    feature_5_desc: 'Diferentes niveles de escaneo para estar siempre al mismo nivel que el usuario.',
    dl_cta_text: 'Asegure su infraestructura Linux en minutos.<br>CyberDiag, gratuito, diseñado por entusiastas.',
    dl_distro_label: 'Disponible en',
    dl_btn_text: 'Descargar CyberDiag (.zip)',
    dl_version: 'v1.0 — 12 MB',
    dl_tools_title: 'Las herramientas de nuestro equipo',
    faq_title: 'PREGUNTAS FRECUENTES',
    faq_q1: '¿Funciona CyberDiag en todas las distribuciones Linux?',
    faq_a1: 'Sí, CyberDiag es compatible con las principales distribuciones Linux (Debian, Ubuntu, CentOS, Fedora, Arch, etc.).',
    faq_q2: '¿CyberDiag es gratuito?',
    faq_a2: 'CyberDiag es un proyecto de código abierto desarrollado en un marco universitario. Es completamente gratuito.',
    faq_q3: '¿Se necesitan derechos de root para usar CyberDiag?',
    faq_a3: 'Algunos análisis requieren derechos de administrador para acceder a las configuraciones del sistema. Se recomienda ejecutarlo con sudo.',
    faq_q4: '¿Cómo contribuir al proyecto?',
    faq_a4: 'Puede contribuir a través de nuestro repositorio de GitHub. Cualquier contribución es bienvenida: código, documentación, comentarios.',
    footer_studio: 'Equipo Dyvine&nbsp;Creaciones.',
    footer_location: '( Vannes — Francia )',
    footer_legal: '© 2026 CyberDiag, Equipo Dyvine Creaciones. Todos los derechos reservados.',
    footer_col_index: 'Índice',
    footer_col_legal: 'Legal',
    footer_col_socials: 'Redes',
    footer_link_hero: 'Inicio',
    footer_link_discover: 'Descubrir',
    footer_link_features: 'Funcionalidades',
    footer_link_download: 'Descargar',
    footer_link_faq: 'Preguntas Frecuentes',
    footer_link_contact: 'Contacto',
    footer_link_license: 'Acuerdo de Licencia',
    footer_link_privacy: 'Política de Privacidad',
    footer_link_cookies: 'Política de Cookies',
    footer_cta_text: 'Su infraestructura Linux merece una auditoría.<br>Simple, rápido, accesible para todos.<br>Descargue CyberDiag ahora.',
    footer_cta_btn: 'DESCARGAR',
    marquee_text: 'ASEGURE SUS SISTEMAS <span class="marquee-dot">🞼</span> AUDITE SUS REDES <span class="marquee-dot">🞼</span> PROTEJA SUS DATOS <span class="marquee-dot">🞼</span> ASEGURE SUS SISTEMAS <span class="marquee-dot">🞼</span> AUDITE SUS REDES <span class="marquee-dot">🞼</span> PROTEJA SUS DATOS <span class="marquee-dot">🞼</span>&nbsp;',
  },
  ja: {
    nav_download: 'ダウンロード',
    hero_overtitle: '( Dyvine 開発チーム )',
    hero_title: '監査、<br>マスター。',
    hero_description: 'CyberDiagは、Linuxシステムやネットワークのセキュリティを分析・監査し、脆弱性を明確に可視化します。',
    hero_btn_download: 'ダウンロード',
    hero_btn_faq: 'よくある質問',
    hero_scroll: 'スクロールして詳細を見る',
    hero_tagline: '( 私たちの最優先事項 🢆 )',
    discover_title: 'CYBERDIAGを<br>体験する',
    discover_desc: '誰もが理解できるシステム＆ネットワーク監査。<br>経理担当者からペンテスターまで — それぞれのスキルに応じた出力と、より高度な操作が可能な専門家モードを搭載しています。',
    features_title: '機能',
    features_subtitle: 'CyberDiagが提供するさまざまな機能をご紹介します。',
    tab_modules: 'モジュール',
    tab_history: '履歴',
    tab_results: '監査結果',
    tab_questions: 'アンケート',
    tab_levels: 'レベル',
    feature_badge: '標準搭載',
    feature_1_title: '2つの使用モード',
    feature_1_desc: 'システム分析とネットワーク分析のモジュールを分け、ユーザーの目的やスキルレベルに合わせて利用可能です。',
    feature_2_title: '履歴',
    feature_2_desc: '過去の監査履歴を一覧で分かりやすく確認できます。',
    feature_3_title: '詳細な監査結果',
    feature_3_desc: 'HTML形式で出力できる詳細なレポート機能。監査結果の共有も簡単です。',
    feature_4_title: '事前アンケート',
    feature_4_desc: 'アンケートを通じて結果の粒度を調整し、最適なプロファイルを設定します。',
    feature_5_title: 'スキャンレベル',
    feature_5_desc: 'ユーザーの技術レベルに合わせた、複数のスキャンレベルを選択できます。',
    dl_cta_text: '数分でLinuxインフラの安全性を確保。<br>CyberDiagは、熱心な有志によって開発された完全無料のオープンソースツールです。',
    dl_distro_label: '対応ディストリビューション',
    dl_btn_text: 'CyberDiagをダウンロード (.zip)',
    dl_version: 'v1.0 — 12 MB',
    dl_tools_title: '開発チームの使用ツール',
    faq_title: 'よくある質問',
    faq_q1: 'CyberDiagはあらゆるLinuxディストリビューションで動作しますか？',
    faq_a1: 'はい、主要なLinuxディストリビューション（Debian、Ubuntu、CentOS、Fedora、Archなど）と互換性があります。',
    faq_q2: 'CyberDiagは無料ですか？',
    faq_a2: 'CyberDiagは大学での研究プロジェクトとして開発されたオープンソースソフトウェアであり、完全に無料です。',
    faq_q3: 'CyberDiagを使用するにはroot権限が必要ですか？',
    faq_a3: 'システム設定の奥深くへアクセスする一部の機能では、管理者権限が必要です。そのため、sudoでの実行を推奨しています。',
    faq_q4: 'プロジェクトへの貢献方法は？',
    faq_a4: 'GitHubリポジトリからご参加いただけます。コードの修正、ドキュメントの改善、フィードバックなど、どのような形での貢献も歓迎しています。',
    footer_studio: 'Dyvine 開発チーム',
    footer_location: '( フランス・ヴァンヌ )',
    footer_legal: '© 2026 CyberDiag, Dyvine Team. All rights reserved.',
    footer_col_index: 'インデックス',
    footer_col_legal: '規約',
    footer_col_socials: 'SNS',
    footer_link_hero: 'トップ',
    footer_link_discover: '特徴',
    footer_link_features: '機能',
    footer_link_download: 'ダウンロード',
    footer_link_faq: 'よくある質問',
    footer_link_contact: 'お問い合わせ',
    footer_link_license: 'ライセンス契約',
    footer_link_privacy: 'プライバシーポリシー',
    footer_link_cookies: 'クッキーポリシー',
    footer_cta_text: 'お使いのLinux環境に確かな安全を。<br>シンプルで高速、そして誰もが使いやすいツール。<br>今すぐCyberDiagをダウンロードしてください。',
    footer_cta_btn: 'ダウンロード',
    marquee_text: 'システムを保護 <span class="marquee-dot">🞼</span> ネットワークを監査 <span class="marquee-dot">🞼</span> データを守り抜く <span class="marquee-dot">🞼</span> システムを保護 <span class="marquee-dot">🞼</span> ネットワークを監査 <span class="marquee-dot">🞼</span> データを守り抜く <span class="marquee-dot">🞼</span>&nbsp;',
  },
};

let currentLang = 'fr';
const langCycle = ['fr', 'en', 'de', 'es', 'ja'];

function setLanguage(lang) {
  currentLang = lang;
  const t = translations[lang];

  // Simple data-i18n text elements (supports innerHTML for <br> and <strong>)
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    if (t[key] !== undefined) {
      el.innerHTML = t[key];
    }
  });

  // Feature cards (title + desc combined)
  document.querySelectorAll('.feature-card').forEach((card) => {
    const titleKey = card.getAttribute('data-i18n-title');
    const descKey = card.getAttribute('data-i18n-desc');
    const titleEl = card.querySelector('h3');
    const descEl = card.querySelector('p');
    if (titleKey && t[titleKey] && titleEl) titleEl.innerHTML = t[titleKey];
    if (descKey && t[descKey] && descEl) descEl.innerHTML = t[descKey];
  });

  // Update lang toggle label (next language in cycle)
  const langLabel = document.querySelector('#lang-toggle .lang-label');
  if (langLabel) {
    const nextIdx = (langCycle.indexOf(lang) + 1) % langCycle.length;
    langLabel.textContent = `${lang.toUpperCase()} to ${langCycle[nextIdx].toUpperCase()}`;
  }
}

// ————————————————————————————————————————
// DOM Ready
// ————————————————————————————————————————
window.addEventListener('DOMContentLoaded', () => {
  // ——— Lenis Smooth Scroll ———
  // Drive Lenis exclusively via GSAP ticker (never use both RAF + ticker)
  gsap.registerPlugin(ScrollTrigger);

  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  });

  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
  lenis.on('scroll', ScrollTrigger.update);

  // ——— Preloader / Intro animation ———
  const preloader = document.getElementById('preloader');
  const pLogo = document.getElementById('preloader-logo');
  const pName = document.getElementById('preloader-name');
  const pContent = document.querySelector('.preloader-content');

  // Split pName into individual character spans for per-letter animation
  const rawText = pName.textContent.trim();
  pName.innerHTML = rawText.split('').map(ch =>
    `<span class="char" style="display:inline-block;will-change:transform,opacity,clip-path;">${ch}</span>`
  ).join('');
  const chars = [...pName.querySelectorAll('.char')];

  // Prevent scroll during preloader
  lenis.stop();

  // Container: positioned correctly, fully visible (chars control their own visibility)
  gsap.set(pName, { yPercent: -50, opacity: 1 });
  // Each char: hidden below a clip mask + slight downward offset
  gsap.set(chars, { opacity: 0, clipPath: 'inset(0 0 110% 0)', y: 12 });

  const introTL = gsap.timeline({
    onComplete: () => {
      lenis.start();
      preloader.style.pointerEvents = 'none';
      initSectionAnimations();
      initLogoParallax();
      initFooterAnimations();
      initHeroMouseParallax();
      initFeaturesCarousel();
      initDownloadSection();
    },
  });

  introTL
    // 1. Logo fades in — alone, centred
    .to(pLogo, { opacity: 1, duration: 0.75, ease: 'power2.out' })

    // 2. Short pause so the logo is seen alone
    .to({}, { duration: 0.45 })

    // 3. Truly simultaneous — all three start together:
    //    • pContent shifts LEFT so the group ends up centred on screen
    //    • pName container moves RIGHT from logo-centre to its natural position
    //    • chars clip-reveal from right to left, mixed with opacity + y lift
    .to(pContent, {
      x: () => -(pName.offsetWidth / 2),
      duration: 0.9,
      ease: 'power3.inOut',
    })
    .fromTo(pName,
      { x: () => -(pLogo.offsetWidth / 2 + pName.offsetWidth / 2) },
      { x: 0, duration: 0.9, ease: 'power3.inOut' },
      '<')
    .to(chars, {
      opacity: 1,
      clipPath: 'inset(0 0 0% 0)',
      y: 0,
      duration: 0.55,
      ease: 'power2.out',
      stagger: { each: 0.045, from: 'end' }, // rightmost letter first
    }, '<')

    // 4. Hold a beat
    .to({}, { duration: 0.5 })

    // 5. Curtain rises
    .to(preloader, { yPercent: -100, duration: 1, ease: 'power3.inOut' });

  // ——— Headbar show/hide on scroll direction ———
  const headbar = document.getElementById('headbar');
  let lastScrollY = 0;
  const heroHeight = window.innerHeight;

  lenis.on('scroll', ({ scroll, direction }) => {
    // Always visible within the hero area
    if (scroll <= heroHeight * 0.15) {
      headbar.classList.remove('hidden');
    } else if (direction === 1) {
      // Scrolling DOWN → hide
      headbar.classList.add('hidden');
    } else if (direction === -1) {
      // Scrolling UP → show
      headbar.classList.remove('hidden');
    }
    lastScrollY = scroll;
  });

  // ——— Language toggle ———
  document.getElementById('lang-toggle').addEventListener('click', () => {
    const currentIdx = langCycle.indexOf(currentLang);
    const nextLang = langCycle[(currentIdx + 1) % langCycle.length];
    setLanguage(nextLang);
  });
});

// ————————————————————————————————————————
// 3D Logo parallax — moves at half speed, disappears behind white
// ————————————————————————————————————————
function initLogoParallax() {
  // The hero-section scrolls up at 100vh over its own height.
  // Pushing the logo DOWN by 50vh means its net upward travel = 50vh = half speed.
  gsap.to('.hero-logo-wrapper', {
    scrollTrigger: {
      trigger: '.hero-section',
      start: 'top top',
      end: 'bottom top',
      scrub: true,
    },
    y: window.innerHeight * 0.5,   // counter-movement: DOWN by 50vh → rises 2× slower
    ease: 'none',
  });
}

// ————————————————————————————————————————
// Footer text clip-path reveal animations
// ————————————————————————————————————————
function initFooterAnimations() {

  // Set all footer text elements invisible initially
  const allEls = [
    '.footer-studio', '.footer-ubs', '.footer-location',
    '.footer-legal', '.footer-wordmark',
    '.footer-col-title', '.footer-link',
    '.footer-cta'
  ];
  gsap.set(allEls, { clipPath: 'inset(0 0 100% 0)', y: 18, opacity: 0 });

  // Single timeline — ScrollTrigger controls play/reverse
  const tl = gsap.timeline({
    paused: true,
    defaults: { ease: 'power3.out' },
  });

  tl.to('.footer-studio', { clipPath: 'inset(0 0 0% 0)', y: 0, opacity: 1, duration: 0.7 }, 0)
    .to('.footer-ubs', { clipPath: 'inset(0 0 0% 0)', y: 0, opacity: 1, duration: 0.7 }, 0.08)
    .to('.footer-location', { clipPath: 'inset(0 0 0% 0)', y: 0, opacity: 1, duration: 0.7 }, 0.16)
    .to('.footer-legal', { clipPath: 'inset(0 0 0% 0)', y: 0, opacity: 1, duration: 0.7 }, 0.22)
    .to('.footer-wordmark', { clipPath: 'inset(0 0 0% 0)', y: 0, opacity: 1, duration: 0.8 }, 0.12);

  // Link columns staggered
  document.querySelectorAll('.footer-link-col').forEach((col, ci) => {
    const base = 0.1 + ci * 0.1;
    tl.to(col.querySelector('.footer-col-title'), { clipPath: 'inset(0 0 0% 0)', y: 0, opacity: 1, duration: 0.6 }, base);
    col.querySelectorAll('.footer-link').forEach((link, li) => {
      tl.to(link, { clipPath: 'inset(0 0 0% 0)', y: 0, opacity: 1, duration: 0.5 }, base + 0.1 + li * 0.07);
    });
  });

  tl.to('.footer-cta', { clipPath: 'inset(0 0 0% 0)', y: 0, opacity: 1, duration: 0.8 }, 0.3);

  // One ScrollTrigger drives the whole timeline
  ScrollTrigger.create({
    trigger: '#footer',
    start: 'top 80%',
    onEnter: () => tl.play(),
    onLeaveBack: () => tl.reverse(),
    onEnterBack: () => tl.play(),
  });
}

// ————————————————————————————————————————
// Hero mouse parallax — subtle logo drift following cursor
// ————————————————————————————————————————
function initHeroMouseParallax() {
  const logo = document.querySelector('.hero-3d-logo');
  const hero = document.querySelector('.hero-section');
  if (!logo || !hero) return;

  // quickTo for buttery smooth interpolation
  const setX = gsap.quickTo(logo, 'x', { duration: 1.2, ease: 'power3.out' });
  const setY = gsap.quickTo(logo, 'y', { duration: 1.2, ease: 'power3.out' });

  const STRENGTH = 28; // max px offset

  hero.addEventListener('mousemove', (e) => {
    const rect = hero.getBoundingClientRect();
    // Normalise to [-1, 1]
    const nx = (e.clientX - rect.left) / rect.width * 2 - 1;
    const ny = (e.clientY - rect.top) / rect.height * 2 - 1;
    setX(nx * STRENGTH);
    setY(ny * STRENGTH * 0.6);
  });

  hero.addEventListener('mouseleave', () => {
    setX(0);
    setY(0);
  });
}

// ————————————————————————————————————————
// Section scroll-triggered animations
// ————————————————————————————————————————
function initSectionAnimations() {
  // Animate section titles
  gsap.utils.toArray('.section-title').forEach((title) => {
    // Skip features-title — it has its own animation
    if (title.classList.contains('features-title')) return;
    gsap.from(title, {
      scrollTrigger: {
        trigger: title,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
      y: 40,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out',
    });
  });

  // Discover grid columns
  gsap.from('.discover-left', {
    scrollTrigger: {
      trigger: '.discover-grid',
      start: 'top 80%',
      toggleActions: 'play none none none',
    },
    y: 50,
    opacity: 0,
    duration: 0.9,
    ease: 'power2.out',
  });

  gsap.from('.discover-right', {
    scrollTrigger: {
      trigger: '.discover-grid',
      start: 'top 80%',
      toggleActions: 'play none none none',
    },
    y: 50,
    opacity: 0,
    duration: 0.9,
    delay: 0.15,
    ease: 'power2.out',
  });

  // FAQ items stagger
  gsap.from('.faq-item', {
    scrollTrigger: {
      trigger: '.faq-list',
      start: 'top 80%',
      toggleActions: 'play none none none',
    },
    y: 20,
    opacity: 0,
    duration: 0.5,
    stagger: 0.1,
    ease: 'power2.out',
  });
}

// ————————————————————————————————————————
// Features Carousel — 2D Circular Gallery
// Adapted from ReactBits circular-gallery concept
// ————————————————————————————————————————
function initFeaturesCarousel() {
  const cards = gsap.utils.toArray('.feature-card');
  const tabs = gsap.utils.toArray('.feature-tab');
  const carousel = document.querySelector('.features-carousel');
  const track = document.querySelector('.features-track');
  const total = cards.length;

  // --- Config ---
  const BEND = 400;         // curve intensity in px (higher = more arc + tilt)
  const SCROLL_SPEED = 12;  // drag sensitivity multiplier
  const SCROLL_EASE = 0.05; // lerp factor
  const PADDING = 120;      // px gap between cards

  // --- Sizing ---
  let containerW, containerH, cardW, cardH, itemW, totalW;

  function measure() {
    containerW = carousel.clientWidth;
    containerH = carousel.clientHeight;
    const sample = cards[0];
    cardW = sample.offsetWidth;
    cardH = sample.offsetHeight;
    itemW = cardW + PADDING;
    totalW = itemW * total;
  }
  measure();

  // --- Scroll state ---
  const scroll = { current: 0, target: 0, last: 0, position: 0 };
  let isDown = false;
  let startX = 0;
  let raf;

  // Each card tracks an "extra" offset for infinite wrapping
  const extras = new Array(total).fill(0);

  // --- Position + bend each card ---
  function layoutCards() {
    const halfW = containerW / 2;
    const direction = scroll.current > scroll.last ? 'right' : 'left';

    cards.forEach((card, i) => {
      // Base x: index * itemWidth - scroll - extra (wrapping)
      const baseX = itemW * i - scroll.current - extras[i];
      // Center the card strip: offset so that first card sits near center at scroll=0
      const x = baseX + halfW - cardW / 2;

      // Vertical bend (arc): cards further from center dip down
      let posY = (containerH - cardH) / 2; // vertical center
      let rot = 0;
      const centerX = x + cardW / 2 - halfW;

      if (BEND !== 0) {
        const B_abs = Math.abs(BEND);
        const H = halfW;
        const R = (H * H + B_abs * B_abs) / (2 * B_abs);
        const effectiveX = Math.min(Math.abs(centerX), H);
        const arc = R - Math.sqrt(Math.max(0, R * R - effectiveX * effectiveX));

        if (BEND > 0) {
          posY += arc;
          rot = Math.sign(centerX) * Math.asin(Math.min(effectiveX / R, 1)) * (180 / Math.PI);
        } else {
          posY -= arc;
          rot = -Math.sign(centerX) * Math.asin(Math.min(effectiveX / R, 1)) * (180 / Math.PI);
        }
      }

      card.style.transform = `translate3d(${x}px, ${posY}px, 0) rotate(${rot}deg)`;

      // Infinite wrapping — always check both directions
      const planeRight = x + cardW;
      const planeLeft = x;

      if (planeRight < -cardW) {
        extras[i] -= totalW;
      } else if (planeLeft > containerW + cardW) {
        extras[i] += totalW;
      }
    });
  }

  // --- Active card detection ---
  function updateActiveTab() {
    let idx = Math.round(scroll.current / itemW) % total;
    if (idx < 0) idx += total;
    tabs.forEach((tab, i) => tab.classList.toggle('active', i === idx));
  }

  // --- Snap to nearest card ---
  function snapToNearest() {
    const idx = Math.round(scroll.target / itemW);
    scroll.target = idx * itemW;
  }

  const debouncedSnap = debounce(snapToNearest, 350);

  function debounce(fn, wait) {
    let t;
    return function () {
      clearTimeout(t);
      t = setTimeout(fn, wait);
    };
  }

  // --- Animation loop ---
  function update() {
    scroll.current += (scroll.target - scroll.current) * SCROLL_EASE;
    layoutCards();
    updateActiveTab();
    scroll.last = scroll.current;
    raf = requestAnimationFrame(update);
  }

  // --- Input handlers ---
  // Prevent images / cards from being natively dragged
  carousel.addEventListener('dragstart', (e) => e.preventDefault());

  function onPointerDown(e) {
    isDown = true;
    startX = e.clientX ?? 0;
    scroll.position = scroll.current;
    carousel.style.cursor = 'grabbing';
  }

  function onPointerMove(e) {
    if (!isDown) return;
    const x = e.clientX ?? 0;
    const dist = (startX - x) * (SCROLL_SPEED * 0.025) * (containerW / 400);
    scroll.target = scroll.position + dist;
  }

  function onPointerUp() {
    if (!isDown) return;
    isDown = false;
    carousel.style.cursor = 'grab';
    debouncedSnap();
  }

  // Tab clicks
  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const idx = parseInt(tab.dataset.index, 10);
      scroll.target = idx * itemW;
    });
  });

  // Card clicks — only navigate if not dragging
  let pointerDownX = 0;
  cards.forEach((card) => {
    card.addEventListener('mousedown', (e) => { pointerDownX = e.clientX; });
    card.addEventListener('click', (e) => {
      if (Math.abs(e.clientX - pointerDownX) > 5) return; // was a drag
      const idx = parseInt(card.dataset.index, 10);
      scroll.target = idx * itemW;
    });
  });

  // Bind events — drag on entire carousel zone, not just cards
  carousel.addEventListener('mousedown', onPointerDown);
  window.addEventListener('mousemove', onPointerMove);
  window.addEventListener('mouseup', onPointerUp);
  carousel.addEventListener('touchstart', (e) => {
    isDown = true;
    startX = e.touches[0].clientX;
    scroll.position = scroll.current;
    carousel.style.cursor = 'grabbing';
  }, { passive: true });
  carousel.addEventListener('touchmove', (e) => {
    if (!isDown) return;
    const x = e.touches[0].clientX;
    const dist = (startX - x) * (SCROLL_SPEED * 0.025) * (containerW / 400);
    scroll.target = scroll.position + dist;
  }, { passive: true });
  carousel.addEventListener('touchend', onPointerUp);

  // Resize
  window.addEventListener('resize', () => {
    measure();
  });

  // Initial layout then start loop
  // Default to card index 2 (Résultats détaillés)
  scroll.current = 2 * itemW;
  scroll.target = 2 * itemW;
  layoutCards();
  update();

  // Scroll-triggered entrance animations
  gsap.from('.features-title', {
    scrollTrigger: {
      trigger: '.features-section',
      start: 'top 80%',
      toggleActions: 'play none none none',
    },
    y: 40,
    opacity: 0,
    duration: 0.8,
    ease: 'power2.out',
  });

  gsap.from('.features-subtitle', {
    scrollTrigger: {
      trigger: '.features-section',
      start: 'top 80%',
      toggleActions: 'play none none none',
    },
    y: 30,
    opacity: 0,
    duration: 0.7,
    delay: 0.1,
    ease: 'power2.out',
  });

  gsap.from('.features-selector', {
    scrollTrigger: {
      trigger: '.features-section',
      start: 'top 75%',
      toggleActions: 'play none none none',
    },
    y: 25,
    opacity: 0,
    duration: 0.7,
    delay: 0.2,
    ease: 'power2.out',
  });

  gsap.from('.features-carousel', {
    scrollTrigger: {
      trigger: '.features-carousel',
      start: 'top 85%',
      toggleActions: 'play none none none',
    },
    y: 50,
    opacity: 0,
    duration: 0.9,
    delay: 0.15,
    ease: 'power2.out',
  });
}

// ————————————————————————————————————————
// Download Section — distro cycling + entrance animations
// ————————————————————————————————————————
function initDownloadSection() {
  // --- Vertical ticker scrolling animation ---
  const ticker = document.getElementById('distro-ticker');
  const track = document.getElementById('distro-track');
  if (!ticker || !track) return;

  const items = track.querySelectorAll('.dl-distro-name');
  const total = items.length;
  if (total === 0) return;

  // Clone the first item at the end for seamless loop
  const firstClone = items[0].cloneNode(true);
  track.appendChild(firstClone);

  let currentIndex = 0;

  function scrollToNext() {
    currentIndex++;
    gsap.to(track, {
      y: () => -(currentIndex * items[0].offsetHeight),
      duration: 0.5,
      ease: 'power2.inOut',
      onComplete: () => {
        // If we reached the clone, instantly jump back to the real first item
        if (currentIndex >= total) {
          currentIndex = 0;
          gsap.set(track, { y: 0 });
        }
      }
    });
  }

  setInterval(scrollToNext, 2200);

  // --- Scroll-triggered entrance animations ---
  const dlElements = ['.dl-cta-box', '.dl-distro-box', '.dl-install-box', '.dl-img-box', '.dl-tools-band'];

  gsap.set(dlElements, { clipPath: 'inset(0 0 100% 0)', y: 30, opacity: 0 });

  const dlTL = gsap.timeline({
    paused: true,
    defaults: { ease: 'power3.out' },
  });

  dlTL.to('.dl-cta-box', { clipPath: 'inset(0 0 0% 0)', y: 0, opacity: 1, duration: 0.7 }, 0)
    .to('.dl-distro-box', { clipPath: 'inset(0 0 0% 0)', y: 0, opacity: 1, duration: 0.7 }, 0.1)
    .to('.dl-install-box', { clipPath: 'inset(0 0 0% 0)', y: 0, opacity: 1, duration: 0.8 }, 0.2)
    .to('.dl-img-box', { clipPath: 'inset(0 0 0% 0)', y: 0, opacity: 1, duration: 0.9 }, 0.15)
    .to('.dl-tools-band', { clipPath: 'inset(0 0 0% 0)', y: 0, opacity: 1, duration: 0.7 }, 0.35);

  ScrollTrigger.create({
    trigger: '#download',
    start: 'top 80%',
    onEnter: () => dlTL.play(),
    onLeaveBack: () => dlTL.reverse(),
    onEnterBack: () => dlTL.play(),
  });
}
