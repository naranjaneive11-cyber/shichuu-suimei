/**
 * 美容師用 クイック接客カンペ & 開運ヘアカルテ ロジック（サロン本格CRMダッシュボード＆詳細カルテ完全対応版）
 */

// --- 四柱推命 基本データ ---
const TENKAN = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
const CHISHI = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
const SETSUIRI = [5, 4, 6, 5, 5, 6, 7, 7, 8, 8, 7, 7];

// 美容室特化：日干ごとの接客カンペ・ヘア提案・トーク・店販データ（女性向け / 男性向け 2系統完備）
const SALON_DATA = {
    '甲': {
        element: '木',
        elementName: '木（大樹）',
        colorBadge: '#10b981',
        icon: '🌲',
        female: {
            catchphrase: 'まっすぐ上を目指すリーダー・向上心の塊',
            praiseWords: ['「爽やかで芯のある雰囲気が素敵です！」', '「新しいチャレンジ、絶対似合います！」', '「立ち姿やオーラに存在感がありますね」'],
            serviceStyle: {
                attitude: '未来志向＆背中を押すポジティブ接客',
                tone: '細かすぎるルール説明より、「これからどう魅せたいか」のワクワクするビジョンを共有する。',
                doPoint: '意思決定を尊重し、「さすがのチョイスですね」と本人の直感を後押しする。',
                dontPoint: '子供扱いしたり、上から目線で意見を押し付けたりしないこと。'
            },
            hairAdvice: {
                colors: ['オリーブアッシュ', 'ミントグレージュ', 'フォレストカーキ', 'マット系ナチュラル'],
                texture: '軽やかでサラッとした自然な質感・風になびくエアリー感',
                styles: ['レイヤーを入れて動きを出したスタイル', '軽やかなくびれボブ', '外ハネミディアム', 'すっきりアップバング'],
                proposalTalk: '「最近新しいことを始めたい気分ではありませんか？オリーブ系の透明感カラーと軽やかなレイヤーで抜け感を出すと、気分も軽くなって良い運気の波に乗れますよ！」'
            },
            homeCare: {
                aroma: 'ヒノキ・フォレスト・ベルガモット（新緑の深呼吸アロマ）',
                product: 'スキャルプクリア＆ボタニカルシャンプー / エアリーボタニカルオイル',
                retailTalk: '「甲（大樹）の星を持つ方は、頭皮の巡りを良くして森林の香りをまとうと直感力がグンと上がります。こちらのボタニカルオイル、朝なじませるだけで風になびくサラサラ感が一日中続きますよ！」'
            },
            closingTalk: '「甲（きのえ）の星を持つ方は、春先や季節の変わり目にエネルギーが切り替わります。次回は〇月上旬頃、新しいスタートの前に毛先を整えにいらしてくださいね！」'
        },
        male: {
            catchphrase: '高い志と誠実さで人を惹きつける、爽やか頼れるリーダー',
            praiseWords: ['「清潔感と爽やかなリーダーシップが溢れてます！」', '「トップの立ち上がりと骨格のラインがすごく男前です」', '「決断力があって頼もしい雰囲気ですね！」'],
            serviceStyle: {
                attitude: '信頼感＆ビジョンを共有するスピード感ある接客',
                tone: '清潔感とデキる男感を意識し、ビジネスやプライベートでの好印象ポイントを提示。',
                doPoint: 'スタイリングの手間を省きつつ、誰から見ても爽やかなシルエットを提案。',
                dontPoint: '優柔不断な態度や、細かい注文を何度も確認しすぎるのは避ける。'
            },
            hairAdvice: {
                colors: ['オリーブアッシュ', 'スモーキーグレージュ', 'フォレストカーキ', 'ナチュラルブラック'],
                texture: 'トップの立ち上がりと清潔感ある束感・サイドのタイト感',
                styles: ['爽やかアップバングショート', '清潔感ある刈り上げフェードマッシュ', '束感スパイキーショート', '知的なセンターパート'],
                proposalTalk: '「大樹の星を持つ男性は、清潔感とおでこを出した爽やかさが仕事運直結です！サイドをすっきり締めてトップを立たせ、デキる男のシルエットに仕上げます。」'
            },
            homeCare: {
                aroma: 'シダーウッド・ユーカリ・ベルガモット（男の爽快森林アロマ）',
                product: '炭酸スカルプシャンプー / マットハードワックス＆育毛トニック',
                retailTalk: '「夕方の頭皮のベタつきや匂いを完全に防いでトップの立ち上がりをキープする炭酸スカルプです。これを使うだけで毎朝のワックスの決まり具合が段違いですよ！」'
            },
            closingTalk: '「大樹の星を持つ男性は、サイドや襟足の清潔感を保つことで運気が巡ります。約1ヶ月〜1ヶ月半後の〇月頃にメンテナンスしましょう！」'
        }
    },
    '乙': {
        element: '木',
        elementName: '木（草花）',
        colorBadge: '#059669',
        icon: '🌿',
        female: {
            catchphrase: '誰からも愛される調和としなやかさの持ち主',
            praiseWords: ['「親しみやすくて柔らかい雰囲気がとても素敵です！」', '「周りをパッと和ませる可愛らしさがありますね」'],
            serviceStyle: {
                attitude: '共感重視＆寄り添うフレンドリー接客',
                tone: '「分かります！」「それ可愛いですよね」と共感をベースに、お友達のような温かいトーン。',
                doPoint: '選択肢を2〜3個に絞って優しく一緒に選んであげる。',
                dontPoint: '冷たい態度や、一人で急な決断を迫るようなアプローチは不安にさせます。'
            },
            hairAdvice: {
                colors: ['ピスタチオベージュ', 'ライトオリーブ', 'シアーアッシュ', 'ソフトシナモン'],
                texture: '柔らかくふんわりした質感・思わず触れたくなるソフトタッチ',
                styles: ['ゆるふわウェーブ', '丸みのあるショートボブ', 'シースルーバング', '柔らかいハーフアップ'],
                proposalTalk: '「〇〇さんの持つ優しい親しみやすさを引き立てるために、今回は肌なじみの良いピスタチオベージュと、ふんわり柔らかなウェーブで仕上げましょう！」'
            },
            homeCare: {
                aroma: 'カモミール・ジャスミン・グリーンアップル（フローラルハーブ）',
                product: 'アミノ酸シルキーシャンプー / メルティホイップフォーム',
                retailTalk: '「乙（草花）の方は毛先の柔らかさと潤いが人間関係の良縁を呼び込みます。このホイップフォーム、もみこむだけでコテ巻きのふんわり感が簡単に再現できますよ。」'
            },
            closingTalk: '「乙（きのと）の方は、少し髪が重くなるとお気持ちもモヤモヤしやすい繊細さがあります。約1ヶ月半〜2ヶ月後の〇月頃に、ふんわり感を復活させに来てくださいね。」'
        },
        male: {
            catchphrase: '誰からも親しまれる柔らかさと、柔軟な適応力を持つ人気者',
            praiseWords: ['「柔らかい笑顔と親しみやすさで誰からも好かれますね！」「パーマの雰囲気が抜群におしゃれで優しげです」'],
            serviceStyle: {
                attitude: 'リラックス＆共感しながら一緒に似合わせを創る接客',
                tone: '話しやすい穏やかな空気感で、髪の悩みや好みを優しく引き出す。',
                doPoint: '手ぐしで簡単に再現できる柔らかいパーマやバーム提案が喜ばれます。',
                dontPoint: 'いかつすぎるスタイルや、カチカチに固めすぎる提案は好まれません。'
            },
            hairAdvice: {
                colors: ['ピスタチオベージュ', 'ミルクティーアッシュ', 'ソフトシナモンブラウン'],
                texture: 'ふんわり柔らかな空気感・ナチュラルな毛流れと束感',
                styles: ['ニュアンススパイラルパーマ', '韓流ナチュラルマッシュ', '柔らかい束感ショート', 'カルマヘア'],
                proposalTalk: '「草花の星を持つ男性は、親しみやすい柔らかさが最大の武器です。ゆるめのニュアンスパーマで朝揉み込むだけで決まる愛されヘアにしましょう！」'
            },
            homeCare: {
                aroma: 'カモミール・ベルガモット・ホワイトティー（心ほどける癒やしアロマ）',
                product: 'アミノ酸保湿スカルプシャンプー / ナチュラルヘアバーム＆ソフトワックス',
                retailTalk: '「このナチュラルバーム、固めすぎずに手ぐしを通すだけで今風のふんわり束感が出せます。ハンドクリームにもなるので朝忙しい時も手洗い不要で最高ですよ。」'
            },
            closingTalk: '「草花の星を持つ男性は、毛先が重くなると清潔感が落ちやすいので、〇月頃にパーマのメンテナンスにいらしてくださいね！」'
        }
    },
    '丙': {
        element: '火',
        elementName: '火（太陽）',
        colorBadge: '#f59e0b',
        icon: '☀️',
        female: {
            catchphrase: '周囲を明るく照らす圧倒的カリスマ・主役タイプ',
            praiseWords: ['「すごく華やかでパッと目を引きます！」', '「いつも明るいオーラがあって元気をいただけます」', '「本当にお似合いで最高に可愛いです！」'],
            serviceStyle: {
                attitude: '全力で褒める＆トレンド提案を楽しむ接客',
                tone: 'テンションを少し高めに、仕上がりの鏡を見せたときは惜しみなく「素敵です！」と伝える。',
                doPoint: '「今季一番人気」「インスタでも話題」などの旬のトレンド提案が刺さります。',
                dontPoint: '地味すぎる提案や、過度に落ち着かせようとするとテンションが下がります。'
            },
            hairAdvice: {
                colors: ['チェリーピンク', 'カシスレッド', 'アプリコットオレンジ', '艶やかウォームブラウン'],
                texture: 'ツヤ感MAXのオイル仕上げ・光を反射するリッチな輝き',
                styles: ['韓国風大ぶりヨシンモリ巻き', '華やかロングウェーブ', 'かきあげバング', 'コントラストハイライト'],
                proposalTalk: '「今はご自身の魅力を前面に出して主役になれるタイミングです！暖色系のリッチなツヤカラーで、お顔の血色感と華やかオーラを最大まで引き出しましょう！」'
            },
            homeCare: {
                aroma: 'ダマスクローズ・スイートオレンジ・イランイラン（太陽の華やかアロマ）',
                product: 'カラーキープシャンプー / ハイシャインプレミアムグロスオイル',
                retailTalk: '「丙（太陽）の方は髪のツヤがそのまま運気とオーラの輝きになります！このグロスオイル、光を反射してサロン帰りのツヤが一日中キープできるので本当にイチオシです！」'
            },
            closingTalk: '「丙（ひのえ）の方は太陽のエネルギーなので、常にツヤと輝きを保つのが開運の秘訣です！色が抜けきる前の〇月頃にツヤチャージにいらしてくださいね。」'
        },
        male: {
            catchphrase: 'その場にいるだけで周りを明るくする、圧倒的華やかオーラの主役',
            praiseWords: ['「太陽のような明るさと華やかな存在感がありますね！」「ツヤ感のあるセットが抜群に似合って色気があります」'],
            serviceStyle: {
                attitude: 'テンション高めに男らしさと色気を引き立てる接客',
                tone: '自信を深めてもらえるよう「これ絶対モテます！」「めちゃくちゃカッコいいです」と太鼓判を押す。',
                doPoint: '流行りの波巻きパーマやツヤ系ポマードなど、トレンド感ある提案をする。',
                dontPoint: '無難すぎて地味な普通のショートにまとめると満足度が下がります。'
            },
            hairAdvice: {
                colors: ['アプリコットブラウン', 'ウォームブラウン', 'チェリーアンバー', 'コントラストハイライト'],
                texture: '光を反射するウェットなツヤ感・躍動感ある立体的な毛束',
                styles: ['ツヤ感かきあげセンターパート', '波巻きスパイラルパーマ', '立体ハイライトショート', 'グランジマッシュ'],
                proposalTalk: '「太陽の星を持つ男性は、ツヤと躍動感がカリスマオーラを生みます！波巻きパーマとツヤ系ポマードで、圧倒的な存在感を演出しましょう。」'
            },
            homeCare: {
                aroma: 'スイートオレンジ・サンダルウッド・ブラックペッパー（情熱のスパイシーアロマ）',
                product: 'カラーキープスカルプシャンプー / 水性プレミアムポマード',
                retailTalk: '「このポマード、ギラつかない上品なウェットツヤが一日中キープできて、お湯で簡単に洗い流せます。太陽タイプの男性の色気を最大に引き出せますよ！」'
            },
            closingTalk: '「太陽の星を持つ男性は、ツヤが落ちる前の〇月頃にパーマやカラーのメンテナンスをすると、常に最高の運気をキープできます！」'
        }
    },
    '丁': {
        element: '火',
        elementName: '火（灯火）',
        colorBadge: '#dc2626',
        icon: '🕯️',
        female: {
            catchphrase: '心に熱い情熱を秘めた、美意識の高いスペシャリスト',
            praiseWords: ['「とても上品で、どこか大人の色気とセンスを感じます」', '「細かいところまで美意識が行き届いていて素敵です」'],
            serviceStyle: {
                attitude: '丁寧・細やかな気配り＆センスを認める接客',
                tone: '静かで落ち着いたトーンの中に、熱意とこだわりを込めて話す。',
                doPoint: '「お客様のこの目の色／肌色に一番映える調合にしました」とプロのこだわりを明かす。',
                dontPoint: 'ガサツな道具の扱い、騒がしすぎるノリは苦手です。'
            },
            hairAdvice: {
                colors: ['ワインレッド', 'バーガンディ', 'ディープローズ', 'ココアブラウン'],
                texture: 'しっとりとした深みのあるツヤ・上品なまとまり感',
                styles: ['上品なタイトストレート', '毛先ワンカールボブ', '色気のある長め前髪', 'くびれセミディ'],
                proposalTalk: '「丁（ひのと）の持つミステリアスで上品な魅力を引き出すために、深みのあるワインレッドのツヤをブレンドしました。光に当たったときのニュアンスが絶妙ですよ。」'
            },
            homeCare: {
                aroma: 'フランキンセンス・ゼラニウム・アンバー（静寂と品格のアロマ）',
                product: '濃密ダメージリペアトリートメント / シルキーエッセンスセラム',
                retailTalk: '「丁（灯火）の方は夜のリラックスタイムが美の源泉です。このナイトセラムを毛先になじませて乾かすと、翌朝のまとまりとしっとり感が全然違いますよ。」'
            },
            closingTalk: '「丁（ひのと）の方は直感とインスピレーションが鋭い時期です。次の運気の節目である〇月頃、ぜひ髪と心を整えにリフレッシュにいらしてください！」'
        },
        male: {
            catchphrase: '静かな色気と鋭い美意識を宿す、こだわり派のプロフェッショナル',
            praiseWords: ['「大人の色気と洗練されたセンスが際立っています」「襟足やラインの整い方がとても美しいです」'],
            serviceStyle: {
                attitude: '落ち着いたトーン＆技術のこだわりを丁寧に解説する接客',
                tone: '騒がしくせず、静かに確かな技術とディテールの美しさを共有。',
                doPoint: 'ミリ単位の毛流れや、刈り上げのグラデーションの綺麗さをしっかり見せる。',
                dontPoint: '雑なブローや、大雑把なカットは即座に見抜かれます。'
            },
            hairAdvice: {
                colors: ['ワインブラウン', 'バーガンディブラック', 'ディープココア'],
                texture: 'しっとり落ち着いた大人のツヤ感・ミリ単位で整った毛流れ',
                styles: ['シャープなタイトセンターパート', '毛流れニュアンスコンマヘア', 'フェザーマッシュ', 'ウルフショート'],
                proposalTalk: '「灯火の星を持つ男性は、大人の色気と美しい毛流れが魅力です。タイトなコンマヘアで知性とミステリアスな色気を両立させましょう。」'
            },
            homeCare: {
                aroma: 'フランキンセンス・アンバー・ゼラニウム（静寂と大人の品格アロマ）',
                product: '濃密スカルプリペアシャンプー / シルキーヘアミルク＆ライトグリース',
                retailTalk: '「パサつきを完全に抑えて知的なまとまりをキープするヘアミルクです。夜ドライヤー前につけると朝のセットが格段に楽になりますよ。」'
            },
            closingTalk: '「灯火タイプの男性は、ラインの美しさを保つことが開運の鍵です。〇月頃に襟足と毛流れを整えにいらしてください。」'
        }
    },
    '戊': {
        element: '土',
        elementName: '土（山岳）',
        colorBadge: '#d97706',
        icon: '⛰️',
        female: {
            catchphrase: 'どっしり構える包容力・圧倒的な信頼感と器の大きさ',
            praiseWords: ['「落ち着きと安心感があって、とても頼りがいを感じます」', '「上品で大人の余裕が漂っていますね」'],
            serviceStyle: {
                attitude: '安心感・信頼感＆実用性をしっかり伝える接客',
                tone: '丁寧で礼儀正しく、どっしりとした落ち着いた態度で接する。',
                doPoint: '「お手入れが長持ちするカット」「頭皮に負担の少ない薬剤」など実用性・安心感を伝える。',
                dontPoint: '奇抜すぎる提案や、コロコロ意見を変える接客は不信感に繋がります。'
            },
            hairAdvice: {
                colors: ['ショコラブラウン', 'マロンベージュ', 'リッチモカ', 'アースブラウン'],
                texture: 'しっとり重厚感のあるまとまり・上質で落ち着いたツヤ',
                styles: ['重ためロングレイヤー', 'まとまり重視の上品ボブ', 'クラシックなセンターパート'],
                proposalTalk: '「基盤をしっかり整えて安定した魅力を引き出すために、深みと落ち着きのあるショコラブラウンで、上品で長持ちするシルエットに整えましょう！」'
            },
            homeCare: {
                aroma: 'サンダルウッド（白檀）・シダーウッド・パチュリ（大地と繋がる安心の香り）',
                product: '高密着アミノクレンジングシャンプー / オーガニックシアバターバーム',
                retailTalk: '「戊（山岳）の方は髪の土台（頭皮と毛先）を安定させると運気が定着します。このシアバターバームは乾燥を防いで夕方まで崩れずしっかりまとまりますよ。」'
            },
            closingTalk: '「戊（つちのえ）の方は、周期を決めて定期的にメンテナンスすることで運気が最も安定します。2ヶ月後の〇月〇日頃にお席を確保しておきましょうか？」'
        },
        male: {
            catchphrase: 'どっしり構える圧倒的安心感・頼れる大黒柱',
            praiseWords: ['「どっしりとした包容力と男らしい頼もしさを感じます！」「骨格とクラシックなショートが完璧に似合ってます」'],
            serviceStyle: {
                attitude: '礼儀正しく誠実＆ブレない安定感を提供する接客',
                tone: '奇をてらわず、王道で清潔感あるスタイルを自信を持って提案。',
                doPoint: '長持ちするカット周期や、崩れないホールド力の理由をしっかり説明する。',
                dontPoint: '軽薄なノリや、流行り廃りの激しすぎる奇抜な髪型はNG。'
            },
            hairAdvice: {
                colors: ['ショコラダークブラウン', 'アースブラック', 'リッチモカ'],
                texture: '重厚感のあるクラシックなまとまり・崩れないホールド感',
                styles: ['クラシックバーバーフェード', '男前ベリーショート', '王道アップバングショート', 'トラッドショート'],
                proposalTalk: '「山岳の星を持つ男性は、ブレない清潔感とクラシックな男らしさが金運・仕事運を呼びます。バーバースタイルでビシッと整えましょう！」'
            },
            homeCare: {
                aroma: 'サンダルウッド（白檀）・シダーウッド（大地と繋がる風格アロマ）',
                product: '育毛クレンジングスカルプシャンプー / クラシックハードポマード',
                retailTalk: '「一日中絶対に崩れず男らしいツヤとホールドをキープするポマードです。商談や大事なビジネスの勝負時に絶大な信頼感を生みますよ！」'
            },
            closingTalk: '「山岳タイプの男性は、定期的な周期で整えることで運気が安定します。〇月頃に整えていきましょう！」'
        }
    },
    '己': {
        element: '土',
        elementName: '土（田園）',
        colorBadge: '#b45309',
        icon: '🌱',
        female: {
            catchphrase: '多才で愛情深い育成上手・親しみやすさNo.1',
            praiseWords: ['「いつも細やかな気遣いをされていて本当に優しいですね」', '「多趣味で知識が豊富で、お話がとても楽しいです！」'],
            serviceStyle: {
                attitude: 'アットホーム＆家族や周囲のお話に寄り添う接客',
                tone: '温かみのある家庭的・親しみやすい会話。',
                doPoint: '「ご自宅での再現方法」「朝3分でできる簡単スタイリング」を丁寧に伝授する。',
                dontPoint: '難しい専門用語ばかり並べたり、冷たい対応をしたりしないこと。'
            },
            hairAdvice: {
                colors: ['ミルクティーベージュ', 'キャラメルラテ', 'ウォームベージュ', 'ハニーブラウン'],
                texture: 'ふんわり温もりを感じる質感・柔らかい束感',
                styles: ['ナチュラルなひし形ショート', '扱いやすいミディアムボブ', '毛先パーマスタイル'],
                proposalTalk: '「己（つちのと）さんの優しい包容力を引き立てるミルクティーベージュで、朝のセットがアイロン1つで簡単に決まるようにカットしておきました！」'
            },
            homeCare: {
                aroma: 'バニラ・スイートマジョラム・マンダリン（温もりと優しさのアロマ）',
                product: 'モイスチャーハニーシャンプー / モイストミルククリーム',
                retailTalk: '「いつもお忙しい己さんにぴったりなのが、この時短モイストミルクです。朝サッと毛先になじませるだけで柔らかくまとまり、優しい甘い香りに癒やされますよ。」'
            },
            closingTalk: '「いつも周りのために頑張っていらっしゃる己さんだからこそ、〇月頃はご自身へのご褒美にヘッドスパ付きでゆっくりリラックスしにいらしてくださいね。」'
        },
        male: {
            catchphrase: '細やかな気配りと温かい親しみやすさ・安心感抜群の好青年',
            praiseWords: ['「優しくて清潔感のある雰囲気が本当に好印象です！」「爽やかで誰からも信頼されるスタイルですね」'],
            serviceStyle: {
                attitude: 'アットホーム＆日々のスタイリングの悩みに親身に答える接客',
                tone: '親近感のある温かいトーンで、朝の簡単セット方法を丁寧にレクチャー。',
                doPoint: '「朝起きてワックスを揉み込むだけで3分で決まる」実用性をアピール。',
                dontPoint: '難しすぎるアイロンセットなどを強いると挫折させてしまいます。'
            },
            hairAdvice: {
                colors: ['ミルクティーベージュ', 'キャラメルブラウン', 'ウォームブラウン'],
                texture: 'ナチュラルで温かみのあるふんわり質感・手ぐしで決まる扱いやすさ',
                styles: ['好印象ナチュラルショート', '無造作マッシュパーマ', '耳周りスッキリ爽やかヘア', '柔らかシャドウパーマ'],
                proposalTalk: '「田園の星を持つ男性は、好感度抜群のナチュラルな清潔感が武器です。朝3分で決まる柔らかパーマで好印象を極めましょう！」'
            },
            homeCare: {
                aroma: 'マンダリン・スイートマジョラム・バニラ（温もりと安心感のアロマ）',
                product: 'モイスチャースカルプシャンプー / ファイバーワックス＆ナチュラルバーム',
                retailTalk: '「手ぐしでササッとなじませるだけでサロン帰りのふんわり感が再現できるファイバーワックスです。忙しい朝の救世主になりますよ！」'
            },
            closingTalk: '「田園タイプの男性は、周りのために頑張りすぎがちです。〇月頃はご自身のリフレッシュを兼ねてヘッドスパにいらしてくださいね。」'
        }
    },
    '庚': {
        element: '金',
        elementName: '金（鋼鉄・剣）',
        colorBadge: '#64748b',
        icon: '⚔️',
        female: {
            catchphrase: '決断力と行動力で道を切り拓く、ストイックな開拓者',
            praiseWords: ['「カットラインが綺麗に出て、本当にかっこよく洗練されています！」', '「決断力があって凛とした美しさがありますね」'],
            serviceStyle: {
                attitude: 'スピーディー＆技術のこだわりをロジカルに伝える接客',
                tone: 'テキパキと無駄のない動作。結論から端的に伝える。',
                doPoint: '「骨格に合わせて1mm単位でこだわりました」「この角度が一番綺麗です」と技術の理由を説明する。',
                dontPoint: 'ダラダラ待たせたり、優柔不断な態度を見せたりするとイライラさせます。'
            },
            hairAdvice: {
                colors: ['プラチナシルバー', 'アイスグレージュ', 'メタリックアッシュ', 'シャープなハイライト'],
                texture: 'エッジの効いた束感・サラサラの直毛感・研ぎ澄まされたクリア感',
                styles: ['切りっぱなしボブ', 'ハンサムショート', 'シャープな前下がりボブ', 'タイトなストレートヘア'],
                proposalTalk: '「スパッと決断したいことや、直感を研ぎ澄ませたい時期ですね！透き通るようなアイスグレージュとシャープなカットラインで、都会的で洗練された印象に仕上げます。」'
            },
            homeCare: {
                aroma: 'ユーカリ・ペパーミント・ジュニパーベリー（頭脳を研ぎ澄ますアロマ）',
                product: 'ストレートキープシャンプー / エッジポリッシュオイル',
                retailTalk: '「庚（剣）の方は毛先をシャープに整えると決断力と仕事運がアップします。このエッジオイル、束感とライン感がプロ級にピタッと決まるのでおすすめです！」'
            },
            closingTalk: '「庚（かのえ）の方は刃物と同じで、定期的に研ぎ澄ます（毛先を揃える）ことで運気が上がります。切れ味が落ちる前の〇月頃にメンテナンスしましょう！」'
        },
        male: {
            catchphrase: '決断力とスピードで道を切り拓く、ストイックな勝負師',
            praiseWords: ['「シャープなラインが際立って、めちゃくちゃ仕事ができそうな雰囲気です！」「エッジの効いたスパイキーショートが最高にかっこいいです」'],
            serviceStyle: {
                attitude: 'スピーディー＆無駄のないロジカルな提案接客',
                tone: '結論ファーストでテキパキと進める。技術のこだわりを理論的に伝える。',
                doPoint: '「フェードのグラデーション」「毛先の立ち上がり角度」をシャープに仕上げる。',
                dontPoint: '手際が悪くモタモタしたり、待ち時間が長いと不満につながります。'
            },
            hairAdvice: {
                colors: ['プラチナシルバー', 'アイスグレージュ', 'メタリックアッシュ'],
                texture: 'エッジの効いたシャープな毛束・マットで男らしい質感',
                styles: ['スパイキーショート', 'フェードカット＆ジェットモヒカン', '前下がりハンサムショート', 'エッジライン刈り上げ'],
                proposalTalk: '「剣の星を持つ男性は、毛先を尖らせたエッジ感と清潔感で勝負運が急上昇します！スパイキーショートで直感と決断力を研ぎ澄ませましょう。」'
            },
            homeCare: {
                aroma: 'ペパーミント・ユーカリ・ジュニパー（頭脳を覚醒させる爽快アロマ）',
                product: 'ディープクレンジングクールシャンプー / クレイハードワックス',
                retailTalk: '「毛穴の皮脂を削ぎ落として毛先をバチッと立たせるクレイワックスです。マットな質感で一日中ヘタらず、男の勝負運を高めてくれますよ！」'
            },
            closingTalk: '「剣タイプの男性は、切れ味（毛先のシャープさ）が命です。伸びて丸くなる前の〇月頃に整えましょう！」'
        }
    },
    '辛': {
        element: '金',
        elementName: '金（宝石）',
        colorBadge: '#94a3b8',
        icon: '💎',
        female: {
            catchphrase: '類まれなる美意識と繊細さを持つ、唯一無二の宝石',
            praiseWords: ['「細部までこだわりを感じて、本当に洗練されていますね」', '「独特の透明感と品格が漂っていてとても素敵です」'],
            serviceStyle: {
                attitude: 'ワンランク上のプレミアム感＆美意識を刺激する接客',
                tone: 'VIPを接客するような丁寧さと、高級感のある言葉遣い。',
                doPoint: 'トリートメントやヘアケアの成分、頭皮ケアの重要性をしっかり解説する。',
                dontPoint: '雑な扱い、傷んだ髪を放置するような提案は絶対にNG。'
            },
            hairAdvice: {
                colors: ['プラチナブロンド', 'ホワイトグレージュ', 'ラベンダーアッシュ', 'パールベージュ'],
                texture: 'シルクのような極上の手触り・光に透ける圧倒的透明感',
                styles: ['艶やかなシースルーレイヤー', '繊細な毛流れのショート', '韓国風艶髪ストレート'],
                proposalTalk: '「辛（かのと）さんは宝石の星。髪のツヤと透明感がそのまま運気の輝きになります。今回は高保湿トリートメントとパールアッシュで、宝石のような輝きを宿しましょう！」'
            },
            homeCare: {
                aroma: 'ネロリ・マグノリア・ホワイトムスク（気品あふれる極上アロマ）',
                product: 'プレミアムシルクシャンプー / ダイヤモンドルミナスセラム',
                retailTalk: '「辛（宝石）の方は磨けば磨くほどオーラが増します。このシルクセラムはシルク生抽出成分が入っていて、ドライヤーの熱で宝石のようなツヤに変わる最高峰のケア剤です。」'
            },
            closingTalk: '「宝石は常に磨くことで真価を発揮します。トリートメントの効果を持続させるためにも、〇月頃にケアをしにいらしてくださいね。」'
        },
        male: {
            catchphrase: '繊細な美意識と洗練された透明感をまとう、都会的ノーブル男子',
            praiseWords: ['「圧倒的な清潔感と透明感があって、モデルさんのようなオーラがありますね」「毛流れの美しさが完璧です」'],
            serviceStyle: {
                attitude: '上質なプレミアム感＆ヘアケア・透明感の重要性を伝える接客',
                tone: '丁寧で洗練された言葉遣い。髪のダメージレスやケアのこだわりを伝える。',
                doPoint: '韓国風コンマヘアやハイトーン透明感カラーなど、美意識の高い提案がヒット。',
                dontPoint: '手触りがパサつくような仕上がりや、大雑把なセットは嫌われます。'
            },
            hairAdvice: {
                colors: ['ホワイトグレージュ', 'パールベージュ', 'ラベンダーアッシュ'],
                texture: 'サラサラとした極上の指通り・光に透ける圧倒的な透明感',
                styles: ['韓国風カルマヘア', 'フェザーマッシュ', 'シースルーセンターパート', 'ハイトーングレージュショート'],
                proposalTalk: '「宝石の星を持つ男性は、髪の透明感とサラサラな毛流れが最大の武器です。フェザーコンマヘアで都会的なノーブルスタイルに仕上げましょう！」'
            },
            homeCare: {
                aroma: 'ネロリ・ホワイトムスク・ベルガモット（気品漂うラグジュアリーアロマ）',
                product: 'プレミアムシルクアミノシャンプー / ダイヤモンドルミナスヘアオイル',
                retailTalk: '「ベタつかず光をまとうサラサラの毛流れが作れるシルクオイルです。宝石タイプの男性にしか出せない透明感オーラが宿りますよ。」'
            },
            closingTalk: '「宝石は常に磨き続けることで輝きます。トリートメントと透明感カラーを維持するために〇月頃にいらしてくださいね。」'
        }
    },
    '壬': {
        element: '水',
        elementName: '水（大海）',
        colorBadge: '#0284c7',
        icon: '🌊',
        female: {
            catchphrase: '自由奔放で知的、変幻自在に世界を泳ぐダイナミックな人',
            praiseWords: ['「視野が広くて知的で、とてもかっこいいです！」', '「型にはまらない自由でおしゃれな雰囲気が魅力的です」'],
            serviceStyle: {
                attitude: '自由な提案＆退屈させない新鮮なアプローチ',
                tone: '枠にはめず、新しいデザインやアレンジ方法を提案する。',
                doPoint: '「今回はこんな新しいカラー調合を試してみませんか？」と冒険心をくすぐる。',
                dontPoint: '毎回全く同じ提案ばかりで変化がないと、飽きて他店に行ってしまいます。'
            },
            hairAdvice: {
                colors: ['ブルーブラック', 'ダークインディゴ', 'ミッドナイトネイビー', 'ディープアッシュ'],
                texture: 'みずみずしい潤い感・濡れ髪風ウェットスタイリング',
                styles: ['風に揺れるロングウェーブ', 'かきあげバング', 'ウルフカット', 'インナーカラー'],
                proposalTalk: '「枠にとらわれない壬（みずのえ）さんの魅力を引き出すために、光の加減でブルーが透ける深みブラックと、動きのあるウェーブでドラマチックに仕上げます！」'
            },
            homeCare: {
                aroma: 'マリンノート・シトラス・クラリセージ（爽快な海風のアロマ）',
                product: '海洋ミネラルクレンジングシャンプー / ウェットシーウォータージェル',
                retailTalk: '「壬（大海）の方はウェットな動きと潤いがあると行動力が増します。このシーウォータージェル、パリッと固まらずみずみずしい濡れ感が一日中続きますよ！」'
            },
            closingTalk: '「壬（みずのえ）の方は常に流れる水のように変化を楽しむと運気が拓けます。次回〇月頃は、少し違うアレンジやプチイメチェンを楽しみましょう！」'
        },
        male: {
            catchphrase: 'スケールが大きく自由奔放、枠にとらわれないダイナミックな挑戦者',
            praiseWords: ['「ダイナミックで自由な男の色気とおしゃれ感があります！」「パーマの動きとウェット感が抜群に似合ってます」'],
            serviceStyle: {
                attitude: '型にはまらない自由でカッコいいデザイン提案',
                tone: 'マンネリを感じさせないよう、季節ごとのパーマやカラーアレンジを積極的に提案。',
                doPoint: 'ツイストスパイラルやウルフパーマなど、動きと遊び心のあるスタイルが刺さります。',
                dontPoint: '真面目すぎる普通の髪型を押し付けると退屈させてしまいます。'
            },
            hairAdvice: {
                colors: ['ブルーブラック', 'ミッドナイトネイビー', 'ディープアッシュ'],
                texture: 'みずみずしい濡れ感・動きのあるウェットパーマ質感',
                styles: ['ウルフパーマ', 'ワイルドかきあげセンターパート', 'ツイストスパイラルパーマ', '無造作ウェットミディアム'],
                proposalTalk: '「大海の星を持つ男性は、ウェットなパーマの躍動感が男の色気と運気を爆上げします！かきあげツーブロックでダイナミックにいきましょう。」'
            },
            homeCare: {
                aroma: 'マリンノート・シトラス・シダーウッド（爽快な潮風のアロマ）',
                product: '海洋ミネラルスカルプシャンプー / シーウォーターウェットジェル',
                retailTalk: '「固まらずに一日中色気のある濡れ髪パーマ質感がキープできるジェルです。大海タイプのダイナミックな魅力を最大限に発揮できます！」'
            },
            closingTalk: '「大海タイプの男性は、変化を楽しむことでエネルギーが巡ります。次回〇月頃は少しパーマの強さを変えて楽しみましょう！」'
        }
    },
    '癸': {
        element: '水',
        elementName: '水（雨露・泉）',
        colorBadge: '#2563eb',
        icon: '🌧️',
        female: {
            catchphrase: '周囲を優しく潤す癒やしの泉・深い慈愛と知性の持ち主',
            praiseWords: ['「柔らかく包み込んでくれるような癒やしの雰囲気がありますね」', '「人の気持ちによく気づく、とても優しい方ですね」'],
            serviceStyle: {
                attitude: '最高のリラクゼーション＆静かに寄り添う接客',
                tone: '無理に喋りかけすぎず、シャンプーやマッサージで心から癒やす。',
                doPoint: 'アロマの香りや頭皮のコリに気づいて優しく声をかける。',
                dontPoint: 'プライベートにズカズカ踏み込んだり、大声で話しかけたりしないこと。'
            },
            hairAdvice: {
                colors: ['ラベンダーブラック', 'シアーダークモカ', 'ミストグレー', '潤いチャコール'],
                texture: 'たっぷり水分を含んだようなうるツヤ質感・まとまりと柔らかさ',
                styles: ['うるツヤストレートロング', '柔らかいワンカールミディ', '透明感あふれるナチュラルボブ'],
                proposalTalk: '「いつも周りを気遣ってお疲れが溜まりやすい癸（みずのと）さん。今回は高保湿ケアと透明感あるラベンダーブラックで、心も髪もしっとり潤してリフレッシュしましょう！」'
            },
            homeCare: {
                aroma: 'ラベンダー・カモミール・ゼラニウム（心を深い安らぎで包むアロマ）',
                product: '高保水ナイトリペアシャンプー / モイスチャーインフュージョンミルク',
                retailTalk: '「癸（雨露）の方は水分保湿が何よりの邪気払いと運気アップです。この保水ミルクをお風呂上がりにつけて寝ると、朝起きた時にしっとりぷるんとした美髪になりますよ。」'
            },
            closingTalk: '「癸（みずのと）さんはストレスを溜め込みやすいので、〇月頃に頭皮マッサージと髪のデトックスにいらしてくださいね。いつでも癒やしの準備をしてお待ちしています。」'
        },
        male: {
            catchphrase: '周囲を優しく包み込む知性と癒やし・清潔感あふれるスマート男子',
            praiseWords: ['「知性的で穏やかな優しさが漂っていて、とても安心感があります」「清潔感のあるサラサラ髪が素敵です」'],
            serviceStyle: {
                attitude: '心地よい癒やし＆清潔感を引き立てるスマート接客',
                tone: '騒がしくせず、落ち着いたトーンでヘッドスパや頭皮マッサージを充実させる。',
                doPoint: 'スマートなセンターパートや、さらツヤのナチュラルショートを丁寧に整える。',
                dontPoint: '無理にプライベートを詮索したり、大声で話しかけるのは苦手です。'
            },
            hairAdvice: {
                colors: ['ラベンダーブラック', 'ダークモカブラウン', 'ミストグレー'],
                texture: 'みずみずしい潤いとしっとりサラサラなまとまり感',
                styles: ['スマートセンターパート', 'シースルーマッシュ', 'さらツヤナチュラルショート', '韓国風ニュアンスヘア'],
                proposalTalk: '「雨露の星を持つ男性は、知性とみずみずしい清潔感が魅力です。おでこをほんのり見せるスマートセンターパートで、誠実さと癒やしを演出しましょう。」'
            },
            homeCare: {
                aroma: 'ラベンダー・クラリセージ・ベルガモット（深い安らぎと癒やしのアロマ）',
                product: '高保水アミノスカルプシャンプー / モイスチャーヘアミルク',
                retailTalk: '「頭皮と髪のパサつきを抑えてサラサラ質感をキープする保水ミルクです。清潔感がずっと続き、邪気払いと開運のバリアになりますよ。」'
            },
            closingTalk: '「雨露タイプの男性は、頭皮をリフレッシュすることが最高のエネルギーチャージです。〇月頃に頭皮スパにいらしてくださいね。」'
        }
    }
};

