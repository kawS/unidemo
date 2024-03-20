const seriesList = ['FB01', 'FP', 'FS01', 'FS02', 'FS03', 'FS04'];

const returnDetList = (series, cb) => {
  switch(series){
    case 'FB01': import('../json/FB01.json').then(res => { cb(res.default)}); break;
    case 'FS01': import('../json/FS01.json').then(res => { cb(res.default)}); break;
    case 'FS02': import('../json/FS02.json').then(res => { cb(res.default)}); break;
    case 'FS03': import('../json/FS03.json').then(res => { cb(res.default)}); break;
    case 'FS04': import('../json/FS04.json').then(res => { cb(res.default)}); break;
    case 'FP': import('../json/FP.json').then(res => { cb(res.default)}); break;
  }
}

const _showLoading = (duration = 1000) => {
  uni.showLoading({
    title: '加载中',
    mask: true
  });
  setTimeout(function () {
    uni.hideLoading()
  }, duration);
}

export { seriesList, returnDetList, _showLoading }