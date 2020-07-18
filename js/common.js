function loadingMsg(params){
    let infowListWrap =  document.getElementById('infowListWrap')
    infowListWrap.innerHTML = `
    <div class="loading-wait">
        ${params.message}
        <div class="loading-icon"><i class="${params.icon}" aria-hidden="true"></i></div>
    </div>
    `




}