// 干支・命式計算
function getDayTenkan(date) {
    const baseDate = new Date(1900, 0, 1);
    const diffDays = Math.floor((date - baseDate) / (1000 * 60 * 60 * 24));
    let dayKanshiIndex = (diffDays + 10) % 60;
    if (dayKanshiIndex < 0) dayKanshiIndex += 60;
    return TENKAN[dayKanshiIndex % 10];
}

// 次回おすすめ開運日の計算（約45〜60日後の吉日目安）
function calculateNextLuckyPeriod(baseDate) {
    const today = new Date();
    const nextDate1 = new Date(today.getTime() + 45 * 24 * 60 * 60 * 1000);
    const nextDate2 = new Date(today.getTime() + 60 * 24 * 60 * 60 * 1000);
    
    const m1 = nextDate1.getMonth() + 1;
    const d1 = nextDate1.getDate();
    const m2 = nextDate2.getMonth() + 1;
    const d2 = nextDate2.getDate();

    return `${m1}月${d1}日 〜 ${m2}月${d2}日頃（約1.5〜2ヶ月後）`;
}

// --- 本格CRMカルテ台帳（ローカルストレージ統合） ---
const CRM_STORAGE_KEY = 'salon_crm_ledger_v2';
const HISTORY_STORAGE_KEY = 'salon_suimei_history';

