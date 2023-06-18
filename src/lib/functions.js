export let loadSettings = ()=>{
    return JSON.parse(localStorage.getItem("settings")||'{}');
}

export let saveSettings = (json)=>{
    localStorage.setItem("settings", JSON.stringify(json))
}