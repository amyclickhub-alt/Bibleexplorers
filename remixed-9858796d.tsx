import { useState, useEffect, useRef } from "react";

// ─── THEME PALETTE ───────────────────────────────────────────────
const themes = {
  faith:      { color: "#F59E0B", bg: "#FEF3C7", icon: "⭐", dark: "#92400E", grad: "linear-gradient(135deg,#F59E0B,#D97706)" },
  obedience:  { color: "#10B981", bg: "#D1FAE5", icon: "🙏", dark: "#065F46", grad: "linear-gradient(135deg,#10B981,#059669)" },
  honour:     { color: "#8B5CF6", bg: "#EDE9FE", icon: "👑", dark: "#4C1D95", grad: "linear-gradient(135deg,#8B5CF6,#7C3AED)" },
  growth:     { color: "#3B82F6", bg: "#DBEAFE", icon: "🌱", dark: "#1E3A8A", grad: "linear-gradient(135deg,#3B82F6,#2563EB)" },
  kindness:   { color: "#EC4899", bg: "#FCE7F3", icon: "💝", dark: "#831843", grad: "linear-gradient(135deg,#EC4899,#DB2777)" },
  grace:      { color: "#F97316", bg: "#FFEDD5", icon: "✨", dark: "#7C2D12", grad: "linear-gradient(135deg,#F97316,#EA580C)" },
  mercy:      { color: "#06B6D4", bg: "#CFFAFE", icon: "🕊️", dark: "#164E63", grad: "linear-gradient(135deg,#06B6D4,#0891B2)" },
  wisdom:     { color: "#84CC16", bg: "#ECFCCB", icon: "📜", dark: "#3F6212", grad: "linear-gradient(135deg,#84CC16,#65A30D)" },
  courage:    { color: "#EF4444", bg: "#FEE2E2", icon: "🦁", dark: "#7F1D1D", grad: "linear-gradient(135deg,#EF4444,#DC2626)" },
  gratitude:  { color: "#A78BFA", bg: "#F5F3FF", icon: "🌸", dark: "#4C1D95", grad: "linear-gradient(135deg,#A78BFA,#8B5CF6)" },
  prayer:     { color: "#0EA5E9", bg: "#E0F2FE", icon: "💫", dark: "#0C4A6E", grad: "linear-gradient(135deg,#0EA5E9,#0284C7)" },
  love:       { color: "#F43F5E", bg: "#FFE4E6", icon: "❤️", dark: "#881337", grad: "linear-gradient(135deg,#F43F5E,#E11D48)" },
};

// ─── MASCOT ANIMALS ──────────────────────────────────────────────
const mascots = [
  { name: "Leo", emoji: "🦁", personality: "Brave & Bold", color: "#F59E0B" },
  { name: "Dove", emoji: "🕊️", personality: "Peaceful & Gentle", color: "#06B6D4" },
  { name: "Lamb", emoji: "🐑", personality: "Kind & Caring", color: "#EC4899" },
  { name: "Eagle", emoji: "🦅", personality: "Wise & Strong", color: "#8B5CF6" },
];

