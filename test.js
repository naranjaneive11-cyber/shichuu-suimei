
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

        // 鳥海流 蔵干表 (地支 vs 日数)
        const TORIUMI_ZOKAN = {
            '子': (d) => (d <= 10 ? '壬' : '癸'),
            '丑': (d) => (d <= 9 ? '癸' : (d <= 12 ? '辛' : '己')),
            '寅': (d) => (d <= 7 ? '戊' : (d <= 14 ? '丙' : '甲')),
            '卯': (d) => (d <= 10 ? '甲' : '乙'),
            '辰': (d) => (d <= 9 ? '乙' : (d <= 12 ? '癸' : '戊')),
            '巳': (d) => (d <= 7 ? '庚' : (d <= 14 ? '戊' : '丙')),
            '午': (d) => (d <= 10 ? '丙' : (d <= 20 ? '己' : '丁')),
            '未': (d) => (d <= 9 ? '丁' : (d <= 12 ? '乙' : '己')),
            '申': (d) => (d <= 10 ? '戊' : (d <= 17 ? '壬' : '庚')),
            '酉': (d) => (d <= 10 ? '庚' : '辛'),
            '戌': (d) => (d <= 9 ? '辛' : (d <= 12 ? '丁' : '戊')),
            '亥': (d) => (d <= 12 ? '甲' : '壬')
        };

        // 十二支と季節の対応
        const SEASON_MAP = {
            '寅': '春', '卯': '春', '辰': '春',
            '巳': '夏', '午': '夏', '未': '夏',
            '申': '秋', '酉': '秋', '戌': '秋',
            '亥': '冬', '子': '冬', '丑': '冬'
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

        // 節入り日データ（簡易版）
        const SETSUIRI = [5, 4, 6, 5, 5, 6, 7, 7, 8, 8, 7, 7]; // 1月〜12月の節入り日

        // --- メインロジック ---

        document.addEventListener('DOMContentLoaded', () => {
            const form = document.getElementById('appraisal-form');
            const resetBtn = document.getElementById('reset-btn');
            const inputSection = document.querySelector('.input-section');
            const resultSection = document.getElementById('result-section');

            // 年プルダウンの生成（1920年〜今年）
            const yearSelect = document.getElementById('birthday-year');
            const currentYear = new Date().getFullYear();
            for (let y = currentYear; y >= 1920; y--) {
                const opt = document.createElement('option');
                opt.value = y;
                opt.textContent = y + '年';
                yearSelect.appendChild(opt);
            }

            // 日プルダウンを更新する関数
            function updateDays() {
                const daySelect = document.getElementById('birthday-day');
                const y = parseInt(yearSelect.value) || 2000;
                const m = parseInt(document.getElementById('birthday-month').value) || 1;
                const maxDay = new Date(y, m, 0).getDate();
                const prevDay = parseInt(daySelect.value);
                daySelect.innerHTML = '<option value="">日</option>';
                for (let d = 1; d <= maxDay; d++) {
                    const opt = document.createElement('option');
                    opt.value = d;
                    opt.textContent = d + '日';
                    if (d === prevDay) opt.selected = true;
                    daySelect.appendChild(opt);
                }
            }

            yearSelect.addEventListener('change', updateDays);
            document.getElementById('birthday-month').addEventListener('change', updateDays);
            updateDays(); // 初期化

            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const y = parseInt(document.getElementById('birthday-year').value);
                const m = parseInt(document.getElementById('birthday-month').value);
                const d = parseInt(document.getElementById('birthday-day').value);
                const name = document.getElementById('name').value;
                if (!y || !m || !d) {
                    alert('生年月日を選択してください。');
                    return;
                }

                const birthday = new Date(y, m - 1, d);
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

        const ELEMENT_MAP = {
            '甲': '+木', '乙': '-木', '丙': '+火', '丁': '-火', '戊': '+土', '己': '-土', '庚': '+金', '辛': '-金', '壬': '+水', '癸': '-水',
            '子': '+水', '丑': '-土', '寅': '+木', '卯': '-木', '辰': '+土', '巳': '-火', '午': '+火', '未': '-土', '申': '+金', '酉': '-金', '戌': '+土', '亥': '-水'
        };

        const CHUSHATSU_TABLE = {
            '甲子': '戌亥', '乙丑': '戌亥', '丙寅': '戌亥', '丁卯': '戌亥', '戊辰': '戌亥', '己巳': '戌亥', '庚午': '戌亥', '辛未': '戌亥', '壬申': '戌亥', '癸酉': '戌亥',
            '甲戌': '申酉', '乙亥': '申酉', '丙子': '申酉', '丁丑': '申酉', '戊寅': '申酉', '己卯': '申酉', '庚辰': '申酉', '辛巳': '申酉', '壬午': '申酉', '癸未': '申酉',
            '甲申': '午未', '乙酉': '午未', '丙戌': '午未', '丁亥': '午未', '戊子': '午未', '己丑': '午未', '庚寅': '午未', '辛卯': '午未', '壬辰': '午未', '癸巳': '午未',
            '甲午': '辰巳', '乙未': '辰巳', '丙申': '辰巳', '丁酉': '辰巳', '戊戌': '辰巳', '己亥': '辰巳', '庚子': '辰巳', '辛丑': '辰巳', '壬寅': '辰巳', '癸卯': '辰巳',
            '甲辰': '寅卯', '乙巳': '寅卯', '丙午': '寅卯', '丁未': '寅卯', '戊申': '寅卯', '己酉': '寅卯', '庚戌': '寅卯', '辛亥': '寅卯', '壬子': '寅卯', '癸丑': '寅卯',
            '甲寅': '子丑', '乙卯': '子丑', '丙辰': '子丑', '丁巳': '子丑', '戊午': '子丑', '己未': '子丑', '庚申': '子丑', '辛酉': '子丑', '壬戌': '子丑', '癸亥': '子丑'
        };

        function calculateMeishiki(date) {
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
                let daysInPrevMonth = getDaysInMonth(year, monthAdjusted);
                daysSinceSetsuiri = (daysInPrevMonth - prevMonthSetsuiriDay + 1) + day;
            }
            const monthTenkanOffset = [2, 4, 6, 8, 0];
            const yearTenkanGroup = yearKanshiIndex % 10;
            const monthTenkanIndex = (monthTenkanOffset[yearTenkanGroup % 5] + (monthAdjusted - 2) + 10) % 10;
            const monthTenkan = TENKAN[monthTenkanIndex];
            const monthChishi = CHISHI[monthAdjusted % 12];

            // 4. 蔵干
            const zokanMonth = TORIUMI_ZOKAN[monthChishi](daysSinceSetsuiri);
            const zokanYear = TORIUMI_ZOKAN[yearChishi](30);
            const zokanDay = TORIUMI_ZOKAN[dayChishi](30);

            // 5. 通変星 (蔵干ベース)
            const tuhenYear = TUHEN_TABLE[dayTenkan][yearTenkan]; // 年柱の通変星は天干から
            const tuhenMonth = TUHEN_TABLE[dayTenkan][monthTenkan]; // 月柱の通変星は天干から

            // 蔵干通変星
            const ztuhenYear = TUHEN_TABLE[dayTenkan][zokanYear];
            const ztuhenMonth = TUHEN_TABLE[dayTenkan][zokanMonth];
            const ztuhenDay = TUHEN_TABLE[dayTenkan][zokanDay];

            // 6. 十二運星
            const unseiYear = UNSEI_TABLE[dayTenkan][yearChishi];
            const unseiMonth = UNSEI_TABLE[dayTenkan][monthChishi];
            const unseiDay = UNSEI_TABLE[dayTenkan][dayChishi];

            const totalEnergy = ENERGY_VALUES[unseiYear] + ENERGY_VALUES[unseiMonth] + ENERGY_VALUES[unseiDay];
            const chushatsu = CHUSHATSU_TABLE[dayKanshiStr];

            return {
                dayTenkan, dayChishi, zokanDay,
                yearTenkan, yearChishi, zokanYear,
                monthTenkan, monthChishi, zokanMonth,
                tuhenYear, tuhenMonth,
                ztuhenYear, ztuhenMonth, ztuhenDay,
                unseiYear, unseiMonth, unseiDay,
                totalEnergy, chushatsu,
                daysSinceSetsuiri
            };
        }

        function displayResult(name, date, m) {
            document.getElementById('result-user-name').textContent = `${name} 様`;
            document.getElementById('result-user-info').textContent = `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日 生まれ`;
            document.getElementById('chushatsu-value').textContent = m.chushatsu;

            // 年柱
            document.getElementById('char-year').textContent = m.yearTenkan + m.yearChishi;
            document.getElementById('zokan-year').textContent = m.zokanYear;
            document.getElementById('tuhen-year').textContent = m.tuhenYear;
            document.getElementById('ztuhen-year').textContent = m.ztuhenYear;
            document.getElementById('unsei-year').textContent = m.unseiYear;
            document.getElementById('energy-year').textContent = ENERGY_VALUES[m.unseiYear];

            // 月柱
            document.getElementById('char-month').textContent = m.monthTenkan + m.monthChishi;
            document.getElementById('num-month').textContent = m.daysSinceSetsuiri;
            document.getElementById('zokan-month').textContent = m.zokanMonth;
            document.getElementById('tuhen-month').textContent = m.tuhenMonth;
            document.getElementById('ztuhen-month').textContent = m.ztuhenMonth;
            document.getElementById('unsei-month').textContent = m.unseiMonth;
            document.getElementById('energy-month').textContent = ENERGY_VALUES[m.unseiMonth];

            // 日柱
            document.getElementById('char-day').textContent = m.dayTenkan + m.dayChishi;
            document.getElementById('zokan-day').textContent = m.zokanDay;
            document.getElementById('ztuhen-day').textContent = m.ztuhenDay;
            document.getElementById('unsei-day').textContent = m.unseiDay;
            document.getElementById('energy-day').textContent = ENERGY_VALUES[m.unseiDay];

            const nature = NATURE_DATA[m.dayTenkan];
            document.getElementById('nature-icon').textContent = nature.icon;
            document.getElementById('nature-title').textContent = nature.title;
            document.getElementById('nature-desc').textContent = nature.desc;

            document.getElementById('energy-value').textContent = m.totalEnergy;
            let energyDesc = '';
            if (m.totalEnergy >= 25) energyDesc = '社会を牽引する、非常に強力なエネルギーを持っています。';
            else if (m.totalEnergy >= 15) energyDesc = 'バランスの取れた、安定したエネルギーの持ち主です。';
            else energyDesc = '自分自身の内面や特定の分野を深めるのに適したエネルギーです。';
            document.getElementById('energy-desc').textContent = energyDesc;

            // イメージ画像の設定
            const season = SEASON_MAP[m.dayChishi];
            let fileName = `${m.dayTenkan}（${season}）.webp`;
            if (m.dayTenkan === '辛' && season === '秋') {
                fileName = '辛（秋）.png';
            }
            const imgPath = `カメラ ロール/${encodeURIComponent(fileName)}`;
            const kanshiImg = document.getElementById('kanshi-image');
            kanshiImg.src = imgPath;
            kanshiImg.alt = `${m.dayTenkan}（${season}）のイメージ`;

            // 天中殺年表の生成
            renderChushatsuYearTable(m.chushatsu, m.dayTenkan);

            let report = `あなたは「${m.dayTenkan}」の性質を持ち、${nature.desc}\n\n`;
            report += `社会的な立場を表す月柱には「${m.tuhenMonth}」の主星があり、その性質があなたの人生の核となります。`;
            report += `また、十二運星には「${m.unseiDay}」を持っており、一生を通じて${m.unseiDay}の運気に守られています。\n\n`;
            report += `運勢エネルギーは${m.totalEnergy}点と、${energyDesc}`;

            document.getElementById('report-text').textContent = report;
        }

        /**
         * 天中殺年表の生成
         * chushatsuStr: 例) '戌亥' '申酉' '子丑' etc.
         * dayTenkan: 日干（陰陽の判定に使用）
         */
        function renderChushatsuYearTable(chushatsuStr, dayTenkan) {
            const container = document.getElementById('chushatsu-year-table');
            container.innerHTML = '';

            const cs1 = chushatsuStr[0]; // 空亡1年目の地支
            const cs2 = chushatsuStr[1]; // 空亡2年目の地支

            const currentYear = 2026;
            const startYear = currentYear - 6;
            const endYear = currentYear + 6;

            // 陽干（＋）か陰干（－）か判定
            const isYokan = ['甲', '丙', '戊', '庚', '壬'].includes(dayTenkan);

            // ルール：陽干ならcs2(2年目)、陰干ならcs1(1年目)を「天中殺1年目(忍耐: index 0)」とする
            const csStartChishi = isYokan ? cs2 : cs1;
            const cycleStartIdx = CHISHI.indexOf(csStartChishi);

            // 12年サイクルのラベル定義（指定ルールに準拠）
            const CYCLE_DATA = [
                { label: '忍耐', rating: '×', ratingClass: 'bad', desc: '天中殺: 1年目' },    // 0: 1年目
                { label: '陰徳', rating: '×', ratingClass: 'bad', desc: '天中殺: 2年目' },    // 1: 2年目
                { label: '修行', rating: '×', ratingClass: 'bad', desc: '天中殺: 3年目' },    // 2: 3年目
                { label: '夜明け', rating: '○', ratingClass: 'good', desc: '4年目' },        // 3: 4年目
                { label: '進化', rating: '○', ratingClass: 'good', desc: '5年目' },          // 4: 5年目
                { label: '決意', rating: '○', ratingClass: 'good', desc: '6年目' },          // 5: 6年目
                { label: '休息', rating: '×', ratingClass: 'bad', desc: '7年目' },           // 6: 7年目
                { label: '青春', rating: '◎', ratingClass: 'great', desc: '8年目' },        // 7: 8年目
                { label: '空転', rating: '××', ratingClass: 'bad', desc: '9年目' },          // 8: 9年目
                { label: '飛躍', rating: '◎◎', ratingClass: 'great', desc: '10年目' },      // 9: 10年目
                { label: '絶好調', rating: '◎◎', ratingClass: 'great', desc: '11年目' },    // 10: 11年目
                { label: '頂点', rating: '◎', ratingClass: 'great', desc: '12年目' },        // 11: 12年目
            ];

            // 年の地支を求める関数
            function getYearChishi(y) {
                let idx = (y - 4) % 12;
                if (idx < 0) idx += 12;
                return CHISHI[idx];
            }

            // 地支 → サイクル位置を計算
            function getCyclePosition(chishi) {
                const chishiIdx = CHISHI.indexOf(chishi);
                return (chishiIdx - cycleStartIdx + 12) % 12;
            }

            // 十二支の動物名
            const ZODIAC = {
                '子': '子（ね）', '丑': '丑（うし）', '寅': '寅（とら）', '卯': '卯（う）',
                '辰': '辰（たつ）', '巳': '巳（み）', '午': '午（うま）', '未': '未（ひつじ）',
                '申': '申（さる）', '酉': '酉（とり）', '戌': '戌（いぬ）', '亥': '亥（い）'
            };

            for (let y = startYear; y <= endYear; y++) {
                const chishi = getYearChishi(y);
                const cyclePos = getCyclePosition(chishi);
                const cycle = CYCLE_DATA[cyclePos];

                // 天中殺（1〜3年目 ＝ index 0, 1, 2）
                const isCS = (cyclePos >= 0 && cyclePos <= 2);
                const isNow = (y === currentYear);

                const row = document.createElement('div');
                let rowClass = 'cs-row';
                if (isCS) rowClass += ' cs-active';
                if (isNow) rowClass += ' cs-current';
                row.className = rowClass;

                // 年
                const yearCol = document.createElement('span');
                yearCol.className = 'cs-year';
                yearCol.textContent = `${y}年`;

                // 地支
                const chishiCol = document.createElement('span');
                chishiCol.className = 'cs-chishi';
                chishiCol.textContent = ZODIAC[chishi] || chishi;

                // ラベル＋説明
                const labelCol = document.createElement('span');
                labelCol.className = 'cs-label';
                labelCol.innerHTML = `<span class="cs-label-name">${cycle.label}</span><span class="cs-label-desc">${cycle.desc}</span>`;

                // ○△× 評価
                const ratingCol = document.createElement('span');
                ratingCol.className = `cs-rating cs-rating-${cycle.ratingClass}`;
                ratingCol.textContent = cycle.rating;

                // バッジ
                const badgeCol = document.createElement('span');
                badgeCol.className = 'cs-badges';
                let badgeHTML = '';
                if (isCS) badgeHTML += '<span class="cs-badge cs-on">天中殺</span>';
                if (isNow) badgeHTML += '<span class="cs-badge cs-now">今年</span>';
                badgeCol.innerHTML = badgeHTML;

                row.appendChild(yearCol);
                row.appendChild(chishiCol);
                row.appendChild(labelCol);
                row.appendChild(ratingCol);
                row.appendChild(badgeCol);
                container.appendChild(row);
            }
        }
    