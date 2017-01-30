/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 16);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.formatRow = exports.getStationName = exports.isString = undefined;

var _chalk = __webpack_require__(2);

var _chalk2 = _interopRequireDefault(_chalk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var stationNames = void 0;

var isString = exports.isString = function isString(s) {
    return typeof s === 'string';
};
var getStationName = exports.getStationName = function getStationName(name) {
    if (!stationNames) {
        stationNames = __webpack_require__(12);
    }
    return stationNames[name];
};

// 格式化一行数据
var formatRow = exports.formatRow = function formatRow(row) {
    return [
    // 车次
    row.station_train_code,
    // 出发、到达时间
    [_chalk2.default.yellow(row.from_station_name),
    // row.throughInfo ? row.throughInfo.to_station_name : '',
    _chalk2.default.green(row.to_station_name)].join('->'),
    // 出发、到达站
    [_chalk2.default.yellow(row.start_time),
    // row.throughInfo ? row.throughInfo.arrive_time : '',
    _chalk2.default.green(row.arrive_time)].join('->'),
    // 历时
    row.lishi,
    // 一等坐
    row.zy_num,
    // 二等坐
    row.ze_num,
    // 软卧
    row.rw_num,
    // 软坐
    row.yw_num,
    // 硬坐
    row.yz_num,
    // 备注
    isString(row.note) ? row.note.replace('月', '/').replace('点', ':').replace(/分|起|售|日/g, '').replace('<br/>', ' ') : ''];
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _request = __webpack_require__(4);

var _request2 = _interopRequireDefault(_request);

var _es6Promise = __webpack_require__(3);

var _es6Promise2 = _interopRequireDefault(_es6Promise);

var _helpers = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var requestTickets = function requestTickets(from, to, date) {
    return new _es6Promise2.default(function (resolve, reject) {
        var fromStation = (0, _helpers.getStationName)(from);
        var toStation = (0, _helpers.getStationName)(to);

        if (!fromStation) {
            reject({
                msg: '出发站代码未找到',
                data: null
            });
            return;
        }

        if (!toStation) {
            reject({
                msg: '到站代码未找到',
                data: null
            });
            return;
        }

        // const requestUrl = `https://kyfw.12306.cn/otn/lcxxcx/query?purpose_codes=ADULT&queryDate=${date}&from_station=${fromStation}&to_station=${toStation}`;
        var requestUrl = 'https://kyfw.12306.cn/otn/leftTicket/queryZ?leftTicketDTO.train_date=' + date + '&leftTicketDTO.from_station=' + fromStation + '&leftTicketDTO.to_station=' + toStation + '&purpose_codes=ADULT';

        console.log('requesting tickets(from: %s, to: %s, date: %s)', from, to, date);
        console.log(requestUrl);

        _request2.default.get({
            uri: requestUrl,
            rejectUnauthorized: false
        }, function (error, response, body) {
            if (error) {
                reject({
                    msg: '获取车票信息失败',
                    data: error
                });
                return;
            }

            var result = JSON.parse(body);
            // const data = result.data;
            var data = {
                searchDate: date,
                datas: result.data.map(function (_ref) {
                    var queryLeftNewDTO = _ref.queryLeftNewDTO;
                    return queryLeftNewDTO;
                })
            };

            resolve(data, { from: from, to: to, date: date });
        });
    });
};

exports.default = requestTickets;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("chalk");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("es6-promise");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("request");

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.refresh = exports.getPath = undefined;

var _request = __webpack_require__(4);

var _request2 = _interopRequireDefault(_request);

var _fs = __webpack_require__(14);

var _fs2 = _interopRequireDefault(_fs);

var _es6Promise = __webpack_require__(3);

var _es6Promise2 = _interopRequireDefault(_es6Promise);

var _path = __webpack_require__(15);

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 获取站拼音和站代码
 */

var dataPath = _path2.default.resolve('data');

var getPath = exports.getPath = function getPath() {
    return _path2.default.resolve(dataPath, 'stationNames.json');
};

var refresh = exports.refresh = function refresh() {
    return new _es6Promise2.default(function (resolve, reject) {
        _fs2.default.stat(dataPath, function (err, stat) {
            if (err === null) {
                resolve();
                return;
            }
            _fs2.default.mkdir(dataPath, function (err2) {
                if (err2) {
                    reject(err2);
                    return;
                }
                resolve();
            });
        });
        // TODO 判断是否已经存在stationNames
        _request2.default.get({
            uri: 'https://kyfw.12306.cn/otn/resources/js/framework/station_name.js?station_version=1.8968',
            rejectUnauthorized: false
        }, function (error, response, body) {
            if (error) {
                reject(error);
                return;
            }
            function writeFile() {
                var regx = /([A-Z]+)\|([a-z]+)/g;
                var names = {};
                var matchs = void 0;

                while (matchs = regx.exec(body)) {
                    names[matchs[2]] = matchs[1];
                }

                _fs2.default.writeFile(getPath(), JSON.stringify(names), function (err) {
                    return err ? reject(error) : resolve(names);
                });
            }

            _fs2.default.stat(dataPath, function (err, stat) {
                if (err === null) {
                    writeFile();
                    return;
                }
                _fs2.default.mkdir(dataPath, function (err2) {
                    if (err2) {
                        reject(err2);
                        return;
                    }
                    writeFile();
                });
            });
        });
    }).then();
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _requestTickets = __webpack_require__(1);

var _requestTickets2 = _interopRequireDefault(_requestTickets);

var _middlewares = __webpack_require__(10);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ticketTable = function ticketTable(from, to, date, options) {
    (0, _requestTickets2.default)(from, to, date).then(function (_ref) {
        var datas = _ref.datas,
            _ref$searchDate = _ref.searchDate,
            searchDate = _ref$searchDate === undefined ? date : _ref$searchDate;
        return (0, _middlewares.render)({ datas: datas, searchDate: searchDate, from: from, to: to, date: date, options: options });
    }).catch(console.log);
};

exports.default = ticketTable;

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("commander");

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var filterTrainType = function filterTrainType(req, next) {
    // 过滤车次
    var allowTrainTypes = req.options.allowTrainTypes || [];
    if (allowTrainTypes.length > 0) {
        req.datas = req.datas.filter(function (row) {
            return allowTrainTypes.indexOf(row.station_train_code[0].toLocaleLowerCase()) !== -1;
        });
    }

    next();
};

exports.default = filterTrainType;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _helpers = __webpack_require__(0);

var _requestTickets = __webpack_require__(1);

var _requestTickets2 = _interopRequireDefault(_requestTickets);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 格式化一行数据附带途经站数据
var formatRowWithThrough = function formatRowWithThrough(item) {
    var throughRow = (0, _helpers.formatRow)(item.throughInfo);
    throughRow[0] = '';
    return (0, _helpers.formatRow)(item).map(function (v, index) {
        return v + '\n' + throughRow[index];
    });
};

var commonTrains = function commonTrains(datas1, datas2) {
    // if (datas1.length > datas2.length) {
    //     [datas2, datas1] = [datas1, datas2];
    // }
    var a = datas2.map(function (item) {
        return item.train_no;
    });
    return datas1.filter(function (item) {
        var index = a.indexOf(item.train_no);
        if (index === -1) {
            return false;
        }
        item.throughInfo = datas2[index];

        return true;
    });
};

var formatWithThrough = function formatWithThrough(req, next) {
    var options = req.options,
        from = req.from,
        date = req.date;

    options.formatRow = !options.hasThrough ? _helpers.formatRow : formatRowWithThrough;

    if (options.hasThrough) {
        (0, _requestTickets2.default)(from, options.through, date).then(function (_ref) {
            var datas = _ref.datas;

            req.datas = commonTrains(req.datas, datas);
            next();
            return req.datas;
        }).catch(function (err) {
            return console.error(err);
        });
    } else {
        next();
    }
};

exports.default = formatWithThrough;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.render = undefined;

var _filterTrainType = __webpack_require__(8);

var _filterTrainType2 = _interopRequireDefault(_filterTrainType);

var _formatWithThrough = __webpack_require__(9);

var _formatWithThrough2 = _interopRequireDefault(_formatWithThrough);

var _renderReal = __webpack_require__(11);

var _renderReal2 = _interopRequireDefault(_renderReal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var middlewares = [_filterTrainType2.default, _formatWithThrough2.default, _renderReal2.default];
var render = function render(req) {
    var _this = this;

    var i = 0;

    var next = function next() {
        var item = middlewares[i++];
        if (!item) {
            return;
        }

        try {
            item.call(_this, req, next);
        } catch (err) {
            console.error(err);
        }
    };
    next();
};

exports.render = render;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _cliTable = __webpack_require__(13);

var _cliTable2 = _interopRequireDefault(_cliTable);

var _chalk = __webpack_require__(2);

var _chalk2 = _interopRequireDefault(_chalk);

var _helpers = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var renderReal = function renderReal(_ref, next) {
    var datas = _ref.datas,
        searchDate = _ref.searchDate,
        from = _ref.from,
        to = _ref.to,
        options = _ref.options;

    // instantiate
    var table = new _cliTable2.default({
        head: '车次 出发/到达站 出发/到达时间 历时 一等坐 二等坐 软卧 硬卧 硬座 起售'.split(' ')
        // colWidths: [100, 200]
    });
    table.push.apply(table, datas.map(options.formatRow || _helpers.formatRow));

    var filterTypes = options.allowTrainTypes.join(',');

    console.log(table.toString());

    console.log('  %s -> %s %s 共计%d个车次 %s', from, to, _chalk2.default.bold.red('(' + searchDate.replace(/&nbsp;/g, ' ') + ')'), datas.length, filterTypes ? '\u7B5B\u9009\u7C7B\u578B: ' + filterTypes : '');

    next();
};

exports.default = renderReal;

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("/home/xsp/src/js/tickets/data/stationNames");

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = require("cli-table2");

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _commander = __webpack_require__(7);

var _commander2 = _interopRequireDefault(_commander);

var _stationNames = __webpack_require__(5);

var _ticketTable = __webpack_require__(6);

var _ticketTable2 = _interopRequireDefault(_ticketTable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_commander2.default.description('查询12306车票信息,可筛选过站.\n  eg: ticket beijing hangzhou 2017-02-28').arguments('<from> <to> <date>').option('-g, --gao', '高铁').option('-d, --dong', '动车').option('-t, --te', '特快').option('-k, --kuai', '快速').option('-z, --zhi', '直达').option('--through <station name>', '途径站').action(function (from, to, date) {
    var allowTrainTypes = ['gao', 'dong', 'te', 'kuai', 'zhi'].filter(function (t) {
        return t in _commander2.default;
    }).map(function (t) {
        return t[0].toLocaleLowerCase();
    });

    (0, _stationNames.refresh)().then(function () {
        (0, _ticketTable2.default)(from, to, date, {
            allowTrainTypes: allowTrainTypes,
            through: _commander2.default.through,
            hasThrough: !!_commander2.default.through
        });
    }).catch(console.error);
}).version('1.0.0').parse(process.argv);

/***/ })
/******/ ]);