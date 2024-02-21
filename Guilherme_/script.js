let divcontainer = document.querySelector(".container");
let textBoxMensagem = document.querySelector(".txtMensagem");
let buttonTestarMensagem = document.querySelector(".buttonTestarMensagem");
let txtBoxMensagemCriptografada = document.querySelector(".txtMensagemCriptografada");
let buttonSalvarMensagem = document.querySelector(".buttonSalvarMensagem");
let descriptodarBloco = document.querySelector(".descriptodarBloco");
let txtChave = document.querySelector(".txtChave");
let txtMensagemDescriptografada = document.querySelector(".txtMensagemDescriptografada");
let chave = 1234567;
let mensagem;
let chaveBloqueada = validandoNaoRepetirCaracteresNaCriacaoDaChave(chave);
// let criptografado = criptografia(chave, mensagem);
// let descriptografado = descriptografia(chave, criptografado);

if (!chaveBloqueada) {

    buttonTestarMensagem.addEventListener("click", (e) => {

        e.preventDefault();

        if (validaLetraDigitada(textBoxMensagem.value))
            alert("SO PODE DIGITAR LETRAS MAIUSCULAS");
        else {
            txtBoxMensagemCriptografada.value = criptografia(chave, textBoxMensagem.value);
        }

    });


    buttonSalvarMensagem.addEventListener("click", (e) => {

        e.preventDefault();

        if (txtChave.value == chave)
            txtMensagemDescriptografada.value = descriptografia(chave, txtBoxMensagemCriptografada.value);
        else {
            alert("CHAVE INVALIDA");
            txtMensagemDescriptografada.value = "";
        }

    });


} else {
    divcontainer.style.display = "None";
    document.querySelector("h1").style.display = "block";
}



function validandoNaoRepetirCaracteresNaCriacaoDaChave(chave) {

    let chave_ = chave.toString();

    let bloqueado = false;

    for (let i = 0; i < chave_.length; i++) {

        for (let j = i + 1; j < chave_.length; j++) {

            if (chave_[i] == chave_[j]) {
                bloqueado = true;
            }
        }
    }
    if (chave_.length != 7)
        bloqueado = true;

    return bloqueado;
}

function validaLetraDigitada(mensagem) {

    console.log(mensagem);

    let letrasPermitidas = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', ' ', '',];

    let encontrado = true;

    for (let i = 0; i < mensagem.length; i++) {

        for (let t = 0; t < letrasPermitidas.length; t++) {

            if (mensagem[i] == letrasPermitidas[t]) {
                encontrado = false;
                break;
            }
            else {
                encontrado = true;
            }
        }
        if (encontrado)
            break;
    }

    return encontrado;
}

function criptografia(chave, mensagem) {
    let blocosCriptografado = "";

    for (let i = 0; i < mensagem.length; i++) {

        let numeroCriptografado = mensagem[i].charCodeAt() + chave;

        blocosCriptografado += numeroCriptografado.toString();

    }
    return blocosCriptografado;
}


function descriptografia(chave, mensagemCriptografada) {

    let mensagemaberta = "";

    let count = 0;

    for (let i = 0; i < mensagemCriptografada.length; i += chave.toString().length) {

        count += 1;
        let blococriptografado = parseInt(mensagemCriptografada.substring(i, chave.toString().length * count));

        let blocodecriptado = blococriptografado - chave;

        mensagemaberta += String.fromCharCode(blocodecriptado);
    }
    return mensagemaberta;
}