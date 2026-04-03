export interface KanaChar {
  id: string;
  kana: string;
  romaji: string;
  type: 'hiragana' | 'katakana';
  category: 'basic' | 'dakuten' | 'combination';
  row: string;
}

const hiraganaBasic: KanaChar[] = [
  // Vowels
  { id: 'h_a',   kana: 'あ', romaji: 'a',   type: 'hiragana', category: 'basic', row: 'vowel' },
  { id: 'h_i',   kana: 'い', romaji: 'i',   type: 'hiragana', category: 'basic', row: 'vowel' },
  { id: 'h_u',   kana: 'う', romaji: 'u',   type: 'hiragana', category: 'basic', row: 'vowel' },
  { id: 'h_e',   kana: 'え', romaji: 'e',   type: 'hiragana', category: 'basic', row: 'vowel' },
  { id: 'h_o',   kana: 'お', romaji: 'o',   type: 'hiragana', category: 'basic', row: 'vowel' },
  // K row
  { id: 'h_ka',  kana: 'か', romaji: 'ka',  type: 'hiragana', category: 'basic', row: 'k' },
  { id: 'h_ki',  kana: 'き', romaji: 'ki',  type: 'hiragana', category: 'basic', row: 'k' },
  { id: 'h_ku',  kana: 'く', romaji: 'ku',  type: 'hiragana', category: 'basic', row: 'k' },
  { id: 'h_ke',  kana: 'け', romaji: 'ke',  type: 'hiragana', category: 'basic', row: 'k' },
  { id: 'h_ko',  kana: 'こ', romaji: 'ko',  type: 'hiragana', category: 'basic', row: 'k' },
  // S row
  { id: 'h_sa',  kana: 'さ', romaji: 'sa',  type: 'hiragana', category: 'basic', row: 's' },
  { id: 'h_shi', kana: 'し', romaji: 'shi', type: 'hiragana', category: 'basic', row: 's' },
  { id: 'h_su',  kana: 'す', romaji: 'su',  type: 'hiragana', category: 'basic', row: 's' },
  { id: 'h_se',  kana: 'せ', romaji: 'se',  type: 'hiragana', category: 'basic', row: 's' },
  { id: 'h_so',  kana: 'そ', romaji: 'so',  type: 'hiragana', category: 'basic', row: 's' },
  // T row
  { id: 'h_ta',  kana: 'た', romaji: 'ta',  type: 'hiragana', category: 'basic', row: 't' },
  { id: 'h_chi', kana: 'ち', romaji: 'chi', type: 'hiragana', category: 'basic', row: 't' },
  { id: 'h_tsu', kana: 'つ', romaji: 'tsu', type: 'hiragana', category: 'basic', row: 't' },
  { id: 'h_te',  kana: 'て', romaji: 'te',  type: 'hiragana', category: 'basic', row: 't' },
  { id: 'h_to',  kana: 'と', romaji: 'to',  type: 'hiragana', category: 'basic', row: 't' },
  // N row
  { id: 'h_na',  kana: 'な', romaji: 'na',  type: 'hiragana', category: 'basic', row: 'n' },
  { id: 'h_ni',  kana: 'に', romaji: 'ni',  type: 'hiragana', category: 'basic', row: 'n' },
  { id: 'h_nu',  kana: 'ぬ', romaji: 'nu',  type: 'hiragana', category: 'basic', row: 'n' },
  { id: 'h_ne',  kana: 'ね', romaji: 'ne',  type: 'hiragana', category: 'basic', row: 'n' },
  { id: 'h_no',  kana: 'の', romaji: 'no',  type: 'hiragana', category: 'basic', row: 'n' },
  // H row
  { id: 'h_ha',  kana: 'は', romaji: 'ha',  type: 'hiragana', category: 'basic', row: 'h' },
  { id: 'h_hi',  kana: 'ひ', romaji: 'hi',  type: 'hiragana', category: 'basic', row: 'h' },
  { id: 'h_fu',  kana: 'ふ', romaji: 'fu',  type: 'hiragana', category: 'basic', row: 'h' },
  { id: 'h_he',  kana: 'へ', romaji: 'he',  type: 'hiragana', category: 'basic', row: 'h' },
  { id: 'h_ho',  kana: 'ほ', romaji: 'ho',  type: 'hiragana', category: 'basic', row: 'h' },
  // M row
  { id: 'h_ma',  kana: 'ま', romaji: 'ma',  type: 'hiragana', category: 'basic', row: 'm' },
  { id: 'h_mi',  kana: 'み', romaji: 'mi',  type: 'hiragana', category: 'basic', row: 'm' },
  { id: 'h_mu',  kana: 'む', romaji: 'mu',  type: 'hiragana', category: 'basic', row: 'm' },
  { id: 'h_me',  kana: 'め', romaji: 'me',  type: 'hiragana', category: 'basic', row: 'm' },
  { id: 'h_mo',  kana: 'も', romaji: 'mo',  type: 'hiragana', category: 'basic', row: 'm' },
  // Y row
  { id: 'h_ya',  kana: 'や', romaji: 'ya',  type: 'hiragana', category: 'basic', row: 'y' },
  { id: 'h_yu',  kana: 'ゆ', romaji: 'yu',  type: 'hiragana', category: 'basic', row: 'y' },
  { id: 'h_yo',  kana: 'よ', romaji: 'yo',  type: 'hiragana', category: 'basic', row: 'y' },
  // R row
  { id: 'h_ra',  kana: 'ら', romaji: 'ra',  type: 'hiragana', category: 'basic', row: 'r' },
  { id: 'h_ri',  kana: 'り', romaji: 'ri',  type: 'hiragana', category: 'basic', row: 'r' },
  { id: 'h_ru',  kana: 'る', romaji: 'ru',  type: 'hiragana', category: 'basic', row: 'r' },
  { id: 'h_re',  kana: 'れ', romaji: 're',  type: 'hiragana', category: 'basic', row: 'r' },
  { id: 'h_ro',  kana: 'ろ', romaji: 'ro',  type: 'hiragana', category: 'basic', row: 'r' },
  // W row
  { id: 'h_wa',  kana: 'わ', romaji: 'wa',  type: 'hiragana', category: 'basic', row: 'w' },
  { id: 'h_wo',  kana: 'を', romaji: 'wo',  type: 'hiragana', category: 'basic', row: 'w' },
  // N
  { id: 'h_n',   kana: 'ん', romaji: 'n',   type: 'hiragana', category: 'basic', row: 'n_standalone' },
];

