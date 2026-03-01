const TENKAN = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
const CHISHI = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
const SETSUIRI = [5, 4, 6, 5, 5, 6, 7, 7, 8, 8, 7, 7];

function test(dateStr) {
    const date = new Date(dateStr);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    let yearForKanshi = year;
    if (month < 2 || (month === 2 && day < SETSUIRI[month - 1])) {
        yearForKanshi--;
    }
    let yearKanshiIndex = (yearForKanshi - 4) % 60;
    if (yearKanshiIndex < 0) yearKanshiIndex += 60;
    const yearTenkan = TENKAN[yearKanshiIndex % 10];
    const yearChishi = CHISHI[yearKanshiIndex % 12];

    let monthAdjusted = month;
    if (day < SETSUIRI[month - 1]) {
        monthAdjusted--;
    }
    if (monthAdjusted === 0) monthAdjusted = 12;

    const monthTenkanIndex = (((yearKanshiIndex % 5) * 2 + 2 + (monthAdjusted - 2)) + 10) % 10;
    const monthTenkan = TENKAN[monthTenkanIndex];
    const monthChishi = CHISHI[monthAdjusted % 12];

    console.log(`Input Date: ${dateStr}`);
    console.log(`Year: ${yearTenkan}${yearChishi} (Index: ${yearKanshiIndex})`);
    console.log(`Month Index (monthAdjusted): ${monthAdjusted}`);
    console.log(`Month Pillar: ${monthTenkan}${monthChishi}`);
}

console.log('--- Testing 1988-06-29 ---');
test('1988-06-29');

console.log('\n--- Testing 1988-06-05 (Before Setsuiri) ---');
test('1988-06-05');
