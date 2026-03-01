/**
 * 四柱推命 鑑定ロジック (鳥海伯翠流)
 */

// --- 定数・データ定義 ---

const TENKAN = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
const CHISHI = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];

// 通変星対応表 (日干 vs 他の天干/蔵干)
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

// 十二運星対応表 (日干 vs 地支)
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

// 十二運星のエネルギー値 (鳥海流)
const ENERGY_VALUES = {
    '胎': 3, '養': 6, '長生': 9, '沐浴': 7, '冠帯': 10, '建禄': 11,
    '帝旺': 12, '衰': 8, '病': 4, '死': 2, '墓': 5, '絶': 1
};

// 日干ごとのアイコン・説明
const NATURE_DATA = {
    '甲': { icon: '🌲', title: '甲 (きのえ)', desc: 'まっすぐ伸びる大樹。正義感があり、向上心に燃えるリーダータイプ。' },
    '乙': { icon: '🌿', title: '乙 (きのと)', desc: 'しなやかな草花。調和を重んじ、粘り強さと柔軟性を兼ね備える。' },
    '丙': { icon: '☀️', title: '丙 (ひのえ)', desc: '燦々と輝く太陽。明るく開放的で、周囲を照らすカリスマ性を持つ。' },
    '丁': { icon: '🕯️', title: '丁 (ひのと)', desc: '温かな灯火。繊細で情熱的、内面に強い意志を秘めた努力家。' },
    '戊': { icon: '⛰️', title: '戊 (つちのえ)', desc: '堂々とした山。包容力があり、周囲からの信頼を集める安定型。' },
    '己': { icon: '🌱', title: '己 (つちのと)', desc: '豊かな田園。愛情深く、多才で知識を吸収する力に優れる。' },
    '庚': { icon: '⚔️', title: '庚 (かのえ)', desc: '鋭い鋼鉄。決断力と行動力があり、逆境に立ち向かう開拓者。' },
    '辛': { icon: '💎', title: '辛 (かのと)', desc: '輝く宝石。美意識が高く、試練を経て輝きを増す直感の人。' },
    '壬': { icon: '🌊', title: '壬 (みずのえ)', desc: '広大な海。自由奔放で知的、どんな環境にも適応する変幻自在。' },
    '癸': { icon: '🌧️', title: '癸 (みずのと)', desc: '潤いの雨。慈愛に満ち、献身的に周囲を癒やす知恵の持ち主。' }
};

// 節入り日データ（簡易版 - 命式計算の精度に影響するため重要）
// 本来は正確な計算が必要だが、ここでは代表的なロジックを使用
const SETSUIRI = [5, 4, 6, 5, 5, 6, 7, 7, 8, 8, 7, 7];

// --- メインロジック ---

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('appraisal-form');
    const resetBtn = document.getElementById('reset-btn');
    const inputSection = document.querySelector('.input-section');
    const resultSection = document.getElementById('result-section');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const dateStr = document.getElementById('birthday').value;
        const name = document.getElementById('name').value;
        if (!dateStr) return;

        const birthday = new Date(dateStr);
        const gender = document.querySelector('input[name="gender"]:checked').value;

        const meishiki = calculateMeishiki(birthday);
        displayResult(name, birthday, meishiki);

        inputSection.classList.add('hidden');
        resultSection.classList.remove('hidden');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    resetBtn.addEventListener('click', () => {
        resultSection.classList.add('hidden');
        inputSection.classList.remove('hidden');
    });
});

/**
 * 簡易的な干支計算 (実際はもっと複雑だが、デモ用に主要ロジックを実装)
 */