const hiraganaDakuten: KanaChar[] = [
  // G row (k+dakuten)
  { id: 'h_ga',  kana: 'が', romaji: 'ga',  type: 'hiragana', category: 'dakuten', row: 'g' },
  { id: 'h_gi',  kana: 'ぎ', romaji: 'gi',  type: 'hiragana', category: 'dakuten', row: 'g' },
  { id: 'h_gu',  kana: 'ぐ', romaji: 'gu',  type: 'hiragana', category: 'dakuten', row: 'g' },
  { id: 'h_ge',  kana: 'げ', romaji: 'ge',  type: 'hiragana', category: 'dakuten', row: 'g' },
  { id: 'h_go',  kana: 'ご', romaji: 'go',  type: 'hiragana', category: 'dakuten', row: 'g' },
  // Z row (s+dakuten)
  { id: 'h_za',  kana: 'ざ', romaji: 'za',  type: 'hiragana', category: 'dakuten', row: 'z' },
  { id: 'h_ji',  kana: 'じ', romaji: 'ji',  type: 'hiragana', category: 'dakuten', row: 'z' },
  { id: 'h_zu',  kana: 'ず', romaji: 'zu',  type: 'hiragana', category: 'dakuten', row: 'z' },
  { id: 'h_ze',  kana: 'ぜ', romaji: 'ze',  type: 'hiragana', category: 'dakuten', row: 'z' },
  { id: 'h_zo',  kana: 'ぞ', romaji: 'zo',  type: 'hiragana', category: 'dakuten', row: 'z' },
  // D row (t+dakuten)
  { id: 'h_da',  kana: 'だ', romaji: 'da',  type: 'hiragana', category: 'dakuten', row: 'd' },
  { id: 'h_di',  kana: 'ぢ', romaji: 'di',  type: 'hiragana', category: 'dakuten', row: 'd' },
  { id: 'h_du',  kana: 'づ', romaji: 'du',  type: 'hiragana', category: 'dakuten', row: 'd' },
  { id: 'h_de',  kana: 'で', romaji: 'de',  type: 'hiragana', category: 'dakuten', row: 'd' },
  { id: 'h_do',  kana: 'ど', romaji: 'do',  type: 'hiragana', category: 'dakuten', row: 'd' },
  // B row (h+dakuten)
  { id: 'h_ba',  kana: 'ば', romaji: 'ba',  type: 'hiragana', category: 'dakuten', row: 'b' },
  { id: 'h_bi',  kana: 'び', romaji: 'bi',  type: 'hiragana', category: 'dakuten', row: 'b' },
  { id: 'h_bu',  kana: 'ぶ', romaji: 'bu',  type: 'hiragana', category: 'dakuten', row: 'b' },
  { id: 'h_be',  kana: 'べ', romaji: 'be',  type: 'hiragana', category: 'dakuten', row: 'b' },
  { id: 'h_bo',  kana: 'ぼ', romaji: 'bo',  type: 'hiragana', category: 'dakuten', row: 'b' },
  // P row (h+handakuten)
  { id: 'h_pa',  kana: 'ぱ', romaji: 'pa',  type: 'hiragana', category: 'dakuten', row: 'p' },
  { id: 'h_pi',  kana: 'ぴ', romaji: 'pi',  type: 'hiragana', category: 'dakuten', row: 'p' },
  { id: 'h_pu',  kana: 'ぷ', romaji: 'pu',  type: 'hiragana', category: 'dakuten', row: 'p' },
  { id: 'h_pe',  kana: 'ぺ', romaji: 'pe',  type: 'hiragana', category: 'dakuten', row: 'p' },
  { id: 'h_po',  kana: 'ぽ', romaji: 'po',  type: 'hiragana', category: 'dakuten', row: 'p' },
];

