
function getWindowObject(key) {
    return window[key];
}
function setWindowObject(key, value) {
    window[key] = value;
}
const config = document.querySelector('#config').dataset.config;
const MICRO_APP_OBJECT = JSON.parse(config);

function onClickMenu(event){
    const type = event.target.getAttribute("data-type");
    const path = event.target.getAttribute("data-app");
    pageDetail(path,type);
}

function pageDetail(path,type) {
    document.getElementById("micro-container").classList.remove("iframeheight");
    document.getElementById("page-container").classList.add("hide");
    document.getElementById("micro-container").classList.add("hide");
    if(type === "page"){
        document.getElementById("page-container").classList.remove("hide");
    }
    else if(type === "microapp"){
        document.getElementById("micro-container").classList.remove("hide");
        loadMicroApp(path);
    }
    else{
        document.getElementById("micro-container").classList.add("iframeheight");
        document.getElementById("micro-container").classList.remove("hide");
        const microApp = MICRO_APP_OBJECT.find(microapp => microapp.path === path);
        document.getElementById("micro-container").innerHTML = '<iframe width="100%" height="100%" frameborder="0" scrolling="no" src="'+microApp.source+'" id="iFrameLoad" allowfullscreen></iframe>';
    }
}

function loadExternalMicroApp(microApp) {
    return new Promise((resolve, reject) => {
        // resolve if already loaded
        if (microApp.loaded) {
            resolve({ microApp, loaded: true, status: 'Already Loaded' });
        } else {
            // load script
            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = microApp.source;
            // cross browser handling of onLoaded event
            if (script.readyState) {  // IE
                script.onreadystatechange = () => {
                    if (script.readyState === 'loaded' || script.readyState === 'complete') {
                        script.onreadystatechange = null;
                        microApp.loaded = true;
                        resolve({ microApp, loaded: true, status: 'Loaded' });
                    }
                };
            } else {  // Others
                script.onload = () => {
                    if (!microApp.loaded) {
                        microApp.loaded = true;
                        resolve({ microApp, loaded: true, status: 'Loaded' });
                    }
                };
            }
            script.onerror = (error) => resolve({ microApp, loaded: false, status: 'Loaded' });
            // finally append the script tag in the DOM
            document.getElementsByTagName('head')[0].appendChild(script);
        }
    });
}

function loadMicroApp(path) {
    document.getElementById('micro-container').innerHTML = "";
    const microApp = MICRO_APP_OBJECT.find(microapp => microapp.path === path);
    loadExternalMicroApp(microApp).then(res => {
        loadElement(microApp);
    });
}

function loadElement(microApp) {
    const element = document.createElement(microApp.elementName);
    document.getElementById('micro-container').append(element);
}

function logOut(){
    window.location.href= `${window.location.origin}/logout`;
}

function handleUserInput(event) {
    const name = event.name;
    const value = event.value;
    const updatedControls = { ...window.customer };
    updatedControls[name] = value;
    window.customer = updatedControls;
}


window.customer= {
    customerName: 'satnam',
    customerEmail: 'test@gmail.com',
    customerBan: '9899061651',
    customerAddress: '22309 300 dr'
}