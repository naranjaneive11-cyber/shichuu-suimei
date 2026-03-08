/**
 * 運勢メタバース (Fortune Metaverse) - Three.js Space Engine
 */

// --- 定数・データ定義 ---
const TENKAN = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
const CHISHI = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];

// テーマ用の追加データ
const SETSUIRI = [5, 4, 6, 5, 5, 6, 7, 7, 8, 8, 7, 7];

const CHUSHATSU_TABLE = {
    '甲子': '戌亥', '乙丑': '戌亥', '丙寅': '戌亥', '丁卯': '戌亥', '戊辰': '戌亥', '己巳': '戌亥', '庚午': '戌亥', '辛未': '戌亥', '壬申': '戌亥', '癸酉': '戌亥',
    '甲戌': '申酉', '乙亥': '申酉', '丙子': '申酉', '丁丑': '申酉', '戊寅': '申酉', '己卯': '申酉', '庚辰': '申酉', '辛巳': '申酉', '壬午': '申酉', '癸未': '申酉',
    '甲申': '午未', '乙酉': '午未', '丙戌': '午未', '丁亥': '午未', '戊子': '午未', '己丑': '午未', '庚寅': '午未', '辛卯': '午未', '壬辰': '午未', '癸巳': '午未',
    '甲午': '辰巳', '乙未': '辰巳', '丙申': '辰巳', '丁酉': '辰巳', '戊戌': '辰巳', '己亥': '辰巳', '庚子': '辰巳', '辛丑': '辰巳', '壬寅': '辰巳', '癸卯': '辰巳',
    '甲辰': '寅卯', '乙巳': '寅卯', '丙午': '寅卯', '丁未': '寅卯', '戊申': '寅卯', '己酉': '寅卯', '庚戌': '寅卯', '辛亥': '寅卯', '壬子': '寅卯', '癸丑': '寅卯',
    '甲寅': '子丑', '乙卯': '子丑', '丙辰': '子丑', '丁巳': '子丑', '戊午': '子丑', '己未': '子丑', '庚申': '子丑', '辛酉': '子丑', '壬戌': '子丑', '癸亥': '子丑'
};

const ELEMENT_MAP = {
    '甲': '+木', '乙': '-木', '丙': '+火', '丁': '-火', '戊': '+土', '己': '-土', '庚': '+金', '辛': '-金', '壬': '+水', '癸': '-水',
    '子': '+水', '丑': '-土', '寅': '+木', '卯': '-木', '辰': '+土', '巳': '-火', '午': '+火', '未': '-土', '申': '+金', '酉': '-金', '戌': '+土', '亥': '-水'
};

const TUHEN_TABLE = {
    '甲': { '甲': '比肩', '乙': '劫財', '丙': '食神', '丁': '傷官', '戊': '偏財', '己': '正財', '庚': '偏官', '辛': '正官', '壬': '偏印', '癸': '印綬' },
    '乙': { '乙': '比肩', '甲': '劫財', '丁': '食神', '丙': '傷官', '己': '偏財', '戊': '正財', '辛': '偏官', '庚': '正官', '癸': '偏印', '壬': '印綬' },
    '丙': { '丙': '比肩', '丁': '劫財', '戊': '食神', '己': '傷官', '庚': '偏財', '辛': '正財', '壬': '偏官', '癸': '正官', '甲': '偏印', '乙': '印綬' },
    '丁': { '丁': '比肩', '丙': '劫財', '己': '食神', '戊': '傷官', '辛': '偏財', '庚': '正財', '癸': '偏官', '壬': '正官', '乙': '偏印', '甲': '印綬' },
    '戊': { '戊': '比肩', '己': '劫財', '庚': '食神', '辛': '傷官', '壬': '偏財', '癸': '正財', '甲': '偏官', '乙': '正官', '丙': '偏印', '丁': '印綬' },
    '己': { '己': '比肩', '戊': '劫財', '辛': '食神', '庚': '傷官', '癸': '偏財', '壬': '正財', '乙': '偏官', '甲': '正官', '丁': '偏印', '丙': '印綬' },
    '庚': { '庚': '比肩', '辛': '劫財', '壬': '食神', '癸': '傷官', '甲': '偏財', '乙': '正財', '丙': '偏官', '丁': '正官', '戊': '偏印', '己': '印綬' },
    '辛': { '辛': '比肩', '庚': '劫財', '癸': '食神', '壬': '傷官', '乙': '偏財', '甲': '正財', '丁': '偏官', '丙': '正官', '己': '偏印', '戊': '印綬' },
    '壬': { '壬': '比肩', '癸': '劫財', '甲': '食神', '乙': '傷官', '丙': '偏財', '丁': '正財', '戊': '偏官', '己': '正官', '庚': '偏印', '辛': '印綬' },
    '癸': { '癸': '比肩', '壬': '劫財', '乙': '食神', '甲': '傷官', '丁': '偏財', '丙': '正財', '己': '偏官', '戊': '正官', '辛': '偏印', '庚': '印綬' }
};

const UNSEI_TABLE = {
    '甲': { '亥': '長生', '戌': '養', '酉': '胎', '申': '絶', '未': '墓', '午': '死', '巳': '病', '辰': '衰', '卯': '帝旺', '寅': '建禄', '丑': '冠帯', '子': '沐浴' },
    '乙': { '午': '長生', '巳': '沐浴', '辰': '冠帯', '卯': '建禄', '寅': '帝旺', '丑': '衰', '子': '病', '亥': '死', '戌': '墓', '酉': '絶', '申': '胎', '未': '養' },
    '丙': { '寅': '長生', '丑': '養', '子': '胎', '亥': '絶', '戌': '墓', '酉': '死', '申': '病', '未': '衰', '午': '帝旺', '巳': '建禄', '辰': '冠帯', '卯': '沐浴' },
    '丁': { '酉': '長生', '申': '沐浴', '未': '冠帯', '午': '建禄', '巳': '帝旺', '辰': '衰', '卯': '病', '寅': '死', '丑': '墓', '子': '絶', '亥': '胎', '戌': '養' },
    '戊': { '寅': '長生', '丑': '養', '子': '胎', '亥': '絶', '戌': '墓', '酉': '死', '申': '病', '未': '衰', '午': '帝旺', '巳': '建禄', '辰': '冠帯', '卯': '沐浴' },
    '己': { '酉': '長生', '申': '沐浴', '未': '冠帯', '午': '建禄', '巳': '帝旺', '辰': '衰', '卯': '病', '寅': '死', '丑': '墓', '子': '絶', '亥': '胎', '戌': '養' },
    '庚': { '巳': '長生', '辰': '養', '卯': '胎', '寅': '絶', '丑': '墓', '子': '死', '亥': '病', '戌': '衰', '酉': '帝旺', '申': '建禄', '未': '冠帯', '午': '沐浴' },
    '辛': { '子': '長生', '亥': '沐浴', '戌': '冠帯', '酉': '建禄', '申': '帝旺', '未': '衰', '午': '病', '巳': '死', '辰': '墓', '卯': '絶', '寅': '胎', '丑': '養' },
    '壬': { '申': '長生', '未': '養', '午': '胎', '巳': '絶', '辰': '墓', '卯': '死', '寅': '病', '丑': '衰', '子': '帝旺', '亥': '建禄', '戌': '冠帯', '酉': '沐浴' },
    '癸': { '卯': '長生', '寅': '沐浴', '丑': '冠帯', '子': '建禄', '亥': '帝旺', '戌': '衰', '酉': '病', '申': '死', '未': '墓', '午': '絶', '巳': '胎', '辰': '養' }
};

const TUHEN_MESSAGES = {
    '比肩': '【比肩の年/月】独立心と自我が強まる時期です。自分のペースを守り、目標に向かって真っ直ぐ進む力が湧いてきます。他人の意見に流されず、「自分はどうしたいか」を軸に決断すると吉です。',
    '劫財': '【劫財の年/月】集団の中での行動力や競争心が刺激される時期です。仲間と協力して大きなスケールで物事に取り組むのに適しています。ただし、強引になりすぎないよう周囲への配慮を忘れずに。',
    '食神': '【食神の年/月】心身ともにリラックスでき、衣食住の豊かさを楽しめるおおらかな時期です。好きなことや趣味に没頭し、素直に自分を表現することで運気が開けます。無理は禁物です。',
    '傷官': '【傷官の年/月】感受性が非常に鋭くなり、美意識やクリエイティビティが高まる時期です。直感が冴え渡るので、違和感を感じた直感には従いましょう。人間関係での摩擦には少し注意が必要です。',
    '偏財': '【偏財の年/月】人との交流が活発になり、ネットワークが広がる時期です。お金やモノも大きく動きます。周囲を楽しませるサービス精神を発揮することで、巡り巡って大きな豊かさを引き寄せます。',
    '正財': '【正財の年/月】着実な努力が実を結び、安定感が増す時期です。仕事や家庭、蓄財など、地道にコツコツと積み上げることに適しています。誠実で真面目な姿勢が高く評価されます。',
    '偏官': '【偏官の年/月】行動力と責任感が飛躍的に高まるチャレンジングな時期です。困難な状況にも果敢に立ち向かい、スピーディーに結果を出せます。働きすぎには注意して、時には休む勇気を。',
    '正官': '【正官の年/月】社会的信用や評価が高まる、格式を重んじる時期です。ルールや約束を守り、品行方正に振る舞うことで強力な後援を得られます。仕事での昇進など、オフィシャルな喜び事が多いでしょう。',
    '偏印': '【偏印の年/月】知的好奇心が旺盛になり、新しいジャンルへの関心が高まる時期です。常識に囚われない自由な発想やアイデアが生まれやすいです。海外や未知の世界に触れることで運気がアップします。',
    '印綬': '【印綬の年/月】落ち着いて深く学ぶこと、知性を吸収することに適した時期です。名誉や伝統を重んじ、専門知識や資格取得に挑戦すると良い結果に繋がります。目上の人からの引き立ても期待できます。'
};

// 健康運データ（日干・五行ベース）
const HEALTH_DATA = {
    '甲': { element: '木', icon: '🌳', title: '肝臓・自律神経に注意', desc: 'ストレスを溜め込むと肝臓や自律神経、目の疲れに出やすい体質です。意識的なリラックスと十分な睡眠を心がけ、酸味のある食べ物（柑橘類やお酢など）を摂ると吉。' },
    '乙': { element: '木', icon: '🌿', title: '肝臓・自律神経に注意', desc: '気疲れやストレスが神経や首、肩のコリとして現れやすいタイプです。マッサージやアロマでリラックスする時間を持ち、酸味のあるものを少しずつ取り入れましょう。' },
    '丙': { element: '火', icon: '☀️', title: '心臓・血液循環に注意', desc: '感情の起伏が心臓の負担や血圧、動悸に繋がりやすい体質です。興奮しすぎないように落ち着く時間を持ち、苦味のある食べ物（ゴーヤや緑茶など）でクールダウンを。' },
    '丁': { element: '火', icon: '🕯️', title: '心臓・血液循環に注意', desc: '神経をすり減らすと心臓や小腸に負担がかかり、不眠や血流不足になりやすい傾向があります。夜はゆっくり過ごすことを意識し、苦味のアクセントを取り入れましょう。' },
    '戊': { element: '土', icon: '⛰️', title: '胃腸・消化器系に注意', desc: '考えすぎや悩み事が直接胃腸のトラブル（胃痛や消化不良）に出やすい体質です。甘味のある自然な食材（かぼちゃやさつまいもなど）を摂り、よく噛んで食べることが大切です。' },
    '己': { element: '土', icon: '🌾', title: '胃腸・消化器系に注意', desc: '世話焼きで気を使って無理をすると、脾臓や胃、口すわりの不調が出やすいタイプです。食事の時間を規則正しくし、根菜類など自然な甘味をゆっくり味わいましょう。' },
    '庚': { element: '金', icon: '⚔️', title: '肺・呼吸器系に注意', desc: '乾燥や悲しみの感情に弱く、風邪を引くと咳や鼻炎、皮膚の荒れとして長引きやすい体質です。辛味の食材（ネギや生姜など）を取り入れ、深呼吸と保湿を徹底してください。' },
    '辛': { element: '金', icon: '💎', title: '肺・呼吸器系に注意', desc: 'デリケートでストレスに弱く、呼吸器や大腸、肌の乾燥トラブルに出やすい傾向です。白湯や保湿ケアで体を労わり、適度に辛味のあるネギやスパイスで温めましょう。' },
    '壬': { element: '水', icon: '🌊', title: '腎臓・冷え性に注意', desc: '寒さや冷えに最も弱く、生命力の源である腎臓や仙骨、泌尿器に疲れが出やすい体質です。塩気を適度に取り入れ、下半身を冷やさないように温活を意識することが重要です。' },
    '癸': { element: '水', icon: '🌧️', title: '腎臓・冷え性に注意', desc: '疲労が蓄積するとホルモンバランスや免疫力が落ち、膀胱や足腰・耳の不調に出やすいタイプです。黒い食材（黒豆や海藻など）と適度な塩味を摂り、体を芯から温めてください。' }
};

const UNSEI_MESSAGES = {
    '胎': '（胎）新しいプロジェクトや趣味など、可能性の種が宿るタイミングです。色々準備してみましょう。',
    '養': '（養）周囲の人から可愛がられ、助けを得やすいタイミングです。素直に甘えてみてください。',
    '長生': '（長生）フレッシュなエネルギーに満ちています。初心者に戻って新しいことを吸収しましょう。',
    '沐浴': '（沐浴）ロマンを追い求め、現状から少し飛び出してみたくなる不安定ながらも魅力的なエネルギーです。',
    '冠帯': '（冠帯）少しずつ実力が認められ、表舞台に出る準備が整う華やかなエネルギーです。',
    '建禄': '（建禄）地に足のついた安定したエネルギーです。手堅く着実に物事を進めるのに最適です。',
    '帝旺': '（帝旺）エネルギーの頂点です。自信を持ってトップに立ち、周囲を力強く牽引してください。',
    '衰': '（衰）経験に裏打ちされた落ち着きと知性が光るエネルギーです。一歩引いて全体を見渡しましょう。',
    '病': '（病）インスピレーションや直感が冴え渡るエネルギーです。芸術や精神的な活動に向いています。',
    '死': '（死）一つの物事をストイックに極めたり、内観したりするのに適した精神性の高いエネルギーです。',
    '墓': '（墓）先祖や古いものに縁があり、一つのことを深く探求、または貯えるのに適したエネルギーです。',
    '絶': '（絶）枠に捉われない圧倒的な直感とヒラメキのエネルギーです。常識外のアイデアが浮かびます。'
};

const CYCLE_DATA = [
    { label: '忍耐', rating: '×', ratingClass: 'bad', desc: '天中殺: 1年目' },
    { label: '陰徳', rating: '×', ratingClass: 'bad', desc: '天中殺: 2年目' },
    { label: '修行', rating: '×', ratingClass: 'bad', desc: '天中殺: 3年目' },
    { label: '夜明け', rating: '○', ratingClass: 'good', desc: '4年目' },
    { label: '進化', rating: '○', ratingClass: 'good', desc: '5年目' },
    { label: '決意', rating: '○', ratingClass: 'good', desc: '6年目' },
    { label: '休息', rating: '×', ratingClass: 'bad', desc: '7年目' },
    { label: '青春', rating: '◎', ratingClass: 'great', desc: '8年目' },
    { label: '空転', rating: '××', ratingClass: 'bad', desc: '9年目' },
    { label: '飛躍', rating: '◎◎', ratingClass: 'great', desc: '10年目' },
    { label: '絶好調', rating: '◎◎', ratingClass: 'great', desc: '11年目' },
    { label: '頂点', rating: '◎', ratingClass: 'great', desc: '12年目' }
];