// ─── 365 LESSONS (sampled across all 12 months / 7 themes cycling) ──
function generateLessons() {
  const lessonBank = [
    // FAITH
    { theme:"faith", title:"What is Faith?", verse:"Hebrews 11:1", verseText:"Now faith is confidence in what we hope for and assurance about what we do not see.", lesson:"Faith is like a superpower God gives us! When it's dark at night, you can't see the sun, but you KNOW it will rise in the morning. That's faith — believing in something even when you can't see it right now. God asks us to trust Him the same way.", activity:"Draw a picture of something you believe in but can't see — like the wind, love, or God's plan for your life!", prayer:"Dear God, help me to believe in You even when things are hard. Grow my faith like a big strong tree. Amen.", memoryVerse:"\"Faith is confidence in what we hope for.\" — Heb 11:1", quiz:{question:"Faith means trusting God even when we can't ___?",answer:"see",options:["see","play","eat","sleep"]}},
    { theme:"faith", title:"Abraham's Great Faith", verse:"Genesis 12:1", verseText:"The Lord had said to Abram, 'Go from your country... to the land I will show you.'", lesson:"God asked Abraham to leave everything he knew — his home, his friends, his comfort — and go to a place he had never seen. And Abraham went! He didn't need a map. He just trusted God. That is BIG faith. God is asking us to trust Him even when we don't know the whole plan.", activity:"On a piece of paper, write 'I trust God with:' and list three things you're worried about. Then pray over each one.", prayer:"Lord, give me faith like Abraham. Help me to follow You even when I don't know where You're leading. Amen.", memoryVerse:"\"Abraham believed God, and it was counted as righteousness.\" — Rom 4:3", quiz:{question:"Abraham left his home because he trusted...",answer:"God",options:["his friends","a map","God","himself"]}},
    { theme:"faith", title:"Walking on Water", verse:"Matthew 14:29", verseText:"'Come,' Jesus said. Then Peter got down out of the boat, walked on the water and came toward Jesus.", lesson:"Peter did something impossible — he walked on water! But the moment he looked at the waves instead of Jesus, he started to sink. This teaches us that when we keep our eyes on Jesus, faith takes us further than we ever thought possible. Distractions make us sink!", activity:"Write down one big 'scary wave' in your life right now. Then write: 'But my eyes are on Jesus!'", prayer:"Jesus, when I feel afraid, help me to look at YOU and not at my problems. I trust You to hold me up. Amen.", memoryVerse:"\"Fix your eyes on Jesus, the author and finisher of our faith.\" — Heb 12:2", quiz:{question:"When Peter looked at the ___ instead of Jesus, he sank.",answer:"waves",options:["boat","waves","sky","fish"]}},
    { theme:"faith", title:"The Mustard Seed Faith", verse:"Matthew 17:20", verseText:"If you have faith as small as a mustard seed, you can say to this mountain, 'Move from here to there,' and it will move.", lesson:"A mustard seed is TINY — smaller than a pea! But Jesus said even that little bit of faith can move mountains. God doesn't need a perfect, giant faith. He just needs YOUR faith — even the small, shaky kind. Plant it and watch it grow!", activity:"Find the smallest seed you can (or draw one). Label it 'My faith' and then draw what it can grow into!", prayer:"God, I only have a tiny faith sometimes. But I give You all of it. Please grow it into something mountain-moving! Amen.", memoryVerse:"\"With God, nothing is impossible.\" — Luke 1:37", quiz:{question:"Jesus said faith like a mustard seed can move a ___?",answer:"mountain",options:["tree","mountain","river","city"]}},
    // OBEDIENCE
    { theme:"obedience", title:"Obeying God and Our Parents", verse:"Ephesians 6:1", verseText:"Children, obey your parents in the Lord, for this is right.", lesson:"Did you know that obeying your parents is actually obeying God? God put parents in our lives to protect and guide us. When Noah obeyed God and built the ark, everyone was saved! Obedience is not just following rules — it's showing God you trust His plan.", activity:"Write one way you can obey your parents TODAY without being asked. Then do it!", prayer:"Lord, help me to obey my parents and You with a happy heart. Help me to understand that Your instructions are for my good. Amen.", memoryVerse:"\"Children, obey your parents in the Lord.\" — Eph 6:1", quiz:{question:"Who obeyed God and built a big boat?",answer:"Noah",options:["Moses","Noah","David","Paul"]}},
    { theme:"obedience", title:"Samuel Hears God's Voice", verse:"1 Samuel 3:10", verseText:"Samuel said, 'Speak, for your servant is listening.'", lesson:"Little Samuel was just a boy when God called his name in the night. He didn't know it was God at first — but when he found out, he said 'Speak Lord, I'm listening.' What a beautiful response! Obedience begins with listening. God is still speaking today — through the Bible, through prayer, through wise people in our lives.", activity:"Sit quietly for 2 minutes today. No phone, no TV. Just ask God: 'What do You want to say to me?' Write down anything that comes to mind.", prayer:"Speak, Lord — I'm listening! Help me to hear Your voice and obey quickly and joyfully. Amen.", memoryVerse:"\"Speak, for your servant is listening.\" — 1 Sam 3:10", quiz:{question:"What did Samuel say to God when he heard His voice?",answer:"Speak, I'm listening",options:["Go away","Who are you?","Speak, I'm listening","I'm sleeping"]}},
    { theme:"obedience", title:"Mary's 'Yes' to God", verse:"Luke 1:38", verseText:"'I am the Lord's servant,' Mary answered. 'May your word to me be fulfilled.'", lesson:"When the angel told Mary she would be the mother of Jesus, it was shocking and scary news! She didn't understand everything. But she said YES to God anyway. Her obedience changed the whole world! Sometimes God asks us to do something we don't fully understand. Like Mary, our 'yes' can change everything.", activity:"Write your own 'Yes, God' statement — something you've been holding back from doing because it seems hard or scary.", prayer:"God, like Mary, I want to say yes to You even when it's hard. I am Your servant. Use me for Your glory. Amen.", memoryVerse:"\"I am the Lord's servant. May it be as you have said.\" — Luke 1:38", quiz:{question:"Mary said YES to God even though she was...",answer:"scared",options:["happy","ready","scared","sleeping"]}},
    // HONOUR
    { theme:"honour", title:"Honouring God with Our Words", verse:"Proverbs 18:21", verseText:"The tongue has the power of life and death, and those who love it will eat its fruit.", lesson:"Your words are like seeds! Kind words grow beautiful flowers, but mean words can hurt like thorns. God wants us to speak life into others — to encourage, lift up, and bless the people around us. Even when it's hard, choose words that make people feel loved!", activity:"Write 3 kind things you can say to your family members today and say them out loud!", prayer:"God, be a guard over my mouth. Help my words to be full of kindness and love, just like Your words to us. Amen.", memoryVerse:"\"The tongue has the power of life and death.\" — Prov 18:21", quiz:{question:"Our words are like seeds that can grow into?",answer:"Life or death",options:["Trees","Flowers","Life or death","Rain"]}},
    { theme:"honour", title:"Honouring God with Our Actions", verse:"Colossians 3:23", verseText:"Whatever you do, work at it with all your heart, as working for the Lord, not for human masters.", lesson:"Imagine if everything you did today — eating breakfast, doing homework, playing, cleaning your room — was done as a gift to God. That changes everything! When we do ordinary things with extraordinary love for God, our whole life becomes worship.", activity:"Pick one task you don't enjoy and do it TODAY as if you're doing it for Jesus. Notice how it feels different!", prayer:"Lord, help me to do everything with excellence, as if I'm doing it for You — because I am! Amen.", memoryVerse:"\"Do everything as working for the Lord.\" — Col 3:23", quiz:{question:"The Bible says to work as if we're working for...",answer:"the Lord",options:["our parents","ourselves","the Lord","our teachers"]}},
    // KINDNESS
    { theme:"kindness", title:"The Good Samaritan's Heart", verse:"Luke 10:27", verseText:"Love your neighbor as yourself.", lesson:"Jesus told a story about a man who was hurt on the road. Two people walked right past him! But a third man — a Samaritan — stopped, helped, and paid for his care. Jesus said THAT is what a neighbor looks like. Kindness means stopping for others, even when it's inconvenient.", activity:"Do one act of kindness for someone who can't repay you — a neighbor, a sibling, or someone at school.", prayer:"Jesus, give me eyes to see people who need help today. Give me a heart like the Good Samaritan. Amen.", memoryVerse:"\"Love your neighbor as yourself.\" — Luke 10:27", quiz:{question:"In Jesus's story, who stopped to help the hurt man?",answer:"The Samaritan",options:["The priest","The Levite","The Samaritan","A soldier"]}},
    { theme:"kindness", title:"Jonathan's Incredible Friendship", verse:"1 Samuel 18:3", verseText:"And Jonathan made a covenant with David because he loved him as himself.", lesson:"Jonathan was the prince — HE should have been king! But he loved David so much that he helped him, protected him, and gave up his royal claim. That's the kindest friendship in the Bible. Real kindness sometimes means putting others first, even when it costs you something.", activity:"Write a letter to your best friend telling them specifically why they're special to you.", prayer:"God, give me a heart like Jonathan — one that loves others more than I love my own comfort. Amen.", memoryVerse:"\"A friend loves at all times.\" — Prov 17:17", quiz:{question:"Jonathan showed kindness by giving up his right to be...",answer:"king",options:["rich","king","popular","right"]}},
    // GRACE
    { theme:"grace", title:"God's Amazing Grace", verse:"Ephesians 2:8", verseText:"For it is by grace you have been saved, through faith — and this is not from yourselves, it is the gift of God.", lesson:"Imagine your friend broke your favourite toy but you still gave them a big hug and said 'I forgive you — and here's a new one.' That's a tiny picture of grace! Grace is getting something GOOD that you didn't earn. God's grace means He loves and forgives us even when we make mistakes — not because we're perfect, but because HE is.", activity:"Think of someone who made a mistake. Write them an encouraging note showing them grace.", prayer:"Heavenly Father, thank You for Your grace — for loving me even when I mess up. Help me to show that same grace to others. Amen.", memoryVerse:"\"By grace you have been saved, through faith.\" — Eph 2:8", quiz:{question:"Grace is getting something good that you did NOT?",answer:"earn",options:["earn","want","share","lose"]}},
    { theme:"grace", title:"The Prodigal Son Returns", verse:"Luke 15:20", verseText:"But while he was still a long way off, his father saw him and was filled with compassion for him; he ran to his son.", lesson:"The son in this story made terrible choices — he wasted everything. He expected punishment when he came home. But instead, his father RAN to meet him, hugged him, and threw a party! That father is a picture of God. No matter how far you've run, God runs back to you with open arms.", activity:"Draw the father running to meet his son. Then write your name on the son's shirt — because that's YOU!", prayer:"Father, thank You that You run toward me, not away from me. Thank You for welcoming me home every time I wander. Amen.", memoryVerse:"\"While he was still far off, his father ran to him.\" — Luke 15:20", quiz:{question:"When the lost son returned, his father...",answer:"ran to him",options:["ignored him","punished him","ran to him","sent him away"]}},
    // MERCY
    { theme:"mercy", title:"God's Mercy Never Ends", verse:"Lamentations 3:22-23", verseText:"Because of the Lord's great love we are not consumed, for his compassions never fail. They are new every morning.", lesson:"Every single morning when you wake up, God's mercy is brand new — like a fresh page in a notebook! Mercy means not getting the punishment we deserve. Like when you accidentally broke a rule but instead of punishment, you got a second chance. God gives us second chances EVERY. SINGLE. DAY.", activity:"Start a 'Mercy Journal' — each morning write one thing God's mercy gave you (a new day, health, family, food).", prayer:"Lord, thank You that Your mercies are new every morning. I don't deserve Your goodness, but You give it freely. Help me to be merciful to others too. Amen.", memoryVerse:"\"His compassions never fail. They are new every morning.\" — Lam 3:22-23", quiz:{question:"How often is God's mercy renewed?",answer:"Every morning",options:["Once a year","Every morning","On Sundays","When we're good"]}},
    { theme:"mercy", title:"Joseph Forgives His Brothers", verse:"Genesis 50:20", verseText:"You intended to harm me, but God intended it for good.", lesson:"Joseph's brothers threw him in a pit and sold him as a slave! Years later, Joseph had the power to punish them. Instead, he showed mercy and forgave them completely. He understood that God can turn even the worst situations into something beautiful. Mercy doesn't mean pretending the hurt didn't happen — it means choosing forgiveness anyway.", activity:"Is there someone who hurt you? Write their name on paper, then write 'I choose to forgive ___' and say it out loud.", prayer:"God, give me the heart of Joseph — to see Your hand even in painful things, and to choose forgiveness over bitterness. Amen.", memoryVerse:"\"You meant evil, but God meant it for good.\" — Gen 50:20", quiz:{question:"Joseph showed mercy to his brothers even though they had...",answer:"sold him as a slave",options:["stolen from him","sold him as a slave","ignored him","lied about him"]}},
    // GROWTH
    { theme:"growth", title:"Growing in the Spirit", verse:"Galatians 5:22-23", verseText:"The fruit of the Spirit is love, joy, peace, patience, kindness, goodness, faithfulness, gentleness, and self-control.", lesson:"A tree doesn't grow fruit overnight — it takes water, sunshine, and time. The same is true for us! When we spend time with God through prayer, reading the Bible, and helping others, the fruits of the Spirit start growing in our hearts. Today, let's see which fruit God is growing in you!", activity:"Draw a big fruit tree and write one fruit of the Spirit on each piece of fruit. Circle the one you want to grow more this week!", prayer:"Holy Spirit, help me grow Your fruit in my heart. Water me with Your Word and shine Your light on me every day. Amen.", memoryVerse:"\"The fruit of the Spirit is love, joy, peace...\" — Gal 5:22", quiz:{question:"How many fruits of the Spirit are listed in Galatians 5?",answer:"9",options:["7","9","12","3"]}},
    { theme:"growth", title:"Daniel's Courageous Stand", verse:"Daniel 1:8", verseText:"Daniel resolved not to defile himself with the royal food and wine.", lesson:"Daniel was taken to a foreign country and pressured to eat food that went against God's commands. It would have been EASY to just go along with everyone else. But Daniel made a firm decision to honour God. And guess what — God blessed him for it! Sometimes growing spiritually means standing firm when everyone else is doing something different.", activity:"Write down one thing you can stand firm on this week — even if others don't.", prayer:"God, give me the courage of Daniel. Help me to honour You even when it's not popular or easy. Amen.", memoryVerse:"\"Daniel resolved not to defile himself.\" — Dan 1:8", quiz:{question:"Daniel stood firm even when he was under ___ to compromise.",answer:"pressure",options:["pressure","attack","sadness","confusion"]}},
    // WISDOM
    { theme:"wisdom", title:"Solomon's Wise Choice", verse:"1 Kings 3:9", verseText:"Give your servant a discerning heart to govern your people and to distinguish between right and wrong.", lesson:"When God appeared to Solomon and said 'Ask for anything!', Solomon could have asked for riches, power, or a long life. Instead he asked for WISDOM. And God was so pleased that He gave Solomon wisdom AND everything else! God loves it when we ask for wisdom — it shows we want to live His way.", activity:"Write a prayer asking God for wisdom in one specific area of your life this week.", prayer:"God, like Solomon, I ask You for wisdom — to know right from wrong, to make good choices, and to understand Your ways. Amen.", memoryVerse:"\"If any of you lacks wisdom, let them ask God.\" — Jas 1:5", quiz:{question:"When God said 'ask for anything', Solomon asked for...",answer:"wisdom",options:["gold","wisdom","power","fame"]}},
    { theme:"wisdom", title:"The Wise and Foolish Builders", verse:"Matthew 7:24", verseText:"Everyone who hears these words of mine and puts them into practice is like a wise man who built his house on the rock.", lesson:"Jesus told a story about two builders. One built on rock — solid, safe, unmovable. The other built on sand — and when the storm came, CRASH! The difference wasn't the storm. It was the foundation. When we build our lives on God's Word, we can stand through anything.", activity:"Draw two houses — one on rock, one on sand. Label the rock 'God's Word'. Now write 3 ways you can build on that rock today.", prayer:"Lord, help me to build my life on Your Word — not just hear it, but DO it. Be my rock and my foundation. Amen.", memoryVerse:"\"Build your house on the rock.\" — Matt 7:24", quiz:{question:"The wise builder in Jesus's story built his house on a ___?",answer:"rock",options:["rock","hill","sand","cloud"]}},
    // COURAGE
    { theme:"courage", title:"David and the Giant", verse:"1 Samuel 17:45", verseText:"You come against me with sword and spear... but I come against you in the name of the Lord Almighty.", lesson:"Everyone else saw a giant that was too big to fight. David saw a giant that was too big to miss! He wasn't fearless — he was faith-full. He ran TOWARD Goliath because He knew God was bigger. Whatever giants you face today — fear, loneliness, sickness, bullying — you have the same God David had!", activity:"Draw your 'giant' (the thing you're most afraid of). Then write 'But God is BIGGER' across it in bold letters.", prayer:"God, I have giants in my life too. Help me to run toward them in Your name, knowing You fight for me. Amen.", memoryVerse:"\"The battle belongs to the Lord.\" — 1 Sam 17:47", quiz:{question:"David defeated Goliath by trusting in the power of...",answer:"God",options:["his sword","his strength","God","his friends"]}},
    // GRATITUDE
    { theme:"gratitude", title:"Ten Lepers, One Thankful Heart", verse:"Luke 17:15-16", verseText:"One of them, when he saw he was healed, came back, praising God in a loud voice.", lesson:"Jesus healed TEN men who had leprosy — a terrible skin disease. They were all healed! But only ONE came back to say thank you. Jesus actually asked, 'Where are the other nine?' Gratitude matters to God. Don't be one of the nine who forgot — be the ONE who came back!", activity:"Write 10 things you are grateful to God for right now. Try to go beyond the obvious ones!", prayer:"Lord, I don't want to be one of the nine who forgot to say thank You. Today I come back to praise You with all my heart! Amen.", memoryVerse:"\"Give thanks in all circumstances.\" — 1 Thess 5:18", quiz:{question:"Out of ten healed men, how many came back to thank Jesus?",answer:"1",options:["10","5","1","3"]}},
    // PRAYER
    { theme:"prayer", title:"The Lord's Prayer", verse:"Matthew 6:9", verseText:"Our Father in heaven, hallowed be your name, your kingdom come, your will be done, on earth as it is in heaven.", lesson:"Jesus taught His disciples HOW to pray. Prayer isn't a magic spell or a shopping list — it's a CONVERSATION with God. The Lord's Prayer shows us how: start by worshipping God, ask for His will, bring your needs, ask for forgiveness, and ask for protection. Prayer is the most powerful tool we have!", activity:"Pray the Lord's Prayer slowly today, pausing after each line to think about what it means.", prayer:"Father, teach me to pray like Jesus prayed — with love, trust, humility, and boldness. I want to talk to You every day. Amen.", memoryVerse:"\"Our Father in heaven, hallowed be Your name.\" — Matt 6:9", quiz:{question:"Jesus taught us to pray to God as our...",answer:"Father",options:["King","Father","Master","Creator"]}},
    // LOVE
    { theme:"love", title:"The Greatest Commandment", verse:"John 13:34", verseText:"A new command I give you: Love one another. As I have loved you, so you must love one another.", lesson:"Jesus gave His disciples only ONE new command before He went to the cross: Love each other. Not just your friends, not just people who are nice to you — LOVE ONE ANOTHER. The way Jesus loved us — sacrificially, completely, unconditionally. That kind of love changes families, schools, and the whole world.", activity:"Show ONE person 'Jesus love' today — do something kind for them that costs you something (your time, your turn, your last piece of candy).", prayer:"Jesus, Your love is the most incredible thing in the universe. Fill me with that love so I can give it away every single day. Amen.", memoryVerse:"\"Love one another as I have loved you.\" — John 13:34", quiz:{question:"Jesus's new command was to love one another as He has...",answer:"loved us",options:["taught us","loved us","forgiven us","blessed us"]}},
  ];

  const lessons = [];
  for (let d = 1; d <= 365; d++) {
    const base = lessonBank[(d - 1) % lessonBank.length];
    lessons.push({ ...base, day: d });
  }
  return lessons;
}

