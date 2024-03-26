const seriesList = ['SV5', 'SV4_5', 'SV4', 'SV3_5', 'SV3', 'SV2', 'SV1', 'SS12_5', 'SS12', 'SS11', 'SS10_5', 'SS10', 'SS9'];

const seriesCodeList = {'TEF': 'SV5', 'PAF': 'SV4_5', 'PAR': 'SV4', 'MEW': 'SV3_5', 'OBF': 'SV3', 'PAL': 'SV2', 'SVI': 'SV1', 'CRZ': 'SS12_5', 'SIT': 'SS12', 'LOR': 'SS11', 'PGO': 'SS10_5', 'ASR': 'SS10', 'BRS': 'SS9'};

const returnSerDetList = function(series, cb, defCb){
  switch(series.replace('_', '.')) {
    case 'SV5': import('../pages/seriesDet/json/SV5.json').then((res) => {typeof cb == 'function' && cb(res)}); break;
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
    default: typeof defCb == 'function' && defCb(); break
  }
}

export { seriesList, seriesCodeList, returnSerDetList }