const hiraganaCombo: KanaChar[] = [
  // kya/kyu/kyo
  { id: 'h_kya', kana: 'きゃ', romaji: 'kya', type: 'hiragana', category: 'combination', row: 'ky' },
  { id: 'h_kyu', kana: 'きゅ', romaji: 'kyu', type: 'hiragana', category: 'combination', row: 'ky' },
  { id: 'h_kyo', kana: 'きょ', romaji: 'kyo', type: 'hiragana', category: 'combination', row: 'ky' },
  // sha/shu/sho
  { id: 'h_sha', kana: 'しゃ', romaji: 'sha', type: 'hiragana', category: 'combination', row: 'sh' },
  { id: 'h_shu', kana: 'しゅ', romaji: 'shu', type: 'hiragana', category: 'combination', row: 'sh' },
  { id: 'h_sho', kana: 'しょ', romaji: 'sho', type: 'hiragana', category: 'combination', row: 'sh' },
  // cha/chu/cho
  { id: 'h_cha', kana: 'ちゃ', romaji: 'cha', type: 'hiragana', category: 'combination', row: 'ch' },
  { id: 'h_chu', kana: 'ちゅ', romaji: 'chu', type: 'hiragana', category: 'combination', row: 'ch' },
  { id: 'h_cho', kana: 'ちょ', romaji: 'cho', type: 'hiragana', category: 'combination', row: 'ch' },
  // nya/nyu/nyo
  { id: 'h_nya', kana: 'にゃ', romaji: 'nya', type: 'hiragana', category: 'combination', row: 'ny' },
  { id: 'h_nyu', kana: 'にゅ', romaji: 'nyu', type: 'hiragana', category: 'combination', row: 'ny' },
  { id: 'h_nyo', kana: 'にょ', romaji: 'nyo', type: 'hiragana', category: 'combination', row: 'ny' },
  // hya/hyu/hyo
  { id: 'h_hya', kana: 'ひゃ', romaji: 'hya', type: 'hiragana', category: 'combination', row: 'hy' },
  { id: 'h_hyu', kana: 'ひゅ', romaji: 'hyu', type: 'hiragana', category: 'combination', row: 'hy' },
  { id: 'h_hyo', kana: 'ひょ', romaji: 'hyo', type: 'hiragana', category: 'combination', row: 'hy' },
  // mya/myu/myo
  { id: 'h_mya', kana: 'みゃ', romaji: 'mya', type: 'hiragana', category: 'combination', row: 'my' },
  { id: 'h_myu', kana: 'みゅ', romaji: 'myu', type: 'hiragana', category: 'combination', row: 'my' },
  { id: 'h_myo', kana: 'みょ', romaji: 'myo', type: 'hiragana', category: 'combination', row: 'my' },
  // rya/ryu/ryo
  { id: 'h_rya', kana: 'りゃ', romaji: 'rya', type: 'hiragana', category: 'combination', row: 'ry' },
  { id: 'h_ryu', kana: 'りゅ', romaji: 'ryu', type: 'hiragana', category: 'combination', row: 'ry' },
  { id: 'h_ryo', kana: 'りょ', romaji: 'ryo', type: 'hiragana', category: 'combination', row: 'ry' },
  // gya/gyu/gyo
  { id: 'h_gya', kana: 'ぎゃ', romaji: 'gya', type: 'hiragana', category: 'combination', row: 'gy' },
  { id: 'h_gyu', kana: 'ぎゅ', romaji: 'gyu', type: 'hiragana', category: 'combination', row: 'gy' },
  { id: 'h_gyo', kana: 'ぎょ', romaji: 'gyo', type: 'hiragana', category: 'combination', row: 'gy' },
  // ja/ju/jo
  { id: 'h_ja',  kana: 'じゃ', romaji: 'ja',  type: 'hiragana', category: 'combination', row: 'j' },
  { id: 'h_ju',  kana: 'じゅ', romaji: 'ju',  type: 'hiragana', category: 'combination', row: 'j' },
  { id: 'h_jo',  kana: 'じょ', romaji: 'jo',  type: 'hiragana', category: 'combination', row: 'j' },
  // bya/byu/byo
  { id: 'h_bya', kana: 'びゃ', romaji: 'bya', type: 'hiragana', category: 'combination', row: 'by' },
  { id: 'h_byu', kana: 'びゅ', romaji: 'byu', type: 'hiragana', category: 'combination', row: 'by' },
  { id: 'h_byo', kana: 'びょ', romaji: 'byo', type: 'hiragana', category: 'combination', row: 'by' },
  // pya/pyu/pyo
  { id: 'h_pya', kana: 'ぴゃ', romaji: 'pya', type: 'hiragana', category: 'combination', row: 'py' },
  { id: 'h_pyu', kana: 'ぴゅ', romaji: 'pyu', type: 'hiragana', category: 'combination', row: 'py' },
  { id: 'h_pyo', kana: 'ぴょ', romaji: 'pyo', type: 'hiragana', category: 'combination', row: 'py' },
];