const ALL_LESSONS = generateLessons();

// ─── PRAYER CATEGORIES ───────────────────────────────────────────
const prayerCategories = [
  { id:"thanksgiving", label:"Thank You",   icon:"🙏", color:"#F59E0B" },
  { id:"family",       label:"My Family",   icon:"👨‍👩‍👧‍👦", color:"#10B981" },
  { id:"forgiveness",  label:"Forgiveness", icon:"💛", color:"#8B5CF6" },
  { id:"help",         label:"I Need Help", icon:"🆘", color:"#3B82F6" },
  { id:"friends",      label:"My Friends",  icon:"👫", color:"#EC4899" },
  { id:"world",        label:"The World",   icon:"🌍", color:"#06B6D4" },
];

const prayerStarters = [
  "Dear God, today I am grateful for...",
  "Heavenly Father, please help me with...",
  "Lord, I want to thank You for...",
  "Jesus, please watch over...",
  "God, I'm sorry for... Please forgive me.",
  "Father, I pray for my friend who...",
  "God, help me to be more...",
  "Lord, Your Word says... and I believe it!",
];

// ─── PRICING ─────────────────────────────────────────────────────
const PRICING = {
  USD: { symbol: "$",  six: "14.99",  twelve: "24.99", sixPer: "2.50/mo",  twelvePer: "2.08/mo" },
  NGN: { symbol: "₦", six: "22,500", twelve: "37,500", sixPer: "3,750/mo", twelvePer: "3,125/mo" },
};

// ─── AI PRAYER RESPONSE ──────────────────────────────────────────
async function getAIPrayerResponse(prayerText) {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      system: `You are a gentle, warm, and encouraging Bible-based guide for children aged 6-14. 
When a child shares their prayer with you, respond with:
1. A warm, age-appropriate affirmation of their prayer (2 sentences)
2. A short encouraging Bible verse that relates to what they prayed (with reference)
3. A practical, simple "faith step" they can take today (1 sentence)
Keep your response under 100 words total. Be joyful, loving, and simple. Never scary or preachy.`,
      messages: [{ role: "user", content: `A child prayed: "${prayerText}". Please respond to their prayer.` }]
    })
  });
  const data = await res.json();
  return data.content?.map(i => i.text || "").join("") || "God hears every prayer! Keep talking to Him. 🙏";
}

// ─── AUDIO NARRATION ─────────────────────────────────────────────
function speakText(text, rate = 0.85, pitch = 1.1) {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.rate = rate; u.pitch = pitch; u.volume = 1;
  const voices = window.speechSynthesis.getVoices();
  const preferred = voices.find(v => v.name.includes("Google") || v.name.includes("Samantha") || v.name.includes("Karen"));
  if (preferred) u.voice = preferred;
  window.speechSynthesis.speak(u);
}

