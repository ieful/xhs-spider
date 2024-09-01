const crypto = require('crypto');
const axios = require('axios');
const cookie = require("../config/cookie.json");


const instance = axios.create({
    baseURL: 'https://edith.xiaohongshu.com/web_api/sns/v2/note',
    realUrl: '/publish/publish?source=official',
    timeout: 3000,
    headers: {
        'Cookie': `sec_poison_id=aa1bef00-ac73-450b-85bc-7fcd6002ba9e; web_session=0400697a72bbb1d7496884cec3364b779eb94b`
    }
});


function based64(string) {
    const base64 = Buffer.from(string).toString('base64');
    console.log('BASE64之后的值是', base64);
    return base64;
}


function MD5(string) {
    const hash = crypto.createHash('md5');

    hash.update(string);

    const md5 = hash.digest('hex');

    console.log('md5 之后的值是', md5)

    return md5

//     console.log(`MD5: ${md5}`);
//
// // 对字符串进行 Base64 编码
//     const base64 = Buffer.from(str).toString('base64');
//
//     console.log(`Base64: ${base64}`);
//     return base64;
}

function sign(e, t) {
    var r = 1452
        , n = 1507
        , o = 1589
        , i = 1411
        , a = 1551
        , s = 1533
        , u = 1455
        , l = 1289
        , c = 1334
        , p = 1553
        , f = 1343
        , d = 1265
        , g = 1425
        , h = 1426
        , v = 1256
        , m = 1512
        , y = 1290
        , b = 1230
        , _ = 1406
        , w = 1535
        , S = 1572
        , T = 1747
        , E = 1497
        , A = 1587
        , x = 1718
        , C = 1516
        , k = 1509
        , O = 1371
        , I = 1562
        , M = 1627
        , R = 1787
        , j = 1413
        , B = 1510
        , N = 1495
        , P = 1611
        , L = 1687
        , D = 1582
        , F = 1556
        , U = 1627
        , H = 1596
        , z = 1413
        , W = 1421
        , V = 1439
        , G = 1570
        , Z = 1640
        , q = 1417
        , Y = 1409
        , K = 1578
        , $ = 1313
        , X = 1491
        , J = 1434
        , Q = 1324
        , ee = 1294
        , te = 1160
        , re = 1284
        , ne = 1180
        , oe = 1284
        , ie = 1326
        , ae = 1505
        , se = 1602
        , ue = 1631
        , le = 1460
        , ce = 884
        , pe = 1019
        , fe = 1212
        , de = 1266
        , ge = 978
        , he = 1012
        , ve = 1123
        , me = 1180
        , ye = 1227
        , be = 822
        , _e = 999
        , we = 1367
        , Se = 898
        , Te = 910
        , Ee = 1195
        , Ae = 1341
        , xe = 1158
        , Ce = 1068
        , ke = 1137
        , Oe = 1118
        , Ie = 1109
        , Me = 1518
        , Re = 1500
        , je = 1322
        , Be = 1316
        , Ne = 1255
        , Pe = 1188
        , Le = 1297
        , De = 1184
        , Fe = 1153
        , Ue = 1331
        , He = 986
        , ze = 911
        , We = 1090
        , Ve = 1016
        , Ge = 1043
        , Ze = 1050
        , qe = 863
        , Ye = 338
        , Ke = 485
        , $e = 1109
        , Xe = 524
        , Je = 489
        , Qe = 595
        , et = 1173
        , tt = 862
        , rt = 874
        , nt = 190
        , ot = 12
        , it = 1587
        , at = 24
        , st = 636
        , ut = 829
        , lt = 921
        , ct = 810
        , pt = 508
        , ft = 646
        , dt = 995
        , gt = 117
        , ht = 1714
        , vt = 846
        , mt = 540
        , yt = 558
        , bt = 697
        , _t = 616
        , wt = 975
        , St = 1088
        , Tt = 324
        , Et = 153
        , At = 433
        , xt = 172
        , Ct = 329
        , kt = 556
        , Ot = 360
        , It = 359
        , Mt = 398
        , Rt = 453
        , jt = 318
        , Bt = 347
        , Nt = 540
        , Pt = 439
        , Lt = 502
        , Dt = 460
        , Ft = 347
        , Ut = 444
        , Ht = 453
        , zt = 448
        , Wt = 258
        , Vt = 427
        , Gt = 347
        , Zt = 544
        , qt = 466
        , Yt = 501
        , Kt = 415
        , $t = 347
        , Xt = 452
        , Jt = 598
        , Qt = 475
        , er = 361
        , tr = 392
        , rr = 189
        , nr = 347
        , or = 451
        , ir = 441
        , ar = 1843
        , sr = 1186
        , ur = {
        GHzcl: cr(1578, 1465),
        hpdTP: function(e, t) {
            return e < t
        },
        kPrkP: function(e, t) {
            return e > t
        },
        RNCil: function(e, t) {
            return e < t
        },
        GJYEy: function(e, t) {
            return e >> t
        },
        zDagP: function(e, t) {
            return e | t
        },
        zVOvy: function(e, t) {
            return e & t
        },
        ntvSG: function(e, t) {
            return e & t
        },
        vGIuz: cr(1388, r) + cr(1571, 1394),
        biuPu: function(e, t) {
            return e(t)
        },
        GMJxV: function(e, t) {
            return e | t
        },
        yTjFW: function(e, t) {
            return e << t
        },
        lsgpi: function(e, t) {
            return e >> t
        },
        oWysL: function(e, t) {
            return e(t)
        },
        mTYNl: function(e, t) {
            return e + t
        },
        VDMgA: function(e, t) {
            return e + t
        },
        MuQYv: function(e, t) {
            return e === t
        },
        MjzGU: function(e, t) {
            return e === t
        },
        bKgFU: cr(n, o) + "ed",
        MWYyF: function(e, t) {
            return e !== t
        },
        sNYMU: cr(i, a),
        UyzSw: function(e, t) {
            return e(t)
        }
    }
        , lr = (cr(s, u) + cr(1462, 1388) + cr(l, c))[cr(p, 1691)]("|");
    function cr(e, t) {
        return a0_0x4dee00(t, e - sr)
    }
    for (var pr = 0; ; ) {
        switch (lr[pr++]) {
            case "0":
                var fr = ur[cr(f, d)];
                continue;
            case "1":
                var dr = function(e) {
                    function t(e, t) {
                        return cr(t - -ar, e)
                    }
                    e = e[t(-366, -288)](/\r\n/g, "\n");
                    for (var r = "", n = 0; n < e[t(-390, -At)]; n++) {
                        var o = e[t(-xt, -Ct) + t(-kt, -557)](n);
                        gr[t(-Ot, -It)](o, 128) ? r += String[t(-Mt, -Rt) + t(-jt, -Bt)](o) : gr[t(-553, -Nt)](o, 127) && gr[t(-Pt, -Lt)](o, 2048) ? (r += String[t(-423, -453) + t(-Dt, -Ft)](192 | gr[t(-566, -Ut)](o, 6)),
                            r += String[t(-411, -Ht) + t(-379, -347)](gr[t(-572, -zt)](gr[t(-Wt, -Vt)](o, 63), 128))) : (r += String[t(-279, -453) + t(-268, -Gt)](gr[t(-Zt, -448)](gr[t(-qt, -Yt)](o, 12), 224)),
                            r += String[t(-Kt, -Ht) + t(-411, -$t)](gr[t(-482, -Xt)](gr[t(-Jt, -Qt)](gr[t(-309, -er)](o, 6), 63), 128)),
                            r += String[t(-tr, -453) + t(-rr, -nr)](gr[t(-or, -Xt)](gr[t(-308, -ir)](o, 63), 128)))
                    }
                    return r
                };
                continue;
            case "2":
                var gr = {
                    YcAap: function(e, t) {
                        return ur[(r = -165,
                            n = -64,
                            cr(n - -1374, r))](e, t);
                        var r, n
                    },
                    SNmAe: function(e, t) {
                        var r, n;
                        return ur[(r = -142,
                            n = -Et,
                            cr(r - -1468, n))](e, t)
                    },
                    IYqgI: function(e, t) {
                        return ur[(r = 603,
                            n = 440,
                            cr(n - -918, r))](e, t);
                        var r, n
                    },
                    bBpCr: function(e, t) {
                        var r, n;
                        return ur[(r = 161,
                            n = Tt,
                            cr(n - -1268, r))](e, t)
                    },
                    yESQQ: function(e, t) {
                        var r, n;
                        return ur[(r = wt,
                            n = St,
                            cr(r - -341, n))](e, t)
                    },
                    DLqdJ: function(e, t) {
                        var r, n;
                        return ur[(r = bt,
                            n = _t,
                            cr(n - -827, r))](e, t)
                    },
                    ntwtB: function(e, t) {
                        var r, n;
                        return ur[(r = mt,
                            n = yt,
                            cr(n - -1034, r))](e, t)
                    },
                    XhOLE: function(e, t) {
                        var r, n;
                        return ur[(r = 959,
                            n = vt,
                            cr(n - -470, r))](e, t)
                    },
                    OUXTe: function(e, t) {
                        return ur[(r = -137,
                            n = -156,
                            cr(n - -ht, r))](e, t);
                        var r, n
                    },
                    lPLEl: function(e, t) {
                        return ur[(r = -gt,
                            n = -34,
                            cr(n - -1626, r))](e, t);
                        var r, n
                    },
                    HiDFY: function(e, t) {
                        return ur[(r = dt,
                            n = 939,
                            cr(r - -563, n))](e, t);
                        var r, n
                    },
                    KfTYt: ur[cr(1352, g)],
                    Swijz: function(e, t) {
                        var r, n;
                        return ur[(r = pt,
                            n = ft,
                            cr(r - -978, n))](e, t)
                    },
                    TgopC: function(e, t) {
                        return ur[(r = ut,
                            n = lt,
                            cr(r - -ct, n))](e, t);
                        var r, n
                    },
                    uytRs: function(e, t) {
                        var r, n;
                        return ur[(r = -st,
                            n = -536,
                            cr(n - -1831, r))](e, t)
                    },
                    CNQIo: function(e, t) {
                        return ur[(r = 140,
                            n = at,
                            cr(n - -1534, r))](e, t);
                        var r, n
                    },
                    NrAsb: function(e, t) {
                        return ur[(r = nt,
                            n = ot,
                            cr(n - -it, r))](e, t);
                        var r, n
                    },
                    rniTJ: function(e, t) {
                        return ur[(r = tt,
                            n = rt,
                            cr(n - -725, r))](e, t);
                        var r, n
                    },
                    vZHUx: function(e, t) {
                        var r, n;
                        return ur[(r = et,
                            n = 1085,
                            cr(r - -385, n))](e, t)
                    },
                    trZBo: function(e, t) {
                        var r, n;
                        return ur[(r = Je,
                            n = Qe,
                            cr(r - -1143, n))](e, t)
                    },
                    yAgFW: function(e, t) {
                        return e + t
                    },
                    cvnJR: function(e, t) {
                        return ur[(r = 1073,
                            n = $e,
                            cr(n - -Xe, r))](e, t);
                        var r, n
                    },
                    ezOMc: function(e, t) {
                        var r, n;
                        return ur[(r = Ye,
                            n = Ke,
                            cr(n - -1025, r))](e, t)
                    }
                };
                continue;
            case "3":
                var hr = cr(h, v) + cr(m, 1536) + cr(y, b) + cr(1312, _) + cr(w, 1660) + cr(S, T) + cr(1357, E) + cr(1606, A) + cr(1612, x) + "m3";
                continue;
            case "4":
                var vr = ur[cr(1495, C)](Object[cr(k, O) + "pe"][cr(1582, I) + "g"][cr(M, R)](t), cr(j, B) + cr(1420, 1408) + "]") || ur[cr(N, P)](Object[cr(k, L) + "pe"][cr(D, F) + "g"][cr(U, H)](t), cr(z, r) + cr(1317, W));
                continue;
            case "5":
                var mr = function(e) {
                    var t = 287
                        , r = gr[n(ce, pe)][n(fe, de)]("|");
                    function n(e, r) {
                        return cr(r - -t, e)
                    }
                    for (var o = 0; ; ) {
                        switch (r[o++]) {
                            case "0":
                                return i;
                            case "1":
                                e = gr[n(ge, he)](dr, e);
                                continue;
                            case "2":
                                var i = "";
                                continue;
                            case "3":
                                var a, s, u, l, c, p, f;
                                continue;
                            case "4":
                                var d = 0;
                                continue;
                            case "5":
                                for (; d < e[n(1188, ve)]; )
                                    a = e[n(me, ye) + n(be, _e)](d++),
                                        s = e[n(we, 1227) + n(Se, 999)](d++),
                                        u = e[n(1359, ye) + n(Te, _e)](d++),
                                        l = gr[n(1137, Ee)](a, 2),
                                        c = gr[n(1318, Ae)](gr[n(1271, xe)](gr[n(Ce, ke)](a, 3), 4), gr[n(Oe, Ie)](s, 4)),
                                        p = gr[n(Me, 1341)]((15 & s) << 2, gr[n(Re, je)](u, 6)),
                                        f = gr[n(Be, Ne)](u, 63),
                                        gr[n(Pe, Le)](isNaN, s) ? p = f = 64 : gr[n(De, 1297)](isNaN, u) && (f = 64),
                                        i = gr[n(Fe, Ue)](gr[n(He, 1157)](gr[n(ze, We)](i, hr[n(Ve, Ge)](l)), hr[n(Ze, 1043)](c)) + hr[n(qe, 1043)](p), hr[n(874, Ge)](f));
                                continue
                        }
                        break
                    }
                };
                continue;
            case "6":
                var yr = ur[cr(V, 1433)]("undefined" == typeof window ? "undefined" : (0,
                    esm_typeof.Z)(window), ur[cr(1640, N)]) ? __webpack_require__.g : window;
                continue;
            case "7":
                ur[cr(1587, G)]((0,
                    esm_typeof.Z)(yr), ur[cr(Z, 1531)]) && yr && yr[cr(q, Y) + "or"] && yr[cr(1417, K) + "or"][cr($, 1250) + "nt"] && yr[cr(X, J)] && (fr = ur[cr(Y, Q)]);
                continue;
            case "8":
                var br = (new Date)[cr(ee, te)]();
                continue;
            case "9":
                return {
                    "X-s": ur[cr(re, ne)](mr, ur[cr(oe, ie)](MD5, [br, fr, e, vr ? JSON[cr(ae, se) + "fy"](t) : ""][cr(ue, le)](""))),
                    "X-t": br
                }
        }
        break
    }
}

function getRealUrl(e, t, r) {
    var n, o = e;
    0 === index_of_default()(e).call(e, "//") && (e = concat_default()(n = "".concat(window.location.protocol)).call(n, e));
    if (/^https?:/.test(e))
        try {
            var i = new (url_default())(e);
            o = i.href.replace(i.origin, "")
        } catch (a) {
            o = e
        }
    return _xhs_launcher.ZP.http.buildURL(o, t, r)
}

function xsXt(e) {
    var t = e.url
        , r = e.headers
        , n = e.params
        , o = e.paramsSerializer
        , i = e.data
    var u = sign(getRealUrl(t, n, o), i) || {};
    console.log('u is' ,u);
    return u;
}

module.exports = {
    xsXt: xsXt
}