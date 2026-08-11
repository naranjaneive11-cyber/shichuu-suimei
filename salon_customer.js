/**
 * お客様用タブレット専用：開運ヘア診断ロジック (性別対応・男女別スタイル＆トーン最適化版)
 */

// 四柱推命 基本データ
const TENKAN = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
const CHISHI = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];

// お客様向けリッチ診断データ（女性向け / 男性向け 2系統完備）
const CUSTOMER_FORTUNE_DATA = {
    '甲': {
        element: '木',
        elementName: '木（大樹）',
        colorTheme: '#10b981',
        bgGradient: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(6, 78, 59, 0.4))',
        icon: '🌲',
        title: 'まっすぐ上を目指す大樹タイプ',
        hairColors: [
            { name: 'オリーブアッシュ', code: '#556b2f', desc: '赤みを消して透明感を高める、成長と癒やしのグリーン系' },
            { name: 'ミントグレージュ', code: '#5f8a7e', desc: '爽やかで洗練された印象を与える都会的カラー' },
            { name: 'フォレストカーキ', code: '#4a5d4e', desc: '深みのある落ち着きと、知的な大人の抜け感を演出' }
        ],
        female: {
            catchphrase: '芯が強く誠実。向上心にあふれる生まれながらのリーダー',
            personality: '大地にどっしり根を張り、太陽に向かって真っ直ぐ伸びる大樹のように、高い志と強い正義感をお持ちです。困難があっても簡単には折れない粘り強さと、周囲を引っ張る頼もしさがあなたの魅力です。',
            mindAdvice: '時には「弱音を吐くこと」も大樹の成長には大切。髪を整えて軽やかさを取り入れることで、肩の力が抜け、より大きなチャンスを引き寄せます。',
            texture: '風になびくエアリーな質感・指通りの良いサラサラ感',
            twoWayStyles: {
                on: {
                    title: '知的なアップバング・くびれセミディ',
                    desc: '顔周りをすっきり明るく見せ、信頼感とリーダーシップを引き出すシャープなシルエット。'
                },
                off: {
                    title: '軽やかレイヤー＆風になびく外ハネ',
                    desc: '肩の力を抜いて自然体になれるエアリースタイル。リラックスした休日の魅力を解放。'
                }
            },
            styles: [
                '動きのあるレイヤーカットで軽やかさをプラス',
                '首元をすっきり見せるくびれミディアム',
                '前髪を軽く流して表情を明るく魅せるスタイル',
                'ナチュラルな外ハネボブ'
            ],
            luckyCare: '頭皮のクレンジング＆炭酸ヘッドスパ（頭皮の巡りを良くすると直感力UP）',
            homeCare: {
                aroma: 'ヒノキ・フォレスト・ベルガモット（新緑の深呼吸アロマ）',
                shampoo: 'スキャルプクリア＆ボタニカルシャンプー（頭皮の巡りと根元の立ち上がりをサポート）',
                styling: 'エアリーボタニカルヘアオイル（風になびく軽やかサラサラ仕上げ）',
                advice: '朝のスタイリング時に森の香りをまとうことで、ブレない決断力と前向きな活力が湧いてきます。'
            }
        },
        male: {
            catchphrase: '高い志と誠実さで人を惹きつける、爽やか頼れるリーダー',
            personality: '真っ直ぐに天へ伸びる大樹のように、揺るぎない信念とリーダーシップをお持ちです。困難にも堂々と立ち向かう誠実さと頼もしさで、ビジネスやコミュニティで自然と人がついてくる器の大きさがあります。',
            mindAdvice: '常に前を向いて突っ走りがち。頭皮をリフレッシュして頭の熱を冷ますことで、より広い視野と冷静な決断力が手に入ります。',
            texture: 'トップの立ち上がりと清潔感あふれるナチュラルな束感',
            twoWayStyles: {
                on: {
                    title: '爽やかアップバング・ビジネスクロップ',
                    desc: 'おでこをすっきり出し、知性と圧倒的な信頼感を与えるデキる男のショートスタイル。'
                },
                off: {
                    title: '毛先を遊ばせるナチュラルフェードマッシュ',
                    desc: 'サイドをすっきり刈り上げつつ、トップに遊び心を持たせた休日リラックスヘア。'
                }
            },
            styles: [
                '爽やかアップバングショート',
                '清潔感あふれる刈り上げフェードマッシュ',
                '束感を強調したスパイキーショート',
                '知的なセンターパート'
            ],
            luckyCare: '炭酸スカルプディープクレンジング＆頭皮指圧スパ（頭皮の皮脂を流し仕事運UP）',
            homeCare: {
                aroma: 'シダーウッド・ユーカリ・ベルガモット（男の爽快森林アロマ）',
                shampoo: 'スカルプクリア炭酸シャンプー（頭皮のベタつき・匂いを根本からリセット）',
                styling: 'マットハードワックス＆スキャルプトニック（根元の立ち上がりを一日中強力キープ）',
                advice: '朝のセットでトップに立ち上がりをつけると、自信と仕事運が一気に高まります。'
            }
        }
    },
    '乙': {
        element: '木',
        elementName: '木（草花）',
        colorTheme: '#059669',
        bgGradient: 'linear-gradient(135deg, rgba(5, 150, 105, 0.15), rgba(4, 120, 87, 0.3))',
        icon: '🌿',
        title: '可憐に咲く草花タイプ',
        hairColors: [
            { name: 'ピスタチオベージュ', code: '#8a9a5b', desc: '肌なじみが良く、ふんわり柔らかな印象を与える人気色' },
            { name: 'シアーオリーブ', code: '#6b8e23', desc: '光に透けるような軽さと透明感をもたらすアースカラー' },
            { name: 'ソフトシナモン', code: '#8b5a2b', desc: '温かみのある優しさと可愛らしさを引き立てるブラウン' }
        ],
        female: {
            catchphrase: '誰からも愛される、しなやかで優しい癒やしの人',
            personality: '道端に咲く可憐な花やしなやかな蔦のように、どんな環境にも柔軟に適応できる協調性の持ち主です。周りの人を自然と和ませる親しみやすさと、ピンチでも生き抜く芯の強さがあります。',
            mindAdvice: '周りに気を遣いすぎて疲れてしまうことも。自分を一番に大切にする「ご褒美時間」をヘアサロンで作ることがエネルギーチャージの秘訣です。',
            texture: '思わず触れたくなるような、ふんわり柔らかくソフトな質感',
            twoWayStyles: {
                on: {
                    title: '上品ハーフアップ＆丸みショートボブ',
                    desc: '好感度抜群の清潔感と、誰からも親しまれる柔らかな抜け感を両立。'
                },
                off: {
                    title: 'ゆるふわニュアンスウェーブ＆シースルーバング',
                    desc: '草花のように可憐で愛らしい動き。思わず触れたくなる柔らかいオフスタイル。'
                }
            },
            styles: [
                'ゆるふわニュアンスウェーブ',
                '毛先に丸みをつけた愛されボブ',
                'シースルーバングで柔らかな抜け感',
                '清楚なハーフアップアレンジ'
            ],
            luckyCare: 'アミノ酸濃密トリートメント（毛先のパサつきを抑えて良縁を引き寄せる）',
            homeCare: {
                aroma: 'カモミール・ジャスミン・グリーンアップル（フローラルハーブ）',
                shampoo: 'アミノ酸シルキーモイストシャンプー（毛先まで吸い付くような潤い）',
                styling: 'メルティホイップフォーム（もみこむだけでコテ巻きふんわり感復活）',
                advice: 'お出かけ前に毛先にホイップを揉み込むと、ふんわり柔らかなご縁が引き寄せられます。'
            }
        },
        male: {
            catchphrase: '誰からも親しまれる柔らかさと、柔軟な適応力を持つ人気者',
            personality: 'しなやかに風にそよぐ草花のように、親しみやすく誰とでも打ち解けられる社交性の持ち主です。空気を読むのが上手で、場の雰囲気を柔らかく和ませる天性の愛され力を持っています。',
            mindAdvice: '相手に合わせすぎて自分の本音を我慢しがち。柔らかいパーマスタイルで自分らしさを表現すると、自然体で人間関係がもっと楽になります。',
            texture: 'ふんわり柔らかな空気感・ナチュラルな毛流れと束感',
            twoWayStyles: {
                on: {
                    title: 'スマートなナチュラルマッシュ（清潔感）',
                    desc: '前髪を自然に流し、耳周りをすっきり整えた誰からも好印象なオフィスヘア。'
                },
                off: {
                    title: 'ゆるめニュアンススパイラルパーマ',
                    desc: 'くしゅっと揉み込むだけでこなれ感が出る、優しげでおしゃれな休日スタイル。'
                }
            },
            styles: [
                'ニュアンススパイラルパーマ',
                '韓流ナチュラルマッシュ',
                '柔らかい束感ショート',
                'カルマヘア（前髪分けスタイル）'
            ],
            luckyCare: 'アミノ酸保湿スカルプケア（乾燥を防ぎ頭皮に潤いチャージ）',
            homeCare: {
                aroma: 'カモミール・ベルガモット・ホワイトティー（心ほどける癒やしアロマ）',
                shampoo: 'アミノ酸マイルドモイストシャンプー（髪と頭皮を優しく洗い上げる）',
                styling: 'ナチュラルヘアバーム＆ソフトワックス（固めすぎず柔らかな束感をキープ）',
                advice: 'バームを手ぐしでササッとなじませるだけで、30秒でサロン級のこなれ感が出ます。'
            }
        }
    },
    '丙': {
        element: '火',
        elementName: '火（太陽）',
        colorTheme: '#f59e0b',
        bgGradient: 'linear-gradient(135deg, rgba(245, 158, 11, 0.2), rgba(220, 38, 38, 0.3))',
        icon: '☀️',
        title: '世界を照らす太陽タイプ',
        hairColors: [
            { name: 'チェリーピンク', code: '#c71585', desc: 'お顔の血色感をぐんと引き上げ、主役オーラを放つ華やかカラー' },
            { name: 'アプリコットオレンジ', code: '#fb923c', desc: 'フレッシュで親しみやすい元気な魅力を最大化' },
            { name: 'ウォームブラウン', code: '#a0522d', desc: '光を味方にしてリッチなツヤを放つ王道上品カラー' }
        ],
        female: {
            catchphrase: '場をパッと明るく照らす圧倒的スター性・情熱のカリスマ',
            personality: '天空で燦々と輝く太陽のように、明るく情熱的で周囲を巻き込むエネルギーに溢れています。裏表がなくポジティブで、その場にいるだけでみんなを元気にできる天性の華やかさを持っています。',
            mindAdvice: 'いつも元気に振る舞ってエネルギーを放出しがち。髪のツヤと血色感をしっかり補給して、あなた自身の内なる輝きを充電しましょう。',
            texture: '光を反射してキラキラ輝くハイシャイン・リッチなツヤ感',
            twoWayStyles: {
                on: {
                    title: '洗練かきあげバング＆韓国風ヨシンモリ',
                    desc: '堂々としたカリスマ性を発揮。ひと目で惹きつける圧倒的主役スタイル。'
                },
                off: {
                    title: '高めポニーテール＆顔周り華やかレイヤー',
                    desc: '太陽のような明るさと躍動感を全開にするアクティブ＆ゴージャスヘア。'
                }
            },
            styles: [
                '韓国風大ぶりヨシンモリ巻き',
                '華やかなロングウェーブ',
                '色気とかっこよさを両立するかきあげバング',
                'コントラストを効かせたハイライトカラー'
            ],
            luckyCare: '高濃度ケラチン・グロストリートメント（太陽の光を反射するツヤをチャージ）',
            homeCare: {
                aroma: 'ダマスクローズ・スイートオレンジ・イランイラン（太陽の華やかアロマ）',
                shampoo: 'カラーキープ＆ハイシャインシャンプー（暖色カラーの鮮やかさを長持ちキープ）',
                styling: 'ハイシャインプレミアムグロスオイル（光を反射して一日中リッチな輝き）',
                advice: '仕上げにグロスオイルをひと撫でするだけで、あなたの放つオーラと運気が倍増します。'
            }
        },
        male: {
            catchphrase: 'その場にいるだけで周りを明るくする、圧倒的華やかオーラの主役',
            personality: '燦々と照らす太陽のように、明るく情熱的で人を惹きつける天性のスター性を持っています。裏表のないストレートな魅力と堂々とした自信で、どこに行っても中心人物として注目されます。',
            mindAdvice: '熱くなりすぎて空回りすることも。ツヤのある洗練されたスタイリングで大人の色気をプラスすると、より説得力が増します。',
            texture: '光を反射するウェットなツヤ感・躍動感ある立体的な毛束',
            twoWayStyles: {
                on: {
                    title: '色気と迫力のツヤかきあげセンターパート',
                    desc: 'おでこを出して大人の色気とオーラを放つ、洗練された主役スタイル。'
                },
                off: {
                    title: '躍動感あふれる波巻きスパイラルパーマ',
                    desc: '太陽のような情熱と遊び心を全開にする、エネルギッシュなストリートヘア。'
                }
            },
            styles: [
                'ツヤ感センターパート',
                '波巻きスパイラルパーマ',
                '立体ハイライトショート',
                'グランジマッシュ'
            ],
            luckyCare: '高濃度ケラチントリートメント（ツヤをチャージして主役オーラ全開）',
            homeCare: {
                aroma: 'スイートオレンジ・サンダルウッド・ブラックペッパー（情熱のスパイシーアロマ）',
                shampoo: 'カラーキープスカルプシャンプー（カラーの鮮やかさと頭皮の健康を両立）',
                styling: '水性プレミアムポマード / グリース（ギラつかない上品なウェットツヤ）',
                advice: 'ポマードでツヤを出すだけで、あなたの放つカリスマオーラと勝負運が急上昇します。'
            }
        }
    },
    '丁': {
        element: '火',
        elementName: '火（灯火）',
        colorTheme: '#dc2626',
        bgGradient: 'linear-gradient(135deg, rgba(220, 38, 38, 0.2), rgba(127, 29, 29, 0.4))',
        icon: '🕯️',
        catchphrase: '心に熱い炎を秘めた、美意識の高いスペシャリスト',
        title: '暗闇を照らす灯火タイプ',
        hairColors: [
            { name: 'ワインレッド', code: '#722f37', desc: '大人の色気と落ち着いた品格を醸し出す深みカラー' },
            { name: 'バーガンディ', code: '#800020', desc: '光に当たるとほんのり透ける、ミステリアスな美しさ' },
            { name: 'ディープローズ', code: '#65000b', desc: '上品でしっとりとした深みと艶を与える濃厚カラー' }
        ],
        female: {
            catchphrase: '心に熱い炎を秘めた、美意識の高いスペシャリスト',
            personality: '静かに揺らめくキャンドルの灯火のように、繊細で思慮深く、内に秘めた情熱と強いこだわりを持っています。鋭い観察眼と高い美意識で、物事の本質を見抜く職人気質な魅力があります。',
            mindAdvice: '繊細だからこそ、周囲の感情に影響されやすい面も。静かで上質なサロン空間で髪を労る時間が、心の灯火を温かく保ちます。',
            texture: 'しっとりと深みのあるシルキータッチ・落ち着いた上質なまとまり',
            twoWayStyles: {
                on: {
                    title: '上品タイトストレート＆長めシースルー',
                    desc: '凛としたプロフェッショナルな美意識。大人の品格が漂う端正なシルエット。'
                },
                off: {
                    title: '毛先ワンカールボブ＆くびれセミディ',
                    desc: '内なる優しさと色気がふんわり漂う、リラックスしたプライベートヘア。'
                }
            },
            styles: [
                '上品なタイトストレート',
                '毛先ワンカールの上質ボブ',
                '大人の色気を引き出す長めのセンターパート',
                '首筋を美しく見せるくびれセミディ'
            ],
            luckyCare: '頭皮の温感ホットスパ＆深層補修ヘアマスク（冷えを取り除き直感を研ぎ澄ます）',
            homeCare: {
                aroma: 'フランキンセンス・ゼラニウム・アンバー（静寂と品格のアロマ）',
                shampoo: '濃密ダメージリペアトリートメントシャンプー（髪内部の芯までじっくり補修）',
                styling: 'シルキーエッセンスナイトセラム（寝ている間に髪に上質な潤いを定着）',
                advice: '夜のドライヤー前にナイトセラムをなじませると、翌朝のまとまりとしっとり感が格段に変わります。'
            }
        },
        male: {
            catchphrase: '静かな色気と鋭い美意識を宿す、こだわり派のプロフェッショナル',
            personality: '闇を静かに照らす灯火のように、一見クールでありながら内に熱い情熱と探求心を秘めています。細部へのこだわりと洗練されたセンスで、唯一無二の世界観を築くスペシャリストです。',
            mindAdvice: '周囲に気を配りすぎて頭が疲れやすい傾向。静かなサロンで温感スパを受けることで、鋭い直感とクリエイティビティが研ぎ澄まされます。',
            texture: 'しっとり落ち着いた大人のツヤ感・ミリ単位で整った毛流れ',
            twoWayStyles: {
                on: {
                    title: 'シャープなタイトセンターパート',
                    desc: '知性と色気を両立。無駄のない毛流れで大人の品格をアピール。'
                },
                off: {
                    title: '毛流れニュアンスコンマヘア',
                    desc: '前髪に優雅なカーブをつけた、アンニュイで洗練された休日スタイル。'
                }
            },
            styles: [
                '毛流れコンマヘア',
                'タイトサイドパート',
                'フェザーマッシュ',
                'ウルフショート'
            ],
            luckyCare: '頭皮温感ホットスパ＆スカルプトリートメント（血行を促進し思考クリア）',
            homeCare: {
                aroma: 'フランキンセンス・アンバー・ゼラニウム（静寂と大人の品格アロマ）',
                shampoo: '濃密スカルプリペアシャンプー（頭皮の乾燥と毛髪の芯を補修）',
                styling: 'シルキーヘアミルク＆ライトグリース（パサつきを抑え上品にまとめる）',
                advice: 'ヘアミルクを毛先になじませて乾かすと、大人の知性と色気が一段と際立ちます。'
            }
        }
    },
    '戊': {
        element: '土',
        elementName: '土（山岳）',
        colorTheme: '#d97706',
        bgGradient: 'linear-gradient(135deg, rgba(217, 119, 6, 0.2), rgba(120, 53, 15, 0.4))',
        icon: '⛰️',
        title: '悠然とそびえる山岳タイプ',
        hairColors: [
            { name: 'ショコラブラウン', code: '#5c3317', desc: '深みと安定感を与え、落ち着いた大人の品格を際立たせる色' },
            { name: 'リッチモカベージュ', code: '#6f4e37', desc: '上質でこっくりとした温かみのあるブラウン' },
            { name: 'アースブラウン', code: '#4a3728', desc: '大地のような包容力と安心感を感じさせるクラシックカラー' }
        ],
        female: {
            catchphrase: '圧倒的安心感と包容力・どっしり構える大黒柱',
            personality: '雄大にそびえ立つ名山のように、どっしりとした安定感と広大な包容力を持っています。小さなことには動じず、周囲に頼られ安心感を与えるリーダーとして、多くの人から信頼を集めます。',
            mindAdvice: 'すべてを一人で抱え込んでしまいがち。重たくなった髪のボリュームを適度に調節して軽さを出すと、心にも心地よい風が通ります。',
            texture: 'しっとり重厚感のあるまとまり・上質で落ち着いたツヤ',
            twoWayStyles: {
                on: {
                    title: '重めクラシックボブ＆センターパート',
                    desc: '圧倒的な信頼感と説得力を生み出す、ブレない美しさの黄金シルエット。'
                },
                off: {
                    title: 'ロングレイヤー＆ゆるやかウェーブ',
                    desc: '雄大な山の自然を感じさせる、ゆったりとした優雅なオフスタイル。'
                }
            },
            styles: [
                '重厚感のあるロングレイヤースタイル',
                'まとまりを極めた上品ボブ',
                'クラシカルなセンターパート',
                '毛先に重みを残したワンレングス'
            ],
            luckyCare: '頭皮の筋膜リリーススパ（首肩のコリをほぐし、全身のエネルギーを安定させる）',
            homeCare: {
                aroma: 'サンダルウッド・シダーウッド・パチュリ（大地と繋がる安心のアロマ）',
                shampoo: '高密着アミノクレンジングシャンプー（頭皮の土台を整えて健康な髪を育む）',
                styling: 'オーガニックシアバターリッチバーム（乾燥を防いで夕方まで崩れずしっかりまとまる）',
                advice: 'シアバターバームを毛先になじませて土台を安定させると、揺るがない自信と金運が定着します。'
            }
        },
        male: {
            catchphrase: 'どっしり構える圧倒的安心感・頼れる大黒柱',
            personality: '雄大な山のように揺るぎない安定感と、頼れる包容力を持っています。小さなことに動じない器の大きさと誠実さで、職場や家庭の大黒柱として絶大な信頼を集めます。',
            mindAdvice: '頑固になって変化を拒んでしまいがち。サイドや襟足をすっきり刈り上げて風通しを良くすると、新しい幸運がスムーズに入ってきます。',
            texture: '重厚感のあるクラシックなまとまり・崩れないホールド感',
            twoWayStyles: {
                on: {
                    title: 'クラシック七三バーバースタイル',
                    desc: 'きっちりパート分けした清潔感と威厳。商談や勝負所で絶大な説得力を発揮。'
                },
                off: {
                    title: '自然体な男前ベリーショート',
                    desc: '男らしい骨格を引き立てる、飾らないシンプル＆タフな休日スタイル。'
                }
            },
            styles: [
                'クラシックバーバーフェード',
                '男前ベリーショート',
                '王道アップバングショート',
                'トラッドショート'
            ],
            luckyCare: '頭皮筋膜リリース＆スカルプクレンジング（首肩の重さを取り金運土台UP）',
            homeCare: {
                aroma: 'サンダルウッド（白檀）・シダーウッド（大地と繋がる風格アロマ）',
                shampoo: '育毛クレンジングスカルプシャンプー（頭皮の土台を強靭に整える）',
                styling: 'クラシックハードポマード（一日中乱れない圧倒的ホールド力）',
                advice: 'ポマードでビシッと髪型をホールドすると、揺るぎない自信と金運が定着します。'
            }
        }
    },
    '己': {
        element: '土',
        elementName: '土（田園）',
        colorTheme: '#b45309',
        bgGradient: 'linear-gradient(135deg, rgba(180, 83, 9, 0.2), rgba(146, 64, 14, 0.35))',
        icon: '🌱',
        title: '豊かな恵みを育む田園タイプ',
        hairColors: [
            { name: 'ミルクティーベージュ', code: '#c4a482', desc: 'まろやかで優しい温もりを感じさせ、親しみやすさを引き立てる色' },
            { name: 'キャラメルラテ', code: '#b87333', desc: '甘すぎない上品な可愛らしさと明るさを演出' },
            { name: 'ハニーベージュ', code: '#d4a373', desc: '陽だまりのような温かさでお顔立ちを優しく魅せるカラー' }
        ],
        female: {
            catchphrase: '愛情深く人を育てる名サポーター・親しみやすさNo.1',
            personality: '作物を優しく育てる肥沃な田畑のように、細やかな愛情と育成能力にあふれています。多才で学習意欲が高く、誰に対しても温かく接することができる、アットホームな愛されキャラです。',
            mindAdvice: '誰かのために尽くしすぎて自分を後回しにしがち。サロンでのトリートメント時間は、自分自身を豊かに耕す大切な栄養チャージです。',
            texture: 'ふんわり温もりを感じる柔らかい手触り・エアリーな束感',
            twoWayStyles: {
                on: {
                    title: 'ひし形シルエットショート＆サイド耳掛け',
                    desc: '清潔感と親しみやすさ抜群。誰からも愛される好印象オフィススタイル。'
                },
                off: {
                    title: '毛先くしゅっとパーマ＆柔らかミディ',
                    desc: '朝のセットが3分で決まる、温かみのあるアットホームなプライベートヘア。'
                }
            },
            styles: [
                'バランスの良いひし形シルエットショート',
                '扱いやすいナチュラルミディアム',
                '毛先に柔らかな動きをつけるパーマスタイル',
                'サイドの髪を耳にかけた爽やかアレンジ'
            ],
            luckyCare: 'ハニーモイスチャートリートメント（髪にたっぷりの栄養と潤いを与えて運気を育てる）',
            homeCare: {
                aroma: 'バニラ・スイートマジョラム・マンダリン（温もりと優しさのアロマ）',
                shampoo: 'モイスチャーハニーシャンプー（たっぷりの栄養で髪と心を優しく包み込む）',
                styling: 'モイストミルククリーム（朝サッとなじませるだけで柔らかくまとまる）',
                advice: '忙しい朝でもミルクを毛先に揉み込むだけで、一日中優しい香りに包まれて穏やかに過ごせます。'
            }
        },
        male: {
            catchphrase: '細やかな気配りと温かい親しみやすさ・安心感抜群の好青年',
            personality: '豊かな大地のように温かく、誰に対しても親身に接することができる人当たりの良さを持っています。多才で学び上手、周囲のサポート役に回ってチームを円滑にする名サポーターです。',
            mindAdvice: '人の面倒を見すぎてエネルギーを消耗しがち。手入れが簡単で再現しやすいヘアスタイルにすることで、日々のストレスを大幅に軽減できます。',
            texture: 'ナチュラルで温かみのあるふんわり質感・手ぐしで決まる扱いやすさ',
            twoWayStyles: {
                on: {
                    title: '好感度抜群の爽やかビジネスショート',
                    desc: '耳周りと襟足をすっきり整えた、誰からも愛される清潔感No.1ヘア。'
                },
                off: {
                    title: 'くしゅっと無造作マッシュパーマ',
                    desc: '休日のカジュアルコーデに似合う、親しみやすい柔らかパーマスタイル。'
                }
            },
            styles: [
                '好印象ナチュラルショート',
                '無造作マッシュパーマ',
                '耳周りスッキリ爽やかヘア',
                '柔らかシャドウパーマ'
            ],
            luckyCare: 'ハニーモイスチャースパ（頭皮と髪に栄養を与えて穏やかな運気を育む）',
            homeCare: {
                aroma: 'マンダリン・スイートマジョラム・バニラ（温もりと安心感のアロマ）',
                shampoo: 'モイスチャースカルプシャンプー（頭皮の潤いを守りながら優しく洗浄）',
                styling: 'ファイバーワックス＆ナチュラルバーム（朝3分で手ぐしセット完了）',
                advice: 'ワックスを手のひらに伸ばしてサッとなじませるだけで、一日中好印象な清潔感が続きます。'
            }
        }
    },
    '庚': {
        element: '金',
        elementName: '金（鋼鉄・剣）',
        colorTheme: '#64748b',
        bgGradient: 'linear-gradient(135deg, rgba(100, 116, 139, 0.2), rgba(30, 41, 59, 0.4))',
        icon: '⚔️',
        title: '研ぎ澄まされた名剣タイプ',
        hairColors: [
            { name: 'プラチナシルバー', code: '#e5e4e2', desc: '都会的で洗練されたクールな輝きを放つハイトーン' },
            { name: 'アイスグレージュ', code: '#9aa0a6', desc: '透き通るような透明感と知的でシャープな印象を両立' },
            { name: 'メタリックアッシュ', code: '#71797e', desc: 'エッジの効いたモード感と大人の引き締まり感を演出' }
        ],
        female: {
            catchphrase: '決断力とスピードで道を切り拓くストイックな開拓者',
            personality: '鍛え抜かれた鋼鉄の名剣のように、強い意志と決断力、そして圧倒的な行動力を持っています。迷わず本質へ切り込む潔さと、困難を打破していくストイックな姿勢が周囲から尊敬されます。',
            mindAdvice: '常に戦闘モードで気が張り詰めていませんか？髪の毛先をシャープに整え、不要な厄を切り落とすことで、思考がクリアに研ぎ澄まされます。',
            texture: '毛先まで研ぎ澄まされたストレート感・エッジの効いたクリアな質感',
            twoWayStyles: {
                on: {
                    title: '前下がりシャープボブ＆ハンサムショート',
                    desc: '決断力とスピード感を宿す、無駄のない都会的ストイックスタイル。'
                },
                off: {
                    title: 'ウェットな束感アレンジ＆タイトローポニー',
                    desc: 'クールでモードな休日アレンジ。スタイリッシュな存在感を発揮。'
                }
            },
            styles: [
                'ライン感を強調した切りっぱなしボブ',
                'クールで洗練されたハンサムショート',
                '横顔を綺麗に見せる前下がりボブ',
                'ツヤのあるタイトストレートヘア'
            ],
            luckyCare: 'プレックス毛髪強化トリートメント（髪の芯を鍛えて切れ味＝決断力を高める）',
            homeCare: {
                aroma: 'ユーカリ・ペパーミント・ジュニパーベリー（頭脳を研ぎ澄ます爽快アロマ）',
                shampoo: 'ストレートキープ＆スカルプシャンプー（サラサラのストレートラインをキープ）',
                styling: 'エッジポリッシュオイル（束感とライン感がプロ級にピタッと決まる）',
                advice: '朝にポリッシュオイルで毛先を整えると、研ぎ澄まされた直感力と仕事運がアップします。'
            }
        },
        male: {
            catchphrase: '決断力とスピードで道を切り拓く、ストイックな勝負師',
            personality: '研ぎ澄まされた名剣のように鋭い決断力と行動力を持ち、どんな困難もスピード感を持って切り拓いていく開拓者です。無駄を嫌い、結果にこだわるストイックな姿勢が男らしさとして際立ちます。',
            mindAdvice: '気が張り詰めてイライラしやすくなることも。毛先をシャープに整えて厄落としをすると、思考がクリアになり勝負運が急上昇します。',
            texture: 'エッジの効いたシャープな毛束・マットで男らしい質感',
            twoWayStyles: {
                on: {
                    title: 'エッジの効いたスパイキーショート',
                    desc: '毛先をツンツンと立ち上げた、圧倒的なスピード感と行動力を誇る勝負ヘア。'
                },
                off: {
                    title: 'モード感ある前下がりハンサムマッシュ',
                    desc: 'クールでミステリアスな色気を醸し出す、都会的スタイリッシュスタイル。'
                }
            },
            styles: [
                'スパイキーショート',
                'フェードカット＆ジェットモヒカン',
                '前下がりハンサムショート',
                'エッジライン刈り上げショート'
            ],
            luckyCare: 'スキャルプディープクレンジングスパ（毛穴の皮脂を削ぎ落とし直感力UP）',
            homeCare: {
                aroma: 'ペパーミント・ユーカリ・ジュニパー（頭脳を覚醒させる爽快アロマ）',
                shampoo: 'ディープクレンジングクールシャンプー（毛穴の奥まで根こそぎ爽快洗浄）',
                styling: 'クレイハードワックス（マットな質感で毛先のエッジを一日中キープ）',
                advice: 'クレイワックスで毛先を立たせるセットをすると、直感力と勝負強さが倍増します。'
            }
        }
    },
    '辛': {
        element: '金',
        elementName: '金（宝石）',
        colorTheme: '#94a3b8',
        bgGradient: 'linear-gradient(135deg, rgba(148, 163, 184, 0.2), rgba(51, 65, 85, 0.4))',
        icon: '💎',
        title: '光り輝くプレミアム宝石タイプ',
        hairColors: [
            { name: 'パールベージュ', code: '#f0ead6', desc: '真珠のような上品な光沢と柔らかさをもたらすプレミアムカラー' },
            { name: 'ホワイトグレージュ', code: '#dcdcdc', desc: '圧倒的な透明感で肌の白さを引き立てる最高峰の美色' },
            { name: 'ラベンダーアッシュ', code: '#967bb6', desc: '黄みを完全に抑え、ノーブルで神秘的な輝きを宿すカラー' }
        ],
        female: {
            catchphrase: '唯一無二の品格と繊細さ・磨くほどに輝く美の象徴',
            personality: '原石から丁寧に磨かれたダイヤモンドのように、繊細で気品高く、独自の美意識を持っています。感受性が豊かで、自分だけのこだわりを大切にするエレガントな魅力があります。',
            mindAdvice: '傷つきやすくデリケートな一面も。髪のダメージを徹底的に補修して宝石のような輝きを取り戻すことが、自己肯定感を最大に高める秘訣です。',
            texture: 'シルクのような極上の指通り・光に透ける圧倒的透明感',
            twoWayStyles: {
                on: {
                    title: 'シースルーレイヤー＆シルキーストレート',
                    desc: '光に透ける圧倒的な透明感。誰が見ても息をのむ宝石のような美髪。'
                },
                off: {
                    title: '繊細な毛流れショート＆上品ニュアンス巻き',
                    desc: '優美な気品をまとうオフスタイル。動くたびに光を反射して輝きます。'
                }
            },
            styles: [
                '光に透けるシースルーレイヤー',
                '繊細な毛流れをつくったショートヘア',
                '毛先までみずみずしい艶髪ストレート',
                '上品なニュアンスサイドバング'
            ],
            luckyCare: '最高級シルクプロテインヘアエステ（宝石を磨き上げるように髪に光を宿す）',
            homeCare: {
                aroma: 'ネロリ・マグノリア・ホワイトムスク（気品あふれる極上アロマ）',
                shampoo: 'プレミアムシルクプロテインシャンプー（シルク生抽出成分で極上の手触り）',
                styling: 'ダイヤモンドルミナスセラム（ドライヤーの熱で宝石のようなツヤに変わる）',
                advice: '宝石は磨くほどに輝きます。ドライヤー前にセラムをつけると、圧倒的な透明感オーラが宿ります。'
            }
        },
        male: {
            catchphrase: '繊細な美意識と洗練された透明感をまとう、都会的ノーブル男子',
            personality: '磨き抜かれた宝石のように高い気品と独自の美意識を持っています。ディテールへのこだわりと洗練された清潔感で、周囲から「おしゃれで上品」と憧れられるノーブルな存在です。',
            mindAdvice: 'プライドが高く繊細で、ストレスを溜め込みがち。ダメージケアを徹底して極上の指通りを保つことが、心の余裕と自信に直結します。',
            texture: 'サラサラとした極上の指通り・光に透ける圧倒的な透明感',
            twoWayStyles: {
                on: {
                    title: '繊細な韓国風フェザーコンマヘア',
                    desc: '毛流れを綺麗に整えた、知性と都会的な洗練をアピールする王道ヘア。'
                },
                off: {
                    title: '透明感ハイトーン＆毛流れシースルーマッシュ',
                    desc: '光を味方にする透明感カラーと、柔らかく流れるマッシュで垢抜け感MAX。'
                }
            },
            styles: [
                '韓国風カルマヘア',
                'フェザーマッシュ',
                'シースルーセンターパート',
                'ハイトーングレージュショート'
            ],
            luckyCare: '最高級シルクプロテイン補修ケア（髪を磨き上げてノーブルな輝きを宿す）',
            homeCare: {
                aroma: 'ネロリ・ホワイトムスク・ベルガモット（気品漂うラグジュアリーアロマ）',
                shampoo: 'プレミアムシルクアミノシャンプー（サロン帰りの極上サラサラ質感をキープ）',
                styling: 'ダイヤモンドルミナスヘアオイル（ベタつかず光をまとう極上の手触り）',
                advice: 'ドライヤー前にオイルを軽くなじませると、宝石のような透明感オーラが完成します。'
            }
        }
    },
    '壬': {
        element: '水',
        elementName: '水（大海）',
        colorTheme: '#0284c7',
        bgGradient: 'linear-gradient(135deg, rgba(22, 132, 199, 0.2), rgba(12, 74, 110, 0.4))',
        icon: '🌊',
        title: '雄大に広がる大海タイプ',
        hairColors: [
            { name: 'ブルーブラック', code: '#000080', desc: '深海のように深く、光の加減で神秘的な青が透けるモードカラー' },
            { name: 'ミッドナイトネイビー', code: '#191970', desc: '都会的で知的な大人の色気を醸し出すダークカラー' },
            { name: 'ディープアッシュ', code: '#2f4f4f', desc: '赤みを完全に抑えたみずみずしい深みと透明感' }
        ],
        female: {
            catchphrase: '変幻自在でダイナミック・自由な知性で世界を泳ぐ旅人',
            personality: 'どこまでも広がる大海原のように、スケールが大きく自由奔放で、枠にとらわれない柔軟性を持っています。知的好奇心が旺盛で、どんな状況でも変化を楽しみながら乗りこなすダイナミックな人です。',
            mindAdvice: '同じ場所に停滞するとエネルギーが淀んでしまいます。季節ごとにヘアスタイルやカラーをアレンジして、新しい風を取り入れましょう。',
            texture: 'みずみずしい潤いをたたえたウェット感・しなやかな動き',
            twoWayStyles: {
                on: {
                    title: 'ダイナミックロングウェーブ＆かきあげバング',
                    desc: '大海の波のように雄大なスケール感と知性を放つ、ドラマチックヘア。'
                },
                off: {
                    title: 'ウルフカット＆ウェットインナーカラー',
                    desc: '枠にとらわれない自由な遊び心。風に揺れるたびにおしゃれが際立ちます。'
                }
            },
            styles: [
                '風になびくロングウェーブスタイル',
                'ドラマチックなかきあげバング',
                '動きと軽さを出したウルフカット',
                'さりげないインナーカラーで遊び心をプラス'
            ],
            luckyCare: '海洋ミネラル・ディープクレンジングスパ（頭皮の淀みを流して大波に乗る）',
            homeCare: {
                aroma: 'マリンノート・シトラス・クラリセージ（爽快な海風のアロマ）',
                shampoo: '海洋ミネラルクレンジングシャンプー（地肌の汚れを吸着してクリアに浄化）',
                styling: 'ウェットシーウォータージェル（パリッと固まらずみずみずしい濡れ感が持続）',
                advice: '濡れ感のあるスタイリングをすることで、滞っていた運気の流れが一気にスムーズになります。'
            }
        },
        male: {
            catchphrase: 'スケールが大きく自由奔放、枠にとらわれないダイナミックな挑戦者',
            personality: '広大な大海原のようにスケールが大きく、自由な発想と大胆な行動力を持っています。知的好奇心が旺盛で変化を恐れず、どんな波も楽しんで乗りこなすダイナミックな魅力の持ち主です。',
            mindAdvice: '退屈や同じことの繰り返しでエネルギーが淀みがち。パーマやウェットなスタイリングで動きをつけると、運気の大波に乗れます。',
            texture: 'みずみずしい濡れ感・動きのあるウェットパーマ質感',
            twoWayStyles: {
                on: {
                    title: 'かきあげツーブロック・ワイルドセンターパート',
                    desc: 'サイドを刈り上げ、前髪をダイナミックにかきあげた男の色気あふれるスタイル。'
                },
                off: {
                    title: '無造作ウルフパーマ＆スパイラル',
                    desc: '自由な遊び心と大人の余裕を演出する、ラフでかっこいいパーマヘア。'
                }
            },
            styles: [
                'ウルフパーマ',
                'ワイルドかきあげセンターパート',
                'ツイストスパイラルパーマ',
                '無造作ウェットミディアム'
            ],
            luckyCare: '海洋ミネラル炭酸スパ（頭皮の淀みを洗い流しダイナミックな運気を呼ぶ）',
            homeCare: {
                aroma: 'マリンノート・シトラス・シダーウッド（爽快な潮風のアロマ）',
                shampoo: '海洋ミネラルスカルプシャンプー（皮脂や毛穴の汚れをスッキリ浄化）',
                styling: 'シーウォーターウェットジェル（固まりすぎず色気ある濡れ髪を一日キープ）',
                advice: 'ウェットな質感でセットすると、滞っていた運気が一気にダイナミックに動き出します。'
            }
        }
    },
    '癸': {
        element: '水',
        elementName: '水（雨露・泉）',
        colorTheme: '#2563eb',
        bgGradient: 'linear-gradient(135deg, rgba(37, 99, 235, 0.2), rgba(30, 58, 138, 0.4))',
        icon: '🌧️',
        title: '命を潤す恵みの雨露タイプ',
        hairColors: [
            { name: 'ラベンダーブラック', code: '#4b0082', desc: '透明感とツヤを極限まで高めた、しっとり潤いを与える美色' },
            { name: 'シアーダークモカ', code: '#3d2b1f', desc: '柔らかい光をまとい、優しく落ち着いた印象を演出' },
            { name: 'ミストグレー', code: '#708090', desc: '霧のような柔らかさとアンニュイな抜け感をもたらすカラー' }
        ],
        female: {
            catchphrase: '万物を潤す癒やしの泉・深い慈愛と豊かな感受性の持ち主',
            personality: '乾いた大地を潤す恵みの雨や湧き水のように、優しく繊細で、人々の心を癒やす深い慈愛を持っています。控えめながらも知性と豊かな感受性を秘め、周囲に静かな潤いをもたらします。',
            mindAdvice: '周囲のマイナスな感情をスポンジのように吸い取ってしまいがち。髪の毛先を定期的に整えてデトックスし、心も髪もピュアな状態を保ちましょう。',
            texture: 'たっぷり水分を含んだような、ぷるんとうるツヤなまとまり感',
            twoWayStyles: {
                on: {
                    title: 'うるツヤストレートロング＆上品センターパート',
                    desc: 'みずみずしい水分をたたえた、清らかで洗練された癒やしのストレート。'
                },
                off: {
                    title: '柔らかワンカールミディ＆透明感ナチュラルボブ',
                    desc: '周囲の心をほどく穏やかな愛されヘア。ふんわりとした優しさに包まれます。'
                }
            },
            styles: [
                'みずみずしいうるツヤストレート',
                '柔らかいワンカールミディ',
                '透明感あふれるナチュラルボブ',
                'ふんわりまとまるシースルーバング'
            ],
            luckyCare: '超音波イオン導入トリートメント（髪の深層まで水分と美容成分を届ける）',
            homeCare: {
                aroma: 'ラベンダー・カモミール・ゼラニウム（心を深い安らぎで包むアロマ）',
                shampoo: '高保水ナイトリペアシャンプー（寝ている間に水分をたっぷりチャージ）',
                styling: 'モイスチャーインフュージョンミルク（お風呂上がりにしっとりぷるん美髪へ）',
                advice: 'お風呂上がりに保水ミルクをつけて乾かすと、邪気払いと開運の水分バリアが完成します。'
            }
        },
        male: {
            catchphrase: '周囲を優しく包み込む知性と癒やし・清潔感あふれるスマート男子',
            personality: '恵みの雨や清らかな湧き水のように、穏やかで思慮深く、人の心を癒やす深い優しさを持っています。控えめながら鋭い知性と観察眼を持ち、細やかな気遣いで周囲から深く愛されます。',
            mindAdvice: 'ストレスや人の負の感情を溜め込みやすい傾向。頭皮マッサージと髪の定期的なカットで邪気を払い、ピュアな状態を保ちましょう。',
            texture: 'みずみずしい潤いとしっとりサラサラなまとまり感',
            twoWayStyles: {
                on: {
                    title: '清潔感スマートセンターパート',
                    desc: 'おでこをほんのり見せ、知性と誠実さを引き立てる洗練されたスタイル。'
                },
                off: {
                    title: '柔らかシースルーマッシュ',
                    desc: 'ふんわり自然な毛流れで、周囲の心を和ませる愛されナチュラルヘア。'
                }
            },
            styles: [
                'スマートセンターパート',
                'シースルーマッシュ',
                'さらツヤナチュラルショート',
                '韓国風ニュアンスヘア'
            ],
            luckyCare: '超音波高保水スカルプトリートメント（頭皮と髪に水分を届けて邪気払い）',
            homeCare: {
                aroma: 'ラベンダー・クラリセージ・ベルガモット（深い安らぎと癒やしのアロマ）',
                shampoo: '高保水アミノスカルプシャンプー（水分バランスを整えてサラサラに）',
                styling: 'モイスチャーヘアミルク（パサつきを抑え、自然な潤いとまとまりを与える）',
                advice: 'お風呂上がりに保水ミルクをつけて乾かすと、邪気を払う清潔感バリアが完成します。'
            }
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

// 初期化
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('cust-diag-form');
    const inputSection = document.getElementById('cust-input-screen');
    const resultSection = document.getElementById('cust-result-screen');
    const btnReDiag = document.getElementById('btn-re-diag');
    const loadingOverlay = document.getElementById('cust-loading-overlay');

    const yearSel = document.getElementById('cust-diag-year');
    const monthSel = document.getElementById('cust-diag-month');
    const daySel = document.getElementById('cust-diag-day');

    // プルダウン生成（デフォルト1995年5月15日）
    initSelects(yearSel, monthSel, daySel, 1995, 5, 15);

    // URLパラメータによる自動診断（例: ?name=佐藤&y=1995&m=5&d=15&g=male）
    const params = new URLSearchParams(window.location.search);
    if (params.has('y') && params.has('m') && params.has('d')) {
        const urlName = params.get('name') || 'あなた';
        const urlY = parseInt(params.get('y'));
        const urlM = parseInt(params.get('m'));
        const urlD = parseInt(params.get('d'));
        const urlG = params.get('g') === 'male' ? 'male' : 'female';
        
        if (urlY && urlM && urlD) {
            document.getElementById('cust-diag-name').value = urlName;
            yearSel.value = urlY;
            monthSel.value = urlM;
            daySel.value = urlD;
            const genderRadio = document.querySelector(`input[name="cust-diag-gender"][value="${urlG}"]`);
            if (genderRadio) genderRadio.checked = true;
            executeDiagnosis(urlName, urlY, urlM, urlD, urlG, false);
        }
    }

    // 診断実行
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('cust-diag-name').value.trim() || 'あなた';
            const y = parseInt(yearSel.value);
            const m = parseInt(monthSel.value);
            const d = parseInt(daySel.value);
            const gender = document.querySelector('input[name="cust-diag-gender"]:checked')?.value || 'female';

            if (!y || !m || !d) {
                alert('生年月日（年・月・日）をすべて選択してください。');
                return;
            }

            executeDiagnosis(name, y, m, d, gender, true);
        });
    }

    function executeDiagnosis(name, y, m, d, gender, withLoadingAnimation) {
        const birthday = new Date(y, m - 1, d);
        const dayTenkan = getDayTenkan(birthday);
        const fortuneBase = CUSTOMER_FORTUNE_DATA[dayTenkan];
        const genderData = (gender === 'male' && fortuneBase.male) ? fortuneBase.male : fortuneBase.female;
        
        // 統合データ生成
        const fortune = {
            ...fortuneBase,
            ...genderData
        };
        const luckyPeriod = calculateNextLuckyPeriod(birthday);

        if (withLoadingAnimation && loadingOverlay) {
            loadingOverlay.classList.remove('hidden');
            setTimeout(() => {
                loadingOverlay.classList.add('hidden');
                displayResult(name, birthday, dayTenkan, fortune, luckyPeriod, gender);
            }, 1200);
        } else {
            displayResult(name, birthday, dayTenkan, fortune, luckyPeriod, gender);
        }
    }

    function displayResult(name, birthday, dayTenkan, fortune, luckyPeriod, gender) {
        // エレメント動的テーマ適用
        document.body.setAttribute('data-element', fortune.element);

        renderCustomerResult(name, birthday, dayTenkan, fortune, luckyPeriod, gender);

        inputSection.classList.add('hidden');
        resultSection.classList.remove('hidden');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // 再診断ボタン
    if (btnReDiag) {
        btnReDiag.addEventListener('click', () => {
            resultSection.classList.add('hidden');
            inputSection.classList.remove('hidden');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // 🔗 診断結果URLコピー機能
    const btnCopyShareUrl = document.getElementById('btn-copy-share-url');
    if (btnCopyShareUrl) {
        btnCopyShareUrl.addEventListener('click', () => {
            const name = document.getElementById('cust-diag-name').value.trim() || 'あなた';
            const y = parseInt(yearSel.value) || 1995;
            const m = parseInt(monthSel.value) || 5;
            const d = parseInt(daySel.value) || 15;
            const gender = document.querySelector('input[name="cust-diag-gender"]:checked')?.value || 'female';
            
            const shareUrl = `${window.location.origin}${window.location.pathname}?name=${encodeURIComponent(name)}&y=${y}&m=${m}&d=${d}&g=${gender}`;
            
            navigator.clipboard.writeText(shareUrl).then(() => {
                const origText = btnCopyShareUrl.innerHTML;
                btnCopyShareUrl.innerHTML = '✅ URLをコピーしました！';
                setTimeout(() => {
                    btnCopyShareUrl.innerHTML = origText;
                }, 2500);
            });
        });
    }

    // --- SNS画像モーダル関連 ---
    const btnOpenSnsModal = document.getElementById('btn-open-sns-modal');
    const snsModal = document.getElementById('sns-modal');
    const btnCloseSnsModal = document.getElementById('btn-close-sns-modal');
    const previewImg = document.getElementById('sns-preview-img');
    const downloadBtn = document.getElementById('btn-download-sns-card');

    if (btnOpenSnsModal && snsModal) {
        btnOpenSnsModal.addEventListener('click', () => {
            const name = document.getElementById('cust-diag-name').value.trim() || 'あなた';
            const y = parseInt(yearSel.value) || 1995;
            const m = parseInt(monthSel.value) || 5;
            const d = parseInt(daySel.value) || 15;
            const gender = document.querySelector('input[name="cust-diag-gender"]:checked')?.value || 'female';
            const birthday = new Date(y, m - 1, d);
            const dayTenkan = getDayTenkan(birthday);
            const fortuneBase = CUSTOMER_FORTUNE_DATA[dayTenkan];
            const genderData = (gender === 'male' && fortuneBase.male) ? fortuneBase.male : fortuneBase.female;
            const fortune = { ...fortuneBase, ...genderData };
            const luckyPeriod = calculateNextLuckyPeriod(birthday);

            generateSNSCardImage(name, birthday, dayTenkan, fortune, luckyPeriod, (dataUrl) => {
                if (previewImg) previewImg.src = dataUrl;
                if (downloadBtn) {
                    downloadBtn.href = dataUrl;
                    downloadBtn.download = `開運ヘアカルテ_${name}_${fortune.title}.png`;
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

function initSelects(yearSel, monthSel, daySel, defaultY, defaultM, defaultD) {
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

function renderCustomerResult(name, birthday, dayTenkan, data, luckyPeriod, gender) {
    // ユーザー名
    const genderTag = gender === 'male' ? '（メンズ開運カルテ）' : '';
    document.getElementById('res-user-name').textContent = `${name} 様 の開運ヘア診断カルテ ${genderTag}`;

    // エレメントバッジ＆キャッチコピー
    const badge = document.getElementById('res-element-badge');
    badge.textContent = `${data.icon} ${data.title}`;
    badge.style.background = data.bgGradient;
    badge.style.borderColor = data.colorTheme;

    document.getElementById('res-catchphrase').textContent = data.catchphrase;
    document.getElementById('res-personality').textContent = data.personality;
    document.getElementById('res-mind-advice').textContent = data.mindAdvice;

    // 開運カラーカード
    const colorContainer = document.getElementById('res-color-cards');
    colorContainer.innerHTML = '';
    data.hairColors.forEach(c => {
        const card = document.createElement('div');
        card.className = 'cust-color-card';
        card.innerHTML = `
            <div class="color-swatch-circle" style="background-color: ${c.code}; box-shadow: 0 0 15px ${c.code}66;"></div>
            <div class="color-card-info">
                <h4 class="color-name">${c.name}</h4>
                <p class="color-desc">${c.desc}</p>
            </div>
        `;
        colorContainer.appendChild(card);
    });

    document.getElementById('res-texture').textContent = data.texture;

    // 2WAYスタイル反映
    if (data.twoWayStyles) {
        document.getElementById('res-on-style-title').textContent = data.twoWayStyles.on.title;
        document.getElementById('res-on-style-desc').textContent = data.twoWayStyles.on.desc;
        document.getElementById('res-off-style-title').textContent = data.twoWayStyles.off.title;
        document.getElementById('res-off-style-desc').textContent = data.twoWayStyles.off.desc;
    }

    // 開運ケア
    document.getElementById('res-lucky-care').textContent = data.luckyCare;

    // 🛍️ 店販・ホームケア処方箋
    if (data.homeCare) {
        document.getElementById('res-home-aroma').textContent = data.homeCare.aroma;
        document.getElementById('res-home-shampoo').textContent = data.homeCare.shampoo;
        document.getElementById('res-home-styling').textContent = data.homeCare.styling;
        document.getElementById('res-home-advice').textContent = data.homeCare.advice;
    }

    // 📅 年間12ヶ月開運メンテナンス・カレンダー描画
    renderYearlyCalendar(dayTenkan, data, gender);

    // 次回開運日
    document.getElementById('res-lucky-period').textContent = luckyPeriod;
}

/**
 * 年間12ヶ月開運メンテナンスカレンダー生成
 */
function renderYearlyCalendar(dayTenkan, data, gender) {
    const calendarContainer = document.getElementById('res-yearly-calendar-grid');
    if (!calendarContainer) return;
    calendarContainer.innerHTML = '';

    const calendarData = getYearlyCalendarData(dayTenkan, data.element, gender);

    calendarData.forEach(item => {
        const monthCard = document.createElement('div');
        monthCard.className = `cal-month-card ${item.isHighlight ? 'highlight' : ''}`;
        monthCard.innerHTML = `
            <div class="cal-month-header">
                <span class="cal-month-num">${item.month}月</span>
                <span class="cal-badge ${item.badgeType}">${item.badge}</span>
            </div>
            <h4 class="cal-theme-title">${item.theme}</h4>
            <p class="cal-hair-action">✂️ <strong>おすすめケア:</strong><br>${item.hairAction}</p>
            <p class="cal-mind-tip">💡 ${item.mindTip}</p>
        `;
        calendarContainer.appendChild(monthCard);
    });
}

function getYearlyCalendarData(dayTenkan, element, gender) {
    const isMale = gender === 'male';
    const ELEMENT_CALENDAR_MAP = {
        '木': [
            { month: 1, theme: '春の準備・整え', hairAction: isMale ? '頭皮クレンジング＆毛先カット' : '頭皮クレンジング＆毛先カット', badge: '🌱 準備期', badgeType: 'normal', mindTip: '春に向けた土台づくりが吉。', isHighlight: false },
            { month: 2, theme: '新スタート・自己飛躍', hairAction: isMale ? '爽やかアップバング＆オリーブカラー' : '軽やかレイヤーカット＆新緑オリーブカラー', badge: '👑 最強開運月', badgeType: 'gold', mindTip: '新しいヘアスタイルで運気が一気に加速！', isHighlight: true },
            { month: 3, theme: '人間関係・成長の波', hairAction: isMale ? '柔らかニュアンスパーマ' : 'ふんわりパーマ＆毛先トリートメント', badge: '🌸 魅力UP月', badgeType: 'pink', mindTip: '周りとの調和が広がる時期。', isHighlight: false },
            { month: 4, theme: 'ペース配分・安定', hairAction: isMale ? '頭皮保湿＆眉カット' : 'しっとり高保湿ヘアマスク', badge: '☕ 調整期', badgeType: 'normal', mindTip: '焦らず現状をキープして吉。', isHighlight: false },
            { month: 5, theme: '魅力開花・自己アピール', hairAction: isMale ? '立体ハイライト＆束感ショート' : '透明感ハイライト＆ツヤ出しカラー', badge: '🌟 チャレンジ月', badgeType: 'teal', mindTip: '華やかさを前面に出すと人が集まります。', isHighlight: true },
            { month: 6, theme: '情熱・アクティブ期', hairAction: isMale ? '爽快スカルプスパ＆フェードカット' : '紫外線対策トリートメント＆束感カット', badge: '🔥 活性期', badgeType: 'normal', mindTip: 'アクティブに動き回れる月。', isHighlight: false },
            { month: 7, theme: '夏のクールダウン', hairAction: isMale ? '炭酸冷感ヘッドスパ' : '炭酸スキャルプヘッドスパ', badge: '💆‍♀️ デトックス月', badgeType: 'teal', mindTip: '頭皮をスッキリさせて邪気払い。', isHighlight: false },
            { month: 8, theme: '決断・シャープな変革', hairAction: isMale ? 'スパイキーショート＆秋色カラー' : '毛先を揃えるシャープカット＆秋色カラー', badge: '✂️ 邪気払い月', badgeType: 'gold', mindTip: '不要なものを手放し、次のステージへ。', isHighlight: true },
            { month: 9, theme: '成果・クオリティ向上', hairAction: isMale ? 'スマートな毛流れコンマヘア' : 'プレミアムシルク補修トリートメント', badge: '💎 実り月', badgeType: 'normal', mindTip: '質の高いケアが幸運をもたらします。', isHighlight: false },
            { month: 10, theme: '基盤づくり・安心感', hairAction: isMale ? '深みのある落ち着きダークトーン' : '深みのある落ち着きカラー', badge: '🍂 安定期', badgeType: 'normal', mindTip: '心と身体を温めるケアを。', isHighlight: false },
            { month: 11, theme: 'インスピレーション・学び', hairAction: isMale ? '頭皮マッサージ＆ツヤ感セット' : 'うるおい高保水ケア＆ヘッドマッサージ', badge: '🌊 充電期', badgeType: 'gold', mindTip: '直感が冴え渡る最高のチャージ月。', isHighlight: true },
            { month: 12, theme: '年末厄落とし・感謝', hairAction: isMale ? '厄落としカット＆プレミアムスパ' : 'カット＆フルヘアエステ（厄払い）', badge: '✨ 浄化月', badgeType: 'pink', mindTip: '今年一年の疲れを綺麗サッパリ浄化！', isHighlight: false }
        ],
        '火': [
            { month: 1, theme: 'エネルギー蓄積', hairAction: isMale ? '温感頭皮スパ＆毛先整え' : '温感トリートメント＆頭皮マッサージ', badge: '🌱 準備期', badgeType: 'normal', mindTip: '内なる炎を静かに育てる月。', isHighlight: false },
            { month: 2, theme: '直感とモチベーションUP', hairAction: isMale ? '軽やかショート＆トーンアップ' : '軽やかカット＆春色トーンアップ', badge: '🌸 魅力UP月', badgeType: 'pink', mindTip: '直感に従って行動すると吉！', isHighlight: false },
            { month: 3, theme: '人脈拡大・社交期', hairAction: isMale ? '波巻きパーマ＆ツヤ感セット' : '動きのあるウェーブ＆フェイスレイヤー', badge: '🌟 チャレンジ月', badgeType: 'teal', mindTip: '出会いの場にどんどん出かけましょう。', isHighlight: true },
            { month: 4, theme: '基盤固め・安心感', hairAction: isMale ? '清潔感重視のナチュラルマッシュ' : 'まとまり重視のボブ＆上品カラー', badge: '☕ 調整期', badgeType: 'normal', mindTip: '少しペースを落としてリラックス。', isHighlight: false },
            { month: 5, theme: '運気絶頂・主役の季節！', hairAction: isMale ? 'ツヤ感かきあげセンターパート＆暖色カラー' : '圧倒的ツヤのチェリー暖色カラー＆女神巻き', badge: '👑 最強開運月', badgeType: 'gold', mindTip: 'あなたの魅力とオーラが最大化する最高潮！', isHighlight: true },
            { month: 6, theme: '大飛躍・ステージUP', hairAction: isMale ? '水性ポマード仕上げ＆刈り上げ' : 'ハイシャイングロスオイル仕上げ', badge: '🔥 飛躍期', badgeType: 'gold', mindTip: 'やりたかったことに思い切って挑戦！', isHighlight: false },
            { month: 7, theme: 'クールダウン・デトックス', hairAction: isMale ? '炭酸冷感スカルプスパ' : '炭酸ヘッドスパ＆毛先カット', badge: '💆‍♀️ デトックス月', badgeType: 'teal', mindTip: '熱を冷まして心身をリセット。', isHighlight: false },
            { month: 8, theme: '収穫・成果の受け取り', hairAction: isMale ? '秋の上品ブラウン＆頭皮ケア' : '秋の上品ツヤブラウン＆リペアトリートメント', badge: '💎 実り月', badgeType: 'gold', mindTip: 'これまでの努力が実を結びます。', isHighlight: true },
            { month: 9, theme: '洗練・美意識の向上', hairAction: isMale ? 'シャープなラインカット' : 'エッジの効いた質感カット', badge: '✨ 洗練期', badgeType: 'normal', mindTip: 'ワンランク上の美を追求して吉。', isHighlight: false },
            { month: 10, theme: '振り返りと基盤づくり', hairAction: isMale ? '深みダークカラー＆頭皮保湿' : '深みカラー＆頭皮保湿', badge: '🍂 安定期', badgeType: 'normal', mindTip: '大切な人と過ごす時間を大切に。', isHighlight: false },
            { month: 11, theme: '静寂と充電・邪気払い', hairAction: isMale ? '毛先の厄落としカット' : 'ダメージ毛先の厄落としカット', badge: '✂️ 邪気払い月', badgeType: 'teal', mindTip: '無理せず静かに英気を養う時期。', isHighlight: true },
            { month: 12, theme: '年末リセット＆輝き再生', hairAction: isMale ? '極上ヘッドスパ＆年末カット' : '最高峰トリートメント＆年末カット', badge: '✨ 浄化月', badgeType: 'pink', mindTip: '輝く美髪で最高の新年を迎えましょう！', isHighlight: false }
        ],
        '土': [
            { month: 1, theme: '新春の土台固め', hairAction: isMale ? 'クラシックバーバーショート＆頭皮ケア' : '重め上品ボブ＆濃密アミノ酸ケア', badge: '⛰️ 土台月', badgeType: 'gold', mindTip: 'じっくり基盤を整える最高のスタート。', isHighlight: true },
            { month: 2, theme: '新展開への好奇心', hairAction: isMale ? '軽やかナチュラルショート' : '毛先を軽くしたナチュラルショート', badge: '🌱 成長期', badgeType: 'normal', mindTip: '新しい学びに挑戦すると吉。', isHighlight: false },
            { month: 3, theme: '柔軟性と人脈づくり', hairAction: isMale ? '柔らかミルクティーカラー' : '柔らかなミルクティーベージュ', badge: '🌸 魅力UP月', badgeType: 'pink', mindTip: '笑顔と柔らかいトーンが幸運の鍵。', isHighlight: false },
            { month: 4, theme: '安心と包容力の発揮', hairAction: isMale ? 'ショコラブラウン＆筋膜リリーススパ' : 'ショコラブラウン＆頭皮筋膜リリーススパ', badge: '👑 最強開運月', badgeType: 'gold', mindTip: '周囲からの信頼が一気に高まる時期！', isHighlight: true },
            { month: 5, theme: 'エネルギー活性・社交', hairAction: isMale ? 'くしゅっとパーマ＆ツヤセット' : '華やかウェーブ＆ツヤトリートメント', badge: '🔥 活性期', badgeType: 'teal', mindTip: '明るい服やカラーで気分を高めて。', isHighlight: false },
            { month: 6, theme: '情熱とアウトプット', hairAction: isMale ? '軽やかミディアム＆バームセット' : '軽やかミディアム＆シアバター仕上げ', badge: '🌟 チャレンジ月', badgeType: 'normal', mindTip: '自分の想いを言葉にして伝えて吉。', isHighlight: false },
            { month: 7, theme: '夏のメンテナンス＆充電', hairAction: isMale ? 'スカルプクレンジングスパ' : 'クレンジングスパ＆毛先整えカット', badge: '💆‍♀️ デトックス月', badgeType: 'gold', mindTip: 'しっかり休養を取り、土台を強化。', isHighlight: true },
            { month: 8, theme: '知性と直感の冴え', hairAction: isMale ? 'アイスグレージュ＆シャープライン' : 'アイスグレージュ＆シャープライン', badge: '💎 洗練期', badgeType: 'normal', mindTip: '冷静な判断が大きな成果を生みます。', isHighlight: false },
            { month: 9, theme: '成果の収穫と喜び', hairAction: isMale ? 'リッチマロンカラー＆極上スパ' : 'リッチマロンカラー＆極上ヘアエステ', badge: '🌾 収穫期', badgeType: 'pink', mindTip: '自分へのご褒美をたっぷりあげて。', isHighlight: false },
            { month: 10, theme: '年間集大成・安定運', hairAction: isMale ? '上品バーバーカット＆バームケア' : '上品ワンレン＆オーガニックバームケア', badge: '👑 安定達成月', badgeType: 'gold', mindTip: '1年の努力が形になる充実の月。', isHighlight: true },
            { month: 11, theme: '金運と人脈の広がり', hairAction: isMale ? 'しっとり高保湿スカルプケア' : 'しっとり高保湿トリートメント', badge: '💰 豊かさ月', badgeType: 'teal', mindTip: '温かいコミュニケーションが福を呼ぶ。', isHighlight: false },
            { month: 12, theme: '年末浄化＆大掃除', hairAction: isMale ? '厄落としカット＆スカルプスパ' : '厄落としカット＆スカルプスパ', badge: '✂️ 邪気払い月', badgeType: 'pink', mindTip: '心と髪の汚れを落として新年へ！', isHighlight: false }
        ],
        '金': [
            { month: 1, theme: '冷静な計画・リセット', hairAction: isMale ? 'タイトショート＆頭皮クレンジング' : 'タイトストレート＆頭皮クレンジング', badge: '☕ 調整期', badgeType: 'normal', mindTip: '1年の計画をスマートに立てる月。', isHighlight: false },
            { month: 2, theme: '新しい挑戦と成果', hairAction: isMale ? 'スパイキーショート＆プラチナカラー' : 'ハンサムショート＆プラチナカラー', badge: '🌟 チャレンジ月', badgeType: 'teal', mindTip: '迷わず決断すると道が拓けます。', isHighlight: true },
            { month: 3, theme: 'スピードと行動力', hairAction: isMale ? 'フェードカット＆ジェットモヒカン' : 'エッジの効いた切りっぱなしボブ', badge: '⚔️ 行動期', badgeType: 'normal', mindTip: '即断即決が最高の運気を呼びます。', isHighlight: false },
            { month: 4, theme: 'サポートと自己投資', hairAction: isMale ? 'スカルプ育毛トリートメント' : 'プレックストリートメント（内部補修）', badge: '🌱 充電期', badgeType: 'normal', mindTip: '自分の内面や技術を磨く時期。', isHighlight: false },
            { month: 5, theme: '情熱と試練を乗り越える', hairAction: isMale ? '艶やかダークアッシュ＆毛先ケア' : '艶やかダークアッシュ＆毛先ケア', badge: '🔥 鍛錬期', badgeType: 'pink', mindTip: '試練を越えるたびに輝きを増します。', isHighlight: true },
            { month: 6, theme: '社交と自己表現', hairAction: isMale ? '立体メッシュハイライト＆束感カット' : '束感ハイライト＆軽やかカット', badge: '🌸 魅力UP月', badgeType: 'normal', mindTip: '自信を持って意見を発信して吉。', isHighlight: false },
            { month: 7, theme: '夏のリフレッシュ', hairAction: isMale ? '冷感ミントスカルプスパ' : '冷感ミントヘッドスパ＆毛先整え', badge: '💆‍♀️ デトックス月', badgeType: 'teal', mindTip: '頭をクールダウンして直感力を研ぎ澄ます。', isHighlight: false },
            { month: 8, theme: '自己最高潮！圧倒的研ぎ澄まし', hairAction: isMale ? 'アイスグレージュ＆シャープフェード' : 'アイスグレージュ＆シャープカット', badge: '👑 最強開運月', badgeType: 'gold', mindTip: 'あなたの決断力とカリスマ性が炸裂！', isHighlight: true },
            { month: 9, theme: '宝石の輝き・収穫の秋', hairAction: isMale ? '韓国風フェザーコンマヘア＆艶カラー' : '最高級シルクトリートメント＆艶カラー', badge: '💎 輝き月', badgeType: 'gold', mindTip: '磨かれた美しさが大きな賞賛を集めます。', isHighlight: false },
            { month: 10, theme: '土台固め・実りの整理', hairAction: isMale ? 'まとまりショート＆オイルケア' : 'まとまりボブ＆リッチセラムケア', badge: '🍂 安定期', badgeType: 'normal', mindTip: '着実に結果を手中に収めましょう。', isHighlight: false },
            { month: 11, theme: '柔軟性と知性の発揮', hairAction: isMale ? 'さらツヤセンターパート＆潤いミルク' : 'みずみずしいストレート＆潤いミルク', badge: '🌊 発揮期', badgeType: 'teal', mindTip: 'しなやかな対応が更なる幸運を呼びます。', isHighlight: true },
            { month: 12, theme: '年末厄払い＆刀磨き', hairAction: isMale ? '毛先を研ぎ澄ますシャープカット' : '毛先1cmカット（切れ味復活）＆トリートメント', badge: '✂️ 邪気払い月', badgeType: 'pink', mindTip: '切れ味を研ぎ澄まして新年を迎えよう！', isHighlight: false }
        ],
        '水': [
            { month: 1, theme: '静かな知性と計画', hairAction: isMale ? '頭皮保湿スパ＆スマートショート' : 'しっとり潤いトリートメント＆頭皮スパ', badge: '🌊 静寂期', badgeType: 'normal', mindTip: '直感を信じてじっくり構える月。', isHighlight: false },
            { month: 2, theme: '新しい流れ・発信', hairAction: isMale ? 'ウルフパーマ＆ブルーブラック' : '動きのあるウルフカット＆ブルーブラック', badge: '🌱 新展開期', badgeType: 'teal', mindTip: '新しい流れに乗って軽やかに前進！', isHighlight: true },
            { month: 3, theme: '成長とコミュニケーション', hairAction: isMale ? '柔らかシースルーマッシュ＆アッシュ' : '柔らかワンカールミディ＆透明感アッシュ', badge: '🌸 魅力UP月', badgeType: 'pink', mindTip: '人の話を聴くことでチャンス到来。', isHighlight: false },
            { month: 4, theme: '立ち止まり・調整', hairAction: isMale ? '頭皮と首肩のデトックススパ' : '頭皮と首肩のデトックスマッサージ', badge: '☕ 調整期', badgeType: 'normal', mindTip: '無理せずマイペースを保ちましょう。', isHighlight: false },
            { month: 5, theme: '情熱と社交・人脈拡大', hairAction: isMale ? 'ウェットジェルスタイリング＆ツヤカラー' : 'ウェットスタイリング＆ツヤ出しカラー', badge: '🔥 活性期', badgeType: 'gold', mindTip: '新しい出会いやイベントが活発に！', isHighlight: true },
            { month: 6, theme: '成果とアクティブ期', hairAction: isMale ? 'かきあげツーブロック＆スパイラル' : 'かきあげバング＆軽やかウェーブ', badge: '🌟 チャレンジ月', badgeType: 'normal', mindTip: '自由な発想をどんどん形にして吉。', isHighlight: false },
            { month: 7, theme: '夏のエネルギー調整', hairAction: isMale ? 'マリンミネラル炭酸スパ' : 'マリンミネラル炭酸スパ', badge: '💆‍♀️ デトックス月', badgeType: 'teal', mindTip: '水のエネルギーで心身をクリアに浄化。', isHighlight: false },
            { month: 8, theme: '知性と充電・サポート', hairAction: isMale ? '高保湿スカルプケア＆整えカット' : '高保湿ヘアマスク＆毛先整えカット', badge: '💎 充電期', badgeType: 'normal', mindTip: '周囲の応援を受けて力が湧く時期。', isHighlight: true },
            { month: 9, theme: 'インスピレーションの開花', hairAction: isMale ? '深みダークモカ＆ツヤセンターパート' : '深みのあるダークモカ＆ツヤストレート', badge: '✨ インスピレーション期', badgeType: 'pink', mindTip: 'クリエイティブな活動が大成功！', isHighlight: false },
            { month: 10, theme: '邪気払い・軌道修正', hairAction: isMale ? '毛先の厄落としカット＆スカルプスパ' : '傷んだ毛先のカット＆厄落としスパ', badge: '✂️ 邪気払い月', badgeType: 'teal', mindTip: '不要な人間関係や習慣をスッキリ整理。', isHighlight: false },
            { month: 11, theme: '運気絶頂！大波に乗る', hairAction: isMale ? 'ワイルドかきあげパーマ＆高保水ケア' : 'ドラマチックなロングウェーブ＆高保水ケア', badge: '👑 最強開運月', badgeType: 'gold', mindTip: 'あなたのエネルギーが最高潮に達します！', isHighlight: true },
            { month: 12, theme: '年末浄化＆大航海へ', hairAction: isMale ? 'プレミアムスカルプエステ＆年末カット' : 'プレミアムヘアエステ＆年末カット', badge: '✨ 浄化大航海月', badgeType: 'gold', mindTip: '最高の潤いと美しさで新しいステージへ！', isHighlight: false }
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

    // --- テキスト描画ユーティリティ ---
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

    // 2. オーラグロー効果（円形グラデーション）
    const auraGrad = ctx.createRadialGradient(W / 2, 540, 50, W / 2, 540, 480);
    auraGrad.addColorStop(0, data.colorTheme + '55');
    auraGrad.addColorStop(0.6, data.colorTheme + '15');
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

    // コーナーアクセント
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

    // 5. お客様ネーム（幅に合わせて自動縮小）
    ctx.fillStyle = '#ffffff';
    fillFitText(name + ' 様 の開運カルテ', W / 2, 255, 780, 42, '"Noto Sans JP", sans-serif', true, 'center');

    // 6. エレメントシンボルアイコン ＆ タイトル
    ctx.textAlign = 'center';
    ctx.font = '90px sans-serif';
    ctx.fillText(data.icon, W / 2, 410);

    // エレメントバッジ枠
    ctx.fillStyle = 'rgba(18, 26, 43, 0.9)';
    ctx.strokeStyle = data.colorTheme;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.roundRect(W / 2 - 260, 455, 520, 75, 38);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#ffffff';
    fillFitText(dayTenkan + '（' + data.elementName + '）タイプ', W / 2, 508, 480, 36, '"Noto Sans JP", sans-serif', true, 'center');

    // 7. キャッチコピー（長文でもはみ出さない自動折り返し／縮小）
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

    // 3色のスウォッチ描画（カラー名が長くても収まる）
    const startX = 220;
    const gapX = 320;
    data.hairColors.forEach((col, idx) => {
        const cx = startX + idx * gapX;
        const cy = 785;

        // カラー丸
        ctx.fillStyle = col.code;
        ctx.beginPath();
        ctx.arc(cx, cy, 38, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 3;
        ctx.stroke();

        // カラー名（幅260px内で自動縮小）
        ctx.fillStyle = '#ffffff';
        fillFitText(col.name, cx, cy + 68, 260, 22, '"Noto Sans JP", sans-serif', true, 'center');
    });

    // 9. 2WAY開運スタイル ＆ アロマ処方箋セクション
    ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(90, 960, W - 180, 590, 20);
    ctx.fill();
    ctx.stroke();

    let curY = 1015;

    // 2WAY スタイル
    ctx.fillStyle = '#38bdf8';
    ctx.textAlign = 'left';
    ctx.font = 'bold 28px "Noto Sans JP", sans-serif';
    ctx.fillText('✂️ 2WAY 開運ヘアデザイン:', 130, curY);
    curY += 45;

    if (data.twoWayStyles) {
        // ON スタイル
        ctx.fillStyle = '#7dd3fc';
        ctx.font = 'bold 22px "Noto Sans JP", sans-serif';
        ctx.fillText('💼 ON: ' + data.twoWayStyles.on.title, 140, curY);
        curY += 32;

        ctx.fillStyle = '#cbd5e1';
        ctx.font = '20px "Noto Sans JP", sans-serif';
        curY = fillWrappedText(data.twoWayStyles.on.desc, 140, curY, 800, 30, 'left') + 40;

        // OFF スタイル
        ctx.fillStyle = '#fef08a';
        ctx.font = 'bold 22px "Noto Sans JP", sans-serif';
        ctx.fillText('🌿 OFF: ' + data.twoWayStyles.off.title, 140, curY);
        curY += 32;

        ctx.fillStyle = '#cbd5e1';
        ctx.font = '20px "Noto Sans JP", sans-serif';
        curY = fillWrappedText(data.twoWayStyles.off.desc, 140, curY, 800, 30, 'left') + 45;
    }

    // アロマ＆ホームケア
    if (data.homeCare) {
        ctx.fillStyle = '#f59e0b';
        ctx.font = 'bold 26px "Noto Sans JP", sans-serif';
        ctx.fillText('🛍️ 開運アロマ＆ホームケア処方:', 130, curY);
        curY += 38;

        ctx.fillStyle = '#a7f3d0';
        ctx.font = '20px "Noto Sans JP", sans-serif';
        curY = fillWrappedText('🌿 香り: ' + data.homeCare.aroma, 140, curY, 800, 28, 'left') + 34;

        ctx.fillStyle = '#e2e8f0';
        curY = fillWrappedText('🧴 ケア: ' + data.homeCare.shampoo, 140, curY, 800, 28, 'left');
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
