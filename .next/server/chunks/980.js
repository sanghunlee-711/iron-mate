exports.id = 980;
exports.ids = [980];
exports.modules = {

/***/ 31642:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 31232, 23));
Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 52987, 23));
Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 50831, 23));
Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 56926, 23));
Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 44282, 23))

/***/ }),

/***/ 1310:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 50954, 23))

/***/ }),

/***/ 41412:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 24345))

/***/ }),

/***/ 24345:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ layout_BasicLayout)
});

// EXTERNAL MODULE: external "next/dist/compiled/react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(56786);
// EXTERNAL MODULE: external "next/dist/compiled/react"
var react_ = __webpack_require__(18038);
var react_default = /*#__PURE__*/__webpack_require__.n(react_);
// EXTERNAL MODULE: ./src/app/components/buttons/BurgerButton/BurgerButton.css
var BurgerButton = __webpack_require__(47343);
;// CONCATENATED MODULE: ./src/app/components/buttons/BurgerButton/index.tsx
/* __next_internal_client_entry_do_not_use__ default auto */ 


const BurgerButton_BurgerButton = ({ isToggled, handleToggle })=>{
    return /*#__PURE__*/ jsx_runtime_.jsx("button", {
        className: `menu__btn ${isToggled ? "toggle" : ""}`,
        onClick: ()=>handleToggle(!isToggled),
        children: /*#__PURE__*/ jsx_runtime_.jsx("span", {})
    });
};
/* harmony default export */ const buttons_BurgerButton = (BurgerButton_BurgerButton);

// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__(11440);
var link_default = /*#__PURE__*/__webpack_require__.n(next_link);
// EXTERNAL MODULE: ./node_modules/next/navigation.js
var navigation = __webpack_require__(57114);
// EXTERNAL MODULE: ./src/app/components/SideBar/SideBar.css
var SideBar = __webpack_require__(63823);
;// CONCATENATED MODULE: ./src/app/components/SideBar/index.tsx
/* __next_internal_client_entry_do_not_use__ default auto */ 




const SIDE_BAR_MAP = [
    {
        to: "/",
        name: "History"
    },
    {
        to: "/train",
        name: "Train"
    },
    {
        to: "/manage",
        name: "Manage"
    }
];
const Sidebar = ({ handleClicked, isVisible })=>{
    const pathname = (0,navigation.usePathname)();
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("aside", {
        className: `menu__box ${isVisible ? "visible" : ""}`,
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx("h1", {
                className: "text-3xl subpixel-antialiased italic p-6",
                children: "Iron mate"
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("ul", {
                children: SIDE_BAR_MAP.map(({ to, name })=>/*#__PURE__*/ jsx_runtime_.jsx("li", {
                        className: to === pathname ? "active" : "",
                        children: /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                            className: "menu__item",
                            href: to,
                            onClick: ()=>handleClicked(false),
                            children: name
                        })
                    }, to))
            })
        ]
    });
};
/* harmony default export */ const components_SideBar = (Sidebar);

// EXTERNAL MODULE: ./src/app/components/layout/BasicLayout.css
var BasicLayout = __webpack_require__(43942);
// EXTERNAL MODULE: ./node_modules/next/image.js
var next_image = __webpack_require__(52451);
var image_default = /*#__PURE__*/__webpack_require__.n(next_image);
;// CONCATENATED MODULE: ./src/app/hooks/useOutsideClick.ts
/* __next_internal_client_entry_do_not_use__ useOutsideClick auto */ 
const useOutsideClick = (callback)=>{
    const ref = (0,react_.useRef)(null);
    (0,react_.useEffect)(()=>{
        const handleClickOutside = (event)=>{
            if (ref.current && !ref.current.contains(event.target)) {
                callback();
            }
        };
        document?.addEventListener("mousedown", handleClickOutside);
        return ()=>{
            document?.removeEventListener("mousedown", handleClickOutside);
        };
    }, [
        callback
    ]);
    return ref;
};

;// CONCATENATED MODULE: ./src/app/components/layout/BasicLayout.tsx
/* __next_internal_client_entry_do_not_use__ default auto */ 