const katakanaBasic: KanaChar[] = [
  // Vowels
  { id: 'k_a',   kana: 'ア', romaji: 'a',   type: 'katakana', category: 'basic', row: 'vowel' },
  { id: 'k_i',   kana: 'イ', romaji: 'i',   type: 'katakana', category: 'basic', row: 'vowel' },
  { id: 'k_u',   kana: 'ウ', romaji: 'u',   type: 'katakana', category: 'basic', row: 'vowel' },
  { id: 'k_e',   kana: 'エ', romaji: 'e',   type: 'katakana', category: 'basic', row: 'vowel' },
  { id: 'k_o',   kana: 'オ', romaji: 'o',   type: 'katakana', category: 'basic', row: 'vowel' },
  // K row
  { id: 'k_ka',  kana: 'カ', romaji: 'ka',  type: 'katakana', category: 'basic', row: 'k' },
  { id: 'k_ki',  kana: 'キ', romaji: 'ki',  type: 'katakana', category: 'basic', row: 'k' },
  { id: 'k_ku',  kana: 'ク', romaji: 'ku',  type: 'katakana', category: 'basic', row: 'k' },
  { id: 'k_ke',  kana: 'ケ', romaji: 'ke',  type: 'katakana', category: 'basic', row: 'k' },
  { id: 'k_ko',  kana: 'コ', romaji: 'ko',  type: 'katakana', category: 'basic', row: 'k' },
  // S row
  { id: 'k_sa',  kana: 'サ', romaji: 'sa',  type: 'katakana', category: 'basic', row: 's' },
  { id: 'k_shi', kana: 'シ', romaji: 'shi', type: 'katakana', category: 'basic', row: 's' },
  { id: 'k_su',  kana: 'ス', romaji: 'su',  type: 'katakana', category: 'basic', row: 's' },
  { id: 'k_se',  kana: 'セ', romaji: 'se',  type: 'katakana', category: 'basic', row: 's' },
  { id: 'k_so',  kana: 'ソ', romaji: 'so',  type: 'katakana', category: 'basic', row: 's' },
  // T row
  { id: 'k_ta',  kana: 'タ', romaji: 'ta',  type: 'katakana', category: 'basic', row: 't' },
  { id: 'k_chi', kana: 'チ', romaji: 'chi', type: 'katakana', category: 'basic', row: 't' },
  { id: 'k_tsu', kana: 'ツ', romaji: 'tsu', type: 'katakana', category: 'basic', row: 't' },
  { id: 'k_te',  kana: 'テ', romaji: 'te',  type: 'katakana', category: 'basic', row: 't' },
  { id: 'k_to',  kana: 'ト', romaji: 'to',  type: 'katakana', category: 'basic', row: 't' },
  // N row
  { id: 'k_na',  kana: 'ナ', romaji: 'na',  type: 'katakana', category: 'basic', row: 'n' },
  { id: 'k_ni',  kana: 'ニ', romaji: 'ni',  type: 'katakana', category: 'basic', row: 'n' },
  { id: 'k_nu',  kana: 'ヌ', romaji: 'nu',  type: 'katakana', category: 'basic', row: 'n' },
  { id: 'k_ne',  kana: 'ネ', romaji: 'ne',  type: 'katakana', category: 'basic', row: 'n' },
  { id: 'k_no',  kana: 'ノ', romaji: 'no',  type: 'katakana', category: 'basic', row: 'n' },
  // H row
  { id: 'k_ha',  kana: 'ハ', romaji: 'ha',  type: 'katakana', category: 'basic', row: 'h' },
  { id: 'k_hi',  kana: 'ヒ', romaji: 'hi',  type: 'katakana', category: 'basic', row: 'h' },
  { id: 'k_fu',  kana: 'フ', romaji: 'fu',  type: 'katakana', category: 'basic', row: 'h' },
  { id: 'k_he',  kana: 'ヘ', romaji: 'he',  type: 'katakana', category: 'basic', row: 'h' },
  { id: 'k_ho',  kana: 'ホ', romaji: 'ho',  type: 'katakana', category: 'basic', row: 'h' },
  // M row
  { id: 'k_ma',  kana: 'マ', romaji: 'ma',  type: 'katakana', category: 'basic', row: 'm' },
  { id: 'k_mi',  kana: 'ミ', romaji: 'mi',  type: 'katakana', category: 'basic', row: 'm' },
  { id: 'k_mu',  kana: 'ム', romaji: 'mu',  type: 'katakana', category: 'basic', row: 'm' },
  { id: 'k_me',  kana: 'メ', romaji: 'me',  type: 'katakana', category: 'basic', row: 'm' },
  { id: 'k_mo',  kana: 'モ', romaji: 'mo',  type: 'katakana', category: 'basic', row: 'm' },
  // Y row
  { id: 'k_ya',  kana: 'ヤ', romaji: 'ya',  type: 'katakana', category: 'basic', row: 'y' },
  { id: 'k_yu',  kana: 'ユ', romaji: 'yu',  type: 'katakana', category: 'basic', row: 'y' },
  { id: 'k_yo',  kana: 'ヨ', romaji: 'yo',  type: 'katakana', category: 'basic', row: 'y' },
  // R row
  { id: 'k_ra',  kana: 'ラ', romaji: 'ra',  type: 'katakana', category: 'basic', row: 'r' },
  { id: 'k_ri',  kana: 'リ', romaji: 'ri',  type: 'katakana', category: 'basic', row: 'r' },
  { id: 'k_ru',  kana: 'ル', romaji: 'ru',  type: 'katakana', category: 'basic', row: 'r' },
  { id: 'k_re',  kana: 'レ', romaji: 're',  type: 'katakana', category: 'basic', row: 'r' },
  { id: 'k_ro',  kana: 'ロ', romaji: 'ro',  type: 'katakana', category: 'basic', row: 'r' },
  // W row
  { id: 'k_wa',  kana: 'ワ', romaji: 'wa',  type: 'katakana', category: 'basic', row: 'w' },
  { id: 'k_wo',  kana: 'ヲ', romaji: 'wo',  type: 'katakana', category: 'basic', row: 'w' },
  // N
  { id: 'k_n',   kana: 'ン', romaji: 'n',   type: 'katakana', category: 'basic', row: 'n_standalone' },
];

