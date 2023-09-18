"use strict";
exports.id = 463;
exports.ids = [463];
exports.modules = {

/***/ 8184:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Yv: () => (/* binding */ DEFAULT_EXCEL_DATA),
/* harmony export */   fo: () => (/* binding */ INFORMATION_FORMAT_MAP),
/* harmony export */   vU: () => (/* binding */ BASE_TABLE_FORM)
/* harmony export */ });
/* harmony import */ var _utils_format__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(11072);

const INFORMATION_FORMAT_MAP = [
    {
        name: "타겟부위",
        id: "target"
    },
    {
        name: "종목이름",
        id: "name"
    },
    {
        name: "중량(kg)",
        id: "weight"
    },
    {
        name: "횟수",
        id: "reps"
    },
    {
        name: "세트",
        id: "set"
    },
    {
        name: "비고",
        id: "remark"
    }
];
const BASE_TABLE_FORM = {
    target: "",
    name: "",
    weight: 0,
    id: "",
    set: 0,
    reps: 0,
    remark: ""
};
const DEFAULT_EXCEL_DATA = [
    {
        data: {
            name: "N/A",
            remark: "N/A",
            reps: 0,
            set: 0,
            target: "N/A",
            weight: 0
        },
        date: (0,_utils_format__WEBPACK_IMPORTED_MODULE_0__/* .formatSaveDate */ .OB)(new Date())
    }
];


/***/ }),

/***/ 11072:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   IH: () => (/* binding */ pushDateFormat),
/* harmony export */   JI: () => (/* binding */ intToStringFormat),
/* harmony export */   OB: () => (/* binding */ formatSaveDate)
/* harmony export */ });
/* unused harmony export formatTime */
const intToStringFormat = (num)=>{
    return String(num).padStart(2, "0");
};
const formatTime = (time)=>{
    const DOUBLE_SEMI_REGEX = /(\d{1,2}):(\d{1,2}):(\d{1,2})/gi;
    if (!DOUBLE_SEMI_REGEX.test(time)) throw new Error("타이머 문자열 형태가 안맞아요~");
    const [hours, minutes, seconds] = time.split(":");
    const formatedTimed = `${intToStringFormat(+hours)}:${intToStringFormat(+minutes)}:${intToStringFormat(+seconds)}`;
    return formatedTimed;
};
const pushDateFormat = (date)=>{
    const offset = new Date().getTimezoneOffset() * 60000;
    return new Date(date.getTime() - offset).toISOString().replace("Z", "").split("T")[0];
};
const formatSaveDate = (date = new Date())=>{
    const [year, month, day] = [
        date.getFullYear(),
        date.getMonth() + 1,
        date.getDate()
    ];
    return `${year}-${intToStringFormat(month)}-${intToStringFormat(day)}`;
};


/***/ }),

/***/ 49099:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  Z: () => (/* binding */ storage)
});

;// CONCATENATED MODULE: ./src/app/utils/alert.ts
class CustomAlert {
    constructor(){
        this.isClient = ()=>{
            return "undefined" !== "undefined";
        };
        this.toast = (message)=>{
            if (this.isClient()) window?.alert(message);
        };
    }
}

;// CONCATENATED MODULE: ./src/app/utils/storage.ts

class DataStorage {
    constructor(){
        this.customAlert = new CustomAlert();
    }
    set(key = "iron-mate-data", data) {
        try {
            localStorage.setItem(key, JSON.stringify(data));
            this.customAlert.toast("브라우저 내 데이터 저장이 완료되었습니다.");
        } catch (e) {
            this.customAlert.toast("브라우저 내 데이터 저장에 실패하였습니다.");
            console.error(e);
        }
    }
    get(key = "iron-mate-data") {
        try {
            const data = JSON.parse(localStorage.getItem(key));
            return data;
        } catch (e) {
            this.customAlert.toast("브라우저 내 데이터 가져오기에 실패하였습니다.");
            console.error(e);
        }
    }
    remove(key = "iron-mate-data") {
        try {
            const data = localStorage.removeItem(key);
            return data;
        } catch (e) {
            this.customAlert.toast("브라우저 내 데이터 삭제하기에 실패하였습니다.");
            console.error(e);
        }
    }
}
/* harmony default export */ const storage = (DataStorage);


/***/ }),

/***/ 4474:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Kd: () => (/* binding */ checkPossibilityToSave),
/* harmony export */   Y1: () => (/* binding */ checkWithTargetList),
/* harmony export */   tL: () => (/* binding */ checkPossibilityToRender)
/* harmony export */ });
/* unused harmony export checkIsTrainData */
const checkWithTargetList = ({ dataKeys, targetKeys })=>{
    const set = new Set();
    targetKeys.forEach((key)=>set.add(key));
    for(let i = 0; i < dataKeys.length; i++){
        const key = dataKeys[i];
        if (!set.has(key)) return false;
    }
    return true;
};
const checkPossibilityToSave = (data)=>{
    for(let i = 0; i < data.length; i++){
        const curr = data[i];
        const isPossible = curr.name && curr.target && Number(curr.set) > 0 && Number(curr.reps) > 0 && Number(curr.weight) > 0;
        if (!isPossible) return false;
    }
    return true;
};
const checkIsTrainData = (data)=>{};
const checkPossibilityToRender = (trainData)=>{
    if (!trainData.length) return false;
    if (!trainData.filter((el)=>el?.data)?.length) return false;
    if (!trainData.filter((el)=>el?.date)?.length) return false;
    return checkPossibilityToSave(trainData[0].data);
};


/***/ })

};
;