// ══════════════════════════════════════════════════════════════════
// MAIN APP
// ══════════════════════════════════════════════════════════════════
export default function KidsBibleApp() {
  const [screen, setScreen]               = useState("splash");
  const [currentDay, setCurrentDay]       = useState(1);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [prayerText, setPrayerText]       = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [savedPrayers, setSavedPrayers]   = useState([]);
  const [completedDays, setCompletedDays] = useState([1,2,3]);
  const [quizAnswer, setQuizAnswer]       = useState(null);
  const [streak, setStreak]               = useState(3);
  const [starCount, setStarCount]         = useState(14);
  const [showSubscription, setShowSubscription] = useState(false);
  const [currency, setCurrency]           = useState("USD");
  const [userName, setUserName]           = useState("Explorer");
  const [mascotIdx, setMascotIdx]         = useState(0);
  const [lessonStep, setLessonStep]       = useState(0);
  const [aiResponse, setAiResponse]       = useState("");
  const [aiLoading, setAiLoading]         = useState(false);
  const [isSpeaking, setIsSpeaking]       = useState(false);
  const [activeTab, setActiveTab]         = useState("home");
  const [parentPin, setParentPin]         = useState("");
  const [parentUnlocked, setParentUnlocked] = useState(false);
  const [splashDone, setSplashDone]       = useState(false);
  const [nameInput, setNameInput]         = useState("");
  const [onboarding, setOnboarding]       = useState(false);

  const lesson  = selectedLesson || ALL_LESSONS[currentDay - 1];
  const themeD  = lesson ? (themes[lesson.theme] || themes.faith) : themes.faith;
  const mascot  = mascots[mascotIdx];
  const P       = PRICING[currency];

  useEffect(() => {
    const t = setTimeout(() => setSplashDone(true), 2800);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (screen === "lesson") { setQuizAnswer(null); setAiResponse(""); }
  }, [screen, selectedLesson]);

  const speak = (text) => {
    if (isSpeaking) { window.speechSynthesis.cancel(); setIsSpeaking(false); return; }
    setIsSpeaking(true);
    speakText(text, 0.85, 1.1);
    setTimeout(() => setIsSpeaking(false), text.length * 55);
  };

  const markComplete = () => {
    if (!completedDays.includes(lesson.day)) {
      setCompletedDays(p => [...p, lesson.day]);
      setStarCount(s => s + 5);
    }
    setScreen("home"); setActiveTab("home"); setLessonStep(0); setQuizAnswer(null); setAiResponse("");
  };

  const savePrayer = async () => {
    if (!prayerText.trim()) return;
    setSavedPrayers(p => [{ id: Date.now(), text: prayerText, category: selectedCategory, date: new Date().toLocaleDateString() }, ...p]);
    setStarCount(s => s + 2);
    setAiLoading(true);
    try { const r = await getAIPrayerResponse(prayerText); setAiResponse(r); } catch { setAiResponse("God hears your prayer! Keep seeking Him every day. 🙏✨"); }
    setAiLoading(false);
    setPrayerText(""); setSelectedCategory(null);
  };

  // ─── SPLASH ──────────────────────────────────────────────────
  if (screen === "splash") return (
    <div style={{ minHeight:"100vh", background:"linear-gradient(160deg,#0F172A 0%,#1E1B4B 40%,#312E81 100%)", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", fontFamily:"'Georgia',serif", padding:20, textAlign:"center" }}>
      <style>{`
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
        @keyframes shimmer { 0%{opacity:.4} 50%{opacity:1} 100%{opacity:.4} }
        @keyframes fadeIn { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes pulse { 0%,100%{transform:scale(1)} 50%{transform:scale(1.05)} }
      `}</style>
      <div style={{ animation:"float 3s ease-in-out infinite", fontSize:80, marginBottom:16 }}>📖</div>
      <h1 style={{ color:"#FDE68A", fontSize:36, fontWeight:900, margin:"0 0 8px", letterSpacing:"-1px", animation:"shimmer 2s ease-in-out infinite" }}>Bible Explorers</h1>
      <p style={{ color:"#A78BFA", fontSize:16, margin:"0 0 40px" }}>365 Days of God's Amazing Word</p>
      <div style={{ display:"flex", gap:12, marginBottom:40 }}>
        {mascots.map((m, i) => (
          <div key={i} style={{ fontSize:32, animation:`float ${2+i*0.4}s ease-in-out infinite`, animationDelay:`${i*0.2}s` }}>{m.emoji}</div>
        ))}
      </div>
      {splashDone && !onboarding && (
        <div style={{ animation:"fadeIn 0.6s ease forwards" }}>
          <button onClick={() => setOnboarding(true)} style={{ background:"linear-gradient(135deg,#F59E0B,#D97706)", border:"none", color:"#fff", borderRadius:30, padding:"16px 48px", fontSize:18, fontWeight:900, cursor:"pointer", boxShadow:"0 8px 32px rgba(245,158,11,0.4)" }}>
            Start My Journey! ✨
          </button>
        </div>
      )}
      {splashDone && onboarding && (
        <div style={{ animation:"fadeIn 0.5s ease forwards", width:"100%", maxWidth:380 }}>
          <div style={{ background:"rgba(255,255,255,0.07)", borderRadius:24, padding:28, border:"1px solid rgba(255,255,255,0.12)" }}>
            <p style={{ color:"#E9D5FF", fontWeight:700, fontSize:16, margin:"0 0 16px" }}>What's your name, Explorer?</p>
            <input value={nameInput} onChange={e => setNameInput(e.target.value)} placeholder="Type your name here..."
              style={{ width:"100%", padding:"14px 16px", borderRadius:14, border:"2px solid #6D28D9", background:"rgba(255,255,255,0.08)", color:"#fff", fontSize:16, fontFamily:"Georgia,serif", outline:"none", boxSizing:"border-box", marginBottom:16 }} />
            <p style={{ color:"#C4B5FD", fontSize:14, margin:"0 0 14px" }}>Choose your companion:</p>
            <div style={{ display:"flex", gap:8, justifyContent:"center", marginBottom:20 }}>
              {mascots.map((m, i) => (
                <button key={i} onClick={() => setMascotIdx(i)}
                  style={{ background: i===mascotIdx ? m.color : "rgba(255,255,255,0.08)", border:`2px solid ${i===mascotIdx ? m.color : "rgba(255,255,255,0.2)"}`, borderRadius:14, padding:"10px 8px", cursor:"pointer", display:"flex", flexDirection:"column", alignItems:"center", gap:4 }}>
                  <span style={{ fontSize:28 }}>{m.emoji}</span>
                  <span style={{ color: i===mascotIdx ? "#fff" : "#A78BFA", fontSize:10, fontWeight:700 }}>{m.name}</span>
                </button>
              ))}
            </div>
            <p style={{ color:"#C4B5FD", fontSize:13, margin:"0 0 12px" }}>Pick your currency:</p>
            <div style={{ display:"flex", gap:8, justifyContent:"center", marginBottom:20 }}>
              {["USD","NGN"].map(c => (
                <button key={c} onClick={() => setCurrency(c)}
                  style={{ padding:"10px 28px", background: c===currency ? "#7C3AED" : "rgba(255,255,255,0.08)", border:`2px solid ${c===currency?"#7C3AED":"rgba(255,255,255,0.2)"}`, borderRadius:14, color: c===currency?"#fff":"#A78BFA", fontWeight:800, fontSize:14, cursor:"pointer" }}>
                  {c === "USD" ? "🇺🇸 USD" : "🇳🇬 NGN"}
                </button>
              ))}
            </div>
            <button onClick={() => { if(nameInput.trim()) setUserName(nameInput.trim()); setScreen("home"); setOnboarding(false); }}
              style={{ width:"100%", padding:14, background:"linear-gradient(135deg,#F59E0B,#D97706)", border:"none", borderRadius:14, color:"#fff", fontWeight:900, fontSize:16, cursor:"pointer" }}>
              Let's Go, {nameInput || "Explorer"}! 🚀
            </button>
          </div>
        </div>
      )}
    </div>
  );

  // ─── SUBSCRIPTION ────────────────────────────────────────────
  if (showSubscription) return (
    <div style={{ minHeight:"100vh", background:"linear-gradient(160deg,#0F172A,#1E1B4B,#312E81)", fontFamily:"'Georgia',serif", padding:"20px 16px 40px" }}>
      <style>{`@keyframes fadeIn{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}`}</style>
      <button onClick={() => setShowSubscription(false)} style={{ background:"rgba(255,255,255,0.1)", border:"none", color:"#C4B5FD", borderRadius:20, padding:"8px 16px", cursor:"pointer", marginBottom:24, fontSize:13 }}>← Back</button>

      <div style={{ textAlign:"center", marginBottom:28 }}>
        <div style={{ fontSize:52, marginBottom:8 }}>📖✨</div>
        <h1 style={{ color:"#FDE68A", fontSize:26, fontWeight:900, margin:"0 0 6px" }}>Bible Explorers Premium</h1>
        <p style={{ color:"#A78BFA", margin:0, fontSize:14 }}>Unlock 365 Days of God's Word for Kids</p>
        <div style={{ display:"flex", gap:8, justifyContent:"center", marginTop:16 }}>
          {["USD","NGN"].map(c => (
            <button key={c} onClick={() => setCurrency(c)}
              style={{ padding:"8px 20px", background: c===currency?"#7C3AED":"rgba(255,255,255,0.08)", border:`2px solid ${c===currency?"#7C3AED":"rgba(255,255,255,0.2)"}`, borderRadius:20, color: c===currency?"#fff":"#A78BFA", fontWeight:800, fontSize:13, cursor:"pointer" }}>
              {c==="USD" ? "🇺🇸 USD $" : "🇳🇬 NGN ₦"}
            </button>
          ))}
        </div>
      </div>

      {[
        { plan:"6-Month Adventure", price:`${P.symbol}${P.six}`, per:P.sixPer, badge:null, color:"#8B5CF6",
          features:["180 daily lessons","Prayer journal with AI responses","All 12 study themes","Quiz challenges","Audio narration","Printable activities"] },
        { plan:"12-Month Full Journey", price:`${P.symbol}${P.twelve}`, per:P.twelvePer, badge:"BEST VALUE", color:"#F59E0B",
          features:["All 365 daily lessons","Prayer journal with AI responses","All 12 study themes","Quiz challenges","Audio narration","Printable activities","Parent dashboard","Certificate of completion","Priority support"] },
      ].map(opt => (
        <div key={opt.plan} style={{ background:"rgba(255,255,255,0.06)", border:`2px solid ${opt.color}`, borderRadius:22, padding:22, marginBottom:16, position:"relative", animation:"fadeIn 0.5s ease" }}>
          {opt.badge && <div style={{ position:"absolute", top:-12, right:20, background:opt.color, color:"#fff", fontSize:11, fontWeight:900, padding:"4px 14px", borderRadius:20 }}>{opt.badge}</div>}
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:14 }}>
            <div><div style={{ color:"#fff", fontWeight:900, fontSize:17 }}>{opt.plan}</div><div style={{ color:opt.color, fontSize:13, marginTop:2 }}>{opt.per}</div></div>
            <div style={{ color:opt.color, fontSize:30, fontWeight:900 }}>{opt.price}</div>
          </div>
          {opt.features.map(f => <div key={f} style={{ color:"#E0E7FF", fontSize:13, padding:"3px 0", display:"flex", gap:8 }}><span style={{ color:opt.color }}>✓</span>{f}</div>)}
          <button onClick={() => { setShowSubscription(false); }} style={{ marginTop:16, width:"100%", padding:14, background:opt.color, color:"#fff", border:"none", borderRadius:14, fontWeight:900, fontSize:16, cursor:"pointer" }}>
            Subscribe to {opt.plan} →
          </button>
        </div>
      ))}

      <div style={{ background:"rgba(255,255,255,0.04)", borderRadius:16, padding:16, marginTop:8, textAlign:"center" }}>
        <p style={{ color:"#7C3AED", fontSize:12, margin:0 }}>🔒 Secure Payment · Cancel Anytime · Family-Safe Content</p>
        <p style={{ color:"#4C1D95", fontSize:11, margin:"6px 0 0" }}>All content reviewed by Christian educators · Ages 5–14</p>
      </div>
    </div>
  );

  // ─── PRAYER SCREEN ───────────────────────────────────────────
  if (activeTab === "prayer") return (
    <div style={{ minHeight:"100vh", background:"linear-gradient(160deg,#FFF9F0,#FEF3C7)", fontFamily:"'Georgia',serif", paddingBottom:80 }}>
      <div style={{ background:"linear-gradient(135deg,#F59E0B,#D97706)", padding:"24px 16px 32px" }}>
        <div style={{ fontSize:38, marginBottom:4 }}>🙏</div>
        <h1 style={{ color:"#fff", margin:"0 0 4px", fontSize:24, fontWeight:900 }}>Prayer Corner</h1>
        <p style={{ color:"#FEF3C7", margin:0, fontSize:13 }}>Talk to God — He's always listening! {mascot.emoji}</p>
      </div>
      <div style={{ padding:"20px 16px" }}>
        <h3 style={{ color:"#92400E", fontWeight:800, fontSize:14, marginBottom:10 }}>What are you praying about?</h3>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginBottom:16 }}>
          {prayerCategories.map(cat => (
            <button key={cat.id} onClick={() => setSelectedCategory(selectedCategory === cat.id ? null : cat.id)}
              style={{ background: selectedCategory===cat.id ? cat.color : "#fff", border:`2px solid ${cat.color}`, borderRadius:14, padding:"11px 8px", cursor:"pointer", display:"flex", flexDirection:"column", alignItems:"center", gap:4 }}>
              <span style={{ fontSize:20 }}>{cat.icon}</span>
              <span style={{ color: selectedCategory===cat.id?"#fff":cat.color, fontSize:11, fontWeight:700 }}>{cat.label}</span>
            </button>
          ))}
        </div>

        <h3 style={{ color:"#92400E", fontWeight:800, fontSize:14, marginBottom:8 }}>Prayer Starters 💡</h3>
        <div style={{ display:"flex", gap:8, overflowX:"auto", paddingBottom:8, marginBottom:14 }}>
          {prayerStarters.map((s, i) => (
            <button key={i} onClick={() => setPrayerText(s)} style={{ background:"#fff", border:"2px solid #FCD34D", borderRadius:20, padding:"7px 12px", cursor:"pointer", whiteSpace:"nowrap", color:"#92400E", fontSize:11, fontWeight:600 }}>{s.slice(0,26)}…</button>
          ))}
        </div>

        <textarea value={prayerText} onChange={e => setPrayerText(e.target.value)} placeholder="Write your prayer here... God hears every word! 🌟"
          style={{ width:"100%", minHeight:120, border:"2px solid #FCD34D", borderRadius:16, padding:14, fontSize:14, fontFamily:"Georgia,serif", color:"#78350F", background:"#FFFBF0", resize:"none", boxSizing:"border-box", outline:"none" }} />

        <button onClick={savePrayer} disabled={!prayerText.trim() || aiLoading}
          style={{ width:"100%", padding:14, background: prayerText.trim()&&!aiLoading ? "linear-gradient(135deg,#F59E0B,#D97706)" : "#E5E7EB", color:"#fff", border:"none", borderRadius:14, fontWeight:900, fontSize:16, cursor: prayerText.trim()?"pointer":"not-allowed", marginTop:10 }}>
          {aiLoading ? "✨ Getting response..." : "🙏 Send My Prayer (+2 ⭐)"}
        </button>

        {aiResponse && (
          <div style={{ marginTop:14, background:"linear-gradient(135deg,#FEF3C7,#FDE68A)", border:"2px solid #F59E0B", borderRadius:18, padding:18 }}>
            <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:10 }}>
              <span style={{ fontSize:24 }}>{mascot.emoji}</span>
              <span style={{ color:"#92400E", fontWeight:800, fontSize:14 }}>{mascot.name} says...</span>
            </div>
            <p style={{ color:"#78350F", fontSize:14, lineHeight:1.7, margin:0 }}>{aiResponse}</p>
            <button onClick={() => speak(aiResponse)} style={{ marginTop:10, background:"#F59E0B", border:"none", color:"#fff", borderRadius:20, padding:"7px 16px", fontSize:12, fontWeight:700, cursor:"pointer" }}>
              {isSpeaking ? "⏹ Stop" : "🔊 Read Aloud"}
            </button>
          </div>
        )}

        {savedPrayers.length > 0 && (
          <div style={{ marginTop:24 }}>
            <h3 style={{ color:"#92400E", fontWeight:900, fontSize:15, marginBottom:12 }}>📔 My Prayer Journal</h3>
            {savedPrayers.map(p => (
              <div key={p.id} style={{ background:"#fff", border:"1px solid #FDE68A", borderRadius:14, padding:14, marginBottom:10 }}>
                <div style={{ display:"flex", justifyContent:"space-between", marginBottom:6 }}>
                  <span style={{ fontSize:12, color:"#F59E0B", fontWeight:700 }}>{p.category ? prayerCategories.find(c=>c.id===p.category)?.icon : "🙏"} {p.date}</span>
                </div>
                <p style={{ color:"#78350F", fontSize:13, margin:0, lineHeight:1.5 }}>{p.text}</p>
              </div>
            ))}
          </div>
        )}
      </div>
      <BottomNav active={activeTab} onChange={setActiveTab} />
    </div>
  );

  // ─── LESSON SCREEN ───────────────────────────────────────────
  if (screen === "lesson") return (
    <div style={{ minHeight:"100vh", background:themeD.bg, fontFamily:"'Georgia',serif", paddingBottom:20 }}>
      <style>{`@keyframes fadeIn{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}`}</style>
      <div style={{ background:themeD.grad, padding:"20px 16px 28px" }}>
        <button onClick={() => { setScreen("home"); setLessonStep(0); setQuizAnswer(null); }} style={{ background:"rgba(255,255,255,0.2)", border:"none", color:"#fff", borderRadius:20, padding:"6px 14px", cursor:"pointer", fontSize:13, marginBottom:14 }}>← Back</button>
        <div style={{ display:"flex", gap:12, alignItems:"center" }}>
          <span style={{ fontSize:42 }}>{themeD.icon}</span>
          <div>
            <div style={{ color:"rgba(255,255,255,0.75)", fontSize:11, fontWeight:700, textTransform:"uppercase", letterSpacing:1 }}>Day {lesson.day} · {lesson.theme}</div>
            <h1 style={{ color:"#fff", margin:"3px 0 0", fontSize:20, fontWeight:900 }}>{lesson.title}</h1>
          </div>
        </div>
        <div style={{ display:"flex", gap:5, marginTop:16 }}>
          {["📖","📚","✏️","🎯","🙏"].map((s, i) => (
            <div key={i} style={{ flex:1, height:4, borderRadius:4, background: i<=lessonStep ? "rgba(255,255,255,0.92)" : "rgba(255,255,255,0.25)" }} />
          ))}
        </div>
        <div style={{ display:"flex", justifyContent:"space-between", marginTop:6 }}>
          {["Verse","Lesson","Activity","Quiz","Prayer"].map((s, i) => (
            <div key={i} style={{ fontSize:9, color: i===lessonStep?"#fff":"rgba(255,255,255,0.4)", fontWeight:700, textTransform:"uppercase" }}>{s}</div>
          ))}
        </div>
      </div>

      <div style={{ padding:"18px 16px", animation:"fadeIn 0.4s ease" }}>
        {/* STEP 0: VERSE */}
        {lessonStep===0 && (
          <div>
            <div style={{ background:"#fff", borderRadius:20, padding:22, border:`3px solid ${themeD.color}`, marginBottom:16 }}>
              <div style={{ color:themeD.color, fontSize:12, fontWeight:800, marginBottom:8, textTransform:"uppercase" }}>📖 Today's Verse</div>
              <div style={{ color:themeD.dark, fontSize:13, fontWeight:800, marginBottom:10 }}>{lesson.verse}</div>
              <p style={{ color:"#374151", fontSize:15, lineHeight:1.8, fontStyle:"italic", margin:0 }}>"{lesson.verseText}"</p>
              <button onClick={() => speak(lesson.verseText)} style={{ marginTop:12, background:themeD.color, border:"none", color:"#fff", borderRadius:20, padding:"7px 16px", fontSize:12, fontWeight:700, cursor:"pointer" }}>
                {isSpeaking ? "⏹ Stop" : "🔊 Listen"}
              </button>
            </div>
            <div style={{ background:themeD.grad, borderRadius:16, padding:16, marginBottom:14 }}>
              <p style={{ color:"#fff", fontSize:12, fontWeight:700, margin:"0 0 6px" }}>🌟 Memory Verse</p>
              <p style={{ color:"rgba(255,255,255,0.9)", fontSize:13, margin:0, lineHeight:1.5 }}>{lesson.memoryVerse}</p>
            </div>
            <p style={{ color:"#6B7280", fontSize:12, textAlign:"center" }}>Read the verse 3 times aloud before continuing!</p>
          </div>
        )}

        {/* STEP 1: LESSON */}
        {lessonStep===1 && (
          <div>
            <div style={{ background:"#fff", borderRadius:20, padding:22, boxShadow:"0 4px 20px rgba(0,0,0,0.07)", marginBottom:14 }}>
              <div style={{ color:themeD.color, fontSize:12, fontWeight:800, marginBottom:12, textTransform:"uppercase" }}>📚 Today's Lesson</div>
              <p style={{ color:"#374151", fontSize:14, lineHeight:1.85, margin:0 }}>{lesson.lesson}</p>
              <button onClick={() => speak(lesson.lesson)} style={{ marginTop:12, background:themeD.color, border:"none", color:"#fff", borderRadius:20, padding:"7px 16px", fontSize:12, fontWeight:700, cursor:"pointer" }}>
                {isSpeaking ? "⏹ Stop" : "🔊 Read to Me"}
              </button>
            </div>
            <div style={{ background:themeD.bg, borderRadius:16, padding:14, border:`1px solid ${themeD.color}` }}>
              <p style={{ color:themeD.dark, fontSize:12, fontWeight:600, margin:0 }}>💬 {mascot.emoji} {mascot.name} says: "This lesson is about {lesson.theme}! Think about how you can live this out today."</p>
            </div>
          </div>
        )}

        {/* STEP 2: ACTIVITY */}
        {lessonStep===2 && (
          <div>
            <div style={{ background:"#fff", borderRadius:20, padding:22, border:`2px dashed ${themeD.color}`, boxShadow:"0 4px 20px rgba(0,0,0,0.06)", marginBottom:14 }}>
              <div style={{ color:themeD.color, fontSize:12, fontWeight:800, marginBottom:12, textTransform:"uppercase" }}>✏️ Activity Time!</div>
              <p style={{ color:"#374151", fontSize:14, lineHeight:1.85, margin:0 }}>{lesson.activity}</p>
            </div>
            <div style={{ background:"linear-gradient(135deg,#F0FDF4,#DCFCE7)", borderRadius:16, padding:14, border:"1px solid #86EFAC" }}>
              <p style={{ color:"#166534", fontSize:12, fontWeight:600, margin:0 }}>💡 Tip: Ask a parent or sibling to do this with you! Learning together makes it even more special.</p>
            </div>
          </div>
        )}

        {/* STEP 3: QUIZ */}
        {lessonStep===3 && (
          <div>
            <div style={{ background:"#fff", borderRadius:20, padding:22, boxShadow:"0 4px 20px rgba(0,0,0,0.06)", marginBottom:14 }}>
              <div style={{ color:themeD.color, fontSize:12, fontWeight:800, marginBottom:14, textTransform:"uppercase" }}>🎯 Quiz Challenge!</div>
              <p style={{ color:"#1F2937", fontSize:16, fontWeight:800, marginBottom:18 }}>{lesson.quiz.question}</p>
              <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                {lesson.quiz.options.map(opt => (
                  <button key={opt} onClick={() => { setQuizAnswer(opt); if(opt===lesson.quiz.answer) setStarCount(s=>s+3); }}
                    style={{ padding:"13px 16px", border:`2px solid ${quizAnswer===opt?(opt===lesson.quiz.answer?"#10B981":"#EF4444"):themeD.color}`,
                      borderRadius:14, background: quizAnswer===opt?(opt===lesson.quiz.answer?"#D1FAE5":"#FEE2E2"):"#fff",
                      color: quizAnswer===opt?(opt===lesson.quiz.answer?"#065F46":"#991B1B"):themeD.dark,
                      fontWeight:700, fontSize:14, cursor:"pointer", textAlign:"left" }}>
                    {quizAnswer===opt?(opt===lesson.quiz.answer?"✅ ":"❌ "):"○ "}{opt}
                  </button>
                ))}
              </div>
              {quizAnswer===lesson.quiz.answer && (
                <div style={{ marginTop:14, background:"#D1FAE5", borderRadius:14, padding:14, textAlign:"center" }}>
                  <p style={{ color:"#065F46", fontWeight:900, fontSize:15, margin:0 }}>🎉 Correct! You earned +3 ⭐</p>
                </div>
              )}
              {quizAnswer && quizAnswer!==lesson.quiz.answer && (
                <div style={{ marginTop:14, background:"#FEF3C7", borderRadius:14, padding:14 }}>
                  <p style={{ color:"#92400E", fontWeight:700, fontSize:13, margin:0 }}>💛 Good try! The answer is: <strong>{lesson.quiz.answer}</strong>. Keep going — you're learning!</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* STEP 4: PRAYER */}
        {lessonStep===4 && (
          <div>
            <div style={{ background:"#fff", borderRadius:20, padding:22, boxShadow:"0 4px 20px rgba(0,0,0,0.06)", marginBottom:14 }}>
              <div style={{ color:themeD.color, fontSize:12, fontWeight:800, marginBottom:12, textTransform:"uppercase" }}>🙏 Prayer for Today</div>
              <p style={{ color:"#374151", fontSize:14, lineHeight:1.85, fontStyle:"italic" }}>"{lesson.prayer}"</p>
              <button onClick={() => speak(lesson.prayer)} style={{ background:themeD.color, border:"none", color:"#fff", borderRadius:20, padding:"7px 16px", fontSize:12, fontWeight:700, cursor:"pointer" }}>
                {isSpeaking ? "⏹ Stop" : "🔊 Pray Along"}
              </button>
            </div>
            <div style={{ background:themeD.grad, borderRadius:20, padding:22, textAlign:"center", marginBottom:14 }}>
              <div style={{ fontSize:44, marginBottom:8 }}>🏆</div>
              <p style={{ color:"#fff", fontWeight:900, fontSize:18, margin:"0 0 4px" }}>Amazing, {userName}!</p>
              <p style={{ color:"rgba(255,255,255,0.85)", fontSize:14, margin:0 }}>Day {lesson.day} complete! +5 stars waiting for you!</p>
            </div>
            <button onClick={markComplete} style={{ width:"100%", padding:16, background:"linear-gradient(135deg,#10B981,#059669)", color:"#fff", border:"none", borderRadius:16, fontWeight:900, fontSize:17, cursor:"pointer" }}>
              ✅ Complete Day {lesson.day}! (+5 ⭐)
            </button>
          </div>
        )}

        {/* NAV BUTTONS */}
        <div style={{ display:"flex", gap:10, marginTop:18 }}>
          {lessonStep>0 && (
            <button onClick={() => setLessonStep(s=>s-1)} style={{ flex:1, padding:14, background:"#fff", color:themeD.dark, border:`2px solid ${themeD.color}`, borderRadius:14, fontWeight:700, fontSize:14, cursor:"pointer" }}>← Back</button>
          )}
          {lessonStep<4 && (
            <button onClick={() => setLessonStep(s=>s+1)} style={{ flex:2, padding:14, background:themeD.grad, color:"#fff", border:"none", borderRadius:14, fontWeight:800, fontSize:15, cursor:"pointer" }}>
              {["Read Lesson →","Do Activity →","Take Quiz →","Pray →",""][lessonStep]}
            </button>
          )}
        </div>
      </div>
    </div>
  );

  // ─── PARENT DASHBOARD ────────────────────────────────────────
  if (activeTab === "parent") return (
    <div style={{ minHeight:"100vh", background:"#0F172A", fontFamily:"'Georgia',serif", paddingBottom:80 }}>
      <div style={{ background:"linear-gradient(135deg,#1E1B4B,#312E81)", padding:"24px 16px 28px" }}>
        <h1 style={{ color:"#E9D5FF", margin:0, fontSize:22, fontWeight:900 }}>👨‍👩‍👧 Parent Dashboard</h1>
        <p style={{ color:"#7C3AED", margin:"4px 0 0", fontSize:13 }}>Track {userName}'s spiritual journey</p>
      </div>
      <div style={{ padding:"20px 16px" }}>
        {!parentUnlocked ? (
          <div style={{ background:"rgba(255,255,255,0.05)", border:"2px solid #4C1D95", borderRadius:20, padding:24, textAlign:"center" }}>
            <div style={{ fontSize:48, marginBottom:12 }}>🔐</div>
            <p style={{ color:"#E9D5FF", fontWeight:800, fontSize:16, margin:"0 0 8px" }}>Parent Access</p>
            <p style={{ color:"#7C3AED", fontSize:13, margin:"0 0 20px" }}>Enter PIN: 1234 (demo)</p>
            <input value={parentPin} onChange={e => setParentPin(e.target.value)} placeholder="Enter PIN" type="password" maxLength={4}
              style={{ width:"100%", padding:14, borderRadius:14, border:"2px solid #4C1D95", background:"rgba(255,255,255,0.08)", color:"#fff", fontSize:18, textAlign:"center", fontFamily:"Georgia,serif", outline:"none", boxSizing:"border-box", marginBottom:12 }} />
            <button onClick={() => { if(parentPin==="1234") setParentUnlocked(true); }} style={{ width:"100%", padding:14, background:"#7C3AED", color:"#fff", border:"none", borderRadius:14, fontWeight:900, fontSize:16, cursor:"pointer" }}>
              Unlock Dashboard
            </button>
          </div>
        ) : (
          <div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:20 }}>
              {[
                { label:"Days Completed", value:completedDays.length, icon:"📅", color:"#10B981" },
                { label:"Current Streak", value:`${streak} days`, icon:"🔥", color:"#F59E0B" },
                { label:"Stars Earned", value:starCount, icon:"⭐", color:"#F59E0B" },
                { label:"Days Remaining", value:`${365-completedDays.length}`, icon:"📖", color:"#8B5CF6" },
              ].map(s => (
                <div key={s.label} style={{ background:"rgba(255,255,255,0.06)", border:`1px solid ${s.color}30`, borderRadius:16, padding:16, textAlign:"center" }}>
                  <div style={{ fontSize:28, marginBottom:6 }}>{s.icon}</div>
                  <div style={{ color:s.color, fontWeight:900, fontSize:22 }}>{s.value}</div>
                  <div style={{ color:"#6B7280", fontSize:11, marginTop:4 }}>{s.label}</div>
                </div>
              ))}
            </div>

            <div style={{ background:"rgba(255,255,255,0.05)", borderRadius:18, padding:18, marginBottom:16 }}>
              <p style={{ color:"#E9D5FF", fontWeight:800, fontSize:14, margin:"0 0 12px" }}>📊 Progress by Theme</p>
              {Object.keys(themes).slice(0,7).map(t => {
                const total = ALL_LESSONS.filter(l=>l.theme===t).length;
                const done = completedDays.filter(d => ALL_LESSONS[d-1]?.theme===t).length;
                const pct = Math.round((done/total)*100);
                return (
                  <div key={t} style={{ marginBottom:10 }}>
                    <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}>
                      <span style={{ color:"#C4B5FD", fontSize:12, fontWeight:600, textTransform:"capitalize" }}>{themes[t].icon} {t}</span>
                      <span style={{ color:"#7C3AED", fontSize:12, fontWeight:700 }}>{pct}%</span>
                    </div>
                    <div style={{ height:6, background:"rgba(255,255,255,0.1)", borderRadius:10, overflow:"hidden" }}>
                      <div style={{ height:"100%", width:`${pct}%`, background:themes[t].color, borderRadius:10, transition:"width 0.5s" }} />
                    </div>
                  </div>
                );
              })}
            </div>

            <div style={{ background:"rgba(255,255,255,0.05)", borderRadius:18, padding:18, marginBottom:16 }}>
              <p style={{ color:"#E9D5FF", fontWeight:800, fontSize:14, margin:"0 0 12px" }}>🙏 Prayers Saved</p>
              <p style={{ color:"#A78BFA", fontSize:28, fontWeight:900, margin:0, textAlign:"center" }}>{savedPrayers.length}</p>
              <p style={{ color:"#6B7280", fontSize:12, textAlign:"center", margin:"4px 0 0" }}>journal entries</p>
            </div>

            {completedDays.length >= 365 && (
              <div style={{ background:"linear-gradient(135deg,#F59E0B,#D97706)", borderRadius:20, padding:24, textAlign:"center" }}>
                <div style={{ fontSize:52, marginBottom:8 }}>🎓</div>
                <p style={{ color:"#fff", fontWeight:900, fontSize:18, margin:0 }}>365-Day Certificate!</p>
                <p style={{ color:"rgba(255,255,255,0.85)", fontSize:13, margin:"6px 0 16px" }}>{userName} completed the full journey!</p>
                <button style={{ background:"#fff", color:"#D97706", border:"none", borderRadius:14, padding:"10px 24px", fontWeight:900, fontSize:14, cursor:"pointer" }}>Print Certificate 🖨️</button>
              </div>
            )}
          </div>
        )}
      </div>
      <BottomNav active={activeTab} onChange={setActiveTab} />
    </div>
  );

  // ─── HOME SCREEN ─────────────────────────────────────────────
  const todayLesson = ALL_LESSONS[currentDay - 1];
  const todayTheme = themes[todayLesson.theme] || themes.faith;

  return (
    <div style={{ minHeight:"100vh", background:"#F8F4FF", fontFamily:"'Georgia',serif", paddingBottom:80 }}>
      <style>{`
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
        @keyframes fadeIn{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
        @keyframes shimmer{0%,100%{opacity:.8}50%{opacity:1}}
      `}</style>

      {/* HEADER */}
      <div style={{ background:"linear-gradient(135deg,#4C1D95,#6D28D9,#7C3AED)", padding:"22px 16px 34px", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", top:-40, right:-40, width:160, height:160, borderRadius:"50%", background:"rgba(255,255,255,0.04)" }} />
        <div style={{ position:"absolute", bottom:-30, left:-20, width:100, height:100, borderRadius:"50%", background:"rgba(255,255,255,0.04)" }} />
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
          <div>
            <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:4 }}>
              <span style={{ fontSize:22, animation:"float 2.5s ease-in-out infinite" }}>{mascot.emoji}</span>
              <p style={{ color:"#C4B5FD", margin:0, fontSize:13 }}>Hey, {userName}! Ready to explore? 🌟</p>
            </div>
            <h1 style={{ color:"#fff", margin:"0 0 2px", fontSize:26, fontWeight:900, letterSpacing:"-1px" }}>Bible Explorers</h1>
            <p style={{ color:"#A78BFA", margin:0, fontSize:12 }}>📖 365 Days · Year 1</p>
          </div>
          <button onClick={() => setShowSubscription(true)} style={{ background:"rgba(255,215,0,0.15)", border:"2px solid rgba(255,215,0,0.4)", color:"#FDE68A", borderRadius:20, padding:"7px 14px", cursor:"pointer", fontSize:12, fontWeight:800 }}>👑 Premium</button>
        </div>
        {/* STATS */}
        <div style={{ display:"flex", gap:8, marginTop:18 }}>
          {[
            { l:"Streak", v:`${streak} 🔥`, c:"#FCD34D" },
            { l:"Stars", v:`${starCount} ⭐`, c:"#34D399" },
            { l:"Done", v:`${completedDays.length}/365`, c:"#60A5FA" },
          ].map(s => (
            <div key={s.l} style={{ flex:1, background:"rgba(255,255,255,0.10)", borderRadius:12, padding:"10px 6px", textAlign:"center" }}>
              <div style={{ color:s.c, fontWeight:900, fontSize:15 }}>{s.v}</div>
              <div style={{ color:"rgba(255,255,255,0.5)", fontSize:10, marginTop:2 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding:"0 16px 24px" }}>
        {/* TODAY'S LESSON CARD */}
        <div style={{ marginTop:-18, background:"#fff", borderRadius:24, padding:20, boxShadow:"0 10px 40px rgba(76,29,149,0.18)", marginBottom:18, border:"2px solid #EDE9FE", animation:"fadeIn 0.5s ease" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10 }}>
            <div style={{ color:"#7C3AED", fontSize:11, fontWeight:800, textTransform:"uppercase", letterSpacing:1 }}>📅 Today · Day {currentDay}</div>
            {completedDays.includes(currentDay) && <span style={{ background:"#D1FAE5", color:"#065F46", fontSize:11, fontWeight:800, padding:"3px 10px", borderRadius:20 }}>✅ Done!</span>}
          </div>
          <div style={{ display:"flex", gap:12, alignItems:"flex-start" }}>
            <div style={{ fontSize:46, lineHeight:1 }}>{todayTheme.icon}</div>
            <div style={{ flex:1 }}>
              <h2 style={{ color:"#1F2937", margin:"0 0 4px", fontSize:18, fontWeight:900 }}>{todayLesson.title}</h2>
              <p style={{ color:"#6B7280", margin:"0 0 6px", fontSize:12 }}>📖 {todayLesson.verse}</p>
              <span style={{ background:todayTheme.bg, color:todayTheme.dark, fontSize:11, fontWeight:700, padding:"3px 10px", borderRadius:20, textTransform:"capitalize" }}>{todayLesson.theme}</span>
            </div>
          </div>
          <button onClick={() => { setSelectedLesson(todayLesson); setScreen("lesson"); setLessonStep(0); }}
            style={{ width:"100%", padding:14, background:todayTheme.grad, color:"#fff", border:"none", borderRadius:14, fontWeight:900, fontSize:16, cursor:"pointer", marginTop:14 }}>
            {completedDays.includes(currentDay) ? "📖 Review Today's Lesson" : "🚀 Start Today's Lesson"}
          </button>
        </div>

        {/* QUICK PRAYER BUTTON */}
        <button onClick={() => setActiveTab("prayer")} style={{ width:"100%", background:"linear-gradient(135deg,#F59E0B,#D97706)", border:"none", borderRadius:20, padding:"15px 18px", cursor:"pointer", display:"flex", alignItems:"center", gap:12, marginBottom:18, textAlign:"left" }}>
          <span style={{ fontSize:34 }}>🙏</span>
          <div><p style={{ color:"#fff", fontWeight:900, fontSize:15, margin:0 }}>Prayer Corner</p><p style={{ color:"#FEF3C7", fontSize:12, margin:"2px 0 0" }}>Talk to God · AI-guided responses</p></div>
          <span style={{ marginLeft:"auto", color:"#FEF3C7", fontSize:20 }}>→</span>
        </button>

        {/* ALL LESSONS LIST */}
        <h3 style={{ color:"#1F2937", fontWeight:900, fontSize:15, marginBottom:12 }}>📚 Lessons</h3>
        <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
          {ALL_LESSONS.slice(0, 14).map(l => {
            const t = themes[l.theme] || themes.faith;
            return (
              <button key={l.day} onClick={() => { setSelectedLesson(l); setScreen("lesson"); setLessonStep(0); setQuizAnswer(null); }}
                style={{ background:"#fff", border:`2px solid ${completedDays.includes(l.day)?t.color+"80":t.color+"40"}`, borderRadius:16, padding:"13px 14px", cursor:"pointer", display:"flex", alignItems:"center", gap:10, textAlign:"left" }}>
                <div style={{ width:42, height:42, borderRadius:"50%", background:t.bg, display:"flex", alignItems:"center", justifyContent:"center", fontSize:20, flexShrink:0 }}>
                  {completedDays.includes(l.day) ? "✅" : t.icon}
                </div>
                <div style={{ flex:1 }}>
                  <div style={{ color:"#374151", fontWeight:800, fontSize:13 }}>Day {l.day}: {l.title}</div>
                  <div style={{ color:"#9CA3AF", fontSize:11 }}>{l.verse} · {l.theme}</div>
                </div>
                <span style={{ color:t.color, fontSize:16 }}>→</span>
              </button>
            );
          })}

          {/* LOCKED PREVIEW */}
          {[15,16,17].map(d => (
            <div key={d} style={{ background:"#F9FAFB", border:"2px solid #E5E7EB", borderRadius:16, padding:"13px 14px", display:"flex", alignItems:"center", gap:10, opacity:.7 }}>
              <div style={{ width:42, height:42, borderRadius:"50%", background:"#E5E7EB", display:"flex", alignItems:"center", justifyContent:"center", fontSize:20 }}>🔒</div>
              <div style={{ flex:1 }}><div style={{ color:"#9CA3AF", fontWeight:700, fontSize:13 }}>Day {d}: Subscribe to Unlock</div><div style={{ color:"#D1D5DB", fontSize:11 }}>All 365 days available with Premium</div></div>
              <button onClick={() => setShowSubscription(true)} style={{ background:"#7C3AED", color:"#fff", border:"none", borderRadius:16, padding:"6px 12px", fontSize:11, fontWeight:800, cursor:"pointer" }}>Unlock</button>
            </div>
          ))}
        </div>

        {/* THEMES GRID */}
        <h3 style={{ color:"#1F2937", fontWeight:900, fontSize:15, margin:"22px 0 12px" }}>🌈 Study Themes</h3>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginBottom:20 }}>
          {Object.entries(themes).slice(0,8).map(([key,t]) => (
            <div key={key} style={{ background:t.bg, border:`2px solid ${t.color}40`, borderRadius:14, padding:"11px 13px", display:"flex", alignItems:"center", gap:10 }}>
              <span style={{ fontSize:22 }}>{t.icon}</span>
              <span style={{ color:t.dark, fontWeight:700, fontSize:12, textTransform:"capitalize" }}>{key}</span>
            </div>
          ))}
        </div>

        {/* MASCOT COMPANIONS */}
        <h3 style={{ color:"#1F2937", fontWeight:900, fontSize:15, marginBottom:12 }}>🐾 Your Companions</h3>
        <div style={{ display:"flex", gap:8, marginBottom:20 }}>
          {mascots.map((m, i) => (
            <button key={i} onClick={() => setMascotIdx(i)} style={{ flex:1, background: i===mascotIdx ? m.color : "#fff", border:`2px solid ${m.color}`, borderRadius:14, padding:"12px 6px", cursor:"pointer", display:"flex", flexDirection:"column", alignItems:"center", gap:4 }}>
              <span style={{ fontSize:28, animation: i===mascotIdx?"float 2s ease-in-out infinite":"none" }}>{m.emoji}</span>
              <span style={{ color: i===mascotIdx?"#fff":m.color, fontSize:11, fontWeight:800 }}>{m.name}</span>
              <span style={{ color: i===mascotIdx?"rgba(255,255,255,0.8)":"#9CA3AF", fontSize:9 }}>{m.personality}</span>
            </button>
          ))}
        </div>
      </div>

      <BottomNav active={activeTab} onChange={setActiveTab} />
    </div>
  );
}

// ─── BOTTOM NAV ──────────────────────────────────────────────────
function BottomNav({ active, onChange }) {
  const tabs = [
    { id:"home",   icon:"🏠", label:"Home" },
    { id:"prayer", icon:"🙏", label:"Prayer" },
    { id:"parent", icon:"👨‍👩‍👧", label:"Parent" },
  ];
  return (
    <div style={{ position:"fixed", bottom:0, left:0, right:0, background:"#fff", borderTop:"1px solid #E5E7EB", display:"flex", zIndex:100, boxShadow:"0 -4px 20px rgba(0,0,0,0.08)" }}>
      {tabs.map(t => (
        <button key={t.id} onClick={() => onChange(t.id)} style={{ flex:1, padding:"12px 0 10px", background:"none", border:"none", cursor:"pointer", display:"flex", flexDirection:"column", alignItems:"center", gap:3 }}>
          <span style={{ fontSize:22 }}>{t.icon}</span>
          <span style={{ fontSize:10, fontWeight:700, color: active===t.id?"#7C3AED":"#9CA3AF" }}>{t.label}</span>
          {active===t.id && <div style={{ width:20, height:3, background:"#7C3AED", borderRadius:10 }} />}
        </button>
      ))}
    </div>
  );
}
