var visor = document.getElementById("visor");
var btnIgual = document.getElementById("btn-igual");
var btnLimpar = document.getElementById("btn-limpar");
var btnInstalar = document.getElementById("btn-instalar");
var resultadoPronto = false;
var eventoInstalacao = null;

function digitar(valor) {
  var expressao = visor.textContent;

  if (expressao === "Erro") {
    expressao = "0";
    visor.textContent = expressao;
  }

  if (resultadoPronto && !/^[+\-*/]$/.test(valor)) {
    expressao = "0";
    visor.textContent = expressao;
  }
  resultadoPronto = false;

  if (/^\d$/.test(valor)) {
    if (expressao === "0") {
      visor.textContent = valor;
    } else {
      visor.textContent += valor;
    }
    return;
  }

  if (valor === ".") {
    var numeros = expressao.split(/[+\-*/]/);
    var numeroAtual = numeros[numeros.length - 1];
    if (numeroAtual.indexOf(".") === -1) {
      visor.textContent += numeroAtual === "" ? "0." : ".";
    }
    return;
  }

  if (/^[+\-*/]$/.test(valor)) {
    if (expressao === "0" && valor !== "-") {
      return;
    }

    if (/[+\-*/]$/.test(expressao)) {
      if (valor === "-" && !/[+\-*/]-$/.test(expressao)) {
        visor.textContent += valor;
      } else {
        visor.textContent = expressao.replace(/[+\-*/]-?$/, valor);
      }
    } else {
      visor.textContent += valor;
    }
  }
}

function calcular() {
  try {
    var resultado = eval(visor.textContent);
    if (!Number.isFinite(resultado)) {
      throw new Error("Resultado inválido");
    }
    visor.textContent = resultado;
  } catch (erro) {
    visor.textContent = "Erro";
  }
  resultadoPronto = true;
}

function limpar() {
  visor.textContent = "0";
  resultadoPronto = false;
}

document.querySelectorAll(".tecla[data-valor]").forEach(function (tecla) {
  tecla.addEventListener("click", function () {
    digitar(tecla.getAttribute("data-valor"));
  });
});

btnIgual.addEventListener("click", calcular);
btnLimpar.addEventListener("click", limpar);

window.addEventListener("beforeinstallprompt", function (evento) {
  evento.preventDefault();
  eventoInstalacao = evento;
  btnInstalar.hidden = false;
});

btnInstalar.addEventListener("click", async function () {
  if (!eventoInstalacao) return;

  eventoInstalacao.prompt();
  await eventoInstalacao.userChoice;
  eventoInstalacao = null;
  btnInstalar.hidden = true;
});

window.addEventListener("appinstalled", function () {
  eventoInstalacao = null;
  btnInstalar.hidden = true;
});
