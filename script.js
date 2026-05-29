document.querySelector("form").addEventListener("submit", async function (event) {
    event.preventDefault();

    const botao = document.getElementById("btnConversao");
    botao.disabled = true;

    try {
        let entrada = document.getElementById("entrada").value;
        entrada = entrada.toUpperCase();

        const baseOrigem = Number(document.getElementById("baseOrigem").value);
        const baseFinal = Number(document.getElementById("baseFinal").value);

        // validação
        for (let i = 0; i < entrada.length; i++) {
            const caractere = entrada[i];

            if (baseOrigem <= 10) {
                if (
                    caractere < '0' ||
                    caractere > '9' ||
                    Number(caractere) >= baseOrigem
                ) {
                    alert("Entrada inválida!");
                    throw new Error("Dígito inválido para essa base");
                }
            }

            if (baseOrigem === 16) {
                const ehNumero = caractere >= '0' && caractere <= '9';
                const ehHex = caractere >= 'A' && caractere <= 'F';

                if (!ehNumero && !ehHex) {
                    alert("Entrada inválida!");
                    throw new Error("Caractere inválido para hexadecimal");
                }
            }
        }

        await enviarRequisicao(
            entrada,
            baseOrigem,
            baseFinal
        );

    } catch (erro) {
        console.error(erro);
    } finally {
        botao.disabled = false;
    }
});

async function enviarRequisicao(entrada, baseOrigem, baseFinal) {

    // servidor TS
    const url = "http://localhost:3333";

    try {

        const dadosConversao = {
            entrada: entrada,
            baseOrigem: baseOrigem,
            baseFinal: baseFinal
        };

        const resposta = await fetch(`${url}/converter`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dadosConversao)
        });

        if (!resposta.ok) {
            throw new Error("Erro ao obter resposta do servidor");
        }

        const data = await resposta.json();

        console.log(data);
        alert(JSON.stringify(data));

    } catch (error) {
        console.log(error);
        alert("Não foi possível fazer a conversão");
    }
}