function getCrmLedger() {
    try {
        const data = localStorage.getItem(CRM_STORAGE_KEY);
        return data ? JSON.parse(data) : {};
    } catch (e) {
        console.error(e);
        return {};
    }
}

function saveCrmLedger(ledger) {
    try {
        localStorage.setItem(CRM_STORAGE_KEY, JSON.stringify(ledger));
        return true;
    } catch (e) {
        console.warn('LocalStorage quota exceeded, attempting cleanup of old photos...', e);
        // 容量超過時のセーフガード: 最も古い施術ログの写真データから順に削除して容量を確保
        try {
            const keys = Object.keys(ledger);
            let cleaned = false;
            keys.forEach(k => {
                const logs = ledger[k].logs || [];
                for (let i = logs.length - 1; i >= 0; i--) {
                    if (logs[i].photoBefore || logs[i].photoAfter) {
                        logs[i].photoBefore = null;
                        logs[i].photoAfter = null;
                        cleaned = true;
                        break;
                    }
                }
            });
            if (cleaned) {
                localStorage.setItem(CRM_STORAGE_KEY, JSON.stringify(ledger));
                console.log('Successfully saved ledger after photo cleanup.');
                return true;
            }
        } catch (retryErr) {
            console.error('Failed to save even after photo cleanup:', retryErr);
        }
        alert('カルテ保存容量が上限に達しています。不要な顧客カルテを削除するか、JSONバックアップ後に整理してください。');
        return false;
    }
}

function getCustomerKey(name, birthdayStr) {
    return `${(name || 'お客様').trim()}_${birthdayStr}`;
}

function getHistory() {
    try {
        const data = localStorage.getItem(HISTORY_STORAGE_KEY);
        return data ? JSON.parse(data) : [];
    } catch (e) {
        return [];
    }
}

function saveToHistory(entry) {
    let history = getHistory();
    history = history.filter(item => !(item.name === entry.name && item.birthday === entry.birthday));
    history.unshift(entry);
    if (history.length > 10) history.pop();
    try {
        localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(history));
    } catch (e) {
        console.error(e);
    }
}

// 日数差計算（今日から何日前か）
function getDaysSince(dateStr) {
    if (!dateStr) return 9999;
    const past = new Date(dateStr);
    const now = new Date();
    const diff = Math.floor((now - past) / (1000 * 60 * 60 * 24));
    return diff >= 0 ? diff : 0;
}