const BasicLayout_BasicLayout = ({ children })=>{
    const route = (0,navigation.useRouter)();
    const [isToggle, setIsToggled] = react_default().useState(false);
    const handleToggle = (visibility)=>{
        setIsToggled(visibility);
    };
    const sideBarRef = useOutsideClick(()=>{
        isToggle && handleToggle(false);
    });
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
        children: [
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("header", {
                className: "header_container",
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx(buttons_BurgerButton, {
                        isToggled: isToggle,
                        handleToggle: handleToggle
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx((image_default()), {
                        className: "icon",
                        src: "/muscle-logo.svg",
                        alt: "logo",
                        width: 42,
                        height: 36,
                        onClick: ()=>route.push("/")
                    })
                ]
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                ref: sideBarRef,
                children: /*#__PURE__*/ jsx_runtime_.jsx(components_SideBar, {
                    isVisible: isToggle,
                    handleClicked: handleToggle
                })
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("main", {
                className: "main_container",
                children: children
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("footer", {
                className: "footer_container text-base font-bold ",
                children: [
                    "A project by",
                    " ",
                    /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                        href: "https://www.cloud-sanghun.com/",
                        children: "sanghun lee"
                    }),
                    " | From The Folks"
                ]
            })
        ]
    });
};
/* harmony default export */ const layout_BasicLayout = (BasicLayout_BasicLayout);


/***/ }),

/***/ 90771:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ RootLayout),
  metadata: () => (/* binding */ metadata)
});

// EXTERNAL MODULE: external "next/dist/compiled/react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(56786);
// EXTERNAL MODULE: ./node_modules/next/font/google/target.css?{"path":"src/app/layout.tsx","import":"Inter","arguments":[{"subsets":["latin"]}],"variableName":"inter"}
var layout_tsx_import_Inter_arguments_subsets_latin_variableName_inter_ = __webpack_require__(25856);
var layout_tsx_import_Inter_arguments_subsets_latin_variableName_inter_default = /*#__PURE__*/__webpack_require__.n(layout_tsx_import_Inter_arguments_subsets_latin_variableName_inter_);
// EXTERNAL MODULE: ./src/app/globals.css
var globals = __webpack_require__(5023);
// EXTERNAL MODULE: ./src/app/tailwind.css
var tailwind = __webpack_require__(32528);
// EXTERNAL MODULE: ./node_modules/next/dist/compiled/react/react.shared-subset.js
var react_shared_subset = __webpack_require__(62947);
// EXTERNAL MODULE: ./node_modules/next/dist/build/webpack/loaders/next-flight-loader/module-proxy.js
var module_proxy = __webpack_require__(61363);
;// CONCATENATED MODULE: ./src/app/components/layout/BasicLayout.tsx

const proxy = (0,module_proxy.createProxy)(String.raw`/Users/cloudlee/Desktop/Dev/iron-mate/src/app/components/layout/BasicLayout.tsx`)

// Accessing the __esModule property and exporting $$typeof are required here.
// The __esModule getter forces the proxy target to create the default export
// and the $$typeof value is for rendering logic to determine if the module
// is a client boundary.
const { __esModule, $$typeof } = proxy;
const __default__ = proxy.default;


/* harmony default export */ const BasicLayout = (__default__);
;// CONCATENATED MODULE: ./src/app/layout.tsx






const metadata = {
    title: "Iron mate",
    description: "Optmize your weight lifting with your own data"
};
function RootLayout({ children }) {
    return /*#__PURE__*/ jsx_runtime_.jsx("html", {
        lang: "en",
        children: /*#__PURE__*/ jsx_runtime_.jsx("body", {
            className: (layout_tsx_import_Inter_arguments_subsets_latin_variableName_inter_default()).className,
            suppressHydrationWarning: true,
            children: /*#__PURE__*/ jsx_runtime_.jsx(BasicLayout, {
                children: children
            })
        })
    });
}


/***/ }),

/***/ 18275:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ NotFound)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(56786);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(25124);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_1__);


function NotFound() {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h2", {
                children: "Not Found"
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                children: "추후에 디자인 추가 예정"
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {
                href: "/",
                children: "Return Home"
            })
        ]
    });
}


/***/ }),

/***/ 73881:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var next_dist_lib_metadata_get_metadata_route__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(80085);
/* harmony import */ var next_dist_lib_metadata_get_metadata_route__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_lib_metadata_get_metadata_route__WEBPACK_IMPORTED_MODULE_0__);
  

  /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((props) => {
    const imageData = {"type":"image/x-icon","sizes":"any"}
    const imageUrl = (0,next_dist_lib_metadata_get_metadata_route__WEBPACK_IMPORTED_MODULE_0__.fillMetadataSegment)(".", props.params, "favicon.ico")

    return [{
      ...imageData,
      url: imageUrl + "",
    }]
  });

/***/ }),

/***/ 63823:
/***/ (() => {



/***/ }),

/***/ 47343:
/***/ (() => {



/***/ }),

/***/ 43942:
/***/ (() => {



/***/ }),

/***/ 5023:
/***/ (() => {



/***/ }),

/***/ 32528:
/***/ (() => {



/***/ })

};
;