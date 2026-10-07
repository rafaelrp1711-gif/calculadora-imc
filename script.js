const nome = document.getElementById("nome");
const peso = document.getElementById("peso");
const altura = document.getElementById("altura");

const btnCalcular = document.getElementById("btnCalcular");
const btnLimpar = document.getElementById("btnLimpar");

const resultado = document.getElementById("resultado");
const listaPessoas = document.getElementById("listaPessoas");
const totalPessoas = document.getElementById("totalPessoas");

const pesquisa = document.getElementById("pesquisa");

const pessoas = [];


// Calcular IMC

btnCalcular.addEventListener("click", function() {

    const nomePessoa = nome.value.trim();
    const pesoPessoa = Number(peso.value);
    const alturaPessoa = Number(altura.value);

    if (
        nomePessoa === "" ||
        pesoPessoa <= 0 ||
        alturaPessoa <= 0
    ) {

        resultado.innerHTML = `
            <p>Preencha todos os campos corretamente.</p>
        `;

        return;
    }

    const alturaMetros = alturaPessoa / 100;

    const imc = pesoPessoa / (alturaMetros * alturaMetros);

    const imcFormatado = imc.toFixed(2);

    let classificacao;

    if (imc < 18.5) {

        classificacao = "Abaixo do peso";

    } else if (imc < 25) {

        classificacao = "Peso adequado";

    } else if (imc < 30) {

        classificacao = "Sobrepeso";

    } else {

        classificacao = "Obesidade";
    }


    resultado.innerHTML = `
        <h3>IMC: ${imcFormatado}</h3>
        <p>${classificacao}</p>
    `;


    pessoas.push({

        nome: nomePessoa,
        peso: pesoPessoa,
        altura: alturaMetros,
        imc: imcFormatado,
        classificacao: classificacao

    });


    mostrarPessoas();


    nome.value = "";
    peso.value = "";
    altura.value = "";

    nome.focus();

});


// Mostrar pessoas

function mostrarPessoas(lista = pessoas) {

    listaPessoas.innerHTML = "";

    if (lista.length === 0) {

        listaPessoas.innerHTML = `
            <p>Nenhuma pessoa cadastrada.</p>
        `;

        totalPessoas.textContent = "0";

        return;
    }


    lista.forEach(function(pessoa) {

        const index = pessoas.indexOf(pessoa);

        listaPessoas.innerHTML += `

            <div class="pessoa">

                <h3>${pessoa.nome}</h3>

                <p>
                    Peso: ${pessoa.peso} kg
                </p>

                <p>
                    Altura: ${pessoa.altura.toFixed(2)} m
                </p>

                <div class="imc">
                    IMC: ${pessoa.imc}
                </div>

                <p>
                    ${pessoa.classificacao}
                </p>

                <button
                    class="excluir"
                    onclick="excluirPessoa(${index})">

                    Excluir

                </button>

            </div>

        `;
    });


    totalPessoas.textContent = lista.length;
}


// Excluir pessoa

function excluirPessoa(index) {

    pessoas.splice(index, 1);

    mostrarPessoas();
}


// Botão limpar

btnLimpar.addEventListener("click", function() {

    nome.value = "";
    peso.value = "";
    altura.value = "";

    resultado.innerHTML = `
        O resultado aparecerá aqui.
    `;

    nome.focus();

});


// Pesquisa

pesquisa.addEventListener("input", function() {

    const texto = pesquisa.value.toLowerCase();

    const pessoasFiltradas = pessoas.filter(function(pessoa) {

        return pessoa.nome.toLowerCase().includes(texto);

    });

    mostrarPessoas(pessoasFiltradas);

});