const THEME_MESSAGES = {
    '木': {
        0: '冬の土の中で静かに耐え忍ぶ時期。表立った行動は控え、内面的な成長と知識の吸収に専念しましょう。焦らず「根を張る」意識が後々の大きな飛躍に繋がります。',
        1: '見返りを求めない裏方としての行動が運気を開きます。周囲のサポートに回り、あなたの持つ「優しさ」を惜しみなく分かち合うことで、強力な陰徳が積まれます。',
        2: '過去のしがらみや不要なプライドを手放す修行の時。変化を恐れず、柔軟な心で新しい価値観を受け入れましょう。春の芽吹きはもうすぐそこです。',
        3: '長い冬が明け、ついに温かな光が差し込み始めました。あなたの本来の持ち味である「向上心」を発揮し、新しい目標を立てて小さな一歩を踏み出しましょう。',
        4: '枝葉がぐんぐん伸びるように、成長のスピードが加速します。周囲との調和を大切にしながら、積極的にコミュニケーションを取り、協力の輪を広げてください。',
        5: '今後の方向性を決定づける重要な時期。「これだ！」と思う道があれば、迷わず決断し行動に移しましょう。あなたの真っすぐなエネルギーが道を切り開きます。',
        6: '少しペースダウンして、心と体のメンテナンスを行う休息期。無理に前進しようとせず、自然に触れたり、好きな趣味に没頭したりしてリフレッシュを。',
        7: '瑞々しい若葉のように、エネルギーに溢れた最高の時期です。失敗を恐れずに新しいチャレンジを重ねることで、素晴らしい出会いやチャンスを引き寄せます。',
        8: '良かれと思った行動が裏目に出やすい空回り期。焦って結果を求めず、一度立ち止まって計画を見直す冷静さを持ちましょう。「待つこと」も大切な戦略です。',
        9: 'これまでの努力が一気に花開く飛躍の時。自身の直感と実力を信じて、スケールの大きな目標に挑戦してください。あなたの存在が周囲を力強く牽引します。',
        10: '運気は最高潮。大樹が豊かな果実を実らせるように、全てが思い通りに進みやすい絶好調期です。自信を持って表舞台に立ち、存分に実力を発揮してください。',
        11: '12年のサイクルが一つの頂点を迎えました。これまでの成果に対する感謝を忘れず、得た豊かさや経験を周囲に還元していくことで、次のサイクルへの良い準備となります。'
    },
    '火': {
        0: '炎を小さく保ち、じっくりと燃えるための薪を集める時期。無理な拡大は避け、足元を固めて自己のスキルアップや内省に時間を使ってください。',
        1: '自分が目立つのではなく、誰かのために火を灯す陰徳の時。ボランティアや裏方作業に徹することで、あなたの心の炎がより純粋なものへと磨かれます。',
        2: '予期せぬトラブルや試練を通じて、精神力が高まる修行期。感情的にならず、冷静に状況を見極めるクールな視点を持つことでブレイクスルーが起こります。',
        3: '暗闇に朝陽が差し込む夜明け。あなたの内なる情熱が再び呼び覚まされます。直感を信じて、心がワクワクするような新しいプロジェクトを始動させましょう。',
        4: '火勢が次第に強まり、運気が上昇・進化していく時期。持ち前の明るさと行動力で周囲を巻き込み、一気に理想に向かって突き進んでください。',
        5: '強い意志を持って、一つの目標にフォーカスする決意の時。あれこれ手を広げるのをやめ、本当に燃えたいテーマを絞ることで爆発的な成果を生み出します。',
        6: '燃え尽き症候群に注意が必要な休息期。熱を出しすぎず、ゆったりと過ごす時間を確保してください。芸術や音楽に触れることで良いインスピレーションが得られます。',
        7: 'キャンプファイヤーの中心で踊るような、楽しくて刺激的な時期。持ち前のカリスマ性を発揮し、人との交流を大いに楽しんでください。インスピレーションが冴え渡ります。',
        8: '情熱が空回りして、周囲との温度差が生まれやすい時期。自分のペースを押し付けず、一呼吸置いて相手の意見に耳を傾ける「余裕」を意識しましょう。',
        9: '一気に炎が燃え上がり、周囲を圧倒するような飛躍の時。過去の制限を越えて、これまで不可能だと思っていたことにも果敢に挑んでください。大成功の予感です。',
        10: '眩しい太陽のように、全てを照らし出す絶好調の時期。あなたのエネルギーが最高点に達します。主役として大いに輝き、思い描いたビジョンを現実のものにしてください。',
        11: 'これまでの燃えさかる情熱が、穏やかで暖かい光へと変わる頂点の時。達成感と共に、培った経験や豊かさを周囲に分け与え、感謝の心で次のサイクルへ備えましょう。'
    },
    '土': {
        0: '冬の乾いた大地のように、じっと春を待つ忍耐の時期。大きな勝負には出ず、地道な日常を大切にしながら、知識や教養という「養分」を蓄えることに専念しましょう。',
        1: '目立たない場所で土台を固める陰徳の時。身の回りの整理整頓や、誰もやりたがらない地味な作業を率先して行うことで、あなたの大地により福が蓄積されます。',
        2: '価値観の転換を迫られる修行の期間。過去の成功体験に固執せず、不要なものは思い切って手放すことで、より豊かな土壌へと生まれ変わる準備が整います。',
        3: '凍てついた土が融け、新しい生命が芽吹き始める夜明け。あなたの持ち味である「安定感」を活かしながらも、少しだけ新しい分野へ足を踏み入れてみましょう。',
        4: '大地に緑が広がるように、着実な進化と発展を遂げる時期。周囲からの信頼が厚くなり、大きな役割を任されるかもしれません。愛情を持って丁寧に取り組みましょう。',
        5: 'ブレない強い意志で、確固たる土台を築き上げる決意の時。長期的な視点に立ち、「これを一生のライフワークにする」という覚悟を決めるのに最適なタイミングです。',
        6: '心身の過労に注意し、リフレッシュが必要な休息期。土の性質を持つあなたは色々抱え込みがちです。たまには責任を手放し、自然豊かな場所で大地のエネルギーをチャージして。',
        7: '豊かな大地に花々が咲き乱れるような素晴らしい時期。持ち前の包容力と社交性が最大限に発揮され、多くの人があなたのもとに集まります。人脈作りに最適です。',
        8: '良かれと思ったお世話が過干渉になりやすく、人間関係が空回りしがちな時期。適度な距離感を保ち、「見守る愛」を意識することでトラブルを回避できます。',
        9: 'これまでの地道な努力が大きな山となり、揺るぎない地位を確立する飛躍の時。スケールの大きな夢にも手が届きます。豊かな土壌から極上の作物を収穫しましょう。',
        10: 'あなたの持つ包容力と安定感が最高に輝く絶好調期。全てを受け入れ、大勢の人を導くリーダーとして揺るぎない成果を上げることができます。大盤振る舞いが吉。',
        11: '全てを内包し、完成された豊かな大地となる頂点の時。得られた富や人脈に感謝し、それを次の世代へと継承していくような利他的な活動が、さらなる運気を呼び込みます。'
    },
    '金': {
        0: '原石がまだ厚い岩盤の中に眠っているような忍耐の時期。今は無理に自分をアピールせず、ひたすら内面を磨き、実力を蓄えるための自己研鑽に励みましょう。',
        1: '見えないところで誰かのために尽くす陰徳の時。己の美学に従い、見返りを求めずに社会や他者に奉仕することで、あなたの魂の本質的な輝きが増していきます。',
        2: '熱い火に打たれ、不純物を取り除かれる修行の期間。現状への不満や葛藤が生まれやすいですが、それはあなたがより純度の高い宝石へと研ぎ澄まされるためのプロセスです。',
        3: '長く続いた試練が終わり、新たな可能性の光が見える夜明け。持ち前の鋭い直感と決断力を活かして、不要なものを断捨離し、本当に大切なものだけを選び取りましょう。',
        4: 'これまでの経験が確かな自信へと変わり、大きく進化する時期。完璧主義になりすぎず、過程を楽しみながらスピーディーに行動することで、着実に成果が上がります。',
        5: '迷いを断ち切り、鋼のような強い意志で進むべき道を定める決意の時。「これしかない」という確信が持てるはずです。目標に向かって一直線に突き進んでください。',
        6: '張り詰めた緊張の糸を緩め、心身を休ませるべき休息期。鋭い刃も定期的な手入れが必要です。美しい音楽や芸術に触れ、疲れた心を優しく癒やしてあげましょう。',
        7: '磨かれた宝石のように、あなたの魅力や才能がキラキラと輝き周囲を魅了する時期。スポットライトを浴びる機会が増えます。感性の赴くままに自由に楽しみましょう。',
        8: '理想が高すぎて現実と噛み合わず、空回りしやすい時期。他者への批判精神が強くなりがちなので、相手の不完全さも受け入れる「心の余白」を持つことが大切です。',
        9: 'これまでの苦労が報われ、一気に高く飛躍する時期。あなたの鋭い決断力と行動力が最大限に活かされ、長年の目標を見事に射止めることができるでしょう。',
        10: '一点の曇りもない最高級の宝石として、圧倒的な存在感を放つ絶好調期です。これまでの努力が素晴らしい形で評価されます。堂々と美しく、頂点の景色を楽しんでください。',
        11: '12年のサイクルを鮮やかに完遂する頂点の時。美しく整った結果に満足するだけでなく、共に歩んでくれた仲間への感謝を忘れず、豊かな実績を分かち合いましょう。'
    },
    '水': {
        0: '冷たい氷の底に深く潜り、じっと春の雪解けを待つ忍耐の時期。無理に流れを変えようとせず、今はひたすら知識の泉を深く掘り下げ、内なる叡智を蓄えましょう。',
        1: '乾いた大地を密かに潤す地下水のように、人知れず他者をサポートする陰徳の時。見えない優しさが巡り巡って、いずれあなたに大きな恵みをもたらします。',
        2: '濁った水が濾過されるような修行の期間。人間関係での迷いや葛藤が生じやすいですが、何者にも染まらない本来の清らかさを取り戻すための大切なプロセスです。',
        3: '氷が少しずつ溶け出し、新たな流れが生まれる夜明け。持ち前の柔軟性と適応力を活かして、新しい環境や価値観にスムーズに飛び込んでいきましょう。直感が冴えます。',
        4: '小川が川岸の幅を広げながら進むように、運気が着実に進化・拡大していく時期。豊富な知識とアイデアを武器に、滞っていた物事を一気に前進させることができます。',
        5: '豊かな水脈を見つけ出し、明確な方向へと流れを定める決意の時。あれこれと迷うのをやめ、心の奥底が本当に望んでいる目標に一直線に向かう覚悟を決めてください。',
        6: '激しい流れから一時的に離れ、静かな湖面のように心身を波立たせない休息期。深くリラックスできる温泉に行ったり、一人の時間を長くとることでエネルギーが回復します。',
        7: '自由に形を変える水のように、変化に富んだエキサイティングな時期。交友関係が広がり、インスピレーションが湧き出します。知的好奇心の赴くままに行動しましょう。',
        8: 'あちこちに気を使いすぎてエネルギーが分散し、空回りしやすい時期。「全てを取りこぼさないように」という強迫観念を手放し、本当に重要なことだけに集中してください。',
        9: '大きな河となって堂々と海へ流れ込むような、スケールの大きい飛躍の時。これまでの積み重ねが大きなうねりとなり、不可能に思えた壁も難なく突破できるでしょう。',
        10: '全ての命を潤す豊かな大海原のように、影響力が最大になる絶好調の時期。溢れる情報と人脈を巧みに操り、思い通りの世界をつくり上げてください。最高の運気を楽しんで。',
        11: '海から蒸発しまた雨となって降り注ぐような、サイクルの完成と次への還元の時。得た知識や豊かさを「恵みの雨」として周囲に降り注ぎ、次のステージへの準備を整えましょう。'
    }
};

// 日支アバターのマッピング（画像があるものは画像、ないものは絵文字＋属性フィルタ）
const AVATAR_MAP = {
    '子': { emoji: '🐭' },
    '丑': { emoji: '🐮' },
    '寅': { emoji: '🐯' },
    '卯': { emoji: '🐰' },
    '辰': { emoji: '🐲' },
    '巳': { emoji: '🐍' },
    '午': { emoji: '🐴' },
    '未': { emoji: '🐑' },
    '申': { emoji: '🐵' },
    '酉': { emoji: '🐔' },
    '戌': { emoji: '🐶' },
    '亥': { emoji: '🐗' }
};

// 10干（精神・性格）に基づくキャラクター特徴
const CHARACTER_TRAITS = {
    '甲': '一本気で真っ直ぐな性格。向上心が高く、正義感にあふれるリーダー気質。',
    '乙': '優しく繊細で、負けず嫌いな一面も。柔軟性に富み、周囲との調和を重んじる。',
    '丙': '明るく陽気でカリスマ性がある。情熱的で裏表のない、太陽のような存在。',
    '丁': '静かな情熱と鋭い洞察力を秘める。繊細でミステリアスな魅力を持つ。',
    '戊': 'どっしりと落ち着いており包容力がある。おおらかで頼りがいのある存在。',
    '己': '愛情深く、庶民的で親しみやすい。多様な価値観を受け入れる柔軟性を持つ。',
    '庚': '決断力と行動力に優れ、白黒はっきりさせる。スピード感と合理性を重んじる。',
    '辛': '美意識が高く、洗練された品格がある。デリケートで完璧主義な一面も。',
    '壬': '束縛を嫌い、自由を愛する。スケールが大きく、清濁併せ呑む知性を持つ。',
    '癸': '純粋で慈愛に満ちている。環境に適応しながら、周囲に恵みをもたらす。'
};

// 五行（日干）によるオーラ色（画像がない場合のフォールバック用）
const ELEMENT_AURAS = {
    '甲': 'rgba(34, 139, 34, 0.8)', '乙': 'rgba(124, 252, 0, 0.8)',     // 木
    '丙': 'rgba(255, 69, 0, 0.8)', '丁': 'rgba(255, 140, 0, 0.8)',      // 火
    '戊': 'rgba(205, 133, 63, 0.8)', '己': 'rgba(255, 215, 0, 0.8)',    // 土
    '庚': 'rgba(192, 192, 192, 0.8)', '辛': 'rgba(224, 255, 255, 0.8)', // 金
    '壬': 'rgba(30, 144, 255, 0.8)', '癸': 'rgba(0, 255, 255, 0.8)'     // 水
};

// 日干ごとの3D環境テーマ（背景画像マッピング）
const ENV_THEMES = {
    '甲': { name: '🌳 霊木の森', desc: 'まっすぐに天を目指す大樹の精神空間。強い成長意欲と正義感が満ちています。', baseImage: 'assets/kinoe_forest_1772805334490.png' },
    '乙': { name: '🌿 神秘の草原', desc: 'しなやかで強い生命力が満ちる空間。周囲との調和と柔軟性を表しています。', baseImage: 'assets/kinoto_grass_1772805351382.png' },
    '丙': { name: '☀️ 陽光の神殿', desc: '全てを照らす太陽の光が降り注ぐ空間。明るく情熱的なカリスマ性を放ちます。', baseImage: 'assets/hinoe_sun_1772805386154.png' },
    '丁': { name: '🕯️ 揺らめく灯火', desc: '静寂の中に情熱の炎が灯る夜の空間。繊細でありながら強い意志を秘めています。', baseImage: 'assets/hinoto_fire_1772805401549.png' },
    '戊': { name: '⛰️ 雄大な大地', desc: 'どっしりとそびえる山の力強い空間。全てを受け入れる圧倒的な包容力です。', baseImage: 'assets/tsuchinoe_mountain_1772805485705.png' },
    '己': { name: '🌾 黄金の田園', desc: '豊かな土壌が広がる平穏の空間。愛情深く、多くの知識を育む大地です。', baseImage: 'assets/tsuchinoto_field_1772805500350.png' },
    '庚': { name: '⚔️ 鋼の城塞', desc: '鋭く研ぎ澄まされた金属と星空の空間。決断力と行動力に溢れる開拓次元です。', baseImage: 'assets/kanoe_iron_1772805600474.png' },
    '辛': { name: '💎 輝石の洞窟', desc: '透明な宝石が光を反射する空間。美意識と洗練を極めたクリアな精神界です。', baseImage: 'assets/kanoto_jewel_1772805704807.png' },
    '壬': { name: '🌊 深海の海原', desc: 'どこまでも広がる自由な深海の空間。束縛を嫌い、全てを飲み込む知性です。', baseImage: 'assets/mizunoe_ocean_1772805719801.png' },
    '癸': { name: '🌧️ 恵みの泉', desc: '静かに湧き出る純粋な水の空間。献身的に周囲を潤す慈愛の泉です。', baseImage: 'assets/mizunoto_rain_1772805757005.png' }
};

// 十二支季節マッピング（春:寅卯辰, 夏:巳午未, 秋:申酉戌, 冬:亥子丑）
function getBackgroundImage(tenkan, chishi) {
    let season = '';
    if (['寅', '卯', '辰'].includes(chishi)) season = '春';
    else if (['巳', '午', '未'].includes(chishi)) season = '夏';
    else if (['申', '酉', '戌'].includes(chishi)) season = '秋';
    else if (['亥', '子', '丑'].includes(chishi)) season = '冬';

    // 辛（秋）のみ .png 拡張子になっているため分岐
    let ext = '.webp';
    if (tenkan === '辛' && season === '秋') ext = '.png';

    return encodeURI(`カメラ ロール/${tenkan}（${season}）${ext}`);
}




