const Rem = (() => {
    let iScale = 1 / window.devicePixelRatio;  
    document.querySelectorAll('meta')[1].setAttribute("content",`width=device-width, user-scalable=no, initial-scale=${iScale}, minimum-scale=${iScale}, maximum-scale=${iScale}`)
    
    let iWidth = document.documentElement.clientWidth;
    let rootStyle;
    rootStyle = `font-size: ${iWidth/10}px; width=100%; height: 100%; overflow: hidden;`
    document.querySelector('html').setAttribute("style", rootStyle);
})();

export default Rem

