document.querySelector("form").addEventListener("submit", async function (event) {
    event.preventDefault();

    const botao = document.getElementById("btnConversao");

    botao.disabled = true;

    try {
        let entrada = document.getElementById("entrada").value;
        entrada = entrada.toUpperCase();
        const base = Number(document.getElementById("base").value);


        for (let i = 0; i <= entrada.length - 1; i++) {
            const caractere = entrada[i];
            if (base <= 10) {
                if (caractere < '0' || caractere > '9' || Number(caractere) >= base) {
                    alert("Entrada inválida! Não é permitido dígitos maiores ou iguais a base");
                    throw new Error("Entrada inválida! A entrada possui dígitos maior ou igual a base");
                }
            }
            if (base === 16) {
                if ((caractere < '0' && caractere > '9') || (caractere < 'A' && caractere > 'F')) {
                    alert("Entrada inválida! Não é permitido dígitos maiores ou iguais a base");
                    throw new Error("Entrada inválida! A entrada possui dígitos maior ou igual a base");
                }
            }
        }

        await enviarRequisicao();
    } catch (erro) {
        console.error(erro);
    } finally {
        botao.disabled = false;
    }
});


async function enviarRequisicao() {
    try {
        const dadosConversao = {
            entrada: document.getElementById("entrada").value,
            baseOrigem: Number(document.getElementById("baseOrigem").value),
            baseFinal: Number(document.getElementById("baseFinal").value)
        };

        const resposta = await fetch('http://localhost:3333/converter', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(dadosConversao)
        })

        if (!resposta.ok) {
            throw new Error("Erro ao obter resposta do servidor");
        }

        const data = await resposta.json();
        alert(data);
    } catch (error) {
        console.log(error);
        alert("Não foi possível fazer a conversão");
    }
}