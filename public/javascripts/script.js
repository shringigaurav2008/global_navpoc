
function getWindowObject(key) {
    return window[key];
}
function setWindowObject(key, value) {
    window[key] = value;
}
const config = document.querySelector('#config').dataset.config;
const MICRO_APP_OBJECT = JSON.parse(config);

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

function loadMicroApp(event) {

    console.log(event)

    const microApp = MICRO_APP_OBJECT.find(microapp => microapp.path === event.target.getAttribute("data-app"));
    if(!microApp){
        window.location.href ="/iframe"
    }
    loadExternalMicroApp(microApp).then(res => {
        loadElement(microApp);
    });
}

function loadElement(microApp) {
    document.getElementById('container').innerHTML = "";
    const element = document.createElement(microApp.elementName);
    document.getElementById('container').append(element);
}
function logOut(){
window.location.href= `${window.location.origin}/logout`;
}
window.customer= {
    customerName: 'satnam',
    customerEmail: 'test@gmail.com',
    customerBan: '9899061651',
    customerAddress: '22309 300 dr'
}