// 初期化
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('quick-calc-form');
    const resultCard = document.getElementById('result-card');
    const emptyPlaceholder = document.getElementById('empty-placeholder');
    const modeToggle = document.getElementById('mode-toggle');
    const staffView = document.getElementById('staff-view');
    const customerView = document.getElementById('customer-view');

    const yearSelect = document.getElementById('cust-birth-year');
    const monthSelect = document.getElementById('cust-birth-month');
    const daySelect = document.getElementById('cust-birth-day');

    // プルダウン生成
    initBirthdaySelects(yearSelect, monthSelect, daySelect, 1995, 5, 15);

    // 施術日デフォルトに本日設定
    const crmDateInput = document.getElementById('crm-input-date');
    if (crmDateInput) {
        const now = new Date();
        crmDateInput.value = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
    }

    // 履歴描画
    renderHistory();

    // フォーム送信（診断実行）
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const nameInput = document.getElementById('cust-name').value.trim() || 'お客様';
        const y = parseInt(yearSelect.value);
        const m = parseInt(monthSelect.value);
        const d = parseInt(daySelect.value);
        const gender = document.querySelector('input[name="cust-gender"]:checked')?.value || 'female';

        if (!y || !m || !d) {
            alert('生年月日（年・月・日）をすべて選択してください。');
            return;
        }

        const birthday = new Date(y, m - 1, d);
        const birthdayStr = `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
        const dayTenkan = getDayTenkan(birthday);
        const salonBase = SALON_DATA[dayTenkan];
        const genderData = (gender === 'male' && salonBase.male) ? salonBase.male : salonBase.female;
        const salonInfo = { ...salonBase, ...genderData };
        const luckyPeriod = calculateNextLuckyPeriod(birthday);

        // 履歴保存
        saveToHistory({
            name: nameInput,
            birthday: birthdayStr,
            year: y,
            month: m,
            day: d,
            gender: gender,
            dayTenkan: dayTenkan,
            timestamp: new Date().toISOString()
        });
        renderHistory();

        // 画面反映 & カルテタイムライン描画
        updateSalonResult(nameInput, birthday, dayTenkan, salonInfo, luckyPeriod, gender);

        emptyPlaceholder.classList.add('hidden');
        resultCard.classList.remove('hidden');
        resultCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    // モード切替（スタッフ用カンペ ⇔ お客様用カルテ）
    if (modeToggle) {
        modeToggle.addEventListener('change', () => {
            if (modeToggle.checked) {
                staffView.classList.add('hidden');
                customerView.classList.remove('hidden');
            } else {
                customerView.classList.add('hidden');
                staffView.classList.remove('hidden');
            }
        });
    }

    // クリップボードコピー
    const copyBtn = document.getElementById('copy-talk-btn');
    if (copyBtn) {
        copyBtn.addEventListener('click', () => {
            const talkText = document.getElementById('staff-proposal-talk').innerText;
            navigator.clipboard.writeText(talkText).then(() => {
                const originalText = copyBtn.innerHTML;
                copyBtn.innerHTML = '✅ コピーしました！';
                copyBtn.classList.add('copied');
                setTimeout(() => {
                    copyBtn.innerHTML = originalText;
                    copyBtn.classList.remove('copied');
                }, 2000);
            });
        });
    }

    // 店販トークコピー
    const copyRetailBtn = document.getElementById('copy-retail-talk-btn');
    if (copyRetailBtn) {
        copyRetailBtn.addEventListener('click', () => {
            const talkText = document.getElementById('staff-retail-talk').innerText;
            navigator.clipboard.writeText(talkText).then(() => {
                const originalText = copyRetailBtn.innerHTML;
                copyRetailBtn.innerHTML = '✅ コピーしました！';
                copyRetailBtn.classList.add('copied');
                setTimeout(() => {
                    copyRetailBtn.innerHTML = originalText;
                    copyRetailBtn.classList.remove('copied');
                }, 2000);
            });
        });
    }

    // ================= 時短DX：写真添付・Canvas超軽量圧縮・クイックパレット・音声入力 =================
    let tempPhotos = { before: null, after: null };

    /**
     * 画像ファイルをCanvasで超軽量リサイズ圧縮 (最大長辺480px, quality 0.55 / 1枚約12〜20KB)
     * LocalStorageの5MB制限でも数百枚安全に保存可能
     */
    function compressImageFile(file, callback) {
        if (!file || !file.type.startsWith('image/')) {
            alert('画像ファイル（JPG / PNG 等）を選択してください。');
            return;
        }
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                const maxDim = 480;
                let w = img.width;
                let h = img.height;
                if (w > maxDim || h > maxDim) {
                    if (w > h) {
                        h = Math.round((h * maxDim) / w);
                        w = maxDim;
                    } else {
                        w = Math.round((w * maxDim) / h);
                        h = maxDim;
                    }
                }
                const canvas = document.createElement('canvas');
                canvas.width = w;
                canvas.height = h;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, w, h);
                const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.55);
                callback(compressedDataUrl);
            };
            img.onerror = () => {
                alert('画像の読み込みに失敗しました。別の画像をお試しください。');
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }

    function setupPhotoUpload(inputId, previewId, type) {
        const input = document.getElementById(inputId);
        const preview = document.getElementById(previewId);
        if (!input || !preview) return;

        preview.onclick = (e) => {
            if (e.target.classList.contains('btn-remove-photo')) {
                e.stopPropagation();
                tempPhotos[type] = null;
                input.value = '';
                preview.innerHTML = '<span class="photo-placeholder-text">＋ 写真を追加</span>';
                return;
            }
            input.click();
        };

        input.onchange = () => {
            const file = input.files && input.files[0];
            if (file) {
                preview.innerHTML = '<span style="font-size:0.7rem; color:#38bdf8;">⏳ 圧縮中...</span>';
                compressImageFile(file, (dataUrl) => {
                    tempPhotos[type] = dataUrl;
                    preview.innerHTML = `
                        <img src="${dataUrl}" class="photo-thumb-img" alt="${type}">
                        <button type="button" class="btn-remove-photo" title="写真を削除">&times;</button>
                    `;
                });
            }
        };
    }

    setupPhotoUpload('crm-photo-before-input', 'crm-photo-before-preview', 'before');
    setupPhotoUpload('crm-photo-after-input', 'crm-photo-after-preview', 'after');

    function resetPhotoUploads() {
        tempPhotos = { before: null, after: null };
        const pBefore = document.getElementById('crm-photo-before-preview');
        const pAfter = document.getElementById('crm-photo-after-preview');
        const iBefore = document.getElementById('crm-photo-before-input');
        const iAfter = document.getElementById('crm-photo-after-input');
        if (pBefore) pBefore.innerHTML = '<span class="photo-placeholder-text">＋ 写真を追加</span>';
        if (pAfter) pAfter.innerHTML = '<span class="photo-placeholder-text">＋ 写真を追加</span>';
        if (iBefore) iBefore.value = '';
        if (iAfter) iAfter.value = '';
    }

    // 🎨 イベント委譲によるクイックパレットチップの即座挿入（確実に動作）
    document.addEventListener('click', (e) => {
        const chip = e.target.closest('.palette-chip');
        if (chip) {
            e.preventDefault();
            e.stopPropagation();
            const insertText = chip.getAttribute('data-insert');
            const recipeArea = document.getElementById('crm-input-recipe');
            if (recipeArea && insertText) {
                const current = recipeArea.value.trim();
                recipeArea.value = current ? `${current} ${insertText}` : insertText;
                recipeArea.focus();
                chip.style.transform = 'scale(0.92)';
                chip.style.borderColor = '#38bdf8';
                setTimeout(() => {
                    chip.style.transform = '';
                    chip.style.borderColor = '';
                }, 150);
            }
        }
    });

    // 📋 前回の配合・メニューを呼び出し
    const btnCopyLast = document.getElementById('btn-copy-last-recipe');
    if (btnCopyLast) {
        btnCopyLast.addEventListener('click', () => {
            const name = document.getElementById('cust-name').value.trim() || 'お客様';
            const y = parseInt(yearSelect.value) || 1995;
            const m = parseInt(monthSelect.value) || 5;
            const d = parseInt(daySelect.value) || 15;
            const birthdayStr = `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
            const custKey = getCustomerKey(name, birthdayStr);
            const ledger = getCrmLedger();
            const customer = ledger[custKey];

            if (customer && customer.logs && customer.logs.length > 0) {
                const last = customer.logs[0];
                if (last.menu) document.getElementById('crm-input-menu').value = last.menu;
                if (last.recipe) document.getElementById('crm-input-recipe').value = last.recipe;
                const statusEl = document.getElementById('crm-save-status');
                if (statusEl) {
                    statusEl.textContent = `📋 前回 (${last.date}) の配合を復元しました`;
                    setTimeout(() => { statusEl.textContent = ''; }, 3000);
                }
            } else {
                alert('このお客様の過去の施術履歴がまだありません。');
            }
        });
    }

    // 🎙️ イベント委譲による Web Speech API 音声入力（確実なトグル制御＆リアルタイムUI表示）
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    let activeRecognizer = null;
    let currentRecordingBtn = null;

    document.addEventListener('click', (e) => {
        const btn = e.target.closest('.btn-voice-input');
        if (btn) {
            e.preventDefault();
            e.stopPropagation();

            if (!SpeechRecognition) {
                alert('お使いのブラウザは音声入力に対応していません。\nGoogle Chrome または Safari の最新版をご利用いただくか、マイク権限を許可してください。');
                return;
            }

            const targetId = btn.getAttribute('data-target');
            const targetEl = document.getElementById(targetId);
            const statusEl = document.getElementById('crm-save-status');
            if (!targetEl) return;

            if (activeRecognizer) {
                activeRecognizer.stop();
                activeRecognizer = null;
                if (currentRecordingBtn) currentRecordingBtn.classList.remove('recording');
                currentRecordingBtn = null;
                if (statusEl) statusEl.textContent = '';
                return;
            }

            try {
                const recognition = new SpeechRecognition();
                recognition.lang = 'ja-JP';
                recognition.interimResults = false;
                recognition.maxAlternatives = 1;
                recognition.continuous = false;

                btn.classList.add('recording');
                currentRecordingBtn = btn;
                activeRecognizer = recognition;

                if (statusEl) {
                    statusEl.innerHTML = '<span style="color:#f43f5e; font-weight:700;">🎙️ 音声聞き取り中... お話しください</span>';
                }

                recognition.onresult = (event) => {
                    if (event.results && event.results[0] && event.results[0][0]) {
                        const speechText = event.results[0][0].transcript;
                        const current = targetEl.value.trim();
                        targetEl.value = current ? `${current} ${speechText}` : speechText;
                        targetEl.focus();
                        if (statusEl) {
                            statusEl.innerHTML = '<span style="color:#a7f3d0; font-weight:700;">✅ 音声を入力しました</span>';
                            setTimeout(() => { statusEl.textContent = ''; }, 3000);
                        }
                    }
                };

                recognition.onerror = (event) => {
                    console.warn('Speech recognition error:', event.error);
                    btn.classList.remove('recording');
                    activeRecognizer = null;
                    currentRecordingBtn = null;
                    if (statusEl) {
                        statusEl.innerHTML = `<span style="color:#f87171;">⚠️ 音声認識エラー: ${event.error === 'not-allowed' ? 'マイクの使用を許可してください' : event.error}</span>`;
                        setTimeout(() => { statusEl.textContent = ''; }, 4000);
                    }
                };

                recognition.onend = () => {
                    btn.classList.remove('recording');
                    activeRecognizer = null;
                    currentRecordingBtn = null;
                };

                recognition.start();
            } catch (err) {
                console.error('Speech recognition start failed:', err);
                btn.classList.remove('recording');
                activeRecognizer = null;
                currentRecordingBtn = null;
                if (statusEl) {
                    statusEl.innerHTML = '<span style="color:#f87171;">⚠️ マイクの起動に失敗しました</span>';
                }
            }
        }
    });

    // 📸 写真拡大・比較モーダル
    const photoModal = document.getElementById('crm-photo-modal');
    const photoModalTitle = document.getElementById('crm-photo-modal-title');
    const photoCompareContainer = document.getElementById('crm-photo-compare-container');
    const btnClosePhoto = document.getElementById('btn-close-photo-modal');
    const btnClosePhotoFooter = document.getElementById('btn-close-photo-modal-footer');

    function closePhotoModal() {
        if (photoModal) photoModal.classList.add('hidden');
    }
    if (btnClosePhoto) btnClosePhoto.addEventListener('click', closePhotoModal);
    if (btnClosePhotoFooter) btnClosePhotoFooter.addEventListener('click', closePhotoModal);

    window.openPhotoCompareModal = function(dateStr, beforeUrl, afterUrl, memo) {
        if (!photoModal || !photoCompareContainer) return;
        photoModalTitle.textContent = `📸 ${dateStr} 施術写真 (${memo || 'Before / After 比較'})`;
        photoCompareContainer.innerHTML = '';

        if (beforeUrl) {
            const bCard = document.createElement('div');
            bCard.className = 'photo-compare-card';
            bCard.innerHTML = `
                <div class="photo-compare-header" style="color: #cbd5e1;">📷 施術前 (Before)</div>
                <img src="${beforeUrl}" class="photo-compare-img" alt="Before Photo">
            `;
            photoCompareContainer.appendChild(bCard);
        }

        if (afterUrl) {
            const aCard = document.createElement('div');
            aCard.className = 'photo-compare-card';
            aCard.innerHTML = `
                <div class="photo-compare-header" style="color: #a7f3d0;">✨ 仕上がり (After)</div>
                <img src="${afterUrl}" class="photo-compare-img" alt="After Photo">
            `;
            photoCompareContainer.appendChild(aCard);
        }

        photoModal.classList.remove('hidden');
    };

    // --- 施術記録追加・保存イベント ---
    const btnAddCrmLog = document.getElementById('btn-add-crm-log');
    if (btnAddCrmLog) {
        btnAddCrmLog.addEventListener('click', () => {
            const name = document.getElementById('cust-name').value.trim() || 'お客様';
            const y = parseInt(yearSelect.value) || 1995;
            const m = parseInt(monthSelect.value) || 5;
            const d = parseInt(daySelect.value) || 15;
            const birthdayStr = `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
            const gender = document.querySelector('input[name="cust-gender"]:checked')?.value || 'female';
            const dayTenkan = getDayTenkan(new Date(y, m - 1, d));
            const data = SALON_DATA[dayTenkan];

            const dateVal = document.getElementById('crm-input-date').value || new Date().toISOString().split('T')[0];
            const menuVal = document.getElementById('crm-input-menu').value.trim() || 'カット＆メンテナンス';
            const recipeVal = document.getElementById('crm-input-recipe').value.trim();
            const talkVal = document.getElementById('crm-input-talk').value.trim();
            const nextVal = document.getElementById('crm-input-next').value.trim();
            const photoBefore = tempPhotos.before;
            const photoAfter = tempPhotos.after;

            if (!recipeVal && !talkVal && !nextVal && !photoBefore && !photoAfter) {
                alert('「カラー配合」「会話メモ」「次回提案」「施術写真」のいずれかを入力してください。');
                return;
            }

            const custKey = getCustomerKey(name, birthdayStr);
            const ledger = getCrmLedger();

            if (!ledger[custKey]) {
                ledger[custKey] = {
                    name: name,
                    birthday: birthdayStr,
                    year: y,
                    month: m,
                    day: d,
                    gender: gender,
                    dayTenkan: dayTenkan,
                    elementName: data.elementName,
                    element: data.element,
                    tags: [],
                    logs: []
                };
            }

            const newLog = {
                id: Date.now().toString(),
                date: dateVal,
                menu: menuVal,
                recipe: recipeVal,
                talk: talkVal,
                next: nextVal,
                photoBefore: photoBefore || null,
                photoAfter: photoAfter || null,
                createdAt: new Date().toISOString()
            };

            ledger[custKey].logs.unshift(newLog);
            ledger[custKey].lastVisited = dateVal;
            const saveSuccess = saveCrmLedger(ledger);

            if (saveSuccess) {
                renderCrmTimeline(custKey);

                document.getElementById('crm-input-recipe').value = '';
                document.getElementById('crm-input-talk').value = '';
                document.getElementById('crm-input-next').value = '';
                resetPhotoUploads();

                const statusEl = document.getElementById('crm-save-status');
                if (statusEl) {
                    const photoMsg = (photoBefore && photoAfter) ? '（写真2枚付き）' : (photoBefore || photoAfter ? '（写真付き）' : '');
                    statusEl.innerHTML = `<span style="color:#a7f3d0; font-weight:700;">✅ カルテに保存しました ${photoMsg}</span>`;
                    setTimeout(() => { statusEl.textContent = ''; }, 4000);
                }
            }
        });
    }

    // --- 全顧客カルテ台帳ダッシュボードモーダル関連 ---
    const btnOpenCrmModal = document.getElementById('btn-open-crm-modal');
    const crmLedgerModal = document.getElementById('crm-ledger-modal');
    const btnCloseCrmModal = document.getElementById('btn-close-crm-modal');
    const btnCloseCrmModal2 = document.getElementById('btn-close-crm-modal-2');
    const crmSearchInput = document.getElementById('crm-ledger-search');
    const crmStatusFilter = document.getElementById('crm-filter-status');
    const crmSortFilter = document.getElementById('crm-filter-sort');
    const btnExportCrm = document.getElementById('btn-export-crm-data');
    const btnExportCsv = document.getElementById('btn-export-crm-csv');
    const inputImportJson = document.getElementById('input-import-crm-json');

    let currentElemFilter = 'all';
    let currentGenderFilter = 'all';

    function triggerDashboardRender() {
        const query = crmSearchInput ? crmSearchInput.value.trim() : '';
        const status = crmStatusFilter ? crmStatusFilter.value : 'all';
        const sort = crmSortFilter ? crmSortFilter.value : 'lastVisitedDesc';
        renderCrmLedgerDashboard(query, status, currentElemFilter, currentGenderFilter, sort);
    }

    if (btnOpenCrmModal && crmLedgerModal) {
        btnOpenCrmModal.addEventListener('click', () => {
            triggerDashboardRender();
            crmLedgerModal.classList.remove('hidden');
        });
    }

    const closeCrmModal = () => {
        if (crmLedgerModal) crmLedgerModal.classList.add('hidden');
    };

    if (btnCloseCrmModal) btnCloseCrmModal.addEventListener('click', closeCrmModal);
    if (btnCloseCrmModal2) btnCloseCrmModal2.addEventListener('click', closeCrmModal);
    if (crmLedgerModal) {
        crmLedgerModal.addEventListener('click', (e) => {
            if (e.target === crmLedgerModal) closeCrmModal();
        });
    }

    if (crmSearchInput) crmSearchInput.addEventListener('input', triggerDashboardRender);
    if (crmStatusFilter) crmStatusFilter.addEventListener('change', triggerDashboardRender);
    if (crmSortFilter) crmSortFilter.addEventListener('change', triggerDashboardRender);

    // エレメントフィルター切り替え
    document.querySelectorAll('.crm-elem-filter').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.crm-elem-filter').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentElemFilter = btn.getAttribute('data-elem');
            triggerDashboardRender();
        });
    });

    // 性別フィルター切り替え
    document.querySelectorAll('.crm-gender-filter').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.crm-gender-filter').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentGenderFilter = btn.getAttribute('data-gender');
            triggerDashboardRender();
        });
    });

    // CSVエクスポート
    if (btnExportCsv) {
        btnExportCsv.addEventListener('click', exportCrmToCsv);
    }

    // JSONバックアップエクスポート
    if (btnExportCrm) {
        btnExportCrm.addEventListener('click', () => {
            const ledger = getCrmLedger();
            const jsonStr = JSON.stringify(ledger, null, 2);
            const blob = new Blob([jsonStr], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `Stargazer_Salon_CRM_Backup_${new Date().toISOString().split('T')[0]}.json`;
            a.click();
            URL.revokeObjectURL(url);
        });
    }

    // JSONインポート復元
    if (inputImportJson) {
        inputImportJson.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = (event) => {
                try {
                    const imported = JSON.parse(event.target.result);
                    const current = getCrmLedger();
                    const merged = { ...current, ...imported };
                    saveCrmLedger(merged);
                    alert('✅ カルテデータを正常に復元・インポートしました！');
                    triggerDashboardRender();
                } catch (err) {
                    alert('❌ ファイルの読み込みに失敗しました。有効なJSONファイルかご確認ください。');
                }
            };
            reader.readAsText(file);
        });
    }

    // --- 顧客詳細モーダル関連 ---
    const detailModal = document.getElementById('crm-detail-modal');
    const btnCloseDetail = document.getElementById('btn-close-detail-modal');
    const btnCloseDetail2 = document.getElementById('btn-close-detail-modal-2');
    const closeDetail = () => { if (detailModal) detailModal.classList.add('hidden'); };
    if (btnCloseDetail) btnCloseDetail.addEventListener('click', closeDetail);
    if (btnCloseDetail2) btnCloseDetail2.addEventListener('click', closeDetail);
    if (detailModal) {
        detailModal.addEventListener('click', (e) => {
            if (e.target === detailModal) closeDetail();
        });
    }

    // --- 印刷モーダル関連のイベント設定 ---
    const btnOpenPrint = document.getElementById('btn-open-print');
    const printModal = document.getElementById('print-modal');
    const btnCloseModal = document.getElementById('btn-close-modal');
    const btnCloseModal2 = document.getElementById('btn-close-modal-2');
    const btnTriggerPrint = document.getElementById('btn-trigger-print');
    const inputStylistMemo = document.getElementById('input-stylist-memo');
    const inputSalonQrUrl = document.getElementById('input-salon-qr-url');
    const printMemoText = document.getElementById('print-stylist-memo-text');
    const printQrImg = document.getElementById('print-qr-code-img');
    const previewTarget = document.getElementById('modal-preview-target');
    const printPageContent = document.querySelector('.print-page');

    function updateQrCode(url) {
        const targetUrl = url || 'https://instagram.com';
        const qrApi = `https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${encodeURIComponent(targetUrl)}`;
        if (printQrImg) printQrImg.src = qrApi;
    }

    if (inputSalonQrUrl) {
        inputSalonQrUrl.addEventListener('input', (e) => {
            updateQrCode(e.target.value.trim());
        });
        updateQrCode(inputSalonQrUrl.value.trim());
    }

    if (btnOpenPrint && printModal) {
        btnOpenPrint.addEventListener('click', () => {
            updateQrCode(inputSalonQrUrl ? inputSalonQrUrl.value.trim() : '');
            if (previewTarget && printPageContent) {
                previewTarget.innerHTML = printPageContent.outerHTML;
            }
            printModal.classList.remove('hidden');
        });
    }

    const closeModal = () => {
        if (printModal) printModal.classList.add('hidden');
    };

    if (btnCloseModal) btnCloseModal.addEventListener('click', closeModal);
    if (btnCloseModal2) btnCloseModal2.addEventListener('click', closeModal);
    if (printModal) {
        printModal.addEventListener('click', (e) => {
            if (e.target === printModal) closeModal();
        });
    }

    // スタイリストメモのリアルタイム反映
    if (inputStylistMemo) {
        inputStylistMemo.addEventListener('input', (e) => {
            const val = e.target.value.trim();
            const text = val || '本日はご来店いただき誠にありがとうございました。また次回、開運メンテナンスでお会いできることを心より楽しみにしております！';
            if (printMemoText) printMemoText.textContent = text;
            const previewMemo = previewTarget.querySelector('#print-stylist-memo-text');
            if (previewMemo) previewMemo.textContent = text;
        });
    }

    // 印刷実行
    if (btnTriggerPrint) {
        btnTriggerPrint.addEventListener('click', () => {
            window.print();
        });
    }

    // --- SNS画像モーダル関連 ---
    const btnOpenSnsCard = document.getElementById('btn-open-sns-card');
    const snsModal = document.getElementById('sns-modal');
    const btnCloseSnsModal = document.getElementById('btn-close-sns-modal');
    const previewImg = document.getElementById('sns-preview-img');
    const downloadBtn = document.getElementById('btn-download-sns-card');

    if (btnOpenSnsCard && snsModal) {
        btnOpenSnsCard.addEventListener('click', () => {
            const name = document.getElementById('cust-name').value.trim() || 'お客様';
            const y = parseInt(yearSelect.value) || 1995;
            const m = parseInt(monthSelect.value) || 5;
            const d = parseInt(daySelect.value) || 15;
            const gender = document.querySelector('input[name="cust-gender"]:checked')?.value || 'female';
            const birthday = new Date(y, m - 1, d);
            const dayTenkan = getDayTenkan(birthday);
            const salonBase = SALON_DATA[dayTenkan];
            const genderData = (gender === 'male' && salonBase.male) ? salonBase.male : salonBase.female;
            const data = { ...salonBase, ...genderData };
            const luckyPeriod = calculateNextLuckyPeriod(birthday);

            generateSNSCardImage(name, birthday, dayTenkan, data, luckyPeriod, (dataUrl) => {
                if (previewImg) previewImg.src = dataUrl;
                if (downloadBtn) {
                    downloadBtn.href = dataUrl;
                    downloadBtn.download = `開運ヘアカルテ_${name}_${data.elementName}.png`;
                }
                snsModal.classList.remove('hidden');
            });
        });
    }

    const closeSnsModal = () => {
        if (snsModal) snsModal.classList.add('hidden');
    };

    if (btnCloseSnsModal) btnCloseSnsModal.addEventListener('click', closeSnsModal);
    if (snsModal) {
        snsModal.addEventListener('click', (e) => {
            if (e.target === snsModal) closeSnsModal();
        });
    }
});

// 生年月日のプルダウン初期化・連動
function initBirthdaySelects(yearSel, monthSel, daySel, defaultY, defaultM, defaultD) {
    const currentYear = new Date().getFullYear();
    yearSel.innerHTML = '<option value="">年</option>';
    for (let y = currentYear; y >= 1920; y--) {
        const opt = document.createElement('option');
        opt.value = y;
        opt.textContent = `${y}年`;
        if (defaultY && y === defaultY) opt.selected = true;
        yearSel.appendChild(opt);
    }

    monthSel.innerHTML = '<option value="">月</option>';
    for (let m = 1; m <= 12; m++) {
        const opt = document.createElement('option');
        opt.value = m;
        opt.textContent = `${m}月`;
        if (defaultM && m === defaultM) opt.selected = true;
        monthSel.appendChild(opt);
    }

    function updateDays(selectedDay) {
        const y = parseInt(yearSel.value) || 2000;
        const m = parseInt(monthSel.value) || 1;
        const daysInMonth = new Date(y, m, 0).getDate();
        const currentSelected = selectedDay || parseInt(daySel.value) || (defaultD || 1);
        daySel.innerHTML = '<option value="">日</option>';
        for (let d = 1; d <= daysInMonth; d++) {
            const opt = document.createElement('option');
            opt.value = d;
            opt.textContent = `${d}日`;
            if (d === currentSelected || (currentSelected > daysInMonth && d === daysInMonth)) {
                opt.selected = true;
            }
            daySel.appendChild(opt);
        }
    }

    yearSel.addEventListener('change', () => updateDays());
    monthSel.addEventListener('change', () => updateDays());
    updateDays(defaultD);
}

function renderHistory() {
    const historyList = document.getElementById('history-tags');
    if (!historyList) return;
    const history = getHistory();
    historyList.innerHTML = '';

    if (history.length === 0) {
        historyList.innerHTML = '<span class="history-empty">履歴はありません</span>';
        return;
    }

    history.forEach(item => {
        const badge = document.createElement('button');
        badge.type = 'button';
        badge.className = 'history-badge';
        const genderMark = item.gender === 'male' ? '👨' : '👩';
        badge.innerHTML = `<span>${genderMark} ${item.name} 様</span> <small>(${item.dayTenkan})</small>`;
        badge.addEventListener('click', () => {
            loadCustomerProfile(item.name, item.year, item.month, item.day, item.gender);
        });
        historyList.appendChild(badge);
    });
}

function loadCustomerProfile(name, y, m, d, gender) {
    document.getElementById('cust-name').value = name === 'お客様' ? '' : name;

    const yearSel = document.getElementById('cust-birth-year');
    const monthSel = document.getElementById('cust-birth-month');
    const daySel = document.getElementById('cust-birth-day');

    if (yearSel) yearSel.value = y;
    if (monthSel) monthSel.value = m;
    
    const daysInMonth = new Date(y, m, 0).getDate();
    daySel.innerHTML = '<option value="">日</option>';
    for (let dayNum = 1; dayNum <= daysInMonth; dayNum++) {
        const opt = document.createElement('option');
        opt.value = dayNum;
        opt.textContent = `${dayNum}日`;
        if (dayNum === d) opt.selected = true;
        daySel.appendChild(opt);
    }

    const genderRadio = document.querySelector(`input[name="cust-gender"][value="${gender || 'female'}"]`);
    if (genderRadio) genderRadio.checked = true;

    const birthday = new Date(y, m - 1, d);
    const dayTenkan = getDayTenkan(birthday);
    const salonBase = SALON_DATA[dayTenkan];
    const genderData = (gender === 'male' && salonBase.male) ? salonBase.male : salonBase.female;
    const salonInfo = { ...salonBase, ...genderData };
    const luckyPeriod = calculateNextLuckyPeriod(birthday);
    
    updateSalonResult(name, birthday, dayTenkan, salonInfo, luckyPeriod, gender || 'female');

    document.getElementById('empty-placeholder').classList.add('hidden');
    document.getElementById('result-card').classList.remove('hidden');
    document.getElementById('result-card').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function updateSalonResult(name, birthday, dayTenkan, data, luckyPeriod, gender) {
    const isMale = gender === 'male';
    const birthdayStr = `${birthday.getFullYear()}-${String(birthday.getMonth() + 1).padStart(2, '0')}-${String(birthday.getDate()).padStart(2, '0')}`;
    const custKey = getCustomerKey(name, birthdayStr);

    // 共通ヘッダー
    const genderTag = isMale ? '（メンズ接客）' : '（レディース接客）';
    document.querySelectorAll('.target-name').forEach(el => el.textContent = `${name} 様 ${genderTag}`);
    document.querySelectorAll('.target-birthday').forEach(el => {
        el.textContent = `${birthday.getFullYear()}年${birthday.getMonth() + 1}月${birthday.getDate()}日 生まれ`;
    });
    
    // エレメントバッジ
    const typeBadge = document.getElementById('type-badge');
    if (typeBadge) {
        typeBadge.textContent = `${data.icon} ${dayTenkan}（${data.elementName}タイプ）`;
        typeBadge.style.borderColor = data.colorBadge;
    }
    
    const catchEl = document.getElementById('type-catchphrase');
    if (catchEl) catchEl.textContent = data.catchphrase;

    // --- 美容師用カンペ (Staff View) ---
    const praiseList = document.getElementById('staff-praise-list');
    if (praiseList) {
        praiseList.innerHTML = data.praiseWords.map(w => `<li>${w}</li>`).join('');
    }

    document.getElementById('staff-service-attitude').textContent = data.serviceStyle.attitude;
    document.getElementById('staff-service-tone').textContent = data.serviceStyle.tone;
    document.getElementById('staff-service-do').textContent = data.serviceStyle.doPoint;
    document.getElementById('staff-service-dont').textContent = data.serviceStyle.dontPoint;

    const colorBadges = document.getElementById('staff-color-badges');
    if (colorBadges) {
        colorBadges.innerHTML = data.hairAdvice.colors.map(c => `<span class="color-pill">${c}</span>`).join('');
    }
    document.getElementById('staff-texture').textContent = data.hairAdvice.texture;
    
    const styleList = document.getElementById('staff-style-list');
    if (styleList) {
        styleList.innerHTML = data.hairAdvice.styles.map(s => `<li>${s}</li>`).join('');
    }

    document.getElementById('staff-proposal-talk').textContent = data.hairAdvice.proposalTalk;
    
    if (data.homeCare) {
        document.getElementById('staff-retail-aroma').textContent = data.homeCare.aroma;
        document.getElementById('staff-retail-product').textContent = data.homeCare.product;
        document.getElementById('staff-retail-talk').textContent = data.homeCare.retailTalk;
    }

    document.getElementById('staff-closing-talk').textContent = data.closingTalk;
    document.getElementById('staff-lucky-period').textContent = luckyPeriod;

    // 顧客カルテタイムラインの描画
    renderCrmTimeline(custKey);

    // --- お客様用カルテ (Customer View) ---
    const custTypeBadge = document.getElementById('cust-type-badge');
    if (custTypeBadge) {
        custTypeBadge.textContent = `${data.icon} ${data.elementName}タイプ`;
    }
    document.getElementById('cust-catchphrase').textContent = data.catchphrase;
    
    const custColorBadges = document.getElementById('cust-color-badges');
    if (custColorBadges) {
        custColorBadges.innerHTML = data.hairAdvice.colors.map(c => `<span class="color-pill cust">${c}</span>`).join('');
    }
    document.getElementById('cust-texture').textContent = data.hairAdvice.texture;
    
    const custStyleList = document.getElementById('cust-style-list');
    if (custStyleList) {
        custStyleList.innerHTML = data.hairAdvice.styles.map(s => `<li>✨ ${s}</li>`).join('');
    }

    if (data.homeCare) {
        document.getElementById('cust-home-aroma').textContent = data.homeCare.aroma;
        document.getElementById('cust-home-product').textContent = data.homeCare.product;
    }
    
    document.getElementById('cust-lucky-period').textContent = luckyPeriod;

    // 📅 年間12ヶ月バイオリズム（スタッフ・お客様ビュー）
    renderYearlyCalendarSheet(dayTenkan, data.element, gender);

    // --- 🖨️ 印刷専用シートへのデータ反映 ---
    const today = new Date();
    const formattedToday = `${today.getFullYear()}.${String(today.getMonth() + 1).padStart(2, '0')}.${String(today.getDate()).padStart(2, '0')}`;
    const printDate = document.getElementById('print-issued-date');
    if (printDate) printDate.textContent = formattedToday;

    const printCustName = document.getElementById('print-cust-name');
    if (printCustName) printCustName.textContent = `${name} 様 ${isMale ? '(Men\'s)' : ''}`;

    const printCustElement = document.getElementById('print-cust-element');
    if (printCustElement) printCustElement.textContent = `${data.icon} ${dayTenkan}（${data.elementName}）`;

    const printCatch = document.getElementById('print-catchphrase');
    if (printCatch) printCatch.textContent = data.catchphrase;

    const printNatureDesc = document.getElementById('print-nature-desc');
    if (printNatureDesc) {
        printNatureDesc.textContent = `${data.serviceStyle.attitude}。${data.serviceStyle.tone}`;
    }

    const printColorList = document.getElementById('print-color-list');
    if (printColorList) {
        printColorList.innerHTML = data.hairAdvice.colors.map(c => `<span class="print-color-tag">${c}</span>`).join('');
    }

    const printTexture = document.getElementById('print-texture-text');
    if (printTexture) printTexture.textContent = data.hairAdvice.texture;

    const printStyleList = document.getElementById('print-style-list');
    if (printStyleList) {
        printStyleList.innerHTML = data.hairAdvice.styles.map(s => `<li>${s}</li>`).join('');
    }

    if (data.homeCare) {
        const printHomeAroma = document.getElementById('print-home-aroma');
        if (printHomeAroma) printHomeAroma.textContent = data.homeCare.aroma;
        const printHomeProd = document.getElementById('print-home-product');
        if (printHomeProd) printHomeProd.textContent = data.homeCare.product;
    }

    const printLuckyDates = document.getElementById('print-lucky-dates');
    if (printLuckyDates) printLuckyDates.textContent = luckyPeriod;

    // 印刷用年間スケジュール
    const printYearlyList = document.getElementById('print-yearly-summary');
    if (printYearlyList) {
        const calData = getYearlyCalendarData(dayTenkan, data.element, gender);
        const highlights = calData.filter(m => m.isHighlight);
        printYearlyList.innerHTML = highlights.map(h => `
            <div class="print-yearly-item">
                <span class="print-cal-month">${h.month}月</span>
                <span class="print-cal-theme"><strong>${h.theme}</strong> (${h.badge})</span>
                <span class="print-cal-action">${h.hairAction}</span>
            </div>
        `).join('');
    }
}

/**
 * 顧客カルテのタイムライン描画（メイン画面側）
 */
function renderCrmTimeline(custKey) {
    const timelineEl = document.getElementById('crm-logs-timeline');
    const countEl = document.getElementById('crm-record-count');
    if (!timelineEl) return;

    const ledger = getCrmLedger();
    const customer = ledger[custKey];

    if (!customer || !customer.logs || customer.logs.length === 0) {
        timelineEl.innerHTML = `
            <div style="text-align: center; padding: 1.5rem; color: #64748b; font-size: 0.8rem; background: rgba(0,0,0,0.2); border-radius: 8px;">
                まだ施術メモの記録がありません。<br>上のフォームから「カラー配合」や「会話メモ」を記録してください。
            </div>
        `;
        if (countEl) countEl.textContent = '記録: 0件';
        return;
    }

    if (countEl) countEl.textContent = `記録: ${customer.logs.length}件`;
    timelineEl.innerHTML = '';

    customer.logs.forEach((log) => {
        const item = document.createElement('div');
        item.style.cssText = `
            background: rgba(30, 41, 59, 0.8);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-left: 4px solid #38bdf8;
            border-radius: 8px;
            padding: 0.75rem;
            display: flex;
            flex-direction: column;
            gap: 0.35rem;
        `;

        item.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.06); padding-bottom: 4px;">
                <span style="font-weight: 800; font-size: 0.85rem; color: #38bdf8;">📅 ${log.date}</span>
                <div style="display: flex; align-items: center; gap: 8px;">
                    <span style="font-size: 0.75rem; color: #fef08a; font-weight: 700;">✂️ ${log.menu || '施術'}</span>
                    <button type="button" class="btn-delete-log" data-log-id="${log.id}" style="background: none; border: none; color: #ef4444; font-size: 0.75rem; cursor: pointer; padding: 2px 4px;">🗑️ 削除</button>
                </div>
            </div>
            ${log.recipe ? `<div style="font-size: 0.8rem; color: #a7f3d0;"><strong>🧪 配合/レシピ:</strong> ${log.recipe}</div>` : ''}
            ${log.talk ? `<div style="font-size: 0.78rem; color: #cbd5e1;"><strong>💬 会話/好み:</strong> ${log.talk}</div>` : ''}
            ${log.next ? `<div style="font-size: 0.78rem; color: #f472b6;"><strong>🌟 次回提案:</strong> ${log.next}</div>` : ''}
            ${(log.photoBefore || log.photoAfter) ? `
                <div class="log-photo-strip">
                    ${log.photoBefore ? `
                        <div class="log-photo-thumb-wrap" title="タップで写真を拡大比較">
                            <img src="${log.photoBefore}" class="log-photo-thumb-img" alt="Before">
                            <span class="log-photo-tag">Before</span>
                        </div>
                    ` : ''}
                    ${log.photoAfter ? `
                        <div class="log-photo-thumb-wrap" title="タップで写真を拡大比較">
                            <img src="${log.photoAfter}" class="log-photo-thumb-img" alt="After">
                            <span class="log-photo-tag" style="color:#a7f3d0;">After</span>
                        </div>
                    ` : ''}
                    <span style="font-size: 0.7rem; color: #38bdf8; align-self: center; cursor: pointer;">🔍 拡大比較</span>
                </div>
            ` : ''}
        `;

        if (log.photoBefore || log.photoAfter) {
            const photoStrip = item.querySelector('.log-photo-strip');
            if (photoStrip) {
                photoStrip.addEventListener('click', () => {
                    openPhotoCompareModal(log.date, log.photoBefore, log.photoAfter, log.menu);
                });
            }
        }

        const delBtn = item.querySelector('.btn-delete-log');
        delBtn.addEventListener('click', () => {
            if (confirm(`${log.date} の施術記録を削除してもよろしいですか？`)) {
                customer.logs = customer.logs.filter(l => l.id !== log.id);
                saveCrmLedger(ledger);
                renderCrmTimeline(custKey);
            }
        });

        timelineEl.appendChild(item);
    });

    const latestLog = customer.logs[0];
    if (latestLog) {
        const inputStylistMemo = document.getElementById('input-stylist-memo');
        const printMemoText = document.getElementById('print-stylist-memo-text');
        if (inputStylistMemo && !inputStylistMemo.value) {
            const autoMsg = `本日はご来店ありがとうございました！${latestLog.recipe ? `（${latestLog.recipe.split('/')[0]}）` : ''}とてもお似合いでした✨`;
            inputStylistMemo.placeholder = autoMsg;
            if (printMemoText) printMemoText.textContent = autoMsg;
        }
    }
}

