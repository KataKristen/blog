function adsError() {
    var aEcss = document.createElement('style');
    aEcss.textContent = '.adsbygoogle, .blogAd, .ancrA, HTML91,  HTML92,  HTML93,  HTML94,  HTML95, HTML96{display:none ! important}';
    document.head.appendChild(aEcss)
}
;function adsBlocked() {
    var antiAdB = qSel('#antiAdB')
      , antiAdC = qSel('#antiAdB .fxPuCl');
    if (antiAdC != null && PuSet.adsenseAds.antiAdBClose == 'true') {
        remCt(antiAdC, 'hidden');
        antiAdC.onclick = ()=>{
            Pu.sC('antiAB_ign', 1, {
                secure: true,
                'max-age': PuSet.adsenseAds.ignoreMaxAge
            });
            remCt(antiAdB, 'visible')
        }
    }
    ;if (Pu.gC('antiAB_ign') == undefined) {
        addCt(antiAdB, 'visible')
    }
}
;if (PuSet.adsenseAds.publisherId != '') {
    (function() {
        var adAdsense = document.createElement('script');
        adAdsense.setAttribute('crossorigin', 'anonymous');
        adAdsense.async = true;
        adAdsense.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-' + PuSet.adsenseAds.publisherId;
        adAdsense.onload = function() {
            typeof adScript == "function" && adScript()
        }
        ;
        adAdsense.onerror = function() {
            typeof adError == "function" && adError();
            adsError();
            if (qSel('#antiAdB') != null) {
                adsBlocked()
            }
        }
        ;
        var adPar = document.getElementsByTagName('script')[0];
        adPar.parentNode.insertBefore(adAdsense, adPar)
    }
    )()
}
;