const katakanaDakuten: KanaChar[] = [
  // G row
  { id: 'k_ga',  kana: 'ガ', romaji: 'ga',  type: 'katakana', category: 'dakuten', row: 'g' },
  { id: 'k_gi',  kana: 'ギ', romaji: 'gi',  type: 'katakana', category: 'dakuten', row: 'g' },
  { id: 'k_gu',  kana: 'グ', romaji: 'gu',  type: 'katakana', category: 'dakuten', row: 'g' },
  { id: 'k_ge',  kana: 'ゲ', romaji: 'ge',  type: 'katakana', category: 'dakuten', row: 'g' },
  { id: 'k_go',  kana: 'ゴ', romaji: 'go',  type: 'katakana', category: 'dakuten', row: 'g' },
  // Z row
  { id: 'k_za',  kana: 'ザ', romaji: 'za',  type: 'katakana', category: 'dakuten', row: 'z' },
  { id: 'k_ji',  kana: 'ジ', romaji: 'ji',  type: 'katakana', category: 'dakuten', row: 'z' },
  { id: 'k_zu',  kana: 'ズ', romaji: 'zu',  type: 'katakana', category: 'dakuten', row: 'z' },
  { id: 'k_ze',  kana: 'ゼ', romaji: 'ze',  type: 'katakana', category: 'dakuten', row: 'z' },
  { id: 'k_zo',  kana: 'ゾ', romaji: 'zo',  type: 'katakana', category: 'dakuten', row: 'z' },
  // D row
  { id: 'k_da',  kana: 'ダ', romaji: 'da',  type: 'katakana', category: 'dakuten', row: 'd' },
  { id: 'k_di',  kana: 'ヂ', romaji: 'di',  type: 'katakana', category: 'dakuten', row: 'd' },
  { id: 'k_du',  kana: 'ヅ', romaji: 'du',  type: 'katakana', category: 'dakuten', row: 'd' },
  { id: 'k_de',  kana: 'デ', romaji: 'de',  type: 'katakana', category: 'dakuten', row: 'd' },
  { id: 'k_do',  kana: 'ド', romaji: 'do',  type: 'katakana', category: 'dakuten', row: 'd' },
  // B row
  { id: 'k_ba',  kana: 'バ', romaji: 'ba',  type: 'katakana', category: 'dakuten', row: 'b' },
  { id: 'k_bi',  kana: 'ビ', romaji: 'bi',  type: 'katakana', category: 'dakuten', row: 'b' },
  { id: 'k_bu',  kana: 'ブ', romaji: 'bu',  type: 'katakana', category: 'dakuten', row: 'b' },
  { id: 'k_be',  kana: 'ベ', romaji: 'be',  type: 'katakana', category: 'dakuten', row: 'b' },
  { id: 'k_bo',  kana: 'ボ', romaji: 'bo',  type: 'katakana', category: 'dakuten', row: 'b' },
  // P row
  { id: 'k_pa',  kana: 'パ', romaji: 'pa',  type: 'katakana', category: 'dakuten', row: 'p' },
  { id: 'k_pi',  kana: 'ピ', romaji: 'pi',  type: 'katakana', category: 'dakuten', row: 'p' },
  { id: 'k_pu',  kana: 'プ', romaji: 'pu',  type: 'katakana', category: 'dakuten', row: 'p' },
  { id: 'k_pe',  kana: 'ペ', romaji: 'pe',  type: 'katakana', category: 'dakuten', row: 'p' },
  { id: 'k_po',  kana: 'ポ', romaji: 'po',  type: 'katakana', category: 'dakuten', row: 'p' },
];