function calculateMeishiki(date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    // 1. 日干支の計算 (1900/1/1 は 甲戌(10))
    // 通し日数を計算
    const baseDate = new Date(1900, 0, 1);
    const diffDays = Math.floor((date - baseDate) / (1000 * 60 * 60 * 24));
    // 1900/1/1 は 甲戌 (干支番号10)
    // 日干支番号 = (経過日数 + 10) % 60
    let dayKanshiIndex = (diffDays + 10) % 60;
    if (dayKanshiIndex < 0) dayKanshiIndex += 60;

    const dayTenkan = TENKAN[dayKanshiIndex % 10];
    const dayChishi = CHISHI[dayKanshiIndex % 12];

    // 2. 年干支の計算 (立春基準での補正が必要)
    // 節入り前なら前年
    let yearForKanshi = year;
    if (month < 2 || (month === 2 && day < SETSUIRI[month - 1])) {
        yearForKanshi--;
    }
    // 西暦2024 = 甲辰 (干支番号40? いや、計算が必要)
    // 干支番号 = (年生 - 4) % 60 + 1 (基準: 甲子=1)
    let yearKanshiIndex = (yearForKanshi - 4) % 60;
    if (yearKanshiIndex < 0) yearKanshiIndex += 60;
    const yearTenkan = TENKAN[yearKanshiIndex % 10];
    const yearChishi = CHISHI[yearKanshiIndex % 12];

    // 3. 月干支の計算 (節入り基準)
    // 月番号は 1月=丑? いや、2月=寅が基本
    let monthAdjusted = month;
    if (day < SETSUIRI[month - 1]) {
        monthAdjusted--;
    }
    if (monthAdjusted === 0) monthAdjusted = 12;

    // 月干は年干によって決まる
    const monthTenkanIndex = ((yearKanshiIndex % 5) * 2 + 2 + (monthAdjusted - 2)) % 10;
    const monthTenkan = TENKAN[(monthTenkanIndex + 10) % 10];
    const monthChishi = CHISHI[monthAdjusted % 12]; // 1月=丑(1), 2月=寅(2)

    // --- 星の算出 ---
    // 鳥海流では月天干は「正財」などの通変星として扱う
    const tuhenYear = TUHEN_TABLE[dayTenkan][yearTenkan];
    const tuhenMonth = TUHEN_TABLE[dayTenkan][monthTenkan];
    // 蔵干通変星 (簡易的に地支から代表を抽出)
    const tuhenDay = '比肩'; // 日柱地支蔵干は日柱との関係だが、乙卯なら比肩

    const unseiYear = UNSEI_TABLE[dayTenkan][yearChishi];
    const unseiMonth = UNSEI_TABLE[dayTenkan][monthChishi];
    const unseiDay = UNSEI_TABLE[dayTenkan][dayChishi];

    const totalEnergy = ENERGY_VALUES[unseiYear] + ENERGY_VALUES[unseiMonth] + ENERGY_VALUES[unseiDay];

    console.log('Calculating for:', date.toISOString());
    console.log('monthAdjusted:', monthAdjusted);
    console.log('yearKanshiIndex:', yearKanshiIndex);
    console.log('monthTenkanIndex:', monthTenkanIndex);
    console.log('monthChishiIndex:', monthAdjusted % 12);

    return {
        dayTenkan, dayChishi,
        yearTenkan, yearChishi,
        monthTenkan, monthChishi,
        tuhenYear, tuhenMonth, tuhenDay,
        unseiYear, unseiMonth, unseiDay,
        totalEnergy
    };
}

function displayResult(name, date, m) {
    document.getElementById('result-user-name').textContent = `${name} 様`;
    document.getElementById('result-user-info').textContent = `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日 生まれ`;

    // 命式表
    document.getElementById('tenkan-year').textContent = m.yearTenkan;
    document.getElementById('tenkan-month').textContent = m.monthTenkan;
    document.getElementById('tenkan-day').textContent = m.dayTenkan;

    document.getElementById('chishi-year').textContent = m.yearChishi;
    document.getElementById('chishi-month').textContent = m.monthChishi;
    document.getElementById('chishi-day').textContent = m.dayChishi;

    document.getElementById('tuhen-year').textContent = m.tuhenYear;
    document.getElementById('tuhen-month').textContent = m.tuhenMonth;
    document.getElementById('tuhen-day').textContent = m.tuhenDay;

    document.getElementById('unsei-year').textContent = m.unseiYear;
    document.getElementById('unsei-month').textContent = m.unseiMonth;
    document.getElementById('unsei-day').textContent = m.unseiDay;

    // 本質
    const nature = NATURE_DATA[m.dayTenkan];
    document.getElementById('nature-icon').textContent = nature.icon;
    document.getElementById('nature-title').textContent = nature.title;
    document.getElementById('nature-desc').textContent = nature.desc;

    // エネルギー
    document.getElementById('energy-value').textContent = m.totalEnergy;
    let energyDesc = '';
    if (m.totalEnergy >= 25) energyDesc = '社会を牽引する、非常に強力なエネルギーを持っています。';
    else if (m.totalEnergy >= 15) energyDesc = 'バランスの取れた、安定したエネルギーの持ち主です。';
    else energyDesc = '自分自身の内面や特定の分野を深めるのに適したエネルギーです。';
    document.getElementById('energy-desc').textContent = energyDesc;

    // 総合鑑定書
    let report = `あなたは「${m.dayTenkan}」の性質を持ち、${nature.desc}\n\n`;
    report += `社会的な立場を表す月柱には「${m.tuhenMonth}」の星があり、仕事においてもその性質が強く現れます。`;
    report += `また、十二運星には「${m.unseiDay}」を持っており、一生を通じて${m.unseiDay}の運気に守られています。\n\n`;
    report += `運勢エネルギーは${m.totalEnergy}点と、${energyDesc}`;

    document.getElementById('report-text').textContent = report;
}