/**
 * 全顧客カルテ台帳ダッシュボードの描画（高度フィルター・ソート・統計連動）
 */
function renderCrmLedgerDashboard(query, statusFilter, elemFilter, genderFilter, sortOrder) {
    const listEl = document.getElementById('crm-ledger-list');
    if (!listEl) return;

    const ledger = getCrmLedger();
    const keys = Object.keys(ledger);

    // --- 統計サマリー集計 ---
    let totalLogs = 0;
    let dueCount = 0;
    const elemCounts = { '木': 0, '火': 0, '土': 0, '金': 0, '水': 0 };

    keys.forEach(k => {
        const c = ledger[k];
        const logLen = c.logs ? c.logs.length : 0;
        totalLogs += logLen;
        
        const days = getDaysSince(c.lastVisited);
        if (days >= 45 && days <= 60) dueCount++;

        const e = c.element || (c.elementName ? c.elementName.charAt(0) : '木');
        if (elemCounts[e] !== undefined) elemCounts[e]++;
    });

    document.getElementById('stat-total-cust').textContent = keys.length;
    document.getElementById('stat-total-logs').textContent = totalLogs;
    document.getElementById('stat-due-cust').textContent = dueCount;

    const elemBarText = `🌲${elemCounts['木']} ☀️${elemCounts['火']} ⛰️${elemCounts['土']} ⚔️${elemCounts['金']} 🌊${elemCounts['水']}`;
    document.getElementById('stat-element-bar').textContent = elemBarText;

    if (keys.length === 0) {
        listEl.innerHTML = `
            <div style="text-align: center; padding: 2.5rem; color: #64748b;">
                保存された顧客カルテデータがまだありません。<br>
                メイン画面で生年月日を入力し、「カルテに施術記録を保存」を行うと自動でここに蓄積されます。
            </div>
        `;
        return;
    }

    // --- フィルタリング ---
    let filteredKeys = keys.filter(k => {
        const cust = ledger[k];
        const q = (query || '').toLowerCase();
        
        // 検索ワード判定（名前、生年月日、メニュー、配合、メモ、タグ）
        if (q) {
            const hasName = (cust.name || '').toLowerCase().includes(q);
            const hasBday = (cust.birthday || '').includes(q);
            const hasElem = (cust.elementName || '').includes(q);
            const hasTags = (cust.tags || []).some(t => t.toLowerCase().includes(q));
            const hasInLogs = (cust.logs || []).some(l => 
                (l.menu || '').toLowerCase().includes(q) ||
                (l.recipe || '').toLowerCase().includes(q) ||
                (l.talk || '').toLowerCase().includes(q) ||
                (l.next || '').toLowerCase().includes(q)
            );
            if (!hasName && !hasBday && !hasElem && !hasTags && !hasInLogs) return false;
        }

        // 五行エレメントフィルター
        if (elemFilter && elemFilter !== 'all') {
            const e = cust.element || (cust.elementName ? cust.elementName.charAt(0) : '');
            if (e !== elemFilter) return false;
        }

        // 性別フィルター
        if (genderFilter && genderFilter !== 'all') {
            if (cust.gender !== genderFilter) return false;
        }

        // ステータスフィルター
        if (statusFilter && statusFilter !== 'all') {
            const days = getDaysSince(cust.lastVisited);
            if (statusFilter === 'due' && (days < 45 || days > 60)) return false;
            if (statusFilter === 'recent' && days > 30) return false;
            if (statusFilter === 'dormant' && days <= 60) return false;
        }

        return true;
    });

    // --- ソート ---
    filteredKeys.sort((a, b) => {
        const custA = ledger[a];
        const custB = ledger[b];

        if (sortOrder === 'lastVisitedAsc') {
            return (custA.lastVisited || '1970-01-01').localeCompare(custB.lastVisited || '1970-01-01');
        } else if (sortOrder === 'logsCountDesc') {
            const lenA = custA.logs ? custA.logs.length : 0;
            const lenB = custB.logs ? custB.logs.length : 0;
            return lenB - lenA;
        } else if (sortOrder === 'nameAsc') {
            return (custA.name || '').localeCompare(custB.name || '', 'ja');
        } else {
            // default: lastVisitedDesc
            return (custB.lastVisited || '1970-01-01').localeCompare(custA.lastVisited || '1970-01-01');
        }
    });

    listEl.innerHTML = '';

    if (filteredKeys.length === 0) {
        listEl.innerHTML = '<div style="text-align: center; padding: 2rem; color: #94a3b8;">条件に一致するお客様カルテは見つかりませんでした。</div>';
        return;
    }

    filteredKeys.forEach(k => {
        const cust = ledger[k];
        const latestLog = (cust.logs && cust.logs.length > 0) ? cust.logs[0] : null;
        const genderMark = cust.gender === 'male' ? '👨' : '👩';
        const daysSinceLast = getDaysSince(cust.lastVisited);
        const isDue = (daysSinceLast >= 45 && daysSinceLast <= 60);

        const card = document.createElement('div');
        card.className = 'crm-customer-card';

        card.innerHTML = `
            <div style="flex: 1; min-width: 260px;">
                <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px; flex-wrap: wrap;">
                    <strong style="font-size: 1.1rem; color: #fff;">${genderMark} ${cust.name} 様</strong>
                    <span style="font-size: 0.75rem; padding: 2px 8px; background: rgba(245, 158, 11, 0.2); border: 1px solid #f59e0b; color: #fef08a; border-radius: 12px; font-weight: 700;">
                        ${cust.dayTenkan}（${cust.elementName}）
                    </span>
                    <span style="font-size: 0.75rem; color: #94a3b8;">🎂 ${cust.birthday}</span>
                    ${isDue ? `<span class="crm-badge-due">🔔 次回開運日目安（${daysSinceLast}日前）</span>` : ''}
                </div>
                
                <div style="font-size: 0.8rem; color: #cbd5e1; display: flex; gap: 12px; margin-bottom: 4px; flex-wrap: wrap;">
                    <span>📜 来店: <strong>${cust.logs ? cust.logs.length : 0}回</strong></span>
                    ${cust.lastVisited ? `<span style="color: #38bdf8;">🕒 最終: ${cust.lastVisited} (${daysSinceLast}日前)</span>` : ''}
                </div>

                <!-- タグ一覧 -->
                <div style="display: flex; gap: 4px; flex-wrap: wrap; margin-bottom: 4px;">
                    ${(cust.tags || []).map(t => `<span class="crm-custom-tag">${t}</span>`).join('')}
                </div>

                <!-- 直近配合プレビュー -->
                ${latestLog && latestLog.recipe ? `
                    <div style="font-size: 0.75rem; color: #a7f3d0; background: rgba(0,0,0,0.3); padding: 4px 8px; border-radius: 4px; border-left: 2px solid #10b981;">
                        🧪 直近配合: ${latestLog.recipe}
                    </div>
                ` : ''}
            </div>

            <!-- アクションボタン群 -->
            <div style="display: flex; flex-direction: column; gap: 6px; align-items: flex-end; min-width: 140px;">
                <div style="display: flex; gap: 4px;">
                    <button type="button" class="btn-open-detail btn-copy" style="background: rgba(56, 189, 248, 0.2); border-color: #38bdf8; color: #7dd3fc; font-size: 0.75rem; padding: 0.35rem 0.65rem;">
                        📋 詳細カルテ
                    </button>
                    <button type="button" class="btn-load-this-cust btn-submit" style="height: auto; padding: 0.35rem 0.75rem; font-size: 0.75rem; background: linear-gradient(135deg, #10b981 0%, #059669 100%);">
                        ✂️ 呼出
                    </button>
                </div>
                <button type="button" class="btn-delete-this-cust" style="background: none; border: none; color: #f87171; font-size: 0.7rem; cursor: pointer; text-decoration: underline;">
                    カルテ全削除
                </button>
            </div>
        `;

        // 詳細カルテを開く
        card.querySelector('.btn-open-detail').addEventListener('click', () => {
            openCustomerDetailModal(k);
        });

        // カルテ呼出
        card.querySelector('.btn-load-this-cust').addEventListener('click', () => {
            loadCustomerProfile(cust.name, cust.year, cust.month, cust.day, cust.gender);
            document.getElementById('crm-ledger-modal').classList.add('hidden');
        });

        // カルテ全削除
        card.querySelector('.btn-delete-this-cust').addEventListener('click', () => {
            if (confirm(`お客様「${cust.name} 様」のすべてのカルテ履歴を削除してもよろしいですか？`)) {
                delete ledger[k];
                saveCrmLedger(ledger);
                renderCrmLedgerDashboard(query, statusFilter, elemFilter, genderFilter, sortOrder);
            }
        });

        listEl.appendChild(card);
    });
}