const katakanaCombo: KanaChar[] = [
  // kya/kyu/kyo
  { id: 'k_kya', kana: 'キャ', romaji: 'kya', type: 'katakana', category: 'combination', row: 'ky' },
  { id: 'k_kyu', kana: 'キュ', romaji: 'kyu', type: 'katakana', category: 'combination', row: 'ky' },
  { id: 'k_kyo', kana: 'キョ', romaji: 'kyo', type: 'katakana', category: 'combination', row: 'ky' },
  // sha/shu/sho
  { id: 'k_sha', kana: 'シャ', romaji: 'sha', type: 'katakana', category: 'combination', row: 'sh' },
  { id: 'k_shu', kana: 'シュ', romaji: 'shu', type: 'katakana', category: 'combination', row: 'sh' },
  { id: 'k_sho', kana: 'ショ', romaji: 'sho', type: 'katakana', category: 'combination', row: 'sh' },
  // cha/chu/cho
  { id: 'k_cha', kana: 'チャ', romaji: 'cha', type: 'katakana', category: 'combination', row: 'ch' },
  { id: 'k_chu', kana: 'チュ', romaji: 'chu', type: 'katakana', category: 'combination', row: 'ch' },
  { id: 'k_cho', kana: 'チョ', romaji: 'cho', type: 'katakana', category: 'combination', row: 'ch' },
  // nya/nyu/nyo
  { id: 'k_nya', kana: 'ニャ', romaji: 'nya', type: 'katakana', category: 'combination', row: 'ny' },
  { id: 'k_nyu', kana: 'ニュ', romaji: 'nyu', type: 'katakana', category: 'combination', row: 'ny' },
  { id: 'k_nyo', kana: 'ニョ', romaji: 'nyo', type: 'katakana', category: 'combination', row: 'ny' },
  // hya/hyu/hyo
  { id: 'k_hya', kana: 'ヒャ', romaji: 'hya', type: 'katakana', category: 'combination', row: 'hy' },
  { id: 'k_hyu', kana: 'ヒュ', romaji: 'hyu', type: 'katakana', category: 'combination', row: 'hy' },
  { id: 'k_hyo', kana: 'ヒョ', romaji: 'hyo', type: 'katakana', category: 'combination', row: 'hy' },
  // mya/myu/myo
  { id: 'k_mya', kana: 'ミャ', romaji: 'mya', type: 'katakana', category: 'combination', row: 'my' },
  { id: 'k_myu', kana: 'ミュ', romaji: 'myu', type: 'katakana', category: 'combination', row: 'my' },
  { id: 'k_myo', kana: 'ミョ', romaji: 'myo', type: 'katakana', category: 'combination', row: 'my' },
  // rya/ryu/ryo
  { id: 'k_rya', kana: 'リャ', romaji: 'rya', type: 'katakana', category: 'combination', row: 'ry' },
  { id: 'k_ryu', kana: 'リュ', romaji: 'ryu', type: 'katakana', category: 'combination', row: 'ry' },
  { id: 'k_ryo', kana: 'リョ', romaji: 'ryo', type: 'katakana', category: 'combination', row: 'ry' },
  // gya/gyu/gyo
  { id: 'k_gya', kana: 'ギャ', romaji: 'gya', type: 'katakana', category: 'combination', row: 'gy' },
  { id: 'k_gyu', kana: 'ギュ', romaji: 'gyu', type: 'katakana', category: 'combination', row: 'gy' },
  { id: 'k_gyo', kana: 'ギョ', romaji: 'gyo', type: 'katakana', category: 'combination', row: 'gy' },
  // ja/ju/jo
  { id: 'k_ja',  kana: 'ジャ', romaji: 'ja',  type: 'katakana', category: 'combination', row: 'j' },
  { id: 'k_ju',  kana: 'ジュ', romaji: 'ju',  type: 'katakana', category: 'combination', row: 'j' },
  { id: 'k_jo',  kana: 'ジョ', romaji: 'jo',  type: 'katakana', category: 'combination', row: 'j' },
  // bya/byu/byo
  { id: 'k_bya', kana: 'ビャ', romaji: 'bya', type: 'katakana', category: 'combination', row: 'by' },
  { id: 'k_byu', kana: 'ビュ', romaji: 'byu', type: 'katakana', category: 'combination', row: 'by' },
  { id: 'k_byo', kana: 'ビョ', romaji: 'byo', type: 'katakana', category: 'combination', row: 'by' },
  // pya/pyu/pyo
  { id: 'k_pya', kana: 'ピャ', romaji: 'pya', type: 'katakana', category: 'combination', row: 'py' },
  { id: 'k_pyu', kana: 'ピュ', romaji: 'pyu', type: 'katakana', category: 'combination', row: 'py' },
  { id: 'k_pyo', kana: 'ピョ', romaji: 'pyo', type: 'katakana', category: 'combination', row: 'py' },
];

