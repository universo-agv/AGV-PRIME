const form = document.getElementById("form");
const telefone = document.getElementById("telefone");
const placa = document.getElementById("placa");
const msg = document.getElementById("msg");

// 📞 MÁSCARA DE TELEFONE AUTOMÁTICA
telefone.addEventListener("input", (e) => {
    let v = e.target.value.replace(/\D/g, "");
    if (v.length > 11) v = v.slice(0, 11);
    
    if (v.length > 2) {
        v = v.replace(/^(\d{2})(\d)/g, "($1) $2");
    }
    if (v.length > 9) {
        v = v.replace(/(\d{5})(\d)/, "$1-$2");
    }
    e.target.value = v;
});

// 🚗 MÁSCARA DE PLACA AUTOMÁTICA
placa.addEventListener("input", (e) => {
    let v = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "");
    if (v.length > 7) v = v.slice(0, 7);
    
    if (v.length > 3) {
        v = v.replace(/^([A-Z]{3})(\d)/, "$1-$2");
    }
    e.target.value = v;
});

// 🚀 ENVIO PARA O GOOGLE FORMS (BASE DE DADOS)
form.addEventListener("submit", function(e) {
    e.preventDefault();
    const btn = document.getElementById("btn-submit");
    
    btn.innerText = "ENVIANDO...";
    btn.disabled = true;

    // --- IMPORTANTE: COLOQUE O SEU ID DO FORMULÁRIO ABAIXO ---
    const FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSeV2EQtBREGEO0V-VUbtTYeXnWvLM-K3H3hE31aqjdsOsdVDA/viewform";
    
    const formData = new URLSearchParams();
    // Troque os números entry.XXXX pelas IDs reais da sua planilha
    formData.append("entry.123456789", document.getElementById("nome").value);
    formData.append("entry.987654321", telefone.value);
    formData.append("entry.111222333", placa.value);

    fetch(FORM_URL, {
        method: "POST",
        mode: "no-cors",
        body: formData
    })
    .then(() => {
        msg.style.color = "#4ade80"; // Verde Sucesso
        msg.innerText = "Dados enviados com sucesso para nossa base!";
        form.reset();
    })
    .catch((error) => {
        msg.style.color = "#ff4d4d"; // Vermelho Erro
        msg.innerText = "Ocorreu um erro no envio. Tente novamente.";
        console.error(error);
    })
    .finally(() => {
        btn.innerText = "ENVIAR SIMULAÇÃO";
        btn.disabled = false;
    });
});