/**
 * 顧客詳細カルテモーダルの表示＆編集
 */
function openCustomerDetailModal(custKey) {
    const detailModal = document.getElementById('crm-detail-modal');
    if (!detailModal) return;

    const ledger = getCrmLedger();
    const cust = ledger[custKey];
    if (!cust) return;

    const salonData = SALON_DATA[cust.dayTenkan] || SALON_DATA['甲'];
    const genderData = (cust.gender === 'male' && salonData.male) ? salonData.male : salonData.female;

    document.getElementById('crm-detail-name').textContent = `${cust.name} 様 の詳細カルテ`;
    const badge = document.getElementById('crm-detail-badge');
    badge.textContent = `${salonData.icon} ${cust.dayTenkan}（${cust.elementName}）`;
    badge.style.borderColor = salonData.colorBadge;

    document.getElementById('crm-detail-bday').textContent = `${cust.birthday}`;
    document.getElementById('crm-detail-gender').textContent = cust.gender === 'male' ? '👨 男性' : '👩 女性';
    document.getElementById('crm-detail-colors').textContent = genderData.hairAdvice.colors.join('、 ');
    document.getElementById('crm-detail-aroma').textContent = genderData.homeCare.aroma;

    // メイン画面へ呼出ボタン
    const btnLoadMain = document.getElementById('btn-detail-load-main');
    btnLoadMain.onclick = () => {
        loadCustomerProfile(cust.name, cust.year, cust.month, cust.day, cust.gender);
        detailModal.classList.add('hidden');
        document.getElementById('crm-ledger-modal').classList.add('hidden');
    };

    // タグ描画＆管理
    const tagsWrap = document.getElementById('crm-detail-tags-wrap');
    const inputTag = document.getElementById('crm-input-new-tag');
    
    function refreshTags() {
        tagsWrap.innerHTML = '';
        (cust.tags || []).forEach((t, idx) => {
            const chip = document.createElement('span');
            chip.className = 'crm-custom-tag';
            chip.innerHTML = `${t} <span class="btn-remove-tag" data-idx="${idx}">&times;</span>`;
            chip.querySelector('.btn-remove-tag').addEventListener('click', () => {
                cust.tags.splice(idx, 1);
                saveCrmLedger(ledger);
                refreshTags();
            });
            tagsWrap.appendChild(chip);
        });
    }

    refreshTags();

    inputTag.onkeydown = (e) => {
        if (e.key === 'Enter' && inputTag.value.trim()) {
            e.preventDefault();
            if (!cust.tags) cust.tags = [];
            const newT = inputTag.value.trim();
            if (!cust.tags.includes(newT)) {
                cust.tags.push(newT);
                saveCrmLedger(ledger);
                refreshTags();
            }
            inputTag.value = '';
        }
    };

    // タイムライン描画
    const timelineEl = document.getElementById('crm-detail-timeline');
    timelineEl.innerHTML = '';

    if (!cust.logs || cust.logs.length === 0) {
        timelineEl.innerHTML = '<div style="color: #64748b; font-size: 0.85rem; padding: 1rem; text-align: center;">施術ログがありません。</div>';
    } else {
        cust.logs.forEach((log) => {
            const card = document.createElement('div');
            card.style.cssText = `
                background: rgba(30, 41, 59, 0.9);
                border: 1px solid rgba(255,255,255,0.1);
                border-left: 4px solid #38bdf8;
                border-radius: 8px;
                padding: 0.75rem 1rem;
                display: flex;
                flex-direction: column;
                gap: 0.35rem;
            `;

            card.innerHTML = `
                <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 4px;">
                    <span style="font-weight: 800; font-size: 0.9rem; color: #38bdf8;">📅 ${log.date} ｜ ✂️ ${log.menu || '施術'}</span>
                    <button type="button" class="btn-del-detail-log" style="background: none; border: none; color: #ef4444; font-size: 0.75rem; cursor: pointer;">🗑️ 削除</button>
                </div>
                ${log.recipe ? `<div style="font-size: 0.85rem; color: #a7f3d0;"><strong>🧪 配合:</strong> ${log.recipe}</div>` : ''}
                ${log.talk ? `<div style="font-size: 0.8rem; color: #cbd5e1;"><strong>💬 会話:</strong> ${log.talk}</div>` : ''}
                ${log.next ? `<div style="font-size: 0.8rem; color: #f472b6;"><strong>🌟 次回提案:</strong> ${log.next}</div>` : ''}
                ${(log.photoBefore || log.photoAfter) ? `
                    <div class="log-photo-strip">
                        ${log.photoBefore ? `
                            <div class="log-photo-thumb-wrap" title="タップで写真を拡大比較">
                                <img src="${log.photoBefore}" class="log-photo-thumb-img" alt="Before">
                                <span class="log-photo-tag">Before</span>
                            </div>
                        ` : ''}
                        ${log.photoAfter ? `
                            <div class="log-photo-thumb-wrap" title="タップで写真を拡大比較">
                                <img src="${log.photoAfter}" class="log-photo-thumb-img" alt="After">
                                <span class="log-photo-tag" style="color:#a7f3d0;">After</span>
                            </div>
                        ` : ''}
                        <span style="font-size: 0.7rem; color: #38bdf8; align-self: center; cursor: pointer;">🔍 写真を拡大比較</span>
                    </div>
                ` : ''}
            `;

            if (log.photoBefore || log.photoAfter) {
                const photoStrip = card.querySelector('.log-photo-strip');
                if (photoStrip) {
                    photoStrip.addEventListener('click', () => {
                        openPhotoCompareModal(log.date, log.photoBefore, log.photoAfter, log.menu);
                    });
                }
            }

            card.querySelector('.btn-del-detail-log').addEventListener('click', () => {
                if (confirm(`${log.date} の記録を削除しますか？`)) {
                    cust.logs = cust.logs.filter(l => l.id !== log.id);
                    saveCrmLedger(ledger);
                    openCustomerDetailModal(custKey);
                }
            });

            timelineEl.appendChild(card);
        });
    }

    detailModal.classList.remove('hidden');
}