export const allCharacters: KanaChar[] = [
  ...hiraganaBasic,
  ...hiraganaDakuten,
  ...hiraganaCombo,
  ...katakanaBasic,
  ...katakanaDakuten,
  ...katakanaCombo,
];

export const charactersByGroup = {
  hiragana_basic:       hiraganaBasic,
  hiragana_dakuten:     hiraganaDakuten,
  hiragana_combination: hiraganaCombo,
  katakana_basic:       katakanaBasic,
  katakana_dakuten:     katakanaDakuten,
  katakana_combination: katakanaCombo,
} as const;

export type CharGroup = keyof typeof charactersByGroup;

export const groupLabels: Record<CharGroup, string> = {
  hiragana_basic:       'Hiragana Basic',
  hiragana_dakuten:     'Hiragana Dakuten',
  hiragana_combination: 'Hiragana Combinations',
  katakana_basic:       'Katakana Basic',
  katakana_dakuten:     'Katakana Dakuten',
  katakana_combination: 'Katakana Combinations',
};

export const groupPreviews: Record<CharGroup, string[]> = {
  hiragana_basic:       ['あ', 'い', 'う', 'え'],
  hiragana_dakuten:     ['が', 'ざ', 'だ', 'ば'],
  hiragana_combination: ['きゃ', 'しゃ', 'ちゃ', 'にゃ'],
  katakana_basic:       ['ア', 'イ', 'ウ', 'エ'],
  katakana_dakuten:     ['ガ', 'ザ', 'ダ', 'バ'],
  katakana_combination: ['キャ', 'シャ', 'チャ', 'ニャ'],
};