document.addEventListener('DOMContentLoaded', () => {
    // URLからのペアモード判定
    const params = new URLSearchParams(window.location.search);
    if (params.get('mode') === 'pair') {
        const pData = {
            nameA: params.get('nameA') || '私', nikkanA: params.get('nikkanA'), nisshiA: params.get('nisshiA'),
            nameB: params.get('nameB') || '相手', nikkanB: params.get('nikkanB'), nisshiB: params.get('nisshiB')
        };
        if (pData.nikkanA && pData.nisshiA && pData.nikkanB && pData.nisshiB) {
            // 自動でペアメタバースへダイブ
            setTimeout(() => diveIntoPairMetaverse(pData), 100);
        }
    }

    // 年・日プルダウン生成（index.htmlと同様）
    initFormSelects();

    // 自動ログイン：前回のデータがあればそのままダイブ
    const savedName = localStorage.getItem('mv_name');
    const savedGender = localStorage.getItem('mv_gender');
    const savedY = parseInt(localStorage.getItem('mv_y'));
    const savedM = parseInt(localStorage.getItem('mv_m'));
    const savedD = parseInt(localStorage.getItem('mv_d'));

    if (savedName && savedGender && savedY && savedM && savedD) {
        const savedDate = new Date(savedY, savedM - 1, savedD);
        const m = calculateMeishikiLocal(savedDate);
        diveIntoMetaverse(savedName, savedGender, m);
        checkMoonPhaseAndApplyEffect(m.dayTenkan);
    }

    const form = document.getElementById('metaverse-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('mv-name').value || 'Guest';
        const y = parseInt(document.getElementById('mv-year').value);
        const m_val = parseInt(document.getElementById('mv-month').value);
        const d = parseInt(document.getElementById('mv-day').value);
        const gender = document.querySelector('input[name="mv-gender"]:checked').value;

        if (!y || !m_val || !d) {
            alert('生年月日を選択してください。');
            return;
        }

        const date = new Date(y, m_val - 1, d);
        const m = calculateMeishikiLocal(date);

        // 基本データの保存（次回アクセス時用）
        localStorage.setItem('mv_name', name);
        localStorage.setItem('mv_gender', gender);
        localStorage.setItem('mv_y', y);
        localStorage.setItem('mv_m', m_val);
        localStorage.setItem('mv_d', d);

        diveIntoMetaverse(name, gender, m);
        checkMoonPhaseAndApplyEffect(m.dayTenkan);
    });

    // 鑑定書モーダルの表示イベント
    const btnAppraisal = document.getElementById('btn-appraisal');
    const modalAppraisal = document.getElementById('appraisal-modal');
    const closeAppraisalBtn = document.getElementById('appraisal-modal-close');
    const closeAppraisalBtn2 = document.getElementById('appraisal-close-btn');

    if (btnAppraisal) {
        btnAppraisal.addEventListener('click', () => {
            renderAppraisalModal();
            modalAppraisal.classList.remove('hidden');
        });
    }

    [closeAppraisalBtn, closeAppraisalBtn2].forEach(btn => {
        if (btn) btn.addEventListener('click', () => {
            modalAppraisal.classList.add('hidden');
        });
    });

    if (modalAppraisal) {
        modalAppraisal.addEventListener('click', (e) => {
            if (e.target.id === 'appraisal-modal') {
                modalAppraisal.classList.add('hidden');
            }
        });
    }

    // 相性鑑定モーダルの関連コードは削除済み（不要）


    // テーマモーダルのイベント設定
    const btnYearTheme = document.getElementById('btn-year-theme');
    if (btnYearTheme) btnYearTheme.addEventListener('click', showYearTheme);

    const btnMonthTheme = document.getElementById('btn-month-theme');
    if (btnMonthTheme) btnMonthTheme.addEventListener('click', showMonthTheme);

    const btnLuckyDays = document.getElementById('btn-lucky-days');
    if (btnLuckyDays) {
        btnLuckyDays.addEventListener('click', showLuckyDays);
    }

    const btnWarningDays = document.getElementById('btn-warning-days');
    if (btnWarningDays) {
        btnWarningDays.addEventListener('click', showWarningDays);
    }

    const themeModalClose = document.getElementById('theme-modal-close');
    if (themeModalClose) {
        themeModalClose.addEventListener('click', () => {
            document.getElementById('theme-modal').classList.add('hidden');
        });
    }

    const themeModal = document.getElementById('theme-modal');
    if (themeModal) {
        themeModal.addEventListener('click', (e) => {
            if (e.target.id === 'theme-modal') {
                themeModal.classList.add('hidden');
            }
        });
    }

    const luckyDaysModalClose = document.getElementById('lucky-days-modal-close');
    if (luckyDaysModalClose) {
        luckyDaysModalClose.addEventListener('click', () => {
            document.getElementById('lucky-days-modal').classList.add('hidden');
        });
    }

    const luckyDaysModal = document.getElementById('lucky-days-modal');
    if (luckyDaysModal) {
        luckyDaysModal.addEventListener('click', (e) => {
            if (e.target.id === 'lucky-days-modal') {
                document.getElementById('lucky-days-modal').classList.add('hidden');
            }
        });
    }

    const warningDaysModalClose = document.getElementById('warning-days-modal-close');
    if (warningDaysModalClose) {
        warningDaysModalClose.addEventListener('click', () => {
            document.getElementById('warning-days-modal').classList.add('hidden');
        });
    }

    const warningDaysModal = document.getElementById('warning-days-modal');
    if (warningDaysModal) {
        warningDaysModal.addEventListener('click', (e) => {
            if (e.target.id === 'warning-days-modal') {
                document.getElementById('warning-days-modal').classList.add('hidden');
            }
        });
    }

    // 仕事運勢扉のイベント設定
    const doorWork = document.getElementById('door-work');
    if (doorWork) {
        doorWork.addEventListener('click', showWorkFortuneModal);
    }
    const wfModalClose = document.getElementById('work-fortune-modal-close');
    if (wfModalClose) {
        wfModalClose.addEventListener('click', () => {
            document.getElementById('work-fortune-modal').classList.add('hidden');
        });
    }
    const wfCloseBtn = document.getElementById('wf-close-btn');
    if (wfCloseBtn) {
        wfCloseBtn.addEventListener('click', () => {
            document.getElementById('work-fortune-modal').classList.add('hidden');
        });
    }
    const wfModal = document.getElementById('work-fortune-modal');
    if (wfModal) {
        wfModal.addEventListener('click', (e) => {
            if (e.target.id === 'work-fortune-modal') {
                document.getElementById('work-fortune-modal').classList.add('hidden');
            }
        });
    }

    // プライベート運勢扉のイベント設定
    const doorPrivate = document.getElementById('door-private');
    if (doorPrivate) {
        doorPrivate.addEventListener('click', showPrivateFortuneModal);
    }
    const pfModalClose = document.getElementById('private-fortune-modal-close');
    if (pfModalClose) {
        pfModalClose.addEventListener('click', () => {
            document.getElementById('private-fortune-modal').classList.add('hidden');
        });
    }
    const pfCloseBtn = document.getElementById('pf-close-btn');
    if (pfCloseBtn) {
        pfCloseBtn.addEventListener('click', () => {
            document.getElementById('private-fortune-modal').classList.add('hidden');
        });
    }
    const pfModal = document.getElementById('private-fortune-modal');
    if (pfModal) {
        pfModal.addEventListener('click', (e) => {
            if (e.target.id === 'private-fortune-modal') {
                document.getElementById('private-fortune-modal').classList.add('hidden');
            }
        });
    }



    // 設定変更ボタン（自動ログインデータをクリアしてGatewayに戻る）
    const btnSettings = document.getElementById('btn-settings');
    if (btnSettings) {
        btnSettings.addEventListener('click', () => {
            if (confirm('設定を変更しますか？\n保存された生年月日・お名前がリセットされ、入力画面に戻ります。')) {
                localStorage.removeItem('mv_name');
                localStorage.removeItem('mv_gender');
                localStorage.removeItem('mv_y');
                localStorage.removeItem('mv_m');
                localStorage.removeItem('mv_d');
                document.getElementById('ui-overlay').classList.add('hidden');
                document.getElementById('gateway').classList.remove('hidden');
                window.currentMetaverseData = null;
            }
        });
    }

    // 守護神召喚ボタンイベント
    const btnGuardian = document.getElementById('btn-summon-guardian');
    if (btnGuardian) {
        btnGuardian.addEventListener('click', () => {
            // データの有無をチェック
            if (window.currentMetaverseData) {
                summonGuardian(window.currentMetaverseData.dayTenkan);
            } else {
                alert("鑑定結果表示後に利用できます。");
            }
        });
    }

    // 守護神モーダルのイベント設定
    const guardianModalClose = document.getElementById('guardian-modal-close');
    if (guardianModalClose) {
        guardianModalClose.addEventListener('click', () => {
            document.getElementById('guardian-modal').classList.add('hidden');
        });
    }

    const guardianModal = document.getElementById('guardian-modal');
    if (guardianModal) {
        guardianModal.addEventListener('click', (e) => {
            if (e.target.id === 'guardian-modal') {
                document.getElementById('guardian-modal').classList.add('hidden');
            }
        });
    }

    // 日ごとアドバイスモーダルのイベント設定
    const dailyAdviceModalClose = document.getElementById('daily-advice-modal-close');
    if (dailyAdviceModalClose) {
        dailyAdviceModalClose.addEventListener('click', () => {
            document.getElementById('daily-advice-modal').classList.add('hidden');
        });
    }
    const daCloseBtn = document.getElementById('da-close-btn');
    if (daCloseBtn) {
        daCloseBtn.addEventListener('click', () => {
            document.getElementById('daily-advice-modal').classList.add('hidden');
        });
    }
    const dailyAdviceModal = document.getElementById('daily-advice-modal');
    if (dailyAdviceModal) {
        dailyAdviceModal.addEventListener('click', (e) => {
            if (e.target.id === 'daily-advice-modal') {
                document.getElementById('daily-advice-modal').classList.add('hidden');
            }
        });
    }

    // カレンダー扉のイベント設定
    const doorCalendar = document.getElementById('door-calendar');
    if (doorCalendar) {
        doorCalendar.addEventListener('click', showCalendarModal);
    }
    const calModalClose = document.getElementById('calendar-modal-close');
    if (calModalClose) {
        calModalClose.addEventListener('click', () => {
            document.getElementById('calendar-modal').classList.add('hidden');
        });
    }
    const calCloseBtn = document.getElementById('calendar-close-btn');
    if (calCloseBtn) {
        calCloseBtn.addEventListener('click', () => {
            document.getElementById('calendar-modal').classList.add('hidden');
        });
    }
    const calModal = document.getElementById('calendar-modal');
    if (calModal) {
        calModal.addEventListener('click', (e) => {
            if (e.target.id === 'calendar-modal') {
                document.getElementById('calendar-modal').classList.add('hidden');
            }
        });
    }

});

function initFormSelects() {
    const yearSelect = document.getElementById('mv-year');
    const monthSelect = document.getElementById('mv-month');
    const daySelect = document.getElementById('mv-day');

    const currentYear = new Date().getFullYear();
    for (let y = currentYear; y >= 1920; y--) {
        const opt = document.createElement('option');
        opt.value = y; opt.textContent = y + '年';
        yearSelect.appendChild(opt);
    }

    function updateDays() {
        const y = parseInt(yearSelect.value) || 2000;
        const m = parseInt(monthSelect.value) || 1;
        const maxDay = new Date(y, m, 0).getDate();
        const prevDay = parseInt(daySelect.value);

        daySelect.innerHTML = '<option value="">日</option>';
        for (let d = 1; d <= maxDay; d++) {
            const opt = document.createElement('option');
            opt.value = d; opt.textContent = d + '日';
            if (d === prevDay) opt.selected = true;
            daySelect.appendChild(opt);
        }
    }

    yearSelect.addEventListener('change', updateDays);
    monthSelect.addEventListener('change', updateDays);
    updateDays();
}

function initCompFormSelects() {
    const yearSelect = document.getElementById('comp-year');
    const monthSelect = document.getElementById('comp-month');
    const daySelect = document.getElementById('comp-day');

    if (!yearSelect || yearSelect.options.length > 1) return; // すでに初期化済みならスキップ

    const currentYear = new Date().getFullYear();
    for (let y = currentYear; y >= 1920; y--) {
        const opt = document.createElement('option');
        opt.value = y; opt.textContent = y + '年';
        yearSelect.appendChild(opt);
    }
    yearSelect.value = 1990;

    function updateCompDays() {
        const y = parseInt(yearSelect.value) || 2000;
        const m = parseInt(monthSelect.value) || 1;
        const maxDay = new Date(y, m, 0).getDate();
        const prevDay = parseInt(daySelect.value);

        daySelect.innerHTML = '<option value="">日</option>';
        for (let d = 1; d <= maxDay; d++) {
            const opt = document.createElement('option');
            opt.value = d; opt.textContent = d + '日';
            if (d === prevDay) opt.selected = true;
            daySelect.appendChild(opt);
        }
    }

    yearSelect.addEventListener('change', updateCompDays);
    monthSelect.addEventListener('change', updateCompDays);
    updateCompDays();
}

// ローカル版の命式計算（メタバース用）
function calculateMeishikiLocal(date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    // 1. 日干支
    const baseDate = new Date(1900, 0, 1);
    const diffDays = Math.floor((date - baseDate) / (1000 * 60 * 60 * 24));
    let dayKanshiIndex = (diffDays + 10) % 60;
    if (dayKanshiIndex < 0) dayKanshiIndex += 60;
    const dayTenkan = TENKAN[dayKanshiIndex % 10];
    const dayChishi = CHISHI[dayKanshiIndex % 12];
    const dayKanshiStr = dayTenkan + dayChishi;

    // 2. 年干支
    let yearForKanshi = year;
    if (month < 2 || (month === 2 && day < SETSUIRI[1])) yearForKanshi--;
    let yearKanshiIndex = (yearForKanshi - 4) % 60;
    if (yearKanshiIndex < 0) yearKanshiIndex += 60;
    const yearTenkan = TENKAN[yearKanshiIndex % 10];
    const yearChishi = CHISHI[yearKanshiIndex % 12];

    // 3. 月干支
    let monthAdjusted = month;
    let currentSetsuiriDay = SETSUIRI[month - 1];
    let daysSinceSetsuiri = day - currentSetsuiriDay + 1;
    if (daysSinceSetsuiri <= 0) {
        monthAdjusted--;
        if (monthAdjusted === 0) monthAdjusted = 12;
        let prevMonthSetsuiriDay = SETSUIRI[monthAdjusted - 1];
        let daysInPrevMonth = new Date(year, monthAdjusted, 0).getDate();
        daysSinceSetsuiri = (daysInPrevMonth - prevMonthSetsuiriDay + 1) + day;
    }
    const monthTenkanOffset = [2, 4, 6, 8, 0];
    const yearTenkanGroup = yearKanshiIndex % 10;
    const monthTenkanIndex = (monthTenkanOffset[yearTenkanGroup % 5] + (monthAdjusted - 2) + 10) % 10;
    const monthTenkan = TENKAN[monthTenkanIndex];
    const monthChishi = CHISHI[monthAdjusted % 12];

    // 4. 蔵干計算ロジック（簡易的）
    const zokanYear = (30 <= 10) ? TENKAN[0] : TENKAN[2]; // ダミー
    const zokanMonth = (daysSinceSetsuiri <= 10) ? TENKAN[0] : TENKAN[2]; // ダミー
    const zokanDay = (30 <= 10) ? TENKAN[0] : TENKAN[2]; // ダミー

    // 5. 通変星
    const tuhenYear = TUHEN_TABLE[dayTenkan][yearTenkan] || '--';
    const tuhenMonth = TUHEN_TABLE[dayTenkan][monthTenkan] || '--';

    // 6. 十二運星
    const unseiYear = UNSEI_TABLE[dayTenkan][yearChishi] || '--';
    const unseiMonth = UNSEI_TABLE[dayTenkan][monthChishi] || '--';
    const unseiDay = UNSEI_TABLE[dayTenkan][dayChishi] || '--';

    // エネルギー
    const ENERGY_VALUES = {
        '胎': 3, '養': 6, '長生': 9, '沐浴': 7, '冠帯': 10, '建禄': 11,
        '帝旺': 12, '衰': 8, '病': 4, '死': 2, '墓': 5, '絶': 1
    };
    const eY = ENERGY_VALUES[unseiYear] || 0;
    const eM = ENERGY_VALUES[unseiMonth] || 0;
    const eD = ENERGY_VALUES[unseiDay] || 0;

    let chushatsuStr = "";
    if (CHUSHATSU_TABLE && CHUSHATSU_TABLE[dayKanshiStr]) {
        chushatsuStr = CHUSHATSU_TABLE[dayKanshiStr];
    } else {
        chushatsuStr = "戌亥"; // default fallback wrapper
    }

    return {
        dayTenkan, dayChishi,
        yearTenkan, yearChishi,
        monthTenkan, monthChishi,
        tuhenYear, tuhenMonth,
        unseiYear, unseiMonth, unseiDay,
        eY, eM, eD,
        totalEnergy: eY + eM + eD,
        chushatsu: chushatsuStr,
        birthday: date
    };
}

function getDaysInMonth(year, month) {
    return new Date(year, month, 0).getDate();
}

function calculateDaYun(date, gender, m) {
    const isYokan = ['甲', '丙', '戊', '庚', '壬'].includes(m.yearTenkan);
    const isMale = (gender === 'male');
    const isForward = (isMale && isYokan) || (!isMale && !isYokan);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    let diffDays = 0;
    const currentSetsuiriDay = SETSUIRI[month - 1];

    if (isForward) {
        if (day < currentSetsuiriDay) {
            diffDays = currentSetsuiriDay - day;
        } else {
            let nextMonth = month + 1;
            if (nextMonth > 12) nextMonth = 1;
            const nextSetsuiriDay = SETSUIRI[nextMonth - 1];
            const daysInMonth = getDaysInMonth(year, month);
            diffDays = (daysInMonth - day) + nextSetsuiriDay;
        }
    } else {
        if (day >= currentSetsuiriDay) {
            diffDays = day - currentSetsuiriDay + 1;
        } else {
            let prevMonth = month - 1;
            if (prevMonth < 1) prevMonth = 12;
            let prevYear = month === 1 ? year - 1 : year;
            const prevSetsuiriDay = SETSUIRI[prevMonth - 1];
            const daysInPrevMonth = getDaysInMonth(prevYear, prevMonth);
            diffDays = (daysInPrevMonth - prevSetsuiriDay) + day + 1;
        }
    }

    let tateUn = Math.round(diffDays / 3);
    if (tateUn <= 0) tateUn = 1;

    let tIdx = TENKAN.indexOf(m.monthTenkan);
    let cIdx = CHISHI.indexOf(m.monthChishi);
    const cycles = [];

    for (let i = 0; i < 9; i++) {
        if (isForward) {
            tIdx = (tIdx + 1) % 10;
            cIdx = (cIdx + 1) % 12;
        } else {
            tIdx = (tIdx - 1 + 10) % 10;
            cIdx = (cIdx - 1 + 12) % 12;
        }
        const startAge = tateUn + i * 10;
        const endAge = startAge + 9;
        const tTenkan = TENKAN[tIdx];
        const tChishi = CHISHI[cIdx];
        const tuhen = TUHEN_TABLE[m.dayTenkan][tTenkan];
        const unsei = UNSEI_TABLE[m.dayTenkan][tChishi];

        cycles.push({ startAge, endAge, kanshi: tTenkan + tChishi, tuhen, unsei, isCurrent: false });
    }

    const currentAge = new Date().getFullYear() - year;
    for (let c of cycles) {
        if (currentAge >= c.startAge && currentAge <= c.endAge) {
            c.isCurrent = true; break;
        }
    }
    if (currentAge < tateUn && cycles.length > 0) cycles[0].isCurrent = true;

    return { direction: isForward ? '順行' : '逆行', tateUn, cycles };
}

