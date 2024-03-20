const seriesList = ['SV4_5', 'SV4', 'SV3_5', 'SV3', 'SV2', 'SV1', 'SS12_5', 'SS12', 'SS11', 'SS10_5', 'SS10', 'SS9', 'SS8', 'SS7_5', 'SS7', 'SS6', 'SS5'];

const seriesCodeList = {'PAF': 'SV4_5', 'PAR': 'SV4', 'MEW': 'SV3_5', 'OBF': 'SV3', 'PAL': 'SV2', 'SVI': 'SV1', 'CRZ': 'SS12_5', 'SIT': 'SS12', 'LOR': 'SS11', 'PGO': 'SS10_5', 'ASR': 'SS10', 'BRS': 'SS9', 'FST': 'SS8', 'CEL': 'SS7_5', 'EVS': 'SS7', 'CRE': 'SS6', 'BST': 'SS5'};

const returnSerDetList = function(series, cb, defCb){
  switch(series.replace('_', '.')) {
    case 'SV4.5': import('../pages/seriesDet/json/SV4_5.json').then((res) => {typeof cb == 'function' && cb(res)}); break;
    case 'SV4': import('../pages/seriesDet/json/SV4.json').then((res) => {typeof cb == 'function' && cb(res)}); break;
    case 'SV3.5': import('../pages/seriesDet/json/SV3_5.json').then((res) => {typeof cb == 'function' && cb(res)}); break;
    case 'SV3': import('../pages/seriesDet/json/SV3.json').then((res) => {typeof cb == 'function' && cb(res)}); break;
    case 'SV2': import('../pages/seriesDet/json/SV2.json').then((res) => {typeof cb == 'function' && cb(res)}); break;
    case 'SV1': import('../pages/seriesDet/json/SV1.json').then((res) => {typeof cb == 'function' && cb(res)}); break;
    case 'SS12.5': import('../pages/seriesDet/json/SS12_5.json').then((res) => {typeof cb == 'function' && cb(res)}); break;
    case 'SS12': import('../pages/seriesDet/json/SS12.json').then((res) => {typeof cb == 'function' && cb(res)}); break;
    case 'SS11': import('../pages/seriesDet/json/SS11.json').then((res) => {typeof cb == 'function' && cb(res)}); break;
    case 'SS10.5': import('../pages/seriesDet/json/SS10_5.json').then((res) => {typeof cb == 'function' && cb(res)}); break;
    case 'SS10': import('../pages/seriesDet/json/SS10.json').then((res) => {typeof cb == 'function' && cb(res)}); break;
    case 'SS9': import('../pages/seriesDet/json/SS9.json').then((res) => {typeof cb == 'function' && cb(res)}); break;
    case 'SS8': import('../pages/seriesDet/json/SS8.json').then((res) => {typeof cb == 'function' && cb(res)}); break;
    case 'SS7.5': import('../pages/seriesDet/json/SS7_5.json').then((res) => {typeof cb == 'function' && cb(res)}); break;
    case 'SS7': import('../pages/seriesDet/json/SS7.json').then((res) => {typeof cb == 'function' && cb(res)}); break;
    case 'SS6': import('../pages/seriesDet/json/SS6.json').then((res) => {typeof cb == 'function' && cb(res)}); break;
    case 'SS5': import('../pages/seriesDet/json/SS5.json').then((res) => {typeof cb == 'function' && cb(res)}); break;
    default: typeof defCb == 'function' && defCb(); break
  }
}

export { seriesList, seriesCodeList, returnSerDetList }