/**
 * CSVエクスポート（Excel対応 BOM付きUTF-8）
 */
function exportCrmToCsv() {
    const ledger = getCrmLedger();
    const keys = Object.keys(ledger);
    if (keys.length === 0) {
        alert('出力できるカルテデータがありません。');
        return;
    }

    let csvContent = '\uFEFF'; // UTF-8 BOM
    csvContent += 'お名前,生年月日,性別,日干,五行タイプ,来店回数,最終来店日,タグ,最新カラー配合,最新会話メモ,最新次回提案\n';

    keys.forEach(k => {
        const c = ledger[k];
        const latest = (c.logs && c.logs.length > 0) ? c.logs[0] : {};
        const row = [
            `"${(c.name || '').replace(/"/g, '""')}"`,
            `"${c.birthday || ''}"`,
            `"${c.gender === 'male' ? '男性' : '女性'}"`,
            `"${c.dayTenkan || ''}"`,
            `"${c.elementName || ''}"`,
            `"${c.logs ? c.logs.length : 0}"`,
            `"${c.lastVisited || ''}"`,
            `"${(c.tags || []).join(' / ')}"`,
            `"${(latest.recipe || '').replace(/"/g, '""')}"`,
            `"${(latest.talk || '').replace(/"/g, '""')}"`,
            `"${(latest.next || '').replace(/"/g, '""')}"`
        ];
        csvContent += row.join(',') + '\n';
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Stargazer_Salon_CRM_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
}

function renderYearlyCalendarSheet(dayTenkan, element, gender) {
    const grid = document.getElementById('staff-yearly-calendar-grid');
    if (!grid) return;
    grid.innerHTML = '';
    const calData = getYearlyCalendarData(dayTenkan, element, gender);
    calData.forEach(item => {
        const card = document.createElement('div');
        card.className = `cal-month-card ${item.isHighlight ? 'highlight' : ''}`;
        card.innerHTML = `
            <div class="cal-month-header" style="display:flex; justify-content:space-between; align-items:center;">
                <span style="font-weight:800; color:#fff; font-size:0.95rem;">${item.month}月</span>
                <span style="font-size:0.65rem; padding:2px 6px; border-radius:12px; font-weight:700; background:rgba(255,255,255,0.1); color:#fef08a;">${item.badge}</span>
            </div>
            <h5 style="font-size:0.8rem; color:#f8fafc; margin:4px 0 2px 0;">${item.theme}</h5>
            <p style="font-size:0.7rem; color:#cbd5e1; margin:0; line-height:1.3;">✂️ ${item.hairAction}</p>
        `;
        grid.appendChild(card);
    });
}

function getYearlyCalendarData(dayTenkan, element, gender) {
    const isMale = gender === 'male';
    const ELEMENT_CALENDAR_MAP = {
        '木': [
            { month: 1, theme: '春の準備・整え', hairAction: '頭皮クレンジング＆毛先カット', badge: '🌱 準備期', isHighlight: false },
            { month: 2, theme: '新スタート・自己飛躍', hairAction: isMale ? '爽やかアップバング＆オリーブカラー' : '軽やかレイヤーカット＆新緑オリーブカラー', badge: '👑 最強開運月', isHighlight: true },
            { month: 3, theme: '人間関係・成長の波', hairAction: isMale ? '柔らかニュアンスパーマ' : 'ふんわりパーマ＆毛先トリートメント', badge: '🌸 魅力UP月', isHighlight: false },
            { month: 4, theme: 'ペース配分・安定', hairAction: isMale ? '頭皮保湿＆眉カット' : 'しっとり高保湿ヘアマスク', badge: '☕ 調整期', isHighlight: false },
            { month: 5, theme: '魅力開花・自己アピール', hairAction: isMale ? '立体ハイライト＆束感ショート' : '透明感ハイライト＆ツヤ出しカラー', badge: '🌟 チャレンジ月', isHighlight: true },
            { month: 6, theme: '情熱・アクティブ期', hairAction: isMale ? '爽快スカルプスパ＆フェードカット' : '紫外線対策トリートメント＆束感カット', badge: '🔥 活性期', isHighlight: false },
            { month: 7, theme: '夏のクールダウン', hairAction: isMale ? '炭酸冷感ヘッドスパ' : '炭酸スキャルプヘッドスパ', badge: '💆‍♀️ デトックス月', isHighlight: false },
            { month: 8, theme: '決断・シャープな変革', hairAction: isMale ? 'スパイキーショート＆秋色カラー' : '毛先を揃えるシャープカット＆秋色カラー', badge: '✂️ 邪気払い月', isHighlight: true },
            { month: 9, theme: '成果・クオリティ向上', hairAction: isMale ? 'スマートな毛流れコンマヘア' : 'プレミアムシルク補修トリートメント', badge: '💎 実り月', isHighlight: false },
            { month: 10, theme: '基盤づくり・安心感', hairAction: isMale ? '深みのある落ち着きダークトーン' : '深みのある落ち着きカラー', badge: '🍂 安定期', isHighlight: false },
            { month: 11, theme: 'インスピレーション・学び', hairAction: isMale ? '頭皮マッサージ＆ツヤ感セット' : 'うるおい高保水ケア＆ヘッドマッサージ', badge: '🌊 充電期', isHighlight: true },
            { month: 12, theme: '年末厄落とし・感謝', hairAction: isMale ? '厄落としカット＆プレミアムスパ' : 'カット＆フルヘアエステ（厄払い）', badge: '✨ 浄化月', isHighlight: false }
        ],
        '火': [
            { month: 1, theme: 'エネルギー蓄積', hairAction: isMale ? '温感頭皮スパ＆毛先整え' : '温感トリートメント＆頭皮マッサージ', badge: '🌱 準備期', isHighlight: false },
            { month: 2, theme: '直感とモチベーションUP', hairAction: isMale ? '軽やかショート＆トーンアップ' : '軽やかカット＆春色トーンアップ', badge: '🌸 魅力UP月', isHighlight: false },
            { month: 3, theme: '人脈拡大・社交期', hairAction: isMale ? '波巻きパーマ＆ツヤ感セット' : '動きのあるウェーブ＆フェイスレイヤー', badge: '🌟 チャレンジ月', isHighlight: true },
            { month: 4, theme: '基盤固め・安心感', hairAction: isMale ? '清潔感重視のナチュラルマッシュ' : 'まとまり重視のボブ＆上品カラー', badge: '☕ 調整期', isHighlight: false },
            { month: 5, theme: '運気絶頂・主役の季節！', hairAction: isMale ? 'ツヤ感かきあげセンターパート＆暖色カラー' : '圧倒的ツヤのチェリー暖色カラー＆女神巻き', badge: '👑 最強開運月', isHighlight: true },
            { month: 6, theme: '大飛躍・ステージUP', hairAction: isMale ? '水性ポマード仕上げ＆刈り上げ' : 'ハイシャイングロスオイル仕上げ', badge: '🔥 飛躍期', isHighlight: false },
            { month: 7, theme: 'クールダウン・デトックス', hairAction: isMale ? '炭酸冷感スカルプスパ' : '炭酸ヘッドスパ＆毛先カット', badge: '💆‍♀️ デトックス月', isHighlight: false },
            { month: 8, theme: '収穫・成果の受け取り', hairAction: isMale ? '秋の上品ブラウン＆頭皮ケア' : '秋の上品ツヤブラウン＆リペアトリートメント', badge: '💎 実り月', isHighlight: true },
            { month: 9, theme: '洗練・美意識の向上', hairAction: isMale ? 'シャープなラインカット' : 'エッジの効いた質感カット', badge: '✨ 洗練期', isHighlight: false },
            { month: 10, theme: '振り返りと基盤づくり', hairAction: isMale ? '深みダークカラー＆頭皮保湿' : '深みカラー＆頭皮保湿', badge: '🍂 安定期', isHighlight: false },
            { month: 11, theme: '静寂と充電・邪気払い', hairAction: isMale ? '毛先の厄落としカット' : 'ダメージ毛先の厄落としカット', badge: '✂️ 邪気払い月', isHighlight: true },
            { month: 12, theme: '年末リセット＆輝き再生', hairAction: isMale ? '極上ヘッドスパ＆年末カット' : '最高峰トリートメント＆年末カット', badge: '✨ 浄化月', isHighlight: false }
        ],
        '土': [
            { month: 1, theme: '新春の土台固め', hairAction: isMale ? 'クラシックバーバーショート＆頭皮ケア' : '重め上品ボブ＆濃密アミノ酸ケア', badge: '⛰️ 土台月', isHighlight: true },
            { month: 2, theme: '新展開への好奇心', hairAction: isMale ? '軽やかナチュラルショート' : '毛先を軽くしたナチュラルショート', badge: '🌱 成長期', isHighlight: false },
            { month: 3, theme: '柔軟性と人脈づくり', hairAction: isMale ? '柔らかミルクティーカラー' : '柔らかなミルクティーベージュ', badge: '🌸 魅力UP月', isHighlight: false },
            { month: 4, theme: '安心と包容力の発揮', hairAction: isMale ? 'ショコラブラウン＆筋膜リリーススパ' : 'ショコラブラウン＆頭皮筋膜リリーススパ', badge: '👑 最強開運月', isHighlight: true },
            { month: 5, theme: 'エネルギー活性・社交', hairAction: isMale ? 'くしゅっとパーマ＆ツヤセット' : '華やかウェーブ＆ツヤトリートメント', badge: '🔥 活性期', isHighlight: false },
            { month: 6, theme: '情熱とアウトプット', hairAction: isMale ? '軽やかミディアム＆バームセット' : '軽やかミディアム＆シアバター仕上げ', badge: '🌟 チャレンジ月', isHighlight: false },
            { month: 7, theme: '夏のメンテナンス＆充電', hairAction: isMale ? 'スカルプクレンジングスパ' : 'クレンジングスパ＆毛先整えカット', badge: '💆‍♀️ デトックス月', isHighlight: true },
            { month: 8, theme: '知性と直感の冴え', hairAction: isMale ? 'アイスグレージュ＆シャープライン' : 'アイスグレージュ＆シャープライン', badge: '💎 洗練期', isHighlight: false },
            { month: 9, theme: '成果の収穫と喜び', hairAction: isMale ? 'リッチマロンカラー＆極上スパ' : 'リッチマロンカラー＆極上ヘアエステ', badge: '🌾 収穫期', isHighlight: false },
            { month: 10, theme: '年間集大成・安定運', hairAction: isMale ? '上品バーバーカット＆バームケア' : '上品ワンレン＆オーガニックバームケア', badge: '👑 安定達成月', isHighlight: true },
            { month: 11, theme: '金運と人脈の広がり', hairAction: isMale ? 'しっとり高保湿スカルプケア' : 'しっとり高保湿トリートメント', badge: '💰 豊かさ月', isHighlight: false },
            { month: 12, theme: '年末浄化＆大掃除', hairAction: isMale ? '厄落としカット＆スカルプスパ' : '厄落としカット＆スカルプスパ', badge: '✂️ 邪気払い月', isHighlight: false }
        ],
        '金': [
            { month: 1, theme: '冷静な計画・リセット', hairAction: isMale ? 'タイトショート＆頭皮クレンジング' : 'タイトストレート＆頭皮クレンジング', badge: '☕ 調整期', isHighlight: false },
            { month: 2, theme: '新しい挑戦と成果', hairAction: isMale ? 'スパイキーショート＆プラチナカラー' : 'ハンサムショート＆プラチナカラー', badge: '🌟 チャレンジ月', isHighlight: true },
            { month: 3, theme: 'スピードと行動力', hairAction: isMale ? 'フェードカット＆ジェットモヒカン' : 'エッジの効いた切りっぱなしボブ', badge: '⚔️ 行動期', isHighlight: false },
            { month: 4, theme: 'サポートと自己投資', hairAction: isMale ? 'スカルプ育毛トリートメント' : 'プレックストリートメント（内部補修）', badge: '🌱 充電期', isHighlight: false },
            { month: 5, theme: '情熱と試練を乗り越える', hairAction: isMale ? '艶やかダークアッシュ＆毛先ケア' : '艶やかダークアッシュ＆毛先ケア', badge: '🔥 鍛錬期', isHighlight: true },
            { month: 6, theme: '社交と自己表現', hairAction: isMale ? '立体メッシュハイライト＆束感カット' : '束感ハイライト＆軽やかカット', badge: '🌸 魅力UP月', isHighlight: false },
            { month: 7, theme: '夏のリフレッシュ', hairAction: isMale ? '冷感ミントスカルプスパ' : '冷感ミントヘッドスパ＆毛先整え', badge: '💆‍♀️ デトックス月', isHighlight: false },
            { month: 8, theme: '自己最高潮！圧倒的研ぎ澄まし', hairAction: isMale ? 'アイスグレージュ＆シャープフェード' : 'アイスグレージュ＆シャープカット', badge: '👑 最強開運月', isHighlight: true },
            { month: 9, theme: '宝石の輝き・収穫の秋', hairAction: isMale ? '韓国風フェザーコンマヘア＆艶カラー' : '最高級シルクトリートメント＆艶カラー', badge: '💎 輝き月', isHighlight: false },
            { month: 10, theme: '土台固め・実りの整理', hairAction: isMale ? 'まとまりショート＆オイルケア' : 'まとまりボブ＆リッチセラムケア', badge: '🍂 安定期', isHighlight: false },
            { month: 11, theme: '柔軟性と知性の発揮', hairAction: isMale ? 'さらツヤセンターパート＆潤いミルク' : 'みずみずしいストレート＆潤いミルク', badge: '🌊 発揮期', isHighlight: true },
            { month: 12, theme: '年末厄払い＆刀磨き', hairAction: isMale ? '毛先を研ぎ澄ますシャープカット' : '毛先1cmカット（切れ味復活）＆トリートメント', badge: '✂️ 邪気払い月', isHighlight: false }
        ],
        '水': [
            { month: 1, theme: '静かな知性と計画', hairAction: isMale ? '頭皮保湿スパ＆スマートショート' : 'しっとり潤いトリートメント＆頭皮スパ', badge: '🌊 静寂期', isHighlight: false },
            { month: 2, theme: '新しい流れ・発信', hairAction: isMale ? 'ウルフパーマ＆ブルーブラック' : '動きのあるウルフカット＆ブルーブラック', badge: '🌱 新展開期', isHighlight: true },
            { month: 3, theme: '成長とコミュニケーション', hairAction: isMale ? '柔らかシースルーマッシュ＆アッシュ' : '柔らかワンカールミディ＆透明感アッシュ', badge: '🌸 魅力UP月', isHighlight: false },
            { month: 4, theme: '立ち止まり・調整', hairAction: isMale ? '頭皮と首肩のデトックススパ' : '頭皮と首肩のデトックスマッサージ', badge: '☕ 調整期', isHighlight: false },
            { month: 5, theme: '情熱と社交・人脈拡大', hairAction: isMale ? 'ウェットジェルスタイリング＆ツヤカラー' : 'ウェットスタイリング＆ツヤ出しカラー', badge: '🔥 活性期', isHighlight: true },
            { month: 6, theme: '成果とアクティブ期', hairAction: isMale ? 'かきあげツーブロック＆スパイラル' : 'かきあげバング＆軽やかウェーブ', badge: '🌟 チャレンジ月', isHighlight: false },
            { month: 7, theme: '夏のエネルギー調整', hairAction: isMale ? 'マリンミネラル炭酸スパ' : 'マリンミネラル炭酸スパ', badge: '💆‍♀️ デトックス月', isHighlight: false },
            { month: 8, theme: '知性と充電・サポート', hairAction: isMale ? '高保湿スカルプケア＆整えカット' : '高保湿ヘアマスク＆毛先整えカット', badge: '💎 充電期', isHighlight: true },
            { month: 9, theme: 'インスピレーションの開花', hairAction: isMale ? '深みダークモカ＆ツヤセンターパート' : '深みのあるダークモカ＆ツヤストレート', badge: '✨ インスピレーション期', isHighlight: false },
            { month: 10, theme: '邪気払い・軌道修正', hairAction: isMale ? '毛先の厄落としカット＆スカルプスパ' : '傷んだ毛先のカット＆厄落としスパ', badge: '✂️ 邪気払い月', isHighlight: false },
            { month: 11, theme: '運気絶頂！大波に乗る', hairAction: isMale ? 'ワイルドかきあげパーマ＆高保水ケア' : 'ドラマチックなロングウェーブ＆高保水ケア', badge: '👑 最強開運月', isHighlight: true },
            { month: 12, theme: '年末浄化＆大航海へ', hairAction: isMale ? 'プレミアムスカルプエステ＆年末カット' : 'プレミアムヘアエステ＆年末カット', badge: '✨ 浄化大航海月', isHighlight: false }
        ]
    };
    return ELEMENT_CALENDAR_MAP[element] || ELEMENT_CALENDAR_MAP['木'];
}

/**
 * HTML5 Canvasによる 1080x1920 高解像度 SNS/待ち受けカード生成（文字はみ出し完全防止版）
 */
function generateSNSCardImage(name, birthday, dayTenkan, data, luckyPeriod, callback) {
    const canvas = document.getElementById('card-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = 1080;
    const H = 1920;

    function fillWrappedText(text, x, y, maxWidth, lineHeight, align) {
        ctx.textAlign = align || 'left';
        const chars = text.split('');
        let line = '';
        let currentY = y;
        for (let n = 0; n < chars.length; n++) {
            const testLine = line + chars[n];
            const metrics = ctx.measureText(testLine);
            if (metrics.width > maxWidth && n > 0) {
                ctx.fillText(line, x, currentY);
                line = chars[n];
                currentY += lineHeight;
            } else {
                line = testLine;
            }
        }
        ctx.fillText(line, x, currentY);
        return currentY;
    }

    function fillFitText(text, x, y, maxWidth, baseSize, fontFamily, isBold, align) {
        ctx.textAlign = align || 'center';
        let size = baseSize;
        ctx.font = (isBold ? 'bold ' : '') + size + 'px ' + (fontFamily || '"Noto Sans JP", sans-serif');
        while (ctx.measureText(text).width > maxWidth && size > 16) {
            size -= 2;
            ctx.font = (isBold ? 'bold ' : '') + size + 'px ' + (fontFamily || '"Noto Sans JP", sans-serif');
        }
        ctx.fillText(text, x, y);
    }

    // 1. 背景グラデーション
    const bgGrad = ctx.createLinearGradient(0, 0, W, H);
    bgGrad.addColorStop(0, '#090d16');
    bgGrad.addColorStop(0.5, '#121a2b');
    bgGrad.addColorStop(1, '#070a10');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, W, H);

    // 2. オーラグロー効果
    const auraGrad = ctx.createRadialGradient(W / 2, 540, 50, W / 2, 540, 480);
    auraGrad.addColorStop(0, (data.colorBadge || '#f59e0b') + '55');
    auraGrad.addColorStop(0.6, (data.colorBadge || '#f59e0b') + '15');
    auraGrad.addColorStop(1, 'transparent');
    ctx.fillStyle = auraGrad;
    ctx.beginPath();
    ctx.arc(W / 2, 540, 480, 0, Math.PI * 2);
    ctx.fill();

    // 3. ラグジュアリー外枠・コーナー装飾
    ctx.strokeStyle = '#d97706';
    ctx.lineWidth = 4;
    ctx.strokeRect(50, 50, W - 100, H - 100);

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.lineWidth = 2;
    ctx.strokeRect(65, 65, W - 130, H - 130);

    const cornerSize = 40;
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 6;
    ctx.beginPath(); ctx.moveTo(40, 40 + cornerSize); ctx.lineTo(40, 40); ctx.lineTo(40 + cornerSize, 40); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(W - 40 - cornerSize, 40); ctx.lineTo(W - 40, 40); ctx.lineTo(W - 40, 40 + cornerSize); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(40, H - 40 - cornerSize); ctx.lineTo(40, H - 40); ctx.lineTo(40 + cornerSize, H - 40); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(W - 40 - cornerSize, H - 40); ctx.lineTo(W - 40, H - 40); ctx.lineTo(W - 40, H - 40 - cornerSize); ctx.stroke();

    // 4. ブランドタイトル
    ctx.fillStyle = '#f59e0b';
    ctx.letterSpacing = '4px';
    fillFitText('STARGAZER SALON', W / 2, 135, 800, 36, '"Outfit", sans-serif', true, 'center');

    ctx.fillStyle = '#94a3b8';
    ctx.letterSpacing = '1px';
    fillFitText('PERSONAL FORTUNE & HAIR BEAUTY CARTE', W / 2, 175, 800, 22, '"Noto Sans JP", sans-serif', false, 'center');

    // 5. お客様ネーム
    ctx.fillStyle = '#ffffff';
    fillFitText(name + ' 様 の開運カルテ', W / 2, 255, 780, 42, '"Noto Sans JP", sans-serif', true, 'center');

    // 6. エレメントシンボルアイコン ＆ タイトル
    ctx.textAlign = 'center';
    ctx.font = '90px sans-serif';
    ctx.fillText(data.icon, W / 2, 410);

    ctx.fillStyle = 'rgba(18, 26, 43, 0.9)';
    ctx.strokeStyle = data.colorBadge || '#f59e0b';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.roundRect(W / 2 - 260, 455, 520, 75, 38);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#ffffff';
    fillFitText(dayTenkan + '（' + data.elementName + '）タイプ', W / 2, 508, 480, 36, '"Noto Sans JP", sans-serif', true, 'center');

    // 7. キャッチコピー
    ctx.fillStyle = '#fef08a';
    ctx.font = 'bold 30px "Noto Sans JP", sans-serif';
    const catchText = '「' + data.catchphrase + '」';
    if (ctx.measureText(catchText).width > 860) {
        ctx.font = 'bold 26px "Noto Sans JP", sans-serif';
        fillWrappedText(catchText, W / 2, 580, 840, 38, 'center');
    } else {
        ctx.fillText(catchText, W / 2, 595);
    }

    // 8. 開運ヘアカラーセクション
    ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(90, 660, W - 180, 270, 20);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#10b981';
    fillFitText('✨ LUCKY HAIR COLOR ✨', W / 2, 705, 800, 24, '"Outfit", sans-serif', true, 'center');

    const startX = 220;
    const gapX = 320;
    const colors = data.hairAdvice.colors.slice(0, 3);
    colors.forEach((colName, idx) => {
        const cx = startX + idx * gapX;
        const cy = 785;

        ctx.fillStyle = data.colorBadge || '#059669';
        ctx.beginPath();
        ctx.arc(cx, cy, 38, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 3;
        ctx.stroke();

        ctx.fillStyle = '#ffffff';
        fillFitText(colName, cx, cy + 68, 260, 22, '"Noto Sans JP", sans-serif', true, 'center');
    });

    // 9. 開運スタイル ＆ アロマ処方箋
    ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(90, 960, W - 180, 590, 20);
    ctx.fill();
    ctx.stroke();

    let curY = 1015;

    ctx.textAlign = 'left';
    ctx.fillStyle = '#38bdf8';
    ctx.font = 'bold 28px "Noto Sans JP", sans-serif';
    ctx.fillText('✂️ 運気を拓くヘアスタイル:', 130, curY);
    curY += 45;

    ctx.fillStyle = '#e2e8f0';
    ctx.font = '20px "Noto Sans JP", sans-serif';
    data.hairAdvice.styles.slice(0, 3).forEach((st) => {
        curY = fillWrappedText('・ ' + st, 140, curY, 800, 28, 'left') + 34;
    });

    curY += 10;

    if (data.homeCare) {
        ctx.fillStyle = '#f59e0b';
        ctx.font = 'bold 26px "Noto Sans JP", sans-serif';
        ctx.fillText('🛍️ 開運アロマ＆ホームケア:', 130, curY);
        curY += 38;

        ctx.fillStyle = '#a7f3d0';
        ctx.font = '20px "Noto Sans JP", sans-serif';
        curY = fillWrappedText('🌿 香り: ' + data.homeCare.aroma, 140, curY, 800, 28, 'left') + 34;

        ctx.fillStyle = '#e2e8f0';
        curY = fillWrappedText('🧴 ケア: ' + data.homeCare.product, 140, curY, 800, 28, 'left');
    }

    // 10. 次回開運日バナー
    ctx.fillStyle = 'rgba(16, 185, 129, 0.2)';
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.roundRect(90, 1600, W - 180, 140, 24);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#a7f3d0';
    fillFitText('🌟 次回おすすめの開運メンテナンス時期', W / 2, 1648, 800, 26, '"Noto Sans JP", sans-serif', true, 'center');

    ctx.fillStyle = '#ffffff';
    fillFitText(luckyPeriod, W / 2, 1705, 800, 34, '"Noto Sans JP", sans-serif', true, 'center');

    // 11. フッター
    ctx.fillStyle = '#94a3b8';
    fillFitText('Hair & Mind Salon Stargazer ✨ 外見を美しく、心を軽やかに。', W / 2, 1820, 800, 24, '"Noto Sans JP", sans-serif', true, 'center');

    if (callback) {
        callback(canvas.toDataURL('image/png'));
    }
}