function generateChushatsuYearTableHtml(chushatsuStr, dayTenkan) {
    if (!chushatsuStr) return '';
    const cs1 = chushatsuStr[0];

    // 陽干（＋）か陰干（－）か判定
    const isYokan = ['甲', '丙', '戊', '庚', '壬'].includes(dayTenkan);
    const cs1Idx = CHISHI.indexOf(cs1);
    const preCS = CHISHI[(cs1Idx - 1 + 12) % 12];
    const csStartChishi = isYokan ? preCS : cs1;
    const cycleStartIdx = CHISHI.indexOf(csStartChishi);

    const currentYear = new Date().getFullYear();
    const startYear = currentYear - 6;
    const endYear = currentYear + 6;

    const BRANCH_MONTH = {
        '子': '12月', '丑': '1月', '寅': '2月', '卯': '3月',
        '辰': '4月', '巳': '5月', '午': '6月', '未': '7月',
        '申': '8月', '酉': '9月', '戌': '10月', '亥': '11月'
    };

    let html = `<div style="display:flex; flex-direction:column; gap:0.5rem; margin-bottom: 2rem; background:rgba(255,255,255,0.02); padding:1rem; border-radius:8px;">
        <h4 style="color: #fca5a5; margin-bottom: 0.5rem; font-size: 1.1rem; border-bottom: 1px solid rgba(252, 165, 165, 0.3); padding-bottom: 0.3rem;">⏳ 天中殺年表 (12年周期)</h4>`;

    for (let y = startYear; y <= endYear; y++) {
        let idx = (y - 4) % 12;
        if (idx < 0) idx += 12;
        const chishi = CHISHI[idx];
        const cyclePos = (CHISHI.indexOf(chishi) - cycleStartIdx + 12) % 12;
        const cycle = CYCLE_DATA[cyclePos];

        const isCS = (cyclePos >= 0 && cyclePos <= 2);
        const isNow = (y === currentYear);

        let rowStyle = "display:flex; align-items:center; justify-content:space-between; padding:0.6rem; border-radius:6px; border-bottom:1px solid rgba(255,255,255,0.05); font-size:0.9rem;";
        if (isCS) rowStyle += " background:rgba(239,68,68,0.1); border-left:3px solid #ef4444;";
        if (isNow) rowStyle += " border:1px solid #60a5fa; background:rgba(96,165,250,0.1);";

        let badgeHtml = '';
        if (isCS) badgeHtml += `<span style="background:#ef4444; color:#fff; font-size:0.7rem; padding:0.1rem 0.4rem; border-radius:4px; margin-right:0.3rem;">天中殺</span>`;
        if (isNow) badgeHtml += `<span style="background:#3b82f6; color:#fff; font-size:0.1rem; padding:0.1rem 0.4rem; border-radius:4px;">今年</span>`;

        html += `
            <div style="${rowStyle}">
                <div style="flex:1; display:flex; flex-direction:column;">
                    <span style="color:#e2e8f0;">${y}年 <span style="font-size:0.8em; color:#94a3b8;">${BRANCH_MONTH[chishi]}</span></span>
                    <strong style="color:${isCS ? '#fca5a5' : '#cbd5e1'}; font-size:1.1em;">${chishi}</strong>
                </div>
                <div style="flex:2; display:flex; flex-direction:column;">
                    <span style="color:#fcd34d; font-weight:bold;">${cycle.label}</span>
                    <span style="color:#a1a1aa; font-size:0.8em; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${cycle.desc}</span>
                </div>
                <div style="flex:1; text-align:right;">
                    <div style="color:${cycle.ratingClass === 'bad' ? '#ef4444' : (cycle.ratingClass === 'great' ? '#34d399' : '#e2e8f0')}; font-weight:bold; margin-bottom:0.2rem;">${cycle.rating}</div>
                    ${badgeHtml}
                </div>
            </div>
        `;
    }
    html += '</div>';
    return html;
}

// 鑑定書モーダルのレンダリング
function renderAppraisalModal() {
    const container = document.getElementById('appraisal-content-container');
    const data = window.currentMetaverseData;
    if (!data || !data.fullMeishiki) {
        container.innerHTML = 'データがありません。';
        return;
    }

    const m = data.fullMeishiki;

    container.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:flex-end; border-bottom: 2px solid #a18cd1; padding-bottom: 0.5rem; margin-bottom: 1.5rem;">
            <div>
                <span style="font-size: 1.2rem; color: #e2e8f0;">${data.name} 様</span>
            </div>
            <div style="font-size: 0.9rem; color: #94a3b8;">天中殺: <strong style="color: #fca5a5;">${m.chushatsu}</strong></div>
        </div>

        <table style="width: 100%; border-collapse: collapse; text-align: center; margin-bottom: 2rem; background: rgba(255,255,255,0.05); border-radius: 8px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.2);">
            <tr style="background: rgba(161, 140, 209, 0.2); color: #e2e8f0;">
                <th style="padding: 0.8rem; border-right: 1px solid rgba(255,255,255,0.1);"></th>
                <th style="padding: 0.8rem; border-right: 1px solid rgba(255,255,255,0.1);">年柱</th>
                <th style="padding: 0.8rem; border-right: 1px solid rgba(255,255,255,0.1);">月柱</th>
                <th style="padding: 0.8rem;">日柱</th>
            </tr>
            <tr>
                <td style="padding: 0.8rem; border-right: 1px solid rgba(255,255,255,0.1); border-bottom: 1px solid rgba(255,255,255,0.1); color:#94a3b8;">天干</td>
                <td style="padding: 0.8rem; border-right: 1px solid rgba(255,255,255,0.1); border-bottom: 1px solid rgba(255,255,255,0.1); font-size:1.2rem; color:#fbc2eb;">${m.yearTenkan}</td>
                <td style="padding: 0.8rem; border-right: 1px solid rgba(255,255,255,0.1); border-bottom: 1px solid rgba(255,255,255,0.1); font-size:1.2rem; color:#fbc2eb;">${m.monthTenkan}</td>
                <td style="padding: 0.8rem; border-bottom: 1px solid rgba(255,255,255,0.1); font-size:1.2rem; color:#fbc2eb; font-weight:bold;">${m.dayTenkan}</td>
            </tr>
            <tr>
                <td style="padding: 0.8rem; border-right: 1px solid rgba(255,255,255,0.1); border-bottom: 1px solid rgba(255,255,255,0.1); color:#94a3b8;">地支</td>
                <td style="padding: 0.8rem; border-right: 1px solid rgba(255,255,255,0.1); border-bottom: 1px solid rgba(255,255,255,0.1); font-size:1.2rem; color:#38bdf8;">${m.yearChishi}</td>
                <td style="padding: 0.8rem; border-right: 1px solid rgba(255,255,255,0.1); border-bottom: 1px solid rgba(255,255,255,0.1); font-size:1.2rem; color:#38bdf8;">${m.monthChishi}</td>
                <td style="padding: 0.8rem; border-bottom: 1px solid rgba(255,255,255,0.1); font-size:1.2rem; color:#38bdf8; font-weight:bold;">${m.dayChishi}</td>
            </tr>
            <tr style="background: rgba(255,255,255,0.02);">
                <td style="padding: 0.8rem; border-right: 1px solid rgba(255,255,255,0.1); border-bottom: 1px solid rgba(255,255,255,0.1); color:#94a3b8;">通変星</td>
                <td style="padding: 0.8rem; border-right: 1px solid rgba(255,255,255,0.1); border-bottom: 1px solid rgba(255,255,255,0.1); color:#c4b5fd;">${m.tuhenYear}</td>
                <td style="padding: 0.8rem; border-right: 1px solid rgba(255,255,255,0.1); border-bottom: 1px solid rgba(255,255,255,0.1); color:#c4b5fd; font-weight:bold;">${m.tuhenMonth}</td>
                <td style="padding: 0.8rem; border-bottom: 1px solid rgba(255,255,255,0.1); color:#c4b5fd;">--</td>
            </tr>
            <tr>
                <td style="padding: 0.8rem; border-right: 1px solid rgba(255,255,255,0.1); color:#94a3b8;">十二運星</td>
                <td style="padding: 0.8rem; border-right: 1px solid rgba(255,255,255,0.1); color:#6ee7b7;">${m.unseiYear} (${m.eY})</td>
                <td style="padding: 0.8rem; border-right: 1px solid rgba(255,255,255,0.1); color:#6ee7b7;">${m.unseiMonth} (${m.eM})</td>
                <td style="padding: 0.8rem; color:#6ee7b7;">${m.unseiDay} (${m.eD})</td>
            </tr>
        </table>
        
        <div style="background: rgba(255,255,255,0.05); padding: 1.5rem; border-radius: 8px; border: 1px solid rgba(255,255,255,0.1); margin-bottom: 2rem;">
            <h4 style="color: #fcd34d; margin-bottom: 0.5rem; font-size: 1.1rem; border-bottom: 1px dashed rgba(253, 211, 77, 0.3); padding-bottom: 0.3rem;">🌟 エネルギー総合値</h4>
            <div style="font-size: 2rem; font-weight: bold; color: #fff; text-align: center; margin: 1rem 0;">
                ${m.totalEnergy}
            </div>
        </div>
        
        ${generateChushatsuYearTableHtml(m.chushatsu, m.dayTenkan)}
        
        <div id="appraisal-dayun-container" style="margin-bottom: 2rem;"></div>
        <div id="appraisal-health-container"></div>
    `;

    // 1. 大運表のDOM生成と挿入
    const daYun = calculateDaYun(m.birthday || new Date(), data.gender, m);
    let daYunHtml = `
        <h4 style="color: #6ee7b7; margin-bottom: 1rem; font-size: 1.1rem; border-bottom: 1px solid rgba(110, 231, 183, 0.3); padding-bottom: 0.3rem;">🔄 大運（10年ごとの運勢）</h4>
        <div style="font-size: 0.85rem; color: #94a3b8; margin-bottom: 1rem;">
            立運: ${daYun.tateUn}歳 （${daYun.direction}）
        </div>
        <div style="overflow-x: auto; padding-bottom: 1rem;">
            <table style="width: 100%; border-collapse: collapse; text-align: center; min-width: 600px;">
                <tr>
                    ${daYun.cycles.map(c => `<th style="padding: 0.5rem; border-bottom: 1px solid rgba(255,255,255,0.2); color: #e2e8f0; font-weight: normal; font-size: 0.9rem;">${c.startAge}〜${c.endAge}歳</th>`).join('')}
                </tr>
                <tr>
                    ${daYun.cycles.map(c => `
                        <td style="padding: 0.8rem 0.2rem; border-bottom: 1px dashed rgba(255,255,255,0.1);">
                            ${c.isCurrent ? '<div style="background:rgba(252, 211, 77, 0.15); border:1px solid #fcd34d; border-radius:8px; padding:0.5rem;">' : '<div style="padding:0.5rem;">'}
                                <div style="font-weight:bold; font-size:1.1rem; color:#fbc2eb; margin-bottom:0.3rem;">${c.kanshi}</div>
                                <div style="font-size:0.85rem; color:#c4b5fd; margin-bottom:0.2rem;">${c.tuhen}</div>
                                <div style="font-size:0.8rem; color:#6ee7b7;">${c.unsei}</div>
                            </div>
                        </td>
                    `).join('')}
                </tr>
            </table>
        </div>
    `;
    document.getElementById('appraisal-dayun-container').innerHTML = daYunHtml;

    // 2. 健康運のDOM生成と挿入
    const elementsCount = { '木': 0, '火': 0, '土': 0, '金': 0, '水': 0 };
    const components = [m.yearTenkan, m.yearChishi, m.monthTenkan, m.monthChishi, m.dayTenkan, m.dayChishi];
    components.forEach(c => {
        if (ELEMENT_MAP[c]) {
            const el = ELEMENT_MAP[c].charAt(1);
            if (elementsCount[el] !== undefined) elementsCount[el]++;
        }
    });

    const HEALTH_RULES = [
        { el: '木', name: '肝臓、筋肉、神経' },
        { el: '火', name: '心臓、血液、血圧' },
        { el: '土', name: '消化器' },
        { el: '金', name: '肺、呼吸器、喘息' },
        { el: '水', name: '腎臓' }
    ];

    let healthHtml = '<table style="width:100%; text-align:left; font-size:0.95rem; border-collapse:collapse; margin-top:0.5rem;">';
    HEALTH_RULES.forEach(r => {
        const count = elementsCount[r.el];
        let mark = '×'; let color = '#ec4899';
        if (count === 1 || count === 2) { mark = '〇'; color = '#10b981'; }
        else if (count >= 3) { mark = '△'; color = '#f59e0b'; }

        healthHtml += `
            <tr style="border-bottom:1px solid rgba(255,255,255,0.1);">
                <td style="padding:0.5rem 0; color:var(--text-primary);">
                    <span style="display:inline-block; width:20px; text-align:center;">${r.el}</span>
                    <span style="font-size:0.85em; margin-left:8px; color:var(--text-secondary);">${r.name}</span>
                </td>
                <td style="text-align:right; font-weight:bold; font-size:1.1em; color:${color}; width:30px;">${mark}</td>
            </tr>`;
    });
    healthHtml += '</table>';

    document.getElementById('appraisal-health-container').innerHTML = `
        <h4 style="color: #f472b6; margin-bottom: 1rem; font-size: 1.1rem; border-bottom: 1px solid rgba(244, 114, 182, 0.3); padding-bottom: 0.3rem;">🍀 健康運・体質傾向</h4>
        <div style="background: rgba(255,255,255,0.05); padding: 1.2rem; border-radius: 8px;">
            ${healthHtml}
            <div style="margin-top: 1rem; font-size: 0.85rem; color: #cbd5e1; line-height: 1.6;">
                ${HEALTH_DATA[m.dayTenkan] ? '<strong>' + HEALTH_DATA[m.dayTenkan].icon + ' ' + HEALTH_DATA[m.dayTenkan].title + '</strong><br>' + HEALTH_DATA[m.dayTenkan].desc : ''}
            </div>
        </div>
    `;
}

// 簡単な日干支算出ロジック（UTC計算で安全に）
function calculateDayKanshi(date) {
    const utcDate = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
    const baseDate = Date.UTC(1900, 0, 1); // 1900-01-01 was 甲戌(10)

    let diffDays = Math.floor((utcDate - baseDate) / (1000 * 60 * 60 * 24));
    let dayKanshiIndex = (diffDays + 10) % 60;
    if (dayKanshiIndex < 0) dayKanshiIndex += 60;

    return {
        dayTenkan: TENKAN[dayKanshiIndex % 10],
        dayChishi: CHISHI[dayKanshiIndex % 12]
    };
}

// 相性鑑定ロジック
function getTenkanRelation(t1, t2) {
    if (t1 === t2) return { type: '比和', desc: '同じ五行の性質を持つため気を使わない関係です。' };
    const kangoMap = { '甲': '己', '己': '甲', '乙': '庚', '庚': '乙', '丙': '辛', '辛': '丙', '丁': '壬', '壬': '丁', '戊': '癸', '癸': '戊' };
    if (kangoMap[t1] === t2) return { type: '干合', desc: '最高の相性です。強烈に惹かれ合い、補い合える関係です。' };
    const e1 = ELEMENT_MAP[t1].charAt(1);
    const e2 = ELEMENT_MAP[t2].charAt(1);
    if (e1 === e2) return { type: '比和', desc: '似た者同士で共感しやすい関係です。' };
    const soshou = { '木': '火', '火': '土', '土': '金', '金': '水', '水': '木' };
    if (soshou[e1] === e2 || soshou[e2] === e1) return { type: '相生', desc: '一方が相手を自然にサポートし、育てあう関係です。' };
    const sokoku = { '木': '土', '土': '水', '水': '火', '火': '金', '金': '木' };
    if (sokoku[e1] === e2 || sokoku[e2] === e1) return { type: '相剋', desc: '価値観が異なり刺激的ですが、ストレスを感じることも。' };
    return { type: '普通', desc: '標準的な関係です。歩み寄りで良好になります。' };
}

function getChishiRelation(c1, c2) {
    const shigo = { '子': '丑', '丑': '子', '寅': '亥', '亥': '寅', '卯': '戌', '戌': '卯', '辰': '酉', '酉': '辰', '巳': '申', '申': '巳', '午': '未', '未': '午' };
    if (shigo[c1] === c2) return { type: '支合', desc: '現実面の相性が抜群です。意気投合しやすい大吉の関係です。' };
    const sangoGroups = [['申', '子', '辰'], ['亥', '卯', '未'], ['寅', '午', '戌'], ['巳', '酉', '丑']];
    for (let g of sangoGroups) {
        if (g.includes(c1) && g.includes(c2) && c1 !== c2) return { type: '三合', desc: '発展を意味する良い相性です。運気がスケールアップします。' };
    }
    const chu = { '子': '午', '午': '子', '丑': '未', '未': '丑', '寅': '申', '申': '寅', '卯': '酉', '酉': '卯', '辰': '戌', '戌': '辰', '巳': '亥', '亥': '巳' };
    if (chu[c1] === c2) return { type: '冲', desc: '対極の組み合わせです。衝突しやすいのでリスペクトが大事です。' };
    if (c1 === c2 && ['辰', '午', '酉', '亥'].includes(c1)) return { type: '刑', desc: '似ているからこそ相手の嫌な部分が目につくライバルです。' };
    return { type: '普通', desc: '極端な衝突はありません。' };
}

function handleCompatibilityCheck() {
    const nameA = window.currentMetaverseData.name || 'あなた';
    const mA = window.currentMetaverseData.fullMeishiki;

    const nameB = document.getElementById('comp-name').value || 'お相手';
    const yB = parseInt(document.getElementById('comp-year').value);
    const mB_val = parseInt(document.getElementById('comp-month').value);
    const dB = parseInt(document.getElementById('comp-day').value);

    if (!yB || !mB_val || !dB) return alert('お相手の生年月日を選択してください。');

    const dateB = new Date(yB, mB_val - 1, dB);
    const mB = calculateMeishikiLocal(dateB);

    // 点数計算
    let score = 0;

    // 1. 日干相性 (25点)
    const tenkanRel = getTenkanRelation(mA.dayTenkan, mB.dayTenkan);
    let tkScore = 0; let tkSym = '×';
    if (['干合', '相生'].includes(tenkanRel.type)) { tkScore = 25; tkSym = '〇'; }
    else if (['比和', '普通'].includes(tenkanRel.type)) { tkScore = 15; tkSym = '△'; }
    score += tkScore;

    // 2. 日支相性 (25点)
    const chishiRel = getChishiRelation(mA.dayChishi, mB.dayChishi);
    let cScore = 0; let cSym = '×';
    if (['支合', '三合'].includes(chishiRel.type)) { cScore = 25; cSym = '〇'; }
    else if (chishiRel.type === '普通') { cScore = 15; cSym = '△'; }
    score += cScore;

    // 3. 月支相性 (25点)
    const mChishiRel = getChishiRelation(mA.monthChishi, mB.monthChishi);
    let mcScore = 0; let mcSym = '×';
    if (['支合', '三合'].includes(mChishiRel.type)) { mcScore = 25; mcSym = '〇'; }
    else if (mChishiRel.type === '普通') { mcScore = 15; mcSym = '△'; }
    score += mcScore;

    // 4. エネルギー相性 (25点)
    const eA = mA.totalEnergy; const eB = mB.totalEnergy;
    let eScore = 0; let eSym = '×';
    const diff = Math.abs(eA - eB);
    if (diff <= 5) {
        if (eA === eB) { eScore = 25; eSym = '〇'; }
        else { eScore = (window.currentMetaverseData.gender === 'male' && eA > eB) ? 25 : 15; eSym = (eScore === 25) ? '〇' : '△'; }
    } else {
        if (window.currentMetaverseData.gender === 'male' && eA > eB) { eScore = 15; eSym = '△'; }
        else { eScore = 0; eSym = '×'; }
    }
    score += eScore;

    const resultContainer = document.getElementById('compatibility-result-container');
    resultContainer.innerHTML = `
        <h4 style="color: #6ee7b7; font-size: 1.2rem; margin-bottom: 1rem; border-bottom: 1px dashed rgba(110, 231, 183, 0.3); padding-bottom: 0.5rem;">💞 相性鑑定結果</h4>
        <div style="display:flex; justify-content:space-between; margin-bottom: 1.5rem; background: rgba(0,0,0,0.2); padding: 1rem; border-radius: 8px;">
            <div style="flex:1; text-align:center;">
                <div style="color:#94a3b8; font-size:0.9rem;">${nameA}</div>
                <div style="font-size:1.5rem; color:#fbc2eb; font-weight:bold;">${mA.dayTenkan}${mA.dayChishi}</div>
            </div>
            <div style="flex:0.5; display:flex; align-items:center; justify-content:center; font-size:1.5rem; color:#fff;">×</div>
            <div style="flex:1; text-align:center;">
                <div style="color:#94a3b8; font-size:0.9rem;">${nameB}</div>
                <div style="font-size:1.5rem; color:#fbc2eb; font-weight:bold;">${mB.dayTenkan}${mB.dayChishi}</div>
            </div>
        </div>

        <div style="text-align:center; margin-bottom: 1.5rem;">
            <div style="font-size: 0.9rem; color: #cbd5e1;">総合相性スコア</div>
            <div style="font-size: 3rem; font-weight: bold; color: ${score >= 70 ? '#f472b6' : (score >= 40 ? '#facc15' : '#94a3b8')};">${score}%</div>
        </div>

        <table style="width: 100%; border-collapse: collapse; text-align: left; background: rgba(255,255,255,0.05); border-radius: 8px; overflow: hidden;">
            <tr style="background: rgba(161, 140, 209, 0.2); color: #e2e8f0;">
                <th style="padding: 0.8rem; border-right: 1px solid rgba(255,255,255,0.1);">審査項目</th>
                <th style="padding: 0.8rem; border-right: 1px solid rgba(255,255,255,0.1); width: 60px; text-align:center;">判定</th>
                <th style="padding: 0.8rem;">詳細</th>
            </tr>
            <tr style="border-bottom: 1px solid rgba(255,255,255,0.1);">
                <td style="padding: 0.8rem; border-right: 1px solid rgba(255,255,255,0.1); color:#94a3b8;">精神面(日干)</td>
                <td style="padding: 0.8rem; border-right: 1px solid rgba(255,255,255,0.1); text-align:center; font-weight:bold; font-size:1.2rem; color:${tkSym === '〇' ? '#10b981' : (tkSym === '△' ? '#facc15' : '#ef4444')}">${tkSym}</td>
                <td style="padding: 0.8rem; font-size: 0.85rem; color:#cbd5e1;">${tenkanRel.type}: ${tenkanRel.desc}</td>
            </tr>
            <tr style="border-bottom: 1px solid rgba(255,255,255,0.1);">
                <td style="padding: 0.8rem; border-right: 1px solid rgba(255,255,255,0.1); color:#94a3b8;">現実面(日支)</td>
                <td style="padding: 0.8rem; border-right: 1px solid rgba(255,255,255,0.1); text-align:center; font-weight:bold; font-size:1.2rem; color:${cSym === '〇' ? '#10b981' : (cSym === '△' ? '#facc15' : '#ef4444')}">${cSym}</td>
                <td style="padding: 0.8rem; font-size: 0.85rem; color:#cbd5e1;">${chishiRel.type}: ${chishiRel.desc}</td>
            </tr>
            <tr style="border-bottom: 1px solid rgba(255,255,255,0.1);">
                <td style="padding: 0.8rem; border-right: 1px solid rgba(255,255,255,0.1); color:#94a3b8;">社会面(月支)</td>
                <td style="padding: 0.8rem; border-right: 1px solid rgba(255,255,255,0.1); text-align:center; font-weight:bold; font-size:1.2rem; color:${mcSym === '〇' ? '#10b981' : (mcSym === '△' ? '#facc15' : '#ef4444')}">${mcSym}</td>
                <td style="padding: 0.8rem; font-size: 0.85rem; color:#cbd5e1;">${mChishiRel.type}: ${mChishiRel.desc}</td>
            </tr>
            <tr>
                <td style="padding: 0.8rem; border-right: 1px solid rgba(255,255,255,0.1); color:#94a3b8;">活力差</td>
                <td style="padding: 0.8rem; border-right: 1px solid rgba(255,255,255,0.1); text-align:center; font-weight:bold; font-size:1.2rem; color:${eSym === '〇' ? '#10b981' : (eSym === '△' ? '#facc15' : '#ef4444')}">${eSym}</td>
                <td style="padding: 0.8rem; font-size: 0.85rem; color:#cbd5e1;">あなた(${eA}) vs お相手(${eB})<br>スコア傾向に基づく相性</td>
            </tr>
        </table>
    `;
    resultContainer.classList.remove('hidden');
    // 下までスクロール
    document.getElementById('compatibility-form-container').scrollTo(0, document.getElementById('compatibility-form-container').scrollHeight);
}

// 空間へのダイブアニメーションとThree.jsの初期化（シングル用）
// m は calculateMeishiki(date) の結果のオブジェクト全体を受け取るよう拡張
function diveIntoMetaverse(name, gender, m) {
    // UI の更新
    document.getElementById('gateway').classList.add('hidden');
    document.getElementById('ui-overlay').classList.remove('hidden');

    const dayTenkan = m.dayTenkan;
    const dayChishi = m.dayChishi;

    // メタバース用のステートを保存
    window.currentMetaverseData = {
        dayTenkan: m.dayTenkan,
        dayChishi: m.dayChishi,
        chushatsu: m.chushatsu,
        fullMeishiki: m,
        name: name,
        gender: gender,
        // 年柱・月柱データも保存（仕事・プライベート運勢モーダル用）
        yT: m.yearTenkan,
        yC: m.yearChishi,
        mT: m.monthTenkan,
        mC: m.monthChishi
    };

    const theme = ENV_THEMES[dayTenkan];
    const avatarData = AVATAR_MAP[dayChishi];

    // パネル情報更新
    document.getElementById('env-title').textContent = theme.name;
    document.getElementById('env-desc').textContent = theme.desc;
    document.getElementById('stat-nikkan').textContent = dayTenkan;
    document.getElementById('stat-nisshi').textContent = dayChishi;

    // 性格とアバター情報の更新
    const uiEmoji = document.getElementById('avatar-emoji');
    const uiImage = document.getElementById('avatar-image');
    if (uiImage) uiImage.style.display = 'none';

    // 擬似的なキャラクターアバター生成処理（性別、十干、十二支を組み合わせたアイコン表示）
    // let genderPrefix = gender === 'male' ? '♂️' : '♀️';
    uiEmoji.innerHTML = `
        <!-- <div style="font-size: 3rem; filter: drop-shadow(0 0 10px rgba(255,255,255,0.8));">\${genderPrefix}</div> -->
        <!-- <div style="font-size: 5rem;">\${avatarData.emoji}</div> -->
    `;
    uiEmoji.style.display = 'flex';
    uiEmoji.style.flexDirection = 'column';
    uiEmoji.style.alignItems = 'center';

    // 性格テキストをアバター下部に表示
    const traitText = CHARACTER_TRAITS[dayTenkan];
    let traitEl = document.getElementById('avatar-trait');
    if (!traitEl) {
        traitEl = document.createElement('div');
        traitEl.id = 'avatar-trait';
        traitEl.style.marginTop = '1rem';
        traitEl.style.fontSize = '0.85rem';
        traitEl.style.textAlign = 'center';
        traitEl.style.maxWidth = '250px';
        traitEl.style.background = 'rgba(0,0,0,0.5)';
        traitEl.style.padding = '0.5rem 1rem';
        traitEl.style.borderRadius = '12px';
        traitEl.style.color = '#e2e8f0';
        traitEl.style.border = '1px solid rgba(255,255,255,0.2)';
        document.getElementById('avatar-container').appendChild(traitEl);
    }
    traitEl.innerHTML = `<strong>【${dayTenkan}の気質】</strong><br>${traitText}`;

    document.getElementById('avatar-name').textContent = name;

    const uiRing = document.getElementById('avatar-ring');
    const uiGenderIcon = document.getElementById('avatar-gender');
    const auraColor = ELEMENT_AURAS[dayTenkan];

    if (gender === 'male') {
        // uiGenderIcon.textContent = '♂';
        // uiGenderIcon.style.color = '#4facfe'; // Blue
        uiRing.style.borderColor = auraColor; // 五行の色をリングに
        uiRing.style.boxShadow = `0 0 20px ${auraColor}`;
        if (!avatarData.image) uiEmoji.style.filter = `drop-shadow(0 0 30px ${auraColor})`;
    } else {
        // uiGenderIcon.textContent = '♀';
        // uiGenderIcon.style.color = '#ff0844'; // Pink/Red
        uiRing.style.borderColor = auraColor;
        uiRing.style.boxShadow = `0 0 20px ${auraColor}`;
        if (!avatarData.image) uiEmoji.style.filter = `drop-shadow(0 0 30px ${auraColor})`;
    }

    // 背景画像の更新
    const bgContainer = document.getElementById('canvas-container');
    const bgImageUrl = getBackgroundImage(dayTenkan, dayChishi);
    bgContainer.style.backgroundImage = `url('${bgImageUrl}')`;
    bgContainer.style.backgroundSize = 'cover';
    bgContainer.style.backgroundPosition = 'center';

    // 既存のオーバーレイ（以前のバージョン）があれば削除
    let existingOverlay = document.getElementById('season-overlay');
    if (existingOverlay) existingOverlay.remove();

    // わずかなパララックス効果のためのマウス連動
    document.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 20;
        const y = (e.clientY / window.innerHeight - 0.5) * 20;
        bgContainer.style.transform = `scale(1.05) translate(${-x}px, ${-y}px)`;
    });

    // --- トップのテーマ表示の更新 ---
    updateTopThemeDisplay();
}

// --- 月齢計算と新月・満月連動エフェクト ---
function checkMoonPhaseAndApplyEffect(dayTenkan) {
    const now = new Date();
    // 簡易月齢計算: 既知の新月（例: 2000年1月6日 18:14 UTC -> JSTだと1月7日頃）を基準に朔望月(29.530588853日)で割る
    const knownNewMoon = new Date(Date.UTC(2000, 0, 6, 18, 14, 0));
    const diffMs = now.getTime() - knownNewMoon.getTime();
    const cycleMs = 29.530588853 * 24 * 60 * 60 * 1000;
    const phase = (diffMs % cycleMs) / cycleMs; // 0.0 ~ 1.0 (0:新月, 0.5:満月)

    const MOON_THRESHOLD = 0.05; // 完全な新月/満月の前後約1.5日分を許容
    let isNewMoon = (phase < MOON_THRESHOLD || phase > (1.0 - MOON_THRESHOLD));
    let isFullMoon = (Math.abs(phase - 0.5) < MOON_THRESHOLD);

    // デバッグテスト用途: 確認完了後削除またはコメントアウト
    // isNewMoon = true;

    if (!isNewMoon && !isFullMoon) return;

    // 演出の適用
    const bgContainer = document.getElementById('canvas-container');
    const overlay = document.createElement('div');
    overlay.style.position = 'absolute';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.pointerEvents = 'none';
    overlay.style.zIndex = '1';
    overlay.style.transition = 'opacity 3s ease-in-out';

    let title = '';
    let msg = '';

    if (isNewMoon) {
        overlay.style.background = 'radial-gradient(circle at center, rgba(15,23,42,0.6) 0%, rgba(0,0,0,0.9) 100%)';
        overlay.style.boxShadow = 'inset 0 0 100px rgba(0,0,0,1)';
        title = '🌑 新月の夜';
        msg = `今日は新月。あなたの本質「${dayTenkan}」のエネルギーが一度ゼロに帰り、新しい種をまく絶好のタイミングです。静かな空間で願い事を思い浮かべてみてください。`;
    } else if (isFullMoon) {
        overlay.style.background = 'radial-gradient(circle at top right, rgba(253,230,138,0.4) 0%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0.8) 100%)';
        overlay.style.boxShadow = 'inset 0 0 100px rgba(253,230,138,0.3)';
        title = '🌕 満月の夜';
        msg = `今日は満月。あなたの本質「${dayTenkan}」のエネルギーが最大に満ちる夜です。これまでの感謝を伝えることで、さらなる豊かさが引き寄せられるでしょう。`;
    }

    bgContainer.appendChild(overlay);

    // 特別なダイアログを少し遅れて表示
    setTimeout(() => {
        // guardian-modalのリソースを借りてメッセージを表示させる（簡易UI）
        document.getElementById('guardian-icon').textContent = isNewMoon ? '🌑' : '🌕';
        document.getElementById('guardian-title').textContent = title;
        document.getElementById('guardian-title').style.color = isNewMoon ? '#94a3b8' : '#fcd34d';
        document.getElementById('guardian-desc').innerHTML = msg;
        document.getElementById('guardian-action').innerHTML = `<em>${isNewMoon ? '「新しい始まりの祝福」' : '「達成と感謝の祝福」'}</em> がこの空間を満たしています。`;
        document.getElementById('guardian-modal').classList.remove('hidden');
    }, 2000);
}

// 空間へのダイブ（ペア用）
function diveIntoPairMetaverse(pData) {
    document.getElementById('gateway').classList.add('hidden');
    document.getElementById('ui-overlay').classList.remove('hidden');

    // ペア用のステート（テーマや希望の光用にはAさん基準とする）
    window.currentMetaverseData = {
        dayTenkan: pData.nikkanA,
        dayChishi: pData.nisshiA,
        chushatsu: CHUSHATSU_TABLE[pData.nikkanA + pData.nisshiA]
    };

    const themeA = ENV_THEMES[pData.nikkanA];
    const themeB = ENV_THEMES[pData.nikkanB];

    // ペアモード時は個人用のテーマ・吉日ボタンを非表示にする
    const themeBtns = document.querySelector('.theme-buttons');
    if (themeBtns) themeBtns.style.display = 'none';

    // パネル情報更新（ペア仕様に変更）
    document.getElementById('env-title').innerHTML = `🌌 融合空間<br><span style="font-size:0.9rem;">${themeA.name} × ${themeB.name}</span>`;
    document.getElementById('env-desc').textContent = '2人の本質（日柱）が交わり、新たな波長を生み出す特別な空間です。';

    // statsエリアもペア仕様に書き換え
    const statsEl = document.querySelector('.stats');
    statsEl.innerHTML = `
        <div style="margin-bottom:0.5rem;"><span style="color:#a78bfa">${pData.nameA}</span> <strong>${pData.nikkanA} / ${pData.nisshiA}</strong></div>
        <div><span style="color:#fbc2eb">${pData.nameB}</span> <strong>${pData.nikkanB} / ${pData.nisshiB}</strong></div>
    `;

    // アバターコンテナのレイアウト変更（2体並べる）
    const avContainer = document.getElementById('avatar-container');
    avContainer.style.flexDirection = 'row';
    avContainer.style.gap = '4rem';
    avContainer.innerHTML = ''; // 一旦クリア

    // Aさんのアバター生成
    createAvatarDOM(avContainer, pData.nameA, pData.nikkanA, pData.nisshiA, '#4facfe'); // male/female等の色分けは簡略化

    // Bさんのアバター生成
    createAvatarDOM(avContainer, pData.nameB, pData.nikkanB, pData.nisshiB, '#ff0844');

    // 背景画像のブレンド更新 (CSSグラデーションで左右から画像をフェードさせるなど)
    const bgContainer = document.getElementById('canvas-container');
    // クロスフェード風の疑似ブレンド表現
    bgContainer.style.backgroundImage = `
        linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 40%, rgba(0,0,0,0.8) 50%, rgba(0,0,0,0) 60%, rgba(0,0,0,0) 100%),
        url('${themeA.image}')
    `;
    bgContainer.style.backgroundSize = 'cover';
    bgContainer.style.backgroundPosition = 'center left';

    // Bの画像を::after等で付与するのはJSからだと面倒なので、簡単に2つのdivを用意して重ねる方式でも良いが、
    // まずはAベースの背景＋ブレンドカラーでの演出にとどめる
    bgContainer.style.boxShadow = `inset 0 0 150px ${ELEMENT_AURAS[pData.nikkanB]}`;

    document.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 20;
        const y = (e.clientY / window.innerHeight - 0.5) * 20;
        bgContainer.style.transform = `scale(1.05) translate(${-x}px, ${-y}px)`;
    });

    // --- ペア専用のトップテーマ表示（この機能は個人用なので非表示にするかAさん基準にするか）---
    // ここではAさん基準のテーマを表示することとします。
    updateTopThemeDisplay();
}

// アバターDOMを動的に生成するヘルパー
function createAvatarDOM(container, name, tenkan, chishi, ringColorBase) {
    const avatarData = AVATAR_MAP[chishi];
    const auraColor = ELEMENT_AURAS[tenkan];

    const wrapper = document.createElement('div');
    wrapper.style.position = 'relative';
    wrapper.style.display = 'flex';
    wrapper.style.flexDirection = 'column';
    wrapper.style.alignItems = 'center';
    wrapper.style.transition = 'transform 0.3s ease';

    const ring = document.createElement('div');
    ring.className = 'avatar-ring';
    ring.style.borderColor = auraColor;
    ring.style.boxShadow = `0 0 20px ${auraColor}`;

    const emoji = document.createElement('div');
    emoji.id = 'avatar-emoji-' + name;
    emoji.style.fontSize = '6rem';
    emoji.style.position = 'relative';
    emoji.style.zIndex = '2';

    if (avatarData.image) {
        emoji.style.display = 'none';
        // const img = document.createElement('img');
        // img.className = 'real-avatar';
        // img.src = avatarData.image;
        // wrapper.appendChild(img);
    } else {
        // emoji.textContent = avatarData.emoji;
        // emoji.style.filter = \`drop-shadow(0 0 30px \${auraColor})\`;
        // wrapper.appendChild(emoji);
    }

    const info = document.createElement('div');
    info.className = 'avatar-info';
    info.style.marginTop = '1rem';
    info.innerHTML = `<span style="color:${ringColorBase}; font-weight:bold;">${name}</span>`;

    wrapper.appendChild(ring);
    wrapper.appendChild(info);
    container.appendChild(wrapper);
}

// --- テーマ（今年・今月の運勢）算出用関数 ---
function getCyclePositionFromChishi(chishi, chushatsuStr, dayTenkan) {
    const cs1 = chushatsuStr[0];
    const cs1Idx = CHISHI.indexOf(cs1);
    const preCS = CHISHI[(cs1Idx - 1 + 12) % 12];
    const isYokan = ['甲', '丙', '戊', '庚', '壬'].includes(dayTenkan);
    const csStartChishi = isYokan ? preCS : cs1;
    const cycleStartIdx = CHISHI.indexOf(csStartChishi);
    const chishiIdx = CHISHI.indexOf(chishi);
    return (chishiIdx - cycleStartIdx + 12) % 12;
}

function getYearChishiObj(y) {
    let idx = (y - 4) % 12;
    if (idx < 0) idx += 12;
    return CHISHI[idx];
}

function getCurrentMonthChishi() {
    const now = new Date();
    const y = now.getFullYear();
    const m = now.getMonth() + 1;
    const d = now.getDate();
    let monthAdjusted = m;
    let currentSetsuiriDay = SETSUIRI[m - 1];
    if (d < currentSetsuiriDay) {
        monthAdjusted--;
        if (monthAdjusted === 0) monthAdjusted = 12;
    }
    return CHISHI[monthAdjusted % 12];
}

function openThemeModal(title, badge, badgeClass, cycleData, dayTenkan, kanshiStr = null) {
    document.getElementById('theme-title').textContent = title;
    const badgeEl = document.getElementById('theme-badge');
    badgeEl.textContent = badge;
    badgeEl.className = 'cs-badge ' + badgeClass;

    const ratingEl = document.getElementById('theme-rating');
    ratingEl.textContent = cycleData.rating;
    ratingEl.className = 'cs-rating-' + cycleData.ratingClass;

    const elementGroup = ELEMENT_MAP[dayTenkan].charAt(1);
    const msg = THEME_MESSAGES[elementGroup][CYCLE_DATA.indexOf(cycleData)];

    // 星の情報を表示、および総合メッセージの構築
    const starInfoEl = document.getElementById('theme-star-info');
    let baseMsg = msg; // 五行別の基本メッセージ

    if (kanshiStr && kanshiStr.length === 2 && starInfoEl) {
        const tTenkan = kanshiStr.charAt(0);
        const tChishi = kanshiStr.charAt(1);

        const tuhen = TUHEN_TABLE[dayTenkan][tTenkan];
        const unsei = UNSEI_TABLE[dayTenkan][tChishi];

        const kanshiEl = document.getElementById('theme-kanshi');
        const tuhenEl = document.getElementById('theme-tuhen');
        const unseiEl = document.getElementById('theme-unsei');
        if (kanshiEl) kanshiEl.textContent = kanshiStr;
        if (tuhenEl) tuhenEl.textContent = tuhen;
        if (unseiEl) unseiEl.textContent = unsei;
        starInfoEl.style.display = 'block';

        // テーマ・エネルギーによるメッセージを結合
        const tuhenText = TUHEN_MESSAGES[tuhen] || '';
        const unseiText = UNSEI_MESSAGES[unsei] || '';

        baseMsg = `${msg}\n\n💡 さらに詳しく見ると…\n${tuhenText}\n${unseiText}`;
    } else if (starInfoEl) {
        starInfoEl.style.display = 'none';
    }

    document.getElementById('theme-desc').textContent = '【' + cycleData.label + '】期';
    document.getElementById('theme-message').textContent = baseMsg;

    document.getElementById('theme-modal').classList.remove('hidden');
}

// --- トップにテーマを表示するための関数 ---
function updateTopThemeDisplay() {
    if (!window.currentMetaverseData) return;
    const { dayTenkan, chushatsu } = window.currentMetaverseData;

    // 今年のテーマ計算
    const currentYear = new Date().getFullYear();
    let yearKanshiIndex = (currentYear - 4) % 60;
    if (yearKanshiIndex < 0) yearKanshiIndex += 60;
    const currentYearChishi = CHISHI[yearKanshiIndex % 12];
    const yearPos = getCyclePositionFromChishi(currentYearChishi, chushatsu, dayTenkan);
    const yearCycle = CYCLE_DATA[yearPos];

    // 今月のテーマ計算
    const currentMonthChishi = getCurrentMonthChishi();
    const monthPos = getCyclePositionFromChishi(currentMonthChishi, chushatsu, dayTenkan);
    const monthCycle = CYCLE_DATA[monthPos];

    // DOMへのセット
    document.getElementById('top-year-text').textContent = '【' + yearCycle.label + '】';
    document.getElementById('top-month-text').textContent = '【' + monthCycle.label + '】';
}

function showYearTheme() {
    if (!window.currentMetaverseData) return;
    const { dayTenkan, chushatsu } = window.currentMetaverseData;
    const currentYear = new Date().getFullYear();

    // 年干支を取得して通変星・十二運星を計算するために利用
    let yearKanshiIndex = (currentYear - 4) % 60;
    if (yearKanshiIndex < 0) yearKanshiIndex += 60;
    const currentYearTenkan = TENKAN[yearKanshiIndex % 10];
    const currentYearChishi = CHISHI[yearKanshiIndex % 12];
    const currentYearKanshiStr = currentYearTenkan + currentYearChishi;

    const pos = getCyclePositionFromChishi(currentYearChishi, chushatsu, dayTenkan);
    const cycle = CYCLE_DATA[pos];
    openThemeModal('今年のテーマ (' + currentYear + '年)', '今年', 'cs-now', cycle, dayTenkan, currentYearKanshiStr);
}

function showMonthTheme() {
    if (!window.currentMetaverseData) return;
    const { dayTenkan, chushatsu } = window.currentMetaverseData;

    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1;

    // 既存の取得関数を利用して月支を取得
    const currentMonthChishi = getCurrentMonthChishi();

    // 月干を求めるためのロジック群
    let monthAdjusted = currentMonth;
    let currentSetsuiriDay = SETSUIRI[currentMonth - 1];
    if (now.getDate() < currentSetsuiriDay) {
        monthAdjusted--;
        if (monthAdjusted === 0) monthAdjusted = 12;
    }

    let yearForMonthCalc = currentYear;
    if (currentMonth < 2 || (currentMonth === 2 && now.getDate() < SETSUIRI[1])) yearForMonthCalc--;
    let baseYearIndex = (yearForMonthCalc - 4) % 60;
    if (baseYearIndex < 0) baseYearIndex += 60;
    const monthTenkanOffset = [2, 4, 6, 8, 0];
    const yearTenkanGroup = baseYearIndex % 10;

    const currentMonthTenkanIndex = (monthTenkanOffset[yearTenkanGroup % 5] + (monthAdjusted - 2) + 10) % 10;
    const currentMonthTenkan = TENKAN[currentMonthTenkanIndex];
    const currentMonthKanshiStr = currentMonthTenkan + currentMonthChishi;

    const pos = getCyclePositionFromChishi(currentMonthChishi, chushatsu, dayTenkan);
    const cycle = CYCLE_DATA[pos];
    openThemeModal('今月のテーマ (' + currentMonth + '月)', '今月', 'cs-now', cycle, dayTenkan, currentMonthKanshiStr);
}

// 希望の光（向こう3ヶ月の吉日・特異日ピックアップ）機能
function showLuckyDays() {
    if (!window.currentMetaverseData) return;
    const { dayTenkan, dayChishi, chushatsu } = window.currentMetaverseData;

    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;

    // 今月、来月、再来月の3ヶ月を変数に保持
    const targetMonths = [
        { y: year, m: month },
        { y: month === 12 ? year + 1 : year, m: month === 12 ? 1 : month + 1 },
        { y: month >= 11 ? year + 1 : year, m: month >= 11 ? (month === 11 ? 1 : 2) : month + 2 }
    ];

    const luckyDaysList = document.getElementById('lucky-days-list');
    const luckyDaysEmpty = document.getElementById('lucky-days-empty');
    if (!luckyDaysList || !luckyDaysEmpty) return;

    luckyDaysList.innerHTML = '';
    let foundLuckyDay = false;

    const uT = dayTenkan;
    const uC = dayChishi;
    const uCIdx = CHISHI.indexOf(uC);

    targetMonths.forEach(tm => {
        const daysInMonth = new Date(tm.y, tm.m, 0).getDate();
        for (let d = 1; d <= daysInMonth; d++) {
            const date = new Date(tm.y, tm.m - 1, d);
            // 日干支を計算
            const utcDate = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
            const baseDate = Date.UTC(1900, 0, 1);
            let diffDays = Math.floor((utcDate - baseDate) / (1000 * 60 * 60 * 24));
            let dayKanshiIndex = (diffDays + 10) % 60;
            if (dayKanshiIndex < 0) dayKanshiIndex += 60;

            const dTenkan = TENKAN[dayKanshiIndex % 10];
            const dChishi = CHISHI[dayKanshiIndex % 12];
            const dKanshiStr = dTenkan + dChishi;

            // 運勢サイクル位置を判定
            const pos = getCyclePositionFromChishi(dChishi, chushatsu, dayTenkan);
            const cycle = CYCLE_DATA[pos];

            // 特異日の判定（律音・宿命大半会のみ）
            let isTokui = false;
            let dType = '';
            let dColor = '';
            if (dTenkan === uT) {
                const dCIdx = CHISHI.indexOf(dChishi);
                if (dChishi === uC) {
                    isTokui = true;
                    dType = '律音';
                    dColor = '#f472b6'; // Pink
                } else if (dCIdx === (uCIdx + 4) % 12 || dCIdx === (uCIdx + 8) % 12) {
                    isTokui = true;
                    dType = '宿命大半会';
                    dColor = '#a78bfa'; // Purple
                }
            }

            // 「青春(7)」「飛躍(9)」「絶好調(10)」または「特異日」をピックアップ
            const isLuckyCycle = (pos === 7 || pos === 9 || pos === 10);

            if (isLuckyCycle || isTokui) {
                foundLuckyDay = true;

                const tuhen = TUHEN_TABLE[dayTenkan][dTenkan];
                const unsei = UNSEI_TABLE[dayTenkan][dChishi];
                const dayOfWeekStr = ['日', '月', '火', '水', '木', '金', '土'][date.getDay()];

                let tagsHtml = '';
                if (isLuckyCycle) {
                    let ratingBadgeColor = cycle.ratingClass === 'great' ? '#f59e0b' : '#3b82f6';
                    if (pos === 10) ratingBadgeColor = '#ef4444';
                    tagsHtml += `<span style="background: ${ratingBadgeColor}20; color: ${ratingBadgeColor}; padding: 0.2rem 0.6rem; border-radius: 12px; font-size: 0.8rem; font-weight: bold; border: 1px solid ${ratingBadgeColor}50; margin-right: 0.5rem;">${cycle.label} ${cycle.rating}</span>`;
                }
                if (isTokui) {
                    tagsHtml += `<span style="background: ${dColor}20; color: ${dColor}; padding: 0.2rem 0.6rem; border-radius: 12px; font-size: 0.8rem; font-weight: bold; border: 1px solid ${dColor}50;">${dType}</span>`;
                }

                const borderLeft = isTokui ? `border-left: 4px solid ${dColor};` : '';

                const itemHtml = `
                    <div onclick="showDailyAdviceModal('${tm.m}月${d}日 (${dayOfWeekStr})', '${dKanshiStr}', '${tuhen}', '${unsei}')" style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; padding: 1rem; display: flex; flex-direction: column; gap: 0.5rem; cursor: pointer; transition: background 0.2s; ${borderLeft}" onmouseover="this.style.background='rgba(255,255,255,0.1)'" onmouseout="this.style.background='rgba(255,255,255,0.03)'">
                        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 0.5rem;">
                            <div style="font-size: 1.1rem; font-weight: bold; color: var(--text-primary);">
                                ${tm.m}月${d}日 <span style="font-size: 0.9rem; color: var(--text-secondary);">(${dayOfWeekStr})</span>
                            </div>
                            <div style="display: flex; align-items: center; flex-wrap: wrap; gap: 0.2rem; justify-content: flex-end;">
                                ${tagsHtml}
                            </div>
                        </div>
                        <div style="display: flex; justify-content: space-between; font-size: 0.9rem;">
                            <div><span style="color: var(--text-secondary);">巡る干支:</span> <span style="color: var(--text-primary); font-weight: bold;">${dKanshiStr}</span></div>
                            <div><span style="color: var(--text-secondary);">テーマ:</span> <span style="color: #a78bfa; font-weight: bold;">${tuhen}</span></div>
                            <div><span style="color: var(--text-secondary);">運勢:</span> <span style="color: #34d399; font-weight: bold;">${unsei}</span></div>
                        </div>
                    </div>
                `;
                luckyDaysList.insertAdjacentHTML('beforeend', itemHtml);
            }
        }
    });

    if (foundLuckyDay) {
        luckyDaysList.style.display = 'flex';
        luckyDaysEmpty.style.display = 'none';
    } else {
        luckyDaysList.style.display = 'none';
        luckyDaysEmpty.style.display = 'block';
    }

    document.getElementById('lucky-days-modal').classList.remove('hidden');
}

// 静寂の時（向こう3ヶ月の警戒日ピックアップ）機能
function showWarningDays() {
    if (!window.currentMetaverseData) return;
    const { dayTenkan, dayChishi, chushatsu } = window.currentMetaverseData;

    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;

    // 今月、来月、再来月の3ヶ月を変数に保持
    const targetMonths = [
        { y: year, m: month },
        { y: month === 12 ? year + 1 : year, m: month === 12 ? 1 : month + 1 },
        { y: month >= 11 ? year + 1 : year, m: month >= 11 ? (month === 11 ? 1 : 2) : month + 2 }
    ];

    const warningDaysList = document.getElementById('warning-days-list');
    const warningDaysEmpty = document.getElementById('warning-days-empty');
    if (!warningDaysList || !warningDaysEmpty) return;

    warningDaysList.innerHTML = '';
    let foundWarningDay = false;

    const uT = dayTenkan;
    const uC = dayChishi;
    const uCIdx = CHISHI.indexOf(uC);

    targetMonths.forEach(tm => {
        const daysInMonth = new Date(tm.y, tm.m, 0).getDate();
        for (let d = 1; d <= daysInMonth; d++) {
            const date = new Date(tm.y, tm.m - 1, d);
            // 日干支を計算
            const utcDate = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
            const baseDate = Date.UTC(1900, 0, 1);
            let diffDays = Math.floor((utcDate - baseDate) / (1000 * 60 * 60 * 24));
            let dayKanshiIndex = (diffDays + 10) % 60;
            if (dayKanshiIndex < 0) dayKanshiIndex += 60;

            const dTenkan = TENKAN[dayKanshiIndex % 10];
            const dChishi = CHISHI[dayKanshiIndex % 12];
            const dKanshiStr = dTenkan + dChishi;

            // 運勢サイクル位置を判定
            const pos = getCyclePositionFromChishi(dChishi, chushatsu, dayTenkan);
            const cycle = CYCLE_DATA[pos];

            // 納音の判定
            let isNacchin = false;
            let dType = '';
            let dColor = '';
            if (dTenkan === uT) {
                const dCIdx = CHISHI.indexOf(dChishi);
                if (dCIdx === (uCIdx + 6) % 12) {
                    isNacchin = true;
                    dType = '納音';
                    dColor = '#38bdf8'; // Blue
                }
            }

            // 「天中殺(0,1,2)」「休息(6)」「空転(8)」または「納音」をピックアップ
            const isWarningCycle = (pos === 0 || pos === 1 || pos === 2 || pos === 6 || pos === 8);

            if (isWarningCycle || isNacchin) {
                foundWarningDay = true;

                const tuhen = TUHEN_TABLE[dayTenkan][dTenkan];
                const unsei = UNSEI_TABLE[dayTenkan][dChishi];
                const dayOfWeekStr = ['日', '月', '火', '水', '木', '金', '土'][date.getDay()];

                let tagsHtml = '';
                if (isWarningCycle) {
                    let ratingBadgeColor = '#ef4444'; // default red for tenchusatsu and kuuten
                    if (pos === 6) ratingBadgeColor = '#8b5cf6'; // purple for kyusoku (rest)
                    tagsHtml += `<span style="background: ${ratingBadgeColor}20; color: ${ratingBadgeColor}; padding: 0.2rem 0.6rem; border-radius: 12px; font-size: 0.8rem; font-weight: bold; border: 1px solid ${ratingBadgeColor}50; margin-right: 0.5rem;">${cycle.label}</span>`;
                }
                if (isNacchin) {
                    tagsHtml += `<span style="background: ${dColor}20; color: ${dColor}; padding: 0.2rem 0.6rem; border-radius: 12px; font-size: 0.8rem; font-weight: bold; border: 1px solid ${dColor}50;">${dType}</span>`;
                }

                // 納音の場合は左側に青いボーダーを入れる
                const borderLeft = isNacchin ? `border-left: 4px solid ${dColor};` : '';

                const itemHtml = `
                    <div onclick="showDailyAdviceModal('${tm.m}月${d}日 (${dayOfWeekStr})', '${dKanshiStr}', '${tuhen}', '${unsei}')" style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; padding: 1rem; display: flex; flex-direction: column; gap: 0.5rem; cursor: pointer; transition: background 0.2s; ${borderLeft}" onmouseover="this.style.background='rgba(255,255,255,0.1)'" onmouseout="this.style.background='rgba(255,255,255,0.03)'">
                        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 0.5rem;">
                            <div style="font-size: 1.1rem; font-weight: bold; color: var(--text-primary);">
                                ${tm.m}月${d}日 <span style="font-size: 0.9rem; color: var(--text-secondary);">(${dayOfWeekStr})</span>
                            </div>
                            <div style="display: flex; align-items: center; flex-wrap: wrap; gap: 0.2rem; justify-content: flex-end;">
                                ${tagsHtml}
                            </div>
                        </div>
                        <div style="display: flex; justify-content: space-between; font-size: 0.9rem;">
                            <div><span style="color: var(--text-secondary);">巡る干支:</span> <span style="color: var(--text-primary); font-weight: bold;">${dKanshiStr}</span></div>
                            <div><span style="color: var(--text-secondary);">テーマ:</span> <span style="color: #a78bfa; font-weight: bold;">${tuhen}</span></div>
                            <div><span style="color: var(--text-secondary);">運勢:</span> <span style="color: #34d399; font-weight: bold;">${unsei}</span></div>
                        </div>
                    </div>
                `;
                warningDaysList.insertAdjacentHTML('beforeend', itemHtml);
            }
        }
    });

    if (foundWarningDay) {
        warningDaysList.style.display = 'flex';
        warningDaysEmpty.style.display = 'none';
    } else {
        warningDaysList.style.display = 'none';
        warningDaysEmpty.style.display = 'block';
    }

    document.getElementById('warning-days-modal').classList.remove('hidden');
}

// 守護神（用神）召喚処理
function summonGuardian(dayTenkan) {
    // 1. 日干から簡易的な守護神（木火土金水のいずれを補うべきか）を決定
    // ※今回はエンタメとして「日干を生じる五行（印星）」または「日干が剋す五行（財星）」などを
    // ベースにしつつ、各日干につき1つの固定ラッキーアバターを紐づける簡易実装とします。
    const GUARDIAN_MAP = {
        '甲': { emoji: '💧', name: '恵みの玄武', desc: 'あなた（大樹）を育む純粋な水の気。', action: '今日は水辺を散歩するか、お気に入りのミネラルウォーターをゆっくり飲んで心身を浄化しましょう。' },
        '乙': { emoji: '☀️', name: '陽光の朱雀', desc: 'あなた（草花）を美しく咲かせる太陽の気。', action: '朝日を全身に浴びて深呼吸を。明るい色の服や小物を身につけると直感が冴え渡ります。' },
        '丙': { emoji: '🌲', name: '大樹の青龍', desc: 'あなた（太陽）の炎を絶やさず燃やし続ける木の気。', action: '森林浴や植物の手入れが吉。新しい知識を「吸収」することで、あなたの輝きがさらに増します。' },
        '丁': { emoji: '🪵', name: '薪火の青龍', desc: 'あなた（灯火）の情熱を静かに支え続ける木の気。', action: '読書や伝統的な文化に触れる時間を。静かな環境でインプットすることが最高のエネルギー源になります。' },
        '戊': { emoji: '🔥', name: '猛火の朱雀', desc: 'あなた（山岳）に豊かな生命力を与える火の気。', action: '熱中できる趣味やスポーツで汗を流しましょう。情熱的に行動することが岩盤を打ち砕く力になります。' },
        '己': { emoji: '☀️', name: '陽だまりの朱雀', desc: 'あなた（大地）を乾かし温める太陽の気。', action: '今日は笑顔を絶やさず、周囲を明るく照らす意識を。温かい料理を誰かと一緒に食べるのが大吉です。' },
        '庚': { emoji: '⛰️', name: '堅牢の黄龍', desc: 'あなた（鉄・剣）を生み出し磨き上げる土の気。', action: '足元を固める日。神社仏閣の参拝や、古い伝統に触れることで、あなたの信念がより強固に研ぎ澄まされます。' },
        '辛': { emoji: '🌊', name: '清流の玄武', desc: 'あなた（宝石）を洗い清め、さらに輝かせる水の気。', action: '表現力を解放する日。日記を書いたり、誰かに素直な気持ちを伝えることで、あなたの魅力が周囲を魅了します。' },
        '壬': { emoji: '⚔️', name: '鋼鉄の白虎', desc: 'あなた（大河）の水源となり、豊かな流れを作る金の気。', action: '決断を下す日。「やらないといけないこと」をスパッと片付けると、濁流が澄んだ水へと変わります。' },
        '癸': { emoji: '💎', name: '輝石の白虎', desc: 'あなた（雨露）を透き通るような純粋さに導く金の気。', action: '高い理想や美学に触れる日。美術館に行ったり、ワンランク上の上質なアイテムに触れると運気が急上昇します。' }
    };

    const guardian = GUARDIAN_MAP[dayTenkan];
    if (!guardian) return;

    // UIの更新
    document.getElementById('guardian-icon').textContent = guardian.emoji;
    document.getElementById('guardian-desc').innerHTML = `あなたの本質である「${dayTenkan}」を強力にサポートする<br><strong>${guardian.name}</strong> が降臨しました。<br><br>${guardian.desc}`;
    document.getElementById('guardian-action').textContent = guardian.action;

    // モーダルを開く前に、Three.js的に後ろでエフェクトを鳴らすなどあればここに追記
    // 今回はHTML/CSSベースのエフェクト（モーダル表示）
    document.getElementById('guardian-modal').classList.remove('hidden');
}

// クリックした特定日のアドバイス（通変星×十二運星）表示機能
function showDailyAdviceModal(dateStr, kanshiStr, tuhen, unsei) {
    const tuhenDaily = {
        '比肩': '自分の直感を信じて単独行動が吉となる日。周りに流されず自分のペースを守りましょう。',
        '劫財': '仲間との協力やライバルとの切磋琢磨がカギ。譲り合いの精神を持ちつつ、目標に向かって進んでください。',
        '食神': '美味しいものを食べたり、趣味を楽しんだりして心身をリラックスさせると運気が大きく上がります。無理は禁物。',
        '傷官': '感受性が鋭くなり直感が冴える日。クリエイティブな作業やセンスを活かす場面に最適ですが、言葉がキツくならないよう注意。',
        '偏財': '人との交流が活発になる日。サービス精神を発揮することで、思わぬチャンスや人脈、豊かさが舞い込みます。',
        '正財': '着地感があり、地道な作業や整理整頓に向く日。誠実な対応が評価され、大切な人との絆も深まります。',
        '偏官': '行動力と責任感が増すパワフルな日。難しい課題にもスピーディーに立ち向かえますが、頑張りすぎによる疲労に注意。',
        '正官': '社会的信用や評価が高まりやすい日。ルールやマナーを重んじ、丁寧な振る舞いを心がけると強力なサポートを得られます。',
        '偏印': '知的好奇心が刺激される日。自由な発想や新しいジャンルへの挑戦が吉。少し変わった視点が突破口になります。',
        '印綬': '落ち着いて深く学ぶのに適した日。本を読んだり、計画を練ったり、内省の時間を取ると良いインスピレーションが降ってきます。'
    };

    const unseiDaily = {
        '胎': '新しいアイデアの種が生まれる兆し。好奇心を持って色々と行動してみて。\n',
        '養': '周囲からのサポートを素直に受け取って。感謝の気持ちを忘れずに。\n',
        '長生': 'フレッシュな気持ちで新しいことを始めるのに最適。素直さが開運の鍵。\n',
        '沐浴': '少しロマンチックに、日常から離れた体験を楽しんで。直感に従うと良い流れに。\n',
        '冠帯': '表舞台に立つ華やかさを意識すると吉。自信を持って発言・行動しましょう。\n',
        '建禄': '着実に物事を進められる安定したエネルギー。計画通りにコツコツ進めるのがベスト。\n',
        '帝旺': '自信を持って主導権を握るべきパワフルな時。リーダーシップを発揮して。\n',
        '衰': '一歩引いて全体を見渡す余裕を持つと上手くいく。冷静な経験則が役立ちます。\n',
        '病': '直感やインスピレーションを大事に行動して。芸術的な活動にツキがあります。\n',
        '死': '一つの物事にストイックに打ち込むのが良い。集中力が極まる日です。\n',
        '墓': '古いものを大切にしたり、じっくり探求するのに向く。貯蓄や情報の見直しにも良い日。\n',
        '絶': '常識に囚われない自由なヒラメキを大切に。ピンチをチャンスに変える閃きがあります。\n'
    };

    const tMsg = tuhenDaily[tuhen] || '';
    const uMsg = unseiDaily[unsei] || '';

    const msg = `【 テーマ(通変星)からのアドバイス 】\n${tMsg}\n\n【 運勢(十二運星)からのアドバイス 】\n${uMsg}以上の２つの要素を意識して行動してみてください。`;

    document.getElementById('da-date-title').textContent = `${dateStr} のアクション`;
    document.getElementById('da-kanshi').textContent = kanshiStr;
    document.getElementById('da-tuhen').textContent = tuhen;
    document.getElementById('da-unsei').textContent = unsei;
    document.getElementById('da-message').textContent = msg;

    document.getElementById('daily-advice-modal').classList.remove('hidden');
}

// 仕事運勢扉クリック時のモーダル表示
function showWorkFortuneModal() {
    if (!window.currentMetaverseData) return;
    const { dayTenkan, dayChishi, yT, yC, mT, mC } = window.currentMetaverseData;

    // もしペアモードなどでyT等が無ければ非表示にするかアラート
    if (!yT || !mT) {
        alert("仕事面を見るには通常のトップページから本人の生年月日を入力してください。");
        return;
    }

    const dayTuhen = TUHEN_TABLE[dayTenkan][dayTenkan];
    const dayUnsei = UNSEI_TABLE[dayTenkan][dayChishi];
    const monthTuhen = TUHEN_TABLE[dayTenkan][mT];
    const monthUnsei = UNSEI_TABLE[dayTenkan][mC];
    const yearTuhen = TUHEN_TABLE[dayTenkan][yT];
    const yearUnsei = UNSEI_TABLE[dayTenkan][yC];

    const meishikiContainer = document.getElementById('wf-meishiki');
    meishikiContainer.innerHTML = `
        <div style="display: flex; justify-content: space-between; border-bottom: 1px dashed rgba(255,255,255,0.2); padding-bottom: 0.3rem;">
            <span>日柱 (本質・土台)</span> <strong>${dayTenkan}${dayChishi} / ${dayTuhen} / ${dayUnsei}</strong>
        </div>
        <div style="display: flex; justify-content: space-between; border-bottom: 1px dashed rgba(255,255,255,0.2); padding-bottom: 0.3rem;">
            <span>月柱 (仕事・社会)</span> <strong>${mT}${mC} / ${monthTuhen} / ${monthUnsei}</strong>
        </div>
        <div style="display: flex; justify-content: space-between;">
            <span>年柱 (第一印象・若年)</span> <strong>${yT}${yC} / ${yearTuhen} / ${yearUnsei}</strong>
        </div>
    `;

    // 簡易的なアドバイス生成ロジック
    const tuhenWorkInfo = {
        '比肩': 'マイペースにコツコツと実績を積み上げる「職人肌・専門家スタイル」が最強です。人にペースを乱されず、独立心を持って自身の専門性を磨ける環境で最も能力を発揮します。',
        '劫財': '集団の中でリーダーシップやプロデュース能力を発揮する星です。大きな目標を掲げ、仲間と一緒にダイナミックな成果を追い求める環境で大活躍します。',
        '食神': 'リラックスした環境でおおらかに才能を発揮するクリエイタータイプ。衣食住や表現に関わる仕事、または人に楽しみを提供する仕事で自然と豊かさを引き寄せます。',
        '傷官': '非常に鋭い感性と美意識を持つスペシャリストです。IT、技術、デザイン、芸術など、高い専門スキルや直感が求められるシャープな現場で圧倒的な成果を出します。',
        '偏財': '人脈作りが非常に上手なビジネスパーソン。営業やサービス業など、人と関わりネットワークを広げながらお金やモノを動かしていく環境で才能が開花します。',
        '正財': 'お金と数字の管理能力が高く、非常に堅実で真面目な努力家です。金融、経理、または伝統的な手堅いビジネスなど、正確さが評価される環境で圧倒的な信頼を得ます。',
        '偏官': '行動力と決断力にあふれる切り込み隊長です。スピード感が求められる現場や、体を動かす仕事、困難を乗り越えてスピーディーに結果を出す環境で大いに輝きます。',
        '正官': '責任感が強く格式を重んじる優等生タイプ。公務員や大企業など、ルールや評価基準が明確な環境に身を置くことで、順調に昇進し高い社会的地位を築きます。',
        '偏印': '知的好奇心が旺盛で、常識に囚われないアイデアマンです。企画やIT、または海外など未知の分野を開拓する仕事、変化の多い自由な環境で才能を活かせます。',
        '印綬': '落ち着いて深く学ぶ精神性を持つ学者・先生タイプです。教育、研究開発、伝統文化など、培った高い知性と専門知識を人に教え導く分野が天職です。'
    };

    const unseiWorkInfo = {
        '胎': '様々なことに興味を持つ多芸多才なエネルギーを持っています。新規事業の立ち上げなど、ゼロからイチを生み出す場面が得意です。',
        '養': '周囲の目上から引き立てられやすい愛されキャラです。人をサポートし、サポートされるような温かい人間関係の中で成長します。',
        '長生': '素直で順応性が高く、組織の中で着実に成長できる星です。人から教えを乞い、それを吸収する能力が非常に高いです。',
        '沐浴': '自由とロマンを求める芸術家肌のエネルギーです。単調な作業よりも、変化や刺激のある環境で思いがけないヒットを生み出します。',
        '冠帯': '華やかで社交的、表舞台で活躍することを好むエネルギーです。人前に出る仕事や、自分自身をアピールする場所で輝きます。',
        '建禄': '堅実で安定感抜群、実力で着実に地位を築く最強のビジネス星です。一歩一歩の努力が高い確率で大きな成功に結びつきます。',
        '帝旺': 'トップに立つカリスマ性を持つ星です。起業や独立に向いており、強いエネルギーで周囲をぐいぐい引っ張っていく力があります。',
        '衰': '長年の経験則から的確なアドバイスができる参謀役の星です。最前線で戦うより、一歩引いて全体を見渡し戦略を練るポジションが適任です。',
        '病': 'イマジネーション豊かで、企画やクリエイティブに強い星です。直感力が鋭く、芸術的・精神的な分野で素晴らしい作品やアイデアを残します。',
        '死': '一つのことを極めるストイックな探求心の星です。職人のように技を磨いたり、特殊な分野でだれにも真似できない境地に達します。',
        '墓': 'コレクター気質で、研究やデータの蓄積に並外れた才能を持つ星です。長期的なプロジェクトで粘り強く一つのテーマに取り組むのが得意です。',
        '絶': '天才的なヒラメキを持ち、常識を覆す成果を上げる星です。ピンチをチャンスに変える閃きがあり、土壇場での突破力が群を抜いています。'
    };

    const style1 = tuhenWorkInfo[monthTuhen] || tuhenWorkInfo[dayTuhen];
    const style2 = unseiWorkInfo[monthUnsei] || unseiWorkInfo[dayUnsei];

    const adviceMsg = `あなたの日干「${dayTenkan}」と、命式全体のバランスから導き出した仕事のスタイルです。\n\n${style1}\n\nまた、あなたが無意識に発揮しているエネルギーとして、${style2}\n\n★アクションプラン：\nすぐに結果が出なくても焦らず、あなたの本質にあった環境（上記のような場）を選ぶことが大成功への近道です。持てる能力を自分らしく表現して、あなたにしかできないポジションを築き上げてください。`;

    document.getElementById('wf-advice').textContent = adviceMsg;
    document.getElementById('work-fortune-modal').classList.remove('hidden');
}

// プライベート扉クリック時のモーダル表示
function showPrivateFortuneModal() {
    if (!window.currentMetaverseData) return;
    const { dayTenkan, dayChishi, yT, yC, mT, mC } = window.currentMetaverseData;

    if (!yT || !mT) {
        alert("プライベート面を見るには通常のトップページから本人の生年月日を入力してください。");
        return;
    }

    const dayTuhen = TUHEN_TABLE[dayTenkan][dayTenkan];
    const dayUnsei = UNSEI_TABLE[dayTenkan][dayChishi];
    const monthTuhen = TUHEN_TABLE[dayTenkan][mT];
    const monthUnsei = UNSEI_TABLE[dayTenkan][mC];
    const yearTuhen = TUHEN_TABLE[dayTenkan][yT];
    const yearUnsei = UNSEI_TABLE[dayTenkan][yC];

    const meishikiContainer = document.getElementById('pf-meishiki');
    meishikiContainer.innerHTML = `
        <div style="display: flex; justify-content: space-between; border-bottom: 1px dashed rgba(255,255,255,0.2); padding-bottom: 0.3rem;">
            <span style="color:#f472b6;">日柱 (家族・配偶者・晩年)</span> <strong>${dayTenkan}${dayChishi} / ${dayTuhen} / ${dayUnsei}</strong>
        </div>
        <div style="display: flex; justify-content: space-between; border-bottom: 1px dashed rgba(255,255,255,0.2); padding-bottom: 0.3rem;">
            <span>月柱 (自分自身・中年)</span> <strong>${mT}${mC} / ${monthTuhen} / ${monthUnsei}</strong>
        </div>
        <div style="display: flex; justify-content: space-between;">
            <span>年柱 (親・先祖・初年)</span> <strong>${yT}${yC} / ${yearTuhen} / ${yearUnsei}</strong>
        </div>
    `;

    // プライベート用のアドバイス生成ロジック
    // 日柱（身内・配偶者・素の自分）と月柱（心の内側）を中心に判定
    const tuhenPrivateInfo = {
        '比肩': 'プライベートでは「自分の時間と空間」が何より大切です。干渉されるのを嫌うため、一人で過ごす趣味の時間を持つことで心のバランスが整います。',
        '劫財': '身内や気を許した仲間との時間を大切にします。外では協調性を見せますが、心を許した相手にはワガママになったり、本音をぶつけ合う熱い関係を望みます。',
        '食神': '美味しい食事、のんびりとしたおしゃべり、趣味を楽しむことが最高のストレス発散になります。家庭内でも明るく楽しいムードを好む平和主義者です。',
        '傷官': '感受性が強いため、外の刺激で疲れやすく、プライベートでは静かで美しい環境を求めます。美意識の合うパートナーや、一人で芸術に触れる時間が必要です。',
        '偏財': 'プライベートでも人付き合いが多く、家にじっとしているより外に出かけてワイワイ楽しむことでリフレッシュします。多趣味で話題も豊富です。',
        '正財': '家庭をとても大切にするマイホーム型です。派手な遊びよりも、家族との団らんや、お金を貯めること、家をきれいに整えることに心の平穏を感じます。',
        '偏官': '休むことが苦手で、休みの日でも体を動かしたり、アクティブに予定を詰め込む傾向があります。スポーツやアウトドアが最高の気分転換になります。',
        '正官': 'プライベートでも羽目を外しすぎず、きちんとした生活リズムや礼儀を重んじます。尊敬できるパートナーやルールのある整った家庭環境で安心感を得ます。',
        '偏印': 'マンネリを嫌い、常に新しい刺激や知識を求めます。休日はふらっと一人旅に出たり、マニアックな趣味に没頭することでエネルギーをチャージします。',
        '印綬': 'インドア派で、本を読んだり学んだりする静かな時間を愛します。パートナーとは精神的に深く共鳴できること、知的な会話ができることを重視します。'
    };

    const unseiPrivateInfo = {
        '胎': '好奇心旺盛で、色々なことに手を出したい気持ちがあります。気分が変わりやすい面もあるので、無理に一つに縛られず自由な時間を楽しんで。',
        '養': '愛されたい、守られたいという気持ちが強く、スキンシップや優しい言葉かけを必要とします。ペットを飼うことでも心が満たされます。',
        '長生': '素直で穏やかな心の持ち主ですが、周囲の環境に影響を受けやすい面も。プライベートでは本当に安心できる人とだけ一緒にいることが大切です。',
        '沐浴': '束縛を嫌い、常に新鮮なロマンを求めています。恋多き傾向があったり、海外や非日常の空間へ小旅行に出かけることで心がリフレッシュします。',
        '冠帯': '華やかで楽しいことが大好きです。休日は少しおしゃれをして話題のスポットに出かけたり、友人と華やかに過ごすことでエネルギーが高まります。',
        '建禄': '非常にマイペースで安定を好みます。ルーティンワークをこなし、計画的に休日を過ごすことで「今日も一日有意義だった」と安心感を得ます。',
        '帝旺': '家庭内でも主導権を握りたがる傾向があります。ワガママになりすぎないよう注意が必要ですが、持ち前のパワーで家族を力強く引っ張っていく頼もしい存在です。',
        '衰': 'ワイワイ騒ぐよりも、落ち着いた環境でのんびり過ごすことを好みます。神社仏閣巡りや、古き良きものに触れることで心が深く癒やされます。',
        '病': '非常にデリケートで気疲れしやすい面があります。音楽を聴いたり、映画を見たり、空想の世界に浸る時間が何よりの薬になります。',
        '死': '霊感や第六感が強く、精神世界への興味が深まりやすいです。一人の時間を確保し、坐禅や瞑想、オカルトなど趣味の世界に深く潜り込むことで充実します。',
        '墓': '物を集めることや、貯金が大好きです。不用品を整理したり、コレクションを眺める時間、またはご先祖様のお墓参りに行くことで心が整います。',
        '絶': '気分の波が非常に激しく、昨日と今日で言うことが変わることも。縛られると逃げたくなるので、気の向くままにふらっと行動できる環境が必要です。'
    };

    const style1 = tuhenPrivateInfo[dayTuhen]; // 日柱はもろにプライベート・配偶者
    const style2 = unseiPrivateInfo[dayUnsei];

    const adviceMsg = `あなたの日柱（素の自分・家庭）を中心としたプライベートでの心の傾向です。\n\n${style1}\n\nまた、休息時や気を抜いた時に見せるあなたの顔として、\n${style2}\n\n★アドバイス：\n仕事の顔とは違う、あなたの「素」の顔です。外で頑張りすぎると、家庭でこの傾向が極端に出やすくなります。無理をして相手に合わせるより、まずは自分が一番心地よいと思える空間と時間を確保し、心身をゆるめてあげてください。`;

    document.getElementById('pf-advice').textContent = adviceMsg;
    document.getElementById('private-fortune-modal').classList.remove('hidden');
}

// 運勢カレンダー表示ロジック
function showCalendarModal() {
    if (!window.currentMetaverseData) return;
    const { dayTenkan, dayChishi, yT, yC, mT, mC, chushatsu } = window.currentMetaverseData;

    const container = document.getElementById('calendar-container');
    container.innerHTML = '';

    // 詳細エリアは初期非表示
    const detailArea = document.getElementById('calendar-detail-area');
    detailArea.classList.add('hidden');

    const now = new Date();
    // 3ヶ月分生成
    for (let mOffset = 0; mOffset < 3; mOffset++) {
        const targetDate = new Date(now.getFullYear(), now.getMonth() + mOffset, 1);
        const year = targetDate.getFullYear();
        const month = targetDate.getMonth() + 1;
        const daysInMonth = new Date(year, month, 0).getDate();
        const firstDayOfWeek = new Date(year, month - 1, 1).getDay(); // 0 is Sunday

        const monthBlock = document.createElement('div');
        monthBlock.className = 'calendar-month-block';

        const title = document.createElement('div');
        title.className = 'calendar-month-title';
        title.textContent = `${year}年 ${month}月`;
        monthBlock.appendChild(title);

        const grid = document.createElement('div');
        grid.className = 'calendar-grid';

        const weekdays = ['日', '月', '火', '水', '木', '金', '土'];
        weekdays.forEach(wd => {
            const h = document.createElement('div');
            h.className = 'calendar-day-header';
            h.textContent = wd;
            grid.appendChild(h);
        });

        // 空白セル
        for (let i = 0; i < firstDayOfWeek; i++) {
            const empty = document.createElement('div');
            empty.className = 'calendar-day-cell empty';
            grid.appendChild(empty);
        }

        // 日付セル
        for (let d = 1; d <= daysInMonth; d++) {
            const cellDate = new Date(year, month - 1, d);
            const { dayTenkan: cT, dayChishi: cC } = calculateDayKanshi(cellDate);
            const cellStr = `${cT}${cC}`;

            const cell = document.createElement('div');
            cell.className = 'calendar-day-cell';

            // 本日チェック
            if (cellDate.getFullYear() === now.getFullYear() &&
                cellDate.getMonth() === now.getMonth() &&
                cellDate.getDate() === now.getDate()) {
                cell.classList.add('today');
            }

            const dateDiv = document.createElement('div');
            dateDiv.className = 'cal-date';
            dateDiv.textContent = d;

            const kanshiDiv = document.createElement('div');
            kanshiDiv.className = 'cal-kanshi';
            kanshiDiv.textContent = cellStr;

            cell.appendChild(dateDiv);
            cell.appendChild(kanshiDiv);

            // 運勢判定（希望の光＆静寂の日）
            let details = [];

            // サイクルによる吉凶判定のための計算
            const pos = getCyclePositionFromChishi(cC, chushatsu, dayTenkan);
            const cycle = CYCLE_DATA[pos];

            // --- 希望の光（吉日）判定 ---
            // 1. 特異日フラグ（律音・宿命大半会）
            let isTokui = false;
            let tokuiName = '';
            let tokuiDesc = '';
            if (cT === dayTenkan && cC === dayChishi) {
                isTokui = true;
                tokuiName = '律音';
                tokuiDesc = '日柱と全く同じ干支が巡る60日に1度の超レアな大吉日。';
            } else if (cT === dayTenkan) {
                const isDaihankai = (
                    (dayChishi === '申' && (cC === '子' || cC === '辰')) ||
                    (dayChishi === '子' && (cC === '申' || cC === '辰')) ||
                    (dayChishi === '辰' && (cC === '申' || cC === '子')) ||
                    (dayChishi === '亥' && (cC === '卯' || cC === '未')) ||
                    (dayChishi === '卯' && (cC === '亥' || cC === '未')) ||
                    (dayChishi === '未' && (cC === '亥' || cC === '卯')) ||
                    (dayChishi === '寅' && (cC === '午' || cC === '戌')) ||
                    (dayChishi === '午' && (cC === '寅' || cC === '戌')) ||
                    (dayChishi === '戌' && (cC === '寅' || cC === '午')) ||
                    (dayChishi === '巳' && (cC === '酉' || cC === '丑')) ||
                    (dayChishi === '酉' && (cC === '巳' || cC === '丑')) ||
                    (dayChishi === '丑' && (cC === '巳' || cC === '酉'))
                );
                if (isDaihankai) {
                    isTokui = true;
                    tokuiName = '大半会';
                    tokuiDesc = '運気が大きく広がり、普段の何倍もの成果が出やすい最強の大吉日。';
                }
            }

            // 2. サイクル吉フラグ（青春[7], 飛躍[9], 絶好調[10]）
            let isLuckyCycle = false;
            if (pos === 7 || pos === 9 || pos === 10) {
                isLuckyCycle = true;
            }

            // 3. 納音フラグ
            let isNacchin = false;
            const tMap = { '甲': '庚', '乙': '辛', '丙': '壬', '丁': '癸', '戊': '甲', '己': '乙', '庚': '丙', '辛': '丁', '壬': '戊', '癸': '己' };
            const cMap = { '子': '午', '丑': '未', '寅': '申', '卯': '酉', '辰': '戌', '巳': '亥', '午': '子', '未': '丑', '申': '寅', '酉': '卯', '辰': '戌', '戌': '辰', '亥': '巳' };
            if (cT === tMap[dayTenkan] && cC === cMap[dayChishi]) {
                isNacchin = true;
            }

            // 4. サイクル注意フラグ（天中殺[0,1,2], 休息[6], 空転[8]）
            let isWarningCycle = false;
            if (pos === 0 || pos === 1 || pos === 2 || pos === 6 || pos === 8) {
                isWarningCycle = true;
            }

            // 5. サイクル通常フラグ（夜明け[3], 進化[4], 決意[5], 頂点[11]）
            let isNeutralCycle = false;
            if (pos === 3 || pos === 4 || pos === 5 || pos === 11) {
                isNeutralCycle = true;
            }

            // --- 重なり（特別日）の判定 ---
            if (isTokui && isLuckyCycle) {
                let superDesc = '';
                if (tokuiName === '律音') {
                    if (pos === 7) superDesc = '【再誕生×青春】これまでの努力が実を結び、全く新しい出会いや目標とめぐり逢う奇跡の日です。過去の延長ではない、新しい自分の直感を信じて一歩を踏み出しましょう！';
                    if (pos === 9) superDesc = '【再誕生×飛躍】新しく生まれ変わったあなたが、一気に大きく羽ばたく日です。これまで温めてきたアイデアや企画を世に出す、あるいは大きな契約をするのにこれ以上ない大吉日です。';
                    if (pos === 10) superDesc = '【再誕生×絶好調】60日に1度の再誕生の日と、運気のピークが重なる超特異日です。思い描いた夢を現実にするパワーが最大化しています。迷わず大きな勝負に出てください！';
                } else if (tokuiName === '大半会') {
                    if (pos === 7) superDesc = '【大拡大×青春】あなたの魅力や才能が、普段の何倍ものスケールで周囲に伝わり、最高の人脈や出会いを引き寄せる日。人が集まる場所へ積極的に出向きましょう！';
                    if (pos === 9) superDesc = '【大拡大×飛躍】これまでの頑張りが、想像を遥かに超えるスケールで結果に結びつく日です。自分の力だけでなく、周囲の協力も得て物事が加速度的に進む最強の日です！';
                    if (pos === 10) superDesc = '【大拡大×絶好調】運気の最高潮と、無限の広がりを持つ大半会が重なる激レア日。この日に始めたこと、決断したことは必ず大きな実りとなってあなたに返ってきます。迷いは不要です！';
                }
                details.push({ type: 'super-lucky', title: `[激レア] ${tokuiName}×${cycle.label}`, desc: superDesc });
            } else {
                if (isTokui) {
                    details.push({ type: 'lucky', title: `${tokuiName} (希望の光)`, desc: tokuiDesc + 'これまでの努力が実を結び、大きなスタートを切るのに最適な「再誕生」の日です。新しい挑戦、大きな買い物、契約などに最適です。' });
                }
                if (isLuckyCycle) {
                    let cycleDesc = '';
                    if (pos === 7) cycleDesc = '出会いや新しい目標が見つかる、エネルギッシュでワクワクする日です。フットワーク軽く行動しましょう。';
                    if (pos === 9) cycleDesc = 'これまでの頑張りが形になり、大きくステップアップできるチャンスの日です。積極的にアピールを。';
                    if (pos === 10) cycleDesc = '運気のピーク！追い風が吹く最高の一日です。やりたい事や勝負事は今日実行すると大吉。';
                    details.push({ type: 'lucky', title: `${cycle.label} (希望の光)`, desc: cycleDesc });
                }
            }

            if (isNacchin && isWarningCycle) {
                let superDesc = '';
                if (pos === 0 || pos === 1 || pos === 2) {
                    superDesc = '【白紙化×天中殺】物事が突然ストップしたり、予期せぬトラブルが起きやすい超警戒日。今日は重要な決断、契約、大きな買い物は絶対に避け、整理整頓や内省の時間にあててください。';
                } else if (pos === 6) {
                    superDesc = '【白紙化×休息】心身ともにエネルギーが極端に低下し、無理が一切きかない日。今日はスケジュールを極力減らし、家でゆっくりお風呂に浸かるなど、徹底的に自分を労ってください。';
                } else if (pos === 8) {
                    superDesc = '【白紙化×空転】良かれと思ってやったことが全て裏目に出る、すれ違いの多い日。自己主張は抑え、受け身に徹し、淡々と目の前のことだけをこなすのが正解です。';
                }
                details.push({ type: 'super-warning', title: `[特大注意] 納音×${cycle.label}`, desc: superDesc });
            } else {
                if (isNacchin) {
                    details.push({ type: 'warning', title: '納音 (静寂の日)', desc: '真逆のエネルギーがぶつかる日。予期せぬストップがかかりやすいので、予定を詰め込まず、物事を見直す再確認の日に。' });
                }
                if (isWarningCycle) {
                    let cycleDesc = '';
                    if (pos === 0 || pos === 1 || pos === 2) {
                        cycleDesc = 'エネルギーが不自然になる天中殺期間。新しい大きな決断は避け、身の回りの整理や学習・準備の時間にあてると良いでしょう。';
                        details.push({ type: 'caution', title: `⚠️要注意 (${cycle.label})`, desc: cycleDesc });
                    } else {
                        if (pos === 6) cycleDesc = 'バイオリズムの休息期。無理に動かず、美味しいものを食べたり、心身を癒すなどリラックスを心がけてください。';
                        if (pos === 8) cycleDesc = '思いが空回りしやすい日。良かれと思ったことが裏目に出やすいので、自己主張を控え、周囲に合わせる受け身の姿勢が吉です。';
                        details.push({ type: 'warning', title: `${cycle.label} (静寂の日)`, desc: cycleDesc });
                    }
                }
            }

            // --- 通常サイクル日の追加 ---
            // 納音や特異日と被っていても、別個の指標として追加する（干渉しないため）
            if (isNeutralCycle) {
                let cycleDesc = '';
                if (pos === 3) cycleDesc = '新しいスタートを切るのに良いタイミングです。これまでの準備を形にし始めましょう。';
                if (pos === 4) cycleDesc = 'これまでの行いが少しずつ成長・発展していく時期です。焦らず丁寧に取り組みましょう。';
                if (pos === 5) cycleDesc = '今後の方向性を決定づける重要な日です。自分の心に正直に、しっかりと意志を固めましょう。';
                if (pos === 11) cycleDesc = '一つの物事が完成し、結果が出る時期です。これまでの歩みを振り返り、次に備えましょう。';
                details.push({ type: 'neutral', title: `${cycle.label} (日常)`, desc: cycleDesc });
            }

            // マークの描画
            details.forEach(det => {
                const m = document.createElement('div');
                m.className = `cal-mark ${det.type}`;
                m.textContent = det.title.split(' ')[0]; // 短縮表記
                cell.appendChild(m);
            });

            // クリックイベント
            if (details.length > 0) {
                cell.addEventListener('click', () => {
                    const dTitle = document.getElementById('cal-detail-date');
                    const dContent = document.getElementById('cal-detail-content');
                    dTitle.textContent = `${year}年${month}月${d}日 (${cellStr})`;

                    dContent.innerHTML = '';
                    details.forEach(det => {
                        const icon = det.type === 'lucky' ? '✨' : '⚠️';
                        const color = det.type === 'lucky' ? '#fbbf24' : '#f472b6';
                        dContent.innerHTML += `
                            <div style="margin-bottom: 1rem;">
                                <strong style="color: ${color}; font-size: 1.1rem;">${icon} ${det.title}</strong>
                                <p style="margin-top: 0.3rem; opacity: 0.9;">${det.desc}</p>
                            </div>
                        `;
                    });
                    detailArea.classList.remove('hidden');

                    // スクロールして見やすくする
                    detailArea.scrollIntoView({ behavior: 'smooth' });
                });
            }

            grid.appendChild(cell);
        }

        monthBlock.appendChild(grid);
        container.appendChild(monthBlock);
    }

    document.getElementById('calendar-modal').classList.remove('hidden');
}
